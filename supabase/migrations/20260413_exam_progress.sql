-- exam_progress: shared between wiki (writes) and quiz (reads)
-- Tracks per-user status for each exam (not_started / in_progress / completed)

CREATE TABLE IF NOT EXISTS exam_progress (
  user_id    uuid  NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_id    text  NOT NULL,
  status     text  NOT NULL DEFAULT 'not_started'
               CHECK (status IN ('not_started', 'in_progress', 'completed')),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, exam_id)
);

ALTER TABLE exam_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can manage their own exam progress"
  ON exam_progress FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
