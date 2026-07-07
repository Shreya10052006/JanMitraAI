/**
 * Client-side persistence using localStorage.
 * All functions are safe to call server-side (they check for window availability).
 * SSR-safe: every function guards with typeof window !== "undefined".
 */

import type { Complaint, ComplaintStatus, ComplaintTimelineEvent } from "@/types";
import { STORAGE_LIMITS, AI_CONFIG } from "@/lib/constants";

// ─── Storage Keys ────────────────────────────────────────────────────────────
const KEYS = {
  CHAT_HISTORY: "janmitra_chat_history",
  COMPLAINTS: "janmitra_complaints",
  BOOKMARKS: "janmitra_bookmarks",
  PROFILE: "janmitra_profile",
  LANGUAGE: "janmitra_language",
  ACCESSIBILITY: "janmitra_accessibility",
  SAVED_SERVICES: "janmitra_saved_services",
  SAVED_SCHEMES: "janmitra_saved_schemes",
  RECENT_ACTIVITY: "janmitra_recent_activity",
  COMPLAINT_COUNTER: "janmitra_complaint_counter",
} as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWrite(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage may be full or unavailable — silently ignore
  }
}

// ─── Chat History ─────────────────────────────────────────────────────────────

export interface StoredMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export function getChatHistory(): StoredMessage[] {
  return safeRead<StoredMessage[]>(KEYS.CHAT_HISTORY, []);
}

export function saveChatHistory(messages: StoredMessage[]): void {
  // Keep last MAX_STORED_MESSAGES messages to avoid storage bloat
  const trimmed = messages.slice(-AI_CONFIG.MAX_STORED_MESSAGES);
  safeWrite(KEYS.CHAT_HISTORY, trimmed);
}

export function clearChatHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEYS.CHAT_HISTORY);
}

// ─── Complaints ───────────────────────────────────────────────────────────────

function getComplaintCounter(): number {
  return safeRead<number>(KEYS.COMPLAINT_COUNTER, STORAGE_LIMITS.COMPLAINT_COUNTER_SEED);
}

function incrementComplaintCounter(): number {
  const current = getComplaintCounter();
  const next = current + 1;
  safeWrite(KEYS.COMPLAINT_COUNTER, next);
  return next;
}

export function generateTicketId(): string {
  const year = new Date().getFullYear();
  const counter = incrementComplaintCounter();
  return `CMP-${year}-${counter}`;
}

export interface StoredComplaint {
  id: string;
  ticketId: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: ComplaintStatus;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  department?: string;
  imageUrl?: string;
  timeline: ComplaintTimelineEvent[];
}

export function getStoredComplaints(): StoredComplaint[] {
  return safeRead<StoredComplaint[]>(KEYS.COMPLAINTS, []);
}

export function saveComplaint(complaint: StoredComplaint): void {
  const existing = getStoredComplaints();
  const idx = existing.findIndex((c) => c.id === complaint.id);
  if (idx >= 0) {
    existing[idx] = complaint;
  } else {
    existing.unshift(complaint);
  }
  safeWrite(KEYS.COMPLAINTS, existing);
  addRecentActivity({
    type: "complaint",
    title: `Complaint ${complaint.ticketId} submitted`,
    href: "/complaints",
    timestamp: new Date().toISOString(),
  });
}

export function updateComplaintStatus(
  id: string,
  status: ComplaintStatus,
  timelineEvent?: ComplaintTimelineEvent
): void {
  const complaints = getStoredComplaints();
  const complaint = complaints.find((c) => c.id === id);
  if (!complaint) return;
  complaint.status = status;
  complaint.updatedAt = new Date().toISOString().split("T")[0];
  if (timelineEvent) {
    complaint.timeline.push(timelineEvent);
  }
  safeWrite(KEYS.COMPLAINTS, complaints);
}

export function getComplaintById(id: string): StoredComplaint | undefined {
  return getStoredComplaints().find((c) => c.id === id || c.ticketId === id);
}

// ─── Bookmarks ────────────────────────────────────────────────────────────────

export interface BookmarkItem {
  id: string;
  type: "service" | "scheme" | "resource" | "document";
  title: string;
  href: string;
  savedAt: string;
}

export function getBookmarks(): BookmarkItem[] {
  return safeRead<BookmarkItem[]>(KEYS.BOOKMARKS, []);
}

export function addBookmark(item: Omit<BookmarkItem, "savedAt">): void {
  const bookmarks = getBookmarks();
  if (bookmarks.some((b) => b.id === item.id)) return; // already bookmarked
  bookmarks.unshift({ ...item, savedAt: new Date().toISOString() });
  safeWrite(KEYS.BOOKMARKS, bookmarks);
}

export function removeBookmark(id: string): void {
  const bookmarks = getBookmarks().filter((b) => b.id !== id);
  safeWrite(KEYS.BOOKMARKS, bookmarks);
}

export function isBookmarked(id: string): boolean {
  return getBookmarks().some((b) => b.id === id);
}

// ─── Profile ──────────────────────────────────────────────────────────────────

export interface UserProfile {
  name: string;
  fullName: string;
  email: string;
  phone?: string;
  location: string;
  occupation: string;
  income: string;
  age: string;
  category: string;
  avatar: string | null;
  notificationsEnabled: boolean;
  servicesUsed?: number;
  schemesApplied?: number;
}

const DEFAULT_PROFILE: UserProfile = {
  name: "Citizen",
  fullName: "Citizen User",
  email: "",
  location: "India",
  occupation: "",
  income: "",
  age: "",
  category: "",
  avatar: null,
  notificationsEnabled: true,
};

export function getProfile(): UserProfile {
  return safeRead<UserProfile>(KEYS.PROFILE, DEFAULT_PROFILE);
}

export function saveProfile(profile: Partial<UserProfile>): void {
  const current = getProfile();
  safeWrite(KEYS.PROFILE, { ...current, ...profile });
}

// ─── Language ─────────────────────────────────────────────────────────────────

export function getSavedLanguage(): string {
  return safeRead<string>(KEYS.LANGUAGE, "en");
}

export function saveLanguage(code: string): void {
  safeWrite(KEYS.LANGUAGE, code);
}

// ─── Accessibility ────────────────────────────────────────────────────────────

export interface AccessibilityPrefs {
  textSize: "sm" | "md" | "lg";
  highContrast: boolean;
  voiceAssistance: boolean;
}

export function getAccessibilityPrefs(): AccessibilityPrefs {
  return safeRead<AccessibilityPrefs>(KEYS.ACCESSIBILITY, {
    textSize: "md",
    highContrast: false,
    voiceAssistance: false,
  });
}

export function saveAccessibilityPrefs(prefs: Partial<AccessibilityPrefs>): void {
  const current = getAccessibilityPrefs();
  safeWrite(KEYS.ACCESSIBILITY, { ...current, ...prefs });
}

// ─── Saved Services ───────────────────────────────────────────────────────────

export function getSavedServices(): string[] {
  return safeRead<string[]>(KEYS.SAVED_SERVICES, []);
}

export function toggleSavedService(id: string): boolean {
  const saved = getSavedServices();
  const idx = saved.indexOf(id);
  if (idx >= 0) {
    saved.splice(idx, 1);
    safeWrite(KEYS.SAVED_SERVICES, saved);
    return false;
  } else {
    saved.unshift(id);
    safeWrite(KEYS.SAVED_SERVICES, saved);
    return true;
  }
}

// ─── Saved Schemes ────────────────────────────────────────────────────────────

export function getSavedSchemes(): string[] {
  return safeRead<string[]>(KEYS.SAVED_SCHEMES, []);
}

export function toggleSavedScheme(id: string): boolean {
  const saved = getSavedSchemes();
  const idx = saved.indexOf(id);
  if (idx >= 0) {
    saved.splice(idx, 1);
    safeWrite(KEYS.SAVED_SCHEMES, saved);
    return false;
  } else {
    saved.unshift(id);
    safeWrite(KEYS.SAVED_SCHEMES, saved);
    return true;
  }
}

// ─── Recent Activity ──────────────────────────────────────────────────────────

export interface ActivityItem {
  type: "complaint" | "service" | "scheme" | "document" | "chat";
  title: string;
  href: string;
  timestamp: string;
}

export function getRecentActivity(): ActivityItem[] {
  return safeRead<ActivityItem[]>(KEYS.RECENT_ACTIVITY, []);
}

export function addRecentActivity(item: ActivityItem): void {
  const activity = getRecentActivity();
  activity.unshift(item);
  safeWrite(KEYS.RECENT_ACTIVITY, activity.slice(0, STORAGE_LIMITS.MAX_ACTIVITY_ITEMS));
}

// ─── Statistics ───────────────────────────────────────────────────────────────

export function getUserStats(): {
  totalComplaints: number;
  resolvedComplaints: number;
  savedServices: number;
  savedSchemes: number;
  chatCount: number;
} {
  const complaints = getStoredComplaints();
  return {
    totalComplaints: complaints.length,
    resolvedComplaints: complaints.filter((c) => c.status === "resolved" || c.status === "closed").length,
    savedServices: getSavedServices().length,
    savedSchemes: getSavedSchemes().length,
    chatCount: getChatHistory().length,
  };
}

// ─── Export typed Complaint ───────────────────────────────────────────────────

export function storedToComplaint(sc: StoredComplaint): Complaint {
  return {
    id: sc.id,
    ticketId: sc.ticketId,
    title: sc.title,
    description: sc.description,
    category: sc.category,
    location: sc.location,
    status: sc.status,
    priority: sc.priority,
    createdAt: sc.createdAt,
    updatedAt: sc.updatedAt,
    assignedTo: sc.assignedTo,
    timeline: sc.timeline,
  };
}
