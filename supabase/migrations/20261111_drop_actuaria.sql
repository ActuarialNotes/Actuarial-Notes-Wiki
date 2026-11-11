-- Remove Actuaria Online.
--
-- Actuaria (20260929_actuaria.sql, 20260930_actuaria_crews.sql,
-- 20261001_actuaria_pro.sql, 20261002_actuaria_approved.sql) is gone from the
-- app. This puts award_gems back to its plain form (20260523_user_gems.sql:
-- no risk-pool multiplier) and drops every table and function Actuaria added.
-- Gems already paid and cosmetics already owned are left as they are.

-- award_gems first: the risk-pool version calls actuaria_* functions.
CREATE OR REPLACE FUNCTION award_gems(p_amount integer)
RETURNS user_gems
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_row     user_gems;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  IF p_amount IS NULL OR p_amount <= 0 THEN
    RAISE EXCEPTION 'p_amount must be positive';
  END IF;

  INSERT INTO user_gems (user_id, balance, total_earned)
  VALUES (v_user_id, p_amount, p_amount)
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

-- Every actuaria_* function, whatever its signature.
DO $$
DECLARE
  f record;
BEGIN
  FOR f IN
    SELECT p.oid::regprocedure AS sig
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.proname LIKE 'actuaria\_%'
  LOOP
    EXECUTE format('DROP FUNCTION IF EXISTS %s CASCADE', f.sig);
  END LOOP;
END;
$$;

DROP TABLE IF EXISTS actuaria_raid_hits     CASCADE;
DROP TABLE IF EXISTS actuaria_raid_draws    CASCADE;
DROP TABLE IF EXISTS actuaria_raids         CASCADE;
DROP TABLE IF EXISTS actuaria_challenges    CASCADE;
DROP TABLE IF EXISTS actuaria_nudges        CASCADE;
DROP TABLE IF EXISTS actuaria_guide_payouts CASCADE;
DROP TABLE IF EXISTS actuaria_crew_replies  CASCADE;
DROP TABLE IF EXISTS actuaria_crew_threads  CASCADE;
DROP TABLE IF EXISTS actuaria_crew_members  CASCADE;
DROP TABLE IF EXISTS actuaria_crews         CASCADE;
DROP TABLE IF EXISTS user_actuaria          CASCADE;
