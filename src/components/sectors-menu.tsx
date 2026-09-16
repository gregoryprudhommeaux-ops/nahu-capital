"use client";

import { useId, useState } from "react";

type Props = {
  title: string;
  sectors: string[];
  openLabel: string;
  closeLabel: string;
};

export function SectorsMenu({ title, sectors, openLabel, closeLabel }: Props) {
  const [open, setOpen] = useState(false);
  const listId = useId();

  return (
    <div>
      <button
        type="button"
        className="flex w-full items-center gap-3 border-b border-navy/10 py-3 text-left"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="relative block h-3 w-5 shrink-0" aria-hidden>
          <span
            className={`absolute top-0 left-0 block h-px w-5 bg-navy transition-transform ${
              open ? "translate-y-[5px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute top-[5px] left-0 block h-px w-5 bg-navy transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`absolute top-[10px] left-0 block h-px w-5 bg-navy transition-transform ${
              open ? "-translate-y-[5px] -rotate-45" : ""
            }`}
          />
        </span>
        <span className="kicker mb-0">{title}</span>
        <span className="ml-auto font-serif text-lg leading-none text-navy/35">
          {sectors.length}
        </span>
      </button>

      {open ? (
        <ul id={listId} className="border-b border-navy/10">
          {sectors.map((sector) => (
            <li
              key={sector}
              className="border-b border-navy/8 py-2.5 text-[0.92rem] text-navy/80 last:border-b-0"
            >
              {sector}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
