import { motion } from "motion/react";

export default function CriteriaSection() {
  return (
    <section className="py-16 md:py-24 lg:py-40 px-5 md:px-8 bg-background-dark">
      <div className="max-w-[1440px] mx-auto border border-white/10">
        <div className="grid md:grid-cols-2">
          <div className="p-6 sm:p-10 md:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-white/10">
            <div className="font-mono text-[10px] text-primary mb-8 md:mb-12 uppercase">[ WHO THIS IS FOR ]</div>
            <ul className="space-y-5 md:space-y-8">
              {[
                "Funded ventures (Seed to Series B) ready to scale.",
                "Enterprise teams replacing critical legacy software.",
                "Founders who know design and engineering cannot be separated."
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 md:gap-6 group"
                >
                  <span className="font-mono text-primary text-xs mt-1 shrink-0 group-hover:translate-x-1 transition-transform">{">"}</span>
                  <span className="text-base md:text-xl text-white font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-10 md:p-12 lg:p-16 bg-white/[0.01]">
            <div className="font-mono text-[10px] text-white/20 mb-8 md:mb-12 uppercase">[ WHO THIS ISN'T FOR ]</div>
            <ul className="space-y-5 md:space-y-8 opacity-40">
              {[
                "Teams just looking for a quick, cosmetic rebrand.",
                "Companies looking to hand off a Jira backlog to a dev shop.",
                "Founders who think 'good enough' is an acceptable standard."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 md:gap-6">
                  <span className="font-mono text-xs mt-1 shrink-0">✕</span>
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
