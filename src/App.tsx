import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import PhilosophySection from "./components/PhilosophySection";
import OutcomesSection from "./components/OutcomesSection";
import StrategicInterventions from "./components/StrategicInterventions";
import ProcessGallery from "./components/ProcessGallery";
import CriteriaSection from "./components/CriteriaSection";
import EngagementModels from "./components/EngagementModels";
import FounderOrigin from "./components/FounderOrigin";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";
import StickyContactCTA from "./components/StickyContactCTA";
import CaseStudyMitsubishi from "./pages/CaseStudyMitsubishi";
import CaseStudyHyundai from "./pages/CaseStudyHyundai";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

import { trackPageView, trackEvent } from "./utils/analytics";

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

      <Routes>
        <Route path="/" element={
          <main>
            <Hero onContactClick={() => handleContactClick('hero')} />
            <ProblemSection />
            <PhilosophySection />
            <StrategicInterventions />
            <ProcessGallery />
            <OutcomesSection />
            <CriteriaSection />
            <EngagementModels onContactClick={() => handleContactClick('engagement_models')} />
            <FounderOrigin />
            <FinalCTA onContactClick={() => handleContactClick('final_cta')} />
          </main>
        } />
        <Route path="/case-study/mitsubishi" element={<CaseStudyMitsubishi onContactClick={() => handleContactClick('mitsubishi_cs')} />} />
        <Route path="/case-study/hyundai" element={<CaseStudyHyundai onContactClick={() => handleContactClick('hyundai_cs')} />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>

      <Footer />

      <StickyContactCTA onContactClick={() => handleContactClick('sticky_cta')} />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
