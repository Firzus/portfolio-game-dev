import { pgTable, serial, varchar, text, boolean, timestamp, date, integer } from 'drizzle-orm/pg-core'

// Users table for admin authentication
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Projects table
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  longDescription: text('long_description'),
  imageUrl: varchar('image_url', { length: 500 }),
  technologies: text('technologies').array().notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  githubUrl: varchar('github_url', { length: 500 }),
  demoUrl: varchar('demo_url', { length: 500 }),
  youtubeUrl: varchar('youtube_url', { length: 500 }),
  websiteUrl: varchar('website_url', { length: 500 }),
  featured: boolean('featured').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Experiences table
export const experiences = pgTable('experiences', {
  id: serial('id').primaryKey(),
  company: varchar('company', { length: 255 }).notNull(),
  position: varchar('position', { length: 255 }).notNull(),
  description: text('description').notNull(),
  technologies: text('technologies').array().notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date'),
  logoUrl: varchar('logo_url', { length: 500 }),
  location: varchar('location', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Education table
export const education = pgTable('education', {
  id: serial('id').primaryKey(),
  institution: varchar('institution', { length: 255 }).notNull(),
  degree: varchar('degree', { length: 255 }).notNull(),
  field: varchar('field', { length: 255 }).notNull(),
  description: text('description'),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  logoUrl: varchar('logo_url', { length: 500 }),
  location: varchar('location', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Skills table
export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  level: integer('level').notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Contact messages table
export const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }).notNull(),
  message: text('message').notNull(),
  newsletter: boolean('newsletter').default(false).notNull(),
  read: boolean('read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Personal info table (for dynamic content management)
export const personalInfo = pgTable('personal_info', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  bio: text('bio').notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  avatarUrl: varchar('avatar_url', { length: 500 }),
  resumeUrl: varchar('resume_url', { length: 500 }),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Social links table
export const socialLinks = pgTable('social_links', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  url: varchar('url', { length: 500 }).notNull(),
  icon: varchar('icon', { length: 50 }).notNull(),
  order: integer('order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Type exports for TypeScript
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert

export type Experience = typeof experiences.$inferSelect
export type NewExperience = typeof experiences.$inferInsert

export type Education = typeof education.$inferSelect
export type NewEducation = typeof education.$inferInsert

export type Skill = typeof skills.$inferSelect
export type NewSkill = typeof skills.$inferInsert

export type ContactMessage = typeof contactMessages.$inferSelect
export type NewContactMessage = typeof contactMessages.$inferInsert

export type PersonalInfo = typeof personalInfo.$inferSelect
export type NewPersonalInfo = typeof personalInfo.$inferInsert

export type SocialLink = typeof socialLinks.$inferSelect
export type NewSocialLink = typeof socialLinks.$inferInsert
