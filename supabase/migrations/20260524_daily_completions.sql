-- daily_completions: per-user, per-day record of concept level-ups, so the
-- "completed today" checkmark on the study plan is consistent across devices.
-- Previously this signal lived only in device-local localStorage, so a quiz
-- finished on mobile would check the item there but not on desktop.
--
-- Written by the client on quiz completion (alongside concept_mastery); read by
-- the dashboard, which merges these rows with the local same-device signal.

CREATE TABLE IF NOT EXISTS daily_completions (
  user_id      uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_id      text        NOT NULL,
  concept_slug text        NOT NULL,    -- canonical concept name (matches concept_mastery)
  day          date        NOT NULL,    -- calendar day the level-up happened
  from_state   text        NOT NULL,
  to_state     text        NOT NULL,
  at           timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, exam_id, concept_slug, day)
);

CREATE INDEX IF NOT EXISTS daily_completions_user_day_idx
  ON daily_completions (user_id, day);

ALTER TABLE daily_completions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users can manage their own daily completions" ON daily_completions;
CREATE POLICY "users can manage their own daily completions"
  ON daily_completions FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Ensure realtime delivers changes for this table (no-op if the publication is
-- FOR ALL TABLES or the table is already a member).
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE daily_completions;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN feature_not_supported THEN NULL;
  WHEN undefined_object THEN NULL;
END $$;
