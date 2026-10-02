-- user_actuaria: a player's Actuaria Online settings (docs/actuaria-online.md §8.1).
--
-- Actuaria is a skin over state the app already keeps — Credibility is
-- concept_mastery and the readiness score, Coverage is user_streaks, rewards are
-- user_gems and user_xp — so this is the one small table of its own: the ability
-- loadout taken into a private-channel battle, whether the title screen has
-- been seen, whether the Study Guides hub card was dismissed, and the ship
-- cosmetics equipped in the Hangar (bought through purchase_cosmetic, owned in
-- user_cosmetics; this only records which one sits in each slot).
--
-- Nothing here is visible to another player and nothing here is currency, so
-- the client owns its row under RLS, like user_xp. The client keeps the same
-- shape in localStorage for guests (quiz/src/lib/actuaria/prefsStore.ts).

CREATE TABLE IF NOT EXISTS user_actuaria (
  user_id       uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  loadout       text[]      NOT NULL DEFAULT '{reinsurance}'
                            CHECK (cardinality(loadout) <= 3),
  hub_dismissed boolean     NOT NULL DEFAULT false,
  title_seen    boolean     NOT NULL DEFAULT false,
  ship          jsonb       NOT NULL DEFAULT '{}'::jsonb,
  updated_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_actuaria ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users can manage their own actuaria settings" ON user_actuaria;
CREATE POLICY "users can manage their own actuaria settings"
  ON user_actuaria FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
