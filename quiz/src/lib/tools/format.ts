import type { NumberUnit } from './types'

/**
 * A number as the card and the summaries print it. Doubles are carried
 * unrounded through every calculation; this is the only rounding (§8.3).
 * One precision per quantity, so figures side by side line up
 * (docs/tool-template-v3.md §2.1): a percent to 2 decimals, a factor to 4,
 * a count to none, money to 2.
 */
export function formatValue(value: number, unit: NumberUnit): string {
  if (!Number.isFinite(value)) return '—'
  switch (unit) {
    case 'percent':
      return `${(value * 100).toFixed(2)}%`
    case 'factor':
      return value.toFixed(4)
    case 'money':
      return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    case 'count':
      return value.toLocaleString('en-US', { maximumFractionDigits: 0 })
    case 'years':
      return trim(value, 2)
    default:
      return trim(value, 4)
  }
}

/** Up to `places` decimals, with trailing zeros dropped. */
function trim(value: number, places: number): string {
  const fixed = value.toFixed(places)
  return fixed.includes('.') ? fixed.replace(/\.?0+$/, '') : fixed
}

/** A field's value as it is typed into its box: a percent as 5, not 0.05. */
export function toDisplay(value: number, unit: NumberUnit): number {
  return unit === 'percent' ? round(value * 100, 10) : value
}

export function fromDisplay(value: number, unit: NumberUnit): number {
  return unit === 'percent' ? round(value / 100, 12) : value
}

function round(value: number, places: number): number {
  const f = 10 ** places
  return Math.round(value * f) / f
}
