import CaseStudyLayout, { type CaseStudyData } from "../components/CaseStudyLayout";
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
    "The screens below come from the live product. They show what was designed and shipped; adoption and marketplace liquidity remain measurement questions—not portfolio claims.",
  outcome: {
    title: "Rent decisions can begin with what tenants paid—not what owners asked.",
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
    "Rental portals tell people what landlords ask. Renters need a different answer: what people actually pay at a specific society, how recent the reports are, and whether the number is strong enough to trust. That answer only improves when the product can recruit the next legitimate report.",
  challenge:
    "Create useful intelligence while the dataset is still uneven—without fabricating certainty, attaching a report to the wrong building, exposing tenant contact details, or expanding into more cities and features before the core society loop works.",
  decisions: [
    {
      title: "Make the society—not the city—the unit of usefulness.",
      detail:
        "The product was simplified around direct society and locality search. A renter reaches a stable society answer first; city breadth becomes a consequence of many dense local networks rather than the primary experience.",
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
      detail:
        "One report stays a reported rent. A median appears only when the evidence supports one, accompanied by report count and freshness. Unsupported comparisons return nothing instead of a confident-looking zero.",
      media: {
        label: "Live product // Evidence before certainty",
        description: "Rent ranges, report counts, freshness, and deposits shown together.",
        src: "/work/rentnama-society.webp",
        alt: "Life Republic rent dossier showing a range based on five reports and the latest deposit evidence",
        treatment: "inset",
      },
    },
    {
      title: "Reduce contribution friction without corrupting place identity.",
      detail:
        "A contribution from a known society reuses its canonical identity. An unknown place starts with search and visible disambiguation, then requires map confirmation or correction before the rent is attached.",
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
      detail:
        "Purpose-specific sharing, society watches, contribution rewards, privacy-safe attribution, and a protected density dashboard connect the public product to the operating work required to make selected societies genuinely useful.",
      media: {
        label: "Live product // Density made visible",
        description: "The map turns report density into an explorable public product rather than a hidden database.",
        src: "/work/rentnama-map.webp",
        alt: "Rentnama map showing Pune localities, rent report density, and society-level price markers",
        treatment: "inset",
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
  draftMetrics: [
    { value: "42%", label: "Search → society answer", definition: "Replace with the share of searches that reach a useful society or locality result." },
    { value: "18%", label: "Answer → contribution start", definition: "Replace with the contribution-start rate from society and map surfaces." },
    { value: "2.4×", label: "Repeat-view lift", definition: "Replace with the returning-user frequency for watched or revisited societies." },
    { value: "31%", label: "Answer sharing rate", definition: "Replace with the share or copy-link rate from evidence-backed rent answers." },
  ],
  liveProduct: {
    label: "Visit rentnama.in",
    href: "https://rentnama.in/",
  },
  accent: "#b5ef67",
};

export default function CaseStudyRentnama({ onContactClick }: { onContactClick: () => void }) {
  useSEO(getPageSEO("rentnama"));

  return <CaseStudyLayout data={caseStudy} onContactClick={onContactClick} />;
}
