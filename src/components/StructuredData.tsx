import { SITE } from "@/lib/site";

/**
 * JSON-LD para rich results de Google. Tipo "NGO" (subtipo de Organization) —
 * es el que mejor describe el centro: no es un negocio que vende un servicio,
 * es una organización comunitaria con ubicación física y horario de show.
 *
 * No es visible para el usuario, es solo para crawlers. Editar acá cambia lo
 * que Google puede mostrar en resultados de búsqueda (nombre, logo, redes,
 * ubicación) — probalo en https://search.google.com/test/rich-results
 * después de publicar.
 */
export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: SITE.name,
    alternateName: "Move Zanzibar Acrobatics Show",
    url: SITE.url,
    logo: `${SITE.url}/icon-512.png`,
    image: `${SITE.url}/images/og.jpg`,
    description:
      "Move Zanzibar puts on a live acrobatics show by young African performers every Saturday in Jambiani, Zanzibar. We nurture talent, run a free youth training program, and live and grow together through movement.",
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jambiani",
      addressRegion: "Zanzibar",
      addressCountry: "TZ",
    },
    sameAs: [SITE.instagram, SITE.tiktok, SITE.facebook, SITE.tripadvisor],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
