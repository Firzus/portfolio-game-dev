import { db } from './index'
import { projects, posts, skills, contactMessages, testimonials, gameDevWork } from './schema'
import { desc, eq } from 'drizzle-orm'

// Projects queries
export async function getAllProjects() {
  return await db.select().from(projects).orderBy(desc(projects.createdAt))
}

export async function getFeaturedProjects() {
  return await db.select().from(projects)
    .where(eq(projects.featured, true))
    .orderBy(desc(projects.createdAt))
}

export async function getProjectById(id: number) {
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1)
  return result[0] || null
}

// Blog posts queries
export async function getAllPosts() {
  return await db.select().from(posts).orderBy(desc(posts.createdAt))
}

export async function getPublishedPosts() {
  return await db.select().from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.publishedAt))
}

export async function getPostBySlug(slug: string) {
  const result = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1)
  return result[0] || null
}

export async function getPostById(id: number) {
  const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1)
  return result[0] || null
}

// Game dev work/experiences queries
export async function getAllGameDevWork() {
  return await db.select().from(gameDevWork).orderBy(desc(gameDevWork.startDate))
}

export async function getCurrentGameDevWork() {
  return await db.select().from(gameDevWork)
    .where(eq(gameDevWork.current, true))
    .orderBy(desc(gameDevWork.startDate))
}

// Aliases pour compatibilité (utilisent gameDevWork maintenant)
export async function getAllExperiences() {
  return await getAllGameDevWork()
}

export async function getAllEducation() {
  return await getAllGameDevWork() // Peut être adapté plus tard
}

// Skills queries
export async function getAllSkills() {
  return await db.select().from(skills).orderBy(desc(skills.level))
}

export async function getSkillsByCategory(category: string) {
  return await db.select().from(skills)
    .where(eq(skills.category, category))
    .orderBy(desc(skills.level))
}

// Testimonials queries
export async function getAllTestimonials() {
  return await db.select().from(testimonials).orderBy(desc(testimonials.createdAt))
}

export async function getFeaturedTestimonials() {
  return await db.select().from(testimonials)
    .where(eq(testimonials.featured, true))
    .orderBy(desc(testimonials.createdAt))
}

// Contact messages queries (for admin)
export async function getAllContactMessages() {
  return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt))
}

export async function getUnreadContactMessages() {
  return await db.select().from(contactMessages)
    .where(eq(contactMessages.replied, false))
    .orderBy(desc(contactMessages.createdAt))
}

// Fonctions de compatibilité pour les anciennes tables supprimées
export async function getPersonalInfo() {
  // Retourne des données statiques ou null pour maintenir la compatibilité
  return {
    id: 1,
    name: "Game Developer",
    title: "Développeur de Jeux Vidéo",
    bio: "Passionné par le développement de jeux vidéo.",
    email: "contact@example.com",
    location: "France",
    avatarUrl: null,
    resumeUrl: null,
    updatedAt: new Date(),
  }
}

export async function getSocialLinks() {
  // Retourne des liens statiques ou vides pour maintenir la compatibilité
  return [
    { id: 1, name: "GitHub", url: "https://github.com", icon: "github", order: 1, createdAt: new Date() },
    { id: 2, name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin", order: 2, createdAt: new Date() },
  ]
}

// Statistics queries
export async function getPortfolioStats() {
  const [projectsCount] = await db.select({ count: projects.id }).from(projects)
  const [postsCount] = await db.select({ count: posts.id }).from(posts)
  const [skillsCount] = await db.select({ count: skills.id }).from(skills)
  const [messagesCount] = await db.select({ count: contactMessages.id }).from(contactMessages)
  
  return {
    projects: projectsCount?.count || 0,
    posts: postsCount?.count || 0,
    skills: skillsCount?.count || 0,
    messages: messagesCount?.count || 0,
  }
}
