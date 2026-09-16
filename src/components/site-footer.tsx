import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { BrandLogo } from "./brand-logo";
import { LanguageSwitcher } from "./language-switcher";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z"
      />
    </svg>
  );
}

export function SiteFooter({ locale, dict }: Props) {
  return (
    <footer className="border-t border-navy/10 bg-cream">
      <div className="wrap flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <BrandLogo className="brand-logo-footer h-10 w-auto md:h-11" />
        <p className="text-xs text-navy/40">{dict.footer.rights}</p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/company/nahucapital"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${dict.team.linkedinLabel}, NAHU Capital`}
            className="text-navy/40 transition-colors hover:text-gold"
          >
            <LinkedInIcon />
          </a>
          <LanguageSwitcher locale={locale} align="up" />
        </div>
      </div>
    </footer>
  );
}
