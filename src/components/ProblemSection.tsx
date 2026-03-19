import { motion } from "motion/react";

const moments = [
  {
    num: "01",
    line: "Your last agency estimated 6 months.\u00a0It took 14.",
    sub: "And what shipped still needed a redesign six months later. That's not a story about talent. That's a story about a broken process."
  },
  {
    num: "02",
    line: "The designs were stunning.\u00a0Then engineering happened.",
    sub: "What you approved in Figma and what got built were strangers. The proportions were off. The interactions felt cheap. The thing worked, but the magic was gone."
  },
  {
    num: "03",
    line: "You shipped. But you never stopped grieving what it could've been.",
    sub: "And somewhere in a presentation, someone called it a \"v1\" and promised it would get fixed later. Both of you knew it wouldn't."
  }
];

export default function ProblemSection() {
  return (
    <section className="relative py-20 px-5 border-b border-white/5 bg-transparent md:py-32 md:px-8">
      <div className="max-w-[1440px] mx-auto">

        {/* Opening strike */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 md:mb-28 max-w-4xl"
        >
          <div className="font-mono text-[10px] text-red-500/80 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-500 animate-pulse shrink-0" />
            THE WOUND
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[96px] font-black text-white leading-[0.9] tracking-tighter mb-8">
            You've been<br />
            <span className="text-red-400">there.</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl">
            Every founder has felt it. The moment a product you cared deeply about got lost in time, translation, and the gap between the people who imagined it and those who built it.
          </p>
        </motion.div>

        {/* Three moments of recognition */}
        <div className="border border-white/5">
          {moments.map((moment, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative border-b border-white/5 last:border-b-0 p-8 md:p-12 lg:p-16 bg-background-dark hover:bg-white/[0.015] transition-colors cursor-default"
            >
              {/* Accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-500/0 group-hover:bg-red-500/60 transition-colors duration-500" />

              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                <div className="font-mono text-[10px] text-red-500/30 group-hover:text-red-500/60 transition-colors shrink-0 mt-1.5">
                  {moment.num}
                </div>
                <div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug tracking-tight mb-4 group-hover:text-red-50 transition-colors duration-300">
                    {moment.line}
                  </p>
                  <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl group-hover:text-slate-400 transition-colors">
                    {moment.sub}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI provocation — new angle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-12 md:mt-16 border border-primary/10 bg-primary/[0.02] p-8 md:p-12 lg:p-14 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-16">
            <div className="shrink-0">
              <div className="font-mono text-[10px] text-primary/60 uppercase tracking-[0.2em] mb-3">The AI era asks:</div>
              <p className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-[1]">
                Why is it still<br />
                <span className="text-primary">taking a year?</span>
              </p>
            </div>
            <div className="max-w-md">
              <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                Every team uses AI now. The difference is whether it's a party trick layered on a broken process or the fundamental operating model from discovery to deployment. When you strip away the bureaucratic bloat, 12 weeks isn't ambitious. It's just math.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bridge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="font-mono text-xs text-white/20 uppercase tracking-[0.3em]">
            The problem was never the people. ↓
          </p>
        </motion.div>

      </div>
    </section>
  );
}
