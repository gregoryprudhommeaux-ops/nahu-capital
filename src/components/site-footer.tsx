import Image from "next/image";
import { type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { LanguageSwitcher } from "./language-switcher";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteFooter({ locale, dict }: Props) {
  return (
    <footer className="border-t border-navy/8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-12 md:flex-row md:items-center md:px-8">
        <div className="flex items-center gap-4">
          <Image
            src="/brand/logo-monogram.png"
            alt=""
            width={339}
            height={325}
            className="h-10 w-auto"
          />
          <div>
            <p className="font-serif text-lg tracking-wide text-navy">NAHU</p>
            <p className="text-[0.65rem] tracking-[0.35em] text-gold uppercase">
              Capital
            </p>
          </div>
        </div>

        <p className="text-sm text-navy/55">{dict.footer.group}</p>

        <div className="flex flex-col items-start gap-3 md:items-end">
          <LanguageSwitcher locale={locale} align="up" />
          <p className="text-xs text-navy/40">{dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
