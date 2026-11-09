import { useState, type ReactNode } from 'react'
import { Link2, Loader2, Monitor } from 'lucide-react'
import { DeckBackButton, DeckPrimaryButton, ExamDeckIcon, ExamSheet } from '@/components/battle/deck/DeckParts'
import { battleExamName, playerAccentStyle } from '@/lib/battleDisplay'
import { handLayout, type DeckMode } from '@/lib/battleDeck'
import { cn } from '@/lib/utils'

// **The start screen** (docs/quiz-battle-redesign.md §3.2): the title, the
// exam shown as a deck, and the three ways in as a hand of cards — Random
// opponent raised in the middle, the other two tilted either side. Tapping a
// side card raises it, and the button under the hand follows the raised card.
// The trophy and the record come with the battle record (phase 3).

const CARD: Record<DeckMode, { title: string; body: string; button: string; testid: string }> = {
  lobby: {
    title: 'Random opponent',
    body: '3 questions, each pairing a card from your hand with one of theirs. 2:00 each.',
    button: 'Find an opponent',
    testid: 'battle-mode-lobby',
  },
  local: {
    title: 'Same screen',
    body: 'Two players on one phone. First to buzz answers.',
    button: 'Play on this device',
    testid: 'battle-mode-local',
  },
  friend: {
    title: 'A friend',
    body: 'Send them a four-character room code.',
    button: 'Create a room',
    testid: 'battle-mode-host',
  },
}

function SplitTile() {
  return (
    <span aria-hidden className="relative block h-10 w-10 overflow-hidden rounded-xl">
      <span style={playerAccentStyle(0)} className="absolute inset-0 bg-[var(--player-vivid)]" />
      <span style={playerAccentStyle(1)} className="absolute inset-0 bg-[var(--player-vivid)] [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
    </span>
  )
}

const ICON: Record<DeckMode, ReactNode> = {
  lobby: <SplitTile />,
  local: <Monitor className="h-[26px] w-[26px]" aria-hidden />,
  friend: <Link2 className="h-[26px] w-[26px]" aria-hidden />,
}

function lobbyCountLine(count: number | null): string {
  if (count === null) return 'Checking the lobby…'
  if (count === 0) return 'No one’s in the lobby right now'
  return `${count} ${count === 1 ? 'player' : 'players'} waiting now`
}

export function DeckHome({
  exams,
  exam,
  onExamChange,
  lobbyCount,
  loading,
  onBack,
  backLabel,
  onGo,
}: {
  exams: readonly { exam: string; count: number }[]
  exam: string
  onExamChange: (exam: string) => void
  lobbyCount: number | null
  loading: boolean
  onBack: () => void
  backLabel: string
  onGo: (mode: DeckMode) => void
}) {
  const [raised, setRaised] = useState<DeckMode>('lobby')
  const [choosing, setChoosing] = useState(false)
  const layout = handLayout(raised)
  const place = (mode: DeckMode): 'left' | 'middle' | 'right' =>
    layout.middle === mode ? 'middle' : layout.left === mode ? 'left' : 'right'
  const go = CARD[raised]

  return (
    <div className="relative flex min-h-[calc(100dvh-3.5rem)] flex-col px-5 pb-7 pt-3 lg:min-h-screen" data-testid="battle-home">
      <div className="flex h-12 items-center justify-between">
        <DeckBackButton onClick={onBack} label={backLabel} />
      </div>

      <div className="mt-6 flex flex-col gap-3.5 px-1">
        <h1 className="deck-display text-[44px] leading-none tracking-[-.02em]">Quiz Battle</h1>
        {exam && (
          <button
            type="button"
            onClick={() => setChoosing(true)}
            className="flex items-center gap-3 self-start rounded-[14px] border border-[var(--deck-card-edge)] bg-[var(--deck-card)] py-2 pl-2 pr-4 text-left transition-colors hover:bg-[var(--deck-raised)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            data-testid="battle-exam-deck"
          >
            <ExamDeckIcon exam={exam} />
            <span className="flex flex-col">
              <span className="text-[15px] font-bold">{battleExamName(exam)} deck</span>
              <span className="text-xs text-[var(--deck-label)]">Change exam</span>
            </span>
          </button>
        )}
      </div>

      {/* The hand. Each card keeps its element as it moves, so a raise slides
          and turns it into place rather than redrawing the row. */}
      <div className="relative mx-auto mt-8 h-[300px] w-full max-w-[350px]" role="group" aria-label="How to play">
        {(['local', 'lobby', 'friend'] as const).map(mode => {
          const at = place(mode)
          const card = CARD[mode]
          const up = at === 'middle'
          return (
            <div
              key={mode}
              className={cn(
                'absolute top-0 transition-[left,transform,width,height] duration-300 ease-[cubic-bezier(0.25,0.6,0.3,1)]',
                up ? 'z-10 h-[270px] w-[190px]' : 'h-[214px] w-[150px]',
              )}
              style={{
                left: at === 'left' ? 0 : at === 'right' ? 'calc(100% - 150px)' : 'calc(50% - 95px)',
                transform: up ? 'none' : `translateY(64px) rotate(${at === 'left' ? -11 : 11}deg)`,
              }}
            >
              <div className={cn('h-full w-full', up && 'deck-float')}>
                <button
                  type="button"
                  aria-pressed={up}
                  onClick={() => setRaised(mode)}
                  data-sound="page"
                  data-testid={`battle-card-${mode}`}
                  className={cn(
                    'relative flex h-full w-full flex-col justify-between overflow-hidden text-left text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
                    up
                      ? 'rounded-[22px] border-[3px] border-white bg-[var(--deck-raised)] p-[18px] shadow-[0_24px_50px_rgba(0,0,0,.6),0_0_0_6px_rgba(255,255,255,.06)]'
                      : 'rounded-[18px] border-2 border-[var(--deck-card-edge)] bg-[var(--deck-card)] p-4 shadow-[0_16px_30px_rgba(0,0,0,.5)]',
                  )}
                >
                  {up && <span aria-hidden className="deck-sheen pointer-events-none absolute -top-10 left-0 h-[360px] w-[60px] bg-white/[.08]" />}
                  <span className="flex w-full items-center justify-between">
                    {ICON[mode]}
                    {up && mode === 'lobby' && <span className="text-[11px] font-bold tracking-[.1em] text-[var(--deck-label)]">ONLINE</span>}
                  </span>
                  <span>
                    <span className={cn('deck-display block leading-[1.05]', up ? 'text-[28px]' : 'text-xl')}>{card.title}</span>
                    <span className={cn('mt-1.5 block', up ? 'text-[13px] text-[var(--deck-soft)]' : 'text-xs text-[var(--deck-label)]')}>{card.body}</span>
                  </span>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-auto flex flex-col items-center gap-3 pt-6">
        <p className="flex items-center gap-2 text-[13px] text-[var(--deck-soft)]" data-testid="battle-lobby-status">
          <span aria-hidden className={cn('h-2 w-2 rounded-full', lobbyCount ? 'bg-green-500' : 'bg-[#6B6478]')} />
          {lobbyCountLine(lobbyCount)}
        </p>
        <DeckPrimaryButton
          onClick={() => onGo(raised)}
          disabled={loading || !exam}
          data-sound={raised === 'lobby' ? undefined : 'begin'}
          data-testid={go.testid}
        >
          {loading && <Loader2 className="h-5 w-5 animate-spin" aria-hidden />}
          {go.button}
        </DeckPrimaryButton>
      </div>

      {choosing && <ExamSheet exams={exams} current={exam} onPick={onExamChange} onClose={() => setChoosing(false)} />}
    </div>
  )
}
