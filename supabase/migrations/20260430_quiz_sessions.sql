-- quiz_sessions: records each completed quiz attempt per user.
-- question_responses: per-question results for each session.
-- These tables are referenced by quizStore.ts (completeQuiz) and the
-- delete-account edge function (cascades on user deletion).

CREATE TABLE IF NOT EXISTS quiz_sessions (
  id                 uuid        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id            uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic              text,
  subtopic           text,
  tags               text[],
  mode               text        NOT NULL
                       CHECK (mode IN ('quiz', 'mock-exam')),
  total_questions    int         NOT NULL,
  correct_count      int         NOT NULL,
  time_taken_seconds int,
  completed_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS quiz_sessions_user_idx ON quiz_sessions (user_id);

ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can manage their own quiz sessions"
  ON quiz_sessions FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS question_responses (
  id                  uuid        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id          uuid        NOT NULL REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  user_id             uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id         text        NOT NULL,
  chosen_answer       text,
  correct_answer      text        NOT NULL,
  is_correct          boolean     NOT NULL,
  time_spent_seconds  int,
  answered_at         timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS question_responses_session_idx ON question_responses (session_id);
CREATE INDEX IF NOT EXISTS question_responses_user_idx   ON question_responses (user_id);

ALTER TABLE question_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can manage their own question responses"
  ON question_responses FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
