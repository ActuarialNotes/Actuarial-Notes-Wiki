import { useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * The board controls, bottom right under the thumb — shared by Concept Craft
 * and the Workflow Builder, so the two canvases have one set of buttons
 * (docs/concept-craft.md, docs/workflow-builder.md).
 */

/** A stack of controls on one card. */
export function ControlGroup({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-auto flex shrink-0 flex-col overflow-hidden rounded-xl bg-card shadow-[var(--shadow-card)]">
      {children}
    </div>
  )
}

export function MapButton({
  label,
  onClick,
  className,
  children,
  ...rest
}: { label: string; onClick: () => void; className?: string; children: ReactNode } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children'>) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        'flex h-14 w-14 items-center justify-center text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

/** Clear the board: the first tap arms it, the second clears — and it disarms itself. */
export function ClearButton({
  onClear,
  label = 'Clear the board',
  'data-testid': testId = 'craft-clear',
}: {
  onClear: () => void
  label?: string
  'data-testid'?: string
}) {
  const [confirming, setConfirming] = useState(false)
  useEffect(() => {
    if (!confirming) return
    const t = window.setTimeout(() => setConfirming(false), 3000)
    return () => window.clearTimeout(t)
  }, [confirming])
  return (
    <MapButton
      label={confirming ? `Tap again to ${label.charAt(0).toLowerCase()}${label.slice(1)}` : label}
      onClick={() => (confirming ? onClear() : setConfirming(true))}
      className={confirming ? 'bg-destructive text-destructive-foreground hover:bg-destructive hover:text-destructive-foreground' : undefined}
      data-testid={testId}
    >
      <RotateCcw className="h-6 w-6" />
    </MapButton>
  )
}
