import { ArrowRight, Check } from "lucide-react";
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(255,255,255,0.055),transparent_32%)]" />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="motion-reveal bg-[#131313] p-7 sm:p-9 md:p-12 lg:p-14">
          <div className="flex flex-col gap-7 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/45">
                [ 03 // FLAGSHIP_ENGAGEMENT ]
              </div>
              <h2 className="max-w-4xl text-4xl font-black leading-[0.92] tracking-tighter text-white sm:text-5xl md:text-7xl lg:text-8xl">
                The 12-Week<br />MVP Build.
              </h2>
            </div>

            <div className="w-fit font-mono text-xs uppercase tracking-[0.16em] text-white/50 md:pt-2">
              Brief → Production
            </div>
          </div>

          <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <p className="text-xl font-medium leading-relaxed text-white md:text-2xl">
                One hands-on product, design, and engineering team owns a sharply scoped release from the first decision to production.
              </p>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
                The twelve weeks begin after scope and commercial terms are agreed. Anything that cannot responsibly fit is surfaced before kickoff.
              </p>
            </div>

            <div className="md:col-span-7 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-7">
              <div className="mb-1 font-mono text-xs uppercase tracking-[0.14em] text-white/45 md:col-span-2">
                Strong fit when
              </div>
              {fitSignals.map((signal) => (
                <div key={signal} className="flex items-start gap-3 py-2 text-sm font-medium leading-relaxed text-white/80 md:text-base">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-white text-black">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-6 bg-white/[0.045] p-6 sm:flex-row sm:items-center sm:justify-between md:mt-16 md:p-7">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/45">Next step</div>
              <div className="mt-2 max-w-2xl text-base font-medium text-white">Talk directly with the people who would lead the build.</div>
            </div>
            <button
              onClick={onContactClick}
              className="motion-button flex min-h-[52px] shrink-0 items-center justify-center gap-3 bg-white px-7 py-4 text-base font-bold text-black hover:bg-white/80"
            >
              Discuss your 12-week build
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <aside className="motion-reveal mt-4 grid gap-6 bg-white/[0.025] p-6 md:grid-cols-[1.35fr_0.8fr_0.8fr_auto] md:items-center md:gap-8 md:p-8" aria-label="Other ways to work with Userhood">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-white/65">Already have a product?</div>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-white md:text-2xl">
              Start with the failure point, not a full rebuild.
            </h3>
          </div>

          <div>
            <div className="text-sm font-bold text-white">Product rescue</div>
            <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-white/45">2–4 weeks</div>
          </div>

          <div>
            <div className="text-sm font-bold text-white">Post-launch support</div>
            <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-white/45">Ongoing</div>
          </div>

          <Link
            to="/services"
            onClick={() => trackAnalyticsEvent("services_click", { source: "homepage_engagement" })}
            className="motion-button flex min-h-[48px] items-center justify-between gap-5 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white hover:bg-white hover:text-black md:justify-center"
          >
            Other services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </div>
    </section>
  );
}
