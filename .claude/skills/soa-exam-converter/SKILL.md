---
name: soa-exam-converter
description: Convert SOA sample question PDFs (Exam P, FM, etc.) into per-question markdown files for the questions/<exam-id>/ bank used by the quiz app. Use when the user provides SOA sample question and solution PDFs and asks to add, convert, or import exam questions into the wiki.
---

# SOA Sample Questions → Question Bank Converter

Converts SOA official sample question PDFs (question booklet + solutions booklet)
into one markdown file per question under `questions/exam-<id>/`, matching the
schema used by the quiz app and exemplified by existing files like
`questions/exam-p/p-004.md` and `questions/exam-fm/fm-001.md`.

## What you're given

Two PDFs from SOA (may be combined or separate):

1. **Sample question booklet** — one question per page, each with 5 multiple-choice
   options (A–E). SOA PDFs are typically text-extractable (not scanned), so
   `page.get_text()` usually works. Occasionally some pages are scanned — detect
   by checking `len(page.get_text()) < 50 and len(page.get_images()) > 0`.
2. **Sample solutions booklet** — one worked solution per question. Structure
   is usually: question number header, answer letter (A–E), then a step-by-step
   solution with LaTeX notation. Sometimes it's a combined PDF (answer key table
   first, then worked solutions).

## Step 0 — Set up PDF extraction

Install PyMuPDF if needed (`pip install pymupdf`). Avoid `pypdf` — it breaks on
`_cffi_backend`/cryptography in the sandbox.

```python
import fitz, re, os

q_doc = fitz.open("/path/to/sample-questions.pdf")
s_doc = fitz.open("/path/to/sample-solutions.pdf")

# Detect scanned vs. text pages
for i, page in enumerate(q_doc):
    text = page.get_text()
    print(i+1, "TEXT" if len(text) > 80 else "SCAN", len(text))

# Dump all text to scratch files for grep/inspection
with open("/tmp/questions_raw.txt", "w") as f:
    for i, page in enumerate(q_doc):
        f.write(f"\n===== PAGE {i+1} =====\n")
        f.write(page.get_text())

with open("/tmp/solutions_raw.txt", "w") as f:
    for i, page in enumerate(s_doc):
        f.write(f"\n===== PAGE {i+1} =====\n")
        f.write(page.get_text())

# Render any scanned pages to PNG for vision transcription
for i, page in enumerate(q_doc):
    if len(page.get_text()) < 80 and len(page.get_images()) > 0:
        page.get_pixmap(dpi=150).save(f"/tmp/q_page_{i+1:03d}.png")
```

Then `Read` the PNG files (vision) for scanned pages, and `Read`/`Grep` the
dumped text files for everything else.

## Step 1 — Identify exam and question range

From the PDF header/title page, confirm:

- **Exam identifier**: `P` → `exam-p`, prefix `p-`; `FM` → `exam-fm`, prefix `fm-`;
  `MAS-I` → `exam-mas-i`, prefix `mas1-`; etc.
- **Total question count**: SOA Exam P sample set has ~250 questions (as of 2023+);
  FM has ~188. Extract the count from the solutions table of contents or by counting
  question-boundary markers.
- **Version/date**: Note any "last revised" date from the PDF header — put it in the
  commit message for traceability, not in the frontmatter.

## Step 2 — Map document structure

The question PDF typically has one question per page (or two short questions on one
page). The solutions PDF lists questions sequentially, often with a boundary like
`Question #N` or `**N.**` at the top.

Build a quick scan to find all question-number boundaries in both files:

```python
# Find question starts in the dumped text
import re
with open("/tmp/questions_raw.txt") as f:
    content = f.read()

# SOA questions typically start with a bold question number line
starts = [(m.group(), m.start()) for m in re.finditer(r'(?m)^\*?\*?(\d+)\.\*?\*?\s', content)]
print(starts[:10])  # check pattern
```

Adjust the regex to match the actual PDF structure. Common patterns:
- `1.` at line start (simple)
- `Question 1` header
- Page break between each question (use page markers from the dump)

## Step 3 — Check for existing questions (deduplication)

Before extracting, identify which questions already exist in the bank:

```bash
ls questions/exam-p/ | grep -E '^p-[0-9]+\.md$' | sort
# or for FM:
ls questions/exam-fm/ | grep -E '^fm-[0-9]+\.md$' | sort
```

The file `questions/exam-p/p-NNN.md` corresponds directly to SOA sample question #NNN.
If `p-004.md` exists, skip question 4. Build a skip-set of already-imported question
numbers before starting batch conversion.

```python
import os
existing = set()
for fn in os.listdir("questions/exam-p"):
    m = re.match(r'^p-(\d+)\.md$', fn)
    if m:
        existing.add(int(m.group(1)))
to_convert = [n for n in range(1, total+1) if n not in existing]
print(f"Already have {len(existing)} questions; need to convert {len(to_convert)}")
```

## Step 4 — Transcribe each question

For each question number N:

**From the question PDF:**
- Extract the question body: all text between question N's start marker and question
  N+1's start marker (or end of page).
- Transcribe any tables as GitHub-flavored markdown tables (preserve all rows/columns).
- Transcribe the 5 options in the format: `- A) …`, `- B) …`, …, `- E) …`
- Normalize math notation: use `$…$` for inline math, `$$…$$` for display math.
  Convert common OCR artifacts: replace `−` (em-dash) with `-`, `×` with `\times`,
  `≤` with `\leq`, `≥` with `\geq`, etc.
- Do NOT include page headers/footers, "SOA Exam P Sample Questions", or question
  number headers in the body.

**From the solution PDF:**
- Locate the answer letter (A–E) for question N.
- Extract the worked solution text.

## Step 5 — Determine frontmatter

```yaml
---
id: "p-NNN"                           # e.g. "p-004" — 3-digit zero-padded SOA question number
exam: "Probability"                   # "Probability" for P, "Financial Mathematics" for FM
topic: "<Most specific Concepts page>"
learning_objective: "<SOA LO group>"
difficulty: easy|medium|hard
type: multiple-choice
wiki_link:
  - Concepts/<Topic+With+Spaces+As+Pluses>
  - Concepts/<Other+Relevant+Concept>
answer: "A"                           # or B, C, D, E — from the solutions PDF
points: 1
---
```

### `id` and filename

- **Exam P**: `p-NNN` → file `questions/exam-p/p-NNN.md` (e.g. question 47 → `p-047.md`)
- **Exam FM**: `fm-NNN` → file `questions/exam-fm/fm-NNN.md`
- Always zero-pad to 3 digits.
- Use the SOA question number as the ID — this creates a stable, predictable mapping.

### `topic`

The most specific `Concepts/*.md` page that matches the question's core technique.
Check what exists first:

```bash
ls Concepts/ | grep -i "exponential"   # e.g. to find the exact file name
```

Use the **exact page name** (without `.md`). Do not invent new topic names; map to
an existing page whenever plausible (see the ontology table below and
`scripts/ontology_map.py`). Only propose a new `Concepts/` page if nothing close
exists — flag any new pages to the user for review per `CLAUDE.md`.

### `learning_objective`

One of the three SOA Exam P LOs (use the exact string from `ontology_map.py`):
- `"General Probability"` — set theory, combinatorics, independence, Bayes, total probability
- `"Univariate Random Variables"` — single-variable distributions, E[X], Var, percentiles, insurance payments
- `"Multivariate Random Variables"` — joint/conditional/marginal, covariance, CLT, order statistics

For Exam FM, use:
- `"Time Value of Money"`
- `"Annuities/Cash Flows with Non-Contingent Payments"`
- `"Loans"`
- `"Bonds"`
- `"General Cash Flows, Portfolios, and Asset Liability Management"`

### `difficulty`

- **easy**: Single-step recall or direct formula application; most candidates get it right.
- **medium**: 2–3 step calculation or requires choosing the right approach among a few options.
- **hard**: Multi-step, requires combining several concepts, integration tricks, or is a known
  high-discrimination question (deductible-with-inflation compound questions, mixture
  distributions, complex order statistics, etc.).

### `wiki_link`

2–4 entries. Always include the `topic` concept plus any additional concepts the
question meaningfully exercises. Format: `Concepts/Name+With+Spaces` (spaces → `+`).

### SOA Exam P topic → concept mapping

Augments `scripts/ontology_map.py`. When a question covers one of these topics,
use this mapping for `topic` and `wiki_link`:

| Question topic | `topic` frontmatter | `learning_objective` |
|---|---|---|
| Set theory / Venn diagrams | `Set Theory` | General Probability |
| Combinatorics / counting | `Combinatorics` | General Probability |
| Independent events | `Independent Events` | General Probability |
| Conditional probability | `Conditional Probability` | General Probability |
| Bayes' theorem / total probability | `Bayes Theorem` | General Probability |
| Discrete RV / PMF / CDF | `Discrete Univariate Distributions` | Univariate Random Variables |
| Continuous RV / PDF / CDF | `Continuous Univariate Distributions` | Univariate Random Variables |
| Expected value / moments | `Expected Value` | Univariate Random Variables |
| Variance / std dev | `Variance and Standard Deviation` | Univariate Random Variables |
| Percentile / median / mode | `Percentile` | Univariate Random Variables |
| Deductible / policy limits | `Deductible` | Univariate Random Variables |
| Payment RV / loss RV | `Payment Random Variable` | Univariate Random Variables |
| Binomial distribution | `Binomial` | Univariate Random Variables |
| Poisson distribution | `Poisson` | Univariate Random Variables |
| Exponential distribution | `Exponential` | Univariate Random Variables |
| Normal / lognormal | `Normal` / `Lognormal Distribution` | Univariate Random Variables |
| Gamma / beta distribution | `Gamma` / `Beta` | Univariate Random Variables |
| Uniform distribution | `Continuous Univariate Distributions` | Univariate Random Variables |
| Joint distribution | `Conditional and Marginal Probability Functions` | Multivariate Random Variables |
| Conditional / marginal dist. | `Conditional Probability Function` | Multivariate Random Variables |
| Covariance / correlation | `Covariance and Correlation Coefficient` | Multivariate Random Variables |
| Linear combinations of RVs | `Linear Combinations of Random Variables` | Multivariate Random Variables |
| Order statistics | `Order Statistics` | Multivariate Random Variables |
| Central limit theorem | `Central Limit Theorem` | Multivariate Random Variables |
| Mixture distributions | `Continuous Univariate Distributions` | Multivariate Random Variables |

For topics not in this table, `grep -il "<keyword>" Concepts/` to find the closest
existing page.

## Step 6 — Write the worked solution (## Explanation)

Base the explanation on the worked solution in the SOA solutions PDF. Reformat it
as clean prose + LaTeX (don't paste raw OCR text):

- Use `$$…$$` for displayed equations (each distinct equation on its own block).
- Use `$…$` for inline math (variable names, short expressions in text).
- Normalize variable names to match the question body.
- Show the key algebraic steps; omit trivial intermediate arithmetic.
- If the solution uses a table (e.g. probability distributions, joint tables), render
  it as a GitHub markdown table.
- End with the final answer value, formatted as bold or a display equation.
- Do NOT repeat the question options in the Explanation section.
- Do NOT include a `### Answer` sub-heading — the answer is already in the frontmatter.

```markdown
---
<frontmatter>
---

<Question body — one paragraph or numbered list, no header>

- A) …
- B) …
- C) …
- D) …
- E) …

## Explanation

<Worked solution prose + LaTeX>
```

## Step 7 — Quality checklist (per file)

- [ ] `id` matches the SOA question number, zero-padded to 3 digits
- [ ] `answer` letter matches the solutions PDF
- [ ] Question body matches the PDF wording exactly (no paraphrasing)
- [ ] All 5 answer options (A–E) are included in the body
- [ ] LaTeX renders correctly: `$$…$$` for display, `$…$` inline; no smart quotes,
      no OCR dash artifacts (`−` → `-`), no Unicode fraction glyphs (`½` → `1/2`)
- [ ] `wiki_link` entries use `+` for spaces and point to pages that actually exist
      (run `ls Concepts/ | grep -i "<name>"` to verify)
- [ ] `topic` exactly matches an existing `Concepts/<name>.md` filename (without `.md`)
- [ ] `difficulty` is defensible: scan the solution length and step count as a proxy
- [ ] File does NOT already exist in the question bank (deduplication check)

## Step 8 — Commit conventions

Group commits by batch of ~25–50 questions. Use a message like:

```
Add SOA Exam P sample questions NNN–MMM

Questions from SOA official sample question set (last revised <date>).
```

Do not include the SOA revision date in filenames or frontmatter — only in the
commit message.

## Parallelizing large batches

SOA Exam P has 200–250 sample questions; FM has ~188. Splitting into parallel
subagents speeds this up significantly. Recommended split:

1. Do a **pilot batch** of 5–10 questions first and ask the user to review topic/LO
   choices before scaling up — these choices set precedent for the rest of the set.
2. Split the remaining questions into groups of ~30 questions per subagent.
3. Give each subagent:
   - The extracted text for its question range (from `/tmp/questions_raw.txt`)
   - The extracted text for its solution range (from `/tmp/solutions_raw.txt`)
   - This SKILL.md
   - The skip-set of already-imported question numbers
   - The file-naming scheme and target directory
4. After all subagents finish, run a validation pass:

```bash
# Check all answers are A–E
grep -r "^answer:" questions/exam-p/ | grep -v '"[A-E]"'

# Check all wiki_links have matching Concepts pages
python3 -c "
import os, re, glob
for f in glob.glob('questions/exam-p/*.md'):
    content = open(f).read()
    for link in re.findall(r'  - Concepts/(.+)', content):
        concept = link.replace('+', ' ')
        if not os.path.exists(f'Concepts/{concept}.md'):
            print(f'{f}: missing Concepts/{concept}.md')
"

# Check for duplicate IDs
grep -r "^id:" questions/exam-p/ | sort | uniq -d
```

## Known gaps / follow-ups

- `scripts/standardize_questions.py` does cover `questions/exam-p/` and uses
  `ontology_map.py` for normalization — safe to run after adding new P questions.
  Run `python3 scripts/standardize_questions.py` then
  `python3 scripts/update_wiki_links.py` to backfill any missing concept tags.
- The SOA may release revised versions of the sample question set over time. Check
  the revision date on the PDF footer. If importing a revision with changed question
  numbers, read the existing files carefully before overwriting — the SOA sometimes
  renumbers questions between revisions.
- For Exam FM, the same workflow applies but the question/solution structure may
  differ slightly (FM often has tables and annuity-factor lookups). The table-to-
  markdown conversion step is especially important.
