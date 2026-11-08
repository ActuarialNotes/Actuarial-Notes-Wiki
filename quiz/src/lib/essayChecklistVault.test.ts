// Corpus test: the essay checklist over the real question bank.
//
// The checklist is the sample answer cut where the examiners' text already
// breaks — nothing reworded, nothing added (docs/answer-checking.md). This
// holds every cut to that: the words of a sample (or of the examiner's report,
// when its rubric is the checklist), read back off its blocks, are its own
// words, list markers aside. And it keeps the checklist reaching the parts it
// was built for.

import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { parseQuestion, type Part } from './parser'
import { partChecklist } from './essayChecklist'
import { isCalculationPart } from './numericCheck'
import { splitSampleAnswers } from './writtenAnswer'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const QUESTIONS_DIR = path.join(REPO_ROOT, 'questions')

/** Every unkeyed written part, with the question's stem standing in for an empty part stem. */
function writtenParts(): { id: string; part: Part }[] {
  const out: { id: string; part: Part }[] = []
  for (const dir of readdirSync(QUESTIONS_DIR, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue
    for (const file of readdirSync(path.join(QUESTIONS_DIR, dir.name))) {
      if (!file.endsWith('.md')) continue
      const q = parseQuestion(readFileSync(path.join(QUESTIONS_DIR, dir.name, file), 'utf8'))
      if (q?.type !== 'multi-part') continue
      for (const part of q.parts ?? []) {
        if (part.type !== 'free-entry' || part.answer !== '') continue
        out.push({ id: `${q.id}${part.label}`, part: part.stem ? part : { ...part, stem: q.stem } })
      }
    }
  }
  return out
}

// A point drops its list marker ("1.", "-"), so markers are left out of both sides.
const words = (s: string) =>
  (s.replace(/^\s*(?:(?:[-*+]|\d{1,2}[.)])\s+)+/gm, '').match(/[A-Za-z0-9]+/g) ?? []).join(' ')

describe('the essay checklist, over the question bank', () => {
  const parts = writtenParts()

  it('keeps every word of every sample answer and examiner\'s report, and adds none', () => {
    const changed: string[] = []
    for (const { id, part } of parts) {
      const list = partChecklist(part)
      if (!list) continue
      const { samples } = splitSampleAnswers(part.explanation)
      list.samples.forEach((sample, i) => {
        if (words(sample.blocks.map(b => b.markdown).join('\n')) !== words(samples[i])) changed.push(`${id} sample ${i + 1}`)
      })
      if (list.rubric && words(list.rubric.blocks.map(b => b.markdown).join('\n')) !== words(part.examiner_report ?? '')) {
        changed.push(`${id} examiner's report`)
      }
    }
    expect(changed).toEqual([])
  })

  it('gives most essay parts a checklist', () => {
    const essays = parts.filter(p => !isCalculationPart(p.part))
    const listed = essays.filter(p => partChecklist(p.part) !== null)
    // 1,503 of 2,190 when this was written (2026-11-08). Most of the rest are
    // samples of a single paragraph, where a checklist would be one box.
    expect(listed.length / essays.length).toBeGreaterThan(0.6)
  })
})
