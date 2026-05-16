-- Store per-exam study plan configuration in the database so it syncs
-- across devices and browser sessions via the existing exam_progress
-- realtime subscription.

ALTER TABLE exam_progress
  ADD COLUMN IF NOT EXISTS study_plan_config JSONB;
