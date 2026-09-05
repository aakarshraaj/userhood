import CaseStudyLayout, { type CaseStudyData } from "../components/CaseStudyLayout";
import { getPageSEO } from "../data/siteMetadata";
import { useSEO } from "../utils/seo";

const caseStudy: CaseStudyData = {
  pageId: "tirch",
  brand: "Tirch",
  category: "Commerce systems",
  relationship: "Product build",
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
    label: "Live product // Campaign + catalogue system",
    description: "The live Tirch storefront, collection hierarchy, and photographic art direction.",
    src: "/work/tirch-home.webp",
    alt: "Tirch's live storefront hero for the Ghungroo Break tee",
    secondarySrc: "/work/tirch-catalogue.webp",
    secondaryAlt: "Tirch shop catalogue showing three product worlds and collection hierarchy",
    treatment: "layered",
    priority: true,
  },
  proofNote:
    "The screens below come from the live product. The case study describes shipped behaviour and explicit release boundaries—not unverified commercial results.",
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
        label: "Live product // Product to bag",
        description: "A product decision flows into a transparent bag before the server rebuilds the checkout quote.",
        src: "/work/tirch-product.webp",
        alt: "Tirch product page with price, material, fit, size choice, and delivery promises",
        secondarySrc: "/work/tirch-bag.webp",
        secondaryAlt: "Tirch shopping bag showing selected product, size, quantity, subtotal, and checkout handoff",
        treatment: "layered",
      },
    },
    {
      title: "Separate the fast storefront from private account state.",
      detail:
        "Public catalogue and policy pages can be prerendered and cached aggressively. Account, address, order, and session surfaces stay private and server-led, with real loading, retry, empty, and failure states.",
      media: {
        label: "Live product // Private account boundary",
        description: "The private account surface starts with a passwordless, server-led sign-in boundary.",
        src: "/work/tirch-account.webp",
        alt: "Tirch passwordless account sign-in separating public shopping from private customer state",
        treatment: "inset",
      },
    },
    {
      title: "Turn brand rules into product rules.",
      detail:
        "The identity is more than a wordmark. Collection boundaries, voice, accessibility contrast, permanent URLs, and stable commercial identifiers are encoded so a rebrand cannot silently damage merchandising or customer records.",
      media: {
        label: "Live product // One brand, distinct product worlds",
        description: "Campaign, catalogue, and product-detail screens stay recognisably Tirch without making every collection identical.",
        src: "/work/tirch-catalogue.webp",
        alt: "Tirch catalogue combining editorial hierarchy with distinct product photography",
        secondarySrc: "/work/tirch-product.webp",
        secondaryAlt: "Tirch product detail page carrying the same brand rules into commerce decisions",
        treatment: "layered",
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
    "The live product and implementation support these product and engineering claims. They do not establish commercial launch, enabled payment, revenue, conversion improvement, or tracked inventory because those states are intentionally gated or not yet evidenced.",
  accent: "#d2694a",
};

export default function CaseStudyTirch({ onContactClick }: { onContactClick: () => void }) {
  useSEO(getPageSEO("tirch"));

  return <CaseStudyLayout data={caseStudy} onContactClick={onContactClick} />;
}
