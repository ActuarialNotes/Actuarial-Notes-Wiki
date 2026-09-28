---
target: Resources/Books/Probability and Statistical Inference (Hogg - 2020).md
created: 2026-09-27
---

## [F-001] Sources cites a past sitting (July 2026) for the syllabus scope
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- severity: minor
- status: open
- locus: ## Sources, second entry
- claim: Sources names the SOA Exam P Syllabus, July 2026 as the source of the citation (Tenth Edition, 2020, ISBN 978-0135189399) and the assigned chapters and sections.
- evidence: The July 2026 syllabus at that URL still resolves (fetched 2026-09-27, sha256:d441d15582c7f77a783a012ef25c09f07b9c4bdcf781b8f667b589c59fb1e719) and its REFERENCES section is identical to the current sittings: a pymupdf text diff of July 2026 against November 2026 (sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397, https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf), September 2026 (sha256:a67f56f7ef60ff673730e28b6b6361168d0889683c78373f29a1ed38c1e5d7e3) and January 2027 (sha256:252d07fc2b3be499bdee55caaf40f5bd610c2d9593bee2f0428b6614d4e14e2a) differs only in the title line. The assigned scope on this page is therefore still correct; only the citation names a sitting that has passed.
- source_rank: 1
- proposed_action: Replace the July 2026 syllabus link in ## Sources with the November 2026 syllabus (https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf) or the January 2027 one, keeping the same note.
- applied: false
- fingerprint: 3ad49be2a8dd

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: medium
- checks_run: On the syllabus callout diffed both ways against Nov 2026 REFERENCES; outline built from the fetched Contents pp. iii-iv before comparison and diffed mechanically (numbers + titles + order); chapter count corroborated by the Pearson product page; frontmatter vs title/copyright page and syllabus; lead vs Preface; Sources claims checked; Sep 2026 / Jan 2027 syllabus diff; resource_lint clean
- sources_checked: Hogg, Tanis and Zimmerman, Probability and Statistical Inference, Tenth Edition (Pearson, 2020), publisher front matter PDF pp. i-x: title page p. i, copyright page p. ii, Contents pp. iii-iv, Preface pp. v-vii, Prologue pp. ix-x; sha256:5d8ccb44060dfb22382c31629d59432464788b62355437a33eba820c7aba4568, https://www.pearsonhighered.com/assets/preface/0/1/3/5/013518939X.pdf; SOA Probability Exam syllabus, November 2026, REFERENCES pp. 5-6 (read from the page images), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397, https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Pearson product page, Probability and Statistical Inference 10th ed., Table of contents (fetched 2026-09-27, sha256:28bdf23a08d2b70242925f20998e962897a600aa544babcc8fa9b882130f3392), https://www.pearson.com/en-us/subject-catalog/p/probability-and-statistical-inference/P200000006212; Open Library edition record ISBN 9780135189399 (title, publisher Pearson; sha256:aca8e31a0f6560079d51b55c6b5ea26547411d1130767394bb967979b2bb6e7f), https://openlibrary.org/isbn/9780135189399.json
- note: Outline: 9 chapters and all 66 numbered sections match the Contents in number, title and order; Preface, Prologue, Appendices A-D with D.1-D.6, and Index match; the Pearson product page TOC agrees section for section. Syllabus callout matches the Nov 2026 box exactly (Ch 1; Ch 2; Ch 3 excl Chi-Square; Ch 4 excl 4.4, 4.5; Ch 5: 5.3 discrete only, 5.5, 5.6, 5.7); every section named exists in the Contents (3.2 carries Chi-Square). Sep 2026, Nov 2026 and Jan 2027 syllabi differ only in the title line, so nothing rolls over in Jan 2027. Frontmatter: title, authors Robert V. Hogg, Elliot A. Tanis and Dale L. Zimmerman (title-page order), Tenth Edition and ISBN-13 978-0-13-518939-9 match the title and copyright pages; Year 2020 = copyright (c) 2020 and the syllabus (LoC CIP p. ii reads New York, NY: Pearson, 2018 - pre-publication record). Source conflict logged, not a vault error: the syllabus names the publisher Prentice Hall, while the book copyright page names only Pearson Education, Inc. (Hoboken, NJ) and its CIP and the Open Library record name Pearson; the page follows the book imprint, as docs/resource-pages.md 2.1 requires; no change made. Lead: every claim is in the Preface (two-semester course, good calculus background, no prior probability or statistics; first five chapters probability with the listed topics, remaining four inference; more than 25 new examples and 75 new exercises; new hypergeometric section; new section on hypothesis testing for variances). Confidence capped at medium: the book body is not freely available, so the check is against its publisher front matter and TOC; the page makes no content claims beyond these.

## [F-001/R] Citation moved to the November 2026 syllabus
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Sources now cites the SOA Exam P Syllabus, November 2026 (November 2026 (7 pp.), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397, https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf), keeping the same note; its p.6 citation (Tenth Edition, 2020, ISBN 978-0135189399) and chapter list match the page, and its text is identical to July 2026 bar the title.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after F-001: Sources syllabus line now names the November 2026 syllabus; its p.6 Hogg citation and chapter list re-read against the callout (Ch 1; Ch 2; Ch 3 excl Chi-Square; Ch 4 excl 4.4, 4.5; Ch 5: 5.3 discrete only, 5.5, 5.6, 5.7); rest unchanged since the 2026-09-27 pass; resource_lint
- sources_checked: Hogg, Tanis and Zimmerman, Probability and Statistical Inference, Tenth Edition (Pearson, 2020), publisher front matter PDF pp. i-x: title page p. i, copyright page p. ii, Contents pp. iii-iv, Preface pp. v-vii, Prologue pp. ix-x; sha256:5d8ccb44060dfb22382c31629d59432464788b62355437a33eba820c7aba4568, https://www.pearsonhighered.com/assets/preface/0/1/3/5/013518939X.pdf; SOA Probability Exam syllabus, November 2026 (7 pp.), REFERENCES p.6, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397, https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Pearson product page, Probability and Statistical Inference 10th ed., Table of contents (fetched 2026-09-27, sha256:28bdf23a08d2b70242925f20998e962897a600aa544babcc8fa9b882130f3392), https://www.pearson.com/en-us/subject-catalog/p/probability-and-statistical-inference/P200000006212
