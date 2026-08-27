import Image from "next/image";

/**
 * Logotipo oficial: círculo naranja mandarina con trazo manuscrito blanco
 * y dos hojas orgánicas (public/brand/logo.png). `inverted` deja espacio
 * por si en algún fondo oscuro se necesita una variante distinta.
 */
export function Logo({
  inverted = false,
  className = "",
}: {
  inverted?: boolean;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/brand/logo.png"
        alt="Move Zanzibar"
        title="Move Zanzibar"
        width={44}
        height={44}
        priority
        className="size-10 rounded-full sm:size-11"
      />
      <span
        className={`font-display text-base font-extrabold leading-none tracking-tight sm:text-lg ${
          inverted ? "text-white" : "text-charcoal"
        }`}
      >
        Move Zanzibar
      </span>
    </span>
  );
}
