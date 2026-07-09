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
import { useLanguage } from "@/hooks/useLanguage";
import { getSchemesContent } from "@/lib/i18n/content/schemes";

// Non-translatable facts: id, stable tag key (used for filter matching),
// tag color, icon, eligible-count figure. All display text is sourced
// per-language from getSchemesContent() below.
const FEATURED_SCHEMES_META = [
  { id: "pm-kisan", tagKey: "Agriculture", tagColor: "#10B981", tagBg: "#D1FAE5", eligibleCount: "10+ Crore", icon: "🌾", iconBg: "#D1FAE5" },
  { id: "pm-scholarship", tagKey: "Education", tagColor: "#3B82F6", tagBg: "#DBEAFE", eligibleCount: "5+ Crore", icon: "🎓", iconBg: "#DBEAFE" },
  { id: "pmmvy", tagKey: "Women", tagColor: "#EC4899", tagBg: "#FCE7F3", eligibleCount: "2+ Crore", icon: "👶", iconBg: "#FCE7F3" },
  { id: "pm-awas", tagKey: "Housing", tagColor: "#F59E0B", tagBg: "#FEF3C7", eligibleCount: "1+ Crore", icon: "🏠", iconBg: "#FEF3C7" },
];

const FILTER_TAB_KEYS = ["All Schemes", "Education", "Health", "Financial Support", "Employment", "Housing", "Women & Child", "More"];
const MORE_OPTION_KEYS = ["Agriculture", "Women & Child", "SC/ST", "Senior Citizens", "Disability"];

const CATEGORY_BUCKETS_META = [
  { id: "education", count: 24, icon: BookOpen, iconColor: "#3B82F6" },
  { id: "health", count: 18, icon: Heart, iconColor: "#EF4444" },
  { id: "financial", count: 22, icon: IndianRupee, iconColor: "#F59E0B" },
  { id: "employment", count: 16, icon: Briefcase, iconColor: "#8B5CF6" },
  { id: "more", count: 48, icon: MoreHorizontal, iconColor: "#6B3FFF" },
];

const TRENDING_SCHEMES_META = [
  { id: "1", icon: "❤️", iconBg: "#FEE2E2" },
  { id: "2", icon: "🎯", iconBg: "#D1FAE5" },
  { id: "3", icon: "🔥", iconBg: "#FEF3C7" },
  { id: "4", icon: "🚀", iconBg: "#EDE9FE" },
];

const STATS_META = [
  { icon: "📚", iconBg: "#EDE9FE", value: "128" },
  { icon: "🏛️", iconBg: "#D1FAE5", value: "78" },
  { icon: "🏛️", iconBg: "#DBEAFE", value: "50" },
  { icon: "⭐", iconBg: "#FEF3C7", value: "8" },
];

export default function SchemesPage() {
  const { t, currentLanguage } = useLanguage();
  const content = getSchemesContent(currentLanguage.code);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Schemes");
  const [moreOpen, setMoreOpen] = useState(false);
  const { isSchemeSaved, toggleScheme } = useBookmarks();

  function handleSearchKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") e.currentTarget.blur();
  }

  const filtersActive = search.trim() !== "" || activeFilter !== "All Schemes";

  function handleClearFilters() {
    setSearch("");
    setActiveFilter("All Schemes");
  }

  // Filter featured schemes by search AND active category
  const filteredFeatured = FEATURED_SCHEMES_META.filter((meta) => {
    const s = content.featuredSchemes[meta.id];
    const q = search.toLowerCase();
    const matchesSearch =
      !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.tag.toLowerCase().includes(q);
    const matchesFilter = activeFilter === "All Schemes" || meta.tagKey === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const visibleFilters = FILTER_TAB_KEYS.slice(0, 7);

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
            <h1 className="text-xl sm:text-2xl font-bold text-[#1A1340]">{t("schemes.title")}</h1>
            <p className="text-sm text-[#6B7280] mt-2">{t("schemes.subtitle")}</p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-4">
              <div className="flex items-center gap-2 bg-white border border-[#E8E4F8] rounded-xl px-4 py-3.5 sm:py-4 shadow-sm flex-1 sm:max-w-xl focus-within:ring-2 focus-within:ring-[#6B3FFF]/20 min-w-0">
                <Search size={15} className="text-[#9CA3AF] flex-shrink-0" aria-hidden="true" />
                <input type="search" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleSearchKey}
                  placeholder={content.ui.searchPlaceholder}
                  className="flex-1 min-w-0 text-sm text-[#374151] placeholder-[#9CA3AF] bg-transparent outline-none" aria-label="Search schemes" />
                <VoiceSearchButton onResult={setSearch} className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => document.getElementById("featured-heading")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 sm:py-4 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all flex-1 sm:flex-initial"
                  style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }} aria-label="Search">
                  <Search size={14} aria-hidden="true" /> {t("common.search")}
                </button>
                <button onClick={handleClearFilters}
                  disabled={!filtersActive}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 sm:py-4 rounded-xl border border-[#E8E4F8] bg-white text-sm font-medium text-[#374151] hover:bg-[#F9F8FF] transition-colors shadow-sm flex-1 sm:flex-initial disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={filtersActive ? content.ui.clearFilters : t("common.filters")}>
                  <SlidersHorizontal size={15} className="text-[#6B3FFF]" aria-hidden="true" /> {filtersActive ? content.ui.clearFilters : t("common.filters")}
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
              {content.filterTabs[tab] ?? tab}
            </button>
          ))}
          <div className="relative flex-shrink-0">
            <button onClick={() => setMoreOpen(v => !v)}
              className={cn("flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all whitespace-nowrap", moreOpen ? "bg-[#F3F0FF] border-[#6B3FFF]/30 text-[#6B3FFF]" : "bg-white border-[#E8E4F8] text-[#6B7280] hover:bg-[#F9F8FF]")}
              aria-haspopup="true" aria-expanded={moreOpen}>
              {content.filterTabs.More} <ChevronDown size={13} className={cn("transition-transform", moreOpen && "rotate-180")} aria-hidden="true" />
            </button>
            {moreOpen && (
              <div className="absolute top-full mt-2 left-0 bg-white border border-[#E8E4F8] rounded-xl shadow-lg z-20 p-2 min-w-[140px]" role="menu">
                {MORE_OPTION_KEYS.map(opt => (
                  <button key={opt} role="menuitem" onClick={() => { setActiveFilter(opt); setMoreOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-[#374151] hover:bg-[#F9F8FF] rounded-lg transition-colors">{content.moreOptions[opt] ?? opt}</button>
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
              {STATS_META.map((s, i) => {
                const stat = content.stats[i];
                return (
                <div key={stat.label} className="bg-white rounded-[20px] border border-[#E8E4F8] px-6 py-4 flex items-center gap-4" role="listitem">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: s.iconBg }} aria-hidden="true">{s.icon}</div>
                  <div>
                    <p className="text-[10px] text-[#9CA3AF]">{stat.label}</p>
                    <p className="text-lg font-bold text-[#1A1340] leading-tight">{s.value}</p>
                    <p className="text-[10px] text-[#9CA3AF]">{stat.sub}</p>
                  </div>
                </div>
                );
              })}
            </div>

            {/* Featured Schemes */}
            <section aria-labelledby="featured-heading">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 id="featured-heading" className="text-base font-bold text-[#1A1340]">{content.ui.featuredSchemesHeading}</h2>
                  <p className="text-xs text-[#9CA3AF]">{content.ui.featuredSchemesSub}</p>
                </div>
                <button onClick={handleClearFilters} className="text-sm text-[#6B3FFF] hover:underline">{t("common.viewAll")}</button>
              </div>

              {filteredFeatured.length === 0 && (
                <p className="text-sm text-[#9CA3AF] py-4">{content.ui.noSchemesMatch.replace("{search}", search)}</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredFeatured.map((meta) => {
                  const scheme = content.featuredSchemes[meta.id];
                  return (
                  <article key={meta.id}
                    className="bg-white rounded-[20px] border border-[#E8E4F8] p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
                    aria-label={scheme.name}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: meta.iconBg }} aria-hidden="true">
                        {meta.icon}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-2 rounded-full text-[10px] font-semibold" style={{ backgroundColor: meta.tagBg, color: meta.tagColor }}>
                          {scheme.tag}
                        </span>
                        <button
                          onClick={() => toggleScheme(meta.id)}
                          className={cn("p-2 rounded-lg transition-colors", isSchemeSaved(meta.id) ? "text-[#6B3FFF] bg-[#EDE9FE]" : "text-[#9CA3AF] hover:text-[#6B3FFF] hover:bg-[#F3F0FF]")}
                          aria-label={isSchemeSaved(meta.id) ? `Remove ${scheme.name} from saved` : `Save ${scheme.name}`}
                          aria-pressed={isSchemeSaved(meta.id)}
                        >
                          {isSchemeSaved(meta.id) ? <CheckCircle2 size={14} aria-hidden="true" /> : <Bookmark size={14} aria-hidden="true" />}
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
                        <p className="text-xs font-semibold text-[#374151]">{meta.eligibleCount}</p>
                      </div>
                      <Link href="/ai-assistant" className="w-8 h-8 rounded-xl flex items-center justify-center text-white hover:opacity-90 hover:scale-105 transition-all"
                        style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }} aria-label={`${content.ui.learnMore} ${scheme.name}`}>
                        <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                  );
                })}
              </div>
            </section>

            {/* Schemes by Category */}
            <section aria-labelledby="by-cat-heading">
              <div className="flex items-center justify-between mb-4">
                <h2 id="by-cat-heading" className="text-base font-bold text-[#1A1340]">{content.ui.schemesByCategory}</h2>
                <button onClick={handleClearFilters} className="text-sm text-[#6B3FFF] hover:underline">{t("common.viewAll")}</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {CATEGORY_BUCKETS_META.map(cat => {
                  const label = content.categoryBuckets[cat.id] ?? cat.id;
                  const mappedFilter = { education: "Education", health: "Health", financial: "Financial Support", employment: "Employment", more: "More" }[cat.id] ?? "All Schemes";
                  return (
                  <button key={cat.id}
                    onClick={() => {
                      setActiveFilter(mappedFilter);
                      document.getElementById("featured-heading")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={cn(
                      "bg-white rounded-[20px] border px-6 py-4 flex items-center gap-4 hover:bg-[#F9F8FF] hover:-translate-y-0.5 transition-all duration-200 text-left",
                      activeFilter === mappedFilter ? "border-[#6B3FFF]/40 bg-[#F9F8FF]" : "border-[#E8E4F8] hover:border-[#6B3FFF]/20"
                    )}
                    aria-pressed={activeFilter === mappedFilter}
                    aria-label={`${label}: ${cat.count} ${content.ui.schemesCountSuffix}`}>
                    <div className="w-9 h-9 rounded-xl bg-[#F3F0FF] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <cat.icon size={17} style={{ color: cat.iconColor }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1A1340]">{label}</p>
                      <p className="text-[10px] text-[#9CA3AF]">{cat.count} {content.ui.schemesCountSuffix}</p>
                    </div>
                  </button>
                  );
                })}
              </div>
            </section>

            {/* Bottom CTA bar */}
            <div className="bg-[#F3F0FF] rounded-[20px] border border-[#E8E4F8] px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#6B3FFF] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1340]">{content.ui.notSureTitle}</p>
                  <p className="text-xs text-[#6B7280]">{content.ui.notSureDesc}</p>
                </div>
              </div>
              <Link href="/ai-assistant" className="flex items-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }} aria-label={content.ui.getPersonalized}>
                {content.ui.getPersonalized} <Sparkles size={14} aria-hidden="true" />
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
              <h2 id="find-heading" className="text-sm font-bold text-[#1A1340] mb-2">{content.ui.findSchemesForYou}</h2>
              <p className="text-xs text-[#6B7280] mb-4">{content.ui.findSchemesDesc}</p>
              <Link href="/ai-assistant" className="w-full py-4 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all block text-center"
                style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }} aria-label={content.ui.findMySchemes}>
                {content.ui.findMySchemes}
              </Link>
            </section>

            {/* Trending Schemes */}
            <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="trending-heading">
              <div className="flex items-center justify-between mb-4">
                <h2 id="trending-heading" className="text-sm font-bold text-[#1A1340]">{content.ui.trendingSchemesHeading}</h2>
                <Link href={`/ai-assistant?q=${encodeURIComponent("Show me the most popular trending government schemes right now.")}`} className="text-xs text-[#6B3FFF] hover:underline">{t("common.viewAll")}</Link>
              </div>
              <div className="space-y-2">
                {TRENDING_SCHEMES_META.map(meta => {
                  const s = content.trendingSchemes[meta.id];
                  return (
                  <Link key={meta.id} href={`/ai-assistant?q=${encodeURIComponent(`Tell me about ${s.name} — ${s.sub}. Am I eligible?`)}`}
                    className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#F9F8FF] border border-transparent hover:border-[#E8E4F8] transition-all text-left group"
                    aria-label={`${s.name}: ${s.sub}`}>
                    <div className="w-9 h-9 rounded-xl text-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: meta.iconBg }} aria-hidden="true">{meta.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#1A1340] truncate">{s.name}</p>
                      <p className="text-[10px] text-[#9CA3AF]">{s.sub}</p>
                    </div>
                    <span className="px-2 py-2 rounded-full text-[9px] font-semibold bg-orange-50 text-orange-600 border border-orange-100 flex-shrink-0">{content.ui.trending}</span>
                    <ChevronRight size={13} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors flex-shrink-0" aria-hidden="true" />
                  </Link>
                  );
                })}
              </div>
            </section>

            {/* Need Help */}
            <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-4 relative overflow-hidden" aria-labelledby="help-heading">
              <div className="absolute -right-2 -bottom-2 text-6xl opacity-10 pointer-events-none" aria-hidden="true">🤖</div>
              <h2 id="help-heading" className="text-sm font-bold text-[#1A1340] mb-2">{content.ui.needHelpHeading}</h2>
              <p className="text-xs text-[#6B7280] mb-4">{content.ui.needHelpDesc}</p>
              <Link href="/ai-assistant" className="w-full py-4 rounded-xl border border-[#6B3FFF]/30 text-sm font-semibold text-[#6B3FFF] hover:bg-[#F3F0FF] transition-all block text-center" aria-label={content.ui.chatWithAI}>
                {content.ui.chatWithAI}
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
