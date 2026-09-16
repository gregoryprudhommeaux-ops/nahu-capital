import { locales } from "@/i18n/config";

export default function sitemap() {
  const base = "https://nahucapital.com";
  return [
    {
      url: base,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [
            locale === "es" ? "es-MX" : locale,
            locale === "es" ? base : `${base}/${locale}`,
          ]),
        ),
      },
    },
    ...locales
      .filter((locale) => locale !== "es")
      .map((locale) => ({
        url: `${base}/${locale}`,
        lastModified: new Date(),
      })),
  ];
}
