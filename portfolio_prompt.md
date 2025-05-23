# Prompt Détaillé : Portfolio Game Developer avec Next.js

## 🎯 Objectif
Créer un portfolio moderne et dynamique pour un développeur de jeux vidéo, utilisant les dernières technologies web avec une approche full-stack complète.

## 🛠️ Stack Technique

### Frontend
- **Next.js 14+** avec App Router
- **TypeScript** pour le type safety
- **TailwindCSS** pour le styling
- **HeroUI 2.0** (NextUI) pour les composants UI
- **Framer Motion** pour les animations
- **React Hooks** personnalisés

### Backend & Base de données
- **PostgreSQL** comme base de données
- **Drizzle ORM** pour la gestion des données
- **Better Auth** pour l'authentification
- **Server Actions** pour les mutations côté serveur

### Analytics & Performance
- **Umami Analytics** pour le tracking
- **SSR/SSG** pour les performances
- **Code Splitting** et **Lazy Loading**

## 📱 Architecture & Structure

### Composants Partagés
```
/components
  /shared
    - Sidebar.tsx (navigation fixe)
  /ui (HeroUI components)
  /animations (Framer Motion)
```

### Pages & Routing
```
/app
  /page.tsx (Single Page Portfolio)
  /admin
    /page.tsx (Dashboard protégé)
    /login/page.tsx
  /api (Server Actions)
```

## 🎨 Sections du Portfolio (Single Page)

### 1. Landing Page / Hero Section
- **Animation d'entrée** avec Framer Motion
- **Titre accrocheur** avec effet de typing ou morphing
- **Call-to-action** subtil vers les projets
- **Indicateur de scroll** animé
- **Particules ou éléments graphiques** en arrière-plan

### 2. Introduction
- **Présentation personnelle** courte et impactante
- **3 domaines de compétences** en cards interactives :
  - 🎮 Game Development
  - 💻 Frontend Development  
  - 🎨 Web Design
- **Animations sur hover** et au scroll
- **Icons** représentant chaque domaine

### 3. Parcours Scolaire
- **Timeline verticale** responsive
- **Animations d'apparition** séquentielles
- **Cards pour chaque formation** avec :
  - Dates
  - Institution
  - Diplôme/Formation
  - Description courte
  - Logo de l'école (optionnel)

### 4. Expériences Professionnelles
- **Timeline similaire** au parcours scolaire
- **Cards détaillées** avec :
  - Période d'emploi
  - Nom de l'entreprise
  - Poste occupé
  - Missions principales
  - Technologies utilisées (badges)
  - Logo entreprise (optionnel)

### 5. Projets Personnels
- **Grid responsive** de project cards
- **Chaque card contient** :
  - Image preview (hover effects)
  - Nom du projet
  - Description courte
  - Stack technique (badges)
  - Liens d'action :
    - 🔗 GitHub
    - 🎥 YouTube (démo)
    - 🌐 Website/Live demo
- **Filtres par catégorie** (Game Dev, Web, etc.)
- **Modal détaillée** au clic pour plus d'infos

### 6. Formulaire de Contact
- **Design moderne** avec validation
- **Champs** :
  - Nom/Prénom
  - Email
  - Sujet
  - Message
  - Checkbox newsletter (optionnel)
- **Animations de validation** en temps réel
- **Success/Error states** avec Framer Motion
- **Intégration email** (Resend, Nodemailer, etc.)

## 🔧 Sidebar Navigation
- **Navigation fixe** sur desktop
- **Menu hamburger** sur mobile
- **Smooth scroll** vers les sections
- **Indicateur de section active**
- **Dark/Light mode toggle**
- **Animation d'ouverture/fermeture**

## 👨‍💼 Partie Administrative

### Route /admin (Protégée)
- **Authentification** avec Better Auth
- **Dashboard simple** avec navigation
- **Gestion du contenu** :
  - ✏️ Éditer les expériences professionnelles
  - 🎓 Gérer le parcours scolaire
  - 📊 Voir les statistiques Umami
  - 🎨 Modifier les infos personnelles

### Fonctionnalités Admin
- **CRUD complet** pour expériences/formations
- **Upload d'images** pour les projets
- **Prévisualisation** des changements
- **Sauvegarde automatique**
- **Log des modifications**

## 🎨 Style & Design

### Thème Général
- **Style startup moderne**
- **Palette de couleurs** cohérente
- **Typography** hiérarchisée et lisible
- **Glassmorphism** ou **Neumorphism** subtil
- **Micro-interactions** partout

### Dark/Light Mode
- **Toggle fluide** avec animation
- **Persistance** du choix utilisateur
- **Couleurs adaptées** pour chaque mode
- **Contraste optimisé**

### Responsive Design
- **Mobile-first** approach
- **Breakpoints** TailwindCSS
- **Navigation adaptative**
- **Images optimisées**

## ⚡ Performance & Best Practices

### Optimisations
- **SSR/SSG** pour le SEO
- **Image optimization** avec next/image
- **Code splitting** par section
- **Lazy loading** des composants lourds
- **Prefetching** des routes importantes

### Code Quality
- **TypeScript strict**
- **ESLint + Prettier**
- **Custom hooks** pour la logique métier
- **Error boundaries**
- **Loading states** partout

### SEO & Analytics
- **Meta tags** optimisés
- **Structured data** pour les projets
- **Sitemap** automatique
- **Umami Analytics** configuration
- **Performance monitoring**

## 📂 Structure de Fichiers Suggérée

```
portfolio-game-dev/
├── app/
│   ├── (auth)/
│   │   └── admin/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── animations/
│   ├── forms/
│   ├── sections/
│   ├── shared/
│   └── ui/
├── lib/
│   ├── auth.ts
│   ├── db/
│   ├── utils.ts
│   └── validations.ts
├── public/
│   ├── images/
│   └── icons/
└── types/
    └── index.ts
```

## 🚀 Étapes de Développement

1. **Setup initial** (Next.js + TypeScript + TailwindCSS)
2. **Configuration** des bases de données et ORM
3. **Authentification** avec Better Auth
4. **Composants UI** de base avec HeroUI
5. **Sections** du portfolio une par une
6. **Animations** avec Framer Motion
7. **Dashboard admin**
8. **Tests et optimisations**
9. **Déploiement** et analytics

## 📋 Fonctionnalités Avancées (Optionnelles)

- **Mode présentation** (plein écran pour démos)
- **Thèmes multiples** (pas seulement dark/light)
- **Multilingue** (FR/EN)
- **Blog intégré** pour articles techniques
- **Système de commentaires** sur les projets
- **API publique** pour les projets
- **Progressive Web App** (PWA)
- **Notifications push** pour nouveaux projets

---

*Ce prompt couvre tous les aspects techniques et créatifs nécessaires pour créer un portfolio moderne et professionnel qui met en valeur vos compétences de Game Developer tout en démontrant votre expertise en développement web full-stack.*