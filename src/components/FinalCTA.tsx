import { motion } from "motion/react";

interface FinalCTAProps {
  onContactClick: () => void;
}

export default function FinalCTA({ onContactClick }: FinalCTAProps) {
  return (
    <section className="py-20 md:py-28 lg:py-36 px-5 md:px-8 border-t border-white/5 bg-white/[0.02]" id="contact">
      <div className="max-w-4xl mx-auto text-center">
        <div className="font-mono text-[10px] text-primary mb-6 md:mb-8 uppercase tracking-widest">
          [ FINAL_TRANSMISSION ]
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-[140px] font-black text-white leading-[0.85] tracking-tighter mb-6 md:mb-8"
        >
          BUILD<br />SOMETHING<br />SERIOUS<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="text-primary ml-1 md:ml-2">_</motion.span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl md:text-2xl text-slate-400 font-light leading-snug mb-10 md:mb-12 max-w-2xl mx-auto"
        >
          We are selective. We build for performance. If you want alignment between brand and engineering — let's talk.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#fff", color: "#000" }}
            whileTap={{ scale: 0.98 }}
            onClick={onContactClick}
            className="bg-primary text-black px-8 py-5 md:px-14 md:py-6 font-mono font-bold text-base md:text-lg transition-all min-h-[52px] w-full sm:w-auto whitespace-nowrap"
          >
            START A CONVERSATION
          </motion.button>
          <a
            href="/#case-studies"
            className="font-mono text-[10px] text-white/50 hover:text-primary uppercase tracking-widest transition-colors"
          >
            See case studies first
          </a>
        </motion.div>
      </div>
    </section>
  );
}
