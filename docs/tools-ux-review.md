# Tools: UI/UX review (2026-11-09)

A full review of the Tools tab: the catalogue (`/tools`), every one of the 39 tool pages, the
Assumptions Bank shelf (`/tools/assumptions`), and the sheets, menus and hand-offs between them.
It was done after template v2 and its simplified variation A moved every tool to
`ToolTemplate.tsx` (`docs/tool-template-v2.md` §8.1). It is the starting point for the next
rounds of redesign. Nothing here has been changed yet.

**Method.** Every page was opened at its defaults on a 390 × 844 phone viewport (dark), screenshot
in full, and then driven by hand: rows opened, value pills and keypad sheets, the ⋯ menu,
*Gives to*, *Show working*, grid cells, choices, the Cumulative / Incremental switch, Trend Fit's
marks, published figures and their *Use* / *Read*, and a sample at 1366 px desktop. The
maintainer's four phone screenshots (Full Credibility Standard, Insurer Return, the catalogue, the
Assumptions Bank) were the brief. No page overflows horizontally and no page threw an error.

Severity: **H** misleads the reader or blocks the task, **M** costs time or trust, **L** polish.

---

## 1. What works

Keep these through any redesign.

- **One engine, one shape.** Every tool reads the same way top to bottom: answer card, inputs,
  hand-offs, working, export. Once a reader has used one tool, they can use the rest.
- **Live answers.** There is no Run button. A slider drag moves the answer and the figure
  together.
- **The answer stays on screen.** Once the card scrolls away, the pinned pill in the title strip
  (`P 1,077.95`) carries the answer.
- **Grids as exhibits.** Numbered columns and a formula line read like Friedland's and Werner &
  Modlin's exhibits. Wells for input cells and shaded bold cells for computed ones keep the two
  apart. Paste and Clear handle data as an actuary actually gets it.
- **Provenance.** Each input says where its value came from, published figures carry their
  locator and fact-check state, and *Read p. 7* opens the document at the page.
- **Gives to with values** (Bond Price → "i 5.062% → Annual effective rate") tells the reader
  what will move before they leave.
- **IRR's multiple roots**: a warning and both roots on the curve.
- **Age-to-Age Factors' selection exhibit**: tap an average and it becomes the selection, and
  the selection is carried on.
- **The keypad sheet**: the phone's keyboard never covers the value being typed.

---

## 2. Headline findings, ranked

| # | Finding | Sev | Where |
|---|---|---|---|
| 1 | **Wide grids hide columns, and a clipped cell can show a plausible wrong number.** Cape Cod's CDF reads "1.00 / 1.03 / 1.13", and Expense Ratios' premiums read "14,000,0". The formula line under the grid cites columns that are off screen, and nothing on screen says the grid scrolls sideways. | H | BF, Benktander, Cape Cod, Chain Ladder, Expense Ratios, Redington, Loan Schedule, every origin grid |
| 2 | **Long values overlap their label** on choice rows: "InsAccelerant Insurance…", "Li140 · Ratio…". In `InputRow` the label is `min-w-0 flex-1` without `truncate`, so it shrinks to nothing and paints under the value. | H | Insurer Return, any long choice |
| 3 | **Headline numbers lose or misstate their meaning.** Modified duration prints as "over 3.5 years" and Redington's duration gap as "over 0 years", because `ToolTemplate.tsx:302` treats every secondary `years` tile as a span. Redington leads with "−0.00". Partial Credibility and Expected Claims have no label at all. Raw symbols print as "x_q", "E[Y_L]", "t_pp", "P_A − P_L", "a]n" and "i¹²". | H | Duration & Convexity, Redington, Partial Cred., Expected Claims, Distribution, Expected Payment, Combined Trend, Annuity, Interest Converter |
| 4 | **MCT Ratio's own published example opens on a false warning.** The defaults (Exam 6C 2017 Q24, answer 150%) compute to "149.999%", so the page leads with "Below OSFI's supervisory target of 150%". | H | MCT Ratio |
| 5 | **Published figures are offered to fields they don't fit.** On Permissible Loss Ratio and Loss Ratio Method, "Fixed expense ratio · 3 published" offers the AIRB's 20.0% acquisition costs (commissions, a variable expense) and its 27.8% total expenses, and offers the same three to Variable expense. The three lines read identically ("Alberta, private passenger vehicles · selection"), so they can't be told apart without opening each. | H | PLR, LRM (bank kind `expense-ratio` is too broad) |
| 6 | **Controls come after long results.** Life Table, Price Index, Insurer Return, Bond Amortization, Loan Schedule and Earned Premium put the table (20–60 rows) before the inputs that choose what it shows. On Price Index the picker is 2,800 px down. | H | Data Sources, schedules |
| 7 | **The chain is mostly invisible.** Only 14 of 39 tools have a `next`. After Development to Ultimate there is no *Gives to*, and the reserving methods are linked only by a small ⌄ on a column header. Interest Converter doesn't hand to Annuity or Loan Schedule, though `questionChecks.ts` chains them. Bond Price ⇄ Bond Yield goes one way only. | H | Reserving, finance |
| 8 | **The card re-lays itself when the input count crosses three.** At ≤3 inputs every slider is open; at >3 they close to faint tracks and judgments move into a *Your judgments* group. Choosing *Severity* on Full Credibility Standard (the maintainer's screenshot), or *A direct fit* on Combined Trend, reshuffles the whole card, even moving the choice just tapped. Tools side by side look unrelated: Annuity has closed tracks, Present Value open ones. | M | All |
| 9 | **The from-chip layer is noise more often than signal.** "from ● Default" under each judgment, "All ● Default" / "The rest ● Default" lines (the latter ambiguous), "○ Default" alone under a grid, and on arrival from Bond Yield six "↳ Bond Yield" chips doubling the card. Provenance matters when a value is *not* the default; the default state needs no ink. | M | All |
| 10 | **Numbers aren't formatted per quantity.** Percent at 0–3 decimals on one card (149.999%, 52.656%, 4.8% beside 4.13%), counts to 2 decimals (1,082.22 claims), "Scale 1000" beside "Limit 2,000", CDFs 1.030 beside 1.6995, dates as "Jul 1, 2023", "2023-07-01" and "01/01/2025" on neighbouring tools. | M | All |
| 11 | **Hidden modes on sliders.** A zero or end stop means something else: Loan Schedule's Payment 0 = "Level" (drag right and it silently becomes a fixed payment of 10), Expected Payment's limit "None" at the far left, Trend Fit's Points fitted "All" at 0, Pure Premium's "Not given" at 0. Bühlmann's defaults sit at the slider maximum, so the slider can't go up. | M | Several |
| 12 | **The reader's work is fragile.** Age-to-Age selections are wiped by Back, by any cell edit (`useToolCard.ts:156`) and are not in the share link. A tool page doesn't recompute from its sender, so a linked value goes stale with no sign. | M | ATA, every hand-off |

---

## 3. Findings by surface

### 3.1 Catalogue (`/tools`)

- **[M]** The green tick is on 34 of 39 rows. It no longer tells tools apart, and the five
  without it (four Data Sources and Frequency × Severity Trend) look unfinished rather than
  different in kind.
- **[M]** One long list of four phone screens. Area pills appear only while searching, so there is
  no way to jump to Credibility without scrolling or typing.
- **[M]** The miniatures for the reserving tools are near-identical bar charts (Chain Ladder,
  Expected Claims, BF, Benktander, Cape Cod). Insurer Return falls back to an icon.
- **[L]** The Assumptions Bank sits under Data Sources as if it were a sixth tool, its subtitle cut
  ("…each with where to fin…").
- **[L]** No recent tools, no "continue where you left off", though every page keeps its draft.
- **[L]** The search panel's area pills wrap to three lines on a phone, with empty areas greyed out
  rather than dropped.
- Desktop: a single 640 px column in a 1,100 px pane. A grid of cards, or the list beside a
  preview, would use the width.

### 3.2 Page shell and navigation

- **[M]** The breadcrumb always opens with "…" on a phone, even when "Tools" would fit, and
  truncates the page's own name ("Redington Immuniza…", "Dev…" after a hand-off).
- **[M]** "Takes from X ‹ open" puts a back-pointing chevron before "open", so it reads as a Back
  button. With a breadcrumb step, a Takes-from row and a sender in the trail, one fact is said
  three times on arrival.
- **[L]** The search bar on a tool page opens a dropdown over a blurred card. Useful, but the
  card's own name is not in the bar, so the bar reads "Search tools" while on a tool.

### 3.3 The answer card

- **[H]** Missing or wrong labels (headline #3).
- **[M]** Secondary tiles drop their labels: "R̄ 0.4091" (pooled ratio at 12), "| 593.003" (the
  index level, its "I" read as a bar), "T 1.0000" (tail), "DC", "VPLR", "CA" never explained.
- **[M]** Duplicated content: Interest Converter prints δ and d in the card and again in the
  table under it; Ratio Triangle draws the ratios as a heatmap and again as a table; the Distribution
  moments table sits between the answer and the inputs.
- **[M]** Figures carry no axes or values (R11 keeps them bare). That is right for a miniature,
  but on the page a reader can't read a value off a curve, and split bars drop units ("PP 64.286"
  is a share of the rate, not the pure premium of 300; "F 11.028" has no %). Small segments become
  unlabelled squares.
- **[L]** The eyebrow ("Credibility · Werner, Ch. 12") is missing its reading on several tools
  (Bond Price, Duration).
- **[L]** The ⋯ menu truncates its own items ("Copy for Claude or Chat…", "Send to Loss Ratio
  Meth…") and repeats Download .xlsx, which is also a row on the page.

### 3.4 Inputs

- **[H]** The overlap bug on long choices (headline #2).
- **[M]** The ≤3 / >3 layout flip (headline #8).
- **[M]** Closed tracks look like disabled sliders. The faint track and dot are a hint that a
  slider exists, but in the maintainer's screenshot they read as a broken control with "from
  Yours" hanging under it.
- **[M]** The ◆ judgment mark is never explained on the page.
- **[M]** "Or take it from" chips look the same whether they take a value now or leave the page
  to open another tool (only a small "›" differs).
- **[M]** Native date inputs (`01/01/2025`, day/month ambiguous) beside formatted dates in the
  figure.
- **[L]** Two choices on one card can sit at opposite ends (Expected Payment: Loss distribution at
  the top, Deductible type at the bottom, and "Deductible" names both the amount and the type).
- **[L]** Symbol squares overflow on long symbols (EPV, VHM, i⁽ᵐ⁾).

### 3.5 The keypad sheet (`ValueSheet`)

- **[M]** Two radio rows with the same value, "Type a value 3%" and "Back to the default 3%",
  with the default selected. A radio pair reads as a choice the reader hasn't made.
- **[M]** A published figure with no value yet (AIRB loss cost trends, "—") leads the sheet above
  the keypad and takes the first screen.
- **[L]** The sheet's title is the field alone ("Annual trend"); nothing names the tool.

### 3.6 Grids and tables

- **[H]** Clipped columns and cells (headline #1). The sticky right column is sometimes an
  intermediate (Cape Cod pins *Used-up premium*, with Ultimate and IBNR behind it).
- **[H]** Trend Fit's *Mark* column is free text; the five words it accepts appear only in the
  error after a typo, and a marked row (excluded, shift) looks like any other in the grid and
  the figure.
- **[M]** Age-to-Age Factors has three competing selections: the result table's *Average* row,
  the exhibit's *Selected* row, and the *Average ◆* input. The heading still says "Cumulative
  triangle" after switching to Incremental.
- **[M]** Silent rules: blank Spot rate cells mean "use the flat rate" (Present Value), a blank
  Own ELR means "use the card's ELR" (Expected Claims), and nothing on screen says so. A spot rate
  typed "5" fails "must be a decimal", while the keypad takes 5%.
- **[M]** Chain Ladder's CDFs from Development to Ultimate are "matched by position" and the grid
  never shows which age each origin took.
- **[L]** Schedules without a total row (Bond Amortization), double negatives ("Discount
  accumulated −4.56"), the always-empty last row of an age-to-age table.

### 3.7 Connections

- **[H]** Missing hand-offs (headline #7). Proposed `next`s: Development to Ultimate → Chain Ladder,
  BF, Benktander, Cape Cod; Expected Claims → BF; Interest Converter → Annuity, Loan Schedule;
  Annuity → IRR; Bond Price → Bond Yield; Life Table → the annuity tools.
- **[M]** A tool page doesn't recompute from its sender, so a linked value is a snapshot. The
  link's own words say so, but the chip still reads "↳ Bond Yield" after the sender changes.
- **[M]** After a hand-off, a table column's chip says "● Yours" rather than naming the sender
  (Development to Ultimate's Factor column from Age-to-Age Factors).
- **[M]** Column ⌄ → "From…" sheets draw the old `ToolCard` (▶ Show working, pill choices), not
  the template, so a second visual language appears mid-task.

### 3.8 Data Sources

- **[H]** Controls after the results (headline #6), and the Insurer Return overlap bug.
- **[M]** Edition and licence appear only in the ⋯ menu, and Life Table's menu lists both
  datasets' licences whichever is selected. The page itself says "United States, 2024 (NCHS)" at
  most. A data source should lead with its source.
- **[M]** Insurer Return: raw figures with no thousands separator ("28303", "20842.67") under a
  "$000" column; the selected line isn't highlighted in the table; the answer's label is OSFI's
  whole line text.
- **[M]** MCT Ratio can't load a filing from its own page. The keypad for Capital available offers
  only "Type a value / Back to the default", though the menu says it is tested against 1,909
  filings. The only way in is Insurer Return → Gives to. Amounts carry no "$000" unit.

### 3.9 Assumptions Bank (`/tools/assumptions`)

- **[H]** The figure-to-field match is too loose (headline #5). The shelf repeats it: every AIRB
  expense row says "to Permissible Loss Ratio + 2 more".
- **[M]** GISA's ULAE factors and the AIRB's ULAE (1.094) go to no tool: a published figure with
  nowhere to use it.
- **[M]** The fact-check badge draws a tick beside "Not fact checked", which reads as checked.
- **[M]** The kind chips run off the right edge ("Profit provisio") with no fade or scroll hint.
- **[M]** The locator repeats in full on every row ("Notes to Users, Other Factors, 1.
  Unallocated Loss Adjustment Expense Factors (p. 12)" five times). Group rows by locator.
- **[L]** ULAE 1.094 has no unit while percentages do; a `fact` row ("Capital test: Minimum
  Capital Test") sits among the figures; OSFI's banner is tinted and the others are neutral, which
  reads as a status rather than an exam.

### 3.10 Accessibility and copy

- **[M]** Text below 12 px (chips at 11 px, `text-[11px]`) and grey-on-black secondary lines.
- **[M]** Touch targets under 44 px: chips (≈20 px tall), the ⌄ "3 published" toggle, the closed
  track rows' value pills (32 px).
- **[L]** "No one of them is the yield" (IRR), "Opening one carries its values. The other is left
  as it is." (Gives to), "Your 5% is below this figure" comparing unlike quantities. Pass these
  through the `app-copy` skill.

---

## 4. Per-tool notes

What isn't covered above. Tools with nothing beyond the cross-cutting findings are left out.

| Tool | Notes |
|---|---|
| Ratio Triangle | Grids titled Numerator / Denominator but the heading says "A / B". Fits a phone at three ages. |
| Age-to-Age Factors | §3.6. Gives to still says "open" after a pick; the code's "Send selections to…" never shows. |
| Development to Ultimate | Default factors (1.500 / 1.100 / 1.030) aren't Age-to-Age's own output (1.5152 / 1.0938 / 1.0303), so the example changes between pages. "% developed" mixes 58.548% and 100%. |
| Expected Claims | No label on the headline. |
| Benktander | "Iterations ◆ 2" never says k = 1 is BF and large k approaches the chain ladder. |
| Cape Cod | Pinned column is Used-up premium; headline 68.335%. |
| Earned Premium | At the defaults the headline shows a year with no writing, beside "WP 0.00 UEP 0.00", which look broken. Inputs three screens down. |
| On-Level Factors | Six near-identical grey legend swatches; two "OLF" tiles, one without its year; headers break as "2021-07-\n01". |
| Trend Fit | §3.6 marks. On an error the Fitted column disappears and the answer dims, with the message below the fold. Fit (exponential/linear) is under Inputs while Seasons is a judgment. |
| Frequency × Severity Trend | With "A direct fit", one symbol names two values (headline t_pp 5% and tile t_pp 5%); figure labels stack on one dot. |
| Trend Factor | Three "Or take it from" chips, all leaving the page when none has run. |
| Two-Step Loss Trend | ISO dates on the axis; the figure doesn't show which stretch is TF₁ and which TF₂. |
| Expense Ratios | Comparison line "27.8% … · selection" doesn't say it is total expenses until opened; answer at 3 decimals against a 1-decimal published figure. |
| Permissible Loss Ratio | At the defaults PLR = VPLR = 70%, two equal numbers; F = 0 shows a swatch with no segment. |
| Loss Ratio Method | Unlabelled F square on the bar; −6.667%. |
| Pure Premium Method | Bar shares without %, read as amounts. |
| Distribution | Moments table before the inputs. |
| Expected Payment | "No limit" as a slider stop; Deductible names two rows. |
| Full Credibility Standard | Claims to 2 decimals; Partial Credibility shows the same standard as 1,082. |
| Partial Credibility | No headline label. |
| Bühlmann Credibility | Defaults at slider max; "P Credibility estimate" with P undefined; 53.3333. |
| Interest Converter | No per-period rate (i⁽ᵐ⁾/m), which is what Annuity and Loan Schedule take; δ, d twice. |
| Annuity | Forward only: can't solve for payment, n or i; no perpetuity, deferred, increasing or m-thly forms. |
| Present Value | Grid has no heading; the only "Inputs" heading sits over one slider. |
| Loan Schedule | Hidden payment mode; Balance column clipped (the number that proves the loan is repaid); ΣP is total paid while P is the payment. |
| Bond Price / Bond Yield | One-way hand-off. Yield leads with the nominal yield; many FM questions want the effective one. "Or take it from Bond Yield" offered on Years to maturity. |
| Bond Amortization | 20 rows before the inputs, no total, leads with the price (Bond Price's answer) rather than the book value at coupon k. |
| Duration & Convexity | D_mod as "over 3.5 years" (bug). Weight column mixes 5.519% and 84.22%. |
| Redington Immunization | −0.00; "over 0 years"; raw notation; the page never says yes or no to its own question. |
| Life Table | Picker after 26 rows; e40 as "41". |
| Price Index | Picker after 60 rows; "| 593.003"; x-axis stops at 2025 while data run to 2026-08. |
| Yield Curve | "2026-10-09" on the card, "10/09/2026" in the input; 4.8% beside 4.13%. |
| Insurer Return | §3.8. |
| MCT Ratio | 149.999% false warning; BAAT keeps the label "Capital available"; no filing loader. |

---

## 5. Current limitations (functional, not visual)

These shape what a redesign can promise.

1. **Tool pages are snapshots, not a chain.** Only Workflows recompute downstream. A hand-off
   copies values once.
2. **Most tools solve one way.** Annuity, Bond Price, the trends: forward only. FM questions often
   need the inverse.
3. **25 of 39 tools hand off nowhere.**
4. **Drafts persist per tool on one device** (localStorage). There is no history of runs, no saved
   scenarios, and no comparison of two runs side by side.
5. **The bank's kinds are coarse.** A field asks for `expense-ratio` and gets every expense figure,
   whatever it measures.
6. **The figure cannot be read.** R11 keeps it bare, so values must be read off the tiles or the
   working.
7. **Desktop is the phone layout, centred.**

---

## 6. Directions for the redesign rounds

Options to try in mock-ups, roughly in the order they pay off. Each round should end with the
phone screenshots of the tools it touches, as this review did.

**Round 0: fixes that need no design** (can ship before any mock-up): the choice-row overlap;
the `years`-tile bug; −0.00; MCT's 149.999% (round the comparison, or fix the example's input
precision); Age-to-Age's heading after the switch and its lost picks; subscripts for `_` symbols
and ⌉ / ⁽ᵐ⁾ glyphs; the missing headline labels; thousands separators on Insurer Return; per-unit
decimals (one formatter per quantity: percent 2 dp, factors 4 dp, counts 0 dp, money 2 dp); the
missing `next`s in §3.7; the bank's expense kinds split into fixed / variable / total.

**Round 1: one stable card.**
- Same layout at every input count. Option A: every number row one line (label · value), and the
  slider opens on tap for all tools. Option B: sliders always open, judgments always first. Either
  removes the flip.
- Provenance by exception: no chip for a default; a chip only for Yours, Published, Linked or
  Filed. Drop "All / The rest ● Default".
- Choices that change which inputs exist sit at the top of the inputs, always.
- Hidden modes become explicit: a "No limit" / "Level" / "All" toggle beside the slider.

**Round 2: grids on a phone.**
- Option A: pin the answer column (Ultimate, IBNR) and the origin, and show a scroll shadow plus
  "2 more columns ›".
- Option B: below 480 px, an origin grid becomes one card per origin, inputs in the card and the
  answer on its right.
- Option C: a column picker (show 3 of 6), with the formula line naming only shown columns.
- Never clip a number: a cell too narrow for its value widens or ellipsises visibly.
- Trend Fit's marks as a per-row menu, drawn on the row and the figure.

**Round 3: controls before results.**
- Data Sources lead with a source row (dataset, edition, licence, date read) and the pickers,
  then the answer, then the table folded to ~10 rows with "Show all 60".
- Schedules (Loan, Bond Amortization) fold under the inputs, with a "row k" input that leads the
  card where the exam asks for one row.
- MCT Ratio gets "Load a filed insurer" (insurer + quarter) at the top of its inputs.

**Round 4: the chain.**
- The chain rail D-TT3 set aside: a strip under the breadcrumb showing the tool's place in its
  chain (ATA → DtU → CL / BF / Benktander / Cape Cod), each step tappable.
- A linked value recomputes from its sender's saved draft on arrival, or says "Bond Yield has
  changed since; update?".
- Catalogue grouped by chain within each area rather than a flat list.

**Round 5: the catalogue and the bank.**
- Area tabs (or a sticky area strip) on the catalogue; recent tools on top; the tick replaced by
  a fine line ("Tested against Friedland Ex. 9") on the tool page only.
- The Assumptions Bank grouped by locator, its rows naming their basis (cap, selection) up front,
  a "used by" line only where a tool takes the figure, and a fading chip strip.
- Desktop: answer and inputs side by side, the grid full width under them.

---

## 7. Questions for the maintainer

1. **Round 1, slider default**: closed rows everywhere (compact, one tap to slide) or open sliders
   everywhere (direct, longer pages)?
2. **Provenance by exception**: is it acceptable to show nothing for a default, given R3 ("tools
   compute, people judge") asks that a default judgment be visible? A proposal: keep ◆ on the
   judgment and show "Default" only on judgments, nowhere else.
3. **Inverse solving**: should tools like Annuity and Bond Price solve for any one unknown (one
   tool, a "Solve for" choice), or is each direction its own tool under R9?
4. **The figure**: may a tool page's figure carry axes and a tap-to-read value (relaxing R11 on the
   page while the miniature stays bare)?
