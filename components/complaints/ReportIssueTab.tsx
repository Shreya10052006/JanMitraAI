"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  MapPin, ChevronDown, Sparkles, CheckCircle2, Upload, X,
  ChevronRight, Building2, AlertTriangle, Copy,
} from "lucide-react";
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

const STATUS_COLORS: Record<ComplaintStatus, string> = {
  submitted: "bg-blue-100 text-blue-700",
  under_review: "bg-orange-100 text-orange-700",
  assigned: "bg-green-100 text-green-700",
  in_progress: "bg-blue-100 text-blue-700",
  resolved: "bg-emerald-100 text-emerald-700",
  closed: "bg-gray-100 text-gray-600",
};

const COMPLAINT_ICONS: Record<string, string> = {
  "Street Lighting": "💡",
  "Roads & Infrastructure": "🚧",
  "Water Supply": "💧",
  "Sanitation & Drainage": "🗑️",
  default: "📋",
};

const WHEN_OPTIONS = ["Today", "Yesterday", "2 days ago", "3 days ago", "This week", "Last week"];

interface ReportIssueTabProps {
  onViewComplaints: () => void;
}

export function ReportIssueTab({ onViewComplaints }: ReportIssueTabProps) {
  const { complaints, isAnalyzing, analysisResult, analyzeComplaint, submitComplaint, resetAnalysis } = useComplaints();
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [when, setWhen] = useState("Today");
  const [whenOpen, setWhenOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submittedTicket, setSubmittedTicket] = useState<StoredComplaint | null>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const charCount = description.length;
  const canAnalyze = description.trim().length > 10 && location.trim().length > 3;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    resetAnalysis();
  }

  function handleRemoveImage() {
    setImagePreview(null);
    setImageFile(null);
    if (fileRef.current) fileRef.current.value = "";
    resetAnalysis();
  }

  function handleUseLocation() {
    if (!navigator.geolocation) {
      setLocation("New Delhi, India");
      return;
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation(`Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)}, India`);
        setLocationLoading(false);
      },
      () => {
        setLocation("New Delhi, India");
        setLocationLoading(false);
      },
      { timeout: 5000 }
    );
  }

  function handleAnalyze() {
    if (!canAnalyze) return;
    void analyzeComplaint(description, location);
  }

  function handleSubmit() {
    if (!analysisResult) return;
    const complaint = submitComplaint({
      description,
      location,
      when,
      imageUrl: imagePreview ?? undefined,
      analysis: analysisResult,
    });
    setSubmittedTicket(complaint);
  }

  function handleCopyTicket() {
    if (!submittedTicket) return;
    void navigator.clipboard.writeText(submittedTicket.ticketId);
    setCopiedTicket(true);
    setTimeout(() => setCopiedTicket(false), 2000);
  }

  function handleReset() {
    setDescription("");
    setLocation("");
    setWhen("Today");
    setImagePreview(null);
    setImageFile(null);
    setSubmittedTicket(null);
    resetAnalysis();
    if (fileRef.current) fileRef.current.value = "";
  }

  // Success screen
  if (submittedTicket) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px_240px] gap-4">
        <section className="bg-white rounded-2xl border border-[#E8E4F8] p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#D1FAE5] flex items-center justify-center mb-4" aria-hidden="true">
            <CheckCircle2 size={32} className="text-[#10B981]" />
          </div>
          <h2 className="text-xl font-bold text-[#1A1340] mb-2">Complaint Submitted!</h2>
          <p className="text-sm text-[#6B7280] mb-5">Your complaint has been successfully registered and routed to the appropriate department.</p>

          <div className="bg-[#F3F0FF] rounded-xl px-6 py-4 mb-5 w-full max-w-sm">
            <p className="text-xs text-[#9CA3AF] mb-1">Your Complaint ID</p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-2xl font-bold text-[#6B3FFF]">{submittedTicket.ticketId}</p>
              <button
                onClick={handleCopyTicket}
                className="p-1.5 rounded-lg bg-[#EDE9FE] text-[#6B3FFF] hover:bg-[#DDD6FE] transition-colors"
                aria-label="Copy ticket ID"
              >
                {copiedTicket ? <CheckCircle2 size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-5">
            {[
              { label: "Category", value: submittedTicket.category },
              { label: "Priority", value: submittedTicket.priority.charAt(0).toUpperCase() + submittedTicket.priority.slice(1) },
              { label: "Department", value: submittedTicket.department ?? "Municipal Corporation" },
              { label: "Status", value: "Submitted" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#F9F8FF] rounded-xl p-3 text-left">
                <p className="text-[10px] text-[#9CA3AF]">{label}</p>
                <p className="text-xs font-semibold text-[#1A1340] mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onViewComplaints}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
            >
              Track Complaint
            </button>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl border border-[#E8E4F8] text-sm font-medium text-[#374151] hover:bg-[#F9F8FF] transition-all"
            >
              Report Another
            </button>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-[#E8E4F8] p-4" aria-labelledby="my-cmp-heading-success">
          <div className="flex items-center justify-between mb-3">
            <h2 id="my-cmp-heading-success" className="text-sm font-semibold text-[#1A1340]">My Complaints</h2>
            <button onClick={onViewComplaints} className="text-xs text-[#6B3FFF] hover:underline">View All</button>
          </div>
          <div className="space-y-2">
            {complaints.slice(0, 3).map((c) => (
              <button key={c.id} onClick={onViewComplaints} className="w-full flex items-start gap-2 p-2.5 rounded-xl hover:bg-[#F9F8FF] transition-colors text-left group" aria-label={`${c.ticketId}: ${c.title}`}>
                <span className="text-lg flex-shrink-0" aria-hidden="true">{COMPLAINT_ICONS[c.category] ?? COMPLAINT_ICONS.default}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-[#6B3FFF] truncate">#{c.ticketId}</p>
                  <p className="text-[11px] text-[#1A1340] truncate">{c.title}</p>
                  <span className={cn("px-1.5 py-0.5 rounded-full text-[9px] font-semibold", STATUS_COLORS[c.status])}>{STATUS_LABELS[c.status]}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="col-span-full bg-[#F3F0FF] rounded-xl px-5 py-3 flex items-center gap-3">
          <span className="text-base" aria-hidden="true">📢</span>
          <p className="text-xs text-[#6B3FFF] font-medium">Your voice matters. Every complaint you raise makes your city a better place to live.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px_240px] gap-4">
      {/* ── Form ── */}
      <section className="bg-white rounded-2xl border border-[#E8E4F8] p-5 space-y-5" aria-labelledby="report-heading">
        <div>
          <h2 id="report-heading" className="text-base font-bold text-[#1A1340]">Report a New Issue</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Provide details about the issue. Our AI will help route it to the right department.</p>
        </div>

        {/* 1. Upload */}
        <div>
          <label className="block text-sm font-semibold text-[#1A1340] mb-2">1. Upload Photo / Video</label>
          <div className="border-2 border-dashed border-[#E8E4F8] rounded-xl p-3 relative" aria-label="Upload photo or video">
            <input
              ref={fileRef}
              type="file"
              accept="image/*,video/*"
              className="sr-only"
              aria-label="Choose file to upload"
              onChange={handleFileChange}
            />
            {imagePreview ? (
              <div className="flex items-center gap-3">
                <div className="relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={imagePreview} alt="Uploaded issue photo" fill className="object-cover" unoptimized />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl border border-[#E8E4F8] hover:bg-[#F9F8FF] transition-colors text-xs text-[#6B7280]"
                    aria-label="Add more photos"
                  >
                    <Upload size={16} className="text-[#6B3FFF]" aria-hidden="true" />
                    Add more
                  </button>
                  <button
                    onClick={handleRemoveImage}
                    className="p-2 rounded-xl border border-red-100 text-red-400 hover:bg-red-50 transition-colors"
                    aria-label="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
                {imageFile && (
                  <p className="text-[10px] text-[#9CA3AF] ml-2">{imageFile.name}</p>
                )}
              </div>
            ) : (
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full flex flex-col items-center gap-2 py-4 text-sm text-[#9CA3AF]"
                aria-label="Click to upload photo or video"
              >
                <Upload size={20} className="text-[#6B3FFF]" aria-hidden="true" />
                Click to upload or drag &amp; drop
              </button>
            )}
            <p className="text-[10px] text-[#9CA3AF] mt-2">JPG, PNG or MP4 (Max 20MB)</p>
          </div>
        </div>

        {/* 2. Location */}
        <div>
          <label htmlFor="issue-location" className="block text-sm font-semibold text-[#1A1340] mb-2">2. Location</label>
          <div className="relative">
            <input
              id="issue-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-[#E8E4F8] rounded-xl px-4 py-2.5 text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#6B3FFF]/20 focus:border-[#6B3FFF]/40 pr-44"
              placeholder="Enter location..."
              aria-label="Issue location"
            />
            <button
              onClick={handleUseLocation}
              disabled={locationLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs text-[#6B3FFF] font-medium hover:underline disabled:opacity-50"
              aria-label="Use current location"
            >
              <MapPin size={13} aria-hidden="true" />
              {locationLoading ? "Locating..." : "Use current location"}
            </button>
          </div>
        </div>

        {/* 3. Description */}
        <div>
          <label htmlFor="issue-desc" className="block text-sm font-semibold text-[#1A1340] mb-2">3. Describe the Issue</label>
          <div className="relative">
            <textarea
              id="issue-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 500))}
              rows={4}
              className="w-full border border-[#E8E4F8] rounded-xl px-4 py-3 text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#6B3FFF]/20 focus:border-[#6B3FFF]/40 resize-none"
              placeholder="Describe the issue in detail..."
              aria-label="Issue description"
            />
            <span className="absolute bottom-2 right-3 text-[10px] text-[#9CA3AF]">{charCount}/500</span>
          </div>
        </div>

        {/* 4. When */}
        <div>
          <label className="block text-sm font-semibold text-[#1A1340] mb-2">4. When did you notice it?</label>
          <div className="relative">
            <button
              onClick={() => setWhenOpen((v) => !v)}
              className="w-full flex items-center justify-between border border-[#E8E4F8] rounded-xl px-4 py-2.5 text-sm text-[#374151] hover:border-[#6B3FFF]/30 transition-colors bg-white"
              aria-haspopup="listbox"
              aria-expanded={whenOpen}
              aria-label="When did you notice the issue"
            >
              <span>{when}</span>
              <ChevronDown size={15} className={cn("text-[#9CA3AF] transition-transform", whenOpen && "rotate-180")} aria-hidden="true" />
            </button>
            {whenOpen && (
              <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E8E4F8] rounded-xl shadow-lg z-20 overflow-hidden" role="listbox" aria-label="When options">
                {WHEN_OPTIONS.map((opt) => (
                  <li key={opt}>
                    <button
                      role="option"
                      aria-selected={when === opt}
                      onClick={() => { setWhen(opt); setWhenOpen(false); }}
                      className={cn("w-full text-left px-4 py-2.5 text-sm hover:bg-[#F9F8FF] transition-colors", when === opt && "text-[#6B3FFF] font-medium bg-[#F3F0FF]")}
                    >
                      {opt}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Analyze button */}
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !canAnalyze}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
          aria-label="Analyze issue with AI"
        >
          {isAnalyzing ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles size={15} aria-hidden="true" />
              Analyze Issue with AI ✨
            </>
          )}
        </button>

        {!canAnalyze && (
          <p className="text-[11px] text-[#9CA3AF] text-center -mt-3">
            Please add a location and description (min. 10 characters) to analyze.
          </p>
        )}

        <div className="flex items-center gap-2 text-xs text-[#6B7280] bg-[#F9F8FF] rounded-xl px-4 py-3">
          <CheckCircle2 size={14} className="text-[#10B981] flex-shrink-0" aria-hidden="true" />
          AI will suggest the right category and department to resolve your issue faster.
        </div>
      </section>

      {/* ── AI Analysis Preview ── */}
      <section className="bg-white rounded-2xl border border-[#E8E4F8] p-5 space-y-4" aria-labelledby="ai-preview-heading">
        <div>
          <h2 id="ai-preview-heading" className="text-base font-bold text-[#1A1340]">AI Analysis &amp; Preview</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Review the details before submission</p>
        </div>

        {analysisResult ? (
          <>
            {/* Detected category */}
            <div className="bg-[#F9F8FF] rounded-xl p-3">
              <p className="text-[10px] text-[#9CA3AF] mb-2 font-medium uppercase tracking-wide">AI Detected Category</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <AlertTriangle size={18} className="text-[#6B3FFF]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1A1340]">{analysisResult.category}</p>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-semibold",
                    analysisResult.priority === "high" ? "bg-red-100 text-red-600" :
                    analysisResult.priority === "medium" ? "bg-orange-100 text-orange-600" :
                    "bg-green-100 text-green-600"
                  )}>
                    {analysisResult.priority.charAt(0).toUpperCase() + analysisResult.priority.slice(1)} Priority
                  </span>
                </div>
              </div>
            </div>

            {/* Confidence */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-[#1A1340]">Confidence Score</span>
                <span className="text-xs font-bold text-[#6B3FFF]">{Math.round(analysisResult.confidence * 100)}%</span>
              </div>
              <div className="h-2 bg-[#F3F0FF] rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round(analysisResult.confidence * 100)} aria-valuemin={0} aria-valuemax={100} aria-label={`AI confidence score ${Math.round(analysisResult.confidence * 100)}%`}>
                <div className="h-full rounded-full" style={{ width: `${Math.round(analysisResult.confidence * 100)}%`, background: "linear-gradient(90deg,#6B3FFF,#8B5CF6)" }} />
              </div>
            </div>

            {/* Dept */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#EDE9FE] flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                <Building2 size={14} className="text-[#6B3FFF]" />
              </div>
              <div>
                <p className="text-[10px] text-[#9CA3AF]">Suggested Department</p>
                <p className="text-sm font-semibold text-[#1A1340]">{analysisResult.department}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#10B981] bg-green-50 rounded-xl px-3 py-2.5 border border-green-100">
              <CheckCircle2 size={13} aria-hidden="true" />
              This issue will be routed to {analysisResult.department} for faster resolution.
            </div>

            {/* Issue Summary */}
            <div>
              <h3 className="text-xs font-semibold text-[#1A1340] mb-2">Issue Summary</h3>
              <div className="space-y-2">
                {[
                  { label: "Category", value: analysisResult.category },
                  { label: "Location", value: location },
                  { label: "Description", value: description.slice(0, 120) + (description.length > 120 ? "…" : "") },
                  { label: "Reported", value: when },
                ].map(({ label, value }) => (
                  <div key={label} className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="text-[10px] text-[#9CA3AF] pt-0.5">{label}</span>
                    <span className="text-xs text-[#374151]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Suggestion */}
            <div className="bg-gradient-to-r from-[#F3F0FF] to-[#EDE9FE] rounded-xl p-3">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-[#6B3FFF] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Sparkles size={13} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#6B3FFF] mb-0.5">AI Suggestion</p>
                  <p className="text-xs text-[#374151]">Adding more photos from different angles helps the department understand the issue better and speeds up resolution.</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={resetAnalysis}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#E8E4F8] text-sm font-medium text-[#374151] hover:bg-[#F9F8FF] transition-all"
                aria-label="Edit complaint details"
              >
                ✏️ Edit Details
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
                aria-label="Submit complaint"
              >
                <span>Submit Complaint</span> <CheckCircle2 size={14} aria-hidden="true" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#EDE9FE] flex items-center justify-center mb-3" aria-hidden="true">
              <Sparkles size={24} className="text-[#6B3FFF]" />
            </div>
            <p className="text-sm font-semibold text-[#1A1340]">Fill in the form</p>
            <p className="text-xs text-[#9CA3AF] mt-1 max-w-[200px]">Complete the form and click &ldquo;Analyze Issue with AI&rdquo; to see the preview.</p>
          </div>
        )}
      </section>

      {/* ── Right sidebar ── */}
      <aside className="space-y-4" aria-label="Complaints sidebar">
        {/* My Complaints mini list */}
        <section className="bg-white rounded-2xl border border-[#E8E4F8] p-4" aria-labelledby="my-cmp-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 id="my-cmp-heading" className="text-sm font-semibold text-[#1A1340]">My Complaints</h2>
            <button onClick={onViewComplaints} className="text-xs text-[#6B3FFF] hover:underline">View All</button>
          </div>
          <div className="space-y-2">
            {complaints.slice(0, 4).map((c) => (
              <button key={c.id} onClick={onViewComplaints} className="w-full flex items-start gap-2 p-2.5 rounded-xl hover:bg-[#F9F8FF] transition-colors text-left group" aria-label={`${c.ticketId}: ${c.title}`}>
                <span className="text-lg flex-shrink-0" aria-hidden="true">{COMPLAINT_ICONS[c.category] ?? COMPLAINT_ICONS.default}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-[11px] font-semibold text-[#6B3FFF] truncate">#{c.ticketId}</p>
                    <span className={cn("px-1.5 py-0.5 rounded-full text-[9px] font-semibold flex-shrink-0", STATUS_COLORS[c.status])}>{STATUS_LABELS[c.status]}</span>
                  </div>
                  <p className="text-[11px] text-[#1A1340] truncate">{c.title}</p>
                  <p className="text-[10px] text-[#9CA3AF] flex items-center gap-1 mt-0.5"><MapPin size={9} aria-hidden="true" />{c.location.split(",")[0]}</p>
                </div>
                <ChevronRight size={12} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] flex-shrink-0 mt-1 transition-colors" aria-hidden="true" />
              </button>
            ))}
          </div>
        </section>

        {/* Heatmap mock */}
        <section className="bg-white rounded-2xl border border-[#E8E4F8] overflow-hidden" aria-labelledby="heatmap-heading">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F3F0FF]">
            <h2 id="heatmap-heading" className="text-sm font-semibold text-[#1A1340]">Live Issue Heatmap</h2>
            <button className="text-xs text-[#6B3FFF] hover:underline">View Full Map</button>
          </div>
          <div className="relative h-36 bg-green-50" aria-label="Issue heatmap showing your city">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50" aria-hidden="true" />
            <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden="true">
              {[20, 40, 60, 80].map((p) => (
                <g key={p}>
                  <line x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%" stroke="#9CA3AF" strokeWidth="0.5" />
                  <line x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`} stroke="#9CA3AF" strokeWidth="0.5" />
                </g>
              ))}
            </svg>
            <div className="absolute top-3 left-6 w-14 h-12 rounded-full bg-red-400 opacity-40 blur-md" aria-hidden="true" />
            <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-orange-400 opacity-35 blur-md" aria-hidden="true" />
            <div className="absolute bottom-4 left-1/2 w-12 h-10 rounded-full bg-red-300 opacity-30 blur-md" aria-hidden="true" />
            <span className="absolute top-2 left-2 text-[9px] text-gray-500 font-medium">Karol Bagh</span>
            <span className="absolute top-12 right-4 text-[9px] text-gray-500 font-medium">India Gate</span>
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-gray-500 font-medium">Connaught Place</span>
            <span className="absolute bottom-2 right-2 text-[9px] text-gray-500 font-medium">Lajpat Nagar</span>
          </div>
          <div className="px-3 py-2 flex items-center gap-2">
            <span className="text-[10px] text-[#9CA3AF]">Low</span>
            <div className="flex-1 h-1.5 rounded-full" style={{ background: "linear-gradient(to right,#3B82F6,#10B981,#F59E0B,#EF4444)" }} aria-hidden="true" />
            <span className="text-[10px] text-[#9CA3AF]">High</span>
          </div>
        </section>

        {/* Make bigger impact */}
        <section className="bg-white rounded-2xl border border-[#E8E4F8] p-4" aria-labelledby="impact-heading">
          <h2 id="impact-heading" className="text-sm font-semibold text-[#1A1340] mb-1">Make a Bigger Impact!</h2>
          <p className="text-xs text-[#6B7280] mb-3">Invite your friends and neighbors to report issues and create a better community together.</p>
          <button
            onClick={() => {
              if (navigator.share) {
                void navigator.share({ title: "JanMitra AI", text: "Report civic issues in your area with JanMitra AI!", url: window.location.origin });
              } else if (navigator.clipboard) {
                void navigator.clipboard.writeText(window.location.origin);
              }
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white hover:opacity-90 transition-all"
            style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
            aria-label="Invite friends"
          >
            Invite Now
          </button>
        </section>
      </aside>

      {/* Voice matters banner */}
      <div className="col-span-full bg-[#F3F0FF] rounded-xl px-5 py-3 flex items-center gap-3">
        <span className="text-base" aria-hidden="true">📢</span>
        <p className="text-xs text-[#6B3FFF] font-medium">Your voice matters. Every complaint you raise makes your city a better place to live.</p>
      </div>
    </div>
  );
}
