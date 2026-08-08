import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { findKeystone, type KeystoneProgress } from '@/lib/keystone'

// Keystone concepts — the gold marker and its explainer.
//
// The marker is a **gold underline on the concept's own name**, nothing else:
// no badge, no icon beside the title. A keystone therefore looks the same
// wherever its name appears — inside a sentence on the syllabus page
// (`.wiki-link--keystone`), as the popup title, as a page heading — and the
// name itself is what you tap to confirm it is one. The explainer says only
// that: the "Keystone concept" heading, the exam it belongs to, and the exam's
// mastered count. No prose beneath it — it is read mid-study, over the concept
// it is marking, so a paragraph there is just something in the way.
//
// `KeystoneName` is inert for an ordinary concept: it renders the plain name
// with no underline and no click target, so call sites can use it for every
// concept title rather than branching.
//
// `KeystoneIcon` (the drawn arch block — deliberately not a lucide icon, so it
// can carry the gold gradient and never reads as the gem/quest currency) is
// kept for the two surfaces that mark a *space* rather than a name: the
// exam-guide keystone strip and the collect card's chip.

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

interface KeystoneNameProps {
  /** Concept name (or wiki-link path). Non-keystones render as plain text. */
  name: string
  /** Typography/layout classes for the name — applied either way. */
  className?: string
  /** Optional roll-up, shown in the explainer when the caller already has mastery loaded. */
  progress?: KeystoneProgress
}

export function KeystoneName({ name, className = '', progress }: KeystoneNameProps) {
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

  if (!match) return <span className={className}>{name}</span>

  const { concept, examLabel } = match

  function toggle() {
    if (!open && btnRef.current) setRect(btnRef.current.getBoundingClientRect())
    setOpen(v => !v)
  }

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        title={`${concept.name} is a keystone concept of ${examLabel}`}
        className={`keystone-underline text-left ${className}`}
      >
        {name}
      </button>

      {open && rect && createPortal(
        <div
          data-keystone-panel
          role="dialog"
          aria-label={`Keystone concept: ${concept.name}`}
          className="fixed z-[80] w-80 max-w-[calc(100vw-16px)] rounded-lg bg-popover text-popover-foreground shadow-lg p-3.5 keystone-ring"
          style={{
            top: Math.min(rect.bottom + 6, window.innerHeight - 16),
            left: Math.max(8, Math.min(rect.left, window.innerWidth - 328)),
          }}
        >
          <div className="flex items-center gap-2">
            <KeystoneIcon className="h-5 w-5 shrink-0" />
            <span className="text-base font-semibold">Keystone concept</span>
            <span className="ml-auto shrink-0 text-[11px] font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
              {examLabel}
            </span>
          </div>
          {progress && (
            <div className="mt-3 flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress.total ? (progress.mastered / progress.total) * 100 : 0}%`,
                    backgroundImage: 'var(--keystone-gradient)',
                  }}
                />
              </div>
              <span className="text-xs tabular-nums text-muted-foreground shrink-0">
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
