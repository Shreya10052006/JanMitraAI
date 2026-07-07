"use client";

import { useEffect, useState } from "react";
import { Accessibility, Mic, MicOff } from "lucide-react";
import { useAccessibility } from "@/hooks/useAccessibility";
import { cn } from "@/utils/cn";

export function AccessibilityPanel() {
  const { settings, setTextSize, toggleHighContrast, toggleVoiceAssistance } =
    useAccessibility();

  // Starts false on both server and first client render to avoid a
  // hydration mismatch, then flips after mount once we can check `window`.
  const [speechSupported, setSpeechSupported] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSpeechSupported(
      !!(window.SpeechRecognition ?? window.webkitSpeechRecognition) && "speechSynthesis" in window
    );
  }, []);

  return (
    <section
      className="rounded-xl px-4 py-3 mb-3"
      style={{ background: "rgba(255,255,255,0.05)" }}
      aria-label="Accessibility controls"
    >
      {/* Label */}
      <div className="flex items-center gap-2 mb-3">
        <Accessibility
          size={13}
          className="text-[#64748B]"
          aria-hidden="true"
        />
        <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-widest">
          Accessibility
        </span>
      </div>

      {/* Text size */}
      <div className="mb-3">
        <p className="text-[11px] text-[#64748B] mb-1.5 font-medium">
          Text Size
        </p>
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label="Text size options"
        >
          {(["sm", "md", "lg"] as const).map((size) => {
            const labels = { sm: "A-", md: "A", lg: "A+" };
            return (
              <button
                key={size}
                onClick={() => setTextSize(size)}
                className={cn(
                  "flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200",
                  settings.textSize === size
                    ? "bg-[#6B3FFF] text-white"
                    : "text-[#64748B] hover:bg-white/10 hover:text-white"
                )}
                style={
                  settings.textSize !== size
                    ? { background: "rgba(255,255,255,0.07)" }
                    : {}
                }
                aria-pressed={settings.textSize === size}
                aria-label={`Set text size to ${
                  size === "sm" ? "small" : size === "md" ? "medium" : "large"
                }`}
              >
                {labels[size]}
              </button>
            );
          })}
        </div>
      </div>

      {/* High contrast + Voice assistance — grouped together */}
      <div className="rounded-lg px-2.5 py-2 space-y-2" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#64748B] font-medium">
            High Contrast
          </span>
          <button
            role="switch"
            aria-checked={settings.highContrast}
            onClick={toggleHighContrast}
            className={cn(
              "relative w-8 h-[18px] rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#6B3FFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0F1117]",
              settings.highContrast
                ? "bg-[#6B3FFF]"
                : "bg-white/20"
            )}
            aria-label="Toggle high contrast mode"
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform duration-300",
                settings.highContrast ? "translate-x-[14px]" : "translate-x-0"
              )}
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[11px] text-[#64748B] font-medium">
            {settings.voiceAssistance ? (
              <Mic size={11} className="flex-shrink-0" aria-hidden="true" />
            ) : (
              <MicOff size={11} className="flex-shrink-0" aria-hidden="true" />
            )}
            Voice Assistance
          </span>
          <button
            role="switch"
            aria-checked={settings.voiceAssistance}
            onClick={toggleVoiceAssistance}
            className={cn(
              "relative w-8 h-[18px] rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#6B3FFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0F1117]",
              settings.voiceAssistance
                ? "bg-[#6B3FFF]"
                : "bg-white/20"
            )}
            aria-label="Toggle voice assistance"
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform duration-300",
                settings.voiceAssistance
                  ? "translate-x-[14px]"
                  : "translate-x-0"
              )}
              aria-hidden="true"
            />
          </button>
        </div>

        {settings.voiceAssistance && !speechSupported && (
          <p className="text-[9.5px] text-amber-300/80 leading-snug pt-0.5">
            Voice isn&apos;t supported in this browser.
          </p>
        )}
      </div>
    </section>
  );
}
