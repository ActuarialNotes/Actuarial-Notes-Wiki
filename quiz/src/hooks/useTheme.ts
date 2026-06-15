import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'
export type ColorTheme = 'simple' | 'colourful' | 'high-contrast'

const STORAGE_KEY = 'actuarial-notes-theme'
const COLOR_THEME_STORAGE_KEY = 'actuarial-notes-color-theme'

function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light') return 'light'
  } catch {
    // ignore
  }
  return 'dark' // default to dark, matching wiki default
}

function getStoredColorTheme(): ColorTheme {
  try {
    const stored = localStorage.getItem(COLOR_THEME_STORAGE_KEY)
    if (stored === 'colourful' || stored === 'high-contrast') return stored
  } catch {
    // ignore
  }
  return 'simple'
}

function applyTheme(theme: Theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

function applyColorTheme(colorTheme: ColorTheme) {
  document.documentElement.setAttribute('data-color-theme', colorTheme)
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme)
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(getStoredColorTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    applyColorTheme(colorTheme)
  }, [colorTheme])

  // Cross-tab sync: when wiki toggles theme, quiz picks it up
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) {
        const next: Theme = e.newValue === 'light' ? 'light' : 'dark'
        setTheme(next)
      } else if (e.key === COLOR_THEME_STORAGE_KEY) {
        const next: ColorTheme = e.newValue === 'colourful' || e.newValue === 'high-contrast'
          ? e.newValue
          : 'simple'
        setColorThemeState(next)
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }

  function setColorTheme(next: ColorTheme) {
    setColorThemeState(next)
    try {
      localStorage.setItem(COLOR_THEME_STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }

  return { theme, toggleTheme, colorTheme, setColorTheme }
}
