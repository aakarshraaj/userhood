import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { PageId } from "../data/siteMetadata";
import ProjectMedia, { type ProjectMediaSpec } from "./ProjectMedia";

export interface CaseStudyDecision {
  title: string;
  detail: string;
  media?: ProjectMediaSpec;
}

export interface CaseStudyFact {
  label: string;
  value: string;
}

export interface CaseStudyData {
  pageId: PageId;
  brand: string;
  category: string;
  relationship: "Product build" | "Team experience";
  title: string;
  summary: string;
  facts: CaseStudyFact[];
  heroMedia: ProjectMediaSpec;
  proofNote: string;
  context: string;
  challenge: string;
  decisions: CaseStudyDecision[];
  documentedScope: string[];
  evidenceBoundary: string;
  trademarkNote?: string;
  accent?: string;
}

interface CaseStudyLayoutProps {
  data: CaseStudyData;
  onContactClick: () => void;
}

export default function CaseStudyLayout({ data, onContactClick }: CaseStudyLayoutProps) {
  const isTeamExperience = data.relationship === "Team experience";

  return (
    <main data-page-id={data.pageId} className="min-h-screen bg-background-dark pb-20 pt-28 sm:pt-32 md:pb-28 md:pt-36">
      <article>
        <header className="px-5 md:px-8">
          <div className="mx-auto max-w-[1280px]">
            <Link
              to="/work"
              className="inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-white/75 transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Back to selected work
            </Link>

            <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-8">
                <div className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                  [ {data.relationship} // {data.category} ]
                </div>
                <h1 className="max-w-5xl text-5xl font-black leading-[0.94] tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl">
                  {data.title}
                </h1>
              </div>

              <div className="md:col-span-4 md:self-end">
                <div className="border-l-2 border-primary/50 pl-5">
                  <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/70">
                    {isTeamExperience ? "Organisation" : "Product"}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-white">{data.brand}</div>
                  <p className="mt-5 text-base font-normal leading-relaxed text-slate-300">{data.summary}</p>
                </div>
              </div>
            </div>

            <dl className="mt-12 grid border-y border-white/10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {data.facts.map((fact) => (
                <div key={fact.label} className="border-white/10 px-0 py-5 sm:px-5 sm:first:pl-0 sm:[&:nth-child(even)]:border-l lg:border-l lg:first:border-l-0 lg:last:pr-0">
                  <dt className="font-mono text-xs uppercase tracking-[0.12em] text-white/70">{fact.label}</dt>
                  <dd className="mt-2 text-sm font-medium leading-relaxed text-white md:text-base">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <ProjectMedia project={data.brand} media={data.heroMedia} accent={data.accent} className="mt-10 md:mt-14" />

            <div className="grid border-b border-white/10 py-6 md:grid-cols-12 md:gap-10 md:py-8">
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-primary md:col-span-3">
                {isTeamExperience ? "Attribution note" : "Evidence note"}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 md:col-span-9 md:mt-0 md:text-base">{data.proofNote}</p>
            </div>
          </div>
        </header>

        <section className="mt-16 border-y border-white/5 bg-[#08080a] px-5 py-16 md:mt-24 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-primary">01 // Context</div>
              <h2 className="mt-5 text-4xl font-black tracking-tighter text-white md:text-5xl">The product situation.</h2>
            </div>
            <div className="space-y-8 md:col-span-8">
              <p className="text-xl font-normal leading-relaxed text-slate-200 md:text-2xl">{data.context}</p>
              <div className="border-l border-white/20 pl-6">
                <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/65">The central challenge</div>
                <p className="mt-3 text-base font-normal leading-relaxed text-slate-300 md:text-lg">{data.challenge}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-8 border-b border-white/10 pb-10 md:grid-cols-12 md:items-end md:pb-12">
              <div className="md:col-span-8">
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-primary">02 // Product decisions</div>
                <h2 className="mt-5 text-4xl font-black tracking-tighter text-white md:text-6xl">Where the work earned its keep.</h2>
              </div>
              <p className="text-base font-normal leading-relaxed text-slate-300 md:col-span-4">
                The useful part of a case study is the reasoning, the constraint, and the product consequence—not a wall of polished screens.
              </p>
            </div>

            <ol>
              {data.decisions.map((decision, index) => (
                <li key={decision.title} className="border-b border-white/10 py-10 md:py-14">
                  <div className="grid gap-6 md:grid-cols-12 md:gap-10">
                    <div className="font-mono text-xs text-primary md:col-span-1">0{index + 1}</div>
                    <h3 className="text-2xl font-bold tracking-tight text-white md:col-span-4 md:text-3xl">{decision.title}</h3>
                    <p className="max-w-2xl text-base font-normal leading-relaxed text-slate-300 md:col-span-7">{decision.detail}</p>
                  </div>
                  {decision.media && (
                    <ProjectMedia
                      project={data.brand}
                      media={decision.media}
                      accent={data.accent}
                      compact
                      className="mt-8 md:ml-[8.333%] md:mt-10"
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-y border-white/5 bg-white/[0.025] px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-primary">03 // Verifiable scope</div>
              <h2 className="mt-5 text-4xl font-black tracking-tighter text-white md:text-5xl">What exists—not what a pitch deck implies.</h2>
            </div>
            <div className="md:col-span-7">
              <ul className="grid gap-3 sm:grid-cols-2">
                {data.documentedScope.map((item) => (
                  <li key={item} className="flex items-start gap-3 border border-white/10 bg-background-dark/60 p-5 text-sm leading-relaxed text-slate-200">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-l-2 border-primary/50 pl-6">
                <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/65">Evidence boundary</div>
                <p className="mt-3 text-base font-normal leading-relaxed text-slate-300">{data.evidenceBoundary}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 text-center md:px-8 md:py-28">
          <div className="mx-auto max-w-4xl">
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Your product is different</div>
            <h2 className="mt-6 text-4xl font-black leading-tight tracking-tighter text-white sm:text-5xl md:text-7xl">
              Bring the problem.<br /><span className="text-primary">We will bring the questions.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-base font-normal leading-relaxed text-slate-300 md:text-lg">
              A useful first conversation is about the release, the constraints, and what must be true in twelve weeks—not a rehearsed capability pitch.
            </p>
            <button
              type="button"
              onClick={onContactClick}
              className="mt-10 inline-flex min-h-[52px] items-center justify-center gap-3 bg-primary px-8 py-4 text-base font-bold text-black transition-colors hover:bg-white"
            >
              Discuss your 12-week build <ArrowRight className="h-4 w-4" />
            </button>
            {data.trademarkNote && <p className="mt-12 text-xs leading-relaxed text-white/70">{data.trademarkNote}</p>}
          </div>
        </section>
      </article>
    </main>
  );
}
