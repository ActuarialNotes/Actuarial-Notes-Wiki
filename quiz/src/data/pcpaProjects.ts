/**
 * The PCPA project simulator's authored material (`docs/pcpa-project.md`):
 * the rules the CAS publishes for the project, and the pool of practice cases.
 *
 * Two kinds of content live here and they follow different rules:
 *
 * - **What the CAS publishes** — the project windows, the word limit, the
 *   appendix allowance, the scoring rubric, the attestation — is *transcribed*
 *   from the PCPA Content Outline (v.8, effective September 2026) and the
 *   post-project summary, with the source named. Change it only against a newer
 *   edition of those documents.
 * - **The cases** are invented, and say so: fictional insurers, fictional
 *   people, data drawn by `lib/pcpaData.ts`. They are written to the framework
 *   the outline describes — "a statement of the business problem, one or two
 *   data sets, scope parameters, and guidelines as to what should be submitted"
 *   — so a candidate practises the shape of the real thing.
 */

import type { CaseId } from '@/lib/pcpaData'

export const CONTENT_OUTLINE_URL = 'https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf'
export const POST_PROJECT_SUMMARY_URL = 'https://www.casact.org/sites/default/files/2026-03/PCPA_Post_Project_Summary_2026_Winter.pdf'
export const PCPA_PAGE_URL = 'https://www.casact.org/exam/property-casualty-predictive-analytics-pcpa'

// ─── The published rules ─────────────────────────────────────────────────────

/** Content Outline v.8: "maximum of 1,250 words inclusive of report and appendices". */
export const WORD_LIMIT = 1_250
/** Content Outline v.8: "up to 5 tables/supporting graphics as appendices". */
export const APPENDIX_LIMIT = 5
/**
 * The published windows run from the 15th or 16th to the month's end,
 * inclusive — sixteen days. The CAS FAQ calls it "two weeks".
 */
export const WINDOW_DAYS = 16
/** CAS FAQ: "estimated to take 20 hours to complete over a two-week period". */
export const ESTIMATED_HOURS = 20

/** The four project administrations a year, as the Content Outline v.8 lists them. */
export const PROJECT_WINDOWS: {
  examDeadline: string
  registrationDeadline: string
  opens: string
  submissionDeadline: string
  results: string
}[] = [
  { examDeadline: 'February 23', registrationDeadline: 'March 9', opens: 'March 16', submissionDeadline: 'March 31', results: 'May 31' },
  { examDeadline: 'May 25', registrationDeadline: 'June 8', opens: 'June 15', submissionDeadline: 'June 30', results: 'August 31' },
  { examDeadline: 'August 25', registrationDeadline: 'September 8', opens: 'September 15', submissionDeadline: 'September 30', results: 'November 30' },
  { examDeadline: 'November 25', registrationDeadline: 'December 9', opens: 'December 16', submissionDeadline: 'December 31', results: 'February 28/29' },
]

export type Domain = 'A' | 'B' | 'C'

export const DOMAINS: Record<Domain, { name: string; projectWeight: number }> = {
  A: { name: 'Dealing with Data', projectWeight: 0.3 },
  B: { name: 'Model Diagnostics and Selection', projectWeight: 0.3 },
  C: { name: 'Model Interpretation and Presentation', projectWeight: 0.4 },
}

export interface RubricCriterion {
  id: string
  domain: Domain
  task: string
  /** The criterion, as the Content Outline's "Performance Evaluation Criteria" words it. */
  text: string
}

/** Content Outline v.8, "Performance Evaluation Criteria". */
export const RUBRIC: RubricCriterion[] = [
  { id: 'a3-transform', domain: 'A', task: 'A-3', text: 'Describes how any variables were transformed and why.' },
  { id: 'a4-anomalies', domain: 'A', task: 'A-4', text: 'Describes any anomalous characteristics of the data (e.g., outliers, missing data) and how they were addressed.' },
  { id: 'b1-performs', domain: 'B', task: 'B-1', text: 'The model performs reasonably well on an assessment data set.' },
  { id: 'b2-diagnostics', domain: 'B', task: 'B-2', text: 'Correctly interprets diagnostics (e.g., AIC, BIC, Type 1 errors), spurious relationships, multicollinearity and correlated variables, and uses them to improve fit and performance.' },
  { id: 'b2-selected', domain: 'B', task: 'B-2', text: 'Describes which model was selected and why.' },
  { id: 'b2-output', domain: 'B', task: 'B-2', text: 'Generates and provides technical output (e.g., the model\'s coefficients).' },
  { id: 'b2-iterative', domain: 'B', task: 'B-2', text: 'Explains how the model was iteratively checked and built, including which diagnostics were used (e.g., coefficients in/out, cross-validation).' },
  { id: 'c1-visuals', domain: 'C', task: 'C-1', text: 'Provides and justifies the data presentation and visuals: proper labelling, clear purpose, appropriate to the data, model, audience and business question; text and visuals support each other.' },
  { id: 'c2-method', domain: 'C', task: 'C-2', text: 'Describes which method(s) were used and why.' },
  { id: 'c2-variables', domain: 'C', task: 'C-2', text: 'Describes why each variable was or was not included in the model.' },
  { id: 'c3-appropriate', domain: 'C', task: 'C-3', text: 'The model works and is appropriate to address the business question.' },
  { id: 'c3-persuasive', domain: 'C', task: 'C-3', text: 'Makes an effective, persuasive argument to a non-technical audience that the model addresses the business question, including the rationale for creating it.' },
]

/**
 * The common mistakes the CAS's post-project summary (Winter 2026) lists,
 * paraphrased. The report checks in `lib/pcpaReport.ts` look for each one.
 */
export const COMMON_MISTAKES: { domain: Domain; text: string }[] = [
  { domain: 'A', text: 'Not splitting the data into training and testing sets, and not cross-validating.' },
  { domain: 'A', text: 'Splitting the data without saying how (e.g. a 70/30 random sample).' },
  { domain: 'B', text: 'Not validating the model on data it has not seen.' },
  { domain: 'C', text: 'Omitting the potential flaws of the modelling approach.' },
  { domain: 'C', text: 'Providing no visualisations — or ones that don\'t support the model\'s predictive power (score histograms, QQ plots, policy-level residual plots) instead of lift, double-lift or Lorenz/Gini exhibits.' },
  { domain: 'C', text: 'Not stating which data set a validation exhibit uses.' },
  { domain: 'C', text: 'No interpretation of the results, no coefficients, or no discussion of whether the coefficients are reasonable.' },
  { domain: 'C', text: 'Not supporting why the final model fits well *and* why one distribution fits better than another — both were needed.' },
  { domain: 'B', text: 'Comparing AIC or BIC across distributions (they are comparable only within one distribution and nested structure).' },
]

/** What the simulator asks a candidate to affirm before the window opens. */
export const CANDIDATE_AGREEMENT = [
  'I will complete the project independently, with no hands-on help from anyone else.',
  'I may consult references, colleagues or AI tools only for general concepts — never to interpret the business problem, analyse the data, or draft, edit or check my responses.',
  'The instructions and data sets are confidential: I will not copy, upload or share any part of them.',
]

/** The attestation, summarised from the Content Outline's "PCPA Project Candidate Attestation and AI Use Policy". */
export const ATTESTATION = [
  'All analysis, calculations, conclusions, written responses, code and supporting materials in this submission are my own work.',
  'I did not submit content generated by another person or by a generative AI tool, in whole or in part, including content I later edited, paraphrased or reformatted.',
  'I did not provide any part of the project instructions or data to another person, a generative AI tool or any other external service.',
]

/** The final checklist, following the Content Outline's list of what is submitted. */
export const FINAL_CHECKLIST = [
  `A brief technical report of no more than ${WORD_LIMIT.toLocaleString('en-US')} words, inclusive of appendices.`,
  `No more than ${APPENDIX_LIMIT} tables or supporting graphics, attached as appendices.`,
  'The predictive analytics code you wrote, in R, Python or SAS. It is not scored, but graders may run it to confirm it produces the outputs in your report.',
  'Answers to the questions asked at the point of submission about your analysis and your report.',
  'The signed attestation that the work is your own.',
  'Do not include the data sets: they remain the property of the CAS.',
]

// ─── The case pool ───────────────────────────────────────────────────────────

export interface DictionaryEntry { column: string; type: string; description: string }

export interface StakeholderNote { from: string; role: string; note: string }

export type QuestionKind = 'number' | 'choice' | 'text'

export interface SubmissionQuestion {
  id: string
  prompt: string
  kind: QuestionKind
  options?: string[]
  /**
   * Checked against the report after submission: a number the answer names
   * should appear in the report, the way a grader would look for it.
   */
  crossCheck?: boolean
}

export interface ProjectCase {
  id: CaseId
  title: string
  line: string
  company: string
  /** The business problem, as the stakeholder's memo puts it. Markdown. */
  memo: { from: string; to: string; subject: string; body: string }
  stakeholders: StakeholderNote[]
  scope: string[]
  dictionary: { file: string; description: string; rows: string; entries: DictionaryEntry[] }[]
  questions: SubmissionQuestion[]
  /** For the examiner's notes: what a passing report does on this case. */
  strongReport: string[]
}

const VALIDATION_OPTIONS = ['A train/test (holdout) split', 'k-fold cross-validation', 'Both', 'Neither']

export const PROJECT_CASES: ProjectCase[] = [
  {
    id: 'bop-frequency',
    title: 'Small Business Claim Frequency',
    line: 'Businessowners (BOP)',
    company: 'Lakeshore Mutual Insurance Company',
    memo: {
      from: 'Dana Whitfield, VP, Commercial Lines Pricing',
      to: 'Actuarial Analyst, Commercial Pricing',
      subject: 'Claim frequency drivers for the BOP class plan review',
      body: [
        'Our businessowners book across six Great Lakes states is rated today on a handful of broad industry groups and a flat state factor. Loss ratios have drifted apart by industry, and the Pricing Committee has asked us to revisit the class plan before the 2026 filings.',
        'Please build a model of **claim frequency** that tells us which characteristics of a small business drive how often it has a claim, and by how much. The Committee will use it to decide how industry should be grouped in the rating plan and whether any other characteristics deserve a rating factor.',
        'The Committee is not technical. They need to understand what the model says, how much to trust it, and what it would change about how we price.',
      ].join('\n\n'),
    },
    stakeholders: [
      { from: 'Maria Okafor', role: 'Small Commercial Underwriting Manager', note: 'Restaurants and contractors have been our worst performers for years. Whatever the new plan does with industry, it has to be something we can explain to an agent — we can\'t rate 60 different six-digit codes.' },
      { from: 'Tom Brandt', role: 'Claims Operations', note: 'About a quarter of the BOP claims we set up close without payment — mostly liability notices that never turn into anything. Our frequency reports only count claims with money on them.' },
      { from: 'Priya Nair', role: 'Data Engineering', note: 'The policy extract came out of the 2023 platform migration. A small number of policies may have been loaded twice, and the old system defaulted unknown employee counts rather than leaving them blank. The claims extract is from a shared warehouse and may include a few claims from other commercial lines.' },
      { from: 'Greg Hollis', role: 'VP, Distribution', note: 'Our independent agents write far better business than our direct channel. I\'d expect the model to support a channel discount.' },
      { from: 'Maria Okafor', role: 'Small Commercial Underwriting Manager', note: 'Non-renewal decisions are made at expiration, after we review each account\'s loss history for the term.' },
    ],
    scope: [
      'Experience: policy terms effective in 2021 through 2024; claims evaluated as of March 31, 2025.',
      'Target: claim frequency — the number of claims with incurred loss greater than zero, property and liability combined, per policy year of earned exposure.',
      'Predictors: only characteristics known when a policy is quoted or renewed.',
      'Structure: the model will inform a multiplicative rating plan, so use a log link.',
      'Industry must be represented at a level the rating plan can support credibly.',
      'Validate the model on data it was not fitted to, and report which data each exhibit uses.',
      'Audience: the Pricing Committee (non-technical), with enough technical detail for a peer reviewer to follow your modelling decisions.',
    ],
    dictionary: [
      {
        file: 'bop_policies.csv',
        description: 'One row per policy term.',
        rows: 'about 16,000',
        entries: [
          { column: 'policy_id', type: 'text', description: 'Policy term identifier.' },
          { column: 'policy_year', type: 'integer', description: 'Calendar year the term took effect.' },
          { column: 'effective_date', type: 'date', description: 'Term effective date (YYYY-MM-DD).' },
          { column: 'state', type: 'text', description: 'Two-letter state code: IL, IN, MI, MN, OH, WI.' },
          { column: 'naics_code', type: 'integer', description: '2017 NAICS six-digit industry code. The first two digits are the sector (31–33, 44–45 and 48–49 are ranges of one sector).' },
          { column: 'employees', type: 'integer', description: 'Full-time equivalent employees.' },
          { column: 'annual_payroll', type: 'number', description: 'Annual payroll, in dollars.' },
          { column: 'annual_revenue', type: 'number', description: 'Annual gross revenue, in dollars.' },
          { column: 'years_in_business', type: 'integer', description: 'Years the business has operated under its current ownership.' },
          { column: 'construction', type: 'text', description: 'ISO construction class of the insured building.' },
          { column: 'sprinklered', type: 'Y/N', description: 'Automatic sprinkler system.' },
          { column: 'deductible', type: 'integer', description: 'Property deductible, in dollars.' },
          { column: 'prior_claims_3yr', type: 'integer', description: 'Claims with payment in the three years before the term, from underwriting reports.' },
          { column: 'agent_channel', type: 'text', description: 'Distribution channel that wrote the policy.' },
          { column: 'earned_exposure', type: 'number', description: 'Earned exposure, in policy years (a full annual term is 1).' },
          { column: 'renewal_status', type: 'text', description: 'Renewed, Non-Renewed, or Pending (2024 terms not yet expired).' },
        ],
      },
      {
        file: 'bop_claims.csv',
        description: 'One row per reported claim.',
        rows: 'about 2,200',
        entries: [
          { column: 'claim_id', type: 'text', description: 'Claim identifier.' },
          { column: 'policy_id', type: 'text', description: 'Policy term the claim was made under.' },
          { column: 'loss_date', type: 'date', description: 'Date of loss.' },
          { column: 'report_date', type: 'date', description: 'Date the claim was reported.' },
          { column: 'coverage', type: 'text', description: 'Property or Liability.' },
          { column: 'incurred_loss', type: 'number', description: 'Paid plus case reserve as of March 31, 2025, in dollars.' },
          { column: 'claim_status', type: 'text', description: 'Open or Closed.' },
        ],
      },
    ],
    questions: [
      { id: 'rows', kind: 'number', prompt: 'How many policy records were in the data you used to fit your final model (the training data)?', crossCheck: true },
      { id: 'distribution', kind: 'choice', prompt: 'Which distribution does your final model use?', options: ['Poisson', 'Negative binomial', 'Quasi-Poisson', 'Tweedie', 'Other'] },
      { id: 'link', kind: 'choice', prompt: 'Which link function does it use?', options: ['Log', 'Identity', 'Other'] },
      { id: 'validation', kind: 'choice', prompt: 'How did you test the model on data it had not been fitted to?', options: VALIDATION_OPTIONS },
      { id: 'metric', kind: 'text', prompt: 'State one performance statistic of your final model on data it was not fitted to, and name the statistic and the data set (e.g. "Gini 0.27 on the 30% holdout").', crossCheck: true },
      { id: 'top-variable', kind: 'text', prompt: 'Which variable has the largest effect in your final model? Give its fitted relativity for its highest-risk level.', crossCheck: true },
      { id: 'industry', kind: 'choice', prompt: 'At what level does your final model use industry?', options: ['Six-digit NAICS code', 'Three- or four-digit NAICS', 'Two-digit NAICS sector', 'A custom grouping', 'Industry is not in the model'] },
    ],
    strongReport: [
      'Joins the two files correctly: duplicates dropped first, claims with zero incurred excluded, orphan claims noted, and every policy with no claim kept with a count of zero.',
      'Groups industry to sector (or a justified coarser grouping) and says why: six-digit codes are too thin to price credibly.',
      'Uses one size variable on the log scale and explains dropping the others for collinearity.',
      'Excludes renewal_status because it is decided after the term — however well it "predicts".',
      'Fits a Poisson and a negative binomial with a log link and ln(exposure) as the offset, and supports the choice with a dispersion statistic or likelihood-ratio test — not AIC across families.',
      'Tests agent_channel and leaves it out with the evidence, answering the distribution VP\'s question directly.',
      'Shows a lift or Lorenz/Gini exhibit on the holdout, says it is the holdout, and ends with what the Committee should do with industry.',
    ],
  },
  {
    id: 'auto-severity',
    title: 'Collision Claim Severity',
    line: 'Personal Auto — Collision',
    company: 'Prairie Shield Insurance',
    memo: {
      from: 'Luis Ferreira, Director, Personal Auto Product',
      to: 'Actuarial Analyst, Personal Lines Pricing',
      subject: 'What drives collision severity?',
      body: [
        'Average collision severity is up sharply since 2022, faster than our trend selections assumed, and it has not risen evenly: some vehicles have become much more expensive to repair than others.',
        'We are preparing a revision of our vehicle-based rating factors. Please build a **claim severity** model for collision that shows which characteristics drive the cost of a claim and by how much, so we can see whether our current factors still line up with repair costs.',
        'Product management and the regional sales leads will see your findings. Keep the story clear enough for them, and technical enough that our pricing actuaries can check your work.',
      ].join('\n\n'),
    },
    stakeholders: [
      { from: 'Janet Kowalski', role: 'Director, Physical Damage Claims', note: 'Newer vehicles with cameras and radar in the bumpers and windshield need recalibration after even a minor repair. We see it on almost every estimate for late-model cars now.' },
      { from: 'Luis Ferreira', role: 'Director, Personal Auto Product', note: 'Whatever the model finds, we can only rate on what we know when we write the policy.' },
      { from: 'Sam Oduya', role: 'Claims Data', note: 'Vehicle values come from a third-party valuation service; older vehicles are sometimes not found and are left blank. A backlog of 2023 claims was keyed in by hand, so amounts from that period deserve a second look. Salvage and subrogation are booked separately, so a gross loss should never be negative.' },
      { from: 'Priya Shah', role: 'Pricing Actuary', note: 'Last year\'s severity study used driver age and years licensed together, plus vehicle age and model year.' },
    ],
    scope: [
      'Experience: closed collision claims with accident dates in 2022 through 2024.',
      'Target: gross_loss — the loss amount before the deductible and before salvage or subrogation.',
      'Predictors: characteristics of the driver, vehicle and policy known at policy inception. The model informs rating factors.',
      'Structure: use a log link, so effects read as multiplicative relativities.',
      'Frequency is out of scope; model severity only.',
      'Validate the model on data it was not fitted to, and report which data each exhibit uses.',
      'Audience: product management and sales leadership (non-technical), with enough technical detail for a pricing actuary to review.',
    ],
    dictionary: [
      {
        file: 'collision_claims.csv',
        description: 'One row per closed collision claim.',
        rows: 'about 9,000',
        entries: [
          { column: 'claim_id', type: 'text', description: 'Claim identifier.' },
          { column: 'accident_date', type: 'date', description: 'Date of the accident.' },
          { column: 'accident_year', type: 'integer', description: 'Calendar year of the accident.' },
          { column: 'report_lag_days', type: 'integer', description: 'Days from the accident to the first report of the claim.' },
          { column: 'driver_age', type: 'integer', description: 'Age of the driver at the time of the accident.' },
          { column: 'years_licensed', type: 'integer', description: 'Years the driver has held a licence.' },
          { column: 'vehicle_make', type: 'text', description: 'Manufacturer.' },
          { column: 'vehicle_body', type: 'text', description: 'Body style.' },
          { column: 'model_year', type: 'integer', description: 'Model year of the vehicle.' },
          { column: 'vehicle_age', type: 'integer', description: 'accident_year minus model_year.' },
          { column: 'vehicle_value', type: 'number', description: 'Actual cash value at the time of loss from the valuation service, in dollars.' },
          { column: 'territory', type: 'text', description: 'Urban, Suburban or Rural, from the garaging address.' },
          { column: 'vehicles_involved', type: 'text', description: 'Vehicles involved in the accident: 1, 2 or 3+.' },
          { column: 'adas_equipped', type: 'Y/N', description: 'Vehicle has advanced driver-assistance sensors (camera or radar).' },
          { column: 'deductible', type: 'integer', description: 'Collision deductible, in dollars.' },
          { column: 'airbag_deployed', type: 'Y/N', description: 'Any airbag deployed in the accident.' },
          { column: 'gross_loss', type: 'number', description: 'Loss amount before deductible, salvage and subrogation, in dollars.' },
        ],
      },
    ],
    questions: [
      { id: 'rows', kind: 'number', prompt: 'How many claims were in the data you used to fit your final model (the training data)?', crossCheck: true },
      { id: 'distribution', kind: 'choice', prompt: 'Which distribution does your final model use?', options: ['Gamma', 'Inverse Gaussian', 'Lognormal (linear model on log loss)', 'Tweedie', 'Other'] },
      { id: 'link', kind: 'choice', prompt: 'Which link function does it use?', options: ['Log', 'Identity', 'Inverse', 'Other'] },
      { id: 'validation', kind: 'choice', prompt: 'How did you test the model on data it had not been fitted to?', options: VALIDATION_OPTIONS },
      { id: 'metric', kind: 'text', prompt: 'State one performance statistic of your final model on data it was not fitted to, and name the statistic and the data set.', crossCheck: true },
      { id: 'value-effect', kind: 'text', prompt: 'How does your final model use vehicle value, and what severity relativity does it give a car worth twice as much as another?', crossCheck: true },
      { id: 'excluded', kind: 'text', prompt: 'Name any variables you excluded because they would not be known when a policy is written.' },
    ],
    strongReport: [
      'Removes zero and negative losses and the decimal-shift errors (caught by comparing gross_loss with vehicle_value), and says how many rows each step removed.',
      'Handles missing vehicle values deliberately — imputation or an indicator — and notes that they cluster on older cars.',
      'Enters vehicle value on the log scale and explains the elasticity in plain words ("a car worth twice as much costs about a third more to repair").',
      'Keeps only one of vehicle_age / model_year alongside accident_year, and one of driver_age / years_licensed.',
      'Excludes airbag_deployed and report_lag_days because they are known only after the accident, even though airbag_deployed is highly predictive.',
      'Compares gamma against inverse Gaussian (and/or lognormal) on residuals or out-of-sample fit, not on AIC across families, and explains the choice.',
      'Shows the ADAS effect — the claims director\'s observation — and a holdout lift chart, and turns both into a recommendation on vehicle factors.',
    ],
  },
  {
    id: 'ho-water',
    title: 'Homeowners Water Damage Loss Cost',
    line: 'Homeowners — Non-weather water',
    company: 'Cascade Home & Auto',
    memo: {
      from: 'Aisha Rahman, Homeowners Product Manager',
      to: 'Actuarial Analyst, Property Pricing',
      subject: 'Non-weather water: rating variables and a shut-off device discount',
      body: [
        'Non-weather water — burst supply lines, failed water heaters, slow leaks — is now our largest homeowners peril by loss cost. Our rating plan barely distinguishes one home\'s water exposure from another\'s.',
        'Please build a model of **non-weather water loss cost (pure premium)** that identifies the characteristics of a home that drive it. In particular, marketing has proposed a discount for homes with an automatic water shut-off device. Tell us whether the data supports one, and how large it could be.',
        'The product committee will read your conclusions; our pricing team will review the technical detail.',
      ].join('\n\n'),
    },
    stakeholders: [
      { from: 'Aisha Rahman', role: 'Homeowners Product Manager', note: 'If a shut-off discount is justified we want to launch it next year. If it isn\'t, we need to be able to say why.' },
      { from: 'Deb Lindqvist', role: 'Property Claims', note: 'Supply-line failures in homes with polybutylene plumbing are a recurring problem, and galvanized pipes in older homes corrode from the inside.' },
      { from: 'Mark Chen', role: 'Underwriting', note: 'Protection class is on every policy and it is one of our biggest rating factors for fire. It probably matters for water too.' },
      { from: 'Nina Park', role: 'Data & Analytics', note: 'year_built is self-reported at quote and the old quoting tool defaulted blanks to 0 or 9999. Recoveries are sometimes booked to the policy year after the claim closes.' },
      { from: 'Ron Adeyemi', role: 'Reinsurance', note: 'The handful of very large water losses we have had were multi-day leaks in homes left empty over the winter.' },
    ],
    scope: [
      'Experience: policy years 2020 through 2024; losses evaluated as of December 31, 2024.',
      'Target: non-weather water pure premium — incurred loss per policy year of earned exposure. Losses in the file are uncapped; any capping is your decision to justify.',
      'Predictors: characteristics known when a policy is quoted.',
      'Structure: use a log link, so effects read as multiplicative relativities.',
      'Answer the shut-off device question directly, with the size of any supported discount.',
      'Validate the model on data it was not fitted to, and report which data each exhibit uses.',
      'Audience: the product committee (non-technical), with enough technical detail for the pricing team to review.',
    ],
    dictionary: [
      {
        file: 'ho_policies.csv',
        description: 'One row per policy per policy year, with that year\'s non-weather water losses.',
        rows: 'about 30,000',
        entries: [
          { column: 'policy_id', type: 'text', description: 'Policy-year identifier.' },
          { column: 'policy_year', type: 'integer', description: 'Policy year.' },
          { column: 'earned_exposure', type: 'number', description: 'Earned exposure, in policy years.' },
          { column: 'region', type: 'text', description: 'Coastal, Metro or Inland.' },
          { column: 'year_built', type: 'integer', description: 'Year the home was built (self-reported).' },
          { column: 'square_feet', type: 'integer', description: 'Finished living area.' },
          { column: 'bathrooms', type: 'number', description: 'Number of bathrooms (half-baths count 0.5).' },
          { column: 'coverage_a', type: 'integer', description: 'Dwelling limit, in dollars.' },
          { column: 'plumbing_material', type: 'text', description: 'Supply-line material: Copper, PEX, CPVC, Galvanized, Polybutylene or Unknown.' },
          { column: 'finished_basement', type: 'Y/N', description: 'Home has a finished basement.' },
          { column: 'water_shutoff_device', type: 'Y/N', description: 'Automatic water shut-off device installed.' },
          { column: 'protection_class', type: 'integer', description: 'Public fire protection class, 1 (best) to 10.' },
          { column: 'insurance_score_tier', type: 'integer', description: 'Insurance score tier, 1 (best) to 5.' },
          { column: 'aoi_deductible', type: 'integer', description: 'All-other-perils deductible, in dollars.' },
          { column: 'prior_water_claims_5yr', type: 'integer', description: 'Water claims at this address in the five years before the policy year.' },
          { column: 'claim_count', type: 'integer', description: 'Non-weather water claims in the policy year.' },
          { column: 'incurred_loss', type: 'number', description: 'Non-weather water incurred loss in the policy year, in dollars (net of deductible, uncapped).' },
        ],
      },
    ],
    questions: [
      { id: 'rows', kind: 'number', prompt: 'How many policy-year records were in the data you used to fit your final model (the training data)?', crossCheck: true },
      { id: 'distribution', kind: 'choice', prompt: 'Which structure does your final model use?', options: ['Tweedie (pure premium)', 'Poisson frequency × gamma severity', 'Gamma', 'Other'] },
      { id: 'power', kind: 'text', prompt: 'If you used a Tweedie distribution, what power parameter p did you choose, and how?' },
      { id: 'validation', kind: 'choice', prompt: 'How did you test the model on data it had not been fitted to?', options: VALIDATION_OPTIONS },
      { id: 'metric', kind: 'text', prompt: 'State one performance statistic of your final model on data it was not fitted to, and name the statistic and the data set.', crossCheck: true },
      { id: 'shutoff', kind: 'text', prompt: 'What discount, if any, does your model support for a water shut-off device?', crossCheck: true },
      { id: 'large-losses', kind: 'text', prompt: 'How did you treat large losses?' },
    ],
    strongReport: [
      'Cleans year_built, square_feet and the negative losses and says what each step removed; decides which of claim_count and incurred_loss to trust.',
      'Explains the choice of a Tweedie (compound Poisson–gamma) model by the mass of zero losses, and how p was selected (profile likelihood or a grid on holdout deviance).',
      'Bins or caps home age after seeing the relationship flatten, rather than forcing a straight line.',
      'Chooses between square_feet and coverage_a (and bathrooms) after checking their correlation, and says why.',
      'Tests protection_class and leaves it out, answering the underwriter\'s expectation with evidence.',
      'Addresses large losses — cap and load, or keep and show the fit is stable — and says how the choice affects the discount.',
      'Answers the shut-off question with a relativity and its uncertainty, and recommends a discount no larger than the evidence supports.',
    ],
  },
]

export function projectCase(id: string): ProjectCase | undefined {
  return PROJECT_CASES.find(c => c.id === id)
}
