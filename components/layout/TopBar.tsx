"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, Globe, ChevronDown, Check, User, LogOut, Settings, FileText } from "lucide-react";
import { cn } from "@/utils/cn";
import { useLanguage } from "@/hooks/useLanguage";
import { getDashboardContent } from "@/lib/i18n/content/dashboard";
import { NOTIFICATIONS, USER_PROFILE } from "@/lib/mock-data";
import type { Notification } from "@/types";

export function TopBar() {
  const router = useRouter();
  const { currentLanguage, setLanguage, languages, t } = useLanguage();
  const dashboardContent = getDashboardContent(currentLanguage.code);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [readIds, setReadIds] = useState<string[]>(() => NOTIFICATIONS.filter((n) => n.read).map((n) => n.id));

  const languageRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = NOTIFICATIONS.filter((n) => !readIds.includes(n.id)).length;

  function markAllRead() {
    setReadIds(NOTIFICATIONS.map((n) => n.id));
  }

  function markRead(id: string) {
    setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  function handleSignOut() {
    const confirmed = window.confirm("Are you sure you want to log out? Your saved data will remain on this device.");
    if (confirmed) {
      closeAll();
      router.push("/");
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setLanguageOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function closeAll() {
    setLanguageOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
  }

  return (
    <header
      className="hidden lg:flex fixed top-0 right-0 h-[80px] bg-white/85 backdrop-blur-xl border-b border-[#EAE8F5] z-30 items-center justify-end px-8 gap-4"
      style={{ left: "256px" }}
      role="banner"
    >
      {/* Language selector */}
      <div className="relative" ref={languageRef}>
        <button
          onClick={() => {
            setLanguageOpen((v) => !v);
            setNotificationsOpen(false);
            setProfileOpen(false);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-[#374151] hover:bg-[#F3F0FF] transition-colors duration-200"
          aria-haspopup="listbox"
          aria-expanded={languageOpen}
          aria-label={`Language: ${currentLanguage.label}. Click to change.`}
        >
          <Globe size={16} className="text-[#6B3FFF]" aria-hidden="true" />
          <span className="font-medium">{currentLanguage.label}</span>
          <ChevronDown
            size={13}
            className={cn(
              "text-[#9CA3AF] transition-transform duration-200",
              languageOpen && "rotate-180"
            )}
            aria-hidden="true"
          />
        </button>

        {languageOpen && (
          <div
            className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-[#EAE8F5] overflow-hidden z-50"
            role="listbox"
            aria-label="Select language"
          >
            <div className="p-2 max-h-72 overflow-y-auto">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={currentLanguage.code === lang.code}
                  onClick={() => {
                    setLanguage(lang);
                    setLanguageOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-4 rounded-xl text-sm transition-colors duration-150",
                    currentLanguage.code === lang.code
                      ? "bg-[#F3F0FF] text-[#6B3FFF] font-semibold"
                      : "text-[#374151] hover:bg-[#F9F8FF]"
                  )}
                >
                  <span>{lang.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#9CA3AF] text-xs">
                      {lang.nativeLabel}
                    </span>
                    {currentLanguage.code === lang.code && (
                      <Check
                        size={13}
                        className="text-[#6B3FFF]"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-[#E8E4F8]" aria-hidden="true" />

      {/* Notifications */}
      <div className="relative" ref={notificationRef}>
        <button
          onClick={() => {
            setNotificationsOpen((v) => !v);
            setLanguageOpen(false);
            setProfileOpen(false);
          }}
          className="relative w-10 h-10 rounded-xl flex items-center justify-center text-[#374151] hover:bg-[#F3F0FF] transition-colors duration-200"
          aria-label={`Notifications. ${unreadCount} unread.`}
          aria-haspopup="true"
          aria-expanded={notificationsOpen}
        >
          <Bell size={18} aria-hidden="true" />
          {unreadCount > 0 && (
            <span
              className="absolute top-1.5 right-1.5 w-[17px] h-[17px] bg-[#EF4444] text-white text-[9px] font-bold rounded-full flex items-center justify-center"
              aria-hidden="true"
            >
              {unreadCount}
            </span>
          )}
        </button>

        {notificationsOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-[#EAE8F5] z-50 overflow-hidden">
            <div className="px-4 py-4 border-b border-[#F3F0FF] flex items-center justify-between">
              <h2 className="font-semibold text-sm text-[#1A1340]">
                {t("topbar.notifications")}
              </h2>
              <button
                className="text-[10px] text-[#6B3FFF] font-medium hover:text-[#4C1D95] transition-colors"
                onClick={markAllRead}
                aria-label="Mark all as read"
              >
                Mark all read
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {NOTIFICATIONS.map((notification: Notification) => {
                const isRead = readIds.includes(notification.id);
                const text = dashboardContent.notifications[notification.id] ?? notification;
                return (
                <button
                  key={notification.id}
                  onClick={() => markRead(notification.id)}
                  className={cn(
                    "w-full text-left px-4 py-4 hover:bg-[#F9F8FF] transition-colors duration-150 border-b border-[#F9F8FF] last:border-0",
                    !isRead && "bg-[#F8F6FF]"
                  )}
                  aria-label={`${text.title}: ${text.body}`}
                >
                  <div className="flex items-start gap-4">
                    {!isRead && (
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full bg-[#6B3FFF] flex-shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <div className={isRead ? "ml-4" : ""}>
                      <p className="text-xs font-semibold text-[#1A1340]">
                        {text.title}
                      </p>
                      <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
                        {text.body}
                      </p>
                      <p className="text-[10px] text-[#9CA3AF] mt-2">
                        {text.time}
                      </p>
                    </div>
                  </div>
                </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-[#E8E4F8]" aria-hidden="true" />

      {/* Profile dropdown */}
      <div className="relative" ref={profileRef}>
        <button
          onClick={() => {
            setProfileOpen((v) => !v);
            setLanguageOpen(false);
            setNotificationsOpen(false);
          }}
          className="flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-[#F3F0FF] transition-colors duration-200"
          aria-haspopup="true"
          aria-expanded={profileOpen}
          aria-label={`Profile menu for ${USER_PROFILE.name}`}
        >
          <div
            className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, #6B3FFF 0%, #EC4899 100%)",
            }}
            aria-hidden="true"
          >
            <User size={15} className="text-white" />
          </div>
          <span className="text-sm font-medium text-[#374151]">
            {t("topbar.greeting")}, {USER_PROFILE.name}
          </span>
          <ChevronDown
            size={13}
            className={cn(
              "text-[#9CA3AF] transition-transform duration-200",
              profileOpen && "rotate-180"
            )}
            aria-hidden="true"
          />
        </button>

        {profileOpen && (
          <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-[#EAE8F5] z-50 overflow-hidden">
            <div className="px-4 py-4 border-b border-[#F3F0FF]">
              <p className="font-semibold text-sm text-[#1A1340]">
                {USER_PROFILE.fullName}
              </p>
              <p className="text-xs text-[#6B7280] mt-2">
                {USER_PROFILE.email}
              </p>
            </div>
            <div className="p-2">
              {[
                { label: t("topbar.myProfile"), href: "/profile", icon: User },
                { label: t("topbar.myDocuments"), href: "/documents", icon: FileText },
                { label: t("topbar.settings"), href: "/settings", icon: Settings },
              ].map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 px-4 py-4 rounded-xl text-sm text-[#374151] hover:bg-[#F9F8FF] transition-colors duration-150"
                >
                  <Icon size={15} className="text-[#9CA3AF]" aria-hidden="true" />
                  {label}
                </a>
              ))}
              <div className="my-2 border-t border-[#F3F0FF]" />
              <button onClick={handleSignOut} className="flex items-center gap-4 w-full px-4 py-4 rounded-xl text-sm text-[#EF4444] hover:bg-red-50 transition-colors duration-150">
                <LogOut size={15} aria-hidden="true" />
                {t("topbar.signOut")}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
