# Concept Craft

A syllabus, built by combining its concepts. The reader starts a topic with three
to five **primitive** concepts on a board; dragging one onto another either finds a
**link** — the two stay where they are, a line joins them carrying the relation
between them ("multiplied by", "credibility-weighted with"), and the concept they
make appears hanging off it — or bounces back. Every link found stays on the board,
so a topic ends as a map of how its concepts fit together, laid out top to bottom
from what the reader started with to what they built from it.

It lives at **`/craft`** (the topic picker) and **`/craft/:moduleId`** (one topic's
board), opened from the **Concept Craft** row at the top of the Quiz tab, beside
Quiz Battle — a way of studying, not an exam. The routes are sheets laid over the
Quiz tab (`deskPlace` in `lib/viewTransition.ts`) and light the Quiz row in the
sidebar.

It began as a product brief written without this repo in view. What follows is
where it landed after meeting the app, and why.

## The pieces

| | |
|---|---|
| `quiz/src/lib/conceptCraft.ts` | The rules, pure and tested: the relation vocabulary, recipe lookup, `combine`, what a reader holds (`availableNodes`), the Mastery prompt (`relationQuestion`), the challenge and its hints (`dailyChallenge`, `craftPlan`, `nextCraft`), the board's rows (`nodeDepths`), the inspector's summary (`conceptSummary`) and the recipe book's own checks (`moduleProblems`). |
| `quiz/src/data/conceptCraft.ts` | **The recipe book** — six topics from Exam P to Exam 5. Authored, like `data/mnemonics.ts`. |
| `quiz/src/lib/craftLayout.ts` | The board's physics and geometry, pure and tested: bodies, springs, rows, collision, the camera, hit-testing. |
| `quiz/src/hooks/useConceptCraft.ts` | The reader's boards — localStorage, ids and numbers only. |
| `quiz/src/hooks/useConceptLevels.ts` | A concept's level and collected state for drawing its card — shared with Quiz Battle's topic pick. |
| `quiz/src/pages/Craft.tsx` | The topic picker and one topic's screen: top bar, challenge, deck, board, inspector, reveal, prompt. Lazy (`lazyRoute`). |
| `quiz/src/components/craft/` | `CraftBoard` (the canvas), `CraftDeck`, `CraftInspector`, `RelationPrompt`, `CraftReveal`, `CraftLogo`. |
| `quiz/e2e/craft.spec.ts` | The way in, a craft, a bounce, the Mastery prompt, tap-to-combine and the inspector. |

## The recipe book

A **module** is one topic: an exam, the learning objectives on that exam's page it
covers (named exactly as the page's `[!example]` callouts name them), three to five
primitives, ingredients a **milestone** adds to the deck later (`introduces` — the
reserving topic hands over *Loss Ratio* and *Earned Premium* once the chain ladder is
built, so it can open on four concepts and still reach Cape Cod), and **recipes**:

```ts
{ a: 'Chain Ladder Method', b: 'Expected Loss Method', relation: 'weighted',
  result: 'Bornhuetter-Ferguson Method',
  why: 'BF is a credibility weighting of the two: $U_{BF} = Z\,U_{CL} + (1 - Z)\,U_0$ …' }
```

Three rules hold it to the vault — `data/conceptCraft.test.ts` enforces them:

1. **Every concept is a page.** Each name is a file in `Concepts/`, because the
   board opens it in the app's own reader. A concept the vault has no page for can't
   be on the board.
2. **Every recipe restates its result's page.** The relation and the `why` line say
   what the result's own page already writes down, usually as its formula — BF's
   page calls it "a credibility weighting in disguise", Cape Cod's derives the ELR
   from reported losses, Unpaid Claims' writes `Case Reserves + IBNR`. The recipes
   were authored that way, page open; a relationship the vault can't back is left
   out rather than invented, because the game teaches whatever it rewards. They are
   AI-drafted from those pages and want the same human review as any other
   content (README, "About the Wiki").
3. **The book can be finished.** `moduleProblems`: three to five primitives, one
   result per pair, no concept combined with itself or making its own ingredient,
   and every concept and recipe reachable from the primitives.

**Why authored, not derived.** The first idea was to read the recipes off the
vault's wiki links — "C's page links to A and B, so A + B → C". It doesn't survive
contact with the pages: BF's page links to *Long Tail Lines*, *Rate Level Change*
and *Cape Cod Method* (a successor, not an ingredient) and not to the chain ladder
at all. Links are "see also", not "made of", and a game built on them would teach
that long-tail lines plus rate changes make Bornhuetter-Ferguson. The vault still
supplies everything that *is* there: the concepts, the definitions, the formulas,
the objectives and the questions.

**The relations are a closed vocabulary** (`CRAFT_RELATIONS`): two dozen tags,
each with a one-line gloss. Closed on purpose — the Mastery prompt asks the reader to
*name* the relation, and a choice between four free-text phrases would test reading
rather than recall. A recipe that needs a relation not in the list is a reason to add
one, gloss and all.

## Playing

- **Drag** a card onto another to combine them; **tap** a card to inspect it. With a
  card **held** (tap one in the deck), the next card tapped — in the deck or on the
  board — is combined with it: the way to play without a drag, from a keyboard or a
  switch. `Esc` puts a held card back, then closes the inspector.
- A pair that doesn't combine **bounces back** to where it was lifted, with one line
  of text — *No direct link between these concepts* — and no sound (mistakes are
  silent, `docs/sound-design.md` rule 7).
- A new link plays `collect` when it brings a new concept (a card landing in the
  deck) and `correct` when it is a second route to one already held, climbing the
  combo; the day's challenge met plays `levelUp`, the whole topic found `complete`.
- A pair found before lights its edge up again and shows its reveal card; so does
  tapping any tag on the board.

### Explore and Mastery

The reader picks one in the top bar; the choice is remembered.

- **Explore** — a real pair crafts at once. For a first pass over new material.
- **Mastery** — every pair dropped together opens a prompt, *How does A relate to
  B?*, with three relations and **No direct link**. Every pair, related or not: if
  only real pairs opened a prompt, the prompt would itself give away which pairs are
  real, and spam-dragging would still map the graph. A real pair offers its relation
  and two others; an unrelated one three relations, all wrong, and *No direct link*
  is right. The distractors are drawn from the topic's own relations first, so they
  are tags the reader has met here.
  A right answer crafts. A wrong one crafts nothing and says only whether the two
  combine at all — never how, or the next drop would be a free reveal — and a real
  pair answered wrongly can't be tried again for 15 seconds.

### The challenge

The pill across the top of the board names a concept to craft and how many crafts
stand between the reader and it (`craftPlan`: the cheapest route from what is held,
an intermediate shared by two routes counted once). **Hint** lights one ingredient of
the next craft on that route, then both; **Shuffle** passes to another target.

The day's target is drawn from a fixed order — the topic's craftable concepts shuffled
by the date and the topic (`challengeOrder`, FNV-1a) — so it is the same all day on
every device, and crafting anything other than the target never moves it. Meeting it
is recorded for the day; after that the pill keeps offering the next one as a bonus.

## The board

### Layout: rows, then forces

A free force layout tangles past a dozen concepts: tags stack on each other, results
drift above their ingredients, and two unconnected clusters float off in opposite
directions. The board is a **layered** force layout instead:

- Every concept has a **row** — its craft depth (`nodeDepths`): 0 for a primitive, one
  more than the deeper ingredient of the shallowest recipe found for it, and an
  introduced ingredient on the row of the concept that introduced it. A recipe's tag
  sits between its ingredients' row and its result's.
- **Rows own the heights.** A body is pulled to its row; springs between two rowed
  bodies, and repulsion across rows, act sideways only; two bodies bound for
  different rows don't collide (settled, the rows keep them apart). So a long link
  from a primitive to something four rows down draws the two into line instead of
  dragging the primitive off its row.
- **Forces own the sideways.** Springs pull each ingredient toward its tag and hang
  the result below it; every pair repels; bodies on one row are pushed apart
  sideways; weak gravity keeps the graph centred.

The opening board is laid out off screen — the simulation's whole cooling, a few
hundred ticks, well under a frame — and framed (`fitView`, inside the room the deck,
the challenge and the map controls leave). After that the simulation only runs warm
for a moment after each change.

### Under the hand

The card being dragged is a **ghost**: no force reaches it and it pushes nothing.
Without that, collision shoves the target out from under the card meant for it — a
drop could never land. A card thrown back stays a ghost until it is home, so it
passes through the others rather than barging them aside.

Positions live in a ref, and the board re-renders from it each frame while warm; the
page is told where everything settled, and the store keeps it. Under reduced motion
the simulation runs to rest synchronously and a bounce is a jump.

### Always dark

The board is, with Actuaria, the one place drawn dark whatever the reader's theme —
the brief's "clean, dark board" — scoped like Actuaria's (style guide §2.6): the
screen carries `.dark` and `color-scheme: dark`, so the sidebar and anything
portalled to the body (the action menu, the question browser) keep the reader's own
theme. Its floor is a dot grid (`.craft-floor`) whose spacing and offset follow the
camera, the one cue a blank canvas has that it was panned or zoomed. It is not
`.actuaria-grid`, which is Actuaria's in-world floor; it exists only under the board.
The topic picker follows the reader's theme like any other page.

## No second anything

The brief asked for an inspector with a definition, a formula, the node's connections
and its practice questions. Everything in it that the app already had is the app's:

- **The concept card** — the deck is `ConceptTile` (its foil edge the reader's level,
  `lib/flashcardFoil.ts`), and the board's cards wear the same foil. One concept is
  one card wherever it is drawn. The deck turns off the tile's padlock (`showLock`):
  every card in hand can be played.
- **The definition and formula** are the page's own — `conceptSummary` takes the
  opening paragraph `leadParagraph` (`lib/seo.ts`) already cuts the page's search
  description from, and the formula box that follows it.
- **The title** opens `ConceptActionMenu`, exactly as the reader's title does.
- **Read the page** opens `ConceptPopup` on a walk of the board's concepts (`walk:
  'corpus'`, so its syllabus-filter picker, which would have nothing to re-slice, is
  dropped).
- **Practice** opens `ConceptQuestionsModal`, the concept question browser every
  other surface starts a concept quiz from; the count is `filterQuestions`'
  `{ concept }`, so a question with an open critical finding is never offered.

## Storage

localStorage only (`craft.v1`), the way Cowork's stores are: per topic, the recipe ids
found, where each concept was left, the days the challenge was met and the Mastery
prompt's right/wrong tally, plus the mode. The record is ids and numbers, never
content, and `parseCraftSave` checks every field on the way in, so a recipe book that
grows or loses a recipe never breaks a saved board (`foundRecipes` drops ids it no
longer knows). A server table, synced the way the flashcard deck is
(`lib/flashcardSync.ts`), is the natural next step once the game has been played.

**What crafting does not touch.** Mastery, XP, streaks, quests and leagues are
earned by answering questions; a Mastery-prompt answer is about a *pair* of
concepts, not one, so it feeds none of them. The board *shows* the mastery ladder
(the foil) without writing to it.

## Measuring it

Two analytics events (`docs/analytics-and-monitoring.md`), for the brief's success
metrics:

- `craft_combined` — `module`, `mode`, `outcome` (`new_concept`, `new_link`,
  `known`, `none`, or `asked` when a Mastery prompt opens) and, for a prompt's
  verdict, `answer` (`right` / `wrong`). The share of drops answered in Mastery mode,
  and how they went, is the brief's "active encoding".
- `craft_module_completed` — `module`, `mode`: every link in a topic found, the
  brief's "schema completion".

## Adding a topic

1. Pick an objective on an exam page and the concepts it builds — each must have a
   page in `Concepts/`.
2. Choose three to five primitives a reader would start from; hold back ingredients
   that only matter later and add them with `introduces`.
3. For each concept to be crafted, open its page and write the recipe its formula or
   definition states: the two ingredients, the relation from `CRAFT_RELATIONS`, and a
   one- or two-sentence `why` that restates the page.
4. Run `npx vitest run src/data/conceptCraft.test.ts src/lib/conceptCraft.test.ts` —
   it fails on a missing page, an objective the exam page doesn't have, a duplicate
   pair or anything unreachable.
5. Open the topic and play it through once in each mode; then open it fully crafted
   and check the board reads top to bottom with nothing overlapping.
