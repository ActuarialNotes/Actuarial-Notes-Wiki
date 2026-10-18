// The exams the **Store** can be narrowed to (`docs/store.md`), on their own so
// that both the Store's logic (`lib/store.ts`) and its bundle-time textbook
// shelf (`lib/storeBooks.ts`) can read them. Imports stay relative, as in
// `storeBooks.ts`: the vite config pulls this module into its own Node graph.

export type ExamBody = 'SOA' | 'CAS'

export interface StoreExam {
  /** The exam_progress key — `P`, `MAS-I`, `CAS-5`, `CAS-DA`, `FSA-GH101`. */
  key: string
  /** What the shelf calls it. */
  name: string
  /** Who sets it (and so whose calculator list applies). DISCs are The Institutes' courses: no list. */
  body: ExamBody | null
  /**
   * Whose ladder it stands on — what the Store's SOA / CAS picker shows it
   * under. P and FM are on both, as they are on both bodies' tracks; the
   * DISCs, set by no body, are CAS requirements.
   */
  ladders: readonly ExamBody[]
  /**
   * Its regional variants, by study guide — `6C`, `6U` — when it is sat under a
   * syllabus per jurisdiction (`lib/examVariants.ts`). The strip shows the exam
   * once and asks for the region underneath.
   */
  variants?: readonly string[]
}

const BOTH: readonly ExamBody[] = ['SOA', 'CAS']
const CAS: readonly ExamBody[] = ['CAS']
const SOA: readonly ExamBody[] = ['SOA']

/** One SOA fellowship exam: `FSA-GH101`, shown as "Exam GH 101". */
function fsa(code: string, number: string, variants?: readonly string[]): StoreExam {
  const exam: StoreExam = { key: `FSA-${code}${number}`, name: `Exam ${code} ${number}`, body: 'SOA', ladders: SOA }
  return variants ? { ...exam, variants: variants.map(v => `${code}-${number}${v}`) } : exam
}

/**
 * The exams the shelf can be narrowed to, in the order of the ladder — the
 * preliminary exams, the MAS exams and the DISCs, then the upper CAS exams with
 * PCPA where it is sat, after Exam 5; then the SOA's ASA exams and its
 * fellowship exams, in the order of the SOA's credential tracks
 * (`data/tracks.ts`). Read left to right, a body's strip of exam logos runs the
 * accent ramp from blue to red (`lib/examColors.ts`).
 */
export const STORE_EXAMS: readonly StoreExam[] = [
  { key: 'P', name: 'Exam P', body: 'SOA', ladders: BOTH },
  { key: 'FM', name: 'Exam FM', body: 'SOA', ladders: BOTH },
  { key: 'MAS-I', name: 'Exam MAS-I', body: 'CAS', ladders: CAS },
  { key: 'MAS-II', name: 'Exam MAS-II', body: 'CAS', ladders: CAS },
  { key: 'CAS-IA', name: 'DISC-IA', body: null, ladders: CAS },
  { key: 'CAS-DA', name: 'DISC-DA', body: null, ladders: CAS },
  { key: 'CAS-RM', name: 'DISC-RM', body: null, ladders: CAS },
  { key: 'CAS-5', name: 'Exam 5', body: 'CAS', ladders: CAS },
  { key: 'CAS-PCPA', name: 'PCPA', body: 'CAS', ladders: CAS },
  { key: 'CAS-6', name: 'Exam 6', body: 'CAS', ladders: CAS, variants: ['6C', '6U', '6I', '6T'] },
  { key: 'CAS-7', name: 'Exam 7', body: 'CAS', ladders: CAS },
  { key: 'CAS-8', name: 'Exam 8', body: 'CAS', ladders: CAS },
  { key: 'CAS-9', name: 'Exam 9', body: 'CAS', ladders: CAS },
  { key: 'FAM', name: 'Exam FAM', body: 'SOA', ladders: SOA },
  { key: 'SRM', name: 'Exam SRM', body: 'SOA', ladders: SOA },
  { key: 'PA', name: 'Exam PA', body: 'SOA', ladders: SOA },
  { key: 'ALTAM', name: 'Exam ALTAM', body: 'SOA', ladders: SOA },
  { key: 'ASTAM', name: 'Exam ASTAM', body: 'SOA', ladders: SOA },
  { key: 'ATPA', name: 'ATPA', body: 'SOA', ladders: SOA },
  fsa('CP', '311'),
  fsa('CP', '312'),
  fsa('CP', '321'),
  fsa('CP', '341'),
  fsa('CP', '351'),
  fsa('CFE', '101'),
  fsa('CFE', '201'),
  fsa('GH', '101'),
  fsa('GH', '201', ['U', 'C']),
  fsa('GH', '301'),
  fsa('GI', '101'),
  fsa('GI', '201'),
  fsa('GI', '301'),
  fsa('GI', '302'),
  fsa('ILA', '101'),
  fsa('ILA', '201', ['U', 'I']),
  fsa('INV', '101'),
  fsa('INV', '201'),
  fsa('RET', '101'),
  fsa('RET', '201'),
  fsa('RET', '301'),
]

const STORE_EXAM_KEYS = new Set(STORE_EXAMS.map(e => e.key))

/** Whether the shelf can be narrowed to this exam_progress key. */
export function isStoreExamKey(key: string): boolean {
  return STORE_EXAM_KEYS.has(key)
}
