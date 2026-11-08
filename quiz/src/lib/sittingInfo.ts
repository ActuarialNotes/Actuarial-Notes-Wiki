/**
 * What the study guide's sitting panel (`components/wiki/ExamSittingInfoButton.tsx`)
 * does with the exam's facts and sources before drawing them as grouped lists.
 * Pure and tested.
 */

/** A value longer than this goes under its label instead of at the row's right edge. */
export const INLINE_VALUE_MAX = 24

/**
 * The exam's facts as rows: the fee first — the fact people look for — then
 * the rest in the order they were transcribed; each marked whether its value
 * fits at the right edge of the row.
 */
export function aboutRows(facts: readonly { label: string; value: string }[]) {
  const isFee = (label: string) => /^fees?$/i.test(label)
  return [...facts.filter(f => isFee(f.label)), ...facts.filter(f => !isFee(f.label))].map(f => ({
    ...f,
    inline: f.value.length <= INLINE_VALUE_MAX,
  }))
}

/** How many sources show before the rest fold behind "N more". */
export const SOURCES_SHOWN = 2

/**
 * The sources as rows: "SOA — Exam schedule" split into the publisher's tile
 * and the title. The first two show; the rest fold behind one row — unless
 * folding would hide a single link, which is shown instead of a "1 more".
 */
export function sourceRows<S extends { label: string; url: string }>(sources: readonly S[], expanded: boolean) {
  const rows = sources.map(s => {
    const at = s.label.indexOf(' — ')
    return at > 0 && at <= 8
      ? { ...s, publisher: s.label.slice(0, at), title: s.label.slice(at + 3) }
      : { ...s, publisher: null, title: s.label }
  })
  const fold = !expanded && rows.length > SOURCES_SHOWN + 1
  return { shown: fold ? rows.slice(0, SOURCES_SHOWN) : rows, hidden: fold ? rows.length - SOURCES_SHOWN : 0 }
}
