import { motion } from "motion/react";
import { trackEvent } from "../utils/analytics";

interface HeroProps {
  onContactClick: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden tech-grid px-5 md:px-8 pt-28 pb-20 md:pt-36 md:pb-28">

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
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[10px] text-primary mb-6 md:mb-10 flex items-center gap-2 flex-wrap"
          >
            <span className="w-2 h-2 bg-primary animate-pulse shrink-0" />
            <span>DESIGN × ENGINEERING × AI. IN FULL ALIGNMENT.</span>
          </motion.div>

          {/* The Indictment Headline */}
          <div className="mb-8 md:mb-12 space-y-1">

            {/* Line 1: soft accusation */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-slate-400 text-xl sm:text-2xl md:text-3xl font-light tracking-tight"
            >
              Still taking
            </motion.p>

            {/* Line 2: the number — struck through */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="flex items-center gap-4 md:gap-6"
            >
              <span className="relative text-[min(22vw,120px)] sm:text-7xl md:text-8xl lg:text-[120px] font-black leading-none tracking-tighter text-white/30 select-none">
                12 months
                {/* The strikethrough — draws across */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
                  className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[6px] md:h-[8px] bg-red-500/70 origin-left block"
                />
              </span>
            </motion.div>

            {/* Line 3: the bridge */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="text-slate-400 text-xl sm:text-2xl md:text-3xl font-light tracking-tight"
            >
              to ship your product?
            </motion.p>

            {/* Spacer */}
            <div className="h-4 md:h-6" />

            {/* Line 4: the answer — glows in */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
            >
              <p className="text-slate-300 text-xl sm:text-2xl md:text-3xl font-light tracking-tight mb-1">
                In the AI era, that should take
              </p>
              <p
                className="text-[min(22vw,120px)] sm:text-7xl md:text-8xl lg:text-[120px] font-black leading-none tracking-tighter text-primary drop-shadow-[0_0_60px_rgba(0,245,255,0.35)]"
              >
                12 weeks.
              </p>
            </motion.div>
          </div>

          {/* Tagline + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="border-l-2 border-primary/20 pl-5 md:pl-8 max-w-2xl"
          >
            <p className="text-base sm:text-lg md:text-xl text-slate-400 font-light leading-relaxed mb-8 md:mb-10">
              Userhood builds world-class digital products by merging design and engineering into one force, accelerated by AI. No bloated cycles. No year-long timelines.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 font-mono text-sm">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onContactClick}
                className="bg-primary text-black px-6 py-4 min-h-[48px] font-bold transition-transform flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                START THE CONVERSATION
              </motion.button>
              <motion.a
                href="#case-studies"
                onClick={() => trackEvent('click_view_archives', 'navigation', 'hero_cta')}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                className="text-white border border-white/10 px-6 py-4 min-h-[48px] transition-all flex items-center justify-center hover:border-white/30 w-full sm:w-auto"
              >
                VIEW_ARCHIVES
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 bg-gradient-to-t from-background-dark to-transparent pointer-events-none z-10" />
    </section>
  );
}
