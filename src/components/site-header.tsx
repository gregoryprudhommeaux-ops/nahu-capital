"use client";

import Link from "next/link";
import { useState } from "react";
import { pathForLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { BrandLogo } from "./brand-logo";
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
    <header className="sticky top-0 z-50 overflow-visible bg-cream">
      <div className="wrap flex items-center justify-between gap-4 overflow-visible py-3.5">
        <Link
          href={pathForLocale(locale)}
          className="shrink-0"
          onClick={() => setOpen(false)}
        >
          <BrandLogo className="brand-logo h-8 w-auto md:h-9" />
        </Link>

        <nav className="site-nav hidden items-center gap-9 lg:flex">
          {sections.map(([id, key]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-[0.88rem] font-medium text-navy/80 transition-colors hover:text-navy"
            >
              {dict.nav[key]}
            </a>
          ))}
        </nav>

        <div className="relative z-[60] flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            className="menu-toggle relative flex h-11 w-11 shrink-0 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Menu"
            onClick={() => setOpen((value) => !value)}
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

      {open ? (
        <div id="mobile-nav" className="border-t border-navy/10 bg-cream lg:hidden">
          <nav className="wrap flex w-full flex-col py-2">
            {sections.map(([id, key]) => (
              <a
                key={id}
                href={`#${id}`}
                className="py-3.5 text-lg text-navy"
                onClick={() => setOpen(false)}
              >
                {dict.nav[key]}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
