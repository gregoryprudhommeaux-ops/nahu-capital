"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";

type Status = "idle" | "sending" | "sent" | "error";

type Props = {
  dict: Dictionary["contact"];
};

export function ContactPanel({ dict }: Props) {
  const formId = useId();
  const toggleId = useId();
  const titleId = useId();
  const toggleRef = useRef<HTMLInputElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  function closeForm() {
    if (toggleRef.current) toggleRef.current.checked = false;
    setStatus("idle");
  }

  useEffect(() => {
    const toggle = toggleRef.current;
    if (!toggle) return;

    const onChange = () => {
      if (toggle.checked) {
        setStatus("idle");
        firstFieldRef.current?.focus();
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && toggle.checked) {
        event.preventDefault();
        toggle.checked = false;
        setStatus("idle");
      }
    };

    toggle.addEventListener("change", onChange);
    document.addEventListener("keydown", onKey);
    return () => {
      toggle.removeEventListener("change", onChange);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "sent") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          whatsapp: data.get("whatsapp"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
          hp: data.get("hp"),
        }),
      });
      if (!res.ok) throw new Error("send");
      setStatus("sent");
      window.setTimeout(() => {
        form.reset();
        closeForm();
      }, 1600);
    } catch {
      setStatus("error");
    }
  }

  const submitLabel =
    status === "sent"
      ? dict.sent
      : status === "sending"
        ? dict.submitting
        : dict.submit;

  return (
    <div className="contact-panel bg-navy text-cream">
      <input
        ref={toggleRef}
        id={toggleId}
        type="checkbox"
        className="contact-toggle"
      />
      <div className="wrap py-8 md:py-9 lg:flex lg:h-full lg:flex-col lg:items-start lg:justify-center lg:w-auto lg:max-w-none lg:pr-10 lg:pl-[max(2.5rem,calc((100vw-1220px)/2))]">
        <p className="kicker mb-2.5">{dict.kicker}</p>
        <h2 className="max-w-[11.5em] font-serif text-[clamp(1.45rem,2.2vw,2.05rem)] leading-[1.14] text-cream">
          {dict.title}
        </h2>
        {dict.lead ? (
          <p className="mt-4 max-w-sm text-[0.98rem] leading-[1.7] text-cream/65">
            {dict.lead}
          </p>
        ) : null}
        <label htmlFor={toggleId} className="contact-open">
          {dict.open}
        </label>
      </div>

      <div
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <label
          htmlFor={toggleId}
          className="contact-modal-backdrop"
          aria-hidden="true"
        />
        <form
          action="/api/contact"
          method="post"
          onSubmit={onSubmit}
          className="contact-modal-panel"
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="kicker mb-2">{dict.kicker}</p>
              <p id={titleId} className="max-w-[22em] font-serif text-[1.35rem] leading-snug md:text-[1.5rem]">
                {dict.formTitle}
              </p>
            </div>
            <label htmlFor={toggleId} className="contact-close">
              {dict.close}
            </label>
          </div>

          <div className="space-y-4">
            <Field id={`${formId}-name`} label={dict.fullName} required>
              <input
                ref={firstFieldRef}
                id={`${formId}-name`}
                name="name"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                maxLength={120}
                className="contact-field"
              />
            </Field>
            <Field id={`${formId}-whatsapp`} label={dict.whatsapp} required>
              <input
                id={`${formId}-whatsapp`}
                name="whatsapp"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                required
                minLength={8}
                maxLength={40}
                className="contact-field"
              />
            </Field>
            <Field id={`${formId}-email`} label={dict.email} required>
              <input
                id={`${formId}-email`}
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={160}
                className="contact-field"
              />
            </Field>
            <Field id={`${formId}-company`} label={dict.company} hint={dict.optional}>
              <input
                id={`${formId}-company`}
                name="company"
                type="text"
                autoComplete="organization"
                maxLength={160}
                className="contact-field"
              />
            </Field>
            <Field id={`${formId}-message`} label={dict.message} required>
              <textarea
                id={`${formId}-message`}
                name="message"
                rows={5}
                required
                maxLength={4000}
                className="contact-field min-h-[7.5rem] resize-y"
              />
            </Field>
            <div className="hidden" aria-hidden>
              <input name="hp" tabIndex={-1} autoComplete="off" />
            </div>
          </div>

          {status === "error" ? (
            <p className="mt-4 text-[0.82rem] text-navy/70">{dict.error}</p>
          ) : null}

          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="mt-6 w-full bg-navy px-5 py-3 text-[0.72rem] font-medium tracking-[0.18em] text-cream uppercase transition-colors hover:bg-navy/90 disabled:opacity-80"
          >
            {submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-[0.68rem] font-medium tracking-[0.16em] text-gold uppercase">
          {label}
          {required ? " *" : ""}
        </span>
        {hint ? <span className="text-[0.68rem] text-navy/40">{hint}</span> : null}
      </span>
      {children}
    </label>
  );
}
