interface HeroProps {
  onContactClick: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  return (
    <section className="tech-grid relative overflow-hidden px-5 pb-14 pt-28 md:px-8 md:pb-16 md:pt-32 lg:pb-20 lg:pt-36">
      <div className="absolute top-1/3 right-0 w-2/3 h-2/3 bg-white/[0.045] blur-[100px] rounded-full z-0 md:hidden pointer-events-none" />
      <div className="absolute top-0 right-0 w-[60%] h-full z-0 hidden md:block pointer-events-none">
        <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.035] blur-[180px] rounded-full mix-blend-screen" />
        <div className="absolute top-1/3 right-[10%] w-[300px] h-[300px] bg-white/[0.025] blur-[80px] rounded-full" />
      </div>
      <div className="scanline absolute inset-0 opacity-20 pointer-events-none z-0 hidden md:block" />

      <div className="max-w-[1440px] mx-auto w-full relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          <div className="lg:col-span-7">
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
              <span className="block text-[min(21vw,104px)] font-black leading-none tracking-tighter text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.14)] sm:text-7xl md:text-8xl lg:text-[clamp(76px,6.8vw,104px)]">
                12 weeks.
              </span>
            </h1>

            <div className="max-w-2xl">
              <p className="mb-7 text-base font-normal leading-relaxed text-slate-300 sm:text-lg md:mb-8">
                One senior team takes a sharply scoped MVP from product brief to production. Strategy, design, engineering, and useful AI move in one accountable build.
              </p>

              <div className="flex flex-col items-stretch gap-3 text-base sm:flex-row sm:items-center">
                <button
                  onClick={onContactClick}
                  className="motion-button flex min-h-[48px] w-full items-center justify-center gap-2 bg-primary px-6 py-4 font-bold text-black hover:bg-white/80 sm:w-auto"
                >
                  Discuss your 12-week build
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
