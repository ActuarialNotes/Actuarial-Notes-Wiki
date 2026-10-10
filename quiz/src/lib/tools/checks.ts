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

// Friedland's Cape Cod (Chapter 10, Exhibit I): the expected claim ratio from
// used-up premium on Sheet 1, and the expected claims, IBNR and ultimates on Sheet 2.
const ch10 = F.ch10_exhibit1_sheet1
const ch10Projection = F.ch10_exhibit1_sheet2
const capeCodInput = { rows: ch10.rows.map(r => ({ origin: r.origin, premium: r.premium, latest: r.reported, cdf: r.cdf })) }
CHECKS.push(
  {
    tool: 'reserving.cape_cod',
    source: friedlandRef(ch10),
    cases: [{
      name: 'Columns (7) and (8), used-up premium and the total expected claim ratio',
      input: capeCodInput,
      expect: [
        ...ch10.rows.map((r, k) => ({ what: `${r.origin} used-up premium`, printed: r.used_up, tolerance: DOLLAR, actual: (res: ToolResult) => values(res, 'used_up')[k] })),
        { what: 'expected claim ratio', printed: ch10.total.claim_ratio, tolerance: PERCENT, actual: (res: ToolResult) => Number(res.values.elr) },
      ],
    }],
  },
  {
    tool: 'reserving.cape_cod',
    source: friedlandRef(ch10Projection),
    cases: [{
      name: 'Columns (4), (7) and (9), expected claims, IBNR and ultimate claims',
      input: capeCodInput,
      expect: ch10Projection.rows.flatMap((r, k) => [
        { what: `${r.origin} expected claims`, printed: r.expected, tolerance: DOLLAR, actual: (res: ToolResult) => values(res, 'expected')[k] },
        { what: `${r.origin} IBNR`, printed: r.ibnr, tolerance: DOLLAR, actual: (res: ToolResult) => values(res, 'reserve')[k] },
        { what: `${r.origin} ultimate`, printed: r.ultimate, tolerance: DOLLAR, actual: (res: ToolResult) => values(res, 'ultimate')[k] },
      ]),
    }],
  },
)

// Friedland's Benktander (Chapter 9, Exhibit V) under the changing conditions,
// from Exhibit III's expected claims. These scenarios are built from their
// percentages unreported (1.0%, 2.0% …), which the CDFs print rounded (1.010),
// and the exhibit's arithmetic uses the percentage: so the CDF given is
// 1 / (1 − the printed percentage), as a reader working the exhibit would.
// Not the reported claims of Sheet 2's case-strengthening scenarios: those
// develop on five-year averages, which the exhibit prints only rounded both as
// CDFs and as percentages, so no printed input reproduces them to the dollar.
//
// The inputs are themselves printed to the dollar, and U = L + q(L + qE) carries
// their rounding through: the tolerance is the output's half-dollar plus that,
// ½(1 + q + q²).
CHECKS.push(
  ...([['ch9_exhibit3_sheet1', 'ch9_exhibit5_sheet1'], ['ch9_exhibit3_sheet2', 'ch9_exhibit5_sheet2']] as const).flatMap(([bfKey, gbKey]) => {
    const bf = F[bfKey]
    const gb = F[gbKey]
    return [{
      tool: 'reserving.benktander',
      source: friedlandRef(gb),
      cases: Object.entries(gb.scenarios).flatMap(([scenario, rows]) => (['reported', 'paid'] as const).filter(basis => basis === 'paid' || gbKey === 'ch9_exhibit5_sheet1').map(basis => {
        const reported = basis === 'reported'
        const prior = bf.scenarios[scenario as keyof typeof bf.scenarios]
        return {
          name: `${scenario}, column (${reported ? 11 : 12}), the Benktander ultimate with ${basis} claims`,
          input: {
            basis,
            iterations: 2,
            rows: prior.map(r => ({ origin: r.origin, latest: r[basis], cdf: 1 / (1 - (reported ? r.unreported : r.unpaid)), expected: r.expected })),
          },
          expect: rows.map((r, k) => {
            const q = reported ? r.unreported : r.unpaid
            return {
              what: `${r.origin} ultimate`,
              printed: reported ? r.ultimate_reported : r.ultimate_paid,
              tolerance: DOLLAR + 0.5 * (1 + q + q * q),
              actual: (res: ToolResult) => values(res, 'ultimate')[k],
            }
          }),
        }
      })),
    }]
  }),
)

// Friedland's Chapter 6 diagnostics: Table 6 is Table 3 over Table 2, and
// Table 10 is Table 9 over Table 8. The claims are printed in $000, so each
// ratio carries their rounding: ½(1 + a/b)/b on top of the ratio's own.
const ch6 = (key: 'ch6_tables_2_3' | 'ch6_table_6' | 'ch6_table_8' | 'ch6_table_9' | 'ch6_table_10', table: string) => {
  const t = (F[key].tables as Record<string, { origins: string[]; ages: number[]; values: (number | null)[][] }>)[table]
  return { origins: t.origins, ages: t.ages, values: t.values }
}
CHECKS.push(
  ...[
    { key: 'ch6_table_6' as const, table: 'table_6', numerator: ch6('ch6_tables_2_3', 'table_3'), denominator: ch6('ch6_tables_2_3', 'table_2'), what: 'paid-to-reported' },
    { key: 'ch6_table_10' as const, table: 'table_10', numerator: ch6('ch6_table_9', 'table_9'), denominator: ch6('ch6_table_8', 'table_8'), what: 'closed-to-reported counts' },
  ].map(({ key, table, numerator, denominator, what }) => {
    const printed = ch6(key, table)
    return {
      tool: 'reserving.ratio_triangle',
      source: friedlandRef(F[key]),
      cases: [{
        name: `${table.replace('table_', 'Table ')}, the ratio of ${what}`,
        input: { numerator, denominator },
        expect: printed.values.flatMap((row, i) => row.flatMap((value, j) => (value === null ? [] : [{
          what: `${printed.origins[i]} at ${printed.ages[j]}`,
          printed: value,
          tolerance: FACTOR + (0.5 * (1 + numerator.values[i][j]! / denominator.values[i][j]!)) / denominator.values[i][j]!,
          actual: (res: ToolResult) => (res.values.ratios as (number | null)[][])[i][j] ?? NaN,
        }]))),
      }],
    }
  }),
)

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

// Werner & Modlin's ratemaking exhibits: Appendix A's (semi-annual auto) rate
// level, trend and expense exhibits, Appendix B's (annual homeowners) pure
// premium indication and loss trend, and Chapter 4's example policies. Each
// appendix's assumptions — the policy term, the effective date, how long the
// rates will be in effect — are read off its first page with the rest.
const FOUR = 0.00005 + 1e-9
const A1 = W.a1_assumptions
const B1 = W.b1_assumptions

CHECKS.push(
  {
    tool: 'ratemaking.pure_premium_method',
    source: wernerRef(W.b5_pp_indication),
    cases: [{
      // Row (16)'s total pure premium carries row (17)'s reinsurance cost per exposure, as row (22) adds it.
      name: 'Rows (21) and (22), the variable permissible loss ratio and indicated rate',
      input: {
        pure_premium: row(W.b5_pp_indication, 16) + row(W.b5_pp_indication, 17),
        fixed: row(W.b5_pp_indication, 18),
        variable: row(W.b5_pp_indication, 19),
        profit: row(W.b5_pp_indication, 20),
      },
      expect: [
        { what: 'variable permissible loss ratio', printed: row(W.b5_pp_indication, 21), tolerance: PERCENT, actual: (r: ToolResult) => Number(r.values.variable_permissible_loss_ratio) },
        // Three inputs printed to the cent, divided by the permissible loss ratio, beside the rate's own half cent.
        { what: 'indicated rate', printed: row(W.b5_pp_indication, 22), tolerance: 0.005 + 0.015 / row(W.b5_pp_indication, 21), actual: (r: ToolResult) => Number(r.values.indicated_rate) },
      ],
    }],
  },
  ...[
    { exhibit: W.a7_lr_indication, fixed: 12 as number | null, variable: 13, profit: 14, plr: 15, key: 'variable_permissible_loss_ratio' },
    { exhibit: W.b5_pp_indication, fixed: null, variable: 19, profit: 20, plr: 21, key: 'variable_permissible_loss_ratio' },
    // Appendix C treats every expense, ULAE included, as variable.
    { exhibit: W.c7_lr_indication, fixed: null, variable: 9, profit: 10, plr: 11, key: 'permissible_loss_ratio' },
  ].map(({ exhibit, fixed, variable, profit, plr, key }) => ({
    tool: 'ratemaking.permissible_loss_ratio',
    source: wernerRef(exhibit),
    cases: [{
      name: `Row (${plr}), the ${key === 'permissible_loss_ratio' ? '' : 'variable '}permissible loss ratio`,
      input: { fixed: fixed === null ? 0 : row(exhibit, fixed), variable: row(exhibit, variable), profit: row(exhibit, profit) },
      expect: [{ what: 'permissible loss ratio', printed: row(exhibit, plr), tolerance: PERCENT, actual: (r: ToolResult) => Number(r.values[key]) }],
    }],
  })),
  {
    tool: 'ratemaking.expense_ratios',
    source: wernerRef(W.a21_expenses),
    cases: [{
      // Each type's three years, summed: the exhibit's three-year weighted average.
      name: 'Rows (1)–(5) c, e and f, and the provisions (6) and (7)',
      input: {
        rows: W.a21_expenses.types.map(t => ({
          type: t.type,
          expenses: t.expenses.reduce((a, b) => a + b, 0),
          premium: t.premium.reduce((a, b) => a + b, 0),
          fixed_share: t.fixed_share,
        })),
      },
      expect: [
        ...W.a21_expenses.types.flatMap((t, k) => [
          { what: `${t.type}, three-year ratio`, printed: t.weighted, tolerance: PERCENT, actual: (r: ToolResult) => values(r, 'ratio')[k] },
          { what: `${t.type}, fixed`, printed: t.fixed, tolerance: PERCENT, actual: (r: ToolResult) => values(r, 'fixed')[k] },
          { what: `${t.type}, variable`, printed: t.variable, tolerance: PERCENT, actual: (r: ToolResult) => values(r, 'variable')[k] },
        ]),
        { what: 'fixed expense provision', printed: W.a21_expenses.fixed_provision, tolerance: PERCENT, actual: (r: ToolResult) => Number(r.values.fixed_provision) },
        { what: 'variable expense provision', printed: W.a21_expenses.variable_provision, tolerance: PERCENT, actual: (r: ToolResult) => Number(r.values.variable_provision) },
      ],
    }],
  },
  {
    tool: 'ratemaking.trend_fit',
    source: wernerRef(W.a11_premium_trend),
    // The fits are of the printed averages, column (3), as the exhibit's own are.
    cases: Object.entries(W.a11_premium_trend.fits).map(([n, printed]) => ({
      name: `the ${n}-point exponential fit to average written premium at current rate level`,
      input: { per_year: 4, latest: Number(n), points: W.a11_premium_trend.points.map(p => ({ period: p.quarter, value: p.average })) },
      expect: [{ what: `${n}-point annual trend`, printed, tolerance: PERCENT, actual: (r: ToolResult) => Number(r.values.trend) }],
    })),
  },
  {
    tool: 'ratemaking.trend_fit',
    source: wernerRef(W.a15_loss_trend),
    cases: (['frequency', 'severity', 'pure_premium'] as const).flatMap(measure => Object.entries(W.a15_loss_trend.fits).map(([n, fits]) => ({
      name: `the ${n}-point exponential fit to ${measure.replace('_', ' ')}`,
      input: { per_year: 4, latest: Number(n), points: W.a15_loss_trend.points.map(p => ({ period: p.quarter, value: p[measure] })) },
      expect: [{ what: `${n}-point ${measure.replace('_', ' ')} trend`, printed: fits[measure], tolerance: PERCENT, actual: (r: ToolResult) => Number(r.values.trend) }],
    }))),
  },
  ...[
    { exhibit: W.a19_loss_trend_periods, assumptions: A1, periodTolerance: 0.005 + 1e-9 },
    // Appendix B prints the period to one decimal.
    { exhibit: W.b12_loss_trend_periods, assumptions: B1, periodTolerance: 0.05 + 1e-9 },
  ].map(({ exhibit, assumptions, periodTolerance }) => {
    const latest = exhibit.rows[exhibit.rows.length - 1]
    return {
      tool: 'ratemaking.trend_factor',
      source: wernerRef(exhibit),
      cases: [{
        name: `Columns (5) and (6), the projected trend period and factor for accident year ${latest.year}`,
        input: { trend: latest.projected_trend, basis: 'accident', year: Number(latest.year), effective: assumptions.effective, in_effect: assumptions.in_effect_months, term: assumptions.term_months },
        expect: [
          { what: 'projected trend period', printed: latest.projected_period, tolerance: periodTolerance, actual: (r: ToolResult) => Number(r.values.period) },
          { what: 'projected trend factor', printed: latest.projected_factor, tolerance: FOUR, actual: (r: ToolResult) => Number(r.values.factor) },
        ],
      }],
    }
  }),
  {
    tool: 'ratemaking.on_level_factors',
    source: wernerRef(W.a10_rate_level_factors),
    cases: [{
      // The exhibit weights the cumulative rate levels as Current Rate Level - 1 prints them, to four decimals.
      name: 'Columns (1a), (2) and (4), by the parallelogram method on Current Rate Level - 1\'s history',
      input: {
        changes: W.a9_rate_changes.groups.filter(g => g.date !== null).map(g => ({ date: g.date, change: g.change })),
        term: A1.term_months,
        basis: 'calendar',
        first: Number(W.a10_rate_level_factors.rows[0].year),
        last: Number(W.a10_rate_level_factors.rows[W.a10_rate_level_factors.rows.length - 1].year),
        rounding: 'four',
      },
      expect: W.a10_rate_level_factors.rows.flatMap((y, k) => [
        ...y.portions.map((p, g) => ({ what: `${y.year}, group ${W.a9_rate_changes.groups[g].group}`, printed: p, tolerance: FOUR, actual: (r: ToolResult) => (r.values.portions as number[][])[k][g] })),
        { what: `${y.year} average rate level`, printed: y.average, tolerance: FOUR, actual: (r: ToolResult) => values(r, 'averages')[k] },
        { what: `${y.year} on-level factor`, printed: y.factor, tolerance: FOUR, actual: (r: ToolResult) => values(r, 'factors')[k] },
      ]),
    }],
  },
  ...[
    { exhibit: W.ch4_annual_written, written: '4.7', earned: null as string | null, earnedExhibit: null as typeof W.ch4_annual_earned | null, term: 12, basis: 'calendar' },
    { exhibit: W.ch4_annual_earned, written: null, earned: '4.11', earnedExhibit: null, term: 12, basis: 'calendar' },
    { exhibit: W.ch4_annual_earned, written: '4.13', earned: '4.13', earnedExhibit: null, term: 12, basis: 'policy' },
    { exhibit: W.ch4_semiannual, written: '4.18', earned: '4.19', earnedExhibit: null, term: 6, basis: 'calendar' },
    { exhibit: W.ch4_semiannual, written: '4.20', earned: '4.21', earnedExhibit: null, term: 6, basis: 'policy' },
  ].map(({ exhibit, written, earned, term, basis }) => {
    const tables = exhibit.tables as Record<string, { years: string[]; policies: { policy: string; effective: string; exposure: number }[]; by_year: number[] }>
    const table = tables[(written ?? earned)!]
    const asOf = Number(table.years[table.years.length - 1].slice(3))
    return {
      tool: 'ratemaking.earned_premium',
      source: wernerRef({ ...exhibit, locator: `Chapter 4, Table ${[written, earned].filter((t, i, all) => t && all.indexOf(t) === i).join(' and ')}` }),
      cases: [{
        name: `${basis === 'policy' ? 'policy' : 'calendar'} year exposures of ${term}-month policies, as of 12/31/${asOf}`,
        input: { term, basis, as_of: asOf, policies: table.policies.map(p => ({ policy: p.policy, effective: p.effective, amount: p.exposure })) },
        expect: [
          ...(written ? tables[written].by_year.map((v, k) => ({ what: `${tables[written].years[k]} written`, printed: v, tolerance: 0.005 + 1e-9, actual: (r: ToolResult) => values(r, 'written')[k] })) : []),
          ...(earned ? tables[earned].by_year.map((v, k) => ({ what: `${tables[earned].years[k]} earned`, printed: v, tolerance: 0.005 + 1e-9, actual: (r: ToolResult) => values(r, 'earned')[k] })) : []),
        ],
      }],
    }
  }),
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
