-- concept_level_events: every change of a concept's mastery level, append-only.
--
-- daily_completions can't be a concept's history: it is one row per
-- (exam, concept, day) and records climbs only, because it is the study plan's
-- "completed today" checkmark. A fall to Forgotten (three misses in a row) was
-- never written, and a second change on the same day overwrote the first, so
-- the Learning Progress graph drew Level 3 → Level 1 with no dip between.
--
-- One row per step, in the order the answers caused them: a quiz that forgets a
-- concept and relearns it writes level3 → forgotten, then forgotten → level1.
-- Written by the client on quiz completion beside daily_completions; read by
-- useConceptLearningHistory. Decay is not written — it is derived from the
-- clock (lib/learningHistory.ts fills it in).

CREATE TABLE IF NOT EXISTS concept_level_events (
  id           bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id      uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_id      text        NOT NULL,
  concept_slug text        NOT NULL,    -- canonical concept name (matches concept_mastery)
  from_state   text        NOT NULL,
  to_state     text        NOT NULL,
  at           timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS concept_level_events_user_concept_idx
  ON concept_level_events (user_id, concept_slug, at);

ALTER TABLE concept_level_events ENABLE ROW LEVEL SECURITY;

-- Insert, read and (for Settings → reset progress) delete one's own rows.
-- No UPDATE: a recorded step is never rewritten.
DROP POLICY IF EXISTS "users read their own level events" ON concept_level_events;
CREATE POLICY "users read their own level events"
  ON concept_level_events FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "users add their own level events" ON concept_level_events;
CREATE POLICY "users add their own level events"
  ON concept_level_events FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "users delete their own level events" ON concept_level_events;
CREATE POLICY "users delete their own level events"
  ON concept_level_events FOR DELETE
  USING (auth.uid() = user_id);

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE concept_level_events;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN feature_not_supported THEN NULL;
  WHEN undefined_object THEN NULL;
END $$;
