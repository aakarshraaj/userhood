import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export interface CaseStudyDecision {
  title: string;
  detail: string;
}

export interface CaseStudyData {
  brand: string;
  category: string;
  title: string;
  summary: string;
  context: string;
  challenge: string;
  decisions: CaseStudyDecision[];
  documentedScope: string[];
  evidenceBoundary: string;
  trademarkNote: string;
}

interface CaseStudyLayoutProps {
  data: CaseStudyData;
  onContactClick: () => void;
}

export default function CaseStudyLayout({ data, onContactClick }: CaseStudyLayoutProps) {
  return (
    <main className="min-h-screen bg-background-dark pb-24 pt-28 sm:pt-32 md:pb-36 md:pt-40">
      <article>
        <header className="px-5 md:px-8">
          <div className="mx-auto max-w-[1200px]">
            <Link
              to="/#case-studies"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Back to selected work
            </Link>

            <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-8">
                <div className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  [ TEAM_EXPERIENCE // {data.category} ]
                </div>
                <h1 className="text-5xl font-black leading-[0.92] tracking-tighter text-white sm:text-6xl md:text-8xl">
                  {data.title}
                </h1>
              </div>

              <div className="md:col-span-4 md:self-end">
                <div className="border-l-2 border-primary/40 pl-5">
                  <div className="font-mono text-xs uppercase tracking-[0.16em] text-white/55">Organisation</div>
                  <div className="mt-2 text-xl font-bold text-white">{data.brand}</div>
                  <p className="mt-5 text-sm font-light leading-relaxed text-slate-400 md:text-base">{data.summary}</p>
                </div>
              </div>
            </div>

            <div className="mt-14 border border-primary/25 bg-primary/[0.04] p-6 md:mt-20 md:grid md:grid-cols-12 md:gap-10 md:p-8">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary md:col-span-3">Attribution note</div>
              <p className="mt-4 text-sm font-light leading-relaxed text-slate-300 md:col-span-9 md:mt-0 md:text-base">
                This page documents work and experience contributed by members of the team behind Userhood. It is not presented as a current Userhood studio engagement or client endorsement. Commercial details and client-confidential results are intentionally omitted.
              </p>
            </div>
          </div>
        </header>

        <section className="mt-20 border-y border-white/5 bg-[#08080a] px-5 py-20 md:mt-28 md:px-8 md:py-28">
          <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">01 // Context</div>
              <h2 className="mt-5 text-4xl font-black tracking-tighter text-white md:text-5xl">The product situation.</h2>
            </div>
            <div className="space-y-8 md:col-span-8">
              <p className="text-xl font-light leading-relaxed text-slate-300 md:text-2xl">{data.context}</p>
              <div className="border-l border-white/15 pl-6">
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-white/55">The central challenge</div>
                <p className="mt-3 text-base font-light leading-relaxed text-slate-400 md:text-lg">{data.challenge}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-8 border-b border-white/10 pb-10 md:grid-cols-12 md:items-end md:pb-14">
              <div className="md:col-span-8">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">02 // Product decisions</div>
                <h2 className="mt-5 text-4xl font-black tracking-tighter text-white md:text-6xl">Where the work earned its keep.</h2>
              </div>
              <p className="text-sm font-light leading-relaxed text-slate-400 md:col-span-4 md:text-base">
                The useful part of a case study is the reasoning: what complexity was removed, what was prioritised, and why.
              </p>
            </div>

            <ol>
              {data.decisions.map((decision, index) => (
                <motion.li
                  key={decision.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="grid gap-5 border-b border-white/10 py-9 md:grid-cols-12 md:gap-10 md:py-12"
                >
                  <div className="font-mono text-xs text-primary md:col-span-1">0{index + 1}</div>
                  <h3 className="text-2xl font-bold tracking-tight text-white md:col-span-4 md:text-3xl">{decision.title}</h3>
                  <p className="max-w-2xl text-sm font-light leading-relaxed text-slate-400 md:col-span-7 md:text-base">
                    {decision.detail}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-y border-white/5 bg-white/[0.02] px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">03 // What is documented</div>
              <h2 className="mt-5 text-4xl font-black tracking-tighter text-white md:text-5xl">The scope we can stand behind.</h2>
            </div>
            <div className="md:col-span-7">
              <ul className="grid gap-4 sm:grid-cols-2">
                {data.documentedScope.map((item) => (
                  <li key={item} className="flex items-start gap-3 border border-white/10 bg-background-dark/60 p-5 text-sm leading-relaxed text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-l-2 border-primary/40 pl-6">
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-white/55">Evidence boundary</div>
                <p className="mt-3 text-sm font-light leading-relaxed text-slate-400 md:text-base">{data.evidenceBoundary}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-24 text-center md:px-8 md:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Your product is different</div>
            <h2 className="mt-6 text-4xl font-black leading-tight tracking-tighter text-white sm:text-5xl md:text-7xl">
              Bring the problem.<br /><span className="text-primary">We will bring the questions.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-base font-light leading-relaxed text-slate-400 md:text-lg">
              A useful first conversation is about the release, the constraints, and what must be true in twelve weeks—not a rehearsed capability pitch.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContactClick}
              className="mt-10 inline-flex min-h-[52px] items-center justify-center gap-3 bg-primary px-8 py-4 font-mono text-sm font-bold text-black transition-colors hover:bg-white"
            >
              DISCUSS YOUR BUILD <ArrowRight className="h-4 w-4" />
            </motion.button>
            <p className="mt-12 text-xs font-light leading-relaxed text-white/55">{data.trademarkNote}</p>
          </div>
        </section>
      </article>
    </main>
  );
}
