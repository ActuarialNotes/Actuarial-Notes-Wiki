// Tiny inline-SVG sparkline for a single agent's metric series. Hand-rolled
// (rather than a Recharts instance per table row) to keep a wide comparison
// table cheap to render.

export function MetricSparkline({
  values,
  width = 72,
  height = 22,
  className = 'text-primary',
}: {
  values: number[]
  width?: number
  height?: number
  className?: string
}) {
  if (values.length < 2) {
    return <span className="text-xs text-muted-foreground">—</span>
  }

  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const stepX = width / (values.length - 1)
  const pad = 2

  const points = values
    .map((v, i) => {
      const x = i * stepX
      const y = pad + (height - 2 * pad) * (1 - (v - min) / span)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      preserveAspectRatio="none"
      aria-hidden
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
