/**
 * How strictly the question spreadsheet keeps to the exam day's rules — the
 * reader's choice (docs/question-spreadsheet.md):
 *
 *  - `off`     the full spreadsheet; nothing is checked.
 *  - `warn`    everything works; a formula using a function the exam's
 *              spreadsheet doesn't offer is marked.
 *  - `enforce` only what the exam's spreadsheet allows: such a formula is
 *              refused, and function keys do nothing.
 *
 * Remembered per mode, like when the answers show (`lib/revealMode.ts`), and
 * for the same reason the defaults split: a quiz is practice, so it points the
 * difference out; a practice exam is the rehearsal, so it holds you to it.
 */

import type { QuizMode } from './parser'

export type SheetRules = 'off' | 'warn' | 'enforce'

export const SHEET_RULES: readonly SheetRules[] = ['off', 'warn', 'enforce']

export const SHEET_RULES_LABEL: Record<SheetRules, string> = {
  off: 'Off',
  warn: 'Warn',
  enforce: 'Enforce',
}

export const DEFAULT_SHEET_RULES: Record<QuizMode, SheetRules> = {
  'quiz': 'warn',
  'mock-exam': 'enforce',
}

export const SHEET_RULES_STORAGE_KEY = 'actuarial_sheet_rules_v1'

export function parseSheetRules(value: unknown): SheetRules | null {
  return value === 'off' || value === 'warn' || value === 'enforce' ? value : null
}

type Stored = Partial<Record<QuizMode, SheetRules>>

function parseStored(raw: string | null): Stored {
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return {}
    const out: Stored = {}
    for (const mode of ['quiz', 'mock-exam'] as const) {
      const value = parseSheetRules((parsed as Record<string, unknown>)[mode])
      if (value) out[mode] = value
    }
    return out
  } catch {
    return {}
  }
}

/** The stored choice for `mode`, or that mode's default. Pure — `raw` is the JSON blob. */
export function sheetRulesFromStored(raw: string | null, mode: QuizMode): SheetRules {
  return parseStored(raw)[mode] ?? DEFAULT_SHEET_RULES[mode]
}

/** `raw` with `mode`'s choice set, leaving the other mode's alone. */
export function storedWithSheetRules(raw: string | null, mode: QuizMode, rules: SheetRules): string {
  return JSON.stringify({ ...parseStored(raw), [mode]: rules })
}

export function loadSheetRules(mode: QuizMode): SheetRules {
  try {
    return sheetRulesFromStored(localStorage.getItem(SHEET_RULES_STORAGE_KEY), mode)
  } catch {
    return DEFAULT_SHEET_RULES[mode]
  }
}

export function saveSheetRules(mode: QuizMode, rules: SheetRules): void {
  try {
    localStorage.setItem(SHEET_RULES_STORAGE_KEY, storedWithSheetRules(localStorage.getItem(SHEET_RULES_STORAGE_KEY), mode, rules))
  } catch {
    /* ignore quota/private-mode errors */
  }
}

/** Function keys F1–F10: what Enforce swallows. F11/F12 stay the browser's. */
export function isBlockedFunctionKey(key: string): boolean {
  return /^F([1-9]|10)$/.test(key)
}
