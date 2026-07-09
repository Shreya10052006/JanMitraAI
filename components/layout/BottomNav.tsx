"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bot, Building2, AlertTriangle, User } from "lucide-react";
import { cn } from "@/utils/cn";
import { useLanguage } from "@/hooks/useLanguage";
import type { TranslationKey } from "@/lib/i18n/translations";

const BOTTOM_NAV_ITEMS: {
  id: string;
  label: string;
  labelKey: TranslationKey | null;
  href: string;
  icon: typeof Home;
}[] = [
  { id: "home", label: "Home", labelKey: "nav.home", href: "/", icon: Home },
  { id: "ai-assistant", label: "AI", labelKey: null, href: "/ai-assistant", icon: Bot },
  { id: "services", label: "Services", labelKey: "nav.services", href: "/services", icon: Building2 },
  { id: "complaints", label: "Complaints", labelKey: "nav.complaints", href: "/complaints", icon: AlertTriangle },
  { id: "profile", label: "Profile", labelKey: "nav.profile", href: "/profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav
      className="flex md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#EAE8F5] pb-[env(safe-area-inset-bottom)]"
      role="navigation"
      aria-label="Primary"
    >
      <ul className="flex items-stretch w-full" role="list">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <li key={item.id} className="flex-1">
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] transition-colors",
                  isActive ? "text-[#6B3FFF]" : "text-[#9CA3AF] active:text-[#6B3FFF]"
                )}
                aria-current={isActive ? "page" : undefined}
                aria-label={item.labelKey ? t(item.labelKey) : item.label}
              >
                <Icon size={22} strokeWidth={isActive ? 2.25 : 2} aria-hidden="true" />
                <span className={cn("text-[10px] leading-none", isActive ? "font-semibold" : "font-medium")}>
                  {item.labelKey ? t(item.labelKey) : item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
