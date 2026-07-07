import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <div className="relative rounded-[28px] overflow-hidden mb-8" style={{ minHeight: "140px" }}>
      {/* Gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 20%, #F3E8FF 50%, #FFF7ED 80%)",
        }}
        aria-hidden="true"
      />
      {/* India Gate image, right-masked */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 30%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 70%, black 85%)",
          maskImage:
            "linear-gradient(to right, transparent 30%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 70%, black 85%)",
        }}
      >
        <Image
          src="/images/india-gate.png"
          alt=""
          fill
          className="object-cover object-center"
          quality={80}
          sizes="1200px"
        />
      </div>
      {/* Left overlay for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(245,243,255,0.95) 0%, rgba(245,243,255,0.85) 35%, rgba(245,243,255,0.2) 60%, transparent 75%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 px-8 py-8">
        <h1 className="text-2xl font-bold text-[#1A1340]">{title}</h1>
        <p className="text-sm text-[#6B7280] mt-1.5">{subtitle}</p>
      </div>
    </div>
  );
}
