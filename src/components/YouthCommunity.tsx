"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Sprout, Users, Drum, ArrowRight, HeartHandshake, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/ui/Lightbox";
import { trackEvent } from "@/lib/analytics";

/**
 * Sección combinada "Youth Program & Community": dos filas alternadas,
 * cada una con su propia pareja de fotos reales, mostradas completas (cada
 * caja usa la proporción real de su foto, sin recortes forzados ni insets
 * pequeños). Cierra con una galería de fotos adicionales del centro.
 * La navbar solo enlaza a #our-work (el inicio de la sección); #youth-program
 * y #community siguen existiendo como anclas internas.
 */
const GALLERY_IMAGES = [
  {
    src: "/images/training-english.JPEG",
    alt: "Children in a free English lesson at the Move Zanzibar Community Centre",
  },
  {
    src: "/images/centrum.jpg",
    alt: "The Move Zanzibar training yard, with its painted mural wall, palm trees, and training equipment on the astroturf",
  },
  {
    src: "/images/gallery-circle.jpg",
    alt: "A group training session with visitors and local artists gathered at the painted mural wall",
  },
  {
    src: "/images/gallery-team.JPEG",
    alt: "Move Zanzibar performers together, wearing the center's team shirts",
  },
  {
    src: "/images/community-yard.jpg",
    alt: "A young performer looking out over the training yard as children play near the mural wall",
  },
];

export function YouthCommunity() {
  const { t } = useLanguage();
  const youth = t.youth;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  return (
    <section id="our-work" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <Kicker tone="turquoise">{youth.kicker}</Kicker>
          <h2 className="mt-5 font-display text-[clamp(1.9rem,4.2vw,2.9rem)] font-extrabold leading-[1.08] text-charcoal">
            {youth.title}
          </h2>
        </Reveal>

        {/* ------------------------------------------------- Youth Program */}
        <div
          id="youth-program"
          className="mt-14 grid scroll-mt-24 items-center gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-14"
        >
          <Reveal delay={80}>
            <div className="mx-auto flex max-w-sm flex-col gap-4 lg:mx-0 lg:max-w-none">
              <div className="relative aspect-[1200/1600] w-full overflow-hidden rounded-3xl shadow-photo">
                <Image
                  src="/images/youth.jpg"
                  alt="A Move Zanzibar acrobat balancing in a handstand on a teammate's shoulder, on the beach in Jambiani"
                  title="A Move Zanzibar acrobat balancing in a handstand on a teammate's shoulder, on the beach in Jambiani"
                  fill
                  sizes="(max-width: 1024px) 90vw, 34vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[1600/667] w-full overflow-hidden rounded-3xl shadow-photo lg:hidden">
                <Image
                  src="/images/training-english.JPEG"
                  alt="Children in a free English lesson at the Move Zanzibar Community Centre"
                  title="Children in a free English lesson at the Move Zanzibar Community Centre"
                  fill
                  sizes="90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                <Sprout size={20} strokeWidth={2.2} aria-hidden />
              </span>
              <h3 className="font-display text-2xl font-bold text-charcoal">
                {youth.trainingTitle}
              </h3>
            </div>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-soft">
              {youth.trainingBody}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {youth.trainingExtras.map((extra) => (
                <span
                  key={extra}
                  className="rounded-full border border-line bg-cloud px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-charcoal-soft"
                >
                  {extra}
                </span>
              ))}
            </div>
            {/* Rellena el espacio que deja un texto más corto que la foto, con
                contenido real (no decorativo): el entrenamiento es gratis
                porque alguien lo sostiene. */}
            <div className="mt-6 flex items-center gap-4 rounded-2xl bg-brand-soft px-5 py-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                <HeartHandshake size={20} aria-hidden />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold leading-snug text-charcoal">
                  {youth.trainingCtaBody}
                </p>
                <a
                  href="#support"
                  onClick={() => trackEvent("cta_support", { section: "youth_program" })}
                  title={youth.trainingCtaLabel}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-brand hover:text-brand-dark"
                >
                  {youth.trainingCtaLabel}
                  <ArrowRight size={13} aria-hidden />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ----------------------------------------------------- Community */}
        <div
          id="community"
          className="mt-24 grid scroll-mt-24 items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14"
        >
          <Reveal delay={80} className="order-2 lg:order-1">
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-turquoise-soft text-turquoise">
                <Users size={20} strokeWidth={2.2} aria-hidden />
              </span>
              <h3 className="font-display text-2xl font-bold text-charcoal">
                {youth.communityTitle}
              </h3>
            </div>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-soft">
              {youth.communityBody}
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl bg-turquoise shadow-card">
              <div className="flex items-center gap-4 px-5 py-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/20 text-white">
                  <Drum size={20} aria-hidden />
                </span>
                <p className="text-sm font-bold leading-snug text-white sm:text-base">
                  {youth.communityTag}
                </p>
              </div>
              <a
                href="#booking"
                onClick={() => trackEvent("cta_book_show", { section: "community" })}
                title={youth.bookShowCta}
                className="flex items-center justify-center gap-1.5 border-t border-white/20 bg-white/10 px-5 py-3 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/20"
              >
                {youth.bookShowCta}
                <ArrowRight size={14} aria-hidden />
              </a>
            </div>
            {/* Foto ancha debajo de la tarjeta del show: ocupa el espacio que
                antes quedaba vacío junto a la columna de fotos. */}
            <div className="relative mt-6 aspect-[1600/667] w-full overflow-hidden rounded-3xl shadow-photo">
              <Image
                src="/images/community-play.JPEG"
                alt="Children playing together on the painted mural wall at the Move Zanzibar Community Centre"
                title="Children playing together on the painted mural wall at the Move Zanzibar Community Centre"
                fill
                sizes="(max-width: 1024px) 90vw, 60vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={140} className="order-1 lg:order-2 lg:pt-3">
            <div className="mx-auto max-w-sm lg:mx-0 lg:max-w-none">
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-photo">
                <Image
                  src="/images/community-life.jpg"
                  alt="Children from the Move Zanzibar community sitting together, listening to a young performer with a microphone, palm trees behind them"
                  title="Children from the Move Zanzibar community sitting together, listening to a young performer with a microphone, palm trees behind them"
                  fill
                  sizes="(max-width: 1024px) 90vw, 36vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* ------------------------------------------------------ Galería */}
        {/* Mobile/tablet: tira horizontal con scroll (el alto no crece si se
            suman más fotos). Desktop: la grilla original, sin tocar. */}
        <Reveal delay={80} className="mt-20">
          <div className="relative lg:hidden">
            <div
              ref={galleryRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {GALLERY_IMAGES.map((image, i) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Ver imagen ampliada: ${image.alt}`}
                  className="group relative aspect-4/3 h-56 shrink-0 snap-start overflow-hidden rounded-3xl shadow-photo transition-transform duration-300 hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:h-64"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    title={image.alt}
                    fill
                    sizes="(max-width: 640px) 70vw, 340px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>

          </div>

          <div className="hidden lg:grid lg:grid-cols-5 lg:gap-4">
            {GALLERY_IMAGES.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`Ver imagen ampliada: ${image.alt}`}
                className="group relative aspect-4/3 w-full overflow-hidden rounded-3xl shadow-photo transition-transform duration-300 hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  title={image.alt}
                  fill
                  sizes="30vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <Lightbox
        images={GALLERY_IMAGES}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
