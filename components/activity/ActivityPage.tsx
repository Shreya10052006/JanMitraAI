"use client";

import Link from "next/link";
import {
  FileText, AlertTriangle, Gift, MessageSquare, FolderOpen, ChevronRight, Inbox,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { getRecentActivity } from "@/services/storage";
import { useLanguage } from "@/hooks/useLanguage";

const TYPE_ICON = {
  complaint: AlertTriangle,
  service: FileText,
  scheme: Gift,
  document: FolderOpen,
  chat: MessageSquare,
} as const;

const TYPE_STYLE: Record<string, { bg: string; color: string }> = {
  complaint: { bg: "#FEF3C7", color: "#D97706" },
  service: { bg: "#EDE9FE", color: "#6B3FFF" },
  scheme: { bg: "#FCE7F3", color: "#DB2777" },
  document: { bg: "#DBEAFE", color: "#3B82F6" },
  chat: { bg: "#D1FAE5", color: "#10B981" },
};

export default function ActivityPage() {
  const { t } = useLanguage();
  const activity = getRecentActivity();

  return (
    <div className="overflow-y-auto h-full" id="main-content">
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 lg:py-8 max-w-[1000px] mx-auto">
        <PageHero title="Recent Activity" subtitle="Every interaction you've had with JanMitra AI, newest first." />

        {activity.length === 0 ? (
          <div className="bg-white rounded-[20px] border border-[#E8E4F8] p-10 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#EDE9FE] flex items-center justify-center mb-4" aria-hidden="true">
              <Inbox size={24} className="text-[#6B3FFF]" />
            </div>
            <h2 className="text-sm font-bold text-[#1A1340] mb-2">No activity yet</h2>
            <p className="text-xs text-[#9CA3AF] max-w-xs mb-6">
              As you report complaints, browse services, or chat with JanMitra AI, your activity will show up here.
            </p>
            <Link
              href="/"
              className="px-5 py-3 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all"
              style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
            >
              {t("common.backToHome")}
            </Link>
          </div>
        ) : (
          <ul className="bg-white rounded-[20px] border border-[#E8E4F8] divide-y divide-[#F9F8FF]" role="list">
            {activity.map((item, i) => {
              const Icon = TYPE_ICON[item.type] ?? FileText;
              const style = TYPE_STYLE[item.type] ?? TYPE_STYLE.service;
              return (
                <li key={`${item.href}-${i}`}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-[#FAFAFA] transition-colors duration-200 group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: style.bg }}
                      aria-hidden="true"
                    >
                      <Icon size={18} style={{ color: style.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1A1340] truncate">{item.title}</p>
                      <p className="text-xs text-[#9CA3AF] mt-1">
                        {new Date(item.timestamp).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] flex-shrink-0 transition-colors" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
