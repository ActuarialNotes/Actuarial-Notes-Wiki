import { useEffect, useId, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Headphones, Loader2, Pause, Play, RotateCcw, RotateCw, X } from 'lucide-react'
import { usePodcast, PODCAST_RATES, type PodcastEpisode } from '@/stores/podcastStore'
import { chapterIndexAt, clockLabel, type EpisodeChapter } from '@/lib/podcast'
import { wikiRoute } from '@/lib/wikiRoutes'
import { cn } from '@/lib/utils'

/**
 * The daily podcast's player (docs/daily-podcast.md): a pill in the resume
 * dock while an episode is loaded, and above it, when open, the episode — its
 * controls, a scrubber and one row per chapter. The audio itself is the
 * store's (stores/podcastStore.ts), so it keeps playing as the reader moves
 * around the app; this is only a view of it.
 */
export function PodcastPlayer() {
  const episode = usePodcast(s => s.episode)
  const panelOpen = usePodcast(s => s.panelOpen)
  const closePanel = usePodcast(s => s.closePanel)
  const openPanel = usePodcast(s => s.openPanel)
  const rootRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  useEffect(() => {
    if (!panelOpen) return
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) closePanel()
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      closePanel()
      pillRef.current?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [panelOpen, closePanel])

  if (!episode) return null

  return (
    <div ref={rootRef} className="flex flex-col items-center gap-2 pointer-events-auto" data-testid="podcast-player">
      {panelOpen && <EpisodePanel id={panelId} episode={episode} />}
      <Pill
        pillRef={pillRef}
        episode={episode}
        expanded={panelOpen}
        controls={panelId}
        onOpen={() => (panelOpen ? closePanel() : openPanel())}
      />
    </div>
  )
}

function chapterLabel(c: EpisodeChapter): string {
  if (c.kind !== 'bridge') return c.name
  return c.name === 'intro' ? 'Intro' : c.name === 'outro' ? 'Wrap-up' : 'Worth a refresher'
}

function Pill({
  pillRef, episode, expanded, controls, onOpen,
}: {
  pillRef: React.RefObject<HTMLButtonElement>
  episode: PodcastEpisode
  expanded: boolean
  controls: string
  onOpen: () => void
}) {
  const status = usePodcast(s => s.status)
  const playing = usePodcast(s => s.playing)
  const time = usePodcast(s => s.time)
  const toggle = usePodcast(s => s.toggle)
  const chapter = episode.chapters[chapterIndexAt(episode.chapters, time)]

  return (
    <div className="inline-flex h-11 items-center rounded-full border border-border bg-card pl-1.5 pr-1 text-sm font-medium text-foreground shadow-lg">
      <button
        type="button"
        onClick={toggle}
        disabled={status !== 'ready'}
        aria-label={playing ? 'Pause' : 'Play'}
        data-sound="none"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {status === 'loading'
          ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          : playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4 translate-x-px" aria-hidden />}
      </button>
      <button
        ref={pillRef}
        type="button"
        onClick={onOpen}
        aria-expanded={expanded}
        aria-haspopup="dialog"
        aria-controls={expanded ? controls : undefined}
        className="flex h-9 min-w-0 max-w-[14rem] items-center gap-2 rounded-full px-2.5 hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="truncate">{status === 'error' ? "Couldn't load the episode" : chapter ? chapterLabel(chapter) : "Today's episode"}</span>
        <span className="shrink-0 tabular-nums text-muted-foreground">{clockLabel(episode.seconds - time)}</span>
      </button>
    </div>
  )
}

function EpisodePanel({ id, episode }: { id: string; episode: PodcastEpisode }) {
  const status = usePodcast(s => s.status)
  const playing = usePodcast(s => s.playing)
  const time = usePodcast(s => s.time)
  const rate = usePodcast(s => s.rate)
  const toggle = usePodcast(s => s.toggle)
  const seek = usePodcast(s => s.seek)
  const skip = usePodcast(s => s.skip)
  const setRate = usePodcast(s => s.setRate)
  const goToChapter = usePodcast(s => s.goToChapter)
  const closePanel = usePodcast(s => s.closePanel)
  const stop = usePodcast(s => s.stop)
  const headingId = useId()
  const current = chapterIndexAt(episode.chapters, time)
  const ready = status === 'ready'
  const nextRate = PODCAST_RATES[(PODCAST_RATES.indexOf(rate as typeof PODCAST_RATES[number]) + 1) % PODCAST_RATES.length]

  return (
    <div
      id={id}
      role="dialog"
      aria-labelledby={headingId}
      className="w-[min(22rem,calc(100vw-2rem))] rounded-lg border border-border bg-popover text-popover-foreground shadow-md"
    >
      <div className="flex items-start gap-3 p-4 pb-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Headphones className="h-4 w-4" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <h2 id={headingId} className="text-sm font-semibold">Today's episode · {episode.examLabel}</h2>
          {episode.facts.length > 0 && <p className="text-xs text-muted-foreground">{episode.facts.join(' · ')}</p>}
        </div>
        <button
          type="button"
          onClick={stop}
          aria-label="Close the player"
          className="-mr-1 -mt-1 rounded p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="px-4">
        <input
          type="range"
          min={0}
          max={Math.max(1, Math.round(episode.seconds))}
          step={1}
          value={Math.min(time, episode.seconds)}
          onChange={e => seek(Number(e.target.value))}
          disabled={!ready}
          aria-label="Position"
          aria-valuetext={`${clockLabel(time)} of ${clockLabel(episode.seconds)}`}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs tabular-nums text-muted-foreground">
          <span>{clockLabel(time)}</span>
          <span>{clockLabel(episode.seconds)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 px-4 py-2">
        <button type="button" onClick={() => setRate(nextRate)} className="w-12 rounded px-1 py-1 text-xs font-semibold tabular-nums text-muted-foreground hover:text-foreground" aria-label={`Speed ${rate}×. Change speed`}>
          {rate}×
        </button>
        <button type="button" onClick={() => skip(-15)} disabled={!ready} aria-label="Back 15 seconds" className="rounded-full p-2 text-foreground hover:bg-accent disabled:opacity-40">
          <RotateCcw className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={toggle}
          disabled={!ready}
          aria-label={playing ? 'Pause' : 'Play'}
          data-sound="none"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow disabled:opacity-60"
        >
          {status === 'loading'
            ? <Loader2 className="h-5 w-5 animate-spin" />
            : playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" />}
        </button>
        <button type="button" onClick={() => skip(15)} disabled={!ready} aria-label="Forward 15 seconds" className="rounded-full p-2 text-foreground hover:bg-accent disabled:opacity-40">
          <RotateCw className="h-5 w-5" />
        </button>
        <span className="w-12" aria-hidden />
      </div>

      {status === 'error' && (
        <p className="px-4 pb-2 text-sm text-destructive">The episode didn't load. Check your connection and try again from the Dashboard.</p>
      )}

      <ol className="max-h-56 overflow-y-auto border-t border-border px-2 py-2" aria-label="Chapters">
        {episode.chapters.map((c, i) => (
          <li key={`${c.kind}-${c.name}`} className={cn('flex items-center gap-2 rounded-md', i === current && 'bg-accent')}>
            <button
              type="button"
              onClick={() => goToChapter(i)}
              disabled={!ready}
              aria-current={i === current ? 'true' : undefined}
              className={cn(
                'flex min-w-0 flex-1 items-center gap-2 px-2 py-1.5 text-left text-sm',
                c.kind === 'bridge' && 'text-muted-foreground',
                c.kind === 'refresher' && 'pl-5',
              )}
            >
              <span className="min-w-0 flex-1 truncate">{chapterLabel(c)}</span>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{clockLabel(c.start)}</span>
            </button>
            {c.kind !== 'bridge' && (
              <Link
                to={wikiRoute({ kind: 'concept', name: c.name })}
                onClick={closePanel}
                className="shrink-0 rounded px-2 py-1 text-xs font-medium text-primary hover:underline"
              >
                Read
              </Link>
            )}
          </li>
        ))}
      </ol>

      {episode.unread.length > 0 && (
        <div className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
          <span>Not in this episode: </span>
          {episode.unread.map((name, i) => (
            <span key={name}>
              {i > 0 && ', '}
              <Link to={wikiRoute({ kind: 'concept', name })} onClick={closePanel} className="text-foreground underline-offset-2 hover:underline">{name}</Link>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
