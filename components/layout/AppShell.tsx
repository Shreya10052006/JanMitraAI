"use client";

import { useState, type ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { MobileTopBar } from "@/components/layout/MobileTopBar";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { BottomNav } from "@/components/layout/BottomNav";

export function AppShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#F8F7FF" }}>
      <Sidebar />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="flex flex-col flex-1 min-w-0 lg:ml-[256px]">
        <TopBar />
        <MobileTopBar onMenuClick={() => setDrawerOpen(true)} />

        <div className="flex-1 overflow-y-auto mt-16 lg:mt-[80px] pb-20 md:pb-0">
          {children}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
