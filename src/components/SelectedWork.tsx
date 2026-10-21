import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { trackAnalyticsEvent } from "../utils/analytics";
import AutomotiveBrandIdentity, { type AutomotiveBrand } from "./AutomotiveBrandIdentity";
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
    title: "What people pay. Not what listings ask.",
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
    title: "An entire commerce engine. Unmistakably Tirch.",
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
    title: "Making a car purchase easier to think through.",
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
    title: "Helping drivers make sense of their car.",
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
      className={`section-band section-band-deep relative px-5 md:px-8 ${standalone ? "pb-20 pt-28 md:pb-28 md:pt-36" : "pb-16 pt-4 md:pb-24 md:pt-6"}`}
    >
      {standalone && <div className="tech-grid pointer-events-none absolute inset-0 opacity-10" />}

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className={`motion-reveal ${standalone ? "mb-10 md:mb-14" : "mb-8 md:mb-10"}`}>
          <div>
            <Heading className={standalone ? "max-w-4xl text-4xl font-medium leading-[1.04] tracking-tighter text-white sm:text-5xl md:text-7xl" : "text-[clamp(3rem,5.5vw,5.5rem)] font-medium leading-none tracking-[-0.045em] text-white"}>
              The work.
            </Heading>
            {standalone && <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">Product builds by Userhood, followed by earlier work from members of the team.</p>}
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
                  className="motion-card group flex flex-col overflow-hidden bg-[#101010] shadow-[0_24px_70px_rgba(0,0,0,0.28)] transition-colors hover:bg-[#131313]"
                >
                  <AutomotiveBrandIdentity brand={item.organisation as AutomotiveBrand} index={item.index} />
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50 md:text-xs">
                      {item.category}
                    </div>
                    <CardHeading className="mt-4 max-w-xl text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                      {item.title}
                    </CardHeading>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">{item.description}</p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-bold text-white/75 transition-colors group-hover:text-white">
                      Read experience note
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
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
            <span>View all work</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}

      </div>
    </section>
  );
}
