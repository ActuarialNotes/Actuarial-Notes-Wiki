import fm from 'front-matter'

// Parses the case-study markdown files under case-studies/<exam-id>/<id>.md into
// the runtime shape the case-study viewer consumes.
//
// A case study is the supplemental booklet a candidate is handed alongside the
// question paper — CAS ships one with MAS-II sittings, and several questions on
// the paper are unanswerable without it. In the app it isn't a page of its own:
// it's a panel a question opens, so the candidate reads it the way they would in
// the exam room, without losing their place.
//
//   ---
//   id: "masii-2019s-systolic"
//   exam: "Exam MAS-II"
//   title: "Systolic Blood Pressure Case Study"
//   year: 2019
//   session: Spring
//   source: "CAS Exam MAS-II, Spring 2019 — supplemental material"
//   ---
//   <markdown body: prose, ``` R output, and ![](…) plot embeds>
//
// A question opts in with `case_study: "masii-2019s-systolic"` in its own
// frontmatter (see lib/parser.ts). The id is the join key, so it must be unique
// across the whole `case-studies/` tree.

export interface CaseStudy {
  /** Join key — matches a question's `case_study` frontmatter value. */
  id: string
  /** Question.exam label this study belongs to, e.g. "Exam MAS-II". */
  exam: string
  /** Display title shown in the panel header. */
  title: string
  /** Markdown body, rendered with the same pipeline as a question stem. */
  body: string
  /** Sitting year, when the study came from a dated paper. */
  year?: number
  /** Sitting session, e.g. "Spring" or "Fall". */
  session?: string
  /** Provenance line shown under the title. */
  source?: string
}

interface CaseStudyFrontmatter {
  id?: unknown
  exam?: unknown
  title?: unknown
  year?: unknown
  session?: unknown
  source?: unknown
}

/**
 * Parse a single case-study file. Returns null (rather than throwing) for
 * anything malformed, so one bad file can't blank the viewer for every study.
 */
export function parseCaseStudy(raw: string): CaseStudy | null {
  try {
    const parsed = fm<CaseStudyFrontmatter>(raw)
    const data = parsed.attributes

    const id = data.id != null ? String(data.id).trim() : ''
    const exam = data.exam != null ? String(data.exam).trim() : ''
    const title = data.title != null ? String(data.title).trim() : ''
    const body = parsed.body.trim()
    if (!id || !exam || !title || !body) return null

    return {
      id,
      exam,
      title,
      body,
      year: data.year != null ? Number(data.year) : undefined,
      session: data.session != null ? String(data.session) : undefined,
      source: data.source != null ? String(data.source) : undefined,
    }
  } catch {
    return null
  }
}

/**
 * Parse a set of raw case-study files into the id-keyed lookup the viewer reads.
 * Later files win on a duplicate id (matches object-literal semantics).
 */
export function parseAllCaseStudies(rawFiles: string[]): Record<string, CaseStudy> {
  const out: Record<string, CaseStudy> = {}
  for (const raw of rawFiles) {
    const study = parseCaseStudy(raw)
    if (study) out[study.id] = study
  }
  return out
}
