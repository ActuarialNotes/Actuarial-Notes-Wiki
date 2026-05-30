interface RadialGaugeProps {
  pct: number
  label: string
  size?: number
  color?: string
}

export function RadialGauge({ pct, label, size = 60, color = 'hsl(221, 83%, 53%)' }: RadialGaugeProps) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.4
  const circumference = 2 * Math.PI * r
  const clampedPct = Math.max(0, Math.min(100, pct))
  const offset = circumference * (1 - clampedPct / 100)

  return (
    <div className="flex flex-col items-center gap-1 min-w-0">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${label}: ${Math.round(pct)}%`}>
        {/* Track ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth={size * 0.12}
        />
        {/* Progress ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={size * 0.12}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
        {/* Center percentage text */}
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fontSize={size * 0.2}
          fontWeight="700"
          fill="currentColor"
          className="font-bold tabular-nums"
        >
          {Math.round(pct)}%
        </text>
      </svg>
      <p className="text-[9px] text-muted-foreground leading-tight text-center max-w-[64px] line-clamp-2">
        {label}
      </p>
    </div>
  )
}
