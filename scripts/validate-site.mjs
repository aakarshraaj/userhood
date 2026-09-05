import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import {
  assertValidSiteMetadata,
  getCanonicalUrl,
  getImageUrl,
  metadata,
  projectRoot,
} from "./site-metadata.mjs";

const distDirectory = path.join(projectRoot, "dist");
const failures = [];

const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const escapeHtml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const parseAttributes = (tag) => {
  const attributes = new Map();
  for (const match of tag.matchAll(/([:\w-]+)\s*=\s*(["'])(.*?)\2/g)) {
    attributes.set(match[1].toLowerCase(), match[3]);
  }
  return attributes;
};

const getTags = (html, tagName) => html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) ?? [];

const getMetaValues = (html, attribute, name) =>
  getTags(html, "meta")
    .map(parseAttributes)
    .filter((attributes) => attributes.get(attribute) === name)
    .map((attributes) => attributes.get("content"));

const getCanonicalValues = (html) =>
  getTags(html, "link")
    .map(parseAttributes)
    .filter((attributes) => attributes.get("rel") === "canonical")
    .map((attributes) => attributes.get("href"));

const checkSingleValue = (values, expected, label, output) => {
  check(values.length === 1, `${output}: expected exactly one ${label}, found ${values.length}`);
  if (values.length === 1) check(values[0] === expected, `${output}: ${label} does not match site metadata`);
};

const collectFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(absolutePath));
    else files.push(absolutePath);
  }
  return files;
};

assertValidSiteMetadata();

const expectedHtmlFiles = metadata.pages.map((page) => page.output).sort();
const distFiles = await collectFiles(distDirectory);
const actualHtmlFiles = distFiles
  .filter((file) => file.endsWith(".html"))
  .map((file) => path.relative(distDirectory, file))
  .sort();
check(JSON.stringify(actualHtmlFiles) === JSON.stringify(expectedHtmlFiles), "dist: HTML outputs do not exactly match the route manifest");

for (const page of metadata.pages) {
  const outputPath = path.join(distDirectory, page.output);
  let html = "";
  try {
    html = await readFile(outputPath, "utf8");
  } catch {
    failures.push(`${page.output}: prerendered file is missing`);
    continue;
  }

  const canonical = getCanonicalUrl(page);
  const titleMatches = [...html.matchAll(/<title>([\s\S]*?)<\/title>/gi)].map((match) => match[1]);
  checkSingleValue(titleMatches, escapeHtml(page.title), "title", page.output);
  checkSingleValue(getCanonicalValues(html), canonical, "canonical link", page.output);
  checkSingleValue(getMetaValues(html, "name", "description"), escapeHtml(page.description), "description", page.output);
  checkSingleValue(getMetaValues(html, "name", "robots"), page.robots, "robots directive", page.output);
  checkSingleValue(getMetaValues(html, "property", "og:title"), escapeHtml(page.title), "Open Graph title", page.output);
  checkSingleValue(getMetaValues(html, "property", "og:description"), escapeHtml(page.description), "Open Graph description", page.output);
  checkSingleValue(getMetaValues(html, "property", "og:url"), canonical, "Open Graph URL", page.output);
  checkSingleValue(getMetaValues(html, "property", "og:type"), page.ogType, "Open Graph type", page.output);
  checkSingleValue(getMetaValues(html, "name", "twitter:title"), escapeHtml(page.title), "X title", page.output);
  checkSingleValue(getMetaValues(html, "name", "twitter:description"), escapeHtml(page.description), "X description", page.output);
  checkSingleValue(getMetaValues(html, "name", "twitter:url"), canonical, "X URL", page.output);
  checkSingleValue(getMetaValues(html, "name", "twitter:card"), page.image === null ? "summary" : "summary_large_image", "X card type", page.output);

  if (page.image === null) {
    for (const [attribute, name] of [
      ["property", "og:image"],
      ["property", "og:image:alt"],
      ["name", "twitter:image"],
      ["name", "twitter:image:alt"],
    ]) {
      check(getMetaValues(html, attribute, name).length === 0, `${page.output}: ${name} must be absent without a page image`);
    }
  } else {
    const imageUrl = getImageUrl(page.image);
    checkSingleValue(getMetaValues(html, "property", "og:image"), imageUrl, "Open Graph image", page.output);
    checkSingleValue(getMetaValues(html, "property", "og:image:alt"), escapeHtml(metadata.defaultImageAlt), "Open Graph image alt", page.output);
    checkSingleValue(getMetaValues(html, "name", "twitter:image"), imageUrl, "X image", page.output);
    checkSingleValue(getMetaValues(html, "name", "twitter:image:alt"), escapeHtml(metadata.defaultImageAlt), "X image alt", page.output);
    try {
      await access(path.join(distDirectory, page.image.slice(1)));
    } catch {
      failures.push(`${page.output}: social image ${page.image} is missing from dist`);
    }
  }

  check((html.match(/<main(?:\s|>)/gi) ?? []).length === 1, `${page.output}: expected exactly one main landmark`);
  const pageIdentity = getTags(html, "main").map(parseAttributes).map((attributes) => attributes.get("data-page-id"));
  checkSingleValue(pageIdentity, page.id, "rendered page identity", page.output);
  check((html.match(/<h1(?:\s|>)/gi) ?? []).length === 1, `${page.output}: expected exactly one h1`);
  check(/<html\b[^>]*\blang=["']en["']/i.test(html), `${page.output}: document language must be English`);
  check(getTags(html, "meta").map(parseAttributes).filter((attributes) => attributes.get("charset")?.toLowerCase() === "utf-8").length === 1, `${page.output}: expected one UTF-8 charset declaration`);
  const viewportValues = getMetaValues(html, "name", "viewport");
  check(viewportValues.length === 1 && viewportValues[0]?.includes("width=device-width"), `${page.output}: responsive viewport declaration is missing or duplicated`);
  check(!/<div id="root">\s*<\/div>/i.test(html), `${page.output}: prerendered root is empty`);
  check(html.includes('href="#main-content"'), `${page.output}: skip link is missing`);
  check(html.includes('id="main-content"'), `${page.output}: main-content target is missing`);
  check(!html.includes("assets.apollo.io"), `${page.output}: Apollo visitor identification must not load`);
  check(!html.includes("googletagmanager.com/gtag/js"), `${page.output}: Google Analytics must not load before consent`);

  for (const scriptMatch of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attributes = parseAttributes(`<script ${scriptMatch[1]}>`);
    if (attributes.get("type") !== "application/ld+json") continue;
    try {
      JSON.parse(scriptMatch[2]);
    } catch {
      failures.push(`${page.output}: contains invalid JSON-LD`);
    }
  }
}

const searchableDistFiles = distFiles.filter((file) => /\.(?:html|js|css|xml|txt)$/.test(file));
const searchableDist = (await Promise.all(searchableDistFiles.map((file) => readFile(file, "utf8")))).join("\n");
check(!searchableDist.includes("assets.apollo.io"), "dist: Apollo visitor identification is present");
check(!/https:\/\/userhood\.in(?:\/|["'])/.test(searchableDist), "dist: found a non-canonical non-www production URL");
check(!searchableDist.includes("http://localhost:3000"), "dist: found a localhost production URL");

const requiredConversionEvents = [
  "case_study_open",
  "selected_work_click",
  "lead_form_open",
  "lead_form_start",
  "lead_project_type_select",
  "lead_form_validation_error",
  "lead_form_submit_attempt",
  "generate_lead",
  "lead_form_error",
  "lead_form_close",
  "whatsapp_click",
  "page_view",
];
const sourceFiles = (await collectFiles(path.join(projectRoot, "src"))).filter((file) => /\.(?:ts|tsx)$/.test(file));
const searchableSource = (await Promise.all(sourceFiles.map((file) => readFile(file, "utf8")))).join("\n");
for (const eventName of requiredConversionEvents) {
  check(searchableSource.includes(`"${eventName}"`), `src: required conversion event ${eventName} is missing`);
  if (eventName !== "generate_lead") {
    check(searchableDist.includes(eventName), `dist: required conversion event ${eventName} is missing`);
  }
}

const sitemap = await readFile(path.join(distDirectory, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const expectedSitemapUrls = metadata.pages.filter((page) => page.sitemap).map(getCanonicalUrl);
check(JSON.stringify(sitemapUrls) === JSON.stringify(expectedSitemapUrls), "sitemap.xml: URLs do not exactly match indexable route metadata");
const sitemapDates = [...sitemap.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].map((match) => match[1]);
check(sitemapDates.length === expectedSitemapUrls.length && sitemapDates.every((date) => date === metadata.lastModified), "sitemap.xml: lastmod values do not match site metadata");

const robots = await readFile(path.join(distDirectory, "robots.txt"), "utf8");
check(robots.includes(`Sitemap: ${metadata.siteUrl}/sitemap.xml`), "robots.txt: sitemap URL is missing or incorrect");

const vercel = JSON.parse(await readFile(path.join(projectRoot, "vercel.json"), "utf8"));
check(vercel.outputDirectory === "dist", "vercel.json: outputDirectory must be dist");
check(vercel.cleanUrls === true, "vercel.json: cleanUrls must remain enabled");
check(vercel.trailingSlash === false, "vercel.json: trailingSlash must remain disabled");
for (const rewrite of vercel.rewrites ?? []) {
  check(!/(?:\(\.\*\)|:path\*)/.test(rewrite.source ?? ""), `vercel.json: catch-all rewrite ${rewrite.source} would break route metadata and 404s`);
}

const requiredSecurityHeaders = new Map([
  ["X-Content-Type-Options", "nosniff"],
  ["X-Frame-Options", "DENY"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ["Permissions-Policy", "camera=(), microphone=(), geolocation=()"],
]);
const globalHeaders = (vercel.headers ?? []).find((rule) => rule.source === "/(.*)")?.headers ?? [];
for (const [key, value] of requiredSecurityHeaders) {
  check(globalHeaders.some((header) => header.key === key && header.value === value), `vercel.json: missing required ${key} header`);
}
const assetHeaders = (vercel.headers ?? []).find((rule) => rule.source === "/assets/(.*)")?.headers ?? [];
check(assetHeaders.some((header) => header.key === "Cache-Control" && header.value === "public, max-age=31536000, immutable"), "vercel.json: immutable asset caching header is missing");

if (failures.length > 0) {
  console.error(`Site validation failed with ${failures.length} problem${failures.length === 1 ? "" : "s"}:`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${metadata.pages.length} prerendered routes, ${expectedSitemapUrls.length} sitemap URLs, metadata, consent boundaries, ${requiredConversionEvents.length} conversion events, and Vercel safety rules.`);
}
