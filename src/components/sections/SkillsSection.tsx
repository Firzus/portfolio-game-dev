import { getAllSkills } from '@/lib/db/queries'
import SkillsClient from './SkillsClient'

export default async function SkillsSection() {
  const skills = await getAllSkills()

  return <SkillsClient skills={skills} />
}
