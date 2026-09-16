# NAHU Capital

Site institutionnel de [nahucapital.com](https://nahucapital.com). Une page, cinq langues. Pas d’application, pas de compte, pas de CMS.

Langue par défaut : espagnol mexicain. Autres : anglais (`/en`), français (`/fr`), portugais (`/pt`), chinois (`/zh`).

## Local

```bash
npm install
npm run dev
```

Le serveur écoute par défaut sur le port 3000. Pour un port précis :

```bash
npx next dev -p 4321 -H 0.0.0.0
```

Build de production :

```bash
npm run build
npm start
```

## Contenu

Les textes viennent du profil institutionnel 2026. Les chiffres d’expérience sont ceux des associés fondateurs, pas des AUM du groupe. Un seul nom de contact est publié : Juan Balbontin.

Identité : fond `#F3F0EA`, marine `#101722`, or `#B08A57`. Titres : Libre Bodoni. Corps : Montserrat.

Les photographies sont des illustrations éditoriales. Elles ne représentent pas des actifs nominatifs du groupe.

Sujets : hôtellerie, quartiers (dont Santa Fe, Mexico), data centers, grands axes urbains (Reforma, La Défense). Sources : Pexels ; Wikimedia Commons (Santa Fe, CC0 ; La Défense, CC BY 4.0 Gugalcrom123 ; campus data center, CC BY-SA 4.0 Choinowski).

La carte du monde reprend un fond Wikimedia (*World map — low resolution*). Les pays en or sont uniquement ceux cités dans le profil : pas d’autres géographies ajoutées.

## Agents

Les skills personnelles sont dans `.cursor/skills/` (Sofia, Lucy, Charles, Mike, Jerry, anti-slop). Dis « Utilise Sofia » (ou Lucy / Charles / Mike / Jerry) pour les invoquer. Toute copie marketing passe par `/anti-linkedin-slop`.
