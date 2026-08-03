import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { findKeystone, keystonesForExam, type KeystoneProgress } from '@/lib/keystone'

// Keystone concepts — the gold marker and its explainer.
//
// The glyph is the literal thing: the wedge-shaped block at the crown of an
// arch, the one that holds every other stone in place. It is drawn rather than
// borrowed from lucide so it can carry the gold gradient of the `.keystone-*`
// material (index.css) instead of a flat stroke colour, and so it never reads
// as the gem/quest currency icons.
//
// Everything here is inert for a non-keystone concept: `<KeystoneBadge>`
// resolves the name itself and renders nothing when there is no match, so call
// sites can drop it in unconditionally.

export function KeystoneIcon({ className = 'h-4 w-4' }: { className?: string }) {
  const id = useId()
  const fill = `keystone-fill-${id}`
  const shine = `keystone-shine-${id}`
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={fill} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a16207" />
          <stop offset="38%" stopColor="#fbbf24" />
          <stop offset="62%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id={shine} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fffbeb" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* The keystone block: wider at the crown, tapering down. */}
      <path d="M3.4 4.6h17.2l-3.4 14.8H6.8z" fill={`url(#${fill})`} />
      {/* Bevel highlight down the left face. */}
      <path d="M3.4 4.6h4.9l-2.4 14.8H6.8z" fill={`url(#${shine})`} />
      <path d="M3.4 4.6h17.2l-3.4 14.8H6.8z" fill="none" stroke="#78350f" strokeOpacity="0.55" strokeWidth="0.9" strokeLinejoin="round" />
    </svg>
  )
}

interface KeystoneBadgeProps {
  /** Concept name (or wiki-link path). Non-keystones render nothing. */
  name: string
  /** `icon` for tight chrome, `chip` when there's room for the word. */
  variant?: 'icon' | 'chip'
  /** Optional roll-up, shown in the explainer when the caller already has mastery loaded. */
  progress?: KeystoneProgress
  className?: string
}

export function KeystoneBadge({ name, variant = 'icon', progress, className = '' }: KeystoneBadgeProps) {
  const match = findKeystone(name)
  const [open, setOpen] = useState(false)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  // Close on outside pointer-down / Escape. The panel is portaled to <body>,
  // so it's identified by its marker attribute rather than by containment.
  useEffect(() => {
    if (!open) return
    function onPointerDown(e: PointerEvent) {
      const target = e.target as HTMLElement | null
      if (target?.closest('[data-keystone-panel]')) return
      if (btnRef.current?.contains(target as Node)) return
      setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { e.stopPropagation(); setOpen(false) }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey, true)
    }
  }, [open])

  if (!match) return null

  const { concept, examId, examLabel } = match
  const total = keystonesForExam(examId).length

  function toggle() {
    if (!open && btnRef.current) setRect(btnRef.current.getBoundingClientRect())
    setOpen(v => !v)
  }

  const label = `${concept.name} is a keystone concept of ${examLabel}`

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={label}
        title={label}
        className={`keystone-ring keystone-wash shrink-0 inline-flex items-center justify-center gap-1 rounded-full transition-opacity hover:opacity-90 ${
          variant === 'chip' ? 'h-6 pl-1.5 pr-2' : 'h-6 w-6'
        } ${className}`}
      >
        <KeystoneIcon className={variant === 'chip' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
        {variant === 'chip' && (
          <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-200">Keystone</span>
        )}
      </button>

      {open && rect && createPortal(
        <div
          data-keystone-panel
          role="dialog"
          aria-label={`Keystone concept: ${concept.name}`}
          className="fixed z-[80] w-72 rounded-lg bg-popover text-popover-foreground shadow-lg p-3.5 keystone-ring"
          style={{
            top: Math.min(rect.bottom + 6, window.innerHeight - 16),
            left: Math.max(8, Math.min(rect.left - 8, window.innerWidth - 296)),
          }}
        >
          <div className="flex items-center gap-2">
            <KeystoneIcon className="h-5 w-5 shrink-0" />
            <span className="text-sm font-semibold">Keystone concept</span>
            <span className="ml-auto shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
              {examLabel}
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-foreground">{concept.why}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {total} concepts carry {examLabel}. Learn these first — everything else on the
            syllabus leans on them.
          </p>
          {progress && (
            <div className="mt-2.5 flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress.total ? (progress.mastered / progress.total) * 100 : 0}%`,
                    backgroundImage: 'var(--keystone-gradient)',
                  }}
                />
              </div>
              <span className="text-[11px] tabular-nums text-muted-foreground shrink-0">
                {progress.mastered}/{progress.total} mastered
              </span>
            </div>
          )}
        </div>,
        document.body,
      )}
    </>
  )
}
