-- user_gems: in-app currency earned by answering quiz questions correctly.
-- Writes are channeled through SECURITY DEFINER RPCs so the client cannot
-- arbitrarily set its balance: `award_gems` is called after a quiz completes,
-- and `purchase_cosmetic` (in 20260523_user_cosmetics.sql) decrements atomically.

CREATE TABLE IF NOT EXISTS user_gems (
  user_id      uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  balance      integer     NOT NULL DEFAULT 0 CHECK (balance >= 0),
  total_earned integer     NOT NULL DEFAULT 0 CHECK (total_earned >= 0),
  total_spent  integer     NOT NULL DEFAULT 0 CHECK (total_spent >= 0),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_gems ENABLE ROW LEVEL SECURITY;

-- Clients can only read their own row. All writes go through SECURITY DEFINER
-- functions below — direct INSERT/UPDATE/DELETE from the client is forbidden.
CREATE POLICY "users can read their own gems"
  ON user_gems FOR SELECT
  USING (auth.uid() = user_id);

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

REVOKE ALL ON FUNCTION award_gems(integer) FROM public;
GRANT EXECUTE ON FUNCTION award_gems(integer) TO authenticated;
