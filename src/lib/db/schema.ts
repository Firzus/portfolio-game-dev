import { pgTable, serial, varchar, text, boolean, timestamp, date, integer } from 'drizzle-orm/pg-core'

// Projects table
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  shortDescription: varchar('short_description', { length: 500 }),
  image: varchar('image', { length: 500 }),
  demoUrl: varchar('demo_url', { length: 500 }),
  sourceUrl: varchar('source_url', { length: 500 }),
  technologies: text('technologies').array(),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Blog posts table
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: text('content').notNull(),
  excerpt: varchar('excerpt', { length: 500 }),
  image: varchar('image', { length: 500 }),
  published: boolean('published').default(false),
  publishedAt: timestamp('published_at'),
  tags: text('tags').array(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Skills table
export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  level: integer('level').notNull(), // 1-10
  icon: varchar('icon', { length: 255 }),
  color: varchar('color', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Contact messages table
export const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }),
  message: text('message').notNull(),
  replied: boolean('replied').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Testimonials table
export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  position: varchar('position', { length: 255 }),
  company: varchar('company', { length: 255 }),
  content: text('content').notNull(),
  image: varchar('image', { length: 500 }),
  rating: integer('rating').default(5),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Game development work/experience table
export const gameDevWork = pgTable('game_dev_work', {
  id: serial('id').primaryKey(),
  company: varchar('company', { length: 255 }).notNull(),
  position: varchar('position', { length: 255 }).notNull(),
  description: text('description').notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date'),
  current: boolean('current').default(false),
  location: varchar('location', { length: 255 }),
  technologies: text('technologies').array(),
  achievements: text('achievements').array(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Users table for Better Auth avec support username
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: varchar('image', { length: 500 }),
  username: varchar('username', { length: 255 }).unique(),
  displayUsername: varchar('display_username', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Sessions table for Better Auth
export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  ipAddress: varchar('ip_address', { length: 255 }),
  userAgent: varchar('user_agent', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Accounts table for Better Auth (pour email/password)
export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  accountId: varchar('account_id', { length: 255 }).notNull(),
  providerId: varchar('provider_id', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }),
  accessToken: varchar('access_token', { length: 500 }),
  refreshToken: varchar('refresh_token', { length: 500 }),
  idToken: varchar('id_token', { length: 500 }),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: varchar('scope', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Verification table for Better Auth
export const verification = pgTable('verification', {
  id: serial('id').primaryKey(),
  identifier: varchar('identifier', { length: 255 }).notNull(),
  token: varchar('token', { length: 255 }).notNull(),
  value: varchar('value', { length: 255 }).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Type exports for TypeScript
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert

export type Post = typeof posts.$inferSelect
export type NewPost = typeof posts.$inferInsert

export type Skill = typeof skills.$inferSelect
export type NewSkill = typeof skills.$inferInsert

export type ContactMessage = typeof contactMessages.$inferSelect
export type NewContactMessage = typeof contactMessages.$inferInsert

export type Testimonial = typeof testimonials.$inferSelect
export type NewTestimonial = typeof testimonials.$inferInsert

export type GameDevWork = typeof gameDevWork.$inferSelect
export type NewGameDevWork = typeof gameDevWork.$inferInsert

export { accounts as account };
