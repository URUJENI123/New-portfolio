'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-md bg-white bg-opacity-10 hover:bg-opacity-20 transition-all text-white"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.12-2.122a4 4 0 005.656-5.656l2.12 2.122a6 6 0 01-5.656 5.656zM4.929 4.929a1 1 0 011.414 0L6.586 6.17a1 1 0 01-1.414 1.414l-1.243-1.243a1 1 0 010-1.414zm2.83-2.83a1 1 0 011.414 0l2.83 2.83a1 1 0 11-1.414 1.414L7.757 3.515a1 1 0 010-1.414zM4.929 15.071a1 1 0 011.414 0l1.243 1.243a1 1 0 11-1.414 1.414l-1.243-1.243a1 1 0 010-1.414zm2.83 2.83a1 1 0 011.414 0l2.83-2.83a1 1 0 11-1.414-1.414l-2.83 2.83a1 1 0 010 1.414zM15.071 4.929a1 1 0 011.414 0l1.243 1.243a1 1 0 11-1.414 1.414l-1.243-1.243a1 1 0 010-1.414zm2.83-2.83a1 1 0 011.414 0l-2.83 2.83a1 1 0 11-1.414-1.414l2.83-2.83a1 1 0 010-1.414zm0 11.314a1 1 0 01-1.414 1.414l-2.83-2.83a1 1 0 111.414-1.414l2.83 2.83zm-2.83 2.83a1 1 0 01-1.414-1.414l2.83-2.83a1 1 0 111.414 1.414l-2.83 2.83zM10 15a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm-1-4a1 1 0 100-2h-1a1 1 0 100 2h1zm0-4a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  )
}
