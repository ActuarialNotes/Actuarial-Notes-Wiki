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

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        {onNavigate ? (
          <div ref={containerRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen(o => !o)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border bg-muted/40 hover:bg-accent hover:text-foreground transition-colors text-sm font-medium"
            >
              Question {current} of {total}
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform text-muted-foreground', open && 'rotate-180')} />
            </button>

            {open && (
              <div
                ref={listRef}
                className="absolute top-full left-0 mt-1 z-50 bg-popover border border-border rounded-md shadow-lg max-h-64 overflow-y-auto min-w-[190px]"
              >
                {Array.from({ length: total }, (_, i) => {
                  const isFlagged = !!(flaggedIds && questionIds && flaggedIds.includes(questionIds[i] ?? ''))
                  const isCurrent = i === current - 1
                  return (
                    <button
                      key={i}
                      type="button"
                      data-active={isCurrent}
                      onClick={() => { onNavigate(i); setOpen(false) }}
                      className={cn(
                        'w-full text-left px-3 py-2 text-sm flex items-center justify-between gap-4 transition-colors hover:bg-accent',
                        isCurrent && 'bg-accent font-semibold text-foreground'
                      )}
                    >
                      <span>Question {i + 1}</span>
                      {isFlagged && <span className="text-xs">🚩</span>}
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
