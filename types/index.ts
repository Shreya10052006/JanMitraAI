/**
 * types/index.ts
 *
 * Shared TypeScript type definitions for the JanMitra AI platform.
 *
 * All domain models are defined here and shared across:
 * - API routes (app/api/)
 * - React hooks (hooks/)
 * - UI components (components/)
 * - Service layer (services/)
 *
 * Smart Bharat alignment: strongly typed domain models ensure
 * correctness across the complaint, scheme, service, and document features.
 */

/** A supported language option for the multilingual AI assistant. */
export type Language = {
  /** BCP-47 language code (e.g., "hi", "ta", "en"). */
  code: string;
  /** English display name (e.g., "Hindi"). */
  label: string;
  /** Native script label (e.g., "हिन्दी"). */
  nativeLabel: string;
};

/** A navigation item in the sidebar or bottom navigation. */
export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: string;
};

/** A quick action card on the dashboard for common citizen tasks. */
export type QuickAction = {
  id: string;
  label: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  bgColor: string;
};

/** A recent item (complaint, service, scheme) displayed in the activity feed. */
export type RecentItem = {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  statusColor: "orange" | "green" | "blue" | "purple" | "gray";
  date: string;
  icon: string;
  href: string;
};

/** An AI-suggested prompt chip shown in the chat assistant. */
export type AISuggestion = {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  href: string;
};

/** A platform-level statistic (e.g., services accessed, complaints resolved). */
export type Statistic = {
  id: string;
  value: string;
  label: string;
  icon: string;
  iconBg: string;
};

/** A suggested prompt chip rendered below the AI chat input. */
export type PromptChip = {
  id: string;
  label: string;
};

/** User-configurable accessibility preferences. */
export type AccessibilitySettings = {
  /** UI text size preference. */
  textSize: "sm" | "md" | "lg";
  /** High-contrast mode for visual impairment support. */
  highContrast: boolean;
  /** Voice assistance (screen reader hints) toggle. */
  voiceAssistance: boolean;
};

/** An in-app notification (complaint status update, scheme deadline, etc.). */
export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
};

/** Role of a participant in the AI chat conversation. */
export type MessageRole = "user" | "assistant";

/** A single message in the AI chat assistant conversation. */
export type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
};

/**
 * A government service entry (driving license, passport, Aadhaar, etc.).
 * Each service includes all data needed for citizen guidance:
 * process steps, document requirements, fees, and official portal link.
 */
export type Service = {
  id: string;
  title: string;
  description: string;
  /** Ministry/department category (e.g., "Identity & Documents"). */
  category: string;
  /** Responsible government department. */
  department: string;
  /** Typical processing time (e.g., "7–10 working days"). */
  estimatedTime: string;
  /** List of required document names. */
  documentsNeeded: string[];
  icon: string;
  iconBg: string;
  iconColor: string;
  /** True if this is a frequently accessed service. */
  isPopular?: boolean;
  /** Official government portal URL. */
  href: string;
};

/** A category filter for the government services directory. */
export type ServiceCategory = {
  id: string;
  label: string;
  icon: string;
};

/**
 * A civic complaint reported by a citizen.
 * Includes full history via the timeline array for transparent tracking.
 */
export type Complaint = {
  id: string;
  /** Unique human-readable ticket ID (e.g., "CMP-2026-1453"). */
  ticketId: string;
  title: string;
  description: string;
  /** AI-assigned category (e.g., "Roads & Infrastructure"). */
  category: string;
  location: string;
  status: ComplaintStatus;
  priority: "low" | "medium" | "high";
  /** ISO date string (YYYY-MM-DD). */
  createdAt: string;
  /** ISO date string of last status change. */
  updatedAt: string;
  /** Government officer or department assigned. */
  assignedTo?: string;
  /** Ordered list of status change events. */
  timeline: ComplaintTimelineEvent[];
};

/**
 * Lifecycle states of a civic complaint.
 * Citizens can track their complaint through every stage for full transparency.
 */
export type ComplaintStatus =
  | "submitted"       // Citizen has filed; awaiting review
  | "under_review"    // Department is reviewing
  | "assigned"        // Assigned to a field officer
  | "in_progress"     // Active resolution in progress
  | "resolved"        // Issue has been fixed
  | "closed";         // Formally closed (resolved or rejected)

/** A single event in a complaint's audit trail. */
export type ComplaintTimelineEvent = {
  id: string;
  label: string;
  description: string;
  /** Human-readable timestamp (e.g., "7 July 2026, 09:30 AM"). */
  timestamp: string;
  status: ComplaintStatus;
};

/** A citizen-uploaded document managed in the Document Assistant. */
export type Document = {
  id: string;
  name: string;
  /** MIME type or extension (e.g., "application/pdf", "image/jpeg"). */
  type: string;
  /** Service category this document belongs to. */
  category: string;
  /** Human-readable file size (e.g., "2.4 MB"). */
  size: string;
  /** ISO date string of upload. */
  uploadedAt: string;
  /** Verification status — pending until DigiLocker/manual review completes. */
  status: "verified" | "pending" | "expired";
  icon: string;
  iconBg: string;
  iconColor: string;
};

/**
 * A government welfare scheme (PM Kisan, Ayushman Bharat, etc.).
 * Eligibility criteria are used by Gemini for personalized matching.
 */
export type Scheme = {
  id: string;
  title: string;
  description: string;
  /** Sponsoring ministry (e.g., "Ministry of Agriculture"). */
  ministry: string;
  /** Scheme category (e.g., "Agriculture", "Health", "Education"). */
  category: string;
  /** List of eligibility criteria strings. */
  eligibility: string[];
  /** Plain-language description of scheme benefits. */
  benefits: string;
  /** Application deadline (ISO date string), if applicable. */
  deadline?: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  /** True if the current citizen's profile matches eligibility criteria. */
  isEligible?: boolean;
  /** Display tag (e.g., "New", "Popular", "Closing Soon"). */
  tag?: string;
};
