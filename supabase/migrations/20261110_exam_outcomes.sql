-- exam_outcomes: how a reader's exam went (roadmap L18, decision D34).
--
-- After a sitting's results are out, the Dashboard asks once about the sitting
-- the reader's exam date fell in (lib/examOutcome.ts). One row per answer:
-- passed, didn't pass, didn't sit, or rather not say. No score is asked for.
--
-- Private to the account: a reader inserts, reads, changes and deletes only
-- their own rows. Nobody else reads them through the API; they are used only
-- in aggregate, by the service role, to check whether readiness predicts
-- passing.

CREATE TABLE IF NOT EXISTS exam_outcomes (
  user_id        uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_id        text        NOT NULL,   -- exam_progress key: P, FM, MAS-I, CAS-5 …
  sitting_start  date        NOT NULL,   -- the sitting's first day (data/examSittings.ts)
  outcome        text        NOT NULL
                   CHECK (outcome IN ('passed', 'not_passed', 'did_not_sit', 'rather_not_say')),
  answered_at    timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, exam_id, sitting_start)
);

ALTER TABLE exam_outcomes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users read their own exam outcomes" ON exam_outcomes;
CREATE POLICY "users read their own exam outcomes"
  ON exam_outcomes FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "users add their own exam outcomes" ON exam_outcomes;
CREATE POLICY "users add their own exam outcomes"
  ON exam_outcomes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "users change their own exam outcomes" ON exam_outcomes;
CREATE POLICY "users change their own exam outcomes"
  ON exam_outcomes FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "users delete their own exam outcomes" ON exam_outcomes;
CREATE POLICY "users delete their own exam outcomes"
  ON exam_outcomes FOR DELETE
  USING (auth.uid() = user_id);
