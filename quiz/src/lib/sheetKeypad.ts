/**
 * **The spreadsheet keypad** — what the phone's number pad does to the cell
 * being entered (components/quiz/SheetKeypad.tsx, docs/question-spreadsheet.md).
 *
 * A phone's own keyboard hides half the sheet and buries the operators a
 * formula needs. The keypad is digits, operators and a row of the functions
 * exam questions lean on, typed into one entry line. Like a desktop
 * spreadsheet, a cell is either *ready* (selected — the first key typed
 * replaces what is in it) or being *edited* (keys go in at the caret). While a
 * formula is waiting for an argument, tapping a cell types its address
 * (*pointing*), and tapping another cell before typing anything else swaps
 * that address for the new one.
 */

import { formulaText } from './formulaRefs'

/** The functions offered as keys, in the order they are shown. */
export const KEYPAD_FUNCTIONS = [
  'SUM', 'AVERAGE', 'ROUND', 'SQRT', 'EXP', 'LN', 'POWER', 'SUMPRODUCT', 'PRODUCT', 'MIN', 'MAX', 'ABS', 'COUNT',
] as const

export interface KeypadKey {
  /** What the key shows. */
  label: string
  /** What it types, or the action it takes. */
  insert?: string
  action?: 'backspace' | 'down' | 'right'
  /** Read out for a screen reader where the label is a symbol. */
  name?: string
}

/** The pad, row by row: six keys a row. */
export const KEYPAD_ROWS: readonly (readonly KeypadKey[])[] = [
  [{ label: '7', insert: '7' }, { label: '8', insert: '8' }, { label: '9', insert: '9' }, { label: '(', insert: '(' }, { label: ')', insert: ')' }, { label: '⌫', action: 'backspace', name: 'Delete' }],
  [{ label: '4', insert: '4' }, { label: '5', insert: '5' }, { label: '6', insert: '6' }, { label: '÷', insert: '/', name: 'Divide' }, { label: '×', insert: '*', name: 'Multiply' }, { label: '^', insert: '^', name: 'Power' }],
  [{ label: '1', insert: '1' }, { label: '2', insert: '2' }, { label: '3', insert: '3' }, { label: '−', insert: '-', name: 'Minus' }, { label: '+', insert: '+', name: 'Plus' }, { label: '=', insert: '=', name: 'Equals' }],
  [{ label: '0', insert: '0' }, { label: '.', insert: '.', name: 'Point' }, { label: ',', insert: ',', name: 'Comma' }, { label: ':', insert: ':', name: 'Range' }, { label: '→', action: 'right', name: 'Enter and move right' }, { label: '↵', action: 'down', name: 'Enter and move down' }],
]

export interface Entry {
  /** The entry line's text. */
  text: string
  /** The caret, as an index into `text`. */
  caret: number
  /** `ready`: the cell's content, replaced by the first key. `edit`: keys go in at the caret. */
  mode: 'ready' | 'edit'
  /** Where an address typed by pointing starts, so the next tap replaces it. */
  pointedAt: number | null
}

/** A selected cell, its content shown and waiting for the first key. */
export function readyEntry(content: string): Entry {
  return { text: content, caret: content.length, mode: 'ready', pointedAt: null }
}

/** Editing what is in the cell, the caret at the end. */
export function editEntry(content: string): Entry {
  return { text: content, caret: content.length, mode: 'edit', pointedAt: null }
}

/** Type `s` at the caret — replacing everything if the cell was only ready. */
export function typeInto(entry: Entry, s: string): Entry {
  if (entry.mode === 'ready') return { text: s, caret: s.length, mode: 'edit', pointedAt: null }
  const text = entry.text.slice(0, entry.caret) + s + entry.text.slice(entry.caret)
  return { text, caret: entry.caret + s.length, mode: 'edit', pointedAt: null }
}

/** A function key types the name and its opening bracket. */
export function typeFunction(entry: Entry, name: string): Entry {
  const start = entry.mode === 'ready' || entry.text === '' ? '=' : ''
  return typeInto(entry.mode === 'ready' ? { ...entry, text: '', caret: 0, mode: 'edit' } : entry, `${start}${name}(`)
}

/** Delete the character before the caret; on a ready cell, clear it. */
export function backspace(entry: Entry): Entry {
  if (entry.mode === 'ready') return { text: '', caret: 0, mode: 'edit', pointedAt: null }
  if (entry.caret === 0) return { ...entry, pointedAt: null }
  const text = entry.text.slice(0, entry.caret - 1) + entry.text.slice(entry.caret)
  return { text, caret: entry.caret - 1, mode: 'edit', pointedAt: null }
}

/**
 * Whether a tapped cell should type its address rather than move: a formula
 * being edited whose caret follows `=`, an operator, a bracket, a comma or a
 * colon — or an address just typed by pointing, which the tap replaces.
 */
export function isPointing(entry: Entry): boolean {
  if (entry.mode !== 'edit' || !entry.text.startsWith('=')) return false
  if (entry.pointedAt !== null) return true
  const before = entry.text.slice(0, entry.caret).trimEnd()
  return /[=+\-*/^(,:&<>]$/.test(before)
}

/** Type a tapped cell's address, replacing one typed by the last tap. */
export function pointAt(entry: Entry, address: string): Entry {
  const from = entry.pointedAt ?? entry.caret
  const text = entry.text.slice(0, from) + address + entry.text.slice(entry.caret)
  return { text, caret: from + address.length, mode: 'edit', pointedAt: from }
}

/** Close any brackets left open, as a desktop spreadsheet does on Enter. */
export function closeBrackets(text: string): string {
  if (!text.startsWith('=')) return text
  let depth = 0
  let quoted = false
  for (const ch of text) {
    if (ch === '"') quoted = !quoted
    else if (!quoted && ch === '(') depth++
    else if (!quoted && ch === ')') depth = Math.max(0, depth - 1)
  }
  return text + ')'.repeat(depth)
}

/**
 * What a cell holds, as the entry line shows it: its formula, else its value.
 * `formula` is what Fortune-sheet's `getCellValue(…, { type: 'f' })` returns:
 * the formula as HTML, or the value when there is none.
 */
export function cellContent(formula: unknown, value: unknown): string {
  const text = typeof formula === 'string' ? formulaText(formula) : null
  if (text?.startsWith('=')) return text
  if (value === null || value === undefined) return ''
  return String(value)
}

/**
 * A plain value written as the formula that gives it: `42` → `=42`,
 * `5%` → `=5%`, a label → `="label"`. Fortune-sheet recalculates the formulas
 * that use a cell only when the cell is entered as a formula, so the keypad
 * enters a value this way first and then as itself.
 */
export function valueAsFormula(text: string): string {
  const t = text.trim()
  if (/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?%?$/i.test(t)) return `=${t}`
  if (/^(true|false)$/i.test(t)) return `=${t.toUpperCase()}`
  return `="${t.replace(/"/g, '""')}"`
}
