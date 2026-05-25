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

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragState.current = { sx: e.clientX, sy: e.clientY, px: pan.x, py: pan.y }
    hasMoved.current = false
    setIsDragging(true)
    if (zoom > MIN_ZOOM) setCursor('grabbing')
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragState.current) return
    const dx = e.clientX - dragState.current.sx
    const dy = e.clientY - dragState.current.sy
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasMoved.current = true
    if (zoom > MIN_ZOOM && hasMoved.current) {
      const newPan = clampPan(
        dragState.current.px + dx / zoom,
        dragState.current.py + dy / zoom,
        zoom,
      )
      setPan(newPan)
    }
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.releasePointerCapture(e.pointerId)
    const wasDrag = hasMoved.current
    dragState.current = null
    hasMoved.current = false
    setIsDragging(false)
    setCursor(zoom > MIN_ZOOM ? 'grab' : 'pointer')
    if (!wasDrag) onClose()
  }

  const current = images[index]

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/92">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <span className="text-sm text-white/60 tabular-nums">
          {index + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-white/60 hover:text-white p-1.5 rounded transition-colors"
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
            className="absolute left-2 sm:left-4 text-white/60 hover:text-white p-2.5 rounded-full bg-black/40 hover:bg-black/70 transition-colors z-10 shrink-0"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <div
          ref={containerRef}
          className="h-full w-full flex items-center justify-center overflow-hidden select-none"
          style={{ cursor }}
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
            className="absolute right-2 sm:right-4 text-white/60 hover:text-white p-2.5 rounded-full bg-black/40 hover:bg-black/70 transition-colors z-10 shrink-0"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Caption */}
      {current.caption && (
        <div className="shrink-0 text-center px-8 pt-2 pb-1">
          <span className="text-sm text-white/70 italic">{current.caption}</span>
        </div>
      )}

      {/* Zoom slider */}
      <div className="shrink-0 flex items-center gap-3 px-6 py-3">
        <span className="text-xs text-white/40 tabular-nums w-6 shrink-0">1×</span>
        <input
          type="range"
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          step={0.05}
          value={zoom}
          onChange={e => applyZoom(parseFloat(e.target.value))}
          className="flex-1 cursor-pointer"
          style={{ accentColor: 'white', height: '6px' }}
          aria-label="Zoom"
        />
        <span className="text-xs text-white/40 tabular-nums w-6 shrink-0 text-right">4×</span>
        <span className="text-sm text-white/70 tabular-nums w-10 text-right shrink-0 font-medium">
          {zoom.toFixed(1)}×
        </span>
        {zoom > MIN_ZOOM && (
          <button
            type="button"
            onClick={resetView}
            className="text-xs text-white/40 hover:text-white/80 transition-colors shrink-0 ml-1"
          >
            reset
          </button>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="shrink-0 flex items-center gap-2 px-4 pb-3 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => goTo(i)}
              className={`shrink-0 h-14 w-14 rounded border-2 overflow-hidden transition-colors ${
                i === index ? 'border-white' : 'border-white/20 hover:border-white/50'
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
