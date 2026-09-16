import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";

const profiles: Record<
  string,
  { photo: string; linkedin: string }
> = {
  juan: {
    photo: "/team/juan-balbontin.jpg",
    linkedin: "https://www.linkedin.com/in/juan-balbontin-a95b717/",
  },
  ana: {
    photo: "/team/ana-almeida.jpg",
    linkedin: "https://www.linkedin.com/in/anaalmeidalu/",
  },
  patrick: {
    photo: "/team/patrick-diogo.jpg",
    linkedin: "https://www.linkedin.com/in/patrickdiogo/",
  },
  gregory: {
    photo: "/team/gregory-prudhommeaux.jpg",
    linkedin: "https://www.linkedin.com/in/gregoryprudhommeaux/",
  },
};

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M4 7.2 12 13l8-5.8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
        {people.map((person) => {
          const profile = profiles[person.id];
          return (
            <li
              key={person.id}
              className="flex gap-4 border-b border-navy/8 py-5 last:border-b-0 md:border-navy/8 md:px-0 md:py-6 md:odd:pr-8 md:even:border-l md:even:pl-8 md:[&:nth-last-child(-n+2)]:border-b-0"
            >
              <Image
                src={profile.photo}
                alt={person.name}
                width={224}
                height={224}
                className="h-20 w-20 shrink-0 object-cover md:h-28 md:w-28"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <p className="min-w-0 font-serif text-[1.15rem] leading-tight text-navy md:text-xl">
                    {person.name}
                  </p>
                  <span className="flex shrink-0 items-center gap-2">
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${dict.team.linkedinLabel}, ${person.name}`}
                      className="text-gold transition-colors hover:text-navy"
                    >
                      <LinkedInIcon />
                    </a>
                    <button
                      type="button"
                      aria-label={`${dict.team.emailLabel}, ${person.name}`}
                      className="text-gold transition-colors hover:text-navy"
                    >
                      <MailIcon />
                    </button>
                  </span>
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
    </details>
  );
}
