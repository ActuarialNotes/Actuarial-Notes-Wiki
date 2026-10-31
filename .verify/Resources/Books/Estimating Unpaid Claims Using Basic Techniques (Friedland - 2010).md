---
target: Resources/Books/Estimating Unpaid Claims Using Basic Techniques (Friedland - 2010).md
created: 2026-10-31
---

## [C-001] Source-internal outline differences (not vault errors)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- locus: ## Part / ### chapter outline
- note: The PDF bookmark outline and the printed table of contents (PDF pp.7-8) disagree in three places, all inside the source: (1) the bookmarks have no entries for 'Introduction to Part 2/3/4', which the printed TOC lists (pp.27, 79, 369); (2) the bookmark for Appendix B reads 'Property/Casualty Unpaid Estimates' while the printed TOC and the appendix itself read 'Property/Casualty Unpaid Claim Estimates'; (3) the bookmarks carry 'List of Changes Implemented' (PDF p.450), which the printed TOC omits, and neither lists the Errata page (PDF p.451). The page follows the printed titles and includes all three, which is correct; logged so a later pass does not file them as vault errors.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:30Z/1f80
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: Outline built from the source first: printed TOC + bookmark outline + every 12pt bold section heading extracted from the PDF (Ch.1-17, Part intros), then compared to the page — every ### chapter and every section bullet matches a heading in the right chapter's page range (scripted attribution check), no section heading of the source is missing; Ch.17 sub-techniques (Classical, Kittel, Conger-Nolibos, Mango-Allen; Early count, Wendy Johnson, Mango-Allen claim staffing, Rahardjo, Spalla) found in order on PDF pp.393-412; full-text search of every named method/proper noun (Wiser, Conger and Nolibos 2003 title, DCC/A&O effective January 1, 1998, Pinto-Gogol not asserted) all found; frontmatter title/author/publisher/year against title page ('Version 3, July 30, 2010', (c) CAS 2010); syllabus callout diffed against CAS Exam 5 Fall 2026 content outline p.6 ('Third Version, July 2010. All chapters (the Appendices are excluded)', B1-B20) and Exam 5 page's Source Material; List of Changes and Errata bullets diffed against PDF pp.450-451; Available-from URL fetched (451 pp.).
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, July 30 2010), title page (PDF p.1), acknowledgments (PDF pp.5-6), printed TOC (PDF pp.7-8), bookmark outline, every chapter's section headings, Ch.1 pp.10-16 (PDF 16-22), Part 3 intro p.79 (PDF 85), Part 4 intro p.369 (PDF 375), Ch.16 p.370 (PDF 376), Ch.17 pp.386-387 (PDF 392-393), List of Changes (PDF p.450), Errata (PDF p.451), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; CAS Exam 5 Content Outline, Fall 2026 (v02 2026_09_15), Domain B tasks 1-20, pp.4-5; Complete Text References, p.6, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf
- note: Clean. Every heading, attribution, scope claim, frontmatter field, list of changes and the errata transcription agrees with the document and with the Fall 2026 content outline. Three outline differences internal to the source are logged as a comment.
