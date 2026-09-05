import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { trackAnalyticsEvent } from "../utils/analytics";
import ProjectMedia, { type ProjectMediaSpec } from "./ProjectMedia";

interface HeroProps {
  onContactClick: () => void;
}

const proofProjects: Array<{
  name: string;
  category: string;
  proof: string;
  link: string;
  accent: string;
  media: ProjectMediaSpec;
}> = [
  {
    name: "Rentnama",
    category: "Rental intelligence platform",
    proof: "178 first-hand reports across 146 societies",
    link: "/case-study/rentnama",
    accent: "#b5ef67",
    media: {
      label: "Live product // Pune rental map",
      description: "Society-level rent answers, map-led contributions, watches, and privacy-safe operations.",
      src: "/work/rentnama-map.webp",
      alt: "Rentnama's live Pune rental map showing first-hand rent reports by society",
      objectPosition: "center top",
      priority: true,
    },
  },
  {
    name: "Tirch",
    category: "End-to-end commerce engine",
    proof: "10 live products running through one engine",
    link: "/case-study/tirch",
    accent: "#d2694a",
    media: {
      label: "Live product // Tirch commerce engine",
      description: "Merchandising, bag, checkout, identity, orders, transactional systems, and release operations.",
      src: "/work/tirch-home.webp",
      alt: "Tirch's live storefront with campaign art direction and product proposition",
      objectPosition: "center",
      priority: true,
    },
  },
];

export default function Hero({ onContactClick }: HeroProps) {
  return (
    <section className="tech-grid relative overflow-hidden px-5 pb-14 pt-28 md:px-8 md:pb-16 md:pt-32 lg:pb-20 lg:pt-36">
      <div className="absolute top-1/3 right-0 w-2/3 h-2/3 bg-primary/10 blur-[100px] rounded-full z-0 md:hidden pointer-events-none" />
      <div className="absolute top-0 right-0 w-[60%] h-full z-0 hidden md:block pointer-events-none">
        <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[700px] h-[700px] bg-primary/8 blur-[180px] rounded-full mix-blend-screen" />
        <div className="absolute top-1/3 right-[10%] w-[300px] h-[300px] bg-primary/5 blur-[80px] rounded-full" />
      </div>
      <div className="scanline absolute inset-0 opacity-20 pointer-events-none z-0 hidden md:block" />

      <div className="max-w-[1440px] mx-auto w-full relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          <div className="lg:col-span-7">
            <div className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs text-primary md:mb-8">
              <span className="h-2 w-2 shrink-0 animate-pulse bg-primary" />
              <span>AI-POWERED MVPS FOR FUNDED STARTUPS</span>
            </div>

            <h1 className="mb-8 space-y-1 md:mb-9">
              <span className="block text-lg font-normal tracking-tight text-slate-300 sm:text-xl md:text-2xl">
                Still taking
              </span>
              <span className="flex items-center gap-4 md:gap-6">
                <span className="relative select-none text-[min(21vw,104px)] font-black leading-none tracking-tighter text-white/55 sm:text-7xl md:text-8xl lg:text-[clamp(76px,6.8vw,104px)]">
                  12 months
                  <span className="hero-strike absolute left-0 right-0 top-1/2 block h-[6px] origin-left -translate-y-1/2 bg-red-500/70 md:h-[8px]" />
                </span>
              </span>
              <span className="block text-lg font-normal tracking-tight text-slate-300 sm:text-xl md:text-2xl">
                to ship your product?
              </span>
              <span className="block h-3 md:h-4" aria-hidden="true" />
              <span className="block text-lg font-normal tracking-tight text-slate-200 sm:text-xl md:text-2xl">
                It should take
              </span>
              <span className="block text-[min(21vw,104px)] font-black leading-none tracking-tighter text-primary drop-shadow-[0_0_60px_rgba(0,245,255,0.35)] sm:text-7xl md:text-8xl lg:text-[clamp(76px,6.8vw,104px)]">
                12 weeks.
              </span>
            </h1>

            <div className="max-w-2xl border-l-2 border-primary/30 pl-5 md:pl-7">
              <p className="mb-7 text-base font-normal leading-relaxed text-slate-300 sm:text-lg md:mb-8">
                One senior team takes a sharply scoped MVP from product brief to production. Strategy, design, engineering, and useful AI move in one accountable build.
              </p>

              <div className="flex flex-col items-stretch gap-3 text-base sm:flex-row sm:items-center sm:gap-5">
                <button
                  onClick={onContactClick}
                  className="motion-button flex min-h-[48px] w-full items-center justify-center gap-2 bg-primary px-6 py-4 font-bold text-black hover:bg-white sm:w-auto"
                >
                  Discuss your 12-week build
                </button>
                <Link
                  to="/work"
                  onClick={() => trackAnalyticsEvent("selected_work_click", { source: "hero" })}
                  className="motion-button flex min-h-[48px] w-full items-center justify-center border border-white/10 px-6 py-4 text-white hover:border-white/30 sm:w-auto"
                >
                  See selected work
                </Link>
              </div>
            </div>
          </div>

          <aside className="hidden lg:col-span-5 lg:block" aria-label="Selected product work">
            <div className="mb-5 flex items-end justify-between border-b border-white/10 pb-4">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Shipped product builds</div>
                <p className="mt-2 text-sm text-slate-300">Two working products, opened up case by case.</p>
              </div>
              <span className="font-mono text-xs text-white/45">02 LIVE</span>
            </div>

            <div className="grid gap-4">
              {proofProjects.map((project) => (
                <Link
                  key={project.name}
                  to={project.link}
                  aria-label={`Open the ${project.name} case study: ${project.category}`}
                  onClick={() => trackAnalyticsEvent("case_study_open", { source: "hero_proof", organisation: project.name })}
                  className="content-card content-card-accent motion-card group grid grid-cols-[minmax(0,1fr)_158px] hover:border-white/25"
                  style={{ "--work-accent": project.accent } as CSSProperties}
                >
                  <ProjectMedia
                    project={project.name}
                    media={project.media}
                    accent={project.accent}
                    size="mini"
                    className="border-0 border-r border-white/10"
                  />
                  <div className="flex min-w-0 flex-col justify-between p-4">
                    <div>
                      <div className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-white/50">{project.category}</div>
                      <div className="mt-3 text-lg font-bold text-white transition-colors group-hover:text-primary">{project.name}</div>
                    </div>
                    <div>
                      <p className="text-xs leading-relaxed text-slate-300">{project.proof}</p>
                      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/55">Case study</span>
                        <ArrowUpRight className="h-4 w-4 text-white/60 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>

      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-24 w-full bg-gradient-to-t from-background-dark to-transparent" />
    </section>
  );
}
