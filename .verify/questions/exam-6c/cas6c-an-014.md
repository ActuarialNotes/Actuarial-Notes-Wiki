---
target: questions/exam-6c/cas6c-an-014.md
created: 2026-10-18
---

## [F-001] Page 60.25 has four insurance service expense columns, not three
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T14:08Z/g6c6
- date: 2026-10-18
- severity: minor
- status: open
- locus: Explanation, first paragraph
- claim: OSFI's Insurance Service Result page (60.25) breaks insurance service expenses into three columns.
- evidence: PC2 workbook (sha256:80070b06f101a632278aaa3407c646c0ae7c5062be3925266490c8bc8daf4251), sheet 60.25 header row: under Insurance Service Expenses the columns are Incurred Claims and Other Insurance Service Expenses | Amortization of Insurance Acquisition Cash Flows | Losses and Reversal of Losses on Onerous Contracts | Adjustments to Liabilities for Incurred Claims | Total. The key (E) is unaffected.
- source_rank: 1
- proposed_action: Restate as four columns, naming adjustments to liabilities for incurred claims.
- applied: true
- fingerprint: 5c8878d05c73

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T14:08Z/g6c6
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Restated in this run to the four column headings of PC2 page 60.25.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:08Z/g6c6
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: answered blind from stem + options (Python for arithmetic) and compared with the key; exactly one option correct; each distractor's stated reasoning reproduced; explanation checked line by line against the source; topic / learning_objective / wiki_link checked against Exam 6C (CAS).md (targets exist, on the syllabus section, '+' for spaces); format per question-writer formats.md; validate_content.py passes
- sources_checked: OSFI, P&C Supervisory Quarterly Return PC2 (IFRS 17 workbook, CAS-hosted), page 60.25 column headings (four insurance service expense columns; net expenses from reinsurance held incl. allocation of reinsurance premiums), sha256:80070b06f101a632278aaa3407c646c0ae7c5062be3925266490c8bc8daf4251 — https://www.casact.org/sites/default/files/2022-05/6c_pc_irfs17_qrt.xlsx; OSFI, P&C Core Financial Statement Quarterly Return PC1 (2023) (IFRS 17 workbook, CAS-hosted), page 20.22 Statement of Profit or Loss (ISR; net investment result incl. interest revenue and insurance finance; general and operating expenses), sha256:1de8ae31f568e91557650a1e78720e2ea7e310953e91ba5210444bea212afae0 — https://www.casact.org/sites/default/files/2022-05/6c_irfs17_core.xlsx; CIA, Educational Note: IFRS 17 – Actuarial Considerations Related to Liability for Remaining Coverage in P&C Insurance Contracts (June 2022, Document 222092), §5.2 worked example (amortization of IACF in Total Insurance Service Expenses), PDF p.25; §5.5 (non-attributable costs as "other expenses"), PDF p.34, sha256:a7e5ecea716dc20bffcc88045f20c950e71400ac3de3bfb1544736dac46a0333 — https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educational_Note_IFRS_17_Actuarial_Considerations_Related_to_Liability.pdf; CIA, Educational Note: IFRS 17 Discount Rates and Cash Flow Considerations for P&C Insurance Contracts (2025, Document 225109), §11 Insurance finance expense (unwinding of discount), PDF p.29, sha256:ba5d55e4e3429fa74681b03719336d5e186a812856f0445a5c4f8438fec5c4dc — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=628504&fid=628505
