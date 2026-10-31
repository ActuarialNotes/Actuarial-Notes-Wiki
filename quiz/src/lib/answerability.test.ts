import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import {
  answerabilityEntry,
  answerabilityHistory,
  answerabilityRecordPath,
  checkSentence,
  nowSentence,
  parseAnswerabilityRecord,
  prerequisiteCalloutLinks,
  prerequisitePages,
  questionTagTitles,
  quoteText,
  reachNow,
  requirementLabel,
  requirementNow,
  runDate,
  stateLabel,
  verdictLabel,
  verdictNow,
} from './answerability'
import { parseExamMetadata, parseExamSyllabus } from './wikiParser'

const RECORD = JSON.stringify({
  version: 1,
  exam: 'Exam P-1 (SOA)',
  bank: 'exam-p',
  questions: {
    'p-004': {
      path: 'questions/exam-p/p-004.md',
      run: 'answerability-20261025-p',
      input_hash: 'sha256:00',
      verdict: 'untagged',
      requirements: [
        { id: 'r1', kind: 'fact', statement: 'Mutually exclusive events add.', concept: 'Unions', status: 'linked',
          places: [{ page: 'Mutually Exclusive Events', quote: 'the [[Probability Addition Rule]] simplifies' }] },
        { id: 'r2', kind: 'fact', statement: 'Independent events multiply.', concept: 'Independent Events', status: 'elsewhere',
          places: [{ page: 'Probability Multiplication Rule', quote: '$P(A \\cap B) = P(A) P(B)$' }] },
        { id: 'r3', kind: 'formula', statement: 'Equally likely outcomes.', concept: 'Probability', status: 'missing', places: [],
          resolution: { kind: 'not-required', note: 'the question gives it', date: '2026-10-27' } },
      ],
    },
    'p-005': {
      path: 'questions/exam-p/p-005.md', run: 'answerability-20261025-p', verdict: 'answerable',
      requirements: [{ id: 'r1', kind: 'fact', statement: 'A thing.', concept: '', status: 'tagged', places: [] }],
    },
  },
})

describe('answerabilityRecordPath', () => {
  it('maps a question file to its bank’s record, and nothing else to one', () => {
    expect(answerabilityRecordPath('questions/exam-p/p-004.md')).toBe('simulations/answerability/exam-p.json')
    expect(answerabilityRecordPath('Concepts/Bayes Theorem.md')).toBeNull()
    expect(answerabilityRecordPath('questions/exam-p/probability/p-1.md')).toBeNull()
  })
})

describe('parseAnswerabilityRecord / answerabilityEntry', () => {
  const record = parseAnswerabilityRecord(RECORD)!

  it('reads a record, and refuses what isn’t one', () => {
    expect(record.bank).toBe('exam-p')
    expect(Object.keys(record.questions)).toEqual(['p-004', 'p-005'])
    expect(parseAnswerabilityRecord('not json')).toBeNull()
    expect(parseAnswerabilityRecord('{"exam":"x"}')).toBeNull()
  })

  it('finds a question by its path, else by its file name', () => {
    expect(answerabilityEntry(record, 'questions/exam-p/p-004.md')?.id).toBe('p-004')
    expect(answerabilityEntry({ ...record, questions: { 'p-005': { ...record.questions['p-005'], path: null } } },
      'questions/exam-p/p-005.md')?.id).toBe('p-005')
    expect(answerabilityEntry(record, 'questions/exam-p/p-999.md')).toBeNull()
  })
})

describe('the history', () => {
  const entry = parseAnswerabilityRecord(RECORD)!.questions['p-004']

  it('dates a run by its id', () => {
    expect(runDate('answerability-20261025-mas-ii')).toBe('2026-10-25')
    expect(runDate('3f2a')).toBeNull()
  })

  it('is the check and every resolution since, newest first', () => {
    const history = answerabilityHistory(entry)
    expect(history.map((e) => e.kind)).toEqual(['resolution', 'check'])
    expect(history.map((e) => e.date)).toEqual(['2026-10-27', '2026-10-25'])
  })

  it('says what the solution uses and where it is taught', () => {
    expect(checkSentence(entry)).toBe(
      'The official solution uses 3 things: 1 is taught within its reach, 1 elsewhere in the notes and 1 on no page.')
    const answerable = parseAnswerabilityRecord(RECORD)!.questions['p-005']
    expect(checkSentence(answerable)).toBe('The official solution uses 1 thing, and every one is taught within its reach.')
  })

  it('labels a verdict and a requirement, a resolution over the check', () => {
    expect(verdictLabel('gap')).toEqual({ label: 'Gap', tone: 'red' })
    expect(verdictLabel('untagged').label).toBe('Out of reach')
    expect(requirementLabel(entry.requirements[0]).label).toBe('One link away')
    expect(requirementLabel(entry.requirements[2]).label).toBe('Not required')
  })

  it('reads a quote’s wiki links as their text', () => {
    expect(quoteText('the [[Probability Addition Rule]] and [[Independent Events|independent]]'))
      .toBe('the Probability Addition Rule and independent')
  })
})

describe('where a requirement stands now', () => {
  const entry = parseAnswerabilityRecord(RECORD)!.questions['p-004']
  const [linked, elsewhere, notRequired] = entry.requirements

  it('keeps a recorded tier in reach, and a resolution over everything', () => {
    expect(requirementNow(linked)).toEqual({ state: 'linked', page: 'Mutually Exclusive Events' })
    expect(requirementNow(notRequired).state).toBe('not-required')
    const resolved = { ...elsewhere, resolution: { kind: 'taught' as const, note: 'x', date: '2026-10-30', page: 'Set Theory', quote: 'q' } }
    expect(requirementNow(resolved)).toEqual({ state: 'resolved', page: 'Set Theory' })
  })

  it('brings an out-of-reach item in when its page is now tagged or on the exam’s syllabus (D30)', () => {
    expect(requirementNow(elsewhere).state).toBe('elsewhere')
    expect(requirementNow(elsewhere, reachNow([], ['probability multiplication rule'])))
      .toEqual({ state: 'syllabus', page: 'Probability Multiplication Rule' })
    expect(requirementNow(elsewhere, reachNow(['Probability Multiplication Rule'], []))).toEqual(
      { state: 'tagged', page: 'Probability Multiplication Rule' })
    expect(stateLabel({ state: 'syllabus' })).toEqual({ label: 'On the syllabus', tone: 'green' })
  })

  it('reads the verdict and the sentence from the states, not the stored verdict', () => {
    expect(verdictNow(entry)).toBe('untagged')
    expect(nowSentence(entry)).toBe('1 of the 3 things the solution uses is still open.')
    const reach = reachNow([], ['Probability Multiplication Rule'])
    expect(verdictNow(entry, reach)).toBe('answerable')
    expect(nowSentence(entry, reach)).toBe(
      'Everything the solution uses is taught within its reach, but for 1 step the notes needn’t teach.')
    const gap = { ...entry, requirements: [{ ...elsewhere, status: 'missing', places: [] }] }
    expect(verdictNow(gap, reach)).toBe('gap')
  })

  it('reads the pages an exam assumes off its Prerequisite knowledge callout, through every exam it names', () => {
    const examPages = {
      'Exam B.md': '> [!question]- Prerequisite knowledge\n>\n> - [[Concepts/Calculus]] at a thorough level.\n> - All of [[Exam A|A]].\n\n## Learning Objectives',
      'Exam A.md': '> [!question]- Prerequisite knowledge\n> - [[Probability]]\n',
      'Exam C.md': 'No callout here. [[Statistics]]',
    }
    const objectives: Record<string, string[]> = { 'Exam A.md': ['Median', 'Mode'] }
    expect(prerequisiteCalloutLinks(examPages['Exam B.md'])).toEqual(['Concepts/Calculus', 'Exam A'])
    expect(prerequisitePages('Exam B', examPages, (f) => objectives[f] ?? []).sort())
      .toEqual(['Calculus', 'Median', 'Mode', 'Probability'])
    expect(prerequisitePages('Exam C', examPages, () => [])).toEqual([])
    const elsewhereOnMedian = { ...elsewhere, places: [{ page: 'Median', quote: 'q' }] }
    expect(requirementNow(elsewhereOnMedian, reachNow([], [], ['Median']))).toEqual({ state: 'prerequisite', page: 'Median' })
  })

  it('reads a question’s tags as page titles, as answerability_lib.py does', () => {
    const raw = '---\nid: "p-1"\nwiki_link:\n  - Concepts/Bayes+Theorem\n  - "Concepts/Set+Theory"\nanswer: "B"\n---\nBody'
    expect(questionTagTitles(raw)).toEqual(['Bayes Theorem', 'Set Theory'])
    expect(questionTagTitles('---\nwiki_link: [Concepts/Mode, Concepts/Median]\n---\n')).toEqual(['Mode', 'Median'])
    expect(questionTagTitles('no frontmatter')).toEqual([])
  })
})

// The panel agrees with the gate: on an exam G8 passes, every question it
// serves reads Answerable from the record, its own tags and its exam's
// syllabus — what the panel has (`scripts/answerability_lib.py` reads the same).
describe('the panel against the gate', () => {
  const root = join(__dirname, '../../..')
  const catalog = JSON.parse(readFileSync(join(root, 'scripts/exam_catalog.json'), 'utf8'))
  const ready = (catalog.exams as { page: string; bank: string | null; status: string }[])
    .filter((e) => e.status === 'ready' && e.bank)
  const examPages = Object.fromEntries((catalog.exams as { page: string }[])
    .filter((e) => existsSync(join(root, e.page)))
    .map((e) => [e.page, readFileSync(join(root, e.page), 'utf8')]))
  const objectivePages = (file: string) => {
    const page = examPages[file]
    const meta = page ? parseExamMetadata(page) : null
    if (!meta) return []
    return parseExamSyllabus(page, meta.examId, meta.examLabel, meta.examTopic).topics.flatMap((t) => t.concepts.map((c) => c.name))
  }
  for (const exam of ready) {
    it(`${exam.page}: every served question reads Answerable`, () => {
      const pages = objectivePages(exam.page)
      const prerequisite = prerequisitePages(exam.page, examPages, objectivePages)
      const record = parseAnswerabilityRecord(
        readFileSync(join(root, `simulations/answerability/${exam.bank}.json`), 'utf8'))!
      const open: string[] = []
      for (const entry of Object.values(record.questions)) {
        const raw = readFileSync(join(root, entry.path!), 'utf8')
        if (/^off_syllabus:\s*true\s*$/m.test(raw) || /^\s+open_critical:\s*[1-9]/m.test(raw)) continue
        const reach = reachNow(questionTagTitles(raw), pages, prerequisite)
        // A question the check found nothing required for passes the gate as it stands.
        if (!['answerable', 'no requirements'].includes(verdictNow(entry, reach))) open.push(entry.id)
      }
      expect(open).toEqual([])
    })
  }
})

// Every committed record is one the panel can read, and every question in it
// is found from its own file.
describe('the committed records', () => {
  const dir = join(__dirname, '../../../simulations/answerability')
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    it(file, () => {
      const record = parseAnswerabilityRecord(readFileSync(join(dir, file), 'utf8'))
      expect(record).not.toBeNull()
      for (const entry of Object.values(record!.questions)) {
        expect(entry.path && answerabilityRecordPath(entry.path)).toBe(`simulations/answerability/${file}`)
        expect(answerabilityEntry(record!, entry.path!)).toBe(entry)
        expect(runDate(entry.run)).not.toBeNull()
        expect(VERDICTS).toContain(entry.verdict)
      }
    })
  }
})

const VERDICTS = ['answerable', 'untagged', 'gap', 'no requirements', 'error']
