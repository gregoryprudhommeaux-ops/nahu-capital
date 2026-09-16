"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { locales, pathForLocale } from "@/i18n/config";

export function PrefetchLocales() {
  const router = useRouter();

  useEffect(() => {
    for (const locale of locales) {
      router.prefetch(pathForLocale(locale));
    }
  }, [router]);

  return null;
}
