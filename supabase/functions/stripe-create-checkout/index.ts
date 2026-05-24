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
    const priceId = Deno.env.get('STRIPE_PREMIUM_PRICE_ID')
    if (!stripeSecret) return json({ error: 'Configuration error: STRIPE_SECRET_KEY is not set' }, 500)
    if (!priceId) return json({ error: 'Configuration error: STRIPE_PREMIUM_PRICE_ID is not set' }, 500)

    const admin = createClient(supabaseUrl, serviceRoleKey)
    const { data: { user }, error: userErr } = await admin.auth.getUser(token)
    if (userErr || !user) return json({ error: 'Unauthorized' }, 401)

    const stripe = new Stripe(stripeSecret, { apiVersion: '2024-06-20' })

    // Reuse existing Stripe customer if we have one; otherwise create one and
    // persist it so subsequent checkouts/portal sessions can be opened against
    // the same customer record.
    const { data: existing } = await admin
      .from('user_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .maybeSingle()

    let customerId = existing?.stripe_customer_id ?? null
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email ?? undefined,
        metadata: { supabase_user_id: user.id },
      })
      customerId = customer.id
      await admin
        .from('user_subscriptions')
        .upsert(
          { user_id: user.id, stripe_customer_id: customerId, updated_at: new Date().toISOString() },
          { onConflict: 'user_id' },
        )
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${APP_ORIGIN}/dashboard?upgraded=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_ORIGIN}/upgrade`,
      metadata: { supabase_user_id: user.id },
      subscription_data: { metadata: { supabase_user_id: user.id } },
      allow_promotion_codes: true,
    })

    return json({ url: session.url })
  } catch (err) {
    console.error('stripe-create-checkout error:', err)
    const message = err instanceof Error ? err.message : 'Stripe error'
    return json({ error: message }, 500)
  }
})
