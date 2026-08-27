"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";

export function Founder() {
  const { t } = useLanguage();
  const founder = t.founder;

  return (
    <section id="founder" className="scroll-mt-20 bg-cloud py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
        <Reveal>
          <div className="relative aspect-3/4 w-full max-w-[230px] overflow-hidden rounded-3xl shadow-photo mx-auto sm:max-w-xs lg:mx-0 lg:max-w-sm">
            <Image
              src="/images/founder.JPEG"
              alt="Ndimu, founder of Move Zanzibar, smiling on the beach in Zanzibar"
              title="Ndimu, founder of Move Zanzibar, smiling on the beach in Zanzibar"
              fill
              sizes="(max-width: 1024px) 85vw, 40vw"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Kicker tone="brand">{founder.kicker}</Kicker>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.2vw,2.9rem)] font-extrabold leading-[1.05] text-charcoal">
              {founder.name}
              <span className="font-hand ml-3 text-[0.75em] font-normal text-brand">
                {founder.role}
              </span>
            </h2>
            <p className="mt-1.5 text-sm font-medium text-charcoal-soft">
              {founder.fullName}
            </p>
          </Reveal>

          <Reveal delay={60}>
            <div className="mt-3 flex flex-wrap gap-2">
              {founder.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-charcoal-soft"
                >
                  {badge}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-7 space-y-4">
              {founder.body.map((p) => (
                <p key={p} className="text-lg leading-relaxed text-charcoal-soft">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
