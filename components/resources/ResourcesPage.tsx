"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search, ChevronRight, Download, FileText, HelpCircle,
  Video, BarChart3, Wrench, Globe, MessageCircle, Phone, Mail,
  Sparkles, BookOpen, Bookmark,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { VoiceSearchButton } from "@/components/ui/VoiceSearchButton";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useLanguage } from "@/hooks/useLanguage";
import { getResourcesContent } from "@/lib/i18n/content/resources";

const RESOURCE_TAB_META = [
  { id: "all", icon: BookOpen },
  { id: "guides", icon: BookOpen },
  { id: "faqs", icon: HelpCircle },
  { id: "videos", icon: Video },
  { id: "reports", icon: BarChart3 },
  { id: "tools", icon: Wrench },
  { id: "links", icon: Globe },
];

type FeaturedResourceMeta = {
  id: string;
  tabId: string;
  typeColor: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  /** Question sent to the AI Assistant when the resource has no dedicated file to open. */
  query?: string;
  /** Plain-text content generated for direct download when the resource is a document. */
  downloadContent?: string;
};

type QuickLinkMeta = {
  id: string;
  icon: string;
  iconBg: string;
  href: string;
};

type PopularDownloadMeta = {
  id: string;
  format: string;
  size: string;
};

const FEATURED_RESOURCES_META: FeaturedResourceMeta[] = [
  {
    id: "1", tabId: "guides", typeColor: "#6B3FFF", icon: FileText, iconBg: "#EDE9FE", iconColor: "#6B3FFF",
    query: "Give me a step-by-step citizen's guide to accessing government services in India.",
  },
  {
    id: "2", tabId: "guides", typeColor: "#6B3FFF", icon: HelpCircle, iconBg: "#D1FAE5", iconColor: "#10B981",
    query: "Explain my fundamental rights as an Indian citizen and how to avail public services.",
  },
  {
    id: "3", tabId: "videos", typeColor: "#F59E0B", icon: Video, iconBg: "#FEF3C7", iconColor: "#F59E0B",
    query: "Walk me through how to file and track a complaint on JanMitra AI, step by step.",
  },
  {
    id: "4", tabId: "reports", typeColor: "#3B82F6", icon: BarChart3, iconBg: "#DBEAFE", iconColor: "#3B82F6",
    downloadContent: "JanMitra AI — Annual Report 2023-24\n\nPerformance Highlights & Key Initiatives\n\n- Citizens served: 10+ Crore\n- Complaints resolved: 92% within SLA\n- New digital services launched: 24\n- States onboarded: 28\n\nFor the full report, please visit the official government portal.",
  },
];

const QUICK_LINKS_META: QuickLinkMeta[] = [
  { id: "1", icon: "🌐", iconBg: "#EDE9FE", href: "https://www.india.gov.in" },
  { id: "2", icon: "📋", iconBg: "#DBEAFE", href: "https://www.india.gov.in/forms" },
  { id: "3", icon: "💬", iconBg: "#D1FAE5", href: "https://pgportal.gov.in" },
  { id: "4", icon: "🛡️", iconBg: "#FEE2E2", href: "https://www.india.gov.in/citizens-charter" },
  { id: "5", icon: "💡", iconBg: "#FEF3C7", href: "https://rti.gov.in" },
  { id: "6", icon: "📢", iconBg: "#FCE7F3", href: "https://www.india.gov.in/announcements" },
  { id: "7", icon: "💻", iconBg: "#EDE9FE", href: "https://digitalindia.gov.in" },
  { id: "8", icon: "🏛️", iconBg: "#D1FAE5", href: "https://www.india.gov.in/website-directory-state-uts" },
];

const POPULAR_DOWNLOADS_META: PopularDownloadMeta[] = [
  { id: "1", format: "PDF", size: "245 KB" },
  { id: "2", format: "PDF", size: "198 KB" },
  { id: "3", format: "PDF", size: "210 KB" },
  { id: "4", format: "PDF", size: "230 KB" },
  { id: "5", format: "PDF", size: "175 KB" },
];

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function ResourcesPage() {
  const { t, currentLanguage } = useLanguage();
  const content = getResourcesContent(currentLanguage.code);
  const { isBookmarked, addItem, removeItem } = useBookmarks();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  function handleSearchKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") e.currentTarget.blur();
  }

  function scrollToFeatured() {
    document.getElementById("featured-res-heading")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleClearFilters() {
    setSearch("");
    setActiveTab("all");
    scrollToFeatured();
  }

  const filteredResources = useMemo(() => {
    const q = search.trim().toLowerCase();
    return FEATURED_RESOURCES_META.filter((meta) => {
      const res = content.featuredResources[meta.id];
      const matchesTab = activeTab === "all" || meta.tabId === activeTab;
      const matchesSearch = !q || res.title.toLowerCase().includes(q) || res.description.toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });
  }, [search, activeTab, content]);

  function handleResourceCta(meta: FeaturedResourceMeta) {
    if (meta.downloadContent) {
      downloadTextFile(`${content.featuredResources[meta.id].title.replace(/\s+/g, "-")}.txt`, meta.downloadContent);
    }
  }

  function toggleResourceBookmark(meta: FeaturedResourceMeta) {
    const title = content.featuredResources[meta.id].title;
    if (isBookmarked(meta.id)) {
      removeItem(meta.id);
    } else {
      addItem({ id: meta.id, type: "resource", title, href: `/resources#${meta.id}` });
    }
  }

  function handleDownload(meta: PopularDownloadMeta) {
    const name = content.popularDownloads?.[meta.id]?.name ?? meta.id;
    const fileContent = `${name}\n\nFormat: ${meta.format}\nSize: ${meta.size}\n\nThis is a placeholder copy of the official form. Please verify against the latest version on the relevant government portal before submission.`;
    downloadTextFile(`${name.replace(/\s+/g, "-")}.txt`, fileContent);
  }

  function goToTab(tabId: string) {
    setActiveTab(tabId);
    scrollToFeatured();
  }

  return (
    <div className="overflow-y-auto h-full" id="main-content">
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 lg:space-y-12 max-w-[1600px] mx-auto">

        {/* ── Hero ── */}
        <div className="relative rounded-[28px] overflow-hidden" style={{ minHeight: "165px" }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#F5F3FF,#EDE9FE 25%,#FFF7ED 70%,#FFFBEB)" }} aria-hidden="true" />
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
            style={{ WebkitMaskImage: "linear-gradient(to right,transparent 35%,rgba(0,0,0,0.4) 50%,black 72%)", maskImage: "linear-gradient(to right,transparent 35%,rgba(0,0,0,0.4) 50%,black 72%)" }}>
            <Image src="/images/india-gate.png" alt="" fill className="object-cover object-right" quality={75} sizes="1200px" />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right,rgba(245,243,255,0.97) 0%,rgba(245,243,255,0.88) 33%,transparent 58%)" }} aria-hidden="true" />

          <div className="relative z-10 px-5 py-6 sm:px-8 sm:py-8">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1A1340]">{t("resources.title")}</h1>
            <p className="text-sm text-[#6B7280] mt-2">{t("resources.subtitle")}</p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2 mt-4 sm:max-w-xl">
              <div className="flex-1 flex items-center gap-2 bg-white border border-[#E8E4F8] rounded-xl px-4 py-3.5 sm:py-4 shadow-sm focus-within:ring-2 focus-within:ring-[#6B3FFF]/20 min-w-0">
                <Search size={15} className="text-[#9CA3AF] flex-shrink-0" aria-hidden="true" />
                <input type="search" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleSearchKey}
                  placeholder={content.ui.searchPlaceholder}
                  className="flex-1 min-w-0 text-sm text-[#374151] placeholder-[#9CA3AF] bg-transparent outline-none" aria-label="Search resources" />
                <VoiceSearchButton onResult={setSearch} className="w-6 h-6" />
              </div>
              <button onClick={scrollToFeatured} className="flex items-center justify-center gap-2 px-4 py-3.5 sm:py-4 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }} aria-label="Search">
                <Search size={14} aria-hidden="true" /> {t("common.search")}
              </button>
            </div>
          </div>
        </div>

        {/* ── Tab bar ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Resource categories">
          {RESOURCE_TAB_META.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} role="tab" aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 border flex-shrink-0",
                  activeTab === tab.id
                    ? "bg-[#F3F0FF] text-[#6B3FFF] border-[#6B3FFF]/30"
                    : "bg-white text-[#6B7280] border-[#E8E4F8] hover:bg-[#F9F8FF]"
                )}>
                <Icon size={13} aria-hidden="true" />
                {content.resourceTabs[tab.id]}
              </button>
            );
          })}
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_256px] gap-6">
          {/* Main */}
          <div className="space-y-6">
            {/* Featured Resources */}
            <section aria-labelledby="featured-res-heading">
              <div className="flex items-center justify-between mb-4">
                <h2 id="featured-res-heading" className="text-base font-bold text-[#1A1340]">{content.ui.featuredResourcesHeading}</h2>
                <button onClick={handleClearFilters} className="text-sm text-[#6B3FFF] hover:underline">{t("common.viewAll")}</button>
              </div>
              {filteredResources.length === 0 ? (
                <div className="bg-white rounded-[20px] border border-[#E8E4F8] p-8 text-center">
                  <p className="text-sm text-[#6B7280]">{content.ui.noResourcesMatch}</p>
                  <button onClick={handleClearFilters} className="mt-3 text-xs font-semibold text-[#6B3FFF] hover:underline">{content.ui.clearFilters}</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredResources.map(meta => {
                    const res = content.featuredResources[meta.id];
                    const saved = isBookmarked(meta.id);
                    const ctaButton = (
                      <button onClick={() => handleResourceCta(meta)} className="flex items-center gap-2 text-xs font-semibold transition-colors hover:opacity-80" style={{ color: meta.iconColor }}
                        aria-label={`${res.cta} ${res.title}`}>
                        {res.cta} <ChevronRight size={13} aria-hidden="true" />
                      </button>
                    );
                    return (
                      <article key={meta.id} id={meta.id}
                        className="bg-white rounded-[20px] border border-[#E8E4F8] p-4 flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                        aria-label={res.title}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: meta.iconBg }} aria-hidden="true">
                              <meta.icon size={18} style={{ color: meta.iconColor }} />
                            </div>
                            <span className="text-xs font-semibold" style={{ color: meta.typeColor }}>{res.type}</span>
                          </div>
                          <button onClick={() => toggleResourceBookmark(meta)} aria-label={saved ? "Remove bookmark" : "Save resource"}
                            aria-pressed={saved} className="p-1 rounded-lg hover:bg-[#F3F0FF] transition-colors flex-shrink-0">
                            <Bookmark size={15} className={saved ? "text-[#6B3FFF] fill-[#6B3FFF]" : "text-[#D1D5DB]"} />
                          </button>
                        </div>
                        <h3 className="text-sm font-bold text-[#1A1340] leading-snug mb-2">{res.title}</h3>
                        <p className="text-xs text-[#6B7280] leading-relaxed flex-1 mb-4">{res.description}</p>
                        {meta.query ? (
                          <Link href={`/ai-assistant?q=${encodeURIComponent(meta.query)}`} className="flex items-center gap-2 text-xs font-semibold transition-colors hover:opacity-80" style={{ color: meta.iconColor }}
                            aria-label={`${res.cta} ${res.title}`}>
                            {res.cta} <ChevronRight size={13} aria-hidden="true" />
                          </Link>
                        ) : ctaButton}
                      </article>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Quick Links */}
            <section aria-labelledby="quick-links-heading">
              <h2 id="quick-links-heading" className="text-base font-bold text-[#1A1340] mb-4">{content.ui.quickLinksHeading}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {QUICK_LINKS_META.map(meta => {
                  const link = content.quickLinks[meta.id];
                  return (
                  <a key={meta.id} href={meta.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 p-6 bg-white rounded-[20px] border border-[#E8E4F8] hover:bg-[#F9F8FF] hover:border-[#6B3FFF]/20 hover:-translate-y-0.5 transition-all duration-200 text-left group"
                    aria-label={link.label}>
                    <div className="w-10 h-10 rounded-xl text-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: meta.iconBg }} aria-hidden="true">
                      {meta.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1A1340] truncate group-hover:text-[#6B3FFF] transition-colors">{link.label}</p>
                      <p className="text-xs text-[#9CA3AF] truncate">{link.sub}</p>
                    </div>
                    <ChevronRight size={15} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors flex-shrink-0" aria-hidden="true" />
                  </a>
                  );
                })}
              </div>
            </section>

            {/* Footer contact bar */}
            <div className="bg-white rounded-[20px] border border-[#E8E4F8] px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <HelpCircle size={18} className="text-[#6B3FFF]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1340]">{content.ui.cantFindHeading}</p>
                  <p className="text-xs text-[#9CA3AF]">{content.ui.cantFindDesc}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <a href="tel:1800115656" className="flex items-center gap-2">
                  <Phone size={16} className="text-[#6B3FFF]" aria-hidden="true" />
                  <div>
                    <p className="text-[10px] text-[#9CA3AF]">{content.ui.callUs}</p>
                    <p className="text-xs font-bold text-[#1A1340]">1800-11-5656</p>
                  </div>
                </a>
                <a href="mailto:support@janmitra.gov.in" className="flex items-center gap-2">
                  <Mail size={16} className="text-[#6B3FFF]" aria-hidden="true" />
                  <div>
                    <p className="text-[10px] text-[#9CA3AF]">{content.ui.emailUs}</p>
                    <p className="text-xs font-bold text-[#1A1340]">support@janmitra.gov.in</p>
                  </div>
                </a>
                <Link href="/ai-assistant" className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#6B3FFF]/30 text-sm font-semibold text-[#6B3FFF] hover:bg-[#F3F0FF] transition-all"
                  aria-label="Chat with AI Assistant">
                  <Sparkles size={14} aria-hidden="true" /> {t("common.chatNow")}
                </Link>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Help & Support */}
            <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="help-support-heading">
              <h2 id="help-support-heading" className="text-sm font-bold text-[#1A1340] mb-2">{content.ui.helpSupportHeading}</h2>
              <p className="text-xs text-[#9CA3AF] mb-4">{content.ui.helpSupportDesc}</p>
              <div className="space-y-2">
                <button onClick={() => goToTab("faqs")}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#F9F8FF] border border-transparent hover:border-[#E8E4F8] transition-all text-left group"
                  aria-label="Frequently Asked Questions">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#EDE9FE" }} aria-hidden="true">
                    <HelpCircle size={16} style={{ color: "#6B3FFF" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1A1340] truncate">{content.ui.faqLabel}</p>
                    <p className="text-[10px] text-[#9CA3AF] truncate">{content.ui.faqSub}</p>
                  </div>
                  <ChevronRight size={13} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors flex-shrink-0" aria-hidden="true" />
                </button>
                <button onClick={() => goToTab("guides")}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#F9F8FF] border border-transparent hover:border-[#E8E4F8] transition-all text-left group"
                  aria-label="User Guides">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#D1FAE5" }} aria-hidden="true">
                    <FileText size={16} style={{ color: "#10B981" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1A1340] truncate">{content.ui.userGuidesLabel}</p>
                    <p className="text-[10px] text-[#9CA3AF] truncate">{content.ui.userGuidesSub}</p>
                  </div>
                  <ChevronRight size={13} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors flex-shrink-0" aria-hidden="true" />
                </button>
                <Link href={`/ai-assistant?q=${encodeURIComponent("I need help — can you connect me with support or answer my question?")}`}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#F9F8FF] border border-transparent hover:border-[#E8E4F8] transition-all text-left group"
                  aria-label="Contact Support">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#DBEAFE" }} aria-hidden="true">
                    <MessageCircle size={16} style={{ color: "#3B82F6" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1A1340] truncate">{content.ui.contactSupportLabel}</p>
                    <p className="text-[10px] text-[#9CA3AF] truncate">{content.ui.contactSupportSub}</p>
                  </div>
                  <ChevronRight size={13} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors flex-shrink-0" aria-hidden="true" />
                </Link>
              </div>
            </section>

            {/* Popular Downloads */}
            <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="downloads-heading">
              <div className="flex items-center justify-between mb-4">
                <h2 id="downloads-heading" className="text-sm font-bold text-[#1A1340]">{content.ui.popularDownloadsHeading}</h2>
                <button
                  onClick={() => POPULAR_DOWNLOADS_META.forEach((dl) => handleDownload(dl))}
                  className="text-xs text-[#6B3FFF] hover:underline">{t("common.viewAll")}</button>
              </div>
              <div className="space-y-2">
                {POPULAR_DOWNLOADS_META.map(dl => {
                  const name = content.popularDownloads[dl.id].name;
                  return (
                  <div key={dl.id} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <FileText size={14} className="text-[#EF4444]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[#1A1340] truncate">{name}</p>
                      <p className="text-[10px] text-[#9CA3AF]">{dl.format} · {dl.size}</p>
                    </div>
                    <button onClick={() => handleDownload(dl)} className="p-2 rounded-lg hover:bg-[#F3F0FF] text-[#9CA3AF] hover:text-[#6B3FFF] transition-colors flex-shrink-0"
                      aria-label={`Download ${name}`}>
                      <Download size={14} aria-hidden="true" />
                    </button>
                  </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
