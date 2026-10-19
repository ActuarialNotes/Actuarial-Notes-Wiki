// Corpus test: a practice exam drawn from the real bank is shaped like the
// real paper — its length (or points), its formats, and every syllabus
// section the bank reaches at its weight.

import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { filterQuestions, parseQuestion, type Question } from './parser'
import { parseExamMetadata, parseExamSyllabus, type WikiExamSyllabus } from './wikiParser'
import { drawPracticeExam, practiceExamBlueprint, sectionOf, syllabusForBank } from './practiceExam'
import { parseSectionWeight } from './readiness'
import { QUIZ_EXAMS } from './quizBuilder'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

function bank(): Question[] {
  const out: Question[] = []
  const dir = path.join(REPO_ROOT, 'questions')
  for (const d of readdirSync(dir, { withFileTypes: true })) {
    if (!d.isDirectory()) continue
    for (const f of readdirSync(path.join(dir, d.name))) {
      if (!f.endsWith('.md')) continue
      const q = parseQuestion(readFileSync(path.join(dir, d.name, f), 'utf-8'))
      if (q) out.push(q)
    }
  }
  return out
}

function syllabi(): WikiExamSyllabus[] {
  return readdirSync(REPO_ROOT)
    .filter(f => f.startsWith('Exam') && f.endsWith('.md'))
    .flatMap(f => {
      const md = readFileSync(path.join(REPO_ROOT, f), 'utf-8')
      const meta = parseExamMetadata(md)
      return meta ? [parseExamSyllabus(md, meta.examId, meta.examLabel, meta.examTopic, f.replace(/\.md$/, ''))] : []
    })
}

/** A seeded generator, so a failure replays. */
function seeded(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

describe('a practice exam over the vault', () => {
  const questions = bank()
  const all = syllabi()

  it.each(QUIZ_EXAMS.map(e => e.value))('%s', exam => {
    const pool = filterQuestions(questions, { exam })
    if (pool.length === 0) return
    const blueprint = practiceExamBlueprint(exam)
    const syllabus = syllabusForBank(all, exam)
    const draw = drawPracticeExam(pool, blueprint, syllabus, seeded(7))
    const eligible = pool.filter(q => !blueprint.types || blueprint.types.includes(q.type))

    // The paper's formats only.
    for (const q of draw) expect(blueprint.types ?? [q.type], q.id).toContain(q.type)

    // Every format the paper sets that the bank holds.
    for (const type of blueprint.types ?? []) {
      if (eligible.some(q => q.type === type)) expect(draw.map(q => q.type), type).toContain(type)
    }

    // The paper's length, or its points within a question's worth.
    if (blueprint.points !== null) {
      const pts = draw.reduce((n, q) => n + (q.points > 0 ? q.points : 1), 0)
      const biggest = Math.max(...eligible.map(q => q.points))
      expect(Math.abs(pts - blueprint.points), `${pts} points`).toBeLessThanOrEqual(biggest)
    } else {
      expect(draw).toHaveLength(Math.min(blueprint.questions, eligible.length))
    }

    // Each section the bank reaches, near its weight: off by no more than one
    // question (or the largest question's points) plus what a short section
    // couldn't supply.
    if (!syllabus || blueprint.points !== null) return
    const weights = syllabus.topics.map(t => parseSectionWeight(t.weight))
    const available = syllabus.topics.map((_, i) => eligible.filter(q => sectionOf(q, syllabus) === i).length)
    const reachedWeight = weights.reduce((n, w, i) => n + (available[i] > 0 ? w : 0), 0)
    const drawn = syllabus.topics.map((_, i) => draw.filter(q => sectionOf(q, syllabus) === i).length)
    syllabus.topics.forEach((t, i) => {
      if (available[i] === 0) return
      const ideal = (draw.length * weights[i]) / reachedWeight
      if (available[i] >= Math.ceil(ideal)) {
        expect(Math.abs(drawn[i] - ideal), `${t.name}: ${drawn[i]} of ${draw.length}`).toBeLessThanOrEqual(
          1 + syllabus.topics.reduce((n, _, j) => n + Math.max(0, (draw.length * weights[j]) / reachedWeight - available[j]), 0),
        )
      } else {
        expect(drawn[i], t.name).toBe(available[i])
      }
    })
  })

  // A question no section places can only fill what the sections leave, so
  // the spread above is the bank's only if every question is placed.
  it.each(QUIZ_EXAMS.map(e => e.value))('%s: every question sits in a syllabus section', exam => {
    const syllabus = syllabusForBank(all, exam)
    const pool = filterQuestions(questions, { exam })
    if (!syllabus || pool.length === 0) return
    expect(pool.filter(q => sectionOf(q, syllabus) < 0).map(q => q.id)).toEqual([])
  })
})
