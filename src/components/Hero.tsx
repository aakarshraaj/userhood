import { motion } from "motion/react";
import { trackEvent } from "../utils/analytics";

interface HeroProps {
  onContactClick: () => void;
}

const SchematicBackground = () => (
  <>
    {/* Mobile: subtle gradient only — no heavy graphic */}
    <div className="absolute top-0 right-0 w-full h-full z-0 md:hidden pointer-events-none">
      <div className="absolute top-1/4 right-0 w-3/4 h-1/2 bg-primary/10 blur-[80px] rounded-full" />
    </div>
    {/* Desktop: full schematic */}
    <div className="absolute top-0 right-0 w-full md:w-[60%] h-full z-0 hidden md:flex opacity-100 pointer-events-none items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-primary/20 blur-[150px] rounded-full translate-x-1/2 scale-150 mix-blend-screen opacity-50" />
      <svg className="w-[800px] h-[800px] stroke-primary/30 stroke-[1] fill-none" viewBox="0 0 400 400">
        <motion.circle cx="200" cy="200" r="180" strokeDasharray="4 8"
        animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ originX: "200px", originY: "200px" }}
      />
      <motion.circle cx="200" cy="200" r="140" stroke="rgba(0,255,255,0.1)" strokeWidth="2"
        animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Node Graph Lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.line key={i} x1="200" y1="200"
          x2={200 + Math.cos(i * Math.PI / 4) * 140}
          y2={200 + Math.sin(i * Math.PI / 4) * 140}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
        />
      ))}
      <motion.rect x="160" y="160" width="80" height="80" rx="4" stroke="rgba(0,255,255,0.8)" strokeWidth="1.5"
        animate={{ rotate: [0, 90, 180, 270, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ originX: "200px", originY: "200px" }}
        />
      </svg>
    </div>
  </>
);

export default function Hero({ onContactClick }: HeroProps) {
  return (
    <section className="relative pt-28 pb-20 px-5 min-h-[100dvh] flex items-center md:pt-48 md:pb-32 md:px-8 md:min-h-[90vh] overflow-hidden tech-grid">

      <SchematicBackground />

      {/* Scanline: hidden on mobile for cleaner look */}
      <div className="scanline absolute inset-0 opacity-20 pointer-events-none z-0 hidden md:block" />

      <div className="max-w-[1440px] mx-auto w-full relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono text-[10px] text-primary mb-4 md:mb-6 flex items-center gap-2 flex-wrap"
          >
            <span className="w-2 h-2 bg-primary animate-pulse shrink-0" />
            <span className="break-words">STATUS: ONLINE // ACCEPTING_NEW_MISSIONS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[min(24vw,110px)] leading-[0.88] sm:text-5xl sm:leading-[0.92] md:text-6xl md:leading-[0.92] lg:text-[120px] font-black tracking-tighter text-white mb-8 md:mb-12 overflow-visible"
          >
            {/* Mobile: break ENGINEERING so it never clips */}
            <span className="md:hidden block">DESIGN<br />ENGINEER<br />ING<br /><span className="text-primary">ALIGNED.</span></span>
            {/* Desktop: single word */}
            <span className="hidden md:inline">DESIGN<br />ENGINEERING<br /><span className="text-primary">ALIGNED.</span></span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl border-l-2 border-primary/20 pl-5 md:pl-8"
          >
            <p className="text-base sm:text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-8 md:mb-12">
              A technical studio aligning brand, product, and engineering for high-stakes ventures.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 font-mono text-sm">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onContactClick}
                className="bg-primary text-black px-6 py-4 min-h-[48px] font-bold transition-transform flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                INITIALIZE_PROJECT
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

      <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 bg-gradient-to-t from-background-dark to-transparent pointer-events-none z-10" />
    </section>
  );
}
