import { notFound, redirect } from "next/navigation";
import { Site } from "@/components/site";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  locales,
} from "@/lib/copy";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.filter((locale) => locale !== defaultLocale).map((locale) => ({
    locale,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (locale === defaultLocale) redirect("/");
  return <Site locale={locale} dict={getDictionary(locale)} />;
}
