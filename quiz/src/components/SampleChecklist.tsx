import { MarkdownText, READING_MD_CLASS } from '@/components/MarkdownText'
import type { SampleChecklist as SampleChecklistData } from '@/lib/essayChecklist'

/**
 * One sample answer with a box beside each of its points (lib/essayChecklist.ts):
 * the reader ticks the points their answer makes, reading the examiners' own
 * words as they do. The paragraph naming the other accepted answers gets a
 * box too, for an answer that made one of those instead. Everything else
 * (headings, lead-ins, formulas) reads as the sample does.
 *
 * Each point is a row under a hairline, its box a rounded square: filled with
 * the text colour once ticked (docs/redesign-spec.md §5.2).
 */
export function SampleChecklist({
  sample,
  ticked,
  onToggle,
  name,
}: {
  sample: SampleChecklistData
  ticked: readonly number[]
  onToggle: (point: number) => void
  /** Prefixes each box's accessible name when there are several samples: "Sample 2, point 1". */
  name?: string
}) {
  let number = 0
  return (
    <div>
      {sample.blocks.map((block, i) => {
        if (block.kind === 'text') {
          return <MarkdownText key={i} className={`${READING_MD_CLASS} border-t border-border py-3`}>{block.markdown}</MarkdownText>
        }
        const on = ticked.includes(block.index)
        // The other accepted answers are a box of their own, not a numbered point.
        const what = block.also ? 'other accepted answers' : `point ${++number}`
        const label = name ? `${name}, ${what}` : what.charAt(0).toUpperCase() + what.slice(1)
        return (
          <div key={i} className="flex items-start gap-3 border-t border-border py-3">
            <button
              type="button"
              role="checkbox"
              aria-checked={on}
              aria-label={label}
              onClick={() => onToggle(block.index)}
              className={[
                '-m-2.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              ].join(' ')}
            >
              {on ? (
                <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-foreground text-ground">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>
                </span>
              ) : (
                <span aria-hidden="true" className="h-6 w-6 rounded-[7px] border-[1.5px] border-foreground" />
              )}
            </button>
            <MarkdownText className={`${READING_MD_CLASS} min-w-0 flex-1`}>{block.markdown}</MarkdownText>
          </div>
        )
      })}
    </div>
  )
}
