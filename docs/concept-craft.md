# Concept Craft

How a topic's concepts connect, found by hand. A topic is one learning objective of
an exam page; its concepts are a deck of cards. The reader puts cards on a board and
drops one on another: where the vault ties the two together a line is drawn between
them carrying the connection's **strength**, 0–100, and where nothing does the card
goes back. Every connection found stays on the board, so a topic ends as a map of
how its concepts relate — the strongly connected drawn close together, the loosely
connected further out.

It lives at **`/craft`** (the topic picker) and **`/craft/:topicId`** (one topic's
board), opened from the **Concept Craft** row at the top of the Quiz tab, beside
Quiz Battle — a way of studying, not an exam. The routes are sheets laid over the
Quiz tab (`deskPlace` in `lib/viewTransition.ts`) and light the Quiz row in the
sidebar.

## Where it came from

The first version was a product brief's Infinite-Craft game: a few **primitive**
concepts, and an authored recipe book of pairs that *make* a third — Chain Ladder
and Expected Loss, credibility-weighted, make Bornhuetter-Ferguson — each joined by
a named relation, with a Mastery mode that asked the reader to name it. Six topics,
about a dozen recipes each.

The second version keeps the board and drops the book. The brief asked to discover a
small, predefined structure; what a reader wants from a syllabus is the opposite —
**as many of the connections between its concepts as there are**, and a sense of
which matter most. Those can't be authored a dozen at a time, but they are already
in the vault: in what the pages say about each other, in which concepts the practice
questions test together, and in which the syllabus names in one breath. So every
connection is now **derived**, every one carries a **measure**, and the game is
finding them. What could not be derived went with the book: the relation's *name*
("multiplied by") — a link says two pages relate, not how — and with it Mastery's
"how does A relate to B?" prompt. Combining no longer opens anything: the map
updates and that is the answer. And a concept on the board is read in the app's own
concept popup, not a summary card of the board's.

## The pieces

| | |
|---|---|
| `quiz/src/lib/conceptGraph.ts` | **The graph**, pure and tested: what a page says about other concepts (`pageMentions` — links, and names written out), the strength formula (`connectionStrength`, `STRENGTH_WEIGHTS`, `MIN_STRENGTH`, `STRENGTH_TIERS`) and `buildConceptGraph`. |
| `quiz/src/lib/conceptCraft.ts` | **The rules**, pure and tested: topics read off the exam pages (`objectiveBlocks`, `craftTopics`), a reader's board (`combine`, `withPlaced`, `withConnection`, `topicTally`), and the daily challenge (`challengeOrder`, `dailyChallenge`, `bridgePlan`, `isBridged`). |
| `quiz/src/lib/craftLayout.ts` | The board's physics and geometry, pure and tested: bodies, strength-weighted springs, collision, seeding, the camera, hit-testing, where a line's label goes. |
| `quiz/src/hooks/useConceptCraft.ts` | The reader's boards — localStorage, names and pair keys only — and which connections the board shows. |
| `quiz/src/hooks/useConceptLevels.ts` | A concept's level and collected state for drawing its card — shared with Quiz Battle's topic pick. |
| `quiz/src/pages/Craft.tsx` | The topic picker and one topic's screen: top bar, challenge, deck, board, connection card. Lazy (`lazyRoute`). |
| `quiz/src/components/craft/` | `CraftBoard` (the canvas), `CraftDeck`, `CraftConnection` (a connection's card), `CraftLogo`. |
| `quiz/src/lib/conceptCraftVault.test.ts` | The topics and graphs over the real vault: every studiable exam has a board, ids are url-safe, nearly every concept is connected, a challenge can be set, and no quoted sentence cuts a formula in half. |
| `quiz/e2e/craft.spec.ts` | The way in, a connection found with nothing to close, a pair sent back, tap-then-tap, the concept popup, and a connection's card down to its quiz. |

## Topics

A topic is an `[!example]` callout of an exam page — *A. Ratemaking*, *Time Value of
Money* — and the concept pages its lines link to, in the order it names them
(`objectiveBlocks` reads the page the way `parseExamSyllabus` does, so a topic holds
what the study guide lists under that objective). `craftTopics` makes one of every
objective with at least `MIN_TOPIC_CONCEPTS` (6) concept pages, on every exam that can
be studied (`examStatus` — the DISCs and 6U, still outlines, have none), in ladder
order. Its id is the exam and the objective without its letter
(`exam-5-ratemaking`); its title is the objective without its letter; its weight is
the page's (`45–55%`). Nothing about a topic is authored: a new objective on an exam
page is a new board.

Sizes run from nine concepts (PCPA's *Dealing with Data*) to ninety-odd (Exam 6C's
financial reporting), and from about fifteen connections to nine hundred — thirty
boards in all.

## The graph

Three kinds of evidence, each one something the vault already says, combined into
one strength per pair (`buildConceptGraph`):

- **The pages.** A concept page that links to another (`[[Severity]]`), or names it
  in its text ("the pure premium is frequency times severity"). Names are read whole
  — any case, a hyphen for a space, plurals both ways (`nameForms`: "Bonds" is
  written "bond"; "Severity" is written "severities") — outside links, math and code,
  and longest first, so "Loss Ratio Method" on a page isn't also a mention of "Loss
  Ratio", and a page's own name is never a mention. The **sentence** each sits in is
  kept, links flattened to their text and cut outside math, because it is the page's
  own account of how the two relate.
- **The questions.** Practice questions tagged with both concepts — the quiz pool,
  `filterQuestions(all, {})`, so a question with an open critical finding or an
  off-syllabus one counts for nothing. A question tagged with two concepts says they
  belong together; one tagged with eight says less about any one pair, so each counts
  `1 / (tags − 1)`.
- **The syllabus.** Two concepts named on the same line of the objective. A short
  line ties its concepts together; a laundry list ties them loosely, so the weight
  falls off past five concepts on a line.

### The measure

`connectionStrength` treats them as independent pieces of evidence — a noisy-OR —
so each lifts the strength toward 100 and none reaches it alone:

```
strength = 100 × (1 − (1 − page(a→b)) × (1 − page(b→a)) × (1 − questions) × (1 − line))

page       0.5 for two or more links, 0.4 for one, 0.25 × (1 − share) for a name in passing
questions  0.7 × (1 − e^(−w/3)), w the weighted count of questions tagged with both
line       0.35 × min(1, 4 / (n − 1)), n the concepts on the shortest line naming both
```

**A common name counts for less.** *Insurer* is written on 96% of Exam 6C's
financial-reporting pages and *Variance* on three in four of MAS-II's mixed-model
pages; as names in passing they mark the topic, not the concept, and read naively
they connected those two to everything. So a name in passing is weighted by the
share of the topic's other pages that **don't** write it (`share`). A link is never
discounted: an author pointing at a page is pointing at the concept.

Pairs under `MIN_STRENGTH` (15) aren't connections — one question among many tags
is noise. The rest fall in three bands, `STRENGTH_TIERS`: **weak** below 40,
**moderate** from 40, **strong** from 70. As examples: Frequency and Severity — each
page links to the other, eleven questions test them together, one syllabus line
names both — read 84; Bayes' Theorem and the Law of Total Probability read 93; a
pair resting on one name in passing reads in the low twenties.

**What the number is.** It measures how much the *vault* says about a pair, not how
important the pair is to the exam. Usually those agree. Where they don't, the board
is showing a gap in the notes: the Loss Elimination Ratio is the limited expected
value over the mean, but its page only names *limited expected value* in passing,
links nothing to it, and the LEV's page never mentions the LER — so the pair reads
36, weak. The fix is to the pages, not the weights.

Each connection keeps at most three sentences, best first: prose before callouts and
tables, links before names, and each page's best before a second from either.

## Playing

- **The deck** holds every concept in the topic — those still to place first, then
  those already on the board. **Drag** a card onto empty board to put it down there;
  drag it onto a card on the board to try the pair. Cards on the board drag the same
  way.
- **Tap** a card on the board to read it: the app's concept popup opens over the
  bottom of the screen on a walk of the topic's concepts (`walk: 'corpus'`, which
  drops the popup's syllabus-filter picker), the board gives up that room
  (`--concept-split-height`; a phone's deck steps aside too), and the card being
  read is lit with its connections.
- **Tap a strength** on a line to open that connection's card.
- **No drag?** Tap a card in the deck to hold it; the next card tapped, in the deck
  or on the board, is tried against it — the way to play from a keyboard or a
  switch. `Esc` puts a held card back, then closes a connection's card.

When a pair connects, **nothing opens**. The line draws in between the two cards,
its strength pops onto it, the tally moves, and if the card came from the deck it
lands beside the one it was dropped on (brought into view if that is at the edge).
Screen readers are told what was found through a live region. A strong connection
plays `collect`, any other `correct`; the day's challenge met plays `levelUp`, a
topic's last connection `complete`. A pair found before pulses its line. A pair
nothing connects goes back, with one line of text — *No connection between these
two* — and no sound (mistakes are silent, `docs/sound-design.md` rule 7).

### The challenge

*What connects Amortization of Premium and Call Premium?* The day's challenge is two
concepts the vault doesn't connect directly but does through a third: met when the
reader has found the connections from some concept to both. The pill across the top
says how many are still to find (`bridgePlan` — through the concept needing the
fewest, the most strongly connected first); **Hint** names that concept (*Try Face
Value*), then the drop to make (*Drop Face Value on Amortization of Premium*), lit on
the board and in the deck; **Shuffle** passes to another pair. Its two concepts are
put on the board for the reader, so a fresh board opens on them.

The pairs are drawn from a fixed order — every pair two steps apart, shuffled by the
date and the topic (`challengeOrder`, FNV-1a) — so the challenge is the same all day
on every device, and finding connections that don't bridge it never moves it.
Meeting it is recorded for the day; after that the pill keeps offering the next.

*Why not "link A to B" by any chain?* It was the first version of this challenge,
and once a reader's connections joined up into one web every pair was trivially
linked — a board a third found had no challenge left. Asking what lies *between*
two concepts stays a question for as long as there are connections to find.

## The board

### Layout

A force layout in the d3-force mould (`lib/craftLayout.ts`): every card a body,
every pair repelling, overlapping cards pushed apart outright, weak gravity to the
middle. Every connection found is a spring between its two cards, and its strength
sets the spring (`connectionSpring`) — the strongest pull their cards to a short
arm's length with a stiff spring, the faintest hang loose at nearly three times that
— so the map's shape says what its numbers say. A spring's length is measured
between the cards' edges (`reach`, their half-widths, on top), which keeps a gap on
every line for its strength to sit in (`lineLabelPoint` puts it in the middle of the
stretch between the two cards, not under either).

A card arriving beside one it connects to lands on the far side of it from the
middle of the board (`spawnNear`), so the map grows outward. Cards with nothing to
arrive beside — the challenge's pair on a fresh board, a whole board restored without
saved positions — are seeded side by side, or for more than three in a sunflower
spiral (`seedPositions`), so a restored board starts as a disc the forces can settle
rather than a line they can't fold up. The opening board is laid out off screen — the
whole cooling, well under a frame — and framed (`fitView`, inside the room the deck,
the challenge and the map controls leave); after that the simulation runs warm only
for a moment after each change.

### Under the hand

The card being dragged is a **ghost**: no force reaches it and it pushes nothing.
Without that, collision shoves the target out from under the card meant for it — a
drop could never land. A card thrown back stays a ghost until it is home. A deck card
captures the mouse the moment it is pressed: a quick flick can otherwise leave the
card before its first move is heard, and the drag is lost.

### Reading a busy board

A well-played topic has dozens of lines. Three things keep it readable:

- **Ink by strength.** A line's weight and opacity rise with its strength; strong
  lines are drawn nearly solid, weak ones faint.
- **Focus.** The card under the pointer, the card being read in the popup, or the
  connection whose card is open is **lit** — its lines in the primary colour, their
  strengths drawn above the cards — and every other line steps back, its strength
  hidden.
- **The filter** (board menu → *Show*): every connection, moderate and strong
  (40+), or strong only (70+). It hides lines, never data — a lit card still shows all
  of its own — and is remembered.

Strengths are hidden below half zoom, where they can't be read; the lines stay.

### Always dark

The board is, with Actuaria, the one place drawn dark whatever the reader's theme,
scoped like Actuaria's (style guide §2.6): the screen carries `.dark` and
`color-scheme: dark`, so the sidebar and anything portalled to the body keep the
reader's own theme. Its floor is a dot grid (`.craft-floor`) whose spacing and offset
follow the camera, the one cue a blank canvas has that it was panned or zoomed. The
topic picker follows the reader's theme like any other page.

## No second anything

- **The card** — the deck is `ConceptTile` (its foil edge the reader's level,
  `lib/flashcardFoil.ts`), and the board's cards wear the same foil. One concept is
  one card wherever it is drawn. The deck turns off the tile's padlock (`showLock`):
  every card can be played.
- **The reader** — a concept is read in `ConceptPopup`, the app's one reader, with its
  title's action menu, its stacked pages and its walk. The board has no concept card
  of its own.
- **A connection's card** (`CraftConnection`) is the one panel the board draws itself,
  because a connection has no page anywhere else. Everything on it is transcribed from
  the graph: the strength with its band and a meter marked at 40 and 70, what it is
  measured on (*Each page links to the other*, *Tested together in 11 questions*,
  *Named together in the syllabus*), the pages' sentences, each naming its page (a tap
  reads it), the questions that test the pair, and the syllabus line. **Practice**
  starts a quiz on exactly those questions the way the question browsers do —
  `actuarial_selected_ids` in sessionStorage and `/quiz?selection=stored`.

## Storage

localStorage only (`craft.v2`), the way Cowork's stores are: per topic, the concepts
placed and the connections found (as names and pair keys), where each card was left
and the days the challenge was met, plus the filter. The first version's save
(`craft.v1`, recipe ids from a book that no longer exists) is removed on load.
`parseCraftSave` checks every field on the way in, and the board re-reads its lists
against the graph every time (`placedConcepts`, `foundConnections`), so a vault edit
that drops a concept or a connection takes it off the board rather than breaking it.
A server table, synced the way the flashcard deck is (`lib/flashcardSync.ts`), is the
natural next step once the game has been played.

**What playing does not touch.** Mastery, XP, streaks, quests and leagues are earned
by answering questions; finding a connection is about a *pair* of concepts, so it
feeds none of them. The board *shows* the mastery ladder (the foil) without writing
to it — and a connection's **Practice** is an ordinary quiz, which does.

## Measuring it

Two analytics events (`docs/analytics-and-monitoring.md`):

- `craft_combined` — `exam`, `topic`, `outcome` (`new`, `known` or `none`) and, for a
  pair that connects, its `strength`.
- `craft_topic_completed` — `exam`, `topic`: every connection in a topic found.

## Tuning the measure

The weights live in `STRENGTH_WEIGHTS` and the bands in `STRENGTH_TIERS`; both are
exported and documented where they are defined. Before changing either, look at what
the graph does over the real vault — `conceptCraftVault.test.ts` builds every topic's
graph, and a throwaway test printing each topic's connection count, its strongest
and weakest pairs and the concepts with the most connections (and how many of those
rest on names in passing alone) is how the current numbers were chosen. A topic's
graph is built in the browser when its board opens — about a tenth of a second for
the largest, on a laptop — so nothing is precomputed and nothing goes stale.
