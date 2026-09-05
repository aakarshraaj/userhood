import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { trackAnalyticsEvent } from "../utils/analytics";

interface HeroProps {
  onContactClick: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  return (
    <section className="tech-grid relative overflow-hidden px-5 pb-14 pt-24 md:px-8 md:pb-16 md:pt-28 lg:pb-20 lg:pt-32">
      <div className="absolute top-1/3 right-0 w-2/3 h-2/3 bg-white/[0.045] blur-[100px] rounded-full z-0 md:hidden pointer-events-none" />
      <div className="absolute top-0 right-0 w-[60%] h-full z-0 hidden md:block pointer-events-none">
        <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.035] blur-[180px] rounded-full mix-blend-screen" />
        <div className="absolute top-1/3 right-[10%] w-[300px] h-[300px] bg-white/[0.025] blur-[80px] rounded-full" />
      </div>
      <div className="scanline absolute inset-0 opacity-20 pointer-events-none z-0 hidden md:block" />

      <div className="brand-intro-hero-content max-w-[1440px] mx-auto w-full relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          <div className="lg:col-span-8 xl:col-span-7">
            <h1 className="mb-7 max-w-5xl text-5xl font-medium leading-[0.96] tracking-[-0.035em] text-white/60 sm:text-6xl md:mb-8 md:text-7xl lg:text-[clamp(68px,6vw,92px)]">
              From product brief<br />
              <span className="text-white/90">to production in </span>
              <span className="font-black tracking-[-0.055em] text-white">12 weeks.</span>
            </h1>

            <div className="max-w-3xl">
              <p className="mb-7 text-base font-normal leading-relaxed text-slate-300 sm:text-lg md:mb-8">
                A hands-on product, design, and engineering team for funded startups with a real release to ship.
              </p>

              <div className="flex flex-col items-stretch gap-3 text-base sm:flex-row sm:items-center">
                <Link
                  to="/work"
                  onClick={() => trackAnalyticsEvent("selected_work_click", { source: "hero" })}
                  className="motion-button flex min-h-[48px] w-full items-center justify-center gap-3 bg-primary px-6 py-4 font-bold text-black hover:bg-white/80 sm:w-auto"
                >
                  See what we shipped <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={onContactClick}
                  className="motion-button flex min-h-[48px] w-full items-center justify-center border border-white/15 px-6 py-4 font-bold text-white hover:border-white/40 sm:w-auto"
                >
                  Discuss your build
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-24 w-full bg-gradient-to-t from-background-dark to-transparent" />
    </section>
  );
}
