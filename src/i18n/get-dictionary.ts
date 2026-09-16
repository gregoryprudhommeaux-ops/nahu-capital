import type { Locale } from "./config";
import es from "./dictionaries/es.json";
import en from "./dictionaries/en.json";
import fr from "./dictionaries/fr.json";
import pt from "./dictionaries/pt.json";
import zh from "./dictionaries/zh.json";

export type Dictionary = typeof es;

const dictionaries: Record<Locale, Dictionary> = {
  es,
  en,
  fr,
  pt,
  zh,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
