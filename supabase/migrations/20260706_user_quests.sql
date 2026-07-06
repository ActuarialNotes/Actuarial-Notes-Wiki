-- user_quests: one row per user tracking today's daily-quest board — the piece
-- of the core retention loop that turns the flat gem economy into an earn/spend
-- cycle (roadmap P1.4). The quest *mechanics* (how the personalized board is
-- generated, how a quiz advances it, how cleared quests are claimed) live in the
-- pure, tested client module lib/quests.ts, with the quests themselves authored
-- in data/quests.ts; this table just persists the resulting QuestsState so the
-- board and its progress survive across devices.
--
-- The board is personalized (a revive quest only when forgotten concepts are
-- due, a focus quest from today's study plan), so the day's generated quests are
-- frozen into `quests` on first touch of the day rather than re-derived. Written
-- by the client on quiz completion and when the Dashboard seeds the day (see
-- stores/quizStore.ts / hooks/useQuests.ts -> lib/questStore.ts). Progress
-- itself is not spendable currency, so — like user_streaks / user_xp — the
-- client owns its own row directly under RLS. The gem payout when a student
-- collects a cleared quest goes through the existing award_gems SECURITY
-- DEFINER RPC (20260523_user_gems.sql), the same trust boundary as the
-- per-answer gem reward.
--
-- `day` is the user's *local* calendar day ('YYYY-MM-DD'); `quests` is the
-- day's frozen board (QuestDef[]); `progress` maps quest id -> tally for that
-- day; `claimed` lists quest ids whose rewards were collected that day so a
-- payout can never fire twice.

CREATE TABLE IF NOT EXISTS user_quests (
  user_id     uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  day         date,                                          -- local day the board belongs to
  quests      jsonb       NOT NULL DEFAULT '[]'::jsonb,      -- the day's frozen quest board
  progress    jsonb       NOT NULL DEFAULT '{}'::jsonb,      -- quest id -> tally on `day`
  claimed     text[]      NOT NULL DEFAULT '{}',             -- quest ids collected on `day`
  time_zone   text,                                          -- IANA tz used to compute the local day
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- If the earlier revision of this migration was already applied (auto-paid
-- `rewarded` column, no stored board), upgrade it in place to the claim-based
-- shape. No-ops on a fresh install.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'user_quests' AND column_name = 'rewarded'
  ) THEN
    ALTER TABLE user_quests RENAME COLUMN rewarded TO claimed;
  END IF;
END $$;
ALTER TABLE user_quests ADD COLUMN IF NOT EXISTS quests  jsonb  NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE user_quests ADD COLUMN IF NOT EXISTS claimed text[] NOT NULL DEFAULT '{}';

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
