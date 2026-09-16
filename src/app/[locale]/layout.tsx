import type { Metadata } from "next";
import { Libre_Bodoni, Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { criticalCss } from "@/app/critical";
import { PrefetchLocales } from "@/components/prefetch-locales";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  defaultLocale,
  htmlLang,
  isLocale,
  locales,
  pathForLocale,
  type Locale,
} from "@/i18n/config";

const libreBodoni = Libre_Bodoni({
  subsets: ["latin", "latin-ext"],
  variable: "--font-libre-bodoni",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-montserrat",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const path = locale === defaultLocale ? "/" : `/${locale}`;

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: path,
      languages: {
        "es-MX": "/",
        es: "/",
        en: "/en",
        fr: "/fr",
        pt: "/pt",
        zh: "/zh",
        "x-default": "/",
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: path,
      siteName: "NAHU Capital",
      locale: htmlLang[locale],
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={htmlLang[locale]}
      className={`${libreBodoni.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
        {locales
          .filter((code) => code !== locale)
          .map((code) => (
            <link
              key={code}
              rel="prefetch"
              href={pathForLocale(code)}
              as="document"
            />
          ))}
        <link rel="preload" as="image" href="/editorial/hero-cdmx.jpg" />
      </head>
      <body
        className={`min-h-full bg-cream text-navy ${locale === "zh" ? "is-zh" : ""}`}
        style={{ background: "#F3F0EA", color: "#101722" }}
      >
        <PrefetchLocales />
        {children}
      </body>
    </html>
  );
}
