"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { Logo } from "@/components/Logo";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-white py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-5 text-center sm:flex-row sm:justify-between sm:text-left sm:px-8">
        <Logo />
        <p className="text-xs text-charcoal-soft/70">
          © {year} Move Zanzibar. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
