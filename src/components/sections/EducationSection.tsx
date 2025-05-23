import { getAllEducation } from '@/lib/db/queries'
import EducationClient from './EducationClient'

export default async function EducationSection() {
  const education = await getAllEducation()

  return <EducationClient education={education} />
}
