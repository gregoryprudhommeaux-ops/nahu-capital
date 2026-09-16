export const locales = ["es", "en", "fr", "pt", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  fr: "Français",
  pt: "Português",
  zh: "中文",
};

export const htmlLang: Record<Locale, string> = {
  es: "es-MX",
  en: "en",
  fr: "fr",
  pt: "pt-PT",
  zh: "zh-CN",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function pathForLocale(locale: Locale, hash = "") {
  const base = locale === defaultLocale ? "/" : `/${locale}`;
  return hash ? `${base}#${hash}` : base;
}
