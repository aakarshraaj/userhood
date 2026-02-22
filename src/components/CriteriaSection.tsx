import { motion } from "motion/react";

export default function CriteriaSection() {
  return (
    <section className="py-16 md:py-24 lg:py-40 px-5 md:px-8 bg-background-dark">
      <div className="max-w-[1440px] mx-auto border border-white/10">
        <div className="grid md:grid-cols-2">
          <div className="p-6 sm:p-10 md:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-white/10">
            <div className="font-mono text-[10px] text-primary mb-8 md:mb-12 uppercase">[ ENGAGEMENT_FIT_CRITERIA ]</div>
            <ul className="space-y-5 md:space-y-8">
              {[
                "Funded ventures (Seed to Series B) ready to scale infrastructure.",
                "Enterprise entities modernizing critical product suites.",
                "Teams prioritizing system integrity over purely cosmetic aesthetics."
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 md:gap-6 group"
                >
                  <span className="font-mono text-primary text-xs mt-1 shrink-0 group-hover:translate-x-1 transition-transform">{"->"}</span>
                  <span className="text-base md:text-xl text-white font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-10 md:p-12 lg:p-16 bg-white/[0.01]">
            <div className="font-mono text-[10px] text-white/20 mb-8 md:mb-12 uppercase">[ NON_OPTIMAL_CONDITIONS ]</div>
            <ul className="space-y-5 md:space-y-8 opacity-40">
              {[
                "Surface-level rebrands or quick cosmetic patches.",
                "Teams seeking basic staff augmentation rather than strategic partnership.",
                "Short-term marketing sites without engineering depth."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 md:gap-6">
                  <span className="font-mono text-xs mt-1 shrink-0">!!</span>
                  <span className="text-base md:text-xl text-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
