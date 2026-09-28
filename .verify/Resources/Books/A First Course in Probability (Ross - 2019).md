---
target: Resources/Books/A First Course in Probability (Ross - 2019).md
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
- claim: Sources names the SOA Exam P Syllabus, July 2026 as the source of the citation (Tenth Edition, 2019, ISBN 978-0134753119) and the assigned chapters and sections.
- evidence: The July 2026 syllabus at that URL still resolves (fetched 2026-09-27, sha256:d441d15582c7f77a783a012ef25c09f07b9c4bdcf781b8f667b589c59fb1e719) and its REFERENCES section is identical to the current sittings: a pymupdf text diff of July 2026 against November 2026 (sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397, https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf), September 2026 (sha256:a67f56f7ef60ff673730e28b6b6361168d0889683c78373f29a1ed38c1e5d7e3) and January 2027 (sha256:252d07fc2b3be499bdee55caaf40f5bd610c2d9593bee2f0428b6614d4e14e2a) differs only in the title line. The assigned scope on this page is therefore still correct; only the citation names a sitting that has passed.
- source_rank: 1
- proposed_action: Replace the July 2026 syllabus link in ## Sources with the November 2026 syllabus (https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf) or the January 2027 one, keeping the same note.
- applied: false
- fingerprint: 7ba6f9944328

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-27
- status_set: verified
- confidence: medium
- checks_run: On the syllabus callout diffed both ways against Nov 2026 REFERENCES; outline built from the fetched Contents pp. vii-ix before comparison and diffed mechanically (numbers + titles); chapter count corroborated by the Pearson product page; frontmatter vs title/copyright page and syllabus; lead vs Preface; Sources claims checked; Sep 2026 / Jan 2027 syllabus diff; resource_lint clean
- sources_checked: Ross, A First Course in Probability, Tenth Edition (Pearson, 2019), publisher front matter PDF pp. i-xii: title page p. iii, copyright page p. iv, Contents pp. vii-ix, Preface pp. x-xii; sha256:ad10c2e634a970e2a39042327927e09d4296924cb0189c1267450a0606a60fa6, https://www.pearsonhighered.com/assets/preface/0/1/3/4/0134753119.pdf; SOA Probability Exam syllabus, November 2026, REFERENCES pp. 5-6 (read from the page images), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397, https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Pearson product page, A First Course in Probability 10th ed., Table of contents (fetched 2026-09-27, sha256:e889adc70c0c2f935f8893ec2477851a28c173bf6eae11979b02ee686ce1bbd2), https://www.pearson.com/en-us/subject-catalog/p/first-course-in-probability-a/P200000006334; Open Library edition record ISBN 9780134753119 (title, publisher Pearson; sha256:64491156c9464563ed8344c32c7f25f915126d2bdeaa175bc3a2d324db972d9c), https://openlibrary.org/isbn/9780134753119.json
- note: Outline: all 109 numbered entries (10 chapters, sections, subsections) match the Contents in number, title and order, as do Preface, Answers to Selected Problems, Solutions to Self-Test Problems and Exercises, Index and the two inside-cover tables; the per-chapter Summary/Problems/Theoretical Exercises/Self-Test entries are omitted (end-of-chapter apparatus, not a divisional error). Syllabus callout matches the Nov 2026 box exactly (Ch 1-3; Ch 4 excl 4.8.4; Ch 5 excl 5.6.2, 5.6.3, 5.6.5, 5.7; Ch 6: 6.1, 6.2, 6.3.3, 6.3.4, 6.4, 6.6; Ch 7 discrete only excl 7.2.1, 7.2.2, 7.3, 7.6-7.9; Ch 8: 8.1, 8.3); every excluded/included section number exists in the Contents. Sep 2026, Nov 2026 and Jan 2027 syllabi differ only in the title line, so nothing rolls over in Jan 2027. Frontmatter: Title, Sheldon Ross, Tenth Edition, ISBN-13 978-0-13-475311-9 and Pearson match the title and copyright pages; Year 2019 = copyright (c) 2019 and the syllabus (the LoC CIP on p. iv reads Boston: Pearson, 2018 - a pre-publication record, not the edition year). Lead: every claim is in the Preface (audience and calculus prerequisite; Pareto 5.6.5, Poisson limit 8.5, Lorenz curve 8.7; NCAA Example 4n of Ch 3 and friendship paradox Example 5b of Ch 4). Conflicts inside the publisher sources, logged here, not vault errors: (1) Ch 3 is Conditional Probability and Independence in the printed Contents but ...and Inference on the product page - the page follows the printed Contents and already says so; (2) the printed Contents p. vii literally reads CONTINUOUS RANDOM ARIABLES for Ch 5 (verified on the rendered page image, a typesetting typo) while the product page reads Continuous Random Variables - the page uses the latter. Confidence capped at medium: the book body is not freely available, so the check is against its publisher front matter and TOC; the page makes no content claims beyond these.

## [F-001/R] Citation moved to the November 2026 syllabus
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Sources now cites the SOA Exam P Syllabus, November 2026 (November 2026 (7 pp.), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397, https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf), keeping the same note; its p.5 citation (Tenth Edition, 2019, ISBN 978- 0134753119) and chapter list match the page, and its text is identical to July 2026 bar the title.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after F-001: Sources syllabus line now names the November 2026 syllabus; its p.5 Ross citation and chapter list re-read against the callout (Ch 1-3; Ch 4 excl 4.8.4; Ch 5 excl 5.6.2, 5.6.3, 5.6.5, 5.7; Ch 6: 6.1, 6.2, 6.3.3, 6.3.4, 6.4, 6.6; Ch 7 discrete only excl 7.2.1, 7.2.2, 7.3, 7.6-7.9; Ch 8: 8.1, 8.3); rest unchanged since the 2026-09-27 pass; resource_lint
- sources_checked: Ross, A First Course in Probability, Tenth Edition (Pearson, 2019), publisher front matter PDF pp. i-xii: title page p. iii, copyright page p. iv, Contents pp. vii-ix, Preface pp. x-xii; sha256:ad10c2e634a970e2a39042327927e09d4296924cb0189c1267450a0606a60fa6, https://www.pearsonhighered.com/assets/preface/0/1/3/4/0134753119.pdf; SOA Probability Exam syllabus, November 2026 (7 pp.), REFERENCES p.5, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397, https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Pearson product page, A First Course in Probability 10th ed., Table of contents (fetched 2026-09-27, sha256:e889adc70c0c2f935f8893ec2477851a28c173bf6eae11979b02ee686ce1bbd2), https://www.pearson.com/en-us/subject-catalog/p/first-course-in-probability-a/P200000006334
