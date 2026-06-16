import { useEffect, useState } from 'react'
import type { ColourfulVariant } from '@/lib/colorThemes'

type Theme = 'dark' | 'light'
export type ColorTheme = 'simple' | 'colourful' | 'high-contrast'
export type { ColourfulVariant }

const STORAGE_KEY = 'actuarial-notes-theme'
const COLOR_THEME_STORAGE_KEY = 'actuarial-notes-color-theme'
const COLOURFUL_VARIANT_KEY = 'actuarial-notes-colourful-variant'

const COLOURFUL_VARIANTS: ColourfulVariant[] = ['purple-teal', 'blue-orange', 'rose-amber', 'emerald-pink', 'sky-indigo']

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

function getStoredColourfulVariant(): ColourfulVariant {
  try {
    const stored = localStorage.getItem(COLOURFUL_VARIANT_KEY)
    if (stored && (COLOURFUL_VARIANTS as string[]).includes(stored)) return stored as ColourfulVariant
  } catch {
    // ignore
  }
  return 'purple-teal'
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

function applyColourfulVariant(variant: ColourfulVariant) {
  document.documentElement.setAttribute('data-colourful-variant', variant)
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme)
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(getStoredColorTheme)
  const [colourfulVariant, setColourfulVariantState] = useState<ColourfulVariant>(getStoredColourfulVariant)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    applyColorTheme(colorTheme)
  }, [colorTheme])

  useEffect(() => {
    applyColourfulVariant(colourfulVariant)
  }, [colourfulVariant])

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
      } else if (e.key === COLOURFUL_VARIANT_KEY) {
        const next = e.newValue && (COLOURFUL_VARIANTS as string[]).includes(e.newValue)
          ? e.newValue as ColourfulVariant
          : 'purple-teal'
        setColourfulVariantState(next)
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

  function setColourfulVariant(next: ColourfulVariant) {
    setColourfulVariantState(next)
    try {
      localStorage.setItem(COLOURFUL_VARIANT_KEY, next)
    } catch {
      // ignore
    }
  }

  return { theme, toggleTheme, colorTheme, setColorTheme, colourfulVariant, setColourfulVariant }
}
