"use client";

import { useState, useRef, useEffect, useMemo, type KeyboardEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search, ChevronRight, ArrowLeft, Bookmark, Share2, CheckCircle2,
  Clock, Monitor, Globe, Users, Sparkles, Star, ExternalLink,
  MessageCircle, ShieldCheck, Lock, Eye, LayoutGrid,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { VoiceSearchButton } from "@/components/ui/VoiceSearchButton";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useLanguage } from "@/hooks/useLanguage";
import { getServicesContent } from "@/lib/i18n/content/services";

type TopService = {
  id: string;
  icon: string;
  iconBg: string;
  category: string;
  officialPortal: string;
  isPopular?: boolean;
};

// Non-translatable facts about each service: icon, category, official portal
// domain and "popular" flag. All display text is sourced per-language from
// getServicesContent() below.
const TOP_SERVICES_META: TopService[] = [
  { id: "dl-renewal", icon: "🪪", iconBg: "#EDE9FE", category: "transport", officialPortal: "parivahan.gov.in", isPopular: true },
  { id: "passport", icon: "📘", iconBg: "#DBEAFE", category: "identity", officialPortal: "passportindia.gov.in", isPopular: true },
  { id: "aadhaar", icon: "🆔", iconBg: "#FEE2E2", category: "identity", officialPortal: "uidai.gov.in" },
  { id: "pan", icon: "💳", iconBg: "#D1FAE5", category: "finance", officialPortal: "onlineservices.nsdl.com" },
  { id: "voter-id", icon: "🗳️", iconBg: "#FEF3C7", category: "identity", officialPortal: "voters.eci.gov.in" },
];

const CATEGORY_META: { id: string; icon: string; iconBg: string }[] = [
  { id: "identity", icon: "🪪", iconBg: "#EDE9FE" },
  { id: "transport", icon: "🚗", iconBg: "#DBEAFE" },
  { id: "education", icon: "🎓", iconBg: "#FCE7F3" },
  { id: "health", icon: "❤️", iconBg: "#FEE2E2" },
  { id: "finance", icon: "₹", iconBg: "#FEF3C7" },
  { id: "housing", icon: "🏠", iconBg: "#D1FAE5" },
  { id: "employment", icon: "💼", iconBg: "#E0E7FF" },
  { id: "business", icon: "📊", iconBg: "#EDE9FE" },
  { id: "agriculture", icon: "🌿", iconBg: "#D1FAE5" },
];

const TABS = ["Overview", "Eligibility", "Documents", "Process", "Fees", "FAQs"] as const;
type Tab = (typeof TABS)[number];

export default function ServicesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, currentLanguage } = useLanguage();
  const { isServiceSaved, toggleService } = useBookmarks();
  const content = getServicesContent(currentLanguage.code);

  const initialServiceId = searchParams.get("service");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string>(
    initialServiceId && content.serviceDetails[initialServiceId] ? initialServiceId : "dl-renewal"
  );
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const selectedMeta = TOP_SERVICES_META.find((s) => s.id === selectedId) ?? TOP_SERVICES_META[0];
  const selectedService = content.serviceDetails[selectedId] ?? content.serviceDetails["dl-renewal"];

  // Deep-link support: /services?service=<id> selects that service on load.
  useEffect(() => {
    const svc = searchParams.get("service");
    if (svc && content.serviceDetails[svc] && svc !== selectedId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedId(svc);
      setActiveTab("Overview");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function selectService(id: string) {
    setSelectedId(id);
    setActiveTab("Overview");
    router.replace(`/services?service=${id}`, { scroll: false });
  }

  function handleSearchKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") e.currentTarget.blur();
  }

  const filteredTopServices = useMemo(() => {
    return TOP_SERVICES_META.filter((svc) => {
      const label = content.topServices[svc.id]?.label ?? "";
      const sub = content.topServices[svc.id]?.sub ?? "";
      const matchesSearch =
        !search.trim() ||
        label.toLowerCase().includes(search.toLowerCase()) ||
        sub.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !activeCategory || svc.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory, content]);

  function handleShare() {
    const url = `${window.location.origin}/services?service=${selectedId}`;
    if (navigator.share) {
      void navigator.share({ title: selectedService.title, text: selectedService.subtitle, url });
      return;
    }
    void navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  }

  const saved = isServiceSaved(selectedId);

  return (
    <div className="overflow-y-auto h-full" id="main-content">
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 lg:space-y-12 max-w-[1600px] mx-auto">
        {/* ── Hero header ── */}
        <div className="relative rounded-[28px] overflow-hidden" style={{ minHeight: "150px" }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#F5F3FF,#EDE9FE 25%,#FFF7ED 70%,#FFFBEB)" }} aria-hidden="true" />
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              WebkitMaskImage: "linear-gradient(to right,transparent 40%,rgba(0,0,0,0.4) 55%,rgba(0,0,0,0.9) 75%,black 90%)",
              maskImage: "linear-gradient(to right,transparent 40%,rgba(0,0,0,0.4) 55%,rgba(0,0,0,0.9) 75%,black 90%)",
            }}
          >
            <Image src="/images/india-gate.png" alt="" fill className="object-cover object-right" quality={75} sizes="1200px" />
          </div>
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right,rgba(245,243,255,0.97) 0%,rgba(245,243,255,0.88) 38%,rgba(245,243,255,0.15) 60%,transparent 72%)" }}
            aria-hidden="true"
          />
          {/* Indian flag emoji top-right */}
          <div className="absolute top-4 right-6 text-3xl" aria-hidden="true">🇮🇳</div>

          <div className="relative z-10 px-5 py-6 sm:px-8 sm:py-8">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1A1340]">{t("services.title")}</h1>
            <p className="text-sm text-[#6B7280] mt-2">
              {t("services.subtitle")}
            </p>

            {/* Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-4">
              <div className="flex-1 flex items-center gap-2 bg-white rounded-xl border border-[#E8E4F8] shadow-sm px-4 py-3.5 sm:py-4 sm:max-w-xl min-w-0">
                <Search size={16} className="text-[#9CA3AF] flex-shrink-0" aria-hidden="true" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleSearchKey}
                  placeholder={t("services.searchPlaceholder")}
                  className="flex-1 min-w-0 text-sm text-[#374151] placeholder-[#9CA3AF] bg-transparent outline-none"
                  aria-label={content.ui.searchAriaLabel}
                />
                <VoiceSearchButton onResult={setSearch} className="w-8 h-8" />
                <button
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
                  aria-label="Search"
                  onClick={() => categoriesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                >
                  <Search size={14} aria-hidden="true" />
                </button>
              </div>
              <button
                onClick={() => categoriesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="flex items-center justify-center gap-2 px-4 py-3.5 sm:py-4 bg-white border border-[#E8E4F8] rounded-xl text-sm font-medium text-[#374151] hover:bg-[#F9F8FF] transition-colors shadow-sm flex-shrink-0"
              >
                <LayoutGrid size={15} className="text-[#6B3FFF]" aria-hidden="true" />
                {t("common.browseCategories")}
              </button>
            </div>
          </div>
        </div>

        {/* ── Categories ── */}
        <section aria-labelledby="categories-heading" ref={categoriesRef}>
          <div className="flex items-center justify-between mb-4">
            <h2 id="categories-heading" className="text-base font-semibold text-[#1A1340]">{t("services.popularCategories")}</h2>
            {activeCategory && (
              <button
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-2 text-sm text-[#6B3FFF] hover:underline"
              >
                {content.ui.clearFilter} <ChevronRight size={14} aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="flex sm:grid sm:grid-cols-7 lg:grid-cols-9 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 sm:pb-0" role="list">
            {CATEGORY_META.map((cat) => {
              const label = content.categories[cat.id] ?? cat.id;
              return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory((prev) => (prev === cat.id ? null : cat.id))}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 bg-white rounded-[20px] border transition-all duration-200 group flex-shrink-0 w-20 sm:w-auto",
                  activeCategory === cat.id
                    ? "border-[#6B3FFF] shadow-md -translate-y-0.5"
                    : "border-[#E8E4F8] hover:border-[#6B3FFF]/30 hover:shadow-md hover:-translate-y-0.5"
                )}
                aria-pressed={activeCategory === cat.id}
                aria-label={label.replace("\n", " ")}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: cat.iconBg }} aria-hidden="true">
                  {cat.icon}
                </div>
                <span className="text-[11px] font-medium text-[#374151] group-hover:text-[#6B3FFF] text-center leading-tight whitespace-pre-line transition-colors">
                  {label}
                </span>
              </button>
              );
            })}
          </div>
        </section>

        {/* ── Three-column: Top Services | Service Detail | Right Sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_240px] gap-6">
          {/* Top Services list */}
          <aside aria-labelledby="top-services-heading">
            <div className="flex items-center justify-between mb-4">
              <h2 id="top-services-heading" className="text-sm font-semibold text-[#1A1340]">{t("services.topServices")}</h2>
            </div>
            <div className="space-y-2">
              {filteredTopServices.length === 0 && (
                <p className="text-xs text-[#9CA3AF] px-2 py-4">{content.ui.noServicesMatch}</p>
              )}
              {filteredTopServices.map((svc) => {
                const meta = content.topServices[svc.id];
                return (
                <button
                  key={svc.id}
                  onClick={() => selectService(svc.id)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left group",
                    svc.id === selectedId
                      ? "bg-[#F3F0FF] border-[#6B3FFF]/30"
                      : "bg-white border-[#E8E4F8] hover:bg-[#F9F8FF] hover:border-[#E8E4F8]"
                  )}
                  aria-label={meta.label}
                  aria-pressed={svc.id === selectedId}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ backgroundColor: svc.iconBg }} aria-hidden="true">
                    {svc.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-xs font-semibold truncate", svc.id === selectedId ? "text-[#6B3FFF]" : "text-[#1A1340]")}>{meta.label}</p>
                    <p className="text-[10px] text-[#9CA3AF] truncate">{meta.sub}</p>
                  </div>
                  <ChevronRight size={13} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors flex-shrink-0" aria-hidden="true" />
                </button>
                );
              })}

              {/* Can't find CTA */}
              <Link
                href={`/ai-assistant?q=${encodeURIComponent("I can't find the government service I need. Can you help me?")}`}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#F3F0FF] border border-[#E8E4F8] hover:bg-[#EDE9FE] transition-all text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-[#EDE9FE] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Sparkles size={16} className="text-[#6B3FFF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#6B3FFF]">{content.ui.cantFindService}</p>
                  <p className="text-[10px] text-[#9CA3AF]">{content.ui.askJanMitra}</p>
                </div>
                <ChevronRight size={13} className="text-[#6B3FFF]" aria-hidden="true" />
              </Link>
            </div>
          </aside>

          {/* Service Detail Panel */}
          <article className="bg-white rounded-[20px] border border-[#E8E4F8] overflow-hidden" aria-label={`${selectedService.title} details`}>
            {/* Back + title */}
            <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-0">
              <button
                onClick={() => router.push("/services")}
                className="flex items-center gap-2 text-xs text-[#6B7280] hover:text-[#6B3FFF] transition-colors mb-4"
                aria-label={content.ui.backToAllServices}
              >
                <ArrowLeft size={13} aria-hidden="true" /> {content.ui.backToAllServices}
              </button>

              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EDE9FE] flex items-center justify-center flex-shrink-0 text-2xl" aria-hidden="true">
                    {selectedMeta.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-lg font-bold text-[#1A1340]">{selectedService.title}</h1>
                      {selectedMeta.isPopular && (
                        <span className="px-2 py-2 rounded-full text-[10px] font-semibold bg-[#6B3FFF] text-white">{content.ui.popular}</span>
                      )}
                    </div>
                    <p className="text-xs text-[#6B7280] mt-2">{selectedService.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleService(selectedId)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium transition-all",
                      saved ? "bg-[#EDE9FE] border-[#6B3FFF]/30 text-[#6B3FFF]" : "border-[#E8E4F8] text-[#6B7280] hover:bg-[#F9F8FF]"
                    )}
                    aria-pressed={saved}
                    aria-label={saved ? t("common.saved") : t("common.save")}
                  >
                    <Bookmark size={13} aria-hidden="true" /> {saved ? t("common.saved") : t("common.save")}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E8E4F8] text-xs font-medium text-[#6B7280] hover:bg-[#F9F8FF] transition-all"
                    aria-label={t("common.share")}
                  >
                    <Share2 size={13} aria-hidden="true" /> {shareCopied ? content.ui.copied : t("common.share")}
                  </button>
                </div>
              </div>

              {/* Quick info row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { icon: Users, label: content.ui.whoCanApply, value: selectedService.whoCanApply },
                  { icon: Star, label: content.ui.validity, value: selectedService.validity },
                  { icon: Clock, label: content.ui.processingTime, value: selectedService.processingTime },
                  { icon: Monitor, label: content.ui.mode, value: selectedService.mode },
                  { icon: Globe, label: content.ui.officialPortal, value: selectedMeta.officialPortal, isLink: true },
                ].map(({ icon: Icon, label, value, isLink }) => (
                  <div key={label} className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#F3F0FF] flex items-center justify-center flex-shrink-0 mt-2" aria-hidden="true">
                      <Icon size={13} className="text-[#6B3FFF]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#9CA3AF]">{label}</p>
                      {isLink ? (
                        <a href={`https://${value}`} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#6B3FFF] hover:underline">{value}</a>
                      ) : (
                        <p className="text-xs font-semibold text-[#1A1340]">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex gap-0 border-b border-[#F3F0FF] overflow-x-auto" role="tablist" aria-label="Service information tabs">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200",
                      activeTab === tab
                        ? "border-[#6B3FFF] text-[#6B3FFF]"
                        : "border-transparent text-[#6B7280] hover:text-[#1A1340]"
                    )}
                  >
                    {content.ui.tabs[tab.toLowerCase() as keyof typeof content.ui.tabs]}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="px-4 sm:px-6 py-5 sm:py-6" role="tabpanel">
              {activeTab === "Overview" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-[#1A1340] mb-2">{content.ui.description}</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{selectedService.description}</p>
                    <ul className="mt-4 space-y-2">
                      {selectedService.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-[#374151]">
                          <CheckCircle2 size={13} className="text-[#10B981]" aria-hidden="true" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-sm text-[#6B7280] leading-relaxed">{selectedService.overview}</div>
                </div>
              )}
              {activeTab === "Eligibility" && (
                <ul className="space-y-2">
                  {selectedService.eligibility.map((e) => (
                    <li key={e} className="flex items-start gap-2 text-sm text-[#374151]">
                      <CheckCircle2 size={15} className="text-[#10B981] flex-shrink-0 mt-2" aria-hidden="true" /> {e}
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === "Documents" && (
                <ul className="space-y-2">
                  {selectedService.documents.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-[#374151]">
                      <CheckCircle2 size={15} className="text-[#10B981] flex-shrink-0 mt-2" aria-hidden="true" /> {d}
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === "Process" && (
                <ol className="space-y-4">
                  {selectedService.process.map((p, i) => (
                    <li key={p} className="flex items-start gap-4 text-sm text-[#374151]">
                      <span className="w-6 h-6 rounded-full bg-[#EDE9FE] text-[#6B3FFF] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-2">{i + 1}</span>
                      {p}
                    </li>
                  ))}
                </ol>
              )}
              {activeTab === "Fees" && (
                <div className="bg-[#F9F8FF] rounded-xl p-4 inline-block">
                  <p className="text-sm font-semibold text-[#1A1340]">{selectedService.fees}</p>
                  <p className="text-xs text-[#9CA3AF] mt-2">{content.ui.feesNote}</p>
                </div>
              )}
              {activeTab === "FAQs" && (
                <div className="space-y-4">
                  {selectedService.faqs.map((faq) => (
                    <div key={faq.q}>
                      <p className="text-sm font-semibold text-[#1A1340] mb-2">{faq.q}</p>
                      <p className="text-sm text-[#6B7280]">{faq.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA buttons */}
            <div className="px-4 sm:px-6 pb-5 sm:pb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href={`https://${selectedMeta.officialPortal}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-xl text-sm font-semibold text-white hover:opacity-90 hover:shadow-lg transition-all"
                style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
                aria-label={t("common.applyNow")}
              >
                {t("common.applyNow")} <ExternalLink size={14} aria-hidden="true" />
              </a>
              <Link
                href={`/ai-assistant?q=${encodeURIComponent(`Am I eligible for ${selectedService.title}? What do I need?`)}`}
                className="flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-xl border border-[#6B3FFF]/30 text-sm font-semibold text-[#6B3FFF] hover:bg-[#F3F0FF] transition-all"
                aria-label={content.ui.checkEligibility}
              >
                {content.ui.checkEligibility} <ChevronRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </article>

          {/* Right sidebar */}
          <aside className="space-y-6" aria-label="Service sidebar">
            {/* AI Eligibility Check */}
            <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="elig-heading">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={15} className="text-[#6B3FFF]" aria-hidden="true" />
                <h2 id="elig-heading" className="text-sm font-semibold text-[#1A1340]">{content.ui.aiEligibilityCheck}</h2>
              </div>
              <p className="text-xs text-[#6B7280] mb-4">{content.ui.aiEligibilityDesc}</p>
              <Link
                href={`/ai-assistant?q=${encodeURIComponent(`Check my eligibility for ${selectedService.title}`)}`}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all"
                style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
                aria-label={t("common.checkNow")}
              >
                {t("common.checkNow")} <Sparkles size={13} aria-hidden="true" />
              </Link>
            </section>

            {/* You may also need */}
            <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="also-heading">
              <h2 id="also-heading" className="text-sm font-semibold text-[#1A1340] mb-4">{content.ui.youMayAlsoNeed}</h2>
              <div className="space-y-2">
                {content.youMayNeed.map((s) => (
                  <Link
                    key={s.id}
                    href={`/ai-assistant?q=${encodeURIComponent(s.q)}`}
                    className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[#F9F8FF] transition-colors text-left group"
                    aria-label={s.label}
                  >
                    <div className="w-5 h-5 rounded-md bg-[#EDE9FE] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <CheckCircle2 size={11} className="text-[#6B3FFF]" />
                    </div>
                    <span className="text-xs text-[#374151] group-hover:text-[#6B3FFF] transition-colors flex-1">{s.label}</span>
                    <ChevronRight size={12} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>

            {/* Need help */}
            <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="help-heading">
              <h2 id="help-heading" className="text-sm font-semibold text-[#1A1340] mb-2">{content.ui.needHelp}</h2>
              <p className="text-xs text-[#6B7280] mb-4">{content.ui.needHelpDesc}</p>
              <Link
                href={`/ai-assistant?q=${encodeURIComponent(`I need help with ${selectedService.title}`)}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#6B3FFF]/30 text-xs font-semibold text-[#6B3FFF] hover:bg-[#F3F0FF] transition-all"
                aria-label={t("common.chatNow")}
              >
                <MessageCircle size={13} aria-hidden="true" /> {t("common.chatNow")}
              </Link>
            </section>
          </aside>
        </div>

        {/* Trust footer */}
        <section className="bg-white rounded-[20px] border border-[#E8E4F8] px-6 py-6" aria-label="Security and trust">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#EDE9FE] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <ShieldCheck size={22} className="text-[#6B3FFF]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1A1340]">{content.ui.secureTrusted}</p>
                <p className="text-xs text-[#6B7280] max-w-xs">{content.ui.secureTrustedDesc}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 sm:ml-auto">
              {[
                { icon: ShieldCheck, label: content.ui.govtVerified, sub: content.ui.officialSource },
                { icon: Lock, label: content.ui.securePlatform, sub: content.ui.endToEnd },
                { icon: Eye, label: content.ui.privacyFirst, sub: content.ui.privacyMatters },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={16} className="text-[#6B3FFF]" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold text-[#1A1340]">{label}</p>
                    <p className="text-[10px] text-[#9CA3AF]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
