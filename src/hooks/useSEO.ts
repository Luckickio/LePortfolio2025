import { useEffect } from "react";
import { useContent } from "@/i18n/LanguageProvider";

export function useSEO() {
  const { title, description, keywords, ogImage: image, author } =
    useContent().seo;

  useEffect(() => {
    document.title = title;

    const metaTags = {
      description: description,
      author: author,
      keywords: keywords,
      "og:title": title,
      "og:description": description,
      "og:image": image,
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": image,
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      const meta =
        document.querySelector(`meta[property="${name}"]`) ||
        document.querySelector(`meta[name="${name}"]`);

      if (meta) {
        meta.setAttribute("content", content);
      }
    });
  }, [title, description, keywords, image, author]);
}
