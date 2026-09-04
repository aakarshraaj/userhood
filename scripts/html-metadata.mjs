import { getCanonicalUrl, getImageUrl, metadata } from "./site-metadata.mjs";

const escapeAttribute = (value) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const escapePattern = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const replaceMeta = (html, attribute, name, content) => {
  const pattern = new RegExp(`<meta\\s+[^>]*${attribute}=["']${escapePattern(name)}["'][^>]*>`, "i");
  const replacement = `<meta ${attribute}="${name}" content="${escapeAttribute(content)}" />`;
  return pattern.test(html) ? html.replace(pattern, replacement) : html.replace("</head>", `  ${replacement}\n</head>`);
};

const removeMeta = (html, attribute, name) => {
  const pattern = new RegExp(`\\s*<meta\\s+[^>]*${attribute}=["']${escapePattern(name)}["'][^>]*>`, "gi");
  return html.replace(pattern, "");
};

export function applyPageMetadata(template, page) {
  const canonical = getCanonicalUrl(page);
  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttribute(page.title)}</title>`);
  html = html.replace(/<link\s+[^>]*rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonical}" />`);
  html = replaceMeta(html, "name", "description", page.description);
  html = replaceMeta(html, "name", "robots", page.robots);
  html = replaceMeta(html, "property", "og:title", page.title);
  html = replaceMeta(html, "property", "og:description", page.description);
  html = replaceMeta(html, "property", "og:url", canonical);
  html = replaceMeta(html, "property", "og:type", page.ogType);
  html = replaceMeta(html, "name", "twitter:title", page.title);
  html = replaceMeta(html, "name", "twitter:description", page.description);
  html = replaceMeta(html, "name", "twitter:url", canonical);
  html = replaceMeta(html, "name", "twitter:card", page.image === null ? "summary" : "summary_large_image");

  if (page.image === null) {
    html = removeMeta(html, "property", "og:image");
    html = removeMeta(html, "property", "og:image:alt");
    html = removeMeta(html, "name", "twitter:image");
    html = removeMeta(html, "name", "twitter:image:alt");
  } else {
    const imageUrl = getImageUrl(page.image);
    html = replaceMeta(html, "property", "og:image", imageUrl);
    html = replaceMeta(html, "property", "og:image:alt", metadata.defaultImageAlt);
    html = replaceMeta(html, "name", "twitter:image", imageUrl);
    html = replaceMeta(html, "name", "twitter:image:alt", metadata.defaultImageAlt);
  }

  return html;
}
