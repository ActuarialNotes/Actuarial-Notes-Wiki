import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import katex from 'katex'
import { Loader2, Pause, Play, SkipBack, SkipForward, Sparkles, Volume2 } from 'lucide-react'
import { buildListenContent, toSegments, type InlineToken, type ListenBlock } from '@/lib/listenTokens'
import { useListenSpeech } from '@/hooks/useListenSpeech'

interface Props {
  markdown: string
}

const RATES = [0.75, 1, 1.25] as const

export function ListenView({ markdown }: Props) {
  const { blocks, tokens } = useMemo(() => buildListenContent(markdown), [markdown])
  const segments = useMemo(() => toSegments(blocks), [blocks])
  const [rate, setRate] = useState(1)
  const { status, activeIndex, engine, play, pause, resume, rewind, restartCurrent, skipForward } = useListenSpeech(segments, rate)
  const containerRef = useRef<HTMLDivElement>(null)
  const didMountRef = useRef(false)

  // Pre-render KaTeX HTML for every math token once.
  const mathHtml = useMemo(() => {
    const map = new Map<number, string>()
    for (const t of tokens) {
      if (t.type === 'math') {
        map.set(t.index, katex.renderToString(t.latex, { displayMode: t.display, throwOnError: false }))
      }
    }
    return map
  }, [tokens])

  // Auto-play from the top whenever the concept (its segments) changes.
  useEffect(() => {
    play()
  }, [segments, play])

  // Changing speed continues from the current paragraph (Web Speech can't
  // re-rate a live utterance, so we replay the current one at the new speed).
  // Skip the initial mount so this doesn't double-trigger with the segments effect.
  useEffect(() => {
    if (!didMountRef.current) { didMountRef.current = true; return }
    restartCurrent()
  }, [rate, restartCurrent])

  // Keep the spoken word in view.
  useEffect(() => {
    if (activeIndex == null) return
    const el = containerRef.current?.querySelector<HTMLElement>(`[data-tok="${activeIndex}"]`)
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [activeIndex])

  const onToggle = () => {
    if (status === 'playing') pause()
    else if (status === 'paused') resume()
    else play()
  }

  if (status === 'unsupported') {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground">
        <Volume2 className="h-8 w-8 opacity-30" />
        <span className="text-sm">Text-to-speech isn't supported in this browser.</span>
      </div>
    )
  }

  return (
    <div>
      {/* Control bar */}
      <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 mb-3 flex items-center gap-2 bg-card/95 backdrop-blur">
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
          title={status === 'playing' ? 'Pause' : status === 'paused' ? 'Resume' : 'Play'}
          aria-label={status === 'playing' ? 'Pause' : 'Play'}
        >
          {status === 'loading'
            ? <Loader2 className="h-4 w-4 animate-spin" />
            : status === 'playing'
            ? <Pause className="h-4 w-4" />
            : <Play className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={() => rewind()}
          className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-background hover:bg-accent text-foreground shrink-0"
          title="Previous paragraph"
          aria-label="Previous paragraph"
        >
          <SkipBack className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => skipForward()}
          className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-background hover:bg-accent text-foreground shrink-0"
          title="Next paragraph"
          aria-label="Next paragraph"
        >
          <SkipForward className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1 ml-1">
          {RATES.map(r => (
            <button
              key={r}
              type="button"
              onClick={() => setRate(r)}
              className={`text-xs px-1.5 py-1 rounded-md tabular-nums transition-colors ${
                rate === r ? 'bg-accent font-semibold text-foreground' : 'text-muted-foreground hover:bg-accent/60'
              }`}
              title={`Speed ${r}×`}
            >
              {r}×
            </button>
          ))}
        </div>
        <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-muted-foreground shrink-0">
          {engine === 'premium'
            ? <><Sparkles className="h-3 w-3" /> Premium voice</>
            : <><Volume2 className="h-3 w-3" /> Browser voice</>}
        </span>
      </div>

      {/* Reading area */}
      <div
        ref={containerRef}
        className="prose dark:prose-invert max-w-none prose-p:my-2.5 prose-p:leading-relaxed prose-headings:font-semibold"
        aria-live="off"
      >
        {blocks.map((block, i) => (
          <Block key={i} block={block} activeIndex={activeIndex} mathHtml={mathHtml} />
        ))}
      </div>
    </div>
  )
}

function Block({
  block,
  activeIndex,
  mathHtml,
}: {
  block: ListenBlock
  activeIndex: number | null
  mathHtml: Map<number, string>
}) {
  const inner = block.tokens.map(token => (
    <Token key={token.index} token={token} active={token.index === activeIndex} mathHtml={mathHtml} />
  ))

  switch (block.kind) {
    case 'h1': return <h1>{inner}</h1>
    case 'h2': return <h2>{inner}</h2>
    case 'h3': return <h3>{inner}</h3>
    case 'math': return <div className="my-4 text-center overflow-x-auto">{inner}</div>
    case 'li':
      return (
        <div className="flex gap-2 my-1" style={{ paddingLeft: `${(block.depth ?? 0) * 1.25 + 0.25}rem` }}>
          <span className="text-muted-foreground select-none shrink-0">•</span>
          <div className="flex-1">{inner}</div>
        </div>
      )
    default: return <p>{inner}</p>
  }
}

function Token({
  token,
  active,
  mathHtml,
}: {
  token: InlineToken
  active: boolean
  mathHtml: Map<number, string>
}) {
  const cls = `tts-tok${active ? ' tts-tok--active' : ''}`
  if (token.type === 'math') {
    return (
      <Fragment>
        <span
          data-tok={token.index}
          className={cls}
          dangerouslySetInnerHTML={{ __html: mathHtml.get(token.index) ?? '' }}
        />
        {!token.display && ' '}
      </Fragment>
    )
  }
  return (
    <Fragment>
      <span data-tok={token.index} className={cls}>{token.text}</span>{' '}
    </Fragment>
  )
}
