-- Force PostgREST to rebuild its schema cache after recent column additions
-- (study_plan_config on exam_progress; column renames on quiz_sessions).
NOTIFY pgrst, 'reload schema';
