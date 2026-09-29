import { describe, expect, it } from 'vitest'
import { actuariaDestination, canEnterActuaria } from './access'

describe('entering Actuaria', () => {
  it('is for a signed-in Pro account', () => {
    expect(canEnterActuaria({ signedIn: true, isPro: true }, false)).toBe(true)
    expect(canEnterActuaria({ signedIn: true, isPro: false }, false)).toBe(false)
    expect(canEnterActuaria({ signedIn: false, isPro: false }, false)).toBe(false)
  })

  it('is open to anyone in a preview build', () => {
    expect(canEnterActuaria({ signedIn: false, isPro: false }, true)).toBe(true)
  })

  it('sends everyone else to sign in, then to Pro', () => {
    expect(actuariaDestination({ signedIn: false, isPro: false })).toBe('/auth')
    expect(actuariaDestination({ signedIn: true, isPro: false })).toBe('/upgrade')
  })
})

describe('the database holds cohorts to the same rule', () => {
  it('reads Pro as useSubscription’s isActivePro does', async () => {
    const { readFileSync } = await import('node:fs')
    const { fileURLToPath } = await import('node:url')
    const sql = readFileSync(fileURLToPath(new URL('../../../../supabase/migrations/20261001_actuaria_pro.sql', import.meta.url)), 'utf8')
    expect(sql).toContain("s.tier = 'premium'")
    expect(sql).toContain("s.status = 'active'")
    expect(sql).toContain('s.current_period_end IS NULL OR s.current_period_end > now()')
    // Both ways into a cohort check it.
    expect(sql.match(/IF NOT actuaria_is_pro\(v_user\) THEN/g)).toHaveLength(2)
  })
})
