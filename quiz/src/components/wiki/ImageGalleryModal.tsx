import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { DistributionSimulator } from '@/components/wiki/DistributionSimulator'
import { distributionForImage } from '@/lib/distributions'

interface GalleryImage {
  src: string
  alt: string
  caption: string
}

/**
 * Where the modal sits.
 *
 * `popup` — hosted by the concept popup, whose Previous/Next footer (and the
 * mobile bottom nav under it) stays live below the modal and seeks to the next
 * concept that has a figure.
 *
 * `popup-focus` — the same host in focus mode, which moves the popup to the top
 * of the viewport *and* up the z stack (z-index 56, see
 * `.concept-popup-aside[data-focus="true"]` in index.css) and drops the mobile
 * bottom nav; the modal has to clear both to be visible at all, and its bottom
 * inset shrinks to the popup's own footer.
 *
 * `fullscreen` — the standalone viewer opened by tapping a content image
 * anywhere in the app (`components/ImageFocus.tsx`). There is no host chrome to
 * stay clear of, so it takes the whole viewport.
 */
export type GalleryPlacement = 'popup' | 'popup-focus' | 'fullscreen'

const PLACEMENT_INSET: Record<GalleryPlacement, string> = {
  popup: 'bottom-[7.5rem] md:bottom-16',
  'popup-focus': 'bottom-16',
  fullscreen: 'bottom-0',
}

interface ImageGalleryModalProps {
  images: GalleryImage[]
  initialIndex: number
  placement?: GalleryPlacement
  onClose: () => void
}

const MIN_ZOOM = 1
const MAX_ZOOM = 4

export function ImageGalleryModal({ images, initialIndex, placement = 'fullscreen', onClose }: ImageGalleryModalProps) {
  // Paper: the panel sliding in.
  useSoundOnMount('open')
  const [index, setIndex] = useState(initialIndex)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [cursor, setCursor] = useState<'pointer' | 'grab' | 'grabbing'>('pointer')
  const [isDragging, setIsDragging] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const dragState = useRef<{ sx: number; sy: number; px: number; py: number } | null>(null)
  const hasMoved = useRef(false)
  const activePointers = useRef<Map<number, { x: number; y: number }>>(new Map())
  const pinchState = useRef<{ initialDist: number; initialZoom: number } | null>(null)
  const wasPinching = useRef(false)

  const canPrev = index > 0
  const canNext = index < images.length - 1

  function resetView() {
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setCursor('pointer')
  }

  function goTo(i: number) {
    setIndex(i)
    resetView()
  }

  function clampPan(x: number, y: number, z: number) {
    if (!containerRef.current) return { x, y }
    const { width, height } = containerRef.current.getBoundingClientRect()
    const maxX = (width * (z - 1)) / (2 * z)
    const maxY = (height * (z - 1)) / (2 * z)
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    }
  }

  function applyZoom(z: number) {
    const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z))
    setZoom(clamped)
    if (clamped <= MIN_ZOOM) {
      setPan({ x: 0, y: 0 })
      setCursor('pointer')
    } else {
      setPan(p => clampPan(p.x, p.y, clamped))
      setCursor('grab')
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft' && canPrev) goTo(index - 1)
      else if (e.key === 'ArrowRight' && canNext) goTo(index + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, canPrev, canNext, onClose])

  function getPinchDist() {
    const pts = Array.from(activePointers.current.values())
    if (pts.length < 2) return 0
    return Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y)
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0 && e.pointerType !== 'touch') return
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (activePointers.current.size === 2) {
      wasPinching.current = true
      pinchState.current = { initialDist: getPinchDist(), initialZoom: zoom }
      dragState.current = null
    } else {
      dragState.current = { sx: e.clientX, sy: e.clientY, px: pan.x, py: pan.y }
      hasMoved.current = false
      setIsDragging(true)
      if (zoom > MIN_ZOOM) setCursor('grabbing')
    }
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    e.preventDefault()

    if (activePointers.current.size === 2 && pinchState.current) {
      const dist = getPinchDist()
      applyZoom(pinchState.current.initialZoom * (dist / pinchState.current.initialDist))
      return
    }

    if (!dragState.current) return
    const dx = e.clientX - dragState.current.sx
    const dy = e.clientY - dragState.current.sy
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasMoved.current = true
    if (zoom > MIN_ZOOM && hasMoved.current) {
      setPan(clampPan(
        dragState.current.px + dx / zoom,
        dragState.current.py + dy / zoom,
        zoom,
      ))
    }
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.releasePointerCapture(e.pointerId)
    activePointers.current.delete(e.pointerId)

    if (activePointers.current.size === 1) {
      // One finger lifted during pinch — reset to single-touch state
      pinchState.current = null
      dragState.current = null
      hasMoved.current = false
      return
    }

    if (activePointers.current.size === 0) {
      const wasDrag = hasMoved.current
      const wasPinch = wasPinching.current
      wasPinching.current = false
      pinchState.current = null
      dragState.current = null
      hasMoved.current = false
      setIsDragging(false)
      setCursor(zoom > MIN_ZOOM ? 'grab' : 'pointer')
      if (!wasDrag && !wasPinch) onClose()
    }
  }

  const current = images[index]
  // Distribution illustrations open as the live simulator instead of a picture:
  // there's nothing to zoom or pan, and its controls must not close the modal.
  const distribution = distributionForImage(current.src)

  return (
    <div
      // z-[57] clears the focus-mode concept popup (z-index 56) — at the old
      // z-50 the modal opened *behind* it, which read as the card simply not
      // responding to a tap. How far up from the bottom it stops is the host's
      // call; see GalleryPlacement.
      className={`fixed inset-x-0 top-0 z-[57] flex flex-col bg-black/95 ${PLACEMENT_INSET[placement]}`}
      onWheel={e => e.stopPropagation()}
    >
      {/* Top bar — dimmed chrome */}
      <div className="flex items-center justify-between px-4 py-2 shrink-0 opacity-30 hover:opacity-70 transition-opacity">
        <span className="text-sm text-white tabular-nums">
          {index + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-white p-1.5 rounded"
          aria-label="Close gallery"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Image area */}
      <div className="flex-1 flex items-center justify-center min-h-0 relative">
        {canPrev && (
          <button
            type="button"
            onPointerDown={e => e.stopPropagation()}
            onClick={() => goTo(index - 1)}
            className="absolute left-2 sm:left-4 text-white/30 hover:text-white/80 p-2.5 rounded-full hover:bg-black/40 transition-colors z-10 shrink-0"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {distribution ? (
          <div className="h-full w-full overflow-y-auto px-3 py-2 sm:px-10">
            <div className="mx-auto w-full max-w-2xl">
              <DistributionSimulator
                key={distribution.key}
                spec={distribution}
                caption={current.caption}
                size="full"
              />
            </div>
          </div>
        ) : (
          /* Image container — touch-action: none lets pointer events handle all gestures */
          <div
            ref={containerRef}
            className="h-full w-full flex items-center justify-center overflow-hidden select-none"
            style={{ cursor, touchAction: 'none' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            <img
              key={current.src}
              src={current.src}
              alt={current.alt}
              className="max-h-full max-w-full object-contain"
              style={{
                transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                transformOrigin: 'center center',
                willChange: 'transform',
                transition: isDragging ? 'none' : 'transform 0.15s ease-out',
              }}
              draggable={false}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
          </div>
        )}

        {canNext && (
          <button
            type="button"
            onPointerDown={e => e.stopPropagation()}
            onClick={() => goTo(index + 1)}
            className="absolute right-2 sm:right-4 text-white/30 hover:text-white/80 p-2.5 rounded-full hover:bg-black/40 transition-colors z-10 shrink-0"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Caption — dimmed. The simulator renders its own, so skip it there. */}
      {current.caption && !distribution && (
        <div className="shrink-0 text-center px-8 pt-2 pb-0 opacity-40">
          <span className="text-sm text-white italic">{current.caption}</span>
        </div>
      )}

      {/* Zoom slider — nothing to zoom when the simulator is showing */}
      <div className={`shrink-0 items-center gap-4 px-6 py-4 ${distribution ? 'hidden' : 'flex'}`}>
        <span className="text-base text-white/50 tabular-nums w-8 shrink-0">1×</span>
        <input
          type="range"
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          step={0.05}
          value={zoom}
          onChange={e => applyZoom(parseFloat(e.target.value))}
          className="zoom-slider flex-1"
          aria-label="Zoom"
        />
        <span className="text-base text-white/50 tabular-nums w-8 shrink-0 text-right">4×</span>
        <span className="text-base text-white tabular-nums w-12 text-right shrink-0 font-semibold">
          {zoom.toFixed(1)}×
        </span>
        {zoom > MIN_ZOOM && (
          <button
            type="button"
            onClick={resetView}
            className="text-xs text-white/50 hover:text-white transition-colors shrink-0"
          >
            reset
          </button>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="shrink-0 flex items-center gap-2 px-4 pb-4 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => goTo(i)}
              className={`shrink-0 h-14 w-14 rounded border-2 overflow-hidden transition-colors ${
                i === index ? 'border-white' : 'border-white/20 hover:border-white/60'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover"
                draggable={false}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
