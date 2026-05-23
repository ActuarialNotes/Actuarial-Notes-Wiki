import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno'

// Comments
// Stripe webhooks come from Stripe's servers, not the browser — no CORS, no
// user auth header. We verify authenticity via the signature header.

function tierFromStatus(status: Stripe.Subscription.Status): { tier: 'free' | 'premium'; status: 'active' | 'canceled' | 'past_due' | 'inactive' } {
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

async function syncSubscription(
  admin: ReturnType<typeof createClient>,
  stripe: Stripe,
  subscription: Stripe.Subscription,
) {
  const customerId = typeof subscription.customer === 'string'
    ? subscription.customer
    : subscription.customer.id

  // Prefer subscription metadata, then customer metadata, then DB lookup.
  let userId = subscription.metadata?.supabase_user_id ?? null
  if (!userId) {
    const customer = await stripe.customers.retrieve(customerId)
    if (!customer.deleted) {
      userId = customer.metadata?.supabase_user_id ?? null
    }
  }
  if (!userId) {
    const { data } = await admin
      .from('user_subscriptions')
      .select('user_id')
      .eq('stripe_customer_id', customerId)
      .maybeSingle()
    userId = (data?.user_id as string | undefined) ?? null
  }
  if (!userId) {
    console.error('webhook: could not resolve user for customer', customerId)
    return
  }

  const { tier, status } = tierFromStatus(subscription.status)

  await admin
    .from('user_subscriptions')
    .upsert(
      {
        user_id: userId,
        tier,
        status,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscription.id,
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' },
    )
}

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!

  const stripe = new Stripe(stripeSecret, { apiVersion: '2024-06-20' })
  const admin = createClient(supabaseUrl, serviceRoleKey)

  const sig = req.headers.get('stripe-signature')
  if (!sig) return new Response('missing signature', { status: 400 })

  const rawBody = await req.text()
  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(rawBody, sig, webhookSecret)
  } catch (err) {
    console.error('webhook signature verification failed:', err)
    return new Response('invalid signature', { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.mode === 'subscription' && session.subscription) {
          const subId = typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription.id
          const subscription = await stripe.subscriptions.retrieve(subId)
          await syncSubscription(admin, stripe, subscription)
        }
        break
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await syncSubscription(admin, stripe, subscription)
        break
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        if (invoice.subscription) {
          const subId = typeof invoice.subscription === 'string'
            ? invoice.subscription
            : invoice.subscription.id
          const subscription = await stripe.subscriptions.retrieve(subId)
          await syncSubscription(admin, stripe, subscription)
        }
        break
      }
    }
  } catch (err) {
    console.error('webhook handler error:', err)
    return new Response('handler error', { status: 500 })
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})
