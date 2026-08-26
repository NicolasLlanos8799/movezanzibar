"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxImage = {
  src: string;
  alt: string;
};

type LightboxProps = {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/**
 * Visor de imagen ampliada a pantalla completa. Pensado para sentirse a la
 * altura del resto del sitio (no un lightbox genérico de librería):
 * transición suave al abrir y al cambiar de foto, contador de posición,
 * la descripción de la imagen legible sobre un degradado, y una tira de
 * miniaturas para saltar directo a otra foto de la galería.
 */
export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const isOpen = index !== null;
  const total = images.length;

  // Fuerza a que la animación de entrada de la imagen se re-dispare en cada
  // cambio de foto (no solo la primera vez que se abre el visor).
  const [renderKey, setRenderKey] = useState(0);

  const goTo = useCallback(
    (next: number) => {
      if (total === 0) return;
      onNavigate(((next % total) + total) % total);
    },
    [onNavigate, total]
  );

  useEffect(() => {
    if (isOpen) setRenderKey((k) => k + 1);
  }, [index, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") goTo((index ?? 0) + 1);
      if (event.key === "ArrowLeft") goTo((index ?? 0) - 1);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, index, goTo, onClose]);

  if (!isOpen || index === null) return null;

  const current = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      className="animate-lightbox-overlay fixed inset-0 z-50 flex flex-col bg-charcoal/97 backdrop-blur-md"
      onClick={onClose}
    >
      {/* --------------------------------------------------------- Barra superior */}
      <div
        className="flex shrink-0 items-center justify-between px-4 pt-4 sm:px-6 sm:pt-6"
        onClick={(event) => event.stopPropagation()}
      >
        {total > 1 ? (
          <span className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold tracking-wide text-white/70">
            {index + 1} / {total}
          </span>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <X size={20} strokeWidth={2.2} aria-hidden />
        </button>
      </div>

      {/* ------------------------------------------------------------- Imagen */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-4">
        {total > 1 && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goTo(index - 1);
            }}
            aria-label="Previous image"
            className="absolute left-1 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-4 sm:size-12"
          >
            <ChevronLeft size={24} strokeWidth={2.2} aria-hidden />
          </button>
        )}

        <div
          key={renderKey}
          className="animate-lightbox-image relative h-full max-h-[70vh] w-full max-w-5xl sm:max-h-[74vh]"
          onClick={(event) => event.stopPropagation()}
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </div>

        {total > 1 && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goTo(index + 1);
            }}
            aria-label="Next image"
            className="absolute right-1 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-4 sm:size-12"
          >
            <ChevronRight size={24} strokeWidth={2.2} aria-hidden />
          </button>
        )}
      </div>

      {/* ------------------------------------------------- Pie: texto + miniaturas */}
      <div
        className="shrink-0 px-5 pb-5 pt-2 sm:px-8 sm:pb-8"
        onClick={(event) => event.stopPropagation()}
      >
        {current.alt && (
          <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-white/60 sm:text-base">
            {current.alt}
          </p>
        )}

        {total > 1 && (
          <div className="mt-5 flex justify-center gap-2 overflow-x-auto">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                className={`relative size-12 shrink-0 overflow-hidden rounded-lg transition-all duration-200 sm:size-14 ${
                  i === index
                    ? "opacity-100 ring-2 ring-white ring-offset-2 ring-offset-charcoal"
                    : "opacity-45 hover:opacity-75"
                }`}
              >
                <Image src={image.src} alt="" fill sizes="56px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
