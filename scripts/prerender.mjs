import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  assertValidSiteMetadata,
  metadata,
  projectRoot,
} from "./site-metadata.mjs";
import { applyPageMetadata } from "./html-metadata.mjs";

const distDirectory = path.join(projectRoot, "dist");
const serverBundleDirectory = path.join(projectRoot, ".prerender");

assertValidSiteMetadata();

try {
  const [{ render }, template] = await Promise.all([
    import(pathToFileURL(path.join(serverBundleDirectory, "prerender.js")).href),
    readFile(path.join(distDirectory, "index.html"), "utf8"),
  ]);

  for (const page of metadata.pages) {
    const appHtml = await render(page.path);
    const routeHtml = applyPageMetadata(template, page).replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`,
    );
    const outputPath = path.join(distDirectory, page.output);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, routeHtml);
  }

  console.log(`Prerendered ${metadata.pages.length} routes with verified route-specific metadata.`);
} finally {
  await rm(serverBundleDirectory, { recursive: true, force: true });
}
