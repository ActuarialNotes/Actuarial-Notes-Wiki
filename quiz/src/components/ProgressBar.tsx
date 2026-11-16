import { useState, useRef, useEffect, useMemo, type ReactNode } from 'react'
import { ChevronDown, BookmarkCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NavProgressBar } from '@/components/NavProgressBar'

interface ProgressBarProps {
  current: number   // 1-indexed
  total: number
  onNavigate?: (index: number) => void   // called with 0-based index
  flaggedIds?: string[]
  questionIds?: string[]
  /** The question on screen is flagged: a mark beside its number says so. */
  isFlagged?: boolean
  /** What leads the row, before the count: the way out (Quit). */
  leading?: ReactNode
  /**
   * What ends the row: the timer, the spreadsheet where the exam has one, and
   * the More menu. Everything else about the question is in that menu.
   */
  tools?: ReactNode
}

/**
 * Up to this many questions, the bar is one step per question — a short quiz
 * reads as "two of three done" at a glance. A longer paper's steps would be
 * slivers, so it is one continuous bar.
 */
export const SEGMENTED_MAX = 30

/**
 * The quiz's one row of chrome and the bar under it (design review F8):
 * Quit, "3 of 12", the timer if timed, and More. Progress is said once in
 * words and once as the bar.
 */
export function ProgressBar({ current, total, onNavigate, flaggedIds, questionIds, isFlagged, leading, tools }: ProgressBarProps) {
  const segmented = total > 1 && total <= SEGMENTED_MAX
  const segments = useMemo(
    () => (segmented ? Array.from({ length: total }, (_, i) => ({ start: i + 1 })) : undefined),
    [segmented, total],
  )
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function onOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [open])

  // Scroll active item into view when dropdown opens
  useEffect(() => {
    if (!open || !listRef.current) return
    const active = listRef.current.querySelector<HTMLElement>('[data-active="true"]')
    active?.scrollIntoView({ block: 'nearest' })
  }, [open])

  function handleToggleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setOpen(false)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      // Focus first item after opening
      requestAnimationFrame(() => {
        const first = listRef.current?.querySelector<HTMLElement>('button')
        first?.focus()
      })
    }
  }

  function handleListKeyDown(e: React.KeyboardEvent) {
    const items = listRef.current ? Array.from(listRef.current.querySelectorAll<HTMLElement>('button')) : []
    const focused = document.activeElement as HTMLElement
    const idx = items.indexOf(focused)
    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      toggleRef.current?.focus()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      items[Math.min(idx + 1, items.length - 1)]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (idx === 0) {
        setOpen(false)
        toggleRef.current?.focus()
      } else {
        items[idx - 1]?.focus()
      }
    } else if (e.key === 'Home') {
      e.preventDefault()
      items[0]?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      items[items.length - 1]?.focus()
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1 text-base text-muted-foreground">
        {leading}
        {onNavigate ? (
          <div ref={containerRef} className="relative min-w-0">
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-haspopup="listbox"
              onClick={() => setOpen(o => !o)}
              onKeyDown={handleToggleKeyDown}
              className="flex min-h-[44px] items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-2 text-[15px] sm:text-base font-semibold tabular-nums text-foreground transition-colors hover:bg-accent"
            >
              <span className="sr-only">Question </span>{current} <span className="font-normal text-muted-foreground">of {total}</span>
              {isFlagged && <BookmarkCheck className="h-4 w-4 text-primary" aria-label="Flagged" data-testid="question-flagged" />}
              <ChevronDown className={cn('h-4 w-4 transition-transform text-muted-foreground', open && 'rotate-180')} />
            </button>

            {open && (
              <div
                ref={listRef}
                role="listbox"
                aria-label="Jump to question"
                onKeyDown={handleListKeyDown}
                className="absolute top-full left-0 mt-1 z-50 bg-popover rounded-lg shadow-lg max-h-72 overflow-y-auto min-w-[200px]"
              >
                {Array.from({ length: total }, (_, i) => {
                  const isItemFlagged = !!(flaggedIds && questionIds && flaggedIds.includes(questionIds[i] ?? ''))
                  const isCurrent = i === current - 1
                  return (
                    <button
                      key={i}
                      type="button"
                      role="option"
                      aria-selected={isCurrent}
                      aria-label={`Go to question ${i + 1}${isItemFlagged ? ' (flagged)' : ''}`}
                      data-active={isCurrent}
                      onClick={() => { onNavigate(i); setOpen(false) }}
                      className={cn(
                        'w-full text-left px-3 py-3 text-base flex items-center justify-between gap-4 transition-colors hover:bg-accent',
                        isCurrent && 'bg-accent font-semibold text-foreground'
                      )}
                    >
                      <span>Question {i + 1}</span>
                      {isItemFlagged && <span aria-hidden="true" className="text-xs">🚩</span>}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          <span className="px-1 font-medium">Question {current} of {total}</span>
        )}
        <div className="ml-auto flex shrink-0 items-center gap-1.5">{tools}</div>
      </div>
      {/* The bar is the second way to jump between questions, alongside the
          dropdown above it: press or drag along it to go straight to a question,
          which on a 60-question mock beats scrolling a 60-row list. Same control
          as every other progress bar in the app. */}
      <NavProgressBar
        current={current}
        total={total}
        label={`Question ${current} of ${total}`}
        trackClassName={segmented
          ? 'h-1.5 gap-1.5 group-hover:h-2 group-focus-visible:h-2'
          : 'h-1.5 rounded-full bg-secondary group-hover:h-2 group-focus-visible:h-2'}
        segmentClassName="rounded-full"
        segments={segments}
        fillClassName="bg-foreground dark:bg-foreground"
        onScrub={onNavigate ? position => onNavigate(position - 1) : undefined}
        formatValue={position => `Question ${position} of ${total}`}
      />
    </div>
  )
}
