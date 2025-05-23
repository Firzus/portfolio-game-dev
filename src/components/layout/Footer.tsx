import { getPersonalInfo, getSocialLinks } from '@/lib/db/queries'
import FooterClient from './FooterClient'

export default async function Footer() {
  const personalInfo = await getPersonalInfo()
  const socialLinks = await getSocialLinks()

  return (
    <FooterClient 
      personalInfo={personalInfo} 
      socialLinks={socialLinks || []}
    />
  )
}
