module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    res.end("Method Not Allowed");
    return;
  }

  const TO = "gregory.prudhommeaux@gmail.com";
  let body = {};
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString("utf8");
    const type = String(req.headers["content-type"] || "");
    if (type.includes("application/json")) body = JSON.parse(raw || "{}");
    else {
      const params = new URLSearchParams(raw);
      body = Object.fromEntries(params.entries());
    }
  } catch {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: false, error: "invalid" }));
    return;
  }

  const clean = (value, max) => String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
  if (clean(body.hp, 80)) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  const name = clean(body.name, 120);
  const whatsapp = clean(body.whatsapp, 40);
  const email = clean(body.email, 160).toLowerCase();
  const company = clean(body.company, 160);
  const message = String(body.message || "").trim().slice(0, 4000);
  const digits = whatsapp.replace(/\D/g, "");
  const okPhone = digits.length >= 8 && digits.length <= 15;
  const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (name.length < 2 || !okPhone || !okEmail || !message) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: false, error: "invalid" }));
    return;
  }

  const text = [
    "NAHU Capital — message from the site",
    "",
    "Name: " + name,
    "WhatsApp: " + whatsapp,
    "Email: " + email,
    "Company / project: " + (company || "—"),
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const sent = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + resendKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "NAHU Capital <onboarding@resend.dev>",
          to: [TO],
          reply_to: email,
          subject: "NAHU Capital — " + name,
          text,
        }),
      });
      if (!sent.ok) throw new Error("resend");
    } else if (process.env.CONTACT_WEBHOOK_URL) {
      const sent = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: TO, name, email, whatsapp, company, message, text }),
      });
      if (!sent.ok) throw new Error("webhook");
    } else {
      throw new Error("no-mailer");
    }
  } catch {
    res.statusCode = 502;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: false, error: "send" }));
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ ok: true }));
};
