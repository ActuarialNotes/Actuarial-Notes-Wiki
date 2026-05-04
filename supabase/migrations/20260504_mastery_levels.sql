-- Migrate concept_mastery to 4-level mastery system.
-- Old states 'learning'/'strong' are replaced by level1-level3.
-- Existing data: 'learning' → 'level1', 'strong' → 'level3'.

ALTER TABLE concept_mastery DROP CONSTRAINT IF EXISTS concept_mastery_state_check;

UPDATE concept_mastery SET state = 'level1' WHERE state = 'learning';
UPDATE concept_mastery SET state = 'level3' WHERE state = 'strong';

ALTER TABLE concept_mastery
  ADD CONSTRAINT concept_mastery_state_check
  CHECK (state IN ('new', 'level1', 'level2', 'level3', 'forgotten'));

COMMENT ON COLUMN concept_mastery.state IS
  'new → level1 (1st correct) → level2 (2+ correct) → level3 (3+ correct + 1 hard). Any non-new state decays to forgotten after 15 days without a correct answer, or after 3 consecutive failures.';
