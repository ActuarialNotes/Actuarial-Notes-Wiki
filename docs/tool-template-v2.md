# Tool template v2: navigation and connection

Build spec for the second pass on the Actuarial Tools page template (`docs/actuarial-tools.md`
§19). It was worked out on 2026-11-09 over three rounds of phone mock-ups, from a review of the
first template on a phone. The final design is drawn in
[`docs/tool-template-v2-mockups.html`](tool-template-v2-mockups.html) (open it in a browser),
also published at <https://claude.ai/artifact/7zwMX2YgNhNtnhMiajnVbq>. Where this text and the
mock-ups disagree, this text wins; the mock-ups' sample runs marked as illustrative are not
outputs of the engine.

Status: **proposed, not built.** Roadmap row: A2 (Tools), §3.4 *Proposed*.

## 1. The problems it fixes

Found on the Permissible Loss Ratio page, its edit sheet and the Assumptions Bank shelf.

1. **Fixed and variable expense look the same.** `lib/toolFigures.ts` draws both segments of
   the Permissible Loss Ratio split with role `base`, so both are the same 35% grey, and the
   labels inside the bar are truncated ("Fixed expe…", "Variable …"). Expense Ratios has the
   reverse problem: it colours *Fixed expense* as `result`, so the same quantity is a different
   colour on the next tool.
2. **Published figures are out of context.** The edit sheet's *Published figures* row reads
   "Automobile Insurance Rate Board, 2026 Annual Review · Profit provision (pre-tax, maximum) ·
   Profit (p. 7) · 6.0%". Nothing says it is Alberta private passenger auto, that 6% is a
   **cap**, or what it is a share of. On the shelf, "5 of 7 figures read" is our word, and the
   *Trend* filter leads with a row that has no figure while unrelated rows sit dimmed under it.
3. **Hard to navigate.** Catalogue → tool → edit sheet → bank → *Use in…* → tool, with a bare
   back arrow and nothing saying where the reader is. A tool's neighbours (`spec.next`) are only
   in the ⋯ menu as "Send to …", and a tool never says what feeds it.
4. **The exam logo** in the answer card repeats what its tint already says. Remove it; keep the
   colour.

## 2. The design in one paragraph

The answer card shows the formula as a bar whose segments carry their own symbol and value, with
each quantity in its own swatch, the same swatch on every tool. A breadcrumb replaces the bare
back arrow. A **Takes from** line above the answer card and a **Gives to** line below the inputs
name the tools before and after this one. Every input says where its value came from with one
**from** chip (Default, Yours, a document, or a tool), and tapping a published figure or a link
opens its explanation **in place**, in two levels: a one-line summary, then the details with
*Use* and *Read* (or *Open* and *Unlink*). The edit sheet keeps the value-setting job: the
slider, every way a value can come in, and the keypad.

## 3. Rules

These came out of the stress test on two unconverted tools (Trend Factor and Expense Ratios,
mock-ups Round 3). They are the acceptance criteria.

### 3.1 Answer card
- **No exam logo** (`ExamLogo` out of `ToolTemplate.tsx`). The card keeps `examAccentStyle`; the
  eyebrow stays "Area · Reading" and the name stays the method link.
- **Split figures label their segments inside the bar** with symbol and value ("F 23"), never a
  truncated word. A segment too narrow for its label drops the value, then the label, and its
  name moves to the input row's swatch.
- **Colour belongs to the quantity, not to the tool.** Add a quantity key to each `split` part
  (`fixed-expense`, `variable-expense`, `profit`, `loss`, …) and give each a fixed step of the
  exam-hue ramp, with one hatched step so two neighbours never match:
  `--exam-accent` light step for the result, then three darker steps, the third hatched. The
  result keeps the lightest step. Fixed expense is the same swatch on Expense Ratios as on
  Permissible Loss Ratio.
- Each input row whose quantity is in the bar shows the same swatch before its symbol.
- The formula is printed once under the big figure in mono (`PLR = 1 − F − V − Q`), from the
  spec's `notation`.
- A published figure that matches the **answer** (not an input) sits under the bar as a
  comparison line: "Alberta auto, AIRB selection 27.8% ⌄" (§3.5).

### 3.2 Navigation
- **Breadcrumb**: `Tools › <Area> › <Tool>` replaces the title strip's back arrow on tool pages
  and on the Assumptions Bank (`Tools › Assumptions Bank`). Arriving through *Gives to* appends
  the next tool (`… › Permissible Loss Ratio › Loss Ratio Method`). Back is still `useBack`, so
  the browser's Back returns to the same scroll position; the breadcrumb's earlier steps are links
  up the stack, and it trims to the last two steps with "…" on a phone. The pinned answer pill in
  the title strip stays.
- The order of inputs follows the formula, judgments marked ◆ but no longer moved to a group of
  their own when there are three or fewer inputs. With more than three, judgments still lead.

### 3.3 Takes from / Gives to
- Both are read off `spec.next`: *Gives to* is this tool's `next`; *Takes from* is every tool
  whose `next` names this one (a reverse index built once from the registry).
- **Hide the line when the list is empty** (Expense Ratios has no *Takes from*).
- **One tool**: name it, with "open ›" (Gives to) or "‹ open" (Takes from).
- **Several tools**: name the first and "+ N more", and the line opens a list.
  - *Takes from* lists each tool; tapping one opens it.
  - *Gives to* lists each tool **with the values it would carry**, read from that `next.build`
    over the current result: "F 11.0% → Fixed expense", with the quantity's swatch. Opening one
    carries its values; the others are untouched.
- After a link has been made, *Takes from* names only the linked tool.
- Following *Gives to* must mark the carried fields **Linked** on arrival: the run URL carries the
  sending tool, and the arriving tool records an `Origin` for each carried field
  (`originOf(sender.name, value)`). Today `navigate(runPath(…))` carries values only, so the
  arriving fields read *Yours*. This is the one behaviour change in `useToolCard`.
- The "Send to …" items stay in the ⋯ menu for now.

### 3.4 The from chip
- One chip shape for every origin, replacing the dot tags of `SourceTag.tsx`: `● Default`,
  `● Yours`, `▤ <publisher short name>, <place>` with *Not fact checked* in amber beside it until
  checked, `↳ <tool name>`. `ValueSource` already holds all four kinds.
- **Always on a judgment** and on any input not at its default.
- Rows still at their default share one line, "All ● Default", under their group, so a six-input
  tool doesn't repeat it six times. A changed row gets its own chip and leaves that line.
- A table column carries the chip under its header (as `columnSource` does now). A judgment column
  is marked ◆ in its header.
- **Tapping a published or linked chip opens its explanation in place** (§3.5, §3.6). Tapping
  Default or Yours opens the edit sheet.

### 3.5 A published figure in place (two levels)
- **Level 1**, closed: the value and one line of context: "6.0% · Alberta auto · pre-tax cap".
- **Level 2**, open, under the row (not a sheet):
  - one sentence saying what the figure is, from the bank (§4);
  - `What it is / Where / Basis / In force / Source` as a short definition list, the source a link
    that opens the document in the app's PDF reader at its locator;
  - *Not fact checked yet* in amber while unverified;
  - a comparison with the reader's value when they differ meaningfully ("Your 20% is above this
    cap");
  - buttons: **Use 6.0%** and **Read p. 7**. A figure matched to an output has **no Use button**
    and says why ("It isn't split into fixed and variable, so it can't fill this table").
- An input with published figures it isn't using shows "N published figure(s) ›" on its chip line;
  a figure with no value yet never counts toward N.

### 3.6 A linked input in place
- Same two-level shape: "Set by **Trend Fit**: its fitted annual trend, 3.42%." / "Changes there
  carry here while this link stands." / **Open Trend Fit**, **Unlink**. Unlink keeps the value
  and makes it *Yours* (drop the `Origin`).

### 3.7 The edit sheet (`ValueSheet.tsx`)
In this order:
1. the slider and the value;
2. **Take from a tool**: every tool in *Takes from* that fills this field, each with its result
   from this session ("Fitted annual trend · your last run 3.42%") or "Not run this session ›",
   which opens it;
3. **Published**: each bank figure for the field with its level-1 line; tapping expands level 2
   inside the sheet. A figure the document holds but the bank hasn't transcribed yet is listed,
   says "The figures are in the document but haven't been entered here yet", links to its page,
   and can't be selected;
4. **Your own**: type a value (the app's keypad), back to the default.

A field with none of 2–3 keeps just the slider and keypad, as now.

### 3.8 The Assumptions Bank shelf
- No exam logo on the banners or in *Use in…*; the banner keeps its tint.
- "5 of 7 figures read" becomes "**2 figures still to enter**" (and nothing when none are).
- A kind filter shows only that kind's rows; the rest of the document folds into one line,
  "4 other figures in this document ›". A blank row is never first.
- Each figure row names the tools that take it ("to **Permissible Loss Ratio**"), the mirror of
  the tool's *from* chip, replacing the "↳ 3" count.

## 4. Data the bank needs

The explanations need facts the bank does not hold per row today. Each is **transcribed from the
document** like the values (`assumption_lint.py --against` checks figures, and a reviewer checks
these words against the locator):

| Where | Field | Example | Notes |
|---|---|---|---|
| Set frontmatter | `Line` | `"Private passenger auto"` | `Jurisdiction` (`CA-AB`) already exists; the short place name ("Alberta") is derived from it. |
| Set frontmatter | `Short name` | `"AIRB"` | For the chip; else the publisher. |
| Row | `Basis` | `cap`, `selected`, `benchmark`, `observed` | A new table column, or a `Basis:` per row in a notes block (decision D-TT1). |
| Row | `Meaning` | "The highest profit provision the AIRB allows in a filed rate, pre-tax, as a share of premium." | One sentence, the document's words where it has them. |
| Row | `Fits` | `output: ratemaking.expense_ratios#total` | Only for a figure that matches a tool's answer rather than an input (§3.1). |

Changing the table shape touches `lib/assumptionBank.ts` (parser, `AssumptionRow`),
`scripts/assumption_lint.py` and `assumption_vocab.json`, `docs/assumptions-bank.md`, the three
sets under `Assumptions/` (VERIFY will mark them stale: re-sync with `verify_check.py --sync`),
and the connector export if it carries rows (bump `KNOWLEDGE_BASE_VERSION` /
`SUPPORTED_KB_VERSION` together). After any change under `lib/tools/`, run `npm run tools:bundle`.

## 5. Build order

1. **Colour and logo.** Quantity keys on `split` parts in `lib/toolFigures.ts`, the hue ramp and
   hatch, in-bar labels in `ToolFigure.tsx`, swatches on input rows; remove `ExamLogo` from
   `ToolTemplate.tsx` and `AssumptionsShelf.tsx`. Tests: `toolFigures.test.ts` pins that no two
   parts of one split share a step and that a quantity keeps its step across tools.
2. **Navigation.** Breadcrumb in the title strip (`ToolsSearchBar`), formula-order inputs,
   reverse `next` index (a pure function beside `lib/toolTemplate.ts`, tested), *Takes from* /
   *Gives to* rows with the fan-out list, and Linked-on-arrival (§3.3). Extend
   `e2e/tools.spec.ts` with Expense Ratios → Permissible Loss Ratio arriving Linked.
3. **The from chip** and the shared "All ● Default" line (`SourceTag.tsx`, `ToolTemplate.tsx`).
4. **In-place disclosure** for linked and published inputs; the edit sheet reorder (§3.7).
5. **Bank data** (§4): parser, lint, the three sets, then level-2 explanations and the output
   comparison.
6. **The shelf** (§3.8).
7. **Convert two more tools to the template** as the stress test: `ratemaking.trend_factor` and
   `ratemaking.expense_ratios` (add both to `TEMPLATE_TOOLS`). Every case in the Round 3 mock-ups
   must render as drawn.
8. Update `docs/actuarial-tools.md` §19 to describe what was built, and its roadmap line.

Steps 1–4 need no bank change and can ship first; the level-2 explanation falls back to the
set's lead paragraph and the row's locator until step 5 lands.

Every reader-facing string follows `docs/writing-style.md` and the `app-copy` skill. The strings
in this doc and the mock-ups are drafts for that pass.

## 6. Decisions for the maintainer

- **D-TT1**: per-row basis and meaning as new table columns (wider tables, one place) or a notes
  block under the table (keeps the five-column table). *Default if unasked:* new columns `Basis`
  and `Meaning`, after `Locator`.
- **D-TT2**: whether *Gives to* replaces the ⋯ menu's "Send to …" items. *Default:* keep both
  until the template covers every tool.
- **D-TT3**: tools with more than one chain in front of them (Trend Factor is fed by three). The
  chain rail (a strip showing the whole chain, Variation 2 in the mock-ups' history) was set aside
  for later as the catalogue's design. *Default:* not in this build.

## 7. Worked cases (from the mock-ups)

| Case | Tool | Expected |
|---|---|---|
| One before, one after | Permissible Loss Ratio | *Takes from Expense Ratios*, *Gives to Loss Ratio Method* |
| Nothing before | Expense Ratios | No *Takes from* line |
| Several after | Expense Ratios | "Gives to 2 tools ⌄", each with F → Fixed expense, V → Variable expense |
| Several before | Trend Factor | "Takes from Trend Fit + 2 more"; the trend's sheet lists Trend Fit, Combined Trend, Price Index |
| Six inputs | Trend Factor | Judgment keeps slider and chip; four numeric rows share "All ● Default"; the choice stays a segmented control |
| Published, usable | Permissible Loss Ratio, Q | "6.0% · Alberta auto · pre-tax cap", Use and Read, cap warning when above |
| Published, no value yet | Trend Factor, t | AIRB loss cost trends listed, unselectable, "Read p. 5" |
| Published, matches the answer | Expense Ratios | "Alberta auto, AIRB selection 27.8%" under the bar, no Use |
| Linked | Trend Factor after Trend Fit | "↳ Trend Fit" chip, outlined value, Open and Unlink |
| Table input | Expense Ratios | Numbered columns, ◆ on % fixed, chip under the grid, formulas in exhibit numbers |

Runs the mock-ups draw: Expense Ratios at its defaults, F 11.0%, V 17.1%, total 28.1%;
Permissible Loss Ratio with F and V linked from that run and Q 20% (the reader's), 51.9%,
VPLR 62.9% (its own defaults, F 0%, V 25%, Q 5%, give 70%); Trend Factor at its defaults,
1.0767 over 2.50 years (3%, accident year 2023, effective Jan 1, 2025, 12 and 12 months), and
1.0877 with an illustrative 3.42% linked from Trend Fit.
