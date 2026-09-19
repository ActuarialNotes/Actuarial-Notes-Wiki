// When a quiz shows the answer: as you go, or all at once on the review screen.
//
// The quiz page has always understood a `reveal` search param, but nothing ever
// set it to anything but 'during' and a practice exam ignored it entirely
// (`showExplanation` was gated on `mode === 'quiz'`). This module is the missing
// half: the reader's choice, remembered per mode, so the checkbox on the quiz
// builder survives a reload and every launch surface agrees on the default.

import type { QuizMode } from './parser'

/** 'during' unfolds the explanation after each answer; 'end' holds it all for /review. */
export type RevealMode = 'during' | 'end'

export const REVEAL_STORAGE_KEY = 'actuarial_quiz_reveal_v1'

/**
 * A quiz is practice *with* feedback, so it corrects you question by question;
 * a practice exam is a rehearsal of the real sitting, where nobody tells you
 * anything until the paper is handed in. Hence the split default — one checkbox,
 * but it starts where each mode's purpose puts it.
 */
export const DEFAULT_REVEAL: Record<QuizMode, RevealMode> = {
  'quiz': 'during',
  'mock-exam': 'end',
}

/** Narrow an untrusted string (a URL param, a stored value) to a RevealMode. */
export function parseRevealMode(value: string | null | undefined): RevealMode | null {
  return value === 'during' || value === 'end' ? value : null
}

type StoredReveal = Partial<Record<QuizMode, RevealMode>>

function parseStored(raw: string | null): StoredReveal {
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return {}
    const out: StoredReveal = {}
    for (const mode of ['quiz', 'mock-exam'] as const) {
      const value = parseRevealMode((parsed as Record<string, unknown>)[mode] as string | undefined)
      if (value) out[mode] = value
    }
    return out
  } catch {
    return {}
  }
}

/** The stored choice for `mode`, or that mode's default. Pure — `raw` is the JSON blob. */
export function revealFromStored(raw: string | null, mode: QuizMode): RevealMode {
  return parseStored(raw)[mode] ?? DEFAULT_REVEAL[mode]
}

/** `raw` with `mode`'s choice set to `reveal`, leaving the other mode's alone. */
export function storedWithReveal(raw: string | null, mode: QuizMode, reveal: RevealMode): string {
  return JSON.stringify({ ...parseStored(raw), [mode]: reveal })
}

export function loadRevealMode(mode: QuizMode): RevealMode {
  try {
    return revealFromStored(localStorage.getItem(REVEAL_STORAGE_KEY), mode)
  } catch {
    return DEFAULT_REVEAL[mode]
  }
}

export function saveRevealMode(mode: QuizMode, reveal: RevealMode): void {
  try {
    const next = storedWithReveal(localStorage.getItem(REVEAL_STORAGE_KEY), mode, reveal)
    localStorage.setItem(REVEAL_STORAGE_KEY, next)
  } catch {
    /* ignore quota/private-mode errors */
  }
}
