import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { LanguageSwitcher } from "./language-switcher";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteFooter({ locale, dict }: Props) {
  return (
    <footer className="border-t border-navy/10 bg-cream">
      <div className="wrap flex flex-col gap-10 py-12 md:flex-row md:items-center md:justify-between">
        <Image
          src="/brand/logo-horizontal.png"
          alt="NAHU Capital"
          width={816}
          height={204}
          className="h-12 w-auto md:h-14"
        />

        <p className="text-sm text-navy/50">{dict.footer.group}</p>

        <div className="flex flex-col gap-3 md:items-end">
          <LanguageSwitcher locale={locale} align="up" />
          <p className="text-xs text-navy/40">{dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
