import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { assertValidSiteMetadata, getCanonicalUrl, metadata, projectRoot } from "./site-metadata.mjs";
import { applyPageMetadata } from "./html-metadata.mjs";

const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

assertValidSiteMetadata();

const publicDirectory = path.join(projectRoot, "public");
const indexablePages = metadata.pages.filter((page) => page.sitemap);
const sitemapEntries = indexablePages
  .map((page) => `  <url>\n    <loc>${escapeXml(getCanonicalUrl(page))}</loc>\n    <lastmod>${metadata.lastModified}</lastmod>\n  </url>`)
  .join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${metadata.siteUrl}/sitemap.xml\n`;
const indexPath = path.join(projectRoot, "index.html");
const indexTemplate = await readFile(indexPath, "utf8");
const homePage = metadata.pages.find((page) => page.id === "home");
if (!homePage) throw new Error("Home page metadata is required");
const syncedIndex = applyPageMetadata(indexTemplate, homePage);

await mkdir(publicDirectory, { recursive: true });
await Promise.all([
  syncedIndex === indexTemplate ? Promise.resolve() : writeFile(indexPath, syncedIndex),
  writeFile(path.join(publicDirectory, "sitemap.xml"), sitemap),
  writeFile(path.join(publicDirectory, "robots.txt"), robots),
]);

console.log(`Generated sitemap.xml and robots.txt for ${indexablePages.length} indexable routes.`);
