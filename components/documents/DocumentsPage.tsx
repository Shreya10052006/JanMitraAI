"use client";

import { useState, useRef, type KeyboardEvent, useEffect } from "react";
import Image from "next/image";
import {
  Search, Upload, ChevronRight, CheckCircle2, Clock,
  XCircle, MoreVertical, Eye, Shield, Bot, Sparkles,
  Download, FileText, CreditCard, User, Building2, X, Check,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { VoiceSearchButton } from "@/components/ui/VoiceSearchButton";

type DocStatus = "completed" | "in_progress" | "missing";

type RecommendedDoc = {
  id: string;
  name: string;
  description: string;
  status: DocStatus;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
};

type RecentDoc = {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  status: "Verified" | "In Review" | "Pending";
  icon: string;
  iconBg: string;
};

type QuickLink = {
  id: string;
  label: string;
  sub: string;
  icon: string;
  href: string;
};

const SERVICES_LIST = [
  { id: "driving-license", label: "🚗 Driving License Renewal" },
  { id: "passport", label: "📘 Passport Application" },
  { id: "birth-certificate", label: "📋 Birth Certificate" },
  { id: "ration-card", label: "🏠 Ration Card" },
  { id: "udyam-registration", label: "💼 Udyam Registration (MSME)" },
];

const RECOMMENDED_DOCS: RecommendedDoc[] = [
  { id: "1", name: "Aadhaar Card", description: "Proof of identity and address", status: "completed", icon: CreditCard, iconBg: "#EDE9FE", iconColor: "#6B3FFF" },
  { id: "2", name: "Bank Passbook", description: "Bank account details", status: "completed", icon: Building2, iconBg: "#D1FAE5", iconColor: "#10B981" },
  { id: "3", name: "Land Ownership Proof", description: "Land records or ownership document", status: "in_progress", icon: FileText, iconBg: "#DBEAFE", iconColor: "#3B82F6" },
  { id: "4", name: "Passport Size Photo", description: "Recent passport size photograph", status: "missing", icon: User, iconBg: "#FEE2E2", iconColor: "#EF4444" },
  { id: "5", name: "Income Certificate", description: "Income proof certificate", status: "missing", icon: FileText, iconBg: "#FEE2E2", iconColor: "#EF4444" },
];

const STATIC_RECENT_DOCS: RecentDoc[] = [
  { id: "1", name: "Aadhaar Card.pdf", type: "PDF", size: "1.2 MB", date: "20 May 2026", status: "Verified", icon: "📄", iconBg: "#FEE2E2" },
  { id: "2", name: "Bank Passbook.jpg", type: "JPG", size: "2.4 MB", date: "19 May 2026", status: "Verified", icon: "🏦", iconBg: "#DBEAFE" },
  { id: "3", name: "Land Record.pdf", type: "PDF", size: "1.8 MB", date: "18 May 2026", status: "In Review", icon: "📄", iconBg: "#FEE2E2" },
  { id: "4", name: "Photo.jpg", type: "JPG", size: "0.5 MB", date: "17 May 2026", status: "Verified", icon: "🖼️", iconBg: "#D1FAE5" },
];

const QUICK_LINKS: QuickLink[] = [
  { id: "1", label: "DigiLocker", sub: "Access your documents from DigiLocker", icon: "🔐", href: "https://digilocker.gov.in" },
  { id: "2", label: "UMANG", sub: "Access government services on UMANG app", icon: "📱", href: "https://umang.gov.in" },
  { id: "3", label: "Common Service Centers", sub: "Find nearest CSC centers", icon: "🏢", href: "https://locator.csc.gov.in" },
  { id: "4", label: "National Scholarship Portal", sub: "Apply for scholarships online", icon: "🎓", href: "https://scholarships.gov.in" },
];

const STATUS_MAP = {
  completed: { label: "Completed", color: "text-[#10B981]", bg: "bg-green-50", icon: CheckCircle2, dot: "#10B981" },
  in_progress: { label: "In Progress", color: "text-[#3B82F6]", bg: "bg-blue-50", icon: Clock, dot: "#3B82F6" },
  missing: { label: "Missing", color: "text-[#EF4444]", bg: "bg-red-50", icon: XCircle, dot: "#EF4444" },
};

const DOC_STATUS_BADGE: Record<string, string> = {
  Verified: "bg-green-50 text-green-600 border-green-100",
  "In Review": "bg-blue-50 text-blue-600 border-blue-100",
  Pending: "bg-orange-50 text-orange-600 border-orange-100",
};

interface UploadedDoc extends RecentDoc {
  isLocal: true;
}

export default function DocumentsPage() {
  const [search, setSearch] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState(SERVICES_LIST[0]);
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);
  const [checklist, setChecklist] = useState<{ name: string; description: string; required: boolean }[] | null>(null);
  const [checklistLoading, setChecklistLoading] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const allRecentDocs = [...uploadedDocs, ...STATIC_RECENT_DOCS];

  const completed = RECOMMENDED_DOCS.filter((d) => d.status === "completed").length + uploadedDocs.length;
  const total = RECOMMENDED_DOCS.length + 5;
  const pct = Math.min(100, Math.round((completed / total) * 100));
  const circumference = 2 * Math.PI * 38;
  const dashOffset = circumference * (1 - pct / 100);

  useEffect(() => {
    if (selectedService) {
      void loadChecklist(selectedService.id);
    }
  }, [selectedService?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadChecklist(serviceId: string) {
    setChecklistLoading(true);
    setChecklist(null);
    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId }),
      });
      const data = await res.json() as { checklist: { name: string; description: string; required: boolean }[] };
      setChecklist(data.checklist ?? null);
    } catch {
      setChecklist(null);
    } finally {
      setChecklistLoading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
    if (fileRef.current) fileRef.current.value = "";
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }

  function processFile(file: File) {
    const sizeKB = file.size / 1024;
    const sizeStr = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${Math.round(sizeKB)} KB`;
    const ext = file.name.split(".").pop()?.toUpperCase() ?? "FILE";
    const newDoc: UploadedDoc = {
      id: `local-${Date.now()}`,
      name: file.name,
      type: ext,
      size: sizeStr,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      status: "Pending",
      icon: ext === "PDF" ? "📄" : "🖼️",
      iconBg: "#D1FAE5",
      isLocal: true,
    };
    setUploadedDocs((prev) => [newDoc, ...prev]);
    setUploadSuccess(file.name);
    setTimeout(() => setUploadSuccess(null), 3000);
  }

  function handleSearchKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      // filter handled inline
    }
  }

  const filteredDocs = search
    ? allRecentDocs.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
    : allRecentDocs;


  return (
    <div className="overflow-y-auto h-full" id="main-content">
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 lg:space-y-12 max-w-[1600px] mx-auto">

        {/* ── Hero ── */}
        <div className="relative rounded-[28px] overflow-hidden" style={{ minHeight: "140px" }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#F5F3FF,#EDE9FE 25%,#FFF7ED 70%,#FFFBEB)" }} aria-hidden="true" />
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
            style={{ WebkitMaskImage: "linear-gradient(to right,transparent 38%,rgba(0,0,0,0.45) 55%,black 78%)", maskImage: "linear-gradient(to right,transparent 38%,rgba(0,0,0,0.45) 55%,black 78%)" }}>
            <Image src="/images/india-gate.png" alt="" fill className="object-cover object-right-bottom" quality={75} sizes="1200px" />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right,rgba(245,243,255,0.97) 0%,rgba(245,243,255,0.88) 36%,transparent 62%)" }} aria-hidden="true" />
          <div className="relative z-10 px-5 py-6 sm:px-8 sm:py-8">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1A1340]">Documents</h1>
            <p className="text-sm text-[#6B7280] mt-2">Get personalized document guidance and manage your documents easily.</p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2 mt-4 sm:max-w-lg">
              <div className="flex-1 flex items-center gap-2 bg-white border border-[#E8E4F8] rounded-xl px-4 py-3.5 sm:py-4 shadow-sm focus-within:ring-2 focus-within:ring-[#6B3FFF]/20 min-w-0">
                <Search size={15} className="text-[#9CA3AF] flex-shrink-0" aria-hidden="true" />
                <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleSearchKey}
                  placeholder="Search documents, certificates..."
                  className="flex-1 min-w-0 text-sm text-[#374151] placeholder-[#9CA3AF] bg-transparent outline-none" aria-label="Search documents" />
                <VoiceSearchButton onResult={setSearch} className="w-6 h-6" />
                {search && (
                  <button onClick={() => setSearch("")} className="text-[#9CA3AF] hover:text-[#374151]" aria-label="Clear search">
                    <X size={13} />
                  </button>
                )}
              </div>
              <button
                className="flex items-center justify-center gap-2 px-4 py-3.5 sm:py-4 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }} aria-label="Search">
                <Search size={14} aria-hidden="true" /> Search
              </button>
            </div>
          </div>
        </div>

        {/* Upload Success toast */}
        {uploadSuccess && (
          <div className="flex items-center gap-2 px-4 py-4 bg-green-50 rounded-xl border border-green-100 text-sm text-green-700" role="status" aria-live="polite">
            <Check size={15} className="text-green-600" aria-hidden="true" />
            <strong>{uploadSuccess}</strong> uploaded successfully!
          </div>
        )}

        {/* ── 3 feature cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Bot, iconBg: "#EDE9FE", iconColor: "#6B3FFF", title: "AI Document Advisor", sub: "Get personalized document list based on your needs.", color: "#6B3FFF", onClick: () => loadChecklist(selectedService.id) },
            { icon: Shield, iconBg: "#D1FAE5", iconColor: "#10B981", title: "Check Eligibility", sub: "Check documents required for your eligibility.", color: "#10B981", onClick: () => { window.location.href = "/schemes"; } },
            { icon: FileText, iconBg: "#FEF3C7", iconColor: "#F59E0B", title: "Missing Documents", sub: "Identify missing documents and how to obtain them.", color: "#F59E0B", onClick: () => { window.location.href = "/ai-assistant"; } },
          ].map(({ icon: Icon, iconBg, iconColor, title, sub, color, onClick }) => (
            <button key={title}
              onClick={onClick}
              className="flex items-start gap-4 p-6 bg-white rounded-[20px] border border-[#E8E4F8] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left group"
              aria-label={title}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: iconBg }} aria-hidden="true">
                <Icon size={22} style={{ color: iconColor }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#1A1340]">{title}</p>
                <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">{sub}</p>
                <div className="mt-4">
                  <ChevronRight size={16} style={{ color }} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* LEFT */}
          <div className="space-y-6">
            {/* AI Recommended */}
            <section className="bg-white rounded-[20px] border border-[#E8E4F8] overflow-hidden" aria-labelledby="ai-rec-heading">
              <div className="px-6 py-4 border-b border-[#F3F0FF]">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={15} className="text-[#6B3FFF]" aria-hidden="true" />
                  <h2 id="ai-rec-heading" className="text-sm font-bold text-[#1A1340]">AI Recommended for You</h2>
                </div>
                <p className="text-xs text-[#9CA3AF]">Personalized document list based on your selected service</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <span className="px-4 py-2 rounded-lg bg-[#F3F0FF] text-xs font-semibold text-[#6B3FFF]">Service Selected</span>
                    <span className="text-sm font-semibold text-[#1A1340]">{selectedService.label}</span>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setServiceMenuOpen((v) => !v)}
                      className="px-4 py-2 rounded-xl border border-[#E8E4F8] text-xs font-medium text-[#374151] hover:bg-[#F9F8FF] transition-colors"
                      aria-label="Change selected service"
                      aria-haspopup="listbox"
                      aria-expanded={serviceMenuOpen}
                    >
                      Change Service
                    </button>
                    {serviceMenuOpen && (
                      <ul className="absolute right-0 top-full mt-2 bg-white border border-[#E8E4F8] rounded-xl shadow-lg z-20 overflow-hidden min-w-[220px]" role="listbox">
                        {SERVICES_LIST.map((svc) => (
                          <li key={svc.id}>
                            <button
                              role="option"
                              aria-selected={selectedService.id === svc.id}
                              onClick={() => { setSelectedService(svc); setServiceMenuOpen(false); }}
                              className={cn("w-full text-left px-4 py-4 text-sm hover:bg-[#F9F8FF] transition-colors", selectedService.id === svc.id && "text-[#6B3FFF] font-semibold bg-[#F3F0FF]")}
                            >
                              {svc.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Checklist from API */}
              {checklist ? (
                <>
                  <div className="hidden sm:grid grid-cols-[1fr_130px_120px] gap-4 px-6 py-4 bg-[#F9F8FF] border-b border-[#F3F0FF]">
                    <span className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wide">Document Name</span>
                    <span className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wide">Required</span>
                    <span className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wide">Action</span>
                  </div>
                  <ul className="divide-y divide-[#F9F8FF]" role="list">
                    {checklist.map((doc, i) => (
                      <li key={i}>
                        <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[1fr_130px_120px] sm:gap-4 sm:items-start px-4 sm:px-6 py-4 hover:bg-[#F9F8FF] transition-colors">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#1A1340]">{doc.name}</p>
                            <p className="text-xs text-[#9CA3AF] mt-2 leading-relaxed">{doc.description}</p>
                          </div>
                          <div className="flex items-center justify-between gap-2 sm:contents">
                            <span className={cn("px-2 py-2 rounded-full text-[10px] font-semibold border w-fit sm:mt-2", doc.required ? "bg-red-50 text-red-600 border-red-100" : "bg-gray-50 text-gray-600 border-gray-100")}>
                              {doc.required ? "Required" : "Optional"}
                            </span>
                            <button
                              onClick={() => fileRef.current?.click()}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white hover:opacity-90 transition-all sm:mt-2 w-fit"
                              style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
                              aria-label={`Upload ${doc.name}`}
                            >
                              <Upload size={12} aria-hidden="true" /> Upload
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : checklistLoading ? (
                <div className="px-6 py-8 flex items-center justify-center gap-4">
                  <span className="w-5 h-5 border-2 border-[#6B3FFF]/30 border-t-[#6B3FFF] rounded-full animate-spin" aria-hidden="true" />
                  <p className="text-sm text-[#9CA3AF]">Loading document checklist…</p>
                </div>
              ) : (
                <>
                  <div className="hidden sm:grid grid-cols-[1fr_130px_120px] gap-4 px-6 py-4 bg-[#F9F8FF] border-b border-[#F3F0FF]">
                    <span className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wide">Document Name</span>
                    <span className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wide">Status</span>
                    <span className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wide">Action</span>
                  </div>
                  <ul className="divide-y divide-[#F9F8FF]" role="list">
                    {RECOMMENDED_DOCS.map((doc) => {
                      const s = STATUS_MAP[doc.status];
                      const StatusIcon = s.icon;
                      return (
                        <li key={doc.id}>
                          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[1fr_130px_120px] sm:gap-4 sm:items-center px-4 sm:px-6 py-4 hover:bg-[#F9F8FF] transition-colors">
                            <div className="flex items-center gap-4 min-w-0">
                              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: doc.iconBg }} aria-hidden="true">
                                <doc.icon size={17} style={{ color: doc.iconColor }} />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-[#1A1340] truncate">{doc.name}</p>
                                <p className="text-xs text-[#9CA3AF] truncate">{doc.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between gap-2 sm:contents">
                            <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full w-fit", s.bg)}>
                              <StatusIcon size={12} style={{ color: s.dot }} aria-hidden="true" />
                              <span className={cn("text-xs font-semibold", s.color)}>{s.label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {doc.status === "completed" ? (
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E8E4F8] text-xs font-medium text-[#374151] hover:bg-[#F9F8FF] transition-colors" aria-label={`View ${doc.name}`}>
                                  <Eye size={12} aria-hidden="true" /> View
                                </button>
                              ) : (
                                <button
                                  onClick={() => fileRef.current?.click()}
                                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white hover:opacity-90 transition-all"
                                  style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
                                  aria-label={`Upload ${doc.name}`}
                                >
                                  <Upload size={12} aria-hidden="true" /> Upload
                                </button>
                              )}
                              <div className="relative">
                                <button onClick={() => setActiveMenuId(activeMenuId === doc.id ? null : doc.id)}
                                  className="p-2 rounded-lg hover:bg-[#F3F0FF] text-[#9CA3AF] transition-colors"
                                  aria-label={`More options for ${doc.name}`} aria-haspopup="true" aria-expanded={activeMenuId === doc.id}>
                                  <MoreVertical size={14} aria-hidden="true" />
                                </button>
                                {activeMenuId === doc.id && (
                                  <div className="absolute right-0 top-full mt-2 w-36 bg-white border border-[#E8E4F8] rounded-xl shadow-lg z-20 overflow-hidden" role="menu">
                                    {["View Details", "Download", "Delete"].map((opt) => (
                                      <button key={opt} role="menuitem" onClick={() => setActiveMenuId(null)}
                                        className={cn("w-full text-left px-4 py-2 text-xs hover:bg-[#F9F8FF] transition-colors", opt === "Delete" ? "text-[#EF4444]" : "text-[#374151]")}>
                                        {opt}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}

              <div className="px-6 py-4 border-t border-[#F3F0FF] flex justify-center">
                <button className="flex items-center gap-2 px-6 py-2 rounded-xl border border-[#6B3FFF]/30 text-sm font-semibold text-[#6B3FFF] hover:bg-[#F3F0FF] transition-all" aria-label="View full document list">
                  View Full Document List <ChevronRight size={15} aria-hidden="true" />
                </button>
              </div>
            </section>

            {/* Recently Uploaded */}
            <section aria-labelledby="recent-docs-heading">
              <div className="flex items-center justify-between mb-4">
                <h2 id="recent-docs-heading" className="text-sm font-bold text-[#1A1340]">Recently Uploaded Documents</h2>
                <button onClick={() => setSearch("")} className="text-xs text-[#6B3FFF] hover:underline">View All</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {filteredDocs.slice(0, 8).map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white rounded-[20px] border border-[#E8E4F8] p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer relative"
                    role="listitem"
                  >
                    {"isLocal" in doc && (
                      <span className="absolute top-2 right-2 px-2 py-2 rounded-full text-[9px] font-bold bg-blue-50 text-blue-600 border border-blue-100">NEW</span>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ backgroundColor: doc.iconBg }} aria-hidden="true">
                        {doc.icon}
                      </div>
                      <Download size={14} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors ml-auto" aria-hidden="true" />
                    </div>
                    <p className="text-xs font-semibold text-[#1A1340] truncate">{doc.name}</p>
                    <p className="text-[10px] text-[#9CA3AF] mt-2">{doc.type} · {doc.size}</p>
                    <p className="text-[10px] text-[#9CA3AF]">{doc.date}</p>
                    <div className={cn("mt-2 text-center py-2 rounded-full text-[10px] font-semibold border", DOC_STATUS_BADGE[doc.status])}>
                      {doc.status}
                    </div>
                  </div>
                ))}
              </div>
              {filteredDocs.length === 0 && (
                <p className="text-sm text-[#9CA3AF] text-center py-6">No documents match &ldquo;{search}&rdquo;</p>
              )}
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* Document Checklist Progress */}
            <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="checklist-heading">
              <div className="flex items-center justify-between mb-4">
                <h2 id="checklist-heading" className="text-sm font-bold text-[#1A1340]">Document Checklist</h2>
                <button className="text-xs text-[#6B3FFF] hover:underline" onClick={() => loadChecklist(selectedService.id)}>Refresh</button>
              </div>

              {/* Donut */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-shrink-0" aria-label={`${pct}% documents completed`}>
                  <svg width="96" height="96" viewBox="0 0 96 96" role="img" aria-label={`${pct}% completed`}>
                    <circle cx="48" cy="48" r="38" fill="none" stroke="#F3F0FF" strokeWidth="10" />
                    <circle cx="48" cy="48" r="38" fill="none" stroke="#10B981" strokeWidth="10"
                      strokeDasharray={circumference} strokeDashoffset={dashOffset}
                      strokeLinecap="round" transform="rotate(-90 48 48)" />
                    <text x="48" y="45" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1A1340">{pct}%</text>
                    <text x="48" y="58" textAnchor="middle" fontSize="8" fill="#9CA3AF">Completed</text>
                  </svg>
                </div>
                <div className="space-y-2 flex-1">
                  {[
                    { label: "Total Required", val: total, color: "#374151" },
                    { label: "Completed", val: completed, color: "#10B981" },
                    { label: "Missing", val: total - completed, color: "#EF4444" },
                  ].map(({ label, val, color }) => (
                    <div key={label} className="flex items-center justify-between text-xs">
                      <span className="text-[#6B7280]">{label}</span>
                      <span className="font-bold" style={{ color }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2 bg-green-50 rounded-xl px-4 py-4 border border-green-100">
                <CheckCircle2 size={14} className="text-[#10B981] flex-shrink-0 mt-2" aria-hidden="true" />
                <p className="text-xs text-[#10B981] font-medium">Upload your pending documents to complete your application.</p>
              </div>
            </section>

            {/* Upload & AI Verify */}
            <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="upload-heading">
              <h2 id="upload-heading" className="text-sm font-bold text-[#1A1340] mb-4">Upload &amp; AI Verify</h2>
              <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="sr-only" aria-label="Upload document" onChange={handleFileChange} />
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={cn(
                  "border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200",
                  isDragging ? "border-[#6B3FFF] bg-[#F3F0FF]" : "border-[#E8E4F8] hover:border-[#6B3FFF]/40 hover:bg-[#F9F8FF]"
                )}
                role="button"
                aria-label="Drop files here or click to browse"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
              >
                <div className="w-12 h-12 rounded-xl bg-[#EDE9FE] flex items-center justify-center" aria-hidden="true">
                  <Upload size={22} className="text-[#6B3FFF]" />
                </div>
                <p className="text-sm text-[#374151] text-center">
                  Drag &amp; drop files here or{" "}
                  <span className="text-[#6B3FFF] font-semibold underline">click to browse</span>
                </p>
                <p className="text-xs text-[#9CA3AF]">Supports PDF, JPG, PNG (Max 10MB)</p>
              </div>
              <div className="flex items-center gap-2 mt-4 text-xs text-[#6B7280]">
                <Shield size={12} className="text-[#10B981] flex-shrink-0" aria-hidden="true" />
                Your documents are secure and encrypted
              </div>
            </section>

            {/* Quick Links */}
            <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-4" aria-labelledby="qlinks-heading">
              <div className="flex items-center justify-between mb-4">
                <h2 id="qlinks-heading" className="text-sm font-bold text-[#1A1340]">Quick Links</h2>
              </div>
              <div className="space-y-2">
                {QUICK_LINKS.map((link) => (
                  <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-[#F9F8FF] border border-transparent hover:border-[#E8E4F8] transition-all group"
                    aria-label={link.label}>
                    <span className="text-xl flex-shrink-0" aria-hidden="true">{link.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#1A1340] truncate">{link.label}</p>
                      <p className="text-[10px] text-[#9CA3AF] truncate">{link.sub}</p>
                    </div>
                    <ChevronRight size={14} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] flex-shrink-0 transition-colors" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
