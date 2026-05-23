-- Tracks which users have redeemed a beta tester code.
-- One redemption per user enforced by the primary key.

CREATE TABLE IF NOT EXISTS beta_code_redemptions (
  id          bigint      PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code        text        NOT NULL,
  redeemed_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id)
);

ALTER TABLE beta_code_redemptions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own redemption records
CREATE POLICY "users can read their own redemptions"
  ON beta_code_redemptions FOR SELECT
  USING (auth.uid() = user_id);
