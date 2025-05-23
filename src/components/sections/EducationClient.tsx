'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, GraduationCap } from 'lucide-react'

interface Education {
  id: number
  institution: string
  degree: string
  field: string
  description?: string | null
  startDate: string
  endDate: string
  logoUrl?: string | null
  location: string
  createdAt: Date
}

interface EducationClientProps {
  education: Education[]
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

export default function EducationClient({ education }: EducationClientProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long' 
    })
  }

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365))
    
    return diffYears === 1 ? '1 an' : `${diffYears} ans`
  }

  return (
    <section id="education" className="vite-section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <h2 className="vite-heading text-center mb-6">
            Ma <span className="gradient-text">Formation</span>
          </h2>
          <p className="vite-subheading text-center">
            Mon parcours académique et les formations qui ont façonné mes compétences
          </p>
        </motion.div>

        {/* Education Timeline */}
        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              variants={itemVariants}
              className="vite-card p-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Institution Logo/Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#42d392]/20 to-[#647eff]/20 flex items-center justify-center">
                    {edu.logoUrl ? (
                      <div className="w-full h-full bg-white/5 rounded-xl flex items-center justify-center">
                        <span className="text-white/60 text-xs">Logo</span>
                      </div>
                    ) : (
                      <GraduationCap className="w-8 h-8 text-white/60" />
                    )}
                  </div>
                </div>

                {/* Education Content */}
                <div className="flex-1 space-y-4">
                  {/* Header */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-[#647eff] font-medium mb-1">
                      {edu.field}
                    </p>
                    <p className="text-[#42d392] font-medium mb-3">
                      {edu.institution}
                    </p>
                    
                    {/* Date and Location */}
                    <div className="flex flex-wrap gap-4 text-sm text-white/60">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </span>
                        <span className="text-[#42d392]">
                          ({calculateDuration(edu.startDate, edu.endDate)})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {edu.description && (
                    <p className="text-white/80 leading-relaxed">
                      {edu.description}
                    </p>
                  )}

                  {/* Degree Badge */}
                  <div className="flex items-center gap-2">
                    <span className="vite-tag-green text-xs">
                      {edu.degree}
                    </span>
                    <span className="vite-tag text-xs">
                      {edu.field}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education Stats */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 pt-16 border-t border-white/10"
        >
          <div className="vite-grid vite-grid-2 lg:grid-cols-3">
            {[
              { 
                label: 'Formations Complétées', 
                value: education.length.toString(), 
                description: 'Diplômes et certifications obtenus' 
              },
              { 
                label: 'Années d\'Études', 
                value: education.reduce((total, edu) => {
                  const years = parseInt(calculateDuration(edu.startDate, edu.endDate))
                  return total + (isNaN(years) ? 1 : years)
                }, 0).toString(), 
                description: 'Années consacrées à la formation' 
              },
              { 
                label: 'Domaines d\'Expertise', 
                value: new Set(education.map(edu => edu.field)).size.toString(), 
                description: 'Spécialisations acquises' 
              }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label} 
                className="text-center vite-card p-6"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-white font-medium mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-white/60">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
