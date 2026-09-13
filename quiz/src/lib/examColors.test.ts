import { describe, it, expect } from 'vitest'
import { examAccent, examAccentStyle, examAccentVivid, examHue } from './examColors'

describe('examHue', () => {
  it('starts at blue on the first preliminary exam', () => {
    expect(examHue('P')).toBe(221)
  })

  it('ends at red on the last exam of the CAS ladder', () => {
    expect(examHue('CAS-9')).toBe(360)
  })

  it('increases chromatically along the ladder', () => {
    const ladder = ['P', 'FM', 'MAS-I', 'MAS-II', 'CAS-5', 'CAS-6', 'CAS-7', 'CAS-8', 'CAS-9']
    const hues = ladder.map(k => examHue(k)!)
    expect(hues.every(h => Number.isFinite(h))).toBe(true)
    for (let i = 1; i < hues.length; i++) expect(hues[i]).toBeGreaterThan(hues[i - 1]!)
  })

  it('gives the SOA ladder the same blue-to-red span', () => {
    expect(examHue('FAM')).toBeGreaterThan(examHue('FM')!)
    expect(examHue('PA')).toBeGreaterThan(examHue('SRM')!)
    // ALTAM and ASTAM are alternatives: one rung, one hue, the end of the ramp
    expect(examHue('ALTAM')).toBe(360)
    expect(examHue('ASTAM')).toBe(examHue('ALTAM'))
  })

  it('agrees on the exams both ladders share', () => {
    // P and FM are sat by candidates on either track — one colour each.
    expect(examHue('P')).toBe(221)
    expect(examHue('FM')).toBe(238.375)
  })

  it('has no accent for requirements that are not exams', () => {
    for (const key of ['VEE-ECON', 'CAS-IA', 'CAS-PCPA', 'CAS-APC', 'FAP', 'FSA-GI101', '']) {
      expect(examHue(key)).toBeUndefined()
      expect(examAccent(key)).toBeUndefined()
      expect(examAccentVivid(key)).toBeUndefined()
      expect(examAccentStyle(key)).toBeUndefined()
    }
  })
})

describe('examAccent', () => {
  it('renders a solid colour by default and a translucent one on request', () => {
    expect(examAccent('P')).toBe('hsl(221 75% 55%)')
    expect(examAccent('P', 0.14)).toBe('hsl(221 75% 55% / 0.14)')
  })

  it('rounds the hue so the ramp stays readable in the DOM', () => {
    expect(examAccent('MAS-I')).toBe('hsl(255.8 75% 55%)')
  })
})

describe('examAccentVivid', () => {
  it('is the same hue, turned up and darkened so white text sits on it', () => {
    expect(examAccentVivid('P')).toBe('hsl(221 88% 46%)')
    // Same hue as the accent proper — only saturation and lightness differ.
    expect(examAccentVivid('MAS-I')).toBe('hsl(255.8 88% 46%)')
  })
})

describe('examAccentStyle', () => {
  it('exposes the custom properties an exam surface can paint with', () => {
    const style = examAccentStyle('CAS-5') as Record<string, string>
    expect(Object.keys(style).sort()).toEqual([
      '--exam-accent', '--exam-accent-muted', '--exam-accent-soft', '--exam-accent-vivid',
    ])
    expect(style['--exam-accent']).toBe('hsl(290.5 75% 55%)')
    expect(style['--exam-accent-soft']).toContain('/ 0.14')
    expect(style['--exam-accent-vivid']).toBe('hsl(290.5 88% 46%)')
  })
})
