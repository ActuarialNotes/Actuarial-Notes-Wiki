-- user_cosmetics: per-user inventory of unlocked Store items.
-- IDs are catalog keys of the form '<animal>:<variant>' (e.g. 'fox:crimson').
-- The catalog itself lives in frontend code (quiz/src/lib/cosmetics.ts).

CREATE TABLE IF NOT EXISTS user_cosmetics (
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cosmetic_id text        NOT NULL,
  unlocked_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, cosmetic_id)
);

CREATE INDEX IF NOT EXISTS user_cosmetics_user_idx
  ON user_cosmetics (user_id);

ALTER TABLE user_cosmetics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can read their own cosmetics"
  ON user_cosmetics FOR SELECT
  USING (auth.uid() = user_id);

-- Atomic purchase: lock the user's gem row, verify funds + uniqueness, then
-- deduct and insert. Called via supabase.rpc('purchase_cosmetic', ...).
CREATE OR REPLACE FUNCTION purchase_cosmetic(p_cosmetic_id text, p_price integer)
RETURNS user_cosmetics
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_balance integer;
  v_row     user_cosmetics;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  IF p_cosmetic_id IS NULL OR length(p_cosmetic_id) = 0 THEN
    RAISE EXCEPTION 'p_cosmetic_id required';
  END IF;
  IF p_price IS NULL OR p_price <= 0 THEN
    RAISE EXCEPTION 'p_price must be positive';
  END IF;

  -- Reject duplicate ownership upfront so the user does not lose gems
  -- if they double-click "Buy".
  IF EXISTS (
    SELECT 1 FROM user_cosmetics
    WHERE user_id = v_user_id AND cosmetic_id = p_cosmetic_id
  ) THEN
    RAISE EXCEPTION 'cosmetic already owned';
  END IF;

  -- Lock the gem row for the duration of the transaction.
  SELECT balance INTO v_balance
  FROM user_gems
  WHERE user_id = v_user_id
  FOR UPDATE;

  IF v_balance IS NULL OR v_balance < p_price THEN
    RAISE EXCEPTION 'insufficient gems';
  END IF;

  UPDATE user_gems
     SET balance     = balance - p_price,
         total_spent = total_spent + p_price,
         updated_at  = now()
   WHERE user_id = v_user_id;

  INSERT INTO user_cosmetics (user_id, cosmetic_id)
  VALUES (v_user_id, p_cosmetic_id)
  RETURNING * INTO v_row;

  RETURN v_row;
END;
$$;

REVOKE ALL ON FUNCTION purchase_cosmetic(text, integer) FROM public;
GRANT EXECUTE ON FUNCTION purchase_cosmetic(text, integer) TO authenticated;
