import Link from "next/link";
import { localeNames, locales, pathForLocale, type Locale } from "@/i18n/config";
import { Flag } from "./flag";

type Props = {
  locale: Locale;
  align?: "down" | "up";
};

export function LanguageSwitcher({ locale, align = "down" }: Props) {
  return (
    <details className="lang-switcher group relative z-[60]">
      <summary
        className="flex cursor-pointer items-center gap-1 rounded-sm py-1 pr-0.5 opacity-55 transition-opacity hover:opacity-100"
        aria-label={localeNames[locale]}
      >
        <Flag locale={locale} title={localeNames[locale]} size="sm" />
        <span className="text-[0.5rem] leading-none text-navy/45" aria-hidden>
          ▾
        </span>
      </summary>

      <ul
        className={`absolute right-0 z-[60] min-w-[10.5rem] border border-navy/10 bg-cream py-1 shadow-[0_10px_28px_rgba(16,23,34,0.1)] ${
          align === "up" ? "bottom-full mb-1.5" : "top-full mt-1.5"
        }`}
      >
        {locales.map((code) => (
          <li key={code}>
            <Link
              href={pathForLocale(code)}
              hrefLang={code}
              className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[0.8rem] transition-colors hover:bg-navy/5 ${
                code === locale ? "text-navy" : "text-navy/60"
              }`}
            >
              <Flag locale={code} title={localeNames[code]} size="sm" />
              <span>{localeNames[code]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
