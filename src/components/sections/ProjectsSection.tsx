import { getAllProjects, getFeaturedProjects } from '@/lib/db/queries'
import ProjectsClient from './ProjectsClient'

export default async function ProjectsSection() {
  const projects = await getAllProjects()
  const featuredProjects = await getFeaturedProjects()

  return (
    <ProjectsClient 
      projects={projects} 
      featuredProjects={featuredProjects}
    />
  )
}
