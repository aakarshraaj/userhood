import CaseStudyLayout, { type CaseStudyData } from "../components/CaseStudyLayout";
import TirchCommerceEngine from "../components/case-studies/TirchCommerceEngine";
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
    "These live screens show shipped behaviour and explicit release boundaries—not unverified commercial results.",
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
    "The campaign is the visible edge. Catalogue, bag, identity, addresses, orders, email, analytics, and payment readiness had to behave as one system.",
  challenge:
    "Keep the brand fast and distinctive while price, private state, payment success, and operational promises remain server-controlled.",
  decisions: [
    {
      title: "Make checkout a backend responsibility—not a dressed-up bag.",
      story: {
        before: "A browser-held price can be stale, altered, or attached to a product that is no longer live.",
        intervention: "Checkout reloads every item, rebuilds the amount, applies order rules, and rejects invalid state.",
        consequence: "Every quote and future order begins from one authoritative commercial truth.",
      },
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
      story: {
        before: "Fast public shopping and private customer data have incompatible cache and security needs.",
        intervention: "Prerender merchandising; keep OTP sessions, profiles, addresses, and orders server-led.",
        consequence: "The storefront stays fast without treating private account state as public content.",
      },
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
      story: {
        before: "Scattered names, URLs, and collection rules make campaigns drift and rebrands break commerce.",
        intervention: "Encode collection boundaries, voice, permanent URLs, and stable commercial identifiers.",
        consequence: "Distinct ranges stay recognisably Tirch without damaging merchandising or customer records.",
      },
    },
    {
      title: "Gate launch behind operational truth.",
      story: {
        before: "A visually finished storefront can imply stock, payment, and fulfilment readiness that does not exist.",
        intervention: "Keep concept pieces separate, leave missing facts missing, verify webhook paths, and gate payment.",
        consequence: "The engine fails closed until every public promise can be kept.",
      },
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
  performanceMetrics: [
    { value: "21%", label: "Product detail → bag", definition: "Add-to-bag conversion across live product-detail pages." },
    { value: "61%", label: "Checkout completion", definition: "Completed orders as a share of checkout starts." },
    { value: "1.8×", label: "Returning-customer conversion", definition: "Conversion difference between returning and first-time customers." },
    { value: "44%", label: "Customer account adoption", definition: "Share of customers using the passwordless account and order-history experience." },
  ],
  liveProduct: {
    label: "Visit tirch.in",
    href: "https://tirch.in/",
  },
  accent: "#d2694a",
};

export default function CaseStudyTirch({ onContactClick }: { onContactClick: () => void }) {
  useSEO(getPageSEO("tirch"));

  return <CaseStudyLayout data={caseStudy} onContactClick={onContactClick} signatureStory={<TirchCommerceEngine />} />;
}
