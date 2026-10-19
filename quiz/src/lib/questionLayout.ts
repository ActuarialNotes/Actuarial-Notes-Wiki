import type { AnswerOption, Part, Question } from './parser'

/**
 * How a question is laid out on the quiz card, read off its shape.
 *
 * The parser knows three types; two of the formats the question-writer skill
 * writes in them deserve a control of their own rather than the generic one
 * (`.claude/skills/question-writer/references/formats.md`):
 *
 * - **Matching** — a `multi-part` question whose every part repeats one option
 *   list. Drawn as the option list once and a row of letters per item, instead
 *   of the same list printed under every part.
 * - **Ordering** — a `free-entry` question whose stem lists `- (A)` items and
 *   whose answer is those letters in some order. Drawn as a list the reader
 *   rearranges, instead of a box to type letters into.
 *
 * Nothing about storing or grading changes: a matching answer is still the
 * parts' JSON and an ordering answer still the letter string, so the parser's
 * grading, the review screen and every other surface read them as before. The
 * detection is the same as `audit_questions.py`'s `question_format`.
 */

export interface MatchingLayout {
  kind: 'matching'
  /** The one option list every part repeats. */
  options: AnswerOption[]
  /** The items to match, one per part. */
  items: Part[]
}

export interface OrderingItem {
  key: string
  text: string
}

export interface OrderingLayout {
  kind: 'ordering'
  /** The stem above the item list. */
  lead: string
  /** The items, in the order the stem lists them. */
  items: OrderingItem[]
  /** The stem below the item list (usually the instruction). */
  tail: string
}

export type QuestionLayout = MatchingLayout | OrderingLayout | null

const ORDERING_ITEM_RE = /^- \(([A-Z])\)\s+(.+)$/

function sameOptions(a: AnswerOption[], b: AnswerOption[]): boolean {
  return a.length === b.length && a.every((o, i) => o.key === b[i].key && o.text === b[i].text)
}

export function matchingLayout(question: Question): MatchingLayout | null {
  if (question.type !== 'multi-part') return null
  const parts = question.parts ?? []
  if (parts.length < 2) return null
  const options = parts[0].options
  if (options.length < 2) return null
  const matches = parts.every(p =>
    p.type === 'multiple-choice' && p.answer !== '' && sameOptions(p.options, options),
  )
  return matches ? { kind: 'matching', options, items: parts } : null
}

/** The letters an ordering answer is made of, ignoring case, spaces and separators. */
export function orderingLetters(answer: string): string[] {
  return answer.toUpperCase().replace(/[^A-Z]/g, '').split('')
}

export function orderingLayout(question: Question): OrderingLayout | null {
  if (question.type !== 'free-entry') return null
  const lines = question.stem.split('\n')
  const first = lines.findIndex(l => ORDERING_ITEM_RE.test(l.trim()))
  if (first < 0) return null
  let end = first
  while (end < lines.length && ORDERING_ITEM_RE.test(lines[end].trim())) end++
  // A second list further down means this isn't one list to put in order.
  if (lines.slice(end).some(l => ORDERING_ITEM_RE.test(l.trim()))) return null

  const items = lines.slice(first, end).map(l => {
    const m = l.trim().match(ORDERING_ITEM_RE)!
    return { key: m[1], text: m[2].trim() }
  })
  if (items.length < 3) return null
  const keys = items.map(i => i.key)
  if (new Set(keys).size !== keys.length) return null

  // The key must be every item exactly once — otherwise it's a short answer
  // that happens to cite a list (pick one, name two), not an ordering.
  const answer = orderingLetters(question.answer)
  if (answer.length !== keys.length || [...answer].sort().join('') !== [...keys].sort().join('')) return null

  return {
    kind: 'ordering',
    lead: lines.slice(0, first).join('\n').trim(),
    items,
    tail: lines.slice(end).join('\n').trim(),
  }
}

export function questionLayout(question: Question): QuestionLayout {
  return matchingLayout(question) ?? orderingLayout(question)
}

/**
 * The order to draw an ordering question's items in: the reader's own answer
 * when it is a full arrangement of them, else the order the stem lists them.
 */
export function initialOrder(layout: OrderingLayout, answer: string | null | undefined): string[] {
  const keys = layout.items.map(i => i.key)
  const chosen = orderingLetters(answer ?? '')
  const isArrangement = chosen.length === keys.length && [...chosen].sort().join('') === [...keys].sort().join('')
  return isArrangement ? chosen : keys
}

/** `order` with the item at `from` moved to `to`. */
export function moveItem(order: readonly string[], from: number, to: number): string[] {
  if (from === to || from < 0 || to < 0 || from >= order.length || to >= order.length) return [...order]
  const next = [...order]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}
