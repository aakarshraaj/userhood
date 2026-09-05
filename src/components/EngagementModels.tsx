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
      className="section-band section-band-deep relative overflow-hidden px-5 py-20 md:px-8 md:py-28"
    >
      <div className="tech-grid absolute inset-0 opacity-10 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="motion-reveal bg-primary p-7 text-black sm:p-9 md:p-12 lg:p-14">
          <div className="flex flex-col gap-8 border-b border-black/20 pb-8 md:flex-row md:items-start md:justify-between md:pb-10">
            <div>
              <div className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-black/65">
                [ 03 // FLAGSHIP_ENGAGEMENT ]
              </div>
              <h2 className="max-w-4xl text-4xl font-black leading-[0.92] tracking-tighter text-black sm:text-5xl md:text-7xl lg:text-8xl">
                The 12-Week<br />MVP Build.
              </h2>
            </div>

            <div className="w-fit border border-black/25 bg-black px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-primary">
              Brief → Production
            </div>
          </div>

          <div className="grid gap-9 py-8 md:grid-cols-12 md:gap-12 md:py-10">
            <div className="md:col-span-5">
              <p className="text-xl font-medium leading-relaxed text-black md:text-2xl">
                A senior product, design, and engineering team owns one sharply scoped release from the first decision to the production deploy.
              </p>
              <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-black/70 md:text-base">
                The twelve weeks begin after scope and commercial terms are agreed. Anything that cannot responsibly fit is surfaced before kickoff.
              </p>
            </div>

            <div className="md:col-span-7 md:grid md:grid-cols-2 md:gap-x-8">
              <div className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-black/60 md:col-span-2">
                Strong fit when
              </div>
              {fitSignals.map((signal) => (
                <div key={signal} className="flex items-start gap-3 border-t border-black/20 py-4 text-sm font-medium leading-relaxed text-black md:text-base">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-black" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 border-t border-black/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-black/60">Next step</div>
              <div className="mt-2 max-w-2xl text-base font-medium text-black">A direct fit conversation with the people who would lead the build.</div>
            </div>
            <button
              onClick={onContactClick}
              className="motion-button flex min-h-[52px] shrink-0 items-center justify-center gap-3 bg-black px-7 py-4 text-base font-bold text-white hover:bg-white hover:text-black"
            >
              Discuss your 12-week build
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <aside className="content-card motion-reveal mt-5 grid gap-6 p-6 md:grid-cols-[1.35fr_0.8fr_0.8fr_auto] md:items-center md:gap-8 md:p-8" aria-label="Other ways to work with Userhood">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-white/65">Already have a product?</div>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-white md:text-2xl">
              Start with the failure point, not a full rebuild.
            </h3>
          </div>

          <div className="border-t border-white/10 pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <div className="text-sm font-bold text-white">Product rescue</div>
            <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-primary">2–4 weeks</div>
          </div>

          <div className="border-t border-white/10 pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <div className="text-sm font-bold text-white">Post-launch support</div>
            <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-primary">Ongoing</div>
          </div>

          <Link
            to="/services"
            onClick={() => trackAnalyticsEvent("services_click", { source: "homepage_engagement" })}
            className="motion-button flex min-h-[48px] items-center justify-between gap-5 border border-white/15 px-5 py-3 text-sm font-bold text-white hover:border-primary hover:text-primary md:justify-center"
          >
            Other services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </div>
    </section>
  );
}
