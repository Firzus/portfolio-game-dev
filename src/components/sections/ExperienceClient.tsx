'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'

interface Experience {
  id: number
  company: string
  position: string
  description: string
  technologies: string[]
  startDate: string
  endDate?: string | null
  logoUrl?: string | null
  location: string
  createdAt: Date
}

interface ExperienceClientProps {
  experiences: Experience[]
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
    'C++': 'vite-tag',
    'Perforce': 'vite-tag-orange',
    'JIRA': 'vite-tag-orange',
    'Git': 'vite-tag',
    'Trello': 'vite-tag-orange',
    'Blender': 'vite-tag-orange',
    'PostgreSQL': 'vite-tag',
    'AWS': 'vite-tag-orange',
    'Docker': 'vite-tag',
    'Express': 'vite-tag-green',
    'Blueprint': 'vite-tag-purple',
    'Various': 'vite-tag'
  }
  return techColors[tech] || 'vite-tag'
}

export default function ExperienceClient({ experiences }: ExperienceClientProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long' 
    })
  }

  const calculateDuration = (startDate: string, endDate?: string | null) => {
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()
    
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30))
    
    if (diffMonths < 12) {
      return `${diffMonths} mois`
    } else {
      const years = Math.floor(diffMonths / 12)
      const months = diffMonths % 12
      return months > 0 ? `${years} an${years > 1 ? 's' : ''} ${months} mois` : `${years} an${years > 1 ? 's' : ''}`
    }
  }

  return (
    <section id="experience" className="vite-section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <h2 className="vite-heading text-center mb-6">
            Mon <span className="gradient-text">Parcours</span>
          </h2>
          <p className="vite-subheading text-center">
            Découvrez mon expérience professionnelle et les projets sur lesquels j'ai travaillé
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              variants={itemVariants}
              className="vite-card p-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Company Logo/Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#42d392]/20 to-[#647eff]/20 flex items-center justify-center">
                    {experience.logoUrl ? (
                      <div className="w-full h-full bg-white/5 rounded-xl flex items-center justify-center">
                        <span className="text-white/60 text-xs">Logo</span>
                      </div>
                    ) : (
                      <div className="text-2xl font-bold text-white/60">
                        {experience.company.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Experience Content */}
                <div className="flex-1 space-y-4">
                  {/* Header */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {experience.position}
                    </h3>
                    <p className="text-[#647eff] font-medium mb-3">
                      {experience.company}
                    </p>
                    
                    {/* Date and Location */}
                    <div className="flex flex-wrap gap-4 text-sm text-white/60">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>
                          {formatDate(experience.startDate)} - {' '}
                          {experience.endDate ? formatDate(experience.endDate) : 'Présent'}
                        </span>
                        <span className="text-[#42d392]">
                          ({calculateDuration(experience.startDate, experience.endDate)})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/80 leading-relaxed">
                    {experience.description}
                  </p>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-medium text-white/80 mb-3">
                      Technologies utilisées :
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`${getTechColor(tech)} text-xs`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-16 pt-16 border-t border-white/10"
        >
          <p className="text-white/70 mb-6 text-lg">
            Intéressé par mon profil ? Contactons-nous !
          </p>
          <a
            href="#contact"
            className="vite-button-primary"
          >
            Me Contacter
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
