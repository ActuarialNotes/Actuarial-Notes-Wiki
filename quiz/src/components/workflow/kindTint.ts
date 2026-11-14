import type { StepKind } from '@/lib/workflow'

/** Each kind of step's colour: the stripe down a card's left edge on the board, and its block in a library card's drawing. */
export const KIND_TINT: Record<StepKind, string> = {
  source: 'hsl(160 70% 48%)',
  data: 'hsl(199 89% 56%)',
  tool: 'hsl(var(--primary))',
  concept: 'hsl(38 92% 56%)',
  workflow: 'hsl(262 83% 70%)',
}
