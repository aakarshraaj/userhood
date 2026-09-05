import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getPageSEO, SITE_METADATA } from "../data/siteMetadata";
import { useSEO } from "../utils/seo";

const engagements = [
  {
    id: "launch",
    state: "New product",
    title: "12-week product build",
    description: "From brief to production in 12 weeks after scope.",
  },
  {
    id: "rescue",
    state: "Stuck product",
    title: "Product rescue",
    description: "We find the real blockage and decide what to repair, rebuild, or remove. Usually 2 to 4 weeks.",
  },
  {
    id: "extend",
    state: "Live product",
    title: "Next-release delivery",
    description: "We take one outcome through product, design, engineering, launch, and measurement. Scoped by release.",
  },
];

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Userhood product engagements",
  itemListElement: engagements.map((engagement, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: engagement.title,
      description: engagement.description,
      provider: {
        "@type": "Organization",
        name: "Userhood",
        url: SITE_METADATA.siteUrl,
      },
    },
  })),
};

export default function Services() {
  useSEO({
    ...getPageSEO("services"),
    jsonLd: serviceLd,
  });

  return (
    <main data-page-id="services" className="min-h-screen bg-background-dark pt-28 selection:bg-white selection:text-black md:pt-36">
      <header className="px-5 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-8">
            <div className="text-sm font-medium text-white/50">Services</div>
            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.9] tracking-tighter text-white sm:text-6xl md:text-8xl lg:text-[96px]">
              Three ways to move the product forward.
            </h1>
          </div>

          <div className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-slate-200 md:text-xl">
              New product, stuck product, or live product. Userhood brings product direction, design, and engineering together around the next release.
            </p>
            <Link
              to="/?contact=true&source=services_hero"
              className="motion-button mt-7 inline-flex min-h-[52px] items-center justify-center gap-3 bg-white px-6 py-4 text-sm font-bold text-black hover:bg-white/80"
            >
              Discuss your product <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <div aria-label="Services">
        {engagements.map((engagement, index) => (
          <section
            key={engagement.id}
            id={engagement.id}
            className={"section-band px-5 py-14 md:px-8 md:py-20 " + (index % 2 === 0 ? "section-band-raised" : "section-band-deep")}
            aria-labelledby={engagement.id + "-title"}
          >
            <div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-12 md:items-center md:gap-12">
              <div className="md:col-span-2">
                <div className="text-sm text-white/35">0{index + 1}</div>
                <div className="mt-3 text-sm font-medium text-white/55">{engagement.state}</div>
              </div>
              <h2
                id={engagement.id + "-title"}
                className="text-4xl font-black leading-[0.95] tracking-tighter text-white sm:text-5xl md:col-span-5 md:text-6xl"
              >
                {engagement.title}
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-slate-300 md:col-span-5 md:text-xl">
                {engagement.description}
              </p>
            </div>
          </section>
        ))}
      </div>

      <section className="section-band section-band-raised px-5 py-20 md:px-8 md:py-28" aria-labelledby="working-model-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-sm font-medium text-white/45">How we work</div>
          <h2
            id="working-model-title"
            className="mt-4 max-w-5xl text-4xl font-black leading-[0.95] tracking-tighter text-white sm:text-5xl md:text-7xl"
          >
            One team owns the release.
          </h2>
          <p className="mt-8 max-w-4xl text-lg leading-relaxed text-slate-200 md:text-2xl">
            One decision-maker from your side. Product, design, and engineering from ours. Weekly decisions. Production as the finish line.
          </p>
        </div>
      </section>

      <section className="section-band section-band-deep px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-8 bg-white/[0.045] p-7 md:grid-cols-12 md:items-center md:p-10 lg:p-14">
          <div className="md:col-span-8">
            <div className="text-sm font-medium text-white/45">Your move</div>
            <h2 className="mt-4 max-w-4xl text-4xl font-black leading-[0.96] tracking-tighter text-white md:text-6xl">
              Tell us what needs to ship.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              Send us the product, the constraint, and the timing. We will tell you if we can help.
            </p>
          </div>
          <Link
            to="/?contact=true&source=services_footer"
            className="motion-button inline-flex min-h-[54px] items-center justify-center gap-3 bg-white px-7 py-4 text-base font-bold text-black hover:bg-white/80 md:col-span-4 md:justify-self-end"
          >
            Discuss your product <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
