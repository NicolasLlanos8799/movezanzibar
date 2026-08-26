"use client";

import { useEffect, useState } from "react";
import { Menu, X, Languages, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { LANGUAGE_LABEL, LANGUAGES } from "@/lib/content";
import { Logo } from "@/components/Logo";

export function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // El primer link ("Home") ya está representado por el logo. "Support" se
  // separa del resto para renderizarlo como botón destacado (acceso rápido
  // a donación, siempre visible) en vez de un link de texto más.
  const allLinks = t.nav.links.slice(1);
  const links = allLinks.filter((link) => link.id !== "support");
  const supportLink = allLinks.find((link) => link.id === "support");

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-white/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <a href="#top" aria-label="Move Zanzibar — home">
          <Logo />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="rounded-full px-4 py-2 font-display text-sm font-semibold text-charcoal-soft transition-colors hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {supportLink && (
            <a
              href={`#${supportLink.id}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2.5 font-display text-sm font-bold text-white shadow-card transition-transform hover:-translate-y-0.5 hover:bg-brand-dark sm:px-5"
            >
              <HeartHandshake size={16} aria-hidden />
              <span>{supportLink.label}</span>
            </a>
          )}

          <LangSwitch
            lang={lang}
            setLang={setLang}
            label={t.nav.langAria}
            className="hidden sm:flex"
          />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Menu"
            className="grid size-11 place-items-center rounded-full border border-line bg-white text-charcoal lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-line bg-white lg:hidden ${open ? "border-t" : ""}`}
        style={{ maxHeight: open ? "100vh" : 0, transition: "max-height .35s ease" }}
      >
        <div className="flex flex-col gap-1 px-5 py-6 sm:px-8">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3.5 font-display text-lg font-bold text-charcoal transition-colors hover:bg-cloud hover:text-brand"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3">
            <LangSwitch lang={lang} setLang={setLang} label={t.nav.langAria} />
          </div>
        </div>
      </div>
    </header>
  );
}

function LangSwitch({
  lang,
  setLang,
  label,
  className = "",
}: {
  lang: (typeof LANGUAGES)[number];
  setLang: (l: (typeof LANGUAGES)[number]) => void;
  label: string;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`flex items-center gap-1 rounded-full border border-line bg-white p-1 ${className}`}
    >
      <Languages size={15} className="ml-1.5 text-charcoal/40" aria-hidden />
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-2.5 py-1 font-display text-xs font-bold uppercase transition-colors ${
            lang === code
              ? "bg-charcoal text-white"
              : "text-charcoal/50 hover:text-brand"
          }`}
        >
          {LANGUAGE_LABEL[code]}
        </button>
      ))}
    </div>
  );
}
