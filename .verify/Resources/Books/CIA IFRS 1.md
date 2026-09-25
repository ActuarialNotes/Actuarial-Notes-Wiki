---
target: Resources/Books/CIA IFRS 1.md
created: 2026-09-25
---

## [F-001] Contents omits §6 (residual market mechanisms) and the Appendix (risk transfer)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: ## Contents table (ends at row 5)
- claim: Contents table lists sections 1-5 only.
- evidence: PDF bookmark outline and printed TOC: '6. Accounting treatment of residual market mechanisms (automobile insurance)' p.29 and 'Appendix: Principles of Risk Transfer in Reinsurance' p.31. 'residual market' occurs 8 times and 'Facility Association' twice in the text. The Fall 2026 6C outline assigns the note to C1-C3 with no section or appendix exclusion, so both are examinable and nothing on the page points at them.
- source_rank: 2
- proposed_action: Human to add rows for §6 and the Appendix.
- applied: false
- fingerprint: 7073561bb1b0

## [F-002] 'Unregistered reinsurance' and MCT credit-risk link not in the note
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: ## The asymmetries to remember, bullet 'Non-performance risk'
- claim: 'This is where unregistered reinsurance and collateral come into the accounting, and it connects to the MCT's credit risk treatment.'
- evidence: Full-text search of the note: 'unregistered' 0 hits. §3.1.2 'Risk of non-performance by the issuer of the reinsurance contracts held' (PDF p.12) covers effects of collateral and losses from disputes, history of disputes, collateral available; the only MCT mention (1 hit) is outside §3.1.2. The unregistered-reinsurance framing is the page's own, not the reading's.
- source_rank: 2
- proposed_action: Delete the 'unregistered' clause or mark it as a cross-reading connection (human edit).
- applied: false
- fingerprint: f6ffec7cee85

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- status_set: in_review
- checks_run: frontmatter vs title page; contents vs PDF bookmark outline (38 entries); syllabus scope (C1-C3, no exclusions); proper-noun search (unregistered, collateral, LRECC/loss-recovery, risk-attaching, residual market); level-of-aggregation independence and RA-held wording; wiki-link and embed resolution
- sources_checked: CIA Educational Note: IFRS 17 – Actuarial Considerations Related to Reinsurance Contracts Issued and Held, June 17 2025 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=610928&fid=610931 (sha256 ce688039c5e2007481b5c2a36788b7b3ff885423c8798ddd8f93e66ae1a08a19); CAS Exam 6C (Canada) Content Outline, Fall 2026 — https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf (sha256 1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1)
- note: Source read in full outline; §1-5 structure, title and date match. Held at in_review, not verified, because an open major finding (missing §6 and Appendix) needs human-authored content.
