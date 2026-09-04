import { motion } from "motion/react";
import { trackAnalyticsEvent } from "../utils/analytics";

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
          className="font-mono text-xs text-primary mb-6 md:mb-8 uppercase tracking-widest"
        >
          [ 05 // THE_DECISION ]
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-[110px] font-black text-white leading-[0.85] tracking-tighter mb-6 md:mb-8"
        >
          Twelve weeks<br />from now,<br />
          <span className="text-primary">
            what is live?
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
            If the problem is real, the decision-maker is in the room, and the first release can be sharply scoped, we can turn the next twelve weeks into a working product.
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
            DISCUSS YOUR 12-WEEK BUILD
          </motion.button>
          <a
            href="/#case-studies"
            onClick={() => trackAnalyticsEvent("selected_work_click", { source: "final_cta" })}
            className="font-mono text-xs text-white/50 hover:text-primary uppercase tracking-widest transition-colors"
          >
            See case studies first
          </a>
        </motion.div>

      </div>
    </section>
  );
}
