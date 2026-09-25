---
target: Resources/Books/CIA Subsequent Events.md
created: 2026-09-25
---

## [F-001] Binding standard cited as CSOP §1520; subsequent events are §1430
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: ## Related readings, bullet [[CIA CSOP]]
- claim: '[[CIA CSOP]] §1520 — the binding standard'.
- evidence: The note bases its decision tree on SOP section 1430 (paragraphs 1430.01, .02, .03, .05, .07, .13 cited in §2 and §4, PDF p.6-10); it cites 1520 only in §7 (PDF p.20) for the Joint Policy Statement on actuary-auditor communication (1520.14). April 2026 CSOP bookmark outline: '1430 Subsequent events' p.33; '1520 Auditor's use of an actuary's work' p.49.
- source_rank: 2
- proposed_action: Change §1520 to §1430.
- applied: true
- fingerprint: dd12bf3a78d9

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- resolves: F-001
- status: resolved
- note: Fixed in this run: Related readings now cite [[CIA CSOP]] §1430.

## [F-002] Decision tree on the page does not follow the note's §4 event decision tree
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: major
- status: open
- locus: ## The decision tree, items 1-3
- claim: Page reduces §4 to: (1) does the event give information about circumstances existing at the calculation date → take into account / else disclose; (2) a 'different entity' special case for sales, wind-ups, mergers, portfolio transfers; (3) disclosure.
- evidence: Note §4 flowchart (PDF p.9) and text (p.8-11): first 'When did the actuary first become aware of the event?' — before/at calculation date, between calculation and report date (subsequent event), or after report date (§4.3: no action / inform users but don't change the work / withdraw or amend the report, per 1710.42). For a subsequent event: 'Does the event reveal a data defect or calculation error?' → reflect (1430.01); 'When did the event occur?' on/before calculation date → reflect; after → 'Does the event make the entity different?' on/before calculation date → reflect (adjusting); after → purpose of the work: report on the entity as it was → report event but don't reflect; as it will be → reflect (1430.02 third bullet), which the note says is outside its scope (p.10). 'Different entity' is the tree's central question for every post-calculation-date event, not a special case; 'wind-up', 'merger', 'sale', 'portfolio transfer' occur 0 times. The page omits the data-defect branch and the after-report-date branch.
- source_rank: 2
- proposed_action: Human to rewrite the section from the §4 flowchart (awareness timing → data defect/error → event timing → entity different? → purpose of work), including the §4.3 after-report-date actions.
- applied: false
- fingerprint: bbe44e2618ba

## [F-003] §7 'different reporting obligation and cut-off date' not in the note
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- severity: minor
- status: open
- locus: ## Why it is examinable, paragraph 'Section 7 matters too'
- claim: 'the actuary, management and the external auditor may each learn of an event first, and each has a different reporting obligation and a different cut-off date.'
- evidence: §7 (PDF p.20) says strong communication is critical; quotes SOP 1520.14 e) iii) that the inquiring professional discusses subsequent events so the responding professional treats them as intended up to the date of their report; the actuary reviews treatment with auditor and management so 'audit and actuarial approaches are consistent'; the CIA and CPA Canada may facilitate industry-wide classification (1998 ice storm, 2008 Alberta court decision). 'cut-off' 0 hits; no statement that the three parties have different obligations or dates.
- source_rank: 2
- proposed_action: Human to restate from §7 (consistency of audit and actuarial treatment; JPS 1520.14).
- applied: false
- fingerprint: 567fbf1b5e37

## [C-001] Source conflict: syllabus excludes an Appendix B the note does not have
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- locus: intro paragraph, 'The syllabus excludes Appendix B'
- note: The Fall 2026 6C content outline cites 'Educational Note: Subsequent Events, August 2023, excluding Appendix B'. The August 10 2023 note (Document 223127, sha256 0e7a8802…) has no appendices at all: its bookmark outline ends at §7 (p.20) and 'appendix' occurs 0 times in the text. The page correctly transcribes the syllabus, so this is logged as a conflict between the outline and the document, not a vault error. Possibly a carry-over from an earlier outline; worth raising with the CAS.

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-25T18:54Z/c029
- date: 2026-09-25
- status_set: in_review
- checks_run: frontmatter vs title page (Aug 10 2023); contents vs PDF bookmark outline (7 sections, no appendices); syllabus scope (C1, C5, excl. App. B); §4 decision-tree flowchart vs page; §7 vs page; proper-noun search (1430, 1520, wind-up, merger, cut-off); CSOP section numbering; wiki-link resolution
- sources_checked: CIA Educational Note: Subsequent Events, August 10 2023 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=36335&fid=17259 via https://www.cia-ica.ca/publications/223127e/ (sha256 0e7a8802fab748518eca08438b81f3e7b481a667eeb5302bd7ecef0f09becc6a); CAS Exam 6C (Canada) Content Outline, Fall 2026 — https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf (sha256 1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1); CIA Standards of Practice, April 2026 (Actuarial Standards Board) — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=713004&fid=713005 (sha256 cc9fedc79c4d758a081d75d157071edef0b26dbcdc7968fe12b7700179344a6c)
- note: Contents 1-7, title, date and objectives match. CSOP section cite fixed (1520 → 1430). Held at in_review because an open major finding (decision tree does not follow §4) needs human-authored content; syllabus-vs-document Appendix B conflict logged as a comment.
