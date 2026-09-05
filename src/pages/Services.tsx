import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getPageSEO, SITE_METADATA } from "../data/siteMetadata";
import { useSEO } from "../utils/seo";

interface Engagement {
  id: string;
  situation: string;
  title: string;
  duration: string;
  description: string;
  fit: string[];
  included: string[];
  clientRole: string;
  endState: string;
  primary?: boolean;
}

const engagements: Engagement[] = [
  {
    id: "launch",
    situation: "Launch a new product",
    title: "The 12-Week MVP Build",
    duration: "12 weeks after scope",
    description:
      "One senior team takes a deliberately bounded release from product brief to production. Product direction, design, engineering, and useful AI move against the same weekly decisions.",
    fit: [
      "A funded startup with a real release window",
      "A founder or product owner available for weekly decisions",
      "A first release that can be sharply scoped",
      "A team that wants one accountable delivery partner",
    ],
    included: [
      "Product brief, risk map, and release boundary",
      "Core journeys, interface system, and working foundation",
      "Full-stack production build and integrations",
      "Deployment, analytics, documentation, and handover",
    ],
    clientRole:
      "One decision-maker joins weekly product reviews, clears domain questions and access, and protects the agreed release boundary with us.",
    endState:
      "A production release, launch data, a documented system, and clear evidence for the next product decision.",
    primary: true,
  },
  {
    id: "rescue",
    situation: "Recover a stuck product",
    title: "Product Rescue",
    duration: "2–4 weeks",
    description:
      "A focused intervention for a live or half-built product whose UX, architecture, or release process is blocking progress. The first job is diagnosis and a defensible recovery sequence. A cosmetic redesign alone will not fix it.",
    fit: [
      "The core journey is confusing, fragile, or unfinished",
      "Design and engineering disagree on where the problem lives",
      "A rewrite is being discussed without enough evidence",
    ],
    included: [
      "Core-journey and interface audit",
      "Architecture, codebase, and delivery-risk review",
      "Decision workshop and intervention priorities",
      "Recovery scope with sequencing and ownership",
    ],
    clientRole:
      "Provide access to the product, repository, analytics, and the people who understand the operational constraints.",
    endState:
      "A shared diagnosis, a sequenced recovery plan, and a clear decision on repair, rebuild, or release-boundary reduction.",
  },
  {
    id: "extend",
    situation: "Extend a live product",
    title: "Post-Launch Product Support",
    duration: "Scoped by release",
    description:
      "A product-and-engineering loop for teams with a live foundation and a specific next outcome. Each cycle is organised around a release, not a vague bucket of retained hours.",
    fit: [
      "The product is live and its next constraint is visible",
      "Usage evidence can guide what ships next",
      "The internal team needs senior capacity across disciplines",
    ],
    included: [
      "Usage and opportunity review",
      "Release scope and success signals",
      "Design, engineering, and useful AI integration",
      "Instrumentation, release support, and decision log",
    ],
    clientRole:
      "Bring the product context, customer signal, and one empowered owner for prioritisation and release decisions.",
    endState:
      "The agreed release is live and measured, with the product system and next decision left clearer than we found them.",
  },
];

const capabilities = [
  {
    title: "Product direction",
    detail: "Problem framing, user journeys, scope, and the release decisions that prevent expensive drift.",
  },
  {
    title: "Product design",
    detail: "Interaction design, prototypes, content hierarchy, and interface systems made for real software.",
  },
  {
    title: "Engineering",
    detail: "Frontend, backend, APIs, infrastructure, reliability, analytics, and a maintainable handover.",
  },
  {
    title: "AI and launch support",
    detail: "Models, retrieval, automation, positioning, and launch assets only where the product outcome needs them.",
  },
];

const faqs = [
  {
    q: "Is twelve weeks a guarantee for any product?",
    a: "No. It is the delivery window for a sharply scoped release after scope, responsibilities, and commercial terms are agreed. If the responsible first release cannot fit, we reduce it or recommend a different engagement before kickoff.",
  },
  {
    q: "Can you join an existing team or codebase?",
    a: "Yes. Product Rescue begins with evidence from the product, codebase, delivery process, and users. Post-launch support can then own a defined release alongside the internal team.",
  },
  {
    q: "Do you build AI-native products?",
    a: "Yes, when AI improves a defined user or operational outcome. We work with model integrations, retrieval, automation, evaluation, and agentic workflows. When AI adds cost without useful leverage, we recommend the simpler system.",
  },
  {
    q: "Do you sell branding or marketing separately?",
    a: "Not as a disconnected production menu. Positioning, identity, launch pages, and go-to-market assets support a product engagement when they are necessary to make the release understandable and usable.",
  },
  {
    q: "How quickly can you start?",
    a: "Availability is confirmed during the fit conversation. No delivery clock starts until the release boundary, access, decision owner, responsibilities, and commercial terms are explicit.",
  },
];

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Userhood Engagements",
  itemListElement: engagements.map((engagement, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: engagement.title,
      description: engagement.description,
      provider: {
        "@type": "Organization",
        name: "Userhood",
        url: SITE_METADATA.siteUrl,
      },
    },
  })),
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

function EngagementDetails({ engagement }: { engagement: Engagement }) {
  const isLaunch = engagement.primary === true;

  return (
    <section
      id={engagement.id}
      aria-labelledby={`${engagement.id}-title`}
      className={isLaunch ? "scroll-mt-24 bg-primary p-7 text-black shadow-[0_28px_90px_rgba(0,245,255,0.12)] sm:p-10 md:p-12 lg:p-14" : "content-card scroll-mt-24 p-7 sm:p-9 lg:p-10"}
    >
      <div className={`flex flex-col gap-6 border-b pb-8 sm:flex-row sm:items-start sm:justify-between ${isLaunch ? "border-black/20" : "border-white/10"}`}>
        <div>
          <div className={`font-mono text-xs font-bold uppercase tracking-[0.16em] ${isLaunch ? "text-black/60" : "text-primary"}`}>
            {engagement.situation}
          </div>
          <h2 id={`${engagement.id}-title`} className={`mt-4 max-w-4xl text-4xl font-black leading-[0.94] tracking-tighter sm:text-5xl ${isLaunch ? "text-black md:text-7xl" : "text-white md:text-5xl"}`}>
            {engagement.title}
          </h2>
        </div>
        <div className={`w-fit shrink-0 border px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] ${isLaunch ? "border-black/25 bg-black text-primary" : "border-white/15 text-white"}`}>
          {engagement.duration}
        </div>
      </div>

      <p className={`max-w-4xl py-8 text-lg font-medium leading-relaxed md:text-xl ${isLaunch ? "text-black" : "text-slate-200"}`}>
        {engagement.description}
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className={isLaunch ? "border border-black/20 bg-black/[0.045] p-6" : "border border-white/10 bg-black/25 p-6"}>
          <h3 className={`font-mono text-xs font-bold uppercase tracking-[0.14em] ${isLaunch ? "text-black/60" : "text-white/60"}`}>Strong fit when</h3>
          <ul className="mt-5 space-y-4">
            {engagement.fit.map((item) => (
              <li key={item} className={`flex items-start gap-3 text-sm font-medium leading-relaxed md:text-base ${isLaunch ? "text-black" : "text-slate-300"}`}>
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={isLaunch ? "border border-black/20 bg-black/[0.045] p-6" : "border border-white/10 bg-white/[0.035] p-6"}>
          <h3 className={`font-mono text-xs font-bold uppercase tracking-[0.14em] ${isLaunch ? "text-black/60" : "text-white/60"}`}>What moves</h3>
          <ul className="mt-5 space-y-4">
            {engagement.included.map((item) => (
              <li key={item} className={`flex items-start gap-3 text-sm font-medium leading-relaxed md:text-base ${isLaunch ? "text-black" : "text-slate-300"}`}>
                <span aria-hidden="true">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className={isLaunch ? "border border-black/20 p-5" : "border border-white/10 bg-black/20 p-5"}>
          <h3 className={`font-mono text-xs font-bold uppercase tracking-[0.14em] ${isLaunch ? "text-black/60" : "text-white/60"}`}>Your responsibility</h3>
          <p className={`mt-3 text-sm font-medium leading-relaxed md:text-base ${isLaunch ? "text-black" : "text-slate-300"}`}>{engagement.clientRole}</p>
        </div>
        <div className={isLaunch ? "border border-black/20 p-5" : "border border-white/10 bg-black/20 p-5"}>
          <h3 className={`font-mono text-xs font-bold uppercase tracking-[0.14em] ${isLaunch ? "text-black/60" : "text-white/60"}`}>End state</h3>
          <p className={`mt-3 text-sm font-medium leading-relaxed md:text-base ${isLaunch ? "text-black" : "text-slate-300"}`}>{engagement.endState}</p>
        </div>
      </div>

      <Link
        to={`/?contact=true&source=services_${engagement.id}`}
        className={`mt-8 inline-flex min-h-[50px] items-center gap-3 px-6 py-4 text-sm font-bold transition-colors ${isLaunch ? "bg-black text-white hover:bg-white hover:text-black" : "bg-primary text-black hover:bg-white"}`}
      >
        Discuss {engagement.id === "launch" ? "your 12-week build" : `a ${engagement.title.toLowerCase()} engagement`}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}

export default function Services() {
  useSEO({
    ...getPageSEO("services"),
    jsonLd: [serviceLd, faqLd],
  });

  return (
    <main data-page-id="services" className="min-h-screen bg-background-dark pb-24 pt-28 selection:bg-primary selection:text-black md:pb-28 md:pt-36">
      <header className="px-5 md:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                <span className="h-1.5 w-1.5 shrink-0 animate-pulse bg-primary" />
                Services // choose the first move
              </div>
              <h1 className="mt-6 text-5xl font-black leading-[0.86] tracking-tighter text-white sm:text-6xl md:text-8xl lg:text-[104px]">
                Launch.<br />Rescue.<br /><span className="text-primary">Extend.</span>
              </h1>
            </div>

            <div className="lg:col-span-5">
              <p className="text-lg font-normal leading-relaxed text-slate-200 md:text-xl">
                Start with the condition of the product instead of a shopping list of disciplines. The 12-week build is our default for a new, sharply scoped release. Existing products begin somewhere else.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link to="/?contact=true&source=services_hero" className="inline-flex min-h-[50px] items-center justify-center gap-3 bg-primary px-6 py-4 text-sm font-bold text-black transition-colors hover:bg-white">
                  Discuss your 12-week build <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/work" className="inline-flex min-h-[50px] items-center justify-center border border-white/15 px-6 py-4 text-sm font-bold text-white transition-colors hover:border-primary hover:text-primary">
                  Inspect the work
                </Link>
              </div>
            </div>
          </div>

          <section className="mt-14 grid gap-4 md:mt-18 md:grid-cols-3" aria-label="Engagement overview">
            {engagements.map((engagement, index) => (
              <article key={engagement.id} className={`flex min-h-[140px] items-end p-6 ${engagement.primary ? "bg-primary text-black shadow-[0_20px_60px_rgba(0,245,255,0.1)]" : "content-card text-white"}`}>
                <div>
                  <div className={`font-mono text-xs font-bold uppercase tracking-[0.13em] ${engagement.primary ? "text-black/60" : "text-white/50"}`}>0{index + 1} // {engagement.duration}</div>
                  <div className="mt-3 text-xl font-bold">{engagement.situation}</div>
                  {engagement.primary && <div className="mt-2 text-xs font-bold uppercase tracking-[0.12em]">Default for new products</div>}
                </div>
              </article>
            ))}
          </section>
        </div>
      </header>

      <div className="mx-auto mt-16 grid max-w-[1440px] gap-6 px-5 md:mt-20 md:px-8">
        <EngagementDetails engagement={engagements[0]!} />

        <div className="grid gap-6 lg:grid-cols-2">
          {engagements.slice(1).map((engagement) => (
            <EngagementDetails key={engagement.id} engagement={engagement} />
          ))}
        </div>
      </div>

      <section className="section-band section-band-raised mt-20 px-5 py-20 md:mt-24 md:px-8 md:py-28" aria-labelledby="capabilities-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-7 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Supporting capabilities</div>
              <h2 id="capabilities-title" className="mt-4 text-4xl font-black leading-[0.94] tracking-tighter text-white md:text-6xl">
                Disciplines move together.<br /><span className="text-primary">The outcome stays in charge.</span>
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-slate-300 md:col-span-5 md:justify-self-end md:text-lg">
              These are not four disconnected services to assemble. We use the combination the release actually requires.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((capability, index) => (
              <article key={capability.title} className="content-card min-h-[220px] p-6 md:p-7">
                <div className="font-mono text-xs text-primary">0{index + 1}</div>
                <h3 className="mt-6 text-xl font-bold text-white">{capability.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{capability.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-12 md:px-8 md:py-20" aria-labelledby="faq-title">
        <div className="md:col-span-4">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">The fine print</div>
          <h2 id="faq-title" className="mt-4 text-4xl font-black tracking-tighter text-white md:text-5xl">Useful answers before a call.</h2>
        </div>
        <div className="content-card px-6 md:col-span-8 md:px-8">
          {faqs.map((faq) => (
            <details key={faq.q} className="group border-b border-white/10">
              <summary className="flex min-h-[68px] cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-bold text-white transition-colors hover:text-primary md:text-lg">
                {faq.q}
                <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-open:rotate-90" />
              </summary>
              <p className="max-w-3xl pb-6 text-sm leading-relaxed text-slate-300 md:text-base">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="content-card grid gap-8 p-7 md:grid-cols-12 md:items-center md:p-10 lg:p-12">
          <div className="md:col-span-8">
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Still deciding?</div>
            <h2 className="mt-4 text-3xl font-black tracking-tighter text-white md:text-5xl">Bring the product condition. We will help choose the first move.</h2>
          </div>
          <Link to="/?contact=true&source=services_footer" className="inline-flex min-h-[52px] items-center justify-center gap-3 bg-primary px-7 py-4 text-base font-bold text-black transition-colors hover:bg-white md:col-span-4 md:justify-self-end">
            Start a fit conversation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
