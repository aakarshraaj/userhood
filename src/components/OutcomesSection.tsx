import { motion } from "motion/react";

const modules = [
  {
    id: "MOD_01",
    title: "Product Clarity",
    description: "Deterministic roadmapping and feature prioritization logic."
  },
  {
    id: "MOD_02",
    title: "Scalable Engineering",
    description: "Core architectures designed for high-velocity internal deployment."
  },
  {
    id: "MOD_03",
    title: "Cohesive Brand",
    description: "Resonant visual systems enforced at the component level."
  },
  {
    id: "MOD_04",
    title: "Experience Arch",
    description: "Total UI consistency through synchronized token management."
  }
];

export default function OutcomesSection() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-6 bg-background-dark" id="outcomes">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-10 md:mb-16 lg:mb-32">
          <div className="font-mono text-[10px] text-primary mb-3 md:mb-4">[ INTERVENTION_CAPABILITIES ]</div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter">Integrated Outcomes</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {modules.map((mod, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 md:p-8 lg:p-12 bg-background-dark hover:bg-white/[0.02] transition-colors group cursor-default"
            >
              <div className="font-mono text-[10px] text-white/20 mb-6 md:mb-12 group-hover:text-primary transition-colors">
                {mod.id}
              </div>
              <h4 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">{mod.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{mod.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
