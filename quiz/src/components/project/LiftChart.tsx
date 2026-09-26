import { useState } from 'react'
import type { LiftBin } from '@/lib/pcpaAssessment'

/**
 * A lift (quantile) chart: the assessment rows sorted by the candidate's
 * predicted rate and cut into ten equal-weight bins, each bin's average
 * outcome and prediction shown relative to the book average — the exhibit the
 * CAS post-project summary names as the clearest evidence of segmentation.
 * The true model's line is the best any model could draw on the same rows.
 *
 * One axis, three series in the categorical palette's first three slots
 * (validated all-pairs in both themes; colours in index.css, `.pcpa-lift`),
 * the reference series dashed as a second cue, a hover readout per bin, and
 * the numbers in a table beneath — the light theme's third slot sits under 3:1
 * contrast, so the table is not optional.
 */

const W = 560
const H = 250
const PAD = { top: 12, right: 16, bottom: 34, left: 44 }

const SERIES = [
  { key: 'actual', label: 'Actual outcome', color: 'var(--lift-actual)', dash: undefined },
  { key: 'model', label: 'Your model', color: 'var(--lift-model)', dash: undefined },
  { key: 'truth', label: 'True model', color: 'var(--lift-true)', dash: '5 4' },
] as const

/** A round top for the axis and a step that lands ticks on round numbers. */
function niceScale(max: number): { top: number; step: number } {
  const step = max <= 1.5 ? 0.25 : max <= 3 ? 0.5 : max <= 6 ? 1 : 2
  return { top: Math.max(step * 2, Math.ceil(max / step) * step), step }
}

export function LiftChart({ lift, oracle }: { lift: LiftBin[]; oracle: LiftBin[] }) {
  const [hover, setHover] = useState<number | null>(null)
  const values = { actual: lift.map(b => b.actual), model: lift.map(b => b.predicted), truth: oracle.map(b => b.predicted) }
  const { top: yMax, step } = niceScale(Math.max(...values.actual, ...values.model, ...values.truth) * 1.05)
  const ticks = Array.from({ length: Math.round(yMax / step) + 1 }, (_, i) => i * step)
  const x = (i: number) => PAD.left + ((i + 0.5) / lift.length) * (W - PAD.left - PAD.right)
  const y = (v: number) => PAD.top + (1 - v / yMax) * (H - PAD.top - PAD.bottom)
  const band = (W - PAD.left - PAD.right) / lift.length

  return (
    <figure className="pcpa-lift space-y-3">
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs" aria-hidden>
        {SERIES.map(s => (
          <span key={s.key} className="flex items-center gap-1.5 text-muted-foreground">
            <svg width="18" height="8"><line x1="1" y1="4" x2="17" y2="4" stroke={s.color} strokeWidth="2" strokeDasharray={s.dash} strokeLinecap="round" /></svg>
            {s.label}
          </span>
        ))}
      </div>
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Lift chart: relativity to average by decile of predicted rate, actual against predicted">
          {ticks.map(t => (
            <g key={t}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke="hsl(var(--border))" strokeWidth="1" />
              <text x={PAD.left - 8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-muted-foreground text-[10px]">{step < 0.5 ? t.toFixed(2) : t.toFixed(1)}</text>
            </g>
          ))}
          <line x1={PAD.left} x2={W - PAD.right} y1={y(1)} y2={y(1)} stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.6" />
          {lift.map((b, i) => (
            <text key={b.bin} x={x(i)} y={H - PAD.bottom + 16} textAnchor="middle" className="fill-muted-foreground text-[10px]">{b.bin}</text>
          ))}
          <text x={(PAD.left + W - PAD.right) / 2} y={H - 4} textAnchor="middle" className="fill-muted-foreground text-[10px]">Decile of predicted rate (lowest → highest)</text>
          {hover !== null && <rect x={x(hover) - band / 2} y={PAD.top} width={band} height={H - PAD.top - PAD.bottom} fill="hsl(var(--muted))" opacity="0.7" />}
          {SERIES.map(s => (
            <g key={s.key}>
              <polyline
                points={values[s.key].map((v, i) => `${x(i)},${y(v)}`).join(' ')}
                fill="none"
                stroke={s.color}
                strokeWidth="2"
                strokeDasharray={s.dash}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {values[s.key].map((v, i) => (
                <circle key={i} cx={x(i)} cy={y(v)} r={hover === i ? 5 : 4} fill={s.color} stroke="hsl(var(--card))" strokeWidth="2" />
              ))}
            </g>
          ))}
          {lift.map((b, i) => (
            <rect
              key={`hit-${b.bin}`}
              x={x(i) - band / 2}
              y={PAD.top}
              width={band}
              height={H - PAD.top - PAD.bottom}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setHover(h => (h === i ? null : i))}
            />
          ))}
        </svg>
        {hover !== null && (
          <div
            className="pointer-events-none absolute top-2 z-10 rounded-lg bg-popover px-3 py-2 text-xs text-popover-foreground shadow-lg"
            style={{ left: `${(x(hover) / W) * 100}%`, transform: `translateX(${hover > lift.length / 2 ? '-110%' : '10%'})` }}
          >
            <p className="mb-1 font-semibold">Decile {lift[hover].bin}</p>
            {SERIES.map(s => (
              <p key={s.key} className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: s.color }} />
                <span className="flex-1 text-muted-foreground">{s.label}</span>
                <span className="font-medium tabular-nums">{values[s.key][hover].toFixed(2)}</span>
              </p>
            ))}
          </div>
        )}
      </div>
      <figcaption className="overflow-x-auto">
        <table className="w-full text-xs tabular-nums">
          <thead>
            <tr className="text-muted-foreground">
              <th className="py-1 pr-2 text-left font-medium">Decile</th>
              {lift.map(b => <th key={b.bin} className="px-1 py-1 text-right font-medium">{b.bin}</th>)}
            </tr>
          </thead>
          <tbody>
            {SERIES.map(s => (
              <tr key={s.key} className="border-t border-border/60">
                <td className="whitespace-nowrap py-1 pr-2 text-muted-foreground">{s.label}</td>
                {values[s.key].map((v, i) => <td key={i} className="px-1 py-1 text-right">{v.toFixed(2)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </figcaption>
    </figure>
  )
}
