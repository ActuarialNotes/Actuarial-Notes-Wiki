-- user_banners: tracks earned (free) banner ownership.
-- Designation banners are earned by completing exam requirements (validated client-side).
-- Beta Tester banner is granted for beta_code_redemptions membership.
-- Custom banners are purchased via purchase_cosmetic('banner:custom', 100) — that
-- entry lives in user_cosmetics, not here.

CREATE TABLE IF NOT EXISTS user_banners (
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  banner_id   text        NOT NULL,
  unlocked_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, banner_id)
);

CREATE INDEX IF NOT EXISTS user_banners_user_idx ON user_banners (user_id);

ALTER TABLE user_banners ENABLE ROW LEVEL SECURITY;

-- Users manage their own banner rows. No monetary value, so client-side
-- eligibility checks are acceptable.
CREATE POLICY "users can manage their own banners"
  ON user_banners FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
