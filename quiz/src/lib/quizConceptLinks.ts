// Whether a quiz's questions link the concepts they name — the quiz builder's
// "Tap concepts to read them" choice (components/QuizSettingsMenu.tsx).
//
// With it on, a concept a question writes out ("the concept of materiality")
// is underlined, and tapping it opens the concept in the popup the study guide
// reads one in (lib/conceptMentions.ts). Remembered per mode, like the reveal
// and timing choices: a quiz is practice, where looking a word up is the point;
// a practice exam rehearses the sitting, where there is nothing to look up in.
// The launching surface says which in the URL (`links=1` / `links=0`); a
// surface that doesn't falls back to the saved choice.

import type { QuizMode } from './parser'

export const CONCEPT_LINKS_STORAGE_KEY = 'actuarial_quiz_concept_links_v1'

export const DEFAULT_CONCEPT_LINKS: Record<QuizMode, boolean> = {
  'quiz': true,
  'mock-exam': false,
}

/** `links=1` / `links=0` → the choice; anything else says nothing. */
export function parseConceptLinksParam(value: string | null | undefined): boolean | null {
  return value === '1' ? true : value === '0' ? false : null
}

type Stored = Partial<Record<QuizMode, boolean>>

function parseStored(raw: string | null): Stored {
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return {}
    const out: Stored = {}
    for (const mode of ['quiz', 'mock-exam'] as const) {
      const value = (parsed as Record<string, unknown>)[mode]
      if (typeof value === 'boolean') out[mode] = value
    }
    return out
  } catch {
    return {}
  }
}

/** The stored choice for `mode`, or that mode's default. Pure — `raw` is the JSON blob. */
export function conceptLinksFromStored(raw: string | null, mode: QuizMode): boolean {
  return parseStored(raw)[mode] ?? DEFAULT_CONCEPT_LINKS[mode]
}

/** `raw` with `mode`'s choice set, leaving the other mode's alone. */
export function storedWithConceptLinks(raw: string | null, mode: QuizMode, on: boolean): string {
  return JSON.stringify({ ...parseStored(raw), [mode]: on })
}

export function loadConceptLinks(mode: QuizMode): boolean {
  try {
    return conceptLinksFromStored(localStorage.getItem(CONCEPT_LINKS_STORAGE_KEY), mode)
  } catch {
    return DEFAULT_CONCEPT_LINKS[mode]
  }
}

export function saveConceptLinks(mode: QuizMode, on: boolean): void {
  try {
    localStorage.setItem(
      CONCEPT_LINKS_STORAGE_KEY,
      storedWithConceptLinks(localStorage.getItem(CONCEPT_LINKS_STORAGE_KEY), mode, on),
    )
  } catch {
    /* ignore quota/private-mode errors */
  }
}
