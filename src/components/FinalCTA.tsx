import { motion } from "motion/react";

interface FinalCTAProps {
  onContactClick: () => void;
}

export default function FinalCTA({ onContactClick }: FinalCTAProps) {
  return (
    <section className="py-20 md:py-28 lg:py-36 px-5 md:px-8 border-t border-white/5 bg-white/[0.02]" id="contact">
      <div className="max-w-4xl mx-auto text-center">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] text-primary mb-6 md:mb-8 uppercase tracking-widest"
        >
          [ ACT V // THE INVITATION ]
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-[110px] font-black text-white leading-[0.85] tracking-tighter mb-6 md:mb-8"
        >
          Time to<br />close the<br />
          <span className="text-primary">
            gap
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="ml-1 md:ml-2"
            >_</motion.span>
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <p className="text-xl sm:text-2xl md:text-3xl text-slate-400 font-light leading-relaxed">
            We work with a small number of founders and companies at a time. If your product deserves true alignment between design and engineering, let's talk.
          </p>
        </motion.div>

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
            START THE CONVERSATION
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
