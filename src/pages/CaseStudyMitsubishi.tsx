import CaseStudyLayout, { type CaseStudyData } from "../components/CaseStudyLayout";
import { getPageSEO } from "../data/siteMetadata";
import { useSEO } from "../utils/seo";

const caseStudy: CaseStudyData = {
  pageId: "mitsubishi",
  brand: "Mitsubishi Motors Australia",
  category: "Connected ownership",
  relationship: "Team experience",
  title: "Giving vehicle intelligence a calmer human interface.",
  summary:
    "A connected-ownership experience bringing vehicle health, servicing, and driving feedback into one understandable system.",
  facts: [
    { label: "Surface", value: "Connected ownership experience" },
    { label: "Attribution", value: "Team member contribution" },
    { label: "Focus", value: "Health, service, and driving feedback" },
    { label: "Public evidence", value: "Reasoning only; no outcome claims" },
  ],
  heroMedia: {
    label: "Project visual // Publication restricted",
    description: "Client-confidential imagery is not published here. An approved or anonymised ownership visual can be added after clearance.",
    placeholderLabel: "Confidential project visual",
    placeholderStatus: "Withheld",
  },
  proofNote:
    "Attributed team experience only. This was not a Userhood engagement, and Mitsubishi Motors has not endorsed this page. Confidential delivery details and results are omitted.",
  context:
    "Connected vehicles can produce more information than a driver can reasonably absorb. The product challenge was not to display every available signal, but to turn telemetry into timely, comprehensible actions across the ownership journey.",
  challenge:
    "Protect the driver's attention while still making vehicle health, maintenance needs, and efficiency feedback useful. The interface had to establish priority and context instead of behaving like a permanent diagnostic dashboard.",
  decisions: [
    {
      title: "Prioritise by driving context.",
      detail:
        "The contribution focused on what a driver needed now, what could wait, and what required action after the journey. Available data did not automatically earn screen space.",
    },
    {
      title: "Translate diagnostics into decisions.",
      detail:
        "Vehicle-health direction moved from technical codes towards plain consequences, next steps, and understandable ownership actions.",
    },
    {
      title: "Connect maintenance to fulfilment.",
      detail:
        "The journey connected detected needs to service discovery and scheduling because a warning without a resolution path only creates anxiety.",
    },
    {
      title: "Use feedback without manufacturing urgency.",
      detail:
        "Driving-feedback principles encouraged useful habits without noisy scores, false precision, or competitive mechanics that could distract from the road.",
    },
  ],
  documentedScope: [
    "Connected-ownership journey contribution",
    "Information-priority direction",
    "Vehicle-health communication principles",
    "Service discovery and scheduling flow",
    "Driving-feedback interaction direction",
    "Reusable interface-system thinking",
  ],
  evidenceBoundary:
    "No approved product imagery, client endorsement, research record, pilot dataset, or attributable performance metric is public. Treat this as a record of relevant team experience—not verified delivery or results by Userhood.",
  trademarkNote:
    "Mitsubishi Motors and related marks belong to their respective owners. Their appearance here is solely to identify the organisation associated with this team experience.",
  accent: "#00f5ff",
};

export default function CaseStudyMitsubishi({ onContactClick }: { onContactClick: () => void }) {
  useSEO(getPageSEO("mitsubishi"));

  return <CaseStudyLayout data={caseStudy} onContactClick={onContactClick} />;
}
