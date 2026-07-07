"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, MapPin, Search } from "lucide-react";
import { cn } from "@/utils/cn";
import { useComplaints } from "@/hooks/useComplaints";
import type { ComplaintStatus } from "@/types";
import type { StoredComplaint } from "@/services/storage";

const STATUS_COLORS: Record<ComplaintStatus, string> = {
  submitted: "bg-blue-50 text-blue-600 border-blue-100",
  under_review: "bg-orange-50 text-orange-600 border-orange-100",
  assigned: "bg-green-50 text-green-600 border-green-100",
  in_progress: "bg-blue-50 text-blue-600 border-blue-100",
  resolved: "bg-emerald-50 text-emerald-600 border-emerald-100",
  closed: "bg-gray-50 text-gray-500 border-gray-100",
};

const STATUS_LABELS: Record<ComplaintStatus, string> = {
  submitted: "Submitted",
  under_review: "Under Review",
  assigned: "Assigned",
  in_progress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
};

const CATEGORY_ICONS: Record<string, string> = {
  "Street Lighting": "💡",
  "Roads & Infrastructure": "🚧",
  "Water Supply": "💧",
  "Sanitation & Drainage": "🗑️",
  "Garbage Collection": "🗑️",
  "Public Transport": "🚌",
  "Electricity": "⚡",
  "Parks & Recreation": "🌿",
  "Noise Pollution": "📢",
  "Other": "📋",
};

interface MyComplaintsTabProps {
  onTrack: (complaint?: StoredComplaint) => void;
}

export function MyComplaintsTab({ onTrack }: MyComplaintsTabProps) {
  const { complaints, refreshComplaints } = useComplaints();
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    refreshComplaints();
  }, [refreshComplaints]);

  // Compute stats from real data
  const total = complaints.length;
  const resolved = complaints.filter((c) => c.status === "resolved" || c.status === "closed").length;
  const inProgress = complaints.filter((c) => c.status === "in_progress").length;
  const underReview = complaints.filter((c) => c.status === "under_review" || c.status === "submitted").length;

  const filtered = complaints.filter((c) => {
    const matchStatus =
      statusFilter === "All Status" ||
      STATUS_LABELS[c.status].toLowerCase() === statusFilter.toLowerCase();

    const matchCategory =
      categoryFilter === "All Categories" ||
      c.category === categoryFilter;

    const matchTime = (() => {
      if (timeFilter === "All Time") return true;
      const created = new Date(c.createdAt);
      const now = new Date();
      const diff = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
      if (timeFilter === "This Week") return diff <= 7;
      if (timeFilter === "This Month") return diff <= 30;
      if (timeFilter === "Last Month") return diff > 30 && diff <= 60;
      return true;
    })();

    const matchSearch =
      !search ||
      c.ticketId.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());

    return matchStatus && matchCategory && matchTime && matchSearch;
  });

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  // Donut chart data
  const categoryStats = complaints.reduce<Record<string, number>>((acc, c) => {
    acc[c.category] = (acc[c.category] ?? 0) + 1;
    return acc;
  }, {});

  const DONUT_COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"];
  const donutData = Object.entries(categoryStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([label, count], i) => ({
      label,
      count,
      pct: `${Math.round((count / total) * 100)}%`,
      color: DONUT_COLORS[i],
    }));

  // SVG donut — build paths with an immutable reduce
  const radius = 40;
  const cx = 50;
  const cy = 50;

  function polarToXY(deg: number, r: number) {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  const donutPaths = donutData.reduce<({ d: string } & typeof donutData[number])[]>(
    (acc, seg) => {
      const startAngle = acc.reduce((sum, s) => sum + (s.count / (total || 1)) * 360, 0);
      const slice = (seg.count / (total || 1)) * 360;
      const start = polarToXY(startAngle, radius);
      const end = polarToXY(startAngle + slice, radius);
      const large = slice > 180 ? 1 : 0;
      const d = `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} 1 ${end.x} ${end.y} Z`;
      return [...acc, { ...seg, d }];
    },
    []
  );

  const recentActivity = complaints
    .slice(0, 4)
    .map((c) => ({
      text: `Complaint #${c.ticketId} status: ${STATUS_LABELS[c.status]}`,
      time: c.updatedAt,
      dot: c.status === "resolved" ? "bg-emerald-500" : c.status === "in_progress" ? "bg-blue-500" : "bg-orange-400",
    }));

  const uniqueCategories = [...new Set(complaints.map((c) => c.category))];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-5">
      {/* ── Left: stats + list ── */}
      <div className="space-y-5">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4" role="list">
          {[
            { label: "Total Complaints", value: total.toString(), sub: "All time", icon: "📋", iconBg: "#EDE9FE" },
            { label: "Resolved", value: resolved.toString(), sub: total > 0 ? `${Math.round((resolved / total) * 100)}%` : "0%", icon: "✅", iconBg: "#D1FAE5" },
            { label: "In Progress", value: inProgress.toString(), sub: total > 0 ? `${Math.round((inProgress / total) * 100)}%` : "0%", icon: "🕐", iconBg: "#FEF3C7" },
            { label: "Under Review", value: underReview.toString(), sub: total > 0 ? `${Math.round((underReview / total) * 100)}%` : "0%", icon: "🔍", iconBg: "#DBEAFE" },
            { label: "Avg. Resolution Time", value: "3.2 Days", sub: "This month", icon: "⏱️", iconBg: "#FCE7F3" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-[20px] border border-[#E8E4F8] px-5 py-4 flex items-center gap-3" role="listitem">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: stat.iconBg }} aria-hidden="true">
                {stat.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#9CA3AF] truncate">{stat.label}</p>
                <p className="text-lg font-bold text-[#1A1340] leading-tight">{stat.value}</p>
                <p className="text-[10px] text-[#9CA3AF]">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Complaints list card */}
        <div className="bg-white rounded-[20px] border border-[#E8E4F8] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#F3F0FF]">
            <h2 className="text-sm font-bold text-[#1A1340]">Your Complaints</h2>
            <p className="text-xs text-[#9CA3AF] mt-0.5">Track and manage all the issues you&apos;ve reported</p>
          </div>

          {/* Filters */}
          <div className="px-5 py-3 flex flex-wrap items-center gap-2 border-b border-[#F3F0FF]">
            {[
              {
                value: statusFilter,
                onChange: (v: string) => { setStatusFilter(v); setPage(1); },
                opts: ["All Status", "Submitted", "Under Review", "Assigned", "In Progress", "Resolved", "Closed"],
                label: "status",
              },
              {
                value: categoryFilter,
                onChange: (v: string) => { setCategoryFilter(v); setPage(1); },
                opts: ["All Categories", ...uniqueCategories],
                label: "category",
              },
              {
                value: timeFilter,
                onChange: (v: string) => { setTimeFilter(v); setPage(1); },
                opts: ["All Time", "This Week", "This Month", "Last Month"],
                label: "time",
              },
            ].map((f) => (
              <select
                key={f.label}
                value={f.value}
                onChange={(e) => f.onChange(e.target.value)}
                className="text-xs border border-[#E8E4F8] rounded-lg px-3 py-1.5 text-[#374151] bg-white outline-none focus:ring-1 focus:ring-[#6B3FFF]/20 focus:border-[#6B3FFF]/40"
                aria-label={`Filter by ${f.label}`}
              >
                {f.opts.map((o) => <option key={o}>{o}</option>)}
              </select>
            ))}
            <div className="relative ml-auto">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search by ID or keyword..."
                className="text-xs pl-8 pr-3 py-1.5 border border-[#E8E4F8] rounded-lg text-[#374151] bg-white outline-none focus:ring-1 focus:ring-[#6B3FFF]/20 w-44"
                aria-label="Search complaints"
              />
            </div>
          </div>

          {/* List */}
          {paginated.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm font-medium text-[#1A1340]">No complaints found</p>
              <p className="text-xs text-[#9CA3AF] mt-1">Try adjusting your filters or report a new issue</p>
            </div>
          ) : (
            <ul className="divide-y divide-[#F9F8FF]" role="list">
              {paginated.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => onTrack(c)}
                    className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-[#F9F8FF] transition-colors text-left group"
                    aria-label={`${c.ticketId}: ${c.title}, Status: ${STATUS_LABELS[c.status]}, Date: ${c.createdAt}`}
                  >
                    <span className="text-xl flex-shrink-0" aria-hidden="true">
                      {CATEGORY_ICONS[c.category] ?? "📋"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#6B3FFF]">#{c.ticketId}</p>
                      <p className="text-sm font-semibold text-[#1A1340] truncate">{c.title}</p>
                      <p className="text-[11px] text-[#9CA3AF] flex items-center gap-1 mt-0.5">
                        <MapPin size={9} aria-hidden="true" /> {c.location.split(",")[0]}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-center hidden sm:block">
                      <p className="text-[10px] text-[#9CA3AF]">{c.category}</p>
                    </div>
                    <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-semibold border flex-shrink-0", STATUS_COLORS[c.status])}>
                      {STATUS_LABELS[c.status]}
                    </span>
                    <span className="text-xs text-[#9CA3AF] flex-shrink-0 hidden sm:block">{c.createdAt}</span>
                    <ChevronRight size={14} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors flex-shrink-0" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination */}
          <div className="px-5 py-3 border-t border-[#F3F0FF] flex items-center justify-between">
            <div className="flex items-center gap-1" role="navigation" aria-label="Pagination">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-7 h-7 rounded-lg border border-[#E8E4F8] flex items-center justify-center hover:bg-[#F9F8FF] disabled:opacity-40 transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft size={13} aria-hidden="true" />
              </button>
              {Array.from({ length: Math.min(pageCount, 5) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn("w-7 h-7 rounded-lg text-xs font-medium transition-colors", page === p ? "text-white" : "border border-[#E8E4F8] text-[#374151] hover:bg-[#F9F8FF]")}
                  style={page === p ? { background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" } : {}}
                  aria-label={`Page ${p}`}
                  aria-current={page === p ? "page" : undefined}
                >
                  {p}
                </button>
              ))}
              {pageCount > 5 && <span className="text-xs text-[#9CA3AF]">...</span>}
              <button
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={page === pageCount}
                className="w-7 h-7 rounded-lg border border-[#E8E4F8] flex items-center justify-center hover:bg-[#F9F8FF] disabled:opacity-40 transition-colors"
                aria-label="Next page"
              >
                <ChevronRight size={13} aria-hidden="true" />
              </button>
            </div>
            <p className="text-xs text-[#9CA3AF]">
              Showing {paginated.length} of {filtered.length}
            </p>
          </div>
        </div>
      </div>

      {/* ── Right sidebar ── */}
      <div className="space-y-5">
        {/* Donut chart */}
        <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-4" aria-labelledby="chart-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 id="chart-heading" className="text-sm font-semibold text-[#1A1340]">Complaints by Category</h2>
          </div>
          {total > 0 ? (
            <div className="flex items-center gap-4">
              <svg viewBox="0 0 100 100" className="w-28 h-28 flex-shrink-0" role="img" aria-label="Complaints by category donut chart">
                {donutPaths.map((seg, i) => (
                  <path key={i} d={seg.d} fill={seg.color} className="hover:opacity-80 transition-opacity cursor-pointer" />
                ))}
                <circle cx="50" cy="50" r="24" fill="white" />
                <text x="50" y="47" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1340">{total}</text>
                <text x="50" y="57" textAnchor="middle" fontSize="6" fill="#9CA3AF">Total</text>
              </svg>
              <div className="space-y-1.5">
                {donutData.map((seg) => (
                  <div key={seg.label} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} aria-hidden="true" />
                    <span className="text-[11px] text-[#374151] truncate">{seg.label}</span>
                    <span className="text-[10px] text-[#9CA3AF] ml-auto">{seg.count} ({seg.pct})</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-[#9CA3AF] text-center py-4">No complaints yet. Report your first issue!</p>
          )}
        </section>

        {/* Recent Activity */}
        <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-4" aria-labelledby="activity-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 id="activity-heading" className="text-sm font-semibold text-[#1A1340]">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {recentActivity.length > 0 ? (
              recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className={cn("w-2 h-2 rounded-full flex-shrink-0 mt-1.5", a.dot)} aria-hidden="true" />
                  <div>
                    <p className="text-xs text-[#374151] leading-relaxed">{a.text}</p>
                    <p className="text-[10px] text-[#9CA3AF] mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#9CA3AF]">No recent activity</p>
            )}
          </div>
        </section>

        {/* Make bigger impact */}
        <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-4" aria-labelledby="impact2-heading">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h2 id="impact2-heading" className="text-sm font-semibold text-[#1A1340] mb-1">Make a Bigger Impact!</h2>
              <p className="text-xs text-[#6B7280] mb-3">Invite your friends and neighbors to report issues and create a better community together.</p>
              <button
                onClick={() => {
                  if (navigator.share) {
                    void navigator.share({ title: "JanMitra AI", text: "Report civic issues with JanMitra AI!", url: window.location.origin });
                  }
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white hover:opacity-90 transition-all"
                style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
              >
                Invite Now
              </button>
            </div>
            <span className="text-3xl" aria-hidden="true">👥</span>
          </div>
        </section>
      </div>
    </div>
  );
}
