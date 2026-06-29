---
name: actuarial-concept-definitions
description: Write or improve a concept-definition page in Concepts/*.md — a concise precise definition, a LaTeX formula block, and 1–3 worked examples. Use when the user asks to create, write, draft, fill in, or clean up a Concepts/ page (especially Exam P / Probability and Exam FM / Financial Mathematics topics), or to standardize the definition/formula/example structure of existing concept pages.
---

# Actuarial Concept Definition Writer

Writes the markdown concept pages under `Concepts/` that are the "database" the
quiz app is built on. A concept page is a short, self-contained reference: what
the thing **is**, the **formula** that defines it, and a few **worked examples**.
Pages are rendered in the wiki (`quiz/src/components/wiki/`), feed the search
index, and are linked from exam syllabi and question `wiki_link` arrays.

This skill is tuned for **Exam P (Probability)** and **Exam FM (Financial
Mathematics)** concepts, but the structure applies to any actuarial concept.

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
- **One formula = one `> $$` block.** Don't fragment a single formula into a
  stack of separate `> $$` blockquotes. Use `cases`, `aligned`, or `align*`
  *inside one block* for piecewise or multi-line definitions:

  ```markdown
  > $$E[X] = \begin{cases} \displaystyle\sum_{k} k\, f(k) & \text{(discrete)} \\[6pt] \displaystyle\int_{-\infty}^{\infty} x\, f(x)\, dx & \text{(continuous)} \end{cases}$$
  ```

- It is fine to have a **second** `> $$` block for a genuinely distinct formula
  (e.g. PMF in one block, then `E[X]` and `Var(X)` in another).
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

1. **Identify the concept(s)** and whether each page exists:
   `ls Concepts/ | grep -i "<keyword>"`. Existing → improve in place to this
   structure; missing → create `Concepts/<Exact Name>.md`.
2. **Read 2–3 neighboring pages** of the same family for tone/symbols (e.g. for
   an FM annuity, read `Annuity Immediate`, `Annuity Due`, `Perpetuity`). Match
   notation: `i`, `v`, `d`, `\delta`, `a_{\overline{n}|}`, `s_{\overline{n}|}`
   for FM; `f(x)`, `F(x)`, `E[X]`, `\text{Var}(X)` for P.
3. **Write** the page in the canonical shape above.
4. **Wire up wiki-links:** every `[[Name]]` must resolve to a real page. Check:
   `ls Concepts/ | grep -i "<name>"`. If you reference a concept that doesn't
   exist yet, either drop the link or flag it to the user — don't leave dangling
   links. Note `conceptMatch.ts` handles some alias variants, but prefer exact
   page names.
5. **Place in the syllabus (new concepts):** if a brand-new concept belongs on
   an exam, check whether `Exam P-1 (SOA).md` / `Exam FM-2 (SOA).md` already
   reference it under the right learning objective. If not, mention to the user
   that it may need a syllabus `[[link]]` (don't silently restructure the exam
   page).
6. **Self-check** against the checklist below, then commit.

## Quality checklist (per page)

- [ ] Starts with `**Term**` + definition; no frontmatter
- [ ] Definition is 1–2 precise sentences with relevant `[[wiki-links]]`
- [ ] Defining formula is in a `> $$` block **immediately after** the definition
- [ ] A single formula isn't split across multiple `> $$` blocks (use `cases`/`aligned`)
- [ ] Distributions include PMF/PDF **and** mean/variance
- [ ] Every symbol in the formula is defined (prose/bullet, not crammed `\text{where}`)
- [ ] Property bullets come **after** the formula, before the examples
- [ ] 1–3 `> [!example]- … {Example}` callouts, each with a nested `> [!answer]-`
- [ ] Example count scales to concept breadth; examples are actuarial, not generic
- [ ] Multi-step solutions use `align*`, one `&=` step per line, `$$` on own lines
- [ ] LaTeX is clean (no smart quotes, OCR dashes, Unicode fractions; `\$` for money)
- [ ] Image embeds only reference files that exist in `Media/`
- [ ] All `[[wiki-links]]` resolve to existing `Concepts/` pages

## P / FM topic reference

- **Exam P learning objectives:** General Probability · Univariate Random
  Variables · Multivariate Random Variables.
- **Exam FM learning objectives:** Time Value of Money · Annuities/Cash Flows ·
  Loans · Bonds · General Cash Flows, Portfolios & ALM.
- The richer topic→concept mapping lives in
  `.claude/skills/soa-exam-converter/SKILL.md` and `scripts/ontology_map.py` —
  consult them to pick canonical concept names and to keep new pages consistent
  with how questions are tagged.

## After bulk additions

If you create several new concept pages, the maintenance scripts keep the vault
consistent:

```bash
python3 scripts/update_wiki_links.py   # rebuilds wiki_link arrays + Concepts Without Review Questions.md
```

Run from the repo root. Per `CLAUDE.md`, no concept content ships 100%
AI-written without human review — present new/changed pages for the user to
review before treating them as final.
