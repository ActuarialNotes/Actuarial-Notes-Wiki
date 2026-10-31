-- The exam a deck card was added from. A concept is often on several exams'
-- syllabi (Convexity is FM's and ILA-M2's), and the Flashcards deck grouped by
-- exam used to file a card under whichever syllabus happened to list it last —
-- so a card added from Exam FM's shelf showed up under another exam. The client
-- now records the shelf's exam id on the card (FlashCard.exam, e.g. "FM-2");
-- this column carries it across devices. NULL for a card added from a search,
-- the Collected shelf or a quiz level-up — those are placed by syllabus.
-- lib/flashcardSync.ts pushes without the column until this is applied.
ALTER TABLE user_flashcards ADD COLUMN IF NOT EXISTS exam text;
