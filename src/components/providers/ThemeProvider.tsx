'use client'

import { useEffect } from 'react'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize theme on the client side only
    const initializeTheme = () => {
      const savedTheme = localStorage.getItem('theme') || 'light'
      const root = document.documentElement
      
      if (savedTheme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }

    initializeTheme()
  }, [])

  return <>{children}</>
} 