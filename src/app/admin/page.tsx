'use client'

import { motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Image as ImageIcon,
  MessageSquare,
  Plus,
  TrendingUp,
  Users,
  Activity
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const stats = [
  {
    name: 'Projets',
    value: '0',
    icon: ImageIcon,
    color: 'blue',
    description: 'Projets de jeux vidéo'
  },
  {
    name: 'Articles Blog',
    value: '0',
    icon: Briefcase,
    color: 'green',
    description: 'Articles publiés'
  },
  {
    name: 'Compétences',
    value: '0',
    icon: GraduationCap,
    color: 'purple',
    description: 'Technologies maîtrisées'
  },
  {
    name: 'Messages',
    value: '0',
    icon: MessageSquare,
    color: 'orange',
    description: 'Messages de contact'
  },
];

const quickActions = [
  {
    title: 'Nouveau projet',
    description: 'Ajouter un nouveau projet de jeu vidéo au portfolio',
    icon: Plus,
    color: 'blue'
  },
  {
    title: 'Nouvel article',
    description: 'Écrire un nouvel article de blog technique',
    icon: Plus,
    color: 'green'
  },
  {
    title: 'Gérer les compétences',
    description: 'Mettre à jour vos compétences techniques',
    icon: TrendingUp,
    color: 'purple'
  },
  {
    title: 'Voir les messages',
    description: 'Consulter les messages de contact reçus',
    icon: Users,
    color: 'orange'
  }
];

export default function AdminDashboard() {
  return (
    <div className="vite-section-with-sidebar">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center lg:text-left">
          <h1 className="vite-heading text-4xl">
            <span className="gradient-text">Dashboard</span> Admin
          </h1>
          <p className="vite-subheading text-left lg:text-left">
            Bienvenue dans votre espace d'administration. Gérez votre portfolio de développeur de jeux vidéo.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="vite-grid vite-grid-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="vite-card p-6 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                      stat.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                        'bg-orange-100 dark:bg-orange-900/30'
                  }`}>
                  <stat.icon className={`h-6 w-6 ${stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                      stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
                        stat.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                          'text-orange-600 dark:text-orange-400'
                    }`} />
                </div>
                <Activity className="h-4 w-4 text-muted group-hover:text-green-500 transition-colors" />
              </div>
              <div>
                <p className="text-3xl font-bold mb-1" style={{ color: 'var(--heading-color)' }}>
                  {stat.value}
                </p>
                <p className="font-medium mb-1" style={{ color: 'var(--subheading-color)' }}>
                  {stat.name}
                </p>
                <p className="text-sm text-muted">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="vite-grid vite-grid-2">
          {/* Status Card */}
          <motion.div variants={itemVariants} className="vite-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-semibold" style={{ color: 'var(--heading-color)' }}>
                Statut du Système
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm" style={{ color: 'var(--subheading-color)' }}>
                  Authentification par username configurée
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm" style={{ color: 'var(--subheading-color)' }}>
                  Plugin Better Auth username actif
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm" style={{ color: 'var(--subheading-color)' }}>
                  Validation des usernames en place
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm" style={{ color: 'var(--subheading-color)' }}>
                  Sessions sécurisées (7 jours)
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="vite-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold" style={{ color: 'var(--heading-color)' }}>
                Actions Rapides
              </h2>
            </div>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.title}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left p-4 vite-card hover:shadow-lg transition-all duration-200 group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${action.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        action.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                          action.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                            'bg-orange-100 dark:bg-orange-900/30'
                      }`}>
                      <action.icon className={`h-4 w-4 ${action.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                          action.color === 'green' ? 'text-green-600 dark:text-green-400' :
                            action.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                              'text-orange-600 dark:text-orange-400'
                        }`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" style={{ color: 'var(--heading-color)' }}>
                        {action.title}
                      </div>
                      <div className="text-sm text-muted">
                        {action.description}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Welcome Message */}
        <motion.div variants={itemVariants} className="vite-card p-8 text-center">
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--heading-color)' }}>
            🎮 Portfolio de <span className="gradient-text">Développeur de Jeux Vidéo</span>
          </h3>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Votre espace d'administration est prêt ! Vous pouvez maintenant gérer vos projets de jeux vidéo,
            écrire des articles techniques, et présenter vos compétences en développement de jeux.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
} 