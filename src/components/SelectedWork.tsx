import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const selectedWork = [
  {
    index: "01",
    organisation: "Hyundai Global",
    category: "Automotive commerce",
    title: "Turning a dealership journey into one coherent digital purchase flow.",
    description:
      "Model discovery, configuration, finance, and dealer handoff brought into a single customer experience.",
    link: "/case-study/hyundai",
  },
  {
    index: "02",
    organisation: "Mitsubishi Motors Australia",
    category: "Connected ownership",
    title: "Making a complex vehicle ecosystem feel calm behind the wheel.",
    description:
      "Vehicle health, servicing, and driving feedback shaped into an interface designed around clarity and confidence.",
    link: "/case-study/mitsubishi",
  },
];

export default function SelectedWork() {
  return (
    <section
      id="case-studies"
      className="relative border-y border-white/5 bg-[#08080a] px-5 py-20 md:px-8 md:py-28 lg:py-32"
    >
      <div className="tech-grid absolute inset-0 opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="grid gap-8 border-b border-white/10 pb-10 md:grid-cols-12 md:items-end md:pb-14">
          <div className="md:col-span-8">
            <div className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              [ 01 // SELECTED_WORK ]
            </div>
            <h2 className="max-w-4xl text-4xl font-black leading-[0.95] tracking-tighter text-white sm:text-5xl md:text-7xl">
              See how the team <span className="text-primary">thinks and ships.</span>
            </h2>
          </div>

          <p className="max-w-md text-base font-light leading-relaxed text-slate-400 md:col-span-4 md:justify-self-end md:text-lg">
            Selected product work contributed to by members of the team behind Userhood. Open a case study for the problem, decisions, and system.
          </p>
        </div>

        <div>
          {selectedWork.map((item, index) => (
            <motion.div
              key={item.organisation}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                to={item.link}
                aria-label={`Read the ${item.organisation} team-experience case study`}
                className="group grid gap-6 border-b border-white/10 py-10 transition-colors hover:bg-white/[0.02] md:grid-cols-12 md:items-center md:gap-8 md:px-4 md:py-14"
              >
                <div className="font-mono text-xs text-white/30 md:col-span-1">{item.index}</div>

                <div className="md:col-span-3">
                  <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
                    Team experience · {item.category}
                  </div>
                  <div className="mt-2 text-lg font-bold text-white">{item.organisation}</div>
                </div>

                <div className="md:col-span-7">
                  <h3 className="max-w-3xl text-2xl font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-primary md:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-slate-400 md:text-base">
                    {item.description}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center border border-white/15 text-white transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-black md:col-span-1 md:justify-self-end">
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 max-w-3xl font-mono text-xs uppercase leading-relaxed tracking-[0.12em] text-white/25">
          Evidence standard // We do not publish outcome numbers without an attributable source. Deeper artefacts are shared only where project permissions allow.
        </p>
      </div>
    </section>
  );
}
