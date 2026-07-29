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
import { drawSamples, formatStat, summarizeSamples } from '@/lib/distributionPlot'

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
          <p className="text-sm font-medium leading-tight">{spec.title}</p>
          <p className="text-xs text-muted-foreground tabular-nums mt-0.5">{spec.notation(params)}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex rounded-md border border-border overflow-hidden" role="group" aria-label="Plot view">
            {(['pdf', 'cdf'] as const).map(mode => (
              <button
                key={mode}
                type="button"
                onClick={() => setView(mode)}
                aria-pressed={view === mode}
                data-sound="select"
                className={`px-2.5 py-1 text-xs font-medium transition-colors ${
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
            className="p-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            aria-label="Reset parameters"
            title="Reset parameters"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      <DistributionPlot
        spec={spec}
        params={params}
        view={view}
        samples={samples}
        height={size === 'full' ? 300 : 250}
      />

      {/* Parameter sliders */}
      <div className="space-y-2.5">
        {spec.params.map(param => {
          const max = paramMax(param, params)
          const value = params[param.key]
          return (
            <div key={param.key}>
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <label htmlFor={`${spec.key}-${param.key}`} className="text-xs">
                  <span className="font-medium">{param.symbol}</span>
                  <span className="text-muted-foreground"> — {param.label}</span>
                </label>
                <span className="text-xs font-medium tabular-nums">
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
                className="w-full accent-primary"
              />
            </div>
          )
        })}
      </div>

      {/* Theory vs. simulation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5">
        <Stat
          label="Mean"
          value={formatStat(moments.mean)}
          sample={hasSamples ? formatStat(sample.mean) : null}
        />
        <Stat
          label="Variance"
          value={formatStat(moments.variance)}
          sample={hasSamples ? formatStat(sample.variance) : null}
        />
        <Stat
          label="Std. dev."
          value={formatStat(moments.sd)}
          sample={hasSamples ? formatStat(sample.sd) : null}
        />
        <Stat
          label={moments.skewness !== null ? 'Skewness' : 'Mode'}
          value={
            moments.skewness !== null
              ? formatStat(moments.skewness)
              : moments.mode !== null
              ? formatStat(moments.mode, { integer: integerValued })
              : '—'
          }
          sample={null}
        />
      </div>

      {/* Simulation controls */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-border">
        <div className="flex rounded-md border border-border overflow-hidden mt-2" role="group" aria-label="Draws per simulation">
          {SAMPLE_SIZES.map(n => (
            <button
              key={n}
              type="button"
              onClick={() => setSampleSize(n)}
              aria-pressed={sampleSize === n}
              data-sound="select"
              className={`px-2 py-1 text-xs font-medium tabular-nums transition-colors ${
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
          className="mt-2 h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {drawing ? 'Simulating…' : 'Simulate'}
        </button>
        {hasSamples && !drawing && (
          <button
            type="button"
            onClick={() => runSimulation(true)}
            className="mt-2 h-8 px-3 rounded-md border border-border text-xs font-medium hover:bg-accent transition-colors"
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
            className="mt-2 h-8 px-2 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            Clear
          </button>
        )}
        <p className="mt-2 text-xs text-muted-foreground ml-auto tabular-nums">
          {hasSamples
            ? `${sample.n.toLocaleString()} draws simulated`
            : 'Draw random values from this distribution'}
        </p>
      </div>

      {caption && <p className="text-xs text-muted-foreground text-center">{caption}</p>}
    </div>
  )
}

function Stat({ label, value, sample }: { label: string; value: string; sample: string | null }) {
  return (
    <div className="rounded-md bg-muted/50 px-2 py-1.5">
      <p className="text-[11px] text-muted-foreground leading-none">{label}</p>
      <p className="text-sm font-medium tabular-nums mt-1 leading-none">{value}</p>
      {sample !== null && (
        <p className="text-[11px] text-muted-foreground tabular-nums mt-1 leading-none">sim {sample}</p>
      )}
    </div>
  )
}
