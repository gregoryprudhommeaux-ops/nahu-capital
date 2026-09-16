import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { EditorialFrame } from "./editorial-frame";
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
        <Projects dict={dict} />
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
    <section id="inicio">
      <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:min-h-[min(82svh,740px)]">
        <div className="wrap flex flex-col justify-between py-10 md:py-12 lg:w-auto lg:max-w-none lg:pr-10 lg:pl-[max(2.5rem,calc((100vw-1220px)/2))]">
          <div className="max-w-xl">
            <p className="kicker mb-4">{dict.hero.kicker}</p>
            <h1 className="font-serif text-[clamp(2.05rem,4.6vw,3.75rem)] leading-[1.02] text-navy">
              {dict.hero.title}
            </h1>
            <p className="mt-6 max-w-md text-[0.98rem] leading-[1.7] text-navy/65">
              {dict.hero.lead}
            </p>
            <a
              href="#contacto"
              className="mt-8 inline-flex items-center border border-navy/20 px-5 py-2.5 text-[0.72rem] font-medium tracking-[0.16em] text-navy uppercase transition-colors hover:border-gold hover:text-gold"
            >
              {dict.contact.cta}
            </a>
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

        <EditorialFrame
          src="/editorial/hero-cdmx.jpg"
          alt={dict.media.heroAlt}
          caption={dict.media.heroCaption}
          className="min-h-[42vh] lg:min-h-full"
          imageClassName="object-[center_35%]"
          priority
          sizes="(min-width: 1024px) 48vw, 100vw"
        />
      </div>
    </section>
  );
}

function Principle({ dict }: { dict: Dictionary }) {
  return (
    <section id="tesis" className="relative isolate min-h-[20rem] overflow-hidden md:min-h-[24rem]">
      <div className="absolute inset-0">
        <EditorialFrame
          src="/editorial/mixed-use.jpg"
          alt={dict.media.principleAlt}
          className="h-full w-full"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-navy/78" />
      <div className="wrap relative z-10 py-14 md:py-16">
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
      src: "/editorial/hospitality.jpg",
      alt: dict.media.hospitalityAlt,
      caption: dict.media.hospitalityCaption,
    },
    {
      src: "/editorial/district.jpg",
      alt: dict.media.districtAlt,
      caption: dict.media.districtCaption,
    },
    {
      src: "/editorial/datacenter.jpg",
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
            <div key={site.src} className="group">
              <EditorialFrame
                src={site.src}
                alt={site.alt}
                caption={site.caption}
                className="aspect-[4/3]"
                sizes="(min-width: 640px) 33vw, 100vw"
                zoom
              />
            </div>
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
      <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
        <EditorialFrame
          src="/editorial/paris.jpg"
          alt={dict.media.parisAlt}
          caption={dict.media.parisCaption}
          className="min-h-[280px] lg:min-h-full"
          imageClassName="object-[center_40%]"
          sizes="(min-width: 1024px) 46vw, 100vw"
        />
        <div className="wrap py-12 md:py-16 lg:w-auto lg:max-w-none lg:pr-[max(2.5rem,calc((100vw-1220px)/2))] lg:pl-12">
          <p className="kicker mb-3">{dict.about.kicker}</p>
          <h2 className="font-serif text-[clamp(1.55rem,2.4vw,2.35rem)] leading-[1.15] text-navy">
            {dict.about.title}
          </h2>
          <p className="mt-3 font-serif text-lg leading-snug text-navy/50">
            {dict.about.subtitle}
          </p>
          <p className="mt-5 max-w-xl text-[0.98rem] leading-[1.7] text-navy/65">
            {dict.about.body}
          </p>
        </div>
      </div>

      <div className="wrap py-10 md:py-12">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-navy/10 py-8 md:grid-cols-3 lg:grid-cols-6 lg:gap-x-5">
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
        <p className="mt-4 text-xs leading-relaxed text-navy/40">
          {dict.about.disclaimer}
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <h3 className="font-serif text-[clamp(1.4rem,2.2vw,1.9rem)] leading-snug text-navy">
            {dict.about.differentialTitle}
          </h3>
          <p className="max-w-xl text-[0.98rem] leading-[1.7] text-navy/65">
            {dict.about.differential}
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {dict.about.axes.map((axis) => (
            <div key={axis.title} className="border-t border-gold/60 pt-4">
              <h4 className="font-serif text-lg text-navy">{axis.title}</h4>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-navy/60">
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
      <div className="wrap grid items-end gap-8 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-14">
        <div>
          <p className="kicker mb-3">{dict.team.kicker}</p>
          <h2 className="font-serif text-[clamp(1.55rem,2.4vw,2.35rem)] leading-[1.15] text-navy">
            {dict.team.title}
          </h2>
          <p className="mt-4 max-w-xl text-[0.98rem] leading-[1.7] text-navy/65">
            {dict.team.body}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-navy/40">
            {dict.team.note}
          </p>
        </div>
        <div className="border-t border-navy/15 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-10">
          <p className="font-serif text-2xl text-navy md:text-3xl">
            {dict.team.person.name}
          </p>
          <p className="mt-3 text-[0.68rem] font-medium tracking-[0.18em] text-gold uppercase">
            {dict.team.person.role}
          </p>
          <p className="mt-1.5 text-sm text-navy/50">{dict.team.person.location}</p>
        </div>
      </div>
    </section>
  );
}

function Portfolio({ dict }: { dict: Dictionary }) {
  const mosaic = [
    {
      src: "/editorial/grand-projet.jpg",
      alt: dict.media.grandprojetAlt,
      caption: dict.media.grandprojetCaption,
      span: "md:col-span-2",
      frame: "aspect-[16/10] md:aspect-[2.2/1]",
    },
    {
      src: "/editorial/hospitality-city.jpg",
      alt: dict.media.cityHotelAlt,
      caption: dict.media.cityHotelCaption,
      span: "",
      frame: "aspect-[4/3]",
    },
    {
      src: "/editorial/data-hall.jpg",
      alt: dict.media.datahallAlt,
      caption: dict.media.datahallCaption,
      span: "",
      frame: "aspect-[4/3]",
    },
    {
      src: "/editorial/quartier-night.jpg",
      alt: dict.media.quartierAlt,
      caption: dict.media.quartierCaption,
      span: "md:col-span-2",
      frame: "aspect-[16/10] md:aspect-[2.2/1]",
    },
  ];

  return (
    <section id="portafolio" className="border-t border-navy/8">
      <div className="wrap py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="kicker mb-3">{dict.portfolio.kicker}</p>
            <h2 className="font-serif text-[clamp(1.55rem,2.4vw,2.35rem)] leading-[1.15] text-navy">
              {dict.portfolio.title}
            </h2>
            <p className="mt-3 font-serif text-lg leading-snug text-navy/50">
              {dict.portfolio.subtitle}
            </p>
          </div>
          <p className="max-w-xl self-end text-[0.98rem] leading-[1.7] text-navy/65">
            {dict.portfolio.intro}
          </p>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {mosaic.map((item) => (
            <div key={item.src} className={`group ${item.span}`}>
              <EditorialFrame
                src={item.src}
                alt={item.alt}
                caption={item.caption}
                className={item.frame}
                sizes="(min-width: 768px) 50vw, 100vw"
                zoom
              />
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="kicker mb-5">{dict.portfolio.sectorsTitle}</h3>
            <ul>
              {dict.portfolio.sectors.map((sector) => (
                <li
                  key={sector}
                  className="border-b border-navy/8 py-2.5 text-[0.92rem] text-navy/80"
                >
                  {sector}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="kicker mb-2">{dict.portfolio.reachTitle}</h3>
            <p className="mb-6 text-sm text-navy/50">{dict.portfolio.reachIntro}</p>
            <ul className="space-y-5">
              {dict.portfolio.regions.map((region) => (
                <li key={region.name}>
                  <p className="font-serif text-xl text-navy">{region.name}</p>
                  <p className="mt-1 text-[0.9rem] text-navy/55">{region.places}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 max-w-3xl border-t border-navy/10 pt-8">
          <h3 className="kicker mb-4">{dict.portfolio.modelTitle}</h3>
          <p className="text-[0.98rem] leading-[1.7] text-navy/65">
            {dict.portfolio.model}
          </p>
        </div>
      </div>
    </section>
  );
}

function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section id="contacto">
      <div className="grid lg:grid-cols-2">
        <div className="bg-navy text-cream">
          <div className="wrap py-12 md:py-16 lg:w-auto lg:max-w-none lg:pr-12 lg:pl-[max(2.5rem,calc((100vw-1220px)/2))]">
            <p className="kicker mb-4">{dict.contact.kicker}</p>
            <h2 className="max-w-md font-serif text-[clamp(1.85rem,3.4vw,2.85rem)] leading-[1.08] text-cream">
              {dict.contact.title}
            </h2>
            <div className="mt-8 max-w-sm space-y-3">
              <p className="font-serif text-2xl text-cream">{dict.contact.name}</p>
              <p>
                <a
                  href={dict.contact.phoneHref}
                  className="text-cream/75 transition-colors hover:text-gold"
                >
                  {dict.contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${dict.contact.email}`}
                  className="text-cream/75 transition-colors hover:text-gold"
                >
                  {dict.contact.email}
                </a>
              </p>
              <p className="pt-2 text-[0.68rem] tracking-[0.18em] text-gold uppercase">
                {dict.contact.location}
              </p>
            </div>
          </div>
        </div>
        <EditorialFrame
          src="/editorial/contact-cdmx.jpg"
          alt={dict.media.contactAlt}
          caption={dict.media.heroCaption}
          className="min-h-[240px] lg:min-h-full"
          imageClassName="object-[center_40%]"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
    </section>
  );
}
