import CaseStudyLayout, { type CaseStudyData } from "../components/CaseStudyLayout";
import { getPageSEO } from "../data/siteMetadata";
import { useSEO } from "../utils/seo";

const caseStudy: CaseStudyData = {
  pageId: "tirch",
  brand: "Tirch",
  category: "End-to-end commerce engine",
  relationship: "Product build",
  title: "Building the commerce engine behind a fashion brand—not just its storefront.",
  summary:
    "An end-to-end commerce product spanning merchandising, bag, server-priced checkout, customer accounts, orders, transactional systems, analytics, and controlled launch operations.",
  facts: [
    { label: "Surface", value: "Brand storefront + customer account" },
    { label: "Delivery", value: "Product, brand, design, engineering" },
    { label: "Platform", value: "Cloudflare Workers + D1" },
    { label: "Engine", value: "Catalogue → quote → account → order" },
  ],
  heroMedia: {
    label: "Live product // Storefront + commerce engine",
    description: "The customer-facing expression of Tirch's wider merchandising, identity, checkout, and order system.",
    src: "/work/tirch-home.webp",
    alt: "Tirch's live storefront hero for the Ghungroo Break tee",
    secondarySrc: "/work/tirch-catalogue.webp",
    secondaryAlt: "Tirch shop catalogue showing three product worlds and collection hierarchy",
    treatment: "layered",
    priority: true,
  },
  proofNote:
    "The screens below come from the live product. The case study describes shipped behaviour and explicit release boundaries—not unverified commercial results.",
  outcome: {
    title: "One engine now carries the brand from discovery to post-purchase state.",
    summary:
      "The storefront is backed by a coherent commerce system: governed merchandising, server-authoritative pricing, bag and checkout flows, passwordless identity, private account data, orders, transactional email, analytics, and launch controls.",
    metrics: [
      { value: "10", label: "live products", detail: "Across the current product catalogue" },
      { value: "3", label: "governed collection systems", detail: "After Hours, Meme Fest, and Pujo ’26" },
      { value: "0", label: "passwords in the customer flow", detail: "OTP-based account identity" },
      { value: "1", label: "authoritative source of price", detail: "Server-rebuilt checkout quote" },
    ],
  },
  context:
    "The campaign and catalogue are the visible edge of a much larger product. Product truth, collection boundaries, bag state, customer identity, addresses, order history, delivery rules, transactional email, analytics, and payment readiness all have to agree. Tirch needed one coherent engine underneath the brand experience.",
  challenge:
    "Build the whole commerce journey without letting the browser become the authority for price, private customer state, payment success, or operational promises the business is not ready to keep.",
  decisions: [
    {
      title: "Make checkout a backend responsibility—not a dressed-up bag.",
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
      title: "Build identity, addresses, and orders as one customer system.",
      detail:
        "Public merchandising can be prerendered and cached aggressively. OTP sign-in, sessions, profiles, addresses, order history, and delivery updates stay private and server-led, with real loading, retry, empty, and failure states.",
      media: {
        label: "Live product // Private account boundary",
        description: "The private account surface starts with a passwordless, server-led sign-in boundary.",
        src: "/work/tirch-account.webp",
        alt: "Tirch passwordless account sign-in separating public shopping from private customer state",
        treatment: "inset",
      },
    },
    {
      title: "Make the brand system travel through the entire engine.",
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
      title: "Gate launch behind operational truth.",
      detail:
        "Concept pieces do not masquerade as available stock, missing operational facts stay missing, webhook paths are verified independently, and payment remains disabled until the business and infrastructure are ready. The engine fails closed instead of inventing readiness.",
    },
  ],
  documentedScope: [
    "Brand and responsive storefront system",
    "Catalogue, collections, product detail, bag, and merchandising rules",
    "Server-authoritative checkout quoting",
    "OTP identity, sessions, profiles, addresses, and order history",
    "Order lifecycle, payment-webhook boundary, and transactional email",
    "Cloudflare Worker, D1, analytics, and image pipeline",
    "Accessibility, metadata, performance, and regression guardrails",
  ],
  evidenceBoundary:
    "The live product and implementation support these product and engineering claims. They do not establish commercial launch, enabled payment, revenue, conversion improvement, or tracked inventory because those states are intentionally gated or not yet evidenced.",
  draftMetrics: [
    { value: "21%", label: "Product detail → bag", definition: "Replace with the measured add-to-bag conversion rate across live products." },
    { value: "61%", label: "Checkout completion", definition: "Replace with the order-completion rate once production payments are enabled." },
    { value: "1.8×", label: "Returning-customer conversion", definition: "Replace with the conversion difference between returning and first-time customers." },
    { value: "44%", label: "Customer account adoption", definition: "Replace with the share of customers who use the passwordless account and order-history experience." },
  ],
  liveProduct: {
    label: "Visit tirch.in",
    href: "https://tirch.in/",
  },
  accent: "#d2694a",
};

export default function CaseStudyTirch({ onContactClick }: { onContactClick: () => void }) {
  useSEO(getPageSEO("tirch"));

  return <CaseStudyLayout data={caseStudy} onContactClick={onContactClick} />;
}
