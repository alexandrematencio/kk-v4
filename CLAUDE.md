# Khan Kluay — Project Guide

> Site vitrine pour **Khan Kluay**, cantine Thaï Halal à Paris (11ème). Construit à partir du mockup Penpot `template.pen`.

## ⚠️ Règles non-négociables

1. **Stack imposée par le client** : Nuxt 4 + **Nuxt Content** (mandatoire pour gérer TOUT le contenu éditorial).
2. **Tout texte affiché vient de `content/`** — jamais de hardcode dans les `.vue`. Les composants prennent leurs textes en props ou via `queryCollection()`.
3. **Tokens de design** : couleurs, typo, radius, fonts → définis **une seule fois** dans `app/assets/css/main.css` via `@theme`. Ne pas dupliquer en valeurs littérales dans les composants ; utiliser les classes Tailwind générées (`bg-brick`, `text-ink-soft`, etc.).
4. **Pas de duplication du contenu** entre `content/` et les `.vue`. Si une donnée change, elle change à un seul endroit.
5. **Mobile + desktop** : le template original mélange mockups 1280 (Accueil) et 390 (Carte / Histoire / Réserver). Le site final est **un seul site responsive**, pas 2 builds séparés.

## Stack

| Technologie | Version | Rôle |
|---|---|---|
| Nuxt | ^4.0 | Framework SSR/SSG (App Router, srcDir `app/`) |
| @nuxt/content | ^3.0 | **CMS fichier — source de vérité de tout le contenu** |
| @tailwindcss/vite | ^4.0 | Tailwind v4 (config via `@theme` en CSS, pas de `tailwind.config.js`) |
| @nuxtjs/google-fonts | ^3.2 | Auto-import & préchargement `Epilogue` + `Be Vietnam Pro` |
| better-sqlite3 | ^12 | Requis par Nuxt Content (DB locale pour queryCollection) |

Node 24, npm 11.


## Démarrage

```bash
npm install
npm run dev          # http://localhost:3000 (ou 3002 si déjà occupé)
npm run build        # build prod
npm run generate     # SSG (statique)
npm run preview      # preview build
```

## Structure

```
khan-kluay-stitch/
├── template.pen              # Mockup Penpot source (référence, NE PAS MODIFIER)
├── _analysis/                # Analyse du template (synthesis.md, text-by-page.json)
├── nuxt.config.ts
├── content.config.ts         # Schémas Nuxt Content (zod)
├── app/
│   ├── app.vue
│   ├── assets/css/main.css   # ⭐ Design tokens via @theme
│   ├── layouts/default.vue   # Header + slot + Footer + BottomNav + FAB
│   ├── components/           # Auto-importés (AppHeader, MenuItem, BadgePill…)
│   └── pages/
│       ├── index.vue         # Accueil
│       ├── carte.vue         # La Carte
│       ├── histoire.vue      # Notre Histoire
│       └── reserver.vue      # Réserver
├── content/                  # ⭐ Source de vérité du contenu
│   ├── site/info.yml         # Brand, adresse, horaires, contact
│   ├── pages/
│   │   ├── home.yml          # Tous les textes de l'Accueil
│   │   ├── story.yml         # Notre Histoire
│   │   └── booking.yml       # Réserver
│   ├── menu-categories.yml   # Catégories de la carte
│   └── menu/*.yml            # 1 fichier YAML par plat (slug, prix, badges…)
└── public/                   # Assets statiques (images à venir)
```

## Nuxt Content — schéma & utilisation

Tous les schémas sont définis dans `content.config.ts` (validation Zod stricte) :

| Collection | Type | Source | Contient |
|---|---|---|---|
| `site` | data | `site/info.yml` | Nom, tagline, adresse, tél, horaires |
| `home` | data | `pages/home.yml` | Hero, signature, catégories, héritage |
| `story` | data | `pages/story.yml` | Hero, bento storytelling, piliers |
| `booking` | data | `pages/booking.yml` | Form labels, horaires, info pratique |
| `categories` | data | `menu-categories.yml` | Catégories de la carte (slug, label, ordre) |
| `menu` | data | `menu/*.yml` | Plats : slug, titre, catégorie, prix, badges, description |

### Lire le contenu dans une page

```ts
// Singleton
const { data: home } = await useAsyncData('page-home', () =>
  queryCollection('home').first()
)

// Liste ordonnée
const { data: items } = await useAsyncData('menu-items', () =>
  queryCollection('menu').order('order', 'ASC').all()
)
```

### Ajouter un plat au menu

1. Créer `content/menu/14-mon-plat.yml` :
   ```yaml
   slug: mon-plat
   title: Nom du Plat
   category: plats      # entrees | plats | desserts | boissons
   price: 14.5
   order: 4
   badges:
     - POPULAIRE
   description: |
     Description courte du plat.
   ```
2. Sauvegarder → hot reload, le plat apparaît automatiquement dans `/carte`.

### Changer une horaire / l'adresse

Modifier `content/site/info.yml` — propagé partout (Header, Footer, page Réserver).

## Design system (extrait de template.pen)

### Couleurs (`@theme` → classes Tailwind)
| Token | Hex | Classes Tailwind générées |
|---|---|---|
| `--color-bg` | `#fbf9f5` | `bg-bg`, `text-bg` |
| `--color-surface` | `#f5f3ef` | `bg-surface` |
| `--color-paper` | `#efeeea` | `bg-paper` |
| `--color-surface-tint` | `#dec0b9` | `bg-surface-tint` |
| `--color-divider` | `#e4e2de` | `border-divider` |
| `--color-ink` | `#1b1c1a` | `text-ink` (titres) |
| `--color-ink-soft` | `#57423d` | `text-ink-soft` (corps — couleur la + utilisée) |
| `--color-brick` | `#8c2d14` | `bg-brick`, `text-brick` (accent marque) |
| `--color-brick-dark` | `#83260e` | hover/dark variant |
| `--color-olive` | `#4a6f14` | `text-olive` (accent secondaire) |
| `--color-olive-dark` | `#45680d` | eyebrows |
| `--color-lime` | `#c4f187` | accent highlight |
| `--color-muted` | `#6b7280` | `text-muted` |

### Typographie
- **Display / titres** : `Epilogue` (800 weight, `letter-spacing: -0.025em`) — classes : `font-display`
- **Corps / UI** : `Be Vietnam Pro` — classes : `font-sans` (defaut)
- **Eyebrow** : classe utilitaire `.eyebrow` (Be Vietnam Pro, olive, uppercase, tracking 0.1em)

### Composants utilitaires CSS
- `.btn-primary` — bouton brick rond
- `.btn-secondary` — bouton outline ink
- `.card` — carte surface arrondie (radius 12px, border tinted)
- `.eyebrow` — label de section
- `.container-content` — max 1280px centré

## Composants auto-importés

| Composant | Usage |
|---|---|
| `AppHeader` | TopAppBar sticky, prend `:site` en prop |
| `AppFooter` | Footer 3 colonnes (brand, horaires, contact) |
| `BottomNav` | Nav mobile fixe en bas (md:hidden) |
| `FabPanier` | Bouton flottant panier |
| `MenuItem` | Carte d'un plat (titre, prix, desc, badges) |
| `CategoryCard` | Vignette catégorie (Accueil) |
| `BadgePill` | Pastille badge auto-tonée (olive/brick/neutral selon le label) |

## Pages

| Route | Fichier | Contenu source |
|---|---|---|
| `/` | `app/pages/index.vue` | `home` + `site` |
| `/carte` | `app/pages/carte.vue` | `menu` + `categories` |
| `/histoire` | `app/pages/histoire.vue` | `story` |
| `/reserver` | `app/pages/reserver.vue` | `booking` + form local (pas encore d'API) |

## TODO connus

1. **Images** : toutes les URL d'images sont vides dans `template.pen`. Sourcer 1 hero, 1 photo Pad Thaï, 4 vignettes catégories, 9 photos plats, 1 photo "famille Isan". Stocker dans `public/img/` puis référencer via les YAML (`image: /img/pad-thai.jpg`).
2. **Form de réservation** : pour l'instant `onSubmit` est un mock (state local). À brancher sur un endpoint serveur Nitro (`server/api/booking.post.ts`) + email transactionnel.
3. **Panier** : le bouton 🛒 et le badge `2` sont décoratifs. À implémenter avec un store (Pinia) si commande en ligne souhaitée.
4. **i18n** : prévoir EN/TH si demandé (Nuxt Content supporte les variantes par locale).
5. **Animations** : le brief du template suggère un esprit "bento éditorial". Possibilité d'ajouter GSAP + ScrollTrigger via le boilerplate `creative-web` si besoin de scroll-driven animations.

## Workflow type

> **Le client veut changer le prix du Pad Thaï à 17€** :
> → modifier `content/menu/05-pad-thai-tradition.yml`, ligne `price: 17.0` → save → reload. C'est tout.

> **Ajouter un plat "Curry Rouge Crevettes" à 19€** :
> → créer `content/menu/14-curry-rouge.yml` avec la frontmatter complète → save → reload.

> **Changer l'adresse du restaurant** :
> → modifier `content/site/info.yml` → propagé partout.

> **Changer la couleur d'accent rouge** :
> → modifier `--color-brick` dans `app/assets/css/main.css` → recompile.

## Référence template

`template.pen` est le mockup Penpot d'origine — fichier JSON v2.11 contenant 4 frames (pages), 397 frames, 149 textes. Les analyses détaillées sont dans `_analysis/synthesis.md` et `_analysis/text-by-page.json`.
