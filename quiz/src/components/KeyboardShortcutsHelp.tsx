import { useEffect } from 'react'
import { Keyboard } from 'lucide-react'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { Group, GroupRow } from '@/components/ui/GroupedList'
import { BannerTile, InfoBanner, InfoSheet, NEUTRAL_BANNER } from '@/components/ui/InfoSheet'

interface ShortcutRow {
  keys: string[]
  description: string
}

interface ShortcutGroup {
  title: string
  rows: ShortcutRow[]
}

const QUIZ_SHORTCUTS: ShortcutGroup[] = [
  {
    title: 'Answering',
    rows: [
      { keys: ['1', '2', '3', '4'], description: 'Pick answer A–D' },
      { keys: ['Enter'], description: 'Confirm, then next' },
      { keys: ['→'], description: 'Next question' },
      { keys: ['←'], description: 'Previous question' },
    ],
  },
  {
    title: 'The question',
    rows: [
      { keys: ['F'], description: 'Flag' },
      { keys: ['I'], description: 'Where it came from' },
      { keys: ['M'], description: 'Mute sounds' },
    ],
  },
]

const FLASHCARD_SHORTCUTS: ShortcutGroup[] = [
  {
    title: 'Studying',
    rows: [
      { keys: ['Space'], description: 'Flip card' },
      { keys: ['1'], description: 'Again (after flip)' },
      { keys: ['2'], description: 'Got it (after flip)' },
      { keys: ['→'], description: 'Next card' },
      { keys: ['←'], description: 'Previous card' },
    ],
  },
  {
    title: 'The deck',
    rows: [
      { keys: ['S'], description: 'Shuffle' },
      { keys: ['F'], description: 'Focus mode' },
      { keys: ['Esc'], description: 'Leave focus mode' },
    ],
  },
]

const GLOBAL_SHORTCUTS: ShortcutRow[] = [
  { keys: ['⌘K', 'Ctrl K'], description: 'Search' },
  { keys: ['Esc'], description: 'Close a dialog' },
]

/** `?` opens this help on the quiz and flashcard pages, which bind it. */
const HELP_SHORTCUT: ShortcutRow = { keys: ['?'], description: 'Show this help' }

function Kbd({ label }: { label: string }) {
  return (
    <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-muted px-1.5 font-mono text-[11px] font-semibold text-foreground/90 shadow-[inset_0_-1px_0_hsl(var(--foreground)/0.08)]">
      {label}
    </kbd>
  )
}

function ShortcutGroupList({ title, rows }: ShortcutGroup) {
  return (
    <Group label={title}>
      {rows.map(row => (
        <GroupRow
          key={row.description}
          label={row.description}
          value={<span className="flex gap-1">{row.keys.map(k => <Kbd key={k} label={k} />)}</span>}
          className="py-2"
        />
      ))}
    </Group>
  )
}

interface KeyboardShortcutsHelpProps {
  context: 'quiz' | 'flashcards' | 'general'
  onClose: () => void
}

export function KeyboardShortcutsHelp({ context, onClose }: KeyboardShortcutsHelpProps) {
  // Paper: the panel sliding in.
  useSoundOnMount('open')
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

  const groups = context === 'quiz' ? QUIZ_SHORTCUTS : context === 'flashcards' ? FLASHCARD_SHORTCUTS : []
  const anywhere = context === 'general' ? GLOBAL_SHORTCUTS : [...GLOBAL_SHORTCUTS, HELP_SHORTCUT]

  return (
    <InfoSheet onClose={onClose} labelledBy="shortcuts-title">
      <InfoBanner
        tile={<BannerTile><Keyboard className="h-5 w-5" /></BannerTile>}
        title="Keyboard shortcuts"
        titleId="shortcuts-title"
        onClose={onClose}
        tint={NEUTRAL_BANNER}
      />
      {groups.map(g => <ShortcutGroupList key={g.title} {...g} />)}
      <ShortcutGroupList title="Anywhere" rows={anywhere} />
    </InfoSheet>
  )
}
