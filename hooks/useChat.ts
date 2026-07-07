/**
 * hooks/useChat.ts
 *
 * React hook for managing the AI chat assistant state.
 *
 * Responsibilities:
 * - Maintains the conversation message list with localStorage persistence
 * - Sends messages through the /api/chat hybrid AI pipeline
 * - Exposes loading/error states for UI rendering
 * - Provides retry and history-clear capabilities
 *
 * Smart Bharat alignment: powers the AI-driven citizen assistance feature,
 * routing civic queries through intent detection → rule engine → Gemini.
 */

"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  getChatHistory,
  saveChatHistory,
  clearChatHistory,
  addRecentActivity,
  type StoredMessage,
} from "@/services/storage";

/** A single message in the chat conversation. */
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestedActions?: { label: string; href: string }[];
  relatedServices?: string[];
  card?: string;
  isError?: boolean;
  usedGemini?: boolean;
}

/** Return type of the useChat hook. */
export interface UseChatReturn {
  /** Full ordered list of chat messages. */
  messages: ChatMessage[];
  /** True while waiting for an API response. */
  isLoading: boolean;
  /** Non-null when the last request failed. */
  error: string | null;
  /** Send a new message through the AI pipeline. */
  sendMessage: (content: string, language?: string) => Promise<void>;
  /** Clear all chat history from state and localStorage. */
  clearHistory: () => void;
  /** Resend the last user message (used for retry after error). */
  retryLast: () => void;
}

/** The welcome message shown on first load. */
const INITIAL_MESSAGE: ChatMessage = {
  id: "initial",
  role: "assistant",
  content:
    "Namaste! 🙏 I'm JanMitra AI, your civic companion.\n\nI can help you with:\n• Government services (Driving License, Passport, Aadhaar, etc.)\n• Reporting civic issues (Potholes, Street Lights, Water Supply)\n• Finding schemes & benefits you're eligible for\n• Document requirements and guidance\n\nWhat would you like help with today?",
  timestamp: new Date(),
  suggestedActions: [
    { label: "Find Government Services", href: "/services" },
    { label: "Report an Issue", href: "/complaints" },
    { label: "Check Scheme Eligibility", href: "/schemes" },
  ],
};

/**
 * Converts a stored (serialized) message back into a ChatMessage with a real Date object.
 */
function storedToChat(stored: StoredMessage): ChatMessage {
  return {
    id: stored.id,
    role: stored.role,
    content: stored.content,
    timestamp: new Date(stored.timestamp),
  };
}

/**
 * Lazy initializer for useState — loads chat history from localStorage on first render.
 * Returns the initial welcome message if no history exists.
 */
function loadInitialMessages(): ChatMessage[] {
  const stored = getChatHistory();
  if (stored.length > 0) return stored.map(storedToChat);
  return [INITIAL_MESSAGE];
}

/**
 * Custom hook for the JanMitra AI chat assistant.
 *
 * @returns Chat state and actions (messages, sendMessage, clearHistory, retryLast)
 */
export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>(loadInitialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastUserMessageRef = useRef("");
  const lastLanguageRef = useRef("en");

  // Persist messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length === 0) return;
    const stored: StoredMessage[] = messages.map((m) => ({
      id: m.id,
      role: m.role,
      content: m.content,
      timestamp: m.timestamp.toISOString(),
    }));
    saveChatHistory(stored);
  }, [messages]);

  const sendMessage = useCallback(async (content: string, language = "en"): Promise<void> => {
    if (!content.trim() || isLoading) return;

    const trimmed = content.trim();
    lastUserMessageRef.current = trimmed;
    lastLanguageRef.current = language;
    setError(null);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const allMessages = [...messages, userMessage];
      const apiMessages = allMessages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, language }),
      });

      if (!response.ok) throw new Error("API error");

      const data = await response.json() as {
        content: string;
        suggestedActions?: { label: string; href: string }[];
        relatedServices?: string[];
        card?: string;
        usedGemini?: boolean;
      };

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
        suggestedActions: data.suggestedActions,
        relatedServices: data.relatedServices,
        card: data.card,
        usedGemini: data.usedGemini,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      addRecentActivity({
        type: "chat",
        title: `Asked: ${trimmed.slice(0, 50)}${trimmed.length > 50 ? "…" : ""}`,
        href: "/ai-assistant",
        timestamp: new Date().toISOString(),
      });
    } catch {
      setError("Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const retryLast = useCallback(() => {
    if (!lastUserMessageRef.current) return;
    void sendMessage(lastUserMessageRef.current, lastLanguageRef.current);
  }, [sendMessage]);

  const clearHistory = useCallback(() => {
    clearChatHistory();
    setMessages([INITIAL_MESSAGE]);
    setError(null);
  }, []);

  return { messages, isLoading, error, sendMessage, clearHistory, retryLast };
}
