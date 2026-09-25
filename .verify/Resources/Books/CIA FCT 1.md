---
target: Resources/Books/CIA FCT 1.md
created: 2026-09-25
---

## [F-001] FCT satisfactory-opinion thresholds misstated
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: critical
- status: open
- locus: ## The mechanics, bullet 'The opinion.'
- claim: Page says future financial condition is satisfactory if, over the forecast period, the insurer meets its regulatory capital requirement under the base scenario and remains solvent under all plausible adverse scenarios.
- evidence: FCT educational note §4 'Investigation and report' (PDF p.26) quotes SOP 2520.09, and the April 2026 CSOP para 2520.09 reads identically: satisfactory if throughout the forecast period (1) under the SOLVENCY scenarios, statement value of assets > statement value of liabilities; (2) under GOING CONCERN scenarios, the insurer meets the regulatory minimum capital ratio(s); (3) under the BASE scenario, the insurer meets its INTERNAL TARGET capital ratio(s) as determined by the ORSA. The page attaches the regulatory requirement to the base scenario (source: internal target) and drops the going-concern threshold entirely. A candidate who learns the page's version answers an FCT-opinion question wrongly. Note p.26-27 also: opinion is still satisfactory if corrective management actions within the insurer's control are needed (with disclosure); 'not satisfactory' if any threshold is missed even with them.
- source_rank: 2
- proposed_action: Human to rewrite the bullet around the three SOP 2520.09 thresholds (solvency: assets > liabilities; going concern: regulatory minimum; base: internal target per ORSA). Not auto-fixed: needs new prose.
- applied: false
- fingerprint: 1d574068bea2

## [F-002] Appendix row omits Appendix B (P&C insurers) and Appendix C
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: ## Contents table, row 'App.'
- claim: Row lists only 'Appendix A life insurers (mortality, morbidity, persistency/lapse, market and credit, inflation, reinsurance, business volume and mix risk); further appendices by insurer type'.
- evidence: PDF bookmark outline: 'Appendices – Discussion and analysis of risk categories' p.32; Appendix A – Life insurers p.33 has 13 risks (the page lists 7, stopping at 'business volume and mix'; omitted: expense, government and political issues, off-balance-sheet items, related companies, climate-related, technology and cyber); Appendix B – Property and casualty insurers p.47 (12 risks: claim frequency and severity; liability for incurred claims; inflation; volume and mix; reinsurance; market and credit; expense; government and political; off-balance-sheet; related companies; climate-related; technology and cyber); Appendix C – Other Considerations p.61 (IFRS 17 considerations). The 6C outline assigns the note with no appendix exclusion, so Appendix B — the P&C one, the one a 6C candidate needs — is examinable but is never named on the page, and Appendix C is not 'by insurer type'.
- source_rank: 2
- proposed_action: Human to rewrite the appendix row to name Appendix B (P&C insurers, its 12 risk categories) and Appendix C (other considerations: IFRS 17), and complete or trim the Appendix A list.
- applied: false
- fingerprint: a54187a6dab2

## [F-003] Unsourced 'most heavily examined' claim
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: intro paragraph, last sentence
- claim: 'This is one of the most heavily examined readings on the syllabus.'
- evidence: The Fall 2026 6C content outline assigns the reading to C4, C5 with no weighting per reading; no ranked source consulted this pass supports a claim about exam frequency.
- source_rank: 1
- proposed_action: Cite past-exam frequency evidence or delete the sentence.
- applied: false
- fingerprint: ddfe8d072c2f

## [C-001] Validation pass — disputed
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- status_set: disputed
- checks_run: frontmatter vs title page; contents table vs PDF bookmark outline (57 entries); syllabus scope (C4,C5, no exclusions); proper-noun search (E-19, 2500, ripple, percentile, routine); SOP 2520.09 opinion thresholds; wiki-link and embed resolution
- sources_checked: CIA Educational Note: Financial Condition Testing, Document 225095, August 27 2025 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=623006&fid=623007 via https://www.cia-ica.ca/publications/225095e/ (sha256 a7000684b226d0bc23a50fb6fa1e4193da8ebfa05ea0aea619df186acb3aa3f8); CAS Exam 6C (Canada) Content Outline, Fall 2026 — https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf (sha256 1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1); CIA Standards of Practice, April 2026 (Actuarial Standards Board) — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=713004&fid=713005 (sha256 cc9fedc79c4d758a081d75d157071edef0b26dbcdc7968fe12b7700179344a6c)
- note: Title, date (Aug 27 2025), §1-4 structure and the base/adverse/ripple/management-action bullets match the note. Disputed because an open critical finding misstates the SOP 2520.09 satisfactory-opinion thresholds.
