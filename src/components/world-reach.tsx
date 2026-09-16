import type { Dictionary } from "@/i18n/get-dictionary";

type Props = {
  dict: Dictionary;
};

export function WorldReach({ dict }: Props) {
  return (
    <div>
      <p className="kicker mb-2">{dict.portfolio.reachTitle}</p>
      <p className="max-w-xl text-sm leading-relaxed text-navy/50">
        {dict.portfolio.reachIntro}
      </p>

      <figure className="mt-6">
        <img
          src="/editorial/world.svg"
          alt={dict.media.worldAlt}
          className="w-full"
        />
      </figure>

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
  );
}
