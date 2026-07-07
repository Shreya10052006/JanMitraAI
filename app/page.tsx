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
      <div className="px-10 py-8 space-y-12 max-w-[1600px] mx-auto">
        <HeroSection />
        <QuickActions />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          <AISuggestions />
        </div>
        <StatisticsSection />
        {/* Bottom spacing */}
        <div className="h-4" aria-hidden="true" />
      </div>
    </main>
  );
}
