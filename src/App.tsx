import { useState, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";
import StickyContactCTA from "./components/StickyContactCTA";
import RedlineInspector from "./components/RedlineInspector";
import CustomCursor from "./components/CustomCursor";
import DeveloperConsole from "./components/DeveloperConsole";
import MultiplayerSim from "./components/MultiplayerSim";

import { trackPageView, trackEvent } from "./utils/analytics";

import { useSEO } from "./utils/seo";


// Below-the-fold homepage sections — lazy loaded
const SelectedWork = lazy(() => import("./components/SelectedWork"));
const TwelveWeekBuild = lazy(() => import("./components/TwelveWeekBuild"));
const EngagementModels = lazy(() => import("./components/EngagementModels"));
const FounderOrigin = lazy(() => import("./components/FounderOrigin"));
const FinalCTA = lazy(() => import("./components/FinalCTA"));

const CaseStudyMitsubishi = lazy(() => import("./pages/CaseStudyMitsubishi"));
const CaseStudyHyundai = lazy(() => import("./pages/CaseStudyHyundai"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Services = lazy(() => import("./pages/Services"));
const Careers = lazy(() => import("./pages/Careers"));
const JobDetail = lazy(() => import("./pages/JobDetail"));

const HOME_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Userhood",
  url: "https://userhood.in",
  logo: "https://userhood.in/logo.png",
  description: "A senior product design and engineering studio that takes funded startups from product brief to a production-ready MVP in 12 weeks.",
  sameAs: [
    "https://twitter.com/userhood",
    "https://in.linkedin.com/company/userhood",
    "https://instagram.com/userhood.in"
  ],
  knowsAbout: ["MVP Development", "Product Design", "Software Engineering", "AI Product Development", "UX Design"],
};

function HomeSEO() {
  useSEO({
    title: "Userhood — AI-Powered MVPs for Funded Startups, Shipped in 12 Weeks",
    description: "One senior team takes your MVP from product brief to production in 12 weeks — strategy, product design, engineering, and AI without the handoff drag.",
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
  const location = useLocation();

  useEffect(() => {
    if (location.search.includes("contact=true")) {
      setIsContactOpen(true);
      // Remove contact=true parameter from URL
      const url = new URL(window.location.href);
      url.searchParams.delete("contact");
      window.history.replaceState({}, document.title, url.pathname + url.search + url.hash);
    }
  }, [location]);

  const handleContactClick = (source: string) => {
    setIsContactOpen(true);
    trackEvent('open_contact_modal', 'conversion', source);
  };

  return (
    <div className="min-h-screen selection:bg-primary selection:text-black">
      <RouteTracker />
      <RedlineInspector />
      <CustomCursor />
      <DeveloperConsole />
      <MultiplayerSim />
      <Navbar onContactClick={() => handleContactClick('navbar')} />





      <Suspense fallback={<div className="min-h-screen bg-background-dark flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin-slow"></div></div>}>
        <Routes>
          <Route path="/" element={
            <main>
              <HomeSEO />
              <Hero onContactClick={() => handleContactClick('hero')} />
              <SelectedWork />
              <TwelveWeekBuild />
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
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:slug" element={<JobDetail />} />
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
