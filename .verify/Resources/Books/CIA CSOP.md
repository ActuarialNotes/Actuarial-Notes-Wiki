---
target: Resources/Books/CIA CSOP.md
created: 2026-09-25
---

## [F-001] General-practice rows 1400-1700 attribute the wrong subjects
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: ## The assigned sections, table 'General practice (1000)', rows 1400, 1510, 1520, 1600, 1700
- claim: 1400 = use of another's work, data and assumptions; 1510 = selection of assumptions and methods / MfAD; 1520 = Subsequent Events decision tree; 1600 = Reporting; 1700 = control of the work, review and documentation.
- evidence: Actuarial Standards Board (Canada), Standards of Practice, April 2026 consolidation, https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=713004&fid=713005, sha256 cc9fedc79c4d758a081d75d157071edef0b26dbcdc7968fe12b7700179344a6c, PDF bookmark outline and section headers: 1400 'The Work' (PDF p.29; subsections 1410 Approximation, 1420 Event, 1430 Subsequent events, 1440 Data, 1450 Models, 1460 Quality assurance, 1470 Control, 1480 Reasonableness of result, 1490 Documentation); 1510 'Actuary's use of another person's work' (p.47); 1520 'Auditor's use of an actuary's work' (p.49); 1600 'Assumptions and Methods' (p.63); 1700 'Reporting' (p.71). Each of the five rows carries the subject of a different section (subsequent events is 1430, not 1520). 1240 'Materiality' (p.20) is correct.
- source_rank: 2
- proposed_action: Re-map the five rows to the section titles above; subject descriptions need re-authoring.
- applied: false
- fingerprint: 711fff120d43

## [F-002] Insurance rows 2100-2400 attribute the wrong subjects
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: ## The assigned sections, table 'Insurance practice (2000)', rows 2100, 2200, 2300, 2400
- claim: 2100 = scope of the insurance standards; 2200 = the Appointed Actuary and duty to report; 2300 = valuation of insurance contract liabilities; 2400 = the actuary's report on insurance contract liabilities and the opinion.
- evidence: Actuarial Standards Board (Canada), Standards of Practice, April 2026 consolidation, https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=713004&fid=713005, sha256 cc9fedc79c4d758a081d75d157071edef0b26dbcdc7968fe12b7700179344a6c: 2100 'Insurance Contract Valuation: All Insurance' (PDF p.84, 2110 Scope); 2200 'Insurance Contract Valuation: Canadian Considerations' (p.85; 2210 General - IFRS 17, 2220 Definitions, 2230 Reporting); 2300 'Insurance Contract Valuation: International Actuarial Standards of Practice' (p.97); 2400 'The Appointed Actuary' (p.110; 2430 accepting an engagement, 2440 report on matters requiring rectification, 2450 report to the directors, 2460 communication with the auditor, 2470 certification of capital filings). The Appointed Actuary and the duty to report are 2400, not 2200. 2500 'Financial Condition Testing' (p.120) and 2600 'Ratemaking: Property and Casualty Insurance' (p.129) titles are correct. The 'How the exam uses it' line calling 2400 'the report and opinion' carries the same error.
- source_rank: 2
- proposed_action: Re-map rows 2100-2400 (and the 'How the exam uses it' reference to 2400) to the section titles above.
- applied: false
- fingerprint: c17ca48d0200

## [F-003] Part 8000 is Enterprise Risk Management, not PPICPs
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: ## The assigned sections, heading 'Public personal injury compensation plans (8000)' and rows 8100, 8200
- claim: 8100 - Scope: workers' compensation boards, public auto plans; 8200 - Valuation and funding of a public personal injury compensation plan.
- evidence: Actuarial Standards Board (Canada), Standards of Practice, April 2026 consolidation, https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=713004&fid=713005, sha256 cc9fedc79c4d758a081d75d157071edef0b26dbcdc7968fe12b7700179344a6c PDF p.298 title '8000 - Enterprise Risk Management'; 8100 Scope (p.300): 'The standards in part 8000 apply to an actuary with responsibility for, or significant involvement in, ... enterprise risk management programs'; 8200 General (p.301) with 8210 circumstances affecting the work, 8220 identification/assessment/management of risks, 8230 enterprise level risk management, 8240 Own Risk and Solvency Assessment (ORSA). The PPICP material (valuation for financial reporting, funding, MfAD) is section 2800 (pp.135-141; bookmark 'Section 2800 replaces part 5000'), which the syllabus does not assign. A candidate following the page would study the wrong material for 8100/8200.
- source_rank: 2
- proposed_action: Retitle the group 'Enterprise risk management (8000)' and re-describe 8100/8200 (scope of ERM work; ERM including ORSA). Needs authored prose.
- applied: false
- fingerprint: de0f6726c6ae

## [F-004] 2600 does not contain the 'excessive, inadequate, unfairly discriminatory' test
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: ## The assigned sections, table row 2600
- claim: Ratemaking - rates should not be excessive, inadequate or unfairly discriminatory, and the actuary's obligations in selecting data, methods and assumptions for a rate.
- evidence: Actuarial Standards Board (Canada), Standards of Practice, April 2026 consolidation, https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=713004&fid=713005, sha256 cc9fedc79c4d758a081d75d157071edef0b26dbcdc7968fe12b7700179344a6c: full-text search of section 2600 (PDF pp.129-149: 2610 Scope, 2620 Method, 2630 Reporting) finds 0 occurrences of 'excessive', 'inadequate' or 'discriminat'. That three-part test is US rate-regulation / CAS Statement of Principles language, not the Canadian standard. The 2610/2620/2630 structure (scope, method, reporting) is what the section contains.
- source_rank: 2
- proposed_action: Delete the 'rates should not be excessive, inadequate or unfairly discriminatory' clause (source-contradicted) and describe 2600 by its subsections.
- applied: false
- fingerprint: 3e978ccaa198

## [F-005] 'Most heavily examined' claim unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: ## How the exam uses it, last sentence
- claim: Section 2500 (FCT) and section 2400 (the report and opinion) are the two most heavily examined.
- evidence: CAS Exam 6C Content Outline Fall 2026, https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256 1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1 gives no weighting by CSOP section; no examiner's report was consulted that supports the ranking. Stated as fact with no source.
- source_rank: 1
- proposed_action: Cite past-exam evidence or remove.
- applied: false
- fingerprint: fbc095bb7a23

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- status_set: in_review
- checks_run: syllabus diff (April 1 2026 version; sections 1240, 1400, 1510, 1520, 1600, 1700, 2100-2600, 8100, 8200; A1, C1-C5 - all match); section titles from PDF bookmark outline and page headers diffed row by row; full-text search of 2600 for the stated test; AAP definition (1110.02 p.5: 'the manner of performing work in accordance with these Standards of Practice') and box/explanatory-text definitions (1120.25, 1120.58) confirmed; frontmatter vs cover ('Standards of Practice, Actuarial Standards Board, April 2026'); wiki links; Available-from URL fetched (200, 308-page PDF)
- sources_checked: Actuarial Standards Board (Canada), Standards of Practice, April 2026 consolidation, https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=713004&fid=713005, sha256 cc9fedc79c4d758a081d75d157071edef0b26dbcdc7968fe12b7700179344a6c; CAS Exam 6C Content Outline Fall 2026, https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256 1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1
- note: Section list, version date and the accepted-actuarial-practice paragraph are correct; 1240, 2500 and 2600 titles are correct. Ten of the fourteen table rows describe a different section's subject (four major findings). Page left in_review.

## [C-002] Paragraph reference in today's pass note
- entry_type: correction
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- note: Today's pass note cites the accepted-actuarial-practice definition as '1110.02 p.5'. It is 1120.02 (1120 Definitions, PDF p.5). Location in the PDF unchanged; wording confirmed.
