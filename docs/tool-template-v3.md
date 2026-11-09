# Tool template v3: the Ledger

Build spec for the third pass on the tool page (`docs/actuarial-tools.md` §19, after
`docs/tool-template-v2.md`). It comes from the phone review in `docs/tools-ux-review.md`, the
maintainer's answers to its four questions (§7.1 there), and three directions drawn on four pages
(<https://claude.ai/artifact/JvrVpKhnY4aRGgLRcDRt8p>). The maintainer chose **A, Ledger**, with one
piece of B: Insurer Return's bars setting capital against the minimum, as a card of their own under
the timeline.

Status: **first four pages built 2026-11-09** (§7 records what was built). Roadmap row: A12, §3.4
*Proposed*.

## 1. In one paragraph

Today's page, made steady. The answer card stays on top. Every number is one line, and tapping it
opens its slider under it, at any input count, so the card never re-lays itself. A **Solve for**
strip on the answer card makes any one of a tool's unknowns the answer. Where a value came from is
shown only where it isn't the example's. Choices come before what they change, and a Data Source's
question comes before its answer. Grids keep the origin and the answer pinned, say how many columns
are off screen, and name every column a formula cites. A tool in a chain says where it sits in it.

## 2. Rules (every tool)

### 2.1 The answer card
- Eyebrow (area · reading), the name (opens the method), reset and ⋯, as v2.
- The lead figure, with its symbol and words over it where they add to the name (v2's `leadLabel`).
- **Every other figure beside it says what it is**: symbol, then its words, then the value
  ("IBNR Total 1,084.52", "j Yield per coupon 2.5%"). Never "over N years" for a figure that isn't
  a span (the review's D_mod and Redington bugs).
- An underscore in a symbol is a subscript (`D_mod`, `E[Y_L]`, `t_pp`): `Sym` and the input row's
  symbol square both draw it, never the raw `_`.

### 2.2 Number rows
- **One line each, at any count** (the maintainer's answer 1): symbol, label, ◆ for a judgment,
  value pill. Tapping the row opens its slider in place, with "Or take it from" the tools that can
  supply it; the pill opens the keypad sheet. `INLINE_SLIDER_LIMIT` and `slidersInline` are gone.

### 2.3 Order
- One group, in the formula's order, judgments among the inputs (no *Your judgments* group). The
  layout no longer flips when a choice adds an input.
- **Choices first** (`inputGroups` returns `{ choices, inputs }`): a choice can change which inputs
  exist, or what a grid means. On a grid tool the choices sit **above the grid** (Bornhuetter-
  Ferguson's *Claims: Reported / Paid*), the numbers below it under *Inputs*.

### 2.4 Provenance by exception
- A row says where its value came from only when it isn't the default (the maintainer's answer 2):
  Yours, a published figure, a filed cell, a link. `ownChip(source)`.
- No "from ● Default" chips, no "All / The rest ● Default" lines, nothing under a grid at its
  default.
- A group holding a judgment ends in one line: "◆ marks a judgment: yours to choose." R3 still
  holds in the run itself (`judgments`, `default: true`).

### 2.5 Controls before results
- **A Data Source asks first** (`spec.area === 'data'`): its source line (publisher and licence,
  from `datasetsFor`), then its inputs, then the answer card. The pickers are no longer under 20–60
  rows of results.
- A long result table **folds** (`ResultTableView fold`): past 12 rows it shows 8, round the row the
  run is about (`ResultTable.highlight`, marked in the exam's wash), with "All N rows".

### 2.6 The figure
- A `lines` figure carries a scale (the maintainer's answer 4): the y maximum at the top left, the
  x range at the foot where no ticks are given, and the run's point in numbers beside it ("1,077.95
  at 5%"; on a ticked axis, the point's own name: "379.38% at Q2 2026"). The catalogue miniature
  stays bare.

### 2.7 Grids
- Origin pinned left, the first computed column pinned right (as before).
- **"N more columns ›"** over the grid while columns are off screen between the two pins; it scrolls
  the next one in, and "‹ First columns" goes back (`useOffscreenColumns` in `ToolGrid.tsx`).
- A cell is as wide as what it holds (`minWidth` from the printed text), so a typed value is never
  clipped into a plausible wrong number.
- The formula line names every column it cites: "(4) Ultimate = (1) Latest + (5) IBNR"
  (`formulaLine` in `lib/toolTemplate.ts`).

### 2.8 Hand-offs
- *Takes from* reads "open ›", never a back-pointing chevron.
- *Gives to* with up to three tools is listed open, each with the values it would carry.

## 3. Solve for any unknown

The maintainer's answer 3: a tool solves for any one of its unknowns, as one tool.

- A spec names the choice that picks the answer: `ToolSpec.solveFor` (Bond Price's `solve`).
- The template draws that choice as a segmented **Solve for** strip on the answer card, not as an
  input. The field for the chosen quantity is hidden (`showWhen`); the one it replaces appears
  (Bond Price's *Price* while solving for the yield, coupon or term).
- The lead tile is the unknown; the tiles beside it change with it.
- R9 counts inputs without the `solveFor` choice (`tools.test.ts`): still at most six on the card.
- Hand-offs build from the solved values (`output.values`), not the inputs.

**Bond Price** (`finance.bond_price`, 1.1.0) solves for: the price (default, as before), the yield
(bisection, Bond Yield's method), the coupon rate (closed form: `r = m(P − C vᴺ)/(F a⌉N)`) and the
term (closed form for N; a term that isn't a whole number of coupons is warned about). Bond Yield
stays a tool (public API, R8) and still hands to Bond Price.

Next to convert: Annuity (payment, n, i, PV), Present Value, Loan Schedule, Interest Converter
(any rate from any rate already).

## 4. Chains

`lib/toolChains.ts` holds the chains a piece of work runs through, as steps, a step holding the
tools that are alternatives (`CHAINS`, `chainPlace`). A tool in a chain draws the **chain strip**
above its answer card (`ChainStrip` in `components/tools/LedgerParts.tsx`): up to two steps back,
then the tool, then "or" its alternatives, each a link. Only the reserving chain is written so far
(Ratio Triangle › Age-to-Age Factors › Development to Ultimate › Chain Ladder / Expected Claims /
Bornhuetter-Ferguson / Benktander / Cape Cod). The strip navigates; hand-offs are still `spec.next`
(the missing ones are in the review, §3.7).

## 5. The catalogue

- **Area chips** under the title, always on screen (they set `?area=`), replacing "All tools".
- **Pick up where you left off**: the three tools used last on this device, each with the answer its
  page last showed (`lib/toolRecent.ts`, localStorage, R7), tinted in its exam.
- Each tool row leads with its **exam's dot** (`examForConcepts`), not a miniature, and carries no
  tick: "Tested against" stays on the tool's own page and menu.
- The Assumptions Bank is a card of its own under the Data Sources.

## 6. Insurer Return

- The source line, then Insurer / Quarter / Line, then the answer card with the line's history.
- **Capital against the minimum** (from direction B), a card under the answer card
  (`CapitalCard`): "28,303.00 capital available (line 10) over 7,460.33 minimum required (line
  130), $000", the two as bars on one scale, and how much of the one the other is. A branch reads
  net assets available (line 25). The run carries the figures: `values.capital_available`,
  `capital_line`, `minimum_required`.
- The return's table, *This return, as filed*, prints amounts with separators (`money`), folds
  round the line asked for and marks it.

## 7. What was built (2026-11-09)

All of §2–§6, on every tool's page for §2 (the rules are the template's) and on Bond Price,
Bornhuetter-Ferguson, Insurer Return and the catalogue for §3–§6.

- Engine: `bondPrice.ts` (solve), `types.ts` (`solveFor`, `ResultTable.highlight`),
  `insurerReturn.ts` (capital values, money column, highlight, `resultLabel`), `toolFigures.ts`
  (the price–yield curve from solved values). `npm run tools:bundle` run.
- Template: `ToolTemplate.tsx`, `ToolGrid.tsx`, `ToolFigure.tsx`, `ToolNeighbours.tsx`,
  `ValueSheet.tsx` (`Symbol`), `ToolCard.tsx` (`Sym`), new `LedgerParts.tsx`; `lib/toolTemplate.ts`
  (`inputGroups`, `ownChip`, `formulaLine`), new `lib/toolChains.ts`, `lib/toolRecent.ts`;
  `pages/Tools.tsx` (catalogue).
- Tests: `toolTemplate.test.ts`, `toolChains.test.ts`, `toolRecent.test.ts`, `tools.test.ts` (R9
  without `solveFor`), and `e2e/tools.spec.ts`: Bond Price solved for its yield, BF's chain,
  choice-first and column count, Insurer Return asking first with the capital card and the folded,
  marked table, and the catalogue's recent tools and area chips.

## 8. Not yet

- Solve-for on the other finance tools (§3).
- Chains for ratemaking and finance (§4), and the missing `next`s the review lists.
- The rest of the review's round 0: MCT Ratio's 149.999%, the bank's expense kinds, per-quantity
  decimals, Age-to-Age's lost picks, the Data Sources' highlighted rows (Life Table's age, Price
  Index's period).
