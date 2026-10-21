import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getPageSEO, SITE_METADATA } from "../data/siteMetadata";
import { useSEO } from "../utils/seo";
import { engagements } from "../data/studio";

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
        <div className="mx-auto max-w-[1440px]">
          <h1 className="max-w-5xl text-5xl font-medium leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl md:text-8xl lg:text-[88px]">
            Thinking as a Service.
          </h1>
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
              <h2
                id={engagement.id + "-title"}
                className="text-4xl font-medium leading-tight tracking-tighter text-white sm:text-5xl md:col-span-6 md:text-6xl"
              >
                {engagement.title}
              </h2>
              <div className="max-w-xl md:col-span-6 md:justify-self-end">
                <p className="text-base leading-relaxed text-slate-300 md:text-lg">{engagement.description}</p>
                <p className="mt-6 text-sm leading-relaxed text-white/60">{engagement.takeaway}</p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="section-band section-band-raised px-5 py-20 md:px-8 md:py-28" aria-labelledby="working-model-title">
        <div className="mx-auto max-w-[1440px]">
          <h2
            id="working-model-title"
            className="max-w-5xl text-4xl font-black leading-[0.95] tracking-tighter text-white sm:text-5xl md:text-7xl"
          >
            You don’t have to buy the whole thing.
          </h2>
          <p className="mt-8 max-w-4xl text-lg leading-relaxed text-slate-200 md:text-2xl">
            Hire us to work out the direction. Take the prototype to your team. Or keep us on through the build. Each engagement has its own scope, timing and budget.
          </p>
        </div>
      </section>

      <section className="section-band section-band-deep px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-8 bg-white/[0.045] p-7 md:grid-cols-12 md:items-center md:p-10 lg:p-14">
          <div className="md:col-span-8">
            <h2 className="max-w-4xl text-4xl font-black leading-[0.96] tracking-tighter text-white md:text-6xl">
              Give us something to think about.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              The product you want to exist. The problem you can’t leave alone. Start there.
            </p>
          </div>
          <Link
            to="/?contact=true&source=services_footer"
            className="motion-button inline-flex min-h-[54px] items-center justify-center gap-3 bg-white px-7 py-4 text-base font-bold text-black hover:bg-white/80 md:col-span-4 md:justify-self-end"
          >
            Let’s collaborate <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
