'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, Youtube, Download, ArrowRight } from 'lucide-react'
import { scrollToElement } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
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

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  twitter: Mail
}

interface PersonalInfo {
  name: string
  title: string
  bio: string
  avatarUrl?: string | null
  resumeUrl?: string | null
  socialLinks: Array<{
    name: string
    url: string
    icon: string
  }>
}

interface HeroClientProps {
  personalInfo: PersonalInfo
}

export default function HeroClient({ personalInfo }: HeroClientProps) {
  const handleScrollToProjects = () => {
    scrollToElement('projects', 80)
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative vite-bg-pattern">
      <div className="vite-section text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="vite-heading text-center mb-6"
          >
            Bonjour, je suis{' '}
            <span className="gradient-text">{personalInfo.name}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl font-medium text-white/80 mb-8"
          >
            {personalInfo.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="vite-subheading text-center mb-12"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <button
              onClick={handleScrollToProjects}
              className="vite-button-primary"
            >
              Voir mes projets
              <ArrowRight size={18} />
            </button>
            
            {personalInfo.resumeUrl && (
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="vite-button-secondary"
              >
                <Download size={18} />
                Télécharger CV
              </a>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-6 mb-20"
          >
            {personalInfo.socialLinks.map((social) => {
              const IconComponent = socialIcons[social.icon as keyof typeof socialIcons] || Mail
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent size={20} />
                </motion.a>
              )
            })}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center text-white/50"
          >
            <span className="text-sm mb-3 font-medium">Découvrir mon travail</span>
            <motion.button
              onClick={handleScrollToProjects}
              className="p-3 rounded-full hover:bg-white/5 transition-colors group"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={20} className="group-hover:text-white transition-colors" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
