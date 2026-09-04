import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { trackAnalyticsEvent } from "../utils/analytics";

const fitSignals = [
  "You have funding and a real release window",
  "A founder or product owner can make weekly decisions",
  "The first version can be deliberately scoped",
  "You want one team accountable from brief to production",
];

interface EngagementModelsProps {
  onContactClick: () => void;
}

export default function EngagementModels({ onContactClick }: EngagementModelsProps) {
  return (
    <section
      id="engagement"
      className="relative overflow-hidden border-y border-white/5 bg-[#030303] px-5 py-20 md:px-8 md:py-28 lg:py-32"
    >
      <div className="tech-grid absolute inset-0 opacity-10 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="border border-primary/40 bg-primary/[0.04] p-7 sm:p-9 md:p-12 lg:col-span-8">
            <div className="flex flex-col gap-8 border-b border-white/10 pb-9 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  [ 03 // FLAGSHIP_ENGAGEMENT ]
                </div>
                <h2 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-tighter text-white sm:text-5xl md:text-7xl">
                  The 12-Week<br /><span className="text-primary">MVP Build.</span>
                </h2>
              </div>

              <div className="w-fit border border-primary/30 bg-primary/10 px-4 py-3 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                Brief → Production
              </div>
            </div>

            <div className="grid gap-10 py-9 md:grid-cols-2 md:gap-14 md:py-12">
              <div>
                <p className="text-xl font-light leading-relaxed text-slate-300 md:text-2xl">
                  A senior product, design, and engineering team owns one sharply scoped release from the first decision to the production deploy.
                </p>
                <p className="mt-5 text-sm font-light leading-relaxed text-slate-500 md:text-base">
                  The twelve weeks begin after scope and commercial terms are agreed. Complexity that cannot responsibly fit is surfaced before kickoff, not hidden inside the schedule.
                </p>
              </div>

              <div>
                <div className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-white/40">
                  Strong fit when
                </div>
                <ul className="space-y-4">
                  {fitSignals.map((signal) => (
                    <li key={signal} className="flex items-start gap-3 text-sm leading-relaxed text-slate-300 md:text-base">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-white/35">Next step</div>
                <div className="mt-2 text-base text-white">A direct fit conversation with the people who would lead the build.</div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onContactClick}
                className="flex min-h-[52px] shrink-0 items-center justify-center gap-3 bg-primary px-7 py-4 font-mono text-sm font-bold text-black transition-colors hover:bg-white"
              >
                DISCUSS YOUR BUILD
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>

          <aside className="flex flex-col border border-white/10 bg-white/[0.02] p-7 sm:p-9 lg:col-span-4 lg:p-10" aria-label="Other ways to work with Userhood">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-white/35">Not starting from zero?</div>
            <h3 className="mt-5 text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
              Existing products need a different first move.
            </h3>
            <p className="mt-5 text-base font-light leading-relaxed text-slate-400">
              Product rescue, architecture review, design-system repair, and post-launch iteration remain available—but they are not the promise this homepage is built around.
            </p>

            <div className="mt-10 space-y-3 border-t border-white/10 pt-8 font-mono text-xs uppercase tracking-[0.14em] text-white/50">
              <div className="flex items-center justify-between gap-4">
                <span>Product rescue</span>
                <span className="text-primary">2–4 weeks</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Post-launch support</span>
                <span className="text-primary">Ongoing</span>
              </div>
            </div>

            <Link
              to="/services"
              onClick={() => trackAnalyticsEvent("services_click", { source: "homepage_engagement" })}
              className="mt-auto flex min-h-[48px] items-center justify-between border-t border-white/10 pt-8 font-mono text-xs uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-primary"
            >
              Explore other services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
