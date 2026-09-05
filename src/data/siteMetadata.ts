import metadata from "./site-metadata.json";

export type PageId =
  | "home"
  | "work"
  | "services"
  | "about"
  | "hyundai"
  | "mitsubishi"
  | "rentnama"
  | "tirch"
  | "careers"
  | "salesIntern"
  | "privacy"
  | "terms"
  | "notFound";

export type PageRobots = "index, follow" | "noindex, nofollow";
export type PageOpenGraphType = "website" | "article";

export interface PageMetadata {
  id: PageId;
  path: string;
  output: string;
  canonicalPath: string;
  title: string;
  description: string;
  robots: PageRobots;
  ogType: PageOpenGraphType;
  image: string | null;
  sitemap: boolean;
}

interface SiteMetadata {
  siteUrl: string;
  defaultImage: string;
  defaultImageAlt: string;
  lastModified: string;
  pages: PageMetadata[];
}

export const SITE_METADATA = metadata as SiteMetadata;

export function getPageMetadata(id: PageId): PageMetadata {
  const page = SITE_METADATA.pages.find((candidate) => candidate.id === id);
  if (!page) throw new Error(`Missing site metadata for page: ${id}`);
  return page;
}

export function getCanonicalUrl(page: PageMetadata): string {
  return new URL(page.canonicalPath, `${SITE_METADATA.siteUrl}/`).href;
}

export function getPageSEO(id: PageId) {
  const page = getPageMetadata(id);
  return {
    title: page.title,
    description: page.description,
    canonical: getCanonicalUrl(page),
    robots: page.robots,
    ogType: page.ogType,
    ogImage: page.image,
    imageAlt: SITE_METADATA.defaultImageAlt,
  };
}
