declare global {
    interface Window {
        gtag: (...args: any[]) => void;
    }
}

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

export const trackPageView = (path: string) => {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("config", "G-690654KZJN", {
            page_path: path,
        });
    }
};
