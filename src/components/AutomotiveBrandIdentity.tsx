import type { CSSProperties } from "react";

export type AutomotiveBrand = "Hyundai Global" | "Mitsubishi Motors Australia";

interface BrandDetails {
  name: string;
  region: string;
  mark: string;
  accent: string;
  surface: string;
}

const brandDetails: Record<AutomotiveBrand, BrandDetails> = {
  "Hyundai Global": {
    name: "Hyundai",
    region: "Global",
    mark: "/brands/hyundai-mark.svg",
    accent: "#002c5e",
    surface: "#e9f0f5",
  },
  "Mitsubishi Motors Australia": {
    name: "Mitsubishi Motors",
    region: "Australia",
    mark: "/brands/mitsubishi-mark.svg",
    accent: "#e60012",
    surface: "#f4eeee",
  },
};

type AutomotiveBrandStyle = CSSProperties & {
  "--automotive-accent": string;
  "--automotive-surface": string;
};

export function isAutomotiveBrand(brand: string): brand is AutomotiveBrand {
  return brand in brandDetails;
}

interface AutomotiveBrandIdentityProps {
  brand: AutomotiveBrand;
  index?: string;
  variant?: "card" | "hero";
}

export default function AutomotiveBrandIdentity({
  brand,
  index,
  variant = "card",
}: AutomotiveBrandIdentityProps) {
  const details = brandDetails[brand];
  const style = {
    "--automotive-accent": details.accent,
    "--automotive-surface": details.surface,
  } as AutomotiveBrandStyle;

  if (variant === "hero") {
    return (
      <div
        className="relative isolate flex min-h-24 w-fit min-w-[min(100%,20rem)] items-center gap-4 overflow-hidden bg-[var(--automotive-surface)] px-5 py-4 text-black shadow-[0_18px_48px_rgba(0,0,0,0.24)] md:gap-5 md:px-6 md:py-5"
        style={style}
      >
        <img
          src={details.mark}
          alt=""
          className="absolute -right-5 top-1/2 -z-10 h-28 w-40 -translate-y-1/2 object-contain opacity-[0.07]"
          aria-hidden="true"
        />
        <div className="flex h-14 w-16 shrink-0 items-center justify-center bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <img src={details.mark} alt="" className="h-8 w-11 object-contain" aria-hidden="true" />
        </div>
        <div className="relative min-w-0">
          <div className="text-lg font-black leading-none tracking-[-0.02em] text-[var(--automotive-accent)] md:text-xl">
            {details.name}
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-black/50">
            {details.region}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative isolate flex min-h-[190px] flex-col justify-between overflow-hidden bg-[var(--automotive-surface)] p-6 text-black md:min-h-[220px] md:p-7"
      style={style}
    >
      <img
        src={details.mark}
        alt=""
        className="absolute -right-[4%] top-1/2 -z-10 h-[78%] w-[52%] -translate-y-1/2 object-contain opacity-[0.065] transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-2"
        aria-hidden="true"
      />

      <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-black/45">
        <span>Attributed team experience</span>
        {index && <span>{index}</span>}
      </div>

      <div className="relative flex items-center gap-5">
        <div className="flex h-16 w-20 shrink-0 items-center justify-center bg-white shadow-[0_14px_35px_rgba(0,0,0,0.1)] md:h-20 md:w-24">
          <img src={details.mark} alt={`${details.name} logo`} className="h-9 w-12 object-contain md:h-11 md:w-14" />
        </div>
        <div className="min-w-0">
          <div className="text-2xl font-black leading-[0.94] tracking-[-0.035em] text-[var(--automotive-accent)] md:text-3xl">
            {details.name}
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-black/50 md:text-xs">
            {details.region}
          </div>
        </div>
      </div>
    </div>
  );
}
