import type { CSSProperties } from "react";

export interface ProjectMediaSpec {
  label: string;
  description: string;
  src?: string;
  alt?: string;
}

interface ProjectMediaProps {
  project: string;
  media: ProjectMediaSpec;
  accent?: string;
  compact?: boolean;
  className?: string;
}

export default function ProjectMedia({
  project,
  media,
  accent = "#00f5ff",
  compact = false,
  className = "",
}: ProjectMediaProps) {
  const style = {
    "--project-accent": accent,
    background: `radial-gradient(circle at 82% 18%, ${accent}26 0, transparent 34%), linear-gradient(145deg, #12151a 0%, #090a0d 72%)`,
  } as CSSProperties;

  return (
    <figure
      className={`relative isolate overflow-hidden border border-white/10 bg-[#0b0c0f] ${compact ? "min-h-[240px]" : "min-h-[320px] md:min-h-[520px]"} ${className}`}
      style={style}
    >
      {media.src ? (
        <img
          src={media.src}
          alt={media.alt ?? `${project} product interface`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`Reserved product image for ${project}: ${media.description}`}
          className="absolute inset-0"
        >
          <div className="tech-grid absolute inset-0 opacity-50" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
          <div className="absolute bottom-0 top-0 left-1/2 w-px bg-white/10" />
          <div className="absolute left-5 top-5 h-8 w-8 border-l border-t border-[var(--project-accent)] md:left-7 md:top-7" />
          <div className="absolute bottom-5 right-5 h-8 w-8 border-b border-r border-[var(--project-accent)] md:bottom-7 md:right-7" />

          <div className="absolute inset-0 flex items-center justify-center p-7 text-center md:p-12">
            <div className="max-w-2xl">
              <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--project-accent)]">
                Visual proof slot
              </div>
              <div className={`${compact ? "mt-3 text-3xl" : "mt-5 text-5xl md:text-7xl"} font-black tracking-tighter text-white/10`}>
                {project}
              </div>
              <p className={`${compact ? "mt-3 text-sm" : "mt-5 text-base md:text-lg"} mx-auto max-w-xl leading-relaxed text-slate-300`}>
                {media.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <figcaption className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-4 border-t border-white/10 bg-[#090a0d]/90 px-4 py-3 backdrop-blur-sm md:px-6">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/75">
          {media.label}
        </span>
        {!media.src && (
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--project-accent)]">
            Image pending
          </span>
        )}
      </figcaption>
    </figure>
  );
}
