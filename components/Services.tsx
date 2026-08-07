import type { Dictionary } from "@/lib/i18n";
import type { Locale, ServiceItem } from "@/lib/types";
import { Reveal } from "@/components/Reveal";

type Props = {
  locale: Locale;
  dict: Dictionary;
  services: ServiceItem[];
};

export function Services({ locale, dict, services }: Props) {
  return (
    <section id="services" className="surface-navy py-24 text-white md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-yellow/80 uppercase">
              Volvo
            </p>
            <h2 className="font-display mt-4 text-4xl leading-none text-yellow md:text-5xl lg:text-[3.5rem]">
              {dict.services.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              {dict.services.lead}
            </p>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
          {services.map((service, index) => (
            <Reveal key={service.id} delayMs={Math.min(index * 60, 300)}>
              <li className="group border-t border-white/12 py-7 transition duration-300 hover:border-yellow/50">
                <span className="font-display text-sm tracking-[0.12em] text-yellow/80 transition group-hover:text-yellow">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-3 text-[1.45rem] leading-tight tracking-wide text-white md:text-[1.6rem]">
                  {service.title[locale]}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/62 transition group-hover:text-white/80">
                  {service.description[locale]}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
