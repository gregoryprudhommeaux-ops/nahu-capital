const TO = "gregory.prudhommeaux@gmail.com";

type Payload = {
  name: string;
  whatsapp: string;
  email: string;
  company: string;
  message: string;
  hp?: string;
};

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15 && /^[+\d().\s-]+$/.test(value);
}

export const dynamic = "force-dynamic";

async function readPayload(request: Request): Promise<Payload | null> {
  const contentType = request.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("application/json")) {
      return (await request.json()) as Payload;
    }
    const form = await request.formData();
    return {
      name: String(form.get("name") ?? ""),
      whatsapp: String(form.get("whatsapp") ?? ""),
      email: String(form.get("email") ?? ""),
      company: String(form.get("company") ?? ""),
      message: String(form.get("message") ?? ""),
      hp: String(form.get("hp") ?? ""),
    };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const body = await readPayload(request);
  if (!body) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (clean(body.hp, 80)) {
    return Response.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const whatsapp = clean(body.whatsapp, 40);
  const email = clean(body.email, 160).toLowerCase();
  const company = clean(body.company, 160);
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 4000) : "";

  if (name.length < 2 || !isWhatsapp(whatsapp) || !isEmail(email)) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const text = [
    "NAHU Capital — message from the site",
    "",
    `Name: ${name}`,
    `WhatsApp: ${whatsapp}`,
    `Email: ${email}`,
    `Company / project: ${company || "—"}`,
    "",
    "Message:",
    message || "—",
  ].join("\n");

  try {
    await deliver({ name, email, whatsapp, company, message, text });
  } catch {
    return Response.json({ ok: false, error: "send" }, { status: 502 });
  }

  return Response.json({ ok: true });
}

async function deliver(fields: {
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  message: string;
  text: string;
}) {
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM ?? "NAHU Capital <onboarding@resend.dev>",
        to: [TO],
        reply_to: fields.email,
        subject: `NAHU Capital — ${fields.name}`,
        text: fields.text,
      }),
    });
    if (!res.ok) {
      throw new Error("resend");
    }
    return;
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: TO,
        name: fields.name,
        email: fields.email,
        whatsapp: fields.whatsapp,
        company: fields.company,
        message: fields.message,
        text: fields.text,
      }),
    });
    if (!res.ok) {
      throw new Error("webhook");
    }
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[contact]\n" + fields.text);
    return;
  }

  throw new Error("no-mailer");
}
