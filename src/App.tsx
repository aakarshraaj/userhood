import { useState, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";
import StickyContactCTA from "./components/StickyContactCTA";
import { trackPageView, trackEvent } from "./utils/analytics";
import { useSEO } from "./utils/seo";

// Below-the-fold homepage sections — lazy loaded
const ProblemSection = lazy(() => import("./components/ProblemSection"));
const PhilosophySection = lazy(() => import("./components/PhilosophySection"));
const OutcomesSection = lazy(() => import("./components/OutcomesSection"));
const StrategicInterventions = lazy(() => import("./components/StrategicInterventions"));
const ProcessGallery = lazy(() => import("./components/ProcessGallery"));
const CriteriaSection = lazy(() => import("./components/CriteriaSection"));
const EngagementModels = lazy(() => import("./components/EngagementModels"));
const FounderOrigin = lazy(() => import("./components/FounderOrigin"));
const FinalCTA = lazy(() => import("./components/FinalCTA"));
const AlignmentNetwork = lazy(() => import("./components/AlignmentNetwork"));

const CaseStudyMitsubishi = lazy(() => import("./pages/CaseStudyMitsubishi"));
const CaseStudyHyundai = lazy(() => import("./pages/CaseStudyHyundai"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Services = lazy(() => import("./pages/Services"));

const HOME_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Userhood",
  url: "https://userhood.in",
  logo: "https://userhood.in/logo.png",
  description: "A design-led product studio building world-class digital products, AI solutions, and brand systems for ambitious founders and enterprises.",
  sameAs: [
    "https://twitter.com/userhood",
    "https://in.linkedin.com/company/userhood",
    "https://instagram.com/userhood.in"
  ],
  knowsAbout: ["Product Design", "Software Engineering", "AI Integration", "Brand Identity", "UX Design"],
};

function HomeSEO() {
  useSEO({
    title: "Userhood — Product Design, Software Development & AI Services Studio",
    description: "Design that makes engineers nervous. Engineering that makes designers proud. Userhood builds world-class digital products, AI solutions & brand systems.",
    canonical: "https://userhood.in/",
    jsonLd: HOME_JSON_LD,
  });
  return null;
}

function RouteTracker() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(pathname);
  }, [pathname]);
  return null;
}


export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleContactClick = (source: string) => {
    setIsContactOpen(true);
    trackEvent('open_contact_modal', 'conversion', source);
  };

  return (
    <div className="min-h-screen selection:bg-primary selection:text-black">
      <RouteTracker />
      <Navbar onContactClick={() => handleContactClick('navbar')} />

      <Suspense fallback={<div className="min-h-screen bg-background-dark flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin-slow"></div></div>}>
        <Routes>
          <Route path="/" element={
            <main>
              <HomeSEO />
              <Hero onContactClick={() => handleContactClick('hero')} />
              <ProblemSection />
              <PhilosophySection />
              <StrategicInterventions />
              <ProcessGallery />
              <OutcomesSection />
              <section className="py-16 md:py-24 lg:py-32 px-5 md:px-8 bg-surface border-y border-white/5">
                <div className="max-w-[1440px] mx-auto">
                  <div className="font-mono text-[10px] text-primary mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary shrink-0" />
                    [ ALIGNMENT_ARCHITECTURE // CORE_TOPOLOGY ]
                  </div>
                  <AlignmentNetwork />
                </div>
              </section>
              <CriteriaSection />
              <EngagementModels onContactClick={() => handleContactClick('engagement_models')} />
              <FounderOrigin />
              <FinalCTA onContactClick={() => handleContactClick('final_cta')} />
            </main>
          } />
          <Route path="/case-study/mitsubishi" element={<CaseStudyMitsubishi onContactClick={() => handleContactClick('mitsubishi_cs')} />} />
          <Route path="/case-study/hyundai" element={<CaseStudyHyundai onContactClick={() => handleContactClick('hyundai_cs')} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </Suspense>

      <Footer />

      <StickyContactCTA onContactClick={() => handleContactClick('sticky_cta')} />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
