export type ItemStatus = 'not_started' | 'in_progress' | 'completed'

export type ColorName =
  | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple'
  | 'fuchsia' | 'pink' | 'rose' | 'red' | 'orange' | 'amber' | 'yellow'
  | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'slate'

export const COLOR_HEX: Record<ColorName, string> = {
  sky: '#0284c7', blue: '#2563eb', indigo: '#4f46e5', violet: '#7c3aed',
  purple: '#9333ea', fuchsia: '#c026d3', pink: '#db2777', rose: '#e11d48',
  red: '#dc2626', orange: '#ea580c', amber: '#d97706', yellow: '#ca8a04',
  lime: '#65a30d', green: '#16a34a', emerald: '#059669', teal: '#0d9488',
  cyan: '#0891b2', slate: '#475569',
}

export interface TrackItem {
  id: string
  name: string
  color: ColorName
  or?: string
}

export interface TrackSection {
  label: string
  items: TrackItem[]
  collapsed?: boolean
  elective?: boolean
  /**
   * One of the FSA's six practice-area pathways: a candidate takes one. The
   * Study Guides page draws them together, below what every pathway shares.
   */
  pathway?: boolean
}

export interface Track {
  key: string
  /** Full label for the track selectors: "ACAS | Associate of the …". */
  name: string
  /** The designation on its own ("ACAS"), for surfaces that title a section with it. */
  label: string
  /** What the designation stands for ("Associate of the Casualty Actuarial Society"). */
  fullName: string | null
  /**
   * The `Concepts/` page describing the designation — what it is, what it takes
   * and what it lets an actuary sign. Null for the placeholder track. Named the
   * way the page is filed, so it can be opened as `{ kind: 'concept', name }`.
   */
  conceptPage: string | null
  certPath: string | null
  sections: TrackSection[]
  /**
   * How many of the track's electives its bar draws a segment for — what a
   * candidate completes from them. Four for the FSA (its pathway's courses and
   * the further technical courses); the FCIA's specialty track is five: two
   * modules and three exams. Defaults to four.
   */
  electiveSlots?: number
}

export interface Segment {
  status: ItemStatus
  color: ColorName
  label: string
  ids: string[]
}

/**
 * The headings every credential files what it requires but doesn't call an
 * exam under: the VEE credits, and the courses and e-learning modules (with
 * the professionalism courses). The Study Guides page draws each credential's
 * sections under their own headings, so these sit below the exams rather than
 * among them.
 */
export const MODULES_AND_COURSES = 'Modules and Courses'
export const VEE_CREDITS = 'VEE Credits'
export const NON_EXAM_SECTIONS: ReadonlySet<string> = new Set([MODULES_AND_COURSES, VEE_CREDITS])

export const TRACKS: Track[] = [
  {
    // The track a new account starts on. It isn't a credential path — it's
    // every exam this app has material for, so someone who hasn't decided
    // between ASA and ACAS (or doesn't yet know which track their exam sits
    // on) can still find the exam they're sitting. Keep it in step with the
    // syllabus pages in the vault: an exam listed here with no `Exam *.md`
    // page shows as "Not covered yet" in the exams panel.
    key: 'DEFAULT',
    name: 'All exams we cover',
    label: 'Track',
    fullName: null,
    conceptPage: null,
    certPath: null,
    sections: [
      {
        label: 'Preliminary Exams',
        items: [
          { id: 'P',  name: 'Exam P-1',  color: 'blue' },
          { id: 'FM', name: 'Exam FM-2', color: 'indigo' },
          { id: 'FAM', name: 'Exam FAM', color: 'purple' },
          { id: 'SRM', name: 'Exam SRM', color: 'fuchsia' },
          { id: 'ASTAM', name: 'Exam ASTAM', color: 'red' },
        ],
      },
      {
        label: 'CAS Upper-Level Exams',
        items: [
          { id: 'MAS-I',    name: 'Exam MAS-I',  color: 'violet' },
          { id: 'MAS-II',   name: 'Exam MAS-II', color: 'violet' },
          { id: 'CAS-IA',   name: 'CAS DISC IA', color: 'fuchsia' },
          { id: 'CAS-DA',   name: 'CAS DISC DA', color: 'fuchsia' },
          { id: 'CAS-RM',   name: 'CAS DISC RM', color: 'fuchsia' },
          { id: 'CAS-5',    name: 'Exam 5',      color: 'pink' },
          { id: 'CAS-PCPA', name: 'PCPA',        color: 'rose' },
          { id: 'CAS-6',    name: 'Exam 6',      color: 'orange' },
        ],
      },
      {
        label: 'CAS Fellowship Exams',
        items: [
          { id: 'CAS-7', name: 'Exam 7', color: 'lime' },
          { id: 'CAS-8', name: 'Exam 8', color: 'green' },
          { id: 'CAS-9', name: 'Exam 9', color: 'emerald' },
        ],
      },
    ],
  },
  {
    key: 'ASA',
    name: 'ASA | Associate of the Society of Actuaries',
    label: 'ASA',
    fullName: 'Associate of the Society of Actuaries',
    conceptPage: 'Associate of the Society of Actuaries (ASA)',
    certPath: 'Exams/Certifications/Associate of the Society of Actuaries (ASA)',
    sections: [
      {
        label: 'Preliminary Exams',
        items: [
          { id: 'P',  name: 'Exam P-1',  color: 'blue' },
          { id: 'FM', name: 'Exam FM-2', color: 'indigo' },
        ],
      },
      {
        label: 'Exams',
        items: [
          { id: 'FAM',   name: 'Exam FAM',   color: 'purple' },
          { id: 'SRM',   name: 'Exam SRM',   color: 'fuchsia' },
          { id: 'PA',    name: 'Exam PA',    color: 'rose' },
          { id: 'ALTAM', name: 'Exam ALTAM', color: 'red', or: 'ASTAM' },
          { id: 'ASTAM', name: 'Exam ASTAM', color: 'red', or: 'ALTAM' },
        ],
      },
      {
        // The e-learning modules (PAF, ASF), the ATPA assessment, the FAP
        // course and the APC.
        label: MODULES_AND_COURSES,
        items: [
          { id: 'PAF',   name: 'PAF',        color: 'violet' },
          { id: 'ASF',   name: 'ASF',        color: 'pink' },
          { id: 'ATPA',  name: 'ATPA',       color: 'orange' },
          { id: 'FAP',   name: 'FAP',        color: 'amber' },
          { id: 'APC',   name: 'APC',        color: 'slate' },
        ],
      },
      {
        label: VEE_CREDITS,
        items: [
          { id: 'VEE-MS',   name: 'VEE Mathematical Statistics', color: 'sky' },
          { id: 'VEE-ECON', name: 'VEE Economics',               color: 'sky' },
          { id: 'VEE-AF',   name: 'VEE Accounting & Finance',    color: 'sky' },
        ],
      },
    ],
  },
  {
    key: 'ACAS',
    name: 'ACAS | Associate of the Casualty Actuarial Society',
    label: 'ACAS',
    fullName: 'Associate of the Casualty Actuarial Society',
    conceptPage: 'Associate of the Casualty Actuarial Society (ACAS)',
    certPath: 'Exams/Certifications/Associate of the Casualty Actuarial Society (ACAS)',
    sections: [
      {
        label: 'Preliminary Exams',
        items: [
          { id: 'P',  name: 'Exam P-1',  color: 'blue' },
          { id: 'FM', name: 'Exam FM-2', color: 'indigo' },
        ],
      },
      {
        label: 'Exams',
        items: [
          { id: 'MAS-I',    name: 'Exam MAS-I',  color: 'violet' },
          { id: 'MAS-II',   name: 'Exam MAS-II', color: 'violet' },
          { id: 'CAS-5',    name: 'Exam 5',      color: 'pink' },
          { id: 'CAS-PCPA', name: 'PCPA',        color: 'rose' },
          { id: 'CAS-6',    name: 'Exam 6',      color: 'orange' },
        ],
      },
      {
        // The three DISC courses and the Course on Professionalism — keyed
        // `CAS-APC`, the key readers' progress is stored under.
        label: MODULES_AND_COURSES,
        items: [
          { id: 'CAS-IA',   name: 'CAS DISC IA', color: 'fuchsia' },
          { id: 'CAS-DA',   name: 'CAS DISC DA', color: 'fuchsia' },
          { id: 'CAS-RM',   name: 'CAS DISC RM', color: 'fuchsia' },
          { id: 'CAS-APC',  name: 'COP',         color: 'slate' },
        ],
      },
      {
        label: VEE_CREDITS,
        items: [
          { id: 'VEE-ECON', name: 'VEE Economics',            color: 'sky' },
          { id: 'VEE-AF',   name: 'VEE Accounting & Finance', color: 'sky' },
        ],
      },
    ],
  },
  {
    key: 'FSA',
    name: 'FSA | Fellow of the Society of Actuaries',
    label: 'FSA',
    fullName: 'Fellow of the Society of Actuaries',
    conceptPage: 'Fellow of the Society of Actuaries (FSA)',
    certPath: 'Exams/Certifications/Fellow of the Society of Actuaries (FSA)',
    sections: [
      {
        label: 'ASA Requirements',
        collapsed: true,
        items: [
          { id: 'VEE-MS',   name: 'VEE Mathematical Statistics', color: 'sky' },
          { id: 'VEE-ECON', name: 'VEE Economics',               color: 'sky' },
          { id: 'VEE-AF',   name: 'VEE Accounting & Finance',    color: 'sky' },
          { id: 'P',     name: 'Exam P-1',  color: 'blue' },
          { id: 'FM',    name: 'Exam FM-2', color: 'indigo' },
          { id: 'PAF',   name: 'PAF',       color: 'violet' },
          { id: 'FAM',   name: 'Exam FAM',  color: 'purple' },
          { id: 'SRM',   name: 'Exam SRM',  color: 'fuchsia' },
          { id: 'ASF',   name: 'ASF',       color: 'pink' },
          { id: 'PA',    name: 'Exam PA',   color: 'rose' },
          { id: 'ALTAM', name: 'Exam ALTAM', color: 'red', or: 'ASTAM' },
          { id: 'ASTAM', name: 'Exam ASTAM', color: 'red', or: 'ALTAM' },
          { id: 'ATPA',  name: 'ATPA',      color: 'orange' },
          { id: 'FAP',   name: 'FAP',       color: 'amber' },
          { id: 'APC',   name: 'APC',       color: 'slate' },
        ],
      },
      {
        // Required on every pathway: the DMAC module and the FAC.
        label: MODULES_AND_COURSES,
        items: [
          { id: 'FSA-DMAC', name: 'DMAC', color: 'amber' },
          { id: 'FSA-FAC',  name: 'FAC',  color: 'slate' },
        ],
      },
      {
        // Open to every pathway: its two further technical courses may come
        // from here.
        label: 'Cross Practice',
        elective: true,
        items: [
          { id: 'FSA-CP311', name: 'CP 311', color: 'orange' },
          { id: 'FSA-CP312', name: 'CP 312', color: 'orange' },
          { id: 'FSA-CP321', name: 'CP 321', color: 'orange' },
          { id: 'FSA-CP341', name: 'CP 341', color: 'orange' },
          { id: 'FSA-CP351', name: 'CP 351', color: 'orange' },
        ],
      },
      {
        label: 'Corporate Finance and ERM',
        elective: true,
        pathway: true,
        items: [
          { id: 'FSA-CFE101', name: 'CFE 101', color: 'lime' },
          { id: 'FSA-CFE201', name: 'CFE 201', color: 'lime' },
        ],
      },
      {
        label: 'Group and Health Insurance',
        elective: true,
        pathway: true,
        items: [
          { id: 'FSA-GH101', name: 'GH 101',     color: 'green' },
          { id: 'FSA-GH201', name: 'GH 201-U/C', color: 'green' },
          { id: 'FSA-GH301', name: 'GH 301',     color: 'green' },
        ],
      },
      {
        label: 'General Insurance',
        elective: true,
        pathway: true,
        items: [
          { id: 'FSA-GI101', name: 'GI 101', color: 'emerald' },
          { id: 'FSA-GI201', name: 'GI 201', color: 'emerald' },
          { id: 'FSA-GI301', name: 'GI 301', color: 'emerald' },
          { id: 'FSA-GI302', name: 'GI 302', color: 'emerald' },
        ],
      },
      {
        label: 'Individual Life and Annuities',
        elective: true,
        pathway: true,
        items: [
          { id: 'FSA-ILA101', name: 'ILA 101',     color: 'teal' },
          { id: 'FSA-ILA201', name: 'ILA 201-U/I', color: 'teal' },
        ],
      },
      {
        label: 'Investment',
        elective: true,
        pathway: true,
        items: [
          { id: 'FSA-INV101', name: 'INV 101', color: 'cyan' },
          { id: 'FSA-INV201', name: 'INV 201', color: 'cyan' },
        ],
      },
      {
        label: 'Retirement Benefits',
        elective: true,
        pathway: true,
        items: [
          { id: 'FSA-RET101', name: 'RET 101', color: 'yellow' },
          { id: 'FSA-RET201', name: 'RET 201', color: 'yellow' },
          { id: 'FSA-RET301', name: 'RET 301', color: 'yellow' },
        ],
      },
    ],
  },
  {
    key: 'FCAS',
    name: 'FCAS | Fellow of the Casualty Actuarial Society',
    label: 'FCAS',
    fullName: 'Fellow of the Casualty Actuarial Society',
    conceptPage: 'Fellow of the Casualty Actuarial Society (FCAS)',
    certPath: 'Exams/Certifications/Fellow of the Casualty Actuarial Society (FCAS)',
    sections: [
      {
        label: 'ACAS Requirements',
        collapsed: true,
        items: [
          { id: 'VEE-ECON', name: 'VEE Economics',            color: 'sky' },
          { id: 'VEE-AF',   name: 'VEE Accounting & Finance', color: 'sky' },
          { id: 'P',        name: 'Exam P-1',    color: 'blue' },
          { id: 'FM',       name: 'Exam FM-2',   color: 'indigo' },
          { id: 'MAS-I',    name: 'Exam MAS-I',  color: 'violet' },
          { id: 'MAS-II',   name: 'Exam MAS-II', color: 'violet' },
          { id: 'CAS-IA',   name: 'CAS DISC IA', color: 'fuchsia' },
          { id: 'CAS-DA',   name: 'CAS DISC DA', color: 'fuchsia' },
          { id: 'CAS-RM',   name: 'CAS DISC RM', color: 'fuchsia' },
          { id: 'CAS-5',    name: 'Exam 5',      color: 'pink' },
          { id: 'CAS-PCPA', name: 'PCPA',        color: 'rose' },
          { id: 'CAS-6',    name: 'Exam 6',      color: 'orange' },
          { id: 'CAS-APC',  name: 'COP',         color: 'slate' },
        ],
      },
      {
        label: 'Fellowship Exams',
        items: [
          { id: 'CAS-7', name: 'Exam 7', color: 'lime' },
          { id: 'CAS-8', name: 'Exam 8', color: 'green' },
          { id: 'CAS-9', name: 'Exam 9', color: 'emerald' },
        ],
      },
    ],
  },
  {
    // The Canadian Institute of Actuaries' own route to its Associate
    // designation (Pathway 1, from a CIA-accredited degree): the two ACIA
    // modules and the Capstone Exam. Candidates who already hold another
    // body's associate-level credits (Pathway 2) take the same modules and,
    // in some cases, the Capstone. The CIA Professionalism Workshop is also
    // required and has no page here yet.
    key: 'ACIA',
    name: 'ACIA | Associate of the Canadian Institute of Actuaries',
    label: 'ACIA',
    fullName: 'Associate of the Canadian Institute of Actuaries',
    conceptPage: 'Associate of the Canadian Institute of Actuaries (ACIA)',
    certPath: null,
    sections: [
      {
        label: 'Exams',
        items: [
          { id: 'CIA-ACIA-CAPSTONE', name: 'ACIA Capstone Exam', color: 'indigo' },
        ],
      },
      {
        label: MODULES_AND_COURSES,
        items: [
          { id: 'CIA-ACIA-M1', name: 'ACIA Module 1', color: 'sky' },
          { id: 'CIA-ACIA-M2', name: 'ACIA Module 2', color: 'sky' },
        ],
      },
    ],
  },
  {
    // The FCIA through the CIA's own exams (Pathways 1 and 2): one of five
    // specialty tracks, each two modules and three open-book exams — in the
    // finance, investments and ERM track, F3BNK (banking) may stand in for
    // F3FIE. The Advanced Professionalism and Leadership Course and the
    // experience requirement complete it; neither has a page here yet.
    key: 'FCIA',
    name: 'FCIA | Fellow of the Canadian Institute of Actuaries',
    label: 'FCIA',
    fullName: 'Fellow of the Canadian Institute of Actuaries',
    conceptPage: 'Fellow of the Canadian Institute of Actuaries (FCIA)',
    certPath: null,
    electiveSlots: 5,
    sections: [
      {
        label: 'ACIA Requirements',
        collapsed: true,
        items: [
          { id: 'CIA-ACIA-M1', name: 'ACIA Module 1', color: 'sky' },
          { id: 'CIA-ACIA-M2', name: 'ACIA Module 2', color: 'sky' },
          { id: 'CIA-ACIA-CAPSTONE', name: 'ACIA Capstone Exam', color: 'indigo' },
        ],
      },
      {
        label: 'Property and Casualty',
        elective: true,
        pathway: true,
        items: [
          { id: 'CIA-PC-M1', name: 'PC Module 1', color: 'rose' },
          { id: 'CIA-PC-M2', name: 'PC Module 2', color: 'rose' },
          { id: 'CIA-F1PC',  name: 'Exam F1PC',   color: 'rose' },
          { id: 'CIA-F2PC',  name: 'Exam F2PC',   color: 'rose' },
          { id: 'CIA-F3PC',  name: 'Exam F3PC',   color: 'rose' },
        ],
      },
      {
        label: 'Individual Life and Annuities',
        elective: true,
        pathway: true,
        items: [
          { id: 'CIA-ILA-M1', name: 'ILA Module 1', color: 'teal' },
          { id: 'CIA-ILA-M2', name: 'ILA Module 2', color: 'teal' },
          { id: 'CIA-F1ILA',  name: 'Exam F1ILA',   color: 'teal' },
          { id: 'CIA-F2ILA',  name: 'Exam F2ILA',   color: 'teal' },
          { id: 'CIA-F3ILA',  name: 'Exam F3ILA',   color: 'teal' },
        ],
      },
      {
        label: 'Group Benefits',
        elective: true,
        pathway: true,
        items: [
          { id: 'CIA-GB-M1', name: 'GB Module 1', color: 'green' },
          { id: 'CIA-GB-M2', name: 'GB Module 2', color: 'green' },
          { id: 'CIA-F1GB',  name: 'Exam F1GB',   color: 'green' },
          { id: 'CIA-F2GB',  name: 'Exam F2GB',   color: 'green' },
          { id: 'CIA-F3GB',  name: 'Exam F3GB',   color: 'green' },
        ],
      },
      {
        label: 'Retirement Benefits',
        elective: true,
        pathway: true,
        items: [
          { id: 'CIA-RET-M1', name: 'RET Module 1', color: 'yellow' },
          { id: 'CIA-RET-M2', name: 'RET Module 2', color: 'yellow' },
          { id: 'CIA-F1RET',  name: 'Exam F1RET',   color: 'yellow' },
          { id: 'CIA-F2RET',  name: 'Exam F2RET',   color: 'yellow' },
          { id: 'CIA-F3RET',  name: 'Exam F3RET',   color: 'yellow' },
        ],
      },
      {
        label: 'Finance, Investments and ERM',
        elective: true,
        pathway: true,
        items: [
          { id: 'CIA-FIE-M1', name: 'FIE Module 1', color: 'cyan' },
          { id: 'CIA-FIE-M2', name: 'FIE Module 2', color: 'cyan' },
          { id: 'CIA-F1FIE',  name: 'Exam F1FIE',   color: 'cyan' },
          { id: 'CIA-F2FIE',  name: 'Exam F2FIE',   color: 'cyan' },
          { id: 'CIA-F3FIE',  name: 'Exam F3FIE',   color: 'cyan', or: 'CIA-F3BNK' },
          { id: 'CIA-F3BNK',  name: 'Exam F3BNK',   color: 'cyan', or: 'CIA-F3FIE' },
        ],
      },
    ],
  },
]

const STATUS_ORDER: Record<ItemStatus, number> = { completed: 0, in_progress: 1, not_started: 2 }

function getStatus(id: string, progress: Record<string, ItemStatus>): ItemStatus {
  return progress[id] ?? 'not_started'
}

export function getTrackSegments(
  track: Track,
  progress: Record<string, ItemStatus>,
): Segment[] {
  const segments: Segment[] = []
  const orSeen: Record<string, true> = {}
  const electiveItems: TrackItem[] = []
  let hasElectives = false

  for (const sec of track.sections) {
    if (sec.elective) {
      hasElectives = true
      electiveItems.push(...sec.items)
      continue
    }

    if (sec.collapsed) {
      const allDone = sec.items.every(item => {
        if (item.or) return getStatus(item.id, progress) === 'completed' || getStatus(item.or, progress) === 'completed'
        return getStatus(item.id, progress) === 'completed'
      })
      const anyInProgress = sec.items.some(item => getStatus(item.id, progress) === 'in_progress')
      let bestColor: ColorName = sec.items[0]?.color ?? 'slate'
      if (anyInProgress && !allDone) {
        const ipItem = sec.items.find(item => getStatus(item.id, progress) === 'in_progress')
        if (ipItem) bestColor = ipItem.color
      }
      segments.push({
        status: allDone ? 'completed' : anyInProgress ? 'in_progress' : 'not_started',
        color: bestColor,
        label: sec.label,
        ids: sec.items.map(i => i.id),
      })
      continue
    }

    for (const item of sec.items) {
      if (item.or) {
        const pairKey = [item.id, item.or].sort().join('|')
        if (orSeen[pairKey]) continue
        orSeen[pairKey] = true
        const s1 = getStatus(item.id, progress)
        const s2 = getStatus(item.or, progress)
        const pairDone = s1 === 'completed' || s2 === 'completed'
        const pairInProgress = s1 === 'in_progress' || s2 === 'in_progress'
        const partnerItem = sec.items.find(i => i.id === item.or)
        const partnerName = partnerItem?.name ?? item.or
        segments.push({
          status: pairDone ? 'completed' : pairInProgress ? 'in_progress' : 'not_started',
          color: item.color,
          label: `${item.name} or ${partnerName}`,
          ids: [item.id, item.or],
        })
      } else {
        segments.push({
          status: getStatus(item.id, progress),
          color: item.color,
          label: item.name,
          ids: [item.id],
        })
      }
    }
  }

  if (hasElectives) {
    const sorted = [...electiveItems].sort(
      (a, b) => STATUS_ORDER[getStatus(a.id, progress)] - STATUS_ORDER[getStatus(b.id, progress)],
    )
    for (let i = 0; i < (track.electiveSlots ?? 4); i++) {
      if (i < sorted.length) {
        const el = sorted[i]
        segments.push({ status: getStatus(el.id, progress), color: el.color, label: el.name, ids: [el.id] })
      } else {
        segments.push({ status: 'not_started', color: 'slate', label: 'Elective', ids: [] })
      }
    }
  }

  return segments
}

export function getTrackCounts(
  track: Track,
  progress: Record<string, ItemStatus>,
): { done: number; total: number } {
  const segments = getTrackSegments(track, progress)
  return {
    done: segments.filter(s => s.status === 'completed').length,
    total: segments.length,
  }
}

/**
 * Display name for an exam id, across every credential track.
 *
 * `EXAM_ID_TO_LABEL` in lib/examIds only covers the exams with a question bank
 * (and names them by their *bank* label — "Probability", not "Exam P-1"), so
 * anything that has to name an arbitrary tracked exam reads it from here.
 */
export const EXAM_ID_TO_TRACK_NAME: Record<string, string> = (() => {
  const names: Record<string, string> = {}
  for (const track of TRACKS) {
    for (const section of track.sections) {
      for (const item of section.items) {
        if (!names[item.id]) names[item.id] = item.name
      }
    }
  }
  return names
})()
