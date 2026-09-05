import CaseStudyLayout, { type CaseStudyData } from "../components/CaseStudyLayout";
import { getPageSEO } from "../data/siteMetadata";
import { useSEO } from "../utils/seo";

const caseStudy: CaseStudyData = {
  pageId: "hyundai",
  brand: "Hyundai Global",
  category: "Automotive commerce",
  relationship: "Team experience",
  title: "Designing confidence into a high-consideration vehicle purchase.",
  summary:
    "A digital buying journey connecting vehicle discovery, configuration, finance exploration, and dealership fulfilment.",
  facts: [
    { label: "Surface", value: "Digital vehicle purchase journey" },
    { label: "Attribution", value: "Team member contribution" },
    { label: "Focus", value: "Discovery to dealer fulfilment" },
    { label: "Public evidence", value: "Reasoning only; no outcome claims" },
  ],
  heroMedia: {
    label: "Project visual // Publication restricted",
    description: "Client-confidential imagery is not published here. An approved or anonymised journey visual can be added after clearance.",
    placeholderLabel: "Confidential project visual",
    placeholderStatus: "Withheld",
  },
  proofNote:
    "Attributed team experience only. This was not a Userhood engagement, and Hyundai has not endorsed this page. Confidential delivery details and results are omitted.",
  context:
    "Buying a vehicle online compresses a long, assisted dealership process into a product experience. Customers still need to compare variants, understand financial implications, locate fulfilment, and know what happens after they commit.",
  challenge:
    "Make the journey feel simple without pretending the underlying purchase is simple. Every reduction in interface complexity still had to preserve consequential information and a credible path to a real dealer.",
  decisions: [
    {
      title: "Sequence commitment instead of demanding it.",
      detail:
        "The contribution focused on a staged journey: explore, configure, understand financing, then move into a dealer-supported commitment.",
    },
    {
      title: "Turn configuration into comparison.",
      detail:
        "Variant, colour, feature, and price were treated as one connected choice system that made change, cost, and availability easier to compare.",
    },
    {
      title: "Make finance legible before it becomes a form.",
      detail:
        "The work treated finance exploration as a decision aid before any application flow or request for personal information.",
    },
    {
      title: "Design the dealer handoff as a product moment.",
      detail:
        "The journey direction preserved context between digital intent and physical fulfilment instead of ending when the organisation changed channels.",
    },
  ],
  documentedScope: [
    "Journey-architecture contribution",
    "Vehicle-configuration interaction direction",
    "Finance-exploration principles",
    "Dealer discovery and fulfilment handoff",
    "Reusable interface-system thinking",
    "Core-flow prototyping experience",
  ],
  evidenceBoundary:
    "No approved product imagery, client endorsement, research record, launch data, or attributable conversion metric is public. This records relevant team experience and does not claim verified delivery or results by Userhood.",
  trademarkNote:
    "Hyundai and related marks belong to their respective owners. Their appearance here is solely to identify the organisation associated with this team experience.",
  accent: "#ffffff",
};

export default function CaseStudyHyundai({ onContactClick }: { onContactClick: () => void }) {
  useSEO(getPageSEO("hyundai"));

  return <CaseStudyLayout data={caseStudy} onContactClick={onContactClick} />;
}
