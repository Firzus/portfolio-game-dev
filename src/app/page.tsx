import HeroSection from '@/components/sections/HeroSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import EducationSection from '@/components/sections/EducationSection'
import ContactSection from '@/components/sections/ContactSection'
import Sidebar from '@/components/navigation/Sidebar'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1">
          <section id="hero">
            <HeroSection />
          </section>
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <EducationSection />
          <ContactSection />
        </main>
      </div>
      <Footer />
    </>
  )
}
