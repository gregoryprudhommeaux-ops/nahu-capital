#!/usr/bin/env python3
"""Build a static NAHU one-pager with prepared photos inlined as data URIs."""

from __future__ import annotations

import base64
import io
import json
import re
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
COPY_TS = ROOT / "src" / "lib" / "copy.ts"

LOCALES = ("es", "en", "fr", "pt", "zh")
HTML_LANG = {"es": "es-MX", "en": "en", "fr": "fr", "pt": "pt-PT", "zh": "zh-CN"}
LOCALE_NAMES = {
    "es": "Español",
    "en": "English",
    "fr": "Français",
    "pt": "Português",
    "zh": "中文",
}
SECTIONS = (
    ("tesis", "thesis"),
    ("nosotros", "about"),
    ("equipo", "team"),
    ("portafolio", "portfolio"),
    ("contacto", "contact"),
)
TEAM_LINKS = {
    "juan": "https://www.linkedin.com/in/juan-balbontin-a95b717/",
    "ana": "https://www.linkedin.com/in/anaalmeidalu/",
    "patrick": "https://www.linkedin.com/in/patrickdiogo/",
    "gregory": "https://www.linkedin.com/in/gregoryprudhommeaux/",
}
PHOTO_SPECS = {
    "hero": ("public/hero.jpg", 680, 62, "webp"),
    "hospitality": ("public/shots/hospitality.jpg", 420, 64, "webp"),
    "district": ("public/shots/district-city.jpg", 420, 64, "webp"),
    "datacenter": ("public/shots/datacenter.jpg", 420, 64, "webp"),
    "juan": ("public/team/juan.jpg", 200, 66, "webp"),
    "ana": ("public/team/ana.jpg", 200, 66, "webp"),
    "patrick": ("public/team/patrick.jpg", 200, 66, "webp"),
    "gregory": ("public/team/gregory.jpg", 200, 66, "webp"),
    "logo": ("public/logo.png", 780, 90, "png"),
    "favicon": ("public/favicon.png", 64, 90, "png"),
}


def load_dictionaries() -> dict:
    text = COPY_TS.read_text(encoding="utf-8")
    match = re.search(r"const dictionaries = (\{.*\}) as const;", text, re.S)
    if not match:
        raise SystemExit("Could not parse dictionaries from copy.ts")
    return json.loads(match.group(1))


def encode_photo(rel: str, max_side: int, quality: int, kind: str) -> str:
    path = ROOT / rel
    image = Image.open(path)
    image = ImageOps.exif_transpose(image)
    if kind == "jpeg":
        image = image.convert("RGB")
        image.thumbnail((max_side, max_side), Image.Resampling.LANCZOS)
        buf = io.BytesIO()
        image.save(buf, format="JPEG", quality=quality, optimize=True, progressive=True)
        payload = buf.getvalue()
        mime = "image/jpeg"
    elif kind == "webp":
        image = image.convert("RGB")
        image.thumbnail((max_side, max_side), Image.Resampling.LANCZOS)
        buf = io.BytesIO()
        image.save(buf, format="WEBP", quality=quality, method=6)
        payload = buf.getvalue()
        mime = "image/webp"
    else:
        image = image.convert("RGBA") if "A" in image.getbands() else image.convert("RGB")
        image.thumbnail((max_side, max_side), Image.Resampling.LANCZOS)
        buf = io.BytesIO()
        image.save(buf, format="PNG", optimize=True)
        payload = buf.getvalue()
        mime = "image/png"
    return f"data:{mime};base64,{base64.b64encode(payload).decode('ascii')}"


def esc(value: str) -> str:
    return (
        value.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def path_for(locale: str) -> str:
    return "/" if locale == "es" else f"/{locale}"


def flag_svg(locale: str) -> str:
    if locale == "es":
        inner = (
            '<rect width="7" height="15" fill="#006847"/>'
            '<rect x="7" width="7" height="15" fill="#fff"/>'
            '<rect x="14" width="7" height="15" fill="#CE1126"/>'
        )
    elif locale == "en":
        inner = (
            '<rect width="21" height="15" fill="#BF0A30"/>'
            '<rect y="1.15" width="21" height="1.15" fill="#fff"/>'
            '<rect y="3.46" width="21" height="1.15" fill="#fff"/>'
            '<rect y="5.77" width="21" height="1.15" fill="#fff"/>'
            '<rect y="8.08" width="21" height="1.15" fill="#fff"/>'
            '<rect y="10.38" width="21" height="1.15" fill="#fff"/>'
            '<rect y="12.69" width="21" height="1.15" fill="#fff"/>'
            '<rect width="9.5" height="8.08" fill="#002868"/>'
        )
    elif locale == "fr":
        inner = (
            '<rect width="7" height="15" fill="#002395"/>'
            '<rect x="7" width="7" height="15" fill="#fff"/>'
            '<rect x="14" width="7" height="15" fill="#ED2939"/>'
        )
    elif locale == "pt":
        inner = (
            '<rect width="21" height="15" fill="#009B3A"/>'
            '<polygon points="10.5,1.6 18.6,7.5 10.5,13.4 2.4,7.5" fill="#FEDD00"/>'
            '<circle cx="10.5" cy="7.5" r="3.1" fill="#002776"/>'
        )
    else:
        inner = (
            '<rect width="21" height="15" fill="#DE2910"/>'
            '<polygon points="4.2,3.2 4.9,5.3 7.1,5.3 5.3,6.6 6,8.7 4.2,7.4 2.4,8.7 3.1,6.6 1.3,5.3 3.5,5.3" fill="#FFDE00"/>'
        )
    return f'<svg viewBox="0 0 21 15" width="18" height="12" aria-hidden="true">{inner}</svg>'


def linkedin_icon() -> str:
    return (
        '<svg viewBox="0 0 24 24" class="icon" aria-hidden="true">'
        '<path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z"/>'
        "</svg>"
    )


def lang_switcher(locale: str, align: str = "down") -> str:
    items = []
    for code in LOCALES:
        current = " is-current" if code == locale else ""
        items.append(
            f'<li><a class="lang-link{current}" href="{path_for(code)}" hreflang="{code}">'
            f'<span class="flag">{flag_svg(code)}</span><span>{esc(LOCALE_NAMES[code])}</span></a></li>'
        )
    return (
        f'<details class="lang-switcher align-{align}">'
        f'<summary aria-label="{esc(LOCALE_NAMES[locale])}">'
        f'<span class="flag">{flag_svg(locale)}</span><span class="caret">▾</span></summary>'
        f'<ul>{"".join(items)}</ul></details>'
    )


def frame(photo_class: str, alt: str, caption: str = "", extra_class: str = "") -> str:
    cap = f"<figcaption><span>{esc(caption)}</span></figcaption>" if caption else ""
    return (
        f'<figure class="editorial-frame {photo_class} {extra_class}" role="img" aria-label="{esc(alt)}">'
        f"{cap}</figure>"
    )


def page_html(locale: str, dicts: dict, photos: dict[str, str]) -> str:
    d = dicts[locale]
    zh_class = " is-zh" if locale == "zh" else ""
    nav = "".join(
        f'<a href="#{section_id}">{esc(d["nav"][key])}</a>' for section_id, key in SECTIONS
    )
    mobile_nav = "".join(
        f'<a href="#{section_id}">{esc(d["nav"][key])}</a>' for section_id, key in SECTIONS
    )
    pillars = "".join(
        f'<div><p class="kicker">{esc(p["label"])}</p><p>{esc(p["text"])}</p></div>'
        for p in d["pillars"]
    )
    caps = "".join(
        f'<li><p class="num">{esc(item["num"])}</p><h3>{esc(item["title"])}</h3><p>{esc(item["text"])}</p></li>'
        for item in d["thesis"]["capabilities"]
    )
    stats = "".join(
        f'<div><p class="stat-value">{esc(stat["value"])}</p>'
        f'<p class="stat-label">{esc(stat["label"])}</p>'
        f'<p class="stat-detail">{esc(stat["detail"])}</p></div>'
        for stat in d["about"]["stats"]
    )
    people = []
    for person in d["team"]["people"]:
        pid = person["id"]
        people.append(
            "<li>"
            f'<span class="portrait portrait-{pid}" role="img" aria-label="{esc(person["name"])}"></span>'
            "<div>"
            '<div class="person-head">'
            f"<p class=\"person-name\">{esc(person['name'])}</p>"
            f'<a class="linkedin" href="{TEAM_LINKS[pid]}" target="_blank" rel="noopener noreferrer" '
            f'aria-label="{esc(d["team"]["linkedinLabel"])}, {esc(person["name"])}">{linkedin_icon()}</a>'
            "</div>"
            f'<p class="kicker person-role">{esc(person["role"])}</p>'
            f'<p class="person-bio">{esc(person["bio"])}</p>'
            "</div></li>"
        )
    sectors = "".join(f"<li>{esc(sector)}</li>" for sector in d["portfolio"]["sectors"])
    regions = "".join(
        f'<li><p class="region-name">{esc(region["name"])}</p><p class="region-places">{esc(region["places"])}</p></li>'
        for region in d["portfolio"]["regions"]
    )
    lead = (
        f'<p class="contact-lead">{esc(d["contact"]["lead"])}</p>' if d["contact"]["lead"] else ""
    )
    alts = [
        f'<link rel="alternate" hreflang="{HTML_LANG[code] if code != "es" else "es-MX"}" href="https://www.nahucapital.com{path_for(code)}" />'
        for code in LOCALES
    ]
    alts.append('<link rel="alternate" hreflang="es" href="https://www.nahucapital.com/" />')
    alts.append('<link rel="alternate" hreflang="x-default" href="https://www.nahucapital.com/" />')
    canonical = f"https://www.nahucapital.com{path_for(locale)}"

    return f"""<!DOCTYPE html>
<html lang="{HTML_LANG[locale]}" class="{zh_class.strip()}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{esc(d["meta"]["title"])}</title>
<meta name="description" content="{esc(d["meta"]["description"])}" />
<link rel="canonical" href="{canonical}" />
{"".join(alts)}
<meta property="og:title" content="{esc(d["meta"]["title"])}" />
<meta property="og:description" content="{esc(d["meta"]["description"])}" />
<meta property="og:url" content="{canonical}" />
<meta property="og:site_name" content="NAHU Capital" />
<meta property="og:type" content="website" />
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/favicon.png" type="image/png" />
<link rel="apple-touch-icon" href="/favicon.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Libre+Bodoni:wght@500&family=Montserrat:wght@400;500&family=Noto+Sans+SC:wght@400;500&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/styles.css" />
<link rel="stylesheet" href="/media.css" />
</head>
<body{ ' class="is-zh"' if locale == "zh" else "" }>
<header>
  <div class="wrap header-row">
    <a class="brand" href="{path_for(locale)}" aria-label="NAHU Capital"><span class="brand-logo"></span></a>
    <nav class="site-nav">{nav}</nav>
    <div class="header-tools">
      {lang_switcher(locale)}
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Menu"><span></span></button>
    </div>
  </div>
  <div id="mobile-nav" class="mobile-nav" hidden>{mobile_nav}</div>
</header>
<main>
  <section id="inicio">
    <div class="hero-grid">
      <div class="hero-copy wrap-left">
        <div>
          <p class="kicker">{esc(d["hero"]["kicker"])}</p>
          <h1>{esc(d["hero"]["title"])}</h1>
          <p class="lead">{esc(d["hero"]["lead"])}</p>
        </div>
        <div class="pillars">{pillars}</div>
      </div>
      {frame("photo-hero", d["media"]["heroAlt"], d["media"]["heroCaption"], "hero-frame")}
    </div>
  </section>

  <section id="tesis" class="band-navy">
    <div class="wrap principle">
      <p class="kicker">{esc(d["thesis"]["principleLabel"])}</p>
      <blockquote>{esc(d["thesis"]["principle"])}</blockquote>
    </div>
  </section>

  <section aria-label="{esc(d["media"]["projectsTitle"])}">
    <div class="wrap projects">
      <div class="projects-head">
        <div>
          <p class="kicker">{esc(d["media"]["projectsKicker"])}</p>
          <h2>{esc(d["media"]["projectsTitle"])}</h2>
        </div>
        <p class="muted">{esc(d["media"]["projectsLead"])}</p>
      </div>
      <div class="project-grid">
        {frame("photo-hospitality", d["media"]["hospitalityAlt"], d["media"]["hospitalityCaption"], "ratio")}
        {frame("photo-district", d["media"]["districtAlt"], d["media"]["districtCaption"], "ratio")}
        {frame("photo-datacenter", d["media"]["datacenterAlt"], d["media"]["datacenterCaption"], "ratio")}
      </div>
    </div>
  </section>

  <section>
    <div class="wrap thesis">
      <div class="thesis-head">
        <div>
          <p class="kicker">{esc(d["thesis"]["kicker"])}</p>
          <h2>{esc(d["thesis"]["title"])}</h2>
        </div>
        <p class="lead">{esc(d["thesis"]["intro"])}</p>
      </div>
      <ul class="capabilities">{caps}</ul>
    </div>
  </section>

  <section id="nosotros">
    <div class="wrap about">
      <p class="kicker">{esc(d["about"]["kicker"])}</p>
      <h2>{esc(d["about"]["title"])}</h2>
      <p class="lead">{esc(d["about"]["body"])}</p>
      <div class="stats">{stats}</div>
      <p class="disclaimer">{esc(d["about"]["disclaimer"])}</p>
    </div>
  </section>

  <section id="equipo">
    <div class="wrap team">
      <p class="kicker">{esc(d["team"]["kicker"])}</p>
      <h2>{esc(d["team"]["title"])}</h2>
      <ul class="people">{"".join(people)}</ul>
    </div>
  </section>

  <section id="portafolio">
    <div class="wrap portfolio">
      <div class="portfolio-head">
        <div>
          <p class="kicker">{esc(d["portfolio"]["kicker"])}</p>
          <h2>{esc(d["portfolio"]["title"])}</h2>
        </div>
        <p class="lead">{esc(d["portfolio"]["intro"])}</p>
      </div>
      <details class="sectors-menu">
        <summary><span class="kicker">{esc(d["portfolio"]["sectorsTitle"])}</span><span class="count">{len(d["portfolio"]["sectors"])}</span></summary>
        <ul class="sectors">{sectors}</ul>
      </details>
      <div class="reach">
        <p class="kicker">{esc(d["portfolio"]["reachTitle"])}</p>
        <p class="muted">{esc(d["portfolio"]["reachIntro"])}</p>
        <ul class="regions">{regions}</ul>
      </div>
    </div>
  </section>

  <section id="contacto">
    <div class="contact-grid">
      <div class="contact-panel">
        <input id="contact-toggle" type="checkbox" class="contact-toggle" />
        <div class="wrap-left contact-copy">
          <p class="kicker">{esc(d["contact"]["kicker"])}</p>
          <h2>{esc(d["contact"]["title"])}</h2>
          {lead}
          <label for="contact-toggle" class="contact-open">{esc(d["contact"]["open"])}</label>
        </div>
        <div class="contact-modal" role="dialog" aria-modal="true">
          <label for="contact-toggle" class="contact-modal-backdrop"></label>
          <form class="contact-modal-panel" action="/api/contact" method="post">
            <div class="form-head">
              <div>
                <p class="kicker">{esc(d["contact"]["kicker"])}</p>
                <p class="form-title">{esc(d["contact"]["formTitle"])}</p>
              </div>
              <label for="contact-toggle" class="contact-close">{esc(d["contact"]["close"])}</label>
            </div>
            <label class="field"><span>{esc(d["contact"]["fullName"])} *</span><input name="name" type="text" autocomplete="name" required minlength="2" maxlength="120" /></label>
            <label class="field"><span>{esc(d["contact"]["whatsapp"])} *</span><input name="whatsapp" type="tel" autocomplete="tel" required minlength="8" maxlength="40" /></label>
            <label class="field"><span>{esc(d["contact"]["email"])} *</span><input name="email" type="email" autocomplete="email" required maxlength="160" /></label>
            <label class="field"><span>{esc(d["contact"]["company"])} <em>{esc(d["contact"]["optional"])}</em></span><input name="company" type="text" autocomplete="organization" maxlength="160" /></label>
            <label class="field"><span>{esc(d["contact"]["message"])} *</span><textarea name="message" rows="5" required maxlength="4000"></textarea></label>
            <div class="hp" aria-hidden="true"><input name="hp" tabindex="-1" autocomplete="off" /></div>
            <p class="form-error" hidden>{esc(d["contact"]["error"])}</p>
            <button type="submit" data-idle="{esc(d["contact"]["submit"])}" data-sending="{esc(d["contact"]["submitting"])}" data-sent="{esc(d["contact"]["sent"])}">{esc(d["contact"]["submit"])}</button>
          </form>
        </div>
      </div>
      {frame("photo-hero photo-contact", d["media"]["contactAlt"], d["media"]["heroCaption"], "contact-frame")}
    </div>
  </section>
</main>
<footer>
  <div class="wrap footer-row">
    <span class="brand-logo-footer" role="img" aria-label="NAHU Capital"></span>
    <p class="rights">{esc(d["footer"]["rights"])}</p>
    <div class="footer-tools">
      <a class="linkedin" href="https://www.linkedin.com/company/nahucapital" target="_blank" rel="noopener noreferrer" aria-label="{esc(d["team"]["linkedinLabel"])}, NAHU Capital">{linkedin_icon()}</a>
      {lang_switcher(locale, "up")}
    </div>
  </div>
</footer>
<script src="/site.js"></script>
</body>
</html>
"""


STYLES = """
:root {
  --cream: #f3f0ea;
  --navy: #101722;
  --gold: #b08a57;
  --sans: "Montserrat", system-ui, sans-serif;
  --serif: "Libre Bodoni", "Times New Roman", serif;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 4.25rem; }
html, body { background: var(--cream); color: var(--navy); margin: 0; }
body { font-family: var(--sans); font-weight: 400; min-height: 100%; }
body.is-zh { font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei UI", sans-serif; }
::selection { background: color-mix(in srgb, var(--gold) 35%, transparent); color: var(--navy); }
h1, h2, h3, blockquote, .person-name, .stat-value, .region-name, .form-title, .count {
  font-family: var(--serif); font-weight: 500; letter-spacing: -0.02em;
}
body.is-zh h1, body.is-zh h2, body.is-zh h3, body.is-zh blockquote, body.is-zh .person-name {
  font-family: "Noto Sans SC", "PingFang SC", sans-serif; letter-spacing: 0;
}
a { color: inherit; text-decoration: none; }
.wrap { width: min(1220px, calc(100% - 2rem)); margin-inline: auto; }
.wrap-left { width: min(1220px, calc(100% - 2rem)); margin-inline: auto; }
.kicker {
  font-family: var(--sans); font-size: 0.72rem; font-weight: 500;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin: 0 0 0.85rem;
}
body.is-zh .kicker { letter-spacing: 0.12em; }
header { position: sticky; top: 0; z-index: 50; background: var(--cream); }
.header-row, .footer-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.header-row { padding: 0.85rem 0; }
.brand-logo { display: block; height: 2rem; width: auto; }
.brand-logo-footer { display: block; height: 2.5rem; width: auto; }
.site-nav { display: none; }
.site-nav a { font-size: 0.88rem; font-weight: 500; color: color-mix(in srgb, var(--navy) 80%, transparent); }
.site-nav a:hover { color: var(--navy); }
.header-tools, .footer-tools { display: flex; align-items: center; gap: 0.75rem; }
.menu-toggle { position: relative; width: 2.75rem; height: 2.75rem; border: 0; background: transparent; cursor: pointer; }
.menu-toggle span, .menu-toggle span:before, .menu-toggle span:after {
  position: absolute; left: 0.85rem; width: 1.25rem; height: 2px; background: var(--navy); content: "";
}
.menu-toggle span { top: 50%; }
.menu-toggle span:before { top: -5px; }
.menu-toggle span:after { top: 5px; }
.mobile-nav { display: flex; flex-direction: column; border-top: 1px solid color-mix(in srgb, var(--navy) 10%, transparent); }
.mobile-nav a { padding: 0.9rem 1rem; font-size: 1.1rem; }
.lang-switcher { position: relative; z-index: 60; }
.lang-switcher summary { list-style: none; display: flex; align-items: center; gap: 0.2rem; cursor: pointer; opacity: 0.55; }
.lang-switcher summary::-webkit-details-marker { display: none; }
.lang-switcher summary:hover { opacity: 1; }
.caret { font-size: 0.5rem; color: color-mix(in srgb, var(--navy) 45%, transparent); }
.flag { display: inline-flex; overflow: hidden; border-radius: 1px; box-shadow: 0 0 0 1px color-mix(in srgb, var(--navy) 10%, transparent); width: 18px; height: 12px; }
.lang-switcher ul {
  position: absolute; right: 0; min-width: 10.5rem; margin: 0; padding: 0.25rem 0;
  border: 1px solid color-mix(in srgb, var(--navy) 10%, transparent); background: var(--cream);
  box-shadow: 0 10px 28px rgba(16,23,34,0.1); list-style: none;
}
.align-down ul { top: 100%; margin-top: 0.4rem; }
.align-up ul { bottom: 100%; margin-bottom: 0.4rem; }
.lang-link { display: flex; align-items: center; gap: 0.6rem; padding: 0.4rem 0.65rem; font-size: 0.8rem; color: color-mix(in srgb, var(--navy) 60%, transparent); }
.lang-link.is-current, .lang-link:hover { color: var(--navy); background: color-mix(in srgb, var(--navy) 5%, transparent); }
.hero-grid { display: grid; }
.hero-copy { display: flex; flex-direction: column; justify-content: space-between; padding: 2.5rem 0; }
h1 { max-width: 16.5em; margin: 0; font-size: clamp(2.2rem, 8.4vw, 3.45rem); line-height: 1.2; text-wrap: pretty; }
.lead { max-width: 36rem; margin: 1.25rem 0 0; font-size: 0.98rem; line-height: 1.6; color: color-mix(in srgb, var(--navy) 65%, transparent); }
.pillars { display: grid; gap: 1.5rem; margin-top: 2.5rem; padding-top: 1.75rem; border-top: 1px solid color-mix(in srgb, var(--navy) 10%, transparent); }
.pillars p { margin: 0; font-size: 0.88rem; line-height: 1.55; color: color-mix(in srgb, var(--navy) 65%, transparent); }
.editorial-frame { position: relative; overflow: hidden; background: #101722; margin: 0; }
.editorial-frame > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; }
.editorial-frame > figcaption {
  pointer-events: none; position: absolute; inset-inline: 0; bottom: 0;
  background: linear-gradient(to top, rgb(16 23 34 / 0.75), transparent);
  padding: 3rem 0.875rem 0.75rem;
}
.editorial-frame > figcaption span {
  font-size: 0.62rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: rgb(243 240 234 / 0.9);
}
.hero-frame { height: min(58vw, 22rem); width: 100%; }
.band-navy { background: var(--navy); color: var(--cream); }
.principle { padding: 3.5rem 0; }
.principle blockquote { max-width: 48rem; margin: 0; font-size: clamp(1.35rem, 2.6vw, 2.15rem); line-height: 1.28; }
.projects, .thesis, .about, .team, .portfolio { padding: 2.75rem 0 3rem; }
.projects-head, .thesis-head, .portfolio-head { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1rem; align-items: end; }
h2 { margin: 0; font-size: clamp(1.45rem, 2.4vw, 2.35rem); line-height: 1.15; }
.muted { max-width: 22rem; margin: 0; font-size: 0.9rem; line-height: 1.6; color: color-mix(in srgb, var(--navy) 50%, transparent); }
.project-grid { display: grid; gap: 0.75rem; margin-top: 1.5rem; }
.ratio { aspect-ratio: 4 / 3; }
.capabilities { display: grid; gap: 2rem 3rem; margin: 2.5rem 0 0; padding: 2.5rem 0 0; border-top: 1px solid color-mix(in srgb, var(--navy) 10%, transparent); list-style: none; }
.capabilities li { margin: 0; padding-bottom: 1.5rem; border-bottom: 1px solid color-mix(in srgb, var(--navy) 8%, transparent); }
.num { margin: 0 0 0.35rem; font-family: var(--serif); color: var(--gold); font-size: 0.9rem; }
.capabilities h3 { margin: 0; font-size: 1.25rem; }
.capabilities p { max-width: 28rem; margin: 0.5rem 0 0; font-size: 0.9rem; line-height: 1.6; color: color-mix(in srgb, var(--navy) 60%, transparent); }
.about, .team, .portfolio, #nosotros, #equipo, #portafolio { border-top: 1px solid color-mix(in srgb, var(--navy) 8%, transparent); }
.stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem 1.25rem; margin-top: 2.5rem; padding: 1.5rem 0; border-top: 1px solid color-mix(in srgb, var(--navy) 10%, transparent); border-bottom: 1px solid color-mix(in srgb, var(--navy) 10%, transparent); }
.stat-value { margin: 0; font-size: clamp(1.45rem, 2.2vw, 1.95rem); line-height: 1; }
.stat-label { margin: 0.5rem 0 0; font-size: 0.62rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold); font-family: var(--sans); }
.stat-detail { margin: 0.4rem 0 0; font-size: 0.75rem; line-height: 1.45; color: color-mix(in srgb, var(--navy) 50%, transparent); }
.disclaimer { max-width: 40rem; margin: 0.75rem 0 0; font-size: 0.68rem; line-height: 1.5; color: color-mix(in srgb, var(--navy) 38%, transparent); font-style: italic; }
.people { display: grid; margin: 2rem 0 0; padding: 0; list-style: none; border-top: 1px solid color-mix(in srgb, var(--navy) 10%, transparent); border-bottom: 1px solid color-mix(in srgb, var(--navy) 10%, transparent); }
.people li { display: flex; gap: 1rem; padding: 1.25rem 0; border-bottom: 1px solid color-mix(in srgb, var(--navy) 8%, transparent); }
.people li:last-child { border-bottom: 0; }
.portrait { width: 5rem; height: 5rem; object-fit: cover; background: var(--navy); flex: 0 0 auto; }
.person-head { display: flex; align-items: center; gap: 0.6rem; }
.person-name { margin: 0; font-size: 1.15rem; line-height: 1.15; }
.person-role { margin: 0.5rem 0 0; font-size: 0.62rem; }
.person-bio { margin: 0.65rem 0 0; font-size: 0.88rem; line-height: 1.65; color: color-mix(in srgb, var(--navy) 65%, transparent); }
.linkedin { color: var(--gold); }
.linkedin:hover { color: var(--navy); }
.icon { width: 1rem; height: 1rem; display: block; }
.sectors-menu { margin-top: 2.5rem; }
.sectors-menu summary { display: flex; width: 100%; cursor: pointer; align-items: center; gap: 0.75rem; padding: 0.75rem 0; border-bottom: 1px solid color-mix(in srgb, var(--navy) 10%, transparent); list-style: none; }
.sectors-menu summary::-webkit-details-marker { display: none; }
.count { margin-left: auto; font-size: 1.1rem; color: color-mix(in srgb, var(--navy) 35%, transparent); }
.sectors { display: grid; margin: 0; padding: 0; list-style: none; border-bottom: 1px solid color-mix(in srgb, var(--navy) 10%, transparent); }
.sectors li { padding: 0.65rem 0; border-bottom: 1px solid color-mix(in srgb, var(--navy) 8%, transparent); font-size: 0.92rem; color: color-mix(in srgb, var(--navy) 80%, transparent); }
.reach { margin-top: 2.5rem; }
.regions { display: grid; gap: 1.25rem; margin: 2rem 0 0; padding: 0; list-style: none; }
.region-name { margin: 0; font-size: 1.05rem; }
.region-places { margin: 0.25rem 0 0; font-size: 0.8rem; line-height: 1.35; color: color-mix(in srgb, var(--navy) 50%, transparent); }
.contact-grid { display: grid; }
.contact-panel { position: relative; background: var(--navy); color: var(--cream); }
.contact-copy { padding: 2rem 0; }
.contact-copy h2 { max-width: 11.5em; color: var(--cream); font-size: clamp(1.45rem, 2.2vw, 2.05rem); }
.contact-lead { max-width: 24rem; color: rgb(243 240 234 / 0.65); }
.contact-toggle { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); border: 0; }
.contact-open {
  display: inline-flex; margin-top: 1.15rem; cursor: pointer; border: 1px solid color-mix(in srgb, var(--gold) 70%, transparent);
  padding: 0.55rem 0.95rem; font-size: 0.72rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold);
}
.contact-open:hover { background: var(--gold); color: var(--navy); }
.contact-modal { display: none; }
.contact-toggle:checked ~ .contact-modal {
  display: flex; position: fixed; inset: 0; z-index: 200; align-items: center; justify-content: center; padding: 0.75rem;
}
.contact-modal-backdrop { position: absolute; inset: 0; background: rgb(16 23 34 / 0.62); cursor: pointer; }
.contact-modal-panel {
  position: relative; z-index: 1; width: min(32rem, calc(100vw - 2rem)); max-height: min(90vh, 52rem);
  overflow: auto; background: var(--cream); color: var(--navy); padding: 1.5rem;
}
.form-head { display: flex; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem; }
.form-title { margin: 0; max-width: 22em; font-size: 1.35rem; line-height: 1.3; }
.contact-close { cursor: pointer; font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase; color: color-mix(in srgb, var(--navy) 45%, transparent); }
.field { display: block; margin-bottom: 1rem; }
.field span { display: flex; justify-content: space-between; font-size: 0.68rem; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold); }
.field em { font-style: normal; color: color-mix(in srgb, var(--navy) 40%, transparent); letter-spacing: 0; text-transform: none; }
.field input, .field textarea {
  width: 100%; border: 0; border-bottom: 1px solid color-mix(in srgb, var(--navy) 18%, transparent);
  background: transparent; padding: 0.55rem 0 0.45rem; font: inherit; font-size: 0.95rem; color: var(--navy); outline: none;
}
.field textarea { min-height: 7.5rem; resize: vertical; }
.field input:focus, .field textarea:focus { border-bottom-color: var(--gold); }
.hp { display: none; }
.form-error { font-size: 0.82rem; color: color-mix(in srgb, var(--navy) 70%, transparent); }
.contact-modal-panel button {
  width: 100%; margin-top: 1.25rem; border: 0; background: var(--navy); color: var(--cream);
  padding: 0.75rem 1.25rem; font-size: 0.72rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer;
}
.contact-frame { height: 13.5rem; width: 100%; }
footer { border-top: 1px solid color-mix(in srgb, var(--navy) 10%, transparent); }
.footer-row { padding: 2rem 0; }
.rights { margin: 0; font-size: 0.75rem; color: color-mix(in srgb, var(--navy) 40%, transparent); }
@media (min-width: 640px) {
  .pillars { grid-template-columns: repeat(3, 1fr); }
  .project-grid { grid-template-columns: repeat(3, 1fr); }
  .capabilities { grid-template-columns: 1fr 1fr; }
  .stats { grid-template-columns: repeat(3, 1fr); }
  .people { grid-template-columns: 1fr 1fr; }
  .people li:nth-child(odd) { padding-right: 2rem; }
  .people li:nth-child(even) { padding-left: 2rem; border-left: 1px solid color-mix(in srgb, var(--navy) 8%, transparent); }
  .people li:nth-last-child(-n+2) { border-bottom: 0; }
  .sectors { grid-template-columns: 1fr 1fr; gap: 0 2.5rem; }
  .regions { grid-template-columns: 1fr 1fr; }
  .footer-row { flex-direction: row; }
}
@media (min-width: 768px) {
  .brand-logo { height: 2.25rem; }
  .brand-logo-footer { height: 2.75rem; }
  .hero-frame { height: 28rem; }
  .portrait { width: 7rem; height: 7rem; }
  .contact-frame { height: 15.5rem; }
  .contact-modal-panel { padding: 2rem; }
}
@media (min-width: 1024px) {
  .site-nav { display: flex; align-items: center; gap: 2.25rem; }
  .menu-toggle, .mobile-nav { display: none !important; }
  .hero-grid { grid-template-columns: minmax(0,1.05fr) minmax(0,0.95fr); align-items: stretch; min-height: min(82svh, 740px); }
  .hero-copy, .contact-copy {
    width: auto; max-width: none; margin: 0;
    padding-left: max(2.5rem, calc((100vw - 1220px) / 2));
    padding-right: 2.5rem;
  }
  .hero-frame { height: min(82svh, 740px); }
  .stats { grid-template-columns: repeat(6, 1fr); }
  .sectors { grid-template-columns: 1fr 1fr 1fr; }
  .regions { grid-template-columns: repeat(5, 1fr); }
  .contact-grid { grid-template-columns: minmax(0,0.78fr) minmax(0,1.22fr); }
  .contact-copy { display: flex; flex-direction: column; justify-content: center; min-height: 17.5rem; }
  .contact-frame { height: 17.5rem; }
}
@media (max-width: 639px) {
  .footer-row { flex-direction: column; align-items: flex-start; }
}
"""

SITE_JS = """
(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#mobile-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.hasAttribute("hidden") === false;
      nav.toggleAttribute("hidden", open);
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const form = document.querySelector(".contact-modal-panel");
  if (!form) return;
  const button = form.querySelector("button[type=submit]");
  const error = form.querySelector(".form-error");
  const box = document.querySelector("#contact-toggle");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!button || button.disabled) return;
    const data = new FormData(form);
    button.disabled = true;
    button.textContent = button.dataset.sending || "…";
    if (error) error.hidden = true;
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
      button.textContent = button.dataset.sent || "OK";
      window.setTimeout(() => {
        form.reset();
        if (box) box.checked = false;
        button.disabled = false;
        button.textContent = button.dataset.idle || "Send";
      }, 1600);
    } catch {
      if (error) error.hidden = false;
      button.disabled = false;
      button.textContent = button.dataset.idle || "Send";
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && box && box.checked) box.checked = false;
  });
})();
"""

CONTACT_API = """
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

  const clean = (value, max) => String(value || "").replace(/\\s+/g, " ").trim().slice(0, max);
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
  const digits = whatsapp.replace(/\\D/g, "");
  const okPhone = digits.length >= 8 && digits.length <= 15;
  const okEmail = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
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
  ].join("\\n");

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
"""


def write_media_css(photos: dict[str, str]) -> str:
    return f"""
.brand-logo, .brand-logo-footer {{
  display: block;
  background: url("{photos["logo"]}") left center / contain no-repeat;
}}
.brand-logo {{ width: 9.6rem; height: 2rem; }}
.brand-logo-footer {{ width: 12rem; height: 2.5rem; }}
.photo-hero {{ background: #101722 url("{photos["hero"]}") center 46% / cover no-repeat; }}
.photo-contact {{ background-position: center 42%; }}
.photo-hospitality {{ background: #101722 url("{photos["hospitality"]}") center / cover no-repeat; }}
.photo-district {{ background: #101722 url("{photos["district"]}") center / cover no-repeat; }}
.photo-datacenter {{ background: #101722 url("{photos["datacenter"]}") center / cover no-repeat; }}
.portrait-juan {{ background: #101722 url("{photos["juan"]}") center / cover no-repeat; }}
.portrait-ana {{ background: #101722 url("{photos["ana"]}") center / cover no-repeat; }}
.portrait-patrick {{ background: #101722 url("{photos["patrick"]}") center / cover no-repeat; }}
.portrait-gregory {{ background: #101722 url("{photos["gregory"]}") center / cover no-repeat; }}
@media (min-width: 768px) {{
  .brand-logo {{ width: 10.8rem; height: 2.25rem; }}
  .brand-logo-footer {{ width: 13.2rem; height: 2.75rem; }}
}}
"""


def write_deploy_payload(files: list[tuple[str, str, str]]) -> None:
    payload = [
        {"file": name, "data": content, "encoding": encoding} for name, content, encoding in files
    ]
    out = Path("/tmp/nahu-static-payload.json")
    out.write_text(json.dumps(payload), encoding="utf-8")
    print(f"payload {out} bytes={out.stat().st_size} files={len(payload)}")
    for name, content, encoding in files:
        size = len(base64.b64decode(content)) if encoding == "base64" else len(content.encode())
        print(f"{size:7d}  {encoding:6s}  {name}")


def main() -> None:
    dicts = load_dictionaries()
    photos = {key: encode_photo(*spec) for key, spec in PHOTO_SPECS.items()}
    DIST.mkdir(parents=True, exist_ok=True)
    for locale in LOCALES[1:]:
        (DIST / locale).mkdir(parents=True, exist_ok=True)
    (DIST / "api").mkdir(parents=True, exist_ok=True)

    files: list[tuple[str, str, str]] = []
    pages = {
        "index.html": page_html("es", dicts, photos),
        "en/index.html": page_html("en", dicts, photos),
        "fr/index.html": page_html("fr", dicts, photos),
        "pt/index.html": page_html("pt", dicts, photos),
        "zh/index.html": page_html("zh", dicts, photos),
        "styles.css": STYLES.strip() + "\n",
        "media.css": write_media_css(photos).strip() + "\n",
        "site.js": SITE_JS.strip() + "\n",
        "api/contact.js": CONTACT_API.strip() + "\n",
        "robots.txt": "User-agent: *\nAllow: /\nSitemap: https://www.nahucapital.com/sitemap.xml\n",
        "sitemap.xml": (
            '<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
            + "".join(
                f"  <url><loc>https://www.nahucapital.com{path_for(code)}</loc></url>\n"
                for code in LOCALES
            )
            + "</urlset>\n"
        ),
        "vercel.json": json.dumps({"cleanUrls": True}, indent=2) + "\n",
    }

    for name, content in pages.items():
        dest = DIST / name
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(content, encoding="utf-8")
        files.append((name, content, "utf-8"))

    favicon_png = (ROOT / "public" / "favicon.png").read_bytes()
    (DIST / "favicon.png").write_bytes(favicon_png)
    files.append(("favicon.png", base64.b64encode(favicon_png).decode("ascii"), "base64"))
    favicon_ico = (ROOT / "public" / "favicon.ico").read_bytes()
    (DIST / "favicon.ico").write_bytes(favicon_ico)
    files.append(("favicon.ico", base64.b64encode(favicon_ico).decode("ascii"), "base64"))

    write_deploy_payload(files)
    print("READY", DIST)


if __name__ == "__main__":
    main()
