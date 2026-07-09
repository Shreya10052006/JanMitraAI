"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Bot,
  Building2,
  AlertTriangle,
  FileText,
  Gift,
  BookOpen,
  User,
  Headphones,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { AccessibilityPanel } from "@/components/dashboard/AccessibilityPanel";
import { NAV_ITEMS } from "@/lib/mock-data";
import { useLanguage } from "@/hooks/useLanguage";
import type { TranslationKey } from "@/lib/i18n/translations";

const ICON_MAP = {
  Home,
  Bot,
  Building2,
  AlertTriangle,
  FileText,
  Gift,
  BookOpen,
  User,
} as const;

type IconName = keyof typeof ICON_MAP;

const NAV_KEY_MAP: Record<string, TranslationKey> = {
  home: "nav.home",
  "ai-assistant": "nav.aiAssistant",
  services: "nav.services",
  complaints: "nav.complaints",
  documents: "nav.documents",
  schemes: "nav.schemes",
  resources: "nav.resources",
  profile: "nav.profile",
};

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <aside
      className="hidden lg:flex fixed left-0 top-0 bottom-0 flex-col z-40"
      style={{ width: "256px", background: "#0F1117" }}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="flex items-center gap-4 px-6 py-8 border-b border-white/[0.08]">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
          style={{
            background: "linear-gradient(135deg, #6B3FFF, #8B5CF6)",
            boxShadow: "0 4px 12px rgba(107,63,255,0.4)",
          }}
          aria-hidden="true"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3.5" fill="white" />
            <path
              d="M12 2.5 L13.5 7.5 L12 6 L10.5 7.5 Z"
              fill="white"
              opacity="0.75"
            />
            <path
              d="M12 21.5 L13.5 16.5 L12 18 L10.5 16.5 Z"
              fill="white"
              opacity="0.75"
            />
            <path
              d="M2.5 12 L7.5 10.5 L6 12 L7.5 13.5 Z"
              fill="white"
              opacity="0.75"
            />
            <path
              d="M21.5 12 L16.5 10.5 L18 12 L16.5 13.5 Z"
              fill="white"
              opacity="0.75"
            />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-white font-bold text-[13.5px] leading-tight tracking-tight">
            JanMitra AI
          </p>
          <p className="text-[#64748B] text-[10.5px] leading-tight mt-2">
            Your Civic Companion
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 pt-8 pb-4 overflow-y-auto"
        aria-label="Navigation links"
      >
        <ul className="space-y-2 px-6" role="list">
          {NAV_ITEMS.map((item) => {
            const IconComponent = ICON_MAP[item.icon as IconName];
            const isActive = pathname === item.href;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 px-4 py-4 rounded-xl text-[13px] font-medium transition-all duration-200 group",
                    isActive
                      ? "text-white"
                      : "text-[#94A3B8] hover:text-white hover:bg-white/[0.07]"
                  )}
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(to right, #6B3FFF, #8B5CF6)",
                          boxShadow: "0 2px 12px rgba(107,63,255,0.3)",
                        }
                      : {}
                  }
                  aria-current={isActive ? "page" : undefined}
                >
                  {IconComponent && (
                    <IconComponent
                      size={17}
                      className={cn(
                        "flex-shrink-0",
                        isActive
                          ? "text-white"
                          : "text-[#4B5563] group-hover:text-white"
                      )}
                      aria-hidden="true"
                    />
                  )}
                  <span>{NAV_KEY_MAP[item.id] ? t(NAV_KEY_MAP[item.id]) : item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom: Accessibility + Help */}
      <div className="px-6 pb-6 border-t border-white/[0.08] pt-8">
        <AccessibilityPanel />
        <Link
          href="/help"
          className="flex items-center gap-4 px-4 py-4 rounded-xl text-[13px] font-medium text-[#94A3B8] hover:text-white hover:bg-white/[0.07] transition-all duration-200 mt-4"
          aria-label="Get help and support"
        >
          <Headphones
            size={17}
            className="flex-shrink-0 text-[#4B5563]"
            aria-hidden="true"
          />
          <span>{t("common.needHelp")}</span>
        </Link>
      </div>
    </aside>
  );
}
