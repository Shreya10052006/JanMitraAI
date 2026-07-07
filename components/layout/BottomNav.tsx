"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bot, Building2, AlertTriangle, User } from "lucide-react";
import { cn } from "@/utils/cn";

const BOTTOM_NAV_ITEMS = [
  { id: "home", label: "Home", href: "/", icon: Home },
  { id: "ai-assistant", label: "AI", href: "/ai-assistant", icon: Bot },
  { id: "services", label: "Services", href: "/services", icon: Building2 },
  { id: "complaints", label: "Complaints", href: "/complaints", icon: AlertTriangle },
  { id: "profile", label: "Profile", href: "/profile", icon: User },
] as const;

export function BottomNav() {
  const pathname = usePathname();

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
                aria-label={item.label}
              >
                <Icon size={22} strokeWidth={isActive ? 2.25 : 2} aria-hidden="true" />
                <span className={cn("text-[10px] leading-none", isActive ? "font-semibold" : "font-medium")}>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
