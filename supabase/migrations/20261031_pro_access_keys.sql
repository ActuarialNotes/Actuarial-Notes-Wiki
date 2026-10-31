-- Single-use Pro access keys: each grants Pro for a fixed number of months to
-- the one account that redeems it. Unlike the shared beta tester codes
-- (BETA_TESTER_CODES, Pro with no expiry), a key is good once.
--
-- Only the sha256 of a key is stored (of the key upper-cased, dashes and spaces
-- removed — what `redeem-beta-code` hashes), so a read of this table never
-- yields a usable key. Keys are made by scripts/pro_access_keys.py, which
-- prints the keys once and the SQL that inserts their hashes.
--
-- RLS is on with no policies: only the service role (the edge function) reads
-- or writes it.

CREATE TABLE IF NOT EXISTS pro_access_keys (
  code_hash       text        PRIMARY KEY,
  duration_months integer     NOT NULL CHECK (duration_months BETWEEN 1 AND 36),
  batch           text        NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now(),
  expires_at      timestamptz,
  redeemed_by     uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  redeemed_at     timestamptz
);

CREATE INDEX IF NOT EXISTS pro_access_keys_batch_idx ON pro_access_keys (batch);

ALTER TABLE pro_access_keys ENABLE ROW LEVEL SECURITY;
