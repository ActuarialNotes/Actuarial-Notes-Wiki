import { useEffect, useId, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Shuffle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBattleQueueStore } from '@/stores/battleQueueStore'
import { useBattleQueueSnapshot, useBattleQueueVisible } from '@/hooks/useResumeDock'
import { waitedClock } from '@/lib/battleQueue'

/**
 * The way back into the Quiz Battle queue: a pill on the bottom edge of every
 * page while the player is waiting for an opponent and the lobby isn't on
 * screen — the queue's own "Return to quiz" (components/QuizResumeButton.tsx).
 *
 * Their place is held by stores/battleQueueStore.ts, so they can go and read
 * while they wait. The pill says how long they have been waiting; pressing it
 * asks what to do: **Return** to the lobby, or **Leave** the queue. When an
 * opponent is found they are taken to the battle wherever they are.
 */
export function BattleQueueButton() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const snapshot = useBattleQueueSnapshot()
  const path = useBattleQueueStore(s => s.path)
  const leaveQueue = useBattleQueueStore(s => s.leaveQueue)
  const summon = useBattleQueueStore(s => s.summon)
  const visible = useBattleQueueVisible()
  const since = snapshot?.me?.since ?? null

  const [open, setOpen] = useState(false)
  const [now, setNow] = useState(() => Date.now())
  const rootRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLButtonElement>(null)
  const returnRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()
  const headingId = useId()

  // Measured from the wall clock, so a tab left in the background still reads true.
  useEffect(() => {
    if (!visible) return
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [visible])

  // A page change or the queue ending closes the choice.
  useEffect(() => { setOpen(false) }, [pathname, visible])

  useEffect(() => {
    if (!open) return
    returnRef.current?.focus()
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      setOpen(false)
      pillRef.current?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  if (!visible || since === null) return null

  const clock = waitedClock(since, now)

  function handleReturn() {
    setOpen(false)
    summon()
    if (pathname !== path) navigate(path)
  }

  function handleLeave() {
    setOpen(false)
    leaveQueue()
  }

  return (
    <div ref={rootRef} className="flex flex-col items-center gap-2 pointer-events-auto" data-testid="battle-queue">
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-labelledby={headingId}
          className="w-64 rounded-lg border border-border bg-popover text-popover-foreground p-4 shadow-md space-y-3"
        >
          <div className="space-y-0.5">
            <h2 id={headingId} className="text-sm font-semibold">Looking for an opponent</h2>
            <p className="text-xs text-muted-foreground">You’ll be taken to the battle when you’re matched.</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleLeave} className="text-destructive hover:text-destructive">
              Leave
            </Button>
            <Button ref={returnRef} size="sm" onClick={handleReturn}>
              Return
            </Button>
          </div>
        </div>
      )}

      <button
        ref={pillRef}
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? panelId : undefined}
        className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-3.5 text-sm font-medium text-foreground shadow-lg transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
      >
        <Shuffle className="h-4 w-4 shrink-0 text-primary" aria-hidden />
        <span>Return to lobby</span>
        <span role="timer" aria-label={`waiting ${clock}`} className="tabular-nums text-muted-foreground">
          {clock}
        </span>
      </button>
    </div>
  )
}
