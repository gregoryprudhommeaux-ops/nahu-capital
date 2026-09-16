import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { ContactPanel } from "./contact-panel";
import { EditorialFrame } from "./editorial-frame";
import { SectorsMenu } from "./sectors-menu";
import { TeamMenu } from "./team-menu";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { WorldReach } from "./world-reach";

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
          <div className="max-w-2xl">
            <p className="kicker mb-3.5 md:mb-4">{dict.hero.kicker}</p>
            <h1 className="max-w-[16.5em] font-serif text-[clamp(2.2rem,8.4vw,3.45rem)] leading-[1.2] tracking-[-0.018em] text-pretty text-navy md:leading-[1.14] md:tracking-[-0.022em]">
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
          <p className="mt-5 max-w-xl text-[0.98rem] leading-[1.7] text-navy/65">
            {dict.about.body}
          </p>
        </div>
      </div>

      <div className="wrap pt-8 pb-8 md:pt-10 md:pb-8">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-navy/10 py-6 md:grid-cols-3 lg:grid-cols-6 lg:gap-x-5">
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
        {dict.team.body ? (
          <p className="mt-3 max-w-xl text-[0.98rem] leading-[1.7] text-navy/65">
            {dict.team.body}
          </p>
        ) : null}
        <div className="mt-8">
          <TeamMenu dict={dict} />
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

        <div className="mt-12">
          <SectorsMenu
            title={dict.portfolio.sectorsTitle}
            sectors={dict.portfolio.sectors}
          />
        </div>

        <div className="mt-10">
          <WorldReach dict={dict} />
        </div>
      </div>
    </section>
  );
}

function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section id="contacto">
      <div className="grid lg:grid-cols-2">
        <ContactPanel dict={dict.contact} />
        <EditorialFrame
          src="/editorial/contact-cdmx.jpg"
          alt={dict.media.contactAlt}
          caption={dict.media.heroCaption}
          className="min-h-[280px] lg:min-h-full"
          imageClassName="object-[center_55%]"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
    </section>
  );
}
