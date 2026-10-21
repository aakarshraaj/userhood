import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { trackAnalyticsEvent } from "../utils/analytics";
import { engagements } from "../data/studio";

export default function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="bg-[#111111] px-5 py-16 md:px-8 md:py-24">
      <div className="motion-reveal mx-auto max-w-[1440px]">
        <h2 id="capabilities-title" className="max-w-4xl text-[clamp(2.5rem,4.5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.045em] text-white">
          Thinking as a Service.
        </h2>

        <div className="mt-10 space-y-8 md:mt-14 md:space-y-9">
          {engagements.map((capability) => (
            <div key={capability.id} className="grid gap-2 md:grid-cols-2 md:items-baseline md:gap-12">
              <h3 className="text-2xl font-medium leading-tight tracking-[-0.035em] text-white sm:text-3xl lg:text-4xl">{capability.title}</h3>
              <p className="max-w-lg text-base leading-relaxed text-white/65 lg:text-lg">{capability.homeSummary}</p>
            </div>
          ))}
        </div>

        <Link
          to="/services"
          onClick={() => trackAnalyticsEvent("services_click", { source: "homepage_capabilities" })}
          className="motion-button group mt-10 inline-flex min-h-11 w-fit items-center gap-3 text-base font-medium text-white transition-colors hover:text-white/65 md:mt-12"
        >
          Explore services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
