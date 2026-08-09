import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MasteryBadge } from './MasteryBadge'
import {
  MASTERY_FILL,
  MASTERY_LABEL,
  MASTERY_TEXT,
  MASTERY_TINT,
} from '@/lib/masteryBadge'
import type { MasteryState } from '@/lib/mastery'

const ALL_STATES: MasteryState[] = ['new', 'level1', 'level2', 'level3', 'forgotten']

describe('MasteryBadge', () => {
  it('prints the full label by default', () => {
    expect(renderToStaticMarkup(<MasteryBadge state="level2" />)).toContain('Level 2')
  })

  it('prints the bare level number when compact, keeping the full accessible name', () => {
    const html = renderToStaticMarkup(<MasteryBadge state="level2" compact />)
    expect(html).toContain('>2<')
    expect(html).not.toContain('>Level 2<')
    expect(html).toContain('aria-label="Level 2"')
  })

  it('never leaves a compact badge without an accessible name', () => {
    for (const state of ALL_STATES) {
      const html = renderToStaticMarkup(<MasteryBadge state={state} compact />)
      expect(html, state).toContain(`aria-label="${MASTERY_LABEL[state]}"`)
    }
  })
})

describe('the mastery ladder palette', () => {
  it('covers every mastery state in every form', () => {
    for (const state of ALL_STATES) {
      expect(MASTERY_LABEL[state], state).toBeTruthy()
      expect(MASTERY_TINT[state], state).toBeTruthy()
      expect(MASTERY_TEXT[state], state).toBeTruthy()
      expect(MASTERY_FILL[state], state).toBeTruthy()
    }
  })

  // Style guide §4.1: red means incorrect/error, amber means "at risk". A
  // decayed concept is at risk. The Study Guide radial keeps red on purpose
  // (see lib/masteryFill.ts) because its keystone ladder is already gold —
  // that exception is deliberately confined to the radial.
  it('signals Forgotten as at-risk amber, not error red', () => {
    for (const form of [MASTERY_TINT, MASTERY_TEXT, MASTERY_FILL]) {
      expect(form.forgotten).toContain('amber')
      expect(form.forgotten).not.toContain('red')
      expect(form.forgotten).not.toContain('rose')
    }
  })

  it('climbs one green family from Level 1 to Level 3', () => {
    for (const level of ['level1', 'level2', 'level3'] as const) {
      expect(MASTERY_TINT[level], level).toContain('green')
      expect(MASTERY_TEXT[level], level).toContain('green')
      expect(MASTERY_FILL[level], level).toContain('green')
      // Style guide §4.2 picks `green` over its `emerald` sibling for the ladder.
      expect(MASTERY_TINT[level], level).not.toContain('emerald')
    }
  })

  it('leaves New uncoloured so an untouched concept reads as neutral', () => {
    expect(MASTERY_TINT.new).toContain('muted')
    expect(MASTERY_TEXT.new).toContain('muted')
  })
})
