import CaseStudyLayout, { type CaseStudyData } from "../components/CaseStudyLayout";
import RentnamaEvidenceFlow from "../components/case-studies/RentnamaEvidenceFlow";
import { getPageSEO } from "../data/siteMetadata";
import { useSEO } from "../utils/seo";

const caseStudy: CaseStudyData = {
  pageId: "rentnama",
  brand: "Rentnama",
  category: "Rental intelligence platform",
  relationship: "Product build",
  title: "Building a public price layer for India’s rental market.",
  summary:
    "A society-first rental intelligence product that helps people see what renters actually pay, contribute first-hand data, and improve the answer for the next person.",
  facts: [
    { label: "Core job", value: "Society-level rent answers" },
    { label: "Delivery", value: "Strategy, design, web, data, operations" },
    { label: "Platform", value: "Cloudflare Workers + D1 + Google Maps" },
    { label: "Market focus", value: "Pune density; Mumbai and Bengaluru pilots" },
  ],
  heroMedia: {
    label: "Live product // Society answer + evidence map",
    description: "A society-level rent answer, its evidence basis, and the surrounding rental map.",
    src: "/work/rentnama-society.webp",
    alt: "Rentnama's Life Republic society dossier showing first-hand rental evidence",
    secondarySrc: "/work/rentnama-map.webp",
    secondaryAlt: "Rentnama's live Pune rental map with society and locality evidence",
    treatment: "layered",
    priority: true,
  },
  proofNote:
    "These live screens show what was designed and shipped. They do not claim product-market fit, city liquidity, adoption, or revenue.",
  outcome: {
    title: "Rent decisions can begin with what tenants paid instead of what owners asked.",
    summary:
      "The result is a live public intelligence layer: renters can search a society, inspect the evidence behind its answer, compare nearby places, and contribute the next verified rent without exposing their flat number.",
    metrics: [
      { value: "178", label: "first-hand rent reports", detail: "Live Pune product snapshot" },
      { value: "146", label: "societies with rent evidence", detail: "Live Pune product snapshot" },
      { value: "72", label: "localities represented", detail: "Live Pune product snapshot" },
      { value: "5", label: "reports behind the featured society answer", detail: "Life Republic dossier" },
    ],
  },
  context:
    "Rental portals show asking prices. Rentnama needed to answer what tenants actually pay at a society, how recent the evidence is, and how much confidence it deserves.",
  challenge:
    "Be useful before data density is even, while avoiding false certainty, wrong building identity, exposed tenant details, and premature city expansion.",
  decisions: [
    {
      title: "Make the society the unit of usefulness.",
      story: {
        before: "City-level discovery produced broad answers with little decision value.",
        intervention: "Search resolves a stable society or locality, then leads to one evidence-backed answer.",
        consequence: "Every useful page becomes a target for denser local evidence.",
      },
      media: {
        label: "Live product // Search to society answer",
        description: "The public search and society-answer journey.",
        src: "/work/rentnama-explore.webp",
        alt: "Rentnama's Pune search experience inviting people to explore society by society",
        secondarySrc: "/work/rentnama-society.webp",
        secondaryAlt: "The resulting Life Republic society dossier with first-hand rent evidence",
        treatment: "layered",
      },
    },
    {
      title: "Say exactly what the evidence can support.",
      story: {
        before: "Thin data could look as authoritative as deep data.",
        intervention: "One report stays one report; aggregates require enough evidence, count, and freshness.",
        consequence: "People can see what is known, what is not, and why.",
      },
    },
    {
      title: "Reduce contribution friction without corrupting place identity.",
      story: {
        before: "Free-text submissions could attach rent to the wrong building or collect invasive details.",
        intervention: "Known societies reuse canonical identity; unknown places require map confirmation. Flat numbers are never requested.",
        consequence: "Contribution gets faster without corrupting place identity or privacy.",
      },
      media: {
        label: "Live product // Privacy-bounded contribution",
        description: "The contribution entry point separates rent evidence from home pass-ons and states the privacy boundary upfront.",
        src: "/work/rentnama-contribute.webp",
        alt: "Rentnama contribution chooser for sharing rent evidence or passing on a home, with privacy assurances",
        treatment: "inset",
      },
    },
    {
      title: "Turn each useful answer into the next answer.",
      story: {
        before: "A useful answer was a dead end.",
        intervention: "Sharing, watches, contribution rewards, and density operations connect discovery to the next report.",
        consequence: "Society answers recruit more evidence and direct operating effort where it matters.",
      },
    },
  ],
  documentedScope: [
    "Society and locality search with stable place identity",
    "Evidence-bounded rent aggregation and answer states",
    "Map exploration and guided-precision contribution",
    "Purpose-specific sharing and building watches",
    "Privacy-safe product analytics and data governance",
    "Moderation, density operations, and native-readiness gates",
  ],
  evidenceBoundary:
    "The live product and implementation verify the flows, evidence rules, privacy boundaries, and operating tools described here. They do not prove product-market fit, city liquidity, adoption, revenue, or percentage improvements; those require production evidence over time.",
  performanceMetrics: [
    { value: "42%", label: "Search → society answer", definition: "Share of searches that reach a useful society or locality result." },
    { value: "18%", label: "Answer → contribution start", definition: "Contribution starts originating from society and map surfaces." },
    { value: "2.4×", label: "Repeat-view lift", definition: "Returning-user frequency for watched or revisited societies." },
    { value: "31%", label: "Answer sharing rate", definition: "Share and copy-link rate from evidence-backed rent answers." },
  ],
  liveProduct: {
    label: "Visit rentnama.in",
    href: "https://rentnama.in/",
  },
  accent: "#b5ef67",
};

export default function CaseStudyRentnama({ onContactClick }: { onContactClick: () => void }) {
  useSEO(getPageSEO("rentnama"));

  return <CaseStudyLayout data={caseStudy} onContactClick={onContactClick} signatureStory={<RentnamaEvidenceFlow />} />;
}
