"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import Link from "next/link";
import {
  Send, Paperclip, Mic, ThumbsUp, ThumbsDown, Copy, Volume2,
  ChevronRight, RefreshCw, Shield, Sparkles, CheckCircle2,
  Clock, FileText, ExternalLink, ArrowRight, AlertCircle, Trash2,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useChat } from "@/hooks/useChat";
import { useLanguage } from "@/hooks/useLanguage";

const QUICK_ACTIONS = [
  { id: "1", label: "Apply for Driving License", sub: "Start application", icon: "🪪", iconBg: "#EDE9FE", href: "/services" },
  { id: "2", label: "Track a Complaint", sub: "View your complaint status", icon: "📋", iconBg: "#D1FAE5", href: "/complaints" },
  { id: "3", label: "Find Schemes", sub: "Discover eligible schemes", icon: "🎁", iconBg: "#DBEAFE", href: "/schemes" },
  { id: "4", label: "Upload Documents", sub: "Manage your documents", icon: "📄", iconBg: "#FEF3C7", href: "/documents" },
];

const RELATED_SERVICES = [
  "Change of Address in DL",
  "International Driving Permit",
  "Learner's License",
  "Driving School Registration",
];

const DL_STEPS = [
  { icon: "🏛️", label: "1. Check Eligibility", desc: "Ensure your DL is valid or expired within 1 year" },
  { icon: "📄", label: "2. Gather Documents", desc: "Required documents ready" },
  { icon: "💻", label: "3. Apply Online", desc: "Submit application on Parivahan portal" },
  { icon: "💳", label: "4. Pay Fees", desc: "Pay renewal fee online" },
  { icon: "✅", label: "5. Get Renewed DL", desc: "DL will be sent to your registered address" },
];

const DL_DOCS = [
  "Valid Driving License",
  "Aadhaar Card or any valid ID proof",
  "Address proof (if DL address is not updated)",
  "Passport size photograph",
  "Medical Certificate (Form 1A) – if age > 40",
];

const FOLLOW_UP_CHIPS = [
  "What if my DL is expired > 1 year?",
  "How to check DL status?",
  "Required documents for commercial DL?",
  "How to report a pothole?",
  "PM Kisan eligibility",
];

export default function AIAssistantPage() {
  const { messages, isLoading, error, sendMessage, clearHistory, retryLast } = useChat();
  const { currentLanguage } = useLanguage();
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [dislikedIds, setDislikedIds] = useState<Set<string>>(new Set());
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    void sendMessage(text, currentLanguage.code);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleCopy(id: string, content: string) {
    void navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function handleLike(id: string) {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
    if (dislikedIds.has(id)) {
      setDislikedIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
    }
  }

  function handleDislike(id: string) {
    setDislikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
    if (likedIds.has(id)) {
      setLikedIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
    }
  }

  function handleChipClick(chip: string) {
    setInput(chip);
    inputRef.current?.focus();
  }

  function handleReadAloud(content: string) {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.lang = currentLanguage.code === "hi" ? "hi-IN" : "en-IN";
      window.speechSynthesis.speak(utterance);
    }
  }

  const recentConversations = messages
    .filter((m) => m.role === "user" && m.id !== "initial")
    .slice(-3)
    .reverse()
    .map((m) => ({
      label: m.content.slice(0, 50) + (m.content.length > 50 ? "…" : ""),
      time: m.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    }));

  return (
    <div className="flex h-full overflow-hidden" id="main-content">
      {/* Chat area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-6 pb-6 border-b border-[#F3F0FF] flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-[#EDE9FE] flex items-center justify-center" aria-hidden="true">
                <Sparkles size={18} className="text-[#6B3FFF]" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#1A1340]">AI Assistant</h1>
                <p className="text-xs text-[#9CA3AF]">Your smart companion for all civic needs</p>
              </div>
            </div>
            <button
              onClick={clearHistory}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E8E4F8] text-xs font-medium text-[#6B7280] hover:bg-[#F9F8FF] hover:text-red-500 transition-all"
              aria-label="Clear chat history"
            >
              <Trash2 size={13} aria-hidden="true" /> Clear
            </button>
          </div>
        </div>

        {/* Messages scroll area */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8" role="log" aria-label="Chat messages" aria-live="polite">
          {messages.map((msg) =>
            msg.role === "user" ? (
              <div key={msg.id} className="flex flex-col items-end gap-2">
                <div
                  className="max-w-[70%] px-6 py-4 rounded-2xl rounded-tr-sm text-sm text-white leading-relaxed"
                  style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
                >
                  {msg.content}
                </div>
                <span className="text-[11px] text-[#9CA3AF] pr-2 flex items-center gap-2">
                  {msg.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  <CheckCircle2 size={11} className="text-[#6B3FFF]" aria-label="Delivered" />
                </span>
              </div>
            ) : (
              <div key={msg.id} className="flex items-start gap-4">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-2",
                    msg.isError ? "bg-red-100" : "bg-[#1A1340]"
                  )}
                  aria-hidden="true"
                >
                  {msg.isError ? (
                    <AlertCircle size={14} className="text-red-500" />
                  ) : (
                    <Sparkles size={14} className="text-[#8B5CF6]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="bg-white border border-[#E8E4F8] rounded-2xl rounded-tl-sm px-6 py-4 inline-block max-w-[90%]">
                    <p className="text-sm text-[#1A1340] leading-relaxed whitespace-pre-line">{msg.content}</p>
                  </div>

                  {/* Driving license card */}
                  {msg.card === "driving-license" && (
                    <div className="mt-4 space-y-4 max-w-[90%]">
                      <div className="bg-white border border-[#E8E4F8] rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-7 h-7 rounded-lg bg-[#EDE9FE] flex items-center justify-center" aria-hidden="true">
                            <FileText size={14} className="text-[#6B3FFF]" />
                          </div>
                          <h3 className="font-semibold text-sm text-[#1A1340]">Driving License Renewal – Overview</h3>
                        </div>
                        <div className="flex items-start gap-2 overflow-x-auto pb-2">
                          {DL_STEPS.map((step, i) => (
                            <div key={i} className="flex items-start gap-2 flex-shrink-0">
                              <div className="flex flex-col items-center text-center w-24">
                                <div className="w-10 h-10 rounded-full bg-[#F3F0FF] flex items-center justify-center text-lg mb-2">{step.icon}</div>
                                <p className="text-[11px] font-semibold text-[#1A1340] leading-tight">{step.label}</p>
                                <p className="text-[10px] text-[#9CA3AF] mt-2 leading-tight">{step.desc}</p>
                              </div>
                              {i < DL_STEPS.length - 1 && (
                                <ArrowRight size={14} className="text-[#D1D5DB] mt-4 flex-shrink-0" aria-hidden="true" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white border border-[#E8E4F8] rounded-2xl p-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-sm text-[#1A1340] mb-4 flex items-center gap-2">
                              <FileText size={14} className="text-[#6B3FFF]" aria-hidden="true" />
                              Documents required
                            </h4>
                            <ul className="space-y-2">
                              {DL_DOCS.map((doc, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-[#374151]">
                                  <CheckCircle2 size={13} className="text-[#10B981] flex-shrink-0 mt-2" aria-hidden="true" />
                                  {doc}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-4 border-l border-[#F3F0FF] pl-4">
                            <div>
                              <p className="text-xs text-[#9CA3AF] mb-2">💰 Fees</p>
                              <p className="text-sm font-semibold text-[#1A1340]">₹200 – ₹600</p>
                              <p className="text-xs text-[#9CA3AF]">(Depending on DL type)</p>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Clock size={12} className="text-[#9CA3AF]" aria-hidden="true" />
                                <p className="text-xs text-[#9CA3AF]">Processing Time</p>
                              </div>
                              <p className="text-sm font-semibold text-[#1A1340]">3 – 7 working days</p>
                            </div>
                            <a
                              href="https://parivahan.gov.in"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white hover:opacity-90 transition-all"
                              style={{ background: "linear-gradient(135deg,#1A1340,#2D1B69)" }}
                            >
                              Apply Now <ExternalLink size={12} aria-hidden="true" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Suggested Actions */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 max-w-[90%]">
                      {msg.suggestedActions.map((action) => (
                        <Link
                          key={action.label}
                          href={action.href}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-[#6B3FFF] bg-[#F3F0FF] border border-[#E8E4F8] hover:bg-[#EDE9FE] transition-colors"
                          aria-label={action.label}
                        >
                          {action.label} <ChevronRight size={11} aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Related services */}
                  {msg.relatedServices && msg.relatedServices.length > 0 && (
                    <div className="mt-2 max-w-[90%]">
                      <p className="text-[10px] text-[#9CA3AF] mb-2 font-medium uppercase tracking-wide">Related Services</p>
                      <div className="flex flex-wrap gap-2">
                        {msg.relatedServices.map((s) => (
                          <span key={s} className="px-2 py-2 rounded-lg text-[11px] text-[#374151] bg-[#F9F8FF] border border-[#F3F0FF]">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Message actions */}
                  <div className="flex items-center gap-4 mt-2 pl-2">
                    <span className="text-[11px] text-[#9CA3AF]">
                      {msg.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      {msg.usedGemini && <span className="ml-2 text-[#6B3FFF]">✦ Gemini</span>}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleLike(msg.id)}
                        className={cn(
                          "p-2 rounded-lg transition-colors",
                          likedIds.has(msg.id) ? "bg-green-50 text-green-600" : "hover:bg-[#F3F0FF] text-[#9CA3AF] hover:text-[#6B3FFF]"
                        )}
                        aria-label="Like response"
                        aria-pressed={likedIds.has(msg.id)}
                      >
                        <ThumbsUp size={13} aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => handleDislike(msg.id)}
                        className={cn(
                          "p-2 rounded-lg transition-colors",
                          dislikedIds.has(msg.id) ? "bg-red-50 text-red-500" : "hover:bg-[#F3F0FF] text-[#9CA3AF] hover:text-[#6B3FFF]"
                        )}
                        aria-label="Dislike response"
                        aria-pressed={dislikedIds.has(msg.id)}
                      >
                        <ThumbsDown size={13} aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="p-2 rounded-lg hover:bg-[#F3F0FF] text-[#9CA3AF] hover:text-[#6B3FFF] transition-colors"
                        aria-label="Copy message"
                      >
                        {copiedId === msg.id ? (
                          <CheckCircle2 size={13} className="text-[#10B981]" />
                        ) : (
                          <Copy size={13} aria-hidden="true" />
                        )}
                      </button>
                      <button
                        onClick={() => handleReadAloud(msg.content)}
                        className="p-2 rounded-lg hover:bg-[#F3F0FF] text-[#9CA3AF] hover:text-[#6B3FFF] transition-colors"
                        aria-label="Read aloud"
                      >
                        <Volume2 size={13} aria-hidden="true" />
                      </button>
                    </div>
                    {msg.isError && (
                      <button
                        onClick={retryLast}
                        className="flex items-center gap-2 text-[11px] text-[#6B3FFF] hover:underline"
                        aria-label="Retry message"
                      >
                        <RefreshCw size={11} aria-hidden="true" /> Retry
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          )}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#1A1340] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <Sparkles size={14} className="text-[#8B5CF6]" />
              </div>
              <div className="bg-white border border-[#E8E4F8] rounded-2xl px-6 py-4">
                <div className="flex gap-2 items-center" aria-label="AI is typing" role="status">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[#6B3FFF] animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Error banner */}
          {error && (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-xl border border-red-100 text-xs text-red-600">
              <AlertCircle size={13} aria-hidden="true" />
              {error}
              <button onClick={retryLast} className="ml-auto font-medium hover:underline">
                Retry
              </button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Follow-up chips */}
        <div className="px-8 py-4 flex items-center gap-2 flex-wrap border-t border-[#F3F0FF]">
          {FOLLOW_UP_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => handleChipClick(chip)}
              className="px-4 py-2 rounded-full text-xs text-[#6B3FFF] bg-[#F3F0FF] hover:bg-[#EDE9FE] border border-[#E8E4F8] transition-colors font-medium"
              aria-label={`Ask: ${chip}`}
            >
              {chip}
            </button>
          ))}
          <button
            onClick={() => setInput("")}
            className="p-2 rounded-full text-[#9CA3AF] hover:text-[#6B3FFF] hover:bg-[#F3F0FF] transition-colors"
            aria-label="Refresh suggestions"
          >
            <RefreshCw size={14} aria-hidden="true" />
          </button>
        </div>

        {/* Input bar */}
        <div className="px-8 py-6 border-t border-[#E8E4F8] flex-shrink-0">
          <div className="flex items-end gap-4 bg-white rounded-[20px] border border-[#E8E4F8] shadow-sm px-6 py-4">
            <button className="text-[#9CA3AF] hover:text-[#6B3FFF] transition-colors flex-shrink-0" aria-label="Attach file">
              <Paperclip size={18} aria-hidden="true" />
            </button>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about government services..."
              rows={1}
              className="flex-1 bg-transparent text-sm text-[#374151] placeholder-[#9CA3AF] resize-none outline-none leading-relaxed max-h-28"
              aria-label="Type your message"
              disabled={isLoading}
            />
            <button
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const SR = (window as any).webkitSpeechRecognition ?? (window as any).SpeechRecognition;
                if (SR) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const recognition = new SR() as any;
                  recognition.lang = currentLanguage.code === "hi" ? "hi-IN" : "en-IN";
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  recognition.onresult = (e: any) => {
                    setInput(e.results[0][0].transcript as string);
                  };
                  recognition.start();
                }
              }}
              className="text-[#9CA3AF] hover:text-[#6B3FFF] transition-colors flex-shrink-0"
              aria-label="Voice input"
            >
              <Mic size={18} aria-hidden="true" />
            </button>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200",
                input.trim() && !isLoading
                  ? "text-white shadow-md hover:scale-105"
                  : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
              )}
              style={input.trim() && !isLoading ? { background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" } : {}}
              aria-label="Send message"
            >
              <Send size={15} aria-hidden="true" />
            </button>
          </div>
          <p className="text-center text-[10px] text-[#9CA3AF] mt-2 flex items-center justify-center gap-2">
            <Shield size={10} aria-hidden="true" />
            JanMitra AI can make mistakes. Please verify important information on official government websites.
          </p>
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="w-80 flex-shrink-0 border-l border-[#E8E4F8] overflow-y-auto hidden xl:block bg-white">
        <div className="p-6 space-y-6">
          {/* Quick Actions */}
          <section aria-labelledby="qa-heading">
            <div className="flex items-center justify-between mb-4">
              <h2 id="qa-heading" className="text-sm font-semibold text-[#1A1340]">Quick Actions</h2>
              <Link href="/services" className="text-xs text-[#6B3FFF] hover:underline">View All</Link>
            </div>
            <div className="space-y-2">
              {QUICK_ACTIONS.map((qa) => (
                <Link
                  key={qa.id}
                  href={qa.href}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#F9F8FF] border border-transparent hover:border-[#E8E4F8] transition-all group"
                  aria-label={qa.label}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ backgroundColor: qa.iconBg }} aria-hidden="true">
                    {qa.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1A1340] truncate">{qa.label}</p>
                    <p className="text-[10px] text-[#9CA3AF] truncate">{qa.sub}</p>
                  </div>
                  <ChevronRight size={14} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>

          {/* Related Services */}
          <section aria-labelledby="rs-heading">
            <div className="flex items-center justify-between mb-4">
              <h2 id="rs-heading" className="text-sm font-semibold text-[#1A1340]">Related Services</h2>
              <Link href="/services" className="text-xs text-[#6B3FFF] hover:underline">View All</Link>
            </div>
            <div className="space-y-2">
              {RELATED_SERVICES.map((s) => (
                <Link
                  key={s}
                  href="/services"
                  className="w-full flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[#F9F8FF] transition-colors group text-left"
                  aria-label={s}
                >
                  <div className="w-5 h-5 rounded-md bg-[#EDE9FE] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <FileText size={11} className="text-[#6B3FFF]" />
                  </div>
                  <span className="text-xs text-[#374151] group-hover:text-[#6B3FFF] transition-colors">{s}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Personalized help */}
          <section
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,#F3F0FF,#EDE9FE)" }}
            aria-label="Need personalized help"
          >
            <p className="text-sm font-semibold text-[#1A1340] mb-2">Need personalized help?</p>
            <p className="text-xs text-[#6B7280] mb-4">Share a few details and get custom guidance.</p>
            <button
              onClick={() => {
                setInput("I need personalized guidance. Can you help me find government services and schemes suitable for me?");
                inputRef.current?.focus();
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white hover:opacity-90 transition-all"
              style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}
            >
              Tell me more
            </button>
            <div className="absolute right-2 bottom-2 text-5xl opacity-10 pointer-events-none select-none" aria-hidden="true">🤖</div>
          </section>

          {/* Recent Conversations */}
          <section aria-labelledby="rc-heading">
            <div className="flex items-center justify-between mb-4">
              <h2 id="rc-heading" className="text-sm font-semibold text-[#1A1340]">Recent Conversations</h2>
            </div>
            <div className="space-y-2">
              {recentConversations.length > 0 ? (
                recentConversations.map((rc, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(rc.label.replace("…", ""));
                      inputRef.current?.focus();
                    }}
                    className="w-full text-left px-4 py-4 rounded-xl hover:bg-[#F9F8FF] transition-colors"
                    aria-label={rc.label}
                  >
                    <p className="text-xs font-medium text-[#1A1340] truncate">{rc.label}</p>
                    <p className="text-[10px] text-[#9CA3AF] mt-2">{rc.time}</p>
                  </button>
                ))
              ) : (
                <p className="text-xs text-[#9CA3AF] px-4 py-2">No recent conversations</p>
              )}
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
