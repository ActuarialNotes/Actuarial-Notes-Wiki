-- Content reports: the human write path into VERIFY (see docs/verification.md).
--
-- A student reading a question is the best-placed error detector this project
-- has — they are working the problem line by line, which is exactly the posture
-- that catches a mistranscribed exhibit. Until now they had nowhere to say so.
-- This table is the inbox: the app writes a report here, and
-- `scripts/sync_reports.py` appends each one to the target page's append-only
-- sidecar log as a `comment` entry, where the next validation sweep reads it in
-- full.
--
-- The reports are an inbox, not the record. The record is the log in git. A row
-- here is transient — once `synced_to_log` is true its content lives in a commit
-- and the row is only a receipt.
--
-- PRIVACY, and this is the part to keep straight: **a report's body ends up in a
-- public git repository.** `user_id` never does — the log entry is authored as
-- `human:<reporter_name>` or `human:anon`, and `reporter_name` is whatever the
-- reporter chose to be called, not their account identity. The in-app modal says
-- so before the reporter submits. See the redaction pass in sync_reports.py for
-- what else is stripped on the way out.

CREATE TABLE IF NOT EXISTS content_reports (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Repo-relative vault path, e.g. 'questions/exam-5/cas5-2013f-009.md'. Not a
  -- foreign key to anything: the vault is git, not a table.
  content_path  text        NOT NULL,
  user_id       uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  -- How the reporter wants to be credited in the public log. NULL → `anon`.
  reporter_name text,
  -- Where in the page, in the reporter's words: 'option C', 'the explanation'.
  locus         text,
  body          text        NOT NULL,
  -- The reporter's own classification. Deliberately their vocabulary, not the
  -- log's severity ladder — the agent decides severity, the reader says what
  -- they saw.
  severity      text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  synced_to_log boolean     NOT NULL DEFAULT false,
  sync_commit   text,
  synced_at     timestamptz,

  CONSTRAINT content_reports_body_length CHECK (char_length(body) BETWEEN 1 AND 4000),
  CONSTRAINT content_reports_path_length CHECK (char_length(content_path) BETWEEN 1 AND 512),
  CONSTRAINT content_reports_locus_length CHECK (locus IS NULL OR char_length(locus) <= 200),
  CONSTRAINT content_reports_name_length CHECK (reporter_name IS NULL OR char_length(reporter_name) <= 60),
  CONSTRAINT content_reports_severity CHECK (
    severity IS NULL OR severity IN ('wrong answer', 'typo', 'unclear', 'other')
  )
);

-- The sync script's query: unsynced rows, oldest first, grouped by page.
CREATE INDEX IF NOT EXISTS content_reports_unsynced_idx
  ON content_reports (content_path, created_at)
  WHERE synced_to_log = false;

CREATE INDEX IF NOT EXISTS content_reports_user_idx
  ON content_reports (user_id, created_at DESC);

ALTER TABLE content_reports ENABLE ROW LEVEL SECURITY;

-- A signed-in reader may file a report as themselves, and read back their own.
-- They may not edit or delete one: a report is a statement made at a point in
-- time, and the log it becomes is append-only. Same principle, one step earlier.
DROP POLICY IF EXISTS "users can file their own reports" ON content_reports;
CREATE POLICY "users can file their own reports"
  ON content_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id AND synced_to_log = false AND sync_commit IS NULL);

DROP POLICY IF EXISTS "users can read their own reports" ON content_reports;
CREATE POLICY "users can read their own reports"
  ON content_reports FOR SELECT
  USING (auth.uid() = user_id);

-- No UPDATE or DELETE policy: `scripts/sync_reports.py` runs with the service
-- role, which bypasses RLS, and is the only thing that ever flips
-- `synced_to_log`. A client that could set it would be able to make a report
-- vanish before it reached the log.
