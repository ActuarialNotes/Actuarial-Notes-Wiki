# Concept Craft

A topic crafted out of a few of its concepts. A topic is one learning objective of an
exam page; the reader starts with a small hand of its concepts — the fewest from which
all the rest can be made — and drops one on another. Where the vault ties the two
together a line is drawn between them carrying the connection's **strength**, 0–100,
and the connection **makes** what lies between them: the concepts most strongly tied
to both, which land on the board beside the pair in the exam's colour. Where nothing
ties them the card goes back. Every connection found stays on the board, so a topic
ends as a map of how its concepts relate — the strongly connected drawn close
together, the loosely connected further out.

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

The second version dropped the book. What a reader wants from a syllabus is **as
many of the connections between its concepts as there are**, and a sense of which
matter most; those can't be authored a dozen at a time, but they are already in the
vault — in what the pages say about each other, in which concepts the practice
questions test together, and in which the syllabus names in one breath. So every
connection is **derived**, every one carries a **measure**, and the game is finding
them. What could not be derived went with the book: the relation's *name*
("multiplied by") — a link says two pages relate, not how. Combining stopped opening
anything (the map updates and that is the answer), and a concept on the board is read
in the app's own concept popup, not a summary card of the board's. But it dealt the
whole topic at once, and set a daily "what connects A and B?" challenge.

The third version — this one — brings back what made the first a game, without the
book: **finding a connection makes concepts**, so a board starts with a few cards and
grows. What a pair makes is read off the same graph (the concepts tied to both), so
nothing is authored still. The challenge is gone: the reader builds and discovers on
their own. New cards are drawn in the exam's colour, and a connection's card is
pared down to its strength, its **Practice** button and what the pages say.

## The pieces

| | |
|---|---|
| `quiz/src/lib/conceptGraph.ts` | **The graph**, pure and tested: what a page says about other concepts (`pageMentions` — links, and names written out), the strength formula (`connectionStrength`, `STRENGTH_WEIGHTS`, `MIN_STRENGTH`, `STRENGTH_TIERS`) and `buildConceptGraph`. |
| `quiz/src/lib/conceptCraft.ts` | **The rules**, pure and tested: topics read off the exam pages (`objectiveBlocks`, `craftTopics`), what a connection makes (`MAKING`, `commonNeighbours`, `madeBy`), the starting hand (`seedConcepts`), a reader's board (`boardState`, `combine`, `withConnection`, `topicTally`) and a connection's practice (`practiceQuestions`). |
| `quiz/src/lib/craftLayout.ts` | The board's physics and geometry, pure and tested: bodies, strength-weighted springs, collision, seeding, where a made card lands (`spawnBeside`), the camera, hit-testing, where a line's label goes. |
| `quiz/src/hooks/useConceptCraft.ts` | The reader's boards — localStorage, pair keys only — and which connections the board shows. |
| `quiz/src/hooks/useConceptLevels.ts` | A concept's level and collected state for drawing its card — shared with Quiz Battle's topic pick. |
| `quiz/src/pages/Craft.tsx` | The topic picker and one topic's screen: top bar, deck, board, connection card. Lazy (`lazyRoute`). |
| `quiz/src/components/craft/` | `CraftBoard` (the canvas), `CraftDeck`, `CraftConnection` (a connection's card), `CraftLogo`. |
| `quiz/src/lib/conceptCraftVault.test.ts` | The topics and graphs over the real vault: every studiable exam has a board, ids are url-safe, nearly every concept is connected, every topic can be made in full from a small hand, and no quoted sentence cuts a formula in half. |
| `quiz/e2e/craft.spec.ts` | The way in, a connection found that makes new cards with nothing to close, a pair sent back, tap-then-tap, the concept popup, and a connection's card down to its quiz. |

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

## Making concepts

A connection found makes **what lies between its two concepts**: the concepts
connected to both (`commonNeighbours`), the most strongly tied first — a concept's
tie to the pair is the weaker of its two connections — taking at most three, and
only those tied at 25 or more (`MAKING`, `madeBy`). On Exam 5's ratemaking board,
*Frequency* dropped on *Severity* makes *Pure Premium*, *Loss Trend* and *Basic
Insurance Ratios*; on Exam FM's loans board, *Loans* on *Principal* makes *Term of
Loan*, *Outstanding Balance* and *Amortization*. The cap and the floor are what keep
a find a discovery rather than a flood: the vault's best-connected pair has
thirty-nine concepts in common, thirty-four of them over the floor.

A concept is made once — one already in hand isn't made again — and a pair found a
second time just pulses its line. Nineteen connections in twenty have something
between their two ends, but a find makes only what isn't in hand yet, so early
finds bring cards and late ones mostly add a line.

### The starting hand

A topic starts with **the seeds** (`seedConcepts`): the fewest concepts from which
every other in the topic can be made, by finding connections between cards in
hand and playing on with what they make. Found greedily — which on graphs this size
is the minimum or close to it: first the connected pair that reaches the most,
preferring the pair earliest in the syllabus (the first that reaches every concept
wins), then, while anything is still out of reach, the concept that brings the most
of it within reach, earliest first. A concept nothing can make — one with no
connection, or none shared strongly enough with a pair — is always a seed.

Over the vault's thirty boards that is two to eight cards, three in the middle:
*Set Theory* and *The Law of Total Probability* are all it takes to make the
nineteen concepts of Exam P's general probability; *Ratemaking*, *Data Issues* and
*Coinsurance Percentage*, the seventy-nine of Exam 5's ratemaking. The seeds are
dealt in that order, so the first two cards on a fresh board are always a connected
pair — the one that reaches furthest — and the first drop a reader tries is likely
to work. `conceptCraftVault.test.ts` plays every
topic out from its seeds and checks that it reaches every concept and every
connection.

## Playing

- **The deck** holds the concepts in hand — the seeds, then what each find made,
  in the order they came — with the new ones ringed in the exam's colour, and
  counts them against the topic (*7 of 19*). **Drag** a card onto a card on the
  board to try the pair; onto empty board, to move it there. Cards on the board drag
  the same way.
- **Tap** a card on the board to read it: the app's concept popup opens over the
  bottom of the screen on a walk of the cards in hand (`walk: 'corpus'`, which drops
  the popup's syllabus-filter picker — and never a concept not yet made), the board
  gives up that room (`--concept-split-height`; a phone's deck steps aside too), and
  the card being read is lit with its connections.
- **Tap a strength** on a line to open that connection's card.
- **No drag?** Tap a card in the deck to hold it; the next card tapped, in the deck
  or on the board, is tried against it — the way to play from a keyboard or a
  switch. `Esc` puts a held card back, then closes a connection's card.

When a pair connects, **nothing opens**. The line draws in between the two cards,
its strength pops onto it, the tally moves, and what it made lands beside the pair
(brought into view if that is at the edge). Screen readers are told what was found
and made through a live region. A find that makes a card plays `collect`, a line
alone `correct`, a topic's last connection `complete`. A pair found before pulses
its line. A pair nothing connects goes back, with one line of text — *No connection
between these two* — and no sound (mistakes are silent, `docs/sound-design.md`
rule 7).

There is nothing else to do: no prompt, no target, no timer. The tally across the
top — *12 of 19 concepts · 14 of 61 connections* — is the whole of the scoring, and
a topic is finished when every connection is found.

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

A card a find made lands off the middle of the line between the two cards that made
it, on the side away from the middle of the board (`spawnBeside`), the up-to-three
cards of one find fanned out along the line — so the map grows outward from where
the reader is working. A card with a remembered place goes back to it. Cards with
nothing to arrive beside — the seeds on a fresh board, a whole board restored without
saved positions — are seeded side by side, or for more than three in a sunflower
spiral (`seedPositions`), so a restored board starts as a disc the forces can settle
rather than a line they can't fold up. The opening board is laid out off screen — the
whole cooling, well under a frame — and framed (`fitView`, inside the room the deck
and the map controls leave, with less margin on a narrow board); after that the
simulation runs warm only for a moment after each change.

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
  connection whose card is open is **lit** — its lines and their strengths in the
  exam's colour, the strengths drawn above the cards — and every other line steps
  back, its strength hidden.
- **The filter** (board menu → *Show*): every connection, moderate and strong
  (40+), or strong only (70+). It hides lines, never data — a lit card still shows all
  of its own — and is remembered.

Below half zoom, where a strength drawn at its own size can't be read, only a lit
card's strengths are shown, and they are counter-scaled to keep a readable size on
screen (to three times their size on the board), so a phone showing a whole topic
can still open a connection: tap a card, then one of its strengths. The other lines
stay, unlabelled.

### Always dark

The board is, with Actuaria, the one place drawn dark whatever the reader's theme,
scoped like Actuaria's (style guide §2.6): the screen carries `.dark` and
`color-scheme: dark`, so the sidebar and anything portalled to the body keep the
reader's own theme. Its floor is a dot grid (`.craft-floor`) whose spacing and offset
follow the camera, the one cue a blank canvas has that it was panned or zoomed. The
topic picker follows the reader's theme like any other page.

### The exam's colour

The board takes its exam's accent (`examAccentStyle`, `lib/examColors.ts`) on the
screen's root, and it marks what is **new** and what is **in play**: a card made but
not yet in any connection found is filled with the exam's vivid accent, with a halo of
the soft one — the same cards are ringed in it in the deck — until the reader
connects it to something; a held, selected or targeted card is outlined in it; lit
lines and their strengths are drawn in it; and so is the connection card's meter and
its **Practice** button. Everything else stays the board's greys, so the colour
always means the same thing. Which cards are new is derived, not stored (`fresh` in
`boardState`). The topic picker leads each topic with its exam's logo, in the same
colour (`ExamLogo`).

## No second anything

- **The card** — the deck is `ConceptTile` (its foil edge the reader's level,
  `lib/flashcardFoil.ts`), and the board's cards wear the same foil. One concept is
  one card wherever it is drawn. The deck turns off the tile's padlock (`showLock`):
  every card can be played.
- **The reader** — a concept is read in `ConceptPopup`, the app's one reader, with its
  title's action menu, its stacked pages and its walk. The board has no concept card
  of its own.
- **A connection's card** (`CraftConnection`) is the one panel the board draws itself,
  because a connection has no page anywhere else. It is built around one action:
  **Practice**, full-width in the exam's colour and focused when the card opens,
  starting a quiz the way the question browsers do (`actuarial_selected_ids` in
  sessionStorage and `/quiz?selection=stored`) on the questions that test the two
  concepts together — or, for a pair no question tests, on either concept's, the
  most focused first (fewest concepts tagged), up to ten (`practiceQuestions`); both
  drawn from the quiz pool, so nothing a quiz wouldn't serve is offered. Above it,
  the two names (each opens its concept in the popup) and the strength with its band
  and a meter marked at 40 and 70; below it, what the pages say about each other,
  each sentence naming its page. The second version's lists — what the strength is
  measured on, the questions one by one, the syllabus line — are gone: they are the
  graph's working, not something to act on.

## Storage

localStorage only (`craft.v3`), the way Cowork's stores are: per topic, the
connections found, as pair keys in the order found, and where each card was left,
plus the filter. Nothing else is stored — the cards in hand, which find made each and
which are new are all re-read from that one list against the graph (`boardState`:
the seeds, then each connection in order, kept only while both its ends were in hand
when it was found). So a vault edit that drops a concept or a connection takes it off
the board rather than breaking it, and one that changes what a pair makes changes
the board with it. The earlier versions' saves — `craft.v1`'s recipe ids, `craft.v2`'s
hand-placed concepts and challenge days — mean nothing to a board whose concepts are
made, and are removed on load. `parseCraftSave` checks every field on the way in. A
server table, synced the way the flashcard deck is (`lib/flashcardSync.ts`), is the
natural next step once the game has been played.

**What playing does not touch.** Mastery, XP, streaks, quests and leagues are earned
by answering questions; finding a connection is about a *pair* of concepts, so it
feeds none of them. The board *shows* the mastery ladder (the foil) without writing
to it — and a connection's **Practice** is an ordinary quiz, which does.

## Measuring it

Two analytics events (`docs/analytics-and-monitoring.md`):

- `craft_combined` — `exam`, `topic`, `outcome` (`new`, `known` or `none`), for a pair
  that connects its `strength`, and for a new one how many concepts it `made`.
- `craft_topic_completed` — `exam`, `topic`: every connection in a topic found.

## Tuning the measure

The weights live in `STRENGTH_WEIGHTS` and the bands in `STRENGTH_TIERS`; both are
exported and documented where they are defined. The same goes for `MAKING`, whose cap and
floor set how fast a board grows and how small its starting hand can be. Before
changing any of them, look at what the graph does over the real vault — `conceptCraftVault.test.ts` builds every topic's
graph, and a throwaway test printing each topic's connection count, its strongest
and weakest pairs and the concepts with the most connections (and how many of those
rest on names in passing alone) is how the current numbers were chosen — for
`MAKING`, each topic's seed count and how many cards its finds make. A topic's
graph is built in the browser when its board opens — about a tenth of a second for
the largest, on a laptop — so nothing is precomputed and nothing goes stale.
