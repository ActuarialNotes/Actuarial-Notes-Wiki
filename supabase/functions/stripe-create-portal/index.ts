import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno'

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

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return json({ error: 'Unauthorized' }, 401)
    const token = authHeader.replace(/^Bearer\s+/i, '')

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeSecret) return json({ error: 'Configuration error: STRIPE_SECRET_KEY is not set' }, 500)

    const admin = createClient(supabaseUrl, serviceRoleKey)
    const { data: { user }, error: userErr } = await admin.auth.getUser(token)
    if (userErr || !user) return json({ error: 'Unauthorized' }, 401)

    const { data: sub } = await admin
      .from('user_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .maybeSingle()

    const customerId = sub?.stripe_customer_id ?? null
    if (!customerId) return json({ error: 'No Stripe subscription found.' }, 400)

    const body = await req.json().catch(() => ({}))
    const returnUrl = typeof body.return_url === 'string' ? body.return_url : `${APP_ORIGIN}/settings`

    const stripe = new Stripe(stripeSecret, { apiVersion: '2024-06-20' })
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })

    return json({ url: session.url })
  } catch (err) {
    console.error('stripe-create-portal error:', err)
    const message = err instanceof Error ? err.message : 'Stripe error'
    return json({ error: message }, 500)
  }
})
