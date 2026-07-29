/**
 * An interactive replacement for the static distribution illustrations in the
 * vault (`Media/*_pdf.svg`, `Media/*_pmf.svg`).
 *
 * Instead of four frozen curves, the student gets the live distribution: every
 * parameter on a slider, the mean/variance/SD/skewness recomputed as they drag,
 * a PDF↔CDF switch, and a Monte-Carlo simulation that draws variates and stacks
 * them into a histogram over the theoretical shape — so "the sample mean
 * converges to E[X]" is something they watch happen rather than read.
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

/** How many variates one press of "Simulate" draws. */
const SAMPLE_SIZES = [100, 1000, 10000] as const
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
  const [sampleSize, setSampleSize] = useState<number>(1000)
  const [samples, setSamples] = useState<number[]>([])
  const [drawing, setDrawing] = useState(false)

  const rngRef = useRef<Rng>(createRng(Date.now() & 0x7fffffff))
  const frameRef = useRef<number | null>(null)

  const stopDrawing = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = null
    setDrawing(false)
  }, [])

  // A different distribution means a different set of sliders and a different
  // sample space — start over rather than carrying either across.
  useEffect(() => {
    stopDrawing()
    setParams(defaultParams(spec))
    setSamples([])
  }, [spec, stopDrawing])

  useEffect(() => stopDrawing, [stopDrawing])

  const setParam = useCallback(
    (key: string, value: number) => {
      // Old draws came from a different distribution — clear them so the
      // histogram never disagrees with the curve it's drawn under.
      stopDrawing()
      setSamples([])
      setParams(prev => spec.normalize({ ...prev, [key]: value }))
    },
    [spec, stopDrawing],
  )

  const runSimulation = useCallback(
    (append: boolean) => {
      stopDrawing()
      const accumulated = append ? samples.slice() : []
      if (prefersReducedMotion()) {
        setSamples(drawSamples(spec, params, sampleSize, rngRef.current, accumulated))
        return
      }
      setDrawing(true)
      const chunk = Math.max(1, Math.ceil(sampleSize / DRAW_FRAMES))
      let drawn = 0
      const step = () => {
        const take = Math.min(chunk, sampleSize - drawn)
        drawSamples(spec, params, take, rngRef.current, accumulated)
        drawn += take
        setSamples(accumulated.slice())
        if (drawn < sampleSize) {
          frameRef.current = requestAnimationFrame(step)
        } else {
          frameRef.current = null
          setDrawing(false)
        }
      }
      frameRef.current = requestAnimationFrame(step)
    },
    [spec, params, sampleSize, samples, stopDrawing],
  )

  const moments = useMemo(() => spec.moments(params), [spec, params])
  const sample = useMemo(() => summarizeSamples(samples), [samples])
  const hasSamples = samples.length > 0
  const integerValued = spec.kind === 'discrete'

  return (
    <div
      className={
        'not-prose rounded-xl border border-border bg-card text-card-foreground p-3 sm:p-4 space-y-3 ' +
        (className ?? '')
      }
    >
      {/* Header: what's being plotted + how */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0">
          <p className="text-base font-semibold leading-tight">{spec.title}</p>
          <p className="text-sm text-muted-foreground tabular-nums mt-0.5">{spec.notation(params)}</p>
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
                className={`h-10 px-4 text-sm font-semibold transition-colors ${
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
              stopDrawing()
              setSamples([])
              setParams(defaultParams(spec))
            }}
            className="h-10 w-10 inline-flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            aria-label="Reset parameters"
            title="Reset parameters"
          >
            <RotateCcw className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      {/* The four headline moments, above the plot they describe */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Stat
          symbol="μ"
          label="Mean"
          value={formatKpi(moments.mean)}
          sample={hasSamples ? formatKpi(sample.mean) : null}
          sampleSymbol="x̄"
        />
        <Stat
          symbol="σ²"
          label="Variance"
          value={formatKpi(moments.variance)}
          sample={hasSamples ? formatKpi(sample.variance) : null}
          sampleSymbol="s²"
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
        height={size === 'full' ? 300 : 250}
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

      {/* Simulation controls */}
      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-border">
        <div className="flex rounded-lg border border-border overflow-hidden" role="group" aria-label="Draws per simulation">
          {SAMPLE_SIZES.map(n => (
            <button
              key={n}
              type="button"
              onClick={() => setSampleSize(n)}
              aria-pressed={sampleSize === n}
              data-sound="select"
              className={`h-10 px-3 text-sm font-semibold tabular-nums transition-colors ${
                sampleSize === n ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              {n.toLocaleString()}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => runSimulation(false)}
          disabled={drawing}
          className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {drawing ? 'Simulating…' : 'Simulate'}
        </button>
        {hasSamples && !drawing && (
          <button
            type="button"
            onClick={() => runSimulation(true)}
            className="h-10 px-4 rounded-lg border border-border text-sm font-semibold hover:bg-accent transition-colors"
          >
            Draw more
          </button>
        )}
        {hasSamples && (
          <button
            type="button"
            onClick={() => {
              stopDrawing()
              setSamples([])
            }}
            className="h-10 px-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            Clear
          </button>
        )}
        <p className="text-sm text-muted-foreground ml-auto tabular-nums">
          {hasSamples
            ? `${sample.n.toLocaleString()} draws simulated`
            : 'Draw random values from this distribution'}
        </p>
      </div>

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
    <div className="rounded-lg bg-muted/50 px-3 py-2">
      <p className="text-sm text-muted-foreground leading-none">
        <span className="font-semibold text-foreground">{symbol}</span> {label}
      </p>
      <p className="text-xl font-semibold tabular-nums mt-1.5 leading-none">{value}</p>
      {sample !== null && (
        <p className="text-sm text-muted-foreground tabular-nums mt-1.5 leading-none">
          {sampleSymbol ?? 'sim'} {sample}
        </p>
      )}
    </div>
  )
}
