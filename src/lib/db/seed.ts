import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { projects, experiences, education, skills, personalInfo, socialLinks } from './schema'
import { personalInfo as staticPersonalInfo, projects as staticProjects, experiences as staticExperiences, education as staticEducation, skills as staticSkills } from '../data/portfolio-data'

// Charger les variables d'environnement
config({ path: '.env.local' })

// Créer la connexion directement
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: {
    rejectUnauthorized: false
  }
})

const db = drizzle(pool, { schema: { projects, experiences, education, skills, personalInfo, socialLinks } })

export async function seedDatabase() {
  try {
    console.log('🌱 Début du seeding de la base de données...')

    // Seed Personal Info
    console.log('📝 Insertion des informations personnelles...')
    await db.insert(personalInfo).values({
      name: staticPersonalInfo.name,
      title: staticPersonalInfo.title,
      bio: staticPersonalInfo.bio,
      email: staticPersonalInfo.email,
      location: staticPersonalInfo.location,
      avatarUrl: staticPersonalInfo.avatar,
      resumeUrl: staticPersonalInfo.resume,
    })

    // Seed Social Links
    console.log('🔗 Insertion des liens sociaux...')
    for (let i = 0; i < staticPersonalInfo.socialLinks.length; i++) {
      const link = staticPersonalInfo.socialLinks[i]
      await db.insert(socialLinks).values({
        name: link.name,
        url: link.url,
        icon: link.icon,
        order: i,
      })
    }

    // Seed Skills
    console.log('🎯 Insertion des compétences...')
    for (const skill of staticSkills) {
      await db.insert(skills).values({
        name: skill.name,
        level: skill.level,
        category: skill.category,
      })
    }

    // Seed Projects
    console.log('🚀 Insertion des projets...')
    for (const project of staticProjects) {
      await db.insert(projects).values({
        title: project.title,
        description: project.description,
        longDescription: project.longDescription,
        imageUrl: project.image,
        technologies: project.technologies,
        category: project.category,
        githubUrl: project.links.github,
        demoUrl: project.links.demo,
        youtubeUrl: project.links.youtube,
        websiteUrl: project.links.website,
        featured: project.featured,
        createdAt: new Date(project.createdAt),
      })
    }

    // Seed Experiences
    console.log('💼 Insertion des expériences...')
    for (const experience of staticExperiences) {
      await db.insert(experiences).values({
        company: experience.company,
        position: experience.position,
        description: experience.description,
        technologies: experience.technologies,
        startDate: experience.startDate,
        endDate: experience.endDate || null,
        logoUrl: experience.logo,
        location: experience.location,
      })
    }

    // Seed Education
    console.log('🎓 Insertion du parcours scolaire...')
    for (const edu of staticEducation) {
      await db.insert(education).values({
        institution: edu.institution,
        degree: edu.degree,
        field: edu.field,
        description: edu.description,
        startDate: edu.startDate,
        endDate: edu.endDate,
        logoUrl: edu.logo,
        location: edu.location,
      })
    }

    console.log('✅ Seeding terminé avec succès !')
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error)
    throw error
  }
}

// Exécuter le seeding si ce fichier est appelé directement
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('🎉 Base de données seedée avec succès !')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Erreur lors du seeding:', error)
      process.exit(1)
    })
}
