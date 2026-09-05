import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import TeamAvatar from "./TeamAvatar";

const founders = [
  {
    name: "Kriti",
    role: "Co-founder · Design and Product Engineering",
  },
  {
    name: "Ashwin",
    role: "Co-founder · Product and Experience",
  },
];

export default function FounderOrigin() {
  return (
    <section className="section-band section-band-raised px-5 py-20 md:px-8 md:py-28">
      <div className="motion-reveal mx-auto grid max-w-[1200px] gap-10 md:grid-cols-12 md:items-center md:gap-14">
        <div className="md:col-span-5">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">[ 04 // ACCOUNTABILITY ]</div>
          <h2 className="mt-6 text-4xl font-black leading-[0.95] tracking-tighter text-white sm:text-5xl md:text-6xl">
            The people in the room stay <span className="text-primary">on the work.</span>
          </h2>
          <div className="mt-6 space-y-4 text-base font-normal leading-relaxed text-slate-300 md:text-lg">
            <p>
              Userhood was built around a simple operating decision: product design and engineering should share the same release, the same constraints, and the same accountability.
            </p>
            <p>
              The founders remain involved in product direction and delivery. The wider team is compact by design, so context does not disappear between a sales conversation and the build.
            </p>
          </div>

          <Link
            to="/about"
            className="mt-7 inline-flex min-h-[48px] items-center gap-3 text-sm font-bold text-primary transition-colors hover:text-white"
          >
            Meet the complete team <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:col-span-7">
          {founders.map((founder) => (
            <article
              key={founder.name}
              className="content-card motion-card group p-3 pb-5 sm:p-4 sm:pb-6"
            >
              <div className="aspect-[4/5] overflow-hidden border border-white/10 bg-background-dark">
                <TeamAvatar name={founder.name} />
              </div>
              <h3 className="mt-5 px-1 text-xl font-bold text-white md:text-2xl">{founder.name}</h3>
              <p className="mt-2 px-1 text-sm leading-relaxed text-white/75">{founder.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
