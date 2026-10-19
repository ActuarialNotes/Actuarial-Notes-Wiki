# Concept Craft

A topic crafted out of its building blocks. A topic is one learning objective of an
exam page; the reader starts with the concepts nothing else in it is made from, and
drops one on another. **Any two connect**: a line is drawn between them carrying the
connection's **strength**, 0–100 — its thickness is the strength — and what the two
are to each other in one to five words (*Frequency* **multiplies with** *Severity*).
Where the vault ties the pair together, the connection also **makes** what is built
from it — cause and effect: the concepts whose own pages define them by the two, the
way frequency and severity make the pure premium. Those land on the board beside the
pair in the exam's colour. Every connection scores, the strong far more than the
faint (**Score**, below), and most of a board's score is in a few of its connections:
find 80% of it within your first 20% of its pairs for **gold** (**Medals**). Every connection
found stays on the board, so a topic ends as a map of how its concepts relate — the
strongly connected drawn close together, the loosely connected further out.

It lives at **`/craft`** — one board, opened from the **Concept Craft** row on
**Games** (`/games`, which the Quiz tab's **Games** row opens), beside Quiz Battle: a way of studying, not an exam. The board
opens straight away, empty the first time, and its **+** (bottom right, the largest control on the board) opens the
**starter packs**: every topic, under its exam's logo, in ladder order, in a menu that
opens upwards from the button and scrolls in place. Picking one adds that topic's seeds to the board — a pack on the
board is ticked off — and any number of packs, from any exams, can share it.
`/craft/:topicId` is a link to one pack: it adds it and shows the board. The route is
a sheet laid over the Quiz tab (`deskPlace` in `lib/viewTransition.ts`) and lights
the Quiz row in the sidebar.

### Starter packs

Each pack is a topic read on its own — its graph and seeds exactly as below — and the
board lays the packs' graphs side by side (`mergeGraphs`): a concept two packs share
is one card, a pair two packs both connect is one connection (the stronger reading),
and what that pair makes is what either pack says it makes. They are not re-read as
one bigger topic, which would re-weigh every name in passing and re-pick every
recipe, so a pack could no longer be made in full from its own seeds. The hand deals
each pack's seeds in the order the packs were added (`packSeeds`). A pack is
*complete* once every connection of its own topic is found; the board, once every
connection on it is.

Before the packs, a reader chose one topic from a picker page and played it on a
board of its own; those boards are folded into the one board on load
(`migratePerTopicSave`) — each topic played becomes a pack, its finds and positions
kept.

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

The third version brought back what made the first a game, without the book:
**finding a connection makes concepts**, so a board starts with a few cards and grows.
What a pair made was read off the same graph — the concepts tied most strongly to both
— so nothing was authored still. The challenge went: the reader builds and discovers on
their own. New cards are drawn in the exam's colour, and a connection's card is pared
down to its strength, its **Practice** button and what the pages say.

The fourth version changes *what* a pair makes. "Tied to both" made
concepts that were only related: Frequency and Severity made the Pure Premium, but
also the Basic Insurance Ratios that list them; Set Theory and the Law of Total
Probability made Conditional Probability, which the law is built *on*. Now a pair makes
what is **built from it** — cause and effect — read off the page of the concept it
makes (`lib/conceptRecipes.ts`, below): `Pure Premium = Frequency × Severity` is a
recipe; a list naming both is not. A topic starts from its building blocks, and a
connection's card says what it made and quotes the page that says why.

The fifth version — this one — lets **any two concepts connect**. A reader dropping two
cards together and being told *no connection* learned nothing, and the connections
that were found didn't say what they were. Now every pair connects, with a strength
read for it however faint (*Any pair*, below), the board **scores** what is found —
the stronger the connection the more, popping off the line that scored it — and every
connection says, in one to five words, **what one concept is to the other**
(*Relations*): written for the vault's connections (5,857 labels), and read off the vault for
any other pair. The graph's own connections — the ones the notes tie together — still
make concepts and still count toward a pack being complete; a pair the notes barely
tie makes nothing, scores little and is drawn as a dashed hairline. Since every pair
connects, finding them all is a matter of time; the **medals** make it a matter of
judgment — the Pareto rule as a win condition: most of the score is in a few
connections, and a medal is for finding those few first. Practising a connection
scores nothing on the board: it is an ordinary quiz, and earns what a quiz earns.

## The pieces

| | |
|---|---|
| `quiz/src/lib/conceptGraph.ts` | **The graph**, pure and tested: what a page says about other concepts (`pageMentions` — links, and names written out), the strength formula (`connectionStrength`, `STRENGTH_WEIGHTS`, `MIN_STRENGTH`, `STRENGTH_TIERS`) and `buildConceptGraph`. |
| `quiz/src/lib/conceptRecipes.ts` | **The recipes**, pure and tested: what a page's opening names and where (`openingNames`, `pageOpening`, `beforeAside`, `abbreviationOf`), each concept's best recipes (`buildRecipes`, `RECIPES`, `PLACE`) and what each connection makes (`recipesByPair`). |
| `quiz/src/lib/conceptCraft.ts` | **The rules**, pure and tested: topics read off the exam pages (`objectiveBlocks`, `craftTopics`), a topic's graph with its recipes (`topicGraph`, `craftGraph`), any pair's connection (`connectionFor`, `PATH_WEIGHT`, `FLOOR_STRENGTH`), what a connection makes (`madeBy`, `recipesOf`), the starting hand (`seedConcepts`), starter packs on one board (`mergeGraphs`, `packSeeds`), a reader's board (`boardState`, `combine`, `withConnection`, `topicTally`), the score (`connectionPoints`, `craftScore`) and a connection's practice (`practiceQuestions`). |
| `quiz/src/lib/conceptRelations.ts` | **What a connection says**, pure and tested: a written label (`writtenRelation`), else one read off the vault — recipes, the pages' own verb phrases (`phraseBetween`), the names (`nameRelation`), what the pair shares, the evidence, a path, where the two sit (`relationOf`) — and the sentence it makes (`relationSentence`). |
| `quiz/src/data/craftRelations.json` | **The written labels**: one per connection of the graph, keyed by `pairKey`, the direction first (`>` from the key's first name, `<` from its second, `=` either way). |
| `quiz/src/lib/craftMedals.ts` | **The medals**, pure and tested: the rules (`MEDALS`), the least each pair of a board scores (`leastPoints`), the best a play from the seeds reaches in so many connections (`bestPlay`), what each medal asks of a board (`medalPlan`), where the connections found stand against it (`medalStanding`) and what a find won (`medalsWon`). |
| `quiz/src/lib/craftLayout.ts` | The board's physics and geometry, pure and tested: bodies, strength-weighted springs, collision, seeding, where a made card lands (`spawnBeside`), the camera, hit-testing, where a line's label goes. |
| `quiz/src/hooks/useConceptCraft.ts` | The reader's board — localStorage, pack ids and pair keys only — and which connections the board shows. |
| `quiz/src/hooks/useConceptLevels.ts` | A concept's level and collected state for drawing its card — shared with Quiz Battle's topic pick. |
| `quiz/src/pages/Craft.tsx` | The board's screen: top bar, the empty board's invitation, deck, board, the bottom-right controls (**+**, zoom, fit, tidy, filter, clear), connection card. Lazy (`lazyRoute`). |
| `quiz/src/components/craft/` | `CraftBoard` (the canvas), `CraftDeck` (a side panel on a wide board only — a phone has no deck, every card being on its board), `CraftConnection` (a connection's card), `CraftPackMenu` (the starter packs the **+** opens), `CraftScoreboard` (the header's medals and score, and the medals' panel), `CraftLogo`. |
| `quiz/src/lib/conceptCraftVault.test.ts` | The topics, graphs and recipes over the real vault: every studiable exam has a board, ids are url-safe, nearly every concept is connected, every topic can be made in full from its seeds and no seed from the others, most of the vault is made rather than dealt, every medal of every topic can be won (its plays replayed by the board's own rules), a handful of recipes it must keep (*Frequency* and *Severity* make the *Pure Premium*), no quoted sentence cuts a formula in half — and the written labels: each names two concept pages in one to five words naming neither, nearly every connection of every topic has one, and any pair at all gets a relation of five words or fewer. |
| `quiz/e2e/craft.spec.ts` | The way in onto an empty board, starter packs added from the **+**, a connection found that makes new cards — drawn from the line that made them — with nothing to close, any pair connecting and scoring — the points popping off its line, the score counting up to them — with its line's weight its strength, the medals and what a connection spends of them, tap-then-tap, the concept popup, and a connection's card: what one concept is to the other and what it made, down to its quiz. |

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

## Any pair

Every two concepts on a board connect (`connectionFor`). Where the graph has the pair
— the notes tie the two at `MIN_STRENGTH` or more — that is its connection. Any other
pair is **inferred**:

- **Read on its own** (`readPair` in `lib/conceptGraph.ts`): what each page says about
  the other and the questions tagged with both, weighed exactly as the graph weighs a
  topic's pairs, with no cut-off — and no syllabus line, since lines are a topic's. Two
  concepts from different starter packs whose pages link each other read at full
  strength this way, quoted sentences and all.
- **Lifted by a path**: the strongest `a — c — b` through a concept connected to both,
  its two strengths multiplied (as fractions of 100) and halved (`PATH_WEIGHT`). Two
  strong connections through a shared concept make a faint one; two faint ones, next to
  nothing. The concept is kept (`via`), for the card and the relation.
- **Never nothing**: at least `FLOOR_STRENGTH` (1) — any two concepts of an actuarial
  syllabus are related somehow, and the score says how little.

An inferred connection is drawn, scored and kept like any other, but it **makes
nothing**, pulls on no spring (only connections at `MIN_STRENGTH` or more shape the
map, or every faint pair would knot it up), and doesn't count toward a pack's
complete. The tally counts the graph's own connections (*14 of 61 key connections*);
the score counts everything.

## Relations

Every connection says what one concept is to the other in **one to five words**, so
the line between two cards reads as a sentence: *Expected Loss Ratio* **is the a
priori in** *Bornhuetter-Ferguson Method*; *Credibility* **trades off against**
*Homogeneity*. A relation said of both reads with both names first: *Frequency* and
*Severity* **together make Pure Premium** (`relationSentence`). `relationOf` takes the
first of these that says something:

1. **Written** — `data/craftRelations.json`, 5,857 labels, one for each of the graph's
   connections across the thirty topics, keyed by `pairKey` with its direction first.
   Written by Claude for this board from the pair's quoted sentence and what it makes,
   **not yet reviewed** — like any AI-written vault content they want a human read,
   and a wrong one is a one-line fix in the file.
2. **A recipe** — the pair makes a third (`together make …`), or one is an ingredient of
   the other (`is a building block of`).
3. **The pages' own words** — a quoted sentence naming both, read for the phrase written
   between the names (`phraseBetween`): five words or fewer, one clause (no comma,
   dash, bracket, formula, *and*, *or*, *which*…), opening on a verb, comparison or
   operation and ending on something that leads into the other name — "is a special
   case of", "is multiplied by", "offsets"; never "is the assumption".
4. **The names** — one inside the other (*Expected Loss Ratio* **is a kind of** *Loss
   Ratio*; *Loss Ratio Method* **is built around** it), or one head word
   (**both are methods**; the head of "Complement of Credibility" is *complement*, and
   a field or a quantity — *credibility*, *probability*, *data* — is no head to share).
5. **What they share** — a concept both help build, or one both are built from.
6. **The evidence** — pages linking each other (`cross-reference each other`),
   questions testing both (`are tested together`), one page pointing at the other
   (`draws on`), a syllabus line (`share a syllabus line`).
7. **A path** — `linked through …` the concept tied most strongly to both.
8. **Where they sit** — the same syllabus section, the same exam (`both on Exam P`),
   two exams (`bridge Exam P and Exam 5`).

Written labels cover the pairs that matter most; the reading below them is what keeps
a pair no one wrote for — two packs' concepts brought together, a faint pair — from
going unlabelled. A label lives with the pair, not the topic, so a pair two topics
share says one thing. `conceptCraftVault.test.ts` holds the file to the vault: both
names are concept pages, one to five words naming neither, and at most one in twenty
of any topic's connections without one — a page edit that makes new connections can
add a few before it fails. To write labels for new connections, dump the topic's
missing pairs with their quoted sentence and what they make (as the vault test reads
them), write them, and add them to the file in the same shape.

## Score

The board keeps a **score**, top right (`craftScore`). **A connection found** scores
its strength squared over 100, at least 1 (`connectionPoints`): 90 scores 81, 50
scores 25, 20 scores 4, a faint inferred pair 1. Every pair connects; the score is
what says which connections were worth finding. The connection's card says what it
scored.

Every find is shown scoring. Its points **pop off its line** — from the middle of the
line, where its strength sits — rise and are gone, bigger the more they are (16 to 38
pixels, held at one size on screen whatever the zoom), with a ring in the exam's
colour flaring behind a strong find. The score in the header **counts up** to its new
total with a bump, the points flying off it, and the line at the bottom reads the
find as a sentence (*+81 · Frequency multiplies with Severity*). Reduced motion keeps
the numbers and drops the movement.

Practice scores nothing. It once did — each right answer on a connection's best run,
many times the find — but that made the score a count of quizzes taken, and the board
a long way round to the quiz tab. A connection's **Practice** is an ordinary quiz, and
what it earns is what any quiz earns: mastery, XP, the streak. The old practice keys
(`craft.practice.v1`, `craft.practice.pending`) are removed on load.

## Medals

Every pair connects, so finding them all is only a matter of time. What isn't is
finding the right ones: a board's score is concentrated — the notes tie some pairs
strongly and most faintly, and a connection's points grow with the square of its
strength — so most of it is in a few connections. The **medals** are the Pareto rule
as a win condition (`lib/craftMedals.ts`):

| Medal | Score | Within the first |
|---|---|---|
| **Gold** | 80% of the board's | 20% of its pairs |
| **Silver** | 70% | 30% |
| **Bronze** | 60% | 40% |

A board of *n* concepts has *n*(*n*−1)/2 pairs — ten concepts, 45 pairs, so gold is
80% of the score those 45 pairs hold, in the first 9 connections found. Shares of the
pairs round down, to at least one (`MEDALS`, `medalPlan`). The board's concepts are all
of its packs' concepts, made or not, and adding a pack makes a new board to medal on.

**Capped at what can be done.** A board whose score is spread thin may hold no 20% of
its pairs worth 80% of it — and every board starts from its seeds, so a pair can only
be found once both its cards have been made. So each medal's target is the lesser of
its share of the score and the most a play that keeps to the rules reaches in that
many connections (`bestPlay`). That play is three greedy plays from the seeds — the
pair worth most each time; a pair that makes something weighed by what it and its
cards' best pairs then score; and the same per connection spent — and the best of
them at each length is the cap. Each is a real play, so a capped target can always
be met; `conceptCraftVault.test.ts` replays them on every topic by the board's own
rules to check it. The medals' panel says when a target is capped (*the most any play
can reach*).

Over the vault, most topics' gold is capped: their score is less concentrated than
80/20 — a topic's faint pairs are many, and each still scores at least 1 — so gold is
the best a play can do, and asks for the strongest connections first, nearly without a
miss. Silver and bronze are rarely capped.

**Counted on the least each pair scores.** The graph's own connections count at
their strength; any other pair at the least `connectionFor` can give it — its path
through a concept tied to both (`leastPoints`) — because reading each such pair's pages
takes half a millisecond and a board has thousands (Exam 6C's financial reporting
alone, 4,656). A pair can only read stronger when found, so the estimate never puts a
medal out of reach; on a board of several packs a pair across two of them may score
well above its estimate, which only helps. Working a board out takes a few
milliseconds — about fifty for the largest topic — so nothing is precomputed.

**What counts is the order.** A medal looks only at the first connections found, as
many as its share — so a find spends one connection of each medal still in play.
Once a medal's connections are spent short of its target, it is **gone** for this
board: clear it, or add a pack, to play again. A medal won stays won. Nothing is
stored; where the board stands is re-read from the connections found, like the board
(`medalStanding`).

On the board:

- **The header** shows the three medals as discs — filled when won, a ring while in
  play, faint when gone — and, for the best medal still in play, what it needs: *138 to
  go · in 6 for Gold*. Tapping it opens **the panel**: how many pairs the board holds
  and what they are worth, and for each medal its target, its connections, a meter of
  how far the connections counted have got, and where it stands (*won with …*, *… to
  go · … connections left*, *missed*).
- **A medal won** spins in at the top of the board, ringed in its colour (*Gold medal! ·
  80% of the score in 7 connections*), and plays `complete`. A medal gone says so, and
  what is still in play (*Gold is out of reach · Silver: 92 to go in 3*). Screen readers
  hear both through the board's live region.

## Making concepts

A connection found makes the concepts **built from its two ends**. The vault already
says what a concept is built from, where it defines it: a concept page opens on its
definition, the formula that defines it and the points under them. So a recipe is read
off the page of the concept it makes (`lib/conceptRecipes.ts`), never authored:

- **Where a name sits.** A concept named in the definition sentence, or on the right of
  a formula with the page's own concept on the left, is an ingredient first; named in
  the rest of the lead paragraph, second; in the points under it — the page's
  *opening*, up to its first figure, callout or heading — last (`PLACE`, 3/2/1). A
  formula is read by its `\text{…}` names, or by the abbreviation a page gives its own
  name (`**Expected Loss Ratio** (ELR)` reads `\text{ELR}`).
- **What is not an ingredient.** A clause about what the concept is *for* ("used to
  compute …", "the basis for …", "the justification for …"), what it is set *against*
  ("rather than …", "unlike …") or what its *instances* are ("such as …", "the most
  fundamental are …") names nothing it is made of — each sentence is read only up to its
  first such clause (`beforeAside`). A sentence listing more than three of the topic's
  concepts names each one faintly, and a name the topic's pages write everywhere
  (*insurer*, *risk*) counts for less, as it does in the graph (`share`).
- **Which way it runs.** Nothing is made from its own effects: a concept whose own
  definition is built on the page's concept is never one of its causes. The Loss Ratio
  is the pure premium over the average premium, so the Pure Premium page mentioning
  the loss ratio doesn't make the loss ratio one of its ingredients. And a *foundation*
  of the topic — a concept more of its definitions build on than on either of the two
  — is made only by a recipe its page states plainly (`RECIPES.foundation`). The
  *Insurance Contract Liabilities* (the liability for remaining coverage plus the
  liability for incurred claims, by its formula) and the *MCT* (capital available
  against the base solvency buffer, by its definition) are; *Ratemaking* and
  *Statistics*, from the parts their pages mention in passing, aren't.
- **A recipe** is two ingredients the graph connects, at least one of them named in the
  definition, the lead or the formula — or both together in one short sentence of the
  opening. It scores what each ingredient counts for, plus how specifically one
  sentence names both, plus a little for a link. Each concept keeps its best two
  (`RECIPES.perConcept`). A connection makes at most three concepts, the best
  explained first, and none explained much worse than the best of them
  (`RECIPES.perPair`, `RECIPES.nearBest`) — so *Frequency* and *Severity* make the
  *Pure Premium* (its formula) and not the *Basic Insurance Ratios* that only list them.

Each recipe keeps the page's own words for it — the sentence or formula naming both,
or else the most definitional one naming either — and a connection's card shows them.

Some examples, as the vault has them: *Frequency* and *Severity* make the *Pure
Premium*; *Written* and *Earned Premium* the *Unearned Premium*; *Age-to-Age* and *Tail
Factors* the *Cumulative Development Factor*; *Spot Rate* and *Yield Rate* the *Yield
Curve*; *Face Value* and *Coupon Rate* the *Coupon*; *Limited Fluctuation Credibility*
and the *Full Credibility Standard*, *Partial Credibility*; the *Liabilities for
Incurred Claims* and *for Remaining Coverage*, *Insurance Contract Liabilities*.

Of the vault's 5,831 connections, 769 make something — few against a board's
hundreds of lines, but every concept that isn't a building block is made by at least
one of them. A connection that makes nothing still draws its line.

**When a recipe reads wrong**, it is the page that says the wrong thing about what its
concept is made of — a definition naming a use as if it were an ingredient, a formula
in symbols with no names — and the fix is to the page, not the rules.

### The starting hand

A topic starts with **the seeds** (`seedConcepts`): what nothing in the topic is made
from — its building blocks — plus, where some concepts are made only from each other,
the fewest that open the circle; and no seed the others can make. Every other concept
can be made from them, and `conceptCraftVault.test.ts` plays every topic out from its
seeds to check it — every concept, every connection — and checks that no seed could be
left out.

How many that is depends on how much the topic's pages build on each other: three
cards for FM's *Loans* (*Loans*, *Principal*, *Interest*) and *Bonds*, eleven in the
middle, and thirty of Exam 6C's forty-six on regulation, whose pages describe
institutions and laws more than they derive them. PCPA's *Dealing with Data* deals all
nine — nothing in it is defined by anything else — and plays as finding connections
alone. Across the vault a little under two-fifths of the concepts are dealt and the
rest are made.

The seeds are dealt in syllabus order, except that the connected pair with the
best-explained recipe comes first, so the first drop on a fresh board makes something,
and something it plainly makes: *Spot Rate* and *Yield Rate*, the *Yield Curve*.

## Playing

- **The deck** holds the concepts in hand — the seeds, then what each find made,
  in the order they came — with the new ones ringed in the exam's colour, and
  counts them against the topic (*12 of 19*). **Drag** a card onto a card on the
  board to try the pair; onto empty board, to move it there. Cards on the board drag
  the same way.
- **Tap** a card on the board to read it: the app's concept popup opens over the
  bottom of the screen on a walk of the cards in hand (`walk: 'corpus'`, which drops
  the popup's syllabus-filter picker — and never a concept not yet made), the board
  gives up that room (`--concept-split-height`), and
  the card being read is lit with its connections.
- **Tap a strength** on a line to open that connection's card. The line being looked
  at, or the one just found, carries its relation under its strength, an arrow saying
  which way the phrase reads.
- **No drag?** Tap a card in the deck to hold it; the next card tapped, in the deck
  or on the board, is tried against it — the way to play from a keyboard or a
  switch. `Esc` puts a held card back, then closes a connection's card.

When a pair connects — and any pair does — **nothing opens**. The line draws in
between the two cards, its strength pops onto it with what the two are to each other
under it, its points pop off it, one line at the bottom says what it scored and reads
the relation as a sentence (*+81 · Frequency multiplies with Severity*), the tally and
score move — the score counting up — the medals spend a connection, and
what it made lands beside the pair
(brought into view if that is at the edge), a dashed line in the exam's colour drawn
to it from the line that made it — cause, then effect. Screen readers are told what was found
and made through a live region. A find that makes a card plays `collect`, a line
the notes draw `correct`, a faint inferred one `select`, a topic's last connection
or a medal won `complete`. A pair found before pulses its line. Only a card dropped on itself goes
back, silently.

There is no prompt and no timer. The tally across the top — *12 of 19 concepts · 14 of
61 key connections* — the medals and the score beside it are the whole of it: a topic
is finished when every key connection is found, and won when its best ones were
found first.

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
the reader is working. A dashed line runs to it from the middle of the line that made
it while the card is new, and again whenever that connection or the card is being
looked at, so which pair made what can always be read off the map. A card with a remembered place goes back to it. Cards with
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

- **Weight by strength.** A line's thickness is its strength to the power 1.5, from a
  hairline (0.6) to a cord (11.6 at 100) — `lineWidth` in `lib/craftLayout.ts` — and its
  ink rises with it, so how strong a connection is reads before any number does. A
  connection under `MIN_STRENGTH` is dashed as well.
- **Focus.** The card under the pointer, the card being read in the popup, or the
  connection whose card is open is **lit** — its lines and their strengths in the
  exam's colour, the strengths drawn above the cards — and every other line steps
  back, its strength hidden.
- **The filter** (its own button, bottom right, cycling through the three and
  saying which in a line of text): every connection, moderate and strong
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
starter-pack menu hangs off the **+** and so is dark with the board.

### The exam's colour

The board takes an exam's accent (`examAccentStyle`, `lib/examColors.ts`) on the
screen's root — that of the pack added last — and it marks what is **new** and what is **in play**: a card made but
not yet in any connection found is filled with the exam's vivid accent, with a halo of
the soft one — the same cards are ringed in it in the deck — until the reader
connects it to something; a held, selected or targeted card is outlined in it; lit
lines, their strengths and the dashed lines to what each connection made are drawn
in it; and so is the connection card's meter, its **Practice** button and what it
made. Everything else stays the board's greys, so the colour
always means the same thing. Which cards are new is derived, not stored (`fresh` in
`boardState`). The starter-pack menu leads each exam's packs with its logo, and each
pack's add button is in that exam's colour (`ExamLogo`).

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
  and a meter marked at 40 and 70; below it, what the connection **makes** — each
  concept (a tap reads it) with its own page's sentence or formula for how the two
  build it, on the exam's colour — then what the pages say about each other, each
  sentence naming its page. The second version's lists — what the strength is
  measured on, the questions one by one, the syllabus line — are gone: they are the
  graph's working, not something to act on.

## Storage

localStorage only (`craft.v4`), the way Cowork's stores are: one board — the packs
added (topic ids, in order), the connections found, as pair keys in the order found
(inferred ones included — any two names on the board), and where each card was left —
plus the filter. Nothing else is stored — the cards in hand, which find made each,
which are new and where the medals stand are all re-read from that one list against the graph (`boardState`:
every pack's seeds, then each connection in order, kept only while both its ends were in hand
when it was found). So a vault edit that drops a concept or a connection takes it off
the board rather than breaking it, and one that changes what a pair makes — or a
change to the rules, like the fourth version's — changes the board with it. The earlier versions' saves — `craft.v1`'s recipe ids, `craft.v2`'s
hand-placed concepts and challenge days — mean nothing to a board whose concepts are
made, and are removed on load; `craft.v3`'s boards, one per topic, are folded into the
one board (`migratePerTopicSave`) and then removed. `parseCraftSave` checks every field on the way in. A
server table, synced the way the flashcard deck is (`lib/flashcardSync.ts`), is the
natural next step once the game has been played.

**What playing does not touch.** Mastery, XP, streaks, quests and leagues are earned
by answering questions; finding a connection is about a *pair* of concepts, so it
feeds none of them. The board *shows* the mastery ladder (the foil) without writing
to it — and a connection's **Practice** is an ordinary quiz, which does.

## Measuring it

Two analytics events (`docs/analytics-and-monitoring.md`):

- `craft_combined` — `exam`, `topic`, `outcome` (`new` or `known` — every pair connects now), for a pair
  that connects its `strength`, and for a new one how many concepts it `made`.
- `craft_topic_completed` — `exam`, `topic`: every connection in a topic found.
- `craft_medal_won` — `medal`, and how many `connections` it was won in on a board of
  how many `concepts`.

## Tuning the measure

The weights live in `STRENGTH_WEIGHTS` and the bands in `STRENGTH_TIERS`; both are
exported and documented where they are defined. The same goes for `RECIPES` and
`PLACE` in `lib/conceptRecipes.ts`, which set what a pair makes and so how large a
starting hand is. Before
changing any of them, look at what the graph does over the real vault — `conceptCraftVault.test.ts` builds every topic's
graph, and a throwaway test printing each topic's connection count, its strongest
and weakest pairs and the concepts with the most connections (and how many of those
rest on names in passing alone) is how the current numbers were chosen — for the
recipes, each topic's seed count, its opening pair, and a sample of its recipes
spread across the topic, read one by one for whether the made concept really is built
from the two. A topic's
graph is built in the browser when its board opens — about a tenth of a second for
the largest, on a laptop — so nothing is precomputed and nothing goes stale.
