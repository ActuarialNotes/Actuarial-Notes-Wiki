-- Project sync: a signed-in candidate's PCPA project attempts, kept with their
-- account so an attempt started on the laptop opens on the desktop. Until now
-- an attempt lived only in the browser that made it — its record in
-- localStorage (hooks/usePcpaAttempts.ts), its workspace files in IndexedDB
-- (lib/project/fileStore.ts) — and clearing site data lost it. Those stores
-- stay as they are and are always written first; lib/project/projectSync.ts is
-- the client half that mirrors them here. See docs/pcpa-project.md.
--
-- Last writer wins, row by row: each attempt and each of its files is a row,
-- and whichever copy has the later updated_at is kept. A deletion is a row too
-- — a tombstone, `deleted = true` with no content — so a file removed on one
-- device is removed from the next one to open the attempt instead of being put
-- back by its older copy.
--
-- The data sets are never stored here. They are a function of the attempt's
-- seed, so any device draws the same rows again, and they are the CAS's, which
-- the brief says may not be shared.
--
-- Nothing here is spendable or cross-user, so — like user_flashcards — the
-- client owns its rows directly under RLS. Both reads are by the primary key's
-- leading columns (user_id, then attempt_id), so no further index is needed.

-- ── Attempts ──────────────────────────────────────────────────────────────────
-- One row per attempt. `record` is the client's ProjectAttempt as JSON (the
-- report, answers, ratings, timings — a few KB); NULL once deleted.
CREATE TABLE IF NOT EXISTS user_project_attempts (
  user_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  attempt_id text        NOT NULL,                    -- client-generated `p-…`
  record     jsonb,
  deleted    boolean     NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL,                    -- the record's own updatedAt
  PRIMARY KEY (user_id, attempt_id),
  CHECK (deleted OR record IS NOT NULL)
);

ALTER TABLE user_project_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users can manage their own project attempts" ON user_project_attempts;
CREATE POLICY "users can manage their own project attempts"
  ON user_project_attempts FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ── Workspace files ───────────────────────────────────────────────────────────
-- One row per file the candidate wrote: code, spreadsheets, outputs, plots, the
-- submission snapshot. Text is stored as text; anything else (a PNG) as base64.
-- The client keeps anything past 2,000,000 characters in the browser that made
-- it; the CHECK is the backstop.
CREATE TABLE IF NOT EXISTS user_project_files (
  user_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  attempt_id text        NOT NULL,
  path       text        NOT NULL,                    -- workspace path: code/analysis.R
  content    text,                                    -- NULL once deleted
  encoding   text        NOT NULL DEFAULT 'text' CHECK (encoding IN ('text', 'base64')),
  read_only  boolean     NOT NULL DEFAULT false,      -- the submission/ snapshot
  size       integer     NOT NULL DEFAULT 0,
  deleted    boolean     NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL,
  PRIMARY KEY (user_id, attempt_id, path),
  CHECK (deleted OR content IS NOT NULL),
  CHECK (content IS NULL OR length(content) <= 2000000),
  CHECK (path NOT LIKE 'data/%')
);

ALTER TABLE user_project_files ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users can manage their own project files" ON user_project_files;
CREATE POLICY "users can manage their own project files"
  ON user_project_files FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
