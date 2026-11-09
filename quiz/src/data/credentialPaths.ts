// The credential paths: the whole route to a designation for one society —
// the SOA, the CAS or the CIA — laid out as four stages: the start,
// associateship, fellowship, and the continuing education that keeps a
// credential current once it's held.
//
// `WikiArticle` swaps a `%%credential-path%%` line (an Obsidian comment, so the
// vault reads as plain prose there) for `components/wiki/CredentialPath.tsx`,
// the route drawn down the page. The six designation pages place it naming
// themselves — `%%credential-path ACAS%%` — so it opens on their society at
// their stage (`readCredentialPathMarker`); the bare line, on the general
// guide, opens on the reader's own society. `%%credential-map%%` draws all
// three societies at once as a map (`components/wiki/CredentialMap.tsx`), on
// the Credential Path page.
//
// The exam and course lists are the same requirements `data/tracks.ts` tracks,
// grouped for reading rather than for progress. Each item names the track ids
// it stands for, and `credentialPaths.test.ts` holds the two in step both ways:
// a requirement added to a track has to appear here, and nothing here can name
// one the track doesn't have. What isn't tracked (the CIA's workshop and
// experience, the continuing-education stage) is transcribed from the
// societies' own pages (the CAS CE Policy, the SOA CPD Requirement, The CAS
// Institute's credentials, the SOA's CERA requirements, the CIA's pathway and
// CPD pages) and kept to what those pages say.

import type { ComponentType } from 'react'
import {
  Award,
  BookOpen,
  GraduationCap,
  Laptop,
  MapPin,
  RefreshCw,
  Scale,
  Signpost,
} from 'lucide-react'
import type { GuideBody } from '@/lib/bodyFilter'
import type { WikiEntryRef } from '@/lib/wikiRoutes'

/** The line in the guide's markdown that the path replaces. */
export const CREDENTIAL_PATH_MARKER = '%%credential-path%%'

export interface PathItem {
  /**
   * An exam's `exam_progress` key (`P`, `MAS-I`, `CAS-5`). The row leads with
   * that exam's logo, in its accent, so the exams read as the same ladder they
   * are everywhere else in the app.
   */
  exam?: string
  /** For anything that isn't an exam: the glyph on its neutral tile. */
  icon?: ComponentType<{ className?: string }>
  /** The requirement's name. */
  name: string
  /** One short line on what it is. */
  note?: string
  /** A vault page the name opens. */
  ref?: WikiEntryRef
  /** The `data/tracks.ts` item ids this entry stands for. */
  trackIds?: string[]
  /**
   * When the item counts as done on the reader's route (`lib/credentialProgress.ts`).
   * By default, when every one of its `trackIds` is completed. `anyOf` is a
   * choice — done when any one group is complete (ALTAM *or* ASTAM, one
   * practice area's 101 and 201). `none` is an item whose rule the tracks can't
   * express ("two more technical courses", from anywhere), so the route shows
   * no state for it rather than a wrong one.
   */
  progress?: 'none' | { anyOf: string[][] }
}

export type StageKind = 'start' | 'associate' | 'fellow' | 'ongoing'

export interface PathStage {
  kind: StageKind
  /** The stage's name on the path itself — short enough for a pill. */
  short: string
  /** The heading over the stage's detail. */
  title: string
  /** The designation page the heading opens, for a credential stage. */
  ref?: WikiEntryRef
  /** A sentence or two on what the stage is for. */
  blurb: string
  items: PathItem[]
  /** Things a reader may choose to take on at this stage, but doesn't have to. */
  optional?: { heading: string; items: PathItem[] }
}

export interface CredentialPath {
  body: GuideBody
  name: string
  stages: PathStage[]
}

const exam = (name: string): WikiEntryRef => ({ kind: 'exam', name })
const concept = (name: string): WikiEntryRef => ({ kind: 'concept', name })

const ACAS = 'Associate of the Casualty Actuarial Society (ACAS)'
const FCAS = 'Fellow of the Casualty Actuarial Society (FCAS)'
const ASA = 'Associate of the Society of Actuaries (ASA)'
const FSA = 'Fellow of the Society of Actuaries (FSA)'
const ACIA = 'Associate of the Canadian Institute of Actuaries (ACIA)'
const FCIA_PAGE = 'Fellow of the Canadian Institute of Actuaries (FCIA)'

// The FCIA's five specialty tracks: each two modules and three exams, and in
// finance, investments and ERM F3BNK may stand in for F3FIE. A track is
// complete when all five of one of its sets are.
const CIA_TRACKS: { ids: string[]; complete: string[][] }[] = ['PC', 'ILA', 'GB', 'RET', 'FIE'].map(t => {
  const core = [`CIA-${t}-M1`, `CIA-${t}-M2`, `CIA-F1${t}`, `CIA-F2${t}`]
  return t === 'FIE'
    ? { ids: [...core, 'CIA-F3FIE', 'CIA-F3BNK'], complete: [[...core, 'CIA-F3FIE'], [...core, 'CIA-F3BNK']] }
    : { ids: [...core, `CIA-F3${t}`], complete: [[...core, `CIA-F3${t}`]] }
})

const EXAM_P: PathItem = {
  exam: 'P',
  name: 'Probability',
  note: 'Exam P at the SOA, Exam 1 at the CAS. Same paper.',
  ref: exam('Exam P-1 (SOA)'),
  trackIds: ['P'],
}

const EXAM_FM: PathItem = {
  exam: 'FM',
  name: 'Financial Mathematics',
  note: 'Exam FM at the SOA, Exam 2 at the CAS. Also shared.',
  ref: exam('Exam FM-2 (SOA)'),
  trackIds: ['FM'],
}

// In Canada, fellowship of the CIA sits alongside the FCAS or FSA rather than
// replacing it, and some signing roles (the appointed actuary) need it.
const FCIA: PathItem = {
  icon: Award,
  name: 'Fellowship of the CIA (FCIA)',
  note: 'For practising in Canada. Some signing roles, like appointed actuary, require it.',
}

export const CREDENTIAL_PATHS: Record<GuideBody, CredentialPath> = {
  CAS: {
    body: 'CAS',
    name: 'Casualty Actuarial Society',
    stages: [
      {
        kind: 'start',
        short: 'Start',
        title: 'Where everyone starts',
        blurb: 'The first two exams are shared with the SOA, so nothing here is wasted if you change your mind later.',
        items: [
          EXAM_P,
          EXAM_FM,
          {
            icon: GraduationCap,
            name: 'VEE: Economics, Accounting and Finance',
            note: 'Usually covered by university courses. Approved online options exist too.',
            trackIds: ['VEE-ECON', 'VEE-AF'],
          },
        ],
      },
      {
        kind: 'associate',
        short: 'ACAS',
        title: 'Associate (ACAS)',
        ref: concept(ACAS),
        blurb: 'Statistics, ratemaking, reserving and the regulation of an insurer.',
        items: [
          {
            exam: 'MAS-I',
            name: 'MAS-I',
            note: 'Modern Actuarial Statistics I',
            ref: exam('Exam MAS-I (CAS)'),
            trackIds: ['MAS-I'],
          },
          {
            exam: 'MAS-II',
            name: 'MAS-II',
            note: 'Modern Actuarial Statistics II',
            ref: exam('Exam MAS-II (CAS)'),
            trackIds: ['MAS-II'],
          },
          {
            icon: Laptop,
            name: 'The three DISCs',
            note: 'Online Data and Insurance Series Courses, taken through The Institutes.',
            trackIds: ['CAS-DA', 'CAS-RM', 'CAS-IA'],
          },
          {
            exam: 'CAS-5',
            name: 'Exam 5',
            note: 'Ratemaking and estimating claim liabilities. The first written-answer exam.',
            ref: exam('Exam 5 (CAS)'),
            trackIds: ['CAS-5'],
          },
          {
            exam: 'CAS-PCPA',
            name: 'PCPA',
            note: 'Predictive analytics, an exam plus a project.',
            ref: exam('Exam PCPA (CAS)'),
            trackIds: ['CAS-PCPA'],
          },
          {
            exam: 'CAS-6',
            name: 'Exam 6',
            note: 'Regulation and financial reporting, in the version for where you practise (Canada, the U.S. or International).',
            trackIds: ['CAS-6'],
          },
          {
            icon: Scale,
            name: 'Course on Professionalism',
            note: 'The code of conduct, and what membership commits you to.',
            trackIds: ['CAS-APC'],
          },
        ],
      },
      {
        kind: 'fellow',
        short: 'FCAS',
        title: 'Fellow (FCAS)',
        ref: concept(FCAS),
        blurb: 'Three written-answer exams at the advanced end of the same material.',
        items: [
          {
            exam: 'CAS-7',
            name: 'Exam 7',
            note: 'Advanced estimation of claim liabilities',
            ref: exam('Exam 7 (CAS)'),
            trackIds: ['CAS-7'],
          },
          {
            exam: 'CAS-8',
            name: 'Exam 8',
            note: 'Advanced ratemaking',
            ref: exam('Exam 8 (CAS)'),
            trackIds: ['CAS-8'],
          },
          {
            exam: 'CAS-9',
            name: 'Exam 9',
            note: 'Risk management, catastrophes, reinsurance and capital',
            ref: exam('Exam 9 (CAS)'),
            trackIds: ['CAS-9'],
          },
        ],
        optional: { heading: 'In Canada', items: [FCIA] },
      },
      {
        kind: 'ongoing',
        short: 'Ongoing',
        title: 'Keeping it current',
        blurb: 'ACAS and FCAS members who provide actuarial services keep up continuing education and confirm it every year.',
        items: [
          {
            icon: RefreshCw,
            name: 'The CAS Continuing Education Policy',
            note: 'You attest at the end of each year, which lets you practise the year after.',
          },
          {
            icon: MapPin,
            name: 'The standard where you work',
            note: 'Usually met through the local rules: the U.S. Qualification Standards, or the CIA\'s CPD requirements in Canada.',
          },
        ],
        optional: {
          heading: 'Optional, through The CAS Institute (iCAS)',
          items: [
            {
              icon: Award,
              name: 'Certified Specialist in Predictive Analytics',
              note: 'Three exams, a case study project and an ethics course. ACAS and FCAS members can have some of it waived.',
            },
            {
              icon: Award,
              name: 'CSCR and CCRMP',
              note: 'Catastrophe risk credentials, issued with the International Society of Catastrophe Managers.',
            },
          ],
        },
      },
    ],
  },
  SOA: {
    body: 'SOA',
    name: 'Society of Actuaries',
    stages: [
      {
        kind: 'start',
        short: 'Start',
        title: 'Where everyone starts',
        blurb: 'The first two exams are shared with the CAS, so nothing here is wasted if you change your mind later.',
        items: [
          EXAM_P,
          EXAM_FM,
          {
            icon: GraduationCap,
            name: 'VEE: Mathematical Statistics, Economics, Accounting and Finance',
            note: 'Usually covered by university courses. Approved online options exist too.',
            trackIds: ['VEE-MS', 'VEE-ECON', 'VEE-AF'],
          },
        ],
      },
      {
        kind: 'associate',
        short: 'ASA',
        title: 'Associate (ASA)',
        ref: concept(ASA),
        blurb: 'Actuarial mathematics, statistics and predictive analytics, plus a set of e-learning modules.',
        items: [
          {
            exam: 'FAM',
            name: 'FAM',
            note: 'Fundamentals of Actuarial Mathematics, short- and long-term',
            trackIds: ['FAM'],
          },
          {
            exam: 'SRM',
            name: 'SRM',
            note: 'Statistics for Risk Modeling',
            trackIds: ['SRM'],
          },
          {
            exam: 'PA',
            name: 'PA',
            note: 'Predictive Analytics',
            trackIds: ['PA'],
          },
          {
            exam: 'ALTAM',
            name: 'ALTAM or ASTAM',
            note: 'Advanced long-term or short-term actuarial mathematics, whichever fits where you\'re headed.',
            trackIds: ['ALTAM', 'ASTAM'],
            progress: { anyOf: [['ALTAM'], ['ASTAM']] },
          },
          {
            icon: Laptop,
            name: 'PAF, ASF and ATPA',
            note: 'Online modules and assessments.',
            trackIds: ['PAF', 'ASF', 'ATPA'],
          },
          {
            icon: Laptop,
            name: 'FAP',
            note: 'Fundamentals of Actuarial Practice, an e-learning course.',
            trackIds: ['FAP'],
          },
          {
            icon: Scale,
            name: 'APC',
            note: 'Associateship Professionalism Course',
            trackIds: ['APC'],
          },
        ],
      },
      {
        kind: 'fellow',
        short: 'FSA',
        title: 'Fellow (FSA)',
        ref: concept(FSA),
        blurb: 'You pick a practice area and study how that business is actually priced, reserved and run.',
        items: [
          {
            icon: Signpost,
            name: 'A practice area',
            note: 'A 101 and 201 course in one of CFE, GH, GI, ILA, INV or RET.',
            trackIds: [
              'FSA-CFE101', 'FSA-CFE201',
              'FSA-GH101', 'FSA-GH201', 'FSA-GH301',
              'FSA-GI101', 'FSA-GI201', 'FSA-GI301', 'FSA-GI302',
              'FSA-ILA101', 'FSA-ILA201',
              'FSA-INV101', 'FSA-INV201',
              'FSA-RET101', 'FSA-RET201', 'FSA-RET301',
            ],
            progress: {
              anyOf: ['CFE', 'GH', 'GI', 'ILA', 'INV', 'RET'].map(area => [`FSA-${area}101`, `FSA-${area}201`]),
            },
          },
          {
            icon: BookOpen,
            name: 'Two more technical courses',
            note: 'From another practice area or the cross-practice (CP) catalogue.',
            trackIds: ['FSA-CP311', 'FSA-CP312', 'FSA-CP321', 'FSA-CP341', 'FSA-CP351'],
            // Any two technical courses, from another area as well as the CP
            // catalogue: no rule over these ids says when that's met.
            progress: 'none',
          },
          {
            icon: Laptop,
            name: 'DMAC',
            note: 'Decision Making and Communication',
            trackIds: ['FSA-DMAC'],
          },
          {
            icon: Scale,
            name: 'FAC',
            note: 'Fellowship Admissions Course',
            trackIds: ['FSA-FAC'],
          },
        ],
        optional: { heading: 'In Canada', items: [FCIA] },
      },
      {
        kind: 'ongoing',
        short: 'Ongoing',
        title: 'Keeping it current',
        blurb: 'SOA members keep up professional development and confirm it every year.',
        items: [
          {
            icon: RefreshCw,
            name: 'The SOA CPD Requirement',
            note: 'You attest each year, and the attestation covers the previous two calendar years.',
          },
          {
            icon: MapPin,
            name: 'Or an equivalent standard',
            note: 'You can meet it through the SOA\'s own requirement, or through another one it accepts, such as the U.S. Qualification Standards or the CIA\'s.',
          },
        ],
        optional: {
          heading: 'Optional',
          items: [
            {
              icon: Award,
              name: 'Chartered Enterprise Risk Analyst',
              note: 'An enterprise risk management credential. For an FSA it means CFE 101 and the ERM module.',
            },
          ],
        },
      },
    ],
  },
  // The Canadian Institute of Actuaries' own route, transcribed from the
  // designation pages (which cite the CIA's Pathway 1, FCIA syllabus and
  // qualification-pathway pages) and, for the last stage, the CIA's CPD page
  // (cia-ica.ca/professional-practice/continuing-professional-development,
  // read 2026-11-08).
  CIA: {
    body: 'CIA',
    name: 'Canadian Institute of Actuaries',
    stages: [
      {
        kind: 'start',
        short: 'Start',
        title: 'Two ways in',
        blurb: 'Most candidates come through a CIA-accredited university program. The rest bring associate-level credit from the SOA, the CAS or another body.',
        items: [
          {
            icon: GraduationCap,
            name: 'A CIA-accredited degree',
            note: 'With the courses the CIA mandates, and Student membership from the first year.',
          },
          {
            icon: Signpost,
            name: 'Or another body\'s associate-level credit',
            note: 'An ASA or ACAS, or credit for the exams leading to one. Module 2 is still required.',
          },
        ],
      },
      {
        kind: 'associate',
        short: 'ACIA',
        title: 'Associate (ACIA)',
        ref: concept(ACIA),
        blurb: 'Two modules and a capstone exam, all set by the CIA itself.',
        items: [
          {
            icon: BookOpen,
            name: 'ACIA Module 1',
            note: 'After the first year of the degree.',
            ref: exam('Exam ACIA-M1 (CIA)'),
            trackIds: ['CIA-ACIA-M1'],
          },
          {
            icon: BookOpen,
            name: 'ACIA Module 2',
            note: 'In the final year.',
            ref: exam('Exam ACIA-M2 (CIA)'),
            trackIds: ['CIA-ACIA-M2'],
          },
          {
            icon: GraduationCap,
            name: 'ACIA Capstone Exam',
            note: 'Open book, six hours, after the degree.',
            ref: exam('Exam ACIA-CAPSTONE (CIA)'),
            trackIds: ['CIA-ACIA-CAPSTONE'],
          },
          {
            icon: Scale,
            name: 'CIA Professionalism Workshop',
            note: 'Then an application for membership.',
          },
        ],
      },
      {
        kind: 'fellow',
        short: 'FCIA',
        title: 'Fellow (FCIA)',
        ref: concept(FCIA_PAGE),
        blurb: 'One specialty track, a leadership course and three years of experience. Some signing roles in Canada, like appointed actuary, need it.',
        items: [
          {
            icon: Signpost,
            name: 'A specialty track',
            note: 'Two modules and three open-book exams in PC, ILA, GB, RET or FIE.',
            trackIds: CIA_TRACKS.flatMap(t => t.ids),
            progress: { anyOf: CIA_TRACKS.flatMap(t => t.complete) },
          },
          {
            icon: Scale,
            name: 'Advanced Professionalism and Leadership Course',
            note: 'The APLC.',
          },
          {
            icon: MapPin,
            name: 'Experience',
            note: '36 months in the last six years as an ACIA, 12 of them in Canada in the last three.',
          },
        ],
      },
      {
        kind: 'ongoing',
        short: 'Ongoing',
        title: 'Keeping it current',
        blurb: 'Student, Candidate, Associate and Fellow credentials all have to be kept current.',
        items: [
          {
            icon: RefreshCw,
            name: 'The CIA\'s CPD requirement',
            note: '80 hours over a rolling two years, at least 30 of them guided.',
          },
          {
            icon: Scale,
            name: 'The Professionalism Module',
            note: 'Mandatory, with its required readings.',
          },
        ],
      },
    ],
  },
}

/** Where a placed path opens: a society, and a stage along its path. */
export interface PathPosition {
  body: GuideBody
  stage: number
}

const MARKER_RE = /^%%credential-path(?:\s+([^\s%]+))?%%$/

/**
 * Reads a marker line. The bare `%%credential-path%%` is the general guide's,
 * and opens wherever the reader's society says. `%%credential-path FCAS%%`
 * names a designation — a credential stage's `short` — and opens that society
 * at that stage, which is how a designation page shows where it sits.
 *
 * Anything else is not a marker, a designation no stage has included, so a
 * typo is left on the page as text rather than drawn as the wrong path.
 */
export function readCredentialPathMarker(text: string): { at?: PathPosition } | null {
  const match = MARKER_RE.exec(text.trim())
  if (!match) return null
  const designation = match[1]
  if (!designation) return {}
  for (const path of Object.values(CREDENTIAL_PATHS)) {
    const stage = path.stages.findIndex(s => s.ref && s.short === designation)
    if (stage >= 0) return { at: { body: path.body, stage } }
  }
  return null
}

/** The line in a page's markdown that the three societies' map replaces (`CredentialMap`). */
export const CREDENTIAL_MAP_MARKER = '%%credential-map%%'

/** Whether a line is the map's marker. */
export function isCredentialMapMarker(text: string): boolean {
  return text.trim() === CREDENTIAL_MAP_MARKER
}
