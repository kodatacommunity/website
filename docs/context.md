# Kodata — Contexte du site web

## Identité visuelle (basée sur template.html)

### Style général
- **Esthétique** : Brutalist / rétro, moderne et tech
- **Police** : JetBrains Mono (monospace) — renforce l'identité "data / code"
- **Fond principal** : `#efeadd` (crème)
- **Texte principal** : `#2d3235` (noir charbon)

### Palette de couleurs
| Rôle | Couleur | Code hex |
|---|---|---|
| Accent primaire (rouge brique) | Rouge Kodata | `#c24b46` |
| Accent secondaire (orange) | Orange chaleur | `#d67035` |
| Accent tertiaire (jaune) | Jaune highlight | `#e8b056` |
| Fond sombre / CTA | Charbon | `#2d3235` |
| Fond clair | Crème | `#efeadd` |
| Vert (validation, succès) | Vert action | `#1d8f6d` |
| Texte secondaire | Gris | `#5a5f63` |

### Éléments UI récurrents
- **Bandes colorées** en haut de page (rouge → orange → jaune → charbon)
- **Ombres dures** (`box-shadow: 5px 5px 0px 0px #2d3235`) sur les cartes et boutons
- **Bordures épaisses** (`border-2 border-[#2d3235]`) sur tous les éléments interactifs
- **Hover effect** : légère translation `(2px, 2px)` avec réduction de l'ombre
- **Icônes** : Lucide Icons

---

## Navigation

```
Kodata:  |  Accueil  À propos  Le Board  Projets  Événements  Partenaires  [ Rejoindre ]
```

- **Logo** : `Kodata:` — avec les deux points comme signature (couleur `#c24b46`, ombre portée)
- **CTA Nav** : "Rejoindre" — fond `#2d3235`, texte crème, style retro-shadow-hover

---

## Structure des pages

---

### 1. Page Accueil (`/`)

#### Bandes décoratives (haut de page)
Identiques au template : 4 bandes horizontales rouge → orange → jaune → charbon

#### Section Hero (2 colonnes)
**Colonne gauche (texte) :**
- Badge : `[ Communauté data · Madagascar ]` — fond `#e8b056`
- Titre principal :
  > La communauté où les **passionnés de la data** se connectent et grandissent ensemble.
- Sous-titre :
  > Kodata: réunit data analysts, data engineers, data scientists et curieux du numérique autour de discussions, d'événements et de projets collaboratifs — à Madagascar et au-delà.
- CTA primaire : **"Rejoindre la communauté"** (vert `#1d8f6d`, retro-shadow-hard)
- CTA secondaire : **"Découvrir nos projets"** (transparent, bordure `#2d3235`)
- Note : `Gratuit · Ouvert à tous les passionnés de data`

**Colonne droite (visuel) :**
- Carte stylisée façon "terminal / dashboard" simulant une interface de communauté :
  - Pseudo-terminal avec tags : `#data-mada`, `#analytics`, `#open-data`
  - Compteurs : `42 membres actifs · 8 projets · 12 événements`
  - Avatar grid symbolisant la communauté

#### Bande Feature Strip (fond blanc, bordures haut/bas)
Trois valeurs clés avec icônes :
- `<users>` **Communauté active**
- `<calendar>` **Événements réguliers**
- `<git-branch>` **Projets collaboratifs**

#### Section Piliers (3 cartes)
Titre : **Pourquoi rejoindre Kodata: ?**
Sous-titre : *Une communauté née du réseau RLC Madagascar, pour transformer la culture data à Madagascar.*

| Carte | Icône | Couleur icône | Titre | Description |
|---|---|---|---|---|
| 1 | `message-circle` | `#c24b46` | Discussions | Échangez sur les meilleures pratiques, les outils, les tendances data avec des pairs qui partagent vos passions. |
| 2 | `calendar` | `#e8b056` | Événements | Participez à des meetups, workshops, hackathons et conférences organisés par et pour la communauté. |
| 3 | `git-branch` | `#1d8f6d` | Projets collaboratifs | Contribuez à des projets data concrets qui ont un impact réel sur le développement de Madagascar. |

#### Section À propos / Origine (fond sombre `#2d3235`)
Titre : **Née du RLC Madagascar, portée par la data.**
Texte :
> Kodata: est une initiative des alumnis du **RLC Madagascar Chapter** (Réseau de Leaders Connectés), un réseau de leaders engagés dans le développement de Madagascar.
> Partageant la conviction que la maîtrise de la data est un levier de transformation, ils ont créé Kodata: pour fédérer tous les passionnés — quel que soit leur niveau ou leur secteur.

Étapes de parcours (style workflow) :
1. `#c24b46` — **Rejoindre** — Créez votre profil et intégrez les canaux de discussion
2. `#d67035` — **Apprendre** — Accédez aux ressources, événements et retours d'expérience
3. `#e8b056` — **Contribuer** — Lancez ou rejoignez un projet, mentorer d'autres membres

#### Section CTA finale (centré)
Titre : **Prêt à rejoindre l'aventure data à Madagascar ?**
Sous-titre : *L'adhésion est gratuite. La communauté vous attend.*
- Bouton principal : **"Créer mon compte"** (vert)
- Bouton secondaire : **"En savoir plus"** (contour)

---

### 2. Page À propos (`/a-propos`)

#### Hero
- Titre : **Qui sommes-nous ?**
- Texte : Histoire de Kodata:, sa mission, sa vision, ses valeurs
- Illustration : Timeline ou carte avec points symbolisant la communauté

#### Mission & Vision
- **Mission** : Créer un espace inclusif où les passionnés de la data à Madagascar et dans la diaspora peuvent apprendre, partager et collaborer.
- **Vision** : Faire de Madagascar un acteur de l'économie de la donnée en Afrique.

#### Valeurs (3-4 cartes)
- Ouverture
- Collaboration
- Excellence
- Impact

#### Origine RLC
- Explication du lien avec le RLC Madagascar Chapter
- Citation d'un fondateur

---

### 3. Page Le Board (`/board`)

#### Hero
- Titre : **Le Board de Kodata:**
- Sous-titre : *L'équipe fondatrice et dirigeante de la communauté*

#### Grille membres (cartes)
Pour chaque membre du Board :
- Photo (avatar avec bordure `border-2 border-[#2d3235]`, shadow hard)
- Nom
- Rôle dans Kodata:
- Rôle professionnel / affiliation
- Liens : LinkedIn, Twitter/X

Style carte : fond blanc, bordure charbon, ombre portée dure, hover lift

---

### 4. Page Projets (`/projets`)

#### Hero
- Titre : **Projets collaboratifs**
- Sous-titre : *Des initiatives data concrètes, portées par la communauté*
- Bouton : "Proposer un projet"

#### Filtres
Tags : `Tous | En cours | Terminés | Ouvert aux contributions`

#### Grille de projets (cartes)
Pour chaque projet :
- Badge statut (couleur selon état : vert = en cours, jaune = en recherche de contributeurs, gris = terminé)
- Titre du projet
- Description courte
- Tags thématiques (`#open-data`, `#visualisation`, `#NLP`, etc.)
- Nombre de contributeurs
- CTA : "Voir le projet" / "Rejoindre"

---

### 5. Page Événements (`/evenements`)

#### Hero
- Titre : **Événements Kodata:**
- Sous-titre : *Meetups, workshops, hackathons — rejoignez-nous*

#### Prochain événement (mise en avant)
- Grande carte hero avec date, lieu, titre, description, bouton d'inscription
- Style : fond `#2d3235`, texte crème, accent `#e8b056`

#### Liste des événements à venir
Cartes avec :
- Date (affichée en gros, style calendrier)
- Type (badge : Meetup / Workshop / Hackathon / En ligne)
- Titre
- Lieu / Format
- CTA : "S'inscrire" / "En savoir plus"

#### Événements passés
- Grille réduite avec lien vers compte-rendus / ressources partagées

---

### 6. Page Partenaires (`/partenaires`)

#### Hero
- Titre : **Nos partenaires**
- Sous-titre : *Ils soutiennent la croissance de la communauté data à Madagascar*

#### Grille partenaires
Logos avec hover effect, lien vers site partenaire, courte description du partenariat

#### Section "Devenir partenaire"
- Texte d'appel à partenariat
- Types de partenariats : Institutionnel, Technique, Académique, Communauté
- CTA : "Nous contacter"

---

## Footer

```
Kodata:                    Navigation          Légal
La communauté data         Accueil             Mentions légales
de Madagascar.             À propos            Politique de données
                           Le Board            Contact
Initié par le RLC          Projets
Madagascar Chapter.        Événements
                           Partenaires

© 2024 Kodata: — Une initiative RLC Madagascar
```

---

## Composants réutilisables

### Badge / Tag
```
[ label ]  →  bg-[#e8b056], border-2, text uppercase, text-sm
```

### Carte standard
```
bg-white, border-2 border-[#2d3235], p-8, retro-shadow
hover: translate-y-[-4px], transition-transform
```

### Bouton primaire (action principale)
```
bg-[#1d8f6d], text-white, border-2 border-[#2d3235]
retro-shadow-hard, hover: translate(2px,2px)
```

### Bouton secondaire (action alternative)
```
bg-transparent, border-2 border-[#2d3235]
hover: bg-[#e8b056]
```

### Section sombre (fond charbon)
```
bg-[#2d3235], text-[#efeadd], border-y-2 border-black
```

---

## Notes techniques

- **Framework CSS** : Tailwind CSS (CDN)
- **Icônes** : Lucide Icons (CDN)
- **Responsive** : Mobile-first, breakpoint principal `md:`
- **Font** : `JetBrains Mono` via Google Fonts
- **Langue** : Français (principal), Anglais (secondaire)
- **Pages** : HTML statique (ou SSG type Astro / Next.js)
