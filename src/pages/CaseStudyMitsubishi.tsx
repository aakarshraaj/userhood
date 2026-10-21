import CaseStudyLayout, { type CaseStudyData } from "../components/CaseStudyLayout";
import { getPageSEO } from "../data/siteMetadata";
import { useSEO } from "../utils/seo";

const caseStudy: CaseStudyData = {
  pageId: "mitsubishi",
  brand: "Mitsubishi Motors Australia",
  category: "Connected ownership",
  relationship: "Team experience",
  title: "Helping drivers make sense of their car.",
  question: "How can a connected car help someone know what needs attention and what can wait?",
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
      title: "Show what matters in the moment.",
      detail:
        "The contribution focused on what a driver needed now, what could wait, and what required action after the journey. Available data did not automatically earn screen space.",
    },
    {
      title: "Explain what a warning means.",
      detail:
        "Vehicle-health direction moved from technical codes towards plain consequences, next steps, and understandable ownership actions.",
    },
    {
      title: "Give a service reminder a next step.",
      detail:
        "The journey connected detected needs to service discovery and scheduling because a warning without a resolution path only creates anxiety.",
    },
    {
      title: "Help without adding distraction.",
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
    "No approved product imagery, client endorsement, research record, pilot dataset, or attributable performance metric is public. This records relevant team experience and does not claim verified delivery or results by Userhood.",
  trademarkNote:
    "Mitsubishi Motors and related marks belong to their respective owners. Their appearance here is solely to identify the organisation associated with this team experience.",
  accent: "#ffffff",
};

export default function CaseStudyMitsubishi({ onContactClick }: { onContactClick: () => void }) {
  useSEO(getPageSEO("mitsubishi"));

  return <CaseStudyLayout data={caseStudy} onContactClick={onContactClick} />;
}
