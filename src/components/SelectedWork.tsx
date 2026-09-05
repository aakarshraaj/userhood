import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { trackAnalyticsEvent } from "../utils/analytics";
import ProjectMedia, { type ProjectMediaSpec } from "./ProjectMedia";

interface WorkItem {
  index: string;
  organisation: string;
  category: string;
  relationship: "Product build" | "Team experience";
  title: string;
  description?: string;
  problem?: string;
  intervention?: string;
  proof?: Array<{
    value: string;
    label: string;
  }>;
  link: string;
  accent: string;
  media: ProjectMediaSpec;
}

const selectedWork: WorkItem[] = [
  {
    index: "01",
    organisation: "Rentnama",
    category: "Rental intelligence platform",
    relationship: "Product build",
    title: "Building a public price layer for India’s rental market.",
    problem: "Listings showed asking prices. Renters still could not see what people actually paid at a specific society.",
    intervention: "Make the society the unit of truth, expose evidence strength, and make every answer recruit the next report.",
    proof: [
      { value: "178", label: "first-hand reports" },
      { value: "146", label: "societies" },
      { value: "72", label: "localities" },
    ],
    link: "/case-study/rentnama",
    accent: "#b5ef67",
    media: {
      label: "Live product // Answer + evidence map",
      description: "Society-level rent intelligence with visible evidence, freshness, and map context.",
      src: "/work/rentnama-society.webp",
      alt: "Rentnama society dossier for Life Republic showing rent range, report count, and deposit evidence",
      secondarySrc: "/work/rentnama-map.webp",
      secondaryAlt: "Rentnama's live Pune map with society-level rent pins and evidence filters",
      treatment: "layered",
    },
  },
  {
    index: "02",
    organisation: "Tirch",
    category: "End-to-end commerce engine",
    relationship: "Product build",
    title: "The commerce engine behind a fashion brand—not just its storefront.",
    problem: "A campaign-ready storefront still fails when price, identity, checkout, and orders disagree.",
    intervention: "Put merchandising, server-priced checkout, OTP accounts, orders, email, analytics, and launch controls behind one brand.",
    proof: [
      { value: "10", label: "live products" },
      { value: "3", label: "collection systems" },
      { value: "1", label: "price authority" },
    ],
    link: "/case-study/tirch",
    accent: "#d2694a",
    media: {
      label: "Live product // Storefront + engine",
      description: "The visible storefront and the full commerce system behind it.",
      src: "/work/tirch-home.webp",
      alt: "Tirch storefront campaign featuring the Ghungroo Break tee",
      secondarySrc: "/work/tirch-catalogue.webp",
      secondaryAlt: "Tirch shop catalogue with distinct product photography and collection hierarchy",
      treatment: "layered",
    },
  },
  {
    index: "03",
    organisation: "Hyundai Global",
    category: "Automotive commerce",
    relationship: "Team experience",
    title: "Turning a dealership journey into one coherent digital purchase flow.",
    description:
      "Model discovery, configuration, finance, and dealer handoff brought into a single customer experience.",
    link: "/case-study/hyundai",
    accent: "#00f5ff",
    media: {
      label: "Product image // Vehicle purchase journey",
      description: "An approved or anonymised view of the connected purchase journey will live here.",
    },
  },
  {
    index: "04",
    organisation: "Mitsubishi Motors Australia",
    category: "Connected ownership",
    relationship: "Team experience",
    title: "Making a complex vehicle ecosystem feel calm behind the wheel.",
    description:
      "Vehicle health, servicing, and driving feedback shaped into an interface designed around clarity and confidence.",
    link: "/case-study/mitsubishi",
    accent: "#00f5ff",
    media: {
      label: "Product image // Connected ownership",
      description: "An approved or anonymised view of the connected ownership experience will live here.",
    },
  },
];

const productBuilds = selectedWork.filter((item) => item.relationship === "Product build");
const teamExperience = selectedWork.filter((item) => item.relationship === "Team experience");

interface SelectedWorkProps {
  standalone?: boolean;
}

export default function SelectedWork({ standalone = false }: SelectedWorkProps) {
  const Heading = standalone ? "h1" : "h2";
  const analyticsSource = standalone ? "work_page" : "homepage_selected_work";

  return (
    <section
      id={standalone ? undefined : "case-studies"}
      className={`relative border-y border-white/5 bg-[#08080a] px-5 md:px-8 ${standalone ? "pb-16 pt-28 md:pb-24 md:pt-36" : "py-14 md:py-20"}`}
    >
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="grid gap-7 border-b border-white/10 pb-8 md:grid-cols-12 md:items-end md:pb-10">
          <div className="md:col-span-8">
            <div className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-primary">[ {standalone ? "SELECTED_WORK" : "01 // SELECTED_WORK"} ]</div>
            <Heading className="max-w-4xl text-4xl font-black leading-[0.96] tracking-tighter text-white sm:text-5xl md:text-7xl">
              Products you can inspect. <span className="text-primary">Decisions we can defend.</span>
            </Heading>
          </div>

          <p className="max-w-md text-base font-normal leading-relaxed text-slate-300 md:col-span-4 md:justify-self-end md:text-lg">
            Two products built end to end. Open either one to see the constraint, the system, and the consequence.
          </p>
        </div>

        <div className="grid gap-px bg-white/10 lg:grid-cols-2">
          {productBuilds.map((item) => (
            <Link
              key={item.organisation}
              to={item.link}
              onClick={() => trackAnalyticsEvent("case_study_open", { source: analyticsSource, organisation: item.organisation })}
              aria-label={`Read the ${item.organisation} ${item.relationship.toLowerCase()} case study`}
              className="group flex min-w-0 flex-col bg-[#08080a] p-4 transition-colors hover:bg-white/[0.025] md:p-5"
              style={{ "--work-accent": item.accent } as CSSProperties}
            >
              <ProjectMedia project={item.organisation} media={item.media} accent={item.accent} compact />

              <div className="flex flex-1 flex-col px-1 pb-2 pt-6 md:px-2 md:pb-3 md:pt-7">
                <div className="flex items-center justify-between gap-4">
                  <div className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--work-accent)]">
                    {item.relationship} · {item.category}
                  </div>
                  <div className="font-mono text-xs text-white/45">{item.index}</div>
                </div>

                <div className="mt-3 text-xl font-bold text-white">{item.organisation}</div>
                <h3 className="mt-4 max-w-2xl text-2xl font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-primary md:text-3xl">
                  {item.title}
                </h3>
                <div className="mt-6 grid border-y border-white/10 sm:grid-cols-2">
                  <div className="py-5 pr-0 sm:pr-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">The constraint</div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.problem}</p>
                  </div>
                  <div className="border-t border-white/10 py-5 sm:border-l sm:border-t-0 sm:pl-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--work-accent)]">The product move</div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-200">{item.intervention}</p>
                  </div>
                </div>

                <dl className="grid grid-cols-3 border-b border-white/10">
                  {item.proof?.map((signal) => (
                    <div key={signal.label} className="py-5 pr-3 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-white/10 [&:not(:first-child)]:pl-4">
                      <dd className="text-2xl font-black tracking-tight text-white md:text-3xl">{signal.value}</dd>
                      <dt className="mt-1 font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-white/50">{signal.label}</dt>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 flex items-center justify-between text-sm font-bold text-white/80">
                  <span>See the decisions behind it</span>
                  <span className="flex h-11 w-11 items-center justify-center border border-white/15 text-white transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-black">
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {standalone ? (
          <div className="border-x border-b border-white/10 bg-[#08080a] p-5 md:p-7">
            <div className="grid gap-6 border-b border-white/10 pb-5 md:grid-cols-[0.75fr_1.25fr] md:items-end">
              <div className="font-mono text-xs uppercase tracking-[0.15em] text-white/65">
                Team experience
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-300 md:justify-self-end md:text-right">
                Automotive product work contributed by members of the team.
              </p>
            </div>

            <div className="grid gap-px bg-white/10 md:grid-cols-2">
              {teamExperience.map((item) => (
                <Link
                  key={item.organisation}
                  to={item.link}
                  onClick={() => trackAnalyticsEvent("case_study_open", { source: "work_page_team_experience", organisation: item.organisation })}
                  aria-label={`Read the ${item.organisation} team experience case study`}
                  className="group flex flex-col bg-[#08080a] py-6 transition-colors hover:bg-white/[0.025] md:px-6"
                >
                  <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.11em] text-white/60">
                    <span>{item.category}</span>
                    <span>{item.index}</span>
                  </div>
                  <div className="mt-4 text-lg font-bold text-white">{item.organisation}</div>
                  <h3 className="mt-3 max-w-xl text-xl font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-primary md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">{item.description}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-bold text-white/75 transition-colors group-hover:text-primary">
                    Read experience note <ArrowUpRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <Link
            to="/work"
            onClick={() => trackAnalyticsEvent("selected_work_click", { source: "homepage_selected_work_footer" })}
            className="group flex min-h-16 items-center justify-between border-x border-b border-white/10 bg-[#08080a] px-5 text-sm font-bold text-white transition-colors hover:border-primary hover:text-primary md:px-7"
          >
            <span>View all work, including automotive team experience</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}

      </div>
    </section>
  );
}
