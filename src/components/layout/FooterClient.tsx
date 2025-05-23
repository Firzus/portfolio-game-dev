'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Youtube, Mail, Heart, ArrowUp } from 'lucide-react'
import { scrollToElement } from '@/lib/utils'

interface PersonalInfo {
  id: number
  name: string
  title: string
  bio: string
  email: string
  location: string
  avatarUrl?: string | null
  resumeUrl?: string | null
  updatedAt: Date
}

interface SocialLink {
  id: number
  name: string
  url: string
  icon: string
  order: number
  createdAt: Date
}

interface FooterClientProps {
  personalInfo: PersonalInfo | null
  socialLinks: SocialLink[]
}

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  twitter: Mail
}

const navigationLinks = [
  { id: 'hero', label: 'Accueil' },
  { id: 'skills', label: 'Compétences' },
  { id: 'projects', label: 'Projets' },
  { id: 'experience', label: 'Expérience' },
  { id: 'education', label: 'Formation' },
  { id: 'contact', label: 'Contact' }
]

export default function FooterClient({ personalInfo, socialLinks }: FooterClientProps) {
  const handleNavigation = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      scrollToElement(sectionId, 80)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-black/20 border-t border-white/10 z-30">
      <div className="vite-section py-16">
        <div className="vite-grid vite-grid-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {personalInfo?.name}
              </h3>
              <p className="text-[#647eff] font-medium mb-4">
                {personalInfo?.title}
              </p>
              <p className="text-white/70 leading-relaxed max-w-md">
                Passionné par la création d&apos;expériences interactives et le développement
                d&apos;applications modernes. Toujours à la recherche de nouveaux défis techniques.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <p className="text-white/60 text-sm">
                📧 {personalInfo?.email}
              </p>
              <p className="text-white/60 text-sm">
                📍 {personalInfo?.location}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavigation(link.id)}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links & Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Me Suivre
            </h4>

            {/* Social Links */}
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => {
                const IconComponent = socialIcons[social.icon as keyof typeof socialIcons] || Mail
                return (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.name}
                  >
                    <IconComponent size={16} />
                  </motion.a>
                )
              })}
            </div>

            {/* Additional Links */}
            <div className="space-y-3">
              {personalInfo?.resumeUrl && (
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/70 hover:text-white transition-colors text-sm"
                >
                  📄 Télécharger CV
                </a>
              )}
              <button
                onClick={() => handleNavigation('contact')}
                className="block text-white/70 hover:text-white transition-colors text-sm text-left"
              >
                💬 Me Contacter
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <span>© {new Date().getFullYear()} {personalInfo?.name}.</span>
              <span>Fait avec</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>et Next.js</span>
            </div>

            {/* Tech Stack */}
            <div className="flex items-center gap-4 text-white/50 text-xs">
              <span>Next.js</span>
              <span>•</span>
              <span>TypeScript</span>
              <span>•</span>
              <span>PostgreSQL</span>
              <span>•</span>
              <span>Framer Motion</span>
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm group"
              whileHover={{ y: -2 }}
            >
              <span>Retour en haut</span>
              <ArrowUp className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-t from-[#647eff]/10 via-transparent to-transparent" />
      </div>
    </footer>
  )
}
