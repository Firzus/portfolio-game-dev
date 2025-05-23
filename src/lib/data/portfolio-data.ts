import { Project, Experience, Education, PersonalInfo, Skill } from '@/types'

export const personalInfo: PersonalInfo = {
  name: "Alex Dubois",
  title: "Game Developer & Full-Stack Engineer",
  bio: "Passionné par la création d'expériences interactives immersives et le développement d'applications web modernes. Spécialisé en Unity, Unreal Engine et technologies web avancées.",
  email: "alex.dubois@example.com",
  location: "Paris, France",
  avatar: "/images/avatar.jpg",
  resume: "/documents/cv-alex-dubois.pdf",
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/alexdubois",
      icon: "github"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/alexdubois",
      icon: "linkedin"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/alexdubois",
      icon: "twitter"
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@alexdubois",
      icon: "youtube"
    }
  ]
}

export const skills: Skill[] = [
  // Programming Languages
  { name: "C#", level: 95, category: "programming" },
  { name: "JavaScript/TypeScript", level: 90, category: "programming" },
  { name: "Python", level: 80, category: "programming" },
  { name: "C++", level: 75, category: "programming" },
  { name: "Java", level: 70, category: "programming" },
  
  // Game Development
  { name: "Unity", level: 95, category: "gamedev" },
  { name: "Unreal Engine", level: 85, category: "gamedev" },
  { name: "Godot", level: 75, category: "gamedev" },
  { name: "Game Design", level: 90, category: "gamedev" },
  { name: "3D Modeling", level: 70, category: "gamedev" },
  
  // Web Development
  { name: "React/Next.js", level: 90, category: "web" },
  { name: "Node.js", level: 85, category: "web" },
  { name: "Vue.js", level: 80, category: "web" },
  { name: "TailwindCSS", level: 95, category: "web" },
  { name: "PostgreSQL", level: 80, category: "web" },
  
  // Tools
  { name: "Git", level: 90, category: "tools" },
  { name: "Docker", level: 75, category: "tools" },
  { name: "Blender", level: 70, category: "tools" },
  { name: "Photoshop", level: 80, category: "tools" }
]

export const projects: Project[] = [
  {
    id: "1",
    title: "Mystic Realms",
    description: "RPG 3D immersif avec système de combat en temps réel et monde ouvert explorable.",
    longDescription: "Un jeu de rôle épique développé avec Unity, featuring un système de combat dynamique, un système de quêtes complexe, et un monde ouvert de plus de 50 heures de gameplay. Le jeu inclut un système de crafting avancé, des dialogues ramifiés, et une bande sonore originale.",
    image: "/images/projects/mystic-realms.jpg",
    technologies: ["Unity", "C#", "Blender", "FMOD", "Photoshop"],
    category: "game",
    links: {
      github: "https://github.com/alexdubois/mystic-realms",
      youtube: "https://youtube.com/watch?v=demo1",
      demo: "https://mystic-realms-demo.com"
    },
    featured: true,
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    title: "Cyber Runner",
    description: "Jeu de plateforme cyberpunk avec mécaniques de parkour et système de progression.",
    longDescription: "Un platformer 2D stylisé avec des éléments cyberpunk, développé en Unity. Le jeu propose des mécaniques de parkour fluides, un système de progression basé sur les compétences, et des niveaux générés procéduralement.",
    image: "/images/projects/cyber-runner.jpg",
    technologies: ["Unity", "C#", "Aseprite", "Wwise"],
    category: "game",
    links: {
      github: "https://github.com/alexdubois/cyber-runner",
      youtube: "https://youtube.com/watch?v=demo2"
    },
    featured: true,
    createdAt: "2023-08-20"
  },
  {
    id: "3",
    title: "Portfolio Interactif",
    description: "Site portfolio moderne avec animations 3D et interface utilisateur immersive.",
    longDescription: "Un portfolio web innovant utilisant Three.js pour des animations 3D, Next.js pour les performances, et Framer Motion pour des transitions fluides. Le site inclut un mode sombre/clair, une interface multilingue, et des optimisations SEO avancées.",
    image: "/images/projects/portfolio.jpg",
    technologies: ["Next.js", "TypeScript", "Three.js", "Framer Motion", "TailwindCSS"],
    category: "web",
    links: {
      github: "https://github.com/alexdubois/portfolio",
      website: "https://alexdubois.dev",
      demo: "https://portfolio-demo.vercel.app"
    },
    featured: true,
    createdAt: "2024-03-10"
  },
  {
    id: "4",
    title: "GameDev Tools Suite",
    description: "Collection d'outils de développement pour Unity avec interface web moderne.",
    longDescription: "Une suite d'outils web pour développeurs de jeux, incluant un générateur de niveaux, un éditeur de dialogues, et un système de gestion d'assets. Développé avec React et Node.js, avec une API REST complète.",
    image: "/images/projects/gamedev-tools.jpg",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    category: "web",
    links: {
      github: "https://github.com/alexdubois/gamedev-tools",
      website: "https://gamedev-tools.com"
    },
    featured: false,
    createdAt: "2023-11-05"
  },
  {
    id: "5",
    title: "Mobile Puzzle Game",
    description: "Jeu de puzzle mobile avec mécaniques innovantes et design minimaliste.",
    longDescription: "Un jeu de puzzle mobile développé avec Unity, featuring des mécaniques de gameplay uniques basées sur la physique, plus de 100 niveaux, et un système de progression social.",
    image: "/images/projects/mobile-puzzle.jpg",
    technologies: ["Unity", "C#", "Firebase", "Google Play Services"],
    category: "mobile",
    links: {
      github: "https://github.com/alexdubois/mobile-puzzle",
      demo: "https://play.google.com/store/apps/details?id=com.alexdubois.puzzle"
    },
    featured: false,
    createdAt: "2023-06-12"
  }
]

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Ubisoft Paris",
    position: "Game Developer Senior",
    description: "Développement de systèmes de gameplay pour des AAA, optimisation des performances, et mentorat d'équipes junior. Travail sur des projets non-annoncés utilisant Unity et des technologies propriétaires.",
    technologies: ["Unity", "C#", "C++", "Perforce", "JIRA"],
    startDate: "2022-03-01",
    endDate: "2024-01-31",
    logo: "/images/companies/ubisoft.png",
    location: "Paris, France"
  },
  {
    id: "2",
    company: "Indie Game Studio",
    position: "Lead Developer",
    description: "Direction technique d'une équipe de 5 développeurs, architecture de systèmes de jeu complexes, et gestion de la pipeline de développement pour des projets indie innovants.",
    technologies: ["Unity", "C#", "Git", "Trello", "Blender"],
    startDate: "2020-06-01",
    endDate: "2022-02-28",
    logo: "/images/companies/indie-studio.png",
    location: "Lyon, France"
  },
  {
    id: "3",
    company: "WebTech Solutions",
    position: "Full-Stack Developer",
    description: "Développement d'applications web modernes, création d'APIs RESTful, et implémentation de solutions cloud scalables pour des clients variés.",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    startDate: "2018-09-01",
    endDate: "2020-05-31",
    logo: "/images/companies/webtech.png",
    location: "Paris, France"
  },
  {
    id: "4",
    company: "Freelance",
    position: "Game Developer",
    description: "Développement de prototypes de jeux, consultation technique, et création d'outils personnalisés pour studios indépendants et startups.",
    technologies: ["Unity", "Unreal Engine", "C#", "Blueprint", "Various"],
    startDate: "2017-01-01",
    endDate: "2018-08-31",
    logo: "/images/companies/freelance.png",
    location: "Remote"
  }
]

export const education: Education[] = [
  {
    id: "1",
    institution: "ENJMIN (École Nationale du Jeu et des Médias Interactifs)",
    degree: "Master",
    field: "Game Design et Programmation",
    description: "Formation spécialisée en développement de jeux vidéo, couvrant la programmation gameplay, l'intelligence artificielle, et la conception de systèmes de jeu.",
    startDate: "2015-09-01",
    endDate: "2017-06-30",
    logo: "/images/schools/enjmin.png",
    location: "Angoulême, France"
  },
  {
    id: "2",
    institution: "EPITECH",
    degree: "Bachelor",
    field: "Informatique et Technologies",
    description: "Formation en informatique avec spécialisation en programmation système, développement logiciel, et gestion de projets techniques.",
    startDate: "2012-09-01",
    endDate: "2015-06-30",
    logo: "/images/schools/epitech.png",
    location: "Paris, France"
  },
  {
    id: "3",
    institution: "Lycée Louis-le-Grand",
    degree: "Baccalauréat Scientifique",
    field: "Sciences de l'Ingénieur",
    description: "Baccalauréat scientifique avec spécialisation en sciences de l'ingénieur et mathématiques avancées.",
    startDate: "2010-09-01",
    endDate: "2012-06-30",
    logo: "/images/schools/louis-le-grand.png",
    location: "Paris, France"
  }
]
