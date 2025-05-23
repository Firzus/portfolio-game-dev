'use client'

import { useState, useEffect } from 'react'

export type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')

  // Function to apply theme
  const applyTheme = (currentTheme: Theme) => {
    if (typeof window === 'undefined') return

    const root = document.documentElement
    
    if (currentTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const initialTheme = savedTheme || 'light'
    setTheme(initialTheme)
    applyTheme(initialTheme)
  }, [])

  // Update theme
  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  return {
    theme,
    resolvedTheme: theme,
    setTheme: updateTheme,
  }
} 