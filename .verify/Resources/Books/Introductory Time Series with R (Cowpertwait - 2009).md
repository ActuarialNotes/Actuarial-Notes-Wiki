---
target: Resources/Books/Introductory Time Series with R (Cowpertwait - 2009).md
created: 2026-10-18
---

## [F-001] Sources cites the superseded 2025 MAS-II outline
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- severity: minor
- status: open
- locus: ## Sources, third entry
- claim: [CAS Exam MAS-II Content Outline (2025)](https://www.casact.org/sites/default/files/2023-06/MASII_Content_Outline.pdf) — the citation (Springer, 2009) and the assigned scope
- evidence: The CAS MAS-II exam page links only the 2026 Content Outline (see .verify/Exam MAS-II (CAS).md C-002). That outline, CAS, Exam MAS-II Content Outline 2026 (MASII_CO_S_2026), p.3 Domain D tasks 1-4 and p.4 Cowpertwait citation 'Chapters 1-5 (excluding Sections 3.3 and 3.4), 6, 7 (Sections 7.1, 7.2 and 7.3)', D1-D4, B, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf, p.4, gives the same citation 'Cowpertwait, P., and Metcalfe, A., Introductory Time Series with R, Springer, 2009' and the same scope the callout states, so only the link is stale.
- source_rank: 1
- proposed_action: Retarget the entry to the 2026 outline URL and label it (2026).
- applied: true
- fingerprint: 14e45ffd7b99

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Retargeted to https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf, labelled (2026); description unchanged (the 2026 outline p.4 carries both the citation and the scope). resource_lint: 0 errors, 0 warnings.

## [C-001] Conflict inside the source: preface vs contents on chapter summaries
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- locus: lead paragraph
- note: Preface p.viii: 'At the end of each chapter, a concise summary of the R commands that were used is given followed by exercises.' The page's lead says the same. The book's own contents (pp. xiv-xv, and the TOC scan p.7) give Chapter 10 'System Identification' only 10.7 Exercises, with no summary section. A conflict inside the source, logged here; not a vault error.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T16:16Z/09a7
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: Outline built from the source first: all 247 numbered headings (12 chapters) diffed mechanically against the publisher's printed Contents pp.ix-xv and against the independent library TOC scan; every difference is a ligature, line wrap or OCR artefact (e.g. scan 'Danieli' = Springer 'Daniell'), starred sections match, no omissions (References and Index are back matter). The PDF bookmark outline holds only Preface and Contents, so there is no conflict with it. Frontmatter: Title, Authors (Paul S.P. Cowpertwait, Andrew V. Metcalfe), Publisher Springer, Year/date 2009, ISBN 978-0-387-88697-8 against the title and copyright pages. Lead paragraph against the Preface pp.vii-viii (non-specialist, fairly quick pace, first-year university statistics course, the per-model format, starred sections that can be omitted, R summary + exercises) and Use R! against the series page. On-the-syllabus callout (D1-D4; Chapters 1-5 excluding 3.3 and 3.4, 6, 7.1-7.3) against the 2026 outline p.4 word for word. Sources: first entry (publisher front matter) read; second (Springer Nature Link record) blocked by a client challenge and not read - its claims are the same facts the front matter carries; third retargeted (F-001). Wiki links resolve; resource_lint clean.
- sources_checked: Cowpertwait & Metcalfe, Introductory Time Series with R (Springer, Use R!, 2009) — publisher's front matter PDF, pp. i-xv (series page; title page; copyright page: ISBN 978-0-387-88697-8, e-ISBN 978-0-387-88698-5, DOI 10.1007/978-0-387-88698-5, LCCN 2009928496, (c) Springer Science+Business Media 2009; Preface pp. vii-viii; Contents pp. ix-xv), sha256:28b9b56070d54f40aa6bd824670eea29de2f6478397c4c7ff05f5763977fb3c8 — https://link.springer.com/content/pdf/bfm:978-0-387-88698-5/1; Cowpertwait & Metcalfe, Introductory Time Series with R — back cover and contents, library TOC scan (obalkyknih.cz), PDF pp.1-8, sha256:64c8d1acd2d515e84acce255da1766a7b544603ad1096f40b2ed7949bc4d791c — https://obalkyknih.cz/file/toc/233741/pdf; CAS, Exam MAS-II Content Outline 2026 (MASII_CO_S_2026), p.3 Domain D tasks 1-4 and p.4 Cowpertwait citation 'Chapters 1-5 (excluding Sections 3.3 and 3.4), 6, 7 (Sections 7.1, 7.2 and 7.3)', D1-D4, B, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf
- note: Verified high: the page is a map of the document and both its document claims and its scope claim were read against the publisher's own front matter and the CAS outline (rank 1/2).
