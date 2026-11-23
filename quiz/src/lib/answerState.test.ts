import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  ANSWER_EDGE,
  ANSWER_FILL,
  ANSWER_LABEL,
  ANSWER_PENDING,
  ANSWER_SOLID,
  ANSWER_STATES,
  ANSWER_TEXT,
  answerStateFromCredit,
} from './answerState'

const css = readFileSync(fileURLToPath(new URL('../index.css', import.meta.url)), 'utf8')

/** The `--name: h s% l%` tokens of one theme block (`:root` or `.dark`). */
function tokens(selector: ':root' | '.dark'): Record<string, [number, number, number]> {
  const start = css.indexOf(`${selector} {`)
  const block = css.slice(start, css.indexOf('}', start))
  const out: Record<string, [number, number, number]> = {}
  for (const m of block.matchAll(/--([\w-]+):\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/g)) {
    out[m[1]] = [Number(m[2]), Number(m[3]), Number(m[4])]
  }
  return out
}

function luminance([h, s, l]: [number, number, number]): number {
  const sat = s / 100
  const light = l / 100
  const a = sat * Math.min(light, 1 - light)
  const channel = (n: number) => {
    const k = (n + h / 30) % 12
    const v = light - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)))
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(0) + 0.7152 * channel(8) + 0.0722 * channel(4)
}

function contrast(a: [number, number, number], b: [number, number, number]): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

describe('answer states', () => {
  it('has a label and every class form for each state', () => {
    for (const state of ANSWER_STATES) {
      expect(ANSWER_LABEL[state]).toBeTruthy()
      for (const map of [ANSWER_FILL, ANSWER_TEXT, ANSWER_EDGE, ANSWER_SOLID]) {
        expect(map[state]).toContain(`answer-${state}`)
      }
    }
  })

  it('draws "not reached yet" in the line colour, not the unanswered grey', () => {
    expect(ANSWER_PENDING).toBe('bg-border')
    expect(ANSWER_PENDING).not.toBe(ANSWER_FILL.unanswered)
  })

  it('reads a state off a credit', () => {
    expect(answerStateFromCredit(1)).toBe('correct')
    expect(answerStateFromCredit(0)).toBe('incorrect')
    expect(answerStateFromCredit(0.5)).toBe('partial')
    expect(answerStateFromCredit(null)).toBe('unanswered')
    expect(answerStateFromCredit(undefined)).toBe('unanswered')
  })
})

describe('the base tokens', () => {
  for (const selector of [':root', '.dark'] as const) {
    const t = tokens(selector)

    it(`${selector}: the ground is the far end from the text`, () => {
      expect(t.ground[2]).toBe(selector === ':root' ? 100 : 0)
      expect(contrast(t.ground, t.foreground)).toBeCloseTo(21, 0)
    })

    it(`${selector}: every answer colour carries the ground colour as text`, () => {
      for (const state of ANSWER_STATES) {
        expect(contrast(t[`answer-${state}`], t.ground), state).toBeGreaterThanOrEqual(4.5)
      }
    })

    it(`${selector}: the level shades are seen on the ground and step toward the text`, () => {
      expect(contrast(t['level-1'], t.ground)).toBeGreaterThanOrEqual(3)
      expect(contrast(t['level-2'], t.ground)).toBeGreaterThan(contrast(t['level-1'], t.ground))
      expect(contrast(t.foreground, t.ground)).toBeGreaterThan(contrast(t['level-2'], t.ground))
    })

    it(`${selector}: the unanswered grey is not the line colour`, () => {
      expect(Math.abs(t['answer-unanswered'][2] - t.border[2])).toBeGreaterThanOrEqual(20)
    })
  }
})
