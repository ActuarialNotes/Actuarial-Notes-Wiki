/**
 * Exam-weight tags — the `{23-30%}` share-of-the-exam marker an exam page
 * writes into a learning-objective callout title, and the same figure the quiz
 * builder reads off a topic group's `weight`.
 *
 * Both surfaces render the tag through `components/ExamWeightLabel` and draw
 * the same fill behind the row, so the parsing lives here once instead of
 * being re-derived on each side.
 */

/** The `{…}` tag inside a callout title, e.g. "General Probability {23-30%}". */
const WEIGHT_TAG_RE = /\{([^}]+)\}/

/**
 * The average percentage a weight string describes: the midpoint of a range
 * (`23-30%` → 26.5) or the figure itself (`15%` → 15). Null when the string
 * carries no percentage at all.
 */
export function parseExamWeight(weight?: string | null): number | null {
  if (!weight) return null
  const range = weight.match(/(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)\s*%/)
  if (range) return (parseFloat(range[1]) + parseFloat(range[2])) / 2
  const single = weight.match(/(\d+(?:\.\d+)?)\s*%/)
  if (single) return parseFloat(single[1])
  return null
}

/**
 * Splits a callout title into its text and its weight tag, so the weight can
 * be rendered as its own right-aligned label rather than inline in the
 * heading. Only a tag that actually holds a percentage is split off — any
 * other `{…}` stays in the title and keeps the generic pill rendering.
 */
export function splitWeightTag(title: string): { title: string; weight: string | null } {
  const m = WEIGHT_TAG_RE.exec(title)
  if (!m || m.index === undefined || parseExamWeight(m[1]) === null) {
    return { title, weight: null }
  }
  const withoutTag = title.slice(0, m.index) + title.slice(m.index + m[0].length)
  return { title: withoutTag.replace(/\s+/g, ' ').trim(), weight: m[1].trim() }
}
