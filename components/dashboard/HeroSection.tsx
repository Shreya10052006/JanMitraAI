"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import Image from "next/image";
import { Send, Mic } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import { PROMPT_CHIPS } from "@/lib/mock-data";
import { useAccessibility } from "@/hooks/useAccessibility";
import { useVoiceAssistant } from "@/hooks/useVoiceAssistant";
import { useLanguage } from "@/hooks/useLanguage";
import { getDashboardContent } from "@/lib/i18n/content/dashboard";

export function HeroSection() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { settings } = useAccessibility();
  const { isSupported, isListening, startListening, stopListening } = useVoiceAssistant();
  const { t, currentLanguage } = useLanguage();
  const content = getDashboardContent(currentLanguage.code);

  function handleSearch() {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/ai-assistant?q=${encodeURIComponent(trimmed)}`);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSearch();
  }

  function handleChipClick(label: string) {
    setQuery(label);
    inputRef.current?.focus();
  }

  function handleMicClick() {
    if (isListening) {
      stopListening();
      return;
    }
    startListening((text) => {
      setQuery(text);
      inputRef.current?.focus();
    });
  }

  const searchAndChips = (
    <>
      {/* Search input */}
      <div
        className={cn(
          "relative flex items-center bg-white rounded-[14px] transition-all duration-300",
          isFocused
            ? "shadow-xl shadow-purple-200/60 ring-2 ring-[#6B3FFF]/25"
            : "shadow-lg shadow-purple-100/50"
        )}
        role="search"
      >
        <label htmlFor="hero-search" className="sr-only">
          Ask JanMitra AI anything
        </label>
        <input
          id="hero-search"
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isListening ? "Listening…" : t("home.searchPlaceholder")}
          className="flex-1 bg-transparent px-6 py-4 text-sm text-[#374151] placeholder-[#B0AABB] outline-none rounded-[14px] min-w-0"
          aria-label="Search query"
          autoComplete="off"
        />
        {settings.voiceAssistance && isSupported && (
          <button
            onClick={handleMicClick}
            className={cn(
              "mr-1 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0",
              isListening
                ? "bg-red-500 text-white animate-pulse"
                : "text-[#9CA3AF] hover:text-[#6B3FFF] hover:bg-[#F3F0FF]"
            )}
            aria-label={isListening ? "Stop voice input" : "Search by voice"}
            aria-pressed={isListening}
          >
            <Mic size={16} aria-hidden="true" />
          </button>
        )}
        <button
          onClick={handleSearch}
          disabled={!query.trim()}
          className={cn(
            "mr-2 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0",
            query.trim()
              ? "text-white shadow-md shadow-purple-400/30 hover:shadow-lg hover:scale-105 active:scale-95"
              : "bg-[#EDE9FE] text-[#C4B5FD] cursor-not-allowed"
          )}
          style={
            query.trim()
              ? {
                  background: "linear-gradient(135deg, #6B3FFF, #8B5CF6)",
                }
              : {}
          }
          aria-label="Submit search"
        >
          <Send size={15} aria-hidden="true" />
        </button>
      </div>

      {/* Prompt chips */}
      <div
        className="flex flex-wrap items-center gap-2 mt-6"
        role="group"
        aria-label="Suggested queries"
      >
        <span className="text-xs text-[#9CA3AF] font-medium whitespace-nowrap">
          {t("home.tryAskingAbout")}
        </span>
        {PROMPT_CHIPS.map((chip) => {
          const label = content.promptChips[chip.id] ?? chip.label;
          return (
          <button
            key={chip.id}
            onClick={() => handleChipClick(label)}
            className="px-4 py-2 bg-white/85 border border-[#E2DCF5] rounded-full text-xs text-[#4B5563] hover:bg-white hover:border-[#6B3FFF]/40 hover:text-[#6B3FFF] hover:shadow-sm transition-all duration-200 font-medium backdrop-blur-sm"
            aria-label={`Search for ${label}`}
          >
            {label}
          </button>
          );
        })}
      </div>
    </>
  );

  const greeting = (
    <>
      <h1 className="text-2xl lg:text-[2rem] font-bold text-[#1A1340] mb-3 lg:mb-4 leading-tight tracking-tight">
        {t("home.greeting")}, Mithra!{" "}
        <span role="img" aria-label="Namaste hands">
          🙏
        </span>
      </h1>
      {currentLanguage.code === "en" ? (
        <p className="text-sm lg:text-[15px] text-[#4B5563] mb-6 leading-relaxed">
          I&apos;m JanMitra AI, here to{" "}
          <span
            className="font-semibold"
            style={{
              background: "linear-gradient(135deg, #6B3FFF, #7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            simplify government services
          </span>{" "}
          for you.
        </p>
      ) : (
        <p className="text-sm lg:text-[15px] text-[#4B5563] mb-6 leading-relaxed">
          {t("home.tagline")}
        </p>
      )}
    </>
  );

  return (
    <>
      {/* ── Mobile / tablet layout (< lg): vertical stack, image as its own block ── */}
      <div className="lg:hidden space-y-4" aria-label="JanMitra AI search and welcome section">
        <div
          className="relative w-full rounded-[28px] overflow-hidden px-6 py-8"
          style={{
            background: "linear-gradient(135deg, #F0ECFF 0%, #EDE9FE 35%, #FDF4E7 100%)",
          }}
        >
          {greeting}
          {searchAndChips}
        </div>

        <div className="relative w-full rounded-[28px] overflow-hidden" style={{ minHeight: "170px" }}>
          <Image
            src="/images/india-gate.png"
            alt="India Gate at sunset"
            fill
            className="object-cover object-center"
            quality={75}
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(26,19,64,0.65) 0%, rgba(26,19,64,0.05) 55%, transparent 75%)",
            }}
            aria-hidden="true"
          />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white font-semibold text-sm leading-snug drop-shadow-sm">
              One Nation. One Service. One{" "}
              <span
                className="font-bold"
                style={{
                  background: "linear-gradient(135deg, #C4B5FD, #F0ABFC)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                JanMitra.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Desktop layout (lg+): unchanged blended overlay design ── */}
      <section
        className="hidden lg:block relative w-full rounded-[28px] overflow-hidden"
        style={{ minHeight: "320px" }}
        aria-label="JanMitra AI search and welcome section"
      >
        {/* Base gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(130deg, #F0ECFF 0%, #EDE9FE 18%, #EEE8FF 35%, #F3EEFF 50%, #FDF4E7 75%, #FFF8ED 100%)",
          }}
          aria-hidden="true"
        />

        {/* India Gate image — masked to blend from right */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, transparent 28%, rgba(0,0,0,0.08) 37%, rgba(0,0,0,0.3) 46%, rgba(0,0,0,0.65) 56%, rgba(0,0,0,0.88) 68%, black 80%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, transparent 28%, rgba(0,0,0,0.08) 37%, rgba(0,0,0,0.3) 46%, rgba(0,0,0,0.65) 56%, rgba(0,0,0,0.88) 68%, black 80%)",
          }}
        >
          <Image
            src="/images/india-gate.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
            quality={90}
            sizes="(max-width: 1400px) 100vw, 1400px"
          />
        </div>

        {/* Left content protection — ensures text is always readable */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(240,236,255,0.96) 0%, rgba(240,236,255,0.93) 25%, rgba(240,236,255,0.75) 40%, rgba(240,236,255,0.3) 55%, transparent 68%)",
          }}
          aria-hidden="true"
        />

        {/* Tagline — top right */}
        <div className="absolute right-8 top-8 text-right hidden lg:block" aria-hidden="true">
          <p className="text-[#1E1340] font-semibold text-base leading-snug drop-shadow-sm">
            One Nation.
          </p>
          <p className="text-[#1E1340] font-semibold text-base leading-snug drop-shadow-sm">
            One Service.
          </p>
          <p className="text-base leading-snug font-semibold drop-shadow-sm">
            One{" "}
            <span
              className="font-bold"
              style={{
                background: "linear-gradient(135deg, #6B3FFF, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              JanMitra.
            </span>
          </p>
        </div>

        {/* Main content */}
        <div className="relative z-10 px-10 py-10" style={{ maxWidth: "62%" }}>
          {greeting}
          {searchAndChips}
        </div>
      </section>
    </>
  );
}
