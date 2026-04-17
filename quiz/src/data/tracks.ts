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
}

export interface Track {
  key: string
  name: string
  certPath: string | null
  sections: TrackSection[]
}

export interface Segment {
  status: ItemStatus
  color: ColorName
  label: string
  ids: string[]
}

export const TRACKS: Track[] = [
  {
    key: 'DEFAULT',
    name: 'Choose a Track',
    certPath: null,
    sections: [
      {
        label: 'Preliminary Exams',
        items: [
          { id: 'P',  name: 'Exam P-1',  color: 'blue' },
          { id: 'FM', name: 'Exam FM-2', color: 'indigo' },
        ],
      },
    ],
  },
  {
    key: 'ASA',
    name: 'ASA (SOA)',
    certPath: 'Exams/Certifications/Associate of the Society of Actuaries (ASA)',
    sections: [
      {
        label: 'VEE Requirements',
        items: [
          { id: 'VEE-MS',   name: 'VEE Mathematical Statistics', color: 'sky' },
          { id: 'VEE-ECON', name: 'VEE Economics',               color: 'sky' },
          { id: 'VEE-AF',   name: 'VEE Accounting & Finance',    color: 'sky' },
        ],
      },
      {
        label: 'Preliminary Exams',
        items: [
          { id: 'P',  name: 'Exam P-1',  color: 'blue' },
          { id: 'FM', name: 'Exam FM-2', color: 'indigo' },
        ],
      },
      {
        label: 'Exams & Courses',
        items: [
          { id: 'PAF',   name: 'PAF',        color: 'violet' },
          { id: 'FAM',   name: 'Exam FAM',   color: 'purple' },
          { id: 'SRM',   name: 'Exam SRM',   color: 'fuchsia' },
          { id: 'ASF',   name: 'ASF',        color: 'pink' },
          { id: 'PA',    name: 'Exam PA',    color: 'rose' },
          { id: 'ALTAM', name: 'Exam ALTAM', color: 'red', or: 'ASTAM' },
          { id: 'ASTAM', name: 'Exam ASTAM', color: 'red', or: 'ALTAM' },
          { id: 'ATPA',  name: 'ATPA',       color: 'orange' },
          { id: 'FAP',   name: 'FAP',        color: 'amber' },
          { id: 'APC',   name: 'APC',        color: 'slate' },
        ],
      },
    ],
  },
  {
    key: 'ACAS',
    name: 'ACAS (CAS)',
    certPath: 'Exams/Certifications/Associate of the Casualty Actuarial Society (ACAS)',
    sections: [
      {
        label: 'VEE Requirements',
        items: [
          { id: 'VEE-ECON', name: 'VEE Economics',            color: 'sky' },
          { id: 'VEE-AF',   name: 'VEE Accounting & Finance', color: 'sky' },
        ],
      },
      {
        label: 'Preliminary Exams',
        items: [
          { id: 'P',  name: 'Exam P-1',  color: 'blue' },
          { id: 'FM', name: 'Exam FM-2', color: 'indigo' },
        ],
      },
      {
        label: 'Exams & Requirements',
        items: [
          { id: 'MAS-I',    name: 'Exam MAS-I',  color: 'violet' },
          { id: 'MAS-II',   name: 'Exam MAS-II', color: 'violet' },
          { id: 'CAS-IA',   name: 'CAS DISC IA', color: 'fuchsia' },
          { id: 'CAS-DA',   name: 'CAS DISC DA', color: 'fuchsia' },
          { id: 'CAS-RM',   name: 'CAS DISC RM', color: 'fuchsia' },
          { id: 'CAS-5',    name: 'Exam 5',      color: 'pink' },
          { id: 'CAS-PCPA', name: 'PCPA',        color: 'rose' },
          { id: 'CAS-6',    name: 'Exam 6',      color: 'orange' },
          { id: 'CAS-APC',  name: 'APC',         color: 'slate' },
        ],
      },
    ],
  },
  {
    key: 'FSA',
    name: 'FSA (SOA)',
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
        label: 'Required Courses',
        items: [
          { id: 'FSA-DMAC', name: 'DMAC', color: 'amber' },
          { id: 'FSA-FAC',  name: 'FAC',  color: 'slate' },
        ],
      },
      {
        label: 'Corporate Finance and ERM',
        elective: true,
        items: [
          { id: 'FSA-CFE101', name: 'CFE 101', color: 'lime' },
          { id: 'FSA-CFE201', name: 'CFE 201', color: 'lime' },
        ],
      },
      {
        label: 'Group and Health Insurance',
        elective: true,
        items: [
          { id: 'FSA-GH101', name: 'GH 101',     color: 'green' },
          { id: 'FSA-GH201', name: 'GH 201-U/C', color: 'green' },
          { id: 'FSA-GH301', name: 'GH 301',     color: 'green' },
        ],
      },
      {
        label: 'General Insurance',
        elective: true,
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
        items: [
          { id: 'FSA-ILA101', name: 'ILA 101',     color: 'teal' },
          { id: 'FSA-ILA201', name: 'ILA 201-U/I', color: 'teal' },
        ],
      },
      {
        label: 'Investment',
        elective: true,
        items: [
          { id: 'FSA-INV101', name: 'INV 101', color: 'cyan' },
          { id: 'FSA-INV201', name: 'INV 201', color: 'cyan' },
        ],
      },
      {
        label: 'Retirement Benefits',
        elective: true,
        items: [
          { id: 'FSA-RET101', name: 'RET 101', color: 'yellow' },
          { id: 'FSA-RET201', name: 'RET 201', color: 'yellow' },
          { id: 'FSA-RET301', name: 'RET 301', color: 'yellow' },
        ],
      },
      {
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
    ],
  },
  {
    key: 'FCAS',
    name: 'FCAS (CAS)',
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
          { id: 'CAS-APC',  name: 'APC',         color: 'slate' },
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
    for (let i = 0; i < 4; i++) {
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
