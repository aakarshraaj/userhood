import CaseStudyLayout, { type CaseStudyData } from "../components/CaseStudyLayout";
import { getPageSEO } from "../data/siteMetadata";
import { useSEO } from "../utils/seo";

const caseStudy: CaseStudyData = {
  pageId: "rentnama",
  brand: "Rentnama",
  category: "Rental intelligence platform",
  relationship: "Repository-backed product build",
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
    label: "Hero image // Society answer and rental map",
    description: "Replace with a wide product view showing a society-level rent answer, its evidence basis, and the surrounding rental map.",
  },
  proofNote:
    "This case study is grounded in the working Rentnama repository, its product decision log, and completed delivery epics. Adoption and marketplace liquidity remain measurement questions—not portfolio claims.",
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
        label: "Product image // Search to society answer",
        description: "Replace with the search, disambiguation, and society-answer journey across phone and desktop.",
      },
    },
    {
      title: "Say exactly what the evidence can support.",
      detail:
        "One report stays a reported rent. A median appears only when the evidence supports one, accompanied by report count and freshness. Unsupported comparisons return nothing instead of a confident-looking zero.",
      media: {
        label: "Product image // Evidence states",
        description: "Replace with a comparison of one-report, supported-median, thin-data, and empty-society states.",
      },
    },
    {
      title: "Reduce contribution friction without corrupting place identity.",
      detail:
        "A contribution from a known society reuses its canonical identity. An unknown place starts with search and visible disambiguation, then requires map confirmation or correction before the rent is attached.",
      media: {
        label: "Product image // Guided-precision contribution",
        description: "Replace with the known-society fast path and unknown-building map-confirmation flow.",
      },
    },
    {
      title: "Turn each useful answer into the next answer.",
      detail:
        "Purpose-specific sharing, society watches, contribution rewards, privacy-safe attribution, and a protected density dashboard connect the public product to the operating work required to make selected societies genuinely useful.",
      media: {
        label: "Product image // Share, watch, and density loop",
        description: "Replace with a three-frame story showing resident sharing, a watch return, and the privacy-bounded operations dashboard.",
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
    "The repository verifies the product flows, data contracts, privacy rules, completed core-loop epics, and operational tooling described here. It does not prove product-market fit, city liquidity, adoption, revenue, or percentage improvements; those require production evidence over time.",
  accent: "#b5ef67",
};

export default function CaseStudyRentnama({ onContactClick }: { onContactClick: () => void }) {
  useSEO(getPageSEO("rentnama"));

  return <CaseStudyLayout data={caseStudy} onContactClick={onContactClick} />;
}
