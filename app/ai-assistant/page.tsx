import { Suspense } from "react";
import AIAssistantPage from "@/components/ai-assistant/AIAssistantPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center"><div className="w-6 h-6 rounded-full border-2 border-[#6B3FFF]/30 border-t-[#6B3FFF] animate-spin" /></div>}>
      <AIAssistantPage />
    </Suspense>
  );
}
