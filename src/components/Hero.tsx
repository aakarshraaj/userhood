import { motion } from "motion/react";
import { trackAnalyticsEvent } from "../utils/analytics";
import KineticMesh from "./KineticMesh";


interface HeroProps {
  onContactClick: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden tech-grid px-5 md:px-8 pt-28 pb-20 md:pt-36 md:pb-28">

      {/* Interactive Kinetic Mesh Overlay (Right Edge, Fades Leftwards, Hidden on Mobile) */}
      <div className="absolute top-0 right-0 w-[55%] h-full z-0 hidden lg:block pointer-events-auto">
        <KineticMesh />
      </div>

      {/* Ambient glow — mobile */}
      <div className="absolute top-1/3 right-0 w-2/3 h-2/3 bg-primary/10 blur-[100px] rounded-full z-0 md:hidden pointer-events-none" />

      {/* Ambient glow — desktop */}
      <div className="absolute top-0 right-0 w-[60%] h-full z-0 hidden md:block pointer-events-none">
        <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[700px] h-[700px] bg-primary/8 blur-[180px] rounded-full mix-blend-screen" />
        <div className="absolute top-1/3 right-[10%] w-[300px] h-[300px] bg-primary/5 blur-[80px] rounded-full" />
      </div>

      {/* Scanline */}
      <div className="scanline absolute inset-0 opacity-20 pointer-events-none z-0 hidden md:block" />

      <div className="max-w-[1440px] mx-auto w-full relative z-10">
        <div className="max-w-4xl">

          {/* Badge */}
          <div className="font-mono text-xs text-primary mb-6 md:mb-10 flex items-center gap-2 flex-wrap">
            <span className="w-2 h-2 bg-primary animate-pulse shrink-0" />
            <span>AI-POWERED MVPS FOR FUNDED STARTUPS</span>
          </div>

          {/* The Indictment Headline */}
          <h1 className="mb-8 md:mb-12 space-y-1">

            {/* Line 1: soft accusation */}
            <span className="block text-slate-300 text-xl sm:text-2xl md:text-3xl font-normal tracking-tight">
              Still taking
            </span>

            {/* Line 2: the number — struck through */}
            <span className="flex items-center gap-4 md:gap-6">
              <span className="relative text-[min(22vw,120px)] sm:text-7xl md:text-8xl lg:text-[120px] font-black leading-none tracking-tighter text-white/55 select-none">
                12 months
                {/* The strikethrough — draws across */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.32, delay: 0.12, ease: "easeOut" }}
                  className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[6px] md:h-[8px] bg-red-500/70 origin-left block"
                />
              </span>
            </span>

            {/* Line 3: the bridge */}
            <span className="block text-slate-300 text-xl sm:text-2xl md:text-3xl font-normal tracking-tight">
              to ship your product?
            </span>

            {/* Spacer */}
            <div className="h-4 md:h-6" />

            {/* Line 4: the answer — glows in */}
            <span>
              <span className="block text-slate-200 text-xl sm:text-2xl md:text-3xl font-normal tracking-tight mb-1">
                It should take
              </span>
              <span
                className="block text-[min(22vw,120px)] sm:text-7xl md:text-8xl lg:text-[120px] font-black leading-none tracking-tighter text-primary drop-shadow-[0_0_60px_rgba(0,245,255,0.35)]"
              >
                12 weeks.
              </span>
            </span>
          </h1>

          {/* Tagline + CTAs */}
          <div className="border-l-2 border-primary/30 pl-5 md:pl-8 max-w-2xl">
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-8 md:mb-10">
              One senior team takes your MVP from product brief to production. Strategy, product design, engineering, and AI move in the same twelve-week build — so your runway buys a working product, not months of coordination.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 text-base">
              <button
                onClick={onContactClick}
                className="bg-primary text-black px-6 py-4 min-h-[48px] font-bold transition-transform flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Discuss your 12-week build
              </button>
              <a
                href="#case-studies"
                onClick={() => trackAnalyticsEvent("selected_work_click", { source: "hero" })}
                className="text-white border border-white/10 px-6 py-4 min-h-[48px] transition-all flex items-center justify-center hover:border-white/30 w-full sm:w-auto"
              >
                See selected work
              </a>
            </div>
          </div>

          {/* Transparent work provenance */}
          <div className="mt-16 md:mt-24 pt-8 border-t border-white/10 max-w-4xl">
            <p className="font-mono text-xs text-white/65 uppercase tracking-[0.2em] mb-4">
              SELECTED PRODUCT WORK // PROVENANCE LABELLED IN EVERY CASE
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs font-black tracking-widest text-white/70 md:gap-x-9 md:text-sm">
              <span className="text-primary">RENTNAMA</span>
              <span className="text-primary/40">+</span>
              <span className="text-primary">TIRCH</span>
              <span className="text-primary/40">//</span>
              <span>HYUNDAI</span>
              <span>+ MITSUBISHI MOTORS</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 bg-gradient-to-t from-background-dark to-transparent pointer-events-none z-10" />
    </section>

  );
}
