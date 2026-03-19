import { useEffect } from "react";

interface SEOConfig {
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string;
    ogType?: "website" | "article";
    jsonLd?: object;
}

const BASE_URL = "https://userhood.in";
const DEFAULT_OG = "/og-image.jpg";
const TWITTER_OG = "/twitter-image.jpg";

function setMeta(selector: string, attrKey: string, attrVal: string, content: string) {
    let el = document.querySelector<HTMLMetaElement>(selector);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrKey, attrVal);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
}

export function useSEO({
    title,
    description,
    canonical,
    ogImage = DEFAULT_OG,
    ogType = "website",
    jsonLd,
}: SEOConfig) {
    useEffect(() => {
        // Title
        document.title = title;

        // Canonical
        const canonicalUrl = canonical ?? `${BASE_URL}${window.location.pathname}`;
        let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (canonicalEl) {
            canonicalEl.href = canonicalUrl;
        }

        // Standard meta
        setMeta('meta[name="description"]', "name", "description", description);

        // OG
        setMeta('meta[property="og:title"]', "property", "og:title", title);
        setMeta('meta[property="og:description"]', "property", "og:description", description);
        setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
        setMeta('meta[property="og:type"]', "property", "og:type", ogType);
        setMeta('meta[property="og:image"]', "property", "og:image", `${BASE_URL}${ogImage}`);

        // Twitter
        setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
        setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
        setMeta('meta[name="twitter:image"]', "name", "twitter:image", `${BASE_URL}${TWITTER_OG}`);

        // JSON-LD
        if (jsonLd) {
            const scriptId = "page-json-ld";
            let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
            if (!scriptEl) {
                scriptEl = document.createElement("script");
                scriptEl.id = scriptId;
                scriptEl.type = "application/ld+json";
                document.head.appendChild(scriptEl);
            }
            scriptEl.textContent = JSON.stringify(jsonLd);
        }
    }, [title, description, canonical, ogImage, ogType]);
}
