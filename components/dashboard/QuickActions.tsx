"use client";

import Link from "next/link";
import {
  Bot,
  Building2,
  AlertTriangle,
  ClipboardList,
  Gift,
  Globe,
  ArrowRight,
} from "lucide-react";
import { QUICK_ACTIONS } from "@/lib/mock-data";
import { cn } from "@/utils/cn";
import { useLanguage } from "@/hooks/useLanguage";
import { getDashboardContent } from "@/lib/i18n/content/dashboard";

const ICON_MAP = {
  Bot,
  Building2,
  AlertTriangle,
  ClipboardList,
  Gift,
  Globe,
} as const;

type IconName = keyof typeof ICON_MAP;

export function QuickActions() {
  const { t, currentLanguage } = useLanguage();
  const content = getDashboardContent(currentLanguage.code);
  return (
    <section aria-labelledby="quick-actions-heading">
      <div className="flex items-center justify-between mb-4 lg:mb-6 gap-2">
        <h2
          id="quick-actions-heading"
          className="text-sm sm:text-[15px] font-semibold text-[#1A1340]"
        >
          {t("home.whatToDoToday")}
        </h2>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6"
        role="list"
        aria-label="Quick action cards"
      >
        {QUICK_ACTIONS.map((action) => {
          const IconComponent = ICON_MAP[action.icon as IconName];
          const text = content.quickActions[action.id] ?? action;
          return (
            <Link
              key={action.id}
              href={action.href}
              role="listitem"
              className={cn(
                "group flex flex-col justify-between h-full p-6 rounded-[20px] bg-white border border-transparent cursor-pointer",
                "hover:border-[#E8E4F8] hover:shadow-lg hover:shadow-purple-100/60 hover:-translate-y-[3px]",
                "transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#6B3FFF] focus-visible:ring-offset-2"
              )}
              aria-label={`${text.label}: ${text.description}`}
            >
              <div>
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: action.bgColor }}
                  aria-hidden="true"
                >
                  {IconComponent && (
                    <IconComponent size={20} style={{ color: action.color }} />
                  )}
                </div>

                {/* Label */}
                <h3 className="font-semibold text-[13px] text-[#1A1340] mb-2 leading-tight">
                  {text.label}
                </h3>

                {/* Description */}
                <p className="text-[11.5px] text-[#6B7280] leading-relaxed">
                  {text.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="mt-4">
                <ArrowRight
                  size={15}
                  style={{ color: action.color }}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
