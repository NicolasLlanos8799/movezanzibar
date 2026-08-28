"use client";

import Image from "next/image";
import { MapPin, ArrowDown, Drum } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  const { t } = useLanguage();
  const hero = t.hero;
  const hasVideo = Boolean(SITE.heroVideoUrl);

  return (
    <section id="top" className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
      {/* ---------------------------------------------------------- Fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {hasVideo ? (
          // El día que exista el show reel: agrega la ruta en SITE.heroVideoUrl
          // y este bloque reemplaza automáticamente la foto por video.
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero.jpg"
            className="size-full object-cover"
          >
            <source src={SITE.heroVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <>
            <Image
              src="/images/centrum.jpg"
              alt="The Move Zanzibar training yard, with its painted mural wall, palm trees, and training equipment on the astroturf"
              title="The Move Zanzibar training yard in Jambiani"
              fill
              priority
              sizes="100vw"
              className="animate-kenburns origin-center object-cover will-change-transform sm:hidden"
            />
            <Image
              src="/images/portada.JPEG"
              alt="Entrance to the Move Zanzibar Community Centre in Jambiani, with its painted mural wall and palm trees"
              title="Entrance to the Move Zanzibar Community Centre in Jambiani"
              fill
              priority
              sizes="100vw"
              className="hidden animate-kenburns origin-center object-cover object-center will-change-transform sm:block"
            />
          </>
        )}
      </div>

      {/* --------------------------------------------------------- Texto */}
      {/* Sin velo sobre la foto — la legibilidad viene de un text-shadow en
          cada línea de texto, no de oscurecer la imagen. */}
      <div className="relative flex h-full max-w-7xl flex-col justify-end px-5 pb-16 sm:px-8 sm:pb-20 mx-auto">
        <span className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/30 bg-black/35 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
          <MapPin size={12} aria-hidden />
          {hero.eyebrow}
        </span>

        <h1 className="max-w-3xl font-display text-[clamp(2.1rem,5.5vw,3.75rem)] font-extrabold uppercase leading-[1.05] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.55),0_1px_3px_rgba(0,0,0,0.6)]">
          {hero.titleLine1}
          <span className="mt-1.5 block font-display text-[0.4em] font-semibold normal-case leading-snug tracking-wide text-brand-soft">
            {hero.titleAccent}
          </span>
        </h1>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button
            href="#who-we-are"
            variant="primary"
            size="lg"
            title={hero.cta}
            onClick={() => trackEvent("cta_discover_story", { section: "hero" })}
          >
            {hero.cta}
            <ArrowDown
              size={18}
              className="transition-transform duration-200 group-hover:translate-y-0.5"
            />
          </Button>

          <a
            href="#booking"
            onClick={() => trackEvent("cta_book_show", { section: "hero" })}
            title={hero.saturdayBadge}
            className="inline-flex items-center gap-2 rounded-full bg-turquoise px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-card transition-transform hover:-translate-y-0.5 hover:bg-[#0098ac] sm:text-sm"
          >
            <Drum size={15} aria-hidden />
            {hero.saturdayBadge}
          </a>
        </div>
      </div>
    </section>
  );
}
