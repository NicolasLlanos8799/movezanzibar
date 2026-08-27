"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Building2,
  Copy,
  Check,
  HeartHandshake,
  BookOpen,
  UtensilsCrossed,
  Sparkles,
  Gift,
  Mail,
  MessageCircle,
  PartyPopper,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { DONATION, mailtoLink, whatsappLink, type DonationTierId } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

type Selection = DonationTierId | "custom" | null;

/** Un ícono por plan, para que cada monto se sienta concreto de un vistazo. */
const TIER_ICONS: Record<DonationTierId, typeof BookOpen> = {
  seed: BookOpen,
  grow: UtensilsCrossed,
  transform: Sparkles,
};

/**
 * Donación por transferencia bancaria directa (sin pasarela de pago, según
 * decisión del cliente). Los datos del banco viven en DONATION.bank
 * (src/lib/site.ts) y hoy son TODOS placeholders — reemplázalos antes de
 * publicar. El panel los muestra tal cual, así que un "TBD" sin reemplazar
 * es visible de inmediato en vez de fallar en silencio.
 *
 * Diseño pensado para que la donación se sienta cercana y concreta: la
 * justificación de cada plan vive directo en la tarjeta (no hay que hacer
 * clic para verla), hay una foto real de la comunidad arriba, y al elegir
 * un plan se refuerza con una franja destacada antes de los datos del banco.
 */
export function Donate() {
  const { t } = useLanguage();
  const donate = t.donate;
  const [selected, setSelected] = useState<Selection>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [customConfirmed, setCustomConfirmed] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const justification =
    selected === "custom"
      ? donate.customJustification
      : selected
        ? donate.tierJustifications[selected]
        : null;

  const parsedCustomAmount = parseFloat(customAmount);
  const hasValidCustomAmount = Number.isFinite(parsedCustomAmount) && parsedCustomAmount > 0;

  /** Monto final a mostrar/comunicar: fijo si es un tier, o el custom ya confirmado. */
  const confirmedAmount =
    selected && selected !== "custom"
      ? DONATION.tiers.find((tier) => tier.id === selected)?.amount ?? null
      : selected === "custom" && customConfirmed && hasValidCustomAmount
        ? parsedCustomAmount
        : null;

  /** Para un tier fijo mostramos su nombre (Seed/Grow/Transform); un monto
   * libre ya se explica solo con el "$", así que no repetimos "Choose your
   * own amount" al lado del número. */
  const confirmedLabel = selected && selected !== "custom" ? donate.tierLabels[selected] : null;

  /** Solo se revela el panel de banco/monto una vez que hay un monto en firme
   * (los tiers son inmediatos; el monto libre necesita el paso de confirmar). */
  const isReady = confirmedAmount !== null;

  function selectTier(id: DonationTierId) {
    setSelected(id);
    setCustomConfirmed(false);
    trackEvent("donate_select_tier", { tier: id, amount: DONATION.tiers.find((t) => t.id === id)?.amount });
  }

  function selectCustom() {
    setSelected("custom");
    setCustomConfirmed(false);
    trackEvent("donate_select_tier", { tier: "custom" });
  }

  function confirmCustomAmount() {
    if (hasValidCustomAmount) {
      setCustomConfirmed(true);
      trackEvent("donate_confirm_custom_amount", { amount: parsedCustomAmount });
    }
  }

  const donationMessage = confirmedAmount
    ? `Hello Move Zanzibar! I just sent a donation of $${confirmedAmount}${confirmedLabel ? ` (${confirmedLabel})` : ""} via bank transfer. I wanted to let you know — thank you for everything you do!`
    : "Hello Move Zanzibar!";

  async function copy(field: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      trackEvent("donate_copy_bank_field", { field });
      setTimeout(() => setCopiedField((f) => (f === field ? null : f)), 1800);
    } catch {
      /* clipboard no disponible: el valor sigue visible para copiar a mano */
    }
  }

  const bankRows: { key: string; label: string; value: string }[] = [
    { key: "accountName", label: donate.fieldLabels.accountName, value: DONATION.bank.accountName },
    { key: "bankName", label: donate.fieldLabels.bankName, value: DONATION.bank.bankName },
    { key: "accountNumber", label: donate.fieldLabels.accountNumber, value: DONATION.bank.accountNumber },
    { key: "swift", label: donate.fieldLabels.swift, value: DONATION.bank.swift },
  ];

  return (
    <section
      id="support"
      className="scroll-mt-20 relative overflow-hidden bg-gradient-to-b from-brand-soft/60 via-cloud to-cloud py-20 sm:py-28"
    >
      {/* Formas suaves de fondo — calidez sin caer en look de producto. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-turquoise/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal className="text-center">
          <Kicker tone="brand" className="justify-center">
            {donate.kicker}
          </Kicker>
          <h2 className="mt-5 font-display text-[clamp(1.9rem,4.2vw,2.9rem)] font-extrabold leading-[1.05] text-charcoal">
            {donate.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-charcoal-soft">
            {donate.subtitle}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="overflow-hidden rounded-3xl shadow-photo">
            <div className="relative aspect-16/9 w-full sm:aspect-21/9">
              <Image
                src="/images/donate-impact.JPEG"
                alt="A father and his young son looking out at the ocean in Jambiani, Zanzibar"
                title="A father and his young son looking out at the ocean in Jambiani, Zanzibar"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <p className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-charcoal-soft">
            <HeartHandshake size={15} className="text-brand" aria-hidden />
            {donate.photoCaption}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {DONATION.tiers.map((tier) => {
              const Icon = TIER_ICONS[tier.id];
              const isSelected = selected === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => selectTier(tier.id)}
                  aria-pressed={isSelected}
                  className={`group relative flex flex-col items-start gap-3 rounded-3xl border-2 p-6 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-brand bg-brand shadow-card-hover"
                      : "border-line bg-white shadow-card hover:-translate-y-1 hover:border-brand/40 hover:shadow-card-hover"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute right-4 top-4 grid size-6 place-items-center rounded-full bg-white text-brand">
                      <Check size={14} strokeWidth={3} aria-hidden />
                    </span>
                  )}
                  <span
                    className={`grid size-12 shrink-0 place-items-center rounded-2xl transition-colors ${
                      isSelected ? "bg-white/15 text-white" : "bg-brand-soft text-brand"
                    }`}
                  >
                    <Icon size={22} aria-hidden />
                  </span>
                  <div>
                    <span
                      className={`font-display text-3xl font-extrabold leading-none ${
                        isSelected ? "text-white" : "text-charcoal"
                      }`}
                    >
                      ${tier.amount}
                    </span>
                    <span
                      className={`mt-1.5 block text-xs font-bold uppercase tracking-wide ${
                        isSelected ? "text-white/80" : "text-brand"
                      }`}
                    >
                      {donate.tierLabels[tier.id]}
                    </span>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      isSelected ? "text-white/90" : "text-charcoal-soft"
                    }`}
                  >
                    {donate.tierJustifications[tier.id]}
                  </p>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={selectCustom}
            aria-pressed={selected === "custom"}
            className={`mt-4 flex w-full items-center gap-4 rounded-3xl border-2 p-5 text-left transition-all duration-300 ${
              selected === "custom"
                ? "border-brand bg-brand shadow-card-hover"
                : "border-line bg-white shadow-card hover:-translate-y-0.5 hover:border-brand/40"
            }`}
          >
            <span
              className={`grid size-11 shrink-0 place-items-center rounded-2xl transition-colors ${
                selected === "custom" ? "bg-white/15 text-white" : "bg-brand-soft text-brand"
              }`}
            >
              <Gift size={20} aria-hidden />
            </span>
            <span
              className={`font-display text-base font-bold ${
                selected === "custom" ? "text-white" : "text-charcoal"
              }`}
            >
              {donate.customLabel}
            </span>
          </button>

          {selected === "custom" && !customConfirmed && (
            <form
              className="mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                confirmCustomAmount();
              }}
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="number"
                  min={1}
                  inputMode="decimal"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setCustomConfirmed(false);
                  }}
                  placeholder={donate.customPlaceholder}
                  autoFocus
                  className="w-full rounded-2xl border-2 border-line bg-white px-5 py-3.5 text-lg font-semibold text-charcoal placeholder:font-normal placeholder:text-charcoal-soft/50 focus:border-brand focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!hasValidCustomAmount}
                  className="shrink-0 rounded-2xl bg-brand px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                >
                  {donate.confirmAmountLabel}
                </button>
              </div>
              <p className="mt-3 flex items-start gap-2.5 text-sm leading-relaxed text-charcoal-soft">
                <HeartHandshake size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                {donate.customJustification}
              </p>
            </form>
          )}
        </Reveal>

        {(!selected || (selected === "custom" && !isReady)) && (
          <p className="mt-6 text-center text-sm text-charcoal-soft">{donate.selectPrompt}</p>
        )}

        {isReady && (
          <Reveal delay={0} className="mt-8">
            {/* Tarjeta de confirmación: diseño propio (oscuro), separado de las
                tarjetas de selección — refuerza "esto es lo que estás por donar". */}
            <div className="flex items-center gap-4 rounded-3xl bg-charcoal px-6 py-5 text-white shadow-card-hover">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand text-white">
                <PartyPopper size={22} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <span className="block text-xs font-bold uppercase tracking-[0.16em] text-white/50">
                  {donate.confirmedKicker}
                </span>
                <span className="font-display text-3xl font-extrabold leading-none text-white">
                  ${confirmedAmount}
                </span>
                {confirmedLabel && (
                  <span className="ml-2 text-sm font-semibold text-white/60">{confirmedLabel}</span>
                )}
              </div>
              {selected === "custom" && (
                <button
                  type="button"
                  onClick={() => setCustomConfirmed(false)}
                  className="shrink-0 rounded-full border border-white/25 px-3.5 py-1.5 text-xs font-bold text-white/80 transition-colors hover:border-white hover:text-white"
                >
                  {donate.changeAmountLabel}
                </button>
              )}
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-2xl bg-brand-soft px-6 py-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                <HeartHandshake size={16} aria-hidden />
              </span>
              <p className="text-sm font-semibold leading-relaxed text-charcoal">
                {justification}
              </p>
            </div>

            <div className="mt-5 overflow-hidden rounded-3xl border border-line bg-white shadow-card">
              <div className="h-1.5 w-full bg-gradient-to-r from-brand via-brand to-turquoise" />
              <div className="p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                    <Building2 size={18} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-charcoal">
                      {donate.bankTitle}
                    </h3>
                    <p className="text-sm text-charcoal-soft">{donate.bankNote}</p>
                  </div>
                </div>

                <dl className="mt-5 divide-y divide-line">
                  {bankRows.map((row) => (
                    <div
                      key={row.key}
                      className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                    >
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-wide text-charcoal-soft/70">
                          {row.label}
                        </dt>
                        <dd className="mt-0.5 text-sm font-semibold text-charcoal">{row.value}</dd>
                      </div>
                      <button
                        type="button"
                        onClick={() => copy(row.key, row.value)}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-bold text-charcoal-soft transition-colors hover:border-brand hover:bg-brand-soft hover:text-brand"
                      >
                        {copiedField === row.key ? (
                          <>
                            <Check size={13} aria-hidden />
                            {donate.copiedLabel}
                          </>
                        ) : (
                          <>
                            <Copy size={13} aria-hidden />
                            {donate.copyLabel}
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-line bg-white p-6 text-center shadow-card sm:p-7">
              <h4 className="font-display text-base font-bold text-charcoal">
                {donate.notifyTitle}
              </h4>
              <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-charcoal-soft">
                {donate.notifyBody}
              </p>
              <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href={mailtoLink(`Donation to Move Zanzibar — $${confirmedAmount}`, donationMessage)}
                  onClick={() => trackEvent("donate_notify", { channel: "email", amount: confirmedAmount ?? undefined })}
                  title={donate.notifyEmailLabel}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
                >
                  <Mail size={16} aria-hidden />
                  {donate.notifyEmailLabel}
                </a>
                <a
                  href={whatsappLink(donationMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("donate_notify", { channel: "whatsapp", amount: confirmedAmount ?? undefined })}
                  title={donate.notifyWhatsappLabel}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-line px-5 py-3 text-sm font-bold text-charcoal transition-colors hover:border-brand hover:text-brand"
                >
                  <MessageCircle size={16} aria-hidden />
                  {donate.notifyWhatsappLabel}
                </a>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
