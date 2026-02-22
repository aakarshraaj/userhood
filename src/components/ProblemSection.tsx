import { LayoutDashboard, Link2Off, Ruler } from "lucide-react";
import { motion } from "motion/react";

const problems = [
  {
    icon: <LayoutDashboard className="w-8 h-8" />,
    title: "INTERFACE_FRAGMENTATION",
    description: "Inconsistent user experiences state-machines causing cognitive friction, eroding trust, and bloating support overhead."
  },
  {
    icon: <Link2Off className="w-8 h-8" />,
    title: "CODEBASE_MISALIGNMENT",
    description: "Visual identity fails to translate into functional logic, resulting in an 'uncanny valley' environment and severe technical debt."
  },
  {
    icon: <Ruler className="w-8 h-8" />,
    title: "ARCHITECTURAL_DECAY",
    description: "Scaling demands have exposed weak foundations. Rapid growth is throttled by legacy design inconsistencies and rigid architecture."
  }
];

export default function ProblemSection() {
  return (
    <section className="relative py-16 px-5 border-b border-white/5 bg-transparent pt-20 md:py-24 md:px-6 md:pt-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-mono text-[10px] text-red-500 uppercase tracking-[0.2em] mb-4 md:mb-6 flex items-center gap-2 flex-wrap">
          <span className="w-1.5 h-1.5 bg-red-500 animate-pulse shrink-0" />
          <span className="break-words">SYSTEM_VULNERABILITIES // THREAT_ASSESSMENT</span>
        </h2>
        <h3 className="text-3xl sm:text-4xl md:text-6xl font-black mb-10 md:mb-16 text-white tracking-tighter">
          The true cost of <span className="text-red-500">misalignment.</span>
        </h3>

        <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background-dark p-6 md:p-8 lg:p-12 flex flex-col gap-4 md:gap-6 relative overflow-hidden group cursor-default"
            >
              <div className="absolute top-0 right-0 p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                <div className="font-mono text-[8px] text-red-500/50 uppercase">Alert_Level_{index + 1}</div>
              </div>
              <div className="absolute inset-0 bg-red-500/[0.02] group-hover:bg-red-500/[0.05] transition-colors pointer-events-none" />

              <div className="text-red-500/50 transform transition-all duration-300 relative z-10 group-hover:text-red-500 [&>svg]:w-6 [&>svg]:h-6 md:[&>svg]:w-8 md:[&>svg]:h-8">
                {problem.icon}
              </div>
              <div className="relative z-10">
                <h4 className="font-mono text-[11px] md:text-[12px] uppercase tracking-widest mb-2 md:mb-4 text-white group-hover:text-red-500 transition-colors duration-300 break-words">
                  {problem.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">{problem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
