-- The slice of a Supabase database the migrations under test lean on, for a
-- plain local Postgres: the three API roles, auth.users, auth.uid() read off
-- the request's JWT claim, and — the part that matters for security tests —
-- Supabase's default privileges, which grant EXECUTE on every new function in
-- `public` to anon and authenticated directly (not through PUBLIC).

-- Roles are cluster-wide, so a second database on the same cluster finds them.
DO $$ BEGIN CREATE ROLE anon NOLOGIN; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE ROLE authenticated NOLOGIN; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE ROLE service_role NOLOGIN BYPASSRLS; EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE SCHEMA auth;
CREATE TABLE auth.users (id uuid PRIMARY KEY, email text);
CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$
  SELECT nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
$$;

GRANT USAGE ON SCHEMA auth TO anon, authenticated, service_role;
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION auth.uid() TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

-- Assertions for the test files: a failed one stops the run (ON_ERROR_STOP).
CREATE SCHEMA test;
GRANT USAGE ON SCHEMA test TO anon, authenticated, service_role;
CREATE FUNCTION test.ok(p_cond boolean, p_what text) RETURNS text LANGUAGE plpgsql AS $$
BEGIN
  IF p_cond IS NOT TRUE THEN
    RAISE EXCEPTION 'FAILED: %', p_what;
  END IF;
  RETURN 'ok: ' || p_what;
END;
$$;
CREATE FUNCTION test.fails(p_sql text, p_what text) RETURNS text LANGUAGE plpgsql AS $$
DECLARE
  v_failed boolean := false;
BEGIN
  BEGIN
    EXECUTE p_sql;
  EXCEPTION WHEN others THEN
    v_failed := true;
  END;
  IF NOT v_failed THEN
    RAISE EXCEPTION 'FAILED (expected an error): %', p_what;
  END IF;
  RETURN 'ok: ' || p_what;
END;
$$;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA test TO anon, authenticated, service_role;
