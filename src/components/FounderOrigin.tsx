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
    <section className="section-band section-band-raised px-5 py-16 md:px-8 md:py-24">
      <div className="motion-reveal mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12 md:items-center md:gap-14">
        <div className="md:col-span-5">
          <h2 className="text-4xl font-medium leading-tight tracking-[-0.035em] text-white md:text-5xl">
            Good company for big questions.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/65 md:text-lg">
            Product people, designers and engineers. Opinionated enough to challenge an idea. Close enough to the work to make it happen.
          </p>

          <Link
            to="/about"
            className="mt-7 inline-flex min-h-[48px] items-center gap-3 text-sm font-bold text-white transition-colors hover:text-white/65"
          >
            Meet the full team <ArrowRight className="h-4 w-4" />
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
