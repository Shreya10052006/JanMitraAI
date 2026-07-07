/**
 * hooks/useComplaints.ts
 *
 * React hook for managing civic complaint state.
 *
 * Responsibilities:
 * - Merges user-submitted complaints (localStorage) with seed mock data
 * - Calls /api/complaints to AI-categorize complaints before submission
 * - Creates new complaints with auto-generated ticket IDs and timeline events
 * - Provides complaint lookup by ticket ID or internal ID
 *
 * Smart Bharat alignment: powers the grievance redressal feature —
 * citizens can report, track, and manage civic issues with AI assistance.
 */

"use client";

import { useState, useCallback } from "react";
import {
  getStoredComplaints,
  saveComplaint,
  getComplaintById,
  generateTicketId,
  type StoredComplaint,
} from "@/services/storage";
import { COMPLAINTS } from "@/lib/mock-data";
import type { ComplaintStatus } from "@/types";

/** AI analysis result for a civic complaint. */
export interface ComplaintAnalysis {
  /** Civic category (e.g., "Roads & Infrastructure"). */
  category: string;
  /** Responsible government department. */
  department: string;
  /** Urgency level based on complaint content. */
  priority: "low" | "medium" | "high";
  /** One-line AI-generated summary of the issue. */
  summary: string;
  /** Confidence score (0–1) for the categorization. */
  confidence: number;
  /** True if the categorization was done by Gemini; false for rule-based. */
  usedGemini?: boolean;
}

/** Return type of the useComplaints hook. */
export interface UseComplaintsReturn {
  /** All complaints (user-submitted + seeded mock data), sorted newest first. */
  complaints: StoredComplaint[];
  /** True while the AI analysis API call is in progress. */
  isAnalyzing: boolean;
  /** True while saving a complaint to localStorage. */
  isSubmitting: boolean;
  /** The latest AI analysis result; null before the first analysis. */
  analysisResult: ComplaintAnalysis | null;
  /** Send complaint description and location to the AI for categorization. */
  analyzeComplaint: (description: string, location: string) => Promise<void>;
  /** Persist a complaint and create its initial timeline event. */
  submitComplaint: (data: {
    description: string;
    location: string;
    when: string;
    imageUrl?: string;
    analysis: ComplaintAnalysis;
  }) => StoredComplaint;
  /** Find a complaint by its ticket ID, internal ID, or partial ticket match. */
  findComplaint: (id: string) => StoredComplaint | undefined;
  /** Re-read complaints from localStorage (after external changes). */
  refreshComplaints: () => void;
  /** Clear the current analysis result (e.g., when the form is reset). */
  resetAnalysis: () => void;
}

/**
 * Converts the mock complaint seed data into StoredComplaint shape
 * so it can be merged with user-submitted complaints seamlessly.
 */
function getMockComplaintsAsStored(): StoredComplaint[] {
  return COMPLAINTS.map((c) => ({
    id: c.id,
    ticketId: c.ticketId,
    title: c.title,
    description: c.description,
    category: c.category,
    location: c.location,
    status: c.status,
    priority: c.priority,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    assignedTo: c.assignedTo,
    timeline: c.timeline,
  }));
}

/**
 * Custom hook for civic complaint management.
 *
 * Merges user complaints (localStorage) with seed data, deduplicating by ticketId
 * so a submitted complaint always takes precedence over the mock entry.
 *
 * @returns Complaint state and actions
 */
export function useComplaints(): UseComplaintsReturn {
  const loadComplaints = useCallback((): StoredComplaint[] => {
    const stored = getStoredComplaints();
    const mockAsStored = getMockComplaintsAsStored();
    const storedIds = new Set(stored.map((c) => c.ticketId));
    const mockFiltered = mockAsStored.filter((c) => !storedIds.has(c.ticketId));
    return [...stored, ...mockFiltered];
  }, []);

  const [complaints, setComplaints] = useState<StoredComplaint[]>(() => {
    const stored = getStoredComplaints();
    const mockAsStored = getMockComplaintsAsStored();
    const storedIds = new Set(stored.map((c) => c.ticketId));
    const mockFiltered = mockAsStored.filter((c) => !storedIds.has(c.ticketId));
    return [...stored, ...mockFiltered];
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ComplaintAnalysis | null>(null);

  const refreshComplaints = useCallback(() => {
    setComplaints(loadComplaints());
  }, [loadComplaints]);

  /**
   * Sends the complaint description and location to /api/complaints for AI categorization.
   * Falls back to a generic "Other" categorization if the API fails.
   */
  const analyzeComplaint = useCallback(async (description: string, location: string): Promise<void> => {
    if (!description.trim() || !location.trim()) return;
    setIsAnalyzing(true);

    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, location }),
      });

      if (!response.ok) throw new Error("Analysis failed");

      const data = await response.json() as ComplaintAnalysis & { usedGemini?: boolean };
      setAnalysisResult({
        category: data.category,
        department: data.department,
        priority: data.priority,
        summary: data.summary,
        confidence: data.confidence,
        usedGemini: data.usedGemini,
      });
    } catch {
      // Local fallback — ensures the form always progresses even without connectivity
      setAnalysisResult({
        category: "Other",
        department: "Municipal Corporation",
        priority: "medium",
        summary: description.slice(0, 100),
        confidence: 0.6,
        usedGemini: false,
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  /**
   * Creates a new complaint record with a unique ticket ID and initial timeline event,
   * persists it to localStorage, and returns the created complaint.
   */
  const submitComplaint = useCallback((data: {
    description: string;
    location: string;
    when: string;
    imageUrl?: string;
    analysis: ComplaintAnalysis;
  }): StoredComplaint => {
    setIsSubmitting(true);
    const ticketId = generateTicketId();
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    const displayDate = now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const complaint: StoredComplaint = {
      id: `local-${Date.now()}`,
      ticketId,
      title: data.analysis.summary || data.description.slice(0, 80),
      description: data.description,
      category: data.analysis.category,
      location: data.location,
      status: "submitted" as ComplaintStatus,
      priority: data.analysis.priority,
      createdAt: dateStr,
      updatedAt: dateStr,
      department: data.analysis.department,
      imageUrl: data.imageUrl,
      timeline: [
        {
          id: "t1",
          label: "Complaint Submitted",
          description: `Your complaint has been registered successfully. Ticket ID: ${ticketId}`,
          timestamp: `${displayDate}, ${timeStr}`,
          status: "submitted" as ComplaintStatus,
        },
      ],
    };

    saveComplaint(complaint);
    setIsSubmitting(false);
    refreshComplaints();
    return complaint;
  }, [refreshComplaints]);

  /**
   * Finds a complaint by ticket ID, internal ID, or partial ticket match.
   * Searches user-submitted complaints first, then falls back to mock data.
   */
  const findComplaint = useCallback((id: string): StoredComplaint | undefined => {
    const stored = getComplaintById(id);
    if (stored) return stored;

    const mockAsStored = getMockComplaintsAsStored();
    return mockAsStored.find(
      (c) => c.id === id || c.ticketId === id || c.ticketId.includes(id.replace("#", ""))
    );
  }, []);

  const resetAnalysis = useCallback(() => {
    setAnalysisResult(null);
  }, []);

  return {
    complaints,
    isAnalyzing,
    isSubmitting,
    analysisResult,
    analyzeComplaint,
    submitComplaint,
    findComplaint,
    refreshComplaints,
    resetAnalysis,
  };
}
