-- Add optional target exam date to exam_progress
-- Existing "users can manage their own exam progress" FOR ALL policy covers this column.

ALTER TABLE exam_progress
  ADD COLUMN IF NOT EXISTS target_date date;
