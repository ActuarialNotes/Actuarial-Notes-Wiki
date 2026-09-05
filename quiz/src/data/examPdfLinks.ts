export interface ExamPdfLink {
  url: string
  label: string
}

// The source paper behind a sitting: the PDF the examining body published for
// it. Shown above the mock-exam shelf and opened in the in-app viewer
// (`components/PdfViewerPanel.tsx`).
//
// ── Rules for this file ───────────────────────────────────────────────────────
// A URL here is **transcribed from the publisher, never constructed**. The CAS
// filenames look regular and are not: Spring 2019 is
// `admissions_studytools_exam5_sp19-5.pdf`, Spring 2015 is `sp15-5_0.pdf`,
// Spring 2018 is `sp18-5_examiners_report.pdf` and Spring 2012 still sits under
// `/old/`. Extrapolating the pattern is how this table filled up with dead
// links in the first place. A sitting whose PDF hasn't been located is simply
// **absent** — the browser then shows no button, which is honest, where a
// guessed URL is a 404 the learner has to discover for themselves.
//
// What CAS publishes also differs by exam. Exams 5–9 are written-answer papers
// that come with an *Examiner's Report* (sample answers plus commentary on how
// candidates actually scored); the MAS exams are multiple choice, so what's
// published is the paper and its *final answer key*. The label follows the
// document, not the button.
//
// Coverage notes, so a gap is recognisable as researched rather than forgotten:
//   • CAS began publishing Examiner's Reports with the **May 2012** sitting, so
//     2011's papers have none.
//   • Fall 2012 Exam 5 has not been located on casact.org (the `/old/` file is
//     the Spring paper — CAS names Spring `12-5` and Fall `f12-5`).
//   • Pass marks, answer keys and Examiner's Reports **ceased** with the move
//     to computer-based testing in Fall 2020, so nothing after 2019 exists.
//   • MAS-II was first sat in **Fall 2018**; there is no Spring 2018 paper.

/** Per-sitting papers — keyed by `${examTopic}|${year}|${session.toLowerCase()}`. */
const SITTING_PDF_LINKS: Record<string, ExamPdfLink> = {
  // ── CAS Exam 5 — exam + Examiner's Report in one PDF ──────────────────────
  'Exam 5|2012|spring': {
    url: 'https://www.casact.org/sites/default/files/old/studytools_exam5_12-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2013|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_13-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2013|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_f13-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2014|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_sp14-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2014|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_f14-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2015|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-03/sp15-5_0.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2015|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_f15-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2016|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_sp16-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2016|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_f16-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2017|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_sp17-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2017|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_f17-5.pdf',
    label: "Examiner's Report",
  },
  // Spring 2018 was sat twice (the original paper and a make-up); CAS published
  // a separate report for each, and this is the original.
  'Exam 5|2018|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/sp18-5_examiners_report.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2018|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_f18-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2019|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_sp19-5.pdf',
    label: "Examiner's Report",
  },
  'Exam 5|2019|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_f19-5.pdf',
    label: "Examiner's Report",
  },

  // ── CAS Exam MAS-I — multiple choice, so paper + final answer key ─────────
  'Exam MAS-I|2018|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_spmasi-18.pdf',
    label: 'Exam & Answer Key',
  },
  'Exam MAS-I|2018|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf',
    label: 'Exam & Answer Key',
  },
  'Exam MAS-I|2019|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_spmasi-19.pdf',
    label: 'Exam & Answer Key',
  },
  'Exam MAS-I|2019|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-19.pdf',
    label: 'Exam & Answer Key',
  },

  // ── CAS Exam MAS-II — first sat Fall 2018 ─────────────────────────────────
  'Exam MAS-II|2018|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasii_fmasii-18.pdf',
    label: 'Exam & Answer Key',
  },
  'Exam MAS-II|2019|spring': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasii_spmasii-19.pdf',
    label: 'Exam & Answer Key',
  },
  'Exam MAS-II|2019|fall': {
    url: 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasii_fmasii-19.pdf',
    label: 'Exam & Answer Key',
  },
}

// Exam-level source PDFs, for exams with no dated papers to browse: the SOA
// publishes one rolling sample set for P and FM rather than releasing sittings,
// and that set is where this app's P and FM banks come from. Questions and
// solutions are **separate downloads**, so each gets its own entry and its own
// button — the questions paper answers "where did these come from", and the
// solutions paper is what a candidate reaches for after sitting the mix.
const EXAM_LEVEL_PDF_LINKS: Record<string, ExamPdfLink> = {
  Probability: {
    url: 'https://www.soa.org/globalassets/assets/files/edu/edu-exam-p-sample-quest.pdf',
    label: 'Sample Questions',
  },
  'Financial Mathematics': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2017/exam-fm-sample-questions.pdf',
    label: 'Sample Questions',
  },
}

// The solutions half of the same sample sets. Transcribed like everything else
// here, and this pair is a good illustration of why that rule holds: the two
// SOA documents do *not* share a naming scheme. Exam P's solutions swap
// `-quest` for `-sol` in the same directory, while Exam FM's swap the whole
// word (`exam-fm-sample-questions` → `exam-fm-sample-solutions`) — and the SOA
// also publishes per-sitting reissues of the FM set under a dated name
// (`2018/2018-10-exam-fm-sample-solutions.pdf`), which is a different document
// from the rolling set linked here. An exam whose solutions paper hasn't been
// located is absent, and shows no second button.
const EXAM_LEVEL_SOLUTION_LINKS: Record<string, ExamPdfLink> = {
  Probability: {
    url: 'https://www.soa.org/globalassets/assets/files/edu/edu-exam-p-sample-sol.pdf',
    label: 'Sample Solutions',
  },
  'Financial Mathematics': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2017/exam-fm-sample-solutions.pdf',
    label: 'Sample Solutions',
  },
}

// The exam's own **syllabus**: the examining body's statement of what the exam
// covers. Opened from the study guide's title row, in the same in-app viewer
// the papers above use — a candidate reading our page of the syllabus should be
// able to check it against the publisher's without leaving for a browser tab.
//
// Keyed by the wiki exam id (`lib/wikiRoutes.examIdFromFile`, lower-cased), the
// same key `data/examGuides.ts` is keyed by — so a dash-less exam carries the
// `-1` suffix (Exam 5 is `5-1`).
//
// ── Rules for this file, again, and why they bite harder here ────────────────
// A URL is transcribed from the publisher, never constructed. A syllabus is
// also **reissued** where an examiner's report never is: the SOA publishes one
// per sitting (`2026-07-p-syllabus.pdf`) and CAS one per administration, so
// these entries rot into *superseded* rather than dead — a link that still opens
// and is no longer what the candidate sits. Each entry therefore records which
// edition it is, so staleness is visible in the diff rather than only in the
// PDF's own first page. An exam whose current document hasn't been located is
// **absent**, and its page shows no button.
//
// What's published differs by body, so the label follows the document:
//   • SOA — a per-sitting *Syllabus* for each exam.
//   • CAS — since the move to computer-based testing, the per-exam *Content
//     Outline* is the document that defines what's examined; the old per-exam
//     "Syllabus of Basic Education" extracts are no longer reissued.
const SYLLABUS_PDF_LINKS: Record<string, ExamPdfLink> = {
  // ── SOA ───────────────────────────────────────────────────────────────────
  // July 2026 sitting.
  'p-1': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/july/syllabi/2026-07-p-syllabus.pdf',
    label: 'Syllabus',
  },
  // June 2026 sitting.
  'fm-2': {
    url: 'https://www.soa.org/globalassets/assets/files/edu/2026/syllabi/2026-06-exam-fm-syllabus.pdf',
    label: 'Syllabus',
  },

  // ── CAS ───────────────────────────────────────────────────────────────────
  '5-1': {
    url: 'https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf',
    label: 'Content Outline',
  },
  // Fall 2026 administration — CAS names the newer outlines
  // `Exam_<id>_CO_<year>_<season>.pdf` rather than the older
  // `Exam<id>_Content_Outline.pdf`, which is exactly why neither name may be
  // extrapolated to the exams below.
  '6c-1': {
    url: 'https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf',
    label: 'Content Outline',
  },
  '7-1': {
    url: 'https://www.casact.org/sites/default/files/2023-05/Exam7_Content_Outline.pdf',
    label: 'Content Outline',
  },
  'mas-i': {
    url: 'https://www.casact.org/sites/default/files/2023-06/MASI_Content_Outline.pdf',
    label: 'Content Outline',
  },
  'mas-ii': {
    url: 'https://www.casact.org/sites/default/files/2023-06/MASII_Content_Outline.pdf',
    label: 'Content Outline',
  },
  // Exams 6U, 8 and 9 have no entry: their current document hasn't been
  // located on casact.org. Adding a guess is the one thing this file forbids.
}

export function getSittingPdfLink(examTopic: string, year: number, session?: string): ExamPdfLink | null {
  const normalized = (session ?? '').toLowerCase()
  return SITTING_PDF_LINKS[`${examTopic}|${year}|${normalized}`] ?? null
}

export function getExamPdfLink(examTopic: string): ExamPdfLink | null {
  return EXAM_LEVEL_PDF_LINKS[examTopic] ?? null
}

/** The worked solutions to that same sample set, where the body publishes them. */
export function getExamSolutionsPdfLink(examTopic: string): ExamPdfLink | null {
  return EXAM_LEVEL_SOLUTION_LINKS[examTopic] ?? null
}

/** The exam's published syllabus, by wiki exam id (`P-1`, `5-1`, `MAS-I`, …). */
export function getSyllabusPdfLink(examId: string): ExamPdfLink | null {
  return SYLLABUS_PDF_LINKS[examId.toLowerCase()] ?? null
}

/** Every link in the table — the shape a link check (or a test) walks. */
export function allExamPdfLinks(): ExamPdfLink[] {
  return [
    ...Object.values(SITTING_PDF_LINKS),
    ...Object.values(EXAM_LEVEL_PDF_LINKS),
    ...Object.values(EXAM_LEVEL_SOLUTION_LINKS),
    ...Object.values(SYLLABUS_PDF_LINKS),
  ]
}
