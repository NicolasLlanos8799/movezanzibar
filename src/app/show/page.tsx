import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { SaturdaysShow } from "@/components/SaturdaysShow";
import { Footer } from "@/components/Footer";
import { FEATURES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Saturdays Show",
  description:
    "Photos and short video clips from the live acrobatics, dance, and fire show performed every Saturday at the Move Zanzibar Community Centre in Jambiani.",
  alternates: {
    canonical: `${SITE.url}/show`,
  },
  openGraph: {
    type: "website",
    url: `${SITE.url}/show`,
    siteName: SITE.name,
    title: "Saturdays Show · Move Zanzibar",
    description:
      "Photos and short video clips from the live acrobatics, dance, and fire show performed every Saturday at the Move Zanzibar Community Centre in Jambiani.",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
    locale: "en_US",
  },
};

/**
 * Página dedicada al show de los sábados — fotos y clips cortos del
 * espectáculo en vivo. Vive fuera del one-page (no es una sección más de
 * "/"): el usuario la pidió como página propia para poder linkearla y
 * compartirla directo, sin depender del resto del contenido del home.
 * El home mantiene un teaser compacto (`ShowTeaser`) que enlaza acá.
 */
export default function SaturdaysShowPage() {
  // Página lista pero todavía no publicada — el usuario pidió mantenerla
  // oculta hasta nuevo aviso (ver FEATURES.saturdaysShow en site.ts). No
  // borrar nada de acá: solo cambiar ese flag a true cuando esté lista.
  if (!FEATURES.saturdaysShow) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        <SaturdaysShow />
      </main>
      <Footer />
    </>
  );
}
