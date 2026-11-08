// Corpus test: the numeric answer check over the real question bank.
//
// Two things the unit tests can't see. Every part the check reads a figure for
// must accept its own figure back — a part whose key, typed in exactly, came
// out as a miss would suggest "No credit" to a reader who had it right. And the
// check must keep reaching the parts it was built for: if a change to the
// number reader quietly stops finding keys, coverage falls and this says so.

import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { parseQuestion, type Part } from './parser'
import { answerTargets, checkNumericAnswer, isCalculationPart } from './numericCheck'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const QUESTIONS_DIR = path.join(REPO_ROOT, 'questions')

function freeEntryParts(): { id: string; part: Part }[] {
  const out: { id: string; part: Part }[] = []
  for (const dir of readdirSync(QUESTIONS_DIR, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue
    for (const file of readdirSync(path.join(QUESTIONS_DIR, dir.name))) {
      if (!file.endsWith('.md')) continue
      const q = parseQuestion(readFileSync(path.join(QUESTIONS_DIR, dir.name, file), 'utf8'))
      if (q?.type !== 'multi-part') continue
      for (const part of q.parts ?? []) {
        if (part.type === 'free-entry') out.push({ id: `${q.id}${part.label}`, part })
      }
    }
  }
  return out
}

describe('the numeric answer check, over the question bank', () => {
  const parts = freeEntryParts()

  it('accepts every figure it reads as an answer', () => {
    const misses: string[] = []
    for (const { id, part } of parts) {
      const found = answerTargets(part)
      if (!found) continue
      for (const target of found.targets) {
        const check = checkNumericAnswer(target.text, part)
        if (check?.verdict !== 'match') misses.push(`${id}: ${target.text} → ${check?.verdict ?? 'nothing'}`)
      }
    }
    expect(misses).toEqual([])
  })

  it('reads a figure for most keyed parts and most unkeyed calculations', () => {
    const keyed = parts.filter(p => p.part.answer !== '')
    const keyedChecked = keyed.filter(p => answerTargets(p.part)?.source === 'answer')
    const calculations = parts.filter(p => p.part.answer === '' && isCalculationPart(p.part))
    const calculationsChecked = calculations.filter(p => answerTargets(p.part)?.source === 'sample')
    // 192 of 277 and 1,109 of 1,174 when this was written (2026-11-08). The
    // keyed parts left are prose answers ("Use the BF method") and tables.
    expect(keyedChecked.length / keyed.length).toBeGreaterThan(0.6)
    expect(calculationsChecked.length / calculations.length).toBeGreaterThan(0.85)
  })
})
