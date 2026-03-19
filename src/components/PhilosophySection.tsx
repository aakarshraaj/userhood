import { motion } from "motion/react";

// Old Way vs Userhood Way — process comparison visual
const ProcessComparison = () => (
  <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5 mt-12 md:mt-16">

    {/* Old Way */}
    <div className="bg-background-dark p-8 md:p-12 space-y-6">
      <div className="font-mono text-[10px] text-red-400/70 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-red-400/70" />
        The Old Way
      </div>
      {[
        { label: "Design", color: "border-white/10 text-white/40" },
        { label: "→ Handoff", color: "border-red-500/30 text-red-400/60", indent: true },
        { label: "Engineering", color: "border-white/10 text-white/40" },
        { label: "→ Misalignment", color: "border-red-500/50 text-red-400/80", indent: true },
        { label: "Ship anyway", color: "border-red-500/20 text-white/30" },
      ].map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className={`border-l-2 ${step.color} ${step.indent ? "ml-6" : ""} pl-4 py-1`}
        >
          <span className={`font-mono text-sm ${step.color.split(" ")[1]}`}>{step.label}</span>
        </motion.div>
      ))}
      <div className="pt-4 font-mono text-[10px] text-red-400/40 italic">
        // result: grief
      </div>
    </div>

    {/* Userhood Way */}
    <div className="bg-background-dark p-8 md:p-12 space-y-6">
      <div className="font-mono text-[10px] text-primary/70 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-primary/70" />
        The Userhood Way
      </div>
      {[
        { label: "Conceive", color: "border-primary/30 text-primary/60" },
        { label: "Design + Engineer together", color: "border-primary/60 text-primary/80", highlight: true },
        { label: "Align at every step", color: "border-primary/40 text-primary/60" },
        { label: "Ship", color: "border-primary/80 text-primary font-bold" },
      ].map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className={`border-l-2 ${step.color} pl-4 py-1 ${step.highlight ? "bg-primary/[0.04]" : ""}`}
        >
          <span className={`font-mono text-sm ${step.color.split(" ")[1]} ${step.highlight ? "font-bold" : ""}`}>
            {step.label}
          </span>
        </motion.div>
      ))}
      <div className="pt-4 font-mono text-[10px] text-primary/40 italic">
        // result: alignment
      </div>
    </div>
  </div>
);

export default function PhilosophySection() {
  return (
    <section className="py-16 md:py-24 lg:py-40 px-5 md:px-8 bg-background-dark border-y border-white/5" id="philosophy">
      <div className="max-w-[1440px] mx-auto">

        {/* The villain reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-16 md:mb-24"
        >
          <div className="font-mono text-[10px] text-primary mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary shrink-0" />
            [ THE VILLAIN ]
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8">
            The problem was never<br />
            the talent.<br />
            <span className="text-primary">It was the handoff.</span>
          </h2>

          <div className="max-w-2xl space-y-5 text-slate-400 text-lg md:text-xl font-light leading-relaxed border-l-2 border-primary/20 pl-6 md:pl-10">
            <p>
              Most studios operate in silos. Design is a department. Engineering is a department. There's a meeting, a Figma handoff, and a prayer.
            </p>
            <p>
              Nobody owns the seam between them. And that seam is where your product's soul goes to die.
            </p>
          </div>
        </motion.div>

        {/* The Userhood answer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="font-mono text-[10px] text-primary/60 uppercase tracking-[0.2em] mb-4">
            [ THE USERHOOD APPROACH ]
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
            In today's world, "handoff" isn't a thing.
          </h3>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mb-4">
            You don't toss tickets over a wall. You just sit down, lock in, and get it done. Design and engineering as a single, relentless discipline.
          </p>

          <ProcessComparison />
        </motion.div>

      </div>
    </section>
  );
}
