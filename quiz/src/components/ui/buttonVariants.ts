import { cva } from 'class-variance-authority'

/**
 * The Ink buttons (style guide §7.0, §7.1). Every button is a pill. The one
 * committing action is the inverted solid (`default`); everything quieter has
 * no fill at rest — a wash under the press — and goes solid in the pick while
 * the menu it opens is open (`aria-expanded`) or while it is on
 * (`aria-pressed`).
 */
const QUIET_PICK =
  'aria-expanded:bg-pick aria-expanded:text-pick-foreground aria-pressed:bg-pick aria-pressed:text-pick-foreground'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary font-semibold text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive font-semibold text-destructive-foreground hover:bg-destructive/90',
        outline: `font-semibold text-foreground hover:bg-muted ${QUIET_PICK}`,
        secondary: `font-semibold text-foreground hover:bg-muted ${QUIET_PICK}`,
        ghost: `text-muted-foreground hover:bg-muted hover:text-foreground ${QUIET_PICK}`,
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-5 text-[15px]',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-12 px-7 text-[15px]',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
