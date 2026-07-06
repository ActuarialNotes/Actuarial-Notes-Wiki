-- user_xp: one row per user tracking all-time XP and the configurable daily goal
-- that make up the second piece of the core retention loop (roadmap P1.2). The XP
-- *math* (per-answer weighting, the level curve, and daily-goal scoring) lives in
-- the pure, tested client module lib/xp.ts; this table just persists the resulting
-- XpState so it survives across devices.
--
-- Written by the client on quiz completion (see stores/quizStore.ts ->
-- lib/xpStore.ts) and read by the Dashboard daily-goal ring + Settings goal
-- picker. Like user_streaks / daily_completions, XP is not spendable currency, so
-- the client owns its own row directly under RLS rather than going through a
-- SECURITY DEFINER RPC. `today` is the user's *local* calendar day ('YYYY-MM-DD').

CREATE TABLE IF NOT EXISTS user_xp (
  user_id     uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_xp    integer     NOT NULL DEFAULT 0 CHECK (total_xp >= 0),   -- all-time XP
  goal_id     text        NOT NULL DEFAULT 'regular',                 -- daily-goal preset id
  today       date,                                                   -- local day the today_xp counter belongs to
  today_xp    integer     NOT NULL DEFAULT 0 CHECK (today_xp >= 0),   -- XP earned on `today`
  time_zone   text,                                                   -- IANA tz used to compute the local day
  updated_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_xp ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users can manage their own xp" ON user_xp;
CREATE POLICY "users can manage their own xp"
  ON user_xp FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Ensure realtime delivers changes for this table (no-op if the publication is
-- FOR ALL TABLES or the table is already a member).
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE user_xp;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN feature_not_supported THEN NULL;
  WHEN undefined_object THEN NULL;
END $$;
