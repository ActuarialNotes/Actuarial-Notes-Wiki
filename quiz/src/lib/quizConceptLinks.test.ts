import { describe, expect, it } from 'vitest'
import { conceptLinksFromStored, DEFAULT_CONCEPT_LINKS, parseConceptLinksParam, storedWithConceptLinks } from './quizConceptLinks'

describe('quizConceptLinks', () => {
  it('links concepts in a quiz and not in a practice exam by default', () => {
    expect(DEFAULT_CONCEPT_LINKS).toEqual({ 'quiz': true, 'mock-exam': false })
    expect(conceptLinksFromStored(null, 'quiz')).toBe(true)
    expect(conceptLinksFromStored(null, 'mock-exam')).toBe(false)
  })

  it('keeps each mode’s choice apart', () => {
    const raw = storedWithConceptLinks(null, 'mock-exam', true)
    expect(conceptLinksFromStored(raw, 'mock-exam')).toBe(true)
    expect(conceptLinksFromStored(raw, 'quiz')).toBe(true)
    const off = storedWithConceptLinks(raw, 'quiz', false)
    expect(conceptLinksFromStored(off, 'quiz')).toBe(false)
    expect(conceptLinksFromStored(off, 'mock-exam')).toBe(true)
  })

  it('falls back to the default on anything unreadable', () => {
    expect(conceptLinksFromStored('not json', 'quiz')).toBe(true)
    expect(conceptLinksFromStored('{"quiz":"yes"}', 'quiz')).toBe(true)
  })

  it('reads the URL param as a choice or as nothing', () => {
    expect(parseConceptLinksParam('1')).toBe(true)
    expect(parseConceptLinksParam('0')).toBe(false)
    expect(parseConceptLinksParam(null)).toBeNull()
    expect(parseConceptLinksParam('true')).toBeNull()
  })
})
