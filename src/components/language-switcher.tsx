"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { localeNames, locales, pathForLocale, type Locale } from "@/i18n/config";
import { Flag } from "./flag";

type Props = {
  locale: Locale;
  align?: "down" | "up";
};

export function LanguageSwitcher({ locale, align = "down" }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="flex h-9 items-center gap-1.5 px-1"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={localeNames[locale]}
        onClick={() => setOpen((value) => !value)}
      >
        <Flag locale={locale} title={localeNames[locale]} />
        <span
          className={`text-[0.6rem] text-navy/40 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ▾
        </span>
      </button>

      {open ? (
        <ul
          role="listbox"
          className={`absolute right-0 z-50 min-w-[11.5rem] border border-navy/10 bg-cream py-1.5 shadow-[0_12px_32px_rgba(16,23,34,0.08)] ${
            align === "up" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {locales.map((code) => (
            <li key={code} role="option" aria-selected={code === locale}>
              <Link
                href={pathForLocale(code)}
                hrefLang={code}
                className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors hover:bg-navy/5 ${
                  code === locale ? "text-navy" : "text-navy/70"
                }`}
                onClick={() => setOpen(false)}
              >
                <Flag locale={code} title={localeNames[code]} />
                <span>{localeNames[code]}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
