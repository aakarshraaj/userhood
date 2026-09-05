import type { CSSProperties } from "react";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import BrandIdentity from "../components/BrandIdentity";
import TeamAvatar from "../components/TeamAvatar";
import { getPageSEO } from "../data/siteMetadata";
import { useSEO } from "../utils/seo";

const founders = [
  {
    name: "Kriti",
    role: "Co-founder · Design and Product Engineering",
    responsibility:
      "Owns problem framing, the release boundary, core journeys, the interface system, and the product decisions that keep the build coherent.",
  },
  {
    name: "Ashwin",
    role: "Co-founder · Product and Experience",
    responsibility:
      "Owns architecture, engineering quality, integrations, deployment, and the technical decisions the product must survive after handover.",
  },
];

const team = [
  { name: "Nishita", role: "Designer" },
  { name: "Priya", role: "Growth Lead" },
  { name: "Somesh", role: "Product" },
  { name: "Uttkarsh", role: "Product" },
  { name: "Priyanka", role: "Designer" },
];

const cadence = [
  {
    moment: "Before kickoff",
    title: "The founders interrogate the scope.",
    detail:
      "The product thesis, release boundary, highest-risk assumptions, access, and decision owner are made explicit before the delivery clock starts.",
  },
  {
    moment: "Every week",
    title: "You review the working product.",
    detail:
      "Product, design, and engineering decisions are made in one review. Progress is demonstrated in functioning software wherever the build allows it.",
  },
  {
    moment: "Between reviews",
    title: "The decision loop stays direct.",
    detail:
      "Questions reach the person accountable for the choice. There is no account-management layer translating the work in either direction.",
  },
  {
    moment: "At release",
    title: "The system leaves with context.",
    detail:
      "Release readiness, analytics, documentation, and handover are part of the build so the next team is not forced to reverse-engineer our decisions.",
  },
];

const commitments = [
  "If the responsible release cannot fit inside twelve weeks, we will reduce it or say so before kickoff.",
  "If AI adds cost without improving the product outcome, we will not force it into the scope.",
  "If another team or engagement is a better fit, we would rather make that clear before a proposal.",
];

export default function About() {
  useSEO(getPageSEO("about"));

  return (
    <main data-page-id="about" className="min-h-screen bg-background-dark pb-24 pt-28 selection:bg-primary selection:text-black md:pb-28 md:pt-36">
      <header className="px-5 md:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Studio // founder accountability</div>

          <div className="mt-6 grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-6">
              <h1 className="text-5xl font-black leading-[0.88] tracking-tighter text-white sm:text-6xl md:text-8xl lg:text-[92px]">
                The founders<br />you meet stay<br /><span className="text-primary">on the build.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg font-normal leading-relaxed text-slate-200 md:text-xl">
                Userhood is a compact product studio built around shared accountability. Product design and engineering own the same release, the same constraints, and the same weekly decisions.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/?contact=true&source=about_hero" className="inline-flex min-h-[50px] items-center justify-center gap-3 bg-primary px-6 py-4 text-sm font-bold text-black transition-colors hover:bg-white">
                  Discuss your 12-week build <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="https://in.linkedin.com/company/userhood" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[50px] items-center justify-center gap-3 border border-white/15 px-6 py-4 text-sm font-bold text-white transition-colors hover:border-primary hover:text-primary">
                  Userhood on LinkedIn <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-6">
              {founders.map((founder) => (
                <article key={founder.name} className="content-card p-3 sm:p-4">
                  <div className="aspect-[5/4] overflow-hidden border-b border-white/10 bg-black">
                    <TeamAvatar name={founder.name} />
                  </div>
                  <div className="px-2 pb-2 pt-5 md:px-3 md:pb-3 md:pt-6">
                    <h2 className="text-2xl font-black tracking-tight text-white">{founder.name}</h2>
                    <p className="mt-1 text-sm font-bold text-primary">{founder.role}</p>
                    <div className="mt-5 bg-black/25 p-4">
                      <div className="font-mono text-xs uppercase tracking-[0.12em] text-white/55">Owns during an engagement</div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">{founder.responsibility}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="content-card mt-12 grid gap-4 p-5 md:grid-cols-[auto_1fr] md:items-center md:gap-8">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/60">Work shown</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-white/70 sm:text-sm md:justify-end">
              <span className="text-primary">Product builds: Rentnama + Tirch</span>
              <span className="hidden text-primary/40 sm:inline">//</span>
              <span>Attributed team experience: Hyundai + Mitsubishi Motors</span>
            </div>
          </div>
        </div>
      </header>

      <section className="mt-20 bg-primary px-5 py-16 text-black md:mt-24 md:px-8 md:py-20" aria-labelledby="cadence-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 border-b border-black/20 pb-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <div className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-black/60">01 // Founder-led in practice</div>
              <h2 id="cadence-title" className="mt-4 max-w-5xl text-4xl font-black leading-[0.92] tracking-tighter md:text-7xl">
                An operating constraint.<br />Not a sales line.
              </h2>
            </div>
            <p className="max-w-lg text-base font-medium leading-relaxed text-black/75 md:col-span-4 md:justify-self-end md:text-lg">
              Founder involvement matters only if it changes how decisions are made. This is where it appears in a typical engagement.
            </p>
          </div>

          <ol className="grid gap-px bg-black/20 md:grid-cols-2 xl:grid-cols-4">
            {cadence.map((step, index) => (
              <li key={step.moment} className="bg-primary py-8 md:px-7">
                <div className="flex items-center justify-between gap-5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-black/55">
                  <span>{step.moment}</span>
                  <span>0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-2xl font-black leading-tight tracking-tight text-black">{step.title}</h3>
                <p className="mt-4 text-sm font-medium leading-relaxed text-black/75">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-band section-band-deep px-5 py-20 md:px-8 md:py-28" aria-labelledby="proof-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">02 // Relevant product work</div>
              <h2 id="proof-title" className="mt-4 text-4xl font-black leading-[0.94] tracking-tighter text-white md:text-6xl">
                Inspect the work.<br /><span className="text-primary">Understand the decisions.</span>
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-slate-300 md:col-span-5 md:justify-self-end md:text-lg">
              Current product builds and earlier team experience are useful forms of evidence, but they are not the same claim. We label both.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="content-card p-7 md:p-9">
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-primary">Product builds</div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link
                  to="/case-study/rentnama"
                  className="brand-stage group flex min-h-[132px] flex-col justify-between p-5 transition-colors"
                  style={{ "--work-accent": "#d7ff4f" } as CSSProperties}
                >
                  <BrandIdentity brand="Rentnama" size="compact" />
                  <span className="flex items-center justify-between text-sm text-slate-300">Rental intelligence <ArrowRight className="h-4 w-4" /></span>
                </Link>
                <Link
                  to="/case-study/tirch"
                  className="brand-stage group flex min-h-[132px] flex-col justify-between p-5 transition-colors"
                  style={{ "--work-accent": "#d2694a" } as CSSProperties}
                >
                  <BrandIdentity brand="Tirch" size="compact" />
                  <span className="flex items-center justify-between text-sm text-slate-300">End-to-end commerce <ArrowRight className="h-4 w-4" /></span>
                </Link>
              </div>
            </div>

            <div className="content-card p-7 md:p-9">
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/60">Attributed team experience</div>
              <p className="mt-3 text-xs leading-relaxed text-white/55">Not Userhood engagements or client endorsements. No outcome claims are made.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link to="/case-study/hyundai" className="group flex min-h-[112px] flex-col justify-between border border-white/10 bg-black/25 p-5 transition-colors hover:border-primary">
                  <span className="text-xl font-bold text-white group-hover:text-primary">Hyundai Global</span>
                  <span className="flex items-center justify-between text-sm text-slate-300">Automotive commerce <ArrowRight className="h-4 w-4" /></span>
                </Link>
                <Link to="/case-study/mitsubishi" className="group flex min-h-[112px] flex-col justify-between border border-white/10 bg-black/25 p-5 transition-colors hover:border-primary">
                  <span className="text-xl font-bold text-white group-hover:text-primary">Mitsubishi Motors</span>
                  <span className="flex items-center justify-between text-sm text-slate-300">Connected ownership <ArrowRight className="h-4 w-4" /></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band section-band-raised px-5 py-20 md:px-8 md:py-28" aria-labelledby="team-title">
        <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-4">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">03 // The wider team</div>
            <h2 id="team-title" className="mt-4 text-4xl font-black leading-[0.95] tracking-tighter text-white md:text-5xl">Specialists join around the release.</h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-300">
              Product, design, engineering, and growth capacity changes with the work. Ownership does not: the founders remain accountable for the direction and delivery model.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-6 self-start sm:grid-cols-3 md:col-span-8 md:grid-cols-3 md:gap-x-5 xl:grid-cols-5">
            {team.map((member) => (
              <article key={member.name} className="content-card p-2 pb-4">
                <div className="aspect-square overflow-hidden border border-white/10 bg-surface">
                  <TeamAvatar name={member.name} />
                </div>
                <h3 className="mt-4 px-2 text-lg font-bold text-white">{member.name}</h3>
                <p className="mt-1 px-2 text-sm leading-relaxed text-white/70">{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band section-band-deep px-5 py-20 md:px-8 md:py-28" aria-labelledby="commitments-title">
        <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-5">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">04 // What you can expect</div>
            <h2 id="commitments-title" className="mt-4 text-4xl font-black leading-[0.95] tracking-tighter text-white md:text-6xl">
              We will tell you the uncomfortable thing early.
            </h2>
          </div>

          <div className="md:col-span-7">
            <div className="grid gap-3">
              {commitments.map((commitment) => (
                <div key={commitment} className="content-card flex items-start gap-4 p-5 text-base leading-relaxed text-slate-200 md:p-6 md:text-lg">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>{commitment}</span>
                </div>
              ))}
            </div>

            <Link to="/?contact=true&source=about_footer" className="mt-8 inline-flex min-h-[52px] items-center gap-3 bg-primary px-7 py-4 text-base font-bold text-black transition-colors hover:bg-white">
              Discuss your 12-week build <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
