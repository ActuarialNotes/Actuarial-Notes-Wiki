import { CheckMark } from '@/components/CheckMark'
import { MarkdownText, READING_MD_CLASS } from '@/components/MarkdownText'
import type { SampleChecklist as SampleChecklistData } from '@/lib/essayChecklist'

/**
 * One sample answer with a box beside each of its points (lib/essayChecklist.ts):
 * the reader ticks the points their answer makes, reading the examiners' own
 * words as they do. The paragraph naming the other accepted answers gets a
 * box too, for an answer that made one of those instead. Everything else —
 * headings, lead-ins, formulas — reads as the sample does.
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
    <div className="space-y-2">
      {sample.blocks.map((block, i) => {
        if (block.kind === 'text') {
          return <MarkdownText key={i} className={READING_MD_CLASS}>{block.markdown}</MarkdownText>
        }
        const on = ticked.includes(block.index)
        // The other accepted answers are a box of their own, not a numbered point.
        const what = block.also ? 'other accepted answers' : `point ${++number}`
        const label = name ? `${name}, ${what}` : what.charAt(0).toUpperCase() + what.slice(1)
        return (
          <div key={i} className="flex items-start gap-3">
            <button
              type="button"
              role="checkbox"
              aria-checked={on}
              aria-label={label}
              onClick={() => onToggle(block.index)}
              className={[
                '-m-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              ].join(' ')}
            >
              {on
                ? <CheckMark className="h-6 w-6" />
                : <span aria-hidden="true" className="h-6 w-6 rounded-full border-2 border-muted-foreground/40 transition-colors hover:border-foreground/60" />}
            </button>
            <MarkdownText className={`${READING_MD_CLASS} min-w-0 flex-1`}>{block.markdown}</MarkdownText>
          </div>
        )
      })}
    </div>
  )
}
