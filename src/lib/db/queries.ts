import { db } from './index'
import { projects, experiences, education, skills, personalInfo, socialLinks, contactMessages } from './schema'
import { desc, asc, eq } from 'drizzle-orm'

// Personal Info queries
export async function getPersonalInfo() {
  const result = await db.select().from(personalInfo).limit(1)
  return result[0] || null
}

export async function getSocialLinks() {
  return await db.select().from(socialLinks).orderBy(asc(socialLinks.order))
}

// Projects queries
export async function getAllProjects() {
  return await db.select().from(projects).orderBy(desc(projects.createdAt))
}

export async function getFeaturedProjects() {
  return await db.select().from(projects)
    .where(eq(projects.featured, true))
    .orderBy(desc(projects.createdAt))
}

export async function getProjectsByCategory(category: string) {
  return await db.select().from(projects)
    .where(eq(projects.category, category))
    .orderBy(desc(projects.createdAt))
}

export async function getProjectById(id: number) {
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1)
  return result[0] || null
}

// Experiences queries
export async function getAllExperiences() {
  return await db.select().from(experiences).orderBy(desc(experiences.startDate))
}

// Education queries
export async function getAllEducation() {
  return await db.select().from(education).orderBy(desc(education.startDate))
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

// Contact messages queries (for admin)
export async function getAllContactMessages() {
  return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt))
}

export async function getUnreadContactMessages() {
  return await db.select().from(contactMessages)
    .where(eq(contactMessages.read, false))
    .orderBy(desc(contactMessages.createdAt))
}

// Statistics queries
export async function getPortfolioStats() {
  const [projectsCount] = await db.select({ count: projects.id }).from(projects)
  const [experiencesCount] = await db.select({ count: experiences.id }).from(experiences)
  const [skillsCount] = await db.select({ count: skills.id }).from(skills)
  
  return {
    projects: projectsCount?.count || 0,
    experiences: experiencesCount?.count || 0,
    skills: skillsCount?.count || 0,
  }
}
