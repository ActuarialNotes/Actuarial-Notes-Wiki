-- user_quests: one row per user tracking today's daily-quest progress — the piece
-- of the core retention loop that turns the flat gem economy into an earn/spend
-- cycle (roadmap P1.4). The quest *mechanics* (which quests rotate in on a given
-- day, how a quiz advances them, when a reward fires) live in the pure, tested
-- client module lib/quests.ts, with the quests themselves authored in
-- data/quests.ts; this table just persists the resulting QuestsState so progress
-- survives across devices.
--
-- Written by the client on quiz completion (see stores/quizStore.ts ->
-- lib/questStore.ts) and read by the Dashboard quests card. Progress itself is
-- not spendable currency, so — like user_streaks / user_xp — the client owns its
-- own row directly under RLS. The gem payout for a completed quest goes through
-- the existing award_gems SECURITY DEFINER RPC (20260523_user_gems.sql), the
-- same trust boundary as the per-answer gem reward.
--
-- `day` is the user's *local* calendar day ('YYYY-MM-DD'); `progress` maps quest
-- id -> tally for that day; `rewarded` lists quest ids already paid that day so
-- a reward can never fire twice.

CREATE TABLE IF NOT EXISTS user_quests (
  user_id     uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  day         date,                                          -- local day the tallies belong to
  progress    jsonb       NOT NULL DEFAULT '{}'::jsonb,      -- quest id -> tally on `day`
  rewarded    text[]      NOT NULL DEFAULT '{}',             -- quest ids already paid on `day`
  time_zone   text,                                          -- IANA tz used to compute the local day
  updated_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_quests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users can manage their own quests" ON user_quests;
CREATE POLICY "users can manage their own quests"
  ON user_quests FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Ensure realtime delivers changes for this table (no-op if the publication is
-- FOR ALL TABLES or the table is already a member).
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE user_quests;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN feature_not_supported THEN NULL;
  WHEN undefined_object THEN NULL;
END $$;
