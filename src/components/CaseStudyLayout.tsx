import type { CSSProperties, ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { PageId } from "../data/siteMetadata";
import { trackAnalyticsEvent } from "../utils/analytics";
import ProjectMedia, { type ProjectMediaSpec } from "./ProjectMedia";

export interface CaseStudyDecision {
  title: string;
  detail?: string;
  story?: {
    before: string;
    intervention: string;
    consequence: string;
  };
  media?: ProjectMediaSpec;
}

export interface CaseStudyFact {
  label: string;
  value: string;
}

export interface CaseStudyMetric {
  value: string;
  label: string;
  detail: string;
}

export interface CaseStudyOutcome {
  title: string;
  summary: string;
  metrics: CaseStudyMetric[];
}

export interface CaseStudyPerformanceMetric {
  value: string;
  label: string;
  definition: string;
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
  outcome?: CaseStudyOutcome;
  context: string;
  challenge: string;
  decisions: CaseStudyDecision[];
  documentedScope: string[];
  evidenceBoundary: string;
  performanceMetrics?: CaseStudyPerformanceMetric[];
  liveProduct?: {
    label: string;
    href: string;
  };
  trademarkNote?: string;
  accent?: string;
}

interface CaseStudyLayoutProps {
  data: CaseStudyData;
  onContactClick: () => void;
  signatureStory?: ReactNode;
}

export default function CaseStudyLayout({ data, onContactClick, signatureStory }: CaseStudyLayoutProps) {
  const isTeamExperience = data.relationship === "Team experience";
  const hasOutcome = Boolean(data.outcome);

  return (
    <main
      data-page-id={data.pageId}
      className="min-h-screen bg-background-dark pb-20 pt-28 sm:pt-32 md:pb-28 md:pt-36"
      style={{ "--color-primary": data.accent ?? "#00f5ff" } as CSSProperties}
    >
      <article>
        <header className="px-5 md:px-8">
          <div className="mx-auto max-w-[1280px]">
            <Link
              to="/work"
              className="inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-white/75 transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Back to selected work
            </Link>

            <div className="mt-8 grid items-center gap-9 md:mt-10 md:grid-cols-12 md:gap-10 lg:gap-14">
              <div className="min-w-0 md:col-span-6 lg:col-span-7">
                <div className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                  [ {isTeamExperience ? "Attributed team experience" : data.relationship} // {data.category} ]
                </div>
                {isTeamExperience && (
                  <div className="mb-6 w-fit border border-white/15 bg-white/[0.025] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.13em] text-white/70">
                    Not a Userhood client engagement
                  </div>
                )}
                <h1 className="max-w-5xl break-words text-[clamp(3.15rem,6vw,5.7rem)] font-black leading-[0.92] tracking-tighter text-white">
                  {data.title}
                </h1>
                <div className="mt-7 max-w-2xl border-l-2 border-primary/50 pl-5 md:mt-8">
                  <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/70">
                    {isTeamExperience ? "Organisation" : "Product"}
                  </div>
                  <div className="mt-2 text-xl font-bold text-white md:text-2xl">{data.brand}</div>
                  <p className="mt-4 max-w-xl text-base font-normal leading-relaxed text-slate-300">{data.summary}</p>
                  {data.liveProduct && (
                    <a
                      href={data.liveProduct.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackAnalyticsEvent("live_product_open", {
                          source: `case_study_${data.pageId}`,
                          organisation: data.brand,
                        })
                      }
                      className="motion-button group mt-7 inline-flex min-h-12 items-center gap-5 border border-white/15 bg-white/[0.025] px-5 py-3 text-white hover:border-primary hover:bg-primary hover:text-black"
                      aria-label={`${data.liveProduct.label} (opens in a new tab)`}
                    >
                      <span>
                        <span className="block font-mono text-[10px] uppercase tracking-[0.16em] opacity-60">Live product</span>
                        <span className="mt-0.5 block text-sm font-bold">{data.liveProduct.label}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="min-w-0 md:col-span-6 lg:col-span-5">
                <ProjectMedia project={data.brand} media={data.heroMedia} accent={data.accent} />
              </div>
            </div>

            <dl className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {data.facts.map((fact) => (
                <div key={fact.label} className="content-card px-5 py-5">
                  <dt className="font-mono text-xs uppercase tracking-[0.12em] text-white/70">{fact.label}</dt>
                  <dd className="mt-2 text-sm font-medium leading-relaxed text-white md:text-base">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="content-card mt-3 grid p-6 md:grid-cols-12 md:gap-10 md:p-8">
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-primary md:col-span-3">
                {isTeamExperience ? "Attribution note" : "Evidence note"}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 md:col-span-9 md:mt-0 md:text-base">{data.proofNote}</p>
            </div>
          </div>
        </header>

        {data.outcome && (
          <section className="section-band section-band-deep mt-16 px-5 py-20 md:mt-24 md:px-8 md:py-28" aria-labelledby={`${data.pageId}-outcome-title`}>
            <div className="motion-reveal mx-auto max-w-[1280px]">
              <div className="grid gap-8 md:grid-cols-12 md:items-end">
                <div className="md:col-span-7">
                  <div className="font-mono text-xs uppercase tracking-[0.16em] text-primary">01 // Outcome snapshot</div>
                  <h2 id={`${data.pageId}-outcome-title`} className="mt-5 max-w-4xl text-4xl font-black leading-[0.96] tracking-tighter text-white md:text-6xl">
                    {data.outcome.title}
                  </h2>
                </div>
                <p className="max-w-xl text-base leading-relaxed text-slate-300 md:col-span-5 md:justify-self-end md:text-lg">
                  {data.outcome.summary}
                </p>
              </div>

              <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {data.outcome.metrics.map((metric) => (
                  <div key={metric.label} className="content-card p-6 md:min-h-[235px] md:p-8">
                    <dd className="text-5xl font-black leading-none tracking-tighter md:text-7xl" style={{ color: data.accent ?? "#00f5ff" }}>
                      {metric.value}
                    </dd>
                    <dt className="mt-7 text-base font-bold leading-tight text-white md:text-lg">{metric.label}</dt>
                    <p className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-white/50">{metric.detail}</p>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {signatureStory}

        <section className={`${hasOutcome ? "" : "mt-16 md:mt-24"} section-band section-band-raised px-5 py-20 md:px-8 md:py-28`}>
          <div className="motion-reveal mx-auto grid max-w-[1280px] gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-primary">{hasOutcome ? "02" : "01"} // The problem</div>
              <h2 className="mt-5 text-4xl font-black tracking-tighter text-white md:text-5xl">What the product had to overcome.</h2>
            </div>
            <div className="space-y-8 md:col-span-8">
              <p className="text-xl font-normal leading-relaxed text-slate-200 md:text-2xl">{data.context}</p>
              <div className="content-card border-l-2 border-l-primary/55 p-6 md:p-8">
                <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/65">The non-negotiable constraint</div>
                <p className="mt-3 text-base font-normal leading-relaxed text-slate-300 md:text-lg">{data.challenge}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-band section-band-deep px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-[1280px]">
            <div className="motion-reveal mb-10 grid gap-8 md:mb-14 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
                  {hasOutcome ? "03" : "02"} // {isTeamExperience ? "Product reasoning" : "The intervention"}
                </div>
                <h2 className="mt-5 text-4xl font-black tracking-tighter text-white md:text-6xl">
                  {isTeamExperience ? "The principles carried into the work." : "The decisions that changed the product."}
                </h2>
              </div>
              <p className="text-base font-normal leading-relaxed text-slate-300 md:col-span-4">
                {isTeamExperience
                  ? "The decision logic is public. Client-confidential execution detail and outcomes are not."
                  : "Four constraints. Four deliberate moves. Four consequences."}
              </p>
            </div>

            <ol className="grid gap-5">
              {data.decisions.map((decision, index) => (
                <li key={decision.title} className="content-card motion-reveal p-6 md:p-8 lg:p-10">
                  {decision.story ? (
                    <div className="grid gap-6 md:grid-cols-12 md:gap-8">
                      <div className="font-mono text-xs text-primary md:col-span-1">0{index + 1}</div>
                      <h3 className="max-w-sm text-2xl font-bold tracking-tight text-white md:col-span-3 md:text-3xl">{decision.title}</h3>
                      <dl className="grid gap-3 sm:grid-cols-3 md:col-span-8">
                        {([
                          ["Before", decision.story.before],
                          ["Intervention", decision.story.intervention],
                          ["Consequence", decision.story.consequence],
                        ] as const).map(([label, value]) => (
                          <div key={label} className="border border-white/10 bg-black/25 p-5 md:p-6">
                            <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">{label}</dt>
                            <dd className="mt-4 text-sm leading-relaxed text-slate-300">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-12 md:gap-10">
                      <div className="font-mono text-xs text-primary md:col-span-1">0{index + 1}</div>
                      <h3 className="text-2xl font-bold tracking-tight text-white md:col-span-4 md:text-3xl">{decision.title}</h3>
                      {decision.detail && <p className="max-w-2xl text-base font-normal leading-relaxed text-slate-300 md:col-span-7">{decision.detail}</p>}
                    </div>
                  )}
                  {decision.media && (
                    <ProjectMedia
                      project={data.brand}
                      media={decision.media}
                      accent={data.accent}
                      compact
                      className={decision.story ? "mt-8 md:ml-[33.333%] md:mt-10 md:w-[66.667%]" : "mt-8 md:ml-[8.333%] md:mt-10 md:w-[91.667%]"}
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-band section-band-raised px-5 py-20 md:px-8 md:py-28">
          <div className="motion-reveal mx-auto grid max-w-[1280px] gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
                {hasOutcome ? "04" : "03"} // {isTeamExperience ? "Contribution scope" : "The shipped system"}
              </div>
              <h2 className="mt-5 text-4xl font-black tracking-tighter text-white md:text-5xl">
                {isTeamExperience ? "What this experience covered." : "What actually exists."}
              </h2>
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

              <div className="content-card mt-8 border-l-2 border-l-primary/50 p-6">
                <div className="font-mono text-xs uppercase tracking-[0.14em] text-white/65">Evidence boundary</div>
                <p className="mt-3 text-base font-normal leading-relaxed text-slate-300">{data.evidenceBoundary}</p>
              </div>
            </div>
          </div>
        </section>

        {data.performanceMetrics && data.performanceMetrics.length > 0 && (
          <section className="section-band section-band-deep px-5 py-20 md:px-8 md:py-28" aria-labelledby={`${data.pageId}-measurement-title`}>
            <div className="motion-reveal mx-auto max-w-[1280px]">
              <div className="grid gap-8 md:grid-cols-12">
                <div className="md:col-span-5">
                  <div className="font-mono text-xs uppercase tracking-[0.16em] text-primary">05 // Outcome measurement</div>
                  <h2 id={`${data.pageId}-measurement-title`} className="mt-5 text-4xl font-black leading-[0.96] tracking-tighter text-white md:text-6xl">
                    The numbers this product must move.
                  </h2>
                </div>
                <div className="md:col-span-7 md:pt-1">
                  <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
                    Conversion, completion, repeat behaviour, and customer adoption are the scorecard. Vanity traffic and a pile of shipped screens are not.
                  </p>
                </div>
              </div>

              <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {data.performanceMetrics.map((metric) => (
                  <div key={metric.label} className="content-card relative min-h-[245px] overflow-hidden p-6 md:p-8">
                    <dd className="pt-2 text-5xl font-black leading-none tracking-tighter text-white md:text-6xl">{metric.value}</dd>
                    <dt className="mt-7 text-base font-bold leading-tight text-white">{metric.label}</dt>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{metric.definition}</p>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        <section className="px-5 py-20 text-center md:px-8 md:py-28">
          <div className="content-card content-card-accent motion-reveal mx-auto max-w-5xl px-6 py-14 sm:px-10 md:px-16 md:py-20">
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Your product is different</div>
            <h2 className="mt-6 text-4xl font-black leading-tight tracking-tighter text-white sm:text-5xl md:text-7xl">
              Bring the problem.<br /><span className="text-primary">We will bring the questions.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-base font-normal leading-relaxed text-slate-300 md:text-lg">
              A useful first conversation focuses on the release, the constraints, and what must be true in twelve weeks. A rehearsed capability pitch can wait.
            </p>
            <button
              type="button"
              onClick={onContactClick}
              className="motion-button mt-10 inline-flex min-h-[52px] items-center justify-center gap-3 bg-primary px-8 py-4 text-base font-bold text-black hover:bg-white"
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
