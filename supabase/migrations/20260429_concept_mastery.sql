-- concept_mastery: per-user, per-exam, per-concept state machine
-- States: new → learning → strong, plus a forgotten state reachable from any
-- non-new state. Transitions are computed client-side on every quiz completion;
-- the 15-day decay is enforced lazily by aggregating `last_correct_at` at read
-- time, so no scheduled job is required.

CREATE TABLE IF NOT EXISTS concept_mastery (
  user_id            uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_id            text        NOT NULL,
  concept_slug       text        NOT NULL,    -- canonical concept name (e.g. "Probability")
  state              text        NOT NULL DEFAULT 'new'
                       CHECK (state IN ('new', 'learning', 'strong', 'forgotten')),
  correct_count      int         NOT NULL DEFAULT 0,
  incorrect_streak   int         NOT NULL DEFAULT 0,
  hard_correct_count int         NOT NULL DEFAULT 0,
  last_correct_at    timestamptz,
  last_attempted_at  timestamptz,
  updated_at         timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, exam_id, concept_slug)
);

CREATE INDEX IF NOT EXISTS concept_mastery_user_exam_idx
  ON concept_mastery (user_id, exam_id);

ALTER TABLE concept_mastery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can manage their own concept mastery"
  ON concept_mastery FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
