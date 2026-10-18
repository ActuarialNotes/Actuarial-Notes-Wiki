---
target: questions/exam-6c/cas6c-an-015.md
created: 2026-10-18
---

## [F-001] Page 60.25 has four insurance service expense components, not three
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T14:08Z/g6c6
- date: 2026-10-18
- severity: minor
- status: open
- locus: Explanation, sentence after the ISR formula
- claim: Insurance service expenses are the three components on page 60.25.
- evidence: PC2 workbook (sha256:80070b06f101a632278aaa3407c646c0ae7c5062be3925266490c8bc8daf4251), sheet 60.25: four columns under Insurance Service Expenses, the fourth being Adjustments to Liabilities for Incurred Claims. The question's table has no such item, so ISE = 3,400 + 600 + 100 = 4,100 and the key (D, 600) stands.
- source_rank: 1
- proposed_action: Restate to the four columns and note the table has no LIC adjustment.
- applied: true
- fingerprint: 0f0df9e56bd2

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T14:08Z/g6c6
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Restated in this run to the four column headings of PC2 page 60.25, adding that the table has no adjustment to liabilities for incurred claims; arithmetic unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:08Z/g6c6
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: answered blind from stem + options (Python for arithmetic) and compared with the key; exactly one option correct; each distractor's stated reasoning reproduced; explanation checked line by line against the source; topic / learning_objective / wiki_link checked against Exam 6C (CAS).md (targets exist, on the syllabus section, '+' for spaces); format per question-writer formats.md; validate_content.py passes; recomputation 5,000 - (3,400 + 600 + 100) - 300 = 600; distractors 200/350/450/900 reproduced
- sources_checked: OSFI, P&C Core Financial Statement Quarterly Return PC1 (2023) (IFRS 17 workbook, CAS-hosted), page 20.22 Statement of Profit or Loss (lines 099-199 ISR; 310 insurance finance in Net Investment Result; 420 General and Operating Expenses), sha256:1de8ae31f568e91557650a1e78720e2ea7e310953e91ba5210444bea212afae0 — https://www.casact.org/sites/default/files/2022-05/6c_irfs17_core.xlsx; OSFI, P&C Supervisory Quarterly Return PC2 (IFRS 17 workbook, CAS-hosted), page 60.25 column headings, sha256:80070b06f101a632278aaa3407c646c0ae7c5062be3925266490c8bc8daf4251 — https://www.casact.org/sites/default/files/2022-05/6c_pc_irfs17_qrt.xlsx; CIA, Educational Note: IFRS 17 – Actuarial Considerations Related to Liability for Remaining Coverage in P&C Insurance Contracts (June 2022, Document 222092), §5.2 worked example ("Other Expenses" below the ISR), PDF p.25, sha256:a7e5ecea716dc20bffcc88045f20c950e71400ac3de3bfb1544736dac46a0333 — https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educational_Note_IFRS_17_Actuarial_Considerations_Related_to_Liability.pdf
