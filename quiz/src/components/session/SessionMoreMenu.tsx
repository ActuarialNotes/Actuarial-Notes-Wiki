import type { ReactNode } from 'react'
import { Bookmark, BookmarkCheck, ChevronLeft, Info, Keyboard, Sheet, SlidersHorizontal, Volume2, VolumeX } from 'lucide-react'
import { Popup, PopupTitle } from '@/components/ui/Popup'
import { cn } from '@/lib/utils'

// "More" on the question screen (docs/redesign-spec.md §5.1): everything that
// used to be an icon above the question. Flag, question info (with its Fact
// Check), the spreadsheet, sound, and the quiz's settings with the timer's.

function Row({ icon, label, value, onClick, className, ...rest }: {
  icon: ReactNode
  label: string
  /** The setting as it stands, at the right. */
  value?: string
  onClick: () => void
  className?: string
  'aria-pressed'?: boolean
  'data-sound'?: string
}) {
  return (
    <li className={cn('border-b border-border last:border-b-0', className)}>
      <button
        type="button"
        onClick={onClick}
        {...rest}
        className="flex min-h-[56px] w-full items-center gap-3.5 text-left text-[17px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
      >
        <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center">{icon}</span>
        <span className="min-w-0 flex-1">{label}</span>
        {value && <span className="shrink-0 text-base font-normal">{value}</span>}
      </button>
    </li>
  )
}

export function SessionMoreMenu({
  onClose,
  flagged,
  onFlag,
  onInfo,
  spreadsheet,
  soundOn,
  onSound,
  onSettings,
  onShortcuts,
  onPrevious,
}: {
  onClose: () => void
  flagged: boolean
  onFlag: () => void
  onInfo: () => void
  /** The exam is sat with a spreadsheet: whether its pane is open, and the toggle. */
  spreadsheet?: { open: boolean; onToggle: () => void }
  soundOn: boolean
  onSound: () => void
  onSettings: () => void
  onShortcuts: () => void
  /** Go back a question; absent on the first. */
  onPrevious?: () => void
}) {
  const icon = 'h-[22px] w-[22px]'
  const then = (act: () => void) => () => { onClose(); act() }
  return (
    <Popup onClose={onClose} labelledBy="session-more-title">
      <PopupTitle id="session-more-title" className="sr-only">More</PopupTitle>
      <ul className="-my-2 flex flex-col">
        <Row
          icon={flagged ? <BookmarkCheck className={icon} /> : <Bookmark className={icon} />}
          label={flagged ? 'Remove flag' : 'Flag question'}
          aria-pressed={flagged}
          onClick={then(onFlag)}
        />
        <Row icon={<Info className={icon} />} label="Question info" onClick={then(onInfo)} />
        {spreadsheet && (
          <Row
            icon={<Sheet className={icon} />}
            label={spreadsheet.open ? 'Close the spreadsheet' : 'Open in spreadsheet'}
            aria-pressed={spreadsheet.open}
            onClick={then(spreadsheet.onToggle)}
          />
        )}
        <Row
          icon={soundOn ? <Volume2 className={icon} /> : <VolumeX className={icon} />}
          label="Sound"
          value={soundOn ? 'On' : 'Off'}
          aria-pressed={soundOn}
          data-sound="none"
          onClick={onSound}
        />
        <Row icon={<SlidersHorizontal className={icon} />} label="Quiz settings" onClick={then(onSettings)} />
        <Row icon={<Keyboard className={icon} />} label="Keyboard shortcuts" onClick={then(onShortcuts)} className="hidden sm:block" />
        {onPrevious && (
          <Row icon={<ChevronLeft className={icon} />} label="Previous question" onClick={then(onPrevious)} />
        )}
      </ul>
    </Popup>
  )
}
