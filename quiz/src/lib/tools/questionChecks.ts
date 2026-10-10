/**
 * Published exam questions the tools answer (docs/actuarial-tools.md §9.2).
 *
 * The official answer is *not* here: `checks.test.ts` reads it from the
 * question bank — the keyed option's printed value, or the range it names —
 * and requires the tool to land within that value's printed precision and
 * nearer it than any other option (or inside the keyed range). Each input's
 * printed form is quoted from the stem, and the test finds every quote there,
 * so an input can't be mistyped unnoticed.
 *
 * A check is a chain of runs, as an agent or a person would work the question:
 * a rate found by Internal Rate of Return is handed to the Interest Converter,
 * an accumulated value by one Annuity becomes the price of another. Every tool
 * in the chain counts the question among what it was tested against.
 */

import type { SourceRef } from './checks'
import type { ToolResult } from './types'

export interface QuestionStep {
  tool: string
  /** This run's input, from the stem and the runs before it. */
  input: (prior: ToolResult[]) => Record<string, unknown>
}

export interface QuestionCheck {
  /** The bank id; the file is questions/<bank>/<id>.md. */
  question: string
  bank: string
  /** Who published it and as what: "SOA Exam FM sample question 26". */
  label: string
  quotes: string[]
  steps: QuestionStep[]
  /** Half a unit of the keyed option's last printed digit (unused for an option that names a range). */
  tolerance: number
  /** The answer, from every run in the chain. */
  value: (results: ToolResult[]) => number
}

const last = (rs: ToolResult[]) => rs[rs.length - 1]
const val = (key: string) => (rs: ToolResult[]) => Number(last(rs).values[key])
const at = (key: string, k: number) => (rs: ToolResult[]) => (last(rs).values[key] as number[])[k]
const one = (tool: string, input: Record<string, unknown>): QuestionStep[] => [{ tool, input: () => input }]
const flows = (n: number, from: number, amount: (k: number) => number, step = 1) =>
  Array.from({ length: n }, (_, k) => ({ time: (from + k) * step, amount: amount(k) }))

const fm = (n: number, check: Omit<QuestionCheck, 'question' | 'bank' | 'label'>): QuestionCheck => ({
  question: `fm-${String(n).padStart(3, '0')}`,
  bank: 'exam-fm',
  label: `SOA Exam FM sample question ${n}`,
  ...check,
})

const p = (n: number, check: Omit<QuestionCheck, 'question' | 'bank' | 'label'>): QuestionCheck => ({
  question: `p-${String(n).padStart(3, '0')}`,
  bank: 'exam-p',
  label: `SOA Exam P sample question ${n}`,
  ...check,
})

/** A CAS past-paper question: `masi-2019f-001` is CAS Exam MAS-I, Fall 2019, question 1. */
const cas = (id: string, check: Omit<QuestionCheck, 'question' | 'bank' | 'label'>): QuestionCheck => {
  const [, exam, year, season, n] = /^(masi|masii)-(\d{4})([sf])-(\d+)$/.exec(id)!
  return {
    question: id,
    bank: exam === 'masi' ? 'exam-mas-i' : 'exam-mas-ii',
    label: `CAS Exam ${exam === 'masi' ? 'MAS-I' : 'MAS-II'}, ${season === 's' ? 'Spring' : 'Fall'} ${year}, question ${Number(n)}`,
    ...check,
  }
}

export const QUESTION_CHECKS: QuestionCheck[] = [
  // ─── Present Value ─────────────────────────────────────────────────────────
  fm(26, {
    quotes: ['5000', '7% per year', '20 payments', 'one year from today', '5%'],
    steps: one('finance.present_value', { i: 0.05, flows: flows(20, 1, k => 5000 * 1.07 ** (k + 1)) }),
    tolerance: 50,
    value: val('present_value'),
  }),
  fm(71, {
    // Times in half-years, at the half-year rate: 40 coupons of 45 and the 1200 redemption.
    quotes: ['1000 par value 20-year bond', '10% convertible semiannually', '9% coupons payable semiannually', 'redemption value of 1200'],
    steps: one('finance.present_value', { i: 0.05, flows: [...flows(40, 1, () => 45), { time: 40, amount: 1200 }] }),
    tolerance: 0.5,
    value: val('present_value'),
  }),
  fm(82, {
    quotes: ['30-year annuity', '5% annual effective', 'first payment of the annuity is due in ten years in the amount of 1,000', 'increase by 500 each year'],
    steps: one('finance.present_value', { i: 0.05, flows: flows(30, 10, k => 1000 + 500 * k) }),
    tolerance: 0.5,
    value: val('present_value'),
  }),
  fm(225, {
    quotes: ['| 1 | 10 | 4.0% |', '| 2 | 12 | 4.5% |', '| 3 | 15 | 5.5% |', '| 4 | 20 | 7.0% |'],
    steps: one('finance.present_value', {
      flows: [
        { time: 1, amount: 10, spot: 0.04 },
        { time: 2, amount: 12, spot: 0.045 },
        { time: 3, amount: 15, spot: 0.055 },
        { time: 4, amount: 20, spot: 0.07 },
      ],
    }),
    tolerance: 0.005,
    value: val('present_value'),
  }),
  fm(245, {
    quotes: ['annual effective interest rate of 5%', '10-year annuity-immediate', 'annual payment of 100', 'increases each year by 15%'],
    steps: one('finance.present_value', { i: 0.05, flows: flows(10, 1, k => 100 * 1.15 ** k) }),
    tolerance: 0.5,
    value: val('present_value'),
  }),
  fm(281, {
    // The book value after year six is what the last eight half-yearly coupons and the redemption are worth then.
    quotes: ['1000 par value ten-year bond', '7.6% semiannual coupons', '6.0% convertible semiannually', 'end of year six'],
    steps: one('finance.present_value', { i: 0.03, flows: [...flows(8, 1, () => 38), { time: 8, amount: 1000 }] }),
    tolerance: 0.5,
    value: val('present_value'),
  }),

  // ─── Bonds ─────────────────────────────────────────────────────────────────
  fm(71, {
    quotes: ['1000 par value 20-year bond', '10% convertible semiannually', '9% coupons payable semiannually', 'redemption value of 1200'],
    steps: one('finance.bond_price', { face: 1000, coupon: 0.09, redemption: 1200, years: 20, m: 2, yield: 0.1 }),
    tolerance: 0.5,
    value: val('price'),
  }),
  fm(213, {
    // A face amount and no redemption value: redeemable at par.
    quotes: ['six-year 1000 face amount bond', 'annual coupon rate of 8% semiannually', 'sells for 911.37', 'annual effective yield rate'],
    steps: one('finance.bond_yield', { face: 1000, coupon: 0.08, redemption: 1000, years: 6, m: 2, price: 911.37 }),
    tolerance: 0.00005,
    value: val('effective_yield'),
  }),
  fm(325, {
    // Bought at a discount of 1.50 to its face amount of 100: a price of 98.50.
    quotes: ['one-year bond with a face amount of 100', 'annual coupon rate of 6% paid semiannually', 'discount of 1.50', 'convertible semiannually'],
    steps: one('finance.bond_yield', { face: 100, coupon: 0.06, redemption: 100, years: 1, m: 2, price: 98.5 }),
    tolerance: 0.0005,
    value: val('nominal_yield'),
  }),
  fm(7, {
    quotes: ['10,000 par value 10-year bond', '8% annual coupons', 'annual effective rate of 6%', 'the 7th coupon'],
    steps: one('finance.bond_amortization', { face: 10000, coupon: 0.08, redemption: 10000, years: 10, m: 1, yield: 0.06 }),
    tolerance: 0.5,
    value: at('interest', 6),
  }),
  fm(281, {
    quotes: ['1000 par value ten-year bond', '7.6% semiannual coupons', '6.0% convertible semiannually', 'end of year six'],
    steps: one('finance.bond_amortization', { face: 1000, coupon: 0.076, redemption: 1000, years: 10, m: 2, yield: 0.06 }),
    tolerance: 0.5,
    value: at('book_value', 11),
  }),

  // ─── Loans ─────────────────────────────────────────────────────────────────
  fm(190, {
    // 16% convertible quarterly is 4% a quarter.
    quotes: ['loan of 10,000', 'payments of 1,000 at the end of each quarter for as long as necessary', '16% convertible quarterly', 'the tenth payment'],
    steps: one('finance.loan_schedule', { amount: 10000, i: 0.04, payment: 1000, n: 0 }),
    tolerance: 0.5,
    value: at('interest', 9),
  }),
  fm(380, {
    quotes: ['Annual payments of 240', 'loan of 3400', 'annual effective interest rate of 4.5%', 'drop payment'],
    steps: one('finance.loan_schedule', { amount: 3400, i: 0.045, payment: 240, n: 0 }),
    tolerance: 0.005,
    value: val('final_payment'),
  }),
  fm(212, {
    quotes: ['Payments of 1000 at the end of each year', 'loan of 12,000', 'annual effective interest rate of 10%', 'immediately after the 12th payment'],
    steps: one('finance.loan_schedule', { amount: 12000, i: 0.1, payment: 1000, n: 12 }),
    tolerance: 0.5,
    value: at('balance', 11),
  }),
  fm(232, {
    // The beginning of the seventh year is the moment after the sixth payment.
    quotes: ['loan of 4000', 'annual effective interest rate of 5%', 'payments of 250 at the end of each year for ten years', 'beginning of the seventh year'],
    steps: one('finance.loan_schedule', { amount: 4000, i: 0.05, payment: 250, n: 10 }),
    tolerance: 0.5,
    value: at('balance', 5),
  }),
  fm(90, {
    // The discount rate converted, the level payment found, then the loan run again on that payment rounded up.
    quotes: ['5-year loan of 500,000', 'annual effective discount rate of 8%', 'level end-of-year payments', 'next multiple of 1,000'],
    steps: [
      { tool: 'finance.interest_converter', input: () => ({ form: 'effective_discount', rate: 0.08, m: 1 }) },
      { tool: 'finance.loan_schedule', input: ([rate]) => ({ amount: 500000, i: rate.values.i, n: 5, payment: 0 }) },
      { tool: 'finance.loan_schedule', input: ([rate, level]) => ({ amount: 500000, i: rate.values.i, n: 0, payment: Math.ceil(Number(level.values.payment) / 1000) * 1000 }) },
    ],
    tolerance: 50,
    value: val('final_payment'),
  }),

  // ─── Duration, convexity and immunization ──────────────────────────────────
  fm(101, {
    quotes: ['40,000 at time 2', '25,000 at time 3', '100,000 at time 4', '7.0%'],
    steps: one('finance.duration_convexity', { i: 0.07, flows: [{ time: 2, amount: 40000 }, { time: 3, amount: 25000 }, { time: 4, amount: 100000 }] }),
    tolerance: 0.05,
    value: val('macaulay'),
  }),
  fm(228, {
    quotes: ['| 1 | 10 |', '| 2 | 12 |', '| 3 | 15 |', '| 4 | 20 |', '| 5 | 30 |', '8% annual effective'],
    steps: one('finance.duration_convexity', { i: 0.08, flows: [10, 12, 15, 20, 30].map((amount, k) => ({ time: k + 1, amount })) }),
    tolerance: 0.05,
    value: val('macaulay'),
  }),
  fm(50, {
    // Bought at par, the bond yields its coupon rate: 3.8% a half-year, an annual effective 1.038² − 1.
    quotes: ['7-year, 5000 par value bond', 'annual coupon rate of 7.6% paid semiannually', 'no premium or discount'],
    steps: one('finance.duration_convexity', { i: 1.038 ** 2 - 1, flows: [...flows(14, 1, () => 190, 0.5), { time: 7, amount: 5000 }] }),
    tolerance: 0.005,
    value: val('macaulay'),
  }),
  fm(183, {
    quotes: ['7-year loan', 'equal payments made at the end of each year', 'annual effective interest rate is 10%'],
    steps: one('finance.duration_convexity', { i: 0.1, flows: flows(7, 1, () => 1) }),
    tolerance: 0.005,
    value: val('macaulay'),
  }),
  fm(409, {
    quotes: ['ten-year mortgage', 'annual level payments at the end of the year', 'annual effective interest rate of 6%'],
    steps: one('finance.duration_convexity', { i: 0.06, flows: flows(10, 1, () => 1) }),
    tolerance: 0.005,
    value: val('macaulay'),
  }),
  fm(429, {
    // Per 100 of face: coupons of 9, then the 100 redeemed with the last.
    quotes: ['annual coupon rate of 9% paid annually', 'matures in ten years', 'annual effective yield rate is 10%', 'modified duration'],
    steps: one('finance.duration_convexity', { i: 0.1, flows: [...flows(9, 1, () => 9), { time: 10, amount: 109 }] }),
    tolerance: 0.005,
    value: val('modified'),
  }),
  fm(372, {
    quotes: ['five-year 1000 face amount bond', '10% annual coupons', 'annual effective interest rate of 5%'],
    steps: one('finance.duration_convexity', { i: 0.05, flows: [...flows(4, 1, () => 100), { time: 5, amount: 1100 }] }),
    tolerance: 0.05,
    value: val('macaulay'),
  }),
  fm(165, {
    // Payments of 1 at times 0–19 and 4 at times 20–49: the duration doesn't depend on X.
    quotes: ['$X$ at the beginning of each year for 20 years, starting today', '$4X$ at the beginning of each year for 30 years, starting 20 years from today', 'annual effective interest rate of 2%'],
    steps: one('finance.duration_convexity', { i: 0.02, flows: [...flows(20, 0, () => 1), ...flows(30, 20, () => 4)] }),
    tolerance: 0.005,
    value: val('macaulay'),
  }),
  fm(219, {
    // The assets' duration doesn't depend on X, so X = 1.
    quotes: ['liability cash flow of 100 at the end of year two', 'liability cash flow of 200 at the end of year three', 'asset cash flows of $X$ at the end of years one and five', 'annual effective interest rate of 10%'],
    steps: one('finance.redington_immunization', {
      i: 0.1,
      flows: [
        { time: 1, asset: 1, liability: 0 },
        { time: 2, asset: 0, liability: 100 },
        { time: 3, asset: 0, liability: 200 },
        { time: 5, asset: 1, liability: 0 },
      ],
    }),
    tolerance: 0.0005,
    value: rs => Math.abs(Number(last(rs).values.macaulay_assets) - Number(last(rs).values.macaulay_liabilities)),
  }),

  // ─── Rates and annuities, chained ──────────────────────────────────────────
  fm(291, {
    quotes: ['deposits 150 today', 'receives 100 one year from now and 80 two years from now', 'annual nominal rate of interest convertible quarterly'],
    steps: [
      { tool: 'finance.internal_rate_of_return', input: () => ({ flows: [{ time: 0, amount: -150 }, { time: 1, amount: 100 }, { time: 2, amount: 80 }] }) },
      { tool: 'finance.interest_converter', input: ([irr]) => ({ form: 'effective_interest', rate: irr.values.irr, m: 4 }) },
    ],
    tolerance: 0.0005,
    value: val('nominal_interest'),
  }),
  fm(370, {
    // Times in years: the quarterly payments at 0.25, 0.5, … 5, so the yield comes out annual effective.
    quotes: ['5000 is borrowed', 'convertible monthly', 'payments of 291.23 at the end of each quarter for 5 years'],
    steps: [
      { tool: 'finance.internal_rate_of_return', input: () => ({ flows: [{ time: 0, amount: -5000 }, ...flows(20, 1, () => 291.23, 0.25)] }) },
      { tool: 'finance.interest_converter', input: ([irr]) => ({ form: 'effective_interest', rate: irr.values.irr, m: 12 }) },
    ],
    tolerance: 0.00005,
    value: val('nominal_interest'),
  }),
  fm(334, {
    // The annuity-due's price is the balance at year five; the yield is the rate that grows 9550 to it.
    quotes: ['deposit of 9550', 'for five years', '20-year annuity-due', 'level annual payments of 756.97', 'annual effective interest rate of 4%'],
    steps: [
      { tool: 'finance.annuity', input: () => ({ timing: 'due', payment: 756.97, n: 20, i: 0.04 }) },
      { tool: 'finance.internal_rate_of_return', input: ([annuity]) => ({ flows: [{ time: 0, amount: -9550 }, { time: 5, amount: annuity.values.present_value }] }) },
    ],
    tolerance: 0.0005,
    value: val('irr'),
  }),
  fm(367, {
    // 8% effective is i⁽¹²⁾/12 a month; the 240 monthly deposits' accumulated value buys the 30-year annuity-due.
    quotes: ['deposits 225 into a bank at the beginning of each month for 20 years', 'annual effective rate of 8%', '30-year annuity-due with annual payments of $X$', 'annual effective interest rate of 7%'],
    steps: [
      { tool: 'finance.interest_converter', input: () => ({ form: 'effective_interest', rate: 0.08, m: 12 }) },
      { tool: 'finance.annuity', input: ([rate]) => ({ timing: 'due', payment: 225, n: 240, i: Number(rate.values.nominal_interest) / 12 }) },
      { tool: 'finance.annuity', input: () => ({ timing: 'due', payment: 1, n: 30, i: 0.07 }) },
    ],
    tolerance: 0.5,
    value: ([, saved, bought]) => Number(saved.values.accumulated_value) / Number(bought.values.annuity_factor),
  }),

  // ─── Distributions ─────────────────────────────────────────────────────────
  p(124, {
    // Three independent weeks at a mean of 2 a week: Poisson with mean 6. Fewer than four is X ≤ 3.
    quotes: ['Poisson distribution with mean 2', 'mutually independent', 'fewer than four tornadoes occur in a three-week period'],
    steps: one('distributions.distribution', { family: 'poisson', lambda: 6, x: 3 }),
    tolerance: 0.005,
    value: val('cdf'),
  }),
  p(158, {
    quotes: ['Poisson distribution with mean 1', 'mutually independent', 'more than two days in a three-month period'],
    steps: one('distributions.distribution', { family: 'poisson', lambda: 3, x: 2 }),
    tolerance: 0.0005,
    value: val('survival'),
  }),
  p(355, {
    // A Poisson standard deviation of 2 is a mean of 4; at least two is more than one.
    quotes: ['Poisson distribution with a standard deviation of 2', 'at least two calls'],
    steps: one('distributions.distribution', { family: 'poisson', lambda: 4, x: 1 }),
    tolerance: 0.0005,
    value: val('survival'),
  }),
  p(164, {
    quotes: ['normally distributed with mean 10 and variance 4', '12th percentile'],
    steps: one('distributions.distribution', { family: 'normal', mu: 10, sigma: 2, q: 0.12 }),
    tolerance: 0.005,
    value: val('quantile'),
  }),
  p(390, {
    // A gamma with mean αθ = 6 and variance αθ² = 18: θ = 3, α = 2.
    quotes: ['gamma distribution with mean 6 and variance 18', 'exceeds 4'],
    steps: one('distributions.distribution', { family: 'gamma', alpha: 2, theta: 3, x: 4 }),
    tolerance: 0.005,
    value: val('survival'),
  }),
  p(66, {
    // The mean of 25 claims is normal with standard deviation 5,000 / √25 = 1,000.
    quotes: ['normal distribution with mean 19,400 and standard deviation 5,000', 'average of 25 randomly selected claims exceeds 20,000'],
    steps: one('distributions.distribution', { family: 'normal', mu: 19400, sigma: 1000, x: 20000 }),
    tolerance: 0.005,
    value: val('survival'),
  }),
  p(327, {
    // The mean of 100 claims has standard deviation 500 / √100 = 50; K is its 99th percentile.
    quotes: ['normally distributed with mean 2500 and standard deviation 500', 'random sample of 100 claims will exceed $K$ is 0.01'],
    steps: one('distributions.distribution', { family: 'normal', mu: 2500, sigma: 50, q: 0.99 }),
    tolerance: 0.5,
    value: val('quantile'),
  }),
  p(670, {
    quotes: ['normally distributed with mean 2500 and standard deviation 500', 'exceeds $P$ is 5%', 'exceeds the median loss'],
    steps: one('distributions.distribution', { family: 'normal', mu: 2500, sigma: 500, q: 0.95 }),
    tolerance: 0.5,
    value: rs => Number(last(rs).values.quantile) - Number(last(rs).values.median),
  }),
  p(563, {
    quotes: [String.raw`exponentially distributed with mean $\dfrac{400}{\ln 2}$`, 'up to a maximum of 1000'],
    steps: one('distributions.limited_expected_value', { family: 'exponential', theta: 400 / Math.LN2, u: 1000 }),
    tolerance: 0.5,
    value: val('lev'),
  }),
  p(50, {
    // f(y) = 2/y³ on y > 1 is the single-parameter Pareto with α = 2, θ = 1.
    quotes: ['benefit limit of 10', String.raw`\frac{2}{y^3}, & y > 1`],
    steps: one('distributions.limited_expected_value', { family: 'single_pareto', alpha: 2, theta: 1, u: 10 }),
    tolerance: 0.05,
    value: val('lev'),
  }),
  p(48, {
    // The density is the single-parameter Pareto's with α = 2.5, θ = 0.6; what a deductible of 2 leaves unpaid is E[X ∧ 2].
    quotes: [String.raw`\frac{2.5(0.6)^{2.5}}{x^{3.5}}, & x > 0.6`, 'annual deductible of 2', 'losses not paid by the insurance policy'],
    steps: one('distributions.limited_expected_value', { family: 'single_pareto', alpha: 2.5, theta: 0.6, u: 2 }),
    tolerance: 0.005,
    value: val('lev'),
  }),
  p(337, {
    quotes: ['deductible of 3', 'exponentially distributed with mean 10'],
    steps: one('distributions.expected_payment', { family: 'exponential', theta: 10, deductible: 3 }),
    tolerance: 0.005,
    value: val('per_loss'),
  }),
  p(601, {
    // (3/1000)(1000/x)⁴ on x > 1000 is the single-parameter Pareto with α = 3, θ = 1000.
    quotes: [String.raw`\dfrac{3}{1000}\left(\dfrac{1000}{x}\right)^4, & \text{for } x > 1000`, 'deductible of 1100', 'for a random loss'],
    steps: one('distributions.expected_payment', { family: 'single_pareto', alpha: 3, theta: 1000, deductible: 1100 }),
    tolerance: 0.5,
    value: val('per_loss'),
  }),
  cas('masi-2019f-001', {
    // The memoryless distribution is the exponential.
    quotes: ['memoryless distribution with mean 1,000', 'deductible of 500', 'losses that exceed the deductible'],
    steps: one('distributions.expected_payment', { family: 'exponential', theta: 1000, deductible: 500 }),
    tolerance: 0,
    value: val('per_payment'),
  }),
  cas('masi-2019f-023', {
    quotes: [String.raw`lognormal distribution with $(\mu = 8,\ \sigma = 1)$`, 'ordinary deductible of 1,000 per loss', 'Losses below the deductible are not reported'],
    steps: one('distributions.expected_payment', { family: 'lognormal', mu: 8, sigma: 1, deductible: 1000 }),
    tolerance: 0,
    value: val('per_payment'),
  }),

  // ─── Credibility ───────────────────────────────────────────────────────────
  cas('masii-2018f-004', {
    quotes: ['pure premium of 960', '72,000 policies with a pure premium of 530', 'expected variance of the pure premium within each region is 1,800,000,000', 'variance of the region pure premium means is 45,000'],
    steps: one('credibility.buhlmann_credibility', { epv: 1.8e9, vhm: 45000, exposure: 72000, observed: 530, prior: 960 }),
    tolerance: 0,
    value: val('estimate'),
  }),
  cas('masii-2018f-005', {
    // θ ~ U(0.05, 0.25): EPV = E[2θ] = 0.3, VHM = Var θ = 0.2²/12, μ = 0.15. 60 claims on 675 insureds; Year 4 has 250.
    quotes: [String.raw`mean $\theta$ and variance $2\theta$`, 'uniformly distributed from 0.05 to 0.25', '| 1 | 200 | 15 |', '| 2 | 250 | 20 |', '| 3 | 225 | 25 |', '| 4 | 250 | --- |'],
    steps: one('credibility.buhlmann_credibility', { epv: 0.3, vhm: 0.2 ** 2 / 12, exposure: 675, observed: 60 / 675, prior: 0.15 }),
    tolerance: 0,
    value: rs => 250 * Number(last(rs).values.estimate),
  }),
]

export const questionRef = (q: QuestionCheck): SourceRef => ({
  question: q.question,
  title: q.label,
  url: `/quiz?ids=${q.question}`,
  locator: q.label,
})
