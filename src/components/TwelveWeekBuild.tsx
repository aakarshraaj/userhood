import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const phases = [
  {
    weeks: "WEEKS 01–02",
    title: "Scope the release.",
    description: "Decide what ships and what does not.",
  },
  {
    weeks: "WEEKS 03–05",
    title: "Design the core flows.",
    description: "Resolve the product before polishing the edges.",
  },
  {
    weeks: "WEEKS 06–10",
    title: "Build the product.",
    description: "Review working software every week.",
  },
  {
    weeks: "WEEKS 11–12",
    title: "Launch and hand over.",
    description: "Ship, observe, stabilise, and leave a clear next move.",
  },
];

export default function TwelveWeekBuild() {
  return (
    <section id="process" className="section-band section-band-raised relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="motion-reveal mb-10 grid gap-7 md:mb-14 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-primary">[ 02 // THE_BUILD ]</div>
            <h2 className="max-w-4xl text-4xl font-black leading-[0.95] tracking-tighter text-white sm:text-5xl md:text-7xl">
              How twelve weeks <span className="text-primary">move.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <p className="max-w-md text-base leading-relaxed text-slate-300">Four stages. One scoped production release.</p>
            <Link to="/services" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white transition-colors hover:text-primary">
              See the full engagement <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <ol className="motion-reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((phase, index) => (
            <li key={phase.weeks} className="content-card motion-card flex min-h-[240px] flex-col border-t-2 border-t-primary/55 p-6 hover:border-white/20 md:p-7">
              <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.13em] text-primary">
                <span>{phase.weeks}</span>
                <span className="text-white/35">0{index + 1}</span>
              </div>
              <div className="mt-auto pt-10">
                <h3 className="text-2xl font-bold tracking-tight text-white">{phase.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{phase.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
