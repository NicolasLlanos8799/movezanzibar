/**
 * Configuración global del sitio.
 * ⚠️ REEMPLAZA LOS PLACEHOLDERS por los datos reales antes de publicar.
 */
export const SITE = {
  name: "Move Zanzibar",
  location: "Jambiani, Zanzibar",
  /** Enlace directo a la ubicación exacta del centro en Google Maps. */
  mapsUrl:
    "https://www.google.com/maps/place//data=!4m2!3m1!1s0x185d17d90b0f6889:0xf1d789ce0f3b0e48?sa=X&ved=1t:8290&ictx=111",
  url: "https://movezanzibar.com",
  email: "zanzibarmove@gmail.com",
  /** Número de contacto para bookings, donaciones o cualquier consulta. */
  phone: "+255 718 360 613",
  phoneHref: "tel:+255718360613",
  instagram: "https://instagram.com/movezanzibar",
  tiktok: "https://tiktok.com/@movezanzibar",
  facebook: "https://web.facebook.com/p/Move-Zanzibar-61557007821073/",
  tripadvisor:
    "https://www.tripadvisor.es/Attraction_Review-g635745-d27425465-Reviews-Move_Zanzibar_Community_Center-Jambiani_Zanzibar_Island_Zanzibar_Archipelago.html",
  /**
   * Video de portada del Hero (mp4 en /public/video o embed de YouTube/Vimeo).
   * Vacío = el Hero usa la fotografía fija. En cuanto tengas el show reel,
   * pon la ruta/URL aquí y el componente Hero cambia solo a <video>.
   */
  heroVideoUrl: "",
} as const;

export function mailtoLink(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  return `mailto:${SITE.email}?${params.toString()}`;
}

/** Número de WhatsApp sin espacios ni signos, para el enlace wa.me. */
export function whatsappLink(text: string) {
  const digits = SITE.phone.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/**
 * Donaciones — transferencia bancaria directa a la cuenta que usa el centro
 * (sin pasarela de pago, tal como se decidió).
 *
 * ⚠️ TODO ESTO ES PLACEHOLDER. Reemplaza cada campo con los datos reales de
 * Ndimu/Move Zanzibar antes de publicar — mientras tanto el panel de
 * transferencia muestra "TBD" de forma visible para que sea imposible
 * publicarlo por error sin notarlo.
 */
export const DONATION = {
  /** Los 3 montos fijos (USD) + la opción de monto libre en el componente. */
  tiers: [
    { id: "seed", amount: 5 },
    { id: "grow", amount: 30 },
    { id: "transform", amount: 500 },
  ],
  bank: {
    accountName: "TBD — account holder name",
    bankName: "TBD — bank name",
    accountNumber: "TBD — account number / IBAN",
    swift: "TBD — SWIFT / BIC",
  },
} as const;

export type DonationTierId = (typeof DONATION.tiers)[number]["id"];
