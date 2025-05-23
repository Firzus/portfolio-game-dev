import { getPersonalInfo, getSocialLinks } from '@/lib/db/queries'
import HeroClient from './HeroClient'

export default async function HeroSection() {
  const personalInfo = await getPersonalInfo()
  const socialLinks = await getSocialLinks()

  if (!personalInfo) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </section>
    )
  }

  // Combiner les données pour correspondre au format attendu
  const combinedPersonalInfo = {
    ...personalInfo,
    socialLinks: socialLinks || []
  }

  return <HeroClient personalInfo={combinedPersonalInfo} />
}
