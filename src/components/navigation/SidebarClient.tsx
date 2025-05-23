'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Home, 
  Code, 
  FolderOpen, 
  Briefcase, 
  GraduationCap, 
  Mail,
  Menu,
  X
} from 'lucide-react'
import { scrollToElement } from '@/lib/utils'
import ThemeToggle from '@/components/ui/ThemeToggle'

interface NavigationItem {
  id: string
  label: string
  icon: string
}

interface SidebarClientProps {
  navigationItems: NavigationItem[]
}

const iconMap = {
  home: Home,
  code: Code,
  folder: FolderOpen,
  briefcase: Briefcase,
  graduation: GraduationCap,
  mail: Mail
}

const sidebarVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: "easeOut"
    }
  })
}

export default function SidebarClient({ navigationItems }: SidebarClientProps) {
  const [activeSection, setActiveSection] = useState('hero')
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) {
        setIsOpen(false) // Close mobile menu on desktop
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.id)
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navigationItems])

  const handleNavigation = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      scrollToElement(sectionId, 80)
    }
    
    if (isMobile) {
      setIsOpen(false)
    }
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <motion.button
          className="fixed top-6 left-6 z-50 w-12 h-12 rounded-lg vite-card flex items-center justify-center text-white/80 hover:text-white"
          onClick={toggleSidebar}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {(!isMobile || isOpen) && (
          <>
            {/* Mobile Overlay */}
            {isMobile && (
              <motion.div
                className="fixed inset-0 bg-black/50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />
            )}

            {/* Sidebar Container */}
            <motion.nav
              className={`fixed ${isMobile ? 'top-0 left-0 h-full' : 'top-3 left-3 h-[calc(100vh-24px)]'} w-12 z-50 flex flex-col`}
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="vite-card h-full flex flex-col items-center py-3 relative">
                {/* Brand Logo */}
                <motion.div
                  className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#42d392] to-[#647eff] flex items-center justify-center mb-4 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation('hero')}
                >
                  <span className="text-white font-bold text-xs">AD</span>
                </motion.div>

                {/* Navigation Items */}
                <div className="flex-1 flex flex-col gap-2">
                  {navigationItems.map((item, index) => {
                    const IconComponent = iconMap[item.icon as keyof typeof iconMap]
                    const isActive = activeSection === item.id

                    return (
                      <motion.button
                        key={item.id}
                        className={`relative w-8 h-8 rounded-lg flex items-center justify-center transition-all group ${
                          isActive 
                            ? 'bg-gradient-to-br from-[#42d392] to-[#647eff] text-white' 
                            : 'text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                        variants={itemVariants}
                        custom={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleNavigation(item.id)}
                        title={item.label}
                      >
                        <IconComponent size={16} />
                        
                        {/* Tooltip */}
                        <div className="absolute left-full ml-2 px-2 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          {item.label}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black/80 rotate-45" />
                        </div>

                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-gradient-to-b from-[#42d392] to-[#647eff] rounded-full"
                            layoutId="activeIndicator"
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          />
                        )}
                      </motion.button>
                    )
                  })}
                </div>

                {/* Social Links & Theme */}
                <div className="mt-4 pt-3 border-t border-white/10 space-y-1">
                  {/* Theme Toggle */}
                  <ThemeToggle />
                  
                  {/* GitHub Link */}
                  <motion.a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="GitHub"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
