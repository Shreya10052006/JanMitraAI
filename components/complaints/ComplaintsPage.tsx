"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { cn } from "@/utils/cn";
import { ReportIssueTab } from "./ReportIssueTab";
import { MyComplaintsTab } from "./MyComplaintsTab";
import { TrackComplaintTab } from "./TrackComplaintTab";
import type { StoredComplaint } from "@/services/storage";

const TABS = [
  { id: "report", label: "Report an Issue" },
  { id: "my", label: "My Complaints" },
  { id: "track", label: "Track Complaint" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ComplaintsPage() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as TabId) ?? "report";
  const [activeTab, setActiveTab] = useState<TabId>(
    TABS.some((t) => t.id === initialTab) ? initialTab : "report"
  );
  const [trackComplaint, setTrackComplaint] = useState<StoredComplaint | undefined>(undefined);

  // Sync active tab with URL search param changes (e.g. navigating via link)
  useEffect(() => {
    const tab = searchParams.get("tab") as TabId;
    if (tab && TABS.some((t) => t.id === tab)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(tab);
    }
  }, [searchParams]);

  function handleTrack(complaint?: StoredComplaint) {
    setTrackComplaint(complaint);
    setActiveTab("track");
  }

  return (
    <div className="overflow-y-auto h-full" id="main-content">
      <div className="px-10 py-8 space-y-12 max-w-[1600px] mx-auto">
        {/* Hero */}
        <div className="relative rounded-[28px] overflow-hidden" style={{ minHeight: "140px" }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#F5F3FF,#EDE9FE 25%,#FFF7ED 70%,#FFFBEB)" }} aria-hidden="true" />
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              WebkitMaskImage: "linear-gradient(to right,transparent 40%,rgba(0,0,0,0.5) 58%,black 80%)",
              maskImage: "linear-gradient(to right,transparent 40%,rgba(0,0,0,0.5) 58%,black 80%)",
            }}
          >
            <Image src="/images/india-gate.png" alt="" fill className="object-cover object-right-bottom" quality={75} sizes="1200px" />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right,rgba(245,243,255,0.97) 0%,rgba(245,243,255,0.88) 38%,transparent 65%)" }} aria-hidden="true" />

          <div className="relative z-10 px-8 py-8">
            <h1 className="text-2xl font-bold text-[#1A1340]">Complaints</h1>
            <p className="text-sm text-[#6B7280] mt-2">Report issues in your area and help build a better community</p>

            {/* Tab nav inside hero */}
            <div className="flex items-center gap-0 mt-6" role="tablist" aria-label="Complaints sections">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200 mr-2",
                    activeTab === tab.id
                      ? "border-[#6B3FFF] text-[#6B3FFF]"
                      : "border-transparent text-[#6B7280] hover:text-[#1A1340]"
                  )}
                  aria-controls={`tabpanel-${tab.id}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab content */}
        <div id={`tabpanel-${activeTab}`} role="tabpanel" aria-label={TABS.find((t) => t.id === activeTab)?.label}>
          {activeTab === "report" && <ReportIssueTab onViewComplaints={() => setActiveTab("my")} />}
          {activeTab === "my" && <MyComplaintsTab onTrack={handleTrack} />}
          {activeTab === "track" && <TrackComplaintTab preSelectedComplaint={trackComplaint} />}
        </div>

        {/* Footer trust bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" role="list">
          {[
            { icon: "🔄", label: "Track in Real-time", sub: "Get updates at every step" },
            { icon: "📋", label: "Transparent Process", sub: "Know where your issue stands" },
            { icon: "⚡", label: "Faster Resolution", sub: "AI ensures quick routing" },
            { icon: "🤝", label: "Better Communities", sub: "Together, we make change" },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-[#E8E4F8] px-6 py-4 flex items-center gap-4" role="listitem">
              <span className="text-xl" aria-hidden="true">{item.icon}</span>
              <div>
                <p className="text-xs font-semibold text-[#1A1340]">{item.label}</p>
                <p className="text-[10px] text-[#9CA3AF]">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
