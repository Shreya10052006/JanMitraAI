import { HeroSection } from "@/components/dashboard/HeroSection";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { AISuggestions } from "@/components/dashboard/AISuggestions";
import { StatisticsSection } from "@/components/dashboard/StatisticsSection";

export default function HomePage() {
  return (
    <main
      className="flex-1"
      id="main-content"
      aria-label="Home Dashboard"
    >
      <div className="px-6 py-5 space-y-5 max-w-[1280px]">
        <HeroSection />
        <QuickActions />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RecentActivity />
          <AISuggestions />
        </div>
        <StatisticsSection />
        {/* Bottom spacing */}
        <div className="h-2" aria-hidden="true" />
      </div>
    </main>
  );
}
