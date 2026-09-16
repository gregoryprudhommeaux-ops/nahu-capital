"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { pathForLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { LanguageSwitcher } from "./language-switcher";

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
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm">
      <div className="wrap flex items-center justify-between gap-4 py-5">
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
            className="h-9 w-auto md:h-10"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {sections.map(([id, key]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-[0.95rem] font-medium text-navy/80 transition-colors hover:text-navy"
            >
              {dict.nav[key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            className="relative flex h-11 w-11 shrink-0 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute top-0 left-0 block h-0.5 w-5 bg-navy transition-transform ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute top-[5px] left-0 block h-0.5 w-5 bg-navy transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute top-[10px] left-0 block h-0.5 w-5 bg-navy transition-transform ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-navy/10 bg-cream lg:hidden"
      >
        <nav className="wrap flex flex-col gap-5 py-8">
          {sections.map(([id, key]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-lg text-navy"
              onClick={() => setOpen(false)}
            >
              {dict.nav[key]}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
