"use client";

import { Mic } from "lucide-react";
import { cn } from "@/utils/cn";
import { useAccessibility } from "@/hooks/useAccessibility";
import { useVoiceAssistant } from "@/hooks/useVoiceAssistant";

interface VoiceSearchButtonProps {
  onResult: (text: string) => void;
  className?: string;
  label?: string;
}

/**
 * Small mic button that fills a search/input field via speech recognition.
 * Renders nothing unless Voice Assistance is enabled and the browser supports it.
 */
export function VoiceSearchButton({ onResult, className, label = "Search by voice" }: VoiceSearchButtonProps) {
  const { settings } = useAccessibility();
  const { isSupported, isListening, startListening, stopListening } = useVoiceAssistant();

  if (!settings.voiceAssistance || !isSupported) return null;

  function handleClick() {
    if (isListening) {
      stopListening();
      return;
    }
    startListening(onResult);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex items-center justify-center transition-all duration-200 flex-shrink-0",
        isListening ? "text-red-500 animate-pulse" : "text-[#9CA3AF] hover:text-[#6B3FFF]",
        className
      )}
      aria-label={isListening ? "Stop voice input" : label}
      aria-pressed={isListening}
    >
      <Mic size={16} aria-hidden="true" />
    </button>
  );
}
