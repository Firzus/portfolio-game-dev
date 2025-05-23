'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/lib/hooks/useTheme'

interface ThemeToggleProps {
  className?: string
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  const handleToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const isDark = theme === 'dark'
  const CurrentIcon = isDark ? Moon : Sun

  return (
    <motion.button
      className={`relative w-12 h-12 rounded-lg flex items-center justify-center transition-all group text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10 ${className}`}
      onClick={handleToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
    >
      <motion.div
        key={isDark ? 'dark' : 'light'}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CurrentIcon size={20} />
      </motion.div>
      
      {/* Tooltip */}
      <div className="absolute left-full ml-4 px-3 py-2 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 bg-gray-900/90 text-white dark:bg-black/80 dark:text-white">
        {isDark ? 'Mode clair' : 'Mode sombre'}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 rotate-45 bg-gray-900/90 dark:bg-black/80" />
      </div>
    </motion.button>
  )
} 