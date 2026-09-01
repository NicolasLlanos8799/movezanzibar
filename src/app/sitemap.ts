import type { MetadataRoute } from "next";
import { FEATURES, SITE } from "@/lib/site";

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
    // Oculta hasta que FEATURES.saturdaysShow esté en true (ver site.ts) —
    // la ruta devuelve 404 mientras tanto, así que no debe estar indexada.
    ...(FEATURES.saturdaysShow
      ? [
          {
            url: `${SITE.url}/show`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
        ]
      : []),
  ];
}
