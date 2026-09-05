import type { CSSProperties } from "react";

type ProductBrand = "Rentnama" | "Tirch";

interface BrandIdentityProps {
  brand: ProductBrand;
  size?: "compact" | "card" | "hero";
  className?: string;
}

const brandDetails: Record<
  ProductBrand,
  {
    mark: string;
    accent: string;
    surface: string;
  }
> = {
  Rentnama: {
    mark: "/brands/rentnama-mark.svg",
    accent: "#d7ff4f",
    surface: "#171a17",
  },
  Tirch: {
    mark: "/brands/tirch-mark.svg",
    accent: "#d2694a",
    surface: "#f1eee6",
  },
};

const sizeClasses = {
  compact: {
    root: "gap-3",
    mark: "h-9 w-9 p-1.5",
    wordmark: "text-lg",
  },
  card: {
    root: "gap-4",
    mark: "h-14 w-14 p-2.5 md:h-16 md:w-16 md:p-3",
    wordmark: "text-2xl md:text-3xl",
  },
  hero: {
    root: "gap-4 md:gap-5",
    mark: "h-16 w-16 p-3 md:h-20 md:w-20 md:p-4",
    wordmark: "text-3xl md:text-5xl",
  },
} as const;

export function isProductBrand(brand: string): brand is ProductBrand {
  return brand === "Rentnama" || brand === "Tirch";
}

export default function BrandIdentity({ brand, size = "card", className = "" }: BrandIdentityProps) {
  const details = brandDetails[brand];
  const sizing = sizeClasses[size];

  return (
    <div
      className={`brand-identity flex min-w-0 items-center ${sizing.root} ${className}`}
      style={
        {
          "--brand-accent": details.accent,
          "--brand-surface": details.surface,
        } as CSSProperties
      }
    >
      <span
        className={`brand-identity-mark flex shrink-0 items-center justify-center ${sizing.mark}`}
        aria-hidden="true"
      >
        <img src={details.mark} alt="" className="block h-full w-full object-contain" />
      </span>
      <span
        className={`min-w-0 font-black leading-none tracking-[-0.055em] text-white ${sizing.wordmark} ${brand === "Tirch" ? "uppercase" : ""}`}
        aria-label={brand}
      >
        {brand === "Tirch" ? (
          <span aria-hidden="true">
            T<span className="tirch-wordmark-lean">I</span>RCH
          </span>
        ) : (
          brand
        )}
      </span>
    </div>
  );
}
