import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import TeamAvatar from "../components/TeamAvatar";
import { getPageSEO } from "../data/siteMetadata";
import { useSEO } from "../utils/seo";

const people = [
  { name: "Kriti", role: "Co-founder · Design and Product Engineering" },
  { name: "Ashwin", role: "Co-founder · Product and Experience" },
  { name: "Nishita", role: "Designer" },
  { name: "Priya", role: "Growth Lead" },
  { name: "Somesh", role: "Product" },
  { name: "Uttkarsh", role: "Product" },
  { name: "Priyanka", role: "Designer" },
];

const workingRhythm = [
  {
    moment: "Before kickoff",
    title: "We cut the scope to what can ship responsibly.",
  },
  {
    moment: "Every week",
    title: "You review the working product, not a status presentation.",
  },
  {
    moment: "Between reviews",
    title: "Questions go directly to the person making the decision.",
  },
  {
    moment: "At release",
    title: "The product leaves with analytics, documentation, and context.",
  },
];

export default function About() {
  useSEO(getPageSEO("about"));

  return (
    <main data-page-id="about" className="min-h-screen bg-background-dark pt-28 selection:bg-primary selection:text-black md:pt-36">
      <section className="px-5 md:px-8" aria-labelledby="team-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">Studio // Team</div>

          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
            <h1 id="team-title" className="max-w-5xl text-5xl font-black leading-[0.9] tracking-tighter text-white sm:text-6xl md:text-8xl lg:col-span-8 lg:text-[92px]">
              The complete team.
            </h1>

            <div className="lg:col-span-4">
              <p className="max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
                Seven people across product, design, engineering, and growth. Kriti and Ashwin stay involved from scope through release.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  to="/?contact=true&source=about_hero"
                  className="motion-button inline-flex min-h-[50px] items-center justify-center gap-3 bg-white px-6 py-4 text-sm font-bold text-black hover:bg-white/80"
                >
                  Discuss your build <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://in.linkedin.com/company/userhood"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="motion-button inline-flex min-h-[50px] items-center justify-center gap-3 bg-white/[0.055] px-6 py-4 text-sm font-bold text-white hover:bg-white hover:text-black"
                >
                  LinkedIn <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
            {people.map((person) => (
              <article key={person.name} className="bg-white/[0.035] p-2 pb-5 sm:p-3 sm:pb-6">
                <div className="aspect-square overflow-hidden bg-black">
                  <TeamAvatar name={person.name} />
                </div>
                <div className="px-2 pt-4 sm:px-3 sm:pt-5">
                  <h2 className="text-xl font-black tracking-tight text-white md:text-2xl">{person.name}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">{person.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band section-band-raised mt-20 px-5 py-20 md:mt-28 md:px-8 md:py-28" aria-labelledby="rhythm-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-white/50">01 // How we work</div>
          <div className="mt-5 grid gap-7 md:grid-cols-12 md:items-end">
            <h2 id="rhythm-title" className="max-w-4xl text-4xl font-black leading-[0.94] tracking-tighter text-white md:col-span-8 md:text-7xl">
              How the team works with you.
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-slate-300 md:col-span-4 md:justify-self-end md:text-lg">
              Product, design, and engineering share one release and one decision loop.
            </p>
          </div>

          <ol className="mt-12 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {workingRhythm.map((step, index) => (
              <li key={step.moment} className="flex min-h-[220px] flex-col bg-white/[0.035] p-6 md:p-7">
                <div className="flex items-center justify-between gap-5 font-mono text-xs uppercase tracking-[0.12em] text-white/45">
                  <span>{step.moment}</span>
                  <span>0{index + 1}</span>
                </div>
                <h3 className="mt-auto pt-10 text-2xl font-bold leading-tight tracking-tight text-white">{step.title}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-band section-band-deep px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-white/50">02 // Work with us</div>
            <h2 className="mt-5 max-w-4xl text-4xl font-black leading-[0.94] tracking-tighter text-white sm:text-5xl md:text-7xl">
              Want this team on your build?
            </h2>
          </div>

          <div className="flex flex-col gap-3 md:col-span-4 md:items-start">
            <Link
              to="/?contact=true&source=about_footer"
              className="motion-button inline-flex min-h-[52px] items-center justify-center gap-3 bg-white px-7 py-4 text-base font-bold text-black hover:bg-white/80"
            >
              Discuss your build <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/careers" className="motion-button inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white/60 hover:text-white">
              Looking to join? See open roles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
