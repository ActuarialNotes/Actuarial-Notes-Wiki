// The **vintages** of each exam's syllabus: the editions of the examining
// body's syllabus document, newest first, and which readings each one added
// and dropped against the edition before it. The Resources page's **Vintage**
// filter reads it (`lib/resourceVintages.ts`), so a candidate can see what an
// exam's reading list was for an earlier sitting and what changed since.
//
// ── Rules for this file ───────────────────────────────────────────────────────
// The same rule as `examPdfLinks.ts` and the pass-rate tables: **transcribed,
// never constructed**. An edition is listed only once its document has been
// read; `added` / `dropped` are a diff of the two documents' reading lists,
// not of the vault's page; and every `source.url` is the publisher's own,
// opened and read — never extrapolated from the publisher's filename pattern.
// An edition that hasn't been located is simply absent: the shelf then offers
// fewer vintages, which is honest, where a guessed one would put a reading on
// a sitting that never assigned it.
//
// What is *not* recorded here is the newest edition's reading list itself:
// that is the exam page's `Source Material` callout, which the vault already
// keeps. Each edition records only what changed, so the earlier lists follow
// by walking back — the readings of edition i+1 are edition i's, less what i
// added, plus what i dropped. The newest edition's `dropped` also takes a
// retired reading off the current list when the exam page keeps it for the
// record (Exam 6C's page still lists the three Fall 2025 readings, marked
// retired).
//
// Keys are the exam labels the resource cards carry (`examPillLabel` in
// `lib/resourceExams.ts`); reading names are the vault's page names — the
// `[[link]]` the exam page's Source Material uses, which for CAS is the
// outline's own citation abbreviation. A reading only a past edition assigned
// may have no page; it is listed by the outline's abbreviation all the same,
// with the outline's title for it in `titles`.
//
// CAS overwrites an outline file in place when it revises it, so a URL's
// folder date doesn't say which edition it holds: each `title` below carries
// the "Version:" line the PDF prints on its last page, which does. An
// edition whose PDF is no longer published (CAS's April/May 2026 outlines for
// Exams 5, 7 and 9, which its Syllabus/Content Outline Updates page says
// changed no readings) is absent rather than reconstructed.

export interface SyllabusEditionSource {
  /** The publisher's document, as fetched. */
  url: string
  /** The document as it prints its own name and version. */
  title: string
}

export interface SyllabusEdition {
  /** The administration the document is for, as the publisher names it. */
  label: string
  source: SyllabusEditionSource
  /** Readings this edition assigns that the next-older edition didn't. */
  added?: readonly string[]
  /** Readings the next-older edition assigned that this one doesn't. */
  dropped?: readonly string[]
  /**
   * The title, as the outline cites it, of an added or dropped reading the
   * vault has no page for — so its card names the work rather than an
   * abbreviation.
   */
  titles?: Readonly<Record<string, string>>
}

/** Exam label → its syllabus editions, newest first. The oldest carries no diff. */
export const SYLLABUS_VINTAGES: Readonly<Record<string, readonly SyllabusEdition[]>> = {
  // Diffed from the two outlines' Complete Text References tables (Fall 2026
  // pp.7-14, Fall 2025 pp.7-14): 63 readings → 64. Every reading the two share
  // kept its task codes; "IBC IFRS 17 - Metrics Discussion" is how the Fall 2026
  // domain list (p.6) prints the new IBC reading the table calls "IBC IFRS 17
  // Metrics Discussion" — one reading, not a rename.
  'Exam 6C': [
    {
      label: 'Fall 2026',
      source: {
        url: 'https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf',
        title: 'Exam 6C Content Outline, Fall 2026 (v04, 2026-05-26)',
      },
      added: ['CFAI', 'CIA Reliance', 'GAO', 'IBC IFRS 17 Metrics Discussion'],
      dropped: ['Alberta Auto Reform', 'CIA Reinsurance Treatment', 'Harris'],
    },
    {
      label: 'Fall 2025',
      source: {
        url: 'https://www.casact.org/sites/default/files/2025-05/Exam_6C_ContentOutlines_2025_F.pdf',
        title: 'Exam 6C Content Outline, Fall 2025 (v04, 2025-05-09)',
      },
    },
  ],
  // Six readings in all three editions, cited identically. Fall 2026 added a
  // task (A18) and corrected Friedland's task range, which changes no reading.
  'Exam 5': [
    {
      label: 'Fall 2026',
      source: {
        url: 'https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf',
        title: 'Exam 5 Content Outline, Fall 2026 (Exam_5_CO_2026_F v02 2026_09_15)',
      },
    },
    {
      label: 'Fall 2025',
      source: {
        url: 'https://www.casact.org/sites/default/files/2025-05/Exam_5_ContentOutline_2025_F.pdf',
        title: 'Exam 5 Content Outline, Fall 2025 (Exam_5_CO_2025_F v06 2025_5_1)',
      },
    },
    {
      label: 'Spring 2025',
      source: {
        url: 'https://www.casact.org/sites/default/files/2023-06/Exam_5_Content_Outline.pdf',
        title: 'Exam 5 Content Outline, Spring 2025 (Exam_5_CO_2025_S v05 2024_12_17)',
      },
    },
  ],
  // Fifteen readings in all three. Fall 2026 changed four citations — Meyers's
  // 2nd edition (Monograph #8 for #1), Taylor & McGuire's Chapters 1-6 for
  // 1-3, two errata notes — and recoded the tasks, but added and dropped nothing.
  'Exam 7': [
    {
      label: 'Fall 2026',
      source: {
        url: 'https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf',
        title: 'Exam 7 Content Outline, Fall 2026 (Exam_7_CO_2026_F v04 2026_9_16)',
      },
    },
    {
      label: 'Fall 2025',
      source: {
        url: 'https://www.casact.org/sites/default/files/2025-05/Exam_7_Content_Outlines_2025_F.pdf',
        title: 'Exam 7 Content Outline, Fall 2025 (Exam_7_2025_F v04 2025_5_9)',
      },
    },
    {
      label: 'Spring 2025',
      source: {
        url: 'https://www.casact.org/sites/default/files/2023-05/Exam7_Content_Outline.pdf',
        title: 'Exam 7 Content Outline, Spring 2025 (Exam_7_2025_S v03 2024_12_19)',
      },
    },
  ],
  // 11 readings → 13 → 12. The file CAS published for Fall 2025 now holds its
  // Spring 2026 revision (v05), which the Updates page says changed no reading
  // from the October 2025 outline; it is listed as the edition it prints.
  // "GLM" became "Goldburd et al." in Fall 2026 — one reading, renamed. The
  // Fall 2024 outline says its list "is still being finalized", so ASOP 25 may
  // have joined in a late revision of it that hasn't been found; Holmes &
  // Casotto (Monograph #13, November 2024) postdates that sitting either way.
  'Exam 8': [
    {
      label: 'Fall 2026',
      source: {
        url: 'https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf',
        title: 'Exam 8 Content Outline, Fall 2026 (Exam_8_CO_2026_F v03 2026_6_22)',
      },
      added: ['From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges (Chalk et al.)'],
      dropped: ['NCCI', 'NCCI Circular'],
      titles: {
        NCCI: 'NCCI, Experience Rating Plan Manual for Workers Compensation and Employers Liability Insurance',
        'NCCI Circular': 'NCCI, Retrospective Rating Plan Manual for Workers Compensation and Employers Liability Insurance',
      },
    },
    {
      label: 'Spring 2026',
      source: {
        url: 'https://www.casact.org/sites/default/files/2025-05/Exam_8_ContentOutline_2025_F.pdf',
        title: 'Exam 8 Content Outline, Spring 2026 (Exam_8_CO_2026_S v05 2026_02_26)',
      },
      added: [
        'ASOP 25 - Credibility Procedures (ASB - 2013)',
        'Penalized Regression and Lasso Credibility (Holmes and Casotto - 2025)',
      ],
    },
    {
      label: 'Fall 2024',
      source: {
        url: 'https://www.casact.org/sites/default/files/2023-12/Exam_8_CO_2024_F_v01_2023_12_19.pdf',
        title: 'Exam 8 Content Outline, Fall 2024 (Exam_8_CO_2024_F v01 2023_12_19)',
      },
    },
  ],
  // Nine readings in both; Fall 2026 only turned Cummins Capital's erratum
  // into a study note.
  'Exam 9': [
    {
      label: 'Fall 2026',
      source: {
        url: 'https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf',
        title: 'Exam 9 Content Outline, Fall 2026 (Exam_9_CO_2026_F v01 2026_3_18)',
      },
    },
    {
      label: 'Spring 2025',
      source: {
        url: 'https://www.casact.org/sites/default/files/2023-05/Exam9_Content_Outline.pdf',
        title: 'Exam 9 Content Outline, Spring 2025 (Exam_9_CO_2025_S v02 2024_12_19)',
      },
    },
  ],
  // MAS-I: eight readings in both outlines (Fall 2026 only allows Ross's 13th
  // edition beside the 11th and 12th). The 2025-05 MASI_ContentOutline_2025.pdf
  // is byte-identical to the 2026 file, so it is not an edition of its own. The
  // 2023 and 2024 outlines are no longer published, so the 2022 Syllabus of
  // Basic Education is the next one back: Cowpertwait moved to MAS-II between
  // them (and three texts moved up an edition, which changes no reading).
  'Exam MAS-I': [
    {
      label: '2026',
      source: {
        url: 'https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf',
        title: 'MAS-I Content Outline, 2026 (MASI_CO_2026_F v06 2026_6_29)',
      },
    },
    {
      label: 'Spring 2025',
      source: {
        url: 'https://www.casact.org/sites/default/files/2023-06/MASI_Content_Outline.pdf',
        title: 'MAS-I Content Outline, Spring 2025 (MASI_CO_2025_S v04 2024_12_19)',
      },
      dropped: ['Introductory Time Series with R (Cowpertwait - 2009)'],
    },
    {
      label: '2022',
      source: {
        url: 'https://www.casact.org/sites/default/files/2021-03/MAS-I_individual_textref.pdf',
        title: 'Syllabus of Basic Education 2022, Exam MAS-I (MASI_individual_textref_S22)',
      },
    },
  ],
  // MAS-II: 5 readings → 5 → 6, the sixth Salis's study note on the 2026 outline.
  'Exam MAS-II': [
    {
      label: 'Spring 2026',
      source: {
        url: 'https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf',
        title: 'MAS-II Content Outline, Spring 2026 (MASII_CO_S_2026 v06 2026_1_13)',
      },
      added: ['Measures of Predictive Accuracy (Salis - 2025)'],
    },
    {
      label: 'Spring 2025',
      source: {
        url: 'https://www.casact.org/sites/default/files/2023-06/MASII_Content_Outline.pdf',
        title: 'MAS-II Content Outline, Spring 2025 (MASII_CO_S_2025 v04 2024_12_19)',
      },
      added: [
        'Introductory Time Series with R (Cowpertwait - 2009)',
        'Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)',
      ],
      dropped: ['Ford', 'McElreath'],
      titles: {
        Ford: 'MCMC Algorithms (Ford, CAS Study Note, Version 0.7, November 2019)',
        McElreath: 'Statistical Rethinking: A Bayesian Course with Examples in R and Stan (McElreath, 2nd ed., 2020)',
      },
    },
    {
      label: '2022',
      source: {
        url: 'https://www.casact.org/sites/default/files/2021-03/MAS-II_individual_textref.pdf',
        title: 'Syllabus of Basic Education 2022, Exam MAS-II (Exam_MAS-II_2022 v02 2021_10_21)',
      },
    },
  ],
  // Exam P: six readings since Leemis joined in January 2023; every syllabus
  // between that one and January 2027 has the same six (sections were trimmed
  // in May 2026, which changes no reading).
  'Exam P-1': [
    {
      label: 'January 2027',
      source: {
        url: 'https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-p-syllabus.pdf',
        title: 'Probability Exam – January 2027 (SOA syllabus)',
      },
    },
    {
      label: 'January 2023',
      source: {
        url: 'https://www.soa.org/globalassets/assets/files/edu/2023/2023-01-exam-p-syllabus.pdf',
        title: 'Probability Exam – January 2023 (SOA syllabus)',
      },
      added: ['Probability (Leemis - 2018)'],
    },
    {
      label: 'November 2022',
      source: {
        url: 'https://www.soa.org/globalassets/assets/files/edu/2022/2022-11-exam-p-syllabus.pdf',
        title: 'Probability Exam – November 2022 (SOA syllabus)',
      },
    },
  ],
  // Exam FM: Brown & Kopp replaced Kellison in February 2023. Every edition
  // since has the same five texts and study note; Broverman, Brown & Kopp,
  // Francis & Ruckman and Chan & Tse moved up an edition along the way, which
  // changes no reading.
  'Exam FM-2': [
    {
      label: 'December 2026',
      source: {
        url: 'https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf',
        title: 'Financial Mathematics Exam—December 2026 (SOA syllabus)',
      },
    },
    {
      label: 'December 2024',
      source: {
        url: 'https://www.soa.org/globalassets/assets/files/edu/2024/2024-12-exam-fm-syllabus.pdf',
        title: 'Financial Mathematics Exam—December 2024 (SOA syllabus)',
      },
    },
    {
      label: 'February 2023',
      source: {
        url: 'https://www.soa.org/globalassets/assets/files/edu/2023/2023-02-exam-fm-syllabus.pdf',
        title: 'Financial Mathematics Exam—February 2023 (SOA syllabus)',
      },
      added: ['Financial Mathematics: Theory and Practice (Brown, R. and Kopp, S. – 2024)'],
      dropped: ['Kellison'],
      titles: { Kellison: 'The Theory of Interest (Kellison, 3rd ed., 2009)' },
    },
    {
      label: 'December 2022',
      source: {
        url: 'https://www.soa.org/globalassets/assets/files/edu/2022/2022-12-exam-fm-syllabus.pdf',
        title: 'Financial Mathematics Exam—December 2022 (SOA syllabus)',
      },
    },
  ],
}

/** An exam's editions, newest first — none when no edition is on file. */
export function syllabusEditions(exam: string): readonly SyllabusEdition[] {
  return SYLLABUS_VINTAGES[exam] ?? []
}
