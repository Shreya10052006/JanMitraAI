"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  MapPin, ChevronDown, Sparkles, CheckCircle2, Upload, X,
  ChevronRight, Building2, AlertTriangle, Copy, Mic,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useComplaints } from "@/hooks/useComplaints";
import { useAccessibility } from "@/hooks/useAccessibility";
import { useVoiceAssistant } from "@/hooks/useVoiceAssistant";
import { useLanguage } from "@/hooks/useLanguage";
import { getComplaintsContent } from "@/lib/i18n/content/complaints";
import { DynamicLocationMap } from "@/components/ui/DynamicLocationMap";
import type { ComplaintStatus } from "@/types";
import type { StoredComplaint } from "@/services/storage";

/** Default map center: New Delhi, used until the citizen picks or locates a spot. */
const DEFAULT_MAP_CENTER: [number, number] = [28.6139, 77.209];

/** Representative pins for other recently reported issues around the city (category kept in English; label built from translated category at render time). */
const NEARBY_ISSUE_META = [
  { lat: 28.6519, lng: 77.1909, place: "Karol Bagh", category: "Street Lighting" },
  { lat: 28.6129, lng: 77.2295, place: "India Gate", category: "Sanitation & Drainage" },
  { lat: 28.6315, lng: 77.2167, place: "Connaught Place", category: "Roads & Infrastructure" },
  { lat: 28.5677, lng: 77.2431, place: "Lajpat Nagar", category: "Water Supply" },
];

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

const WHEN_OPTION_KEYS = ["Today", "Yesterday", "2 days ago", "3 days ago", "This week", "Last week"];

const STATUS_TRANSLATION_KEY: Record<ComplaintStatus, "status.submitted" | "status.under_review" | "status.assigned" | "status.in_progress" | "status.resolved" | "status.closed"> = {
  submitted: "status.submitted",
  under_review: "status.under_review",
  assigned: "status.assigned",
  in_progress: "status.in_progress",
  resolved: "status.resolved",
  closed: "status.closed",
};

interface ReportIssueTabProps {
  onViewComplaints: () => void;
}

export function ReportIssueTab({ onViewComplaints }: ReportIssueTabProps) {
  const { complaints, isAnalyzing, analysisResult, analyzeComplaint, submitComplaint, resetAnalysis } = useComplaints();
  const { settings } = useAccessibility();
  const voice = useVoiceAssistant();
  const { t, currentLanguage } = useLanguage();
  const content = getComplaintsContent(currentLanguage.code);
  const r = content.report;
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [when, setWhen] = useState("Today");
  const [whenOpen, setWhenOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submittedTicket, setSubmittedTicket] = useState<StoredComplaint | null>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_MAP_CENTER);
  const [pinCoords, setPinCoords] = useState<[number, number] | null>(null);
  const [mapExpanded, setMapExpanded] = useState(false);
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

  function handleMapLocationSelect(lat: number, lng: number) {
    setPinCoords([lat, lng]);
    setMapCenter([lat, lng]);
    setLocation(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}, India`);
  }

  function handleUseLocation() {
    if (!navigator.geolocation) {
      setLocation("New Delhi, India");
      return;
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}, India`);
        setPinCoords([latitude, longitude]);
        setMapCenter([latitude, longitude]);
        setLocationLoading(false);
      },
      () => {
        setLocation("New Delhi, India");
        setLocationLoading(false);
      },
      { timeout: 5000 }
    );
  }

  function handleMicDictation() {
    if (voice.isListening) {
      voice.stopListening();
      return;
    }
    voice.startListening((text) => {
      setDescription((prev) => (prev.trim() ? `${prev.trim()} ${text}` : text).slice(0, 500));
    });
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
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px_240px] gap-6">
        <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6 sm:p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#D1FAE5] flex items-center justify-center mb-4" aria-hidden="true">
            <CheckCircle2 size={32} className="text-[#10B981]" />
          </div>
          <h2 className="text-xl font-bold text-[#1A1340] mb-2">{r.successTitle}</h2>
          <p className="text-sm text-[#6B7280] mb-6">{r.successDesc}</p>

          <div className="bg-[#F3F0FF] rounded-xl px-6 py-4 mb-6 w-full max-w-sm">
            <p className="text-xs text-[#9CA3AF] mb-2">{r.yourComplaintId}</p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-2xl font-bold text-[#6B3FFF]">{submittedTicket.ticketId}</p>
              <button
                onClick={handleCopyTicket}
                className="p-2 rounded-lg bg-[#EDE9FE] text-[#6B3FFF] hover:bg-[#DDD6FE] transition-colors"
                aria-label="Copy ticket ID"
              >
                {copiedTicket ? <CheckCircle2 size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-6">
            {[
              { label: r.category, value: content.categoryLabels[submittedTicket.category] ?? submittedTicket.category },
              { label: r.priority, value: submittedTicket.priority.charAt(0).toUpperCase() + submittedTicket.priority.slice(1) },
              { label: r.department, value: submittedTicket.department ?? "Municipal Corporation" },
              { label: r.status, value: t("status.submitted") },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#F9F8FF] rounded-xl p-4 text-left">
                <p className="text-[10px] text-[#9CA3AF]">{label}</p>
                <p className="text-xs font-semibold text-[#1A1340] mt-2">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-sm">
            <button
              onClick={onViewComplaints}
              className="px-6 py-4 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 flex items-center justify-center w-full sm:w-auto"
              style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
            >
              {r.trackComplaintBtn}
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-4 rounded-xl border border-[#E8E4F8] text-sm font-medium text-[#374151] hover:bg-[#F9F8FF] transition-all flex items-center justify-center w-full sm:w-auto"
            >
              {r.reportAnother}
            </button>
          </div>
        </section>

        <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-4" aria-labelledby="my-cmp-heading-success">
          <div className="flex items-center justify-between mb-4">
            <h2 id="my-cmp-heading-success" className="text-sm font-semibold text-[#1A1340]">{r.myComplaintsHeading}</h2>
            <button onClick={onViewComplaints} className="text-xs text-[#6B3FFF] hover:underline">{t("common.viewAll")}</button>
          </div>
          <div className="space-y-2">
            {complaints.slice(0, 3).map((c) => (
              <button key={c.id} onClick={onViewComplaints} className="w-full flex items-start gap-2 p-4 rounded-xl hover:bg-[#F9F8FF] transition-colors text-left group" aria-label={`${c.ticketId}: ${c.title}`}>
                <span className="text-lg flex-shrink-0" aria-hidden="true">{COMPLAINT_ICONS[c.category] ?? COMPLAINT_ICONS.default}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-[#6B3FFF] truncate">#{c.ticketId}</p>
                  <p className="text-[11px] text-[#1A1340] truncate">{c.title}</p>
                  <span className={cn("px-2 py-2 rounded-full text-[9px] font-semibold", STATUS_COLORS[c.status])}>{t(STATUS_TRANSLATION_KEY[c.status])}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="col-span-full bg-[#F3F0FF] rounded-xl px-6 py-4 flex items-center gap-4">
          <span className="text-base" aria-hidden="true">📢</span>
          <p className="text-xs text-[#6B3FFF] font-medium">{r.voiceMatters}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px_240px] gap-6">
      {/* ── Form ── */}
      <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6 space-y-6" aria-labelledby="report-heading">
        <div>
          <h2 id="report-heading" className="text-base font-bold text-[#1A1340]">{r.heading}</h2>
          <p className="text-xs text-[#6B7280] mt-2">{r.subheading}</p>
        </div>

        {/* 1. Upload */}
        <div>
          <label className="block text-sm font-semibold text-[#1A1340] mb-2">{r.uploadLabel}</label>
          <div className="border-2 border-dashed border-[#E8E4F8] rounded-xl p-4 relative" aria-label="Upload photo or video">
            <input
              ref={fileRef}
              type="file"
              accept="image/*,video/*"
              className="sr-only"
              aria-label="Choose file to upload"
              onChange={handleFileChange}
            />
            {imagePreview ? (
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={imagePreview} alt="Uploaded issue photo" fill className="object-cover" unoptimized />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl border border-[#E8E4F8] hover:bg-[#F9F8FF] transition-colors text-xs text-[#6B7280]"
                    aria-label="Add more photos"
                  >
                    <Upload size={16} className="text-[#6B3FFF]" aria-hidden="true" />
                    {r.addMore}
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
                {r.uploadClickText}
              </button>
            )}
            <p className="text-[10px] text-[#9CA3AF] mt-2">{r.uploadHint}</p>
          </div>
        </div>

        {/* 2. Location */}
        <div>
          <label htmlFor="issue-location" className="block text-sm font-semibold text-[#1A1340] mb-2">{r.locationLabel}</label>
          <div className="relative">
            <input
              id="issue-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-[#E8E4F8] rounded-xl px-4 py-4 text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#6B3FFF]/20 focus:border-[#6B3FFF]/40 pr-44"
              placeholder={r.locationPlaceholder}
              aria-label="Issue location"
            />
            <button
              onClick={handleUseLocation}
              disabled={locationLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-xs text-[#6B3FFF] font-medium hover:underline disabled:opacity-50"
              aria-label="Use current location"
            >
              <MapPin size={13} aria-hidden="true" />
              {locationLoading ? r.locating : r.useCurrentLocation}
            </button>
          </div>
          <p className="text-[10px] text-[#9CA3AF] mt-2">{r.mapHint}</p>
          <div className="mt-2">
            <DynamicLocationMap
              center={mapCenter}
              markers={pinCoords ? [{ lat: pinCoords[0], lng: pinCoords[1], label: location || "Selected location" }] : []}
              onLocationSelect={handleMapLocationSelect}
              showLocateButton
              heightClassName="h-44"
            />
          </div>
        </div>

        {/* 3. Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="issue-desc" className="block text-sm font-semibold text-[#1A1340]">{r.descriptionLabel}</label>
            {settings.voiceAssistance && voice.isSupported && (
              <button
                type="button"
                onClick={handleMicDictation}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors",
                  voice.isListening ? "bg-red-50 text-red-500 animate-pulse" : "text-[#6B3FFF] hover:bg-[#F3F0FF]"
                )}
                aria-label={voice.isListening ? "Stop dictation" : "Dictate description by voice"}
                aria-pressed={voice.isListening}
              >
                <Mic size={12} aria-hidden="true" />
                {voice.isListening ? r.listening : r.dictate}
              </button>
            )}
          </div>
          <div className="relative">
            <textarea
              id="issue-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 500))}
              rows={4}
              className="w-full border border-[#E8E4F8] rounded-xl px-4 py-4 text-sm text-[#374151] outline-none focus:ring-2 focus:ring-[#6B3FFF]/20 focus:border-[#6B3FFF]/40 resize-none"
              placeholder={r.descriptionPlaceholder}
              aria-label="Issue description"
            />
            <span className="absolute bottom-2 right-3 text-[10px] text-[#9CA3AF]">{charCount}/500</span>
          </div>
        </div>

        {/* 4. When */}
        <div>
          <label className="block text-sm font-semibold text-[#1A1340] mb-2">{r.whenLabel}</label>
          <div className="relative">
            <button
              onClick={() => setWhenOpen((v) => !v)}
              className="w-full flex items-center justify-between border border-[#E8E4F8] rounded-xl px-4 py-4 text-sm text-[#374151] hover:border-[#6B3FFF]/30 transition-colors bg-white"
              aria-haspopup="listbox"
              aria-expanded={whenOpen}
              aria-label="When did you notice the issue"
            >
              <span>{content.whenOptions[when] ?? when}</span>
              <ChevronDown size={15} className={cn("text-[#9CA3AF] transition-transform", whenOpen && "rotate-180")} aria-hidden="true" />
            </button>
            {whenOpen && (
              <ul className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E8E4F8] rounded-xl shadow-lg z-20 overflow-hidden" role="listbox" aria-label="When options">
                {WHEN_OPTION_KEYS.map((opt) => (
                  <li key={opt}>
                    <button
                      role="option"
                      aria-selected={when === opt}
                      onClick={() => { setWhen(opt); setWhenOpen(false); }}
                      className={cn("w-full text-left px-4 py-4 text-sm hover:bg-[#F9F8FF] transition-colors", when === opt && "text-[#6B3FFF] font-medium bg-[#F3F0FF]")}
                    >
                      {content.whenOptions[opt] ?? opt}
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
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
          aria-label="Analyze issue with AI"
        >
          {isAnalyzing ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
              {r.analyzing}
            </>
          ) : (
            <>
              <Sparkles size={15} aria-hidden="true" />
              {r.analyzeButton}
            </>
          )}
        </button>

        {!canAnalyze && (
          <p className="text-[11px] text-[#9CA3AF] text-center -mt-4">
            {r.analyzeHint}
          </p>
        )}

        <div className="flex items-center gap-2 text-xs text-[#6B7280] bg-[#F9F8FF] rounded-xl px-4 py-4">
          <CheckCircle2 size={14} className="text-[#10B981] flex-shrink-0" aria-hidden="true" />
          {r.aiHelperNote}
        </div>
      </section>

      {/* ── AI Analysis Preview ── */}
      <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6 space-y-6" aria-labelledby="ai-preview-heading">
        <div>
          <h2 id="ai-preview-heading" className="text-base font-bold text-[#1A1340]">{r.aiPreviewHeading}</h2>
          <p className="text-xs text-[#6B7280] mt-2">{r.aiPreviewSub}</p>
        </div>

        {analysisResult ? (
          <>
            {/* Detected category */}
            <div className="bg-[#F9F8FF] rounded-xl p-4">
              <p className="text-[10px] text-[#9CA3AF] mb-2 font-medium uppercase tracking-wide">{r.aiDetectedCategory}</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <AlertTriangle size={18} className="text-[#6B3FFF]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1A1340]">{content.categoryLabels[analysisResult.category] ?? analysisResult.category}</p>
                  <span className={cn(
                    "px-2 py-2 rounded-full text-[10px] font-semibold",
                    analysisResult.priority === "high" ? "bg-red-100 text-red-600" :
                    analysisResult.priority === "medium" ? "bg-orange-100 text-orange-600" :
                    "bg-green-100 text-green-600"
                  )}>
                    {analysisResult.priority.charAt(0).toUpperCase() + analysisResult.priority.slice(1)} {r.priority}
                  </span>
                </div>
              </div>
            </div>

            {/* Confidence */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[#1A1340]">{r.confidenceScore}</span>
                <span className="text-xs font-bold text-[#6B3FFF]">{Math.round(analysisResult.confidence * 100)}%</span>
              </div>
              <div className="h-2 bg-[#F3F0FF] rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round(analysisResult.confidence * 100)} aria-valuemin={0} aria-valuemax={100} aria-label={`AI confidence score ${Math.round(analysisResult.confidence * 100)}%`}>
                <div className="h-full rounded-full" style={{ width: `${Math.round(analysisResult.confidence * 100)}%`, background: "linear-gradient(90deg,#6B3FFF,#8B5CF6)" }} />
              </div>
            </div>

            {/* Dept */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-[#EDE9FE] flex items-center justify-center flex-shrink-0 mt-2" aria-hidden="true">
                <Building2 size={14} className="text-[#6B3FFF]" />
              </div>
              <div>
                <p className="text-[10px] text-[#9CA3AF]">{r.suggestedDepartment}</p>
                <p className="text-sm font-semibold text-[#1A1340]">{analysisResult.department}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#10B981] bg-green-50 rounded-xl px-4 py-4 border border-green-100">
              <CheckCircle2 size={13} aria-hidden="true" />
              {r.routedNote.replace("{department}", analysisResult.department)}
            </div>

            {/* Issue Summary */}
            <div>
              <h3 className="text-xs font-semibold text-[#1A1340] mb-2">{r.issueSummary}</h3>
              <div className="space-y-2">
                {[
                  { label: r.category, value: content.categoryLabels[analysisResult.category] ?? analysisResult.category },
                  { label: r.location, value: location },
                  { label: r.description, value: description.slice(0, 120) + (description.length > 120 ? "…" : "") },
                  { label: r.reported, value: content.whenOptions[when] ?? when },
                ].map(({ label, value }) => (
                  <div key={label} className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="text-[10px] text-[#9CA3AF] pt-2">{label}</span>
                    <span className="text-xs text-[#374151]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Suggestion */}
            <div className="bg-gradient-to-r from-[#F3F0FF] to-[#EDE9FE] rounded-xl p-4">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-[#6B3FFF] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Sparkles size={13} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#6B3FFF] mb-2">{r.aiSuggestionHeading}</p>
                  <p className="text-xs text-[#374151]">{r.aiSuggestionText}</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={resetAnalysis}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border border-[#E8E4F8] text-sm font-medium text-[#374151] hover:bg-[#F9F8FF] transition-all"
                aria-label="Edit complaint details"
              >
                {r.editDetails}
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
                aria-label="Submit complaint"
              >
                <span>{r.submitComplaint}</span> <CheckCircle2 size={14} aria-hidden="true" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#EDE9FE] flex items-center justify-center mb-4" aria-hidden="true">
              <Sparkles size={24} className="text-[#6B3FFF]" />
            </div>
            <p className="text-sm font-semibold text-[#1A1340]">{r.fillFormTitle}</p>
            <p className="text-xs text-[#9CA3AF] mt-2 max-w-[200px]">{r.fillFormHint}</p>
          </div>
        )}
      </section>

      {/* ── Right sidebar ── */}
      <aside className="space-y-6" aria-label="Complaints sidebar">
        {/* My Complaints mini list */}
        <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-4" aria-labelledby="my-cmp-heading">
          <div className="flex items-center justify-between mb-4">
            <h2 id="my-cmp-heading" className="text-sm font-semibold text-[#1A1340]">{r.myComplaintsHeading}</h2>
            <button onClick={onViewComplaints} className="text-xs text-[#6B3FFF] hover:underline">{t("common.viewAll")}</button>
          </div>
          <div className="space-y-2">
            {complaints.slice(0, 4).map((c) => (
              <button key={c.id} onClick={onViewComplaints} className="w-full flex items-start gap-2 p-4 rounded-xl hover:bg-[#F9F8FF] transition-colors text-left group" aria-label={`${c.ticketId}: ${c.title}`}>
                <span className="text-lg flex-shrink-0" aria-hidden="true">{COMPLAINT_ICONS[c.category] ?? COMPLAINT_ICONS.default}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] font-semibold text-[#6B3FFF] truncate">#{c.ticketId}</p>
                    <span className={cn("px-2 py-2 rounded-full text-[9px] font-semibold flex-shrink-0", STATUS_COLORS[c.status])}>{t(STATUS_TRANSLATION_KEY[c.status])}</span>
                  </div>
                  <p className="text-[11px] text-[#1A1340] truncate">{c.title}</p>
                  <p className="text-[10px] text-[#9CA3AF] flex items-center gap-2 mt-2"><MapPin size={9} aria-hidden="true" />{c.location.split(",")[0]}</p>
                </div>
                <ChevronRight size={12} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] flex-shrink-0 mt-2 transition-colors" aria-hidden="true" />
              </button>
            ))}
          </div>
        </section>

        {/* Nearby issues map */}
        <section className="bg-white rounded-[20px] border border-[#E8E4F8] overflow-hidden" aria-labelledby="heatmap-heading">
          <div className="flex items-center justify-between px-4 py-4 border-b border-[#F3F0FF]">
            <h2 id="heatmap-heading" className="text-sm font-semibold text-[#1A1340]">{r.nearbyIssuesHeading}</h2>
            <button onClick={() => setMapExpanded((v) => !v)} className="text-xs text-[#6B3FFF] hover:underline">
              {mapExpanded ? r.collapseMap : r.viewFullMap}
            </button>
          </div>
          <div className="p-3">
            <DynamicLocationMap
              center={DEFAULT_MAP_CENTER}
              zoom={12}
              markers={NEARBY_ISSUE_META.map((m) => ({ lat: m.lat, lng: m.lng, label: `${m.place} — ${content.categoryLabels[m.category] ?? m.category}` }))}
              heightClassName={mapExpanded ? "h-72" : "h-36"}
            />
          </div>
        </section>

        {/* Make bigger impact */}
        <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-4" aria-labelledby="impact-heading">
          <h2 id="impact-heading" className="text-sm font-semibold text-[#1A1340] mb-2">{r.biggerImpactHeading}</h2>
          <p className="text-xs text-[#6B7280] mb-4">{r.biggerImpactDesc}</p>
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
            {r.inviteNow}
          </button>
        </section>
      </aside>

      {/* Voice matters banner */}
      <div className="col-span-full bg-[#F3F0FF] rounded-xl px-6 py-4 flex items-center gap-4">
        <span className="text-base" aria-hidden="true">📢</span>
        <p className="text-xs text-[#6B3FFF] font-medium">{r.voiceMatters}</p>
      </div>
    </div>
  );
}
