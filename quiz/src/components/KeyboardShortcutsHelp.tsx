import { useEffect } from 'react'
import { Keyboard, X } from 'lucide-react'

interface ShortcutRow {
  keys: string[]
  description: string
}

const QUIZ_SHORTCUTS: ShortcutRow[] = [
  { keys: ['1', '2', '3', '4'], description: 'Select answer A / B / C / D' },
  { keys: ['Enter'], description: 'Confirm selected answer, or next question' },
  { keys: ['→'], description: 'Next question (after answering)' },
  { keys: ['←'], description: 'Previous question' },
  { keys: ['F'], description: 'Flag / unflag question' },
  { keys: ['M'], description: 'Mute / unmute sounds' },
  { keys: ['?'], description: 'Show this help' },
]

const FLASHCARD_SHORTCUTS: ShortcutRow[] = [
  { keys: ['Space'], description: 'Flip card' },
  { keys: ['1'], description: 'Again — keep card in rotation (after flip)' },
  { keys: ['2'], description: 'Got it — mark card complete (after flip)' },
  { keys: ['→'], description: 'Next card' },
  { keys: ['←'], description: 'Previous card' },
  { keys: ['S'], description: 'Shuffle deck' },
  { keys: ['F'], description: 'Toggle focus mode' },
  { keys: ['Esc'], description: 'Exit focus mode' },
  { keys: ['?'], description: 'Show this help' },
]

const GLOBAL_SHORTCUTS: ShortcutRow[] = [
  { keys: ['⌘K', 'Ctrl+K'], description: 'Go to Search' },
  { keys: ['Esc'], description: 'Close dialogs and modals' },
]

function Kbd({ label }: { label: string }) {
  return (
    <kbd className="inline-flex items-center justify-center min-w-[1.75rem] h-6 px-1.5 rounded border border-border bg-muted text-[11px] font-mono font-semibold text-muted-foreground shadow-sm">
      {label}
    </kbd>
  )
}

function ShortcutTable({ rows }: { rows: ShortcutRow[] }) {
  return (
    <table className="w-full text-sm">
      <tbody>
        {rows.map(row => (
          <tr key={row.description}>
            <td className="py-2 pr-4 w-px whitespace-nowrap">
              <span className="flex items-center gap-1 flex-wrap">
                {row.keys.map(k => <Kbd key={k} label={k} />)}
              </span>
            </td>
            <td className="py-2 text-muted-foreground">{row.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

interface KeyboardShortcutsHelpProps {
  context: 'quiz' | 'flashcards' | 'general'
  onClose: () => void
}

export function KeyboardShortcutsHelp({ context, onClose }: KeyboardShortcutsHelpProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' || e.key === '?') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-sm rounded-xl bg-background shadow-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Keyboard className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold">Keyboard Shortcuts</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {(context === 'quiz') && (
          <section>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Quiz</p>
            <ShortcutTable rows={QUIZ_SHORTCUTS} />
          </section>
        )}

        {context === 'flashcards' && (
          <section>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Flashcards</p>
            <ShortcutTable rows={FLASHCARD_SHORTCUTS} />
          </section>
        )}

        <section>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Global</p>
          <ShortcutTable rows={GLOBAL_SHORTCUTS} />
        </section>
      </div>
    </div>
  )
}
