"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { useLanguage } from "@/hooks/useLanguage";
import { getSettingsContent } from "@/lib/i18n/content/settings";
import { cn } from "@/utils/cn";

export default function LanguageSettingsPage() {
  const { currentLanguage, setLanguage, languages, t } = useLanguage();
  const content = getSettingsContent(currentLanguage.code);
  const [justSaved, setJustSaved] = useState(false);

  function handleSelect(code: string) {
    const lang = languages.find((l) => l.code === code);
    if (!lang) return;
    setLanguage(lang);
    setJustSaved(true);
    window.setTimeout(() => setJustSaved(false), 2000);
  }

  return (
    <div className="overflow-y-auto h-full" id="main-content">
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 lg:py-8 max-w-[800px] mx-auto">
        <Link
          href="/settings"
          className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#6B3FFF] transition-colors duration-200 mb-6"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {t("topbar.settings")}
        </Link>

        <PageHero title={t("topbar.language")} subtitle={content.languagePageSubtitle} />

        {justSaved && (
          <div className="mb-6 flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 border border-green-100 text-sm text-green-700" role="status">
            <Check size={15} aria-hidden="true" /> {content.languageUpdatedTo} {currentLanguage.label}
          </div>
        )}

        <div className="bg-white rounded-[20px] border border-[#E8E4F8] p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {languages.map((lang) => {
              const active = lang.code === currentLanguage.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  aria-pressed={active}
                  className={cn(
                    "flex items-center justify-between gap-3 px-4 py-4 rounded-xl text-left transition-colors duration-150 border",
                    active
                      ? "bg-[#F3F0FF] border-[#6B3FFF]/40"
                      : "border-transparent hover:bg-[#F9F8FF]"
                  )}
                >
                  <div>
                    <p className={cn("text-sm font-semibold", active ? "text-[#6B3FFF]" : "text-[#1A1340]")}>{lang.label}</p>
                    <p className="text-xs text-[#9CA3AF]">{lang.nativeLabel}</p>
                  </div>
                  {active && <Check size={16} className="text-[#6B3FFF] flex-shrink-0" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
