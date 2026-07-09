"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { getAccessibilityPrefs, saveAccessibilityPrefs } from "@/services/storage";
import type { AccessibilitySettings } from "@/types";

type AccessibilityContextType = {
  settings: AccessibilitySettings;
  setTextSize: (size: AccessibilitySettings["textSize"]) => void;
  toggleHighContrast: () => void;
  toggleVoiceAssistance: () => void;
};

const DEFAULT_SETTINGS: AccessibilitySettings = {
  textSize: "md",
  highContrast: false,
  voiceAssistance: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  // Starts at defaults on both server and first client render, then loads
  // the saved preferences after mount to avoid a hydration mismatch (these
  // values drive rendered classNames/aria-pressed state).
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const saved = getAccessibilityPrefs();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSettings(saved);
    if (saved.highContrast) {
      document.body.classList.add("high-contrast");
    }
    const sizeMap = { sm: "14px", md: "16px", lg: "18px" };
    document.documentElement.style.fontSize = sizeMap[saved.textSize];
  }, []);

  const setTextSize = useCallback((size: AccessibilitySettings["textSize"]) => {
    setSettings((prev) => {
      const next = { ...prev, textSize: size };
      saveAccessibilityPrefs({ textSize: size });
      return next;
    });
    const root = document.documentElement;
    const sizeMap = { sm: "14px", md: "16px", lg: "18px" };
    root.style.fontSize = sizeMap[size];
  }, []);

  const toggleHighContrast = useCallback(() => {
    setSettings((prev) => {
      const next = { ...prev, highContrast: !prev.highContrast };
      if (next.highContrast) {
        document.body.classList.add("high-contrast");
      } else {
        document.body.classList.remove("high-contrast");
      }
      saveAccessibilityPrefs({ highContrast: next.highContrast });
      return next;
    });
  }, []);

  const toggleVoiceAssistance = useCallback(() => {
    setSettings((prev) => {
      const next = { ...prev, voiceAssistance: !prev.voiceAssistance };
      saveAccessibilityPrefs({ voiceAssistance: next.voiceAssistance });
      return next;
    });
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{ settings, setTextSize, toggleHighContrast, toggleVoiceAssistance }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility(): AccessibilityContextType {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
}
