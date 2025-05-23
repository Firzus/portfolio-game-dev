import { experiences } from '@/lib/data/portfolio-data'
import ExperienceClient from './ExperienceClient'

export default async function ExperienceSection() {
  return <ExperienceClient experiences={experiences} />
}
