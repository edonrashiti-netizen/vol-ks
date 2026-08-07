import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { SITE } from "@/lib/seed";
import { Reveal } from "@/components/Reveal";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Contact({ locale, dict }: Props) {
  return (
    <section id="contact" className="relative overflow-hidden bg-blue py-24 text-white md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_0%_0%,rgb(255_204_0/0.12),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-yellow/85 uppercase">
              VOL-KS
            </p>
            <h2 className="font-display mt-4 text-4xl leading-none text-yellow md:text-5xl lg:text-[3.5rem]">
              {dict.contact.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/72 md:text-lg">
              {dict.contact.lead}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <dl className="space-y-9">
              <div>
                <dt className="text-[11px] font-semibold tracking-[0.24em] text-yellow uppercase">
                  {dict.contact.phone}
                </dt>
                <dd className="mt-3">
                  <a
                    href={SITE.phoneHref}
                    className="font-display text-3xl tracking-wide transition hover:text-yellow md:text-4xl"
                  >
                    {SITE.phone}
                  </a>
                </dd>
              </div>
              <div className="grid gap-9 sm:grid-cols-2">
                <div>
                  <dt className="text-[11px] font-semibold tracking-[0.24em] text-yellow uppercase">
                    {dict.contact.hours}
                  </dt>
                  <dd className="mt-3 text-base leading-relaxed text-white/88">
                    {SITE.hours[locale]}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold tracking-[0.24em] text-yellow uppercase">
                    {dict.contact.location}
                  </dt>
                  <dd className="mt-3 text-base leading-relaxed text-white/88">
                    {SITE.location[locale]}
                  </dd>
                </div>
              </div>
              <div>
                <dt className="text-[11px] font-semibold tracking-[0.24em] text-yellow uppercase">
                  {dict.contact.social}
                </dt>
                <dd className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={SITE.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/25 px-5 py-2.5 text-sm tracking-wide transition hover:border-yellow hover:text-yellow"
                  >
                    Facebook
                  </a>
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/25 px-5 py-2.5 text-sm tracking-wide transition hover:border-yellow hover:text-yellow"
                  >
                    Instagram
                  </a>
                  <a
                    href={SITE.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/25 px-5 py-2.5 text-sm tracking-wide transition hover:border-yellow hover:text-yellow"
                  >
                    Google Maps
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delayMs={120}>
            <div className="overflow-hidden border border-white/10 bg-navy/25 shadow-[0_24px_80px_rgb(7_22_40/0.35)]">
              <iframe
                title={dict.contact.map}
                src={SITE.mapsEmbed}
                className="h-[340px] w-full grayscale-[20%] contrast-[1.05] md:h-[420px]"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
