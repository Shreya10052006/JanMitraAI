"use client";

import { Accessibility } from "lucide-react";
import { useAccessibility } from "@/hooks/useAccessibility";
import { cn } from "@/utils/cn";

export function AccessibilityPanel() {
  const { settings, setTextSize, toggleHighContrast, toggleVoiceAssistance } =
    useAccessibility();

  return (
    <section
      className="rounded-xl px-3.5 py-4 mb-2"
      style={{ background: "rgba(255,255,255,0.05)" }}
      aria-label="Accessibility controls"
    >
      {/* Label */}
      <div className="flex items-center gap-2 mb-4">
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
      <div className="mb-4">
        <p className="text-[11px] text-[#64748B] mb-2 font-medium">
          Text Size
        </p>
        <div
          className="flex items-center gap-1"
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

      {/* High contrast */}
      <div className="flex items-center justify-between mb-3.5">
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

      {/* Voice assistance */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-[#64748B] font-medium">
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
    </section>
  );
}
