import type { LightboxImage } from "@/components/ui/Lightbox";

/**
 * Contenido visual de "Saturdays Show": fotos y clips cortos del show en
 * vivo de los sábados, tomadas en el escenario real del centro.
 *
 * Cómo agregar contenido nuevo:
 *
 * FOTOS
 * 1. Copia el archivo a `public/images/show/` (conserva la extensión tal
 *    cual la exporta el teléfono/cámara — nunca la cambies a mano, ver
 *    regla del proyecto sobre extensiones .JPEG/.PNG en mayúscula).
 * 2. Agrega un objeto al array SHOW_PHOTOS de abajo con esa ruta.
 *
 * VIDEOS (clips cortos, ~10s ideal — ver public/videos/show/README.md)
 * 1. Recorta el clip a los ~10 segundos más interesantes.
 * 2. Copia el .mp4 a `public/videos/show/` y una miniatura .jpg del mismo
 *    contenido a `public/images/show/` (el "poster": lo que se ve antes de
 *    tocar play, así el video real solo se descarga si alguien lo abre —
 *    clave para el público con internet lento en Tanzania).
 * 3. Agrega un objeto al array SHOW_VIDEOS de abajo.
 */

export type ShowMediaItem = LightboxImage & {
  type: "image" | "video";
  /** Solo para videos: miniatura que se ve antes de tocar play. */
  poster?: string;
};

export const SHOW_PHOTOS: ShowMediaItem[] = [
  {
    type: "image",
    src: "/images/show/show-tower-handstand-1.jpg",
    alt: "A five-person acrobat tower on the Move Zanzibar stage, with the top performer holding a full handstand split against the sunset sky",
  },
  {
    type: "image",
    src: "/images/show/show-pole-flight-1.jpg",
    alt: "Six Move Zanzibar performers flying off two vertical poles mid-show, arms outstretched, palm trees behind them",
  },
  {
    type: "image",
    src: "/images/show/show-tower-handstand-2.jpg",
    alt: "A performer holding a handstand split on top of a human tower, teammates watching from the stage",
  },
  {
    type: "image",
    src: "/images/show/show-headstand-splits.jpg",
    alt: "A performer balancing in a split headstand on a teammate's head, with the audience watching from their seats",
  },
  {
    type: "image",
    src: "/images/show/show-pyramid-finale.jpg",
    alt: "A five-person acrobat pyramid at the Move Zanzibar show, top performer in a handstand split, audience filming below",
  },
  {
    type: "image",
    src: "/images/show/show-pole-flight-2.jpg",
    alt: "Wide view of the Saturday show: performers flying off two poles above the stage, full audience seated in front",
  },
  {
    type: "image",
    src: "/images/show/show-tower-silhouette.jpg",
    alt: "A performer in a handstand split balanced high on a human tower, silhouetted against the sky",
  },
  {
    type: "image",
    src: "/images/show/show-finale-tower.jpg",
    alt: "A performer standing on top of a tall wooden tower with arms raised, silhouetted against the evening sky",
  },
];

export const SHOW_VIDEOS: ShowMediaItem[] = [
  {
    type: "video",
    src: "/videos/show/pole-flight.mp4",
    poster: "/images/show/pole-flight-poster.jpg",
    alt: "A performer swinging through the air on the pole rig during the Saturday show, full audience watching",
  },
  {
    type: "video",
    src: "/videos/show/headdress-dance.mp4",
    poster: "/images/show/headdress-dance-poster.jpg",
    alt: "A solo dancer in a feather headdress performing on stage at the Saturday show",
  },
  {
    type: "video",
    src: "/videos/show/circle-dance.mp4",
    poster: "/images/show/circle-dance-poster.jpg",
    alt: "Performers in grass skirts dancing together in a circle on stage",
  },
];

/** Fotos primero, videos después — orden en el que se arma la grilla. */
export const SHOW_MEDIA: ShowMediaItem[] = [...SHOW_PHOTOS, ...SHOW_VIDEOS];
