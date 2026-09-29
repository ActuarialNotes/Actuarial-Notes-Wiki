// The **star map** (docs/actuaria-online.md §6.3): a central star, three
// orbits, Monte Carlo Station on the first, the charted sectors on the second
// and the uncharted ones on the third, in ladder order so the hue ramp reads
// round the map the way it reads down the exam grid.
//
// The picture is SVG and decorative; what a player *uses* is a row of real
// `<button>`s laid over it, one per sector and one for the station, in DOM
// order — so the map is operable from the keyboard, each button names its
// sector and its Credibility, and a focus ring lands on the planet it names.

import { useMemo } from 'react'
import { Lock } from 'lucide-react'
import { GamblersRuin } from '@/components/actuaria/GamblersRuin'
import { examAccentStyle } from '@/lib/examColors'
import { examMonogram } from '@/lib/examLogo'
import { sectorCredibility, SECTOR_FILL } from '@/lib/actuaria/credibility'
import { sectorName } from '@/lib/actuaria/lexicon'
import { lossTriangleCells, starfield } from '@/lib/actuaria/scene'
import { starMapLayout, type Sector, type StarMapSize } from '@/lib/actuaria/sectors'
import type { ExamReadinessAssessment } from '@/lib/readiness'
import { cn } from '@/lib/utils'

export function StarMap({
  sectors,
  readiness,
  selectedKey,
  activeKey,
  stationLabel,
  size,
  onSelect,
  onStation,
  raid = null,
}: {
  sectors: readonly Sector[]
  readiness: ReadonlyMap<string, ExamReadinessAssessment>
  selectedKey: string | null
  /** The player's active sector — the "you are here" marker. */
  activeKey: string | null
  /** "3 pilots waiting", or that the station is quiet. */
  stationLabel: string
  size: StarMapSize
  onSelect: (key: string) => void
  onStation: () => void
  /**
   * The cohort's raid, while one is up this week (§6.3): Gambler's Ruin drawn
   * in the lower corner, and a way to it. Null draws nothing.
   */
  raid?: { label: string; onOpen: () => void } | null
}) {
  const layout = useMemo(() => starMapLayout(sectors, size), [sectors, size])
  const stars = useMemo(() => starfield(size === 'wide' ? 140 : 80, layout.width, layout.height), [size, layout.width, layout.height])
  const nebula = useMemo(
    () => lossTriangleCells(layout.width * 0.8, layout.height * 0.06, size === 'wide' ? 7 : 5, size === 'wide' ? 9 : 7),
    [layout.width, layout.height, size],
  )
  const byKey = new Map(sectors.map(s => [s.key, s]))
  const compact = size === 'compact'
  // The boss's corner: bottom left, clear of the orbits' widest sweep.
  const ruin = { x: layout.width * 0.07, y: layout.height * 0.84, s: compact ? 26 : 40 }
  const pct = (v: number, of: number) => `${(v / of) * 100}%`

  return (
    <div className="relative w-full" style={{ aspectRatio: `${layout.width} / ${layout.height}` }}>
      <svg viewBox={`0 0 ${layout.width} ${layout.height}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id="actuaria-star" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="1" />
            <stop offset="45%" stopColor="hsl(var(--foreground))" stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0" />
          </radialGradient>
        </defs>

        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="hsl(var(--foreground))" opacity={s.opacity} />
        ))}

        {/* The Loss Triangle Nebula — a development triangle drifting in the corner. */}
        <g>
          {nebula.map((c, i) => (
            <rect key={i} x={c.x} y={c.y} width={compact ? 7 : 9} height={compact ? 7 : 9} rx="1.5" fill="hsl(var(--muted-foreground))" opacity={c.opacity} />
          ))}
          {!compact && (
            <text x={layout.width * 0.8} y={layout.height * 0.06 - 8} className="actuaria-display" fontSize="10" fill="hsl(var(--muted-foreground))" opacity="0.6">
              LOSS TRIANGLE NEBULA
            </text>
          )}
        </g>

        {layout.orbits.map((o, i) => (
          <ellipse
            key={i}
            cx={layout.cx}
            cy={layout.cy}
            rx={o.rx}
            ry={o.ry}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={i === 2 ? 1 : 1.25}
            strokeDasharray={i === 2 ? '4 6' : undefined}
          />
        ))}

        <circle cx={layout.cx} cy={layout.cy} r={layout.star * 2.2} fill="url(#actuaria-star)" opacity="0.35" />
        <circle cx={layout.cx} cy={layout.cy} r={layout.star * 0.55} fill="hsl(var(--foreground))" />

        {/* Monte Carlo Station — Quiz Battle's way in. */}
        <g>
          <rect
            x={layout.station.x - layout.station.r}
            y={layout.station.y - layout.station.r}
            width={layout.station.r * 2}
            height={layout.station.r * 2}
            rx={layout.station.r * 0.3}
            transform={`rotate(45 ${layout.station.x} ${layout.station.y})`}
            fill="hsl(var(--card))"
            stroke="hsl(var(--foreground))"
            strokeWidth="1.5"
          />
          <circle cx={layout.station.x} cy={layout.station.y} r={layout.station.r * 0.3} fill="hsl(var(--actuaria-signal))" />
          <text
            x={layout.station.x}
            y={layout.station.y + layout.station.r + (compact ? 13 : 18)}
            textAnchor="middle"
            className="actuaria-display"
            fontSize={compact ? 9 : 12}
            fill="hsl(var(--foreground))"
          >
            MONTE CARLO STATION
          </text>
          <text
            x={layout.station.x}
            y={layout.station.y + layout.station.r + (compact ? 25 : 34)}
            textAnchor="middle"
            fontSize={compact ? 9 : 12}
            fill="hsl(var(--muted-foreground))"
          >
            {stationLabel}
          </text>
        </g>

        {layout.sectors.map(p => {
          const sector = byKey.get(p.key)
          if (!sector) return null
          const accent = examAccentStyle(p.key)
          const { lines, fontScale } = examMonogram(p.key)
          const fontSize = fontScale * p.r * 1.75
          const z = sectorCredibility(readiness.get(p.key)?.overallPct ?? 0).z
          const arc = 2 * Math.PI * (p.r + 5)
          const selected = selectedKey === p.key
          return (
            <g key={p.key} style={accent}>
              {selected && (
                <circle cx={p.x} cy={p.y} r={p.r + 13} fill="var(--exam-accent-soft)" stroke="var(--exam-accent-muted)" strokeWidth="1" />
              )}
              {p.charted ? (
                <>
                  {/* The sector's Credibility round it — readiness, in mastery's green. */}
                  <circle cx={p.x} cy={p.y} r={p.r + 5} fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={p.r + 5}
                    fill="none"
                    stroke={SECTOR_FILL}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${arc * z} ${arc}`}
                    transform={`rotate(-90 ${p.x} ${p.y})`}
                  />
                  <circle cx={p.x} cy={p.y} r={p.r} fill="var(--exam-accent-vivid)" />
                  <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" fill="white" fontWeight="700" fontSize={fontSize}>
                    {lines.length === 1 ? (
                      lines[0]
                    ) : (
                      lines.map((line, i) => (
                        <tspan key={i} x={p.x} dy={i === 0 ? -fontSize * 0.5 : fontSize}>{line}</tspan>
                      ))
                    )}
                  </text>
                </>
              ) : (
                <circle cx={p.x} cy={p.y} r={p.r} fill="hsl(var(--background))" stroke="var(--exam-accent-muted)" strokeWidth="1.5" strokeDasharray="4 4" />
              )}
              {activeKey === p.key && (
                <path
                  d={`M ${p.x - 6} ${p.y - p.r - 18} L ${p.x + 6} ${p.y - p.r - 18} L ${p.x} ${p.y - p.r - 10} Z`}
                  fill="hsl(var(--actuaria-signal))"
                />
              )}
              <text
                x={p.x}
                y={p.y + p.r + (compact ? 16 : 22)}
                textAnchor="middle"
                className="actuaria-display"
                fontSize={compact ? 11 : 13}
                fill={p.charted ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))'}
              >
                {(compact ? p.key.replace(/^CAS-/, '') : sectorName(p.key)).toUpperCase()}
              </text>
            </g>
          )
        })}
        {/* Gambler's Ruin — only while the cohort's raid is up. */}
        {raid && (
          <g>
            <GamblersRuin x={ruin.x - ruin.s / 2} y={ruin.y - ruin.s / 2} width={ruin.s} height={ruin.s} aria-hidden />
            <text x={ruin.x} y={ruin.y + ruin.s / 2 + (compact ? 11 : 15)} textAnchor="middle" className="actuaria-display" fontSize={compact ? 8 : 11} fill="hsl(var(--destructive))">
              GAMBLER’S RUIN
            </text>
          </g>
        )}
      </svg>

      {/* The controls: one button per place, in ladder order. */}
      <button
        type="button"
        onClick={onStation}
        aria-label={`Monte Carlo Station — Quiz Battle. ${stationLabel}`}
        className="absolute rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{
          left: pct(layout.station.x - layout.station.r * 1.6, layout.width),
          top: pct(layout.station.y - layout.station.r * 1.6, layout.height),
          width: pct(layout.station.r * 3.2, layout.width),
          height: pct(layout.station.r * 3.2, layout.height),
        }}
        data-testid="actuaria-station"
      />
      {raid && (
        <button
          type="button"
          onClick={raid.onOpen}
          aria-label={`Gambler’s Ruin — this week’s raid. ${raid.label}`}
          className="absolute rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{
            left: pct(ruin.x - ruin.s * 0.7, layout.width),
            top: pct(ruin.y - ruin.s * 0.7, layout.height),
            width: pct(ruin.s * 1.4, layout.width),
            height: pct(ruin.s * 1.4, layout.height),
          }}
          data-testid="actuaria-raid"
        />
      )}
      {layout.sectors.map(p => {
        const sector = byKey.get(p.key)
        if (!sector) return null
        const z = sectorCredibility(readiness.get(p.key)?.overallPct ?? 0)
        const hit = p.r + 8
        return (
          <button
            key={p.key}
            type="button"
            onClick={() => onSelect(p.key)}
            aria-pressed={selectedKey === p.key}
            aria-label={`${sectorName(p.key)}, ${sector.title}${sector.charted ? `, Credibility ${z.label}` : ', uncharted'}`}
            className={cn(
              'absolute flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              selectedKey !== p.key && 'hover:bg-[var(--exam-accent-soft)] hover:ring-1 hover:ring-[var(--exam-accent-muted)]',
            )}
            style={{
              ...examAccentStyle(p.key),
              left: pct(p.x - hit, layout.width),
              top: pct(p.y - hit, layout.height),
              width: pct(hit * 2, layout.width),
              height: pct(hit * 2, layout.height),
            }}
            data-testid={`actuaria-sector-${p.key}`}
          >
            {!p.charted && <Lock className={compact ? 'h-3 w-3 text-muted-foreground' : 'h-4 w-4 text-muted-foreground'} aria-hidden />}
          </button>
        )
      })}
    </div>
  )
}
