import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  trackAnalyticsEvent,
  trackPageView,
  type AnalyticsConsent,
} from "../utils/analytics";

export function AnalyticsConsentBanner() {
  const location = useLocation();
  const [consent, setConsent] = useState<AnalyticsConsent | "loading">("loading");

  useEffect(() => {
    setConsent(getAnalyticsConsent());
  }, []);

  if (location.pathname === "/privacy" || consent !== null) return null;

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
      aria-label="Analytics preference"
      className="fixed bottom-4 left-4 right-4 z-[80] mx-auto max-w-3xl border border-white/15 bg-surface p-5 shadow-2xl sm:bottom-6 sm:p-6"
    >
      <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <h2 className="text-base font-bold text-white">Analytics are your choice.</h2>
          <p className="mt-2 text-sm font-light leading-relaxed text-slate-400">
            We use optional Google Analytics to understand which pages and calls to action are useful. No advertising cookies, and no analytics until you allow it. <Link to="/privacy" className="text-white underline underline-offset-4 hover:text-primary">Read the privacy policy</Link>.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:min-w-44">
          <button
            type="button"
            onClick={allowAnalytics}
            className="min-h-11 bg-primary px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-black transition-colors hover:bg-white"
          >
            Allow analytics
          </button>
          <button
            type="button"
            onClick={declineAnalytics}
            className="min-h-11 border border-white/15 px-5 py-3 font-mono text-xs uppercase tracking-[0.1em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
          >
            Continue without
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
