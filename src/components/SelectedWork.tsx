import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { trackAnalyticsEvent } from "../utils/analytics";
import BrandIdentity from "./BrandIdentity";
import ProjectShowcase, { type ProjectShowcaseFrame } from "./ProjectShowcase";

interface WorkItem {
  index: string;
  organisation: string;
  category: string;
  relationship: "Product build" | "Team experience";
  title: string;
  description?: string;
  link: string;
  accent: string;
  showcase?: ProjectShowcaseFrame[];
}

const selectedWork: WorkItem[] = [
  {
    index: "01",
    organisation: "Rentnama",
    category: "Rental intelligence platform",
    relationship: "Product build",
    title: "Building a public price layer for India’s rental market.",
    link: "/case-study/rentnama",
    accent: "#b5ef67",
    showcase: [
      { src: "/work/rentnama-map.webp", alt: "Rentnama's live Pune map with society-level rent pins and evidence filters" },
      { src: "/work/rentnama-society.webp", alt: "Rentnama society dossier for Life Republic showing rent range, report count, and deposit evidence" },
      { src: "/work/rentnama-explore.webp", alt: "Rentnama's society-by-society exploration experience" },
      { src: "/work/rentnama-contribute.webp", alt: "Rentnama's first-hand rent contribution flow" },
    ],
  },
  {
    index: "02",
    organisation: "Tirch",
    category: "End-to-end commerce engine",
    relationship: "Product build",
    title: "Building Tirch’s end-to-end commerce engine.",
    link: "/case-study/tirch",
    accent: "#d2694a",
    showcase: [
      { src: "/work/tirch-home.webp", alt: "Tirch storefront campaign featuring the Ghungroo Break tee" },
      { src: "/work/tirch-catalogue.webp", alt: "Tirch shop catalogue with distinct product photography and collection hierarchy" },
      { src: "/work/tirch-product.webp", alt: "Tirch product detail page with pricing, fit, and size selection" },
      { src: "/work/tirch-bag.webp", alt: "Tirch shopping bag and checkout flow" },
      { src: "/work/tirch-account.webp", alt: "Tirch passwordless account experience" },
    ],
  },
  {
    index: "03",
    organisation: "Hyundai Global",
    category: "Automotive commerce",
    relationship: "Team experience",
    title: "Turning a dealership journey into one coherent digital purchase flow.",
    description:
      "A team member’s experience shaping a staged path through model discovery, configuration, finance, and dealer fulfilment.",
    link: "/case-study/hyundai",
    accent: "#ffffff",
  },
  {
    index: "04",
    organisation: "Mitsubishi Motors Australia",
    category: "Connected ownership",
    relationship: "Team experience",
    title: "Making a complex vehicle ecosystem feel calm behind the wheel.",
    description:
      "A team member’s experience translating vehicle health, servicing, and driving feedback into calmer ownership decisions.",
    link: "/case-study/mitsubishi",
    accent: "#ffffff",
  },
];

const productBuilds = selectedWork.filter((item) => item.relationship === "Product build");
const teamExperience = selectedWork.filter((item) => item.relationship === "Team experience");

interface SelectedWorkProps {
  standalone?: boolean;
}

export default function SelectedWork({ standalone = false }: SelectedWorkProps) {
  const Heading = standalone ? "h1" : "h2";
  const CardHeading = standalone ? "h2" : "h3";
  const analyticsSource = standalone ? "work_page" : "homepage_selected_work";

  return (
    <section
      id={standalone ? undefined : "case-studies"}
      className={`section-band section-band-deep relative px-5 md:px-8 ${standalone ? "pb-20 pt-28 md:pb-28 md:pt-36" : "pb-20 pt-14 md:pb-28 md:pt-20"}`}
    >
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-10" />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="motion-reveal mb-10 md:mb-14">
          <div>
            <div className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-white/50">[ {standalone ? "SELECTED_WORK" : "01 // SELECTED_WORK"} ]</div>
            <Heading className="max-w-4xl text-4xl font-black leading-[0.96] tracking-tighter text-white sm:text-5xl md:text-7xl">
              Recent product builds.
            </Heading>
          </div>
        </div>

        <div className="motion-reveal grid gap-6 lg:grid-cols-2 lg:gap-7">
          {productBuilds.map((item, index) => (
            <Link
              key={item.organisation}
              to={item.link}
              onClick={() => trackAnalyticsEvent("case_study_open", { source: analyticsSource, organisation: item.organisation })}
              aria-label={`Read the ${item.organisation} ${item.relationship.toLowerCase()} case study`}
              className="content-card motion-card group flex min-w-0 flex-col overflow-hidden hover:border-white/20"
              style={{ "--work-accent": item.accent } as CSSProperties}
            >
              <ProjectShowcase frames={item.showcase ?? []} accent={item.accent} startDelay={index * 900} />

              <div className="flex flex-1 flex-col px-5 pb-6 pt-6 md:px-7 md:pb-8 md:pt-7">
                <div className="flex items-center justify-between gap-5">
                  <BrandIdentity brand={item.organisation as "Rentnama" | "Tirch"} size="card" />
                  <ArrowUpRight className="h-5 w-5 text-white/45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                </div>

                <CardHeading className="mt-6 max-w-2xl text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl">
                  {item.title}
                </CardHeading>
              </div>
            </Link>
          ))}
        </div>

        {standalone ? (
          <div className="motion-reveal mt-10 bg-white/[0.025] p-5 md:mt-12 md:p-7">
            <div className="grid gap-6 pb-5 md:grid-cols-[0.75fr_1.25fr] md:items-end">
              <div className="font-mono text-xs uppercase tracking-[0.15em] text-white/65">
                Team experience
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-300 md:justify-self-end md:text-right">
              Automotive product work contributed by members of the team.
              These were not Userhood engagements or client endorsements; no outcome claims are made.
              </p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {teamExperience.map((item) => (
                <Link
                  key={item.organisation}
                  to={item.link}
                  onClick={() => trackAnalyticsEvent("case_study_open", { source: "work_page_team_experience", organisation: item.organisation })}
                  aria-label={`Read the ${item.organisation} attributed team experience note`}
                  className="motion-card group flex flex-col bg-black/25 p-6 transition-colors hover:bg-white/[0.035]"
                >
                  <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.11em] text-white/60">
                    <span>{item.category}</span>
                    <span>{item.index}</span>
                  </div>
                  <div className="mt-4 text-lg font-bold text-white">{item.organisation}</div>
                  <CardHeading className="mt-3 max-w-xl text-xl font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-primary md:text-2xl">
                    {item.title}
                  </CardHeading>
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
            className="motion-button motion-reveal group mt-8 inline-flex min-h-12 items-center gap-3 text-sm font-bold text-white/65 hover:text-white"
          >
            <span>View all work, including automotive team experience</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}

      </div>
    </section>
  );
}
