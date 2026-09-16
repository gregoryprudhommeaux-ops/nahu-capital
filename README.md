# NAHU Capital

Site institutionnel de [nahucapital.com](https://nahucapital.com). Une page, cinq langues. Pas d’application, pas de compte, pas de CMS.

Langue par défaut : espagnol mexicain. Autres : anglais (`/en`), français (`/fr`), portugais (`/pt`), chinois (`/zh`).

## Local

```bash
npm install
npm run dev
```

Le serveur écoute sur le port 4321 (`npm run dev`).

Build de production :

```bash
npm run build
npm start
```

## Contenu

Les textes viennent du profil institutionnel 2026. Les chiffres d’expérience sont ceux des associés fondateurs, pas des AUM du groupe.

Le bandeau Contact ouvre un formulaire (nom, WhatsApp, e-mail, entreprise/projet, message). La destination est `gregory.prudhommeaux@gmail.com`.

Pour l’envoi réel, copier `.env.example` vers `.env.local` et renseigner `RESEND_API_KEY` (compte Resend gratuit, inscrit avec cette adresse Gmail). Sans clé, en `next dev` le formulaire valide et affiche « Envoyé » ; le message est loggé côté serveur. En production sans clé, l’envoi échoue.

Identité : fond `#F3F0EA`, marine `#101722`, or `#B08A57`. Titres : Libre Bodoni. Corps : Montserrat. Les logos du header et du footer sont des SVG vectorisés à fond transparent.

Les photographies sont des illustrations éditoriales. Elles ne représentent pas des actifs nominatifs du groupe.

Sujets : hôtellerie, quartiers (Andares / Puerta de Hierro, Zapopan), data centers, grands axes urbains (Reforma, La Défense). Le bandeau Contact montre l’Ángel de la Independencia sur Reforma. Sources : Pexels ; Wikimedia Commons (Andares, CC BY-SA 4.0 Isacdaavid ; La Défense, CC BY 4.0 Gugalcrom123 ; campus data center, CC BY-SA 4.0 Choinowski).

La carte du monde reprend un fond Wikimedia (*World map — low resolution*). Les pays en or sont uniquement ceux cités dans le profil : pas d’autres géographies ajoutées.

## Agents

Les skills personnelles sont dans `.cursor/skills/` (Sofia, Lucy, Charles, Mike, Jerry, anti-slop). Dis « Utilise Sofia » (ou Lucy / Charles / Mike / Jerry) pour les invoquer. Toute copie marketing passe par `/anti-linkedin-slop`.
