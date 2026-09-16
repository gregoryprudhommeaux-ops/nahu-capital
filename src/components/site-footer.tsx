import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { BrandLogo } from "./brand-logo";
import { LanguageSwitcher } from "./language-switcher";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteFooter({ locale, dict }: Props) {
  return (
    <footer className="border-t border-navy/10 bg-cream">
      <div className="wrap flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <BrandLogo className="brand-logo-footer h-10 w-auto md:h-11" />
        <p className="text-xs text-navy/40">{dict.footer.rights}</p>
        <LanguageSwitcher locale={locale} align="up" />
      </div>
    </footer>
  );
}
