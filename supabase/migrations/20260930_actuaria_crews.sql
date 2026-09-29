-- Actuaria Online, Phase 3: cohorts, the risk pool, guides, nudges, Cohort
-- Clash challenges and the weekly raid (docs/actuaria-online.md §6.11, §6.12,
-- §7.6, §7.7, §8.3).
--
-- A *cohort* on screen is a *crew* here: leagues already use "cohort" for their
-- groups of 30 (20260710_leagues.sql), so the tables are actuaria_crews*.
--
-- Privacy is the leagues model, point for point (docs/leagues.md):
--   * Nothing is shared until a player joins. Joining SNAPSHOTS their display
--     name and avatar into actuaria_crew_members (auth.users.user_metadata is
--     not readable across users), and what they choose to share of their
--     progress — their sector Z and per-concept Z on the crew's exam — rides on
--     the same row, written by actuaria_share_progress.
--   * Every table here has RLS enabled with NO policies: no client can read or
--     write them directly. The reads are SECURITY DEFINER RPCs that return the
--     caller's own crew and never a peer's user id — a member is addressed by
--     `member_id`, a random handle that means nothing outside the crew.
--   * Leaving DELETES what was shared: the member row, their threads and
--     replies, the nudges and challenges to and from them, and their raid hits
--     and draws. A crew left empty is deleted.
--   * Supabase grants EXECUTE on every new function to anon and authenticated
--     directly, not through PUBLIC, so each REVOKE below names them: an
--     internal helper (actuaria_credit_gems above all) or a service-role RPC
--     left callable would let a client mint gems or move the boss.
--   * Every write is an RPC. Raid damage in particular is written only by
--     actuaria_raid_hit, which only the service role may call — the Vercel
--     function quiz/api/raid.js, after it has marked the answer itself against
--     the vault export. No client-reported correctness moves the boss.
--
-- The rules are duplicated from the pure TS modules that draw them —
-- quiz/src/lib/actuaria/crews.ts (the pool) and raid.ts (phases, damage, loot) —
-- under leagues' duplication contract: the formulas are one-liners, the TS side
-- is locked by its tests, and a change to one is a change to both.
--
-- Rollover is lazy and idempotent like leagues': every public RPC first calls
-- actuaria_raid_rollover_if_due(), which pays out any finished week's loot under
-- an advisory lock and deletes that week's raid. No cron.
--
-- supabase/tests/actuaria_crews.sql exercises all of it against a local
-- Postgres (supabase/tests/run.sh).

-- ── Tables ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS actuaria_crews (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  exam        text        NOT NULL CHECK (char_length(exam) BETWEEN 1 AND 20),   -- exam_progress key
  sitting     text        NOT NULL CHECK (char_length(sitting) BETWEEN 1 AND 40), -- "Spring 2027", from data/examSittings.ts
  name        text        NOT NULL CHECK (char_length(name) BETWEEN 1 AND 40),
  invite_code text        NOT NULL UNIQUE,
  created_by  uuid        REFERENCES auth.users(id) ON DELETE SET NULL,          -- NULLed when the creator leaves
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS actuaria_crew_members (
  crew_id        uuid        NOT NULL REFERENCES actuaria_crews(id) ON DELETE CASCADE,
  user_id        uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  -- The handle peers address this member by (nudge, challenge). Never the user id.
  member_id      uuid        NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  exam           text        NOT NULL,                                -- denormalized from the crew
  role           text        NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'guide')),
  display_name   text        NOT NULL DEFAULT 'Anonymous',            -- opt-in snapshot, deleted on leave
  avatar_url     text        NOT NULL DEFAULT '',
  sector_z       numeric(4,3) CHECK (sector_z BETWEEN 0 AND 1),        -- computeExamReadiness / 100, shared on joining
  concept_z      jsonb       NOT NULL DEFAULT '{}'::jsonb              -- concept -> Z, for the raid's weak spots
                             CHECK (jsonb_typeof(concept_z) = 'object' AND octet_length(concept_z::text) <= 32768),
  last_loot      integer,                                             -- last paid raid's share, for "you earned …"
  last_loot_week date,
  joined_at      timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (crew_id, user_id),
  -- At most one crew per exam per player (§7.6).
  UNIQUE (user_id, exam)
);

-- "Ask the cohort": a member's question, and the replies to it. A reply the
-- asker accepts pays its author 5 gems if they are a guide (max 25 a day).
CREATE TABLE IF NOT EXISTS actuaria_crew_threads (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  crew_id        uuid        NOT NULL REFERENCES actuaria_crews(id) ON DELETE CASCADE,
  user_id        uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body           text        NOT NULL CHECK (char_length(body) BETWEEN 1 AND 1000),
  concept        text        CHECK (char_length(concept) <= 120),
  accepted_reply uuid,
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS actuaria_crew_replies (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id  uuid        NOT NULL REFERENCES actuaria_crew_threads(id) ON DELETE CASCADE,
  crew_id    uuid        NOT NULL REFERENCES actuaria_crews(id) ON DELETE CASCADE,
  user_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body       text        NOT NULL CHECK (char_length(body) BETWEEN 1 AND 2000),
  accepted   boolean     NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Gems paid to a guide for accepted explanations, per UTC day (the 25 cap).
CREATE TABLE IF NOT EXISTS actuaria_guide_payouts (
  user_id uuid    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day     date    NOT NULL,
  gems    integer NOT NULL DEFAULT 0 CHECK (gems >= 0),
  PRIMARY KEY (user_id, day)
);

-- A nudge: in-app only, and at most one per member per day (their own day).
CREATE TABLE IF NOT EXISTS actuaria_nudges (
  crew_id    uuid        NOT NULL REFERENCES actuaria_crews(id) ON DELETE CASCADE,
  to_user    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  from_user  uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day        date        NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (crew_id, to_user, day)
);

-- Cohort Clash: a private-channel Quiz Battle room's code, handed to one
-- member in-app. The room itself is Quiz Battle's broadcast channel; nothing
-- about the battle is stored. A challenge is shown for 30 minutes.
CREATE TABLE IF NOT EXISTS actuaria_challenges (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  crew_id    uuid        NOT NULL REFERENCES actuaria_crews(id) ON DELETE CASCADE,
  from_user  uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  to_user    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  -- lib/battleRoom.ts: ROOM_CODE_ALPHABET, ROOM_CODE_LENGTH.
  code       text        NOT NULL CHECK (code ~ '^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{4}$'),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (crew_id, from_user, to_user)
);

-- The week's raid: Gambler's Ruin, one per crew per Monday-UTC week.
CREATE TABLE IF NOT EXISTS actuaria_raids (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  crew_id     uuid        NOT NULL REFERENCES actuaria_crews(id) ON DELETE CASCADE,
  week        date        NOT NULL,                        -- Monday, UTC (league_week_start)
  boss_max    integer     NOT NULL CHECK (boss_max > 0),   -- 1000 × members when the raid opened
  boss_health integer     NOT NULL CHECK (boss_health >= 0),
  phase       text        NOT NULL DEFAULT 'open' CHECK (phase IN ('open', 'double', 'all_in', 'defeated')),
  defeated_at timestamptz,
  UNIQUE (crew_id, week)
);

-- What quiz/api/raid.js served a member, and when: the server's clock for the
-- speed part of a hit, and the only questions a hit may name.
CREATE TABLE IF NOT EXISTS actuaria_raid_draws (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  raid_id      uuid        NOT NULL REFERENCES actuaria_raids(id) ON DELETE CASCADE,
  user_id      uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_ids text[]      NOT NULL CHECK (cardinality(question_ids) BETWEEN 1 AND 10),
  served_at    timestamptz NOT NULL DEFAULT now(),
  last_at      timestamptz NOT NULL DEFAULT now()           -- the previous hit's time: each answer is timed from it
);

CREATE TABLE IF NOT EXISTS actuaria_raid_hits (
  draw_id     uuid        NOT NULL REFERENCES actuaria_raid_draws(id) ON DELETE CASCADE,
  raid_id     uuid        NOT NULL REFERENCES actuaria_raids(id) ON DELETE CASCADE,
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id text        NOT NULL,
  correct     boolean     NOT NULL,
  damage      integer     NOT NULL DEFAULT 0 CHECK (damage >= 0),
  healed      integer     NOT NULL DEFAULT 0 CHECK (healed >= 0),
  at          timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (draw_id, question_id)
);

CREATE INDEX IF NOT EXISTS actuaria_raid_hits_raid_user_idx ON actuaria_raid_hits (raid_id, user_id);
CREATE INDEX IF NOT EXISTS actuaria_crew_threads_crew_idx ON actuaria_crew_threads (crew_id, created_at);

-- ── RLS: enabled, no policies — RPC-only, as league_members ─────────────────

ALTER TABLE actuaria_crews         ENABLE ROW LEVEL SECURITY;
ALTER TABLE actuaria_crew_members  ENABLE ROW LEVEL SECURITY;
ALTER TABLE actuaria_crew_threads  ENABLE ROW LEVEL SECURITY;
ALTER TABLE actuaria_crew_replies  ENABLE ROW LEVEL SECURITY;
ALTER TABLE actuaria_guide_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE actuaria_nudges        ENABLE ROW LEVEL SECURITY;
ALTER TABLE actuaria_challenges    ENABLE ROW LEVEL SECURITY;
ALTER TABLE actuaria_raids         ENABLE ROW LEVEL SECURITY;
ALTER TABLE actuaria_raid_draws    ENABLE ROW LEVEL SECURITY;
ALTER TABLE actuaria_raid_hits     ENABLE ROW LEVEL SECURITY;

-- ── Constants and formulas (mirrored in lib/actuaria/crews.ts, raid.ts) ──────

-- Crew size (§7.6): a crew forms with its creator and opens its pool and its
-- raid at three.
CREATE OR REPLACE FUNCTION actuaria_crew_min() RETURNS integer LANGUAGE sql IMMUTABLE AS $$ SELECT 3 $$;
CREATE OR REPLACE FUNCTION actuaria_crew_max() RETURNS integer LANGUAGE sql IMMUTABLE AS $$ SELECT 12 $$;

-- Risk pool: ≥ 75% of members, rounded up, covered today → gems × 1.25.
-- TS: poolThreshold / poolAward.
CREATE OR REPLACE FUNCTION actuaria_pool_threshold(p_members integer)
RETURNS integer LANGUAGE sql IMMUTABLE AS $$ SELECT ceil(p_members * 0.75)::integer $$;

CREATE OR REPLACE FUNCTION actuaria_pool_award(p_amount integer)
RETURNS integer LANGUAGE sql IMMUTABLE AS $$ SELECT round(p_amount * 1.25)::integer $$;

-- A raid's phase from its health (§7.7). TS: raidPhase.
CREATE OR REPLACE FUNCTION actuaria_raid_phase(p_health integer, p_max integer)
RETURNS text LANGUAGE sql IMMUTABLE AS $$
  SELECT CASE
    WHEN p_health <= 0 THEN 'defeated'
    WHEN p_health * 4 <= p_max THEN 'all_in'
    WHEN p_health * 2 <= p_max THEN 'double'
    ELSE 'open'
  END
$$;

-- Quiz Battle's speed part (lib/battle.ts speedBonus): up to +50, falling
-- linearly with the time used. TS: speedBonus.
CREATE OR REPLACE FUNCTION actuaria_speed_bonus(p_elapsed_ms double precision, p_total_ms double precision)
RETURNS integer LANGUAGE sql IMMUTABLE AS $$
  SELECT CASE WHEN p_total_ms <= 0 THEN 0
    ELSE round(50 * GREATEST(0, LEAST(1, 1 - p_elapsed_ms / p_total_ms)))::integer END
$$;

REVOKE ALL ON FUNCTION actuaria_pool_threshold(integer) FROM public, anon, authenticated;
REVOKE ALL ON FUNCTION actuaria_pool_award(integer) FROM public, anon, authenticated;
REVOKE ALL ON FUNCTION actuaria_raid_phase(integer, integer) FROM public, anon, authenticated;
REVOKE ALL ON FUNCTION actuaria_speed_bonus(double precision, double precision) FROM public, anon, authenticated;

-- ── Internal helpers (not client-callable) ────────────────────────────────────

-- Today in a player's own time zone — the streak's day (lib/streak.ts). An
-- unreadable zone is UTC rather than an error: this runs inside award_gems.
CREATE OR REPLACE FUNCTION actuaria_local_today(p_tz text)
RETURNS date
LANGUAGE sql
STABLE
AS $$
  SELECT (now() AT TIME ZONE CASE
    WHEN p_tz IS NOT NULL AND EXISTS (SELECT 1 FROM pg_timezone_names WHERE name = p_tz) THEN p_tz
    ELSE 'UTC'
  END)::date
$$;

REVOKE ALL ON FUNCTION actuaria_local_today(text) FROM public, anon, authenticated;

-- Whether a player has banked a streak day today, in their own day.
CREATE OR REPLACE FUNCTION actuaria_covered_today(p_user uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_streaks s
    WHERE s.user_id = p_user AND s.last_active_day = actuaria_local_today(s.time_zone)
  )
$$;

REVOKE ALL ON FUNCTION actuaria_covered_today(uuid) FROM public, anon, authenticated;

CREATE OR REPLACE FUNCTION actuaria_pool_active(p_crew uuid)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_members integer;
  v_covered integer;
BEGIN
  SELECT count(*), count(*) FILTER (WHERE actuaria_covered_today(m.user_id))
    INTO v_members, v_covered
  FROM actuaria_crew_members m
  WHERE m.crew_id = p_crew;
  RETURN v_members >= actuaria_crew_min() AND v_covered >= actuaria_pool_threshold(v_members);
END;
$$;

REVOKE ALL ON FUNCTION actuaria_pool_active(uuid) FROM public, anon, authenticated;

-- Whether any of a player's crews has its pool up today. Two crews don't stack.
CREATE OR REPLACE FUNCTION actuaria_pool_active_for(p_user uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM actuaria_crew_members m
    WHERE m.user_id = p_user AND actuaria_pool_active(m.crew_id)
  )
$$;

REVOKE ALL ON FUNCTION actuaria_pool_active_for(uuid) FROM public, anon, authenticated;

-- Gems paid by the game itself (raid loot, a guide's explanation) — flat, not
-- through the pool: loot is a fixed 300 split, and the pool multiplies study.
CREATE OR REPLACE FUNCTION actuaria_credit_gems(p_user uuid, p_amount integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_amount IS NULL OR p_amount <= 0 THEN
    RETURN;
  END IF;
  INSERT INTO user_gems (user_id, balance, total_earned)
  VALUES (p_user, p_amount, p_amount)
  ON CONFLICT (user_id) DO UPDATE
    SET balance      = user_gems.balance + EXCLUDED.balance,
        total_earned = user_gems.total_earned + EXCLUDED.total_earned,
        updated_at   = now();
END;
$$;

REVOKE ALL ON FUNCTION actuaria_credit_gems(uuid, integer) FROM public, anon, authenticated;

-- An invite code: six characters from Quiz Battle's room alphabet.
CREATE OR REPLACE FUNCTION actuaria_new_invite_code()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  v_alphabet constant text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  v_code text;
BEGIN
  LOOP
    v_code := '';
    FOR i IN 1..6 LOOP
      v_code := v_code || substr(v_alphabet, 1 + floor(random() * length(v_alphabet))::integer, 1);
    END LOOP;
    EXIT WHEN NOT EXISTS (SELECT 1 FROM actuaria_crews WHERE invite_code = v_code);
  END LOOP;
  RETURN v_code;
END;
$$;

REVOKE ALL ON FUNCTION actuaria_new_invite_code() FROM public, anon, authenticated;

-- The caller's membership of a crew, or an exception.
CREATE OR REPLACE FUNCTION actuaria_require_member(p_user uuid, p_crew uuid)
RETURNS actuaria_crew_members
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_row actuaria_crew_members;
BEGIN
  IF p_user IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  SELECT * INTO v_row FROM actuaria_crew_members WHERE crew_id = p_crew AND user_id = p_user;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'not a member of this cohort';
  END IF;
  RETURN v_row;
END;
$$;

REVOKE ALL ON FUNCTION actuaria_require_member(uuid, uuid) FROM public, anon, authenticated;

-- ── The weekly raid: lazy, idempotent rollover ───────────────────────────────

-- Pay out every raid whose week has ended — 300 gems split pro rata by damage,
-- floored, the remainder to the top contributor (earliest first hit breaking a
-- tie) — then delete it. TS: lootSplit. Paid whether or not the boss fell:
-- the loot is for the week's work; the decal is for the kill.
--
-- Concurrency as leagues': an advisory transaction lock and a re-check, so
-- concurrent calls collapse into one payout and a second call finds nothing.
CREATE OR REPLACE FUNCTION actuaria_raid_rollover_if_due()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_week  date := league_week_start();
  v_raid  actuaria_raids;
  v_total bigint;
  v_paid  integer;
  v_top   uuid;
  r       record;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM actuaria_raids WHERE week < v_week) THEN
    RETURN;
  END IF;

  PERFORM pg_advisory_xact_lock(hashtext('actuaria_raid_rollover'));

  FOR v_raid IN SELECT * FROM actuaria_raids WHERE week < v_week LOOP
    SELECT coalesce(sum(damage), 0) INTO v_total FROM actuaria_raid_hits WHERE raid_id = v_raid.id;
    IF v_total > 0 THEN
      v_paid := 0;
      FOR r IN
        SELECT h.user_id, sum(h.damage) AS dmg, min(h.at) AS first_at
        FROM actuaria_raid_hits h
        WHERE h.raid_id = v_raid.id
        GROUP BY h.user_id
        HAVING sum(h.damage) > 0
        ORDER BY sum(h.damage) DESC, min(h.at) ASC
      LOOP
        IF v_top IS NULL THEN v_top := r.user_id; END IF;
        UPDATE actuaria_crew_members
          SET last_loot = floor(300 * r.dmg / v_total)::integer, last_loot_week = v_raid.week
          WHERE crew_id = v_raid.crew_id AND user_id = r.user_id;
        v_paid := v_paid + floor(300 * r.dmg / v_total)::integer;
      END LOOP;
      UPDATE actuaria_crew_members
        SET last_loot = last_loot + (300 - v_paid)
        WHERE crew_id = v_raid.crew_id AND user_id = v_top;
      FOR r IN
        SELECT user_id, last_loot FROM actuaria_crew_members
        WHERE crew_id = v_raid.crew_id AND last_loot_week = v_raid.week
      LOOP
        PERFORM actuaria_credit_gems(r.user_id, r.last_loot);
      END LOOP;
      v_top := NULL;
    END IF;
    -- The week is over: its raid, draws and hits go. No history, as leagues.
    DELETE FROM actuaria_raids WHERE id = v_raid.id;
  END LOOP;
END;
$$;

REVOKE ALL ON FUNCTION actuaria_raid_rollover_if_due() FROM public, anon, authenticated;

-- This week's raid for a crew, opened on first sight once the crew has three
-- members: boss health 1000 × members (TS: bossMax). NULL while the crew forms.
CREATE OR REPLACE FUNCTION actuaria_raid_current(p_crew uuid)
RETURNS actuaria_raids
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_week    date := league_week_start();
  v_members integer;
  v_raid    actuaria_raids;
BEGIN
  SELECT * INTO v_raid FROM actuaria_raids WHERE crew_id = p_crew AND week = v_week;
  IF FOUND THEN
    RETURN v_raid;
  END IF;
  SELECT count(*) INTO v_members FROM actuaria_crew_members WHERE crew_id = p_crew;
  IF v_members < actuaria_crew_min() THEN
    RETURN NULL;
  END IF;
  INSERT INTO actuaria_raids (crew_id, week, boss_max, boss_health)
  VALUES (p_crew, v_week, 1000 * v_members, 1000 * v_members)
  ON CONFLICT (crew_id, week) DO NOTHING;
  SELECT * INTO v_raid FROM actuaria_raids WHERE crew_id = p_crew AND week = v_week;
  RETURN v_raid;
END;
$$;

REVOKE ALL ON FUNCTION actuaria_raid_current(uuid) FROM public, anon, authenticated;

-- ── Public RPCs: the crew ─────────────────────────────────────────────────────

-- Start a crew for an exam and sitting, as its first member. Returns its id.
CREATE OR REPLACE FUNCTION actuaria_create_crew(
  p_exam text, p_sitting text, p_name text, p_display_name text, p_avatar_url text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_crew uuid;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  PERFORM actuaria_raid_rollover_if_due();
  IF EXISTS (SELECT 1 FROM actuaria_crew_members WHERE user_id = v_user AND exam = p_exam) THEN
    RAISE EXCEPTION 'already in a cohort for this exam';
  END IF;

  INSERT INTO actuaria_crews (exam, sitting, name, invite_code, created_by)
  VALUES (trim(p_exam), trim(p_sitting), trim(p_name), actuaria_new_invite_code(), v_user)
  RETURNING id INTO v_crew;

  INSERT INTO actuaria_crew_members (crew_id, user_id, exam, display_name, avatar_url)
  VALUES (v_crew, v_user, trim(p_exam),
          coalesce(nullif(left(trim(p_display_name), 40), ''), 'Anonymous'),
          left(coalesce(p_avatar_url, ''), 2000));
  RETURN v_crew;
END;
$$;

REVOKE ALL ON FUNCTION actuaria_create_crew(text, text, text, text, text) FROM public, anon;
GRANT EXECUTE ON FUNCTION actuaria_create_crew(text, text, text, text, text) TO authenticated;

-- Join a crew by its invite code. Returns the crew's id.
CREATE OR REPLACE FUNCTION actuaria_join_crew(p_code text, p_display_name text, p_avatar_url text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_crew actuaria_crews;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  PERFORM actuaria_raid_rollover_if_due();

  SELECT * INTO v_crew FROM actuaria_crews WHERE invite_code = upper(trim(p_code)) FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'no cohort has that invite code';
  END IF;
  IF EXISTS (SELECT 1 FROM actuaria_crew_members WHERE crew_id = v_crew.id AND user_id = v_user) THEN
    RETURN v_crew.id;
  END IF;
  IF EXISTS (SELECT 1 FROM actuaria_crew_members WHERE user_id = v_user AND exam = v_crew.exam) THEN
    RAISE EXCEPTION 'already in a cohort for this exam';
  END IF;
  IF (SELECT count(*) FROM actuaria_crew_members WHERE crew_id = v_crew.id) >= actuaria_crew_max() THEN
    RAISE EXCEPTION 'this cohort is full';
  END IF;

  INSERT INTO actuaria_crew_members (crew_id, user_id, exam, display_name, avatar_url)
  VALUES (v_crew.id, v_user, v_crew.exam,
          coalesce(nullif(left(trim(p_display_name), 40), ''), 'Anonymous'),
          left(coalesce(p_avatar_url, ''), 2000));
  RETURN v_crew.id;
END;
$$;

REVOKE ALL ON FUNCTION actuaria_join_crew(text, text, text) FROM public, anon;
GRANT EXECUTE ON FUNCTION actuaria_join_crew(text, text, text) TO authenticated;

-- Leave a crew: delete everything the member shared, and the crew if it is
-- left empty. Damage already dealt stays off the boss; its share of the loot
-- goes with the member.
CREATE OR REPLACE FUNCTION actuaria_leave_crew(p_crew uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  DELETE FROM actuaria_raid_hits h USING actuaria_raids r
    WHERE h.raid_id = r.id AND r.crew_id = p_crew AND h.user_id = v_user;
  DELETE FROM actuaria_raid_draws d USING actuaria_raids r
    WHERE d.raid_id = r.id AND r.crew_id = p_crew AND d.user_id = v_user;
  DELETE FROM actuaria_crew_replies WHERE crew_id = p_crew AND user_id = v_user;
  DELETE FROM actuaria_crew_threads WHERE crew_id = p_crew AND user_id = v_user;
  DELETE FROM actuaria_nudges WHERE crew_id = p_crew AND (to_user = v_user OR from_user = v_user);
  DELETE FROM actuaria_challenges WHERE crew_id = p_crew AND (to_user = v_user OR from_user = v_user);
  DELETE FROM actuaria_crew_members WHERE crew_id = p_crew AND user_id = v_user;
  UPDATE actuaria_crews SET created_by = NULL WHERE id = p_crew AND created_by = v_user;

  IF NOT EXISTS (SELECT 1 FROM actuaria_crew_members WHERE crew_id = p_crew) THEN
    DELETE FROM actuaria_crews WHERE id = p_crew;
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION actuaria_leave_crew(uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION actuaria_leave_crew(uuid) TO authenticated;

-- What a member shares of their progress on the crew's exam: their sector Z
-- (the readiness score / 100) and each syllabus concept's Z, for the raid's
-- weak spots. Refreshed by the client whenever they open the Cohort screen,
-- along with their name and avatar.
CREATE OR REPLACE FUNCTION actuaria_share_progress(
  p_crew uuid, p_sector_z numeric, p_concept_z jsonb, p_display_name text, p_avatar_url text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_clean jsonb := '{}'::jsonb;
  r record;
BEGIN
  PERFORM actuaria_require_member(v_user, p_crew);
  -- Keep only concept → number in [0, 1], at most 400 of them.
  IF jsonb_typeof(p_concept_z) = 'object' THEN
    FOR r IN SELECT key, value FROM jsonb_each(p_concept_z) LIMIT 400 LOOP
      IF jsonb_typeof(r.value) = 'number' AND char_length(r.key) BETWEEN 1 AND 120
         AND (r.value::text)::numeric BETWEEN 0 AND 1 THEN
        v_clean := v_clean || jsonb_build_object(r.key, round((r.value::text)::numeric, 2));
      END IF;
    END LOOP;
  END IF;
  UPDATE actuaria_crew_members
  SET sector_z     = CASE WHEN p_sector_z BETWEEN 0 AND 1 THEN round(p_sector_z, 3) ELSE sector_z END,
      concept_z    = v_clean,
      display_name = coalesce(nullif(left(trim(p_display_name), 40), ''), display_name),
      avatar_url   = coalesce(left(p_avatar_url, 2000), avatar_url)
  WHERE crew_id = p_crew AND user_id = v_user;
END;
$$;

REVOKE ALL ON FUNCTION actuaria_share_progress(uuid, numeric, jsonb, text, text) FROM public, anon;
GRANT EXECUTE ON FUNCTION actuaria_share_progress(uuid, numeric, jsonb, text, text) TO authenticated;

-- Take (or put down) the Guide role: a self-report of having passed the exam,
-- shown as self-reported.
CREATE OR REPLACE FUNCTION actuaria_set_guide(p_crew uuid, p_passed boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
BEGIN
  PERFORM actuaria_require_member(v_user, p_crew);
  UPDATE actuaria_crew_members
  SET role = CASE WHEN p_passed THEN 'guide' ELSE 'member' END
  WHERE crew_id = p_crew AND user_id = v_user;
END;
$$;

REVOKE ALL ON FUNCTION actuaria_set_guide(uuid, boolean) FROM public, anon;
GRANT EXECUTE ON FUNCTION actuaria_set_guide(uuid, boolean) TO authenticated;

-- A nudge: in-app, at most one per member per day (the member's own day).
-- Returns true when sent, false when someone already nudged them today.
CREATE OR REPLACE FUNCTION actuaria_nudge(p_crew uuid, p_member uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_to   uuid;
  v_day  date;
  v_n    integer;
BEGIN
  PERFORM actuaria_require_member(v_user, p_crew);
  SELECT m.user_id INTO v_to FROM actuaria_crew_members m WHERE m.crew_id = p_crew AND m.member_id = p_member;
  IF v_to IS NULL OR v_to = v_user THEN
    RETURN false;
  END IF;
  SELECT actuaria_local_today(s.time_zone) INTO v_day FROM user_streaks s WHERE s.user_id = v_to;
  v_day := coalesce(v_day, actuaria_local_today(NULL));
  INSERT INTO actuaria_nudges (crew_id, to_user, from_user, day)
  VALUES (p_crew, v_to, v_user, v_day)
  ON CONFLICT (crew_id, to_user, day) DO NOTHING;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN v_n = 1;
END;
$$;

REVOKE ALL ON FUNCTION actuaria_nudge(uuid, uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION actuaria_nudge(uuid, uuid) TO authenticated;

-- Cohort Clash: hand a member the code of a private-channel room just opened.
CREATE OR REPLACE FUNCTION actuaria_challenge(p_crew uuid, p_member uuid, p_code text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_to   uuid;
BEGIN
  PERFORM actuaria_require_member(v_user, p_crew);
  SELECT m.user_id INTO v_to FROM actuaria_crew_members m WHERE m.crew_id = p_crew AND m.member_id = p_member;
  IF v_to IS NULL OR v_to = v_user THEN
    RETURN false;
  END IF;
  DELETE FROM actuaria_challenges WHERE created_at < now() - interval '30 minutes';
  INSERT INTO actuaria_challenges (crew_id, from_user, to_user, code)
  VALUES (p_crew, v_user, v_to, upper(trim(p_code)))
  ON CONFLICT (crew_id, from_user, to_user) DO UPDATE
    SET code = EXCLUDED.code, created_at = now();
  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION actuaria_challenge(uuid, uuid, text) FROM public, anon;
GRANT EXECUTE ON FUNCTION actuaria_challenge(uuid, uuid, text) TO authenticated;

-- The caller's crew for an exam, as the Cohort screen draws it — or NULL when
-- they have none. The only read of the member table, and it names no user id:
-- a member is `member_id` and the caller finds themself by `is_self`.
CREATE OR REPLACE FUNCTION actuaria_get_crew(p_exam text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user    uuid := auth.uid();
  v_me      actuaria_crew_members;
  v_crew    actuaria_crews;
  v_members integer;
  v_covered integer;
  v_raid    actuaria_raids;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  PERFORM actuaria_raid_rollover_if_due();

  SELECT * INTO v_me FROM actuaria_crew_members WHERE user_id = v_user AND exam = p_exam;
  IF NOT FOUND THEN
    RETURN NULL;
  END IF;
  SELECT * INTO v_crew FROM actuaria_crews WHERE id = v_me.crew_id;
  SELECT count(*), count(*) FILTER (WHERE actuaria_covered_today(user_id))
    INTO v_members, v_covered
  FROM actuaria_crew_members WHERE crew_id = v_crew.id;
  v_raid := actuaria_raid_current(v_crew.id);

  RETURN jsonb_build_object(
    'crew', jsonb_build_object(
      'id', v_crew.id,
      'name', v_crew.name,
      'exam', v_crew.exam,
      'sitting', v_crew.sitting,
      'invite_code', v_crew.invite_code,
      'members', v_members,
      'cohort_z', (SELECT round(avg(sector_z), 3) FROM actuaria_crew_members WHERE crew_id = v_crew.id AND sector_z IS NOT NULL)
    ),
    'me', jsonb_build_object(
      'member_id', v_me.member_id,
      'role', v_me.role,
      'last_loot', v_me.last_loot,
      'last_loot_week', v_me.last_loot_week
    ),
    'pool', jsonb_build_object(
      'members', v_members,
      'covered', v_covered,
      'active', v_members >= actuaria_crew_min() AND v_covered >= actuaria_pool_threshold(v_members)
    ),
    'raid', CASE WHEN v_raid.id IS NULL THEN NULL ELSE jsonb_build_object(
      'boss_max', v_raid.boss_max, 'boss_health', v_raid.boss_health, 'phase', v_raid.phase
    ) END,
    'members', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
        'member_id', m.member_id,
        'name', m.display_name,
        'avatar', m.avatar_url,
        'role', m.role,
        'sector_z', m.sector_z,
        'covered_today', actuaria_covered_today(m.user_id),
        'nudged_today', EXISTS (
          SELECT 1 FROM actuaria_nudges n
          WHERE n.crew_id = m.crew_id AND n.to_user = m.user_id
            AND n.day = coalesce((SELECT actuaria_local_today(s.time_zone) FROM user_streaks s WHERE s.user_id = m.user_id), actuaria_local_today(NULL))
        ),
        'explanations', (SELECT count(*) FROM actuaria_crew_replies rp WHERE rp.crew_id = m.crew_id AND rp.user_id = m.user_id AND rp.accepted),
        'is_self', m.user_id = v_user
      ) ORDER BY m.joined_at)
      FROM actuaria_crew_members m WHERE m.crew_id = v_crew.id
    ), '[]'::jsonb),
    'nudges', coalesce((
      SELECT jsonb_agg(jsonb_build_object('from', f.display_name))
      FROM actuaria_nudges n
      JOIN actuaria_crew_members f ON f.crew_id = n.crew_id AND f.user_id = n.from_user
      WHERE n.crew_id = v_crew.id AND n.to_user = v_user
        AND n.day = coalesce((SELECT actuaria_local_today(s.time_zone) FROM user_streaks s WHERE s.user_id = v_user), actuaria_local_today(NULL))
    ), '[]'::jsonb),
    'challenges', coalesce((
      SELECT jsonb_agg(jsonb_build_object('from', f.display_name, 'code', c.code, 'at', c.created_at) ORDER BY c.created_at DESC)
      FROM actuaria_challenges c
      JOIN actuaria_crew_members f ON f.crew_id = c.crew_id AND f.user_id = c.from_user
      WHERE c.crew_id = v_crew.id AND c.to_user = v_user AND c.created_at > now() - interval '30 minutes'
    ), '[]'::jsonb)
  );
END;
$$;

REVOKE ALL ON FUNCTION actuaria_get_crew(text) FROM public, anon;
GRANT EXECUTE ON FUNCTION actuaria_get_crew(text) TO authenticated;

-- ── Public RPCs: Ask the cohort ──────────────────────────────────────────────

CREATE OR REPLACE FUNCTION actuaria_ask(p_crew uuid, p_body text, p_concept text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_id   uuid;
BEGIN
  PERFORM actuaria_require_member(v_user, p_crew);
  INSERT INTO actuaria_crew_threads (crew_id, user_id, body, concept)
  VALUES (p_crew, v_user, trim(p_body), nullif(left(trim(coalesce(p_concept, '')), 120), ''))
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;

REVOKE ALL ON FUNCTION actuaria_ask(uuid, text, text) FROM public, anon;
GRANT EXECUTE ON FUNCTION actuaria_ask(uuid, text, text) TO authenticated;

CREATE OR REPLACE FUNCTION actuaria_reply(p_thread uuid, p_body text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user   uuid := auth.uid();
  v_thread actuaria_crew_threads;
  v_id     uuid;
BEGIN
  SELECT * INTO v_thread FROM actuaria_crew_threads WHERE id = p_thread;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'no such thread';
  END IF;
  PERFORM actuaria_require_member(v_user, v_thread.crew_id);
  INSERT INTO actuaria_crew_replies (thread_id, crew_id, user_id, body)
  VALUES (p_thread, v_thread.crew_id, v_user, trim(p_body))
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;

REVOKE ALL ON FUNCTION actuaria_reply(uuid, text) FROM public, anon;
GRANT EXECUTE ON FUNCTION actuaria_reply(uuid, text) TO authenticated;

-- The asker accepts one reply. A guide's accepted explanation pays them 5 gems,
-- up to 25 a (UTC) day. Returns the gems paid.
CREATE OR REPLACE FUNCTION actuaria_accept_reply(p_reply uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user   uuid := auth.uid();
  v_reply  actuaria_crew_replies;
  v_thread actuaria_crew_threads;
  v_role   text;
  v_today  date := (now() AT TIME ZONE 'UTC')::date;
  v_paid   integer;
  v_pay    integer := 0;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  SELECT * INTO v_reply FROM actuaria_crew_replies WHERE id = p_reply;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'no such reply';
  END IF;
  SELECT * INTO v_thread FROM actuaria_crew_threads WHERE id = v_reply.thread_id FOR UPDATE;
  IF v_thread.user_id <> v_user THEN
    RAISE EXCEPTION 'only the asker can accept a reply';
  END IF;
  IF v_thread.accepted_reply IS NOT NULL OR v_reply.user_id = v_user THEN
    RETURN 0;
  END IF;

  UPDATE actuaria_crew_threads SET accepted_reply = v_reply.id WHERE id = v_thread.id;
  UPDATE actuaria_crew_replies SET accepted = true WHERE id = v_reply.id;

  SELECT role INTO v_role FROM actuaria_crew_members WHERE crew_id = v_thread.crew_id AND user_id = v_reply.user_id;
  IF v_role = 'guide' THEN
    INSERT INTO actuaria_guide_payouts (user_id, day, gems) VALUES (v_reply.user_id, v_today, 0)
    ON CONFLICT (user_id, day) DO NOTHING;
    SELECT gems INTO v_paid FROM actuaria_guide_payouts WHERE user_id = v_reply.user_id AND day = v_today FOR UPDATE;
    v_pay := LEAST(5, GREATEST(0, 25 - v_paid));
    IF v_pay > 0 THEN
      UPDATE actuaria_guide_payouts SET gems = gems + v_pay WHERE user_id = v_reply.user_id AND day = v_today;
      PERFORM actuaria_credit_gems(v_reply.user_id, v_pay);
    END IF;
  END IF;
  RETURN v_pay;
END;
$$;

REVOKE ALL ON FUNCTION actuaria_accept_reply(uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION actuaria_accept_reply(uuid) TO authenticated;

-- The crew's threads, newest first, with their replies — names only.
CREATE OR REPLACE FUNCTION actuaria_get_threads(p_crew uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
BEGIN
  PERFORM actuaria_require_member(v_user, p_crew);
  RETURN coalesce((
    SELECT jsonb_agg(jsonb_build_object(
      'id', t.id,
      'from', a.display_name,
      'is_self', t.user_id = v_user,
      'body', t.body,
      'concept', t.concept,
      'at', t.created_at,
      'replies', coalesce((
        SELECT jsonb_agg(jsonb_build_object(
          'id', r.id,
          'from', b.display_name,
          'guide', b.role = 'guide',
          'is_self', r.user_id = v_user,
          'body', r.body,
          'accepted', r.accepted,
          'at', r.created_at
        ) ORDER BY r.created_at)
        FROM actuaria_crew_replies r
        JOIN actuaria_crew_members b ON b.crew_id = r.crew_id AND b.user_id = r.user_id
        WHERE r.thread_id = t.id
      ), '[]'::jsonb)
    ) ORDER BY t.created_at DESC)
    FROM (SELECT * FROM actuaria_crew_threads WHERE crew_id = p_crew ORDER BY created_at DESC LIMIT 50) t
    JOIN actuaria_crew_members a ON a.crew_id = t.crew_id AND a.user_id = t.user_id
  ), '[]'::jsonb);
END;
$$;

REVOKE ALL ON FUNCTION actuaria_get_threads(uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION actuaria_get_threads(uuid) TO authenticated;

-- ── Public RPCs: the raid ─────────────────────────────────────────────────────

-- The crew's raid as the Raid screen draws it: the boss, the damage board
-- (names, no ids), the weak spots the boss uses — the concepts with the lowest
-- mean Z across the members who shared one — and the loot pool.
CREATE OR REPLACE FUNCTION actuaria_get_raid(p_crew uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user    uuid := auth.uid();
  v_me      actuaria_crew_members;
  v_crew    actuaria_crews;
  v_raid    actuaria_raids;
  v_members integer;
  v_total   bigint;
BEGIN
  PERFORM actuaria_raid_rollover_if_due();
  v_me := actuaria_require_member(v_user, p_crew);
  SELECT * INTO v_crew FROM actuaria_crews WHERE id = p_crew;
  SELECT count(*) INTO v_members FROM actuaria_crew_members WHERE crew_id = p_crew;
  v_raid := actuaria_raid_current(p_crew);
  IF v_raid.id IS NULL THEN
    RETURN jsonb_build_object('status', 'forming', 'exam', v_crew.exam, 'members', v_members, 'needed', actuaria_crew_min() - v_members);
  END IF;
  SELECT coalesce(sum(damage), 0) INTO v_total FROM actuaria_raid_hits WHERE raid_id = v_raid.id;

  RETURN jsonb_build_object(
    'status', CASE WHEN v_raid.phase = 'defeated' THEN 'defeated' ELSE 'active' END,
    'exam', v_crew.exam,
    'members', v_members,
    'raid', jsonb_build_object(
      'id', v_raid.id,
      'week', v_raid.week,
      'ends_at', (v_raid.week + 7)::timestamp AT TIME ZONE 'UTC',
      'boss_max', v_raid.boss_max,
      'boss_health', v_raid.boss_health,
      'phase', v_raid.phase
    ),
    'loot_pool', 300,
    'board', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
        'name', m.display_name,
        'damage', d.dmg,
        'share', CASE WHEN v_total > 0 THEN round(d.dmg::numeric / v_total, 4) ELSE 0 END,
        'is_self', d.user_id = v_user
      ) ORDER BY d.dmg DESC, d.first_at)
      FROM (
        SELECT user_id, sum(damage) AS dmg, min(at) AS first_at
        FROM actuaria_raid_hits WHERE raid_id = v_raid.id
        GROUP BY user_id HAVING sum(damage) > 0
      ) d
      JOIN actuaria_crew_members m ON m.crew_id = p_crew AND m.user_id = d.user_id
    ), '[]'::jsonb),
    'weak_spots', coalesce((
      SELECT jsonb_agg(jsonb_build_object('concept', w.concept, 'z', w.z) ORDER BY w.z, w.concept)
      FROM (
        SELECT e.key AS concept, round(avg((e.value::text)::numeric), 2) AS z
        FROM actuaria_crew_members m, jsonb_each(m.concept_z) e
        WHERE m.crew_id = p_crew AND jsonb_typeof(e.value) = 'number'
        GROUP BY e.key
        ORDER BY avg((e.value::text)::numeric), e.key
        LIMIT 5
      ) w
    ), '[]'::jsonb),
    'answered', coalesce((
      SELECT jsonb_agg(DISTINCT h.question_id) FROM actuaria_raid_hits h
      WHERE h.raid_id = v_raid.id AND h.user_id = v_user
    ), '[]'::jsonb)
  );
END;
$$;

REVOKE ALL ON FUNCTION actuaria_get_raid(uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION actuaria_get_raid(uuid) TO authenticated;

-- ── Service-role RPCs: quiz/api/raid.js only ─────────────────────────────────
--
-- Not granted to `authenticated`: a player's client cannot call these, so it
-- cannot say what it was served or whether it was right. The function verifies
-- the player's session, draws and marks from the vault export, and calls these
-- with the service key.

-- Record the questions the function drew for a member. Returns the draw's id.
CREATE OR REPLACE FUNCTION actuaria_raid_draw(p_user uuid, p_crew uuid, p_question_ids text[])
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_raid actuaria_raids;
  v_id   uuid;
BEGIN
  PERFORM actuaria_raid_rollover_if_due();
  PERFORM actuaria_require_member(p_user, p_crew);
  v_raid := actuaria_raid_current(p_crew);
  IF v_raid.id IS NULL THEN
    RAISE EXCEPTION 'the cohort has no raid yet';
  END IF;
  IF v_raid.phase = 'defeated' THEN
    RAISE EXCEPTION 'the boss is already defeated';
  END IF;
  INSERT INTO actuaria_raid_draws (raid_id, user_id, question_ids)
  VALUES (v_raid.id, p_user, p_question_ids)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;

REVOKE ALL ON FUNCTION actuaria_raid_draw(uuid, uuid, text[]) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION actuaria_raid_draw(uuid, uuid, text[]) TO service_role;

-- One marked answer against the boss (§7.7). `p_correct` is the function's own
-- marking; `p_pace_seconds` the exam's time per question. The answer is timed
-- by this database's clock, from the draw (or the member's previous answer in
-- it). A right answer deals 100 + speed — ×2 once the boss is at half health —
-- and a miss heals it by 50 from then on. A question this member has already
-- hit in this raid deals nothing: no farming the same one. Idempotent per
-- (draw, question): a repeat returns the first result.
CREATE OR REPLACE FUNCTION actuaria_raid_hit(
  p_user uuid, p_draw uuid, p_question text, p_correct boolean, p_pace_seconds integer
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_draw    actuaria_raid_draws;
  v_raid    actuaria_raids;
  v_crew    uuid;
  v_hit     actuaria_raid_hits;
  v_elapsed double precision;
  v_damage  integer := 0;
  v_healed  integer := 0;
  v_health  integer;
  v_phase   text;
  v_repeat  boolean;
BEGIN
  PERFORM actuaria_raid_rollover_if_due();

  SELECT * INTO v_draw FROM actuaria_raid_draws WHERE id = p_draw AND user_id = p_user FOR UPDATE;
  IF NOT FOUND OR NOT (p_question = ANY (v_draw.question_ids)) THEN
    RAISE EXCEPTION 'that question was not drawn for this player';
  END IF;

  SELECT * INTO v_hit FROM actuaria_raid_hits WHERE draw_id = p_draw AND question_id = p_question;
  SELECT * INTO v_raid FROM actuaria_raids WHERE id = v_draw.raid_id FOR UPDATE;
  IF v_hit.draw_id IS NOT NULL THEN
    RETURN jsonb_build_object('correct', v_hit.correct, 'damage', v_hit.damage, 'healed', v_hit.healed,
      'boss_health', v_raid.boss_health, 'boss_max', v_raid.boss_max, 'phase', v_raid.phase, 'repeat', true);
  END IF;

  v_crew := v_raid.crew_id;
  PERFORM actuaria_require_member(p_user, v_crew);
  IF v_raid.week <> league_week_start() OR v_raid.phase = 'defeated' THEN
    RETURN jsonb_build_object('correct', p_correct, 'damage', 0, 'healed', 0,
      'boss_health', v_raid.boss_health, 'boss_max', v_raid.boss_max, 'phase', v_raid.phase, 'closed', true);
  END IF;

  v_repeat := EXISTS (
    SELECT 1 FROM actuaria_raid_hits WHERE raid_id = v_raid.id AND user_id = p_user AND question_id = p_question
  );
  v_elapsed := extract(epoch FROM (now() - v_draw.last_at)) * 1000;

  IF p_correct AND NOT v_repeat THEN
    v_damage := 100 + actuaria_speed_bonus(v_elapsed, GREATEST(p_pace_seconds, 1) * 1000.0);
    IF v_raid.phase IN ('double', 'all_in') THEN
      v_damage := v_damage * 2;
    END IF;
    v_health := GREATEST(0, v_raid.boss_health - v_damage);
    v_damage := v_raid.boss_health - v_health; -- the killing blow counts what was left
  ELSIF NOT p_correct AND v_raid.phase IN ('double', 'all_in') THEN
    v_health := LEAST(v_raid.boss_max, v_raid.boss_health + 50);
    v_healed := v_health - v_raid.boss_health;
  ELSE
    v_health := v_raid.boss_health;
  END IF;

  v_phase := actuaria_raid_phase(v_health, v_raid.boss_max);
  UPDATE actuaria_raids
  SET boss_health = v_health,
      phase       = v_phase,
      defeated_at = CASE WHEN v_phase = 'defeated' THEN now() ELSE defeated_at END
  WHERE id = v_raid.id;

  INSERT INTO actuaria_raid_hits (draw_id, raid_id, user_id, question_id, correct, damage, healed)
  VALUES (p_draw, v_raid.id, p_user, p_question, p_correct, v_damage, v_healed);
  UPDATE actuaria_raid_draws SET last_at = now() WHERE id = p_draw;

  -- The kill: the Stop-Loss Shield decal for everyone who dealt damage.
  IF v_phase = 'defeated' THEN
    INSERT INTO user_cosmetics (user_id, cosmetic_id)
    SELECT DISTINCT h.user_id, 'ship:decal:stop-loss-shield'
    FROM actuaria_raid_hits h
    WHERE h.raid_id = v_raid.id AND h.damage > 0
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN jsonb_build_object('correct', p_correct, 'damage', v_damage, 'healed', v_healed,
    'boss_health', v_health, 'boss_max', v_raid.boss_max, 'phase', v_phase);
END;
$$;

REVOKE ALL ON FUNCTION actuaria_raid_hit(uuid, uuid, text, boolean, integer) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION actuaria_raid_hit(uuid, uuid, text, boolean, integer) TO service_role;

-- ── The risk pool, in the gem-award path ─────────────────────────────────────
--
-- award_gems (20260523_user_gems.sql) is every study reward's one way in: a
-- quiz's gems, a claimed quest, a study-plan bonus. It now pays ×1.25 while
-- any of the caller's crews has its pool up. The multiplier is applied here and
-- nowhere else — the client passes what it earned and only displays the pool
-- (docs/actuaria-online.md §7.6). A failure reading the pool pays the plain
-- amount rather than failing the award.
CREATE OR REPLACE FUNCTION award_gems(p_amount integer)
RETURNS user_gems
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_amount  integer;
  v_row     user_gems;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  IF p_amount IS NULL OR p_amount <= 0 THEN
    RAISE EXCEPTION 'p_amount must be positive';
  END IF;

  v_amount := p_amount;
  BEGIN
    IF actuaria_pool_active_for(v_user_id) THEN
      v_amount := actuaria_pool_award(p_amount);
    END IF;
  EXCEPTION WHEN others THEN
    v_amount := p_amount;
  END;

  INSERT INTO user_gems (user_id, balance, total_earned)
  VALUES (v_user_id, v_amount, v_amount)
  ON CONFLICT (user_id) DO UPDATE
    SET balance      = user_gems.balance + EXCLUDED.balance,
        total_earned = user_gems.total_earned + EXCLUDED.total_earned,
        updated_at   = now()
  RETURNING * INTO v_row;

  RETURN v_row;
END;
$$;

REVOKE ALL ON FUNCTION award_gems(integer) FROM public, anon;
GRANT EXECUTE ON FUNCTION award_gems(integer) TO authenticated;
