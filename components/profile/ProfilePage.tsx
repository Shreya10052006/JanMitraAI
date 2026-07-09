"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User, Mail, Phone, MapPin, Edit3, CheckCircle2, Star,
  Clock, Bell, Shield, Headphones, LogOut, ChevronRight,
  Globe, Sun, Mic, BarChart3, Medal, Gift, Download,
  FileText, CheckSquare, Building2, Calendar, Key, Save, X, Bookmark, Inbox,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useProfile } from "@/hooks/useProfile";
import { useComplaints } from "@/hooks/useComplaints";
import { useLanguage } from "@/hooks/useLanguage";
import { useAccessibility } from "@/hooks/useAccessibility";
import { useBookmarks } from "@/hooks/useBookmarks";
import { getRecentActivity } from "@/services/storage";
import { getProfileContent } from "@/lib/i18n/content/profile";

type RecentActivityMeta = {
  id: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
};

type BadgeMeta = {
  id: string;
  emoji: string;
  color: string;
  bg: string;
  earned: boolean;
};

const RECENT_ACTIVITIES_META: RecentActivityMeta[] = [
  { id: "1", icon: CheckCircle2, iconBg: "#D1FAE5", iconColor: "#10B981" },
  { id: "2", icon: Download, iconBg: "#DBEAFE", iconColor: "#3B82F6" },
  { id: "3", icon: Gift, iconBg: "#FCE7F3", iconColor: "#EC4899" },
  { id: "4", icon: Building2, iconBg: "#EDE9FE", iconColor: "#6B3FFF" },
  { id: "5", icon: User, iconBg: "#FEF3C7", iconColor: "#F59E0B" },
];
const RECENT_ACTIVITIES_TIME: Record<string, string> = { "1": "2h ago", "2": "1d ago", "3": "2d ago", "4": "3d ago", "5": "5d ago" };

const BADGES_META: BadgeMeta[] = [
  { id: "1", emoji: "🛡️", color: "#6B3FFF", bg: "#EDE9FE", earned: true },
  { id: "2", emoji: "🏆", color: "#10B981", bg: "#D1FAE5", earned: true },
  { id: "3", emoji: "⭐", color: "#F59E0B", bg: "#FEF3C7", earned: true },
  { id: "4", emoji: "🤝", color: "#3B82F6", bg: "#DBEAFE", earned: true },
  { id: "5", emoji: "🎯", color: "#8B5CF6", bg: "#EDE9FE", earned: false },
];

const QUICK_ACTIONS_STATIC_META = [
  { id: "activity", icon: Clock, iconBg: "#DBEAFE", iconColor: "#3B82F6", href: "/activity" },
  { id: "notif", icon: Bell, iconBg: "#D1FAE5", iconColor: "#10B981", href: "/settings" },
  { id: "password", icon: Shield, iconBg: "#FEF3C7", iconColor: "#F59E0B", href: "/settings" },
  { id: "help", icon: Headphones, iconBg: "#DBEAFE", iconColor: "#3B82F6", href: "/help" },
];

const BOOKMARK_ICON: Record<string, React.ElementType> = {
  service: FileText,
  scheme: Gift,
  resource: BarChart3,
  document: CheckSquare,
};

export default function ProfilePage() {
  const router = useRouter();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const { profile, stats, updateProfile } = useProfile();
  const { complaints } = useComplaints();
  const { currentLanguage, t } = useLanguage();
  const content = getProfileContent(currentLanguage.code);
  const { settings } = useAccessibility();
  const { bookmarks } = useBookmarks();
  const recentActivity = getRecentActivity().slice(0, 5);

  const [formState, setFormState] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone ?? "",
    location: profile.location,
  });

  // Derived stats from real data
  const resolvedComplaints = complaints.filter((c) => c.status === "resolved" || c.status === "closed").length;

  const xp = Math.min(2000, resolvedComplaints * 50 + (profile.servicesUsed ?? 0) * 30 + (complaints.length * 10) + 200);
  const maxXp = 2000;
  const xpPct = Math.round((xp / maxXp) * 100);

  const level = xp < 500 ? 1 : xp < 1000 ? 2 : xp < 1500 ? 3 : xp < 2000 ? 4 : 5;
  const levelTitle = content.levelTitles[level - 1];

  function startEditing() {
    setFormState({ name: profile.name, email: profile.email, phone: profile.phone ?? "", location: profile.location });
    setIsEditingProfile(true);
  }

  async function handleSaveProfile() {
    await updateProfile({
      name: formState.name.trim() || profile.name,
      fullName: formState.name.trim() || profile.fullName,
      email: formState.email.trim(),
      phone: formState.phone.trim(),
      location: formState.location.trim() || "India",
    });
    setIsEditingProfile(false);
  }

  function handleLogout() {
    const confirmed = window.confirm("Are you sure you want to log out? Your saved data will remain on this device.");
    if (confirmed) router.push("/");
  }

  const PREFERENCES = [
    { id: "language", label: content.preferences.language, value: `${currentLanguage.label}`, icon: Globe, iconBg: "#EDE9FE", iconColor: "#6B3FFF", href: "/settings/language" },
    { id: "notifications", label: content.preferences.notifications, value: profile.notificationsEnabled ? content.ui.enabled : content.ui.disabled, icon: Bell, iconBg: "#DBEAFE", iconColor: "#3B82F6", href: "/settings" },
    { id: "voice", label: content.preferences.voice, value: settings.voiceAssistance ? content.ui.enabled : content.ui.disabled, icon: Mic, iconBg: "#FCE7F3", iconColor: "#EC4899", href: "/settings" },
    { id: "theme", label: content.preferences.theme, value: content.ui.lightMode, icon: Sun, iconBg: "#FEF3C7", iconColor: "#F59E0B", href: "/settings" },
    { id: "privacy", label: content.preferences.privacy, value: content.ui.manage, icon: Shield, iconBg: "#D1FAE5", iconColor: "#10B981", href: "/settings" },
    { id: "data", label: content.preferences.data, value: content.ui.view, icon: BarChart3, iconBg: "#EDE9FE", iconColor: "#6B3FFF", href: "/activity" },
  ];

  return (
    <div className="overflow-y-auto h-full" id="main-content">
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 lg:space-y-12 max-w-[1600px] mx-auto">

        {/* ── Page title ── */}
        <div>
          <h1 className="text-2xl font-bold text-[#1A1340]">{t("profile.title")}</h1>
          <p className="text-sm text-[#9CA3AF] mt-2">{t("profile.subtitle")}</p>
        </div>

        {/* ── Profile card + Impact ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
          {/* Profile card */}
          <div className="bg-white rounded-[20px] border border-[#E8E4F8] p-6 flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-[#6B3FFF] to-[#EC4899] flex items-center justify-center">
                <User size={40} className="text-white" aria-hidden="true" />
              </div>
              <button onClick={isEditingProfile ? handleSaveProfile : startEditing} className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#6B3FFF] flex items-center justify-center border-2 border-white shadow-sm hover:bg-[#5B2FEF] transition-colors"
                aria-label={isEditingProfile ? "Save profile" : "Edit profile"}>
                {isEditingProfile ? <Save size={12} className="text-white" aria-hidden="true" /> : <Edit3 size={12} className="text-white" aria-hidden="true" />}
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              {isEditingProfile ? (
                <div className="space-y-2">
                  <input value={formState.name} onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    placeholder={content.ui.fullNamePlaceholder} aria-label="Full name"
                    className="w-full text-lg font-bold text-[#1A1340] border border-[#E8E4F8] rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#6B3FFF]/20" />
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-[#9CA3AF] flex-shrink-0" aria-hidden="true" />
                    <input value={formState.email} onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                      placeholder={content.ui.emailPlaceholder} aria-label="Email"
                      className="flex-1 text-sm text-[#374151] border border-[#E8E4F8] rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#6B3FFF]/20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-[#9CA3AF] flex-shrink-0" aria-hidden="true" />
                    <input value={formState.phone} onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))}
                      placeholder="+91 XXXXX XXXXX" aria-label="Phone number"
                      className="flex-1 text-sm text-[#374151] border border-[#E8E4F8] rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#6B3FFF]/20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#9CA3AF] flex-shrink-0" aria-hidden="true" />
                    <input value={formState.location} onChange={(e) => setFormState((s) => ({ ...s, location: e.target.value }))}
                      placeholder={content.ui.locationPlaceholder} aria-label="Location"
                      className="flex-1 text-sm text-[#374151] border border-[#E8E4F8] rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#6B3FFF]/20" />
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <button onClick={handleSaveProfile} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white hover:opacity-90 transition-all"
                      style={{ background: "linear-gradient(135deg,#6B3FFF,#8B5CF6)" }}>
                      <Save size={12} aria-hidden="true" /> {t("common.save")}
                    </button>
                    <button onClick={() => setIsEditingProfile(false)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-[#6B7280] hover:bg-[#F3F0FF] transition-all">
                      <X size={12} aria-hidden="true" /> {t("common.cancel")}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-[#1A1340]">{profile.name || content.ui.citizen}</h2>
                  <div className="space-y-2 mt-2">
                    <p className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <Mail size={14} className="text-[#9CA3AF]" aria-hidden="true" /> {profile.email || content.ui.notSet}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <Phone size={14} className="text-[#9CA3AF]" aria-hidden="true" /> {profile.phone || "+91 XXXXX XXXXX"}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <MapPin size={14} className="text-[#9CA3AF]" aria-hidden="true" /> {profile.location || content.ui.india}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-4 flex-wrap">
                    <span className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-green-50 text-green-600 border border-green-100">
                      <CheckCircle2 size={11} aria-hidden="true" /> {content.ui.verifiedUser}
                    </span>
                    <span className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#F59E0B] border border-yellow-100">
                      <Star size={11} aria-hidden="true" /> {content.ui.activeCitizenBadge}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Level / XP */}
            <div className="flex flex-col items-center text-center flex-shrink-0 sm:border-l sm:border-[#F3F0FF] sm:pl-6 min-w-[140px]">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2 text-4xl"
                style={{ background: "linear-gradient(135deg,#EDE9FE,#F3F0FF)" }} aria-hidden="true">
                🛡️
              </div>
              <p className="text-base font-bold text-[#1A1340]">{content.ui.levelLabel} {level}</p>
              <p className="text-xs text-[#9CA3AF]">{levelTitle}</p>
              <div className="w-full mt-4">
                <div className="flex items-center justify-between text-[10px] text-[#9CA3AF] mb-2">
                  <span>{xp.toLocaleString()} / {maxXp.toLocaleString()} XP</span>
                </div>
                <div className="h-2 bg-[#F3F0FF] rounded-full overflow-hidden" role="progressbar"
                  aria-valuenow={xp} aria-valuemin={0} aria-valuemax={maxXp} aria-label={`${xp} of ${maxXp} XP`}>
                  <div className="h-full rounded-full" style={{ width: `${xpPct}%`, background: "linear-gradient(90deg,#6B3FFF,#8B5CF6)" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Impact section */}
          <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6 min-w-0 sm:min-w-[340px]" aria-labelledby="impact-heading">
            <h2 id="impact-heading" className="text-sm font-bold text-[#1A1340] mb-4">{content.ui.yourImpact}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: CheckCircle2, iconBg: "#D1FAE5", iconColor: "#10B981", value: resolvedComplaints.toString(), label: content.ui.complaintsResolved },
                { icon: FileText, iconBg: "#FEF3C7", iconColor: "#F59E0B", value: (profile.servicesUsed ?? 0).toString() || "12", label: content.ui.servicesUsed },
                { icon: Gift, iconBg: "#FCE7F3", iconColor: "#EC4899", value: (profile.schemesApplied ?? 0).toString() || "8", label: content.ui.schemesApplied },
                { icon: Download, iconBg: "#DBEAFE", iconColor: "#3B82F6", value: stats.totalComplaints.toString(), label: content.ui.complaintsFiled },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: stat.iconBg }} aria-hidden="true">
                    <stat.icon size={18} style={{ color: stat.iconColor }} />
                  </div>
                  <p className="text-xl font-bold text-[#1A1340] leading-tight">{stat.value}</p>
                  <p className="text-[10px] text-[#9CA3AF] text-center leading-tight mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 bg-yellow-50 rounded-xl px-4 py-4 border border-yellow-100">
              <Star size={14} className="text-[#F59E0B] flex-shrink-0" aria-hidden="true" />
              <p className="text-xs text-[#92400E]">
                {content.ui.youreInThe} <span className="font-bold">{content.ui.top15}</span> {content.ui.activeCitizensInArea}
              </p>
            </div>
          </section>
        </div>

        {/* ── 3 columns: Quick Actions | Recent Activity | Preferences ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="quick-actions-heading">
            <h2 id="quick-actions-heading" className="text-sm font-bold text-[#1A1340] mb-4">{content.ui.quickActionsHeading}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button onClick={startEditing} className="flex flex-col items-center gap-2 group cursor-pointer" aria-label="Edit Profile">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:-translate-y-0.5 group-hover:shadow-md" style={{ backgroundColor: "#EDE9FE" }}>
                  <Edit3 size={20} style={{ color: "#6B3FFF" }} aria-hidden="true" />
                </div>
                <span className="text-[10px] text-center leading-tight font-medium text-[#374151]">{content.ui.editProfile}</span>
              </button>
              <a href="#saved-items-heading" className="flex flex-col items-center gap-2 group cursor-pointer" aria-label="Saved Items">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:-translate-y-0.5 group-hover:shadow-md" style={{ backgroundColor: "#FCE7F3" }}>
                  <CheckSquare size={20} style={{ color: "#EC4899" }} aria-hidden="true" />
                </div>
                <span className="text-[10px] text-center leading-tight font-medium text-[#374151]">{content.ui.savedItems}</span>
              </a>
              {QUICK_ACTIONS_STATIC_META.map(action => {
                const Icon = action.icon;
                const label = content.quickActionsStatic[action.id];
                return (
                  <Link key={action.id} href={action.href} className="flex flex-col items-center gap-2 group cursor-pointer" aria-label={label}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:-translate-y-0.5 group-hover:shadow-md" style={{ backgroundColor: action.iconBg }}>
                      <Icon size={20} style={{ color: action.iconColor }} aria-hidden="true" />
                    </div>
                    <span className="text-[10px] text-center leading-tight font-medium text-[#374151]">{label}</span>
                  </Link>
                );
              })}
              <button onClick={handleLogout} className="flex flex-col items-center gap-2 group cursor-pointer" aria-label="Log Out">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:-translate-y-0.5 group-hover:shadow-md" style={{ backgroundColor: "#FEE2E2" }}>
                  <LogOut size={20} style={{ color: "#EF4444" }} aria-hidden="true" />
                </div>
                <span className="text-[10px] text-center leading-tight font-medium text-[#EF4444]">{content.ui.logOut}</span>
              </button>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="recent-act-heading">
            <div className="flex items-center justify-between mb-4">
              <h2 id="recent-act-heading" className="text-sm font-bold text-[#1A1340]">{content.ui.recentActivityHeading}</h2>
              <Link href="/activity" className="text-xs text-[#6B3FFF] hover:underline">{t("common.viewAll")}</Link>
            </div>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((act, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-2 bg-[#EDE9FE]" aria-hidden="true">
                      <CheckCircle2 size={14} className="text-[#6B3FFF]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#1A1340] truncate">{act.title}</p>
                      <p className="text-[11px] text-[#9CA3AF] truncate">{content.activityTypeLabels[act.type] ?? act.type}</p>
                    </div>
                    <span className="text-[10px] text-[#9CA3AF] flex-shrink-0 mt-2">
                      {new Date(act.timestamp).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                ))
              ) : (
                RECENT_ACTIVITIES_META.map((act) => {
                  const text = content.recentActivitiesFallback[act.id];
                  return (
                  <div key={act.id} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-2" style={{ backgroundColor: act.iconBg }} aria-hidden="true">
                      <act.icon size={14} style={{ color: act.iconColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#1A1340] truncate">{text.text}</p>
                      <p className="text-[11px] text-[#9CA3AF] truncate">{text.sub}</p>
                    </div>
                    <span className="text-[10px] text-[#9CA3AF] flex-shrink-0 mt-2">{RECENT_ACTIVITIES_TIME[act.id]}</span>
                  </div>
                  );
                })
              )}
            </div>
          </section>

          {/* Preferences */}
          <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="prefs-heading">
            <div className="flex items-center justify-between mb-4">
              <h2 id="prefs-heading" className="text-sm font-bold text-[#1A1340]">{content.ui.preferencesHeading}</h2>
              <Link href="/settings" className="text-xs text-[#6B3FFF] hover:underline font-semibold">{content.ui.edit}</Link>
            </div>
            <div className="space-y-2">
              {PREFERENCES.map(pref => (
                <Link key={pref.id} href={pref.href}
                  className="w-full flex items-center gap-4 px-2 py-4 rounded-xl hover:bg-[#F9F8FF] transition-colors group text-left"
                  aria-label={`${pref.label}: ${pref.value}`}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: pref.iconBg }} aria-hidden="true">
                    <pref.icon size={13} style={{ color: pref.iconColor }} />
                  </div>
                  <span className="flex-1 text-xs text-[#374151] font-medium">{pref.label}</span>
                  <span className="text-xs text-[#9CA3AF] mr-2">{pref.value}</span>
                  <ChevronRight size={13} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors flex-shrink-0" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* ── Saved Items ── */}
        <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="saved-items-heading">
          <div className="flex items-center justify-between mb-4">
            <h2 id="saved-items-heading" className="text-sm font-bold text-[#1A1340]">{content.ui.savedItemsHeading}</h2>
            <span className="text-xs text-[#9CA3AF]">{bookmarks.length} {content.ui.savedSuffix}</span>
          </div>
          {bookmarks.length === 0 ? (
            <div className="flex flex-col items-center text-center py-8">
              <div className="w-12 h-12 rounded-2xl bg-[#F3F0FF] flex items-center justify-center mb-3" aria-hidden="true">
                <Inbox size={20} className="text-[#6B3FFF]" />
              </div>
              <p className="text-xs text-[#9CA3AF] max-w-xs">{content.ui.noSavedItemsHint}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {bookmarks.map((b) => {
                const Icon = BOOKMARK_ICON[b.type] ?? Bookmark;
                return (
                  <Link key={b.id} href={b.href}
                    className="flex items-center gap-3 p-3 rounded-xl border border-[#E8E4F8] hover:bg-[#F9F8FF] transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-[#F3F0FF] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <Icon size={14} className="text-[#6B3FFF]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#1A1340] truncate">{b.title}</p>
                      <p className="text-[10px] text-[#9CA3AF] capitalize">{b.type}</p>
                    </div>
                    <ChevronRight size={13} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors flex-shrink-0" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Badges + Account Overview ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* Badges */}
          <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6 overflow-hidden" aria-labelledby="badges-heading">
            <div className="flex items-center justify-between mb-6">
              <h2 id="badges-heading" className="text-sm font-bold text-[#1A1340]">{content.ui.achievementsHeading}</h2>
            </div>
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {BADGES_META.map(badge => {
                const text = content.badges[badge.id];
                return (
                <div key={badge.id}
                  className={cn("flex flex-col items-center gap-2 flex-shrink-0 text-center group cursor-pointer", !badge.earned && "opacity-50")}
                  aria-label={`${text.name}: ${text.desc}${!badge.earned ? " (not yet earned)" : ""}`}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all group-hover:-translate-y-1 group-hover:shadow-md"
                    style={{ backgroundColor: badge.bg }}>
                    {badge.emoji}
                  </div>
                  <p className="text-[11px] font-semibold text-[#1A1340] w-16 leading-tight">{text.name}</p>
                  <p className="text-[10px] text-[#9CA3AF] w-16 leading-tight">{text.desc}</p>
                </div>
                );
              })}
            </div>
          </section>

          {/* Account Overview */}
          <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="account-heading">
            <h2 id="account-heading" className="text-sm font-bold text-[#1A1340] mb-4">{content.ui.accountOverviewHeading}</h2>
            <div className="space-y-4">
              {[
                { icon: Calendar, label: content.ui.memberSince, value: "15 February 2026", valueStyle: "text-[#374151] font-medium" },
                { icon: User, label: content.ui.accountType, value: content.ui.individual, badge: "bg-blue-50 text-blue-600 border border-blue-100", isBadge: true },
                { icon: Shield, label: content.ui.kycStatus, value: content.ui.verified, badge: "bg-green-50 text-green-600 border border-green-100", isBadge: true },
                { icon: Key, label: content.ui.profileCompletion, value: "85%", isProgress: true },
              ].map(row => (
                <div key={row.label} className="flex items-center gap-4">
                  <div className="w-7 h-7 rounded-lg bg-[#F3F0FF] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <row.icon size={13} className="text-[#6B3FFF]" />
                  </div>
                  <span className="text-xs text-[#6B7280] flex-1">{row.label}</span>
                  {row.isProgress ? (
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-[#F3F0FF] rounded-full overflow-hidden" role="progressbar" aria-valuenow={85} aria-valuemin={0} aria-valuemax={100} aria-label="Profile completion 85%">
                        <div className="h-full rounded-full" style={{ width: "85%", background: "linear-gradient(90deg,#6B3FFF,#8B5CF6)" }} />
                      </div>
                      <span className="text-xs font-bold text-[#1A1340]">85%</span>
                    </div>
                  ) : row.isBadge ? (
                    <span className={cn("px-2 py-2 rounded-full text-[10px] font-semibold", row.badge)}>{row.value}</span>
                  ) : (
                    <span className="text-xs text-[#374151] font-medium">{row.value}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Thank you banner ── */}
        <div className="bg-[#F3F0FF] rounded-[20px] border border-[#E8E4F8] px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-10 h-10 rounded-xl bg-[#6B3FFF] flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <Medal size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1A1340]">{content.ui.thankYouTitle}</p>
              <p className="text-xs text-[#6B7280]">{content.ui.thankYouDesc}</p>
            </div>
          </div>
          <a href="mailto:support@janmitra.gov.in?subject=JanMitra%20AI%20Feedback" className="flex items-center gap-2 px-6 py-4 rounded-xl border border-[#6B3FFF]/30 text-sm font-semibold text-[#6B3FFF] hover:bg-white transition-all flex-shrink-0"
            aria-label="Share your feedback by email">
            {content.ui.shareFeedback} <ChevronRight size={15} aria-hidden="true" />
          </a>
        </div>

      </div>
    </div>
  );
}
