import { useEffect, useState } from 'react'
import {
  passRatesEndpoint,
  readCachedPassRates,
  sanitizePayload,
  writeCachedPassRates,
  type PassRateRecord,
} from '@/lib/passRates'

// Live published pass rates for one exam, via `api/pass-rates.js`.
//
// Deliberately quiet: the shelf renders from the authored catalogue first and
// these figures land on top when they arrive. Nothing here surfaces a loading
// state or an error — a source that's down, unconfigured or blocked simply
// leaves the authored numbers in place, and the browser's "Pass rates ↗" link
// remains the way out.

export function useExamPassRates(exam: string): PassRateRecord[] {
  const [records, setRecords] = useState<PassRateRecord[]>([])

  useEffect(() => {
    if (!exam) {
      setRecords([])
      return
    }

    // Serve the cached copy immediately, then refresh in the background — the
    // figures move twice a year, so a week-old cache is not a stale readout.
    const cached = readCachedPassRates(exam)
    setRecords(cached?.records ?? [])
    if (cached) return

    const controller = new AbortController()
    let cancelled = false

    fetch(passRatesEndpoint(exam), { signal: controller.signal })
      .then(res => (res.ok ? res.json() : null))
      .then(json => {
        if (cancelled || !json) return
        const payload = sanitizePayload(json, exam)
        // Cache the "no source configured" answer too, so an exam nobody
        // publishes per-sitting figures for isn't re-fetched on every visit.
        writeCachedPassRates(exam, payload)
        setRecords(payload.records)
      })
      .catch(() => { /* offline or blocked — the authored catalogue stands */ })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [exam])

  return records
}
