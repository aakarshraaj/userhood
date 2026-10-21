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
    moment: "Listen",
    title: "Get close to the problem before getting attached to a solution.",
  },
  {
    moment: "Question",
    title: "Ask why, even when there is already a brief.",
  },
  {
    moment: "Explore",
    title: "Put the idea in someone’s hands. See what holds up.",
  },
  {
    moment: "Make",
    title: "Care about the last interaction as much as the first impression.",
  },
];

export default function About() {
  useSEO(getPageSEO("about"));

  return (
    <main data-page-id="about" className="min-h-screen bg-background-dark pt-28 selection:bg-primary selection:text-black md:pt-36">
      <section className="px-5 md:px-8" aria-labelledby="team-title">
        <div className="mx-auto max-w-[1440px]">
          <h1 id="team-title" className="max-w-5xl text-5xl font-black leading-[0.9] tracking-tighter text-white sm:text-6xl md:text-8xl lg:text-[92px]">
            Good people.<br />Strong opinions.
          </h1>

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
          <h2 id="rhythm-title" className="max-w-3xl text-4xl font-black leading-[0.94] tracking-tighter text-white md:text-7xl">
            A point of view comes with the team.
          </h2>

          <ol className="mt-12 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {workingRhythm.map((step) => (
              <li key={step.moment} className="flex min-h-[160px] items-end bg-white/[0.035] p-6 md:p-7">
                <h3 className="text-2xl font-bold leading-tight tracking-tight text-white">{step.title}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-band section-band-deep px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <h2 className="max-w-4xl text-4xl font-black leading-[0.94] tracking-tighter text-white sm:text-5xl md:text-7xl">
              Give us something to think about.
            </h2>
          </div>

          <div className="flex flex-col gap-3 md:col-span-4 md:items-start">
            <Link
              to="/?contact=true&source=about_footer"
              className="motion-button inline-flex min-h-[52px] items-center justify-center gap-3 bg-white px-7 py-4 text-base font-bold text-black hover:bg-white/80"
            >
              Let’s collaborate <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
              <a
                href="https://in.linkedin.com/company/userhood"
                target="_blank"
                rel="noopener noreferrer"
                className="motion-button inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white/60 hover:text-white"
              >
                LinkedIn <ExternalLink className="h-4 w-4" />
              </a>
              <Link to="/careers" className="motion-button inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white/60 hover:text-white">
                See open roles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
