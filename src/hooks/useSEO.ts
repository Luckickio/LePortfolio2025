import { useEffect } from "react";
import seoData from "@/data/seo.json";

interface SEOProps {
  title?: string;
  author?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export function useSEO({
  title = seoData.title,
  description = seoData.description,
  keywords = seoData.keywords,
  image = seoData.ogImage,
  author = seoData.author,
}: SEOProps = {}) {
  useEffect(() => {
    document.title = title;

    const metaTags = {
      description: description,
      autor: author,
      keywords: keywords,
      "og:title": title,
      "og:description": description,
      "og:image": image,
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": image,
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      let meta =
        document.querySelector(`meta[property="${name}"]`) ||
        document.querySelector(`meta[name="${name}"]`);

      if (meta) {
        meta.setAttribute("content", content);
      }
    });
  }, [title, description, keywords, image]);
}
