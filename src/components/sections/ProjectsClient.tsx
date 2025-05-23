'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Youtube, Play } from 'lucide-react'
import { useState } from 'react'

interface Project {
  id: number
  title: string
  description: string
  longDescription?: string | null
  imageUrl?: string | null
  technologies: string[]
  category: string
  githubUrl?: string | null
  demoUrl?: string | null
  youtubeUrl?: string | null
  websiteUrl?: string | null
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

interface ProjectsClientProps {
  projects: Project[]
  featuredProjects: Project[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const categories = [
  { id: 'all', label: 'Tous les projets' },
  { id: 'game', label: 'Jeux Vidéo' },
  { id: 'web', label: 'Applications Web' },
  { id: 'mobile', label: 'Applications Mobile' }
]

const getTechColor = (tech: string) => {
  const techColors: Record<string, string> = {
    'Unity': 'vite-tag',
    'C#': 'vite-tag-purple',
    'React': 'vite-tag-green',
    'Next.js': 'vite-tag-green',
    'TypeScript': 'vite-tag',
    'Node.js': 'vite-tag-green',
    'Vue.js': 'vite-tag-green',
    'Python': 'vite-tag-orange',
    'Unreal Engine': 'vite-tag-purple',
    'Three.js': 'vite-tag-green',
    'TailwindCSS': 'vite-tag-green',
    'PostgreSQL': 'vite-tag',
    'MongoDB': 'vite-tag-green',
    'Firebase': 'vite-tag-orange',
    'Blender': 'vite-tag-orange',
    'Photoshop': 'vite-tag-purple',
    'Aseprite': 'vite-tag-purple',
    'FMOD': 'vite-tag-orange',
    'Wwise': 'vite-tag-orange',
    'Express': 'vite-tag-green',
    'Socket.io': 'vite-tag-green',
    'Framer Motion': 'vite-tag-purple',
    'Godot': 'vite-tag-purple',
    'Java': 'vite-tag-orange',
    'C++': 'vite-tag',
    'Google Play Services': 'vite-tag-green'
  }
  return techColors[tech] || 'vite-tag'
}

export default function ProjectsClient({ projects, featuredProjects }: ProjectsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <section id="projects" className="vite-section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <h2 className="vite-heading text-center mb-6">
            Mes <span className="gradient-text">Projets</span>
          </h2>
          <p className="vite-subheading text-center">
            Découvrez une sélection de mes réalisations en développement de jeux vidéo et applications web
          </p>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <motion.div variants={itemVariants} className="mb-20">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">
              Projets Mis en Avant
            </h3>
            <div className="vite-grid vite-grid-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  featured={true}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Category Filter */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedCategory === category.id
                  ? 'vite-button-primary'
                  : 'vite-button-secondary'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          variants={containerVariants}
          className="vite-grid vite-grid-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

function ProjectCard({ project, featured = false }: { 
  project: Project
  featured?: boolean
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="vite-card p-6 group"
    >
      {/* Project Image/Icon */}
      <div className="relative h-48 bg-gradient-to-br from-[#42d392]/20 to-[#647eff]/20 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
        {project.imageUrl ? (
          <div className="w-full h-full bg-white/5 flex items-center justify-center">
            <span className="text-white/60 text-sm">Image non disponible</span>
          </div>
        ) : (
          <div className="text-6xl font-bold text-white/20">
            {project.title.charAt(0)}
          </div>
        )}
        {featured && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-[#42d392] to-[#647eff] text-white px-3 py-1 rounded-full text-xs font-semibold">
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white group-hover:text-[#647eff] transition-colors">
          {project.title}
        </h3>
        
        <p className="text-white/70 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className={`${getTechColor(tech)} text-xs`}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="vite-tag text-xs">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Project Links */}
        <div className="flex gap-3 pt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              title="Code source"
            >
              <Github size={16} />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              title="Démo live"
            >
              <ExternalLink size={16} />
            </a>
          )}
          {project.youtubeUrl && (
            <a
              href={project.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              title="Vidéo démo"
            >
              <Youtube size={16} />
            </a>
          )}
          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              title="Site web"
            >
              <Play size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
