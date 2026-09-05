import type { CSSProperties } from "react";

export interface ProjectMediaSpec {
  label: string;
  description: string;
  src?: string;
  alt?: string;
  secondarySrc?: string;
  secondaryAlt?: string;
  objectPosition?: string;
  secondaryObjectPosition?: string;
  treatment?: "cover" | "inset" | "layered";
  priority?: boolean;
  placeholderLabel?: string;
  placeholderStatus?: string;
}

interface ProjectMediaProps {
  project: string;
  media: ProjectMediaSpec;
  accent?: string;
  compact?: boolean;
  size?: "default" | "compact" | "mini";
  className?: string;
}

export default function ProjectMedia({
  project,
  media,
  accent = "#00f5ff",
  compact = false,
  size,
  className = "",
}: ProjectMediaProps) {
  const resolvedSize = size ?? (compact ? "compact" : "default");
  const treatment = media.treatment ?? (media.secondarySrc ? "layered" : "cover");
  const style = {
    "--project-accent": accent,
    background: `radial-gradient(circle at 82% 18%, ${accent}26 0, transparent 34%), linear-gradient(145deg, #12151a 0%, #090a0d 72%)`,
  } as CSSProperties;

  return (
    <figure
      className={`project-media relative isolate w-full min-w-0 max-w-full overflow-hidden border border-white/10 bg-[#0b0c0f] ${
        resolvedSize === "mini"
          ? "aspect-video min-h-[205px]"
          : resolvedSize === "compact"
            ? "aspect-video min-h-[215px]"
            : "aspect-video min-h-[250px]"
      } ${className}`}
      style={style}
    >
      {media.src ? (
        treatment === "layered" && media.secondarySrc ? (
          <div className="absolute inset-x-3 bottom-14 top-3 md:inset-x-7 md:bottom-20 md:top-7">
            <div className="absolute left-0 top-0 h-[82%] w-[84%] overflow-hidden border border-white/15 bg-black shadow-[0_28px_80px_rgba(0,0,0,0.55)]">
              <img
                src={media.src}
                alt={media.alt ?? `${project} product interface`}
                loading={media.priority ? "eager" : "lazy"}
                fetchPriority={media.priority ? "high" : "auto"}
                className="h-full w-full object-cover"
                style={{ objectPosition: media.objectPosition ?? "center" }}
              />
            </div>
            <div className="absolute bottom-0 right-0 aspect-video w-[48%] overflow-hidden border border-[var(--project-accent)]/70 bg-black shadow-[0_24px_64px_rgba(0,0,0,0.75)]">
              <img
                src={media.secondarySrc}
                alt={media.secondaryAlt ?? `${project} product interface detail`}
                loading={media.priority ? "eager" : "lazy"}
                fetchPriority={media.priority ? "high" : "auto"}
                className="h-full w-full object-cover"
                style={{ objectPosition: media.secondaryObjectPosition ?? "center" }}
              />
            </div>
            <div className="absolute right-0 top-0 h-5 w-5 border-r border-t border-[var(--project-accent)] md:h-8 md:w-8" aria-hidden="true" />
          </div>
        ) : treatment === "inset" ? (
          <div className="absolute inset-x-3 bottom-14 top-3 overflow-hidden border border-white/15 bg-black shadow-[0_24px_70px_rgba(0,0,0,0.55)] md:inset-x-7 md:bottom-20 md:top-7">
            <img
              src={media.src}
              alt={media.alt ?? `${project} product interface`}
              loading={media.priority ? "eager" : "lazy"}
              fetchPriority={media.priority ? "high" : "auto"}
              className="h-full w-full object-cover"
              style={{ objectPosition: media.objectPosition ?? "center" }}
            />
          </div>
        ) : (
          <img
            src={media.src}
            alt={media.alt ?? `${project} product interface`}
            loading={media.priority ? "eager" : "lazy"}
            fetchPriority={media.priority ? "high" : "auto"}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: media.objectPosition ?? "center" }}
          />
        )
      ) : (
        <div
          role="img"
          aria-label={`${media.placeholderLabel ?? "Reserved product image"} for ${project}: ${media.description}`}
          className="absolute inset-0"
        >
          <div className="tech-grid absolute inset-0 opacity-50" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
          <div className="absolute bottom-0 top-0 left-1/2 w-px bg-white/10" />
          <div className="absolute left-5 top-5 h-8 w-8 border-l border-t border-[var(--project-accent)] md:left-7 md:top-7" />
          <div className="absolute bottom-5 right-5 h-8 w-8 border-b border-r border-[var(--project-accent)] md:bottom-7 md:right-7" />

          <div className={`absolute inset-0 flex items-center justify-center text-center ${resolvedSize === "mini" ? "px-6 pb-14 pt-6" : "p-7 md:p-12"}`}>
            <div className="max-w-2xl">
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--project-accent)]">
                {media.placeholderLabel ?? "Visual proof slot"}
              </div>
              <div className={`${resolvedSize === "default" ? "mt-5 text-5xl md:text-7xl" : resolvedSize === "mini" ? "mt-2 text-2xl" : "mt-3 text-3xl"} font-black tracking-tighter text-white/10`}>
                {project}
              </div>
              <p className={`${resolvedSize === "default" ? "mt-5 text-base md:text-lg" : resolvedSize === "mini" ? "mt-2 text-xs" : "mt-3 text-sm"} mx-auto max-w-xl leading-relaxed text-slate-300`}>
                {media.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <figcaption className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-4 border-t border-white/10 bg-[#090a0d]/92 px-4 py-3 backdrop-blur-sm md:px-6">
        <span className="font-mono text-xs uppercase tracking-[0.11em] text-white/80">
          {media.label}
        </span>
        {!media.src && (
          <span className="shrink-0 font-mono text-xs uppercase tracking-[0.1em] text-[var(--project-accent)]">
            {media.placeholderStatus ?? "Image pending"}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
