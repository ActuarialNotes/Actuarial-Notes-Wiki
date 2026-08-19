-- Drop saved flashcard packs.
--
-- `user_flashcard_packs` (added in 20260808_flashcard_sync.sql) backed the
-- "Saved Packs" shelf at the foot of the add-flashcards sheet: named concept
-- lists the learner could save from the deck's manage dialog, plus the
-- "Completed <date>" packs that "Clear Completed Flashcards" minted
-- automatically. The feature is gone from the app — clearing completed cards
-- now simply takes them out of the deck, and the Collected view lists the
-- cards themselves — so the table has no reader left.
--
-- Nothing is lost with it: a pack only ever held concept *names*, and every
-- concept a pack could name is still in the wiki, still collected in
-- `user_collected_cards`, and still one tap from the deck in the Collected
-- view.

DROP TABLE IF EXISTS user_flashcard_packs;
