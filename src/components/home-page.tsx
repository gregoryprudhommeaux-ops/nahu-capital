import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function HomePage({ locale, dict }: Props) {
  return (
    <>
      <SiteHeader locale={locale} dict={dict} />
      <main>
        <Hero dict={dict} />
        <Thesis dict={dict} />
        <About dict={dict} />
        <Team dict={dict} />
        <Portfolio dict={dict} />
        <Contact dict={dict} />
      </main>
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}

function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="inicio"
      className="mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-4xl flex-col items-center justify-center px-5 py-20 text-center md:px-8"
    >
      <p className="kicker mb-10">{dict.hero.kicker}</p>
      <Image
        src="/brand/logo-stacked.png"
        alt="NAHU Capital"
        width={854}
        height={582}
        className="mb-12 h-auto w-[220px] md:w-[280px]"
        priority
      />
      <h1 className="max-w-3xl font-serif text-[1.85rem] leading-snug text-navy md:text-[2.65rem] md:leading-[1.25]">
        {dict.hero.title}
      </h1>
      <p className="mt-8 max-w-2xl text-[0.95rem] leading-relaxed text-navy/70 md:text-base md:leading-[1.8]">
        {dict.hero.lead}
      </p>

      <div className="mt-16 grid w-full gap-10 border-t border-navy/10 pt-12 text-left sm:grid-cols-3 sm:gap-8">
        {dict.pillars.map((pillar) => (
          <div key={pillar.label}>
            <p className="kicker mb-3">{pillar.label}</p>
            <p className="text-sm leading-relaxed text-navy/75">{pillar.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Thesis({ dict }: { dict: Dictionary }) {
  return (
    <section id="tesis" className="border-t border-navy/8">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <p className="kicker mb-5">{dict.thesis.kicker}</p>
        <h2 className="max-w-3xl font-serif text-3xl leading-snug text-navy md:text-4xl">
          {dict.thesis.title}
        </h2>
        <p className="mt-8 max-w-3xl text-[0.95rem] leading-relaxed text-navy/70 md:leading-[1.85]">
          {dict.thesis.intro}
        </p>

        <blockquote className="mt-14 max-w-3xl border-l border-gold pl-6 md:pl-8">
          <p className="kicker mb-3">{dict.thesis.principleLabel}</p>
          <p className="font-serif text-xl leading-snug text-navy md:text-2xl">
            {dict.thesis.principle}
          </p>
        </blockquote>

        <ol className="mt-20 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {dict.thesis.capabilities.map((item) => (
            <li key={item.num} className="flex gap-5">
              <span className="mt-0.5 font-serif text-sm text-gold">{item.num}</span>
              <div>
                <h3 className="font-serif text-xl text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/65">
                  {item.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="nosotros" className="border-t border-navy/8">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <p className="kicker mb-5">{dict.about.kicker}</p>
        <h2 className="font-serif text-3xl text-navy md:text-4xl">
          {dict.about.title}
        </h2>
        <p className="mt-3 max-w-xl font-serif text-lg text-navy/60 md:text-xl">
          {dict.about.subtitle}
        </p>
        <p className="mt-8 max-w-3xl text-[0.95rem] leading-relaxed text-navy/70 md:leading-[1.85]">
          {dict.about.body}
        </p>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-y border-navy/8 py-12 md:grid-cols-3">
          {dict.about.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <p className="font-serif text-3xl text-navy md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-[0.65rem] font-medium tracking-[0.2em] text-gold uppercase">
                  {stat.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-navy/55">
                  {stat.detail}
                </p>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-xs leading-relaxed text-navy/40">
          {dict.about.disclaimer}
        </p>

        <h3 className="mt-20 font-serif text-2xl text-navy">
          {dict.about.differentialTitle}
        </h3>
        <p className="mt-4 max-w-3xl text-[0.95rem] leading-relaxed text-navy/70 md:leading-[1.85]">
          {dict.about.differential}
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {dict.about.axes.map((axis) => (
            <div key={axis.title} className="border-t border-gold/50 pt-5">
              <h4 className="font-serif text-lg text-navy">{axis.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-navy/65">
                {axis.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team({ dict }: { dict: Dictionary }) {
  return (
    <section id="equipo" className="border-t border-navy/8">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <p className="kicker mb-5">{dict.team.kicker}</p>
        <h2 className="max-w-2xl font-serif text-3xl leading-snug text-navy md:text-4xl">
          {dict.team.title}
        </h2>
        <p className="mt-8 max-w-3xl text-[0.95rem] leading-relaxed text-navy/70 md:leading-[1.85]">
          {dict.team.body}
        </p>
        <p className="mt-4 max-w-3xl text-sm text-navy/45">{dict.team.note}</p>

        <div className="mt-16 max-w-md border border-navy/10 bg-cream px-8 py-10">
          <p className="kicker mb-6">{dict.team.contactLabel}</p>
          <p className="font-serif text-2xl text-navy">{dict.team.person.name}</p>
          <p className="mt-2 text-sm text-navy/55">{dict.team.person.role}</p>
          <p className="mt-1 text-sm text-gold">{dict.team.person.location}</p>
        </div>
      </div>
    </section>
  );
}

function Portfolio({ dict }: { dict: Dictionary }) {
  return (
    <section id="portafolio" className="border-t border-navy/8">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <p className="kicker mb-5">{dict.portfolio.kicker}</p>
        <h2 className="font-serif text-3xl text-navy md:text-4xl">
          {dict.portfolio.title}
        </h2>
        <p className="mt-3 font-serif text-lg text-navy/60 md:text-xl">
          {dict.portfolio.subtitle}
        </p>
        <p className="mt-6 max-w-3xl text-[0.95rem] leading-relaxed text-navy/70">
          {dict.portfolio.intro}
        </p>

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          <div>
            <h3 className="kicker mb-6">{dict.portfolio.sectorsTitle}</h3>
            <ul className="space-y-3">
              {dict.portfolio.sectors.map((sector) => (
                <li
                  key={sector}
                  className="border-b border-navy/8 pb-3 text-sm text-navy/80"
                >
                  {sector}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="kicker mb-3">{dict.portfolio.reachTitle}</h3>
            <p className="mb-8 text-sm text-navy/55">{dict.portfolio.reachIntro}</p>
            <ul className="space-y-8">
              {dict.portfolio.regions.map((region) => (
                <li key={region.name}>
                  <p className="font-serif text-xl text-navy">{region.name}</p>
                  <p className="mt-1 text-sm tracking-wide text-navy/60">
                    {region.places}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 max-w-3xl">
          <h3 className="kicker mb-4">{dict.portfolio.modelTitle}</h3>
          <p className="text-[0.95rem] leading-relaxed text-navy/70 md:leading-[1.85]">
            {dict.portfolio.model}
          </p>
        </div>
      </div>
    </section>
  );
}

function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section id="contacto" className="border-t border-navy/8">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <p className="kicker mb-5">{dict.contact.kicker}</p>
        <h2 className="font-serif text-3xl text-navy md:text-4xl">
          {dict.contact.title}
        </h2>

        <div className="mt-14 space-y-8">
          <p className="font-serif text-3xl text-navy md:text-4xl">
            {dict.contact.name}
          </p>
          <p>
            <a
              href={dict.contact.phoneHref}
              className="text-lg text-navy/80 transition-colors hover:text-gold"
            >
              {dict.contact.phone}
            </a>
          </p>
          <p>
            <a
              href={`mailto:${dict.contact.email}`}
              className="text-lg text-navy/80 transition-colors hover:text-gold"
            >
              {dict.contact.email}
            </a>
          </p>
          <p className="text-sm tracking-[0.2em] text-gold uppercase">
            {dict.contact.location}
          </p>
          <p className="pt-4">
            <a
              href={`mailto:${dict.contact.email}`}
              className="inline-flex items-center border border-navy px-8 py-3 text-[0.7rem] font-medium tracking-[0.22em] text-navy uppercase transition-colors hover:border-gold hover:text-gold"
            >
              {dict.contact.cta}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
