"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Camera, Drum, Play } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/ui/Lightbox";
import { trackEvent } from "@/lib/analytics";
import { splitTimeRange } from "@/lib/text";
import { SHOW_MEDIA, type ShowMediaItem } from "@/lib/showMedia";

/**
 * "Saturdays Show": vitrina visual del show en vivo de los sábados — fotos
 * y clips cortos (~10s) que se van agregando en src/lib/showMedia.ts.
 *
 * Mientras no haya contenido real ahí, muestra un estado vacío prolijo en
 * vez de una grilla rota. En cuanto se agreguen fotos/videos al manifest,
 * el featured banner y la grilla aparecen solos, sin tocar este archivo.
 *
 * Performance: en la grilla y el banner SOLO se cargan imágenes (fotos
 * reales o el poster de un video) — el <video> real recién se pide cuando
 * alguien abre el lightbox y toca play. Clave para el público que visita
 * el sitio desde Tanzania con internet lento.
 */
export function SaturdaysShow() {
  const { t } = useLanguage();
  const show = t.show;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = SHOW_MEDIA;
  const hasMedia = items.length > 0;
  const featured = items[0];
  const rest = items.slice(1);

  /** El horario ("4:30–6 PM") no debe partirse en dos líneas en celular. */
  const scheduleParts = splitTimeRange(show.schedule);
  const scheduleBadge = (
    <span className="inline-flex items-center gap-2 rounded-full bg-turquoise px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-card sm:text-sm">
      <Drum size={15} aria-hidden />
      <span>
        {scheduleParts.before}
        {scheduleParts.time && <span className="whitespace-nowrap">{scheduleParts.time}</span>}
        {scheduleParts.after}
      </span>
    </span>
  );

  const bookLink = (
    <a
      href="/#booking"
      onClick={() => trackEvent("cta_book_show", { section: "show" })}
      title={show.bookCta}
      className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-charcoal shadow-card transition-transform hover:-translate-y-0.5 hover:bg-white/90 sm:text-sm"
    >
      {show.bookCta}
      <ArrowRight size={14} aria-hidden />
    </a>
  );

  return (
    <section id="show" className="scroll-mt-20 bg-charcoal py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <Kicker tone="turquoise">{show.kicker}</Kicker>
          <h2 className="mt-5 font-display text-[clamp(1.9rem,4.2vw,2.9rem)] font-extrabold leading-[1.08] text-white">
            {show.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">{show.subtitle}</p>
        </Reveal>

        {hasMedia ? (
          <>
            {/* ------------------------------------------------ Featured */}
            <Reveal delay={80} className="mt-10">
              <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-photo sm:aspect-[21/9]">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(0)}
                  aria-label={featured.alt}
                  className="absolute inset-0"
                >
                  <Image
                    src={featured.type === "video" ? (featured.poster ?? featured.src) : featured.src}
                    alt={featured.alt}
                    title={featured.alt}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {featured.type === "video" && (
                    <span className="absolute inset-0 grid place-items-center bg-charcoal/20 transition-colors group-hover:bg-charcoal/10">
                      <span className="grid size-16 place-items-center rounded-full bg-white/90 text-charcoal shadow-card transition-transform group-hover:scale-105">
                        <Play size={26} fill="currentColor" aria-hidden />
                      </span>
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/5 to-transparent" />
                </button>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5 sm:p-8">
                  <span className="pointer-events-auto">{scheduleBadge}</span>
                  <span className="pointer-events-auto">{bookLink}</span>
                </div>
              </div>
            </Reveal>

            {/* -------------------------------------------------- Gallery */}
            {rest.length > 0 && (
              <Reveal delay={140} className="mt-6">
                <div className="relative lg:hidden">
                  <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {rest.map((item, i) => (
                      <GridThumb
                        key={item.src}
                        item={item}
                        onClick={() => setLightboxIndex(i + 1)}
                        className="aspect-4/3 h-56 shrink-0 snap-start sm:h-64"
                      />
                    ))}
                  </div>
                </div>
                <div className="hidden lg:grid lg:grid-cols-3 lg:gap-4">
                  {rest.map((item, i) => (
                    <GridThumb
                      key={item.src}
                      item={item}
                      onClick={() => setLightboxIndex(i + 1)}
                      className="aspect-4/3 w-full"
                    />
                  ))}
                </div>
              </Reveal>
            )}
          </>
        ) : (
          <Reveal delay={80} className="mt-10">
            <div className="flex flex-col items-center gap-5 rounded-3xl border border-white/10 bg-white/5 px-6 py-14 text-center sm:py-20">
              <span className="grid size-14 place-items-center rounded-full bg-white/10 text-white">
                <Camera size={24} aria-hidden />
              </span>
              <div className="max-w-md">
                <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                  {show.emptyTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
                  {show.emptyBody}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {scheduleBadge}
                {bookLink}
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {hasMedia && (
        <Lightbox
          images={items}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}

function GridThumb({
  item,
  onClick,
  className = "",
}: {
  item: ShowMediaItem;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={item.alt}
      className={`group relative overflow-hidden rounded-3xl shadow-photo transition-transform duration-300 hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise ${className}`}
    >
      <Image
        src={item.type === "video" ? (item.poster ?? item.src) : item.src}
        alt={item.alt}
        title={item.alt}
        fill
        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 340px, 30vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {item.type === "video" && (
        <span className="absolute inset-0 grid place-items-center bg-charcoal/25 transition-colors group-hover:bg-charcoal/10">
          <span className="grid size-11 place-items-center rounded-full bg-white/90 text-charcoal shadow-card">
            <Play size={18} fill="currentColor" aria-hidden />
          </span>
        </span>
      )}
    </button>
  );
}
