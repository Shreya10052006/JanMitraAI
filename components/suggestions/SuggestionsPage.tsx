"use client";

import Link from "next/link";
import { Leaf, Shield, FileText, Building2, ChevronRight, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { AI_SUGGESTIONS } from "@/lib/mock-data";
import { useLanguage } from "@/hooks/useLanguage";
import { getDashboardContent } from "@/lib/i18n/content/dashboard";

const ICON_MAP = {
  Leaf,
  Shield,
  FileText,
  Building2,
} as const;

type IconName = keyof typeof ICON_MAP;

export default function SuggestionsPage() {
  const { currentLanguage } = useLanguage();
  const content = getDashboardContent(currentLanguage.code);
  return (
    <div className="overflow-y-auto h-full" id="main-content">
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 lg:py-8 max-w-[1000px] mx-auto">
        <PageHero title="AI Suggestions" subtitle="Personalized recommendations from JanMitra AI, based on your profile and activity." />

        <ul className="bg-white rounded-[20px] border border-[#E8E4F8] divide-y divide-[#F9F8FF]" role="list">
          {AI_SUGGESTIONS.map((suggestion) => {
            const IconComponent = ICON_MAP[suggestion.icon as IconName];
            const text = content.aiSuggestions[suggestion.id] ?? suggestion;
            return (
              <li key={suggestion.id}>
                <Link
                  href={suggestion.href}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-[#FAFAFA] transition-colors duration-200 group"
                  aria-label={`${text.title}: ${text.description}`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: suggestion.iconBg }}
                    aria-hidden="true"
                  >
                    {IconComponent && <IconComponent size={18} className="text-[#374151]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1A1340]">{text.title}</p>
                    <p className="text-xs text-[#9CA3AF] mt-1">{text.description}</p>
                  </div>
                  <ChevronRight size={16} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] flex-shrink-0 transition-colors" aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 bg-[#F3F0FF] rounded-[20px] border border-[#E8E4F8] px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-10 h-10 rounded-xl bg-[#6B3FFF] flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1A1340]">Want more tailored suggestions?</p>
              <p className="text-xs text-[#6B7280]">Tell JanMitra AI more about your needs for better recommendations.</p>
            </div>
          </div>
          <Link
            href="/ai-assistant"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
          >
            Chat with AI <ChevronRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
