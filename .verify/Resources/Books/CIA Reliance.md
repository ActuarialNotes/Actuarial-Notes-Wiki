---
target: Resources/Books/CIA Reliance.md
created: 2026-09-25
---

## [F-001] Type 'Research Paper' — the document calls itself an educational note
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: frontmatter Type
- claim: Type: 'Research Paper'.
- evidence: PDF p.2 carries the standard educational-note preamble ('The actuary should be familiar with relevant educational notes...'), and the text refers to itself as 'this educational note' (e.g. §1 p.6 'subsection 3.2 of this educational note', §3.4 'subsection 3.1 of this educational note', §4 'Sections 3-4 in this educational note'); 'research paper' 0 hits. The title page does not print a document type and the 6C outline cites it without one, so not auto-fixed.
- source_rank: 2
- proposed_action: Change Type to 'Educational Note' after a maintainer confirms against the CIA publication listing.
- applied: false
- fingerprint: b9682f2e788c

## [F-002] §3.3 and §4 summaries assert content the paper does not contain
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: ## Contents, bullets '3.3 Review and validation' and '4. Applications in advanced modelling techniques'
- claim: 3.3: 'reasonableness checks, benchmarking, and sensitivity testing the result to the borrowed assumption'; 4: 'machine-learning models and external data feeds, where the actuary may not be able to inspect the mechanism and must rely on behaviour instead'.
- evidence: Full-text search: 'benchmark' 0, 'sensitivity' 0. §3.3 (PDF p.8-9) lists: review supporting documentation and challenge assumptions; high-level checks vs prior results and movements; spot checks for errors; confirm quality-control procedures (peer/senior review, sign-off); feed back errors to the author; document the review. §4 (PDF p.10) is about pricing actuaries using the work of data scientists (ML, classification/rating factors); the practitioner obtains basic information on the model, its testing and validation, per SOP 1450.01, and ensures a reputable vendor/competent developer — nothing about relying on behaviour or external data feeds.
- source_rank: 2
- proposed_action: Human to restate both bullets from §3.3 and §4.
- applied: false
- fingerprint: cbe7aef1660d

## [F-003] Related readings cites CSOP §1600 for 'external data'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: ## Related readings, bullet [[CIA CSOP]]
- claim: '[[CIA CSOP]] — sections 1500/1600 on the use of another's work and external data'.
- evidence: The paper cites SOP section 1500 (1510.01, 1510.03, 1510.07), 1700 (reporting) and 1450.01 (models); '1600' 0 hits. In the April 2026 CSOP (bookmark outline) §1600 is 'Assumptions and Methods' (1610 Methods, 1620 Assumptions, 1630 PfAD, 1640 comparison); data is §1440 and reporting §1700.
- source_rank: 2
- proposed_action: Change to '§1500 on another person's work (and §1700 on reporting it)' (human edit).
- applied: false
- fingerprint: 41f331703bce

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- status_set: verified
- confidence: medium
- checks_run: frontmatter vs title page (title, March 2024); contents vs PDF bookmark outline (14 entries, complete); syllabus scope (A1); §2 SOP 1510.01 take-responsibility-or-report wording; proper-noun search (vendor, catastrophe model, machine, benchmark, sensitivity, 1600); CSOP section numbering; wiki-link resolution
- sources_checked: CIA, Reliance on the Work of Others in Property and Casualty Insurance Pricing, Document 224033, March 6 2024 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=323297&fid=323299 (sha256 c9c934f516ee6c8c803dea4ee797b397950455fa0a6d0e38ca5ddfb521df3f72); CAS Exam 6C (Canada) Content Outline, Fall 2026 — https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf (sha256 1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1); CIA Standards of Practice, April 2026 (Actuarial Standards Board) — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=713004&fid=713005 (sha256 cc9fedc79c4d758a081d75d157071edef0b26dbcdc7968fe12b7700179344a6c)
- note: Section structure 1-5 with all subsections matches exactly; §2 summary matches SOP 1510.01. Three minor findings open (document type, §3.3/§4 characterisations, CSOP section cite).
