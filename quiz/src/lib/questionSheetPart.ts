/**
 * The two pieces of Open in Spreadsheet the question card needs on its own
 * (docs/question-spreadsheet.md): whether a part is worked in the sheet, and
 * how a cell's value drops into an answer box. They live apart from
 * lib/questionSheet.ts — which re-exports them — so the card, in the first
 * page's bundle, doesn't carry the workbook code the lazy sheet pane uses.
 */

/**
 * `text` with `insert` put in place of its selection `[start, end)`, and where
 * the caret lands after it. A space is added before the value when it would
 * otherwise run into the word before it ("=88" stays, "total88" doesn't).
 */
export function insertAtCaret(text: string, start: number, end: number, insert: string): { text: string; caret: number } {
  const a = Math.max(0, Math.min(start, text.length))
  const b = Math.max(a, Math.min(end, text.length))
  const before = text.slice(0, a)
  const pad = /[A-Za-z0-9.,)]$/.test(before) ? ' ' : ''
  const next = before + pad + insert + text.slice(b)
  return { text: next, caret: a + pad.length + insert.length }
}

// ── Which parts are worked in the spreadsheet ───────────────────────────────

// A part that asks for numbers — a triangle constructed, a factor calculated —
// is one the exam day's spreadsheet is for. Read off the command word, as the
// Tutor reads a part's kind (lib/tutor/items.ts); a table row is data, not an
// instruction, so it never counts.
// "estimate" is the verb, not "the estimate of …".
const NUMBER_WORDS = /\b(calculate|calculating|compute|computing|construct|constructing|create|build|produce|determine|(?<!\b(?:the|an|this|that|your|its|their)\s)estimate(?!s?\s+of\b)|derive|quantify|develop|complete|prepare|fill|tabulate|reconcile)\b/i
const ANY_COMMAND = /\b(calculate|compute|construct|create|build|produce|determine|estimate|derive|quantify|develop|complete|prepare|fill|tabulate|reconcile|explain|discuss|describe|identify|define|state|list|give|provide|name|outline|summari[sz]e|contrast|compare|differentiate|distinguish|interpret|comment|recommend|justify|evaluate|assess|critique|argue|propose|select|choose|decide|why|which)\b/i

function instructionText(markdown: string): string {
  return markdown
    .split('\n')
    .filter(line => !/^\s*\|/.test(line))
    .join('\n')
}

/**
 * Whether a part asks to be worked in the spreadsheet: its own instruction
 * names a calculation. A part with no command word of its own ("Paid losses.")
 * answers the question's preamble, so the preamble decides.
 */
export function partWantsSheet(partStem: string, preamble = ''): boolean {
  const own = instructionText(partStem)
  if (ANY_COMMAND.test(own)) return NUMBER_WORDS.test(own)
  return NUMBER_WORDS.test(instructionText(preamble))
}
