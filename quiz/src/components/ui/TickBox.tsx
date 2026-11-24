// The checkbox drawn beside a choice (the quiz setup sheet's topics, the one
// search's questions): a 24px box filled with the text colour when ticked, a
// bar when partly. Drawn only; the control around it carries the role.

import { cn } from '@/lib/utils'

export function TickBox({ state, className }: { state: 'all' | 'some' | 'none'; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px]',
        state === 'none' ? 'border-[1.5px] border-foreground' : 'bg-foreground text-ground',
        className,
      )}
    >
      {state === 'all' && (
        <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12l5 5 9-10" />
        </svg>
      )}
      {state === 'some' && <span className="h-[3px] w-3 rounded-full bg-ground" />}
    </span>
  )
}
