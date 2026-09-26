/**
 * The PCPA project's technical report: how its words are counted, what makes a
 * submission fail on form alone, and what a grader would look for in it
 * (`docs/pcpa-project.md`).
 *
 * The real project fails a report outright for two things a candidate controls
 * completely — more than 1,250 words *inclusive of appendices*, and more than
 * five tables or graphics — so the simulator counts the way a word processor
 * does and holds the candidate to both before they submit. The rest of this
 * module is the self-review: plain-text checks for the omissions the CAS's
 * post-project summary says cost candidates the most. They are evidence for the
 * candidate's own grading, never a grade.
 *
 * Pure and tested.
 */

import { APPENDIX_LIMIT, WORD_LIMIT, type Domain } from '@/data/pcpaProjects'
import type { CaseId } from './pcpaData'
import { parseCsv } from './csv'

// ─── Words ───────────────────────────────────────────────────────────────────

/**
 * Reduces report markdown to the words a reader sees: link and image targets
 * dropped (their text kept), table pipes and heading marks gone, HTML comments
 * removed.
 */
export function markdownToPlainText(markdown: string): string {
  return markdown
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[|]/g, ' ')
}

/**
 * Words, counted the way a word processor counts them: whitespace-separated
 * runs that contain a letter or a digit. "log-link" is one word, "0.27" is one
 * word, a lone "—" or "|" is none.
 */
export function countWords(text: string): number {
  let count = 0
  for (const token of markdownToPlainText(text).split(/\s+/)) {
    if (/[\p{L}\p{N}]/u.test(token)) count++
  }
  return count
}

export type AppendixKind = 'image' | 'table'

/** An appendix: an output file the candidate attached, with its caption. */
export interface Appendix {
  id: string
  path: string
  kind: AppendixKind
  caption: string
}

/** Appendix kind from its file name, or null for a file that can't be one. */
export function appendixKind(path: string): AppendixKind | null {
  const ext = path.split('.').pop()?.toLowerCase() ?? ''
  if (['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp'].includes(ext)) return 'image'
  if (ext === 'csv') return 'table'
  return null
}

/**
 * Words an appendix contributes: its caption, plus — for a table — every word
 * and number in its cells. Text drawn inside an image can't be counted here;
 * the note beside the counter says so.
 */
export function appendixWords(appendix: Appendix, tableText?: string): number {
  let words = countWords(appendix.caption)
  if (appendix.kind === 'table' && tableText) {
    const { columns, rows } = parseCsv(tableText)
    for (const cell of [...columns, ...rows.flat()]) words += countWords(cell)
  }
  return words
}

export interface WordTally {
  body: number
  appendices: number
  total: number
  limit: number
  over: boolean
}

export function tallyWords(body: string, appendixWordCounts: number[]): WordTally {
  const bodyWords = countWords(body)
  const appendixTotal = appendixWordCounts.reduce((a, b) => a + b, 0)
  const total = bodyWords + appendixTotal
  return { body: bodyWords, appendices: appendixTotal, total, limit: WORD_LIMIT, over: total > WORD_LIMIT }
}

// ─── Submission form ─────────────────────────────────────────────────────────

export interface SubmissionState {
  words: WordTally
  appendixCount: number
  codeFiles: string[]
  /** Image embeds found in the report body (appendices are the place for them). */
  bodyImages: number
  attested: boolean
  unanswered: string[]
}

export interface FormIssue {
  id: string
  message: string
  /** A fatal issue is one the CAS fails a submission for, or one the portal won't accept. */
  fatal: boolean
}

/**
 * What stands between this submission and a valid one. The first two are the
 * CAS's automatic fails; the rest are what its portal requires before it lets a
 * candidate submit at all.
 */
export function submissionIssues(state: SubmissionState): FormIssue[] {
  const issues: FormIssue[] = []
  if (state.words.over) {
    issues.push({ id: 'words', fatal: true, message: `The report is ${state.words.total.toLocaleString('en-US')} words including appendices — over the ${state.words.limit.toLocaleString('en-US')}-word limit. The CAS fails a report that exceeds it.` })
  }
  if (state.appendixCount > APPENDIX_LIMIT) {
    issues.push({ id: 'appendices', fatal: true, message: `${state.appendixCount} appendices attached — the limit is ${APPENDIX_LIMIT}. Extra supporting material is an automatic fail.` })
  }
  if (state.words.body < 150) {
    issues.push({ id: 'empty', fatal: true, message: 'The report is nearly empty.' })
  }
  if (state.codeFiles.length === 0) {
    issues.push({ id: 'code', fatal: true, message: 'No code file (.R or .py) to submit. The code is required even though it is not scored.' })
  }
  if (state.unanswered.length > 0) {
    issues.push({ id: 'questions', fatal: true, message: `${state.unanswered.length} submission question${state.unanswered.length === 1 ? '' : 's'} unanswered.` })
  }
  if (!state.attested) {
    issues.push({ id: 'attestation', fatal: true, message: 'The attestation has not been confirmed.' })
  }
  if (state.bodyImages > 0) {
    issues.push({ id: 'body-images', fatal: false, message: 'The report body embeds an image. Graphics belong in the appendices, where they count toward the limit of five.' })
  }
  return issues
}

/** Image embeds in markdown. */
export function countBodyImages(markdown: string): number {
  return (markdown.match(/!\[[^\]]*\]\([^)]*\)/g) ?? []).length
}

// ─── The self-review ─────────────────────────────────────────────────────────

export interface ReportCheck {
  id: string
  domain: Domain
  /** What a grader looks for, phrased as the thing being present. */
  label: string
  /** Shown when the check doesn't find it. */
  missing: string
  found: boolean
}

interface CheckSpec {
  id: string
  domain: Domain
  label: string
  missing: string
  test: (text: string, captions: string, appendices: Appendix[]) => boolean
}

const DISTRIBUTIONS = /\b(poisson|negative[ -]binomial|quasi-?poisson|gamma|inverse[ -]gaussian|log-?normal|tweedie|binomial|normal)\b/gi

function distinctDistributions(text: string): Set<string> {
  const found = new Set<string>()
  for (const m of text.matchAll(DISTRIBUTIONS)) found.add(m[1].toLowerCase().replace(/[ -]/g, ''))
  return found
}

const GENERIC_CHECKS: CheckSpec[] = [
  {
    id: 'validation', domain: 'A', label: 'Validates on data the model has not seen',
    missing: 'No train/test split or cross-validation described. The post-project summary names this the most common Domain A and B mistake.',
    test: t => /hold-?out|cross[- ]?validat|\bk-?fold\b|\b\d+-fold\b|out-of-fold|(train|training)\b[\s\S]{0,120}\b(test|testing|validation)\b/i.test(t),
  },
  {
    id: 'split-described', domain: 'A', label: 'Says how the data was split',
    missing: 'No split proportion or fold count (e.g. "a 70/30 random split", "5-fold"). Graders need to know how the holdout was made.',
    test: t => /\b\d{1,2}\s?%|\b\d{2}\s?\/\s?\d{2}\b|\b\d+-fold\b|\bk\s?=\s?\d+|\b(five|ten)-fold\b|\brandom(ly)? (sample|split|selected)|\bstratified\b/i.test(t),
  },
  {
    id: 'transform', domain: 'A', label: 'Explains variable transformations',
    missing: 'No transformation described (log, binning, grouping, capping). Task A-3 asks how and why variables were transformed.',
    test: t => /\b(log(arithm)?|ln\(|transform|bin(ned|ning|s)?\b|band(ed|s)?\b|group(ed|ing)|cap(ped|ping)?\b|spline|polynomial|squared)/i.test(t),
  },
  {
    id: 'anomalies', domain: 'A', label: 'Describes data problems and how they were handled',
    missing: 'No mention of missing values, outliers, duplicates or errors. Task A-4 asks for both the problem and the fix.',
    test: t => /\b(missing|outlier|duplicate|error|invalid|impute|blank|anomal)/i.test(t),
  },
  {
    id: 'distributions', domain: 'B', label: 'Compares distributions and supports the choice',
    missing: 'Only one distribution is named. The summary says both were needed: why the final model fits well *and* why its distribution beats an alternative.',
    test: t => distinctDistributions(t).size >= 2,
  },
  {
    id: 'diagnostics', domain: 'B', label: 'Uses diagnostics to improve the model',
    missing: 'No diagnostics named (deviance, AIC/BIC, likelihood-ratio test, p-values, VIF, residuals, dispersion).',
    test: t => /\b(deviance|aic|bic|likelihood[- ]ratio|p-?values?|significan|vif|variance inflation|residual|dispersion|chi-?squared?|wald)\b/i.test(t),
  },
  {
    id: 'multicollinearity', domain: 'B', label: 'Addresses correlated or collinear variables',
    missing: 'No discussion of correlated variables or multicollinearity, which the rubric names explicitly.',
    test: t => /collinear|correlat|\bvif\b|variance inflation|aliased|alias/i.test(t),
  },
  {
    id: 'coefficients', domain: 'B', label: 'Reports the coefficients or relativities',
    missing: 'No coefficients or relativities found. "Variables are listed but no coefficients are listed" is a named mistake.',
    test: (t, _c, apps) => /coefficient|relativit|parameter estimate|\bexp\(|β|\bbeta\b/i.test(t) && (/\b\d+\.\d{2,}\b/.test(t) || apps.some(a => a.kind === 'table')),
  },
  {
    id: 'iteration', domain: 'B', label: 'Explains how the model was built up',
    missing: 'No account of how variables were added, removed or tested along the way.',
    test: t => /\b(added|removed|dropped|excluded|forward|backward|stepwise|iterat|refit|re-fit|candidate model|final model|nested)\b/i.test(t),
  },
  {
    id: 'visuals', domain: 'C', label: 'Includes graphics',
    missing: 'No graphic is attached. "Not providing visualizations" is a named mistake.',
    test: (_t, _c, apps) => apps.some(a => a.kind === 'image'),
  },
  {
    id: 'segmentation', domain: 'C', label: 'Shows a lift, double-lift or Lorenz/Gini exhibit',
    missing: 'No lift, double-lift or Lorenz/Gini exhibit. The summary calls these the clearest evidence of a model\'s segmentation power.',
    test: (t, c) => /\b(lift|double[- ]lift|lorenz|gini|quantile plot|decile)\b/i.test(`${t} ${c}`),
  },
  {
    id: 'exhibit-dataset', domain: 'C', label: 'Says which data each validation exhibit uses',
    missing: 'An appendix caption doesn\'t say which data set it shows. Validation exhibits should be on holdout or out-of-fold data, and say so.',
    test: (_t, _c, apps) => apps.filter(a => a.kind === 'image').every(a => /hold-?out|test|validation|out-of-fold|train|training|all data|full data/i.test(a.caption)),
  },
  {
    id: 'reasonableness', domain: 'C', label: 'Discusses whether the results are reasonable',
    missing: 'No discussion of whether the coefficients make sense — "why each variable was included" is a named mistake.',
    test: t => /\b(reasonable|intuitive|expected|consistent with|makes sense|as expected|counter-?intuitive|plausib)/i.test(t),
  },
  {
    id: 'limitations', domain: 'C', label: 'Discusses the model\'s limitations',
    missing: 'No limitations or potential flaws. The summary: "many candidates omitted discussion of potential flaws of modeling approach."',
    test: t => /\b(limitation|flaw|caveat|weakness|shortcoming|drawback|further work|next steps|should be monitored)/i.test(t),
  },
  {
    id: 'recommendation', domain: 'C', label: 'Makes a recommendation to the business',
    missing: 'No recommendation for the decision-makers. Domain C carries 40% of the project score, and its last criterion is a persuasive business case.',
    test: t => /\b(recommend|we should|propose|suggest|advise)/i.test(t),
  },
]

const CASE_CHECKS: Record<CaseId, CheckSpec[]> = {
  'bop-frequency': [
    { id: 'industry-grouping', domain: 'A', label: 'Groups industry to a credible level', missing: 'No sign that NAICS codes were grouped. Fitting six-digit codes is named in the post-project summary as too thin for a GLM.', test: t => /\b(sector|two-digit|2-digit|group(ed|ing)?)\b/i.test(t) && /naics|industry/i.test(t) },
    { id: 'offset', domain: 'B', label: 'Uses exposure as an offset', missing: 'No offset for earned exposure. Frequency per policy year needs ln(exposure) as an offset (or exposure as a weight on the rate).', test: t => /offset|exposure/i.test(t) },
    { id: 'cwp', domain: 'A', label: 'Excludes claims closed without payment', missing: 'The scope counts only claims with incurred loss above zero; no mention of excluding the zero-incurred claims.', test: t => /(zero|\$0|no|without) (incurred|payment|loss)|closed without|incurred (loss )?(greater|above|>) ?(than )?(zero|0)/i.test(t) },
    { id: 'renewal', domain: 'C', label: 'Explains excluding renewal status', missing: 'renewal_status is decided after the term. The report should say why it cannot be a predictor.', test: t => /renewal/i.test(t) },
  ],
  'auto-severity': [
    { id: 'post-event', domain: 'C', label: 'Excludes post-accident variables', missing: 'airbag_deployed and report_lag_days are known only after the accident; the report should say why they are out.', test: t => /airbag|report(ing)? lag|after the (accident|loss)|post-(accident|loss|event)/i.test(t) },
    { id: 'value-log', domain: 'A', label: 'Transforms vehicle value', missing: 'Vehicle value spans an order of magnitude; the report doesn\'t say how it enters the model.', test: t => /(log|ln)[\s\S]{0,40}value|value[\s\S]{0,40}(log|ln)|elasticit/i.test(t) },
    { id: 'aliasing', domain: 'B', label: 'Handles model year vs vehicle age', missing: 'model_year, vehicle_age and accident_year are exactly collinear; the report doesn\'t say which were kept.', test: t => /model[ _]year|vehicle[ _]age/i.test(t) },
  ],
  'ho-water': [
    { id: 'shutoff', domain: 'C', label: 'Answers the shut-off device question', missing: 'The memo\'s specific question — is a shut-off discount supported, and how large — isn\'t answered.', test: t => /shut-?off/i.test(t) },
    { id: 'tweedie-power', domain: 'B', label: 'Explains the Tweedie power', missing: 'No mention of how the Tweedie power parameter was chosen.', test: t => /tweedie/i.test(t) ? /\bp\s?=|power|variance power|index parameter/i.test(t) : /frequency[\s\S]{0,200}severity|severity[\s\S]{0,200}frequency/i.test(t) },
    { id: 'large-losses', domain: 'A', label: 'Addresses large losses', missing: 'Losses are uncapped and the scope asks for a justified choice; no mention of large losses or capping.', test: t => /large loss|\bcap(ped|ping)?\b|extreme|catastroph|excess/i.test(t) },
  ],
}

/** Runs every check on a report. `text` is the body; captions are checked alongside it. */
export function reviewReport(caseId: CaseId, body: string, appendices: Appendix[]): ReportCheck[] {
  const text = markdownToPlainText(body)
  const captions = appendices.map(a => a.caption).join(' ')
  return [...GENERIC_CHECKS, ...CASE_CHECKS[caseId]].map(spec => ({
    id: spec.id,
    domain: spec.domain,
    label: spec.label,
    missing: spec.missing,
    found: spec.test(`${text} ${captions}`, captions, appendices),
  }))
}

/**
 * Which checks bear on which rubric criterion, so the self-assessment can show
 * the evidence beside each one. B-1 is scored from the assessment data instead.
 */
export const RUBRIC_EVIDENCE: Record<string, string[]> = {
  'a3-transform': ['transform', 'industry-grouping', 'value-log'],
  'a4-anomalies': ['anomalies', 'cwp', 'large-losses'],
  'b1-performs': [],
  'b2-diagnostics': ['diagnostics', 'multicollinearity', 'aliasing'],
  'b2-selected': ['distributions', 'tweedie-power', 'offset'],
  'b2-output': ['coefficients'],
  'b2-iterative': ['iteration', 'validation', 'split-described'],
  'c1-visuals': ['visuals', 'segmentation', 'exhibit-dataset'],
  'c2-method': ['distributions', 'validation'],
  'c2-variables': ['iteration', 'reasonableness', 'renewal', 'post-event'],
  'c3-appropriate': ['reasonableness', 'limitations', 'shutoff'],
  'c3-persuasive': ['recommendation'],
}
