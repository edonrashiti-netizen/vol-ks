import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { Reveal } from "@/components/Reveal";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function About({ locale, dict }: Props) {
  return (
    <section id="about" className="surface-mist relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-12 md:gap-16 md:px-8">
        <Reveal className="md:col-span-5">
          <div className="relative">
            <div className="absolute -inset-3 translate-x-3 translate-y-3 border border-blue/20 md:-inset-4 md:translate-x-4 md:translate-y-4" />
            <div className="relative aspect-[4/5] overflow-hidden bg-navy">
              <Image
                src="/gallery/1.png"
                alt={dict.about.lead}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
            </div>
          </div>
        </Reveal>

        <div className="md:col-span-7">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-blue uppercase">
              VOL-KS Service
            </p>
            <h2 className="font-display mt-4 text-4xl leading-none text-navy md:text-5xl lg:text-[3.5rem]">
              {dict.about.title}
            </h2>
            <div className="mt-5 h-0.5 w-14 bg-yellow" />
          </Reveal>

          <Reveal delayMs={120}>
            <p className="font-display mt-8 text-2xl leading-snug text-blue md:text-[1.85rem] md:leading-snug">
              {dict.about.lead}
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-navy/75 md:text-lg md:leading-relaxed">
              {dict.about.body}
            </p>
          </Reveal>

          <Reveal delayMs={200}>
            <p className="mt-10 text-sm tracking-[0.12em] text-steel uppercase">
              {locale === "sq"
                ? "Specializuar vetëm për Volvo"
                : "Specialized for Volvo only"}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
