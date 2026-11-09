import { useEffect, useRef } from 'react'
import { BookOpen, BookX, Eye, EyeOff, SlidersHorizontal, Timer, TimerOff } from 'lucide-react'
import type { Difficulty } from '@/lib/parser'
import { DIFFICULTY_LEVELS } from '@/lib/quizDifficulty'
import { difficultySummary } from '@/lib/quizSetup'
import { examAccentStyle } from '@/lib/examColors'
import { ExamLogo } from '@/components/ExamLogo'
import { BannerTile, InfoBanner, InfoSheet, NEUTRAL_BANNER } from '@/components/ui/InfoSheet'
import { Group, GroupRow } from '@/components/ui/GroupedList'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { cn } from '@/lib/utils'

/** The settings a quiz was started with — what the setup card's icons showed. */
export interface QuizSettings {
  levels: Difficulty[]
  timed: boolean
  /** Answers marked as each is confirmed, or held for the end. */
  revealDuring: boolean
  /** Concepts a question names can be tapped to read. */
  conceptLinks: boolean
}

/**
 * The quiz header's **settings** button: the setup card's four icons, small,
 * as one control, so the settings a quiz was started with stay in sight while
 * it runs. A tap opens `QuizSettingsDialog`, which reads them out. They are
 * chosen before a quiz starts, so the popup changes nothing.
 */
export function QuizSettingsButton({
  settings,
  open,
  onOpenChange,
  className,
}: {
  settings: QuizSettings
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
}) {
  const { levels, timed, revealDuring, conceptLinks } = settings
  const glyph = 'h-4 w-4'
  const off = 'opacity-40'
  return (
    <button
      type="button"
      data-testid="quiz-settings-button"
      onClick={() => onOpenChange(!open)}
      aria-label="Quiz settings"
      aria-haspopup="dialog"
      aria-expanded={open}
      title="Quiz settings"
      className={cn(
        'flex h-11 items-center gap-1.5 rounded-lg px-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        open && 'text-foreground',
        className,
      )}
    >
      <DifficultyBars levels={levels} size={16} />
      {timed ? <Timer className={glyph} aria-hidden /> : <TimerOff className={cn(glyph, off)} aria-hidden />}
      {revealDuring ? <Eye className={glyph} aria-hidden /> : <EyeOff className={cn(glyph, off)} aria-hidden />}
      {conceptLinks ? <BookOpen className={glyph} aria-hidden /> : <BookX className={cn(glyph, off)} aria-hidden />}
    </button>
  )
}

/** The popup: one row per setting, its value at the right and what it does under it. */
export function QuizSettingsDialog({
  settings,
  examKey,
  practiceExam,
  onClose,
}: {
  settings: QuizSettings
  /** The exam's progress key — the banner's logo and accent. */
  examKey?: string
  /** A practice exam rather than a quiz, for the banner's small line. */
  practiceExam?: boolean
  onClose: () => void
}) {
  const { levels, timed, revealDuring, conceptLinks } = settings
  const closeRef = useRef<HTMLButtonElement>(null)
  useSoundOnMount('open')
  useEffect(() => { closeRef.current?.focus() }, [])
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      e.preventDefault()
      onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const marker = 'h-4 w-4 text-muted-foreground'
  return (
    <InfoSheet
      onClose={onClose}
      labelledBy="quiz-settings-title"
      style={examKey ? examAccentStyle(examKey) : undefined}
    >
      <InfoBanner
        tile={examKey
          ? <ExamLogo examKey={examKey} size="md" />
          : <BannerTile><SlidersHorizontal className="h-5 w-5" /></BannerTile>}
        eyebrow={practiceExam ? 'This practice exam' : 'This quiz'}
        title="Quiz settings"
        titleId="quiz-settings-title"
        onClose={onClose}
        closeRef={closeRef}
        tint={examKey ? undefined : NEUTRAL_BANNER}
      />
      <Group footer="Settings are chosen on the quiz setup screen, before a quiz starts.">
        <GroupRow
          marker={<DifficultyBars levels={levels} size={16} className="text-muted-foreground" />}
          label="Difficulty"
          detail="The levels the questions are drawn from."
          value={difficultySummary(levels)}
        />
        <GroupRow
          marker={timed ? <Timer className={marker} aria-hidden /> : <TimerOff className={marker} aria-hidden />}
          label="Timer"
          detail={timed
            ? 'The clock counts down from the time the real exam allows for these questions, and keeps counting once it runs out.'
            : 'No clock.'}
          value={timed ? 'On' : 'Off'}
        />
        <GroupRow
          marker={revealDuring ? <Eye className={marker} aria-hidden /> : <EyeOff className={marker} aria-hidden />}
          label="Answers"
          detail={revealDuring
            ? 'Each answer is marked and explained as soon as you confirm it.'
            : 'Answers are marked together on the review, once you finish.'}
          value={revealDuring ? 'After each' : 'At the end'}
        />
        <GroupRow
          marker={conceptLinks ? <BookOpen className={marker} aria-hidden /> : <BookX className={marker} aria-hidden />}
          label="Concept links"
          detail={conceptLinks
            ? 'Concepts a question names are underlined. Tap one to read its page.'
            : 'Concepts in a question are plain text.'}
          value={conceptLinks ? 'On' : 'Off'}
        />
      </Group>
    </InfoSheet>
  )
}

/** Three rising bars, one per level, filled where the level is in the draw. */
export function DifficultyBars({
  levels,
  size = 22,
  className,
}: {
  levels: readonly Difficulty[]
  size?: number
  className?: string
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" className={className} aria-hidden>
      {DIFFICULTY_LEVELS.map((level, i) => {
        const h = 6 + i * 5
        return (
          <rect
            key={level}
            x={2.5 + i * 7}
            y={19 - h}
            width={4}
            height={h}
            rx={1}
            fill="currentColor"
            fillOpacity={levels.includes(level) ? 1 : 0}
            stroke="currentColor"
            strokeWidth={1.4}
          />
        )
      })}
    </svg>
  )
}
