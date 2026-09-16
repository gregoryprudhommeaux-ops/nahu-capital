import { locales } from "@/lib/copy";

export default function sitemap() {
  const base = "https://nahu-capital.vercel.app";
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
