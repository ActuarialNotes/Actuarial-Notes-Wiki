import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/buttonVariants'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

/**
 * The solid variants are the app's committing actions — start, finish, save,
 * delete — so they keep the low body under the press (`press`). Everything
 * quieter (outline, ghost, secondary, link) falls through to the light `click`.
 * `data-sound` in `props` still wins: it spreads after this default.
 * See `docs/sound-design.md`.
 */
const SOLID_VARIANTS = new Set(['default', 'destructive'])

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        data-sound={SOLID_VARIANTS.has(variant ?? 'default') ? 'press' : undefined}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
