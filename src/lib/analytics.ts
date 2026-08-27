"use client";

/**
 * Capa fina sobre GA4 (gtag.js) y Microsoft Clarity.
 *
 * Es seguro llamar a trackEvent() siempre, incluso si todavía no configuraste
 * los IDs en Vercel (ver Analytics.tsx) o si un adblocker frenó los scripts:
 * gtag/clarity simplemente no van a existir en window y la función no hace
 * nada, sin romper la interacción del usuario.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params?: AnalyticsParams) {
  if (typeof window === "undefined") return;

  try {
    window.gtag?.("event", name, params);
  } catch {
    /* GA no disponible: no bloqueamos la interacción del usuario por esto */
  }

  try {
    // Clarity: el evento en sí no lleva params, pero los mandamos como custom
    // tags para poder filtrar sesiones por ellos en el dashboard.
    window.clarity?.("event", name);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) window.clarity?.("set", key, String(value));
      }
    }
  } catch {
    /* Clarity no disponible */
  }
}
