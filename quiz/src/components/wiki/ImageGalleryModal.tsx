import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface GalleryImage {
  src: string
  alt: string
  caption: string
}

interface ImageGalleryModalProps {
  images: GalleryImage[]
  initialIndex: number
  onClose: () => void
}

const MIN_ZOOM = 1
const MAX_ZOOM = 4

export function ImageGalleryModal({ images, initialIndex, onClose }: ImageGalleryModalProps) {
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

  return (
    <div
      className="fixed inset-x-0 top-0 bottom-[7.5rem] md:bottom-16 z-50 flex flex-col bg-black/95"
      onWheel={e => e.stopPropagation()}
    >
      {/* Custom slider styles */}
      <style>{`
        .gallery-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 40px;
          background: transparent;
          outline: none;
          cursor: pointer;
        }
        .gallery-slider::-webkit-slider-runnable-track {
          height: 14px;
          border-radius: 7px;
          background: rgba(255,255,255,0.2);
        }
        .gallery-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
          margin-top: -13px;
        }
        .gallery-slider::-moz-range-track {
          height: 14px;
          border-radius: 7px;
          background: rgba(255,255,255,0.2);
        }
        .gallery-slider::-moz-range-thumb {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }
      `}</style>

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

        {/* Image container — touch-action: none lets pointer events handle all gestures */}
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
          />
        </div>

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

      {/* Caption — dimmed */}
      {current.caption && (
        <div className="shrink-0 text-center px-8 pt-2 pb-0 opacity-40">
          <span className="text-sm text-white italic">{current.caption}</span>
        </div>
      )}

      {/* Zoom slider */}
      <div className="shrink-0 flex items-center gap-4 px-6 py-4">
        <span className="text-base text-white/50 tabular-nums w-8 shrink-0">1×</span>
        <input
          type="range"
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          step={0.05}
          value={zoom}
          onChange={e => applyZoom(parseFloat(e.target.value))}
          className="gallery-slider flex-1"
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
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
