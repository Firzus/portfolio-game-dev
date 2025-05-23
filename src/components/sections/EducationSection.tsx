import { education } from '@/lib/data/portfolio-data'
import EducationClient from './EducationClient'

export default async function EducationSection() {
  return <EducationClient education={education} />
}
