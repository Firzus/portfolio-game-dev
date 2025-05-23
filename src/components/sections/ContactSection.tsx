import { getPersonalInfo, getSocialLinks } from '@/lib/db/queries'
import ContactClient from './ContactClient'

export default async function ContactSection() {
  const personalInfo = await getPersonalInfo()
  const socialLinks = await getSocialLinks()

  return (
    <ContactClient 
      personalInfo={personalInfo} 
      socialLinks={socialLinks || []}
    />
  )
}
