/**
 * An interactive replacement for the static distribution illustrations in the
 * vault (`Media/*_pdf.svg`, `Media/*_pmf.svg`).
 *
 * Instead of four frozen curves, the student gets the live distribution: every
 * parameter on a slider, the mean/SD/skewness recomputed as they drag, a
 * PDF↔CDF switch, and a Monte-Carlo simulation that draws variates and stacks
 * them into a histogram over the theoretical shape — so "the sample mean
 * converges to E[X]" is something they watch happen rather than read.
 *
 * The whole card is meant to fit a phone screen without scrolling, so the
 * chrome is kept to a minimum: the view switch and reset ride beside the title,
 * three stat tiles across, and simulation is a single button that keeps adding
 * draws.
 *
 * The maths lives in `lib/distributions.ts` + `lib/distributionPlot.ts`; this
 * file is state and layout only.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { DistributionPlot } from '@/components/wiki/DistributionPlot'
import { createRng, type Rng } from '@/lib/distributionMath'
import {
  defaultParams,
  paramMax,
  type DistParams,
  type DistributionSpec,
} from '@/lib/distributions'
import { drawSamples, formatKpi, formatStat, summarizeSamples } from '@/lib/distributionPlot'

/**
 * How many variates one press of "Simulate" draws. Fixed, and deliberately not
 * printed anywhere in the UI: the readout is the running total, so pressing the
 * button reads as "more draws" rather than as a batch-size setting.
 */
const DRAW_BATCH = 100
/** Frames the animated draw is spread over (skipped under reduced motion). */
const DRAW_FRAMES = 24

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

export interface DistributionSimulatorProps {
  spec: DistributionSpec
  /** Caption carried over from the markdown embed, if any. */
  caption?: string
  /** Taller plot for the full-screen gallery. */
  size?: 'inline' | 'full'
  className?: string
}

export function DistributionSimulator({ spec, caption, size = 'inline', className }: DistributionSimulatorProps) {
  const [params, setParams] = useState<DistParams>(() => defaultParams(spec))
  const [view, setView] = useState<'pdf' | 'cdf'>('pdf')
  const [samples, setSamples] = useState<number[]>([])

  const rngRef = useRef<Rng>(createRng(Date.now() & 0x7fffffff))
  const frameRef = useRef<number | null>(null)
  /** The live pile of draws; the state copy is what the plot renders. */
  const samplesRef = useRef<number[]>([])
  /** Draws still owed to the animation — one press adds `DRAW_BATCH`. */
  const pendingRef = useRef(0)

  const clearSamples = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = null
    pendingRef.current = 0
    samplesRef.current = []
    setSamples([])
  }, [])

  // A different distribution means a different set of sliders and a different
  // sample space — start over rather than carrying either across.
  useEffect(() => {
    clearSamples()
    setParams(defaultParams(spec))
  }, [spec, clearSamples])

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    },
    [],
  )

  const setParam = useCallback(
    (key: string, value: number) => {
      // Old draws came from a different distribution — clear them so the
      // histogram never disagrees with the curve it's drawn under.
      clearSamples()
      setParams(prev => spec.normalize({ ...prev, [key]: value }))
    },
    [spec, clearSamples],
  )

  // Every press adds another batch to the pile — the counter climbing is the
  // whole point, so there is no batch-size control and no separate "draw more".
  // Presses during an animation queue up rather than cancelling it, so a rapid
  // tap always buys a full batch.
  const runSimulation = useCallback(() => {
    if (prefersReducedMotion()) {
      drawSamples(spec, params, DRAW_BATCH, rngRef.current, samplesRef.current)
      setSamples(samplesRef.current.slice())
      return
    }
    pendingRef.current += DRAW_BATCH
    if (frameRef.current !== null) return
    const chunk = Math.max(1, Math.ceil(DRAW_BATCH / DRAW_FRAMES))
    const step = () => {
      const take = Math.min(chunk, pendingRef.current)
      drawSamples(spec, params, take, rngRef.current, samplesRef.current)
      pendingRef.current -= take
      setSamples(samplesRef.current.slice())
      frameRef.current = pendingRef.current > 0 ? requestAnimationFrame(step) : null
    }
    frameRef.current = requestAnimationFrame(step)
  }, [spec, params])

  const moments = useMemo(() => spec.moments(params), [spec, params])
  const sample = useMemo(() => summarizeSamples(samples), [samples])
  const hasSamples = samples.length > 0
  const integerValued = spec.kind === 'discrete'

  return (
    <div
      className={
        'not-prose rounded-xl border border-border bg-card text-card-foreground p-3 sm:p-4 space-y-2.5 ' +
        (className ?? '')
      }
    >
      {/* Header: what's being plotted (left) + how (right).
          The switch and reset sit in their own column, top-aligned and
          `shrink-0`: the notation restates the current parameter values, so it
          changes width and reflows between one and two lines as a slider moves.
          Anything sharing a *wrapping* row with it hopped around mid-drag —
          a fixed column can't, and the notation still reserves two lines of
          height so the sliders below it don't shift either. */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          {/* "Binomial", not "Binomial Distribution": the long names wrapped to
              a second line next to the switch, and the notation right below
              says what it is anyway. */}
          <p className="text-base font-semibold leading-tight">{spec.title.replace(/\s+Distribution$/, '')}</p>
          <p className="text-sm text-muted-foreground tabular-nums mt-0.5 leading-snug min-h-[2.75em]">
            {spec.notation(params)}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex rounded-lg border border-border overflow-hidden" role="group" aria-label="Plot view">
            {(['pdf', 'cdf'] as const).map(mode => (
              <button
                key={mode}
                type="button"
                onClick={() => setView(mode)}
                aria-pressed={view === mode}
                data-sound="select"
                className={`h-10 px-2.5 text-sm font-semibold transition-colors ${
                  view === mode ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:bg-accent'
                }`}
              >
                {mode === 'pdf' ? (spec.kind === 'discrete' ? 'PMF' : 'PDF') : 'CDF'}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              clearSamples()
              setParams(defaultParams(spec))
            }}
            className="h-10 w-10 inline-flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            aria-label="Reset parameters and draws"
            title="Reset parameters and draws"
          >
            <RotateCcw className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      {/* The headline moments, above the plot they describe. Three across on
          every width — variance is left out on purpose: σ is the one in the
          same units as the axis, and σ² is a square away from it. */}
      <div className="grid grid-cols-3 gap-2">
        <Stat
          symbol="μ"
          label="Mean"
          value={formatKpi(moments.mean)}
          sample={hasSamples ? formatKpi(sample.mean) : null}
          sampleSymbol="x̄"
        />
        <Stat
          symbol="σ"
          label="Std. dev."
          value={formatKpi(moments.sd)}
          sample={hasSamples ? formatKpi(sample.sd) : null}
          sampleSymbol="s"
        />
        {moments.skewness !== null ? (
          <Stat symbol="γ₁" label="Skewness" value={formatKpi(moments.skewness)} />
        ) : (
          <Stat
            symbol="Mo"
            label="Mode"
            value={moments.mode !== null ? formatStat(moments.mode, { integer: integerValued }) : '—'}
          />
        )}
      </div>

      <DistributionPlot
        spec={spec}
        params={params}
        view={view}
        samples={samples}
        height={size === 'full' ? 260 : 250}
      />

      {/* Parameter sliders */}
      <div className="space-y-1">
        {spec.params.map(param => {
          const max = paramMax(param, params)
          const value = params[param.key]
          return (
            <div key={param.key}>
              <div className="flex items-baseline justify-between gap-2">
                <label htmlFor={`${spec.key}-${param.key}`} className="text-sm">
                  <span className="font-semibold">{param.symbol}</span>
                  <span className="text-muted-foreground"> — {param.label}</span>
                </label>
                <span className="text-base font-semibold tabular-nums">
                  {param.integer ? value : formatStat(value)}
                </span>
              </div>
              <input
                id={`${spec.key}-${param.key}`}
                type="range"
                min={param.min}
                max={max}
                step={param.step}
                value={value}
                onChange={e => setParam(param.key, Number(e.target.value))}
                className="sim-slider"
              />
            </div>
          )
        })}
      </div>

      {/* Simulation: one button, pressed as many times as you like. The running
          total is printed by the plot's readout strip, so nothing here states a
          batch size; reset (in the header) clears the draws with the
          parameters. */}
      <button
        type="button"
        onClick={runSimulation}
        className="h-10 w-full rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        Simulate
      </button>

      {caption && <p className="text-sm text-muted-foreground text-center">{caption}</p>}
    </div>
  )
}

function Stat({
  symbol,
  label,
  value,
  sample = null,
  sampleSymbol,
}: {
  symbol: string
  label: string
  value: string
  sample?: string | null
  sampleSymbol?: string
}) {
  return (
    <div className="rounded-lg bg-muted/50 px-2.5 py-1.5 min-w-0">
      <p className="text-xs text-muted-foreground leading-none truncate">
        <span className="font-semibold text-foreground">{symbol}</span> {label}
      </p>
      <p className="text-lg font-semibold tabular-nums mt-1 leading-none">{value}</p>
      {sample !== null && (
        <p className="text-xs text-muted-foreground tabular-nums mt-1 leading-none">
          {sampleSymbol ?? 'sim'} {sample}
        </p>
      )}
    </div>
  )
}
