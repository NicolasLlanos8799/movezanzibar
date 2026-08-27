"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

/**
 * Google Analytics 4 + Microsoft Clarity.
 *
 * Ambos son opcionales: si el env var correspondiente no está seteado en
 * Vercel, ese script directamente no se renderiza — así que en preview/local
 * sin IDs configurados el sitio funciona igual, sin trackear nada.
 *
 * Configurar en Vercel → Project Settings → Environment Variables:
 *   NEXT_PUBLIC_GA_ID       → Measurement ID de GA4, formato G-XXXXXXXXXX
 *                              (Admin → Data streams → tu stream web)
 *   NEXT_PUBLIC_CLARITY_ID  → Project ID de Clarity
 *                              (Settings → Overview, es el código en la URL)
 *
 * La verificación de Search Console va aparte, en layout.tsx (metadata.verification),
 * vía el env var GOOGLE_SITE_VERIFICATION.
 */
export function Analytics() {
  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}
    </>
  );
}
