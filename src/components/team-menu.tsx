import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";

const portraits: Record<string, string> = {
  juan: "/team/juan-balbontin.jpg",
  ana: "/team/ana-almeida.jpg",
  patrick: "/team/patrick-diogo.jpg",
  gregory: "/team/gregory-prudhommeaux.jpg",
};

type Props = {
  dict: Dictionary;
};

export function TeamMenu({ dict }: Props) {
  const people = dict.team.people;

  return (
    <details className="team-menu group">
      <summary className="flex w-full cursor-pointer items-center gap-3 border-b border-navy/10 py-3 text-left transition-colors hover:border-gold">
        <span className="relative block h-3 w-5 shrink-0" aria-hidden>
          <span className="absolute top-0 left-0 block h-px w-5 bg-navy transition-transform group-open:translate-y-[5px] group-open:rotate-45" />
          <span className="absolute top-[5px] left-0 block h-px w-5 bg-navy transition-opacity group-open:opacity-0" />
          <span className="absolute top-[10px] left-0 block h-px w-5 bg-navy transition-transform group-open:-translate-y-[5px] group-open:-rotate-45" />
        </span>
        <span className="kicker mb-0">{dict.team.listTitle}</span>
        <span className="ml-auto font-serif text-lg leading-none text-navy/35">
          {people.length}
        </span>
      </summary>

      <ul className="grid border-b border-navy/10 md:grid-cols-2">
        {people.map((person) => (
          <li
            key={person.id}
            className="flex gap-4 border-b border-navy/8 py-5 last:border-b-0 md:border-navy/8 md:px-0 md:py-6 md:odd:pr-8 md:even:border-l md:even:pl-8 md:[&:nth-last-child(-n+2)]:border-b-0"
          >
            <Image
              src={portraits[person.id]}
              alt={person.name}
              width={224}
              height={224}
              className="h-20 w-20 shrink-0 object-cover md:h-28 md:w-28"
            />
            <div className="min-w-0">
              <p className="font-serif text-[1.15rem] leading-tight text-navy md:text-xl">
                {person.name}
              </p>
              <p className="kicker mt-2 mb-0 text-[0.62rem]">{person.role}</p>
              <p className="mt-2.5 text-[0.88rem] leading-[1.65] text-navy/65">
                {person.bio}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </details>
  );
}
