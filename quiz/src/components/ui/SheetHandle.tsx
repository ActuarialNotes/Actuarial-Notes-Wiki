import { cn } from '@/lib/utils'

/**
 * The line at the top of a sheet: drag it up or down to resize the sheet, and
 * down past its smallest size (or flick it) to close it. The dragging is
 * `hooks/useDragToClose.ts`, which finds the handle by `data-sheet-handle`.
 *
 * With a `label` it is a pane's resize control at every width (the concept
 * reader, a document); without one it is a popup's, which only a phone draws.
 */
export function SheetHandle({ label, className }: { label?: string; className?: string }) {
  return (
    <div
      data-sheet-handle
      role={label ? 'separator' : undefined}
      aria-orientation={label ? 'horizontal' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(
        'flex shrink-0 touch-none select-none justify-center pb-2 pt-2.5',
        label && 'cursor-row-resize',
        className,
      )}
    >
      <span className="h-1 w-10 rounded-full bg-foreground" />
    </div>
  )
}

/**
 * The shell of a pane that rises from the foot of the screen and stays there
 * while the page behind is used (the concept reader, a document, Fix
 * mistakes): a popup's sheet, at every width.
 */
export const PANE_SHELL =
  'overflow-hidden rounded-t-[22px] border-[1.5px] border-b-0 border-foreground bg-ground text-foreground'
