import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { SITE } from "@/lib/seed";
import { localePath } from "@/lib/i18n";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: Props) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-ink text-white/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <div>
              <p className="font-display text-lg tracking-wide text-yellow">
                VOL-KS
              </p>
              <p className="text-[10px] font-semibold tracking-[0.28em] text-white/45 uppercase">
                Service
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            {SITE.location[locale]} · {SITE.phone}
          </p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <div className="flex flex-wrap gap-5 text-sm">
            <a
              href={localePath(locale, "#services")}
              className="transition hover:text-yellow"
            >
              {dict.nav.services}
            </a>
            <a
              href={localePath(locale, "#gallery")}
              className="transition hover:text-yellow"
            >
              {dict.nav.gallery}
            </a>
            <a
              href={localePath(locale, "#contact")}
              className="transition hover:text-yellow"
            >
              {dict.nav.contact}
            </a>
          </div>
          <p className="text-xs">
            © {year} {SITE.name}. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
