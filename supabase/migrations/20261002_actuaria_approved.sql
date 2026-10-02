-- Actuaria Online narrows from Pro to approved accounts (docs/actuaria-online.md,
-- *Implementation notes*).
--
-- The app shows Actuaria only to the signed-in accounts on
-- ACTUARIA_APPROVED_EMAILS (quiz/src/lib/actuaria/access.ts). A cohort is
-- shared, stored state, so becoming a member is held to the same list here —
-- a client that skips the app's guard still can't start or join a cohort.
-- quiz/src/lib/actuaria/access.test.ts holds the two lists equal: letting
-- someone in is a line in each.
--
-- The email is read from auth.users, never from the request, and compared
-- lowercased — the list below is written lowercase.
--
-- Only joining is gated, as before. A member who was let in under the Pro rule
-- (20261001_actuaria_pro.sql) keeps their place and can still leave through
-- actuaria_leave_crew; their pool and raid carry on.

CREATE OR REPLACE FUNCTION actuaria_is_approved(p_user uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users u
    WHERE u.id = p_user
      AND lower(u.email) = ANY (ARRAY['jordan@actuarialnotes.com'])
  )
$$;

REVOKE ALL ON FUNCTION actuaria_is_approved(uuid) FROM public, anon, authenticated;

-- Start a crew for an exam and sitting, as its first member — approved accounts only.
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
  IF NOT actuaria_is_approved(v_user) THEN
    RAISE EXCEPTION 'cohorts are not open to this account';
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

-- Join a crew by its invite code — approved accounts only. Returns the crew's id.
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
  IF NOT actuaria_is_approved(v_user) THEN
    RAISE EXCEPTION 'cohorts are not open to this account';
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

-- Nothing calls the Pro check any more.
DROP FUNCTION IF EXISTS actuaria_is_pro(uuid);
