"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Globe, ChevronRight, Type, Contrast, Mic, Bell, KeyRound, Link2, LogOut, Sparkles,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { useLanguage } from "@/hooks/useLanguage";
import { useAccessibility } from "@/hooks/useAccessibility";
import { useProfile } from "@/hooks/useProfile";
import { getSettingsContent } from "@/lib/i18n/content/settings";
import { cn } from "@/utils/cn";

export default function SettingsPage() {
  const router = useRouter();
  const { currentLanguage, t } = useLanguage();
  const content = getSettingsContent(currentLanguage.code);
  const { settings, setTextSize, toggleHighContrast, toggleVoiceAssistance } = useAccessibility();
  const { profile, updateProfile } = useProfile();

  const TEXT_SIZES: { id: "sm" | "md" | "lg"; label: string }[] = [
    { id: "sm", label: content.textSizeSmall },
    { id: "md", label: content.textSizeMedium },
    { id: "lg", label: content.textSizeLarge },
  ];

  function handleLogout() {
    const confirmed = window.confirm(content.logoutConfirm);
    if (confirmed) router.push("/");
  }

  return (
    <div className="overflow-y-auto h-full" id="main-content">
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 lg:py-8 max-w-[800px] mx-auto space-y-6">
        <PageHero title={t("topbar.settings")} subtitle={content.subtitle} />

        {/* Language */}
        <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="settings-language-heading">
          <h2 id="settings-language-heading" className="text-sm font-bold text-[#1A1340] mb-4">{content.languageHeading}</h2>
          <Link href="/settings/language" className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#F9F8FF] border border-transparent hover:border-[#E8E4F8] transition-all group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#EDE9FE]" aria-hidden="true">
              <Globe size={16} className="text-[#6B3FFF]" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-semibold text-[#1A1340]">{content.displayLanguage}</p>
              <p className="text-xs text-[#9CA3AF]">{currentLanguage.label} ({currentLanguage.nativeLabel})</p>
            </div>
            <ChevronRight size={15} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors flex-shrink-0" aria-hidden="true" />
          </Link>
        </section>

        {/* Accessibility */}
        <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="settings-a11y-heading">
          <h2 id="settings-a11y-heading" className="text-sm font-bold text-[#1A1340] mb-4">{content.accessibilityHeading}</h2>

          <div className="flex items-center gap-4 p-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#DBEAFE]" aria-hidden="true">
              <Type size={16} className="text-[#3B82F6]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1A1340]">{t("accessibility.textSize")}</p>
            </div>
            <div className="flex items-center gap-1 bg-[#F3F0FF] rounded-lg p-1">
              {TEXT_SIZES.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setTextSize(size.id)}
                  aria-pressed={settings.textSize === size.id}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                    settings.textSize === size.id ? "bg-white text-[#6B3FFF] shadow-sm" : "text-[#6B7280]"
                  )}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={toggleHighContrast} aria-pressed={settings.highContrast}
            className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#F9F8FF] transition-all text-left">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#FEF3C7]" aria-hidden="true">
              <Contrast size={16} className="text-[#F59E0B]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1A1340]">{t("accessibility.highContrast")}</p>
            </div>
            <div className={cn("w-10 h-6 rounded-full flex items-center px-1 transition-colors flex-shrink-0", settings.highContrast ? "bg-[#6B3FFF] justify-end" : "bg-[#E5E7EB] justify-start")}>
              <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </div>
          </button>

          <button onClick={toggleVoiceAssistance} aria-pressed={settings.voiceAssistance}
            className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#F9F8FF] transition-all text-left">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#FCE7F3]" aria-hidden="true">
              <Mic size={16} className="text-[#EC4899]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1A1340]">{t("accessibility.voiceAssistance")}</p>
            </div>
            <div className={cn("w-10 h-6 rounded-full flex items-center px-1 transition-colors flex-shrink-0", settings.voiceAssistance ? "bg-[#6B3FFF] justify-end" : "bg-[#E5E7EB] justify-start")}>
              <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </div>
          </button>
        </section>

        {/* Notifications */}
        <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="settings-notif-heading">
          <h2 id="settings-notif-heading" className="text-sm font-bold text-[#1A1340] mb-4">{content.notificationsHeading}</h2>
          <button
            onClick={() => updateProfile({ notificationsEnabled: !profile.notificationsEnabled })}
            aria-pressed={profile.notificationsEnabled}
            className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#F9F8FF] transition-all text-left"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#D1FAE5]" aria-hidden="true">
              <Bell size={16} className="text-[#10B981]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1A1340]">{content.notificationsLabel}</p>
              <p className="text-xs text-[#9CA3AF]">{content.notificationsSub}</p>
            </div>
            <div className={cn("w-10 h-6 rounded-full flex items-center px-1 transition-colors flex-shrink-0", profile.notificationsEnabled ? "bg-[#6B3FFF] justify-end" : "bg-[#E5E7EB] justify-start")}>
              <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </div>
          </button>
        </section>

        {/* Account & Security */}
        <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="settings-account-heading">
          <h2 id="settings-account-heading" className="text-sm font-bold text-[#1A1340] mb-2">{content.accountSecurityHeading}</h2>
          <p className="text-xs text-[#9CA3AF] mb-4">
            {content.accountSecurityDesc}
          </p>
          <Link href={`/ai-assistant?q=${encodeURIComponent("What security and privacy protections does JanMitra AI offer for my account and data?")}`}
            className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#F9F8FF] border border-transparent hover:border-[#E8E4F8] transition-all group mb-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#EDE9FE]" aria-hidden="true">
              <KeyRound size={16} className="text-[#6B3FFF]" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-semibold text-[#1A1340]">{content.askAboutSecurity}</p>
            </div>
            <ChevronRight size={15} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors flex-shrink-0" aria-hidden="true" />
          </Link>
          <Link href={`/ai-assistant?q=${encodeURIComponent("How do I link another account or service to JanMitra AI?")}`}
            className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#F9F8FF] border border-transparent hover:border-[#E8E4F8] transition-all group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#DBEAFE]" aria-hidden="true">
              <Link2 size={16} className="text-[#3B82F6]" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-semibold text-[#1A1340]">{content.linkedAccounts}</p>
            </div>
            <ChevronRight size={15} className="text-[#D1D5DB] group-hover:text-[#6B3FFF] transition-colors flex-shrink-0" aria-hidden="true" />
          </Link>
        </section>

        {/* Help + Log out */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/help" className="flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-xl border border-[#6B3FFF]/30 text-sm font-semibold text-[#6B3FFF] hover:bg-[#F3F0FF] transition-all">
            <Sparkles size={15} aria-hidden="true" /> {t("common.needHelp")}
          </Link>
          <button onClick={handleLogout} className="flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-xl border border-red-200 text-sm font-semibold text-[#EF4444] hover:bg-red-50 transition-all">
            <LogOut size={15} aria-hidden="true" /> {t("topbar.signOut")}
          </button>
        </div>
      </div>
    </div>
  );
}
