import { useState } from 'react'
import { LocateFixed, MapPin } from 'lucide-react'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { nearestCity, RADIUS_OPTIONS, type Home } from '@/lib/community/places'

/**
 * Where "near me" is measured from: one of the cities a community or an event
 * is in, picked from a list, or — on "Use my location" — the one of those
 * nearest where the browser says the reader is. Only the city is kept, never
 * the fix itself (`hooks/useCommunity.ts`).
 */
export function HomePicker({
  cities,
  home,
  radiusKm,
  onHome,
  onRadius,
}: {
  cities: readonly Home[]
  home: Home | null
  radiusKm: number | null
  onHome: (home: Home | null) => void
  onRadius: (km: number | null) => void
}) {
  const [locating, setLocating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const canLocate = typeof navigator !== 'undefined' && 'geolocation' in navigator

  const locate = () => {
    setLocating(true)
    setError(null)
    navigator.geolocation.getCurrentPosition(
      pos => {
        setLocating(false)
        const city = nearestCity(cities, { lat: pos.coords.latitude, lng: pos.coords.longitude })
        if (city) onHome(city)
      },
      () => {
        setLocating(false)
        setError('Your browser didn’t share a location — pick a city instead.')
      },
      { maximumAge: 3_600_000, timeout: 10_000 },
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <label className="relative inline-flex min-w-0 flex-1 items-center sm:flex-none">
          <MapPin className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" aria-hidden />
          <span className="sr-only">Your city</span>
          <select
            value={home?.label ?? ''}
            onChange={e => onHome(cities.find(c => c.label === e.target.value) ?? null)}
            className="h-10 w-full min-w-0 appearance-none rounded-full border bg-card pl-9 pr-8 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-64"
            data-testid="community-home"
          >
            <option value="">Choose your city…</option>
            {cities.map(c => (
              <option key={c.label} value={c.label}>
                {c.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 text-xs text-muted-foreground" aria-hidden>▾</span>
        </label>
        {canLocate && (
          <button
            type="button"
            onClick={locate}
            disabled={locating}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border bg-card px-3 text-sm font-medium transition-colors hover:bg-accent disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <LocateFixed className="h-4 w-4" aria-hidden />
            {locating ? 'Locating…' : 'Near me'}
          </button>
        )}
        {home && (
          <SegmentedControl
            label="How far"
            size="sm"
            pill
            value={String(radiusKm)}
            onChange={v => onRadius(v === 'null' ? null : Number(v))}
            options={RADIUS_OPTIONS.map(o => ({ value: String(o.km), label: <span className="whitespace-nowrap text-xs sm:text-sm">{o.label}</span>, ariaLabel: o.label }))}
            className="w-full sm:w-auto"
          />
        )}
      </div>
      {error && <p className="text-xs text-muted-foreground" role="status">{error}</p>}
    </div>
  )
}
