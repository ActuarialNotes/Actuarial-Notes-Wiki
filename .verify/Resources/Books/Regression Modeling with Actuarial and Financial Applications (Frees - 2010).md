---
target: Resources/Books/Regression Modeling with Actuarial and Financial Applications (Frees - 2010).md
created: 2026-10-31
---

## [F-001] Outline stops at chapter level though the syllabi assign by section
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T19:00Z/b6f9
- date: 2026-10-31
- severity: minor
- status: open
- locus: body, chapter outline (## Preface ... ## Index)
- claim: The page lists the parts and chapters only, with no sections under any chapter.
- evidence: The publisher's front matter (Cambridge, printed contents pp.vii-xi) prints every section, e.g. 2.1-2.11, 5.1-5.10, 9.1-9.6 ('9.5 ARCH/GARCH Models', p.285), 13.1-13.9. SRM (Jan 2027), PA (Oct 2026) and the ACIA Capstone syllabus assign Frees by section range (Ch.2 §1-8, Ch.9 §1-5, ...), so a candidate cannot see from the page which sections a range covers - for instance that SRM's Ch.5 §1-7 stops before 5.8-5.10, or that Ch.9 §1-5 includes ARCH/GARCH. docs/resource-pages.md's shape is the document's divisions with lists beneath. Every chapter and part heading on the page matches both the printed contents and Cambridge Core's contents listing; nothing on the page is wrong.
- source_rank: 2
- proposed_action: Transcribe the printed contents' section titles under each chapter heading (resource_extract.py on the front-matter PDF), as a separate edit checked against the same PDF.
- applied: false
- fingerprint: 9369a036a9ef

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T19:00Z/b6f9
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Built the outline from the source first: the publisher's printed contents (front matter) read before the page, then diffed - every part, chapter (1-21), the Brief Answers, three appendices and Index match the printed contents and Cambridge Core's contents listing (no conflict between the two; the book's PDF bookmarks were not available, the book being commercial). Frontmatter: title, author, publisher, ISBN 978-0-521-13596-2 (paperback) and 2010 (copyright and 'First published 2010') against the copyright page. Lead against the Cambridge description verbatim in substance. Syllabus scope: SRM bullet identical to the January 2027 SRM syllabus p.5, chapter by chapter and section by section; PA bullet and note identical to the October 2026 PA syllabus; ACIA Capstone bullet matches the CIA syllabus tables (alternate readings for A5.2 and A5.13). Every Sources URL fetched. Minor F-001 (no section lists under the chapters) left open for a transcription edit.
- sources_checked: Frees, Regression Modeling with Actuarial and Financial Applications (Cambridge, 2010), publisher's front matter, title page, copyright page (First published 2010; ISBN 978-0-521-76011-9 hardback, 978-0-521-13596-2 paperback; Library of Congress data) and printed contents pp.vii-xi, sha256:5ba2667a8ef934a28ca17bec157901c672026dbf2613d4c16afafc935df2d0ac — https://assets.cambridge.org/97805217/60119/frontmatter/9780521760119_frontmatter.pdf; Cambridge Core record, book description; formats, dates (hardback 30 November 2009), ISBNs, 584 pages; contents listing, sha256:64f01a27bf8e080787875688f537d9cff331210a79edae6f531bf33b8e1a083e — https://www.cambridge.org/core/books/regression-modeling-with-actuarial-and-financial-applications/25C768AB6FFE4FAD5F2AD725D8643C18; Frees, Book Resources - Regression Modeling (UW-Madison), Book Resources page: chapter titles; Chapters 1-2 posted free in full, first two web pages of Chapters 3-8 and 11-13, sha256:973fdd9c5d3bf9d6b52e3a6f0294fb7cac8301af9495ccde3854a71f9094442e — https://users.ssc.wisc.edu/~ewfrees/regression/book-resources/; SOA, Exam SRM syllabus, January 2027, Textbooks, p.5, sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf; SOA, Exam PA syllabus, October 2026, Frees citation, chapters and sections, and the note on Chapters 7-9, sha256:1f1c46424d78ac04c297bf6c121bf9d03aec7d451560335cc9e07c7c533a4d84 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-exam-pa-syllabus.pdf; CIA, Education Syllabus - ACIA Capstone Exam and Modules (last updated January 19, 2026), background reading tables pp.30-31: A5.2 (Frees as alternate reference 1: Ch.2 §1-8, 3 §1-5, 5 §1-7, 11 §1-6, 12 §1-4, 13 §1-6) and A5.13 (Frees Ch.6 §1-5), sha256:2a0fb1facb47c97a76ac956d86f0514bcb9e5459ecdc0a973bd3f6f155e3d291 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=608114&fid=627235
