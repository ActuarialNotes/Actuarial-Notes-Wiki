import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const APP_ORIGIN = 'https://quiz.actuarialnotes.com'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': APP_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type, apikey',
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
    return json({ error: 'Invalid beta code' }, 400)
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

  // Grant premium access (no expiry — use a far-future date for compatibility)
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
    return json({ error: 'Failed to activate premium' }, 500)
  }

  return json({ success: true })
})
