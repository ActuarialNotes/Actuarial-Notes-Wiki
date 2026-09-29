-- Actuaria Online opens to Pro (docs/actuaria-online.md, *Implementation notes*).
--
-- The app shows Actuaria only to a signed-in account with an active Pro
-- subscription (quiz/src/lib/actuaria/access.ts). A cohort is shared, stored
-- state, so becoming a member is held to the same rule here, the way the TTS
-- function holds the paid voice to it — a client that skips the app's guard
-- still can't start or join a cohort.
--
-- The rule mirrors `isActivePro` in quiz/src/hooks/useSubscription.ts and
-- supabase/functions/google-cloud-tts/index.ts: tier 'premium', status
-- 'active', and a period that hasn't ended (none recorded counts as open — a
-- beta code's Pro row carries no end). Beta testers are Pro by that row.
--
-- Only joining is gated. A member whose Pro lapses keeps their place (and can
-- still leave through actuaria_leave_crew, which isn't gated); their pool and
-- raid carry on as before.

CREATE OR REPLACE FUNCTION actuaria_is_pro(p_user uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_subscriptions s
    WHERE s.user_id = p_user
      AND s.tier = 'premium'
      AND s.status = 'active'
      AND (s.current_period_end IS NULL OR s.current_period_end > now())
  )
$$;

REVOKE ALL ON FUNCTION actuaria_is_pro(uuid) FROM public, anon, authenticated;

-- Start a crew for an exam and sitting, as its first member — Pro only.
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
  IF NOT actuaria_is_pro(v_user) THEN
    RAISE EXCEPTION 'cohorts are part of Pro';
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

-- Join a crew by its invite code — Pro only. Returns the crew's id.
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
  IF NOT actuaria_is_pro(v_user) THEN
    RAISE EXCEPTION 'cohorts are part of Pro';
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
