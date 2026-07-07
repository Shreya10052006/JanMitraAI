import { Zap, Users, Smile, Globe } from "lucide-react";
import { STATISTICS } from "@/lib/mock-data";

const ICON_MAP = {
  Zap,
  Users,
  Sun: Smile,
  Globe,
} as const;

type IconName = keyof typeof ICON_MAP;

export function StatisticsSection() {
  return (
    <section
      className="relative rounded-[20px] overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #1A1340 0%, #2A1B6E 35%, #3D2498 65%, #1E1B4B 100%)",
      }}
      aria-labelledby="statistics-heading"
    >
      {/* Decorative gradient orbs */}
      <div
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 right-40 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(107,63,255,0.2) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* India map watermark */}
      <div
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-[0.07] pointer-events-none select-none"
        aria-hidden="true"
      >
        <svg
          width="130"
          height="170"
          viewBox="0 0 130 170"
          fill="white"
        >
          <path d="M65 8 L82 22 L92 17 L97 32 L108 37 L103 52 L114 63 L103 73 L112 88 L98 93 L101 108 L87 113 L82 128 L72 133 L67 148 L65 158 L63 148 L58 133 L48 128 L43 113 L29 108 L32 93 L18 88 L27 73 L16 63 L27 52 L22 37 L33 32 L38 17 L48 22 Z" />
        </svg>
      </div>

      <div className="relative z-10 px-10 py-10 flex flex-col sm:flex-row items-start sm:items-center gap-8">
        {/* Heading */}
        <div className="sm:w-44 flex-shrink-0">
          <h2
            id="statistics-heading"
            className="text-white font-bold text-[15px] leading-snug"
          >
            Making a difference together
          </h2>
          <p className="text-purple-300/80 text-xs mt-2">
            Real impact, real change
          </p>
        </div>

        {/* Divider */}
        <div
          className="hidden sm:block w-px self-stretch opacity-20 bg-purple-300"
          aria-hidden="true"
        />

        {/* Stats */}
        <div className="flex flex-wrap gap-6 sm:gap-10 flex-1">
          {STATISTICS.map((stat) => {
            const IconComponent = ICON_MAP[stat.icon as IconName];
            return (
              <div
                key={stat.id}
                className="flex items-center gap-4"
                role="figure"
                aria-label={`${stat.value} ${stat.label}`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: stat.iconBg }}
                  aria-hidden="true"
                >
                  {IconComponent && (
                    <IconComponent size={18} className="text-white" />
                  )}
                </div>
                <div>
                  <p className="text-white font-bold text-lg leading-tight">
                    {stat.value}
                  </p>
                  <p className="text-purple-300/80 text-[11px] mt-2">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
