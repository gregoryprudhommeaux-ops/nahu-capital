import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nahucapital.com"),
  title: "NAHU Capital",
  description:
    "Plataforma empresarial franco-mexicana. Capital, estrategia y ejecución a través de fronteras.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
