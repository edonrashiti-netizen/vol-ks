import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { SITE } from "@/lib/seed";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Hero({ locale, dict }: Props) {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-white"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/brand/hero-volvo.jpg"
          alt=""
          fill
          priority
          className="hero-media object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(7_22_40/0.88)_0%,rgb(7_22_40/0.62)_40%,rgb(11_37_77/0.35)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(7_22_40/0.75)_0%,transparent_45%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-end px-5 pb-16 pt-36 md:px-8 md:pb-24 md:pt-44">
        <div className="max-w-3xl">
          <Image
            src="/brand/logo.png"
            alt="VOL-KS Service"
            width={160}
            height={160}
            className="animate-fade-up h-28 w-28 object-contain drop-shadow-[0_12px_40px_rgb(0_0_0/0.45)] md:h-36 md:w-36"
            priority
          />

          <div className="accent-line mt-8 h-0.5 w-16 bg-yellow md:mt-10" />

          <h1 className="font-display animate-fade-up delay-1 mt-7 max-w-[14ch] text-[2.35rem] leading-[1.08] tracking-wide text-white sm:text-5xl md:mt-8 md:text-6xl lg:text-[4.25rem]">
            {dict.hero.headline}
          </h1>

          <p className="animate-fade-up delay-2 mt-5 max-w-xl text-base leading-relaxed text-white/82 md:text-xl md:leading-relaxed">
            {dict.hero.sub}
          </p>

          <div className="animate-fade-up delay-3 mt-9 flex flex-wrap items-center gap-3 md:gap-4">
            <a
              href={SITE.phoneHref}
              className="inline-flex min-w-[10.5rem] items-center justify-center bg-yellow px-6 py-3.5 text-sm font-semibold tracking-wide text-navy transition duration-300 hover:bg-white"
            >
              {dict.hero.ctaCall}
            </a>
            <a
              href={localePath(locale, "#contact")}
              className="inline-flex min-w-[10.5rem] items-center justify-center border border-white/35 px-6 py-3.5 text-sm font-medium tracking-wide text-white transition duration-300 hover:border-yellow hover:text-yellow"
            >
              {dict.hero.ctaContact}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
