export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  image: string
  technologies: string[]
  category: 'game' | 'web' | 'mobile'
  links: {
    github?: string
    demo?: string
    youtube?: string
    website?: string
  }
  featured: boolean
  createdAt: string
}

export interface Experience {
  id: string
  company: string
  position: string
  description: string
  technologies: string[]
  startDate: string
  endDate?: string
  logo?: string
  location: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  description?: string
  startDate: string
  endDate: string
  logo?: string
  location: string
}

export interface Skill {
  name: string
  level: number
  category: 'programming' | 'gamedev' | 'web' | 'tools'
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
  newsletter?: boolean
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface PersonalInfo {
  name: string
  title: string
  bio: string
  email: string
  location: string
  avatar: string
  resume: string
  socialLinks: SocialLink[]
}
