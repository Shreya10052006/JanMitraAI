"use client";

import dynamic from "next/dynamic";

/**
 * Leaflet touches `window` at module load time, so it can never run during
 * SSR. Every call site should import the map through this wrapper instead
 * of components/ui/LocationMap directly.
 */
export const DynamicLocationMap = dynamic(
  () => import("./LocationMap").then((m) => m.LocationMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 rounded-xl border border-[#E8E4F8] bg-[#F9F8FF] flex items-center justify-center text-xs text-[#9CA3AF]">
        Loading map…
      </div>
    ),
  }
);

export type { MapMarker } from "./LocationMap";
