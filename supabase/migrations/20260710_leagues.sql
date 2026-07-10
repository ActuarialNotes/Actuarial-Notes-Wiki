-- Weekly XP leagues (roadmap P4.1): opt-in Duolingo-style leaderboards with
-- promotion/relegation. Users who join are grouped into cohorts of up to 30 at
-- their tier for the current UTC week and ranked by weekly XP; when the week
-- rolls over, the top of each cohort promotes and the bottom (plus anyone who
-- earned 0 XP) relegates. Full design: docs/leagues.md.
--
-- Privacy model — the reason this schema looks different from user_xp/user_streaks:
--   * Joining SNAPSHOTS the user's display name + avatar into league_members
--     (auth.users.user_metadata is not cross-user readable); leaving DELETES them.
--   * league_cohorts / league_members have RLS enabled with NO policies: no
--     client can read or write them directly. The only read path is the
--     get_league_board() RPC, which returns name/avatar/xp/is_self for the
--     caller's own cohort and never exposes user ids or emails.
--   * All writes are server-authoritative SECURITY DEFINER RPCs (the award_gems
--     pattern) so a client cannot set its own weekly XP or tier.
--
-- Rollover is LAZY: every public RPC first calls league_rollover_if_due(),
-- which finalizes any stale week under an advisory lock. No cron required.

-- ── Tables ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS league_cohorts (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  tier       smallint    NOT NULL CHECK (tier BETWEEN 0 AND 4),  -- 0=Bronze … 4=Diamond (lib/leagues.ts)
  week_start date        NOT NULL,                               -- Monday, UTC
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS league_cohorts_week_tier_idx
  ON league_cohorts (week_start, tier);

CREATE TABLE IF NOT EXISTS league_members (
  cohort_id    uuid        NOT NULL REFERENCES league_cohorts(id) ON DELETE CASCADE,
  user_id      uuid        NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text        NOT NULL DEFAULT 'Anonymous',  -- opt-in snapshot, deleted on leave
  avatar_url   text        NOT NULL DEFAULT '',           -- may be serialized AvatarData JSON; opaque here
  weekly_xp    integer     NOT NULL DEFAULT 0 CHECK (weekly_xp >= 0),
  joined_at    timestamptz NOT NULL DEFAULT now(),        -- rank tie-break: earlier join wins
  PRIMARY KEY (cohort_id, user_id)
);

-- Per-user league state that must survive the weekly membership wipe: the tier
-- ladder position, the opt-in choice, the identity snapshot used to re-enroll
-- each week, and last week's result for the "you were promoted!" banner.
CREATE TABLE IF NOT EXISTS user_leagues (
  user_id          uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  opted_in         boolean     NOT NULL DEFAULT false,
  tier             smallint    NOT NULL DEFAULT 0 CHECK (tier BETWEEN 0 AND 4),
  display_name     text,       -- NULLed on leave (privacy promise)
  avatar_url       text,       -- NULLed on leave
  last_result      text        CHECK (last_result IN ('promoted', 'demoted', 'stayed')),
  last_result_week date,       -- week_start the result belongs to
  last_rank        integer,
  updated_at       timestamptz NOT NULL DEFAULT now()
);

-- ── RLS ───────────────────────────────────────────────────────────────────────

-- No policies on the cohort/member tables: RLS enabled with zero policies
-- blocks ALL direct client access. Reads go through get_league_board().
ALTER TABLE league_cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE league_members ENABLE ROW LEVEL SECURITY;

ALTER TABLE user_leagues ENABLE ROW LEVEL SECURITY;

-- Clients can only read their own league state; all writes go through the
-- SECURITY DEFINER RPCs below (same split as user_gems).
DROP POLICY IF EXISTS "users can read their own league state" ON user_leagues;
CREATE POLICY "users can read their own league state"
  ON user_leagues FOR SELECT
  USING (auth.uid() = user_id);

-- ── Internal helpers (not client-callable) ────────────────────────────────────

-- Monday 00:00 UTC of the current week. Server-side and UTC on purpose: the
-- week boundary must be the same for every member of a cohort regardless of
-- their timezone, and must not be spoofable by the client.
CREATE OR REPLACE FUNCTION league_week_start()
RETURNS date
LANGUAGE sql
STABLE
AS $$
  SELECT (date_trunc('week', now() AT TIME ZONE 'utc'))::date
$$;

REVOKE ALL ON FUNCTION league_week_start() FROM public;

-- Place a user into an open (< 30 member) cohort at their tier for the given
-- week, creating one if none has room. The cap is soft: a concurrent join can
-- overfill a cohort by one, which is harmless. ON CONFLICT DO NOTHING makes
-- re-enrolment idempotent (user_id is UNIQUE across all memberships).
CREATE OR REPLACE FUNCTION league_assign_member(
  p_user   uuid,
  p_tier   smallint,
  p_week   date,
  p_name   text,
  p_avatar text
)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  v_cohort uuid;
BEGIN
  SELECT c.id INTO v_cohort
  FROM league_cohorts c
  LEFT JOIN league_members m ON m.cohort_id = c.id
  WHERE c.week_start = p_week AND c.tier = p_tier
  GROUP BY c.id, c.created_at
  HAVING count(m.user_id) < 30
  ORDER BY c.created_at
  LIMIT 1;

  IF v_cohort IS NULL THEN
    INSERT INTO league_cohorts (tier, week_start)
    VALUES (p_tier, p_week)
    RETURNING id INTO v_cohort;
  END IF;

  INSERT INTO league_members (cohort_id, user_id, display_name, avatar_url)
  VALUES (
    v_cohort,
    p_user,
    coalesce(nullif(trim(p_name), ''), 'Anonymous'),
    coalesce(p_avatar, '')
  )
  ON CONFLICT (user_id) DO NOTHING;
END;
$$;

REVOKE ALL ON FUNCTION league_assign_member(uuid, smallint, date, text, text) FROM public;

-- Finalize any week that has ended: rank every stale cohort, promote/demote,
-- record each member's result in user_leagues, delete the old cohorts, and
-- re-enroll everyone still opted in at their new tier.
--
-- Zone formulas (duplicated in lib/leagues.ts for rendering — keep in sync):
--   promote = min(10, ceil(n/3)),  demote = min(5, floor(n/5))
-- A member with 0 weekly XP is demoted regardless of rank (inactivity rule),
-- and tiers clamp at Bronze/Diamond, where a clamped move reads as 'stayed'.
--
-- Concurrency: an advisory transaction lock plus a re-check makes concurrent
-- Monday-morning calls collapse into exactly one rollover. A multi-week gap in
-- traffic collapses into a single one-step rollover (documented simplification).
CREATE OR REPLACE FUNCTION league_rollover_if_due()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_week date := league_week_start();
BEGIN
  IF NOT EXISTS (SELECT 1 FROM league_cohorts WHERE week_start < v_week) THEN
    RETURN;
  END IF;

  PERFORM pg_advisory_xact_lock(hashtext('league_rollover'));

  -- Re-check: a concurrent transaction may have rolled over while we waited.
  IF NOT EXISTS (SELECT 1 FROM league_cohorts WHERE week_start < v_week) THEN
    RETURN;
  END IF;

  WITH ranked AS (
    SELECT
      m.user_id,
      m.weekly_xp,
      c.tier,
      c.week_start,
      row_number() OVER (
        PARTITION BY m.cohort_id
        ORDER BY m.weekly_xp DESC, m.joined_at ASC
      ) AS rnk,
      count(*) OVER (PARTITION BY m.cohort_id) AS n
    FROM league_members m
    JOIN league_cohorts c ON c.id = m.cohort_id
    WHERE c.week_start < v_week
  ),
  results AS (
    SELECT
      user_id,
      week_start,
      rnk,
      tier AS old_tier,
      CASE
        WHEN weekly_xp = 0
          OR rnk > n - LEAST(5, floor(n / 5.0)::int)
          THEN GREATEST(tier - 1, 0)
        WHEN rnk <= LEAST(10, ceil(n / 3.0)::int)
          THEN LEAST(tier + 1, 4)
        ELSE tier
      END AS new_tier
    FROM ranked
  )
  UPDATE user_leagues u
  SET
    tier             = r.new_tier,
    last_result      = CASE
                         WHEN r.new_tier > r.old_tier THEN 'promoted'
                         WHEN r.new_tier < r.old_tier THEN 'demoted'
                         ELSE 'stayed'
                       END,
    last_result_week = r.week_start,
    last_rank        = r.rnk,
    updated_at       = now()
  FROM results r
  WHERE u.user_id = r.user_id;

  -- Drop the finished week; memberships cascade. No history kept, by design.
  DELETE FROM league_cohorts WHERE week_start < v_week;

  -- Re-enroll everyone still opted in at their (possibly new) tier.
  PERFORM league_assign_member(u.user_id, u.tier, v_week, u.display_name, u.avatar_url)
  FROM user_leagues u
  WHERE u.opted_in;
END;
$$;

REVOKE ALL ON FUNCTION league_rollover_if_due() FROM public;

-- ── Public RPCs ───────────────────────────────────────────────────────────────

-- Opt in: snapshot the caller's display name + avatar and enroll them in a
-- current-week cohort at their tier. Returning users resume their stored tier;
-- first-timers start at Bronze (the column default). Returns the tier joined.
CREATE OR REPLACE FUNCTION join_league(p_display_name text, p_avatar_url text)
RETURNS smallint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_tier    smallint;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  PERFORM league_rollover_if_due();

  INSERT INTO user_leagues (user_id, opted_in, display_name, avatar_url)
  VALUES (v_user_id, true, p_display_name, p_avatar_url)
  ON CONFLICT (user_id) DO UPDATE
    SET opted_in     = true,
        display_name = EXCLUDED.display_name,
        avatar_url   = EXCLUDED.avatar_url,
        updated_at   = now()
  RETURNING tier INTO v_tier;

  PERFORM league_assign_member(
    v_user_id, v_tier, league_week_start(), p_display_name, p_avatar_url
  );

  RETURN v_tier;
END;
$$;

REVOKE ALL ON FUNCTION join_league(text, text) FROM public;
GRANT EXECUTE ON FUNCTION join_league(text, text) TO authenticated;

-- Opt out: delete this week's membership (and with it the shared name/avatar/XP)
-- and erase the snapshots from user_leagues. Tier and last result are retained
-- so a returning user resumes where they left off.
CREATE OR REPLACE FUNCTION leave_league()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  DELETE FROM league_members WHERE user_id = v_user_id;

  UPDATE user_leagues
  SET opted_in     = false,
      display_name = NULL,
      avatar_url   = NULL,
      updated_at   = now()
  WHERE user_id = v_user_id;
END;
$$;

REVOKE ALL ON FUNCTION leave_league() FROM public;
GRANT EXECUTE ON FUNCTION leave_league() TO authenticated;

-- Add quiz/quest XP to the caller's weekly total. Returns the new weekly_xp,
-- or NULL if the caller isn't a league member — the client calls this
-- unconditionally after every quiz, so the non-member case is a silent no-op.
CREATE OR REPLACE FUNCTION record_league_xp(p_amount integer)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_xp      integer;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  IF p_amount IS NULL OR p_amount <= 0 THEN
    RAISE EXCEPTION 'p_amount must be positive';
  END IF;

  PERFORM league_rollover_if_due();

  UPDATE league_members
  SET weekly_xp = weekly_xp + p_amount
  WHERE user_id = v_user_id
  RETURNING weekly_xp INTO v_xp;

  RETURN v_xp;  -- NULL when not a member
END;
$$;

REVOKE ALL ON FUNCTION record_league_xp(integer) FROM public;
GRANT EXECUTE ON FUNCTION record_league_xp(integer) TO authenticated;

-- Current standings of the caller's cohort, ranked by weekly XP (earlier join
-- breaks ties). Empty set when the caller isn't a member. This is the ONLY way
-- clients read league_members, and it deliberately exposes no user ids: the
-- caller finds themself via is_self.
CREATE OR REPLACE FUNCTION get_league_board()
RETURNS TABLE (
  rank         integer,
  display_name text,
  avatar_url   text,
  weekly_xp    integer,
  is_self      boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_cohort  uuid;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  PERFORM league_rollover_if_due();

  SELECT m.cohort_id INTO v_cohort
  FROM league_members m
  WHERE m.user_id = v_user_id;

  IF v_cohort IS NULL THEN
    RETURN;
  END IF;

  RETURN QUERY
  SELECT
    row_number() OVER (ORDER BY m.weekly_xp DESC, m.joined_at ASC)::integer,
    m.display_name,
    m.avatar_url,
    m.weekly_xp,
    (m.user_id = v_user_id)
  FROM league_members m
  WHERE m.cohort_id = v_cohort;
END;
$$;

REVOKE ALL ON FUNCTION get_league_board() FROM public;
GRANT EXECUTE ON FUNCTION get_league_board() TO authenticated;

-- Ensure realtime delivers changes for the user's own league state row (the
-- board itself is not on realtime — it refreshes on events/focus). No-op if the
-- publication is FOR ALL TABLES or the table is already a member.
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE user_leagues;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN feature_not_supported THEN NULL;
  WHEN undefined_object THEN NULL;
END $$;
