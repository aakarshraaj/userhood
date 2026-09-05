import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  trackAnalyticsEvent,
  trackPageView,
  type AnalyticsConsent,
} from "../utils/analytics";

export function AnalyticsConsentBanner({ suppressed = false }: { suppressed?: boolean }) {
  const location = useLocation();
  const [consent, setConsent] = useState<AnalyticsConsent | "loading">("loading");

  useEffect(() => {
    setConsent(getAnalyticsConsent());
  }, []);

  if (suppressed || location.pathname === "/privacy" || consent !== null) return null;

  const allowAnalytics = () => {
    setAnalyticsConsent(true);
    trackPageView(location.pathname);
    trackAnalyticsEvent("analytics_consent_update", { consent: "granted" });
    setConsent("granted");
  };

  const declineAnalytics = () => {
    setAnalyticsConsent(false);
    setConsent("denied");
  };

  return (
    <aside
      data-analytics-consent-banner
      aria-label="Analytics preference"
      className="fixed bottom-0 left-0 right-0 z-[80] bg-surface/95 px-4 py-3 shadow-2xl backdrop-blur-xl sm:bottom-4 sm:left-4 sm:right-4 sm:mx-auto sm:max-w-5xl sm:border sm:border-white/15 sm:px-5 sm:py-4"
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
        <div>
          <h2 className="text-sm font-bold text-white">Optional analytics</h2>
          <p className="mt-1 text-xs font-normal leading-relaxed text-slate-300 sm:text-sm">
            Help us understand which pages and actions are useful. Nothing loads until you allow it, and we use no advertising cookies. <Link to="/privacy" className="text-white underline underline-offset-4 hover:text-primary">Privacy details</Link>.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:min-w-[220px]">
          <button
            type="button"
            onClick={allowAnalytics}
            className="min-h-11 bg-primary px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-white"
          >
            Allow
          </button>
          <button
            type="button"
            onClick={declineAnalytics}
            className="min-h-11 border border-white/20 px-4 py-2 text-sm font-bold text-white transition-colors hover:border-white/50 hover:text-primary"
          >
            No thanks
          </button>
        </div>
      </div>
    </aside>
  );
}

export function AnalyticsPreferenceControl() {
  const location = useLocation();
  const [consent, setConsent] = useState<AnalyticsConsent>(null);

  useEffect(() => {
    setConsent(getAnalyticsConsent());
  }, []);

  const updateConsent = (granted: boolean) => {
    setAnalyticsConsent(granted);
    if (granted) {
      trackPageView(location.pathname);
      trackAnalyticsEvent("analytics_consent_update", { consent: "granted", source: "privacy_page" });
    }
    setConsent(granted ? "granted" : "denied");
  };

  return (
    <div className="border border-white/10 bg-white/[0.02] p-5">
      <p className="text-sm text-slate-300">
        Optional analytics are currently <strong className="font-bold text-white">{consent === "granted" ? "allowed" : "off"}</strong> on this device.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => updateConsent(true)}
          aria-pressed={consent === "granted"}
          className="min-h-11 border border-primary/40 px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-primary hover:bg-primary/10"
        >
          Allow analytics
        </button>
        <button
          type="button"
          onClick={() => updateConsent(false)}
          aria-pressed={consent !== "granted"}
          className="min-h-11 border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-white/70 hover:border-white/40 hover:text-white"
        >
          Turn analytics off
        </button>
      </div>
    </div>
  );
}
