-- 20261111_drop_actuaria.sql, run by supabase/tests/run.sh over the Actuaria
-- migrations it undoes: nothing of Actuaria is left, and award_gems pays
-- exactly what it is given.

\set QUIET on
\pset tuples_only on
\pset format unaligned

\set ada '00000000-0000-0000-0000-00000000000a'
INSERT INTO auth.users (id, email) VALUES (:'ada', 'ada@example.com');

SELECT test.ok(NOT EXISTS (
  SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
  WHERE n.nspname = 'public' AND p.proname LIKE 'actuaria\_%'
), 'no actuaria_* function is left');

SELECT test.ok(NOT EXISTS (
  SELECT 1 FROM pg_tables
  WHERE schemaname = 'public' AND (tablename LIKE 'actuaria\_%' OR tablename = 'user_actuaria')
), 'no Actuaria table is left');

SET ROLE authenticated;
SELECT set_config('request.jwt.claim.sub', :'ada', false) \gset
SELECT test.ok((award_gems(4)).balance = 4, 'award_gems pays what it is given');
SELECT test.ok((award_gems(4)).balance = 8, 'and adds to the balance');
RESET ROLE;

SELECT test.ok(NOT has_function_privilege('anon', 'award_gems(integer)', 'EXECUTE'), 'anon still cannot award gems');
