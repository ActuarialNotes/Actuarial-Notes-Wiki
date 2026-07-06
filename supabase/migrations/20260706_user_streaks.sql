-- user_streaks: one row per user tracking the daily study streak that drives the
-- core retention loop (roadmap P1.1). The streak *math* (day boundaries, freeze
-- bridging, repair) lives in the pure, tested client module lib/streak.ts; this
-- table just persists the resulting StreakState so it survives across devices.
--
-- Written by the client on quiz completion (see stores/quizStore.ts ->
-- lib/streakStore.ts) and read by the Sidebar/BottomNav/Dashboard streak badge.
-- Streaks are not spendable currency, so — like daily_completions — the client
-- owns its own row directly under RLS rather than going through a SECURITY
-- DEFINER RPC. day fields are the user's *local* calendar day ('YYYY-MM-DD').

CREATE TABLE IF NOT EXISTS user_streaks (
  user_id            uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak     integer     NOT NULL DEFAULT 0 CHECK (current_streak >= 0),
  longest_streak     integer     NOT NULL DEFAULT 0 CHECK (longest_streak >= 0),
  last_active_day    date,                                   -- local day of most recent activity
  freezes            integer     NOT NULL DEFAULT 2 CHECK (freezes >= 0), -- streak-freeze tokens (2 to start)
  last_broken_streak integer     NOT NULL DEFAULT 0 CHECK (last_broken_streak >= 0),
  last_broken_on     date,                                   -- local day the streak last lapsed (repair window)
  time_zone          text,                                   -- IANA tz used to compute the local day
  updated_at         timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users can manage their own streak" ON user_streaks;
CREATE POLICY "users can manage their own streak"
  ON user_streaks FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Ensure realtime delivers changes for this table (no-op if the publication is
-- FOR ALL TABLES or the table is already a member).
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE user_streaks;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN feature_not_supported THEN NULL;
  WHEN undefined_object THEN NULL;
END $$;
