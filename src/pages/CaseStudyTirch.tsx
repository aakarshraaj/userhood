import CaseStudyLayout, { type CaseStudyData } from "../components/CaseStudyLayout";
import { getPageSEO } from "../data/siteMetadata";
import { useSEO } from "../utils/seo";

const caseStudy: CaseStudyData = {
  pageId: "tirch",
  brand: "Tirch",
  category: "Commerce systems",
  relationship: "Repository-backed product build",
  title: "A fashion storefront engineered to know exactly what it can promise.",
  summary:
    "A server-rendered apparel storefront with a real catalogue, account and checkout foundations, operational guardrails, and a deliberately gated pre-launch payment boundary.",
  facts: [
    { label: "Surface", value: "Responsive web commerce" },
    { label: "Delivery", value: "Product, brand, design, engineering" },
    { label: "Platform", value: "Cloudflare Workers + D1" },
    { label: "State", value: "Pre-launch commerce foundation" },
  ],
  heroMedia: {
    label: "Hero image // Storefront and collection system",
    description: "Replace with a wide product view showing the Tirch storefront, collection hierarchy, and photographic art direction.",
  },
  proofNote:
    "This case study is grounded in the working Tirch repository and its implementation documentation. It describes shipped product and system behaviour, not unverified commercial results.",
  context:
    "A small-batch apparel storefront appears simple until product truth, collection boundaries, customer accounts, delivery rules, image performance, and payment readiness all have to agree. Tirch needed a brand-forward experience without letting visual confidence outrun operational reality.",
  challenge:
    "Build a fast, distinctive commerce product while ensuring the browser never becomes the authority for price, sensitive account state, payment success, or claims the business is not ready to keep.",
  decisions: [
    {
      title: "Make the server—not the bag—the source of price truth.",
      detail:
        "The browser carries a convenient display snapshot. Checkout rebuilds every amount from the authoritative catalogue, applies order rules, rejects non-live products, and never trusts a client-supplied price.",
      media: {
        label: "Product image // Bag to verified quote",
        description: "Replace with an annotated bag and checkout sequence showing where display state ends and the server-verified quote begins.",
      },
    },
    {
      title: "Separate the fast storefront from private account state.",
      detail:
        "Public catalogue and policy pages can be prerendered and cached aggressively. Account, address, order, and session surfaces stay private and server-led, with real loading, retry, empty, and failure states.",
      media: {
        label: "Product image // Account and order states",
        description: "Replace with a desktop-and-mobile account composite covering profile, addresses, order history, and truthful empty states.",
      },
    },
    {
      title: "Turn brand rules into product rules.",
      detail:
        "The identity is more than a wordmark. Collection boundaries, voice, accessibility contrast, permanent URLs, and stable commercial identifiers are encoded so a rebrand cannot silently damage merchandising or customer records.",
      media: {
        label: "Product image // Brand system in commerce",
        description: "Replace with collection, product-detail, and campaign screens showing how Tirch stays coherent without flattening distinct ranges.",
      },
    },
    {
      title: "Design pre-launch honesty into the system.",
      detail:
        "Concept pieces do not masquerade as available stock, missing operational facts stay missing, and payment remains disabled until the business and infrastructure are ready. The product fails closed instead of inventing readiness.",
    },
  ],
  documentedScope: [
    "Brand and responsive storefront system",
    "Catalogue, collections, product pages, and bag",
    "Server-authoritative checkout quoting",
    "OTP accounts, addresses, and order-history surfaces",
    "Cloudflare Worker, D1, email, analytics, and image pipeline",
    "Accessibility, metadata, performance, and regression guardrails",
  ],
  evidenceBoundary:
    "The repository supports these product and engineering claims. It does not establish commercial launch, enabled payment, revenue, conversion improvement, or tracked inventory because those states are intentionally gated or not yet evidenced.",
  accent: "#d2694a",
};

export default function CaseStudyTirch({ onContactClick }: { onContactClick: () => void }) {
  useSEO(getPageSEO("tirch"));

  return <CaseStudyLayout data={caseStudy} onContactClick={onContactClick} />;
}
