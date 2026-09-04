import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = path.join(projectRoot, "dist");
const serverBundleDirectory = path.join(projectRoot, ".prerender");

const routes = [
  {
    path: "/",
    output: "index.html",
    title: "Userhood — AI-Powered MVPs for Funded Startups, Shipped in 12 Weeks",
    description: "One senior team takes your MVP from product brief to production in 12 weeks — strategy, product design, engineering, and AI without the handoff drag.",
  },
  {
    path: "/services",
    output: "services.html",
    title: "Services — AI MVP Design & Development for Startups | Userhood",
    description: "Everything a funded startup needs to ship an AI-powered MVP: product UX design, full-stack engineering, and AI integration — owned by one team, delivered in 12 weeks.",
  },
  {
    path: "/about",
    output: "about.html",
    title: "About Userhood — The Team Behind the 12-Week Build",
    description: "Meet the compact product, design, and engineering team behind Userhood's focused 12-week MVP engagements.",
  },
  {
    path: "/case-study/hyundai",
    output: "case-study/hyundai.html",
    image: null,
    ogType: "article",
    title: "Hyundai Digital Buying Journey — Team Experience | Userhood",
    description: "A transparent team-experience case study covering the product decisions behind a connected automotive buying journey.",
  },
  {
    path: "/case-study/mitsubishi",
    output: "case-study/mitsubishi.html",
    image: null,
    ogType: "article",
    title: "Mitsubishi Connected Ownership — Team Experience | Userhood",
    description: "A transparent team-experience case study covering the product decisions behind a connected vehicle ownership interface.",
  },
  {
    path: "/careers",
    output: "careers.html",
    title: "Careers | Userhood",
    description: "Join Userhood's compact product, design, engineering, and growth team.",
  },
  {
    path: "/careers/sales-intern",
    output: "careers/sales-intern.html",
    image: null,
    ogType: "article",
    title: "Sales Intern | Careers | Userhood",
    description: "Join Userhood's growth team as a Sales Intern working with ambitious founders, startups, and enterprise teams.",
  },
  {
    path: "/privacy",
    output: "privacy.html",
    title: "Privacy Policy | Userhood",
    description: "How Userhood collects, uses, shares, and protects information when you visit our website or contact the studio.",
  },
  {
    path: "/terms",
    output: "terms.html",
    title: "Terms of Service | Userhood",
    description: "The terms that apply when you use the Userhood website, and how they relate to separate client engagement agreements.",
  },
  {
    path: "/route-not-found",
    output: "404.html",
    canonicalPath: "/404",
    image: null,
    title: "Page Not Found | Userhood",
    description: "The page you requested does not exist or has moved.",
    robots: "noindex, nofollow",
  },
];

const escapeAttribute = (value) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const replaceMeta = (html, attribute, name, content) => {
  const pattern = new RegExp(`<meta\\s+[^>]*${attribute}=["']${name}["'][^>]*>`, "i");
  const replacement = `<meta ${attribute}="${name}" content="${escapeAttribute(content)}" />`;
  return pattern.test(html) ? html.replace(pattern, replacement) : html.replace("</head>", `  ${replacement}\n</head>`);
};

const removeMeta = (html, attribute, name) => {
  const pattern = new RegExp(`\\s*<meta\\s+[^>]*${attribute}=["']${name}["'][^>]*>`, "i");
  return html.replace(pattern, "");
};

const setRouteMetadata = (template, route) => {
  const canonicalPath = route.canonicalPath || route.path;
  const canonical = `https://www.userhood.in${canonicalPath === "/" ? "/" : canonicalPath}`;
  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttribute(route.title)}</title>`);
  html = html.replace(/<link\s+[^>]*rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonical}" />`);
  html = replaceMeta(html, "name", "description", route.description);
  html = replaceMeta(html, "name", "robots", route.robots || "index, follow");
  html = replaceMeta(html, "property", "og:title", route.title);
  html = replaceMeta(html, "property", "og:description", route.description);
  html = replaceMeta(html, "property", "og:url", canonical);
  html = replaceMeta(html, "property", "og:type", route.ogType || "website");
  html = replaceMeta(html, "name", "twitter:title", route.title);
  html = replaceMeta(html, "name", "twitter:description", route.description);
  html = replaceMeta(html, "name", "twitter:url", canonical);
  html = replaceMeta(html, "name", "twitter:card", route.image === null ? "summary" : "summary_large_image");
  if (route.image === null) {
    html = removeMeta(html, "property", "og:image");
    html = removeMeta(html, "property", "og:image:alt");
    html = removeMeta(html, "name", "twitter:image");
    html = removeMeta(html, "name", "twitter:image:alt");
  }
  return html;
};

try {
  const [{ render }, template] = await Promise.all([
    import(pathToFileURL(path.join(serverBundleDirectory, "prerender.js")).href),
    readFile(path.join(distDirectory, "index.html"), "utf8"),
  ]);

  for (const route of routes) {
    const appHtml = await render(route.path);
    const routeHtml = setRouteMetadata(template, route).replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );
    const outputPath = path.join(distDirectory, route.output);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, routeHtml);
  }

  console.log(`Prerendered ${routes.length} routes with route-specific metadata.`);
} finally {
  await rm(serverBundleDirectory, { recursive: true, force: true });
}
