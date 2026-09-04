import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "../utils/seo";

const principles = [
  {
    title: "One accountable team",
    detail:
      "Product, design, and engineering make decisions together. The people in the review are the people responsible for the work.",
  },
  {
    title: "Scope is a product decision",
    detail:
      "A twelve-week release only works when the boundary is real. We expose trade-offs early instead of burying them in a delivery plan.",
  },
  {
    title: "Proof beats theatre",
    detail:
      "Working software, clear reasoning, and observable user behaviour matter more than stage-managed progress or invented precision.",
  },
];

const team = [
  { name: "Kriti", role: "Co-founder · Product & Design", image: "/team/kriti.png" },
  { name: "Ashwin", role: "Co-founder · Engineering & Systems", image: "/team/ashwin.png" },
  { name: "Nishita", role: "Designer", image: "/team/nishita.png" },
  { name: "Priya", role: "Growth Lead", image: "/team/priya.png" },
  { name: "Somesh", role: "Product", image: "/team/somesh.png" },
  { name: "Uttkarsh", role: "Product", image: "/team/uttkarsh.png" },
  { name: "Priyanka", role: "Designer", image: "/team/priyanka.png" },
];

export default function About() {
  useSEO({
    title: "About Userhood — The Team Behind the 12-Week Build",
    description:
      "Meet the compact product, design, and engineering team behind Userhood's focused 12-week MVP engagements.",
    canonical: "https://userhood.in/about",
  });

  return (
    <main className="min-h-screen bg-background-dark pb-24 pt-28 sm:pt-32 md:pb-36 md:pt-40">
      <header className="px-5 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">[ STUDIO // ABOUT ]</div>
          <h1 className="mt-7 max-w-5xl text-5xl font-black leading-[0.9] tracking-tighter text-white sm:text-6xl md:text-8xl">
            One team.<br /><span className="text-primary">Both disciplines.</span>
          </h1>
          <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 md:mt-16 md:grid-cols-12 md:gap-14 md:pt-14">
            <p className="text-xl font-light leading-relaxed text-slate-300 md:col-span-7 md:text-2xl">
              Userhood exists because product quality collapses when design and engineering optimise for different outcomes.
            </p>
            <p className="text-base font-light leading-relaxed text-slate-400 md:col-span-5 md:text-lg">
              We are a compact studio built around shared accountability. Design serves comprehension and conviction. Engineering serves reliability and speed. Product judgment decides what belongs in the release.
            </p>
          </div>
        </div>
      </header>

      <section className="mt-20 border-y border-white/5 bg-[#08080a] px-5 py-20 md:mt-28 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">01 // How we work</div>
          <h2 className="mt-5 max-w-4xl text-4xl font-black tracking-tighter text-white md:text-6xl">
            The operating principles are deliberately unglamorous.
          </h2>

          <div className="mt-12 grid border-l border-t border-white/10 md:mt-16 md:grid-cols-3">
            {principles.map((principle, index) => (
              <motion.article
                key={principle.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="border-b border-r border-white/10 p-7 md:p-9"
              >
                <div className="font-mono text-xs text-primary">0{index + 1}</div>
                <h3 className="mt-8 text-2xl font-bold tracking-tight text-white">{principle.title}</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-slate-400 md:text-base">{principle.detail}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-10 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-4">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">02 // The team</div>
              <h2 className="mt-5 text-4xl font-black tracking-tighter text-white md:text-5xl">Small enough to stay close to the work.</h2>
              <p className="mt-6 text-base font-light leading-relaxed text-slate-400">
                These are the people behind the studio. Roles stay visible because a buyer should know what kind of team may be involved in the work.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:col-span-8 md:gap-x-7 md:gap-y-12">
              {team.map((member, index) => (
                <motion.article
                  key={member.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                >
                  <div className="aspect-square overflow-hidden border border-white/10 bg-surface">
                    <img
                      src={member.image}
                      alt={`${member.name}, ${member.role} at Userhood`}
                      className="h-full w-full object-cover grayscale transition duration-500 hover:grayscale-0"
                      loading="lazy"
                      decoding="async"
                      width="240"
                      height="240"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-white">{member.name}</h3>
                  <p className="mt-1 text-xs font-mono uppercase leading-relaxed tracking-[0.1em] text-white/40">{member.role}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[0.02] px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-5">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">03 // What you can expect</div>
            <h2 className="mt-5 text-4xl font-black tracking-tighter text-white md:text-5xl">We will tell you the uncomfortable thing early.</h2>
          </div>
          <div className="space-y-5 md:col-span-7">
            {[
              "If the release cannot responsibly fit inside twelve weeks, we will reduce it or say so.",
              "If AI adds cost without improving the product, we will not force it into the scope.",
              "If another team is a better fit for the problem, we would rather make that clear before a proposal.",
            ].map((statement) => (
              <div key={statement} className="flex items-start gap-4 border-b border-white/10 pb-5 text-base font-light leading-relaxed text-slate-300 md:text-lg">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <span>{statement}</span>
              </div>
            ))}

            <Link
              to="/?contact=true&source=about_page"
              className="mt-8 inline-flex min-h-[48px] items-center gap-3 font-mono text-sm font-bold uppercase tracking-[0.12em] text-primary transition-colors hover:text-white"
            >
              Start a direct conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
