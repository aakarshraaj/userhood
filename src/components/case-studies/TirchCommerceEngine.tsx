import type { LucideIcon } from "lucide-react";
import { ArrowRight, Database, Package, Server, ShoppingBag, UserRound } from "lucide-react";

interface CommerceStage {
  index: string;
  eyebrow: string;
  title: string;
  signal: string;
  detail: string;
  facts: string[];
  icon: LucideIcon;
  authority?: boolean;
}

const stages: CommerceStage[] = [
  {
    index: "01",
    eyebrow: "Merchandising",
    title: "Governed catalogue",
    signal: "10 live",
    detail: "Products, collections, campaign boundaries, permanent URLs, and commercial identifiers resolve from one catalogue model.",
    facts: ["3 collection systems", "Stable product IDs"],
    icon: Package,
  },
  {
    index: "02",
    eyebrow: "Customer selection",
    title: "Responsive bag state",
    signal: "M · 01",
    detail: "The bag preserves product choice, size, and quantity for a fast shopping experience—but its price is only a display snapshot.",
    facts: ["Size + quantity", "Display state only"],
    icon: ShoppingBag,
  },
  {
    index: "03",
    eyebrow: "Commerce authority",
    title: "Server-priced quote",
    signal: "₹2,499",
    detail: "Checkout reloads every product, checks live status, rebuilds the amount, and applies commercial rules away from browser control.",
    facts: ["Catalogue repriced", "Order rules applied"],
    icon: Server,
    authority: true,
  },
  {
    index: "04",
    eyebrow: "Private lifecycle",
    title: "Identity to order",
    signal: "OTP → order",
    detail: "Passwordless sessions connect customer identity, addresses, order history, delivery updates, and transactional communication.",
    facts: ["Private account state", "Server-led lifecycle"],
    icon: UserRound,
  },
];

const browserState = ["Selected product", "Chosen size", "Quantity", "Display-price snapshot"];
const serverState = ["Whether a product is live", "Authoritative price", "Promotions and delivery rules", "Order and payment state"];

function StageArrow() {
  return (
    <div className="flex items-center justify-center py-2 text-[var(--color-primary)]" aria-hidden="true">
      <ArrowRight className="h-5 w-5 rotate-90 lg:rotate-0" />
    </div>
  );
}

export default function TirchCommerceEngine() {
  return (
    <section className="relative overflow-hidden border-y border-black/15 bg-[#ebe6de] px-5 py-16 text-[#151512] md:px-8 md:py-24" aria-labelledby="tirch-commerce-engine-title">
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,20,17,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(20,20,17,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="font-mono text-xs font-bold uppercase tracking-[0.17em] text-[var(--color-primary)]">Tirch signature system // Commerce engine</div>
            <h2 id="tirch-commerce-engine-title" className="mt-5 max-w-5xl text-4xl font-black leading-[0.92] tracking-tighter md:text-7xl">
              The storefront is the surface. This is the engine underneath it.
            </h2>
          </div>
          <p className="max-w-lg text-base font-medium leading-relaxed text-black/65 md:col-span-4 md:justify-self-end md:text-lg">
            One transaction crosses merchandising, client state, authoritative pricing, customer identity, and operational fulfilment without confusing their responsibilities.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-2 lg:grid-cols-[1fr_38px_1fr_38px_1fr_38px_1fr]">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <div key={stage.index} className="contents">
                <article
                  className={`flex min-h-[360px] flex-col border p-6 md:p-7 ${
                    stage.authority
                      ? "border-black bg-[var(--color-primary)] text-black shadow-[12px_12px_0_rgba(20,20,17,0.16)]"
                      : "border-black/20 bg-[#f5f1ea]/90"
                  }`}
                >
                  <div className="flex items-center justify-between gap-5">
                    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.15em] ${stage.authority ? "text-black/60" : "text-black/45"}`}>
                      {stage.index} // {stage.eyebrow}
                    </span>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-9 font-mono text-[10px] font-bold uppercase tracking-[0.14em] opacity-55">System signal</div>
                  <div className="mt-2 text-[clamp(2.1rem,3vw,3.8rem)] font-black leading-none tracking-tighter">{stage.signal}</div>
                  <h3 className="mt-7 text-xl font-black tracking-tight">{stage.title}</h3>
                  <p className={`mt-3 text-sm leading-relaxed ${stage.authority ? "text-black/70" : "text-black/60"}`}>{stage.detail}</p>
                  <div className={`mt-auto grid gap-2 border-t pt-5 font-mono text-[10px] uppercase tracking-[0.1em] ${stage.authority ? "border-black/20 text-black/60" : "border-black/10 text-black/50"}`}>
                    {stage.facts.map((fact) => <span key={fact}>{fact}</span>)}
                  </div>
                </article>
                {index < stages.length - 1 && <StageArrow />}
              </div>
            );
          })}
        </div>

        <div className="mt-14 grid border border-black/20 bg-black md:grid-cols-2">
          <article className="bg-[#f5f1ea] p-7 md:p-10">
            <div className="flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-black/50">
              <ShoppingBag className="h-4 w-4" /> The browser may carry
            </div>
            <ul className="mt-7 grid gap-px bg-black/10 sm:grid-cols-2">
              {browserState.map((item) => (
                <li key={item} className="bg-[#f5f1ea] px-4 py-4 text-sm font-bold">{item}</li>
              ))}
            </ul>
          </article>

          <article className="border-t border-white/15 bg-[#151512] p-7 text-white md:border-l md:border-t-0 md:p-10">
            <div className="flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-primary)]">
              <Database className="h-4 w-4" /> The server owns the promise
            </div>
            <ul className="mt-7 grid gap-px bg-white/10 sm:grid-cols-2">
              {serverState.map((item) => (
                <li key={item} className="bg-[#151512] px-4 py-4 text-sm font-bold">{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="grid border-x border-b border-black/20 bg-[#f5f1ea] sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Catalogue", "Live"],
            ["Customer accounts", "Ready"],
            ["Checkout quoting", "Server-led"],
            ["Production payments", "Gated"],
          ].map(([label, state]) => (
            <div key={label} className="flex items-center justify-between gap-4 border-black/15 px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.12em] sm:[&:nth-child(even)]:border-l lg:border-l lg:first:border-l-0">
              <span className="text-black/50">{label}</span>
              <span className="text-[var(--color-primary)]">{state}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
