---
target: Resources/Books/CIA FCT 2.md
created: 2026-09-25
---

## [F-001] Title follows syllabus citation; document title page adds 'and Own Risk and Solvency Assessment'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: nit
- status: open
- locus: frontmatter Title
- claim: Title: 'Guidance for the 2025 Reporting of Capital and Financial Condition Testing for Life and Health, P&C, and Mortgage Insurers'.
- evidence: Document title page (PDF p.1/p.3): 'Guidance for the 2025 Reporting of Capital, Financial Condition Testing, and Own Risk and Solvency Assessment for Life and Health, P&C and Mortgage Insurers'. The Fall 2026 6C outline cites it with the shorter title the page uses. Syllabus vs document title differ; not a content error.
- source_rank: 2
- proposed_action: Optionally align Title to the document's own title page; left as-is because the rank-1 syllabus uses the short form.
- applied: false
- fingerprint: 1d70bd57824e

## [F-002] Guideline A-4 attributed to §4.2; it is listed in §4.1
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: ## What to take from the assigned sections, bullet '§4.2'
- claim: '§4.2 — economic capital modelling in the ORSA, and how the internal target relates to the internal target under Guideline A-4.'
- evidence: §4.2 'Economic capital modelling (modified)' (PDF p.13) discusses IFRS 17/regulatory frameworks not being required, discounting, CSM modelling, LICAT/CARLI scalars and approximations 'for the purpose of selecting internal target(s)'; it does not mention Guideline A-4. A-4 ('Regulatory Capital and Internal Capital Targets, effective January 1, 2025') appears in §4.1 'Additional guidance on the 2025 ORSA (new)' (PDF p.12) in the list of regulator ORSA publications.
- source_rank: 2
- proposed_action: Move the A-4 reference to a §4.1 bullet or drop it from the §4.2 bullet (human edit).
- applied: false
- fingerprint: 70095c6099e6

## [F-003] §3.3 standardized-stress-test rationale not in source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: ## What to take from the assigned sections, bullet '§3.3'
- claim: 'The regulators prescribe scenarios so that results are comparable across insurers; the actuary's own scenarios sit alongside, not instead.'
- evidence: §3.3 'Standardized stress tests' (PDF p.10-11) says only that OSFI plans a 2025 SST for federally regulated life and P&C insurers examining a REINSURANCE FAILURE scenario, results may be submitted with the FCT or separately, the actuary 'would be mindful of the extent to which this SST could be considered in the FCT process', and the AMF is considering one. The comparability rationale is not stated, and the one concrete fact (reinsurance-failure scenario) is absent from the page.
- source_rank: 2
- proposed_action: Human to restate the bullet from §3.3 (reinsurance-failure SST; optional joint submission).
- applied: false
- fingerprint: 49aae9fb61a0

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- status_set: verified
- confidence: medium
- checks_run: frontmatter vs title page; section table vs PDF bookmark outline incl. (modified)/(new)/(unchanged) tags; syllabus exclusions (2.1, 2.3, 5, 6, App. A-C) vs page's Assigned column; §2.2, §3.2, §3.3, §4.2 text vs page bullets; wiki-link resolution
- sources_checked: CIA Educational Note: Guidance for the 2025 Reporting of Capital, Financial Condition Testing, and Own Risk and Solvency Assessment for Life and Health, P&C and Mortgage Insurers, Document 225015 (Feb 2025; archived Feb 11 2026) — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=471250&fid=471251 via https://www.cia-ica.ca/publications/225015e/ (sha256 61fca56ff76325e18d5402a9e74e579f3af9c30e813072f39c77f92c6a88d577); CAS Exam 6C (Canada) Content Outline, Fall 2026 — https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf (sha256 1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1)
- note: Assigned-scope callout and section table match the outline and the document exactly. Three low-severity findings open (title form, A-4 attribution, SST rationale).
