"use client";

import Image from "next/image";
import { ArrowDown, Drum } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";
import { splitTimeRange } from "@/lib/text";
import { trackEvent } from "@/lib/analytics";
import heroMobileImg from "../../public/images/centrum.jpg";
import heroDesktopImg from "../../public/images/portada.JPEG";

export function Hero() {
  const { t } = useLanguage();
  const hero = t.hero;
  const hasVideo = Boolean(SITE.heroVideoUrl);

  /** El horario ("4:30–6 PM") no debe partirse en dos líneas en celular. */
  const saturdayBadgeParts = splitTimeRange(hero.saturdayBadge);

  return (
    <section id="top" className="relative h-[92vh] min-h-[640px] w-full overflow-hidden bg-charcoal">
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
            {/* Imports estáticos (en vez de string path): Next.js genera un
                blurDataURL automático desde el archivo real, así la foto
                aparece con una transición suave en vez de un salto brusco de
                blanco a imagen — antes, en redes lentas, había varios
                segundos de fondo en blanco (con el texto casi invisible)
                mientras bajaba la versión de máxima resolución. */}
            <Image
              src={heroMobileImg}
              alt="The Move Zanzibar training yard, with its painted mural wall, palm trees, and training equipment on the astroturf"
              title="The Move Zanzibar training yard in Jambiani"
              fill
              priority
              placeholder="blur"
              quality={65}
              sizes="100vw"
              className="animate-kenburns origin-center object-cover will-change-transform sm:hidden"
            />
            {/* portada.JPEG tiene extensión en mayúscula — Next.js NO genera
                el blurDataURL automático para ".JPEG" (solo reconoce
                ".jpeg"/".jpg" en minúscula), así que se lo pasamos a mano
                (thumbnail de 16px generado una vez desde el archivo real). */}
            <Image
              src={heroDesktopImg}
              alt="Entrance to the Move Zanzibar Community Centre in Jambiani, with its painted mural wall and palm trees"
              title="Entrance to the Move Zanzibar Community Centre in Jambiani"
              fill
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAHABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCKG3uyXZRGOeMj7wqNotQQkhjnGMkgiiis+Zl8iP/Z"
              quality={65}
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
            <span>
              {saturdayBadgeParts.before}
              {saturdayBadgeParts.time && (
                <span className="whitespace-nowrap">{saturdayBadgeParts.time}</span>
              )}
              {saturdayBadgeParts.after}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
