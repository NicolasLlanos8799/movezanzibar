"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";

export function WhoWeAre() {
  const { t } = useLanguage();
  const who = t.who;

  return (
    <section id="who-we-are" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <Kicker tone="brand">{who.kicker}</Kicker>

          <h2 className="mt-5 font-display text-[clamp(1.9rem,4.2vw,2.9rem)] font-extrabold leading-[1.08] text-charcoal">
            {who.title}
          </h2>

          <div className="mt-6 space-y-4">
            {who.body.map((p) => (
              <p key={p} className="text-lg leading-relaxed text-charcoal-soft">
                {p}
              </p>
            ))}
          </div>

          <p className="mt-8 border-l-2 border-turquoise pl-5 font-display text-lg font-semibold italic leading-snug text-charcoal">
            {who.quote}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[2878/1198] w-full overflow-hidden rounded-3xl shadow-photo">
              <Image
                src="/images/who-we-are.JPEG"
                alt="Move Zanzibar acrobats forming a human pyramid handstand against the sky in Jambiani"
                title="Move Zanzibar acrobats forming a human pyramid handstand against the sky in Jambiani"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[2878/1221] w-full overflow-hidden rounded-3xl shadow-photo">
              <Image
                src="/images/girls-dancing-1.JPG"
                alt="Girls from the Move Zanzibar community dancing together"
                title="Girls from the Move Zanzibar community dancing together"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
