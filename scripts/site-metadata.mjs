import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const metadataPath = path.join(projectRoot, "src/data/site-metadata.json");
export const metadata = JSON.parse(await readFile(metadataPath, "utf8"));

const allowedRobots = new Set(["index, follow", "noindex, nofollow"]);
const allowedOpenGraphTypes = new Set(["website", "article"]);

const assert = (condition, message) => {
  if (!condition) throw new Error(`Invalid site metadata: ${message}`);
};

const assertUnique = (values, field) => {
  assert(new Set(values).size === values.length, `${field} values must be unique`);
};

export function assertValidSiteMetadata() {
  assert(typeof metadata.siteUrl === "string" && /^https:\/\/[^/]+$/.test(metadata.siteUrl), "siteUrl must be an HTTPS origin without a trailing slash");
  assert(typeof metadata.defaultImage === "string" && metadata.defaultImage.startsWith("/"), "defaultImage must be root-relative");
  assert(typeof metadata.defaultImageAlt === "string" && metadata.defaultImageAlt.length > 0, "defaultImageAlt is required");
  assert(/^\d{4}-\d{2}-\d{2}$/.test(metadata.lastModified), "lastModified must use YYYY-MM-DD");
  assert(Array.isArray(metadata.pages) && metadata.pages.length > 0, "pages must be a non-empty array");

  assertUnique(metadata.pages.map((page) => page.id), "page id");
  assertUnique(metadata.pages.map((page) => page.path), "page path");
  assertUnique(metadata.pages.map((page) => page.output), "page output");

  for (const page of metadata.pages) {
    assert(/^[A-Za-z][A-Za-z0-9]*$/.test(page.id), `${page.id || "page"} has an invalid id`);
    assert(typeof page.path === "string" && page.path.startsWith("/"), `${page.id}.path must be root-relative`);
    assert(page.path === "/" || !page.path.endsWith("/"), `${page.id}.path must not have a trailing slash`);
    assert(typeof page.canonicalPath === "string" && page.canonicalPath.startsWith("/"), `${page.id}.canonicalPath must be root-relative`);
    assert(typeof page.output === "string" && page.output.endsWith(".html") && !page.output.includes("..") && !path.isAbsolute(page.output), `${page.id}.output must be a safe HTML path`);
    assert(typeof page.title === "string" && page.title.length > 0, `${page.id}.title is required`);
    assert(typeof page.description === "string" && page.description.length > 0, `${page.id}.description is required`);
    assert(allowedRobots.has(page.robots), `${page.id}.robots is invalid`);
    assert(allowedOpenGraphTypes.has(page.ogType), `${page.id}.ogType is invalid`);
    assert(page.image === null || (typeof page.image === "string" && page.image.startsWith("/")), `${page.id}.image must be null or root-relative`);
    assert(typeof page.sitemap === "boolean", `${page.id}.sitemap must be boolean`);
    assert(!page.sitemap || page.robots === "index, follow", `${page.id} cannot be in the sitemap while noindexed`);
  }
}

export function getCanonicalUrl(page) {
  return new URL(page.canonicalPath, `${metadata.siteUrl}/`).href;
}

export function getImageUrl(imagePath) {
  return new URL(imagePath, `${metadata.siteUrl}/`).href;
}
