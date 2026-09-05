import { useEffect, useRef, useState, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";
import { AnalyticsConsentBanner } from "./components/AnalyticsConsent";
import StickyContactCTA from "./components/StickyContactCTA";
import { getPageMetadata, getPageSEO } from "./data/siteMetadata";

import { captureAttribution, trackAnalyticsEvent, trackPageView } from "./utils/analytics";

import { useSEO } from "./utils/seo";


// Below-the-fold homepage sections — lazy loaded
const SelectedWork = lazy(() => import("./components/SelectedWork"));
const TwelveWeekBuild = lazy(() => import("./components/TwelveWeekBuild"));
const EngagementModels = lazy(() => import("./components/EngagementModels"));
const FounderOrigin = lazy(() => import("./components/FounderOrigin"));
const FinalCTA = lazy(() => import("./components/FinalCTA"));

const CaseStudyMitsubishi = lazy(() => import("./pages/CaseStudyMitsubishi"));
const CaseStudyHyundai = lazy(() => import("./pages/CaseStudyHyundai"));
const CaseStudyRentnama = lazy(() => import("./pages/CaseStudyRentnama"));
const CaseStudyTirch = lazy(() => import("./pages/CaseStudyTirch"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Services = lazy(() => import("./pages/Services"));
const Careers = lazy(() => import("./pages/Careers"));
const JobDetail = lazy(() => import("./pages/JobDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

function HomeSEO() {
  useSEO(getPageSEO("home"));
  return null;
}

function RouteTracker() {
  const { pathname, hash } = useLocation();
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useEffect(() => {
    const isRouteChange = previousPathRef.current !== null && previousPathRef.current !== pathname;
    previousPathRef.current = pathname;

    let hashObserver: MutationObserver | null = null;
    let hashObserverTimeout: number | null = null;
    let positionFrame: number | null = null;
    let previousScrollBehavior: string | null = null;

    const placeViewport = (target?: HTMLElement) => {
      const root = document.documentElement;
      if (previousScrollBehavior === null) previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";

      if (target) {
        target.scrollIntoView({ block: "start" });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }

      if (positionFrame) window.cancelAnimationFrame(positionFrame);
      positionFrame = window.requestAnimationFrame(() => {
        if (!target) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        root.style.scrollBehavior = previousScrollBehavior ?? "";
        previousScrollBehavior = null;
        positionFrame = null;
      });
    };

    if (hash) {
      const scrollToHash = () => {
        const target = document.getElementById(hash.slice(1));
        if (!target) return false;
        placeViewport(target);
        return true;
      };

      if (!scrollToHash()) {
        hashObserver = new MutationObserver(() => {
          if (scrollToHash()) hashObserver?.disconnect();
        });
        const mainContent = document.getElementById("main-content");
        if (mainContent) hashObserver.observe(mainContent, { childList: true, subtree: true });
        hashObserverTimeout = window.setTimeout(() => hashObserver?.disconnect(), 3000);
      }
    } else {
      placeViewport();
    }

    const routeUpdate = window.setTimeout(() => {
      trackPageView(pathname);

      const announcer = document.getElementById("route-announcer");
      if (announcer) announcer.textContent = `${document.title} loaded`;

      if (isRouteChange && !hash) document.getElementById("main-content")?.focus();
    }, 0);

    return () => {
      window.clearTimeout(routeUpdate);
      if (hashObserverTimeout) window.clearTimeout(hashObserverTimeout);
      if (positionFrame) window.cancelAnimationFrame(positionFrame);
      if (previousScrollBehavior !== null) document.documentElement.style.scrollBehavior = previousScrollBehavior;
      hashObserver?.disconnect();
    };
  }, [pathname, hash]);
  return null;
}
export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactSource, setContactSource] = useState("unknown");
  const location = useLocation();

  useEffect(() => {
    captureAttribution();
    const params = new URLSearchParams(location.search);
    if (params.get("contact") === "true") {
      const source = params.get("source") || "direct_contact_link";
      setContactSource(source);
      setIsContactOpen(true);
      trackAnalyticsEvent("lead_form_open", { source });
      // Remove contact=true parameter from URL
      const url = new URL(window.location.href);
      url.searchParams.delete("contact");
      url.searchParams.delete("source");
      window.history.replaceState({}, document.title, url.pathname + url.search + url.hash);
    }
  }, [location]);

  const handleContactClick = (source: string) => {
    setContactSource(source);
    setIsContactOpen(true);
    trackAnalyticsEvent("lead_form_open", { source });
  };

  return (
    <div className="min-h-screen selection:bg-primary selection:text-black">
        <div id="site-shell">
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <RouteTracker />
          <Navbar onContactClick={() => handleContactClick('navbar')} onMenuOpenChange={setIsMenuOpen} />

          <div id="main-content" tabIndex={-1} className="outline-none">
            <Suspense fallback={<div className="min-h-screen bg-background-dark flex items-center justify-center" role="status" aria-label="Loading page"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin-slow"></div></div>}>
              <Routes>
                <Route path={getPageMetadata("home").path} element={
                  <main data-page-id="home">
                    <HomeSEO />
                    <Hero onContactClick={() => handleContactClick('hero')} />
                    <SelectedWork />
                    <TwelveWeekBuild />
                    <EngagementModels onContactClick={() => handleContactClick('engagement_models')} />
                    <FounderOrigin />
                    <FinalCTA onContactClick={() => handleContactClick('final_cta')} />
                  </main>
                } />
                <Route path={getPageMetadata("mitsubishi").path} element={<CaseStudyMitsubishi onContactClick={() => handleContactClick('mitsubishi_case_study')} />} />
                <Route path={getPageMetadata("hyundai").path} element={<CaseStudyHyundai onContactClick={() => handleContactClick('hyundai_case_study')} />} />
                <Route path={getPageMetadata("rentnama").path} element={<CaseStudyRentnama onContactClick={() => handleContactClick('rentnama_case_study')} />} />
                <Route path={getPageMetadata("tirch").path} element={<CaseStudyTirch onContactClick={() => handleContactClick('tirch_case_study')} />} />
                <Route path={getPageMetadata("services").path} element={<Services />} />
                <Route path={getPageMetadata("about").path} element={<About />} />
                <Route path={getPageMetadata("privacy").path} element={<Privacy />} />
                <Route path={getPageMetadata("terms").path} element={<Terms />} />
                <Route path={getPageMetadata("careers").path} element={<Careers />} />
                <Route path={`${getPageMetadata("careers").path}/:slug`} element={<JobDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>

          <Footer />
          <StickyContactCTA
            onContactClick={() => handleContactClick('sticky_mobile')}
            suppressed={isContactOpen || isMenuOpen}
          />
          <AnalyticsConsentBanner suppressed={isContactOpen || isMenuOpen} />
          <div id="route-announcer" className="sr-only" aria-live="polite" aria-atomic="true" />
        </div>

        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          source={contactSource}
        />
    </div>
  );
}
