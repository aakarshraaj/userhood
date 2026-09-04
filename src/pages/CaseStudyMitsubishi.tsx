import CaseStudyLayout, { type CaseStudyData } from "../components/CaseStudyLayout";
import { useSEO } from "../utils/seo";

const caseStudy: CaseStudyData = {
  brand: "Mitsubishi Motors Australia",
  category: "Connected ownership",
  title: "Giving vehicle intelligence a calmer human interface.",
  summary:
    "A connected-ownership experience bringing vehicle health, servicing, and driving feedback into one understandable system.",
  context:
    "Connected vehicles can produce more information than a driver can reasonably absorb. The product challenge was not to display every available signal, but to turn telemetry into timely, comprehensible actions across the ownership journey.",
  challenge:
    "Protect the driver's attention while still making vehicle health, maintenance needs, and efficiency feedback useful. The interface had to establish priority and context instead of behaving like a permanent diagnostic dashboard.",
  decisions: [
    {
      title: "Prioritise by driving context.",
      detail:
        "Information was organised around what a driver needed now, what could wait, and what required action after the journey. Availability of data did not automatically justify visibility.",
    },
    {
      title: "Translate diagnostics into decisions.",
      detail:
        "Vehicle-health signals were framed in plain consequences and next steps, moving the experience away from technical codes and towards understandable ownership actions.",
    },
    {
      title: "Connect maintenance to fulfilment.",
      detail:
        "A warning without a resolution path creates anxiety. The journey connected detected needs to service discovery and scheduling so the product could help complete the task.",
    },
    {
      title: "Use feedback without manufacturing urgency.",
      detail:
        "Driving feedback was designed to encourage useful habits while avoiding noisy scores, false precision, and competitive mechanics that could distract from the road.",
    },
  ],
  documentedScope: [
    "Connected-ownership journey architecture",
    "Information-priority model",
    "Vehicle-health communication patterns",
    "Service discovery and scheduling flow",
    "Driving-feedback interaction direction",
    "Reusable interface-system thinking",
  ],
  evidenceBoundary:
    "We do not publish a client-approved research report or pilot dataset for this work. This page therefore makes no numerical claim about cognitive load, adoption, fuel efficiency, or system performance.",
  trademarkNote:
    "Mitsubishi Motors and related marks belong to their respective owners. Their appearance here is solely to identify the organisation associated with this team experience.",
};

export default function CaseStudyMitsubishi({ onContactClick }: { onContactClick: () => void }) {
  useSEO({
    title: "Mitsubishi Connected Ownership — Team Experience | Userhood",
    description:
      "A transparent team-experience case study covering the product decisions behind a connected vehicle ownership interface.",
    canonical: "https://userhood.in/case-study/mitsubishi",
  });

  return <CaseStudyLayout data={caseStudy} onContactClick={onContactClick} />;
}
