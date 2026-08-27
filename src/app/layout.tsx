import type { Metadata, Viewport } from "next";
import { Montserrat, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { SITE } from "@/lib/site";

/* --------------------------------------------------------------------------
   TIPOGRAFÍA
   Tres niveles, fieles a la identidad real del logo (círculo naranja +
   trazo manuscrito blanco):
   - Caveat    → SOLO acento manuscrito de una palabra/frase corta.
   - Montserrat→ titulares y subtítulos (el peso real de la jerarquía).
   - Inter     → cuerpo de texto, máxima legibilidad.
   next/font las auto-hospeda: cero requests a Google en producción.
   -------------------------------------------------------------------------- */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Move Zanzibar — Community Centre",
    template: "%s · Move Zanzibar",
  },
  description:
    "Move Zanzibar is a community of young acrobats and dancers in Jambiani. We nurture talent, run a free youth training program, and live and grow together through movement.",
  keywords: [
    "Move Zanzibar",
    "Jambiani",
    "Zanzibar acrobats",
    "youth program Tanzania",
    "community art Zanzibar",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-180.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: "Move Zanzibar — Community Centre",
    description:
      "A community of young acrobats and dancers in Jambiani, Zanzibar — free youth training and a life built around movement.",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Move Zanzibar",
    description: "Community Centre (Acrobatics, After School Activities & Learning, NGO).",
    images: ["/images/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#E04F16",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${caveat.variable}`}
    >
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
