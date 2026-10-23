---
name: actuarial-concept-definitions
description: Write or improve a concept page in Concepts/*.md so it teaches — a precise definition, the defining formula (or, for a qualitative concept, its defining structure), "The idea" card that explains why it works, worked examples that model the reasoning, and collapsible "How it appears on the exam" and "Exam traps" sections. Use when the user asks to create, write, draft, fill in, explain better, or clean up a Concepts/ page (SOA Exam P / FM / FAM / ALTAM, CAS MAS-I / MAS-II / Exam 5–9, the DISCs, CIA modules), or to standardize existing pages to this shape. Not for Resources/Books pages (resource-pages skill) or for auditing a whole exam's syllabus and coverage (exam-material-review).
---

# Actuarial Concept Page Writer

Writes the markdown pages under `Concepts/` — the pages a candidate reads to
*learn* a concept, usually for the first time, often from a link on a question
they just got wrong. The app opens New concepts in the concept popup before a
quiz, so a page is a first lesson as often as it is a reference card.

A good page answers, in this order: **what is it** (definition), **how is it
computed or what does it consist of** (formula or structure), **why does it
work that way** (the idea), **what does using it look like** (worked examples),
and **where will the exam test it and how will I get it wrong** (closing
sections).

Before writing, read **`references/vault-mechanics.md`** — filenames, aliases,
namesake pages and the LaTeX rules. Those are the things that break the built
app silently. Read **`references/exemplar.md`** for one complete page in this
shape, annotated.

## How people learn from a page — the principles behind the shape

Every rule below serves one of these. When a rule doesn't fit a concept, fall
back to the principle.

1. **Precision first, then meaning.** A definition alone is memorised, not
   understood. Every page states *why* the formula has its shape, so a
   candidate can rebuild it and predict how it behaves (→ *The idea*).
2. **Concrete before abstract.** Tie the general statement to a concrete case
   early: a number or a familiar situation in the idea, and an example the
   reader can try before reading the answer.
3. **Worked examples show the thinking, not just the arithmetic.** A novice
   learns more from studying a solved problem than solving one cold — *if* the
   solution shows the plan, labels each step and says why (→ Examples).
4. **Contrast teaches the boundary.** A concept is learned against its nearest
   neighbour (BF vs chain ladder, annuity-immediate vs due). Build at least
   one contrast into a page that has a neighbour.
5. **Deal with a misconception where it arises.** A warning works when it sits
   beside the idea it distorts and says what the wrong answer looks like
   (→ inline `[!trap]` card, and the closing *Exam traps*).
6. **Cut what doesn't help learning.** Short definitions, one formula per
   block, every symbol defined, nothing a reader has to decode. Pages are read
   on phones. Median page length is ~750 words; a long page needs a reason.

## The shape of every page

```markdown
**Term** ($symbol$) is <one or two sentences: precise definition with [[wiki-links]]>.

> $$ <the defining formula> $$

- <where: the remaining symbols>
- <a property, an assumption, a relationship, a contrast with its neighbour>

> [!idea] The idea
> <1–3 sentences in plain words: why the formula has this shape, what it
> trades off, how it behaves — with a small concrete number if it helps.>

> [!trap] <name of the slip>          ← optional, at most one or two per page
> <What the wrong answer looks like, and the fix.>

![[Media/Figures/<Concept>.svg|340]]   ← only if the file already exists

> [!example]- <What this example demonstrates> {Example}
> <Problem statement.>
>
> > [!answer]-
> > <Plan in one sentence → labelled steps → result → one "why" line.>

> [!tip]- How it appears on the exam
> - <the question shapes that test it, on the exams that link the page>

> [!warning]- Exam traps
> - <the remaining mistakes that cost candidates the marks>
```

**Order matters, and part of it is load-bearing.** The *opening* — the
definition, the formula and the bullets, everything above the first callout or
figure — is read by code: Concept Craft's recipe reader (`pageOpening` in
`quiz/src/lib/conceptRecipes.ts`) stops at the first callout, and the SEO
description is the definition paragraph (`leadParagraph` in `lib/seo.ts`). So
**nothing callout-shaped goes above the bullets**: the idea card follows them,
and the figure follows the idea it illustrates.

The only YAML frontmatter a concept page carries is its `verification:` block
(written by `python3 scripts/verify_check.py --sync`, never by hand) and, when
a study guide links the page under another spelling, an `aliases:` list — see
`references/vault-mechanics.md`. The body starts directly with the bold term.

### 1. The definition (first line)

- Open with the bolded term, its symbol or abbreviation if it has one, then
  the definition: `**Variance** $\sigma^2$ measures …`,
  `The **Poisson Distribution** $X \sim \text{Poi}(\lambda)$ models …`.
- One or two sentences: what it *is* and what it is *for*. Precise, not
  chatty, no history.
- Write it for the reader who doesn't know the term yet: if the precise
  wording leans on jargon, link that jargon (`[[Random Variable]]`) — don't
  explain it inline.
- Link the first meaningful mention of another concept; don't over-link.
- Introduce the main symbol here so the formula that follows is readable.

### 2. The formula block (quantitative concepts)

- The defining formula in a blockquote, `> $$ … $$`, **immediately after the
  definition**, before any bullet.
- **Narrow, never wide.** One expression per block; distinct formulas in
  separate stacked `> $$` blocks, never side by side with `\qquad` or `,\quad`.
  A single statement (a piecewise definition, a one-statement derivation) stays
  in one block with `cases` / `aligned` / `align*`, which stack vertically. A
  line too long for a phone breaks across `\\` at an `=` or a `+`.
- Distributions: PMF/PDF, then mean and variance in their own blocks.
- A **procedure** (the chain ladder, the ISO rating procedure, on-leveling)
  may need its steps as a short numbered list after the formula: the formula
  says what is computed, the steps say in what order.

For a concept with no formula, see "Qualitative concepts" below.

### 3. Supporting bullets

2–6 bullets, after the formula and before any callout:

- **where:** define every symbol not defined in the definition
  (`- where $\lambda > 0$ is the average event rate`), rather than cramming
  `\text{where …}` into the math;
- the key property or identity (linearity, memorylessness, premium/discount);
- the **assumption** the method needs, and what happens when it fails;
- the **contrast** with the nearest neighbour, in one line
  (`- Compared with the [[Chain Ladder Method|chain ladder]]: …`);
- relationships to other concepts, through `[[wiki-links]]`.

A bullet may carry a sentence of reasoning, but the central explanation
belongs in the idea card, not spread across the bullets.

### 4. The idea — `> [!idea] The idea`

The page's explanation: the mental model that makes the formula *obvious*
rather than memorised. Required on every new page and on every page you
restructure. The app draws it as a violet card in the shape of a question's
Examiner's report (`components/MarkdownCallout.tsx`), always open.

- **1–3 sentences, plain words.** No new symbols; the reader has just seen the
  formula. A short concrete number is welcome ("if 40% has been reported, BF
  adds 60% of the *expected* losses to what's in").
- **Say why, not what.** It must not restate the definition. Good ideas name
  one of: the problem the concept solves, the trade-off it makes, why each
  piece of the formula is there, or how the result moves when an input moves.
- **The test:** from the idea alone, could a reader rebuild the formula, or
  predict which way the answer moves when an input changes? If not, rewrite it.
- Write the title exactly `The idea`. Never fold it (a trailing `-` is ignored
  anyway: a card is read in place).
- Placement: after the bullets, before the figure. When restructuring a page
  whose best bullet *is* the idea (BF's "actual emergence is taken at face
  value …"), move that reasoning into the card rather than repeating it.

```markdown
> [!idea] The idea
> Trust what has already been reported, and only *estimate* what hasn't. BF
> leaves the actual emergence alone and fills the gap with expected losses, so
> one large early claim moves the answer by exactly that claim, not by a
> multiple of it.
```

### 5. An inline trap — `> [!trap] <the slip>` (optional)

For the one mistake most tied to the formula or the idea — the one a reader
makes *while reading this formula* — put it right where it arises, as an amber
card, instead of only at the bottom of the page.

- At most one, two on a broad page. The rest stay in the closing
  *Exam traps* list. Never state a trap in both places.
- Title it with the slip, in a few words (`Paid losses, reported factors`,
  `Immediate is not due`).
- Body: what the wrong answer looks like, and the fix, in one or two
  sentences.
- Place it after the idea card, or **inside an example's answer at the step
  where the slip happens** (nested one level deeper: `> > > [!trap] …`).

### 6. Optional figure

`![[Media/Figures/<Concept>.svg|340]]` only if the file already exists
(`ls Media/Figures/`). The figures are generated (`docs/concept-figures.md`) —
never invent an embed. Place it after the idea card: the picture should show
what the idea says.

### 7. Worked examples (1–3)

Each is a collapsed `> [!example]- <title> {Example}` with a nested collapsed
`> > [!answer]-`. Collapsed means the reader sees the problem first and can try
it — keep both `-`s, and keep the `{Example}` badge.

**How many** scales to the concept: 1 for a narrow conversion (`Force of
Interest`), 2 for most, 3 for a foundational or many-sided concept (`Expected
Value`, `Bonds`, `Bayes Theorem`) where each case teaches something different.

**What each example is for** — pick them as a set, not one at a time:

- **Example 1 — the direct application.** The standard question shape, in an
  actuarial setting.
- **Example 2 — the contrast or the twist.** Compare with the neighbour on the
  same data (BF vs chain ladder), change one condition and show the answer
  move, or show the method *failing* when its assumption breaks. This is the
  example that teaches the boundary of the concept.
- **Example 3 (if earned)** — a multi-step exam-style problem, or a case the
  first two don't cover (continuous vs discrete; a premium vs a discount bond).

**How each answer is written** — show the thinking:

1. **The plan, in one sentence, before any arithmetic.** What is being asked
   and the route: "We need $P(H \mid C)$; its denominator $P(C)$ comes from the
   law of total probability, so find that first."
2. **Labelled steps.** Each chunk of working opens with a short plain-language
   label of what it achieves ("First, the a priori expected losses:"). In an
   `align*` block, the left-hand side often *is* the label
   (`\% \text{ unreported} &= …`).
3. **The result, with a one-line interpretation** ("… so the bond sells at a
   premium").
4. **One "why" line.** Pose the question a thoughtful reader would ask and
   answer it in a sentence: `*Why is BF higher?* Emergence is running behind
   the a priori, and BF doesn't extrapolate the shortfall.` This models the
   self-explanation that makes an example stick.

Also:

- **Actuarial, not generic**: claims, losses, deductibles, premiums, reserves,
  annuities, bonds, policyholders. This is the point of the vault.
- **Recompute every number in code**, not by eye, and state rounding where it
  changes a digit.
- A **written-answer** example (a "describe", "explain" or "evaluate" task)
  follows "Qualitative concepts" below — its answer is a model answer, not a
  number.

### 8. How it appears on the exam — `> [!tip]-` (collapsed)

2–5 bullets on the **question shapes** that test the concept on the exams that
link the page: what the question gives and asks for, what it is paired with,
whether it is a calculation, a recognition or a written answer — and for a
written answer, its **command word** (*describe*, *explain*, *evaluate*,
*recommend*), since that word decides what earns credit. Name the exam when the
page serves several. Ground it in the exam page's objective wording and the
question bank (`grep -rl "Concepts/<Name+With+Plusses>" questions/`) — never
invent a frequency you have not counted.

### 9. Exam traps — `> [!warning]-` (collapsed)

2–5 bullets, each a specific mistake and its fix: a timing or convention slip
(immediate vs due, curtate vs complete, `q` vs `p`), a confusable neighbour, a
units or rate-basis mismatch, a sign or direction error, an assumption the
question quietly violates. Say what the wrong answer looks like so a candidate
can catch it mid-question. No generic advice ("read carefully"). Don't repeat
the inline trap card here.

Both closing callouts go after the last example and are required on every new
page.

## Qualitative concepts

About a hundred pages have no formula: professional standards, governance,
regulation, IFRS 17 policy, the DISCs' risk-management and data topics, much of
Exams 6–9's reading. The page keeps the same order with three substitutions.

1. **In place of the formula: the defining structure**, right after the
   definition, as plain markdown (not a `>` box — a plain blockquote centres
   its text). Pick the form the concept actually has:
   - a **numbered list** of the criteria, components or steps
     (the elements of a reserve opinion; the steps of a rate filing);
   - a **hierarchy**, as a nested list (Rules of Professional Conduct →
     Standards of Practice → educational notes → general practice);
   - a **comparison table** against the concept it is confused with
     (PAA vs GMM; materiality vs reasonableness).

   Keep it narrow enough for a phone: a table of two or three short columns.
2. **The idea card is just as required**: why the rule exists, what problem the
   structure solves, what it protects against. ("The Act refers to the
   profession's standards instead of writing a method into law, so the standards
   can change without Parliament — which is why yesterday's practice isn't
   compliant today.")
3. **The examples are scenarios with model answers.** The problem gives a
   situation and asks the exam's command word ("Assess whether each is accepted
   actuarial practice", "Recommend and justify an approach"). The answer is
   written the way an examiners' sample answer is: short, bulleted, each point
   a **claim plus its reason tied to the scenario**, and as many points as the
   question would want. Where more than one answer earns credit, say so, as the
   examiners do ("Alternatively: …"). End with a "why" line on what separated a
   full-credit answer from a partial one.

`Concepts/Accepted Actuarial Practice.md` is a good model of the scenario
example; give such a page its idea card and closing sections when you touch it.

## Workflow

1. **Find the page.** `ls -b Concepts/ | grep -i "<keyword>"` (`ls`, not a
   glob, so an extensionless file shows). Existing → improve in place to this
   shape; missing → create `Concepts/<Exact Name>.md`. For the vault-wide
   worklist of missing pages, `python3 scripts/find_concept_gaps.py` and
   `CONCEPT_GAPS_PLAN.md`. Check the vault for the same concept under another
   name first — an alias beats a duplicate page.
2. **Read the source and the neighbours.** The syllabus reading the concept
   comes from (the exam page's Source Material), and 2–3 neighbouring pages for
   notation (`references/vault-mechanics.md` lists each exam's).
3. **Find how it is tested.** The question bank tagged with the page, and the
   exam page's objective. This feeds the examples, the closing sections and the
   inline trap — the real mistakes are in the examiners' reports.
4. **Write the idea first**, in your own words, before the rest. If you cannot
   write it, you don't yet understand the concept well enough to write the
   page; go back to the reading.
5. **Write the page** in the shape above. On an existing page, **re-derive the
   formula against the source** rather than reformatting it — pages that were
   never rendered can carry real errors.
6. **Wire links**: every `[[Name]]` must resolve; link the namesake for *this*
   exam (`references/vault-mechanics.md`). A brand-new concept that belongs on
   an exam: tell the user if the syllabus page doesn't link it — don't
   restructure the exam page.
7. **Validate** — not optional:

   ```bash
   python3 .claude/skills/actuarial-concept-definitions/validate_links.py \
       --exam "Exam 5 (CAS)" --questions exam-5
   python3 scripts/verify_check.py --sync "Concepts/<page>.md"
   ```

   If you added or renamed a file, also `cd quiz && npm run build && npm test`.
8. **Self-check** against the checklist, then present the page for review: per
   `CLAUDE.md`, no concept content ships 100% AI-written without human review.

## Quality checklist (per page)

**Teaching**
- [ ] Definition: 1–2 precise sentences, jargon linked, main symbol introduced
- [ ] `> [!idea] The idea` present, after the bullets: 1–3 plain sentences that say *why*, not *what*; passes the rebuild-or-predict test
- [ ] At least one contrast with the nearest neighbour (a bullet or an example), where the concept has one
- [ ] Examples chosen as a set: a direct application, then a contrast, twist or failure case
- [ ] Each answer: a one-sentence plan, labelled steps, the result interpreted, one "why" line
- [ ] Inline `[!trap]` cards: at most one or two, placed where the slip happens, not repeated in *Exam traps*
- [ ] `> [!tip]- How it appears on the exam` grounded in the objective and the bank (command words for written answers); `> [!warning]- Exam traps` specific
- [ ] Qualitative concept: defining structure (list, hierarchy or table) in place of the formula; scenario examples with model answers

**Form**
- [ ] Body starts with `**Term**`; frontmatter holds only `aliases:` (if needed) and the synced `verification:`
- [ ] Formula in a `> $$` block immediately after the definition; every block phone-narrow; every symbol defined
- [ ] Distributions: PMF/PDF and mean/variance
- [ ] Nothing callout-shaped above the bullets (the opening is read by code)
- [ ] Multi-step working in `align*`, `$$` on their own lines, one `=` per line; clean LaTeX (`references/vault-mechanics.md`)
- [ ] Worked numbers recomputed in code
- [ ] Figure embeds only reference files that exist
- [ ] All `[[links]]` resolve, to the right namesake; filename ends `.md`, spaces not underscores
- [ ] Existing page: formula re-derived, not just reformatted
- [ ] `validate_links.py` passes; `verify_check.py --sync` run; `npm run build && npm test` if files were added or renamed

## After bulk additions

`python3 scripts/update_wiki_links.py` rebuilds `wiki_link` arrays and
`Concepts Without Review Questions.md` — but it rewrites *every* bank, so on
work scoped to one exam prefer remapping that exam's links by hand and telling
the user the generated report is stale. Never hand-edit that file.
