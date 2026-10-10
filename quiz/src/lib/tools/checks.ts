/**
 * What each tool is tested against (docs/actuarial-tools.md R6, §9.1): published
 * worked examples, read off the publisher's PDF by `scripts/tool_fixtures.py`
 * (never retyped), each turned into the tool's inputs and the values the source
 * prints.
 *
 * One list does two jobs, so they can't drift: `checks.test.ts` runs every
 * check and fails on any value the tool doesn't reproduce at the source's
 * printed precision, and `checksFor` is what the card's "Tested against" line
 * and `describe_tool` say. A check that isn't here isn't claimed anywhere.
 */

import friedland from './fixtures/friedland-2010.json'
import werner from './fixtures/basic-ratemaking-2016.json'
import { runTool } from './run'
import { toolById } from './registry'
import type { ToolResult } from './types'
import { QUESTION_CHECKS, questionRef, type QuestionCheck } from './questionChecks'

export interface SourceRef {
  /** The vault's Resources/Books page, for a published document. */
  resource?: string
  /** The bank id, for a published exam question. */
  question?: string
  title: string
  /** The document's URL, or the app's link to the question. */
  url: string
  locator: string
  /** The page the source prints: a number, or an appendix exhibit's own ('A-7'). */
  page?: number | string
  /** The same page as the PDF numbers it (1-based), which the reader opens at. */
  pdfPage?: number
}

/** One printed value the tool must reproduce. */
interface Expectation {
  what: string
  printed: number
  /** Half the printed precision: 0.0005 for three decimals, 0.5 for whole dollars. */
  tolerance: number
  actual: (result: ToolResult) => number
}

interface Case {
  name: string
  input: Record<string, unknown>
  expect: Expectation[]
}

export interface ToolCheck {
  tool: string
  source: SourceRef
  cases: Case[]
}

export interface CheckMismatch {
  tool: string
  locator: string
  case: string
  what: string
  printed: number
  actual: number
}

const F = friedland.exhibits
const friedlandRef = (exhibit: { locator: string; printed_page: number; pdf_page: number }): SourceRef => ({
  resource: friedland.source.resource,
  title: friedland.source.title,
  url: friedland.source.url,
  locator: exhibit.locator,
  page: exhibit.printed_page,
  pdfPage: exhibit.pdf_page,
})

const W = werner.exhibits
const wernerRef = (exhibit: { locator: string; printed_page: string; pdf_page: number }): SourceRef => ({
  resource: werner.source.resource,
  title: werner.source.title,
  url: werner.source.url,
  locator: exhibit.locator,
  page: exhibit.printed_page,
  pdfPage: exhibit.pdf_page,
})
/** A Werner exhibit's numbered row, as printed. */
const row = (exhibit: { rows: Record<string, { value: number }> }, n: number) => exhibit.rows[String(n)].value

const FACTOR = 0.0005 + 1e-9
const PERCENT = 0.0005 + 1e-9
const DOLLAR = 0.5 + 1e-6

const ch7 = F.ch7_exhibit1_sheet1
const ch7Projections = F.ch7_exhibit1_sheet3
const ch8 = F.ch8_exhibit2_sheet1
const ch9 = F.ch9_exhibit1_sheet1

const values = (r: ToolResult, key: string) => r.values[key] as number[]

/** "volume_latest_5" → the tool's average and latest-years inputs. */
function averageInput(key: string): { average: string; latest: number } {
  const [average, , n] = key.split('_')
  return { average, latest: Number(n) }
}

export const CHECKS: ToolCheck[] = [
  {
    tool: 'reserving.age_to_age_factors',
    source: friedlandRef(ch7),
    cases: [
      {
        name: 'Part 2, the age-to-age factors',
        input: { triangle: ch7.triangle },
        expect: Object.entries(ch7.factors).flatMap(([origin, printed]) =>
          printed.map((value, j) => ({
            what: `${origin}, ${ch7.ages[j]}–${ch7.ages[j + 1]}`,
            printed: value,
            tolerance: FACTOR,
            actual: (r: ToolResult) => {
              const row = (r.values.factors as Record<string, number | string | null>[]).find(f => f.origin === origin)!
              return Number(row[`${ch7.ages[j]}–${ch7.ages[j + 1]}`])
            },
          })),
        ),
      },
      ...Object.entries(ch7.averages).map(([key, printed]) => ({
        name: `Part 3, ${key.replace(/_/g, ' ')}`,
        input: { triangle: ch7.triangle, ...averageInput(key) },
        expect: printed.map((value, j) => ({
          what: `${ch7.ages[j]}–${ch7.ages[j + 1]}`,
          printed: value,
          tolerance: FACTOR,
          actual: (r: ToolResult) => values(r, 'averages')[j],
        })),
      })),
    ],
  },
  {
    tool: 'reserving.development_to_ultimate',
    source: friedlandRef(ch7),
    cases: [
      {
        name: 'Part 4, CDF to ultimate and percent reported from the selected factors',
        input: {
          // The exhibit takes percent reported from the CDF it prints, rounded to three decimals.
          rounding: 'three',
          tail: ch7.selected[ch7.selected.length - 1],
          factors: ch7.ages.map((age, j) => ({ age, factor: j < ch7.ages.length - 1 ? ch7.selected[j] : null })),
        },
        expect: [
          ...ch7.cdf.map((value, j) => ({
            what: `CDF at ${ch7.ages[j]}`,
            printed: value,
            tolerance: FACTOR,
            actual: (r: ToolResult) => values(r, 'cdfs')[j],
          })),
          ...ch7.percent_reported.map((value, j) => ({
            what: `percent reported at ${ch7.ages[j]}`,
            printed: value,
            tolerance: PERCENT,
            actual: (r: ToolResult) => values(r, 'percent_developed')[j],
          })),
        ],
      },
    ],
  },
  {
    tool: 'reserving.chain_ladder',
    source: friedlandRef(ch7Projections),
    cases: (['reported', 'paid'] as const).map(basis => ({
      name: `Column (${basis === 'reported' ? 7 : 8}), ultimate claims from ${basis} claims`,
      input: {
        basis,
        rows: ch7Projections.rows.map(r => ({ origin: r.origin, latest: r[basis], cdf: basis === 'reported' ? r.cdf_reported : r.cdf_paid })),
      },
      expect: ch7Projections.rows.map((r, k) => ({
        what: `${r.origin} ultimate`,
        printed: basis === 'reported' ? r.ultimate_reported : r.ultimate_paid,
        tolerance: DOLLAR,
        actual: (res: ToolResult) => values(res, 'ultimate')[k],
      })),
    })),
  },
  {
    tool: 'reserving.expected_claims',
    source: friedlandRef(ch8),
    cases: [
      {
        name: 'Column (12), expected claims from earned premium and the selected claim ratio',
        input: { rows: ch8.rows.map(r => ({ origin: r.origin, premium: r.premium, elr: r.selected_ratio })) },
        expect: ch8.rows.map((r, k) => ({
          what: `${r.origin} expected claims`,
          printed: r.expected,
          tolerance: DOLLAR,
          actual: (res: ToolResult) => values(res, 'expected')[k],
        })),
      },
    ],
  },
  {
    tool: 'reserving.bornhuetter_ferguson',
    source: friedlandRef(ch9),
    cases: (['reported', 'paid'] as const).map(basis => {
      const reported = basis === 'reported'
      return {
        name: `Columns (${reported ? '5), (7) and (11' : '6), (8) and (12'}), the B-F method with ${basis} claims`,
        input: {
          basis,
          rows: ch9.rows.map(r => ({ origin: r.origin, latest: r[basis], cdf: reported ? r.cdf_reported : r.cdf_paid, expected: r.expected })),
        },
        expect: ch9.rows.flatMap((r, k) => [
          {
            what: `${r.origin} percent ${reported ? 'unreported' : 'unpaid'}`,
            printed: reported ? r.unreported : r.unpaid,
            tolerance: PERCENT,
            actual: (res: ToolResult) => values(res, 'percent_unreported')[k],
          },
          {
            what: `${r.origin} expected ${reported ? 'unreported' : 'unpaid'} claims`,
            printed: reported ? r.ibnr_reported : r.ibnr_paid,
            tolerance: DOLLAR,
            actual: (res: ToolResult) => values(res, 'reserve')[k],
          },
          {
            what: `${r.origin} ultimate`,
            printed: reported ? r.ultimate_reported : r.ultimate_paid,
            tolerance: DOLLAR,
            actual: (res: ToolResult) => values(res, 'ultimate')[k],
          },
        ]),
      }
    }),
  },
]

// Werner & Modlin: the loss ratio method's two worked indications, and the
// classical credibility standard and square-root rule — the chapter's own
// example and the three appendix exhibits that apply it.
CHECKS.push(
  ...[
    { exhibit: W.a7_lr_indication, loss: 11, fixed: 12 as number | null, variable: 13, profit: 14, plr: 15, change: 16 },
    // Appendix C treats every expense, with ULAE, as variable: no fixed provision.
    { exhibit: W.c7_lr_indication, loss: 8, fixed: null, variable: 9, profit: 10, plr: 11, change: 12 },
  ].map(({ exhibit, loss, fixed, variable, profit, plr, change }) => ({
    tool: 'ratemaking.loss_ratio_method',
    source: wernerRef(exhibit),
    cases: [{
      name: `Rows (${plr}) and (${change}), the permissible loss ratio and indicated rate change`,
      input: { loss_ratio: row(exhibit, loss), fixed: fixed === null ? 0 : row(exhibit, fixed), variable: row(exhibit, variable), profit: row(exhibit, profit) },
      expect: [
        { what: 'variable permissible loss ratio', printed: row(exhibit, plr), tolerance: PERCENT, actual: (r: ToolResult) => Number(r.values.variable_permissible_loss_ratio) },
        { what: 'indicated rate change', printed: row(exhibit, change), tolerance: PERCENT, actual: (r: ToolResult) => Number(r.values.indicated_change) },
      ],
    }],
  })),
  {
    tool: 'credibility.full_credibility_standard',
    source: wernerRef(W.ch12_full_standard),
    cases: [{
      name: 'the claims needed for full credibility at the chapter\'s p and k',
      input: { basis: 'frequency', p: W.ch12_full_standard.p, k: W.ch12_full_standard.k },
      expect: [
        { what: 'standard normal quantile', printed: W.ch12_full_standard.z, tolerance: FACTOR, actual: (r: ToolResult) => Number(r.values.z) },
        { what: 'full credibility standard', printed: W.ch12_full_standard.standard, tolerance: DOLLAR, actual: (r: ToolResult) => Number(r.values.standard) },
      ],
    }],
  },
  {
    tool: 'credibility.partial_credibility',
    source: wernerRef(W.ch12_square_root_rule),
    cases: [{
      name: 'the square root rule at the chapter\'s claim count',
      input: { claims: W.ch12_square_root_rule.claims, standard: W.ch12_square_root_rule.standard },
      // The chapter prints Z to two decimals.
      expect: [{ what: 'Z', printed: W.ch12_square_root_rule.z, tolerance: 0.005 + 1e-9, actual: (r: ToolResult) => Number(r.values.z) }],
    }],
  },
  ...[
    { exhibit: W.a8_credibility, claims: 1, standard: 2, z: 3 },
    { exhibit: W.b5_pp_indication, claims: 9, standard: 10, z: 11 },
    { exhibit: W.c7_lr_indication, claims: 13, standard: 14, z: 15 },
  ].map(({ exhibit, claims, standard, z }) => ({
    tool: 'credibility.partial_credibility',
    source: wernerRef(exhibit),
    cases: [{
      name: `Row (${z}), the credibility of ${row(exhibit, claims)} claims`,
      input: { claims: row(exhibit, claims), standard: row(exhibit, standard) },
      expect: [{ what: 'Z', printed: row(exhibit, z), tolerance: PERCENT, actual: (r: ToolResult) => Number(r.values.z) }],
    }],
  })),
)

/** Run one check: every printed value the tool doesn't reproduce at the source's precision. */
export function verifyCheck(check: ToolCheck): CheckMismatch[] {
  const spec = toolById(check.tool)
  if (!spec) throw new Error(`No tool ${check.tool}`)
  const out: CheckMismatch[] = []
  for (const c of check.cases) {
    const result = runTool(spec, c.input)
    for (const e of c.expect) {
      const actual = e.actual(result)
      if (!(Math.abs(actual - e.printed) <= e.tolerance)) {
        out.push({ tool: check.tool, locator: check.source.locator, case: c.name, what: e.what, printed: e.printed, actual })
      }
    }
  }
  return out
}

/** What a tool says it was tested against: the sources of its checks — one per exhibit, then the questions. */
export function checksFor(toolId: string): SourceRef[] {
  return [
    ...CHECKS.filter(c => c.tool === toolId).map(c => c.source),
    ...QUESTION_CHECKS.filter(q => q.steps.some(s => s.tool === toolId)).map(questionRef),
  ]
}

/** How many printed values a tool's checks hold it to. */
export function checkedValueCount(toolId: string): number {
  return CHECKS.filter(c => c.tool === toolId).reduce((n, c) => n + c.cases.reduce((m, k) => m + k.expect.length, 0), 0)
}

/** Work one published question through its chain of tools; the number it comes to. */
export function runQuestionCheck(q: QuestionCheck): number {
  const results: ToolResult[] = []
  for (const step of q.steps) {
    const spec = toolById(step.tool)
    if (!spec) throw new Error(`No tool ${step.tool}`)
    results.push(runTool(spec, step.input(results)))
  }
  return q.value(results)
}
