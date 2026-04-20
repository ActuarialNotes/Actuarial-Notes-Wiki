-- Defensive: ensure target_date exists even if the 2026-04-17 migration was
-- skipped in some environment.
ALTER TABLE exam_progress
  ADD COLUMN IF NOT EXISTS target_date date;

-- Force PostgREST to rebuild its schema cache so clients stop returning
-- "Could not find the 'target_date' column of 'exam_progress' in the schema cache".
NOTIFY pgrst, 'reload schema';
