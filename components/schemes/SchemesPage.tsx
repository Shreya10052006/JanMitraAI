"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search, SlidersHorizontal, ChevronDown, ChevronRight,
  BookOpen, Sparkles, Bot, ArrowRight,
  Home, Users, Heart, IndianRupee, Briefcase, MoreHorizontal,
  Bookmark, CheckCircle2,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { VoiceSearchButton } from "@/components/ui/VoiceSearchButton";
import { useBookmarks } from "@/hooks/useBookmarks";

type FeaturedScheme = {
  id: string;
  name: string;
  description: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  benefit: string;
  eligibleLabel: string;
  eligibleCount: string;
  icon: string;
  iconBg: string;
};

type CategoryBucket = {
  id: string;
  label: string;
  count: number;
  icon: React.ElementType;
  iconColor: string;
};

type TrendingScheme = {
  id: string;
  name: string;
  sub: string;
  icon: string;
  iconBg: string;
};

const FILTER_TABS = ["All Schemes", "Education", "Health", "Financial Support", "Employment", "Housing", "Women & Child", "More"];

const FEATURED_SCHEMES: FeaturedScheme[] = [
  {
    id: "pm-kisan", name: "PM Kisan Samman Nidhi", description: "Financial support to small and marginal farmers.",
    tag: "Agriculture", tagColor: "#10B981", tagBg: "#D1FAE5",
    benefit: "₹6,000 / year", eligibleLabel: "Eligible Citizens", eligibleCount: "10+ Crore",
    icon: "🌾", iconBg: "#D1FAE5",
  },
  {
    id: "pm-scholarship", name: "PM Scholarship Scheme", description: "Scholarships for students from various backgrounds.",
    tag: "Education", tagColor: "#3B82F6", tagBg: "#DBEAFE",
    benefit: "Up to ₹75,000", eligibleLabel: "Eligible Students", eligibleCount: "5+ Crore",
    icon: "🎓", iconBg: "#DBEAFE",
  },
  {
    id: "pmmvy", name: "Pradhan Mantri Matru Vandana Yojana", description: "Financial assistance for pregnant women and lactating mothers.",
    tag: "Women", tagColor: "#EC4899", tagBg: "#FCE7F3",
    benefit: "₹5,000", eligibleLabel: "Eligible Beneficiaries", eligibleCount: "2+ Crore",
    icon: "👶", iconBg: "#FCE7F3",
  },
  {
    id: "pm-awas", name: "PM Awas Yojana (Urban)", description: "Affordable housing for urban poor and middle class.",
    tag: "Housing", tagColor: "#F59E0B", tagBg: "#FEF3C7",
    benefit: "Up to ₹2.67 Lakh", eligibleLabel: "Eligible Families", eligibleCount: "1+ Crore",
    icon: "🏠", iconBg: "#FEF3C7",
  },
];

const CATEGORY_BUCKETS: CategoryBucket[] = [
  { id: "education", label: "Education", count: 24, icon: BookOpen, iconColor: "#3B82F6" },
  { id: "health", label: "Health", count: 18, icon: Heart, iconColor: "#EF4444" },
  { id: "financial", label: "Financial Support", count: 22, icon: IndianRupee, iconColor: "#F59E0B" },
  { id: "employment", label: "Employment", count: 16, icon: Briefcase, iconColor: "#8B5CF6" },
  { id: "more", label: "More", count: 48, icon: MoreHorizontal, iconColor: "#6B3FFF" },
];

const TRENDING_SCHEMES: TrendingScheme[] = [
  { id: "1", name: "Ayushman Bharat Yojana", sub: "Health Insurance", icon: "❤️", iconBg: "#FEE2E2" },
  { id: "2", name: "Skill India Mission", sub: "Skill Development", icon: "🎯", iconBg: "#D1FAE5" },
  { id: "3", name: "PM Ujjwala Yojana", sub: "Clean Cooking", icon: "🔥", iconBg: "#FEF3C7" },
  { id: "4", name: "Startup India Initiative", sub: "Entrepreneurship", icon: "🚀", iconBg: "#EDE9FE" },
];

const STATS = [
  { icon: "📚", iconBg: "#EDE9FE", label: "Total Schemes", value: "128", sub: "Across India" },
  { icon: "🏛️", iconBg: "#D1FAE5", label: "Central Schemes", value: "78", sub: "By Government of India" },
  { icon: "🏛️", iconBg: "#DBEAFE", label: "State Schemes", value: "50", sub: "By State Governments" },
  { icon: "⭐", iconBg: "#FEF3C7", label: "New Schemes", value: "8", sub: "Added this month" },
];

export default function SchemesPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Schemes");
  const [moreOpen, setMoreOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { isSchemeSaved, toggleScheme } = useBookmarks();

  function handleSearchKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") { /* filter applied inline */ }
  }

  // Filter featured schemes by search
  const filteredFeatured = FEATURED_SCHEMES.filter((s) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.tag.toLowerCase().includes(q);
  });

  const visibleFilters = FILTER_TABS.slice(0, 7);

  return (
    <div className="overflow-y-auto h-full" id="main-content">
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 lg:space-y-12 max-w-[1600px] mx-auto">

        {/* ── Hero ── */}
        <div className="relative rounded-[28px] overflow-hidden" style={{ minHeight: "150px" }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#F5F3FF,#EDE9FE 25%,#FFF7ED 70%,#FFFBEB)" }} aria-hidden="true" />
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
            style={{ WebkitMaskImage: "linear-gradient(to right,transparent 36%,rgba(0,0,0,0.4) 52%,black 75%)", maskImage: "linear-gradient(to right,transparent 36%,rgba(0,0,0,0.4) 52%,black 75%)" }}>
            <Image src="/images/india-gate.png" alt="" fill className="object-cover object-right-bottom" quality={75} sizes="1200px" />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right,rgba(245,243,255,0.97) 0%,rgba(245,243,255,0.88) 34%,transparent 60%)" }} aria-hidden="true" />

          <div className="relative z-10 px-5 py-6 sm:px-8 sm:py-8">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1A1340]">Schemes</h1>
            <p className="text-sm text-[#6B7280] mt-2">Discover government schemes that can benefit you</p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-4">
              <div className="flex items-center gap-2 bg-white border border-[#E8E4F8] rounded-xl px-4 py-3.5 sm:py-4 shadow-sm flex-1 sm:max-w-xl focus-within:ring-2 focus-within:ring-[#6B3FFF]/20 min-w-0">
                <Search size={15} className="text-[#9CA3AF] flex-shrink-0" aria-hidden="true" />
                <input type="search" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleSearchKey}
                  placeholder="Search schemes by name or category..."
                  className="flex-1 min-w-0 text-sm text-[#374151] placeholder-[#9CA3AF] bg-transparent outline-none" aria-label="Search schemes" />
                <VoiceSearchButton onResult={setSearch} className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-3.5 sm:py-4 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all flex-1 sm:flex-initial"
                  style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }} aria-label="Search">
                  <Search size={14} aria-hidden="true" /> Search
                </button>
                <button onClick={() => setFiltersOpen(v => !v)}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 sm:py-4 rounded-xl border border-[#E8E4F8] bg-white text-sm font-medium text-[#374151] hover:bg-[#F9F8FF] transition-colors shadow-sm flex-1 sm:flex-initial"
                  aria-label="Open filters" aria-expanded={filtersOpen}>
                  <SlidersHorizontal size={15} className="text-[#6B3FFF]" aria-hidden="true" /> Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Category filter tabs ── */}
        <div className="flex items-center gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 sm:pb-0" role="tablist" aria-label="Scheme categories">
          {visibleFilters.map(tab => (
            <button key={tab} role="tab" aria-selected={activeFilter === tab}
              onClick={() => setActiveFilter(tab)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border flex-shrink-0 whitespace-nowrap",
                activeFilter === tab
                  ? "text-[#6B3FFF] bg-[#F3F0FF] border-[#6B3FFF]/30"
                  : "text-[#6B7280] bg-white border-[#E8E4F8] hover:bg-[#F9F8FF]"
              )}>
              {tab === "All Schemes" && <span aria-hidden="true">🏛️</span>}
              {tab === "Education" && <BookOpen size={14} aria-hidden="true" />}
              {tab === "Health" && <Heart size={14} aria-hidden="true" />}
              {tab === "Financial Support" && <IndianRupee size={14} aria-hidden="true" />}
              {tab === "Employment" && <Briefcase size={14} aria-hidden="true" />}
              {tab === "Housing" && <Home size={14} aria-hidden="true" />}
              {tab === "Women & Child" && <Users size={14} aria-hidden="true" />}
              {tab}
            </button>
          ))}
          <div className="relative flex-shrink-0">
            <button onClick={() => setMoreOpen(v => !v)}
              className={cn("flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all whitespace-nowrap", moreOpen ? "bg-[#F3F0FF] border-[#6B3FFF]/30 text-[#6B3FFF]" : "bg-white border-[#E8E4F8] text-[#6B7280] hover:bg-[#F9F8FF]")}
              aria-haspopup="true" aria-expanded={moreOpen}>
              More <ChevronDown size={13} className={cn("transition-transform", moreOpen && "rotate-180")} aria-hidden="true" />
            </button>
            {moreOpen && (
              <div className="absolute top-full mt-2 left-0 bg-white border border-[#E8E4F8] rounded-xl shadow-lg z-20 p-2 min-w-[140px]" role="menu">
                {["Agriculture", "Women & Child", "SC/ST", "Senior Citizens", "Disability"].map(opt => (
                  <button key={opt} role="menuitem" onClick={() => { setActiveFilter(opt); setMoreOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-[#374151] hover:bg-[#F9F8FF] rounded-lg transition-colors">{opt}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Two-column: main + right sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_264px] gap-6">
          {/* Main */}
          <div className="space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" role="list">
              {STATS.map(s => (
                <div key={s.label} className="bg-white rounded-[20px] border border-[#E8E4F8] px-6 py-4 flex items-center gap-4" role="listitem">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: s.iconBg }} aria-hidden="true">{s.icon}</div>
                  <div>
                    <p className="text-[10px] text-[#9CA3AF]">{s.label}</p>
                    <p className="text-lg font-bold text-[#1A1340] leading-tight">{s.value}</p>
                    <p className="text-[10px] text-[#9CA3AF]">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Schemes */}
            <section aria-labelledby="featured-heading">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 id="featured-heading" className="text-base font-bold text-[#1A1340]">Featured Schemes</h2>
                  <p className="text-xs text-[#9CA3AF]">Popular schemes you might be eligible for</p>
                </div>
                <button className="text-sm text-[#6B3FFF] hover:underline">View All</button>
              </div>

              {filteredFeatured.length === 0 && (
                <p className="text-sm text-[#9CA3AF] py-4">No schemes match &ldquo;{search}&rdquo;</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredFeatured.map((scheme) => (
                  <article key={scheme.id}
                    className="bg-white rounded-[20px] border border-[#E8E4F8] p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
                    aria-label={scheme.name}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: scheme.iconBg }} aria-hidden="true">
                        {scheme.icon}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-2 rounded-full text-[10px] font-semibold" style={{ backgroundColor: scheme.tagBg, color: scheme.tagColor }}>
                          {scheme.tag}
                        </span>
                        <button
                          onClick={() => toggleScheme(scheme.id)}
                          className={cn("p-2 rounded-lg transition-colors", isSchemeSaved(scheme.id) ? "text-[#6B3FFF] bg-[#EDE9FE]" : "text-[#9CA3AF] hover:text-[#6B3FFF] hover:bg-[#F3F0FF]")}
                          aria-label={isSchemeSaved(scheme.id) ? `Remove ${scheme.name} from saved` : `Save ${scheme.name}`}
                          aria-pressed={isSchemeSaved(scheme.id)}
                        >
                          {isSchemeSaved(scheme.id) ? <CheckCircle2 size={14} aria-hidden="true" /> : <Bookmark size={14} aria-hidden="true" />}
                        </button>
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-[#1A1340] leading-snug mb-2">{scheme.name}</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed flex-1 mb-4">{scheme.description}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <IndianRupee size={13} className="text-[#10B981]" aria-hidden="true" />
                      <span className="text-sm font-bold text-[#1A1340]">{scheme.benefit}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-[#9CA3AF]">{scheme.eligibleLabel}</p>
                        <p className="text-xs font-semibold text-[#374151]">{scheme.eligibleCount}</p>
                      </div>
                      <Link href="/ai-assistant" className="w-8 h-8 rounded-xl flex items-center justify-center text-white hover:opacity-90 hover:scale-105 transition-all"
                        style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }} aria-label={`Learn more about ${scheme.name}`}>
                        <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Schemes by Category */}
            <section aria-labelledby="by-cat-heading">
              <div className="flex items-center justify-between mb-4">
                <h2 id="by-cat-heading" className="text-base font-bold text-[#1A1340]">Schemes by Category</h2>
                <button className="text-sm text-[#6B3FFF] hover:underline">View All Categories</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {CATEGORY_BUCKETS.map(cat => (
                  <button key={cat.id}
                    className="bg-white rounded-[20px] border border-[#E8E4F8] px-6 py-4 flex items-center gap-4 hover:bg-[#F9F8FF] hover:border-[#6B3FFF]/20 hover:-translate-y-0.5 transition-all duration-200 text-left"
                    aria-label={`${cat.label}: ${cat.count} schemes`}>
                    <div className="w-9 h-9 rounded-xl bg-[#F3F0FF] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <cat.icon size={17} style={{ color: cat.iconColor }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1A1340]">{cat.label}</p>
                      <p className="text-[10px] text-[#9CA3AF]">{cat.count} Schemes</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Bottom CTA bar */}
            <div className="bg-[#F3F0FF] rounded-[20px] border border-[#E8E4F8] px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#6B3FFF] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1340]">Not sure which scheme is right for you?</p>
                  <p className="text-xs text-[#6B7280]">Let our AI Assistant help you find the perfect schemes based on your profile.</p>
                </div>
              </div>
              <Link href="/ai-assistant" className="flex items-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }} aria-label="Get personalized scheme recommendations">
                Get Personalized Recommendations <Sparkles size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Find Schemes for You */}
            <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6 relative overflow-hidden" aria-labelledby="find-heading">
              <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none" aria-hidden="true">
                <div className="text-8xl">📋</div>
              </div>
              <h2 id="find-heading" className="text-sm font-bold text-[#1A1340] mb-2">Find Schemes for You</h2>
              <p className="text-xs text-[#6B7280] mb-4">Answer a few questions and we&apos;ll find the best schemes for you.</p>
              <Link href="/ai-assistant" className="w-full py-4 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all block text-center"
                style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }} aria-label="Find schemes matching your profile">
                Find My Schemes
              </Link>
            </section>

            {/* Trending Schemes */}
            <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="trending-heading">
              <div className="flex items-center justify-between mb-4">
                <h2 id="trending-heading" className="text-sm font-bold text-[#1A1340]">Trending Schemes</h2>
                <button className="text-xs text-[#6B3FFF] hover:underline">View All</button>
              </div>
              <div className="space-y-2">
                {TRENDING_SCHEMES.map(s => (
                  <button key={s.id} className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#F9F8FF] border border-transparent hover:border-[#E8E4F8] transition-all text-left group"
                    aria-label={`${s.name}: ${s.sub}`}>
                    <div className="w-9 h-9 rounded-xl text-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: s.iconBg }} aria-hidden="true">{s.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#1A1340] truncate">{s.name}</p>
                      <p className="text-[10px] text-[#9CA3AF]">{s.sub}</p>
                    </div>
                    <span className="px-2 py-2 rounded-full text-[9px] font-semibold bg-orange-50 text-orange-600 border border-orange-100 flex-shrink-0">Trending</span>
                    <ChevronRight size={13} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors flex-shrink-0" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </section>

            {/* Need Help */}
            <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-4 relative overflow-hidden" aria-labelledby="help-heading">
              <div className="absolute -right-2 -bottom-2 text-6xl opacity-10 pointer-events-none" aria-hidden="true">🤖</div>
              <h2 id="help-heading" className="text-sm font-bold text-[#1A1340] mb-2">Need Help?</h2>
              <p className="text-xs text-[#6B7280] mb-4">Our AI Assistant can help you find and understand the right schemes.</p>
              <Link href="/ai-assistant" className="w-full py-4 rounded-xl border border-[#6B3FFF]/30 text-sm font-semibold text-[#6B3FFF] hover:bg-[#F3F0FF] transition-all block text-center" aria-label="Chat with AI Assistant">
                Chat with AI Assistant
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
