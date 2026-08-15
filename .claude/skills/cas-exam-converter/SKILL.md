---
name: cas-exam-converter
description: Convert a CAS "Sample Answers and Examiner's Report" PDF (Exam 5/6/7/8/9, etc.) into per-question markdown files for the questions/<exam-id>/ bank used by the quiz app. Use when the user provides a CAS exam PDF (question booklet + examiner's report, combined or separate) and asks to add, convert, or import exam questions into the wiki.
---

# CAS Examiner's Report → Question Bank Converter

Converts a CAS released exam (question booklet + "Sample Answers and Examiner's
Report") into one markdown file per question under `questions/exam-<N>/`,
matching the schema documented in `CLAUDE.md` and exemplified by
`questions/exam-5/cas5-2018-001.md`.

## What you're given

Usually a single PDF combining two very different sections:

1. **Question booklet** (early pages, often the majority of the page count for
   the cover/instructions but only ~1 page per question) — almost always
   **scanned images**, not extractable text. `page.get_text()` returns `""`
   for these pages even though `page.get_images()` is non-empty.
2. **"EXAM <N> <SEASON> <YEAR> – SAMPLE ANSWERS AND EXAMINER'S REPORT"**
   (later pages) — normal extractable text, structured per-question as:
   ```
   QUESTION <N>
   TOTAL POINT VALUE: <points>
   LEARNING OBJECTIVE(S): <codes, e.g. A3, B12>
   SAMPLE ANSWERS
   Part a: <points> point(s)
   Sample 1
   ...
   Sample 2
   ...
   Part b: <points> point...
   ...
   EXAMINER'S REPORT
   <overall commentary>
   Part a
   <per-part commentary on what was expected / common mistakes>
   Part b
   ...
   ```

Sometimes the question text and the examiner's report arrive as two separate
PDFs — the workflow below still applies, just skip the "which pages are
scanned" detection.

## Step 0 — Set up PDF extraction

The sandbox usually does **not** have `pdftoppm`/`poppler-utils`, so the
`Read` tool's built-in PDF page rendering fails (`pdftoppm is not installed`).
Use Python + PyMuPDF instead — `pip install pymupdf` if the import fails
(`pypdf` tends to break on `_cffi_backend`/cryptography in this sandbox; avoid
it). Import it as `pymupdf`, not `fitz` — the `fitz` alias still works but
prints a deprecation warning on every run.

Write the rendered pages and the text dump into your **scratchpad directory**
(the session-specific path in your system prompt), not `/tmp`.

```python
import pymupdf
doc = pymupdf.open("/path/to/exam.pdf")

# 1. Find which pages are scanned (question booklet) vs text (examiner's report)
for i, page in enumerate(doc):
    text = page.get_text()
    print(i + 1, len(text), len(page.get_images()))

# 2. Render scanned pages to PNG for vision transcription
for i in range(START, END):  # 0-indexed scanned-page range
    doc[i].get_pixmap(dpi=150).save(f"pages/p{i+1:02d}.png")

# 3. Dump all examiner's-report text to one file for grep/reference
with open("examiner_report.txt", "w") as out:
    for i in range(REPORT_START, len(doc)):
        out.write(f"\n===== PDF PAGE {i+1} =====\n")
        out.write(doc[i].get_text())
```

Then `Read` the rendered PNGs (vision) for booklet pages, and `Read`/`Grep`
the dumped text file for the examiner's report.

The uploaded-file system note can under-report the page count badly (a
92-page PDF was announced as "22 pages"). Trust `doc.page_count`, and check
whether the PDF really holds the number of exams the user said it does before
starting — a user asking to "convert these two exams" may have attached only
one of them.

## Step 1 — Identify exam metadata

From the examiner's report header (e.g. `EXAM 5 SPRING 2019 – SAMPLE ANSWERS
AND EXAMINER'S REPORT`) and the booklet cover page, extract:

- **Exam number** → determines `questions/exam-<N>/` and the `cas<N>-` id prefix.
- **Sitting season + year** (e.g. Spring 2019) → use the **sitting year** for
  the `year` frontmatter field and the id, *not* any calendar year that
  happens to appear inside a question's data (e.g. a question can be "Spring
  2019" but reference "CY 2018" data — use 2019).
- **CAS exams are often given twice a year** (Spring/Fall). Check
  `questions/exam-<N>/` for existing files from that year first:
  `ls questions/exam-5/ | sed 's/-[0-9]*\.md//' | sort -u`.
  - If files for that year already exist, **read one of their frontmatter
    blocks** to see which sitting they hold — the filename may not say. The
    bank currently mixes conventions: `cas5-2013s-*`/`cas5-2013f-*` carry the
    season in the id, while `cas5-2018-*` is *Spring* 2018 with no suffix.
  - Add the new sitting under a suffixed id (`cas5-2018f-*`) rather than
    renaming the existing unsuffixed files — the asymmetry is cosmetic, and
    the app keys sittings off the `year`/`session` frontmatter, not the
    filename.
- **Always set the `session` field** (`Spring` or `Fall`) in frontmatter.
  Every existing exam-5 file has it, and `quiz/src/lib/pastExams.ts` groups
  the bank into sittings by `year` + `session` for the Mock Exam past-paper
  browser. A file missing `session` lands in the wrong shelf entry.
- `quiz/src/data/pastExams.ts` already lists every released CAS sitting, so
  importing a paper normally needs **no edit there** — check whether the
  sitting is in `PAST_EXAM_SITTINGS` and only add it if it's missing.

## Step 2 — Map the document structure

**Start with the booklet's point-value table.** The last page of the question
booklet is a `POINT VALUE OF QUESTIONS` grid: one row per question, the total,
and the sub-part split (a)–(g), plus the exam total. Transcribe it first —
it is the authoritative point map for the whole conversion and lets you check
every file mechanically at the end. It is also the tie-breaker when the
examiner's report disagrees: the Fall 2018 report header said
`QUESTION: 12 / TOTAL POINT VALUE: 2` while both the grid and the report's own
part breakdown (1.5 + 0.5 + 0.5) said **2.5**. Trust the grid and the part
sum, not the header.

Then build a small table (in your head or scratch notes) of, for each
question N:

- Total point value and per-part point breakdown (`Part a: X point(s)`, etc.)
- `LEARNING OBJECTIVE(S)` code(s) (informational only — CAS LO numbering
  shifts between syllabus years, don't rely on it for `learning_objective`;
  see Step 5)
- The PDF page range in the booklet containing the question's prompt/exhibits
- The PDF page range in the examiner's report containing its sample answers
  and examiner's report commentary

To find the report's per-question boundaries, grep case-insensitively and
allow a colon — the headers are not consistently formatted (`QUESTION 5`,
`Question 6`, `QUESTION: 12` all appear in one document), so a plain
`grep "^QUESTION"` silently skips questions:

```
grep -n -iE "^(=====|QUESTION:? *[0-9]|TOTAL POINT VALUE)" examiner_report.txt
```

Booklet pages map to questions at a fixed offset (cover + instructions
first), typically one page per question — e.g. Fall 2018 ran cover on p1–3,
Q1 on p4 … Q24 on p27, point-value grid on p28. Confirm the offset on the
first two questions rather than assuming it.

## Step 3 — Transcribe the question prompt (vision)

`Read` the rendered PNG(s) for the question's booklet pages. Transcribe:

- The exact prompt wording, all parts (a, b, c, ...) and their point values
- Any tables/exhibits as GitHub-flavored markdown tables (preserve all rows/
  columns exactly — these are usually the crux of the calculation)
- Bullet-point assumptions ("All policies are semi-annual.", etc.) as a
  markdown bullet list, placed before the lettered parts
- Numbers, dates, and currency exactly as printed

Don't transcribe page furniture ("CONTINUED ON NEXT PAGE", page numbers,
"EXAM 5, SPRING 2019" headers).

**Exhibits that aren't tables.** Some questions hand the candidate a *chart*
rather than a table — Fall 2018 Q9 gave two GLM diagnostic plots (indicated
relativity with standard-error bounds against exposure volume, then the same
relativities split by data year for the consistency test). These can't be
transcribed as a markdown table. Write an italicised caption naming what the
chart plots, then describe the features the question actually turns on, in
enough detail that the parts are answerable from the description alone: which
levels sit near 1.0, where the error bounds straddle the reference line,
where exposure is thin, and where the year-by-year lines diverge. Flag these
to the user at the end — extracting the figure into `Media/` and embedding it
is the better long-term fix, and that's their call.

## Step 4 — Parse sample answers + examiner's report

For each part:

- **`### Answer`** — the final numeric/short result. Omit this section
  entirely for open-ended/descriptive parts that don't have a single correct
  numeric answer (e.g. "identify and evaluate..." — see Part e of
  `cas5-2018-001.md`).
- **`### Explanation`** — a clean walkthrough of the calculation, based on
  the clearest "Sample N" answer (often Sample 1, or a tabular Sample if it's
  more legible). Reformat into prose + `$$...$$` display math / `$...$`
  inline math — don't just paste the raw OCR'd sample. If a second sample
  shows a meaningfully different valid approach, add a short `Alternatively:`
  paragraph with its formula (see Parts b/c of `cas5-2018-001.md`).
  For descriptive parts, synthesize a model answer covering the
  criteria/points the examiner's report says were expected.
- **`### Examiner Report`** — 1-2 short paragraphs distilling "what
  candidates were expected to do" and "common mistakes", from the
  `EXAMINER'S REPORT` → `Part X` section. Don't copy verbatim; tighten into
  the same style as the existing example (declarative, no "candidates
  should/were expected to" repeated every sentence redundantly — but that
  phrasing is fine, just keep it tight).

## Step 5 — Determine frontmatter

```yaml
---
id: "cas<N>-<sitting-year><season?>-q<Q>" # e.g. "cas5-2019-q2", "cas5-2018f-q2"
exam: "Exam <N>"                          # e.g. "Exam 5"
topic: "<Most specific Concepts page>"    # e.g. "Exposure Base"
learning_objective: "<Broader grouping>"  # e.g. "Ratemaking"
difficulty: easy|medium|hard
type: multi-part                          # exam 5/6/7/8/9 essay/calc questions
year: <sitting-year>                      # e.g. 2019 — NOT a data year inside the question
session: Spring|Fall                      # required — see Step 1
wiki_link:
  - Concepts/<Topic+With+Pluses>
  - Concepts/<Other+Relevant+Concept>
points: <total point value across all parts>
---
```

- **`topic`**: the single `Concepts/*.md` page that best matches the
  question's core technique (e.g. "Exposure Base", "Bornhuetter-Ferguson
  Method", "Trended On-Level Premium"). `ls Concepts/ | grep -i <keyword>`
  first — reuse an existing page name verbatim. Only propose a new
  `Concepts/*.md` page if nothing close exists, and keep new pages short
  (intro paragraph + bullets + `> [!example]-` callout, matching the style of
  `Concepts/Ratemaking Data Organization.md`); per `CLAUDE.md`, flag
  newly-created concept content to the user for review rather than treating
  it as final.
- **`learning_objective`**: a *broader* grouping than `topic`. Don't try to
  map the raw `A1`/`B12` codes from the PDF directly — they're
  syllabus-year-specific. Match what the bank already uses instead:

  ```
  grep -h "^learning_objective:" questions/exam-5/*.md | sort | uniq -c | sort -rn
  grep -h "^topic:" questions/exam-5/*.md | sort | uniq -c | sort -rn
  ```

  For Exam 5 the dominant values are the two syllabus halves, `"Ratemaking"`
  and `"Reserving"`, which is the split the CAS `A*`/`B*` LO codes themselves
  follow — so the codes are a reliable *hint* for which half a question
  belongs to, even though the numbers aren't usable. Consistency across
  questions on the same topic matters more than granularity.
- **`wiki_link`**: 2-4 `Concepts/<Name>` entries (spaces → `+`), covering the
  `topic` plus any other concepts the question meaningfully exercises (as in
  the example: `Exposure Base`, `Earned Exposure`, `In-Force`). Every entry
  must be an **existing** `Concepts/*.md` filename — unlike `topic`, which is
  a free-text label. It's easy to slip a plausible-sounding page in here that
  doesn't exist ("Large Deductible" is a real `topic` in the bank but there is
  no such concept page; the deductible pages are `Deductible`,
  `Deductible Rating`, `Deductible Recovery`). The Step 7 script catches this.
- **`difficulty`**: heuristic — `easy` for single-step recall/lookup parts
  dominating the question, `medium` for standard multi-step calculations,
  `hard` for questions requiring judgment across many interacting pieces or
  unusually low pass rates on that question (check the examiner's report —
  CAS sometimes notes a question was a major differentiator).
- **`points`**: sum of all part point values (should equal `TOTAL POINT
  VALUE` from the PDF).

## Step 6 — Write the file

Path: `questions/exam-<N>/cas<N>-<year>-<QQQ>.md` where `<QQQ>` is the
question number zero-padded to 3 digits (matches the exam's question number,
e.g. question 2 → `cas5-2019-002.md`, id `cas5-2019-q2`).

Body structure (see `questions/exam-5/cas5-2018-001.md` for a full worked
example):

```markdown
<question prompt, assumptions, exhibits as markdown tables>

## Part a (<points> points)

<part a prompt text>

### Answer
<final answer>

### Explanation
<worked solution with $$...$$ / $...$ LaTeX>

### Examiner Report
<what was expected / common mistakes>

## Part b (<points> points)
...
```

For a part with no clean numeric answer, omit `### Answer` and go straight
from the prompt to `### Explanation`.

## Step 7 — Quality checklist (per file)

- [ ] Frontmatter `points` total matches the booklet's point-value grid and
      each part's points sum to it
- [ ] `id` and filename use the **sitting year**, not an in-question data year
- [ ] `session` is set, and matches the sitting
- [ ] All tables/exhibits from the booklet are reproduced accurately
- [ ] LaTeX renders correctly (`$$...$$` for display, `$...$` inline; no raw
      OCR artifacts like stray `‐` hyphens, smart quotes, or `½` glyphs —
      normalize to ASCII)
- [ ] `wiki_link` entries point to concept pages that actually exist (or are
      created as part of this change)
- [ ] `### Examiner Report` reflects the actual per-part commentary, not a
      generic restatement

Most of that is mechanical — run it over the whole sitting at once rather
than eyeballing 24 files. Fill `expected` from the booklet's point-value grid
(Step 2) so the grid, the frontmatter and the part headings are checked
against each other:

```python
import re, os, glob
expected = {1: 2.5, 2: 2.0, ...}          # from the POINT VALUE OF QUESTIONS grid
pattern  = 'questions/exam-5/cas5-2018f-*.md'
concepts = {os.path.splitext(f)[0] for f in os.listdir('Concepts')}

for f in sorted(glob.glob(pattern)):
    txt = open(f).read()
    fm, body = txt.split('---')[1], txt.split('---', 2)[2]
    n    = int(re.search(r'-(\d+)\.md', f).group(1))
    pts  = float(re.search(r'^points: (.+)$', fm, re.M).group(1))
    if pts != expected[n]:
        print('POINTS MISMATCH', f, pts, expected[n])
    parts = [float(p) for p in re.findall(r'^## Part [a-z] \(([\d.]+) points?\)', txt, re.M)]
    if abs(sum(parts) - pts) > 1e-9:
        print('PART SUM', f, parts, pts)
    for link in re.findall(r'^  - Concepts/(.+)$', fm, re.M):
        if link.replace('+', ' ') not in concepts:
            print('MISSING CONCEPT', f, link)
    for field in ('id exam topic learning_objective difficulty '
                  'type year session').split():
        if not re.search(rf'^{field}:', fm, re.M):
            print('MISSING FIELD', f, field)
    if body.count('$$') % 2:
        print('UNBALANCED $$', f)
    for ch in set(body):
        if ord(ch) > 127 and ch not in '≈−×→…—’“”≤':
            print('NON-ASCII', f, repr(ch))
```

`npm test` / `npm run build` in `quiz/` won't necessarily be available — a
fresh container often has no `quiz/node_modules`, and these are content files
the build *reads* rather than code. Don't install the whole toolchain just to
validate markdown; say plainly in your summary that the suite wasn't run.

## Parallelizing large exams

A full CAS exam is typically 20-30 multi-part questions — converting all of
them is a large job, but it is entirely doable in one session: a 24-question
sitting is roughly a dozen vision reads plus a dozen text reads if you work
in batches of 2-4 questions and commit every few files.

**Only fan out to subagents if the user asked for them** — some harnesses
forbid spawning agents unprompted, and this skill is not itself a licence to.
When they have asked, split the question range across parallel subagents
(e.g. 4-6 questions per agent), giving each agent:

- The rendered booklet PNGs and examiner's-report text excerpt for its
  question range
- This SKILL.md
- The frontmatter conventions above and a pointer to
  `questions/exam-5/cas5-2018-001.md` as the formatting reference
- The exam number/sitting year and file-naming scheme to use

Do a small batch (2-3 questions) first and have the user review before
running the rest, since `topic`/`learning_objective` choices set precedent
for the remaining questions in the same exam.

## Known gaps / follow-ups

- `scripts/standardize_questions.py` and `scripts/update_wiki_links.py`
  currently only cover `questions/exam-fm/` and `questions/exam-p/` (and have
  no Exam 5+ entries in `ontology_map.py`). Don't run them on new exam-5+
  files — they'll either no-op or fail on unmapped topics. If Exam 5+
  ontology coverage is wanted later, that's a separate scripted migration.
