import { Check } from "lucide-react";

const phases = [
  {
    weeks: "WEEKS 01–02",
    title: "Decide what deserves to exist.",
    description:
      "We align the product thesis, highest-risk assumptions, user journey, and release boundary before velocity turns into waste.",
    output: "Product brief · MVP scope · architecture direction",
  },
  {
    weeks: "WEEKS 03–05",
    title: "Design the system, not a slideshow.",
    description:
      "Core flows, interaction patterns, and the interface system are designed alongside the technical foundation they must survive.",
    output: "Validated flows · UI system · working foundation",
  },
  {
    weeks: "WEEKS 06–10",
    title: "Build the real product in one loop.",
    description:
      "Design and engineering work against the same decisions. Weekly product reviews happen on functioning software, not status decks.",
    output: "Production build · integrations · instrumentation",
  },
  {
    weeks: "WEEKS 11–12",
    title: "Launch, learn, and harden.",
    description:
      "We prepare the release, observe real usage, close critical gaps, and leave the team with a product it can keep moving forward.",
    output: "Live release · launch data · handover plan",
  },
];

const included = [
  "Product strategy and ruthless MVP scoping",
  "Product design and reusable interface system",
  "Full-stack engineering and AI integration where useful",
  "Deployment, analytics, documentation, and handover",
];

export default function TwelveWeekBuild() {
  return (
    <section id="process" className="relative overflow-hidden bg-background-dark px-5 py-16 md:px-8 md:py-20 lg:py-24">
      <div className="absolute right-[-20%] top-1/4 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[160px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <div className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              [ 02 // THE_12_WEEK_BUILD ]
            </div>
            <h2 className="text-4xl font-black leading-[0.95] tracking-tighter text-white sm:text-5xl md:text-7xl">
              One outcome.<br />Four decisive<br /><span className="text-primary">moves.</span>
            </h2>
            <p className="mt-7 max-w-lg text-base font-normal leading-relaxed text-slate-300 md:text-lg">
              Twelve weeks is a focused delivery cadence, not a magic trick. We lock the release boundary, expose risk early, and keep product decisions beside the people writing the code.
            </p>

            <div className="mt-8 border border-white/10 bg-white/[0.02] p-6 md:p-7">
              <div className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-white/70">
                What the build includes
              </div>
              <ul className="space-y-4">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-300 md:text-base">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ol className="border-t border-white/10 lg:col-span-7">
            {phases.map((phase, index) => (
              <li
                key={phase.weeks}
                className="grid gap-5 border-b border-white/10 py-7 md:grid-cols-[100px_1fr] md:gap-7 md:py-9"
              >
                <div>
                  <div className="font-mono text-xs font-bold tracking-[0.16em] text-primary">{phase.weeks}</div>
                  <div className="mt-3 text-5xl font-black leading-none text-white/10">0{index + 1}</div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{phase.title}</h3>
                  <p className="mt-4 max-w-2xl text-sm font-normal leading-relaxed text-slate-300 md:text-base">
                    {phase.description}
                  </p>
                  <div className="mt-5 font-mono text-xs uppercase tracking-[0.1em] text-white/70">
                    Output // <span className="text-white/75">{phase.output}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
