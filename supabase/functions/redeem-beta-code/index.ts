import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const APP_ORIGIN = 'https://quiz.actuarialnotes.com'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': APP_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Vary': 'Origin',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  })
}

// Accepted beta tester codes (case-insensitive). Set BETA_TESTER_CODES as a
// comma-separated env var to override; otherwise falls back to the default.
function getAcceptedCodes(): Set<string> {
  const envCodes = Deno.env.get('BETA_TESTER_CODES')
  if (envCodes) {
    return new Set(envCodes.split(',').map(c => c.trim().toLowerCase()).filter(Boolean))
  }
  return new Set(['actup2026'])
}

// A Pro access key, normalized the way scripts/pro_access_keys.py hashes it:
// upper-cased, dashes and spaces removed. Only the sha256 is stored.
async function accessKeyHash(raw: string): Promise<string> {
  const normalized = raw.toUpperCase().replace(/[\s-]/g, '')
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(normalized))
  return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('')
}

function addMonths(from: Date, months: number): Date {
  const d = new Date(from)
  d.setUTCMonth(d.getUTCMonth() + months)
  return d
}

// Redeem a single-use Pro access key (pro_access_keys). The key is claimed in
// one conditional UPDATE, so two accounts racing for it can't both win; if the
// subscription write then fails, the claim is released.
async function redeemAccessKey(
  admin: ReturnType<typeof createClient>,
  userId: string,
  raw: string,
): Promise<Response> {
  const codeHash = await accessKeyHash(raw)
  const now = new Date()

  const { data: sub } = await admin
    .from('user_subscriptions')
    .select('tier, status, stripe_subscription_id, current_period_end')
    .eq('user_id', userId)
    .maybeSingle()

  const periodEnd = sub?.current_period_end ? new Date(sub.current_period_end as string) : null
  const activePro = sub?.tier === 'premium' && sub?.status === 'active' &&
    (!periodEnd || periodEnd > now)
  // A paying subscriber's period is Stripe's to set — the webhook would
  // overwrite the extension — so don't spend their key on nothing.
  if (activePro && sub?.stripe_subscription_id) {
    return json({ error: 'You already have a Pro subscription' }, 400)
  }

  const { data: claimed, error: claimErr } = await admin
    .from('pro_access_keys')
    .update({ redeemed_by: userId, redeemed_at: now.toISOString() })
    .eq('code_hash', codeHash)
    .is('redeemed_at', null)
    .or(`expires_at.is.null,expires_at.gt.${now.toISOString()}`)
    .select('duration_months')
    .maybeSingle()

  if (claimErr) {
    console.error('redeem-beta-code: claim key error:', claimErr)
    return json({ error: 'Failed to redeem code' }, 500)
  }
  if (!claimed) return json({ error: 'Invalid or already used code' }, 400)

  // Months are added to whatever Pro time the account already has left.
  const start = activePro && periodEnd ? periodEnd : now
  const end = addMonths(start, claimed.duration_months as number)

  const { error: upsertErr } = await admin
    .from('user_subscriptions')
    .upsert(
      {
        user_id: userId,
        tier: 'premium',
        status: 'active',
        current_period_end: end.toISOString(),
        updated_at: now.toISOString(),
      },
      { onConflict: 'user_id' },
    )

  if (upsertErr) {
    console.error('redeem-beta-code: upsert subscription error:', upsertErr)
    await admin
      .from('pro_access_keys')
      .update({ redeemed_by: null, redeemed_at: null })
      .eq('code_hash', codeHash)
    return json({ error: 'Failed to activate Pro' }, 500)
  }

  return json({ success: true, currentPeriodEnd: end.toISOString() })
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS })
  }

  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return json({ error: 'Unauthorized' }, 401)
  const token = authHeader.replace(/^Bearer\s+/i, '')

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

  const admin = createClient(supabaseUrl, serviceRoleKey)
  const { data: { user }, error: userErr } = await admin.auth.getUser(token)
  if (userErr || !user) return json({ error: 'Unauthorized' }, 401)

  let body: { code?: string } = {}
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid request body' }, 400)
  }

  const code = (body.code ?? '').trim().toLowerCase()
  if (!code) return json({ error: 'No code provided' }, 400)

  if (!getAcceptedCodes().has(code)) {
    return redeemAccessKey(admin, user.id, code)
  }

  // Check if this user already redeemed a beta code
  const { data: existing } = await admin
    .from('beta_code_redemptions')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (existing) {
    return json({ error: 'You have already redeemed a beta code' }, 400)
  }

  // Record the redemption
  const { error: insertErr } = await admin
    .from('beta_code_redemptions')
    .insert({ user_id: user.id, code })

  if (insertErr) {
    console.error('redeem-beta-code: insert redemption error:', insertErr)
    return json({ error: 'Failed to redeem code' }, 500)
  }

  // Grant Pro access (no expiry — use a far-future date for compatibility).
  // The stored tier value is `premium`; it is what the DB constraint and every
  // existing row use. See the note on SubscriptionTier in useSubscription.ts.
  const farFuture = new Date('2099-12-31T23:59:59Z').toISOString()
  const { error: upsertErr } = await admin
    .from('user_subscriptions')
    .upsert(
      {
        user_id: user.id,
        tier: 'premium',
        status: 'active',
        current_period_end: farFuture,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' },
    )

  if (upsertErr) {
    console.error('redeem-beta-code: upsert subscription error:', upsertErr)
    // Roll back redemption record on failure
    await admin.from('beta_code_redemptions').delete().eq('user_id', user.id)
    return json({ error: 'Failed to activate Pro' }, 500)
  }

  return json({ success: true })
})
