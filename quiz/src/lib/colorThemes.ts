import type { ColorTheme } from '@/hooks/useTheme'

export type ColourfulVariant = 'purple-teal' | 'blue-orange' | 'rose-amber' | 'emerald-pink' | 'sky-indigo'

interface PreviewColors {
  background: string
  primary: string
  accent: string
}

export interface ColourfulVariantOption {
  id: ColourfulVariant
  light: { primary: string; accent: string }
  dark: { primary: string; accent: string }
}

export interface ColorThemeOption {
  id: ColorTheme
  name: string
  preview: { light: PreviewColors; dark: PreviewColors }
  variants?: ColourfulVariantOption[]
}

// Static hex approximations of the CSS variables in index.css, used to render
// theme swatches without depending on which theme is currently active.
export const COLOR_THEMES: ColorThemeOption[] = [
  {
    id: 'simple',
    name: 'Minimal',
    preview: {
      light: { background: '#eef0f4', primary: '#171717', accent: '#f0f0f0' },
      dark: { background: '#0d0f12', primary: '#e8e8e8', accent: '#242424' },
    },
  },
  {
    id: 'colourful',
    name: 'Colourful',
    preview: {
      light: { background: '#f5f6ff', primary: '#7c3aed', accent: '#14b8a6' },
      dark: { background: '#130f1e', primary: '#a989f5', accent: '#22d3ac' },
    },
    variants: [
      {
        id: 'purple-teal',
        light: { primary: '#7c3aed', accent: '#14b8a6' },
        dark: { primary: '#a989f5', accent: '#22d3ac' },
      },
      {
        id: 'blue-orange',
        light: { primary: '#3b82f6', accent: '#f97316' },
        dark: { primary: '#60a5fa', accent: '#fb923c' },
      },
      {
        id: 'rose-amber',
        light: { primary: '#e11d48', accent: '#f59e0b' },
        dark: { primary: '#fb7185', accent: '#fbbf24' },
      },
      {
        id: 'emerald-pink',
        light: { primary: '#059669', accent: '#ec4899' },
        dark: { primary: '#34d399', accent: '#f472b6' },
      },
      {
        id: 'sky-indigo',
        light: { primary: '#0ea5e9', accent: '#6366f1' },
        dark: { primary: '#38bdf8', accent: '#818cf8' },
      },
    ],
  },
  {
    id: 'high-contrast',
    name: 'High Contrast',
    preview: {
      light: { background: '#ffffff', primary: '#000000', accent: '#000000' },
      dark: { background: '#000000', primary: '#ffffff', accent: '#ffffff' },
    },
  },
]
