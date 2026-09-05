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
  link: string;
  accent: string;
  media: ProjectMediaSpec;
}> = [
  {
    name: "Rentnama",
    category: "Rental intelligence platform",
    link: "/case-study/rentnama",
    accent: "#b5ef67",
    media: {
      label: "Society answers + rental map",
      description: "Repository-backed product logic, trust systems, maps, watches, and privacy-safe analytics.",
    },
  },
  {
    name: "Tirch",
    category: "Commerce systems",
    link: "/case-study/tirch",
    accent: "#d2694a",
    media: {
      label: "Storefront + commerce system",
      description: "Repository-backed storefront, account flows, release boundaries, and Cloudflare infrastructure.",
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
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 bg-primary px-6 py-4 font-bold text-black transition-colors hover:bg-white sm:w-auto"
                >
                  Discuss your 12-week build
                </button>
                <a
                  href="#case-studies"
                  onClick={() => trackAnalyticsEvent("selected_work_click", { source: "hero" })}
                  className="flex min-h-[48px] w-full items-center justify-center border border-white/10 px-6 py-4 text-white transition-colors hover:border-white/30 sm:w-auto"
                >
                  See selected work
                </a>
              </div>
            </div>
          </div>

          <aside className="hidden lg:col-span-5 lg:block" aria-label="Repository-backed product work">
            <div className="mb-5 flex items-end justify-between border-b border-white/10 pb-4">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Proof before pitch</div>
                <p className="mt-2 text-sm text-slate-300">Two products backed by working repositories.</p>
              </div>
              <span className="font-mono text-xs text-white/45">02 BUILDS</span>
            </div>

            <div className="grid gap-4">
              {proofProjects.map((project) => (
                <Link
                  key={project.name}
                  to={project.link}
                  aria-label={`Open the ${project.name} case study: ${project.category}`}
                  onClick={() => trackAnalyticsEvent("case_study_open", { source: "hero_proof", organisation: project.name })}
                  className="group grid grid-cols-[minmax(0,1fr)_52px] border border-white/10 bg-[#08080a] transition-colors hover:border-white/25"
                >
                  <ProjectMedia
                    project={project.name}
                    media={project.media}
                    accent={project.accent}
                    size="mini"
                    className="border-0 border-r border-white/10"
                  />
                  <div className="flex flex-col items-center justify-between py-4">
                    <ArrowUpRight className="h-5 w-5 text-white/60 transition-colors group-hover:text-primary" />
                    <span className="-rotate-90 whitespace-nowrap font-mono text-xs uppercase tracking-[0.12em] text-white/55">
                      {project.name}
                    </span>
                    <span className="h-2 w-2" style={{ backgroundColor: project.accent }} />
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-12 grid gap-4 border-t border-white/10 pt-6 md:mt-14 md:grid-cols-[auto_1fr] md:items-center md:gap-8">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/65">
            Work provenance
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold text-white/75 sm:text-sm md:justify-end">
            <span className="text-primary">Repository-backed: Rentnama + Tirch</span>
            <span className="hidden text-primary/40 sm:inline">//</span>
            <span>Team experience: Hyundai + Mitsubishi Motors</span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-24 w-full bg-gradient-to-t from-background-dark to-transparent" />
    </section>
  );
}
