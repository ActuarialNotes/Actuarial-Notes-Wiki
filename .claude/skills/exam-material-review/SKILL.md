---
name: exam-material-review
description: Review and improve everything backing one exam — its syllabus page, concept pages, question bank, and comprehension checks — judged from the perspective of a student actually sitting it. Use when the user asks to review, audit, improve, grade, or find gaps in an exam's material ("review all the Exam P material", "what's missing from Exam FM?", "improve the MAS-I pages", "audit the Exam 5 question bank"), or asks how the vault would hold up for a candidate at a given level of preparation. Also use before a big authoring push on one exam, to decide where the effort should go. This skill finds and fixes gaps across a whole exam; for writing a single concept page use actuarial-concept-definitions, and for importing questions from a PDF use soa-exam-converter or cas-exam-converter.
---

# Exam Material Review

Reviews one exam end to end and fixes what the review finds. The unit of work is
an **exam**, not a page: the syllabus page (`Exam *.md`), every concept it links,
the question bank (`questions/<exam-id>/`), and the comprehension checks
(`comprehension-checks/<exam-id>/`) are one product, and the interesting defects
live in the seams between them — a question linking a placeholder page, a
distribution with a page but no questions, a syllabus objective nothing covers.

## The lens: read as a candidate, not as an editor

An editor asks "is this page correct?" and every page passes. A candidate asks
"could I answer an exam question after reading this?" and many pages fail. The
second question is the one this skill asks.

Anchor it to a **specific reader** — the user will usually name one ("a
second-year McMaster student"). Where they are determines what counts as a gap:

- **What they already have.** A second-year university student has single- and
  multivariable calculus and one probability course. Don't flag missing calculus
  explanations; that is not the gap.
- **What their coursework never taught them.** This is where the real gaps are.
  For Exam P: memorization with no aid sheet, insurance payment variables
  (deductible/limit/coinsurance), double integrals over non-rectangular regions,
  and 6-minute-per-question speed. A university course covers none of these.
- **Where their instincts are wrong.** Trial-vs-failure parameterizations,
  rate-vs-scale conventions, "at least one" without complements, adding standard
  deviations, subtracting variances for a difference. Flag these explicitly on
  the page — a correct page that doesn't warn about the adjacent wrong turn
  still lets the candidate take it.

Three questions to ask of each page, in order:

1. **Could they identify this from a word problem?** Formula-complete pages
   routinely fail here. A student who knows every density cold still cannot tell
   a binomial from a hypergeometric setup. Identification guidance belongs on the
   umbrella pages (`Discrete Univariate Distributions`,
   `Continuous Univariate Distributions`) as a "which one does this problem
   want?" list, keyed on the wording of the question.
2. **Does the worked example match exam difficulty?** One-step plug-ins
   ("$E[X] = \alpha\theta = 4 \times 250$") teach recall, not the two-to-four-step
   work a real question asks. Pages that carry only a plug-in need a second
   example that chains steps, and it should demonstrate a *technique* — the
   ratio trick for recovering parameters, layering as a difference of excess-loss
   expectations, memorylessness to discard wasted trials.
3. **Is the hardest thing on the syllabus the thinnest thing in the vault?**
   Check this deliberately; the answer is often yes, because hard material is
   hard to author. On Exam P the multivariate section is 23–30% of the exam and
   almost all of it is continuous joint densities — which had one page and two
   questions.

## Workflow

### 1. Audit mechanically

```bash
python3 .claude/skills/exam-material-review/audit_exam.py --exam exam-p
```

Builds the exam's concept graph and reports stub pages, broken links, missing
comprehension checks, zero-question concepts, the difficulty mix, and the
thinnest pages. It reports and never edits. Exits non-zero on hard defects.

The counts **locate** problems; they do not diagnose them. A 120-word page may
be complete (`Set Function`) or gutted (`Variance`, which was missing the
addition rule for sums). Always read the pages the numbers point at.

Also run the vault-wide link validator, which catches missing `.md` extensions
and filename drift the audit does not:

```bash
python3 .claude/skills/actuarial-concept-definitions/validate_links.py --exam "Exam P-1 (SOA)"
```

### 2. Read the syllabus page against the real exam

Every learning objective should reach a concept page that actually teaches it.
Two failure modes recur:

- **Objectives with no linked concept** — plain prose where a `[[link]]` belongs
  ("probability density functions, and cumulative distribution functions" as
  bare text while `Concepts/Probability Density Function (PDF).md` sits unlinked).
- **Concept pages orphaned from the syllabus** — real, exam-relevant pages that
  nothing links, so the study plan and mastery ladder never surface them.
  `Transformations of Random Variables` and `Hazard Rate` were both orphans on
  Exam P.

Check the syllabus text against the current published syllabus before assuming
something is missing. Exam P's source-material list explicitly excludes MGFs;
that is a deliberate scope decision, not a gap. Respect the vault's own scoping.

### 3. Fix, in this order

Priority follows how much a candidate is hurt, not how easy the fix is:

1. **Stub pages that questions link into.** A page reading "concept summary to be
   written" is worse than no page: the candidate followed a link from a question
   they just got wrong, expecting the explanation. Check the audit's
   "N questions link here" count — these are the highest-traffic pages in the
   vault, and on Exam FM the stubs carry over a hundred inbound question links.
2. **Broken links** in the exam's graph.
3. **Missing content for a heavily-weighted objective.** New concept pages.
4. **Missing warnings and identification guidance** on existing pages.
5. **Second worked examples** on pages carrying only a plug-in.
6. **Questions** for zero-coverage concepts.
7. **Comprehension checks** for anything newly linked from the syllabus.

Prerequisite umbrella pages (`Calculus`, `Discrete Mathematics`) legitimately
have no questions. A *named distribution* or a testable technique with no
questions is a real hole — Exam P listed `Gamma` and `Beta` as examinable and had
zero questions on either.

### 4. Follow the existing skills for each artifact

This skill decides *what* to write; the others define the shape:

- Concept pages → **actuarial-concept-definitions** (definition → `> $$formula$$`
  → bullets → collapsible examples; `align*` for multi-step; one expression per
  block, stacked never side-by-side, because pages are read on phones).
- Question files → **soa-exam-converter** / **cas-exam-converter** for the
  frontmatter contract. Ids continue the existing sequence (`p-401`, …);
  `wiki_link` uses `Concepts/Name+With+Plusses`.
- Comprehension checks → **flashcard-comprehension-check**. Required for every
  concept the syllabus links, or the flashcard-collect gate cannot advance that
  concept past New.

### 5. Verify

```bash
cd quiz && npx vitest run && npm run lint && npm run build
python3 .claude/skills/exam-material-review/audit_exam.py --exam exam-p
```

The test suite has corpus tests that read the markdown directly and will fail on
malformed content. `npm run build` fails on unused imports (`noUnusedLocals`).

## Traps specific to this repo

These break the built app while looking perfect in the markdown and in Obsidian.

- **Never put a `[[wiki-link]]` inside a markdown table.** A table cell needs the
  pipe escaped (`[[Bond Price\|Price]]`), but the app's link regex is
  `/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/` — it stops at the first `|` and keeps the
  backslash, so the target becomes `Bond Price\` and dead-ends. Comparison tables
  are the obvious way to write a "which distribution?" selector and the wrong
  one. Use a bullet list, which also reads better on a phone. (`Concepts/Bonds.md`
  still carries this bug.)
- **Only `[!answer]` callouts hold source material on an exam page.**
  `parseExamSyllabus` treats `[!example]` callouts as learning objectives and, at
  one point, *every other* callout as a source-material block — so an
  `[!info]`/`[!tip]` callout leaked its concept links into the exam's resource
  list. That is now narrowed to `[!answer]` and pinned by a test in
  `wikiParser.test.ts`; keep it that way if you touch the parser.
- **Comprehension-check stems must not open inline math with a bare digit.**
  `$0 < x < 1$` fails the corpus test, because a `$` followed by a digit cannot be
  told apart from unescaped currency. Write `$(0 < x < 1)$`, and escape real
  currency as `\$`.
- **Adding a `[[link]]` to a learning-objective callout makes it a syllabus
  concept**, which feeds mastery tracking and study-plan generation. That is
  usually what you want for genuinely examinable material — but it also obliges a
  comprehension check. Guidance links belong in a non-`[!example]` callout, where
  the parser ignores them.
- **Verify exam-day facts against the exam body's own site.** Format, provided
  tables, approved calculators, and scoring change. The SOA site returns 403 to
  automated fetches; search instead, and cite what you find. For Exam P as of
  this writing: 3 hours, 30 multiple-choice, computer-based; **no formula sheet**;
  a standard normal table *is* provided on-screen; calculators limited to the
  TI BA-35 / BA II Plus / BA II Plus Professional / TI-30Xa / TI-30X II /
  TI-30X MultiView; scored 0–10 with 6 to pass.

## Reporting back

Lead with what a candidate would have hit, not with file counts. State the
before/after for each defect class, name what you deliberately left alone and
why (prerequisite pages with no questions, deliberate syllabus exclusions), and
flag anything the audit surfaced in *other* exams — running it across the
remaining banks is cheap and the FM stub pages are worse than P's were.

Per `CLAUDE.md`, no vault content ships 100% AI-written without human review.
Present new and rewritten pages for the user to review before treating them as
final, and say plainly which worked examples you computed yourself.
