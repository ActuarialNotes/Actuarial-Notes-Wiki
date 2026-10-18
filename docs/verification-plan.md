# Verification plan: the rest of the vault

How to get every concept, question, resource and exam page to a recorded fact check,
**ordered and batched by the source material that has to be read into context**. That
is where the cost is. A file is cheap to load; the 100-page examiner's report or the
450-page reading behind it is not.

Read `docs/verification.md` (the record and its five principles) and
`docs/validation-agent.md` (how a sweep runs) first. This doc says **how to group the work**:
the packets, the tooling that builds them, and what they cost. **What to run next** — the
waves, their status and order, and the decisions that block them — is in
`docs/content-plan.md` (§3.2, §4 and §6), which consolidated it with the other content plans
on 18 Oct 2026. This doc changes none of the rules: nothing reaches `verified` without a cited
source read in that run, and the log stays append-only.

> **Snapshot: 9 Oct 2026**, measured from the vault and from the source documents
> themselves (every past-paper PDF and every `Available from:` document was downloaded,
> page-counted and text-extracted for this plan). Refresh the status numbers with
> `python3 scripts/generate_validation_status.py` and the queue with
> `python3 scripts/verify_targets.py --by-source`. Re-derive the reading packets with
> `python3 scripts/verify_route.py --fetch` and a paper's packet with
> `python3 scripts/verify_paper.py build` (section 4).

## 1. The snapshot this method was sized on (9 Oct 2026)

> Historical: today's numbers are `docs/content-plan.md` §2.

**1,651 of 3,963 content files (41.7%) are verified.** Four campaigns produced almost all of
them. Each one was a sweep that recorded findings, then a resolve run that fixed them.

| Campaign | Runs | Result |
|---|---|---|
| Exam P | `bfa2` sweep, `919b` resolve | All 719 questions and the page's concepts and readings verified. 13 questions are now stale after a retag. |
| Exam FM | `aa33` sweep, `d7d3` resolve | 347 of 462 questions verified. **Q351–Q462 (112 questions) were added after the sweep** and have never been checked. |
| Exam MAS-I | `8861` sweep, `3707` resolve | All 389 files in scope verified. |
| Exam 9 syllabus page | `9a4a` | Verified, high. |
| Exam 6C syllabus page | `9495` | `in_review`, 8 open findings (2 major). |

What is left:

| Area | Total | Verified | Not verified | Of which |
|---|---:|---:|---:|---|
| Questions | 2,779 | 1,237 | **1,542** | 1,414 CAS past-paper questions (247 of them `off_syllabus`), 115 FM, 13 stale P |
| Concepts | 991 | 401 | **590** | 4 disputed (each with an open critical), 2 stale, 1 in review |
| Resources | 150 | 10 | **140** | 127 Books (96 with a free document, 25 commercial, 6 with no link), 13 timeline pages |
| Exam pages | 43 | 3 | **40** | 29 SOA pages with an extracted, hashed syllabus JSON; 9 CAS pages; P stale; 6C in review |
| **Total** | **3,963** | **1,651** | **2,312** | |

There are also **72 open findings on 46 files**: 4 critical, 22 major, 39 minor and 7 nit.
8 of them are on Exam 6C's syllabus page. Almost all the rest are on Exam 5 concept pages
from early runs.

## 2. The rule this plan is built on: one document, one load

The P and FM runs already proved where the money goes. P's first wave spent about **650k
tokens per question** because every agent re-fetched and re-read its own sources. Batching
the reads cut that to about 90k. FM then built shared tooling (a blind-stem printer, the
SOA text keyed by question with page ranges, a token stem diff, a link check, a batch
recorder) and got to about **12.5k per question**. That is a 50× drop, and almost all of
it came from **not putting the same source into context twice**.

None of that tooling was committed at the time. Wave 0 (section 4) rebuilt it as scripts.
The rest of the plan follows from four rules:

1. **Batch by source, not by folder or alphabet.** A work packet is one source document
   plus every vault file that document can verify. That means one past paper and its
   questions, wherever they are filed, or one reading and its concepts *and* its resource
   page. The document is fetched, hashed and extracted once. Every file checked against it
   cites the same sha256.
2. **Route each file to the pages it needs.** A concept checked against a 450-page reading
   needs the chapter that defines it, not the book. A question needs its own pages of the
   paper. Routing is mechanical (section 4) and costs nothing.
3. **Mechanical first; the model reads only the residue.** This is the same rule as the
   PDF→question pipeline: *nothing a PDF prints is ever retyped by a model*. A stem that
   diffs clean against the paper's text needs no page image. A syllabus page whose JSON
   hash still matches the publisher's PDF needs no re-reading. The model is spent only on
   diffs, recomputation and judgment.
4. **The sweep and the resolve share a load.** Every campaign so far found about 0.5
   findings per file, then needed a second run that fetched the same sources again to fix
   them. Where a packet's fixes are transcriptions, apply them in the same session
   (`--applied`, then a resolution) while the source is still in context. Leave only
   genuine judgment calls for a later resolve.

## 3. What has to be read: the source inventory

### Past papers: 53 documents for 1,414 CAS questions

Every remaining CAS question comes from one of 53 examiner's reports already transcribed in
`quiz/src/data/examPdfLinks.ts`. They total 4,901 pages. A typical Exam 5, 6C, 7, 8 or 9
report runs 80–110 pages:

- **The first ~30 pages are the original question booklet, scanned, with no text layer.**
  They're images: about 30 per paper, 1,620 across the set. (A few papers, such as the
  Spring 2017 ones, have a text layer on the booklet too.)
- **The rest is the examiner's report and sample answers**, as text, about 20–35k tokens a
  paper.

So the stems, which are what a transcription error would be in, sit on the expensive pages.
**The three MAS-II papers are scanned from cover to cover** (163 image pages, no text layer at
all).

A paper is the packet, and it has to be keyed by **paper, not bank**. Exam 9's bank holds 98
questions that CAS set on Exam 7 and Exam 8 papers (`originally_exam`). They belong in the
Exam 7 Spring and Exam 8 Fall packets for their year, because that is the document they're
checked against.

| Exam | Papers | Questions (on-syllabus / off) | Notes |
|---|---:|---:|---|
| Exam 5 | 14 | 349 / 0 | **Spring 2018's link is the examiner's report alone**: 30 pages, with no booklet. The original exam needs finding first. Exam 5 is also the regression suite: a sweep has to re-find the known transcription errors (`docs/validation-agent.md`, "Bootstrapping"). |
| Exam 6C | 13 | 321 / 73 | The off-syllabus questions are pre-IFRS 17 valuation, BCAR and U.S. regulation. |
| Exam 7 | 8 | 182 / 18 | Spring 2012–2019, including 64 questions filed in `exam-9`. |
| Exam 8 | 8 | 166 / 7 | Fall 2012–2019, including 34 questions filed in `exam-9`. |
| Exam 9 | 7 | 23 / 149 | Exam 9's own Spring 2013–2019 papers. Most of their syllabus is gone. |
| Exam MAS-II | 3 | 126 / 0 | Entirely scanned. |
| **Total** | **53** | **1,167 / 247** | |

**Exam FM Q351–Q462** need one document, the SOA FM sample questions and solutions. The
FM sweep already fetched and hashed it, so this is the cheapest question packet in the
vault.

**Off-syllabus questions ride in their paper's packet.** They are out of quiz draws, so on
their own they would come last. But the paper is already in context, so checking them at
the same time costs only their own explanation work. Splitting them off would mean loading
the paper a second time.

### Readings: what the 590 concept pages are checked against

Every free document a resource page links (`Available from:`) was fetched. There are 101: 64
PDFs with 3,957 pages and about 2.2M tokens of text, 33 HTML pages, and 4 others. Then each
unverified concept page was matched to the reading that discusses it (method in section 4):

| Routing result | Concepts | What it means |
|---|---:|---|
| **Found in a free reading** | **267** | The concept's name or an alias appears in a free reading assigned to one of its syllabus tasks, and the page numbers are known. Covered by **41 reading packets** (below). |
| Readings are closed or have no vault page | 215 | The candidate readings are commercial textbooks (MAS-II's Cowpertwait and West; ALTAM's Dickson; FAM's and SRM's texts) or have no `Resources/Books` page and so no URL in the vault (44 of Exam 6U's 46 readings, 10 of Exam 8's 12, and almost every FSA reading). |
| Candidate readings never name it | 62 | Either the page is named differently from the source (add an alias) or it describes something the assigned readings don't cover. Triage this before verifying anything. |
| No exam links the page | 46 | Orphan pages. Delete, merge or link them; don't verify them first. |

The 41 reading packets are top-heavy. **Eight readings cover 204 of the 267 routed
concepts:**

| Reading | Concepts | Size | Its own resource page |
|---|---:|---|---|
| CAS Financial Reporting (Exam 6C) | 75 | 450 pp, ~270k tok | unverified |
| Basic Ratemaking (Werner & Modlin) | 55 | 423 pp, ~250k tok | stale |
| CIA IFRS 17 – LRC | 20 | 51 pp, ~30k tok | unverified |
| Generalized Linear Models for Insurance Rating (Goldburd et al.) | 13 | 122 pp, ~75k tok | unverified |
| Alberta Auto Reform | 12 | 536 pp, 78 scanned | unverified |
| Using the ODP Bootstrap Model (Shapland) | 12 | 126 pp, ~65k tok | unverified |
| Basics of Reinsurance Pricing (Clark) | 9 | 52 pp, ~25k tok | unverified |
| Estimating Unpaid Claims Using Basic Techniques (Friedland) | 8 | 451 pp, ~280k tok | unverified |

Two consequences:

- **The resource page rides in its reading's packet.** A resource page's own check reads the
  same document: its structure, contents and syllabus scope. So the concept packet for
  *Basic Ratemaking* also re-verifies the stale *Basic Ratemaking* page, and so on for all
  41. That clears 41 of the 127 Books pages at the margin.
- **No packet reads its whole book.** The routing records the pages each concept is named
  on. A packet reads the book's outline (`resource_extract.py`), then only the chapters its
  concepts fall in. *Basic Ratemaking*'s 55 concepts sit on 348 of its 423 pages, so that
  packet splits by chapter group into 4–5 sessions. A small reading such as Clark at 52
  pages is read whole.

### Syllabus outlines: 40 exam pages

- **29 SOA pages are almost free to verify.** `syllabus_write.py` generated them from
  `.syllabus/<id>/syllabus.json`. Each JSON keeps its PDF's URL and sha256, and
  `syllabus_lint.py` already holds the page to the JSON word for word. Verifying one means
  re-fetching the PDF, confirming the sha256 still matches (if it doesn't, SOA has
  re-issued it and the page is regenerated, not verified), running the lint, and checking
  that the sitting is still the current one. No model has to read the syllabus.
- **9 CAS pages** (5, 6U, 7, 8, MAS-II, PCPA and the three DISCs) are hand-made. Each
  needs its content outline read against it, which is one PDF of 5–15 pages per exam. The
  6C, 9 and MAS-I runs are the template. **P** is stale, and needs only a delta check
  (Wave 1, `docs/content-plan.md` Appendix B).

### Gaps no fact check can get past

- **Missing source pages.** 44 of Exam 6U's readings, 10 of Exam 8's and nearly every FSA
  reading have no `Resources/Books` page, so there is no URL in the vault to fetch. Write
  these through the resource pipeline (`docs/resource-pages.md`) before those concepts'
  packets run. Otherwise each concept agent goes looking for the document itself, and that
  is the most expensive way to find it.
- **Commercial textbooks** (25 Books pages, and the concepts that rest only on them) can be
  checked against the publisher's table of contents (the `textbook-toc` skill) and open
  rank-3 references, nothing more. MAS-I set the precedent: verify at **medium** at most,
  and say why in the pass note.

## 4. Wave 0: the packet tooling (built)

Each piece is a small stdlib-first script beside the other `verify_*.py`, tested in
`scripts/test_verify_wave0.py` with no network, PyMuPDF or Tesseract (CI has none of the
three). Point the cache somewhere for the session first: the hook sets
`VERIFY_SOURCE_CACHE`, and without it the cache is `<tmp>/verify-sources`.

1. **`verify_sources.py`: the shared source cache.** `fetch <url>` downloads a document
   once, records its sha256, page count and outline, and writes every page's text into
   the cache outside the repo, keyed by URL. Scanned pages are OCR'd when Tesseract is
   installed, and `meta.json` lists them (`ocr_pages`), plus any page left with no text
   (`image_pages`). `text --pages`, `search`, `render --pages` and `cite --locator` read
   from the cache. The last prints the `--source` line a pass records, digest and URL
   included.
2. **OCR for scanned booklets.** `.claude/hooks/session-start.sh` (cloud sessions only)
   installs PyMuPDF and `tesseract-ocr` and sets the cache variable. It is synchronous, so
   both are in place before a session's first command. OCR of a 30-page booklet takes about
   45 seconds of CPU, once per paper.
3. **`verify_paper.py`: one past paper as a packet.**
   - `list` shows every paper with what is left on it.
   - `build --exam "Exam 5" --year 2019 --session Fall` writes the packet. Its members
     are every question sat on that paper, across banks via `originally_exam`.
   - The report side (points, parts, sample answers, examiner's report, an MC key) comes
     from `pdf_extract.py`, run once and cached.
   - Each stem is **located** in the OCR'd booklet by its own tokens. It is not taken from
     the converter's alignment, which misplaces prompts on a scan. Then it is diffed
     against the page it lands on and given a verdict: `clean`, `check` or `diverges`.
   - The output is `blind/<n>.md`, the stem alone for the recompute-first rule, and
     `source/<n>.md`, holding the diff, the mechanical leads (points, parts, key,
     options), the paper's prompt and the report. `packet.md` is one row per question.
   - `--soa fm --questions … --solutions … --ids 351-462` does the same for an SOA
     sample set.
4. **`verify_route.py`: concept → reading → pages.**
   - Routing goes from task codes to readings, then a search of the cached readings for
     each concept's name and aliases.
   - The result is a greedy set cover of reading packets, each concept with its *focus*
     pages (the few that name it most).
   - `--fetch` fills the cache. `--packet "<reading>"` prints one packet for an agent.
     `--json` writes the routing that `verify_targets.py --routes` reads.
5. **`verify_record.py batch ops.json`: a packet recorded at once.**
   - The file is a list of `finding` / `resolution` / `comment` / `pass` operations, each
     with the same keys as the command's flags.
   - Every operation is parsed before any is written, so a typo stops the batch with
     nothing recorded.
   - The P1 refusals still apply one operation at a time.
6. **`verify_targets.py --by-source [--routes routes.json]`.**
   - The same priority bands, emitted as packets: a paper, a reading with its concepts and
     its resource page, one resource's document, the generated SOA syllabus pages as one
     packet, or one hand-made syllabus page.
   - Each packet ranks by its most urgent file, then by how many files one load clears.
   - The weekly sweep prints this view beside the file list; its agent still takes files.

**Measured on real packets** (9 Oct 2026):

| Packet | Files | Build time | Stems | Mechanical leads |
|---|---:|---|---|---:|
| Exam 5 Fall 2019 (scanned booklet) | 25 | 48 s fetch + OCR once, then 14 s | 13 clean, 8 check, 4 diverging | 0 |
| SOA FM sample questions Q351–Q462 | 112 | 57 s | 111 clean, 1 check | 5 |
| Concept routing, whole vault | 590 | 6 min with `--fetch`, 2 min cached | 269 routed, 209 closed, 64 unnamed, 48 unlinked | — |

On Exam 5 Fall 2019 a pass reads page images for 12 questions, not all 25, and for each
one only the page the locator found. Of the 4 that diverge, 3 describe a chart in prose
(Q10, Q11, Q23) and one carries an editorial note (Q20). Both need the page read. A
`check` is usually an OCR slip: Q1's one "missing" number, 125, is on its page.

The FM sample set's five leads are formula options. The PDF's text layer garbles their
order across letters, so those five are read from the page too. The routing reproduces
the plan's prototype figures within a few concepts. A reading packet now names pages:
*Basics of Reinsurance Pricing* covers 12 concepts on 22 of its 52 pages, *Clash Cover*
on page 22 alone.

## 5. The packet procedure

The waves — what is run in which order, and how far each has got — are
`docs/content-plan.md` §3.2 and §4; Wave 1's record is its Appendix B. Every packet, in any
wave, follows the same steps.

1. **Load the source once.** Fetch it into the cache (`verify_sources.py`), then cite its
   sha256 in every pass.
2. **Do the mechanical work** before reading any vault file:
   - for a paper: segment it, OCR it, print blind stems and diffs;
   - for a reading: route its concepts to page ranges;
   - in either case: link check, schema check, `syllabus_lint` or `resource_lint`.
3. **Then the model's work, file by file:**
   - Recompute each question from its blind stem. Then compare it with the key and the
     examiner's report, then read the diff, and the page image if the diff calls for it.
   - Check each concept against the pages routed to it.
   - Check the resource page against the document's outline and the exam's outline.
4. **Record the whole packet in one batch write.** Apply transcription fixes `--applied`
   and resolve them in the same session. Leave judgment calls open for the campaign's
   resolve run.

## 6. Sizing and cost

Calibrated on the P, FM and MAS-I runs. These are planning numbers, not promises.

- **A paper packet** is about 25 questions. Its source load is about 25k tokens of report
  text. Its stems add about 45k tokens if all ~30 booklet images are read, or about 5–8k if
  OCR leaves 3–5 questions to look at. The vault side is 25–45k tokens of question files. That
  fits one agent comfortably, so use **one agent per paper**.
- **CAS questions cost more than SOA ones.** Most are written-answer, multi-part questions
  whose key is the sample answers. Budget **2–3× FM's 12.5k tokens per question**, about
  30k, with the tooling. Without it, P's first wave was 20× worse.
- **A reading packet** is the routed chapters plus its concepts. FM's concept batches ran
  about 180k tokens per ~12 concepts. Split any reading whose concepts span more than about
  150 routed pages (CAS Financial Reporting, Werner, Friedland, Alberta Auto Reform) by
  chapter group.

| | Files | Rough budget with Wave 0 tooling |
|---|---:|---|
| Questions (53 papers + FM) | 1,542 | ~35–45M tokens, including the resolve runs |
| Concepts | 590 | ~10–14M |
| Resources | 140 | ~4–6M, about 40% of them inside concept packets |
| Exam pages | 40 | <1M |

The order of magnitude is what matters. Without Wave 0, the same work at P's first-wave rate
would cost several times this.

## 7. Decisions only a maintainer can make

Moved to the content decisions in `docs/content-plan.md` §6 (roadmap D6–D9, D20): the
disputed criticals (settled in Wave 1), 6C's F-001, the off-syllabus questions, the orphan
concepts, missing reading pages (settled: write them first) and the commercial-source ceiling.
