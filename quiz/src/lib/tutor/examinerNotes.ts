// **Where candidates lose points** (docs/tutor.md §7.6).
//
// Every CAS written paper comes with the examiners' report, and the report says,
// part by part, what candidates got wrong: "Candidates struggled with the large
// loss factor", "A common error was capping the rate change at the overall
// target". It is the nearest thing the vault has to thousands of candidates'
// answers, and the written-paper equivalent of a misconception list.
//
// This module picks those sentences out — and only picks: a note is a sentence
// (or a "Common mistakes:" line with the bullets under it) copied verbatim from
// the report, with the item it came from. Nothing is reworded. A sentence that
// says what earned credit ("Common acceptable answers included …") is not a
// note about losing it, and is left out.

import type { TutorItem } from './items'

export interface ExaminerNote {
  /** The report's own words. */
  text: string
  itemId: string
  questionId: string
  partLabel: string | null
  sitting: string | null
}

// What a sentence about lost credit says. Deliberately phrases, not words:
// "error" alone would catch "standard error", "mistake" alone "no mistake".
const LOSS = [
  /\bcommon(?:ly)?\s+(?:mistakes?|errors?|incorrect|misconceptions?|issues?)\b/i,
  /\b(?:most|many|some|several|few|a number of)\s+(?:of the\s+)?candidates\s+(?:did not|didn't|failed|struggled|were unable|forgot|confused|incorrectly|made|lost|only|missed|neglected|omitted|mistakenly|misinterpreted|misread)/i,
  /\bstruggled\b/i,
  /\bfailed to\b/i,
  /\bincorrectly\b/i,
  /\blost (?:credit|points|marks)\b/i,
  /\breasons? for losing\b/i,
  /\b(?:mistakes?|errors?) (?:included|include|was|were|is|are)\b/i,
  /\bconfused\b/i,
  /\bforg(?:ot|etting)\b/i,
  /\bdid not (?:receive|earn|get) (?:full )?credit\b/i,
  /\bno credit\b/i,
  /\bpartial credit (?:was|were) (?:given|awarded) (?:for|to|when)\b/i,
]

// A sentence about what *earned* credit, even if it says "common".
const CREDIT = /\b(?:acceptable|full credit (?:was|were) (?:given|awarded)|received (?:full )?credit (?:for|if|whether))\b/i

const BULLET = /^\s*(?:[-*•]|\d+[.)]|\([a-z0-9]+\))\s+/

/** Whether a sentence describes a way candidates lost credit. */
export function isLossSentence(sentence: string): boolean {
  if (CREDIT.test(sentence) && !/\b(?:mistake|error|incorrect|struggl|fail)/i.test(sentence)) return false
  return LOSS.some(re => re.test(sentence))
}

function splitSentences(paragraph: string): string[] {
  // Split after a full stop, question or exclamation mark followed by a space
  // and a capital — not inside "e.g. the" or "$1.5 million".
  return paragraph
    .split(/(?<=[.!?])\s+(?=[A-Z(“"])/)
    .map(s => s.trim())
    .filter(Boolean)
}

/**
 * The report's lost-credit passages, in report order: sentences, and a
 * heading-with-bullets ("Common mistakes:\n- …\n- …") kept whole.
 */
export function lossPassages(report: string): string[] {
  const out: string[] = []
  const blocks = report.replace(/\r/g, '').split(/\n\s*\n/).map(block =>
    block.split('\n').map(l => l.trim()).filter(Boolean),
  )
  const isLeadIn = (line: string) => /:$/.test(line) && !BULLET.test(line) && isLossSentence(line)

  for (let b = 0; b < blocks.length; b++) {
    const lines = blocks[b]
    let i = 0
    while (i < lines.length) {
      const line = lines[i]
      // A lead-in ending in a colon owns the bullets under it — in this block,
      // or, after a blank line, the whole of the next.
      if (isLeadIn(line)) {
        const bullets: string[] = []
        let j = i + 1
        while (j < lines.length && BULLET.test(lines[j])) bullets.push(lines[j++])
        const next = blocks[b + 1]
        if (bullets.length === 0 && j === lines.length && next?.length && next.every(l => BULLET.test(l))) {
          bullets.push(...next)
          b++
        }
        out.push([line, ...bullets].join('\n'))
        i = j
        continue
      }
      if (BULLET.test(line)) {
        if (isLossSentence(line)) out.push(line)
        i++
        continue
      }
      // Prose: the run of plain lines is one paragraph, read sentence by sentence.
      const run: string[] = []
      while (i < lines.length && !BULLET.test(lines[i]) && !isLeadIn(lines[i])) run.push(lines[i++])
      for (const sentence of splitSentences(run.join(' '))) {
        if (isLossSentence(sentence)) out.push(sentence)
      }
    }
  }
  return out
}

/** An item's notes. */
export function itemNotes(item: TutorItem): ExaminerNote[] {
  if (!item.examinerReport) return []
  return lossPassages(item.examinerReport).map(text => ({
    text,
    itemId: item.id,
    questionId: item.questionId,
    partLabel: item.partLabel,
    sitting: item.sitting,
  }))
}

function sittingYear(sitting: string | null): number {
  const m = sitting?.match(/\d{4}/)
  return m ? Number(m[0]) : 0
}

/**
 * The notes on a concept, newest sitting first, at most `limit` — and at most
 * two from any one item, so one long report doesn't stand for the concept.
 */
export function conceptNotes(items: readonly TutorItem[], limit = 6): ExaminerNote[] {
  const ordered = [...items].sort((a, b) => sittingYear(b.sitting) - sittingYear(a.sitting))
  const out: ExaminerNote[] = []
  for (const item of ordered) {
    for (const note of itemNotes(item).slice(0, 2)) {
      out.push(note)
      if (out.length >= limit) return out
    }
  }
  return out
}
