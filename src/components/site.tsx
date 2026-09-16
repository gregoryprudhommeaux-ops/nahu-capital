"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  htmlLang,
  localeNames,
  locales,
  pathForLocale,
  type Dictionary,
  type Locale,
} from "@/lib/copy";
import { ContactPanel } from "./contact-panel";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const sections = [
  ["tesis", "thesis"],
  ["nosotros", "about"],
  ["equipo", "team"],
  ["portafolio", "portfolio"],
  ["contacto", "contact"],
] as const;

const teamPhotos: Record<string, { photo: string; linkedin: string }> = {
  juan: {
    photo: "/team/juan.jpg",
    linkedin: "https://www.linkedin.com/in/juan-balbontin-a95b717/",
  },
  ana: {
    photo: "/team/ana.jpg",
    linkedin: "https://www.linkedin.com/in/anaalmeidalu/",
  },
  patrick: {
    photo: "/team/patrick.jpg",
    linkedin: "https://www.linkedin.com/in/patrickdiogo/",
  },
  gregory: {
    photo: "/team/gregory.jpg",
    linkedin: "https://www.linkedin.com/in/gregoryprudhommeaux/",
  },
};

export function Site({ locale, dict }: Props) {
  useEffect(() => {
    document.documentElement.lang = htmlLang[locale];
    document.body.classList.toggle("is-zh", locale === "zh");
  }, [locale]);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main>
        <Hero dict={dict} />
        <Principle dict={dict} />
        <Projects dict={dict} />
        <Thesis dict={dict} />
        <About dict={dict} />
        <Team dict={dict} />
        <Portfolio dict={dict} />
        <Contact dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}

function BrandLogo({ className }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="NAHU Capital"
      width={390}
      height={83}
      className={className}
      draggable={false}
    />
  );
}

function Header({ locale, dict }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 overflow-visible bg-cream">
      <div className="wrap flex items-center justify-between gap-4 overflow-visible py-3.5">
        <Link
          href={pathForLocale(locale)}
          className="shrink-0"
          onClick={() => setOpen(false)}
        >
          <BrandLogo className="brand-logo h-8 w-auto md:h-9" />
        </Link>
        <nav className="site-nav hidden items-center gap-9 lg:flex">
          {sections.map(([id, key]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-[0.88rem] font-medium text-navy/80 transition-colors hover:text-navy"
            >
              {dict.nav[key]}
            </a>
          ))}
        </nav>
        <div className="relative z-[60] flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <button
            type="button"
            className="menu-toggle relative flex h-11 w-11 shrink-0 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute top-0 left-0 block h-0.5 w-5 bg-navy transition-transform ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute top-[5px] left-0 block h-0.5 w-5 bg-navy transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute top-[10px] left-0 block h-0.5 w-5 bg-navy transition-transform ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <div id="mobile-nav" className="border-t border-navy/10 bg-cream lg:hidden">
          <nav className="wrap flex w-full flex-col py-2">
            {sections.map(([id, key]) => (
              <a
                key={id}
                href={`#${id}`}
                className="py-3.5 text-lg text-navy"
                onClick={() => setOpen(false)}
              >
                {dict.nav[key]}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function LanguageSwitcher({
  locale,
  align = "down",
}: {
  locale: Locale;
  align?: "down" | "up";
}) {
  return (
    <details className="lang-switcher group relative z-[60]">
      <summary
        className="flex cursor-pointer items-center gap-1 rounded-sm py-1 pr-0.5 opacity-55 transition-opacity hover:opacity-100"
        aria-label={localeNames[locale]}
      >
        <Flag locale={locale} />
        <span className="text-[0.5rem] leading-none text-navy/45" aria-hidden>
          ▾
        </span>
      </summary>
      <ul
        className={`absolute right-0 z-[60] min-w-[10.5rem] border border-navy/10 bg-cream py-1 shadow-[0_10px_28px_rgba(16,23,34,0.1)] ${
          align === "up" ? "bottom-full mb-1.5" : "top-full mt-1.5"
        }`}
      >
        {locales.map((code) => (
          <li key={code}>
            <Link
              href={pathForLocale(code)}
              hrefLang={code}
              prefetch
              className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[0.8rem] transition-colors hover:bg-navy/5 ${
                code === locale ? "text-navy" : "text-navy/60"
              }`}
            >
              <Flag locale={code} />
              <span>{localeNames[code]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

function Flag({ locale }: { locale: Locale }) {
  return (
    <span
      className="inline-flex overflow-hidden rounded-[1px] ring-1 ring-navy/10"
      title={localeNames[locale]}
      style={{ width: 18, height: 12 }}
    >
      <svg viewBox="0 0 21 15" width={18} height={12} aria-hidden>
        {flagGraphic(locale)}
      </svg>
    </span>
  );
}

function flagGraphic(locale: Locale) {
  switch (locale) {
    case "es":
      return (
        <>
          <rect width="7" height="15" fill="#006847" />
          <rect x="7" width="7" height="15" fill="#fff" />
          <rect x="14" width="7" height="15" fill="#CE1126" />
        </>
      );
    case "en":
      return (
        <>
          <rect width="21" height="15" fill="#BF0A30" />
          <rect y="1.15" width="21" height="1.15" fill="#fff" />
          <rect y="3.46" width="21" height="1.15" fill="#fff" />
          <rect y="5.77" width="21" height="1.15" fill="#fff" />
          <rect y="8.08" width="21" height="1.15" fill="#fff" />
          <rect y="10.38" width="21" height="1.15" fill="#fff" />
          <rect y="12.69" width="21" height="1.15" fill="#fff" />
          <rect width="9.5" height="8.08" fill="#002868" />
        </>
      );
    case "fr":
      return (
        <>
          <rect width="7" height="15" fill="#002395" />
          <rect x="7" width="7" height="15" fill="#fff" />
          <rect x="14" width="7" height="15" fill="#ED2939" />
        </>
      );
    case "pt":
      return (
        <>
          <rect width="21" height="15" fill="#009B3A" />
          <polygon points="10.5,1.6 18.6,7.5 10.5,13.4 2.4,7.5" fill="#FEDD00" />
          <circle cx="10.5" cy="7.5" r="3.1" fill="#002776" />
        </>
      );
    case "zh":
      return (
        <>
          <rect width="21" height="15" fill="#DE2910" />
          <polygon
            points="4.2,3.2 4.9,5.3 7.1,5.3 5.3,6.6 6,8.7 4.2,7.4 2.4,8.7 3.1,6.6 1.3,5.3 3.5,5.3"
            fill="#FFDE00"
          />
        </>
      );
  }
}

function Frame({
  src,
  alt,
  caption,
  className,
  imageClassName,
  priority,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`editorial-frame ${className ?? ""}`}>
      <img
        src={src}
        alt={alt}
        fetchPriority={priority ? "high" : "low"}
        decoding="async"
        draggable={false}
        className={imageClassName}
      />
      {caption ? (
        <figcaption>
          <span>{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}

function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section id="inicio">
      <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch lg:min-h-[min(82svh,740px)]">
        <div className="wrap flex flex-col justify-between py-10 md:py-12 lg:w-auto lg:max-w-none lg:pr-10 lg:pl-[max(2.5rem,calc((100vw-1220px)/2))]">
          <div className="max-w-2xl">
            <p className="kicker mb-3.5 md:mb-4">{dict.hero.kicker}</p>
            <h1 className="max-w-[16.5em] font-serif text-[clamp(2.2rem,8.4vw,3.45rem)] leading-[1.2] tracking-[-0.018em] text-pretty text-navy md:leading-[1.14]">
              {dict.hero.title}
            </h1>
            <p className="mt-5 max-w-md text-[0.98rem] leading-[1.6] text-navy/65">
              {dict.hero.lead}
            </p>
          </div>
          <div className="mt-10 grid gap-6 border-t border-navy/10 pt-7 sm:grid-cols-3 sm:gap-8">
            {dict.pillars.map((pillar) => (
              <div key={pillar.label}>
                <p className="kicker mb-2">{pillar.label}</p>
                <p className="text-[0.88rem] leading-relaxed text-navy/65">
                  {pillar.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Frame
          src="/hero.jpg"
          alt={dict.media.heroAlt}
          caption={dict.media.heroCaption}
          className="h-[min(58vw,22rem)] w-full md:h-[28rem] lg:h-[min(82svh,740px)]"
          imageClassName="object-[center_40%]"
          priority
        />
      </div>
    </section>
  );
}

function Principle({ dict }: { dict: Dictionary }) {
  return (
    <section id="tesis" className="bg-navy">
      <div className="wrap py-14 md:py-16">
        <p className="kicker mb-6 text-gold">{dict.thesis.principleLabel}</p>
        <blockquote className="max-w-3xl font-serif text-[clamp(1.35rem,2.6vw,2.15rem)] leading-[1.28] text-cream">
          {dict.thesis.principle}
        </blockquote>
      </div>
    </section>
  );
}

function Projects({ dict }: { dict: Dictionary }) {
  const sites = [
    {
      src: "/shots/hospitality.jpg",
      alt: dict.media.hospitalityAlt,
      caption: dict.media.hospitalityCaption,
    },
    {
      src: "/shots/district-city.jpg",
      alt: dict.media.districtAlt,
      caption: dict.media.districtCaption,
    },
    {
      src: "/shots/datacenter.jpg",
      alt: dict.media.datacenterAlt,
      caption: dict.media.datacenterCaption,
    },
  ];

  return (
    <section aria-label={dict.media.projectsTitle}>
      <div className="wrap py-10 md:py-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="kicker mb-2">{dict.media.projectsKicker}</p>
            <h2 className="font-serif text-[clamp(1.45rem,2.2vw,2rem)] text-navy">
              {dict.media.projectsTitle}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-navy/50">
            {dict.media.projectsLead}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {sites.map((site) => (
            <Frame
              key={site.src}
              src={site.src}
              alt={site.alt}
              caption={site.caption}
              className="aspect-[4/3]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Thesis({ dict }: { dict: Dictionary }) {
  return (
    <section>
      <div className="wrap py-12 md:py-16">
        <div className="grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="kicker mb-3">{dict.thesis.kicker}</p>
            <h2 className="font-serif text-[clamp(1.55rem,2.4vw,2.35rem)] leading-[1.15] text-navy">
              {dict.thesis.title}
            </h2>
          </div>
          <p className="max-w-xl text-[0.98rem] leading-[1.7] text-navy/65">
            {dict.thesis.intro}
          </p>
        </div>
        <ul className="mt-10 grid gap-x-12 gap-y-8 border-t border-navy/10 pt-10 md:grid-cols-2">
          {dict.thesis.capabilities.map((item) => (
            <li key={item.num} className="border-b border-navy/8 pb-6">
              <p className="mb-1.5 font-serif text-sm text-gold">{item.num}</p>
              <h3 className="font-serif text-xl text-navy">{item.title}</h3>
              <p className="mt-2 max-w-md text-[0.9rem] leading-relaxed text-navy/60">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="nosotros" className="border-t border-navy/8">
      <div className="wrap py-12 md:py-16">
        <p className="kicker mb-3">{dict.about.kicker}</p>
        <h2 className="max-w-xl font-serif text-[clamp(1.55rem,2.4vw,2.35rem)] leading-[1.15] text-navy">
          {dict.about.title}
        </h2>
        <p className="mt-5 max-w-xl text-[0.98rem] leading-[1.7] text-navy/65">
          {dict.about.body}
        </p>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-navy/10 py-6 md:grid-cols-3 lg:grid-cols-6">
          {dict.about.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <p className="font-serif text-[clamp(1.45rem,2.2vw,1.95rem)] leading-none text-navy">
                  {stat.value}
                </p>
                <p className="mt-2 text-[0.62rem] font-medium tracking-[0.14em] text-gold uppercase">
                  {stat.label}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-navy/50">
                  {stat.detail}
                </p>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 max-w-2xl text-[0.68rem] leading-relaxed text-navy/38 italic">
          {dict.about.disclaimer}
        </p>
      </div>
    </section>
  );
}

function Team({ dict }: { dict: Dictionary }) {
  return (
    <section id="equipo" className="border-t border-navy/8">
      <div className="wrap py-12 pb-6 md:py-14 md:pb-7">
        <p className="kicker mb-3">{dict.team.kicker}</p>
        <h2 className="font-serif text-[clamp(1.55rem,2.4vw,2.35rem)] leading-[1.15] text-navy">
          {dict.team.title}
        </h2>
        <ul className="mt-8 grid border-y border-navy/10 md:grid-cols-2">
          {dict.team.people.map((person) => {
            const profile = teamPhotos[person.id];
            return (
              <li
                key={person.id}
                className="flex gap-4 border-b border-navy/8 py-5 last:border-b-0 md:border-navy/8 md:py-6 md:odd:pr-8 md:even:border-l md:even:pl-8 md:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <img
                  src={profile.photo}
                  alt={person.name}
                  width={112}
                  height={112}
                  draggable={false}
                  className="h-20 w-20 shrink-0 bg-navy object-cover md:h-28 md:w-28"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5">
                    <p className="min-w-0 font-serif text-[1.15rem] leading-tight text-navy md:text-xl">
                      {person.name}
                    </p>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${dict.team.linkedinLabel}, ${person.name}`}
                      className="shrink-0 text-gold hover:text-navy"
                    >
                      <LinkedInIcon />
                    </a>
                  </div>
                  <p className="kicker mt-2 mb-0 text-[0.62rem]">{person.role}</p>
                  <p className="mt-2.5 text-[0.88rem] leading-[1.65] text-navy/65">
                    {person.bio}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Portfolio({ dict }: { dict: Dictionary }) {
  return (
    <section id="portafolio" className="border-t border-navy/8">
      <div className="wrap pt-8 pb-12 md:pt-10 md:pb-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="kicker mb-3">{dict.portfolio.kicker}</p>
            <h2 className="font-serif text-[clamp(1.55rem,2.4vw,2.35rem)] leading-[1.15] text-navy">
              {dict.portfolio.title}
            </h2>
          </div>
          {dict.portfolio.intro ? (
            <p className="max-w-xl self-end text-[0.98rem] leading-[1.7] text-navy/65">
              {dict.portfolio.intro}
            </p>
          ) : null}
        </div>

        <details className="sectors-menu group mt-10">
          <summary className="flex w-full cursor-pointer items-center gap-3 border-b border-navy/10 py-3 text-left hover:border-gold">
            <span className="kicker mb-0">{dict.portfolio.sectorsTitle}</span>
            <span className="ml-auto font-serif text-lg leading-none text-navy/35">
              {dict.portfolio.sectors.length}
            </span>
          </summary>
          <ul className="grid border-b border-navy/10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
            {dict.portfolio.sectors.map((sector) => (
              <li
                key={sector}
                className="border-b border-navy/8 py-2.5 text-[0.92rem] text-navy/80"
              >
                {sector}
              </li>
            ))}
          </ul>
        </details>

        <div className="mt-10">
          <p className="kicker mb-2">{dict.portfolio.reachTitle}</p>
          <p className="max-w-xl text-sm leading-relaxed text-navy/50">
            {dict.portfolio.reachIntro}
          </p>
          <ul className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
            {dict.portfolio.regions.map((region) => (
              <li key={region.name}>
                <p className="font-serif text-[1.05rem] text-navy">{region.name}</p>
                <p className="mt-1 text-[0.8rem] leading-snug text-navy/50">
                  {region.places}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section id="contacto">
      <div className="grid lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-stretch">
        <ContactPanel dict={dict.contact} />
        <Frame
          src="/hero.jpg"
          alt={dict.media.contactAlt}
          caption={dict.media.heroCaption}
          className="h-[13.5rem] w-full md:h-[15.5rem] lg:h-[17.5rem]"
          imageClassName="object-[center_55%]"
        />
      </div>
    </section>
  );
}

function Footer({ locale, dict }: Props) {
  return (
    <footer className="border-t border-navy/10 bg-cream">
      <div className="wrap flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <BrandLogo className="brand-logo-footer h-10 w-auto md:h-11" />
        <p className="text-xs text-navy/40">{dict.footer.rights}</p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/company/nahucapital"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${dict.team.linkedinLabel}, NAHU Capital`}
            className="text-navy/40 hover:text-gold"
          >
            <LinkedInIcon />
          </a>
          <LanguageSwitcher locale={locale} align="up" />
        </div>
      </div>
    </footer>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z"
      />
    </svg>
  );
}
