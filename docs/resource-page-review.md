# Resources/ page review

Review of all 31 pages under `Resources/` against the `textbook-toc` skill's
checklist, 2026-07-28.

## Scope and method — read this before acting on the findings

**No chapter title on any page was verified against an external source.** Every
outbound fetch attempted during this review returned `403 Forbidden` from the
environment's proxy gateway — the CAS PDF, the SOA PDF, Open Library, the Library of
Congress, the AMS bookstore, and `catdir.loc.gov` alike. `WebSearch` works; `WebFetch`
does not reach arbitrary hosts from this environment.

So this review is **internal-consistency only**. It answers "is this page
self-consistent, well-formed, and consistent with the syllabus that assigns it?" — not
"does this match the real book?" The second question needs a session with network
access, and the queue for it is in [Verification queue](#verification-queue).

That limit turned out to be less crippling than expected, because the syllabus pages
carry section-level exclusion lists (`excluding 2.4; 3.5; 4.2, 4.5; …`), and those
lists are a factual probe against the page's own TOC. Finding 1 came out of that probe.

What was checked mechanically across all 31 pages: frontmatter completeness, timeline
eligibility, the first-line summary, filename/extension conventions, inbound syllabus
links, chapter numbering continuity, section-level syllabus fit, wiki-link resolution,
and provenance (`Available from:` / `## Links`).

**Inventory:** 18 `Books/`, 7 `Regulation/`, 3 `Events/`, 1 `Benchmarks/`, 2 `Data/`.
Of the 18 `Books/` pages, 11 carry a verbatim TOC and 7 carry an editorial outline
(the ASOPs, Werner, Friedland, the Statement of Principles, and the SOA study note) —
that split is by design, not a defect.

---

## 1. Three FM pages present a syllabus-filtered TOC as if it were the book's TOC

**Severity: high — this is a correctness problem, not a formatting one.**

Several FM textbook pages have gaps in their section numbering (`2.3` → `2.5`). Those
gaps are not transcription slips: they line up *exactly* with the sections the Exam FM
syllabus excludes.

| Page | Internal numbering gaps | Gaps that are syllabus exclusions |
|---|---|---|
| `Financial Mathematics for Actuaries (Chan…)` | 2.4, 4.2, 5.3, 6.4 | **4 of 4** |
| `Mathematical Interest Theory (Vaaler…)` | 3.10, 5.3, 6.6, 6.7, 9.4, 9.5, 9.7 | **7 of 7** |
| `Mathematics of Investment and Credit (Broverman…)` | 5.2, 6.2 | **2 of 2** |

Thirteen gaps, thirteen exclusions, no exceptions. Someone built these outlines by
transcribing the TOC and deleting the off-syllabus sections.

Why it matters: the page reads as the book's table of contents, and a reader has no
way to tell that §2.4 exists in Chan at all. The numbering gaps look like transcription
errors, so the next person to touch the page can't distinguish deliberate pruning from
damage — and may "fix" it by inventing the missing entries. It also breaks the syllabus
cross-check the `textbook-toc` skill relies on, since the exclusion list can no longer
be tested against the page.

**Fix (pick one and apply it consistently):** either restore the full TOC and mark
excluded sections inline (`- 2.4 Annuities Payable Continuously *(not on syllabus)*`),
or keep the filtered view and say so in the framing sentence — "Sections outside the
Exam FM syllabus are omitted." The first is preferable; it's what makes the page a
usable map of the book, and the exclusions are then visible study information rather
than a silent deletion.

### Two gaps that are *not* explained by exclusions

These are the ones that most likely indicate a genuine transcription error, and they
need the real book to settle:

- **`Financial Mathematics: Theory and Practice (Brown & Kopp)` — missing 4.2.** The
  syllabus excludes nothing in chapter 4.
- **`Probability for Risk Management (Hassett)` — missing 6.2.4, 6.2.5, 6.2.6, 6.2.7.**
  Four consecutive subsections, which reads like a truncated paste.

### A gap that is fine

`Basic Ratemaking (Werner)` jumps 15 → 17. That's correct: chapter 16 is off-syllabus
and the page's opening line already says so. No action.

---

## 2. `Resources/Data/` is invisible to the build

**Severity: high — the content exists but nothing renders it.**

Neither collector in `quiz/vite.config.ts` reads `Resources/Data/`:

- the wiki collector reads `Exam*.md`, `Concepts/`, and `Resources/Books/` only;
- the timeline collector reads `Books`, `Events`, `Regulation`, `Benchmarks`.

So `Resources/Data/Historical OSFI Data.md` and
`Resources/Data/OSFI/Property and Casualty.md` are in the repo, are linked to each
other, and appear nowhere in the app. The second has a further problem: both collectors
use a flat `readdir` with no recursion, so a page in a nested subdirectory would be
skipped even if `Data/` were added to the list.

**Fix:** decide whether this content should ship. If yes, either move both pages into
`Resources/Books/` (flat) or add `Resources/Data` to the collectors — and if the nested
`OSFI/` layout is wanted, the collectors need to recurse. If no, the pages are fine as
repo-only notes, but that should be stated so the next reader doesn't assume they're live.

Note also that `Historical OSFI Data.md` has **no frontmatter at all** and opens with an
`# H1`, unlike every other resource page.

---

## 3. `Risk and Insurance (SOA)` is both undated and unreachable

**Severity: medium-high — two independent invisibility bugs on one page.**

- **No `Year` and no `date`, and no `(YYYY)` in the filename.** `collectResourceTimeline`
  does `if (!date) continue`, so the page is dropped from the Resources timeline
  entirely. It is the only `Books/` page with this problem.
- **No inbound link from any syllabus page.** It's the only orphan in `Books/`. It's an
  SOA Exam P study note (`Code: P-21-05`), but `Exam P-1 (SOA).md`'s Source Material
  callout lists six textbooks and not this one.

**Fix:** add `Year: "2021"` / `date: "2021"` (the code `P-21-05` implies 2021 — confirm
against the PDF), and add `[[Risk and Insurance (SOA)]]` to the Exam P-1 Source Material
callout. It also has no `## Links` section despite having a real URL in frontmatter.

---

## 4. The dated corpus has almost no source links

**Severity: medium — it's the provenance contract the corpus was designed around.**

`docs/research-corpus-plan.md` specifies `source_url` / `source_type` / `pdf_url` on
dated resource pages. Actual coverage:

| Directory | Pages | With `source_url` |
|---|---|---|
| `Regulation/` | 7 | **0** |
| `Events/` | 3 | **0** |
| `Data/` | 2 | **0** |
| `Benchmarks/` | 1 | 1 |

Ten of eleven dated pages assert facts — effective dates, issuing bodies, regulation
numbers like `O. Reg. 34/10` — with nothing to check them against. `OSFI PC-1 Return
(2023).md` is the model to copy.

This is the same failure mode as finding 1, one level up: content that is probably
right, with no way for a reader to confirm it. Every one of these has a findable
official source (Parliament of Canada, FSRA, IASB, OSFI), so this is fillable work
rather than a design problem.

`Resources/Regulation/Formation of the Institute of Actuaries (1848).md` also declares
`type: event` while living in `Regulation/`. The collector honours the declared type, so
nothing breaks — but the file is arguably misfiled next to the three pages in `Events/`.

---

## 5. Twelve `Books/` pages show a raw image embed as their timeline summary

**Severity: low — cosmetic, but visible to users and trivially fixed.**

The timeline card's summary is the page's first non-heading line (`extractSummary` in
`quiz/vite.config.ts`). Twelve of eighteen `Books/` pages open with `![[Cover.png]]`
before any prose, so the card's summary text is the literal embed markup.

Affected: Ross, Chan & Tse, Brown & Kopp, Francis & Ruckman, Vaaler, Wackerly,
Broverman, Leemis, Hogg, Asimow, Hassett, and `Risk and Insurance (SOA)`.

**Fix:** move the one-line framing sentence above the image embed. The six pages that
already do this (Werner, Friedland, the three ASOPs, the Statement of Principles) are
the pattern.

---

## 6. Broken wiki-links out of `Books/` pages

**Severity: medium — 76 distinct dead targets, but they split into two very different piles.**

### 6a. Naming variants of pages that already exist (15) — safe to repoint now

Each target below was confirmed present in `Concepts/`:

| Link as written | Existing page |
|---|---|
| `[[Bayes' Theorem]]` (4 pages) | `Bayes Theorem` |
| `[[Poisson]]` (3 pages) | `Poisson Distribution` |
| `[[Binomial]]` (3 pages) | `Binomial Distribution` |
| `[[Cumulative Distribution Function]]` (2) | `Cumulative Distribution Function (CDF)` |
| `[[Exponential]]` | `Exponential Distribution` |
| `[[Geometric]]` | `Geometric Distribution` |
| `[[Hypergeometric]]` | `Hypergeometric Distribution` |
| `[[Lognormal]]` | `Lognormal Distribution` |
| `[[Negative Binomial]]` | `Negative Binomial Distribution` |
| `[[Normal]]` | `Normal Distribution` |
| `[[Uniform Continuous]]` | `Uniform Continuous Distribution` |
| `[[Law of Large Numbers (LLN)]]` | `Law of Large Numbers` |
| `[[Maximum Likelihood Estimator]]` | `Maximum Likelihood Estimation` |
| `[[Sufficient Statistics]]` | `Sufficient Statistic` |
| `[[Uniform Distribution]]` (2) | `Uniform Continuous Distribution` — judgment call; in Ross §5.3 and Asimow the referent is the continuous uniform |

`[[Bayes' Theorem]]` is the highest-value one: four pages, and the only difference is
the apostrophe. Keep the display text (`[[Bayes Theorem|Bayes's Formula]]`) so the
source's wording survives the repoint.

### 6b. Concepts that genuinely don't exist yet (61)

Not link errors — gaps in `Concepts/`. The most-referenced, and so the best candidates
to write next: `Gamma Distribution`, `Pareto Distribution`, `Moment-Generating
Function`, `Chebyshev's Inequality`, `Bernoulli`, `Basic Principle of Counting` (3
pages each); `Weibull Distribution`, `Beta Distribution`, `Chi-Square Distribution`,
`Bivariate Normal Distribution`, `Conditional Distribution`, `Confidence Interval`,
`Joint Distribution Function`, `Likelihood Ratio Test`, `Method of Moments` (2 each).

Two of these — `Insurance` and `Integration` — need care: automated matching suggested
`Reinsurance` and `Interaction` respectively, and both suggestions are wrong. They are
missing pages, not variants.

Most of the long tail comes from Hogg (41 dead links) and Leemis (24), which reach into
mathematical-statistics territory the vault hasn't covered yet.

---

## 7. Five pages have no provenance at all

**Severity: medium — a source page that doesn't cite its source.**

Four pages have neither an `Available from:` nor a `Find at your local library at:`
frontmatter field, and five have no `## Links` section:

| Page | Missing |
|---|---|
| `Mathematical Statistics with Applications (Wackerly…)` | availability link, `## Links` |
| `Probability and Statistical Inference (Hogg - 2020)` | availability link, `## Links` |
| `Probability and Statistics with Applications (Asimow…)` | availability link, `## Links` |
| `Probability for Risk Management (Hassett - 2021)` | availability link, `## Links` |
| `Risk and Insurance (SOA)` | `## Links` (URL is in frontmatter) |

All four books have an ISBN in frontmatter, so a WorldCat link is mechanical to add.

---

## 8. Two pages have the vault's most detailed TOCs and almost no links

**Severity: low-medium — a large, cheap win.**

| Page | Sections | Wiki-links |
|---|---|---|
| `Probability for Risk Management (Hassett - 2021)` | 169 | **1** |
| `Mathematical Statistics with Applications (Wackerly…)` | 157 | **1** |

Compare Hogg (60 sections, 74 links) or Broverman (57 / 59). Per the skill, an outline's
job is linking, not just listing — these two are pure transcription with the linking
pass never run. They're also the two richest TOCs in the vault, so the payoff is high
and the work is a second pass over text that's already there.

---

## Verification queue

Nothing below could be checked in this session. Ordered by value; all need a session
where `WebFetch` reaches the open web.

1. **Brown & Kopp §4.2 and Hassett §6.2.4–6.2.7** (finding 1) — are these real
   subsections that were dropped, or correct as-is? ACTEX posts sample-pages PDFs that
   open with the full TOC.
2. **The three filtered FM TOCs** (Chan, Vaaler, Broverman) — restoring them to complete
   TOCs needs the real section titles for the pruned entries.
3. **Chapter counts for all 11 verbatim-TOC pages** — the skill's primary edition check.
   None has been corroborated against a second source.
4. **`Risk and Insurance (SOA)` publication year** — the SOA PDF's own cover
   (`soa.org/globalassets/assets/files/edu/p-21-05.pdf`).
5. **Ten `source_url` values** for `Regulation/`, `Events/`, and `Data/` (finding 4).
6. **The seven editorial outlines** — the ASOPs in particular. ASOPs get revised, and
   `ASOP 12`'s own page notes a revision with a December 2023 effective date while the
   page documents the 2005 version. Confirm which one the Exam 5 syllabus assigns.

---

## Reproducing this review

The mechanical parts are scriptable and worth re-running after fixes:

```bash
# link graph across the whole vault (pre-existing: 429 problem groups)
python3 .claude/skills/actuarial-concept-definitions/validate_links.py

# TOC shape from a raw dump, when rebuilding a pruned outline
python3 .claude/skills/textbook-toc/scripts/format_toc.py raw_toc.txt
```

The syllabus-fit probe that produced finding 1 — parse each syllabus's Source Material
exclusion list, then test those section numbers against the linked page's TOC — is the
check most worth keeping. It's the only fully offline test in this review that can catch
a factually wrong TOC, and it found real defects on its first run.
