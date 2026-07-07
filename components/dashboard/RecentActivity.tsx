"use client";

import Link from "next/link";
import { FileText, AlertTriangle, Gift, ChevronRight } from "lucide-react";
import { RECENT_ITEMS } from "@/lib/mock-data";
import { cn, getStatusColorClass } from "@/utils/cn";

const ICON_MAP = {
  FileText,
  AlertTriangle,
  Gift,
} as const;

type IconName = keyof typeof ICON_MAP;

const ICON_STYLE_MAP: Record<string, { bg: string; color: string }> = {
  FileText: { bg: "#EDE9FE", color: "#6B3FFF" },
  AlertTriangle: { bg: "#FEF3C7", color: "#D97706" },
  Gift: { bg: "#FCE7F3", color: "#DB2777" },
};

export function RecentActivity() {
  return (
    <section
      className="bg-white rounded-[20px] border border-[#EAE8F5] overflow-hidden"
      aria-labelledby="recent-activity-heading"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6 border-b border-[#F5F3FF]">
        <h2
          id="recent-activity-heading"
          className="font-semibold text-[13.5px] text-[#1A1340]"
        >
          Continue where you left off
        </h2>
        <Link
          href="/activity"
          className="text-xs font-semibold text-[#6B3FFF] hover:text-[#4C1D95] transition-colors duration-200"
          aria-label="View all recent activity"
        >
          View All
        </Link>
      </div>

      {/* Items */}
      <ul className="divide-y divide-[#FAFAFA]" role="list">
        {RECENT_ITEMS.map((item) => {
          const IconComponent = ICON_MAP[item.icon as IconName];
          const iconStyle = ICON_STYLE_MAP[item.icon];
          const statusColor = getStatusColorClass(item.statusColor);

          return (
            <li key={item.id}>
              <Link
                href={item.href}
                className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3.5 sm:py-4 hover:bg-[#FAFAFA] transition-colors duration-200 group"
                aria-label={`${item.title} — ${item.subtitle} — Status: ${item.status} — Date: ${item.date}`}
              >
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={
                    iconStyle
                      ? { backgroundColor: iconStyle.bg }
                      : { backgroundColor: "#F3F0FF" }
                  }
                  aria-hidden="true"
                >
                  {IconComponent && (
                    <IconComponent
                      size={17}
                      style={
                        iconStyle ? { color: iconStyle.color } : undefined
                      }
                    />
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#1A1340] leading-tight truncate">
                    {item.title}
                  </p>
                  <p className="text-[11.5px] text-[#9CA3AF] mt-1.5 sm:mt-2 truncate">
                    {item.subtitle}
                  </p>
                  {/* Status + Date — stacked below on mobile */}
                  <div className="flex items-center gap-2 mt-1.5 sm:hidden">
                    <span className={cn("text-[11px] font-semibold", statusColor)}>
                      {item.status}
                    </span>
                    <span className="text-[10px] text-[#B0B0B8]">· {item.date}</span>
                  </div>
                </div>

                {/* Status + Date — side column from sm+ */}
                <div className="hidden sm:flex flex-col items-end flex-shrink-0 gap-2">
                  <span className={cn("text-[11.5px] font-semibold", statusColor)}>
                    {item.status}
                  </span>
                  <span className="text-[11px] text-[#B0B0B8]">{item.date}</span>
                </div>

                {/* Arrow */}
                <ChevronRight
                  size={15}
                  className="text-[#D1D5DB] group-hover:text-[#6B3FFF] flex-shrink-0 transition-colors duration-200 ml-1 sm:ml-2"
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
