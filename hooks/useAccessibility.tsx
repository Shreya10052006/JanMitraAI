"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { AccessibilitySettings } from "@/types";

type AccessibilityContextType = {
  settings: AccessibilitySettings;
  setTextSize: (size: AccessibilitySettings["textSize"]) => void;
  toggleHighContrast: () => void;
  toggleVoiceAssistance: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    textSize: "md",
    highContrast: false,
    voiceAssistance: false,
  });

  const setTextSize = useCallback((size: AccessibilitySettings["textSize"]) => {
    setSettings((prev) => ({ ...prev, textSize: size }));
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
      return next;
    });
  }, []);

  const toggleVoiceAssistance = useCallback(() => {
    setSettings((prev) => ({ ...prev, voiceAssistance: !prev.voiceAssistance }));
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
