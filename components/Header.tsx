"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { localePath, switchLocalePath } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { SITE } from "@/lib/seed";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const other = locale === "sq" ? "EN" : "SQ";

  const links = [
    { href: "#home", label: dict.nav.home },
    { href: "#about", label: dict.nav.about },
    { href: "#services", label: dict.nav.services },
    { href: "#gallery", label: dict.nav.gallery },
    { href: "#contact", label: dict.nav.contact },
  ] as const;

  useEffect(() => {
    const ids = ["home", "about", "services", "gallery", "contact"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy text-white shadow-[0_8px_30px_rgb(7_22_40/0.35)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:px-8 md:py-4">
        <a
          href={localePath(locale, "#home")}
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/logo.png"
            alt="VOL-KS Service"
            width={48}
            height={48}
            className="h-10 w-10 object-contain transition duration-300 group-hover:scale-[1.03] md:h-11 md:w-11"
            priority
          />
          <span className="leading-none">
            <span className="font-display block text-lg tracking-[0.04em] text-yellow md:text-xl">
              VOL-KS
            </span>
            <span className="mt-0.5 block text-[10px] font-semibold tracking-[0.28em] text-white/70 uppercase">
              Service
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={localePath(locale, link.href)}
                className={`relative px-3.5 py-2 text-base font-medium tracking-[0.02em] transition ${
                  isActive ? "text-yellow" : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left bg-yellow transition duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
          <Link
            href={switchLocalePath(locale)}
            className="ml-2 border border-white/25 px-3 py-2 text-sm font-semibold tracking-[0.18em] text-white/90 transition hover:border-yellow hover:text-yellow"
            aria-label={`Switch to ${other}`}
          >
            {other}
          </Link>
          <a
            href={SITE.phoneHref}
            className="ml-2 bg-yellow px-5 py-2.5 text-base font-semibold tracking-wide text-navy transition hover:bg-white"
          >
            {dict.nav.call}
          </a>
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href={switchLocalePath(locale)}
            className="border border-white/25 px-3 py-2 text-sm font-semibold tracking-[0.18em]"
          >
            {other}
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative flex h-11 w-11 items-center justify-center border border-white/25"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`absolute h-0.5 w-5 bg-white transition duration-300 ${
                open ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-white transition duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-white transition duration-300 ${
                open ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 bg-navy transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-5 py-5">
          {links.map((link) => (
            <a
              key={link.href}
              href={localePath(locale, link.href)}
              onClick={() => setOpen(false)}
              className={`py-3 text-lg tracking-wide ${
                active === link.href ? "text-yellow" : "text-white/88"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={SITE.phoneHref}
            className="mt-3 bg-yellow px-4 py-3.5 text-center text-base font-semibold tracking-wide text-navy"
          >
            {dict.nav.call}
          </a>
        </div>
      </div>
    </header>
  );
}
