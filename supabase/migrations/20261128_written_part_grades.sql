-- Written-part grades: one row each time a signed-in reader marks a written
-- part of a question Full, Partial or None against the sample answer.
--
-- `question_responses` keeps one row per question with a single `is_correct`,
-- so a part's own grade was lost the moment a quiz was saved. This table keeps
-- it, and it is what Analytics' "Written answers" section reads
-- (quiz/src/lib/writtenFeedback.ts): which command words and kinds of part
-- lose a reader credit over time, quoted against the examiners' reports.
--
-- Kept deliberately small. Nothing derived from the vault is stored — the
-- part's command word, its kind and the examiners' sentences are read off the
-- question bank when the screen is drawn, so a corrected question changes
-- every reader's history without a migration. The reader's own answer text is
-- not stored either. Rows are written for every signed-in reader; only the
-- screen is Pro.

CREATE TABLE IF NOT EXISTS written_part_grades (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id  uuid        REFERENCES quiz_sessions(id) ON DELETE SET NULL,
  question_id text        NOT NULL,
  -- The part's letter; NULL for a question with no lettered parts.
  part_label  text,
  -- The question bank's exam label ('Exam 5', 'Exam 6C' …).
  exam        text        NOT NULL,
  grade       text        NOT NULL,
  -- The grade the answer checks suggested when it was marked, or NULL.
  suggested   text,
  -- The part's points when it was answered (0 when the paper prints none).
  points      numeric     NOT NULL DEFAULT 0,
  -- Where it was marked: a quiz, Fix mistakes, a question's own page, the Tutor.
  source      text        NOT NULL DEFAULT 'quiz',
  graded_at   timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT written_part_grades_grade CHECK (grade IN ('correct', 'partial', 'incorrect')),
  CONSTRAINT written_part_grades_suggested CHECK (suggested IS NULL OR suggested IN ('correct', 'partial', 'incorrect')),
  CONSTRAINT written_part_grades_source CHECK (source IN ('quiz', 'review', 'page', 'tutor')),
  CONSTRAINT written_part_grades_question_length CHECK (char_length(question_id) BETWEEN 1 AND 200),
  CONSTRAINT written_part_grades_part_length CHECK (part_label IS NULL OR char_length(part_label) <= 20),
  CONSTRAINT written_part_grades_exam_length CHECK (char_length(exam) BETWEEN 1 AND 60),
  CONSTRAINT written_part_grades_points CHECK (points >= 0 AND points <= 100)
);

-- The screen's one query: a reader's rows for one exam, newest first.
CREATE INDEX IF NOT EXISTS written_part_grades_user_exam_idx
  ON written_part_grades (user_id, exam, graded_at DESC);

ALTER TABLE written_part_grades ENABLE ROW LEVEL SECURITY;

-- A reader writes, reads and deletes their own grades. No UPDATE policy: a
-- grade is a record of one attempt. Delete is Settings' Reset History
-- (quiz/src/lib/resetProgress.ts); deleting the account removes them too
-- (ON DELETE CASCADE).
DROP POLICY IF EXISTS "users insert own written grades" ON written_part_grades;
CREATE POLICY "users insert own written grades"
  ON written_part_grades FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "users read own written grades" ON written_part_grades;
CREATE POLICY "users read own written grades"
  ON written_part_grades FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "users delete own written grades" ON written_part_grades;
CREATE POLICY "users delete own written grades"
  ON written_part_grades FOR DELETE
  USING (auth.uid() = user_id);
