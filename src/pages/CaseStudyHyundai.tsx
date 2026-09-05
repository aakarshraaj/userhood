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
    { label: "Contribution", value: "Team experience" },
    { label: "Focus", value: "Discovery to dealer fulfilment" },
    { label: "Evidence", value: "Reasoning; no outcome metrics" },
  ],
  heroMedia: {
    label: "Hero image // Vehicle purchase journey",
    description: "Replace with an approved or anonymised journey view connecting model discovery, configuration, finance, and dealer fulfilment.",
  },
  proofNote:
    "This page documents work and experience contributed by members of the team behind Userhood. It is not presented as a current Userhood studio engagement or client endorsement. Commercial details and client-confidential results are intentionally omitted.",
  context:
    "Buying a vehicle online compresses a long, assisted dealership process into a product experience. Customers still need to compare variants, understand financial implications, locate fulfilment, and know what happens after they commit.",
  challenge:
    "Make the journey feel simple without pretending the underlying purchase is simple. Every reduction in interface complexity still had to preserve consequential information and a credible path to a real dealer.",
  decisions: [
    {
      title: "Sequence commitment instead of demanding it.",
      detail:
        "The journey was structured so customers could move from exploration to configuration and then to transactional decisions without confronting every dependency at once.",
    },
    {
      title: "Turn configuration into comparison.",
      detail:
        "Variant, colour, feature, and price decisions were treated as one connected choice system. The interface needed to show what changed, what it cost, and what remained available.",
    },
    {
      title: "Make finance legible before it becomes a form.",
      detail:
        "Finance exploration was positioned as a decision aid rather than a sudden application wall, allowing customers to understand trade-offs before supplying personal information.",
    },
    {
      title: "Treat dealer handoff as part of the product.",
      detail:
        "The experience preserved continuity between digital intent and physical fulfilment so the customer did not feel abandoned at the moment the organisation changed channels.",
    },
  ],
  documentedScope: [
    "End-to-end journey architecture",
    "Vehicle configuration interaction model",
    "Finance-exploration experience",
    "Dealer discovery and fulfilment handoff",
    "Reusable interface-system direction",
    "Prototyping of core flows",
  ],
  evidenceBoundary:
    "We do not publish an attributable conversion study for this work. This page therefore makes no numerical performance claim; it documents the product problem and the reasoning behind the experience.",
  trademarkNote:
    "Hyundai and related marks belong to their respective owners. Their appearance here is solely to identify the organisation associated with this team experience.",
  accent: "#00f5ff",
};

export default function CaseStudyHyundai({ onContactClick }: { onContactClick: () => void }) {
  useSEO(getPageSEO("hyundai"));

  return <CaseStudyLayout data={caseStudy} onContactClick={onContactClick} />;
}
