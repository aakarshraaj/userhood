import CaseStudyLayout, { type CaseStudyData } from "../components/CaseStudyLayout";
import RentnamaEvidenceFlow from "../components/case-studies/RentnamaEvidenceFlow";
import { getPageSEO } from "../data/siteMetadata";
import { useSEO } from "../utils/seo";

const caseStudy: CaseStudyData = {
  pageId: "rentnama",
  brand: "Rentnama",
  category: "Rental intelligence platform",
  relationship: "Product build",
  title: "What people pay. Not what listings ask.",
  summary:
    "The listing tells you what the landlord wants. Rentnama shows what tenants report paying, building by building. A different starting point for the same big decision.",
  question: "What if renters could see what people actually pay in the building they’re considering?",
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
    "Screens and counts reflect the captured product. They show the experience and its evidence, not independently measured business results.",
  outcome: {
    title: "A rent answer with something behind it.",
    summary:
      "Search a building, see the reported rents and check how much evidence supports the answer. Compare nearby places or add your own rent without sharing your flat number.",
    metrics: [
      { value: "178", label: "first-hand rent reports", detail: "Captured Pune product snapshot" },
      { value: "146", label: "societies with rent evidence", detail: "Captured Pune product snapshot" },
      { value: "72", label: "localities represented", detail: "Captured Pune product snapshot" },
      { value: "5", label: "reports behind the featured society answer", detail: "Life Republic dossier" },
    ],
  },
  context:
    "Rental portals show asking prices. Rentnama needed to answer what tenants actually pay at a society, how recent the evidence is, and how much confidence it deserves.",
  challenge:
    "Some buildings have plenty of reports; others have one or none. The design needs to make that difference obvious while protecting the people who contribute.",
  decisions: [
    {
      title: "Start with the building, not the whole city.",
      story: {
        before: "A city-wide rent average says little about the building someone is considering.",
        intervention: "Let people search for a society or locality and see the reports for that place.",
        consequence: "The answer stays close to the decision the renter is trying to make.",
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
      title: "Make sharing useful without making it invasive.",
      story: {
        before: "Free-text submissions could attach rent to the wrong building or collect invasive details.",
        intervention: "Reuse known building names and confirm new places on the map. Never ask for a flat number.",
        consequence: "A report can help the next renter without exposing someone’s exact home.",
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
      title: "Give people a reason to come back and contribute.",
      story: {
        before: "Reading an answer does not automatically lead to another report.",
        intervention: "Let people share an answer, watch a building and contribute their own experience.",
        consequence: "The product offers ways to stay involved as the information changes.",
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
