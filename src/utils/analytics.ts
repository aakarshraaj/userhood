declare global {
    interface Window {
        gtag: (...args: any[]) => void;
    }
}

type AnalyticsValue = string | number | boolean | undefined;
export type AnalyticsParams = Record<string, AnalyticsValue>;

const ATTRIBUTION_KEY = "userhood_attribution";
const attributionParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export const captureAttribution = (): Record<string, string> => {
    if (typeof window === "undefined") return {};

    let existing: Record<string, string> = {};
    try {
        existing = JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_KEY) || "{}");
    } catch {
        existing = {};
    }

    const query = new URLSearchParams(window.location.search);
    const attribution = { ...existing };

    attributionParams.forEach((key) => {
        const value = query.get(key);
        if (value) attribution[key] = value;
    });

    if (!attribution.landing_path) attribution.landing_path = window.location.pathname;
    if (!attribution.referrer && document.referrer) attribution.referrer = document.referrer;

    try {
        window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
    } catch {
        // Analytics must never interrupt the product experience.
    }

    return attribution;
};

export const getAttribution = (): Record<string, string> => {
    if (typeof window === "undefined") return {};
    try {
        return JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_KEY) || "{}");
    } catch {
        return {};
    }
};

export const trackAnalyticsEvent = (name: string, params: AnalyticsParams = {}) => {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", name, params);
    }
};

export const trackPageView = (path: string) => {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("config", "G-690654KZJN", {
            page_path: path,
        });
    }
};
