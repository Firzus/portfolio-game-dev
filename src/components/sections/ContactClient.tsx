'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, MapPin, Send, Github, Linkedin, Youtube, CheckCircle, AlertCircle } from 'lucide-react'

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

interface ContactClientProps {
  personalInfo: PersonalInfo | null
  socialLinks: SocialLink[]
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

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  twitter: Mail
}

export default function ContactClient({ personalInfo, socialLinks }: ContactClientProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    newsletter: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          newsletter: false
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <section id="contact" className="vite-section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <h2 className="vite-heading text-center mb-6">
            Me <span className="gradient-text">Contacter</span>
          </h2>
          <p className="vite-subheading text-center">
            Une idée de projet ? Une opportunité ? N'hésitez pas à me contacter !
          </p>
        </motion.div>

        <div className="vite-grid vite-grid-2 gap-12">
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">
                Informations de Contact
              </h3>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#42d392]/20 to-[#647eff]/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-[#647eff]" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Email</p>
                    <a 
                      href={`mailto:${personalInfo?.email}`}
                      className="text-white hover:text-[#647eff] transition-colors"
                    >
                      {personalInfo?.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#42d392]/20 to-[#647eff]/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#42d392]" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Localisation</p>
                    <p className="text-white">{personalInfo?.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Réseaux Sociaux
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = socialIcons[social.icon as keyof typeof socialIcons] || Mail
                  return (
                    <motion.a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={social.name}
                    >
                      <IconComponent size={20} />
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="vite-card p-6">
              <h4 className="text-lg font-semibold text-white mb-3">
                Disponibilité
              </h4>
              <p className="text-white/80 mb-4">
                Je suis actuellement ouvert aux nouvelles opportunités et projets freelance.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#42d392] rounded-full animate-pulse"></div>
                <span className="text-[#42d392] text-sm font-medium">Disponible pour de nouveaux projets</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="vite-card p-8 space-y-6">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Envoyez-moi un message
              </h3>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-[#42d392]/10 border border-[#42d392]/20 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-[#42d392]" />
                  <span className="text-[#42d392]">Message envoyé avec succès !</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400">Erreur lors de l'envoi. Veuillez réessayer.</span>
                </motion.div>
              )}

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white/80 text-sm font-medium mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#647eff] transition-all ${
                      errors.name ? 'border-red-500' : 'border-white/10 focus:border-[#647eff]'
                    }`}
                    placeholder="Votre nom"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#647eff] transition-all ${
                      errors.email ? 'border-red-500' : 'border-white/10 focus:border-[#647eff]'
                    }`}
                    placeholder="votre@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-white/80 text-sm font-medium mb-2">
                  Sujet *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#647eff] transition-all ${
                    errors.subject ? 'border-red-500' : 'border-white/10 focus:border-[#647eff]'
                  }`}
                  placeholder="Sujet de votre message"
                />
                {errors.subject && (
                  <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-white/80 text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#647eff] transition-all resize-none ${
                    errors.message ? 'border-red-500' : 'border-white/10 focus:border-[#647eff]'
                  }`}
                  placeholder="Décrivez votre projet ou votre demande..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#647eff] focus:ring-[#647eff] focus:ring-2"
                />
                <label htmlFor="newsletter" className="text-white/70 text-sm">
                  Je souhaite recevoir des nouvelles de vos projets
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full vite-button-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
