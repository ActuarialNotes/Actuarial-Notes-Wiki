-- user_subscriptions: per-user tier + Stripe state for Actuarial Notes Premium.
-- Writes happen exclusively via the Stripe webhook (service role); clients only
-- read their own row to derive `isPremium`.

CREATE TABLE IF NOT EXISTS user_subscriptions (
  user_id                uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tier                   text        NOT NULL DEFAULT 'free'
                           CHECK (tier IN ('free', 'premium')),
  status                 text        NOT NULL DEFAULT 'inactive'
                           CHECK (status IN ('active', 'canceled', 'past_due', 'inactive')),
  stripe_customer_id     text,
  stripe_subscription_id text,
  current_period_end     timestamptz,
  updated_at             timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS user_subscriptions_customer_idx
  ON user_subscriptions (stripe_customer_id);

ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can read their own subscription"
  ON user_subscriptions FOR SELECT
  USING (auth.uid() = user_id);
