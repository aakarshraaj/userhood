import SelectedWork from "../components/SelectedWork";
import { getPageSEO } from "../data/siteMetadata";
import { useSEO } from "../utils/seo";

export default function Work() {
  useSEO(getPageSEO("work"));

  return (
    <main data-page-id="work" className="min-h-screen bg-background-dark">
      <SelectedWork standalone />
    </main>
  );
}
