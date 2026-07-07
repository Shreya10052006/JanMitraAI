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

export interface ComplaintAnalysis {
  category: string;
  department: string;
  priority: "low" | "medium" | "high";
  summary: string;
  confidence: number;
  usedGemini?: boolean;
}

export interface UseComplaintsReturn {
  complaints: StoredComplaint[];
  isAnalyzing: boolean;
  isSubmitting: boolean;
  analysisResult: ComplaintAnalysis | null;
  analyzeComplaint: (description: string, location: string) => Promise<void>;
  submitComplaint: (data: {
    description: string;
    location: string;
    when: string;
    imageUrl?: string;
    analysis: ComplaintAnalysis;
  }) => StoredComplaint;
  findComplaint: (id: string) => StoredComplaint | undefined;
  refreshComplaints: () => void;
  resetAnalysis: () => void;
}

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

  const analyzeComplaint = useCallback(async (description: string, location: string): Promise<void> => {
    if (!description.trim() || !location.trim()) return;
    setIsAnalyzing(true);

    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, location }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

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
      // Local fallback categorization
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

  const findComplaint = useCallback((id: string): StoredComplaint | undefined => {
    const stored = getComplaintById(id);
    if (stored) return stored;

    // Search mock complaints
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
