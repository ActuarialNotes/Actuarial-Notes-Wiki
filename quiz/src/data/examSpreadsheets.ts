/**
 * The spreadsheet each exam is sat with — **Open in Spreadsheet**'s profiles
 * (docs/question-spreadsheet.md).
 *
 * An exam is listed here only when its examining body says candidates have a
 * spreadsheet on exam day; a question from any other exam gets no button.
 * Every rule is transcribed from the body's or the test vendor's own page, with
 * the page and the date it was read, never constructed. The function list is
 * the vendor's file, read mechanically by `scripts/spreadsheet_functions.py`
 * into `data/pearsonVueFunctions.json` — kept out of this module so the quiz
 * page doesn't carry it; the spreadsheet pane loads it.
 *
 * To add an exam (an SOA exam with a spreadsheet, say), add its progress key to
 * a profile that matches its test driver, or a new profile with its own list
 * and its own sources.
 */

export type SpreadsheetProfileId = 'pearson-vue'

export interface SpreadsheetFact {
  /** The rule, in the source's words or close to them. */
  text: string
  source: string
  checked: string
}

export interface SpreadsheetProfile {
  id: SpreadsheetProfileId
  /** The test driver's name, as the pill shows it. */
  name: string
  /** Progress keys (`lib/examIds.ts`) of the exams sat with it. */
  exams: readonly string[]
  /** One worksheet per question: no second tab. */
  singleSheet: boolean
  /** Function keys (F2, F4…) do nothing on exam day. */
  functionKeys: boolean
  /** What the profile's rules rest on, for the menu's "about" line. */
  facts: readonly SpreadsheetFact[]
}

const CAS_KNOW_BEFORE = 'https://www.casact.org/exams-admissions/exams/candidate-know-you-go'
const PEARSON_CAS = 'https://www.pearsonvue.com/us/en/cas.html'
const PEARSON_FUNCTIONALITY =
  'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/cas/Spreadsheet-Functionality-for-CAS-Exams.pdf'

export const SPREADSHEET_PROFILES: readonly SpreadsheetProfile[] = [
  {
    id: 'pearson-vue',
    name: 'Pearson VUE',
    // "Candidates can expect to see this spreadsheet on all CAS exams at
    // Pearson VUE test centers." The DISCs (The Institutes) and PCPA (a
    // project) aren't sat there.
    exams: ['MAS-I', 'MAS-II', 'CAS-5', 'CAS-6', 'CAS-7', 'CAS-8', 'CAS-9'],
    singleSheet: true,
    functionKeys: false,
    facts: [
      {
        text: 'Candidates can expect to see this spreadsheet on all CAS exams at Pearson VUE test centers.',
        source: CAS_KNOW_BEFORE,
        checked: '2026-11-08',
      },
      {
        text: 'This is not a workbook: the spreadsheet response type offers a single worksheet per instance.',
        source: PEARSON_FUNCTIONALITY,
        checked: '2026-11-08',
      },
      {
        text: 'Function keys such as F2, F4, etc. do not operate in the Pearson VUE environment.',
        source: CAS_KNOW_BEFORE,
        checked: '2026-11-08',
      },
      {
        text: 'Candidates are free to use any of these functions in their responses to the questions on the exam.',
        source: CAS_KNOW_BEFORE,
        checked: '2026-11-08',
      },
      {
        text: 'The functions are Pearson VUE’s Spreadsheet Function List, published on its CAS page.',
        source: PEARSON_CAS,
        checked: '2026-11-08',
      },
    ],
  },
]

/** The spreadsheet an exam is sat with, by progress key, or null for none. */
export function spreadsheetProfileFor(examKey: string | null | undefined): SpreadsheetProfile | null {
  if (!examKey) return null
  return SPREADSHEET_PROFILES.find(p => p.exams.includes(examKey)) ?? null
}
