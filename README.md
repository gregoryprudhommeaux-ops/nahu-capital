# NAHU Capital

Site institutionnel. Une page, cinq langues. Pas d’application, pas de compte, pas de CMS.

Langue par défaut : espagnol mexicain. Autres : `/en`, `/fr`, `/pt`, `/zh`.

Production : [https://nahu-capital.vercel.app](https://nahu-capital.vercel.app)

## Local

```bash
npm install
npm run dev
```

Le serveur écoute sur le port 4321.

```bash
npm run build
npm start
```

## Structure

Arbre volontairement court pour un déploiement Vercel fiable :

- `src/app/page.tsx` — page d’accueil ES
- `src/app/[locale]/page.tsx` — EN / FR / PT / ZH
- `src/components/site.tsx` — une page
- `src/components/contact-panel.tsx` — formulaire
- `src/lib/copy.ts` — toutes les langues
- `src/app/api/contact/route.ts` — envoi du message
- `public/` — logo, hero CDMX, trois illustrations, portraits

Pas de middleware, pas de CMS, pas de dossier `i18n` éclaté.

## Contenu

Les textes viennent du profil institutionnel 2026. Les chiffres d’expérience sont ceux des associés fondateurs, pas des AUM du groupe.

Le bandeau Contact ouvre un formulaire (nom, WhatsApp, e-mail, entreprise/projet, message). Destination : `gregory.prudhommeaux@gmail.com`.

Pour l’envoi réel, copier `.env.example` vers `.env.local` et renseigner `RESEND_API_KEY`. Sans clé, en `next dev` le message est loggé ; en production sans clé, l’envoi échoue.

Identité : fond `#F3F0EA`, marine `#101722`, or `#B08A57`. Titres : Libre Bodoni. Corps : Montserrat.

La photographie d’ouverture est une vue de Mexico au soleil couchant. Les autres images sont des illustrations éditoriales, pas des actifs nominatifs.

## Agents

Les skills personnelles sont dans `.cursor/skills/`. Toute copie marketing passe par `/anti-linkedin-slop`.
