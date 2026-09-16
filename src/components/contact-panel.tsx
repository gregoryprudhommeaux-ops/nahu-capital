"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";

type Status = "idle" | "sending" | "sent" | "error";

type Props = {
  dict: Dictionary["contact"];
};

export function ContactPanel({ dict }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setStatus("idle");
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  function openForm() {
    setStatus("idle");
    dialogRef.current?.showModal();
  }

  function closeForm() {
    dialogRef.current?.close();
  }

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
    <div className="bg-navy text-cream">
      <div className="wrap py-12 md:py-16 lg:w-auto lg:max-w-none lg:pr-12 lg:pl-[max(2.5rem,calc((100vw-1220px)/2))]">
        <p className="kicker mb-4">{dict.kicker}</p>
        <h2 className="max-w-xl font-serif text-[clamp(1.85rem,3.4vw,2.85rem)] leading-[1.08] text-cream">
          {dict.title}
        </h2>
        {dict.lead ? (
          <p className="mt-4 max-w-sm text-[0.98rem] leading-[1.7] text-cream/65">
            {dict.lead}
          </p>
        ) : null}
        <button
          type="button"
          onClick={openForm}
          className="mt-8 border border-gold/70 px-5 py-2.5 text-[0.72rem] font-medium tracking-[0.18em] text-gold uppercase transition-colors hover:bg-gold hover:text-navy"
        >
          {dict.open}
        </button>
      </div>

      <dialog ref={dialogRef} className="contact-dialog">
        <form
          onSubmit={onSubmit}
          className="w-[min(32rem,calc(100vw-2rem))] bg-cream p-6 text-navy md:p-8"
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="kicker mb-2">{dict.kicker}</p>
              <p className="font-serif text-2xl leading-tight">{dict.formTitle}</p>
            </div>
            <button
              type="button"
              onClick={closeForm}
              className="text-[0.68rem] tracking-[0.16em] text-navy/45 uppercase transition-colors hover:text-navy"
            >
              {dict.close}
            </button>
          </div>

          <div className="space-y-4">
            <Field id={`${formId}-name`} label={dict.fullName} required>
              <input
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
            <Field id={`${formId}-message`} label={dict.message} hint={dict.optional}>
              <textarea
                id={`${formId}-message`}
                name="message"
                rows={5}
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
      </dialog>
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
