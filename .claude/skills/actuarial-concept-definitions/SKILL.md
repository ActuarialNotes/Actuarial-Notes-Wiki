---
name: actuarial-concept-definitions
description: Write or improve a concept page in Concepts/*.md so it teaches — a precise definition, the defining formula (or, for a qualitative concept, its defining structure), "The idea" card that explains why it works, sections that teach it through one running example, "Try it" examples that model the reasoning, and a collapsible "Exam traps" section. Use when the user asks to create, write, draft, fill in, explain better, or clean up a Concepts/ page (SOA Exam P / FM / FAM / ALTAM, CAS MAS-I / MAS-II / Exam 5–9, the DISCs, CIA modules), or to standardize existing pages to this shape. Not for Resources/Books pages (resource-pages skill) or for auditing a whole exam's syllabus and coverage (exam-material-review).
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
   on phones. A page runs ~750–1,100 words; a longer one needs a reason.

## How every sentence is written

These rules hold for every sentence on the page — the definition, the bullets,
the idea card, the examples' answers and the closing sections. They come from
the maintainer's review of the first restructured pages (2026-11-04), where
accurate content still read as disjointed.

- **Keep the terminology.** Use the terms the definition and the syllabus use
  — *probability*, *hypothesis*, *prior*, *posterior*, *evidence*,
  *deductible*, *insured* — and never swap one for a plainer synonym or a term
  of your own ("explanation" for *hypothesis*, "chance" for *probability*,
  "save" for *reduce the expected payment*). Plain words go around the terms,
  never in place of them.
- **One idea per sentence, one main clause.** No semicolons joining two
  thoughts, no dash-asides (`— a count, a payment —`) and no trailing
  "and makes …" clause. Split it into two sentences instead.
- **Name the concept as the subject** ("A random variable assigns …",
  "Bayes' theorem reverses …"), rather than leaving the reader to infer what
  the sentence is about.
- **Problem first, then the concept.** Where a passage explains, open with the
  plain difficulty or question, then say how the concept answers it.
- **Concrete before abstract.** An example a reader can picture (two dice, a
  loss below the deductible) before the general statement. No jargon the page
  hasn't already introduced.
- **Connect the sentences.** Each sentence follows from the one before it. A
  sentence that starts a new topic belongs in a bullet of its own, not in the
  same paragraph.

Before (disjointed: three ideas, asides, jargon, the concept never named):

> Outcomes such as "heads then tails" or "the policyholder dies in year 3"
> cannot be added or averaged; the numbers attached to them — a count, a
> payment — can. Turning each outcome into a number lets one CDF on the real
> line answer every probability question about that variable, and makes means
> and variances sums or integrals over that line. The same sample space carries
> many random variables: …

After:

> You can't average "heads" and "tails", but you can average numbers. A random
> variable assigns a number to each outcome, such as the number of claims or
> the size of a payment, so that probabilities, means and variances can be
> calculated.

**Section headings carry the teaching.** Below the opening, the page teaches
in `##` sections that build on each other (see "The teaching body"). The
maintainer chose this style over a lean reference card and an exam-playbook
layout after comparing all three on Exam P (2026-11-06; the drafts are in
`drafts/exam-p-style/`).

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

## <A question or difficulty, answered with the running example>

<One concrete case, worked as the reader reads: a table, a formula, what it shows.>

## <The next step, built on the last>

…

## Try it

> [!example]- <What this example demonstrates> {Example}
> <Problem statement.>
>
> > [!answer]-
> > **Plan:** <one sentence> → steps → result → one "why" line.

> [!warning]- Exam traps
> - <the remaining mistakes that cost candidates the marks>
```

There is no `> [!tip]- How it appears on the exam` callout any more
(maintainer's decision, 2026-11-06). The page teaches the question shapes in
its sections and examples, and *Exam traps* closes it. Remove the callout from
any page you restructure.

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

- **1–3 sentences, plain words around the page's own terms** (see "How every
  sentence is written"). One idea: the problem, then how the concept solves
  it. No new symbols; the reader has just seen the formula. A short concrete number is welcome ("if 40% has been reported, BF
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
  *Exam traps* list, where an inline trap may come back as a one-line
  reminder.
- Title it with the slip, in a few words (`Paid losses, reported factors`,
  `Immediate is not due`).
- Body: what the wrong answer looks like, and the fix, in one or two
  sentences.
- Place it **in the teaching section where the slip happens**, right after the
  worked number that a wrong reading would get wrong. Exceptionally, inside an
  example's answer at that step (nested one level deeper: `> > > [!trap] …`).

### 6. Optional figure

`![[Media/Figures/<Concept>.svg|340]]` only if the file already exists
(`ls Media/Figures/`). The figures are generated (`docs/concept-figures.md`) —
never invent an embed. Place it after the idea card: the picture should show
what the idea says.

### 7. The teaching body — `##` sections

Below the figure, the page teaches. This is where most of its words go.

- **One running example.** Pick one concrete case early and carry it through
  every section: 1,000 policyholders with a claim table, one policy with a
  deductible of 200, a month of claims at a rate of 3. Each section asks a new
  question of the same case, so the reader never has to absorb new numbers
  just to follow a new idea.
- **Lay the data out.** A small table (a two-way table of counts, a
  loss-by-loss split, a pmf for $k = 0, \ldots, 5$, a deductible against its
  expected payment) is usually the clearest way to show the case. Keep it to
  three or four short columns so it fits a phone.
- **Each section opens with a question or a difficulty**, in plain words, as
  its heading or first sentence ("A driver had a claim. What is the
  probability they are young?", "Why the first dollars matter most"). Then
  answer it on the running example, then state the general formula.
- **Numbers first, formula second.** Work the case, then show that the formula
  gives the same number. The formula then reads as a summary of what the
  reader has just done.
- **Sections build.** Order them so each uses what the one before set up:
  one loss → the average over losses → per loss or per payment → how the
  answer moves. A topic that builds on nothing earlier goes last.
- **Keep every topic the page covered.** A restructure moves material into
  sections, it doesn't drop it. Questions in the bank, and the answerability
  record (`simulations/answerability/<bank>.json`), lean on what is there. Cut
  only what is plainly off topic, and say what you cut.
- **Material for another exam keeps a section.** A page linked by several
  exams (Deductible: Exam P, FAM, Exam 5, the DISCs) teaches the shared core
  first and gives the other exams' material its own late section, not a line
  in a callout.
- **No bullet restates a formula in words.** If a formula needs reading
  aloud, it needs a worked number instead.
- An inline `[!trap]` card sits in the section where its slip happens.

### 8. Try it — worked examples (2–4)

The section `## Try it` holds the examples. Each is a collapsed
`> [!example]- <title> {Example}` with a nested collapsed `> > [!answer]-`.
Collapsed means the reader sees the problem first and can try it — keep both
`-`s, and keep the `{Example}` badge.

**Choose them as a set, easy to hard.** Two for a narrow concept, three or four
for a broad one. Each should exercise something the sections taught, on fresh
numbers (not the running example again):

- **First — the direct application.** The standard question shape, in an
  actuarial setting.
- **Then — the contrast or the twist.** Change one condition and show the
  answer move, show the neighbour on the same data, or show the method
  failing when its assumption breaks.
- **Last — the multi-step exam-style problem**, or a case the sections
  mentioned but didn't work (an even count, a policy still in force, a draw
  without replacement).

**How each answer is written** — show the thinking:

1. **`**Plan:**` in one sentence, before any arithmetic.** What is being asked
   and the route: "the evidence is survival past 1 year, so each likelihood is
   $P(T > 1)$."
2. **Steps.** Each chunk of working opens with a short label of what it
   achieves, or is an `align*` whose left-hand sides are the labels.
3. **The result, with a one-line interpretation.**
4. **One "why" line**, when a thoughtful reader would ask one: the question and
   its one-sentence answer ("A first head makes the biased coin more likely, so
   a second head is more likely than 0.65.").

Also:

- **Actuarial, not generic**: claims, losses, deductibles, premiums, reserves,
  annuities, bonds, policyholders. This is the point of the vault.
- **Recompute every number in code**, not by eye, and state rounding where it
  changes a digit. That includes the running example and its tables.
- A **written-answer** example (a "describe", "explain" or "evaluate" task)
  follows "Qualitative concepts" below — its answer is a model answer, not a
  number.

### 9. Exam traps — `> [!warning]-` (collapsed)

The page's last block. 2–5 bullets, each a specific mistake and its fix: a
timing or convention slip (immediate vs due, curtate vs complete, `q` vs `p`),
a confusable neighbour, a units or rate-basis mismatch, a sign or direction
error, an assumption the question quietly violates. Say what the wrong answer
looks like so a candidate can catch it mid-question. No generic advice ("read
carefully"). A trap already told as an inline card may come back here as a
one-line reminder. Required on every page.

## Qualitative concepts

About a hundred pages have no formula: professional standards, governance,
regulation, IFRS 17 policy, the DISCs' risk-management and data topics, much of
Exams 6–9's reading. The page keeps the same order with four substitutions.

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
4. **The running example is a scenario**: one company, one filing or one
   reserve review, carried through the sections, each asking what the rule
   requires of it at that step.

`Concepts/Accepted Actuarial Practice.md` is a good model of the scenario
example; give such a page its idea card, teaching sections and Exam traps when you touch it.

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
- [ ] Every sentence: the page's own terms (no synonyms), one main clause, no semicolons or dash-asides, the concept named as the subject
- [ ] `> [!idea] The idea` present, after the bullets: 1–3 plain sentences that say *why*, not *what*; passes the rebuild-or-predict test
- [ ] At least one contrast with the nearest neighbour (a bullet or an example), where the concept has one
- [ ] `##` sections that build on one running example, each opening with a question; numbers first, then the formula
- [ ] Every topic the old page covered is still taught (or its cut is reported)
- [ ] `## Try it`: 2–4 examples on fresh numbers, easy to hard — a direct application, then a contrast, twist or failure case
- [ ] Each answer: a `**Plan:**` sentence, labelled steps, the result interpreted, a "why" line where one is asked
- [ ] Inline `[!trap]` cards: at most one or two, placed in the section where the slip happens
- [ ] No `[!tip]- How it appears on the exam` callout; `> [!warning]- Exam traps` last, specific
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
