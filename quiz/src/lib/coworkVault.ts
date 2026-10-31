// The vault's resource pages, as Cowork documents.
//
// A real document enters Cowork as a vault page (docs/cowork.md). Most of
// Cowork's catalogue is therefore not authored at all: every resource page a
// working actuary would cite — a paper, a report, a guideline, an educational
// note, a standard, a statute — is listed under its publisher, read off the
// page itself. Two halves:
//
//   - `readVaultDocument` runs at build time (`virtual:cowork-vault` in
//     `vite.config.ts`): a page's frontmatter, its lead's first sentence and
//     the exams that read it, or null for a page Cowork leaves out — exam
//     preparation (textbooks, study notes, courses, syllabi) and the vault's
//     own reference pages. Cowork is professional practice; a deliverable does
//     not cite a probability text.
//   - `vaultResource` runs in the app (`data/coworkSources.ts`): the same page
//     as a `SourceResource` under the entity that publishes it. A page whose
//     publisher Cowork has no entity for stays out until one is added.
//
// Nothing is invented: the title, date, link and summary are the page's own,
// and a page supplies no `assumptions` rows — those are what a document is
// read for, which only an authored entry says. Practice areas and functions
// come from the exams whose syllabus lists the page (`AREA_BY_EXAM`,
// `FUNCTIONS_BY_EXAM`), else the publisher's areas and no function.
//
// Imports are relative and type-only — `vite.config.ts` pulls this into its
// own Node graph.

import type { ActuarialFunction, PracticeArea, ResourceKind, SourceResource } from './coworkSources'

/** A resource page, read for Cowork. */
export interface VaultDocument {
  /** The page's name — its filename without `.md`, and its address. */
  name: string
  path: string
  title: string
  publisher: string
  type: string
  /** The `Year` the page carries, when it is a four-digit year. */
  year?: string
  /** The lead's first sentence. */
  summary: string
  /** The `Available from` link — the publisher's own copy — when there is one. */
  url?: string
  /** Exam labels whose Source Material lists the page (`examsForResource`). */
  exams: string[]
}

/** The `Type`s Cowork leaves out: exam preparation and the vault's own pages. */
export const EXAM_PREP_TYPES: readonly string[] = [
  'Textbook',
  'Study Note',
  'Course',
  'Syllabus',
  'Casebook',
  'Reference Sheet',
  'Glossary',
]

/** A page's `Type` → the kind a Cowork card files it under. */
export const KIND_BY_TYPE: Record<string, ResourceKind> = {
  Paper: 'paper',
  Report: 'report',
  Monograph: 'paper',
  Guide: 'guideline',
  Guideline: 'guideline',
  'Educational Note': 'guideline',
  'Standard of Practice': 'standard',
  'Accounting Standard': 'standard',
  'Statement of Principles': 'standard',
  'Code of Conduct': 'standard',
  Legislation: 'regulation',
  'Case Law': 'regulation',
  Instructions: 'filing',
  'Regulatory Return': 'filing',
  Dataset: 'dataset',
  Benchmark: 'dataset',
}

function field(frontmatter: string, key: string): string | undefined {
  const m = new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, 'm').exec(frontmatter)
  const value = m?.[1]?.trim()
  return value ? value : undefined
}

/** `[[a|b]]` → b, `[[a]]` → a, `[t](u)` → t, emphasis dropped. */
function plainText(md: string): string {
  return md
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, (_m, t: string) => t.split('/').pop() ?? t)
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(?<![*\w])\*([^*]+)\*(?![*\w])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

const ABBREVIATION = /\b(?:e\.g|i\.e|etc|no|vol|ed|inc|ltd|co|corp|st|u\.s|p|pp|ch|sec|art|cf|vs|al)\.$/i

/** The first sentence of a paragraph — cut at a full stop that ends a sentence, not an abbreviation. */
export function firstSentence(paragraph: string): string {
  const text = plainText(paragraph)
  const stop = /[.!?](?=\s+[A-Z(“"])/g
  let m: RegExpExecArray | null
  while ((m = stop.exec(text))) {
    const head = text.slice(0, m.index + 1)
    // Not after an abbreviation, nor after an initial ("by Robert A. Brown").
    if (!ABBREVIATION.test(head) && !/(?:^|[\s(])[A-Z]\.$/.test(head)) return head
  }
  return text
}

/** The page's lead: the first paragraph of prose after its cover. */
export function leadParagraph(body: string): string {
  const lines: string[] = []
  for (const raw of body.split('\n')) {
    const line = raw.trim()
    if (lines.length === 0) {
      if (!line || line.startsWith('!') || line.startsWith('#') || line.startsWith('>') || line.startsWith('<') || line.startsWith('%%')) continue
      lines.push(line)
    } else if (line) {
      lines.push(line)
    } else {
      break
    }
  }
  return lines.join(' ')
}

/** A resource page as a Cowork document, or null for one Cowork leaves out. */
export function readVaultDocument(path: string, markdown: string, exams: string[]): VaultDocument | null {
  if (!markdown.startsWith('---')) return null
  const end = markdown.indexOf('\n---', 3)
  if (end < 0) return null
  const frontmatter = markdown.slice(3, end)
  const body = markdown.slice(markdown.indexOf('\n', end + 1) + 1)
  const title = field(frontmatter, 'Title')
  const publisher = field(frontmatter, 'Publisher')
  const type = field(frontmatter, 'Type')
  if (!title || !publisher || !type || !(type in KIND_BY_TYPE) || EXAM_PREP_TYPES.includes(type)) return null
  const name = path.slice(path.lastIndexOf('/') + 1).replace(/\.md$/i, '')
  const year = field(frontmatter, 'Year')
  const url = /\]\((https?:\/\/[^)\s]+)\)/.exec(field(frontmatter, 'Available from') ?? '')?.[1]
  const summary = firstSentence(leadParagraph(body))
  return {
    name,
    path,
    title,
    publisher,
    type,
    ...(year && /^\d{4}$/.test(year) ? { year } : {}),
    summary,
    ...(url ? { url } : {}),
    exams,
  }
}

// Which practice an exam belongs to, read off the label (`Exam 7`,
// `Exam ILA-201U`, `Exam F2RET`). The CAS's exams and the CIA's P&C track are
// P&C; the SOA's and CIA's life, retirement and ERM tracks theirs. Group and
// health has no area of its own in Cowork, so it maps to none.
const AREA_BY_EXAM: [RegExp, PracticeArea[]][] = [
  [/^Exam (?:MAS-|DISC-DA|DISC-IA|5$|PCPA|6[CUIT]$|COP|7$|8$|ASTAM|PC-M|F\dPC|GI-)/, ['pc']],
  [/^Exam (?:9$|DISC-RM|CP-|FIE-M|F\dFIE|F3BNK|CFE-|ERM)/, ['erm']],
  [/^Exam (?:ALTAM|ILA-|F\dILA|LFV|LPM)/, ['life']],
  [/^Exam (?:RET-|F\dRET)/, ['pensions']],
]

// What an exam's syllabus is for, where it is one thing. An exam that spans
// several functions, or none, maps to nothing rather than to a guess.
const FUNCTIONS_BY_EXAM: [RegExp, ActuarialFunction[]][] = [
  [/^Exam 5$/, ['pricing', 'reserving']],
  [/^Exam 6[CUIT]$/, ['financial-reporting', 'capital']],
  [/^Exam 7$/, ['reserving', 'capital']],
  [/^Exam 8$/, ['pricing', 'underwriting']],
  [/^Exam 9$/, ['capital']],
  [/^Exam (?:MAS-I|MAS-II|PCPA|DISC-DA)$/, ['pricing']],
  [/^Exam DISC-IA$/, ['financial-reporting']],
  [/^Exam DISC-RM$/, ['capital']],
]

function collect<T>(table: [RegExp, T[]][], exams: string[]): T[] {
  const out = new Set<T>()
  for (const exam of exams) for (const [re, values] of table) if (re.test(exam)) values.forEach(v => out.add(v))
  return [...out]
}

/** A stable id for a vault document: `vault-` and its name, slugged. */
export function vaultResourceId(name: string): string {
  return `vault-${name.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
}

/** The document as a Cowork resource under `entity`. */
export function vaultResource(doc: VaultDocument, entity: { id: string; practiceAreas: PracticeArea[] }): SourceResource {
  const areas = collect(AREA_BY_EXAM, doc.exams)
  return {
    id: vaultResourceId(doc.name),
    entityId: entity.id,
    title: doc.title,
    kind: KIND_BY_TYPE[doc.type] ?? 'report',
    published: doc.year ?? null,
    summary: doc.summary,
    wikiRef: { kind: 'resource', name: doc.name, path: doc.path },
    ...(doc.url ? { url: doc.url } : {}),
    practiceAreas: areas.length > 0 ? areas : [...entity.practiceAreas],
    functions: collect(FUNCTIONS_BY_EXAM, doc.exams),
  }
}
