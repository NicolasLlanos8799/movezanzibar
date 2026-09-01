/**
 * Interruptores de features que todavía no están listas para producción.
 * En false: el código sigue ahí (nada se borra), pero queda invisible —
 * sin link en el navbar, sin teaser en el home, y la ruta devuelve 404.
 * Cuando esté lista para publicarse, cambiar a true acá (un solo lugar).
 */
export const FEATURES = {
  /** Página /show + teaser en el home + link "Saturdays Show" en el navbar. */
  saturdaysShow: false,
} as const;

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
  url: "https://www.move-zanzibar.com",
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
  // OJO: no usar URLSearchParams aquí — codifica los espacios como "+",
  // que los clientes de correo (mailto:) no interpretan como espacio y
  // muestran literal. encodeURIComponent usa %20, que sí funciona.
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${SITE.email}?${params.join("&")}`;
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
 * Datos bancarios reales (confirmados por el banco, ver carta de ABSA).
 */
export const DONATION = {
  /** Los 3 montos fijos (USD) + la opción de monto libre en el componente. */
  tiers: [
    { id: "seed", amount: 5 },
    { id: "grow", amount: 30 },
    { id: "transform", amount: 500 },
  ],
  bank: {
    accountName: "Clalence Valentino Lutumo",
    bankName: "ABSA Bank Tanzania Limited",
    branchName: "Zanzibar Branch, Ground Floor, ZSTC Building, Malawi Rd",
    accountNumber: "TZS 0031220254",
    swift: "BARCTZTZ",
    branchCode: "003",
    sortCode: "020003",
    /** Bancos corresponsales: para transferencias internacionales en USD/GBP/EUR
     * cuando el banco emisor pide un intermediario en esa moneda. */
    correspondents: [
      { currency: "USD", bankName: "JP Morgan Chase Bank", bic: "CHASUS33" },
      { currency: "GBP", bankName: "Standard Chartered Bank London", bic: "SCBLGB2L" },
      { currency: "EUR", bankName: "Societe Generale Bank", bic: "SOGEFRPP" },
    ],
  },
} as const;

export type DonationTierId = (typeof DONATION.tiers)[number]["id"];
