import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { buildMasteryLookup } from '@/lib/conceptMatch'
import { keystoneProgress } from '@/lib/keystone'
import { useConceptMastery } from '@/hooks/useConceptMastery'
import type { MasteryState } from '@/lib/mastery'

// The keystone strip — where the idea gets introduced.
//
// Every other keystone surface is a marker on something the reader already
// found. This is the one place that names all of them for the exam in front of
// you, so the concept is discoverable rather than something you infer from a
// gold underline. It opens the learning objectives — the load-bearing few named
// before the reader starts down the syllabus — and is collapsed to
// its one-line header by default, so the panel is something you open when you
// want it rather than a wall between you and the page.

const COLLAPSE_KEY = 'keystone-strip-collapsed'

// Level dot colours track the mastery ladder (docs/concept-learning-progression.md).
const DOT: Record<MasteryState, string> = {
  new: 'bg-muted-foreground/30',
  level1: 'bg-green-300 dark:bg-green-900',
  level2: 'bg-green-400 dark:bg-green-700',
  level3: 'bg-green-500 dark:bg-green-500',
  forgotten: 'bg-amber-400 dark:bg-amber-500',
}

interface KeystoneStripProps {
  /** Exam progress key (`P`, `FM`, `MAS-I`, `5`). */
  examId: string
  /** Exam display name, e.g. "Exam 5 (CAS)". */
  examLabel: string
  /** Open a keystone in the concept popup. */
  onSelect: (conceptName: string) => void
}

export function KeystoneStrip({ examId, examLabel, onSelect }: KeystoneStripProps) {
  const { records } = useConceptMastery()
  // Collapsed unless the reader has opened it before ('0' = they expanded it).
  const [collapsed, setCollapsed] = useState(
    () => typeof window === 'undefined' || window.localStorage.getItem(COLLAPSE_KEY) !== '0',
  )

  const progress = useMemo(
    () => keystoneProgress(examId, buildMasteryLookup(records), new Date()),
    [examId, records],
  )

  if (progress.total === 0) return null

  function toggle() {
    setCollapsed(v => {
      try { window.localStorage.setItem(COLLAPSE_KEY, v ? '0' : '1') } catch { /* private mode */ }
      return !v
    })
  }

  const pct = progress.total ? Math.round((progress.mastered / progress.total) * 100) : 0

  return (
    <section className="keystone-ring rounded-lg p-4 my-6 not-prose" aria-label={`Keystone concepts for ${examLabel}`}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={!collapsed}
        className="w-full flex items-center gap-2 text-left"
      >
        <span className="text-base font-semibold">Keystone concepts</span>
        <span className="text-xs text-muted-foreground tabular-nums">
          {progress.mastered}/{progress.total}
        </span>
        <ChevronDown
          className={`ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform ${collapsed ? '' : 'rotate-180'}`}
        />
      </button>

      {!collapsed && (
        <>
          <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden" role="presentation">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{ width: `${pct}%`, backgroundImage: 'var(--keystone-gradient)' }}
            />
          </div>

          <ul className="mt-3 flex flex-wrap gap-1.5">
            {progress.entries.map(({ concept, state }) => (
              <li key={concept.name}>
                <button
                  type="button"
                  onClick={() => onSelect(concept.name)}
                  title={concept.why}
                  className="inline-flex items-center gap-1.5 rounded-full bg-card/70 px-2.5 py-1 text-sm hover:bg-accent transition-colors"
                >
                  <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${DOT[state]}`} aria-hidden="true" />
                  {concept.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
