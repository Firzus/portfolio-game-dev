import { getAllExperiences } from '@/lib/db/queries'
import ExperienceClient from './ExperienceClient'

export default async function ExperienceSection() {
  const experiences = await getAllExperiences()

  return <ExperienceClient experiences={experiences} />
}
