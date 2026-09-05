import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { trackAnalyticsEvent } from "../utils/analytics";
import ProjectMedia, { type ProjectMediaSpec } from "./ProjectMedia";

interface WorkItem {
  index: string;
  organisation: string;
  category: string;
  relationship: "Repository-backed build" | "Team experience";
  title: string;
  description: string;
  link: string;
  accent: string;
  media: ProjectMediaSpec;
}

const selectedWork: WorkItem[] = [
  {
    index: "01",
    organisation: "Rentnama",
    category: "Rental intelligence platform",
    relationship: "Repository-backed build",
    title: "Building a public price layer for India’s rental market.",
    description:
      "Society-level rent answers, guided contributions, maps, watches, privacy-safe analytics, and the operating system required to grow trustworthy local data.",
    link: "/case-study/rentnama",
    accent: "#b5ef67",
    media: {
      label: "Product image // Society answer and rental map",
      description: "Society-level rent intelligence with visible evidence, freshness, and map context.",
    },
  },
  {
    index: "02",
    organisation: "Tirch",
    category: "Commerce systems",
    relationship: "Repository-backed build",
    title: "A fashion storefront engineered to know exactly what it can promise.",
    description:
      "A brand-forward apparel experience backed by server-authoritative commerce, private account flows, Cloudflare infrastructure, and honest release boundaries.",
    link: "/case-study/tirch",
    accent: "#d2694a",
    media: {
      label: "Product image // Storefront and collection system",
      description: "A sharp small-batch storefront connected to the commerce system behind it.",
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

const repositoryBackedWork = selectedWork.filter((item) => item.relationship === "Repository-backed build");
const teamExperience = selectedWork.filter((item) => item.relationship === "Team experience");

export default function SelectedWork() {
  return (
    <section id="case-studies" className="relative border-y border-white/5 bg-[#08080a] px-5 py-14 md:px-8 md:py-20">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="grid gap-7 border-b border-white/10 pb-8 md:grid-cols-12 md:items-end md:pb-10">
          <div className="md:col-span-8">
            <div className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-primary">[ 01 // SELECTED_WORK ]</div>
            <h2 className="max-w-4xl text-4xl font-black leading-[0.96] tracking-tighter text-white sm:text-5xl md:text-7xl">
              Products you can inspect. <span className="text-primary">Decisions we can defend.</span>
            </h2>
          </div>

          <p className="max-w-md text-base font-normal leading-relaxed text-slate-300 md:col-span-4 md:justify-self-end md:text-lg">
            Repository-backed product builds lead. Clearly labelled team experience follows. The distinction is intentional.
          </p>
        </div>

        <div className="grid gap-px bg-white/10 lg:grid-cols-2">
          {repositoryBackedWork.map((item) => (
            <Link
              key={item.organisation}
              to={item.link}
              onClick={() => trackAnalyticsEvent("case_study_open", { source: "homepage_selected_work", organisation: item.organisation })}
              aria-label={`Read the ${item.organisation} ${item.relationship.toLowerCase()} case study`}
              className="group flex min-w-0 flex-col bg-[#08080a] p-4 transition-colors hover:bg-white/[0.025] md:p-5"
            >
              <ProjectMedia project={item.organisation} media={item.media} accent={item.accent} compact />

              <div className="flex flex-1 flex-col px-1 pb-2 pt-6 md:px-2 md:pb-3 md:pt-7">
                <div className="flex items-center justify-between gap-4">
                  <div className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-primary)]">
                    {item.relationship} · {item.category}
                  </div>
                  <div className="font-mono text-xs text-white/45">{item.index}</div>
                </div>

                <div className="mt-3 text-xl font-bold text-white">{item.organisation}</div>
                <h3 className="mt-4 max-w-2xl text-2xl font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-primary md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-2xl text-base font-normal leading-relaxed text-slate-300">{item.description}</p>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-bold text-white/80">
                  <span>Open case study</span>
                  <span className="flex h-11 w-11 items-center justify-center border border-white/15 text-white transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-black">
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="border-x border-b border-white/10 bg-[#08080a] p-5 md:p-7">
          <div className="grid gap-6 border-b border-white/10 pb-5 md:grid-cols-[0.75fr_1.25fr] md:items-end">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-white/65">
              Team experience
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-300 md:justify-self-end md:text-right">
              Relevant work contributed by members of the team before or outside Userhood. Kept separate from repository-backed builds on purpose.
            </p>
          </div>

          <div className="grid gap-px bg-white/10 md:grid-cols-2">
            {teamExperience.map((item) => (
              <Link
                key={item.organisation}
                to={item.link}
                onClick={() => trackAnalyticsEvent("case_study_open", { source: "homepage_team_experience", organisation: item.organisation })}
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

        <p className="mt-6 max-w-4xl font-mono text-xs uppercase leading-relaxed tracking-[0.1em] text-white/75">
          Evidence standard // Repository-backed builds are described from working code and product documentation. Team-experience work is labelled. No outcome number appears without an attributable source.
        </p>
      </div>
    </section>
  );
}
