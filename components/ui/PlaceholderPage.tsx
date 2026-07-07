import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <main className="flex-1 overflow-y-auto" id="main-content" aria-label={title}>
      <div className="px-6 py-5 max-w-[800px]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#6B3FFF] transition-colors duration-200 mb-6"
          aria-label="Go back to home"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl border border-[#E8E4F8] p-10 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#EDE9FE] flex items-center justify-center mb-4" aria-hidden="true">
            <Construction size={28} className="text-[#6B3FFF]" />
          </div>
          <h1 className="text-xl font-bold text-[#1A1340] mb-2">{title}</h1>
          <p className="text-sm text-[#6B7280] max-w-sm leading-relaxed">{description}</p>
          <div className="mt-6 px-4 py-2 bg-[#F3F0FF] rounded-full text-xs font-medium text-[#6B3FFF]">
            Coming Soon
          </div>
        </div>
      </div>
    </main>
  );
}
