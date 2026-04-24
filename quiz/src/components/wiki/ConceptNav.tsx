import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { wikiRoute } from '@/lib/wikiRoutes'
import type { WikiConcept, WikiExamSyllabus } from '@/lib/wikiParser'

export interface ConceptNavProps {
  conceptName: string
  // Full syllabus for the exam this concept belongs to; used to locate prev,
  // next, and sibling concepts under the same learning objective.
  syllabus: WikiExamSyllabus | null
  // Short exam id ("p-1") — used to append ?from=<id> to nav links so the
  // destination concept knows which exam context to use.
  fromExamId: string | null
}

interface Position {
  topicName: string
  topicIdx: number
  conceptIdx: number
  concepts: WikiConcept[]
}

function findPosition(syllabus: WikiExamSyllabus | null, name: string): Position | null {
  if (!syllabus) return null
  for (let t = 0; t < syllabus.topics.length; t++) {
    const topic = syllabus.topics[t]
    const idx = topic.concepts.findIndex(c => c.name.toLowerCase() === name.toLowerCase())
    if (idx >= 0) {
      return { topicName: topic.name, topicIdx: t, conceptIdx: idx, concepts: topic.concepts }
    }
  }
  return null
}

function flattenConcepts(syllabus: WikiExamSyllabus | null): WikiConcept[] {
  if (!syllabus) return []
  return syllabus.topics.flatMap(t => t.concepts)
}

export function ConceptNav({ conceptName, syllabus, fromExamId }: ConceptNavProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  // Close on Escape or outside click so the menu behaves like a real popover.
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    function onClick(e: MouseEvent) {
      const target = e.target as Node
      if (menuRef.current?.contains(target) || buttonRef.current?.contains(target)) return
      setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  const { prev, next, position } = useMemo(() => {
    const pos = findPosition(syllabus, conceptName)
    const flat = flattenConcepts(syllabus)
    const flatIdx = flat.findIndex(c => c.name.toLowerCase() === conceptName.toLowerCase())
    const prev = flatIdx > 0 ? flat[flatIdx - 1] : null
    const next = flatIdx >= 0 && flatIdx < flat.length - 1 ? flat[flatIdx + 1] : null
    return { prev, next, position: pos }
  }, [syllabus, conceptName])

  function linkToConcept(c: WikiConcept): string {
    const route = wikiRoute({ kind: 'concept', name: c.name })
    return fromExamId ? `${route}?from=${encodeURIComponent(fromExamId)}` : route
  }

  return (
    <nav
      className="sticky bottom-0 mt-8 -mx-4 sm:-mx-6 border-t bg-background/95 backdrop-blur px-3 sm:px-4 py-2 flex items-center gap-2"
      aria-label="Concept navigation"
    >
      <div className="flex-1 min-w-0">
        {prev ? (
          <Link
            to={linkToConcept(prev)}
            className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-foreground truncate"
          >
            <ChevronLeft className="h-4 w-4 shrink-0" />
            <span className="truncate">{prev.name}</span>
          </Link>
        ) : (
          <span className="text-xs text-muted-foreground/60">—</span>
        )}
      </div>

      {/* Current pill with objectives dropdown */}
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen(v => !v)}
          disabled={!position}
          aria-expanded={open}
          aria-haspopup="menu"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border bg-accent/40 text-sm font-medium disabled:cursor-default disabled:opacity-80"
        >
          <span className="truncate max-w-[180px]">{conceptName}</span>
          {position && (
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
            />
          )}
        </button>
        {open && position && (
          <div
            ref={menuRef}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-md border bg-popover text-popover-foreground shadow-lg p-1"
            role="menu"
          >
            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
              {position.topicName}
            </div>
            <ul className="max-h-64 overflow-y-auto">
              {position.concepts.map((c, i) => {
                const active = i === position.conceptIdx
                return (
                  <li key={`${c.name}-${i}`}>
                    <Link
                      to={linkToConcept(c)}
                      onClick={() => setOpen(false)}
                      className={
                        'flex items-center gap-2 px-2 py-1.5 rounded text-sm hover:bg-accent/60 ' +
                        (active ? 'bg-accent font-medium' : '')
                      }
                      role="menuitem"
                    >
                      <span className="tabular-nums text-xs text-muted-foreground w-5 shrink-0">
                        {i + 1}.
                      </span>
                      <span className="truncate">{c.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 text-right">
        {next ? (
          <Link
            to={linkToConcept(next)}
            className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-foreground truncate justify-end"
          >
            <span className="truncate">{next.name}</span>
            <ChevronRight className="h-4 w-4 shrink-0" />
          </Link>
        ) : (
          <span className="text-xs text-muted-foreground/60">—</span>
        )}
      </div>
    </nav>
  )
}
