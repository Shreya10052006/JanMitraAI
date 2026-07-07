"use client";

import { useState, type KeyboardEvent } from "react";
import {
  Search, ChevronRight, ArrowLeft, Bookmark, Share2, CheckCircle2,
  Clock, Monitor, Globe, Users, Sparkles, Star, ExternalLink,
  MessageCircle, ShieldCheck, Lock, Eye, LayoutGrid,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/utils/cn";

type ServiceDetail = {
  id: string;
  title: string;
  subtitle: string;
  isPopular?: boolean;
  whoCanApply: string;
  validity: string;
  processingTime: string;
  mode: string;
  officialPortal: string;
  description: string;
  features: string[];
  overview: string;
  eligibility: string[];
  documents: string[];
  process: string[];
  fees: string;
  faqs: { q: string; a: string }[];
};

type TopService = {
  id: string;
  label: string;
  sub: string;
  icon: string;
  iconBg: string;
};

const CATEGORIES = [
  { id: "identity", label: "Identity &\nDocuments", icon: "🪪", iconBg: "#EDE9FE" },
  { id: "transport", label: "Transport", icon: "🚗", iconBg: "#DBEAFE" },
  { id: "education", label: "Education", icon: "🎓", iconBg: "#FCE7F3" },
  { id: "health", label: "Health", icon: "❤️", iconBg: "#FEE2E2" },
  { id: "finance", label: "Finance & Tax", icon: "₹", iconBg: "#FEF3C7" },
  { id: "housing", label: "Housing", icon: "🏠", iconBg: "#D1FAE5" },
  { id: "employment", label: "Employment", icon: "💼", iconBg: "#E0E7FF" },
  { id: "business", label: "Business", icon: "📊", iconBg: "#EDE9FE" },
  { id: "agriculture", label: "Agriculture", icon: "🌿", iconBg: "#D1FAE5" },
];

const TOP_SERVICES: TopService[] = [
  { id: "dl-renewal", label: "Driving License Renewal", sub: "Renew your driving license online", icon: "🪪", iconBg: "#EDE9FE" },
  { id: "passport", label: "Passport Seva", sub: "Apply for new passport or re-issue", icon: "📘", iconBg: "#DBEAFE" },
  { id: "aadhaar", label: "Aadhaar Services", sub: "Update, download, or verify Aadhaar", icon: "🆔", iconBg: "#FEE2E2" },
  { id: "pan", label: "PAN Card", sub: "Apply for new PAN or corrections", icon: "💳", iconBg: "#D1FAE5" },
  { id: "voter-id", label: "Voter ID Card", sub: "Apply for new voter ID or corrections", icon: "🗳️", iconBg: "#FEF3C7" },
];

const YOU_MAY_NEED = [
  "Change of Address in DL",
  "DL Duplicate Copy",
  "International Driving Permit",
  "Book Driving Test Slot",
];

const DL_SERVICE: ServiceDetail = {
  id: "dl-renewal",
  title: "Driving License Renewal",
  subtitle: "Renew your driving license online through the Parivahan Sewa portal",
  isPopular: true,
  whoCanApply: "All Indian citizens with valid DL",
  validity: "20 years or till age 50",
  processingTime: "3 – 7 working days",
  mode: "Online",
  officialPortal: "parivahan.gov.in",
  description:
    "Renew your driving license before it expires to continue driving legally. You can renew online easily without visiting the RTO office.",
  features: ["Quick & easy online process", "Home delivery of DL", "Secure & government verified"],
  overview: "Your DL is valid for 20 years or until you turn 50. Renewal can be done 1 year before expiry or up to 5 years after.",
  eligibility: [
    "Indian citizen with a valid or recently expired DL",
    "DL must be expired within the last 5 years",
    "No pending court cases against the DL",
    "Medical fitness certificate (if age > 40)",
  ],
  documents: [
    "Original Driving License",
    "Aadhaar Card or valid ID proof",
    "Address proof",
    "Passport-size photograph",
    "Medical Certificate Form 1A (if age > 40)",
  ],
  process: [
    "Visit parivahan.gov.in and log in",
    "Select 'DL Renewal' under Driving License services",
    "Fill in the required details and upload documents",
    "Pay the renewal fee online",
    "Book a slot for biometric if required",
    "Receive renewed DL at your registered address",
  ],
  fees: "₹200 – ₹600 depending on DL category",
  faqs: [
    { q: "What if my DL is expired for more than 5 years?", a: "You may need to appear for a fresh driving test. Visit your nearest RTO." },
    { q: "Can I renew DL offline?", a: "Yes, you can visit your nearest RTO with the required documents." },
    { q: "How long does it take to get the renewed DL?", a: "Typically 3–7 working days after document verification." },
  ],
};

const TABS = ["Overview", "Eligibility", "Documents", "Process", "Fees", "FAQs"] as const;
type Tab = (typeof TABS)[number];

export default function ServicesPage() {
  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState<ServiceDetail>(DL_SERVICE);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [saved, setSaved] = useState(false);

  function handleSearchKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && search.trim()) {
      // future: filter services
    }
  }

  return (
    <div className="overflow-y-auto h-full" id="main-content">
      <div className="px-10 py-8 space-y-8 max-w-[1600px] mx-auto">
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

          <div className="relative z-10 px-8 py-7">
            <h1 className="text-2xl font-bold text-[#1A1340]">Government Services</h1>
            <p className="text-sm text-[#6B7280] mt-1">
              Find and access{" "}
              <span className="text-[#6B3FFF] font-medium">1000+ government services</span>{" "}
              with AI guidance
            </p>

            {/* Search */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex-1 flex items-center gap-2 bg-white rounded-xl border border-[#E8E4F8] shadow-sm px-4 py-2.5 max-w-xl">
                <Search size={16} className="text-[#9CA3AF] flex-shrink-0" aria-hidden="true" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleSearchKey}
                  placeholder="Search for services like Driving License, Passport, Birth Certificate..."
                  className="flex-1 text-sm text-[#374151] placeholder-[#9CA3AF] bg-transparent outline-none"
                  aria-label="Search government services"
                />
                <button
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
                  aria-label="Search"
                >
                  <Search size={14} aria-hidden="true" />
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8E4F8] rounded-xl text-sm font-medium text-[#374151] hover:bg-[#F9F8FF] transition-colors shadow-sm">
                <LayoutGrid size={15} className="text-[#6B3FFF]" aria-hidden="true" />
                Browse Categories
              </button>
            </div>
          </div>
        </div>

        {/* ── Categories ── */}
        <section aria-labelledby="categories-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 id="categories-heading" className="text-base font-semibold text-[#1A1340]">Popular Categories</h2>
            <button className="flex items-center gap-1 text-sm text-[#6B3FFF] hover:underline">
              View All Categories <ChevronRight size={14} aria-hidden="true" />
            </button>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-9 gap-4" role="list">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className="flex flex-col items-center gap-2 p-3 bg-white rounded-[20px] border border-[#E8E4F8] hover:border-[#6B3FFF]/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                role="listitem"
                aria-label={cat.label.replace("\n", " ")}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: cat.iconBg }} aria-hidden="true">
                  {cat.icon}
                </div>
                <span className="text-[11px] font-medium text-[#374151] group-hover:text-[#6B3FFF] text-center leading-tight whitespace-pre-line transition-colors">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ── Three-column: Top Services | Service Detail | Right Sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_240px] gap-5">
          {/* Top Services list */}
          <aside aria-labelledby="top-services-heading">
            <div className="flex items-center justify-between mb-3">
              <h2 id="top-services-heading" className="text-sm font-semibold text-[#1A1340]">Top Services</h2>
              <button className="text-xs text-[#6B3FFF] hover:underline">View All Services</button>
            </div>
            <div className="space-y-2">
              {TOP_SERVICES.map((svc) => (
                <button
                  key={svc.id}
                  onClick={() => { setSelectedService(DL_SERVICE); setActiveTab("Overview"); }}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left group",
                    svc.id === selectedService.id
                      ? "bg-[#F3F0FF] border-[#6B3FFF]/30"
                      : "bg-white border-[#E8E4F8] hover:bg-[#F9F8FF] hover:border-[#E8E4F8]"
                  )}
                  aria-label={svc.label}
                  aria-pressed={svc.id === selectedService.id}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ backgroundColor: svc.iconBg }} aria-hidden="true">
                    {svc.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-xs font-semibold truncate", svc.id === selectedService.id ? "text-[#6B3FFF]" : "text-[#1A1340]")}>{svc.label}</p>
                    <p className="text-[10px] text-[#9CA3AF] truncate">{svc.sub}</p>
                  </div>
                  <ChevronRight size={13} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors flex-shrink-0" aria-hidden="true" />
                </button>
              ))}

              {/* Can't find CTA */}
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#F3F0FF] border border-[#E8E4F8] hover:bg-[#EDE9FE] transition-all text-left">
                <div className="w-9 h-9 rounded-lg bg-[#EDE9FE] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Sparkles size={16} className="text-[#6B3FFF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#6B3FFF]">Can&apos;t find a service?</p>
                  <p className="text-[10px] text-[#9CA3AF]">Ask JanMitra AI to help you</p>
                </div>
                <ChevronRight size={13} className="text-[#6B3FFF]" aria-hidden="true" />
              </button>
            </div>
          </aside>

          {/* Service Detail Panel */}
          <article className="bg-white rounded-[20px] border border-[#E8E4F8] overflow-hidden" aria-label={`${selectedService.title} details`}>
            {/* Back + title */}
            <div className="px-6 pt-6 pb-0">
              <button className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#6B3FFF] transition-colors mb-3" aria-label="Back to all services">
                <ArrowLeft size={13} aria-hidden="true" /> Back to all services
              </button>

              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#EDE9FE] flex items-center justify-center flex-shrink-0 text-2xl" aria-hidden="true">🪪</div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-lg font-bold text-[#1A1340]">{selectedService.title}</h1>
                      {selectedService.isPopular && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#6B3FFF] text-white">Popular</span>
                      )}
                    </div>
                    <p className="text-xs text-[#6B7280] mt-0.5">{selectedService.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setSaved((v) => !v)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all",
                      saved ? "bg-[#EDE9FE] border-[#6B3FFF]/30 text-[#6B3FFF]" : "border-[#E8E4F8] text-[#6B7280] hover:bg-[#F9F8FF]"
                    )}
                    aria-pressed={saved}
                    aria-label={saved ? "Saved" : "Save service"}
                  >
                    <Bookmark size={13} aria-hidden="true" /> {saved ? "Saved" : "Save"}
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E8E4F8] text-xs font-medium text-[#6B7280] hover:bg-[#F9F8FF] transition-all" aria-label="Share service">
                    <Share2 size={13} aria-hidden="true" /> Share
                  </button>
                </div>
              </div>

              {/* Quick info row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
                {[
                  { icon: Users, label: "Who can apply", value: selectedService.whoCanApply },
                  { icon: Star, label: "Validity", value: selectedService.validity },
                  { icon: Clock, label: "Processing Time", value: selectedService.processingTime },
                  { icon: Monitor, label: "Mode", value: selectedService.mode },
                  { icon: Globe, label: "Official Portal", value: selectedService.officialPortal, isLink: true },
                ].map(({ icon: Icon, label, value, isLink }) => (
                  <div key={label} className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#F3F0FF] flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
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
                      "px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200",
                      activeTab === tab
                        ? "border-[#6B3FFF] text-[#6B3FFF]"
                        : "border-transparent text-[#6B7280] hover:text-[#1A1340]"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="px-6 py-5" role="tabpanel">
              {activeTab === "Overview" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-[#1A1340] mb-2">Description</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{selectedService.description}</p>
                    <ul className="mt-3 space-y-1.5">
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
                      <CheckCircle2 size={15} className="text-[#10B981] flex-shrink-0 mt-0.5" aria-hidden="true" /> {e}
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === "Documents" && (
                <ul className="space-y-2">
                  {selectedService.documents.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-[#374151]">
                      <CheckCircle2 size={15} className="text-[#10B981] flex-shrink-0 mt-0.5" aria-hidden="true" /> {d}
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === "Process" && (
                <ol className="space-y-3">
                  {selectedService.process.map((p, i) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-[#374151]">
                      <span className="w-6 h-6 rounded-full bg-[#EDE9FE] text-[#6B3FFF] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                      {p}
                    </li>
                  ))}
                </ol>
              )}
              {activeTab === "Fees" && (
                <div className="bg-[#F9F8FF] rounded-xl p-4 inline-block">
                  <p className="text-sm font-semibold text-[#1A1340]">{selectedService.fees}</p>
                  <p className="text-xs text-[#9CA3AF] mt-1">Fees may vary by state and DL category</p>
                </div>
              )}
              {activeTab === "FAQs" && (
                <div className="space-y-4">
                  {selectedService.faqs.map((faq) => (
                    <div key={faq.q}>
                      <p className="text-sm font-semibold text-[#1A1340] mb-1">{faq.q}</p>
                      <p className="text-sm text-[#6B7280]">{faq.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA buttons */}
            <div className="px-6 pb-6 flex items-center gap-3">
              <a
                href="https://parivahan.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 hover:shadow-lg transition-all"
                style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
                aria-label="Apply now on official portal"
              >
                Apply Now <ExternalLink size={14} aria-hidden="true" />
              </a>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#6B3FFF]/30 text-sm font-semibold text-[#6B3FFF] hover:bg-[#F3F0FF] transition-all" aria-label="Check eligibility with AI">
                Check Eligibility <ChevronRight size={14} aria-hidden="true" />
              </button>
            </div>
          </article>

          {/* Right sidebar */}
          <aside className="space-y-5" aria-label="Service sidebar">
            {/* AI Eligibility Check */}
            <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-5" aria-labelledby="elig-heading">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={15} className="text-[#6B3FFF]" aria-hidden="true" />
                <h2 id="elig-heading" className="text-sm font-semibold text-[#1A1340]">AI Eligibility Check</h2>
              </div>
              <p className="text-xs text-[#6B7280] mb-3">Answer a few questions and JanMitra AI will check your eligibility</p>
              <button
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all"
                style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
                aria-label="Check eligibility with AI"
              >
                Check Now <Sparkles size={13} aria-hidden="true" />
              </button>
            </section>

            {/* You may also need */}
            <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-5" aria-labelledby="also-heading">
              <h2 id="also-heading" className="text-sm font-semibold text-[#1A1340] mb-3">You may also need</h2>
              <div className="space-y-1">
                {YOU_MAY_NEED.map((s) => (
                  <button key={s} className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[#F9F8FF] transition-colors text-left group" aria-label={s}>
                    <div className="w-5 h-5 rounded-md bg-[#EDE9FE] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <CheckCircle2 size={11} className="text-[#6B3FFF]" />
                    </div>
                    <span className="text-xs text-[#374151] group-hover:text-[#6B3FFF] transition-colors flex-1">{s}</span>
                    <ChevronRight size={12} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </section>

            {/* Need help */}
            <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-5" aria-labelledby="help-heading">
              <h2 id="help-heading" className="text-sm font-semibold text-[#1A1340] mb-1">Need help?</h2>
              <p className="text-xs text-[#6B7280] mb-3">Chat with JanMitra AI for step-by-step guidance.</p>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#6B3FFF]/30 text-xs font-semibold text-[#6B3FFF] hover:bg-[#F3F0FF] transition-all" aria-label="Chat with AI">
                <MessageCircle size={13} aria-hidden="true" /> Chat Now
              </button>
            </section>
          </aside>
        </div>

        {/* Trust footer */}
        <section className="bg-white rounded-[20px] border border-[#E8E4F8] px-6 py-5" aria-label="Security and trust">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#EDE9FE] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <ShieldCheck size={22} className="text-[#6B3FFF]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1A1340]">100% Secure &amp; Trusted</p>
                <p className="text-xs text-[#6B7280] max-w-xs">Your data is protected and only used for official government services. We never share your information.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 sm:ml-auto">
              {[
                { icon: ShieldCheck, label: "Govt. Verified", sub: "Official source" },
                { icon: Lock, label: "Secure Platform", sub: "End-to-end encryption" },
                { icon: Eye, label: "Privacy First", sub: "Your privacy matters" },
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
