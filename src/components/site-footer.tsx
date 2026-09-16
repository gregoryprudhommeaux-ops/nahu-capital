import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { LanguageSwitcher } from "./language-switcher";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteFooter({ locale, dict }: Props) {
  return (
    <footer className="bg-navy text-cream">
      <div className="wrap flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-2xl tracking-wide text-cream">NAHU</p>
          <p className="mt-1 text-[0.65rem] tracking-[0.32em] text-gold uppercase">
            Capital
          </p>
        </div>

        <p className="text-sm text-cream/55">{dict.footer.group}</p>

        <div className="flex flex-col gap-3 md:items-end">
          <LanguageSwitcher locale={locale} align="up" tone="dark" />
          <p className="text-xs text-cream/35">{dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
