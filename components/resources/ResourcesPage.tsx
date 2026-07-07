"use client";

import { useState, type KeyboardEvent } from "react";
import Image from "next/image";
import {
  Search, ChevronRight, Download, FileText, HelpCircle,
  Video, BarChart3, Wrench, Globe, MessageCircle, Phone, Mail,
  Sparkles, BookOpen,
} from "lucide-react";
import { cn } from "@/utils/cn";

const RESOURCE_TABS = [
  { id: "all", label: "All Resources", icon: BookOpen },
  { id: "guides", label: "Guides & How Tos", icon: BookOpen },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
  { id: "videos", label: "Videos", icon: Video },
  { id: "reports", label: "Reports & Publications", icon: BarChart3 },
  { id: "tools", label: "Tools & Calculators", icon: Wrench },
  { id: "links", label: "Important Links", icon: Globe },
];

type FeaturedResource = {
  id: string;
  title: string;
  type: string;
  typeColor: string;
  description: string;
  cta: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
};

type QuickLink = {
  id: string;
  label: string;
  sub: string;
  icon: string;
  iconBg: string;
};

type PopularDownload = {
  id: string;
  name: string;
  format: string;
  size: string;
};

const FEATURED_RESOURCES: FeaturedResource[] = [
  {
    id: "1", title: "Citizen's Guide to Government Services", type: "Guide", typeColor: "#6B3FFF",
    description: "A step-by-step guide to help you access various government services easily.",
    cta: "Read More", icon: FileText, iconBg: "#EDE9FE", iconColor: "#6B3FFF",
  },
  {
    id: "2", title: "Understanding Your Rights as a Citizen", type: "Guide", typeColor: "#6B3FFF",
    description: "Know your fundamental rights and how to avail public services.",
    cta: "Read More", icon: HelpCircle, iconBg: "#D1FAE5", iconColor: "#10B981",
  },
  {
    id: "3", title: "How to File a Complaint", type: "Video", typeColor: "#F59E0B",
    description: "Watch this video to learn how to file and track a complaint on JanMitra AI.",
    cta: "Watch Now", icon: Video, iconBg: "#FEF3C7", iconColor: "#F59E0B",
  },
  {
    id: "4", title: "Annual Report 2023-24", type: "Report", typeColor: "#3B82F6",
    description: "Performance highlights and key initiatives from the past year.",
    cta: "Download", icon: BarChart3, iconBg: "#DBEAFE", iconColor: "#3B82F6",
  },
];

const QUICK_LINKS: QuickLink[] = [
  { id: "1", label: "Government Websites", sub: "Official government portals and websites", icon: "🌐", iconBg: "#EDE9FE" },
  { id: "2", label: "Forms & Applications", sub: "Download important forms and applications", icon: "📋", iconBg: "#DBEAFE" },
  { id: "3", label: "Public Grievance Redressal", sub: "Information about grievance redressal systems", icon: "💬", iconBg: "#D1FAE5" },
  { id: "4", label: "Citizen Charter", sub: "Know the services and standards", icon: "🛡️", iconBg: "#FEE2E2" },
  { id: "5", label: "RTI Information", sub: "Right to Information resources and guides", icon: "💡", iconBg: "#FEF3C7" },
  { id: "6", label: "Public Notices", sub: "Important notices and announcements", icon: "📢", iconBg: "#FCE7F3" },
  { id: "7", label: "E-Governance Initiatives", sub: "Digital initiatives and online services", icon: "💻", iconBg: "#EDE9FE" },
  { id: "8", label: "State Portals", sub: "Access your state's citizen portal", icon: "🏛️", iconBg: "#D1FAE5" },
];

const POPULAR_DOWNLOADS: PopularDownload[] = [
  { id: "1", name: "BPL Certificate Application Form", format: "PDF", size: "245 KB" },
  { id: "2", name: "Income Certificate Format", format: "PDF", size: "198 KB" },
  { id: "3", name: "Domicile Certificate Form", format: "PDF", size: "210 KB" },
  { id: "4", name: "Caste Certificate Application", format: "PDF", size: "230 KB" },
  { id: "5", name: "EWS Certificate Format", format: "PDF", size: "175 KB" },
];

const HELP_LINKS = [
  { label: "Frequently Asked Questions", sub: "Find answers to common queries", icon: HelpCircle, iconBg: "#EDE9FE", iconColor: "#6B3FFF" },
  { label: "User Guides", sub: "Step-by-step guides for citizens", icon: FileText, iconBg: "#D1FAE5", iconColor: "#10B981" },
  { label: "Contact Support", sub: "Get help from our support team", icon: MessageCircle, iconBg: "#DBEAFE", iconColor: "#3B82F6" },
];

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  function handleSearchKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") { /* future search */ }
  }

  return (
    <div className="overflow-y-auto h-full" id="main-content">
      <div className="px-6 py-5 space-y-5 max-w-[1280px]">

        {/* ── Hero ── */}
        <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: "155px" }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#F5F3FF,#EDE9FE 25%,#FFF7ED 70%,#FFFBEB)" }} aria-hidden="true" />
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
            style={{ WebkitMaskImage: "linear-gradient(to right,transparent 35%,rgba(0,0,0,0.4) 50%,black 72%)", maskImage: "linear-gradient(to right,transparent 35%,rgba(0,0,0,0.4) 50%,black 72%)" }}>
            <Image src="/images/india-gate.png" alt="" fill className="object-cover object-right" quality={75} sizes="1200px" />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right,rgba(245,243,255,0.97) 0%,rgba(245,243,255,0.88) 33%,transparent 58%)" }} aria-hidden="true" />

          <div className="relative z-10 px-6 py-6">
            <h1 className="text-2xl font-bold text-[#1A1340]">Resources</h1>
            <p className="text-sm text-[#6B7280] mt-1">Curated information, guides and tools to help you stay informed</p>

            <div className="flex items-center gap-2 mt-4 max-w-xl">
              <div className="flex-1 flex items-center gap-2 bg-white border border-[#E8E4F8] rounded-xl px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-[#6B3FFF]/20">
                <Search size={15} className="text-[#9CA3AF] flex-shrink-0" aria-hidden="true" />
                <input type="search" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleSearchKey}
                  placeholder="Search resources, guides, documents..."
                  className="flex-1 text-sm text-[#374151] placeholder-[#9CA3AF] bg-transparent outline-none" aria-label="Search resources" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all"
                style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }} aria-label="Search">
                <Search size={14} aria-hidden="true" /> Search
              </button>
            </div>
          </div>
        </div>

        {/* ── Tab bar ── */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none" role="tablist" aria-label="Resource categories">
          {RESOURCE_TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} role="tab" aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 border flex-shrink-0",
                  activeTab === tab.id
                    ? "bg-[#F3F0FF] text-[#6B3FFF] border-[#6B3FFF]/30"
                    : "bg-white text-[#6B7280] border-[#E8E4F8] hover:bg-[#F9F8FF]"
                )}>
                <Icon size={13} aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_256px] gap-5">
          {/* Main */}
          <div className="space-y-5">
            {/* Featured Resources */}
            <section aria-labelledby="featured-res-heading">
              <div className="flex items-center justify-between mb-4">
                <h2 id="featured-res-heading" className="text-base font-bold text-[#1A1340]">Featured Resources</h2>
                <button className="text-sm text-[#6B3FFF] hover:underline">View All</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {FEATURED_RESOURCES.map(res => (
                  <article key={res.id}
                    className="bg-white rounded-2xl border border-[#E8E4F8] p-4 flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    aria-label={res.title}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: res.iconBg }} aria-hidden="true">
                        <res.icon size={18} style={{ color: res.iconColor }} />
                      </div>
                      <span className="text-xs font-semibold" style={{ color: res.typeColor }}>{res.type}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#1A1340] leading-snug mb-2">{res.title}</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed flex-1 mb-4">{res.description}</p>
                    <button className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:opacity-80" style={{ color: res.iconColor }}
                      aria-label={`${res.cta} ${res.title}`}>
                      {res.cta} <ChevronRight size={13} aria-hidden="true" />
                    </button>
                  </article>
                ))}
              </div>
            </section>

            {/* Quick Links */}
            <section aria-labelledby="quick-links-heading">
              <h2 id="quick-links-heading" className="text-base font-bold text-[#1A1340] mb-4">Quick Links</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {QUICK_LINKS.map(link => (
                  <button key={link.id}
                    className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-[#E8E4F8] hover:bg-[#F9F8FF] hover:border-[#6B3FFF]/20 hover:-translate-y-0.5 transition-all duration-200 text-left group"
                    aria-label={link.label}>
                    <div className="w-10 h-10 rounded-xl text-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: link.iconBg }} aria-hidden="true">
                      {link.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1A1340] truncate group-hover:text-[#6B3FFF] transition-colors">{link.label}</p>
                      <p className="text-xs text-[#9CA3AF] truncate">{link.sub}</p>
                    </div>
                    <ChevronRight size={15} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors flex-shrink-0" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </section>

            {/* Footer contact bar */}
            <div className="bg-white rounded-2xl border border-[#E8E4F8] px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <HelpCircle size={18} className="text-[#6B3FFF]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1340]">Can&apos;t find what you&apos;re looking for?</p>
                  <p className="text-xs text-[#9CA3AF]">Our support team is here to help you.</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-[#6B3FFF]" aria-hidden="true" />
                  <div>
                    <p className="text-[10px] text-[#9CA3AF]">Call Us</p>
                    <p className="text-xs font-bold text-[#1A1340]">1800-11-5656</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-[#6B3FFF]" aria-hidden="true" />
                  <div>
                    <p className="text-[10px] text-[#9CA3AF]">Email Us</p>
                    <p className="text-xs font-bold text-[#1A1340]">support@janmitra.gov.in</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#6B3FFF]/30 text-sm font-semibold text-[#6B3FFF] hover:bg-[#F3F0FF] transition-all"
                  aria-label="Chat with AI Assistant">
                  <Sparkles size={14} aria-hidden="true" /> Chat with AI Assistant
                </button>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Help & Support */}
            <section className="bg-white rounded-2xl border border-[#E8E4F8] p-4" aria-labelledby="help-support-heading">
              <h2 id="help-support-heading" className="text-sm font-bold text-[#1A1340] mb-0.5">Help &amp; Support</h2>
              <p className="text-xs text-[#9CA3AF] mb-3">Need help finding something? We&apos;re here for you.</p>
              <div className="space-y-2">
                {HELP_LINKS.map(h => (
                  <button key={h.label}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#F9F8FF] border border-transparent hover:border-[#E8E4F8] transition-all text-left group"
                    aria-label={h.label}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: h.iconBg }} aria-hidden="true">
                      <h.icon size={16} style={{ color: h.iconColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#1A1340] truncate">{h.label}</p>
                      <p className="text-[10px] text-[#9CA3AF] truncate">{h.sub}</p>
                    </div>
                    <ChevronRight size={13} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors flex-shrink-0" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </section>

            {/* Popular Downloads */}
            <section className="bg-white rounded-2xl border border-[#E8E4F8] p-4" aria-labelledby="downloads-heading">
              <div className="flex items-center justify-between mb-3">
                <h2 id="downloads-heading" className="text-sm font-bold text-[#1A1340]">Popular Downloads</h2>
                <button className="text-xs text-[#6B3FFF] hover:underline">View All</button>
              </div>
              <div className="space-y-2">
                {POPULAR_DOWNLOADS.map(dl => (
                  <div key={dl.id} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <FileText size={14} className="text-[#EF4444]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[#1A1340] truncate">{dl.name}</p>
                      <p className="text-[10px] text-[#9CA3AF]">{dl.format} · {dl.size}</p>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-[#F3F0FF] text-[#9CA3AF] hover:text-[#6B3FFF] transition-colors flex-shrink-0"
                      aria-label={`Download ${dl.name}`}>
                      <Download size={14} aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
