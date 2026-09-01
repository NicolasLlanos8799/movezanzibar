"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Drum } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { trackEvent } from "@/lib/analytics";
import { splitTimeRange } from "@/lib/text";
import { SHOW_MEDIA } from "@/lib/showMedia";

/**
 * Franja compacta en el home que invita a la página dedicada /show
 * ("Saturdays Show" ya no vive como sección dentro del one-page — tiene su
 * propia página, ver src/app/show/page.tsx y src/components/SaturdaysShow.tsx).
 * Usa la primera foto/video del mismo manifest que esa página, así que
 * cuando se agregue contenido nuevo a src/lib/showMedia.ts esta miniatura
 * se actualiza sola.
 */
export function ShowTeaser() {
  const { t } = useLanguage();
  const show = t.show;
  const featured = SHOW_MEDIA[0];

  const scheduleParts = splitTimeRange(show.schedule);

  return (
    <section className="bg-charcoal py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Link
            href="/show"
            onClick={() => trackEvent("cta_view_show_gallery", { section: "home_teaser" })}
            title={show.viewGalleryCta}
            className="group grid overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-photo transition-colors hover:border-white/20 lg:grid-cols-2"
          >
            {featured && (
              <div className="relative aspect-[16/9] w-full lg:aspect-auto lg:min-h-[280px]">
                <Image
                  src={featured.type === "video" ? (featured.poster ?? featured.src) : featured.src}
                  alt={featured.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <Kicker tone="turquoise">{show.kicker}</Kicker>
              <h2 className="mt-4 font-display text-2xl font-extrabold leading-[1.1] text-white sm:text-3xl">
                {show.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/70 sm:text-lg">
                {show.subtitle}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-turquoise px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-card sm:text-sm">
                  <Drum size={15} aria-hidden />
                  <span>
                    {scheduleParts.before}
                    {scheduleParts.time && (
                      <span className="whitespace-nowrap">{scheduleParts.time}</span>
                    )}
                    {scheduleParts.after}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-charcoal shadow-card transition-transform group-hover:-translate-y-0.5 sm:text-sm">
                  {show.viewGalleryCta}
                  <ArrowRight size={14} aria-hidden />
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
