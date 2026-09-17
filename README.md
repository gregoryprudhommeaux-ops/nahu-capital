# NAHU Capital

Site institutionnel. Une page, cinq langues. Pas d’application, pas de compte, pas de CMS.

Langue par défaut : espagnol mexicain. Autres : `/en`, `/fr`, `/pt`, `/zh`.

Production : [https://www.nahucapital.com](https://www.nahucapital.com) · [https://nahu-capital.vercel.app](https://nahu-capital.vercel.app)

## Pourquoi ce site est statique

Le one-pager Next.js se construisait bien en local. Il n’arrivait pas en production : le déploiement Vercel fichier par fichier omettait les photographies (payload trop lourd, arbre Next incomplet). Les pages live citaient `/editorial/hero-cdmx.jpg` et les portraits, tous en 404.

Les photos sont donc **préparées d’abord** (redimensionnées, WebP), puis **intégrées dans `media.css`** en data URI. Plus de JPEG séparés à uploader. Vercel ne fait plus de build Next : il sert les fichiers de `dist/`.

## Local

```bash
python3 scripts/build-static.py
python3 -m http.server 4340 --bind 0.0.0.0 --directory dist
```

Ou `npm run dev`. Le serveur écoute sur le port 4340.

Les textes restent dans `src/lib/copy.ts`. Relancer le script après toute modification de copie ou de photo.

## Contenu

Les textes viennent du profil institutionnel 2026. Les chiffres d’expérience sont ceux des associés fondateurs, pas des AUM du groupe.

Le bandeau Contact ouvre un formulaire (nom, WhatsApp, e-mail, entreprise/projet, message). Destination : `gregory.prudhommeaux@gmail.com`.

Pour l’envoi réel sur Vercel, renseigner `RESEND_API_KEY` (et optionnellement `RESEND_FROM`) dans le projet. Sans clé, l’envoi échoue.

Identité : fond `#F3F0EA`, marine `#101722`, or `#B08A57`. Titres : Libre Bodoni. Corps : Montserrat.

La photographie d’ouverture est Mexico au soleil couchant (Bellas Artes, cathédrale, volcans). Les autres images sont des illustrations éditoriales, pas des actifs nominatifs.
