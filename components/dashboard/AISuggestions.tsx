"use client";

import Link from "next/link";
import { Leaf, Shield, FileText, Building2, ChevronRight } from "lucide-react";
import { AI_SUGGESTIONS } from "@/lib/mock-data";

const ICON_MAP = {
  Leaf,
  Shield,
  FileText,
  Building2,
} as const;

type IconName = keyof typeof ICON_MAP;

export function AISuggestions() {
  return (
    <section
      className="bg-white rounded-[20px] border border-[#EAE8F5] overflow-hidden"
      aria-labelledby="ai-suggestions-heading"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#F5F3FF]">
        <h2
          id="ai-suggestions-heading"
          className="font-semibold text-[13.5px] text-[#1A1340]"
        >
          AI Suggestions for You
        </h2>
        <Link
          href="/suggestions"
          className="text-xs font-semibold text-[#6B3FFF] hover:text-[#4C1D95] transition-colors duration-200"
          aria-label="View all AI suggestions"
        >
          View All
        </Link>
      </div>

      {/* Suggestions list */}
      <ul className="divide-y divide-[#FAFAFA]" role="list">
        {AI_SUGGESTIONS.map((suggestion) => {
          const IconComponent = ICON_MAP[suggestion.icon as IconName];
          return (
            <li key={suggestion.id}>
              <Link
                href={suggestion.href}
                className="flex items-center gap-3.5 px-6 py-4 hover:bg-[#FAFAFA] transition-colors duration-200 group"
                aria-label={`${suggestion.title}: ${suggestion.description}`}
              >
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: suggestion.iconBg }}
                  aria-hidden="true"
                >
                  {IconComponent && (
                    <IconComponent
                      size={17}
                      className="text-[#374151]"
                    />
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#1A1340] leading-tight">
                    {suggestion.title}
                  </p>
                  <p className="text-[11.5px] text-[#9CA3AF] mt-0.5">
                    {suggestion.description}
                  </p>
                </div>

                {/* Arrow */}
                <ChevronRight
                  size={15}
                  className="text-[#D1D5DB] group-hover:text-[#6B3FFF] flex-shrink-0 transition-colors duration-200 ml-0.5"
                  aria-hidden="true"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
