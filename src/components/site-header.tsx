"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  localeLabels,
  locales,
  pathForLocale,
  type Locale,
} from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const sections = [
  ["tesis", "thesis"],
  ["nosotros", "about"],
  ["equipo", "team"],
  ["portafolio", "portfolio"],
  ["contacto", "contact"],
] as const;

export function SiteHeader({ locale, dict }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/8 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
        <Link
          href={pathForLocale(locale)}
          className="shrink-0"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/logo-horizontal.png"
            alt="NAHU Capital"
            width={784}
            height={172}
            className="h-8 w-auto md:h-9"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {sections.map(([id, key]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-[0.7rem] font-medium tracking-[0.18em] uppercase text-navy/70 transition-colors hover:text-navy"
            >
              {dict.nav[key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ul className="hidden items-center gap-2.5 sm:flex" aria-label="Idioma">
            {locales.map((code) => (
              <li key={code}>
                <Link
                  href={pathForLocale(code)}
                  hrefLang={code}
                  className={`text-[0.65rem] tracking-[0.16em] transition-colors ${
                    code === locale
                      ? "font-semibold text-gold"
                      : "text-navy/45 hover:text-navy"
                  }`}
                >
                  {localeLabels[code]}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex w-5 flex-col gap-1.5">
              <span
                className={`block h-px bg-navy transition ${open ? "translate-y-[4px] rotate-45" : ""}`}
              />
              <span className={`block h-px bg-navy ${open ? "opacity-0" : ""}`} />
              <span
                className={`block h-px bg-navy transition ${open ? "-translate-y-[8px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-navy/8 px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-4">
            {sections.map(([id, key]) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-sm tracking-[0.12em] uppercase text-navy"
                onClick={() => setOpen(false)}
              >
                {dict.nav[key]}
              </a>
            ))}
          </nav>
          <ul className="mt-6 flex flex-wrap gap-4 sm:hidden" aria-label="Idioma">
            {locales.map((code) => (
              <li key={code}>
                <Link
                  href={pathForLocale(code)}
                  className={`text-xs tracking-[0.16em] ${
                    code === locale ? "text-gold" : "text-navy/50"
                  }`}
                >
                  {localeLabels[code]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
