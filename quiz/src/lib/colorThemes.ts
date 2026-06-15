import type { ColorTheme } from '@/hooks/useTheme'

interface PreviewColors {
  background: string
  primary: string
  accent: string
}

export interface ColorThemeOption {
  id: ColorTheme
  name: string
  description: string
  preview: { light: PreviewColors; dark: PreviewColors }
}

// Static hex approximations of the CSS variables in index.css, used to render
// theme swatches without depending on which theme is currently active.
export const COLOR_THEMES: ColorThemeOption[] = [
  {
    id: 'simple',
    name: 'Simple',
    description: 'The current minimal look.',
    preview: {
      light: { background: '#eef0f4', primary: '#171717', accent: '#f0f0f0' },
      dark: { background: '#0d0f12', primary: '#e8e8e8', accent: '#242424' },
    },
  },
  {
    id: 'colourful',
    name: 'Colourful',
    description: 'Vibrant purple and teal accents.',
    preview: {
      light: { background: '#f5f6ff', primary: '#7c3aed', accent: '#14b8a6' },
      dark: { background: '#130f1e', primary: '#a989f5', accent: '#22d3ac' },
    },
  },
  {
    id: 'high-contrast',
    name: 'High Contrast',
    description: 'Pure black and white for maximum readability.',
    preview: {
      light: { background: '#ffffff', primary: '#000000', accent: '#000000' },
      dark: { background: '#000000', primary: '#ffffff', accent: '#ffffff' },
    },
  },
]
