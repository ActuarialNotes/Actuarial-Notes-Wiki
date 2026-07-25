---
name: actuarial-concept-definitions
description: Write or improve a concept-definition page in Concepts/*.md — a concise precise definition, a LaTeX formula block, and 1–3 worked examples. Use when the user asks to create, write, draft, fill in, or clean up a Concepts/ page (SOA Exam P / FM probability and financial mathematics, or CAS Exam 5+ ratemaking and reserving), to standardize the definition/formula/example structure of existing pages, to write a Resources/Books source-material page, or to review/validate an exam syllabus for missing terms and broken wiki-links.
---

# Actuarial Concept Definition Writer

Writes the markdown concept pages under `Concepts/` that are the "database" the
quiz app is built on. A concept page is a short, self-contained reference: what
the thing **is**, the **formula** that defines it, and a few **worked examples**.
Pages are rendered in the wiki (`quiz/src/components/wiki/`), feed the search
index, and are linked from exam syllabi and question `wiki_link` arrays.

This skill covers **Exam P (Probability)**, **Exam FM (Financial Mathematics)**,
and the **CAS upper exams** (Exam 5 ratemaking/reserving and beyond). The page
structure is the same for all of them; only notation and topic vocabulary differ.

It also covers the two adjacent page types that share the vault's link graph:
**`Resources/Books/` source-material pages** (see "Source-material pages"), and
**auditing an exam syllabus** for unlinked terms and dead links (see "Reviewing a
syllabus page").

## The filename *is* the API — read this first

A page's filename is its link target, and the build is unforgiving about it.
These failures are invisible in the markdown and in Obsidian, but silently break
the built app:

- **The `.md` extension is mandatory.** Every collector in `quiz/vite.config.ts`
  filters on `.endsWith('.md')`. A file saved without it is dropped from the
  bundle entirely — the page vanishes from the wiki and search, and every
  `[[link]]` to it dead-ends. This has really happened to core pages
  (`Concepts/Ratemaking`, `Concepts/Loss Reserving`) and is undetectable by
  reading the file.
- **Filenames use spaces, never underscores or hyphens-for-spaces.**
  `Retrospective_Rating.md` does not answer `[[Retrospective Rating]]`. Keep
  genuine hyphens that belong to the term (`Bornhuetter-Ferguson Method`,
  `On-Leveling`, `Self-Insured Retention`) — but then every inbound link must
  spell them the same way. Hyphen/space drift is the single most common broken
  link in this vault.
- **`conceptMatch.ts` resolves display aliases, not filename variants.**
  `[[Bond Price|Price]]` works because the *target* is exact. `[[Bond-Price]]`
  does not. Never rely on fuzzy matching.

Always finish with the validator (see "Workflow" step 6); it catches all three.

## The required shape of every page

The user's non-negotiable core: **concise precise definition → LaTeX formula
block → 1–3 examples.** Use this canonical layout (it standardizes the ordering
that is currently inconsistent across the vault — many pages scatter property
bullets *above* the formula; always put them *after*):

```markdown
**Term** ($symbol$) is <one or two sentences: precise definition with [[wiki-links]]>.

> $$ <the defining formula> $$

- <supporting bullet: define remaining symbols, key property, or relationship>
- <supporting bullet>

![[Media/Optional_image.svg|500]]   ← only if a matching file already exists

> [!example]- <Descriptive, actuarial title> {Example}
> <Problem statement.>
>
> > [!answer]-
> > <Worked solution. Multi-step → align*.>
```

Concept pages have **no YAML frontmatter** — they start directly with the bold
term. (A handful of older non-P/FM pages have frontmatter; do not copy that.)

### 1. The definition (first line)

- Open with the bolded term, optionally its symbol/notation, then the
  definition: `**Variance** $\sigma^2$ measures the spread ...` or
  `The **Poisson Distribution** $X \sim \text{Poi}(\lambda)$ models ...`.
- One or two sentences. Precise, not chatty. State what it *is* and what it's
  *for*, not its history.
- Link related concepts inline with Obsidian `[[wiki-links]]`
  (`[[Random Variable]]`, `[[Present Value]]`). Link the first meaningful
  mention of another concept; don't over-link common words.
- Introduce the main symbol here so the formula that follows is readable.

### 2. The formula block

- Wrap the defining formula in a blockquote: `> $$ ... $$`. This is the
  universal convention in the vault — keep it.
- **Put the formula immediately after the definition, before any property
  bullets.** This is the single most common inconsistency to fix on existing
  pages.
- **Keep each block mobile-readable — narrow, not wide.** Pages are read on
  phones; a block that is too wide gets cut off or shrunk to illegibility. This
  is the governing constraint and it overrides "consolidate everything."
- **One *expression* per block; never place two formulas side by side.** Do not
  join distinct equations on one line with `\qquad`, `,\quad`, or similar
  horizontal spacing (e.g. `$$\mathcal{P}(S)=\{A:A\subseteq S\}, \qquad |\mathcal{P}(S)|=2^{|S|}$$`).
  Split them into separate stacked `> $$` blocks instead:

  ```markdown
  > $$\mathcal{P}(S) = \{\, A : A \subseteq S \,\}$$
  >
  > $$|\mathcal{P}(S)| = 2^{|S|}$$
  ```

- **A single formula stays in one block.** Use `cases`, `aligned`, or `align*`
  *inside one block* for a piecewise definition or a derivation that is one
  logical statement — these stack *vertically*, so they stay narrow:

  ```markdown
  > $$E[X] = \begin{cases} \displaystyle\sum_{k} k\, f(k) & \text{(discrete)} \\[6pt] \displaystyle\int_{-\infty}^{\infty} x\, f(x)\, dx & \text{(continuous)} \end{cases}$$
  ```

  The rule of thumb: **stack vertically (more blocks or more `\\` lines), never
  spread horizontally.** If a single line is still too long to fit a phone,
  break it across `\\` lines (e.g. at an `=` or a `+`).
- Use separate `> $$` blocks for genuinely distinct formulas (e.g. PMF in one
  block, then `E[X]` and `Var(X)` each in their own block rather than on one
  wide line).
- Define every symbol that appears. Prefer defining symbols in a bullet right
  after the block (`- where $\lambda > 0$ is the average event rate`) over
  cramming `\text{where ...}` lines inside the math.
- Distributions: give the PMF/PDF, and include mean and variance (in a second
  block or a bullet) — candidates expect them on the page.

### 3. Supporting bullets (after the formula)

2–4 bullets covering: remaining symbol definitions, the key property/identity
(linearity, memorylessness, premium/discount condition…), and relationships to
other concepts via `[[wiki-links]]`. Keep them tight.

### 4. Optional image

Only embed `![[Media/<file>|width]]` if the file **already exists** in `Media/`
(distribution PDFs/PMFs live there as named SVGs, e.g. `Poisson_pmf.svg`,
`Normal_distribution_pdf.svg`). Verify with `ls Media/`. **Never invent an image
reference** — a broken embed renders as dead text.

### 5. Examples (1–3, the deliverable's heart)

Each example is a collapsible callout with a nested answer callout:

```markdown
> [!example]- Expected Payout on a Simple Policy {Example}
> A claim size $X$ has PMF $P(X=0)=0.5$, $P(X=100)=0.3$, $P(X=500)=0.2$. Find $E[X]$.
>
> > [!answer]-
> > $$E[X] = 0(0.5) + 100(0.3) + 500(0.2) = 130$$
> > On average the insurer pays \$130 per claim.
```

- The `-` after `[!example]`/`[!answer]` makes them **collapsed by default** —
  keep it (questions first, answers hidden).
- `{Example}` at the end of the title renders as a pill badge — keep it.
- Title each example with what it demonstrates, in actuarial terms.
- **How many:** scale to the concept.
  - **1** — narrow, single-use concepts (e.g. `Force of Interest` conversion).
  - **2** — most concepts: one plain application + one with an actuarial twist.
  - **3** — foundational or multi-faceted concepts (`Expected Value`, `Bonds`,
    `Annuity Immediate`, `Bayes Theorem`) where distinct cases each teach
    something (e.g. discrete vs continuous; premium vs discount bond; prior
    update vs partition).
- **Make examples actuarial**, not generic: claims, losses, deductibles,
  premiums, reserves, annuities, bonds, policyholders, endowments. This is the
  whole point of the vault.
- Vary difficulty across multiple examples (one direct, one multi-step).
- Always end with the numeric answer and a one-line interpretation when it adds
  meaning ("...so the bond sells at a premium").

## LaTeX rules (phone readability — same as the question converters)

The app renders with `remark-math` + `rehype-katex`; pages are read on phones.

1. **`align*` for any multi-step derivation.** Never chain evaluation steps as
   separate `$$` blocks. Each step on its own `&=` line:

   ```markdown
   > > $$
   > > \begin{align*}
   > > P[H \mid C] &= \frac{P[C \mid H]\,P[H]}{P[C]} \\
   > >            &= \frac{(0.40)(0.20)}{0.16} \\
   > >            &= 0.50
   > > \end{align*}
   > > $$
   ```

   (Inside an answer callout each line is also prefixed with `> > `.)

2. **`$$` delimiters on their own lines.** Never `$$\begin{align*}...\end{align*}$$`
   on one line — it renders as raw text.

3. **One `=` per line in derivations.** Don't write `X &= formula = result`;
   split the result onto its own `&=` line. Exception: short decimal→percent
   pairs (`= 0.05127 = 5.127\%`) may stay together.

4. **Clean notation:** `$…$` inline, `$$…$$` for display. No smart quotes, no
   OCR dashes (`−` → `-`), no Unicode fractions (`½` → `\frac{1}{2}`). Use
   `\times`, `\leq`, `\geq`, `\cdot`. Escape dollar amounts as `\$`.

## Workflow

1. **Identify the concept(s)** and whether each page exists. Use `ls`, not just
   a glob, so you *see* extensionless files:
   `ls -b Concepts/ | grep -i "<keyword>"`. Existing → improve in place to this
   structure; missing → create `Concepts/<Exact Name>.md`.
2. **Read 2–3 neighboring pages** of the same family for tone/symbols (e.g. for
   an FM annuity, read `Annuity Immediate`, `Annuity Due`, `Perpetuity`). Match
   notation: `i`, `v`, `d`, `\delta`, `a_{\overline{n}|}`, `s_{\overline{n}|}`
   for FM; `f(x)`, `F(x)`, `E[X]`, `\text{Var}(X)` for P; `CDF`, `f_{n \to n+1}`,
   loss-ratio / pure-premium notation for Exam 5.
3. **Write** the page in the canonical shape above.
4. **Wire up wiki-links:** every `[[Name]]` must resolve to a real page. When two
   pages share a name, link the one for *this* exam — see "Namesake pages" below.
   If you reference a concept that doesn't exist yet, either drop the link or
   flag it to the user — don't leave dangling links.
5. **Place in the syllabus (new concepts):** if a brand-new concept belongs on
   an exam, check whether the syllabus page references it under the right
   learning objective. If not, mention to the user that it may need a syllabus
   `[[link]]` (don't silently restructure the exam page).
6. **Validate** — this is not optional, and it catches what review cannot:

   ```bash
   python3 .claude/skills/actuarial-concept-definitions/validate_links.py \
       --exam "Exam 5 (CAS)" --questions exam-5
   ```

   Reports missing `.md` extensions, broken `[[links]]`, and question
   `wiki_link:` entries with no matching page. Scope with `--exam`/`--questions`
   while working on one exam; run bare for a vault-wide audit (expect a large
   pre-existing backlog on Exams 6–9, whose source material is largely
   unwritten). Exits non-zero on failure.
7. **Build if you renamed or added files:** `cd quiz && npm run build && npm test`.
   Renames change what the collectors bundle, so a rename that looks harmless in
   git can still break the app.
8. **Self-check** against the checklist below, then commit.

## Namesake pages — link the one for the right exam

Several terms exist twice in the vault with different meanings per exam. Linking
the wrong one is silent: the link resolves, so no validator catches it, but the
reader lands on an unrelated page. Known collisions:

| Term | Exam P/FM page (severity math) | Exam 5 page (pricing procedure) |
|---|---|---|
| Deductible | `Deductible` | `Deductible Rating` |
| Coinsurance | `Coinsurance`, `Coinsurance Percentage` | `Coinsurance Rating` |
| Case reserves | `Case Reserves` (the liability) | `Case Outstanding Development Method` (the technique) |
| Trend | `Trend` (generic) | `Loss Trend`, `Premium Trend`, `Exposure Trend` |

When a syllabus objective says "calculate deductible relativities," it wants the
*rating* page. Check both candidates before linking.

## Verifying an existing page before you restructure it

When improving a page that already has content, **check the math, don't just
reformat it.** Stub pages that were invisible to the build (see "The filename is
the API") have never been read by a user and can carry real errors — one
`Ratemaking` page stated the indication as
`(Loss Ratio + Expense Ratio) / (1 - Profit)`, which loads expenses in the
numerator *and* omits variable expenses from the denominator, double-counting
them. Re-derive the defining formula against the source text before you keep it.

## Source-material pages (`Resources/Books/`)

Exam syllabi end with a **Source Material** callout linking one page per reading.
These are a different shape from concept pages — they *do* have YAML frontmatter,
and they exist to give each reading a chapter-level map into the concept vault:

```markdown
---
Title: Basic Ratemaking
Authors: "Geoff Werner, Claudine Modlin"
Year: "2016"
date: "2016"
Edition: 5th
Publisher: Casualty Actuarial Society
Type: Study Note
Available from: "[casact.org](https://…)"
---
One-line framing sentence, linking the exam and the core concept.

## 1 Introduction

- Bulleted section outline, wiki-linked to [[Concepts]] pages

## Links
- [Title (Publisher)](https://…)
```

- `Year`/`date` feed the Resources timeline; `Author`/`Authors`, `Edition`,
  `Publisher` populate the index card. Books use `Find at your local library at:`;
  papers, ASOPs and study notes use `Available from:` with a real URL.
- Everything lives in `Resources/Books/` — that is the only directory the wiki
  collector reads for documents, even for ASOPs and statements of principles.
- Only add a `![[…Cover.png]]` embed if the image **already exists** in
  `Media/Attachments/`. Most do not; omit rather than invent.
- The outline's job is linking, not summarizing. Each chapter bullet should point
  at the concept page that teaches it.

## Reviewing a syllabus page

When asked to audit an exam syllabus ("what's missing?", "validate the study
guide"), two distinct gaps matter and the second is easy to miss:

1. **Linked but missing** — `[[Term]]` with no page. Found by the validator.
2. **Present but unlinked** — the syllabus prose names a concept that *already
   has a page*, but leaves it as plain text, so the reader never reaches it and
   the app never counts it toward the exam's concept list. The validator cannot
   see these; find them by diffing the concepts tested by that exam's questions
   against the concepts the syllabus links:

   ```bash
   # concepts referenced by questions/<exam>/ but not linked on the syllabus page
   ```

   Objectives with **zero** links are the strongest signal — they usually mean a
   whole learning objective has no concept coverage at all.

Also check that question `wiki_link:` entries resolve (validator step 3). A
question pointing at a naming variant still records mastery, against a slug the
app can never display — so the concept looks permanently unstudied.

## Quality checklist (per page)

- [ ] Starts with `**Term**` + definition; no frontmatter
- [ ] Definition is 1–2 precise sentences with relevant `[[wiki-links]]`
- [ ] Defining formula is in a `> $$` block **immediately after** the definition
- [ ] Each `> $$` block is mobile-narrow: no two formulas side-by-side via `\qquad`/`\quad`; distinct formulas in separate stacked blocks; long lines broken across `\\`
- [ ] Distributions include PMF/PDF **and** mean/variance
- [ ] Every symbol in the formula is defined (prose/bullet, not crammed `\text{where}`)
- [ ] Property bullets come **after** the formula, before the examples
- [ ] 1–3 `> [!example]- … {Example}` callouts, each with a nested `> [!answer]-`
- [ ] Example count scales to concept breadth; examples are actuarial, not generic
- [ ] Multi-step solutions use `align*`, one `&=` step per line, `$$` on own lines
- [ ] LaTeX is clean (no smart quotes, OCR dashes, Unicode fractions; `\$` for money)
- [ ] Image embeds only reference files that exist in `Media/`
- [ ] All `[[wiki-links]]` resolve to existing `Concepts/` pages
- [ ] Filename ends in `.md`, uses spaces (not underscores), and matches inbound links character-for-character
- [ ] Namesake check: linked the exam-appropriate page (`Deductible Rating` vs `Deductible`, etc.)
- [ ] If the page already existed, the defining formula was re-derived, not just reformatted
- [ ] `validate_links.py` passes for the affected exam
- [ ] `npm run build && npm test` pass if any file was added or renamed

## Topic reference

- **Exam P learning objectives:** General Probability · Univariate Random
  Variables · Multivariate Random Variables.
- **Exam FM learning objectives:** Time Value of Money · Annuities/Cash Flows ·
  Loans · Bonds · General Cash Flows, Portfolios & ALM.
- **Exam 5 learning objectives:** Ratemaking (45–55%) · Estimating Claim
  Liabilities / Reserving (45–55%). Ratemaking is **prospective**, reserving
  **retrospective** — say which, and keep the two vocabularies distinct
  (development *to* ultimate vs. trend *forward to* the policy period; these are
  separate adjustments and conflating them double-counts). Readings: Werner &
  Modlin, Friedland, ASOP 12/13/43, CAS Statement of Principles.
- The richer topic→concept mapping lives in
  `.claude/skills/soa-exam-converter/SKILL.md`,
  `.claude/skills/cas-exam-converter/SKILL.md`, and `scripts/ontology_map.py` —
  consult them to pick canonical concept names and to keep new pages consistent
  with how questions are tagged.

## After bulk additions

If you create several new concept pages, the maintenance scripts keep the vault
consistent:

```bash
python3 scripts/update_wiki_links.py   # rebuilds wiki_link arrays + Concepts Without Review Questions.md
```

Run from the repo root. **Be deliberate about this one:** it rewrites
`wiki_link` arrays across *every* exam's question bank, not just the one you
worked on, so it turns a focused change into a repo-wide diff. When your work is
scoped to a single exam, prefer remapping that exam's links by hand and telling
the user the generated `Concepts Without Review Questions.md` is now stale and
wants its own regeneration commit. Don't hand-edit that file — it is generated.

Per `CLAUDE.md`, no concept content ships 100% AI-written without human review —
present new/changed pages for the user to review before treating them as final.
