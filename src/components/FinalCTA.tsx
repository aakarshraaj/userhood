import { trackAnalyticsEvent } from "../utils/analytics";
import { Link } from "react-router-dom";

interface FinalCTAProps {
  onContactClick: () => void;
}

export default function FinalCTA({ onContactClick }: FinalCTAProps) {
  return (
    <section className="section-band section-band-deep px-5 py-20 md:px-8 md:py-28" id="contact">
      <div className="content-card content-card-accent motion-reveal mx-auto max-w-5xl px-6 py-14 text-center sm:px-10 md:px-16 md:py-20">

        <div className="font-mono text-xs text-primary mb-6 md:mb-8 uppercase tracking-widest">
          [ 05 // THE_DECISION ]
        </div>

        <h2 className="mb-6 text-4xl font-black leading-[0.85] tracking-tighter text-white sm:text-5xl md:mb-8 md:text-7xl lg:text-[96px]">
          Twelve weeks<br />from now,<br />
          <span className="text-primary">
            what is live?
            <span className="ml-1 md:ml-2">_</span>
          </span>
        </h2>

        <div className="mx-auto mb-9 max-w-3xl md:mb-12">
          <p className="text-lg font-normal leading-relaxed text-slate-300 sm:text-xl md:text-2xl">
            If the problem is real, the decision-maker is in the room, and the first release can be sharply scoped, we can turn the next twelve weeks into a working product.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onContactClick}
            className="motion-button min-h-[52px] w-full whitespace-nowrap bg-primary px-8 py-5 text-base font-bold text-black hover:bg-white sm:w-auto md:px-14 md:py-6 md:text-lg"
          >
            Discuss your 12-week build
          </button>
          <Link
            to="/work"
            onClick={() => trackAnalyticsEvent("selected_work_click", { source: "final_cta" })}
            className="text-sm font-bold text-white/75 hover:text-primary transition-colors"
          >
            See case studies first
          </Link>
        </div>

      </div>
    </section>
  );
}
