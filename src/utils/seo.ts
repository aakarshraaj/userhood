import { useEffect } from "react";

interface SEOConfig {
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string | null;
    ogType?: "website" | "article";
    imageAlt?: string;
    robots?: "index, follow" | "noindex, nofollow";
    jsonLd?: object | object[];
}

const BASE_URL = "https://www.userhood.in";
const DEFAULT_OG = "/og-image.jpg";

function setMeta(selector: string, attrKey: string, attrVal: string, content: string) {
    let el = document.querySelector<HTMLMetaElement>(selector);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrKey, attrVal);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
}

function removeMeta(selector: string) {
    document.querySelector(selector)?.remove();
}

export function useSEO({
    title,
    description,
    canonical,
    ogImage = DEFAULT_OG,
    ogType = "website",
    imageAlt = "Userhood — product design and engineering studio",
    robots = "index, follow",
    jsonLd,
}: SEOConfig) {
    const jsonLdText = jsonLd ? JSON.stringify(jsonLd) : "";

    useEffect(() => {
        document.title = title;

        const canonicalUrl = canonical ?? `${BASE_URL}${window.location.pathname}`;
        let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!canonicalEl) {
            canonicalEl = document.createElement("link");
            canonicalEl.rel = "canonical";
            document.head.appendChild(canonicalEl);
        }
        canonicalEl.href = canonicalUrl;

        setMeta('meta[name="description"]', "name", "description", description);
        setMeta('meta[name="robots"]', "name", "robots", robots);

        setMeta('meta[property="og:title"]', "property", "og:title", title);
        setMeta('meta[property="og:description"]', "property", "og:description", description);
        setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
        setMeta('meta[property="og:type"]', "property", "og:type", ogType);
        setMeta('meta[name="twitter:card"]', "name", "twitter:card", ogImage ? "summary_large_image" : "summary");
        setMeta('meta[name="twitter:url"]', "name", "twitter:url", canonicalUrl);
        setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
        setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

        if (ogImage) {
            const imageUrl = new URL(ogImage, BASE_URL).href;
            setMeta('meta[property="og:image"]', "property", "og:image", imageUrl);
            setMeta('meta[property="og:image:alt"]', "property", "og:image:alt", imageAlt);
            setMeta('meta[name="twitter:image"]', "name", "twitter:image", imageUrl);
            setMeta('meta[name="twitter:image:alt"]', "name", "twitter:image:alt", imageAlt);
        } else {
            removeMeta('meta[property="og:image"]');
            removeMeta('meta[property="og:image:alt"]');
            removeMeta('meta[name="twitter:image"]');
            removeMeta('meta[name="twitter:image:alt"]');
        }

        const scriptId = "page-json-ld";
        let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
        if (jsonLdText) {
            if (!scriptEl) {
                scriptEl = document.createElement("script");
                scriptEl.id = scriptId;
                scriptEl.type = "application/ld+json";
                document.head.appendChild(scriptEl);
            }
            scriptEl.textContent = jsonLdText;
        } else {
            scriptEl?.remove();
        }
    }, [title, description, canonical, ogImage, ogType, imageAlt, robots, jsonLdText]);
}
