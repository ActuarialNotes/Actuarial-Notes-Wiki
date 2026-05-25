import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface ImageGalleryModalProps {
  images: Array<{ src: string; alt: string }>
  initialIndex: number
  onClose: () => void
}

export function ImageGalleryModal({ images, initialIndex, onClose }: ImageGalleryModalProps) {
  const [index, setIndex] = useState(initialIndex)

  const canPrev = index > 0
  const canNext = index < images.length - 1

  function prev() { if (canPrev) setIndex(i => i - 1) }
  function next() { if (canNext) setIndex(i => i + 1) }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, onClose])

  const current = images[index]

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/90"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0"
        onClick={e => e.stopPropagation()}
      >
        <span className="text-sm text-white/70 tabular-nums">
          {index + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-white/70 hover:text-white p-1 rounded transition-colors"
          aria-label="Close gallery"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main image area */}
      <div
        className="flex-1 flex items-center justify-center min-h-0 relative"
        onClick={e => e.stopPropagation()}
      >
        {canPrev && (
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 sm:left-4 text-white/70 hover:text-white p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          className="max-h-full max-w-full object-contain select-none"
          draggable={false}
        />

        {canNext && (
          <button
            type="button"
            onClick={next}
            className="absolute right-2 sm:right-4 text-white/70 hover:text-white p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Alt text */}
      {current.alt && (
        <div
          className="shrink-0 text-center px-4 py-2"
          onClick={e => e.stopPropagation()}
        >
          <span className="text-sm text-white/60">{current.alt}</span>
        </div>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          className="shrink-0 flex items-center gap-2 px-4 py-3 overflow-x-auto"
          onClick={e => e.stopPropagation()}
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
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
