import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "outline-light";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-display font-bold " +
  "transition-all duration-200 ease-out";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-[0_10px_30px_-8px_rgba(224,79,22,0.55)] hover:bg-brand-dark hover:shadow-[0_14px_36px_-8px_rgba(224,79,22,0.6)] hover:-translate-y-0.5",
  outline:
    "border-2 border-charcoal/15 bg-white text-charcoal hover:border-brand hover:text-brand",
  "outline-light":
    "border-2 border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[0.95rem] sm:text-base",
};

export type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const isExternal =
    external ?? (href.startsWith("http") || href.startsWith("mailto:"));

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
