declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

type AnalyticsValue = string | number | boolean | undefined;
export type AnalyticsParams = Record<string, AnalyticsValue>;

const ATTRIBUTION_KEY = "userhood_attribution";
const CONSENT_KEY = "userhood_analytics_consent";
const GA_MEASUREMENT_ID = "G-690654KZJN";
const attributionParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
let analyticsInitialized = false;

export type AnalyticsConsent = "granted" | "denied" | null;

export const getAnalyticsConsent = (): AnalyticsConsent => {
    if (typeof window === "undefined") return null;

    try {
        const storedConsent = window.localStorage.getItem(CONSENT_KEY);
        return storedConsent === "granted" || storedConsent === "denied" ? storedConsent : null;
    } catch {
        return null;
    }
};

const deleteAnalyticsCookies = () => {
    if (typeof document === "undefined") return;

    try {
        document.cookie.split(";").forEach((cookie) => {
            const cookieName = cookie.split("=")[0]?.trim();
            if (!cookieName?.startsWith("_ga")) return;

            document.cookie = `${cookieName}=; Max-Age=0; path=/; SameSite=Lax`;
            document.cookie = `${cookieName}=; Max-Age=0; path=/; domain=${window.location.hostname}; SameSite=Lax`;
            if (window.location.hostname.endsWith("userhood.in")) {
                document.cookie = `${cookieName}=; Max-Age=0; path=/; domain=.userhood.in; SameSite=Lax`;
            }
        });
    } catch {
        // Cookie controls may be unavailable in hardened browser contexts.
    }
};

export const initializeAnalytics = (): boolean => {
    if (typeof window === "undefined") return false;

    if (getAnalyticsConsent() !== "granted") {
        deleteAnalyticsCookies();
        return false;
    }

    if (!import.meta.env.PROD || analyticsInitialized) {
        return false;
    }

    analyticsInitialized = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || ((...args: unknown[]) => window.dataLayer?.push(args));
    window.gtag("consent", "default", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
    });

    const analyticsScript = document.createElement("script");
    analyticsScript.async = true;
    analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    analyticsScript.dataset.userhoodAnalytics = "true";
    document.head.appendChild(analyticsScript);

    return true;
};

export const setAnalyticsConsent = (granted: boolean) => {
    if (typeof window === "undefined") return;

    const consent: Exclude<AnalyticsConsent, null> = granted ? "granted" : "denied";
    try {
        window.localStorage.setItem(CONSENT_KEY, consent);
    } catch {
        // A blocked storage API should not block the website.
    }

    if (granted) {
        initializeAnalytics();
        return;
    }

    window.gtag?.("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
    });
    deleteAnalyticsCookies();
};

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
    if (typeof window !== "undefined" && getAnalyticsConsent() === "granted" && window.gtag) {
        window.gtag("event", name, params);
    }
};

export const trackPageView = (path: string) => {
    if (typeof window !== "undefined" && getAnalyticsConsent() === "granted" && window.gtag) {
        window.gtag("event", "page_view", {
            page_path: path,
            page_location: `${window.location.origin}${path}`,
            page_title: document.title,
        });
    }
};
