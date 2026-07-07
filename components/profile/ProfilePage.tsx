"use client";

import { useState } from "react";
import {
  User, Mail, Phone, MapPin, Edit3, CheckCircle2, Star,
  Clock, Bell, Lock, Link2, Headphones, LogOut, ChevronRight,
  Globe, Sun, Mic, BarChart3, Medal, Shield, Gift, Download,
  FileText, CheckSquare, Building2, Calendar, Key,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useProfile } from "@/hooks/useProfile";
import { useComplaints } from "@/hooks/useComplaints";
import { getRecentActivity } from "@/services/storage";

type RecentActivity = {
  id: string;
  text: string;
  sub: string;
  time: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
};

type Badge = {
  id: string;
  name: string;
  desc: string;
  emoji: string;
  color: string;
  bg: string;
  earned: boolean;
};

type Preference = {
  id: string;
  label: string;
  value: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
};

const RECENT_ACTIVITIES: RecentActivity[] = [
  { id: "1", text: "Complaint #CMP-2026-1452 resolved", sub: "Road Damage / Pothole", time: "2h ago", icon: CheckCircle2, iconBg: "#D1FAE5", iconColor: "#10B981" },
  { id: "2", text: "Downloaded Birth Certificate", sub: "Document downloaded", time: "1d ago", icon: Download, iconBg: "#DBEAFE", iconColor: "#3B82F6" },
  { id: "3", text: "Applied for PM Kisan Yojana", sub: "Application submitted", time: "2d ago", icon: Gift, iconBg: "#FCE7F3", iconColor: "#EC4899" },
  { id: "4", text: "Water leakage complaint submitted", sub: "#CMP-2026-1287", time: "3d ago", icon: Building2, iconBg: "#EDE9FE", iconColor: "#6B3FFF" },
  { id: "5", text: "Referred a friend to JanMitra AI", sub: "You earned 50 XP", time: "5d ago", icon: User, iconBg: "#FEF3C7", iconColor: "#F59E0B" },
];

const BADGES: Badge[] = [
  { id: "1", name: "Civic Starter", desc: "Joined JanMitra AI", emoji: "🛡️", color: "#6B3FFF", bg: "#EDE9FE", earned: true },
  { id: "2", name: "Active Citizen", desc: "Used 5 Services", emoji: "🏆", color: "#10B981", bg: "#D1FAE5", earned: true },
  { id: "3", name: "Problem Solver", desc: "Resolved 10 Complaints", emoji: "⭐", color: "#F59E0B", bg: "#FEF3C7", earned: true },
  { id: "4", name: "Community Helper", desc: "Referred 3 Friends", emoji: "🤝", color: "#3B82F6", bg: "#DBEAFE", earned: true },
  { id: "5", name: "Dedicated Citizen", desc: "30 Days Active", emoji: "🎯", color: "#8B5CF6", bg: "#EDE9FE", earned: false },
];

const PREFERENCES: Preference[] = [
  { id: "language", label: "Language", value: "English", icon: Globe, iconBg: "#EDE9FE", iconColor: "#6B3FFF" },
  { id: "notifications", label: "Notification Preference", value: "Email & SMS", icon: Bell, iconBg: "#DBEAFE", iconColor: "#3B82F6" },
  { id: "privacy", label: "Privacy Settings", value: "Manage", icon: Shield, iconBg: "#D1FAE5", iconColor: "#10B981" },
  { id: "theme", label: "App Theme", value: "Light Mode", icon: Sun, iconBg: "#FEF3C7", iconColor: "#F59E0B" },
  { id: "voice", label: "Voice Assistant", value: "Enabled", icon: Mic, iconBg: "#FCE7F3", iconColor: "#EC4899" },
  { id: "data", label: "Data & Activity", value: "Manage", icon: BarChart3, iconBg: "#EDE9FE", iconColor: "#6B3FFF" },
];

const QUICK_ACTIONS = [
  { id: "edit", label: "Edit Profile", icon: Edit3, iconBg: "#EDE9FE", iconColor: "#6B3FFF", href: "/profile/edit" },
  { id: "activity", label: "My Activity", icon: Clock, iconBg: "#DBEAFE", iconColor: "#3B82F6", href: "/activity" },
  { id: "saved", label: "Saved Items", icon: CheckSquare, iconBg: "#FCE7F3", iconColor: "#EC4899", href: "/profile/saved" },
  { id: "notif", label: "Notification Settings", icon: Bell, iconBg: "#D1FAE5", iconColor: "#10B981", href: "/settings/notifications" },
  { id: "password", label: "Change Password", icon: Lock, iconBg: "#FEF3C7", iconColor: "#F59E0B", href: "/settings/security" },
  { id: "linked", label: "Linked Accounts", icon: Link2, iconBg: "#EDE9FE", iconColor: "#8B5CF6", href: "/settings/accounts" },
  { id: "help", label: "Help & Support", icon: Headphones, iconBg: "#DBEAFE", iconColor: "#3B82F6", href: "/help" },
  { id: "logout", label: "Log Out", icon: LogOut, iconBg: "#FEE2E2", iconColor: "#EF4444", href: "/auth/signout" },
];


export default function ProfilePage() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const { profile, stats, updateProfile } = useProfile();
  const { complaints } = useComplaints();
  const recentActivity = getRecentActivity().slice(0, 5);

  // Derived stats from real data
  const resolvedComplaints = complaints.filter((c) => c.status === "resolved" || c.status === "closed").length;

  const xp = Math.min(2000, resolvedComplaints * 50 + (profile.servicesUsed ?? 0) * 30 + (complaints.length * 10) + 200);
  const maxXp = 2000;
  const xpPct = Math.round((xp / maxXp) * 100);

  const level = xp < 500 ? 1 : xp < 1000 ? 2 : xp < 1500 ? 3 : xp < 2000 ? 4 : 5;
  const levelTitle = level === 1 ? "Civic Newcomer" : level === 2 ? "Active Citizen" : level === 3 ? "Civic Advocate" : level === 4 ? "Civic Contributor" : "Super Citizen";

  async function handleEditSave() {
    if (!isEditingProfile) {
      setIsEditingProfile(true);
    } else {
      await updateProfile({});
      setIsEditingProfile(false);
    }
  }

  return (
    <div className="overflow-y-auto h-full" id="main-content">
      <div className="px-10 py-8 space-y-12 max-w-[1600px] mx-auto">

        {/* ── Page title ── */}
        <div>
          <h1 className="text-2xl font-bold text-[#1A1340]">Profile</h1>
          <p className="text-sm text-[#9CA3AF] mt-2">Manage your profile, activity and preferences</p>
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
              <button onClick={handleEditSave} className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#6B3FFF] flex items-center justify-center border-2 border-white shadow-sm hover:bg-[#5B2FEF] transition-colors"
                aria-label="Edit profile photo">
                <Edit3 size={12} className="text-white" aria-hidden="true" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-[#1A1340]">{profile.name || "Citizen"}</h2>
              <div className="space-y-2 mt-2">
                <p className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <Mail size={14} className="text-[#9CA3AF]" aria-hidden="true" /> {profile.email || "Not set"}
                </p>
                <p className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <Phone size={14} className="text-[#9CA3AF]" aria-hidden="true" /> {profile.phone || "+91 XXXXX XXXXX"}
                </p>
                <p className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <MapPin size={14} className="text-[#9CA3AF]" aria-hidden="true" /> {profile.location || "India"}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-green-50 text-green-600 border border-green-100">
                  <CheckCircle2 size={11} aria-hidden="true" /> Verified User
                </span>
                <span className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#F59E0B] border border-yellow-100">
                  <Star size={11} aria-hidden="true" /> Active Citizen
                </span>
              </div>
            </div>

            {/* Level / XP */}
            <div className="flex flex-col items-center text-center flex-shrink-0 sm:border-l sm:border-[#F3F0FF] sm:pl-6 min-w-[140px]">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2 text-4xl"
                style={{ background: "linear-gradient(135deg,#EDE9FE,#F3F0FF)" }} aria-hidden="true">
                🛡️
              </div>
              <p className="text-base font-bold text-[#1A1340]">Level {level}</p>
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
          <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6 min-w-[340px]" aria-labelledby="impact-heading">
            <h2 id="impact-heading" className="text-sm font-bold text-[#1A1340] mb-4">Your Impact</h2>
            <div className="grid grid-cols-4 gap-4">
              {[
                { icon: CheckCircle2, iconBg: "#D1FAE5", iconColor: "#10B981", value: resolvedComplaints.toString(), label: "Complaints Resolved" },
                { icon: FileText, iconBg: "#FEF3C7", iconColor: "#F59E0B", value: (profile.servicesUsed ?? 0).toString() || "12", label: "Services Used" },
                { icon: Gift, iconBg: "#FCE7F3", iconColor: "#EC4899", value: (profile.schemesApplied ?? 0).toString() || "8", label: "Schemes Applied" },
                { icon: Download, iconBg: "#DBEAFE", iconColor: "#3B82F6", value: stats.totalComplaints.toString(), label: "Complaints Filed" },
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
                You&apos;re in the <span className="font-bold">top 15%</span> of active citizens in your area!
              </p>
            </div>
          </section>
        </div>

        {/* ── 3 columns: Quick Actions | Recent Activity | Preferences ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="quick-actions-heading">
            <h2 id="quick-actions-heading" className="text-sm font-bold text-[#1A1340] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-4 gap-4">
              {QUICK_ACTIONS.map(action => {
                const Icon = action.icon;
                const isLogout = action.id === "logout";
                return (
                  <a key={action.id} href={action.href}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                    aria-label={action.label}>
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:-translate-y-0.5 group-hover:shadow-md",
                    )} style={{ backgroundColor: action.iconBg }}>
                      <Icon size={20} style={{ color: action.iconColor }} aria-hidden="true" />
                    </div>
                    <span className={cn("text-[10px] text-center leading-tight font-medium", isLogout ? "text-[#EF4444]" : "text-[#374151]")}>
                      {action.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="recent-act-heading">
            <div className="flex items-center justify-between mb-4">
              <h2 id="recent-act-heading" className="text-sm font-bold text-[#1A1340]">Recent Activity</h2>
              <button className="text-xs text-[#6B3FFF] hover:underline">View All</button>
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
                      <p className="text-[11px] text-[#9CA3AF] truncate">{act.type}</p>
                    </div>
                    <span className="text-[10px] text-[#9CA3AF] flex-shrink-0 mt-2">
                      {new Date(act.timestamp).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                ))
              ) : (
                RECENT_ACTIVITIES.map((act) => (
                  <div key={act.id} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-2" style={{ backgroundColor: act.iconBg }} aria-hidden="true">
                      <act.icon size={14} style={{ color: act.iconColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#1A1340] truncate">{act.text}</p>
                      <p className="text-[11px] text-[#9CA3AF] truncate">{act.sub}</p>
                    </div>
                    <span className="text-[10px] text-[#9CA3AF] flex-shrink-0 mt-2">{act.time}</span>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Preferences */}
          <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="prefs-heading">
            <div className="flex items-center justify-between mb-4">
              <h2 id="prefs-heading" className="text-sm font-bold text-[#1A1340]">Preferences</h2>
              <button className="text-xs text-[#6B3FFF] hover:underline font-semibold">Edit</button>
            </div>
            <div className="space-y-2">
              {PREFERENCES.map(pref => (
                <button key={pref.id}
                  className="w-full flex items-center gap-4 px-2 py-4 rounded-xl hover:bg-[#F9F8FF] transition-colors group text-left"
                  aria-label={`${pref.label}: ${pref.value}`}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: pref.iconBg }} aria-hidden="true">
                    <pref.icon size={13} style={{ color: pref.iconColor }} />
                  </div>
                  <span className="flex-1 text-xs text-[#374151] font-medium">{pref.label}</span>
                  <span className="text-xs text-[#9CA3AF] mr-2">{pref.value}</span>
                  <ChevronRight size={13} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors flex-shrink-0" aria-hidden="true" />
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* ── Badges + Account Overview ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* Badges */}
          <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6 overflow-hidden" aria-labelledby="badges-heading">
            <div className="flex items-center justify-between mb-6">
              <h2 id="badges-heading" className="text-sm font-bold text-[#1A1340]">Achievements &amp; Badges</h2>
              <button className="text-xs text-[#6B3FFF] hover:underline">View All</button>
            </div>
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {BADGES.map(badge => (
                <div key={badge.id}
                  className={cn("flex flex-col items-center gap-2 flex-shrink-0 text-center group cursor-pointer", !badge.earned && "opacity-50")}
                  aria-label={`${badge.name}: ${badge.desc}${!badge.earned ? " (not yet earned)" : ""}`}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all group-hover:-translate-y-1 group-hover:shadow-md"
                    style={{ backgroundColor: badge.bg }}>
                    {badge.emoji}
                  </div>
                  <p className="text-[11px] font-semibold text-[#1A1340] w-16 leading-tight">{badge.name}</p>
                  <p className="text-[10px] text-[#9CA3AF] w-16 leading-tight">{badge.desc}</p>
                </div>
              ))}
              {/* Next arrow */}
              <button className="w-8 h-8 rounded-xl bg-[#F3F0FF] flex items-center justify-center flex-shrink-0 hover:bg-[#EDE9FE] transition-colors ml-2"
                aria-label="See more badges">
                <ChevronRight size={16} className="text-[#6B3FFF]" aria-hidden="true" />
              </button>
            </div>
          </section>

          {/* Account Overview */}
          <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="account-heading">
            <h2 id="account-heading" className="text-sm font-bold text-[#1A1340] mb-4">Account Overview</h2>
            <div className="space-y-4">
              {[
                { icon: Calendar, label: "Member Since", value: "15 February 2026", valueStyle: "text-[#374151] font-medium" },
                { icon: User, label: "Account Type", value: "Individual", badge: "bg-blue-50 text-blue-600 border border-blue-100", isBadge: true },
                { icon: Shield, label: "KYC Status", value: "Verified", badge: "bg-green-50 text-green-600 border border-green-100", isBadge: true },
                { icon: Key, label: "Profile Completion", value: "85%", isProgress: true },
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
              <p className="text-sm font-bold text-[#1A1340]">Thank you for being an active citizen!</p>
              <p className="text-xs text-[#6B7280]">Your participation helps build a better and stronger community.</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-4 rounded-xl border border-[#6B3FFF]/30 text-sm font-semibold text-[#6B3FFF] hover:bg-white transition-all flex-shrink-0"
            aria-label="Share your feedback">
            Share Your Feedback <ChevronRight size={15} aria-hidden="true" />
          </button>
        </div>

      </div>
    </div>
  );
}
