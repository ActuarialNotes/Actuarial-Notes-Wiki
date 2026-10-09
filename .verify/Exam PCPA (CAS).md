---
target: Exam PCPA (CAS).md
created: 2026-10-09
---

## [F-001] Lead says the project uses 'a data set'; the outline says one or two
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: minor
- status: open
- locus: lead paragraph
- claim: Lead: the candidate builds a GLM 'on a data set provided by the CAS'.
- evidence: CAS PCPA Content Outline v.8 (updated 9.9.2026), sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f, p.2 'Project Administration Details': at the start of the project window candidates receive '• One or two data sets to explore and use in model construction'. The page fixed the count at one.
- source_rank: 1
- proposed_action: Change 'a data set' to 'one or two data sets'.
- applied: true
- fingerprint: 926d9853d140

## [F-002] De Jong and Heller scope reads 'the Appendix'; outline reads 'Appendix'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: nit
- status: open
- locus: ## Source Material, De Jong and Heller scope
- claim: Scope: 'Chapters 5, 6, 8 and related code in the Appendix'.
- evidence: CAS PCPA Content Outline v.8 (updated 9.9.2026), sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f, p.5 Text References: '(Chapters 5, 6, 8 and related code in Appendix)'. One extra word on the page; meaning unchanged.
- source_rank: 1
- proposed_action: Drop 'the' so the scope reads word for word.
- applied: true
- fingerprint: 88e15a6d25dd

## [F-003] Project weightings (30/30/40) absent from a page that presents PCPA as exam plus project
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- severity: minor
- status: open
- locus: ## Learning Objectives, domain weights
- claim: Domain callouts carry only {35%}, {35%}, {30%}, unlabelled, and the page gives no project weighting.
- evidence: CAS PCPA Content Outline v.8 (updated 9.9.2026), sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f, p.3 'Content Breakdown' table: Exam Weighting A 35%, B 35%, C 30%; Project Weighting (via the scoring rubric) A 30%, B 30%, C 40%. The page's figures are the exam column; the project column, in which Domain C carries the most weight, appears nowhere on the page although the lead describes the project as half the requirement. Not fixed: adding it means composing new page text.
- source_rank: 1
- proposed_action: Maintainer to decide whether to state the project weighting (A 30%, B 30%, C 40%) beside the exam weights, e.g. in the lead or domain headings.
- applied: false
- fingerprint: 37f7218742ec

## [C-001] Comment
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- locus: Domain A **Readings:** line
- note: Conflict inside the source, not a vault error: outline p.4 lists Domain A's readings as Gelman and Unwin, Grolemund and Wickham, McKinney only, while the p.5 Text References table assigns ASOP 23 and ASOP 56 to Domain A. The page's A Readings line (ASOP 23 · ASOP 56 · Gelman and Unwin · Grolemund and Wickham · McKinney) follows the table. Left as is; the p.4 list and the table agree once the ASOPs are counted, so no reading is mis-assigned.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Corrected in this change: the lead now reads 'on one or two data sets provided by the CAS', as outline v.8 p.2.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Corrected in this change: the scope now reads '(Chapters 5, 6, 8 and related code in Appendix)', word for word with outline v.8 p.5.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- status_set: verified
- confidence: high
- checks_run: Lead: two-part ACAS requirement, 2-hour exam (2.5-hour appointment), 40 questions, offered continuously year-round, prerequisite for the project, typically after MAS-I, MAS-II and 5 with foundational predictive-analytics knowledge assumed, brief technical report — all match outline pp.1-2; 'a data set' corrected to 'one or two data sets' (F-001). Domain titles and exam weights A 35, B 35, C 30 match p.3; project weights 30/30/40 not on the page (F-003). Every preamble and task, links stripped, is word for word with pp.3-4: tasks 4/2/3, numbering 1-n, both e.g. lists complete; nothing on pp.3-4 missing. Readings lines: B and C match p.4 in order; A adds ASOP 23 and 56, which the p.5 table assigns to A but p.4 omits (C-001, source-internal). Source Material: 13 bullets for the 13 citations on pp.5-6, title {13 Sources}; every domain matches the table (A1-A4 / B1-B2 / C1-C3 expand the table's domain letters to all their tasks); scopes Chapter 7, Chapters 5, 6, 8 and Appendix code (F-002 fixed), Fannin 6/15/18/19, Frees Chapter 6, Venables pp.172-176 all match; every link name's title, author and year agrees with its citation. Outline hyperlinks (ASOP 23, ASOP 56, Goldburd, Gelman, R4DS, McKinney) listed from link annotations. examPdfLinks 'pcpa-1' is this URL. syllabus_lint: 0 errors, 0 warnings. Not on the page and not filed: cognitive levels, item types, performance criteria, project calendar.
- sources_checked: CAS, PCPA Exam & Project Content Outline — Property and Casualty Predictive Analytics, v.8 updated 9.9.2026, effective September 2026 (9 pp.), PDF pp.1-9 incl. link annotations pp.5-7, sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f — https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf; CAS, Property & Casualty Predictive Analytics (PCPA) exam page, read 2026-10-09: the outline above ('Download Now') is the only content outline linked, sha256:9eb8cfcb4d4de9b7baed3b5392556908cd9a0aa108e6f0737b90f76aded1937f — https://www.casact.org/exam/property-casualty-predictive-analytics-pcpa
- note: Verified high against outline v.8. Two transcription fixes applied (F-001, F-002). One minor omission left open for a maintainer (F-003: project weighting). Domain A readings line follows the p.5 table where the outline disagrees with itself (C-001).
