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
        <Principle dict={dict} />
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
    <section id="inicio" className="flex min-h-[calc(100svh-5rem)] flex-col">
      <div className="wrap flex flex-1 flex-col justify-between py-16 md:py-24">
        <div className="max-w-5xl">
          <h1 className="font-serif text-[clamp(2.35rem,7.2vw,5.6rem)] leading-[0.96] text-navy">
            {dict.hero.title}
          </h1>
          <p className="mt-10 max-w-xl text-[1.05rem] leading-[1.75] text-navy/65 md:mt-12">
            {dict.hero.lead}
          </p>
        </div>

        <div className="mt-20 grid gap-10 border-t border-navy/10 pt-10 sm:grid-cols-3 sm:gap-12">
          {dict.pillars.map((pillar) => (
            <div key={pillar.label}>
              <p className="kicker mb-3">{pillar.label}</p>
              <p className="text-[0.95rem] leading-relaxed text-navy/70">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Principle({ dict }: { dict: Dictionary }) {
  return (
    <section id="tesis" className="bg-navy text-cream">
      <div className="wrap py-20 md:py-28">
        <p className="kicker mb-8">{dict.thesis.principleLabel}</p>
        <blockquote className="max-w-4xl font-serif text-[clamp(1.45rem,3.2vw,2.55rem)] leading-[1.25] text-cream">
          {dict.thesis.principle}
        </blockquote>
      </div>
    </section>
  );
}

function Thesis({ dict }: { dict: Dictionary }) {
  return (
    <section>
      <div className="wrap py-24 md:py-32">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="kicker mb-5">{dict.thesis.kicker}</p>
            <h2 className="font-serif text-[clamp(1.85rem,3.4vw,3rem)] leading-[1.15] text-navy">
              {dict.thesis.title}
            </h2>
          </div>
          <p className="max-w-xl self-end text-[1.02rem] leading-[1.8] text-navy/65">
            {dict.thesis.intro}
          </p>
        </div>

        <ul className="mt-20 grid gap-x-16 gap-y-12 border-t border-navy/10 pt-16 md:grid-cols-2">
          {dict.thesis.capabilities.map((item) => (
            <li key={item.num} className="border-b border-navy/8 pb-10">
              <p className="mb-3 font-serif text-sm text-gold">{item.num}</p>
              <h3 className="font-serif text-2xl text-navy">{item.title}</h3>
              <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-navy/60">
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
      <div className="wrap py-24 md:py-32">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="kicker mb-5">{dict.about.kicker}</p>
            <h2 className="font-serif text-[clamp(1.85rem,3.4vw,3rem)] leading-[1.15] text-navy">
              {dict.about.title}
            </h2>
            <p className="mt-5 font-serif text-xl leading-snug text-navy/50 md:text-2xl">
              {dict.about.subtitle}
            </p>
          </div>
          <p className="max-w-xl text-[1.02rem] leading-[1.8] text-navy/65">
            {dict.about.body}
          </p>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 border-y border-navy/10 py-16 md:grid-cols-3">
          {dict.about.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <p className="font-serif text-[clamp(2rem,4vw,3.25rem)] leading-none text-navy">
                  {stat.value}
                </p>
                <p className="mt-3 text-[0.7rem] font-medium tracking-[0.16em] text-gold uppercase">
                  {stat.label}
                </p>
                <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-navy/50">
                  {stat.detail}
                </p>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-xs leading-relaxed text-navy/40">
          {dict.about.disclaimer}
        </p>

        <div className="mt-24 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <h3 className="font-serif text-[clamp(1.6rem,2.6vw,2.25rem)] leading-snug text-navy">
            {dict.about.differentialTitle}
          </h3>
          <p className="max-w-xl text-[1.02rem] leading-[1.8] text-navy/65">
            {dict.about.differential}
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {dict.about.axes.map((axis) => (
            <div key={axis.title} className="border-t border-gold/60 pt-6">
              <h4 className="font-serif text-xl text-navy">{axis.title}</h4>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-navy/60">
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
      <div className="wrap py-24 md:py-32">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="kicker mb-5">{dict.team.kicker}</p>
            <h2 className="font-serif text-[clamp(1.85rem,3.4vw,3rem)] leading-[1.15] text-navy">
              {dict.team.title}
            </h2>
          </div>
          <div className="max-w-xl">
            <p className="text-[1.02rem] leading-[1.8] text-navy/65">
              {dict.team.body}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-navy/40">
              {dict.team.note}
            </p>
          </div>
        </div>

        <div className="mt-20 max-w-md border-t border-navy/15 pt-10">
          <p className="font-serif text-3xl text-navy md:text-4xl">
            {dict.team.person.name}
          </p>
          <p className="mt-4 text-[0.7rem] font-medium tracking-[0.18em] text-gold uppercase">
            {dict.team.person.role}
          </p>
          <p className="mt-2 text-sm text-navy/50">{dict.team.person.location}</p>
        </div>
      </div>
    </section>
  );
}

function Portfolio({ dict }: { dict: Dictionary }) {
  return (
    <section id="portafolio" className="border-t border-navy/8">
      <div className="wrap py-24 md:py-32">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="kicker mb-5">{dict.portfolio.kicker}</p>
            <h2 className="font-serif text-[clamp(1.85rem,3.4vw,3rem)] leading-[1.15] text-navy">
              {dict.portfolio.title}
            </h2>
            <p className="mt-5 font-serif text-xl leading-snug text-navy/50 md:text-2xl">
              {dict.portfolio.subtitle}
            </p>
          </div>
          <p className="max-w-xl self-end text-[1.02rem] leading-[1.8] text-navy/65">
            {dict.portfolio.intro}
          </p>
        </div>

        <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <h3 className="kicker mb-8">{dict.portfolio.sectorsTitle}</h3>
            <ul>
              {dict.portfolio.sectors.map((sector) => (
                <li
                  key={sector}
                  className="border-b border-navy/8 py-3.5 text-[0.98rem] text-navy/80"
                >
                  {sector}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="kicker mb-3">{dict.portfolio.reachTitle}</h3>
            <p className="mb-10 text-sm text-navy/50">{dict.portfolio.reachIntro}</p>
            <ul className="space-y-10">
              {dict.portfolio.regions.map((region) => (
                <li key={region.name}>
                  <p className="font-serif text-2xl text-navy">{region.name}</p>
                  <p className="mt-2 text-[0.95rem] text-navy/55">{region.places}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 max-w-3xl border-t border-navy/10 pt-12">
          <h3 className="kicker mb-5">{dict.portfolio.modelTitle}</h3>
          <p className="text-[1.02rem] leading-[1.8] text-navy/65">
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
      <div className="wrap py-24 md:py-32">
        <p className="kicker mb-5">{dict.contact.kicker}</p>
        <h2 className="max-w-3xl font-serif text-[clamp(2.4rem,6vw,5rem)] leading-[0.98] text-navy">
          {dict.contact.title}
        </h2>

        <div className="mt-16 max-w-lg space-y-5">
          <p className="font-serif text-2xl text-navy md:text-3xl">
            {dict.contact.name}
          </p>
          <p>
            <a
              href={dict.contact.phoneHref}
              className="text-lg text-navy/70 transition-colors hover:text-gold"
            >
              {dict.contact.phone}
            </a>
          </p>
          <p>
            <a
              href={`mailto:${dict.contact.email}`}
              className="text-lg text-navy/70 transition-colors hover:text-gold"
            >
              {dict.contact.email}
            </a>
          </p>
          <p className="pt-2 text-[0.7rem] tracking-[0.18em] text-gold uppercase">
            {dict.contact.location}
          </p>
        </div>
      </div>
    </section>
  );
}
