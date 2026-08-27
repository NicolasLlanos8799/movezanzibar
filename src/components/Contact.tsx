"use client";

import { Mail, MapPin, Phone, Instagram, Facebook, Star, Ticket, MessageCircle } from "lucide-react";
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

        {/* Contrataciones: separado y con diseño propio (marca, no neutro)
            para que no se confunda con "escribinos para saludar". */}
        <Reveal delay={70}>
          <div id="booking" className="mx-auto mt-10 max-w-2xl scroll-mt-28 rounded-3xl bg-gradient-to-br from-brand to-brand-dark p-6 text-left shadow-card-hover sm:p-8">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/15 text-white">
                <Ticket size={22} aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                  {contact.bookingTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85 sm:text-base">
                  {contact.bookingBody}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={mailtoLink(
                  "Show booking request — Move Zanzibar",
                  "Hello Move Zanzibar! We'd like to book your show for an event.\n\nDate:\nVenue / location:\nMore details:\n\n"
                )}
                onClick={() => trackEvent("cta_book_show", { section: "contact_booking", channel: "email" })}
                title={contact.bookingEmailLabel}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-brand transition-colors hover:bg-white/90"
              >
                <Mail size={16} aria-hidden />
                {contact.bookingEmailLabel}
              </a>
              <a
                href={whatsappLink(
                  "Hello Move Zanzibar! We'd like to book your show for an event. Here are the details — Date: / Venue: / More info:"
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("cta_book_show", { section: "contact_booking", channel: "whatsapp" })}
                title={contact.bookingWhatsappLabel}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-white/70 px-5 py-3 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                <MessageCircle size={16} aria-hidden />
                {contact.bookingWhatsappLabel}
              </a>
            </div>
          </div>
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
