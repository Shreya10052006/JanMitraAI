"use client";

import { useState } from "react";
import { Search, ChevronRight, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/utils/cn";
import { useComplaints } from "@/hooks/useComplaints";
import type { ComplaintStatus } from "@/types";
import type { StoredComplaint } from "@/services/storage";

const STATUS_LABELS: Record<ComplaintStatus, string> = {
  submitted: "Submitted",
  under_review: "Under Review",
  assigned: "Assigned",
  in_progress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
};

const STATUS_ICON: Record<ComplaintStatus, string> = {
  submitted: "📋",
  under_review: "🔍",
  assigned: "👷",
  in_progress: "🔧",
  resolved: "✅",
  closed: "🔒",
};

const STATUS_COLOR: Record<ComplaintStatus, { dot: string; text: string; bg: string }> = {
  submitted: { dot: "bg-blue-500", text: "text-blue-600", bg: "bg-blue-50" },
  under_review: { dot: "bg-orange-400", text: "text-orange-600", bg: "bg-orange-50" },
  assigned: { dot: "bg-green-500", text: "text-green-600", bg: "bg-green-50" },
  in_progress: { dot: "bg-blue-500", text: "text-blue-600", bg: "bg-blue-50" },
  resolved: { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
  closed: { dot: "bg-gray-400", text: "text-gray-600", bg: "bg-gray-50" },
};

const STEP_STATUSES: ComplaintStatus[] = ["submitted", "under_review", "assigned", "in_progress", "resolved"];

interface TrackComplaintTabProps {
  preSelectedComplaint?: StoredComplaint;
}

export function TrackComplaintTab({ preSelectedComplaint }: TrackComplaintTabProps) {
  const { findComplaint } = useComplaints();
  const [inputId, setInputId] = useState(preSelectedComplaint?.ticketId ?? "");
  const [currentComplaint, setCurrentComplaint] = useState<StoredComplaint | undefined>(preSelectedComplaint);
  const [notFound, setNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  function handleTrack() {
    const trimmed = inputId.trim();
    if (!trimmed) return;

    setIsSearching(true);
    setNotFound(false);

    // Small delay to show loading state
    setTimeout(() => {
      const found = findComplaint(trimmed);
      if (found) {
        setCurrentComplaint(found);
        setNotFound(false);
      } else {
        setCurrentComplaint(undefined);
        setNotFound(true);
      }
      setIsSearching(false);
    }, 600);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleTrack();
  }

  const c = currentComplaint;
  const currentStepIndex = c ? STEP_STATUSES.indexOf(c.status) : -1;
  const resolvedPercentage = c ? Math.round(((currentStepIndex + 1) / STEP_STATUSES.length) * 100) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
      {/* ── Main track panel ── */}
      <div className="space-y-5">
        {/* Search */}
        <div className="bg-white rounded-[20px] border border-[#E8E4F8] p-5">
          <h2 className="text-base font-bold text-[#1A1340] mb-1">Track Your Complaint</h2>
          <p className="text-xs text-[#6B7280] mb-4">Enter your complaint ID to track real-time status and timeline</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 border border-[#E8E4F8] rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#6B3FFF]/20 focus-within:border-[#6B3FFF]/40 transition-all">
              <Search size={15} className="text-[#9CA3AF] flex-shrink-0" aria-hidden="true" />
              <input
                type="text"
                value={inputId}
                onChange={(e) => { setInputId(e.target.value); setNotFound(false); }}
                onKeyDown={handleKeyDown}
                placeholder="Enter Complaint ID (e.g., CMP-2026-1452)"
                className="flex-1 text-sm text-[#374151] placeholder-[#9CA3AF] bg-transparent outline-none"
                aria-label="Enter complaint ID to track"
              />
            </div>
            <button
              onClick={handleTrack}
              disabled={!inputId.trim() || isSearching}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
              aria-label="Track complaint"
            >
              {isSearching ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
              ) : (
                <Search size={15} aria-hidden="true" />
              )}
              Track
            </button>
          </div>

          {/* Not found error */}
          {notFound && (
            <div className="mt-3 flex items-center gap-2 text-xs text-red-600 bg-red-50 rounded-xl px-3 py-2.5 border border-red-100">
              <AlertCircle size={13} aria-hidden="true" />
              Complaint ID &ldquo;{inputId}&rdquo; not found. Please check the ID and try again.
            </div>
          )}
        </div>

        {/* Complaint Details */}
        {c && (
          <>
            {/* Complaint summary card */}
            <div className="bg-white rounded-[20px] border border-[#E8E4F8] p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl" aria-hidden="true">
                      {STATUS_ICON[c.status]}
                    </span>
                    <p className="text-lg font-bold text-[#6B3FFF]">#{c.ticketId}</p>
                  </div>
                  <h3 className="text-base font-bold text-[#1A1340]">{c.title}</h3>
                </div>
                <span className={cn("px-3 py-1.5 rounded-full text-xs font-semibold", STATUS_COLOR[c.status].text, STATUS_COLOR[c.status].bg)}>
                  {STATUS_LABELS[c.status]}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-[#374151]">Resolution Progress</span>
                  <span className="text-xs font-bold text-[#6B3FFF]">{resolvedPercentage}%</span>
                </div>
                <div className="h-2 bg-[#F3F0FF] rounded-full overflow-hidden" role="progressbar" aria-valuenow={resolvedPercentage} aria-valuemin={0} aria-valuemax={100} aria-label={`Resolution progress: ${resolvedPercentage}%`}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${resolvedPercentage}%`, background: "linear-gradient(90deg,#6B3FFF,#8B5CF6)" }}
                  />
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Category", value: c.category },
                  { label: "Priority", value: c.priority.charAt(0).toUpperCase() + c.priority.slice(1) },
                  { label: "Submitted", value: c.createdAt },
                  { label: "Last Updated", value: c.updatedAt },
                  { label: "Location", value: c.location, fullWidth: true },
                  ...(c.assignedTo ? [{ label: "Assigned To", value: c.assignedTo, fullWidth: true }] : []),
                  ...(c.department ? [{ label: "Department", value: c.department, fullWidth: true }] : []),
                ].map(({ label, value, fullWidth }) => (
                  <div key={label} className={cn("bg-[#F9F8FF] rounded-xl p-3", fullWidth && "col-span-2")}>
                    <p className="text-[10px] text-[#9CA3AF]">{label}</p>
                    <p className="text-xs font-semibold text-[#1A1340] mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-[20px] border border-[#E8E4F8] p-5">
              <h3 className="text-sm font-bold text-[#1A1340] mb-4">Complaint Timeline</h3>
              <ol className="relative space-y-4 ml-2" aria-label="Complaint timeline">
                {c.timeline.map((event, idx) => {
                  const isCompleted = true; // All timeline events in our model are completed
                  const isCurrent = idx === c.timeline.length - 1;
                  return (
                    <li key={event.id} className="flex items-start gap-3 relative pl-6">
                      {/* Connector line */}
                      {idx < c.timeline.length - 1 && (
                        <div className="absolute left-[7px] top-5 bottom-0 w-px bg-[#EDE9FE]" aria-hidden="true" />
                      )}
                      {/* Dot */}
                      <div
                        className={cn(
                          "absolute left-0 w-3.5 h-3.5 rounded-full border-2 mt-0.5 flex items-center justify-center flex-shrink-0",
                          isCompleted ? "border-[#6B3FFF] bg-[#6B3FFF]" : "border-[#D1D5DB] bg-white"
                        )}
                        aria-hidden="true"
                      >
                        {isCompleted && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div className={cn("flex-1 pb-1", isCurrent && "")}>
                        <div className="flex items-center justify-between gap-2">
                          <p className={cn("text-sm font-semibold", isCurrent ? "text-[#6B3FFF]" : "text-[#1A1340]")}>
                            {event.label}
                            {isCurrent && (
                              <span className="ml-2 px-1.5 py-0.5 text-[9px] font-bold bg-[#6B3FFF] text-white rounded-full">Current</span>
                            )}
                          </p>
                          <span className="text-[10px] text-[#9CA3AF] whitespace-nowrap flex items-center gap-1 flex-shrink-0">
                            <Clock size={9} aria-hidden="true" /> {event.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">{event.description}</p>
                      </div>
                    </li>
                  );
                })}

                {/* Upcoming steps */}
                {c.status !== "resolved" && c.status !== "closed" && (
                  <li className="flex items-start gap-3 relative pl-6 opacity-40">
                    <div className="absolute left-0 w-3.5 h-3.5 rounded-full border-2 border-dashed border-[#D1D5DB] bg-white mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-[#9CA3AF]">Resolved</p>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">Issue will be marked resolved when fixed</p>
                    </div>
                  </li>
                )}
              </ol>

              {c.status === "resolved" && (
                <div className="mt-4 flex items-center gap-2 bg-green-50 rounded-xl px-4 py-3 border border-green-100">
                  <CheckCircle2 size={16} className="text-[#10B981]" aria-hidden="true" />
                  <p className="text-xs font-semibold text-[#10B981]">Your complaint has been successfully resolved!</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Empty state */}
        {!c && !notFound && (
          <div className="bg-white rounded-[20px] border border-[#E8E4F8] p-10 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#EDE9FE] flex items-center justify-center mb-3" aria-hidden="true">
              <Search size={24} className="text-[#6B3FFF]" />
            </div>
            <h3 className="text-sm font-bold text-[#1A1340] mb-1">Track Your Complaint</h3>
            <p className="text-xs text-[#9CA3AF] max-w-[240px]">Enter your Complaint ID above to see real-time status and timeline.</p>
            <p className="text-[10px] text-[#9CA3AF] mt-2">Try: CMP-2026-1452</p>
          </div>
        )}
      </div>

      {/* ── Right sidebar ── */}
      <aside className="space-y-5" aria-label="Track complaint sidebar">
        {/* Status guide */}
        <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-4" aria-labelledby="status-guide-heading">
          <h2 id="status-guide-heading" className="text-sm font-semibold text-[#1A1340] mb-3">Status Guide</h2>
          <div className="space-y-3">
            {STEP_STATUSES.map((status) => (
              <div key={status} className="flex items-start gap-2.5">
                <div className={cn("w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1", STATUS_COLOR[status].dot)} aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-[#1A1340]">{STATUS_LABELS[status]}</p>
                  <p className="text-[10px] text-[#9CA3AF] mt-0.5 leading-relaxed">
                    {status === "submitted" && "Complaint received and registered in the system"}
                    {status === "under_review" && "Being reviewed by the concerned department"}
                    {status === "assigned" && "An officer/engineer has been assigned"}
                    {status === "in_progress" && "Active work is being done to resolve the issue"}
                    {status === "resolved" && "Issue has been fixed and complaint is closed"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="bg-[#F9F8FF] rounded-[20px] border border-[#E8E4F8] p-4" aria-labelledby="tips-heading">
          <h2 id="tips-heading" className="text-sm font-semibold text-[#1A1340] mb-3">💡 Tips for Faster Resolution</h2>
          <ul className="space-y-2">
            {[
              "Add multiple photos for better visibility",
              "Mention the exact location/landmark",
              "Include how long the issue has persisted",
              "Note peak hours when it's most problematic",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-xs text-[#374151]">
                <ChevronRight size={13} className="text-[#6B3FFF] flex-shrink-0 mt-0.5" aria-hidden="true" />
                {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* Need more help */}
        <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-4" aria-labelledby="needhelp-heading">
          <h2 id="needhelp-heading" className="text-sm font-semibold text-[#1A1340] mb-1">Need More Help?</h2>
          <p className="text-xs text-[#6B7280] mb-3">Chat with JanMitra AI for real-time guidance on your complaint.</p>
          <a
            href="/ai-assistant"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white hover:opacity-90 transition-all inline-flex"
            style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
          >
            Chat with AI
            <ChevronRight size={13} aria-hidden="true" />
          </a>
        </section>
      </aside>
    </div>
  );
}
