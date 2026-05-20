# Khan Kluay — Template Analysis

## Brand
- **Khan Kluay** — Restaurant Thaï Halal, Paris 11e
- Concept: "Cantine Authentique", fusion Paris × Bangkok
- Adresse: 12 Rue de la Gastronomie Thaï, 75011 Paris (variante "123 Rue de la Soie")
- Téléphone: 01 23 45 67 89
- Storytelling: éléphant bleu légendaire de Thaïlande (Isan), depuis 1984
- USP: 100% Halal, fait maison, herbes importées d'Isan
- Catchphrases: "C'est frais, c'est bon, c'est ici." / "La cuisine est le langage du cœur." / "L'esprit de Bangkok, le cœur de Paris."

## Pages

### 1. Accueil (Desktop 1280)
- Header / TopAppBar Shell
- Main:
  - **Hero Bento** — Main Story Card (820w, fill #f5f3ef, radius 12, padding 80) + side cards
    - Eyebrow: PARIS X BANGKOK
    - Title: La Cantine Authentique
    - Body: "Khan Kluay fusionne l'énergie vibrante..."
    - CTAs: Explorer la Carte / Réserver une Table
    - Side: SIGNATURE — Pad Thaï Royal
  - **Quick Access / Categories** — Entrées (12), Currys (8), Desserts (5), Boissons (10)
  - **Family Roots (Asymmetric)** — L'Héritage de Grand-Mère + quote + badges (100% HALAL, Fait Maison QUOTIDIEN)
- FAB Panier (56)
- Footer — Khan Kluay tagline + Horaires + Contact

### 2. La Carte (Mobile 390)
- Header / TopAppBar
- Hero: "La Carte du Chef" + intro
- Sections menu (Bento Grid):
  - **Entrées**: Rouleaux de Printemps Frais (9.50€) [Végétarien], Chicken Satay 4pcs (11€), Tom Yum Goong (12.50€), Salade Som Tum (10€)
  - **Plats Signature**: Pad Thai Tradition (16.50€) [POPULAIRE, SANS GLUTEN], Gaeng Keow Wan (17€) [Pimenté, HALAL CERTIFIÉ], Massaman Boeuf (18.50€) [FAVORI DU CHEF]
  - **Desserts**: Mango Sticky Rice (8.50€), Perles de Coco (7€)
  - **Boissons**: Thai Milk Tea (5.50€), Singha 0.0% (5€), Citronnade Maison Gingembre (6€), Eau de Coco Fraîche (6.50€)
- Floating Basket Button
- BottomNavBar (Accueil / La Carte / Réserver / Histoire)

### 3. Notre Histoire (Mobile 390)
- Header
- Main:
  - **Hero Narrative** — NOTRE ORIGINE / "L'héritage d'une terre rouge." / récit Isan / CTA Découvrir la Carte
  - **Bento Storytelling** — DEPUIS 1984 / "La cuisine est le langage du cœur." / Pourquoi Khan Kluay? (l'éléphant bleu) / 100% Frais / De Bangkok à Paris / Le geste ancestral
  - **Values** — Nos piliers culinaires: Respect du Produit, Énergie Urbaine, Hospitalité Isan
- FAB
- BottomNavBar

### 4. Réserver (Mobile 390)
- Header
- Main:
  - **Reservation Form Column** (350w, fill #fff, radius 12, padding 23/24/40/24, gap 48)
    - Date (mm/dd/yyyy), Heure (12:00 default), Nombre de personnes (1-6+)
    - Nom complet, Téléphone, Notes spéciales (allergies, anniversaire)
    - CTA: Confirmer la réservation
  - **Info Column (Bento)** — Khan Kluay Paris / adresse / tél / Horaires (Lun-Ven 12-14:30 / 19-22:30, Sam 12-23, Dim fermé)
- BottomNavBar

## Design Tokens

### Couleurs
| Token | Hex | Usage |
|---|---|---|
| `--c-bg` | `#fbf9f5` | Background warm cream |
| `--c-surface` | `#f5f3ef` | Card surfaces |
| `--c-surface-tint` | `#dec0b9` | Tinted surface (warm taupe) |
| `--c-ink` | `#1b1c1a` | Headings strong |
| `--c-ink-soft` | `#57423d` | Body text (brun) — MOST USED |
| `--c-brick` | `#8c2d14` | Brand accent (rouge brique) |
| `--c-brick-dark` | `#83260e` | Brick hover/dark |
| `--c-olive` | `#4a6f14` | Secondary accent (vert olive) |
| `--c-olive-dark` | `#45680d` | Olive label |
| `--c-lime` | `#c4f187` | Accent highlight |
| `--c-divider` | `#e4e2de` | Borders/dividers |
| `--c-muted` | `#6b7280` | Muted text |
| `--c-paper` | `#efeeea` | Paper bg |

### Typographie
- **Display/Heading**: `Epilogue` (800 weight, letter-spacing -0.025em on large)
- **Body/UI**: `Be Vietnam Pro` (regular/medium, letter-spacing 0.1em on eyebrows)

### Layout
- Bento (asymmetric cards), corner-radius 12
- Section padding 80px (desktop), 24-32px (mobile)
- Gap 48px between sections
- Container max-width 1280px

## Inventaire (recursive)
- 397 frames, 149 textes, 47 paths, 27 rectangles, 15 images (vides), 15 shadows
- 86 noms de frames uniques

## Assets manquants
Toutes les URL d'images sont vides dans le template — il faut sourcer:
- 1 hero/signature dish (Pad Thaï Royal)
- 4 illustrations catégories
- 9 photos plats du menu
- 1 photo "Grand-Mère / Famille"
- 1 photo "Bangkok street / Paris bistrot"
- 1 logo éléphant bleu
