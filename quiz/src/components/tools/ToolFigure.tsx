import { useEffect, useRef, useState, type PointerEvent, type ReactNode, type RefObject } from 'react'
import { formatValue } from '@/lib/tools'
import { labelRows, linesExtent, scale, type FigureSpec, type Point, type Role } from '@/lib/toolFigures'

/**
 * A tool's figure (docs/actuarial-tools.md §6.7): one small picture of the
 * answer, redrawn on every change, drawn from `lib/toolFigures.ts`'s spec. No
 * title, no caption: touching or hovering a mark names it in a line inside the
 * figure's own top edge, so the figure never adds a row of text. Where the
 * spec marks the run's point as draggable, dragging across the figure sets
 * that input (`onDrag`) — another slider, on the picture.
 *
 * Colours follow the style guide's chart rule: the primary colour for the
 * result alone, `currentColor` at low opacity for everything else.
 */

const HEIGHT = 112
const PAD = { l: 6, r: 6, t: 16, b: 16 }

const FILL: Record<Role, { fill: string; fillOpacity: number }> = {
  result: { fill: 'hsl(var(--primary))', fillOpacity: 0.9 },
  base: { fill: 'currentColor', fillOpacity: 0.35 },
  muted: { fill: 'currentColor', fillOpacity: 0.18 },
}

export function ToolFigure({
  figure,
  onDrag,
  compact = false,
  height = HEIGHT,
  className,
}: {
  figure: FigureSpec
  /** The figure's height in pixels: a card with many inputs draws it shorter to stay on one phone screen (R10). */
  height?: number
  onDrag?: (field: string, value: number) => void
  /** The catalogue's miniature: no labels, no interaction. */
  compact?: boolean
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const width = useWidth(ref, compact ? 48 : 320)
  const H0 = compact ? 48 : height
  const [label, setLabel] = useState<string | null>(null)
  const pad = compact ? { l: 3, r: 3, t: 4, b: 4 } : PAD
  const name = (text: string) => (compact ? {} : { onPointerEnter: () => setLabel(text), onClick: () => setLabel(text) })

  let body: ReactNode = null
  let drag: ((x: number) => void) | null = null
  const W = width
  const H = H0

  switch (figure.kind) {
    case 'bars': {
      const n = figure.labels.length
      const totals = figure.labels.map((_, k) => figure.stacks.reduce((s, st) => s + Math.max(0, st.values[k] ?? 0), 0))
      const top = Math.max(...totals, ...(figure.outline?.values ?? []), 1e-12)
      const y = scale(0, top, H - pad.b, pad.t)
      const band = (W - pad.l - pad.r) / Math.max(n, 1)
      const bw = Math.max(2, Math.min(band * 0.62, 56))
      const lineTop = Math.max(...(figure.line?.values ?? [0]), 1e-12)
      const ly = scale(0, lineTop, H - pad.b, pad.t)
      body = (
        <>
          {figure.labels.map((lab, k) => {
            const cx = pad.l + band * (k + 0.5)
            let base = 0
            return (
              <g key={k}>
                {figure.stacks.map((st, s) => {
                  const v = Math.max(0, st.values[k] ?? 0)
                  const y0 = y(base)
                  base += v
                  const y1 = y(base)
                  return <rect key={s} x={cx - bw / 2} y={y1} width={bw} height={Math.max(0, y0 - y1)} rx={compact ? 0.5 : 1.5} {...FILL[st.role]} {...name(`${lab} · ${st.name}: ${formatValue(v, figure.unit)}`)} />
                })}
                {figure.outline && Number.isFinite(figure.outline.values[k]) && (
                  <rect x={cx - bw / 2 - 2} y={y(figure.outline.values[k])} width={bw + 4} height={Math.max(0, y(0) - y(figure.outline.values[k]))} fill="none" stroke="currentColor" strokeOpacity={0.45} strokeDasharray="3 2" {...name(`${lab} · ${figure.outline.name}: ${formatValue(figure.outline.values[k], figure.unit)}`)} />
                )}
                {!compact && n <= 14 && (
                  <text x={cx} y={H - 4} textAnchor="middle" fontSize={9} fill="currentColor" fillOpacity={0.6}>{lab}</text>
                )}
              </g>
            )
          })}
          {figure.line && (
            <polyline
              points={figure.line.values.map((v, k) => `${pad.l + band * (k + 0.5)},${ly(v)}`).join(' ')}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.6}
              strokeWidth={1.5}
              strokeDasharray="4 3"
              {...name(`${figure.line.name}`)}
            />
          )}
        </>
      )
      break
    }
    case 'lines': {
      const ext = linesExtent(figure)
      // Room at the ends for a tick label centred on the first and last point.
      const inset = figure.xTicks?.length && !compact ? 18 : 4
      const x = scale(ext.x[0], ext.x[1], pad.l + inset, W - pad.r - inset)
      const y = scale(ext.y[0], ext.y[1], H - pad.b, pad.t)
      const fy = (v: number) => (figure.yLog ? formatValue(10 ** v, figure.yUnit) : formatValue(v, figure.yUnit))
      const path = (pts: Point[]) => pts.map((p, k) => `${k ? 'L' : 'M'}${x(p.x).toFixed(1)},${y(p.y).toFixed(1)}`).join('')
      const shade = figure.shade && figure.series[figure.shade.series]
        ? (() => {
            const pts = figure.series[figure.shade!.series].points.filter(p => p.x >= figure.shade!.from - 1e-9 && p.x <= figure.shade!.to + 1e-9)
            if (pts.length < 1) return null
            const floor = y(Math.max(ext.y[0], 0))
            if (figure.stems) return pts.map((p, k) => <line key={k} x1={x(p.x)} x2={x(p.x)} y1={floor} y2={y(p.y)} stroke="hsl(var(--primary))" strokeWidth={3} strokeOpacity={0.5} />)
            return <path d={`${path(pts)}L${x(pts[pts.length - 1].x)},${floor}L${x(pts[0].x)},${floor}Z`} fill="hsl(var(--primary))" fillOpacity={0.25} />
          })()
        : null
      const dragField = figure.point?.drag?.field
      if (dragField && onDrag && !compact) {
        const inv = scale(pad.l + inset, W - pad.r - inset, ext.x[0], ext.x[1])
        drag = px => onDrag(dragField, Math.min(ext.x[1], Math.max(ext.x[0], inv(px))))
      }
      body = (
        <>
          {figure.level && (
            <line x1={pad.l} x2={W - pad.r} y1={y(figure.level.y)} y2={y(figure.level.y)} stroke="currentColor" strokeOpacity={0.35} strokeDasharray="4 3" {...name(`${figure.level.name}: ${fy(figure.level.y)}`)} />
          )}
          {shade}
          {figure.series.map((s, k) =>
            figure.stems ? (
              <g key={k}>
                {s.points.map((p, j) => (
                  <line key={j} x1={x(p.x)} x2={x(p.x)} y1={y(Math.max(ext.y[0], 0))} y2={y(p.y)} stroke="currentColor" strokeOpacity={0.4} strokeWidth={compact ? 1 : 2} />
                ))}
              </g>
            ) : (
              <path key={k} d={path(s.points)} fill="none" stroke={s.role === 'result' ? 'hsl(var(--primary))' : 'currentColor'} strokeOpacity={s.role === 'result' ? 1 : s.role === 'base' ? 0.55 : 0.3} strokeWidth={compact ? 1.25 : 2} {...name(s.name)} />
            ),
          )}
          {figure.tangent && (() => {
            const t = figure.tangent
            const at = (xx: number) => t.y + t.slope * (xx - t.x)
            return <line x1={x(ext.x[0])} x2={x(ext.x[1])} y1={y(at(ext.x[0]))} y2={y(at(ext.x[1]))} stroke="hsl(var(--primary))" strokeOpacity={0.6} strokeDasharray="5 3" {...name('Duration’s tangent')} />
          })()}
          {(figure.dots ?? []).map((d, k) => (
            <circle key={k} cx={x(d.x)} cy={y(d.y)} r={compact ? 1.5 : 3} {...FILL[d.role]} fillOpacity={d.role === 'muted' ? 0.55 : FILL[d.role].fillOpacity} {...name(`${d.name}: ${fy(d.y)}`)} />
          ))}
          {figure.point && (
            <circle cx={x(figure.point.x)} cy={y(figure.point.y)} r={compact ? 2.5 : 5.5} fill="hsl(var(--primary))" stroke="hsl(var(--card))" strokeWidth={2} {...name(`${figure.point.name} at ${formatValue(figure.point.x, figure.xUnit)}: ${fy(figure.point.y)}`)} />
          )}
          {!compact && (figure.xTicks ?? []).map(t => (
            <text key={t.label} x={x(t.x)} y={H - 4} textAnchor="middle" fontSize={9} fill="currentColor" fillOpacity={0.6}>{t.label}</text>
          ))}
        </>
      )
      break
    }
    case 'heat': {
      const rows = figure.rows
      const all = rows.flat().filter((v): v is number => v != null && Number.isFinite(v))
      const lo = Math.min(...all)
      const hi = Math.max(...all)
      const cols = Math.max(...rows.map(r => r.length), 1)
      const cw = (W - pad.l - pad.r) / cols
      const ch = (H - pad.t - pad.b + (compact ? 0 : 12)) / Math.max(rows.length, 1)
      body = rows.map((row, r) =>
        row.map((v, c) =>
          v == null ? null : (
            <rect key={`${r}:${c}`} x={pad.l + c * cw + 1} y={pad.t + r * ch + 1} width={cw - 2} height={ch - 2} rx={1.5} fill="hsl(var(--primary))" fillOpacity={0.12 + 0.78 * (hi > lo ? (v - lo) / (hi - lo) : 0.5)} {...name(formatValue(v, 'factor'))} />
          ),
        ),
      )
      break
    }
    case 'flows': {
      const items = figure.items
      const ts = items.map(i => i.t)
      const x = scale(Math.min(0, ...ts), Math.max(...ts, 1), pad.l + 6, W - pad.r - 6)
      const big = Math.max(...items.map(i => Math.abs(i.amount)), 1e-12)
      const hasNeg = items.some(i => i.amount < 0)
      const mid = hasNeg ? (pad.t + H - pad.b) / 2 : H - pad.b
      const h = scale(0, big, 0, mid - pad.t)
      const bw = Math.max(2, Math.min(18, ((W - pad.l - pad.r) / Math.max(items.length, 1)) * 0.6))
      body = (
        <>
          <line x1={pad.l} x2={W - pad.r} y1={mid} y2={mid} stroke="currentColor" strokeOpacity={0.35} />
          {items.map((it, k) => {
            const up = it.amount >= 0
            const ha = h(Math.abs(it.amount))
            const hp = h(Math.abs(it.pv))
            return (
              <g key={k} {...name(`t = ${formatValue(it.t, 'years')}: ${formatValue(it.amount, 'money')}, PV ${formatValue(it.pv, 'money')}`)}>
                <rect x={x(it.t) - bw / 2} y={up ? mid - ha : mid} width={bw} height={ha} fill="none" stroke="currentColor" strokeOpacity={0.45} />
                <rect x={x(it.t) - bw / 2} y={up ? mid - hp : mid} width={bw} height={hp} fill="hsl(var(--primary))" fillOpacity={0.85} />
              </g>
            )
          })}
          {!compact && (
            <>
              <text x={x(Math.min(0, ...ts))} y={H - 4} fontSize={9} textAnchor="middle" fill="currentColor" fillOpacity={0.6}>{formatValue(Math.min(0, ...ts), 'years')}</text>
              <text x={x(Math.max(...ts, 1))} y={H - 4} fontSize={9} textAnchor="middle" fill="currentColor" fillOpacity={0.6}>{formatValue(Math.max(...ts, 1), 'years')}</text>
            </>
          )}
        </>
      )
      break
    }
    case 'split': {
      const bars = figure.bars
      const bh = Math.min(28, (H - pad.t - pad.b) / bars.length - 6)
      // One scale for every bar: a premium dollar, or whichever bar reaches further.
      const reach = Math.max(1, ...bars.map(b => b.parts.reduce((t, p) => t + Math.max(0, p.value), 0)))
      const x = scale(0, reach, pad.l + (compact || bars.length < 2 ? 0 : 52), W - pad.r)
      body = bars.map((b, k) => {
        const top = pad.t + k * (bh + 8) + 2
        let at = 0
        return (
          <g key={b.name}>
            {!compact && bars.length > 1 && <text x={pad.l} y={top + bh / 2 + 3} fontSize={10} fill="currentColor" fillOpacity={0.7}>{b.name}</text>}
            {b.parts.map(p => {
              const x0 = x(at)
              at += Math.max(0, p.value)
              const w = Math.max(0, x(at) - x0)
              return (
                <g key={p.name} {...name(`${p.name}: ${formatValue(p.value, figure.unit)}`)}>
                  <rect x={x0} y={top} width={w} height={bh} {...FILL[p.role]} />
                  {!compact && w > 64 && (
                    <text x={x0 + 6} y={top + bh / 2 + 3.5} fontSize={10} fill={p.role === 'result' ? 'hsl(var(--primary-foreground))' : 'currentColor'}>
                      {truncate(p.name, Math.floor((w - 8) / 5.6))}
                    </text>
                  )}
                </g>
              )
            })}
          </g>
        )
      })
      break
    }
    case 'axis': {
      const vs = figure.ticks.map(t => t.value)
      const lo = Math.min(...vs)
      const hi = Math.max(...vs)
      const span = hi - lo || Math.abs(hi) || 1
      const x = scale(lo - span * 0.12, hi + span * 0.12, pad.l, W - pad.r)
      const mid = (pad.t + H - pad.b) / 2 + 4
      const rows = labelRows(figure.ticks.map(t => x(t.value)), 30)
      body = (
        <>
          <line x1={pad.l} x2={W - pad.r} y1={mid} y2={mid} stroke="currentColor" strokeOpacity={0.35} />
          {figure.ticks.map((t, k) => (
            <g key={t.name} {...name(`${t.name} = ${formatValue(t.value, figure.unit)}`)}>
              <circle cx={x(t.value)} cy={mid} r={compact ? 2 : 4.5} {...FILL[t.role]} fillOpacity={t.role === 'result' ? 1 : 0.6} />
              {!compact && (
                <text x={x(t.value)} y={mid + LABEL_ROWS[rows[k]]} textAnchor="middle" fontSize={10} fill="currentColor" fillOpacity={0.75}>{t.name}</text>
              )}
            </g>
          ))}
        </>
      )
      break
    }
    case 'span': {
      const x0 = pad.l + 18
      const x1 = W - pad.r - 18
      const mid = (pad.t + H - pad.b) / 2 + 4
      body = (
        <>
          <line x1={x0} x2={x1} y1={mid} y2={mid} stroke="hsl(var(--primary))" strokeWidth={compact ? 2 : 3} />
          <circle cx={x0} cy={mid} r={compact ? 2.5 : 5} fill="currentColor" fillOpacity={0.5} />
          <circle cx={x1} cy={mid} r={compact ? 2.5 : 5} fill="hsl(var(--primary))" />
          {!compact && (
            <>
              <text x={x0 - 6} y={mid + 20} textAnchor="start" fontSize={10} fill="currentColor" fillOpacity={0.7}>{figure.from}</text>
              <text x={x1 + 6} y={mid + 20} textAnchor="end" fontSize={10} fill="currentColor" fillOpacity={0.7}>{figure.to}</text>
              <text x={(x0 + x1) / 2} y={mid - 10} textAnchor="middle" fontSize={11} fontWeight={600} fill="currentColor">{formatValue(figure.years, 'years')} years</text>
            </>
          )}
        </>
      )
      break
    }
  }

  const onPointer = (e: PointerEvent<SVGSVGElement>) => {
    if (!drag || (e.type === 'pointermove' && e.buttons === 0)) return
    const rect = e.currentTarget.getBoundingClientRect()
    drag(e.clientX - rect.left)
  }

  return (
    <div ref={ref} className={className ?? 'relative w-full'} data-testid={compact ? undefined : 'tool-figure'}>
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        className={drag ? 'touch-none cursor-ew-resize select-none' : 'select-none'}
        role="img"
        aria-hidden={compact || undefined}
        aria-label={compact ? undefined : 'Figure of the result'}
        onPointerDown={drag ? e => { e.currentTarget.setPointerCapture(e.pointerId); onPointer(e) } : undefined}
        onPointerMove={drag ? onPointer : undefined}
        onPointerLeave={compact ? undefined : () => setLabel(null)}
      >
        {body}
      </svg>
      {!compact && label && (
        <p className="pointer-events-none absolute left-1 top-0 max-w-full truncate text-[11px] leading-4 text-muted-foreground tabular-nums" aria-live="polite">{label}</p>
      )}
    </div>
  )
}

/** Where an axis label sits, by row: above the line, below it, then further out each way. */
const LABEL_ROWS = [-10, 18, -24, 32]

const truncate = (s: string, n: number) => (s.length <= n ? s : `${s.slice(0, Math.max(1, n - 1))}…`)

/** The element's width, followed as it resizes (the figure is drawn in pixels so its text is never stretched). */
function useWidth(ref: RefObject<HTMLDivElement | null>, fallback: number): number {
  const [w, setW] = useState(fallback)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const set = () => setW(Math.max(40, Math.round(el.getBoundingClientRect().width)) || fallback)
    set()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(set)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref, fallback])
  return w
}

