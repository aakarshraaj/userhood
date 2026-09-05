import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { getPageSEO } from "../data/siteMetadata";
import { useSEO } from "../utils/seo";

export default function NotFound() {
  useSEO(getPageSEO("notFound"));

  return (
    <main data-page-id="notFound" className="flex min-h-screen items-center bg-background-dark px-5 pb-24 pt-32 text-white">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">[ 404 // ROUTE_NOT_FOUND ]</div>
        <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.9] tracking-tighter sm:text-7xl md:text-8xl">
          This route leads <span className="text-primary">nowhere useful.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg font-normal leading-relaxed text-slate-300">
          The page may have moved, or the address may be wrong. The homepage is the cleanest way back into the work.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex min-h-12 items-center gap-3 bg-primary px-6 py-4 text-base font-bold text-black transition-colors hover:bg-white/80"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Userhood
        </Link>
      </div>
    </main>
  );
}
