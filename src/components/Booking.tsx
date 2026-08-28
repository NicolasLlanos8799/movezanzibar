"use client";

import { Mail, MessageCircle, Ticket } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { mailtoLink, whatsappLink } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

/**
 * Sección propia para contrataciones del show, separada del cierre de
 * contacto ("Find us"): son dos intenciones distintas (contratar un show vs.
 * escribir/ubicarnos) y no deben leerse como una sola cosa.
 */
export function Booking() {
  const { t } = useLanguage();
  const contact = t.contact;

  return (
    <section id="booking" className="scroll-mt-20 bg-cloud py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <Reveal>
          <div className="rounded-3xl bg-gradient-to-br from-brand to-brand-dark p-6 text-left shadow-card-hover sm:p-8">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/15 text-white">
                <Ticket size={22} aria-hidden />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                  {contact.bookingTitle}
                </h2>
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
                onClick={() => trackEvent("cta_book_show", { section: "booking", channel: "email" })}
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
                onClick={() => trackEvent("cta_book_show", { section: "booking", channel: "whatsapp" })}
                title={contact.bookingWhatsappLabel}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-white/70 px-5 py-3 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                <MessageCircle size={16} aria-hidden />
                {contact.bookingWhatsappLabel}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
