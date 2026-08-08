-- Flashcard sync: the collected-card set, the study deck and the saved packs —
-- until now the only learner state in the app that never left the browser.
-- Mastery, XP, streaks and quests all persist server-side, but "collecting" a
-- card (hooks/useCollectedCards) and the deck itself (hooks/useFlashcards) lived
-- purely in localStorage, so a student signing in on a second device saw a
-- different set of collected cards and an empty deck. These three tables give
-- that state a home; lib/flashcardSync.ts is the client half.
--
-- Row-per-card rather than one JSONB blob per user, deliberately: a deck is a
-- set, and two devices adding different cards must converge instead of the last
-- writer clobbering the other. The client merges its local state into the server
-- once per (device, user) on first sign-in, then treats the server as the source
-- of truth — see the "first-sign-in union" note in lib/flashcardSync.ts.
--
-- None of this is spendable currency, so — like user_streaks / user_quests —
-- the client owns its own rows directly under RLS rather than going through a
-- SECURITY DEFINER RPC.
--
-- `concept_key` is the concept name lowercased. It is the identity the client
-- has always used (every lookup in useFlashcards/useCollectedCards compares
-- `name.toLowerCase()`), so it is the primary key here too; `concept_name`
-- carries the display spelling the card was collected/added under.

-- ── Collected cards ───────────────────────────────────────────────────────────
-- One row per concept the learner has collected (passed the comprehension check
-- for). Gates mastery past New — see docs/flashcard-collection.md.
CREATE TABLE IF NOT EXISTS user_collected_cards (
  user_id      uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  concept_key  text        NOT NULL,                    -- lower(concept_name)
  concept_name text        NOT NULL,                    -- display spelling
  collected_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, concept_key)
);

CREATE INDEX IF NOT EXISTS user_collected_cards_user_idx
  ON user_collected_cards (user_id);

ALTER TABLE user_collected_cards ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users can manage their own collected cards" ON user_collected_cards;
CREATE POLICY "users can manage their own collected cards"
  ON user_collected_cards FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ── Study deck ────────────────────────────────────────────────────────────────
-- The cards currently in the Flashcards deck. `sort_order` mirrors the client's
-- customOrder array (index in that list, NULL when the card isn't in it);
-- `completed_at` is the in-deck checkmark that "Clear Completed" sweeps into a
-- saved pack.
CREATE TABLE IF NOT EXISTS user_flashcards (
  user_id      uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  concept_key  text        NOT NULL,                    -- lower(concept_name)
  concept_name text        NOT NULL,                    -- display spelling
  kind         text        NOT NULL DEFAULT 'concept',  -- WikiEntryRef.kind
  path         text,                                    -- WikiEntryRef.path, when set
  added_at     timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  sort_order   integer,
  PRIMARY KEY (user_id, concept_key)
);

CREATE INDEX IF NOT EXISTS user_flashcards_user_idx
  ON user_flashcards (user_id);

ALTER TABLE user_flashcards ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users can manage their own flashcards" ON user_flashcards;
CREATE POLICY "users can manage their own flashcards"
  ON user_flashcards FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ── Saved packs ───────────────────────────────────────────────────────────────
-- Named concept lists the learner can re-add from the add-flashcards sheet,
-- including the auto-generated "Completed <date>" packs. `pack_id` is the
-- client-generated id (`saved_…` / `completed_…`).
CREATE TABLE IF NOT EXISTS user_flashcard_packs (
  user_id   uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pack_id   text        NOT NULL,
  label     text        NOT NULL,
  concepts  text[]      NOT NULL DEFAULT '{}',
  saved_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, pack_id)
);

CREATE INDEX IF NOT EXISTS user_flashcard_packs_user_idx
  ON user_flashcard_packs (user_id);

ALTER TABLE user_flashcard_packs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users can manage their own flashcard packs" ON user_flashcard_packs;
CREATE POLICY "users can manage their own flashcard packs"
  ON user_flashcard_packs FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Ensure realtime delivers changes for these tables, so a card collected on the
-- phone lights up on the desktop without a reload (no-op if the publication is
-- FOR ALL TABLES or the table is already a member).
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE user_collected_cards;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN feature_not_supported THEN NULL;
  WHEN undefined_object THEN NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE user_flashcards;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN feature_not_supported THEN NULL;
  WHEN undefined_object THEN NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE user_flashcard_packs;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN feature_not_supported THEN NULL;
  WHEN undefined_object THEN NULL;
END $$;
