type Props = {
  title: string;
  sectors: string[];
};

export function SectorsMenu({ title, sectors }: Props) {
  return (
    <details className="sectors-menu group">
      <summary className="flex w-full cursor-pointer items-center gap-3 border-b border-navy/10 py-3 text-left transition-colors hover:border-gold">
        <span className="relative block h-3 w-5 shrink-0" aria-hidden>
          <span className="absolute top-0 left-0 block h-px w-5 bg-navy transition-transform group-open:translate-y-[5px] group-open:rotate-45" />
          <span className="absolute top-[5px] left-0 block h-px w-5 bg-navy transition-opacity group-open:opacity-0" />
          <span className="absolute top-[10px] left-0 block h-px w-5 bg-navy transition-transform group-open:-translate-y-[5px] group-open:-rotate-45" />
        </span>
        <span className="kicker mb-0">{title}</span>
        <span className="ml-auto font-serif text-lg leading-none text-navy/35">
          {sectors.length}
        </span>
      </summary>

      <ul className="border-b border-navy/10">
        {sectors.map((sector) => (
          <li
            key={sector}
            className="border-b border-navy/8 py-2.5 text-[0.92rem] text-navy/80 last:border-b-0"
          >
            {sector}
          </li>
        ))}
      </ul>
    </details>
  );
}
