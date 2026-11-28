import { useEffect, useRef, useState, type ReactNode } from 'react'
import { BookOpen, Check, ChevronDown, ChevronRight, X } from 'lucide-react'
import { MarkdownText, QUESTION_MD_CLASS } from '@/components/MarkdownText'
import { ANSWER_EDGE, ANSWER_SOLID, ANSWER_TEXT, type AnswerState } from '@/lib/answerState'
import { askLine, conceptName } from '@/lib/sessionResults'
import { cn } from '@/lib/utils'

// The pieces of the feedback after an answer (docs/redesign-spec.md §5.2): the
// question folded to one line, the reader's answer and the right one as two
// rows, the solution as plain text with its formulas in outlined boxes, and a
// row per concept that opens it in the reader.

/**
 * The question, folded to its ask; a tap reopens it. `folded` is drawn under
 * it only while it is folded: the answer rows, which the opened question's own
 * options already mark, so they would say the same thing twice.
 */
export function FoldedQuestion({ question, children, folded, defaultOpen = false }: {
  question: { stem: string; parts?: { label: string; stem: string }[] }
  /** The question in full: what the fold opens to. */
  children: ReactNode
  /** Shown below the fold while it is closed. */
  folded?: ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? 'Hide the question' : 'Show the question'}
        onClick={() => setOpen(o => !o)}
        className="flex min-h-[48px] w-full items-center gap-2.5 text-left text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
      >
        <span className={cn('min-w-0 flex-1', open ? 'font-semibold' : 'truncate')}>
          {open ? 'The question' : <MarkdownText inline className="[&_p]:inline">{askLine(question)}</MarkdownText>}
        </span>
        <ChevronDown aria-hidden="true" strokeWidth={2.5} className={cn('h-4 w-4 shrink-0 transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="pb-2 pt-1">{children}</div>}
      {!open && folded && <div className="mt-3.5">{folded}</div>}
    </div>
  )
}

/**
 * One answer as a row. The right answer is filled green with a check; the
 * reader's own wrong one is outlined red with a cross, struck through.
 */
export function AnswerRow({ state, solid, yours = false, letter, children }: {
  state: AnswerState
  /** Filled with the state's colour (the right answer), or outlined in it. */
  solid: boolean
  /** The reader's own answer: marked "You". */
  yours?: boolean
  letter?: string
  children: ReactNode
}) {
  const wrong = state === 'incorrect'
  const Icon = wrong ? X : Check
  const says = solid
    ? (yours ? 'Your answer, correct' : 'Correct answer')
    : `Your answer, ${state}`
  return (
    <div
      data-answer-row={yours ? 'yours' : 'correct'}
      className={cn(
        'flex min-h-[54px] items-center gap-3.5 rounded-[14px] px-4 py-2.5 text-[17px] sm:text-lg',
        solid ? cn(ANSWER_SOLID[state], 'border-[1.5px] border-transparent font-bold') : ANSWER_EDGE[state],
      )}
    >
      <Icon
        role="img"
        aria-label={says}
        strokeWidth={solid ? 3 : 2.5}
        className={cn('h-[22px] w-[22px] shrink-0', !solid && ANSWER_TEXT[state])}
      />
      {letter && <span className="shrink-0 text-[15px] font-bold">{letter}</span>}
      <span className={cn('min-w-0 flex-1 overflow-x-auto overflow-y-hidden', wrong && !solid && 'line-through')}>{children}</span>
      {yours && <span className="shrink-0 text-sm font-normal">You</span>}
    </div>
  )
}

// Marks each display equation that runs past its box, so its edge fades
// (index.css, `.math-scroll--more`) and a reader on a phone can see there is
// more to scroll to.
function useMathScrollHint(ref: React.RefObject<HTMLElement | null>, deps: unknown[]) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    // A formula written on a line of its own inside a paragraph is typeset in
    // display style but has no display wrapper (lib/displayMath.ts); mark it so
    // it gets the same outlined, scrolling box.
    root.querySelectorAll<HTMLElement>('.katex').forEach(el => {
      if (el.closest('.katex-display')) return
      const tex = el.querySelector('annotation')?.textContent ?? ''
      if (tex.trimStart().startsWith('\\displaystyle')) el.classList.add('katex-display', 'session-formula')
    })
    const blocks = Array.from(root.querySelectorAll<HTMLElement>('.katex-display'))
    const mark = (el: HTMLElement) =>
      el.classList.toggle('math-scroll--more', el.scrollWidth - el.clientWidth - el.scrollLeft > 4)
    const update = () => blocks.forEach(mark)
    update()
    const onScroll = (e: Event) => mark(e.currentTarget as HTMLElement)
    blocks.forEach(el => el.addEventListener('scroll', onScroll, { passive: true }))
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update)
    observer?.observe(root)
    return () => {
      blocks.forEach(el => el.removeEventListener('scroll', onScroll))
      observer?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/** The solution: plain text on the page, each formula in an outlined box that scrolls sideways. */
export function Solution({ markdown }: { markdown: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useMathScrollHint(ref, [markdown])
  if (!markdown.trim()) return null
  return (
    <div ref={ref} data-math-scope className="session-solution">
      <MarkdownText className={cn(QUESTION_MD_CLASS, 'text-[17px] leading-normal [&_p]:my-3.5 [&_table]:text-sm')}>
        {markdown}
      </MarkdownText>
    </div>
  )
}

/** A row per concept the question is tagged with; a tap opens it in the reader. */
export function ConceptRows({ links, onOpen }: {
  links: readonly string[]
  onOpen: (links: string[], index: number) => void
}) {
  const named = links.map((link, index) => ({ link, index, name: conceptName(link) })).filter(c => c.name)
  if (named.length === 0) return null
  return (
    <ul className="flex flex-col gap-2.5" aria-label="Concepts">
      {named.map(c => (
        <li key={c.link}>
          <button
            type="button"
            onClick={() => onOpen([...links], c.index)}
            className="flex min-h-[56px] w-full items-center gap-3.5 rounded-2xl border border-border px-4 text-left text-[17px] font-semibold transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <BookOpen aria-hidden="true" className="h-[22px] w-[22px] shrink-0" />
            <span className="min-w-0 flex-1">{c.name}</span>
            <ChevronRight aria-hidden="true" strokeWidth={2.5} className="h-4 w-4 shrink-0" />
          </button>
        </li>
      ))}
    </ul>
  )
}
