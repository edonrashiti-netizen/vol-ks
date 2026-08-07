"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import type { GalleryItem, Locale } from "@/lib/types";
import { Reveal } from "@/components/Reveal";

type Props = {
  locale: Locale;
  dict: Dictionary;
  gallery: GalleryItem[];
};

export function Gallery({ locale, dict, gallery }: Props) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="gallery" className="surface-mist py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-blue uppercase">
              VOL-KS
            </p>
            <h2 className="font-display mt-4 text-4xl leading-none text-navy md:text-5xl lg:text-[3.5rem]">
              {dict.gallery.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-navy/70 md:text-lg">
              {dict.gallery.lead}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {gallery.map((item, i) => (
            <Reveal key={item.id} delayMs={Math.min(i * 50, 250)}>
              <button
                type="button"
                onClick={() => setActive(item)}
                className="group relative aspect-square w-full overflow-hidden bg-navy/10 text-left"
              >
                <Image
                  src={item.src}
                  alt={item.alt[locale]}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  unoptimized={item.src.startsWith("http")}
                />
                <span className="absolute inset-0 bg-navy/0 transition duration-500 group-hover:bg-navy/35" />
                <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-sm text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.alt[locale]}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm md:p-10"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.alt[locale]}
        >
          <button
            type="button"
            className="absolute top-5 right-5 border border-white/25 px-3 py-2 text-xs tracking-[0.2em] text-white uppercase transition hover:border-yellow hover:text-yellow"
            onClick={() => setActive(null)}
          >
            Esc
          </button>
          <div
            className="relative aspect-square w-full max-w-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt[locale]}
              fill
              className="object-contain"
              sizes="90vw"
              unoptimized={active.src.startsWith("http")}
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
