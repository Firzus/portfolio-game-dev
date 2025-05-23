# Portfolio Game Dev

Un portfolio moderne pour développeur de jeux vidéo avec authentification username.

## 🚀 Fonctionnalités

- **Authentification username/password** avec Better Auth
- **Interface d'administration** pour gérer le contenu
- **Base de données PostgreSQL** avec Drizzle ORM
- **Design responsive** avec Tailwind CSS
- **Animations fluides** avec Framer Motion

## 🛠️ Configuration

### 1. Variables d'environnement

Copiez le fichier `env.example` vers `.env.local` et remplissez les variables :

```bash
cp env.example .env.local
```

Variables requises :
- `DATABASE_URL` : URL de votre base de données PostgreSQL
- `BETTER_AUTH_SECRET` : Clé secrète (générez avec `openssl rand -base64 32`)
- `BETTER_AUTH_URL` : URL de votre application (ex: `http://localhost:3000`)

### 2. Base de données

```bash
# Générer les migrations
npm run db:generate

# Appliquer les migrations
npm run db:migrate

# (Optionnel) Voir la base de données
npm run db:studio
```

### 3. Installation et démarrage

```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev
```

## 🔐 Authentification

L'authentification utilise **Better Auth** avec username/password :

- **Page de connexion** : `/login`
- **Création de compte** : Disponible sur la page de login
- **Interface admin** : `/admin` (nécessite une authentification)
- **Déconnexion** : Bouton dans la sidebar admin

### Fonctionnalités d'authentification

- **Connexion par username** : Les utilisateurs se connectent avec leur nom d'utilisateur
- **Inscription** : Création de compte avec nom, email, username et mot de passe
- **Validation** : Username entre 3-30 caractères, alphanumériques + underscore + points
- **Sécurité** : Mots de passe hashés, sessions sécurisées

### Usernames réservés

Les usernames suivants sont interdits : `admin`, `root`, `api`, `www`, `mail`, `support`

## 📁 Structure du projet

```
src/
├── app/
│   ├── admin/          # Interface d'administration
│   ├── api/auth/       # Routes d'authentification
│   └── login/          # Page de connexion/inscription
├── components/
│   ├── admin/          # Composants admin
│   └── ...
├── lib/
│   ├── auth.ts         # Configuration Better Auth
│   ├── auth-client.ts  # Client d'authentification
│   ├── db/             # Configuration base de données
│   └── ...
```

## 🗄️ Base de données

Tables principales :
- `users` : Utilisateurs avec username/email/password
- `sessions` : Sessions actives
- `accounts` : Comptes utilisateurs (credentials)
- `verification` : Tokens de vérification
- `projects` : Projets du portfolio
- `posts` : Articles de blog
- `skills` : Compétences
- `contact_messages` : Messages de contact
- `testimonials` : Témoignages
- `game_dev_work` : Expériences de développement de jeux

## 🚀 Déploiement

1. Configurez votre base de données PostgreSQL
2. Mettez à jour les variables d'environnement
3. Exécutez les migrations : `npm run db:migrate`
4. Créez votre premier compte admin via `/login`
5. Déployez sur votre plateforme préférée (Vercel, Netlify, etc.)

## 📝 Développement

```bash
# Mode développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm start

# Linting
npm run lint
```

## 🔧 Plugin Username Better Auth

Ce projet utilise le [plugin username de Better Auth](https://www.better-auth.com/docs/plugins/username) qui étend l'authentification email/password avec :

- Support du nom d'utilisateur pour la connexion
- Validation automatique des usernames
- Stockage des usernames normalisés et d'affichage
- Compatible avec tous les autres plugins Better Auth 