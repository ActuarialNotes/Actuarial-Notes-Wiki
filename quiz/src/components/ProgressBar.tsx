import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'

interface ProgressBarProps {
  current: number   // 1-indexed
  total: number
  onNavigate?: (index: number) => void   // called with 0-based index
  flaggedIds?: string[]
  questionIds?: string[]
}

export function ProgressBar({ current, total, onNavigate, flaggedIds, questionIds }: ProgressBarProps) {
  const percentage = total > 0 ? Math.min(100, (current / total) * 100) : 0
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
    <div className="space-y-1">
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        {onNavigate ? (
          <div ref={containerRef} className="relative">
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-haspopup="listbox"
              onClick={() => setOpen(o => !o)}
              onKeyDown={handleToggleKeyDown}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border bg-muted/40 hover:bg-accent hover:text-foreground transition-colors text-sm font-medium"
            >
              Question {current} of {total}
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform text-muted-foreground', open && 'rotate-180')} />
            </button>

            {open && (
              <div
                ref={listRef}
                role="listbox"
                aria-label="Jump to question"
                onKeyDown={handleListKeyDown}
                className="absolute top-full left-0 mt-1 z-50 bg-popover border border-border rounded-md shadow-lg max-h-64 overflow-y-auto min-w-[190px]"
              >
                {Array.from({ length: total }, (_, i) => {
                  const isFlagged = !!(flaggedIds && questionIds && flaggedIds.includes(questionIds[i] ?? ''))
                  const isCurrent = i === current - 1
                  return (
                    <button
                      key={i}
                      type="button"
                      role="option"
                      aria-selected={isCurrent}
                      aria-label={`Go to question ${i + 1}${isFlagged ? ' (flagged)' : ''}`}
                      data-active={isCurrent}
                      onClick={() => { onNavigate(i); setOpen(false) }}
                      className={cn(
                        'w-full text-left px-3 py-2 text-sm flex items-center justify-between gap-4 transition-colors hover:bg-accent',
                        isCurrent && 'bg-accent font-semibold text-foreground'
                      )}
                    >
                      <span>Question {i + 1}</span>
                      {isFlagged && <span aria-hidden="true" className="text-xs">🚩</span>}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          <span>Question {current} of {total}</span>
        )}
        <span>{Math.round(percentage)}%</span>
      </div>
      <Progress value={percentage} className="h-2 [&>div]:bg-foreground" />
    </div>
  )
}
