"use client";

import { Mail, MapPin, Phone, Instagram, Facebook, Star } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { SITE, mailtoLink, whatsappLink } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

/**
 * Cierre informativo: solo contacto directo, sin CTAs de venta ni formulario.
 * "Así nos encuentras", no "así nos financias".
 */
export function Contact() {
  const { t } = useLanguage();
  const contact = t.contact;

  return (
    <section id="contact" className="scroll-mt-20 bg-charcoal py-20 text-white sm:py-28">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <Kicker tone="light" className="justify-center">
            {contact.kicker}
          </Kicker>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.05] text-white">
            {contact.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            {contact.body}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
            <a
              href={mailtoLink("Hello Move Zanzibar", "Hello Move Zanzibar,\n\n")}
              onClick={() => trackEvent("contact_click", { channel: "email" })}
              title={contact.emailLabel}
              className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.04] p-5 text-left transition-colors hover:border-brand hover:bg-white/[0.07]"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand/20 text-brand">
                <Mail size={19} aria-hidden />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.16em] text-white/45">
                  {contact.emailLabel}
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-white break-all">
                  {SITE.email}
                </span>
              </span>
            </a>

            <a
              href={whatsappLink("Hello Move Zanzibar,")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("contact_click", { channel: "whatsapp" })}
              title={contact.phoneLabel}
              className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.04] p-5 text-left transition-colors hover:border-brand hover:bg-white/[0.07]"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand/20 text-brand">
                <Phone size={19} aria-hidden />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.16em] text-white/45">
                  {contact.phoneLabel}
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-white">
                  {SITE.phone}
                </span>
              </span>
            </a>

            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("contact_click", { channel: "maps" })}
              title={contact.locationLabel}
              className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.04] p-5 text-left transition-colors hover:border-turquoise hover:bg-white/[0.07] sm:col-span-2"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-turquoise/20 text-turquoise">
                <MapPin size={19} aria-hidden />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.16em] text-white/45">
                  {contact.locationLabel}
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-white">
                  {SITE.location}
                </span>
                <span className="mt-0.5 block text-xs font-medium text-turquoise/80">
                  {contact.locationHint}
                </span>
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-10">
            <span className="block text-xs font-bold uppercase tracking-[0.16em] text-white/45">
              {contact.followLabel}
            </span>
            <div className="mt-4 flex justify-center gap-3">
              {[
                { href: SITE.instagram, Icon: Instagram, label: "Instagram" },
                { href: SITE.facebook, Icon: Facebook, label: "Facebook" },
                { href: SITE.tripadvisor, Icon: Star, label: "TripAdvisor" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  onClick={() => trackEvent("social_click", { platform: label.toLowerCase() })}
                  className="grid size-11 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-brand hover:text-brand"
                >
                  <Icon size={18} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <p className="mx-auto mt-10 max-w-md text-sm italic leading-relaxed text-white/45">
            {contact.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
