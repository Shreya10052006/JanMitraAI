"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Phone, Mail, Sparkles, BookOpen } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { useLanguage } from "@/hooks/useLanguage";
import { getHelpContent } from "@/lib/i18n/content/resources";
import { cn } from "@/utils/cn";

export default function HelpPage() {
  const { t, currentLanguage } = useLanguage();
  const content = getHelpContent(currentLanguage.code);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="overflow-y-auto h-full" id="main-content">
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 lg:py-8 max-w-[800px] mx-auto space-y-6">
        <PageHero title={content.title} subtitle={content.subtitle} />

        {/* FAQs */}
        <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-2 sm:p-4" aria-labelledby="help-faq-heading">
          <h2 id="help-faq-heading" className="text-sm font-bold text-[#1A1340] px-4 pt-3 pb-1">{content.faqHeading}</h2>
          <div className="divide-y divide-[#F3F0FF]">
            {content.faqs.map((faq, i) => {
              const open = openIdx === i;
              return (
                <div key={faq.q}>
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between gap-4 px-4 py-4 text-left hover:bg-[#F9F8FF] rounded-xl transition-colors"
                  >
                    <span className="text-sm font-semibold text-[#1A1340]">{faq.q}</span>
                    <ChevronDown size={16} className={cn("text-[#9CA3AF] flex-shrink-0 transition-transform", open && "rotate-180")} aria-hidden="true" />
                  </button>
                  {open && (
                    <p className="px-4 pb-4 text-xs text-[#6B7280] leading-relaxed">{faq.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-[20px] border border-[#E8E4F8] p-6" aria-labelledby="help-contact-heading">
          <h2 id="help-contact-heading" className="text-sm font-bold text-[#1A1340] mb-4">{content.stillNeedHelp}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a href="tel:1800115656" className="flex flex-col items-center text-center gap-2 p-4 rounded-xl border border-[#E8E4F8] hover:bg-[#F9F8FF] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] flex items-center justify-center" aria-hidden="true"><Phone size={17} className="text-[#6B3FFF]" /></div>
              <p className="text-xs font-semibold text-[#1A1340]">{content.callUs}</p>
              <p className="text-[10px] text-[#9CA3AF]">1800-11-5656</p>
            </a>
            <a href="mailto:support@janmitra.gov.in" className="flex flex-col items-center text-center gap-2 p-4 rounded-xl border border-[#E8E4F8] hover:bg-[#F9F8FF] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#DBEAFE] flex items-center justify-center" aria-hidden="true"><Mail size={17} className="text-[#3B82F6]" /></div>
              <p className="text-xs font-semibold text-[#1A1340]">{content.emailUs}</p>
              <p className="text-[10px] text-[#9CA3AF]">support@janmitra.gov.in</p>
            </a>
            <Link href="/ai-assistant" className="flex flex-col items-center text-center gap-2 p-4 rounded-xl border border-[#E8E4F8] hover:bg-[#F9F8FF] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#D1FAE5] flex items-center justify-center" aria-hidden="true"><Sparkles size={17} className="text-[#10B981]" /></div>
              <p className="text-xs font-semibold text-[#1A1340]">{t("common.chatNow")}</p>
              <p className="text-[10px] text-[#9CA3AF]">{content.instantAiHelp}</p>
            </Link>
          </div>
        </section>

        <Link href="/resources" className="flex items-center gap-4 p-6 bg-white rounded-[20px] border border-[#E8E4F8] hover:bg-[#F9F8FF] transition-colors">
          <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] flex items-center justify-center flex-shrink-0" aria-hidden="true"><BookOpen size={17} className="text-[#F59E0B]" /></div>
          <div>
            <p className="text-sm font-semibold text-[#1A1340]">{content.browseGuides}</p>
            <p className="text-xs text-[#9CA3AF]">{content.browseGuidesSub}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
