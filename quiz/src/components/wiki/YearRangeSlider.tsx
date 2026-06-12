import { useCallback, useEffect, useRef, useState } from 'react'

interface YearRangeSliderProps {
  min: number
  max: number
  value: [number, number] | null
  onChange: (value: [number, number] | null) => void
}

type HandleId = 'start' | 'end' | 'range'

function clampPercent(p: number): number {
  return Math.min(100, Math.max(0, p))
}

function yearToPercent(year: number, min: number, max: number): number {
  if (max <= min) return 0
  return clampPercent(((year - min) / (max - min)) * 100)
}

function clientXToYear(clientX: number, rect: DOMRect, min: number, max: number): number {
  if (max <= min) return min
  const pct = clampPercent(((clientX - rect.left) / rect.width) * 100) / 100
  return Math.round(min + pct * (max - min))
}

// A dual-handle year-range filter for the resource heatmap. With no range
// active it renders as a plain horizontal line; clicking it places the first
// handle, and a second click (before or after) places the second handle and
// commits a sorted [start, end] range. Once both handles exist they can be
// dragged individually (or nudged with arrow/Home/End keys), and the filled
// segment between them can be dragged to slide the whole range while keeping
// its width; the caller's Clear control resets back to "no filter" by
// passing null.
export function YearRangeSlider({ min, max, value, onChange }: YearRangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [pending, setPending] = useState<number | null>(null)
  const [dragging, setDragging] = useState<HandleId | null>(null)
  // Anchor for whole-range drags: the year under the pointer and the range's
  // values at drag start, so we can shift both bounds by the same delta.
  const rangeDragRef = useRef<{ anchorYear: number; start: number; end: number } | null>(null)

  // A committed range supersedes any in-progress first click.
  useEffect(() => {
    if (value !== null) setPending(null)
  }, [value])

  const yearFromClientX = useCallback((clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect()
    return rect ? clientXToYear(clientX, rect, min, max) : min
  }, [min, max])

  const handleTrackClick = (e: React.MouseEvent) => {
    if (value !== null) return // both handles placed — drag them, or Clear
    const year = yearFromClientX(e.clientX)
    if (pending === null) {
      setPending(year)
    } else {
      onChange(pending <= year ? [pending, year] : [year, pending])
    }
  }

  const beginDrag = (handle: HandleId) => (e: React.PointerEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (handle === 'range' && value) {
      rangeDragRef.current = { anchorYear: yearFromClientX(e.clientX), start: value[0], end: value[1] }
    }
    setDragging(handle)
  }

  useEffect(() => {
    if (!dragging || !value) return
    const [start, end] = value
    const onMove = (e: PointerEvent) => {
      const year = yearFromClientX(e.clientX)
      if (dragging === 'start') onChange([Math.min(year, end), end])
      else if (dragging === 'end') onChange([start, Math.max(year, start)])
      else {
        const anchor = rangeDragRef.current
        if (!anchor) return
        const width = anchor.end - anchor.start
        const delta = Math.max(min - anchor.start, Math.min(year - anchor.anchorYear, max - anchor.end))
        const newStart = anchor.start + delta
        onChange([newStart, newStart + width])
      }
    }
    const onUp = () => { setDragging(null); rangeDragRef.current = null }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [dragging, value, onChange, yearFromClientX, min, max])

  const adjust = (handle: HandleId) => (e: React.KeyboardEvent) => {
    if (!value) return
    const [start, end] = value
    if (e.key === 'Home') { e.preventDefault(); onChange(handle === 'start' ? [min, end] : [start, min]); return }
    if (e.key === 'End') { e.preventDefault(); onChange(handle === 'start' ? [max, end] : [start, max]); return }
    let delta = 0
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') delta = -1
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') delta = 1
    else return
    e.preventDefault()
    if (handle === 'start') onChange([Math.min(Math.max(min, start + delta), end), end])
    else onChange([start, Math.max(Math.min(max, end + delta), start)])
  }

  const hasRange = value !== null

  return (
    <div
      ref={trackRef}
      onClick={handleTrackClick}
      role="group"
      aria-label="Year range filter"
      className={`relative h-5 flex-1 ${hasRange ? '' : 'cursor-pointer'}`}
    >
      <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-muted" />
      {hasRange && (
        <div
          aria-hidden="true"
          title="Drag to move the range"
          onPointerDown={beginDrag('range')}
          className="absolute top-1/2 h-3 -translate-y-1/2 touch-none cursor-grab rounded-full bg-primary active:cursor-grabbing"
          style={{
            left: `${yearToPercent(value[0], min, max)}%`,
            right: `${100 - yearToPercent(value[1], min, max)}%`,
          }}
        />
      )}
      {hasRange ? (
        <>
          <Thumb
            pct={yearToPercent(value[0], min, max)} year={value[0]} min={min} max={max} label="Start year"
            onPointerDown={beginDrag('start')} onKeyDown={adjust('start')}
          />
          <Thumb
            pct={yearToPercent(value[1], min, max)} year={value[1]} min={min} max={max} label="End year"
            onPointerDown={beginDrag('end')} onKeyDown={adjust('end')}
          />
        </>
      ) : pending !== null ? (
        <Thumb pct={yearToPercent(pending, min, max)} year={pending} min={min} max={max} label="Range start" />
      ) : null}
    </div>
  )
}

function Thumb({ pct, year, min, max, label, onPointerDown, onKeyDown }: {
  pct: number
  year: number
  min: number
  max: number
  label: string
  onPointerDown?: (e: React.PointerEvent) => void
  onKeyDown?: (e: React.KeyboardEvent) => void
}) {
  const interactive = !!onPointerDown
  return (
    <div
      role={interactive ? 'slider' : undefined}
      aria-orientation={interactive ? 'horizontal' : undefined}
      aria-label={interactive ? label : undefined}
      aria-valuemin={interactive ? min : undefined}
      aria-valuemax={interactive ? max : undefined}
      aria-valuenow={interactive ? year : undefined}
      tabIndex={interactive ? 0 : undefined}
      title={`${label}: ${year}`}
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      className={`absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background shadow-sm ${
        interactive ? 'touch-none cursor-grab focus:outline-none focus:ring-2 focus:ring-ring active:cursor-grabbing' : ''
      }`}
      style={{ left: `${pct}%` }}
    />
  )
}
