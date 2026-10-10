import { cn } from '@/lib/utils'

/**
 * The **Pro** label — the one chip that says "this is the paid tier".
 *
 * It is deliberately monochrome: `bg-foreground`/`text-background` resolves to
 * white-on-black in the light theme and black-on-white in the dark one, so the
 * label reads the same weight on every surface instead of picking up a hue that
 * the style guide has already spent on something else (amber is reward, violet
 * is a banner, green is correct — see `docs/style-guide.md` §2.2). Every place
 * that names the tier — the account chip, the Settings card, a locked feature —
 * renders this component so the mark can never drift between surfaces.
 */
export interface ProBadgeProps {
  /** `sm` for an inline chip beside a name, `md` for a card's own badge. */
  size?: 'sm' | 'md'
  title?: string
  className?: string
}

/** The height and type every small pill beside a name shares — the Pro chip and
 *  a designation chip (ACAS, ASA, FCAS, FSA) — so they sit on one line at one
 *  height. A fixed height, not padding, so a border or glow can't change it. */
export const NAME_PILL = 'inline-flex h-[18px] shrink-0 items-center justify-center rounded-full px-2 text-[10px] font-bold leading-none tracking-wide'

export function ProBadge({ size = 'sm', title, className }: ProBadgeProps) {
  return (
    <span
      title={title}
      className={cn(
        'inline-flex shrink-0 items-center rounded-full bg-foreground font-extrabold leading-none tracking-wide text-background',
        size === 'sm' ? 'h-[18px] px-2 text-[10px]' : 'px-2 py-1 text-xs',
        className,
      )}
    >
      Pro
    </span>
  )
}
