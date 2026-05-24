import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno'

// Post-payment sync fallback: called by the frontend after Stripe redirects back
// to the app. Bridges the gap when webhooks are slow or not yet configured.

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

function tierFromStatus(status: Stripe.Subscription.Status): {
  tier: 'free' | 'premium'
  status: 'active' | 'canceled' | 'past_due' | 'inactive'
} {
  switch (status) {
    case 'active':
    case 'trialing':
      return { tier: 'premium', status: 'active' }
    case 'past_due':
    case 'unpaid':
      return { tier: 'premium', status: 'past_due' }
    case 'canceled':
    case 'incomplete_expired':
      return { tier: 'free', status: 'canceled' }
    default:
      return { tier: 'free', status: 'inactive' }
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS })
  }
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
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

    const stripe = new Stripe(stripeSecret, { apiVersion: '2024-06-20' })

    let body: { sessionId?: string } = {}
    try {
      body = await req.json()
    } catch {
      // sessionId is optional — we'll fall back to the customer's latest session
    }

    const { sessionId } = body

    // Look up the user's stripe_customer_id from the DB
    const { data: subRow } = await admin
      .from('user_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .maybeSingle()

    let subscription: Stripe.Subscription | null = null

    if (sessionId) {
      // Retrieve the specific checkout session the user just completed
      const session = await stripe.checkout.sessions.retrieve(sessionId)

      // Security: ensure this session belongs to the authenticated user
      const sessionUserId = session.metadata?.supabase_user_id
      const sessionCustomerId = typeof session.customer === 'string'
        ? session.customer
        : session.customer?.id ?? null

      const ownsSession =
        sessionUserId === user.id ||
        (subRow?.stripe_customer_id && sessionCustomerId === subRow.stripe_customer_id)

      if (!ownsSession) {
        console.error('stripe-sync-session: session does not belong to user', user.id)
        return json({ error: 'Session does not belong to this user' }, 403)
      }

      if (session.payment_status !== 'paid' || session.mode !== 'subscription' || !session.subscription) {
        // Nothing to sync — session isn't a completed subscription payment
        return json({ synced: false, reason: 'session not paid or not a subscription' })
      }

      const subId = typeof session.subscription === 'string'
        ? session.subscription
        : session.subscription.id
      subscription = await stripe.subscriptions.retrieve(subId)
    } else if (subRow?.stripe_customer_id) {
      // No session ID provided — find the most recent active subscription for this customer
      const subscriptions = await stripe.subscriptions.list({
        customer: subRow.stripe_customer_id,
        limit: 1,
        status: 'active',
      })
      subscription = subscriptions.data[0] ?? null
    }

    if (!subscription) {
      return json({ synced: false, reason: 'no subscription found' })
    }

    const { tier, status } = tierFromStatus(subscription.status)
    const customerId = typeof subscription.customer === 'string'
      ? subscription.customer
      : subscription.customer.id

    await admin
      .from('user_subscriptions')
      .upsert(
        {
          user_id: user.id,
          tier,
          status,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscription.id,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' },
      )

    return json({ synced: true, tier, status })
  } catch (err) {
    console.error('stripe-sync-session error:', err)
    const message = err instanceof Error ? err.message : 'Unexpected error'
    return json({ error: message }, 500)
  }
})
