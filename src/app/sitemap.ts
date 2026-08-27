import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Sitio de una sola página: una entrada basta. Si en el futuro se agregan
 * rutas reales (ej. /sw para swahili, o páginas propias), se suman acá.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
