---
target: questions/exam-6c/cas6c-an-018.md
created: 2026-10-18
---

## [F-001] Transition approaches are not taught by any 6C reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T14:08Z/g6c6
- date: 2026-10-18
- severity: minor
- status: open
- locus: whole question
- claim: The question tests IFRS 17's full retrospective / modified retrospective / fair value transition approaches as Exam 6C material, sourced to the IFRS 17 Effects Analysis.
- evidence: The Effects Analysis (May 2017) is not on the 6C reading list. The Fall 2026 Content Outline (sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1) never mentions transition. The readings touch it only obliquely: CIA 2024 Guidance (224092) §3 asks the AA to be comfortable with restated opening balances, and CIA IFRS 2 (risk adjustment) §2 covers moving from MfADs to the RA. None sets out FRA/MRA/FVA or when each is available. The question's facts match the Effects Analysis p.70; the scope rests only on the vault's own [[Transition to IFRS 17]] link in objective C2.
- source_rank: 1
- proposed_action: Maintainer to decide whether to keep it (as background the CIA guidance assumes), rewrite it toward what the readings ask of the AA at transition (a writer's job), or mark it off_syllabus.
- applied: false
- fingerprint: 3ac69dcaae33

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:08Z/g6c6
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: answered blind from stem + options (Python for arithmetic) and compared with the key; exactly one option correct; each distractor's stated reasoning reproduced; explanation checked line by line against the source; topic / learning_objective / wiki_link checked against Exam 6C (CAS).md (targets exist, on the syllabus section, '+' for spaces); format per question-writer formats.md; validate_content.py passes
- sources_checked: IFRS Foundation, Effects Analysis: IFRS 17 Insurance Contracts (May 2017), "Transition reliefs", PDF p.70, sha256:156f2c7cf410073ee10bf04ac667db7ddf22c0167c96e3c3b635d02db062d5ae — https://www.ifrs.org/-/media/project/insurance-contracts/ifrs-standard/ifrs-17-effects-analysis.pdf; CIA, 2024 Guidance to the Appointed Actuary and Valuation Actuaries of P&C Insurers (Educational Note, Document 224092), §2, implementation for fiscal years beginning on or after January 1, 2023, PDF p.6, sha256:81e420f62420ec2448cd4ea8158bcc2bc28d2e2e190b9c692d11e15a357162bc — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=349793&fid=349794; CAS, Exam 6C Content Outline, Fall 2026 (v04 2026-05-26), pp.1-14 searched: no transition topic in the outline, sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1 — https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf
- note: Facts verified; scope finding F-001 (transition approaches are not taught by any 6C reading) left open as minor.
