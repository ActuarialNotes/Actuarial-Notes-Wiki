-- Persist the generated daily study plan so it is identical across devices and
-- stable across refreshes. Mirrors study_plan_config (20260515). The client
-- only regenerates on a new day or an explicit regenerate, then writes it here;
-- other devices read this column instead of generating their own plan.

ALTER TABLE exam_progress
  ADD COLUMN IF NOT EXISTS study_plan_cache JSONB;
