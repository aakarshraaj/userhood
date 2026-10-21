import CaseStudyLayout, { type CaseStudyData } from "../components/CaseStudyLayout";
import TirchCommerceEngine from "../components/case-studies/TirchCommerceEngine";
import { getPageSEO } from "../data/siteMetadata";
import { useSEO } from "../utils/seo";

const caseStudy: CaseStudyData = {
  pageId: "tirch",
  brand: "Tirch",
  category: "End-to-end commerce engine",
  relationship: "Product build",
  title: "An entire commerce engine. Unmistakably Tirch.",
  summary:
    "A fashion label’s personality shouldn’t end at the campaign. Tirch carries it through the shop, the bag and the account, with a complete commerce system behind the experience.",
  question: "How could the whole shopping experience feel as considered as the clothes?",
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
    "Screens show the captured product and its commerce flows. Payment and launch readiness are noted separately; no unverified sales or conversion results are claimed.",
  outcome: {
    title: "The brand has a place to live, and a system to run on.",
    summary:
      "Campaigns, collections and product pages connect to a bag, checkout quotes, customer accounts and order handling. The experience has its own character, with the necessary commerce rules behind it.",
    metrics: [
      { value: "10", label: "products in the catalogue", detail: "Captured product snapshot" },
      { value: "3", label: "collections", detail: "After Hours, Meme Fest, and Pujo ’26" },
      { value: "0", label: "passwords in the customer flow", detail: "OTP-based account identity" },
      { value: "1", label: "authoritative source of price", detail: "Server-rebuilt checkout quote" },
    ],
  },
  context:
    "A shopper moves from an image to a product, a size, a price and an order. Tirch needed that journey to feel like one brand, with reliable information at every step.",
  challenge:
    "Give the brand room to express itself without compromising pricing, customer privacy or the accuracy of an order.",
  decisions: [
    {
      title: "Make the price trustworthy.",
      story: {
        before: "A price saved in the browser can be out of date or changed.",
        intervention: "Check each item and calculate the total again on the server before checkout.",
        consequence: "The quote reflects the current product and pricing rules.",
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
      title: "Keep shopping open and personal details private.",
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
      title: "Give each collection character without losing the brand.",
      story: {
        before: "Different campaigns can make a shop feel like several unrelated brands.",
        intervention: "Give collections their own expression within shared naming, navigation and product rules.",
        consequence: "The ranges can feel different while still belonging to Tirch.",
      },
    },
    {
      title: "Only promise what is ready.",
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
