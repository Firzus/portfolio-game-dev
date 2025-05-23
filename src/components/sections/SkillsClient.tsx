'use client'

import { motion } from 'framer-motion'
import { Code, Gamepad2, Globe, Wrench } from 'lucide-react'

interface Skill {
  id: number
  name: string
  level: number
  category: string
  createdAt: Date
}

interface SkillsClientProps {
  skills: Skill[]
}

const categories = {
  programming: { icon: Code, label: "Programmation", color: "vite-tag" },
  gamedev: { icon: Gamepad2, label: "Game Development", color: "vite-tag-purple" },
  web: { icon: Globe, label: "Développement Web", color: "vite-tag-green" },
  tools: { icon: Wrench, label: "Outils & Technologies", color: "vite-tag-orange" },
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

export default function SkillsClient({ skills }: SkillsClientProps) {
  // Grouper les compétences par catégorie
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <section id="skills" className="vite-section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <h2 className="vite-heading text-center mb-6">
            Mes <span className="gradient-text">Compétences</span>
          </h2>
          <p className="vite-subheading text-center">
            Technologies et outils que je maîtrise pour créer des expériences exceptionnelles
          </p>
        </motion.div>

        {/* Skills by Category */}
        <div className="space-y-16">
          {Object.entries(groupedSkills).map(([categoryKey, categorySkills]) => {
            const category = categories[categoryKey as keyof typeof categories]
            if (!category) return null

            const IconComponent = category.icon

            return (
              <motion.div key={categoryKey} variants={itemVariants}>
                {/* Category Header */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-white/80" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    {category.label}
                  </h3>
                </div>

                {/* Skills Grid */}
                <div className="vite-grid vite-grid-3">
                  {categorySkills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      variants={itemVariants}
                      className="vite-card p-6 text-center group"
                    >
                      <h4 className="text-lg font-semibold text-white mb-3">
                        {skill.name}
                      </h4>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-white/60">Niveau</span>
                          <span className="text-sm font-semibold text-white">
                            {skill.level}%
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-[#42d392] to-[#647eff] rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>

                      <span className={`${category.color} text-xs`}>
                        {category.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Stats Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-24 pt-16 border-t border-white/10"
        >
          <div className="vite-grid vite-grid-2 lg:grid-cols-4">
            {[
              { label: 'Projets Réalisés', value: '25+', description: 'Applications et jeux développés' },
              { label: 'Années d\'Expérience', value: '7+', description: 'Dans le développement logiciel' },
              { label: 'Technologies Maîtrisées', value: skills.length.toString(), description: 'Langages et frameworks' },
              { label: 'Clients Satisfaits', value: '15+', description: 'Projets livrés avec succès' }
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
