"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, Bell, Globe, Check, User, LogOut, Settings, FileText } from "lucide-react";
import { cn } from "@/utils/cn";
import { useLanguage } from "@/hooks/useLanguage";
import { NOTIFICATIONS, USER_PROFILE } from "@/lib/mock-data";
import type { Notification } from "@/types";

interface MobileTopBarProps {
  onMenuClick: () => void;
}

export function MobileTopBar({ onMenuClick }: MobileTopBarProps) {
  const { currentLanguage, setLanguage, languages } = useLanguage();
  const [languageOpen, setLanguageOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const languageRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setLanguageOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function closeMenus() {
    setLanguageOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
  }

  return (
    <header
      className="flex lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-xl border-b border-[#EAE8F5] z-40 items-center justify-between px-4 gap-2"
      role="banner"
    >
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={onMenuClick}
          className="w-10 h-10 -ml-2 rounded-xl flex items-center justify-center text-[#374151] hover:bg-[#F3F0FF] active:bg-[#F3F0FF] transition-colors flex-shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu size={22} aria-hidden="true" />
        </button>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #6B3FFF, #8B5CF6)",
          }}
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3.5" fill="white" />
            <path d="M12 2.5 L13.5 7.5 L12 6 L10.5 7.5 Z" fill="white" opacity="0.75" />
            <path d="M12 21.5 L13.5 16.5 L12 18 L10.5 16.5 Z" fill="white" opacity="0.75" />
            <path d="M2.5 12 L7.5 10.5 L6 12 L7.5 13.5 Z" fill="white" opacity="0.75" />
            <path d="M21.5 12 L16.5 10.5 L18 12 L16.5 13.5 Z" fill="white" opacity="0.75" />
          </svg>
        </div>
        <span className="font-bold text-sm text-[#1A1340] truncate hidden xs:inline">
          JanMitra AI
        </span>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        {/* Language selector */}
        <div className="relative" ref={languageRef}>
          <button
            onClick={() => {
              setLanguageOpen((v) => !v);
              setNotificationsOpen(false);
              setProfileOpen(false);
            }}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#374151] hover:bg-[#F3F0FF] active:bg-[#F3F0FF] transition-colors"
            aria-haspopup="listbox"
            aria-expanded={languageOpen}
            aria-label={`Language: ${currentLanguage.label}. Tap to change.`}
          >
            <Globe size={18} className="text-[#6B3FFF]" aria-hidden="true" />
          </button>

          {languageOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-64 max-w-[85vw] bg-white rounded-2xl shadow-2xl border border-[#EAE8F5] overflow-hidden z-50"
              role="listbox"
              aria-label="Select language"
            >
              <div className="p-2 max-h-80 overflow-y-auto">
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
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-colors duration-150",
                      currentLanguage.code === lang.code
                        ? "bg-[#F3F0FF] text-[#6B3FFF] font-semibold"
                        : "text-[#374151] hover:bg-[#F9F8FF]"
                    )}
                  >
                    <span>{lang.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#9CA3AF] text-xs">{lang.nativeLabel}</span>
                      {currentLanguage.code === lang.code && (
                        <Check size={13} className="text-[#6B3FFF]" aria-hidden="true" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => {
              setNotificationsOpen((v) => !v);
              setLanguageOpen(false);
              setProfileOpen(false);
            }}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center text-[#374151] hover:bg-[#F3F0FF] active:bg-[#F3F0FF] transition-colors"
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
            <div className="absolute right-0 top-full mt-2 w-80 max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-[#EAE8F5] z-50 overflow-hidden">
              <div className="px-4 py-4 border-b border-[#F3F0FF] flex items-center justify-between">
                <h2 className="font-semibold text-sm text-[#1A1340]">Notifications</h2>
                <button
                  className="text-[10px] text-[#6B3FFF] font-medium hover:text-[#4C1D95] transition-colors"
                  onClick={closeMenus}
                  aria-label="Mark all as read"
                >
                  Mark all read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {NOTIFICATIONS.map((notification: Notification) => (
                  <button
                    key={notification.id}
                    className={cn(
                      "w-full text-left px-4 py-4 hover:bg-[#F9F8FF] active:bg-[#F9F8FF] transition-colors duration-150 border-b border-[#F9F8FF] last:border-0",
                      !notification.read && "bg-[#F8F6FF]"
                    )}
                    aria-label={`${notification.title}: ${notification.body}`}
                  >
                    <div className="flex items-start gap-4">
                      {!notification.read && (
                        <span
                          className="mt-2 w-1.5 h-1.5 rounded-full bg-[#6B3FFF] flex-shrink-0"
                          aria-hidden="true"
                        />
                      )}
                      <div className={notification.read ? "ml-4" : ""}>
                        <p className="text-xs font-semibold text-[#1A1340]">{notification.title}</p>
                        <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">{notification.body}</p>
                        <p className="text-[10px] text-[#9CA3AF] mt-2">{notification.time}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setProfileOpen((v) => !v);
              setLanguageOpen(false);
              setNotificationsOpen(false);
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #6B3FFF 0%, #EC4899 100%)" }}
            aria-haspopup="true"
            aria-expanded={profileOpen}
            aria-label={`Profile menu for ${USER_PROFILE.name}`}
          >
            <User size={17} className="text-white" aria-hidden="true" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 max-w-[85vw] bg-white rounded-2xl shadow-2xl border border-[#EAE8F5] z-50 overflow-hidden">
              <div className="px-4 py-4 border-b border-[#F3F0FF]">
                <p className="font-semibold text-sm text-[#1A1340]">{USER_PROFILE.fullName}</p>
                <p className="text-xs text-[#6B7280] mt-2">{USER_PROFILE.email}</p>
              </div>
              <div className="p-2">
                {[
                  { label: "My Profile", href: "/profile", icon: User },
                  { label: "My Documents", href: "/documents", icon: FileText },
                  { label: "Settings", href: "/settings", icon: Settings },
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
                <button className="flex items-center gap-4 w-full px-4 py-4 rounded-xl text-sm text-[#EF4444] hover:bg-red-50 transition-colors duration-150">
                  <LogOut size={15} aria-hidden="true" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
