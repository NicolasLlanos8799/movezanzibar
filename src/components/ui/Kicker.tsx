import type { ReactNode } from "react";

type Tone = "brand" | "turquoise" | "light";

const tones: Record<Tone, string> = {
  brand: "text-brand",
  turquoise: "text-turquoise",
  light: "text-white/70",
};

const dotTones: Record<Tone, string> = {
  brand: "bg-brand",
  turquoise: "bg-turquoise",
  light: "bg-white/70",
};

/**
 * Antetítulo minimal: punto de color + texto en versalitas.
 * Reemplaza a la "píldora" con borde grueso de la v1 — más editorial.
 */
export function Kicker({
  children,
  tone = "brand",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.2em] ${tones[tone]} ${className}`}
    >
      <span className={`size-1.5 rounded-full ${dotTones[tone]}`} aria-hidden />
      {children}
    </span>
  );
}
