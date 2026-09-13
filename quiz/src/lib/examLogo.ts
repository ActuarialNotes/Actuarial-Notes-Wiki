// The exam **logo**: the square, rounded monogram tile that marks an exam
// wherever the app lists them — the Study Guides grid and the quiz builder's
// exam cards today. It is a visual anchor rather than a label: the card's
// title still says "Exam MAS-I", the tile is what the eye lands on first and
// what makes one exam's card recognisable at a glance.
//
// Two things make it work, and this module owns both of them:
//
//   * the **monogram** — an exam's name cut down to something that fits in a
//     square, at most two lines of at most three characters, and
//   * the **type scale** — how big that monogram can be drawn before it runs
//     out of tile, expressed as a fraction of the tile's size so one tile
//     component can be rendered at any size.
//
// The colour is not here: the tile is painted with the exam's own accent
// (`lib/examColors.ts`, `--exam-accent-vivid`), so the ramp from blue at Exam P
// to red at Exam 9 is what separates one logo from the next. See
// `components/ExamLogo.tsx` for the tile itself.

/** How a monogram is drawn: the lines, and the em-size they're drawn at. */
export interface ExamMonogram {
  /** One or two lines, stacked. Never empty. */
  lines: string[]
  /** Font size as a fraction of the tile's edge (0–1). */
  fontScale: number
}

/**
 * The exam's monogram lines, from its `exam_progress` key.
 *
 * The CAS upper-level keys are namespaced (`CAS-5`) but the exam is called
 * "Exam 5", so the prefix is dropped — the tile says what the candidate says.
 * Anything longer than three characters is split over two lines: at the name's
 * own hyphen when it has one (`MAS-I` → MAS / I), otherwise down the middle
 * with the shorter line on top (`ALTAM` → AL / TAM), which keeps the letter
 * that distinguishes ALTAM from ASTAM on the line the eye reads first.
 */
export function examMonogramLines(examKey: string): string[] {
  const name = examKey.replace(/^CAS-(?=\d)/, '').trim().toUpperCase()
  if (!name) return ['?']
  if (name.length <= 3) return [name]

  const dash = name.indexOf('-')
  if (dash > 0 && dash < name.length - 1) {
    return [name.slice(0, dash), name.slice(dash + 1)]
  }

  const cut = Math.floor(name.length / 2)
  return [name.slice(0, cut), name.slice(cut)]
}

/**
 * How large the monogram may be drawn, as a fraction of the tile's edge.
 *
 * Two limits, and the tighter one wins: the width of the longest line, and the
 * height of the stack. Both are authored rather than measured — the tile is
 * always the same bold face, so the widths are known, and a table is easier to
 * tune by eye than a formula fitted to one font.
 */
export function monogramFontScale(lines: readonly string[]): number {
  const longest = lines.reduce((n, line) => Math.max(n, line.length), 0)
  const byWidth = longest <= 1 ? 0.56 : longest === 2 ? 0.46 : longest === 3 ? 0.34 : 0.26
  const byHeight = lines.length <= 1 ? 0.56 : 0.34
  return Math.min(byWidth, byHeight)
}

/** The monogram for an exam: what to draw, and how big. */
export function examMonogram(examKey: string): ExamMonogram {
  const lines = examMonogramLines(examKey)
  return { lines, fontScale: monogramFontScale(lines) }
}
