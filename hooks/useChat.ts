"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  getChatHistory,
  saveChatHistory,
  clearChatHistory,
  addRecentActivity,
  type StoredMessage,
} from "@/services/storage";

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

export interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string, language?: string) => Promise<void>;
  clearHistory: () => void;
  retryLast: () => void;
}

function storedToChat(stored: StoredMessage): ChatMessage {
  return {
    id: stored.id,
    role: stored.role,
    content: stored.content,
    timestamp: new Date(stored.timestamp),
  };
}

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

function loadInitialMessages(): ChatMessage[] {
  const stored = getChatHistory();
  if (stored.length > 0) return stored.map(storedToChat);
  return [INITIAL_MESSAGE];
}

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
      // Build message history for API (last 10 exchanges)
      const apiMessages = messages
        .filter((m) => m.id !== "initial")
        .slice(-20)
        .concat(userMessage)
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, language }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

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

      // Track activity
      addRecentActivity({
        type: "chat",
        title: trimmed.slice(0, 60),
        href: "/ai-assistant",
        timestamp: new Date().toISOString(),
      });
    } catch {
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content:
          "I'm having trouble connecting right now. Please check your internet connection and try again.",
        timestamp: new Date(),
        isError: true,
        suggestedActions: [
          { label: "Government Services", href: "/services" },
          { label: "Report an Issue", href: "/complaints" },
        ],
      };
      setMessages((prev) => [...prev, errorMessage]);
      setError("Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const retryLast = useCallback(() => {
    if (!lastUserMessageRef.current) return;
    // Remove last error message
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last?.isError) return prev.slice(0, -1);
      return prev;
    });
    void sendMessage(lastUserMessageRef.current, lastLanguageRef.current);
  }, [sendMessage]);

  const clearHistory = useCallback(() => {
    clearChatHistory();
    setMessages([INITIAL_MESSAGE]);
    setError(null);
  }, []);

  return { messages, isLoading, error, sendMessage, clearHistory, retryLast };
}
