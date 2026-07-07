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
  LayoutGrid,
} from "lucide-react";
import { QUICK_ACTIONS } from "@/lib/mock-data";
import { cn } from "@/utils/cn";

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
  return (
    <section aria-labelledby="quick-actions-heading">
      <div className="flex items-center justify-between mb-4">
        <h2
          id="quick-actions-heading"
          className="text-[15px] font-semibold text-[#1A1340]"
        >
          What would you like to do today?
        </h2>
        <button
          className="flex items-center gap-1.5 text-sm text-[#9CA3AF] hover:text-[#6B3FFF] transition-colors duration-200"
          aria-label="Customise quick actions layout"
        >
          <span>Customise</span>
          <LayoutGrid size={15} aria-hidden="true" />
        </button>
      </div>

      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        role="list"
        aria-label="Quick action cards"
      >
        {QUICK_ACTIONS.map((action) => {
          const IconComponent = ICON_MAP[action.icon as IconName];
          return (
            <Link
              key={action.id}
              href={action.href}
              role="listitem"
              className={cn(
                "group flex flex-col p-4 rounded-2xl bg-white border border-transparent cursor-pointer",
                "hover:border-[#E8E4F8] hover:shadow-lg hover:shadow-purple-100/60 hover:-translate-y-[3px]",
                "transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#6B3FFF] focus-visible:ring-offset-2"
              )}
              aria-label={`${action.label}: ${action.description}`}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: action.bgColor }}
                aria-hidden="true"
              >
                {IconComponent && (
                  <IconComponent size={20} style={{ color: action.color }} />
                )}
              </div>

              {/* Label */}
              <h3 className="font-semibold text-[13px] text-[#1A1340] mb-1 leading-tight">
                {action.label}
              </h3>

              {/* Description */}
              <p className="text-[11.5px] text-[#6B7280] leading-relaxed flex-1">
                {action.description}
              </p>

              {/* Arrow */}
              <div className="mt-3">
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
