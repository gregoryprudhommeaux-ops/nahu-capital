import type { Metadata } from "next";
import { Libre_Bodoni, Montserrat } from "next/font/google";
import { getDictionary } from "@/lib/copy";
import "./globals.css";

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

const es = getDictionary("es");

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nahucapital.com"),
  title: es.meta.title,
  description: es.meta.description,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
  alternates: {
    canonical: "/",
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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-MX"
      className={`${libreBodoni.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body
        className="min-h-full bg-cream text-navy"
        style={{ background: "#F3F0EA", color: "#101722" }}
      >
        {children}
      </body>
    </html>
  );
}
