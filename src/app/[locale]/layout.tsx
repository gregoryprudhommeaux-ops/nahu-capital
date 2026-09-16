import type { Metadata } from "next";
import { Libre_Bodoni, Montserrat, Noto_Sans_SC } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  defaultLocale,
  htmlLang,
  isLocale,
  locales,
  type Locale,
} from "@/i18n/config";

const libreBodoni = Libre_Bodoni({
  subsets: ["latin", "latin-ext"],
  variable: "--font-libre-bodoni",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

const notoSans = Noto_Sans_SC({
  weight: ["300", "400", "500"],
  variable: "--font-noto-sans",
  display: "swap",
  preload: false,
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
  const dict = await getDictionary(locale);
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
      className={`${libreBodoni.variable} ${montserrat.variable} ${notoSans.variable} h-full antialiased`}
    >
      <body
        className={`min-h-full bg-cream text-navy ${locale === "zh" ? "is-zh" : ""}`}
      >
        {children}
      </body>
    </html>
  );
}
