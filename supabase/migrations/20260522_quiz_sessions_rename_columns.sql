-- Rename quiz_sessions columns to align with the clarified taxonomy:
--   exam  = the exam subject (e.g. "Financial Mathematics", "Probability")
--   topic = the specific topic within that exam (previously called "subtopic")
-- The old `tags` column is removed as it was redundant with wiki_link concept data.

ALTER TABLE quiz_sessions
  RENAME COLUMN topic TO exam;

ALTER TABLE quiz_sessions
  RENAME COLUMN subtopic TO topic;

ALTER TABLE quiz_sessions
  DROP COLUMN IF EXISTS tags;
