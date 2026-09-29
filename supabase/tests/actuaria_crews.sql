-- Actuaria Online, Phase 3 (supabase/migrations/20260930_actuaria_crews.sql),
-- run by supabase/tests/run.sh against a throwaway Postgres. What it holds the
-- migration to (docs/actuaria-online.md §9, Phase 3's acceptance):
--
--   * privacy as leagues': nothing readable directly, no user id in a read,
--     leaving deletes what was shared;
--   * the risk-pool bonus applied only server-side, in award_gems;
--   * the raid's rollover idempotent — the loot paid once;
--   * no client-reported correctness moves the boss: only the service role
--     may record a hit, and only on a question it drew.

\set QUIET on
\pset tuples_only on
\pset format unaligned

\set ada '00000000-0000-0000-0000-00000000000a'
\set bo  '00000000-0000-0000-0000-00000000000b'
\set cy  '00000000-0000-0000-0000-00000000000c'
\set dee '00000000-0000-0000-0000-00000000000d'

INSERT INTO auth.users (id) VALUES (:'ada'), (:'bo'), (:'cy'), (:'dee');

-- ── A crew forms ─────────────────────────────────────────────────────────────

SET ROLE authenticated;
SELECT set_config('request.jwt.claim.sub', :'ada', false) \gset
SELECT actuaria_create_crew('P', 'January 2027', 'The Bayesians', 'Ada', '') AS crew \gset
SELECT test.ok(:'crew' IS NOT NULL, 'a player starts a crew');
SELECT test.fails($$SELECT actuaria_create_crew('P', 'January 2027', 'Twice', 'Ada', '')$$,
  'at most one crew per exam per player');
SELECT actuaria_get_crew('P') -> 'crew' ->> 'invite_code' AS code \gset
SELECT test.ok(:'code' ~ '^[A-Z2-9]{6}$', 'the crew has a six-character invite code');

SELECT set_config('request.jwt.claim.sub', :'bo', false) \gset
SELECT test.ok(actuaria_get_crew('P') IS NULL, 'nothing is shared with a player who has not joined');
SELECT test.ok(actuaria_join_crew(lower(:'code'), 'Bo', '') = :'crew'::uuid, 'a player joins by invite code');
SELECT set_config('request.jwt.claim.sub', :'cy', false) \gset
SELECT actuaria_join_crew(:'code', 'Cy', '') \gset

-- ── Privacy: RPC-only, and no user id in a read ──────────────────────────────

SELECT test.ok((SELECT count(*) FROM actuaria_crew_members) = 0, 'the member table cannot be read directly');
SELECT test.ok((SELECT count(*) FROM actuaria_crews) = 0, 'the crew table cannot be read directly');
SELECT test.fails(format('INSERT INTO actuaria_raids (crew_id, week, boss_max, boss_health) VALUES (%L, current_date, 1, 1)', :'crew'),
  'a raid cannot be written directly');
SELECT test.ok(position(:'ada' in actuaria_get_crew('P')::text) = 0
           AND position(:'bo' in actuaria_get_crew('P')::text) = 0,
  'a crew read names no user id');
SELECT test.ok(jsonb_array_length(actuaria_get_crew('P') -> 'members') = 3, 'the crew lists its three members');
SELECT test.ok((actuaria_get_crew('P') -> 'crew' ->> 'members')::int = 3, 'and counts them');

-- ── The risk pool ────────────────────────────────────────────────────────────

SELECT set_config('request.jwt.claim.sub', :'ada', false) \gset
SELECT test.ok((award_gems(4)).balance = 4, 'no pool: a quiz pays its gems as earned');

RESET ROLE;
INSERT INTO user_streaks (user_id, current_streak, last_active_day, time_zone) VALUES
  (:'ada', 1, (now() AT TIME ZONE 'UTC')::date, 'UTC'),
  (:'bo',  1, (now() AT TIME ZONE 'UTC')::date, 'Mars/Olympus_Mons');  -- an unreadable zone reads as UTC
SET ROLE authenticated;
SELECT test.ok(NOT ((actuaria_get_crew('P') -> 'pool' ->> 'active')::boolean), 'two of three covered: the pool is down (needs 3)');
SELECT test.ok((award_gems(4)).balance = 8, 'and gems pay as earned');

RESET ROLE;
INSERT INTO user_streaks (user_id, current_streak, last_active_day, time_zone)
VALUES (:'cy', 1, (now() AT TIME ZONE 'UTC')::date, 'UTC');
SET ROLE authenticated;
SELECT test.ok((actuaria_get_crew('P') -> 'pool' ->> 'active')::boolean, 'three of three covered: the pool is up');
SELECT test.ok((award_gems(4)).balance = 13, 'the pool pays ×1.25 in award_gems itself (4 → 5)');
SELECT test.ok((award_gems(2)).balance = 16, 'rounded half up (2 → 3)');

RESET ROLE;
UPDATE user_streaks SET last_active_day = last_active_day - 1 WHERE user_id = :'cy';
SET ROLE authenticated;
SELECT test.ok(NOT ((actuaria_get_crew('P') -> 'pool' ->> 'active')::boolean), 'yesterday is not today: the pool is down again');

-- ── Only the service role may touch the boss ─────────────────────────────────

RESET ROLE;
SELECT test.ok(NOT has_function_privilege(r, f, 'EXECUTE'), format('%s cannot execute %s', r, f))
FROM unnest(ARRAY['anon', 'authenticated']) r,
     unnest(ARRAY['actuaria_credit_gems(uuid,integer)', 'actuaria_raid_draw(uuid,uuid,text[])',
                  'actuaria_raid_hit(uuid,uuid,text,boolean,integer)', 'actuaria_raid_rollover_if_due()',
                  'actuaria_pool_active_for(uuid)', 'actuaria_raid_current(uuid)']) f;
SELECT test.ok(has_function_privilege('service_role', 'actuaria_raid_hit(uuid,uuid,text,boolean,integer)', 'EXECUTE'),
  'the service role (quiz/api/raid.js) records hits');
SELECT test.ok(has_function_privilege('authenticated', 'award_gems(integer)', 'EXECUTE')
           AND NOT has_function_privilege('anon', 'award_gems(integer)', 'EXECUTE'), 'award_gems stays a signed-in RPC');
SET ROLE authenticated;
SELECT test.fails(format('SELECT actuaria_credit_gems(%L, 1000)', :'ada'), 'a client cannot credit gems');
SELECT test.fails(format('SELECT actuaria_raid_draw(%L, %L, ARRAY[''p-001''])', :'ada', :'crew'), 'a client cannot record a draw');
SELECT test.fails(format('SELECT actuaria_raid_hit(%L, gen_random_uuid(), ''p-001'', true, 360)', :'ada'), 'a client cannot record a hit');
SELECT test.fails('SELECT actuaria_raid_rollover_if_due()', 'a client cannot run the rollover by hand');

-- ── The raid ─────────────────────────────────────────────────────────────────

SELECT test.ok(actuaria_get_raid(:'crew') ->> 'status' = 'active', 'a crew of three has a raid');
SELECT test.ok((actuaria_get_raid(:'crew') -> 'raid' ->> 'boss_max')::int = 3000, 'the boss has 1000 × members');
SELECT actuaria_get_raid(:'crew') -> 'raid' ->> 'id' AS raid \gset

SET ROLE service_role;
SELECT actuaria_raid_draw(:'ada', :'crew', ARRAY['p-001', 'p-002', 'p-003']) AS draw \gset
SELECT actuaria_raid_hit(:'ada', :'draw', 'p-001', true, 360) AS hit \gset
SELECT test.ok((:'hit'::jsonb ->> 'damage')::int BETWEEN 100 AND 150, 'a right answer deals 100 + speed');
SELECT test.ok((:'hit'::jsonb ->> 'boss_health')::int = 3000 - (:'hit'::jsonb ->> 'damage')::int, 'and comes off the boss');
SELECT test.ok((actuaria_raid_hit(:'ada', :'draw', 'p-001', true, 360) ->> 'repeat')::boolean, 'the same answer twice is recorded once');
SELECT test.ok((SELECT boss_health FROM actuaria_raids WHERE id = :'raid') = (:'hit'::jsonb ->> 'boss_health')::int, 'and moves the boss once');
SELECT test.fails(format('SELECT actuaria_raid_hit(%L, %L, ''p-999'', true, 360)', :'ada', :'draw'), 'a question that was not drawn deals nothing');
SELECT test.fails(format('SELECT actuaria_raid_hit(%L, %L, ''p-002'', true, 360)', :'bo', :'draw'), 'nor does another player''s draw');
SELECT test.ok((actuaria_raid_hit(:'ada', :'draw', 'p-002', false, 360) ->> 'healed')::int = 0, 'a miss costs nothing while the boss is above half');

-- Double or nothing, from half health.
RESET ROLE;
UPDATE actuaria_raids SET boss_health = 1400, phase = 'double' WHERE id = :'raid';
SET ROLE service_role;
SELECT actuaria_raid_draw(:'bo', :'crew', ARRAY['p-001', 'p-010', 'p-011']) AS draw2 \gset
SELECT actuaria_raid_hit(:'bo', :'draw2', 'p-010', true, 360) AS hit2 \gset
SELECT test.ok((:'hit2'::jsonb ->> 'damage')::int BETWEEN 200 AND 300, 'at half health a hit deals double');
SELECT test.ok((actuaria_raid_hit(:'bo', :'draw2', 'p-011', false, 360) ->> 'healed')::int = 50, 'and a miss heals the boss by 50');
SELECT actuaria_raid_draw(:'bo', :'crew', ARRAY['p-010']) AS draw3 \gset
SELECT test.ok((actuaria_raid_hit(:'bo', :'draw3', 'p-010', true, 360) ->> 'damage')::int = 0, 'a question already hit this week deals nothing again');
SELECT test.ok(actuaria_raid_phase(700, 3000) = 'all_in' AND actuaria_raid_phase(1500, 3000) = 'double'
           AND actuaria_raid_phase(1501, 3000) = 'open' AND actuaria_raid_phase(0, 3000) = 'defeated', 'phases at 50% and 25%');

-- The kill.
RESET ROLE;
UPDATE actuaria_raids SET boss_health = 60, phase = 'all_in' WHERE id = :'raid';
SET ROLE service_role;
SELECT actuaria_raid_draw(:'cy', :'crew', ARRAY['p-020']) AS draw4 \gset
SELECT actuaria_raid_hit(:'cy', :'draw4', 'p-020', true, 360) AS kill \gset
SELECT test.ok((:'kill'::jsonb ->> 'damage')::int = 60 AND :'kill'::jsonb ->> 'phase' = 'defeated', 'the killing blow counts what was left');
SELECT test.ok((SELECT count(*) FROM user_cosmetics WHERE cosmetic_id = 'ship:decal:stop-loss-shield') = 3,
  'everyone who dealt damage gets the Stop-Loss Shield decal');
SELECT test.fails(format('SELECT actuaria_raid_draw(%L, %L, ARRAY[''p-030''])', :'ada', :'crew'), 'a defeated boss takes no more draws');

-- ── The rollover: loot paid once ─────────────────────────────────────────────

RESET ROLE;
CREATE TEMP TABLE before AS SELECT user_id, balance FROM user_gems;
CREATE TEMP TABLE dealt AS
  SELECT user_id, sum(damage) AS dmg FROM actuaria_raid_hits WHERE raid_id = :'raid' GROUP BY user_id;
UPDATE actuaria_raids SET week = week - 7 WHERE id = :'raid';
SET ROLE authenticated;
SELECT set_config('request.jwt.claim.sub', :'ada', false) \gset
SELECT actuaria_get_crew('P') \gset
RESET ROLE;
CREATE TEMP TABLE after AS SELECT user_id, balance FROM user_gems;
SELECT test.ok((SELECT sum(a.balance - coalesce(b.balance, 0)) FROM after a LEFT JOIN before b USING (user_id)) = 300,
  'the week''s loot is 300 gems, all of it paid');
SELECT test.ok((SELECT bool_and(m.last_loot >= floor(300.0 * d.dmg / (SELECT sum(dmg) FROM dealt)))
                FROM actuaria_crew_members m JOIN dealt d USING (user_id)), 'each share at least its floor, pro rata');
SELECT test.ok(NOT EXISTS (SELECT 1 FROM actuaria_raids WHERE id = :'raid'), 'the finished raid is gone');
SET ROLE authenticated;
SELECT actuaria_get_crew('P') \gset
SELECT actuaria_get_raid(:'crew') \gset
RESET ROLE;
SELECT test.ok((SELECT sum(balance) FROM user_gems) = (SELECT sum(balance) FROM after), 'a second rollover pays nothing');
SELECT test.ok((SELECT count(*) FROM actuaria_raids WHERE crew_id = :'crew') = 1, 'and a new week''s raid opens');

-- ── Guides and Ask the cohort ────────────────────────────────────────────────

SET ROLE authenticated;
SELECT set_config('request.jwt.claim.sub', :'bo', false) \gset
SELECT actuaria_set_guide(:'crew', true) \gset
SELECT test.ok(actuaria_get_crew('P') -> 'me' ->> 'role' = 'guide', 'a member self-reports a pass and becomes a guide');
RESET ROLE;
CREATE TEMP TABLE bo_before AS SELECT balance FROM user_gems WHERE user_id = :'bo';
SET ROLE authenticated;
DO $$
DECLARE
  v_crew uuid;
  v_thread uuid;
  v_reply uuid;
  v_paid integer := 0;
BEGIN
  SELECT crew_id INTO v_crew FROM (SELECT (actuaria_get_crew('P') -> 'crew' ->> 'id')::uuid AS crew_id) x;
  FOR i IN 1..6 LOOP
    PERFORM set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-00000000000a', false);
    v_thread := actuaria_ask(v_crew, 'Why is the posterior proportional to the prior times the likelihood?', 'Bayes Theorem');
    PERFORM set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-00000000000b', false);
    v_reply := actuaria_reply(v_thread, 'Because the evidence term does not depend on the parameter.');
    PERFORM set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-00000000000a', false);
    v_paid := v_paid + actuaria_accept_reply(v_reply);
  END LOOP;
  IF v_paid <> 25 THEN
    RAISE EXCEPTION 'FAILED: a guide is paid 5 gems an accepted explanation, at most 25 a day (paid %)', v_paid;
  END IF;
END $$;
RESET ROLE;
SELECT test.ok((SELECT balance FROM user_gems WHERE user_id = :'bo') - (SELECT balance FROM bo_before) = 25, 'the guide''s 25 gems, flat');
SET ROLE authenticated;
SELECT set_config('request.jwt.claim.sub', :'ada', false) \gset
SELECT actuaria_ask(:'crew', 'What is a conjugate prior?', NULL) AS thread \gset
SELECT set_config('request.jwt.claim.sub', :'cy', false) \gset
SELECT actuaria_reply(:'thread', 'One whose posterior is in the same family.') AS reply \gset
SELECT test.fails(format('SELECT actuaria_accept_reply(%L)', :'reply'), 'only the asker accepts');
SELECT set_config('request.jwt.claim.sub', :'ada', false) \gset
SELECT test.ok(actuaria_accept_reply(:'reply') = 0, 'a member who is not a guide is thanked, not paid');
SELECT test.ok(actuaria_accept_reply(:'reply') = 0, 'and a thread is accepted once');
SELECT test.ok(jsonb_array_length(actuaria_get_threads(:'crew')) = 7, 'the crew reads its threads');
SELECT test.ok(position(:'cy' in actuaria_get_threads(:'crew')::text) = 0, 'which name no user id');

-- ── Nudges and challenges ────────────────────────────────────────────────────

SELECT (SELECT m ->> 'member_id' FROM jsonb_array_elements(actuaria_get_crew('P') -> 'members') m WHERE m ->> 'name' = 'Bo') AS bo_member \gset
SELECT (SELECT m ->> 'member_id' FROM jsonb_array_elements(actuaria_get_crew('P') -> 'members') m WHERE m ->> 'name' = 'Ada') AS ada_member \gset
SELECT test.ok(actuaria_nudge(:'crew', :'bo_member'), 'a member nudges another');
SELECT test.ok(NOT actuaria_nudge(:'crew', :'ada_member'), 'but not themself');
SELECT set_config('request.jwt.claim.sub', :'cy', false) \gset
SELECT test.ok(NOT actuaria_nudge(:'crew', :'bo_member'), 'a member is nudged at most once a day');
SELECT test.ok(actuaria_challenge(:'crew', :'bo_member', 'ab23'), 'Cohort Clash hands a member a room code');
SELECT test.fails(format('SELECT actuaria_challenge(%L, %L, ''NOT A CODE'')', :'crew', :'bo_member'), 'only a room code');
SELECT set_config('request.jwt.claim.sub', :'bo', false) \gset
SELECT test.ok(actuaria_get_crew('P') -> 'nudges' -> 0 ->> 'from' = 'Ada', 'the nudged member sees who nudged them');
SELECT test.ok(actuaria_get_crew('P') -> 'challenges' -> 0 ->> 'code' = 'AB23', 'and the challenge, with its code');

-- ── Leaving deletes what was shared ──────────────────────────────────────────

SELECT actuaria_leave_crew(:'crew') \gset
RESET ROLE;
SELECT test.ok(NOT EXISTS (SELECT 1 FROM actuaria_crew_members WHERE user_id = :'bo'), 'the member row is gone');
SELECT test.ok(NOT EXISTS (SELECT 1 FROM actuaria_crew_replies WHERE user_id = :'bo'), 'their replies are gone');
SELECT test.ok(NOT EXISTS (SELECT 1 FROM actuaria_nudges WHERE to_user = :'bo' OR from_user = :'bo'), 'nudges to and from them are gone');
SELECT test.ok(NOT EXISTS (SELECT 1 FROM actuaria_challenges WHERE to_user = :'bo' OR from_user = :'bo'), 'challenges too');
SELECT test.ok(NOT EXISTS (SELECT 1 FROM actuaria_raid_hits WHERE user_id = :'bo')
           AND NOT EXISTS (SELECT 1 FROM actuaria_raid_draws WHERE user_id = :'bo'), 'and their raid hits and draws');
SELECT test.ok(EXISTS (SELECT 1 FROM actuaria_crews WHERE id = :'crew'), 'the crew stays while it has members');
SET ROLE authenticated;
SELECT set_config('request.jwt.claim.sub', :'ada', false) \gset
SELECT actuaria_leave_crew(:'crew') \gset
SELECT set_config('request.jwt.claim.sub', :'cy', false) \gset
SELECT actuaria_leave_crew(:'crew') \gset
RESET ROLE;
SELECT test.ok(NOT EXISTS (SELECT 1 FROM actuaria_crews WHERE id = :'crew'), 'a crew left empty is deleted');

-- ── Twelve at most ───────────────────────────────────────────────────────────

INSERT INTO auth.users (id) SELECT ('00000000-0000-0000-0001-' || lpad(i::text, 12, '0'))::uuid FROM generate_series(1, 13) i;
SET ROLE authenticated;
SELECT set_config('request.jwt.claim.sub', '00000000-0000-0000-0001-000000000001', false) \gset
SELECT actuaria_create_crew('FM', 'February 2027', 'Annuitants', 'One', '') \gset
SELECT actuaria_get_crew('FM') -> 'crew' ->> 'invite_code' AS fm_code \gset
RESET ROLE;
DO $$
DECLARE
  v_code text := (SELECT invite_code FROM actuaria_crews WHERE exam = 'FM');
BEGIN
  FOR i IN 2..12 LOOP
    PERFORM set_config('request.jwt.claim.sub', '00000000-0000-0000-0001-' || lpad(i::text, 12, '0'), false);
    PERFORM actuaria_join_crew(v_code, 'Member ' || i, '');
  END LOOP;
END $$;
SELECT set_config('request.jwt.claim.sub', '00000000-0000-0000-0001-000000000013', false) \gset
SELECT test.fails(format('SELECT actuaria_join_crew(%L, ''Thirteen'', '''')', :'fm_code'), 'a crew holds twelve');

\echo all actuaria_crews assertions passed
