---
target: Concepts/Model Validation.md
created: 2026-10-31
---

## [F-001] 'The main defence against model risk' overstates ASOP 56
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T19:00Z/b6f9
- date: 2026-10-31
- severity: minor
- status: open
- locus: lead, last sentence
- claim: Model validation is a core control of model governance and the main defence against model risk.
- evidence: ASOP 56 §3.6 'Evaluation and Mitigation of Model Risk' (PDF p.14-15) lists model testing (3.6.1), model output validation (3.6.2), review by another professional (3.6.3), governance and controls (3.6.4) and mitigating misuse (3.6.5) as steps; validation is one of them, and no source read ranks it 'the main' one. Restated to what ASOP 56 says.
- source_rank: 3
- proposed_action: Restate as one of the steps ASOP 56 lists for mitigating model risk.
- applied: true
- fingerprint: 3a9a6ede5bf9

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T19:00Z/b6f9
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Restated in this run: 'ASOP 56 lists it among the steps for mitigating model risk'.

## [F-002] CP-312 exam bullet goes beyond the CP-312 syllabus
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T19:00Z/b6f9
- date: 2026-10-31
- severity: minor
- status: open
- locus: How it appears on the exam, CP-312 bullet
- claim: CP-312 asks to evaluate validation techniques (static and dynamic validation, back-testing, sensitivity tests, independent review) ... mostly written answers on a case.
- evidence: The CP-312 syllabus (Nov 2026/Mar 2027) lists outcomes 1c 'Model validation techniques' for cash flow models for long-term insurance business, 2b 'Describe, apply, and evaluate model validation techniques' for other types of models, and Topic 3 Model Governance, and says 'The case study will be provided with the examination' (p.1). It names none of the parenthetical techniques and says nothing about written answers. Restated to the syllabus's words.
- source_rank: 1
- proposed_action: Restate the bullet to the syllabus outcomes and its case-study sentence.
- applied: true
- fingerprint: d3f97b1a72a7

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T19:00Z/b6f9
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Restated in this run to CP-312 outcomes 1c, 2b and Topic 3, and 'a case study is provided with the examination'.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T19:00Z/b6f9
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Read every link (all resolve). Lead and ASOP bullet against ASOP 56 §3.6.2 a-e (matches item for item); hold-out MSE, k-fold and LOOCV formulas and the training/validation curve against ISLR §2.2.1 and §5.1; static and dynamic validation and A/E against Olswang (SOA monograph); traps against ISLR and scikit-learn §3.1. SRM bullets against SRM 1b-1d and ISLR §5.1; CP-312 bullet restated to its syllabus (F-002); 'main defence' restated to ASOP 56 §3.6 (F-001). Both examples recomputed (rank 5): MSE_A 1.60, MSE_B 2.05, CV 1.72; static -0.12%, -1.84%, +0.14%; A/E 1.100, 0.990, 1.100, total 1.063. Edits avoid every passage the answerability records quote.
- sources_checked: ASB, ASOP No. 56, Modeling (Dec 2019), §3.6 and §3.6.2 a-e, pp.14-15 (model output validation reasonably represents what is modeled; historical actual results, hold-out data, statistical tests, variations on key assumptions, alternative models), sha256:fba1fcec717852b4ce7611104841f39659e94cbe46f4dfb7d621b2cbf8e41f33 — https://www.actuarialstandardsboard.org/wp-content/uploads/2020/01/asop056_195-1.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer, 2021; CAS-hosted copy), §2.2.1 printed pp.29-33; §5.1.1-5.1.4 printed pp.198-206 (validation set approach variable and overestimates test error; LOOCV less bias, costly; k-fold average); §6.2.3 printed p.250, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Olswang, 'Validating a Liability Model', SOA Financial Reporting Section monograph (1999), pp.1-2 (static validation: model in-force position at the valuation date vs actual - policy counts, units, face amount, premiums, reserves; dynamic validation: model revenue account vs actual, backward and forward; ratio model/actual), sha256:ab688018c75191522f9588c2409b60421386b50a9cf7051e02e9838a6bd28a86 — https://www.soa.org/globalassets/assets/library/monographs/50th-anniversary/financial-reporting-section/1999/january/m-as99-1_viii.pdf; scikit-learn User Guide, 3.1 Cross-validation, §3.1 (nested cross-validation; test set leaks when used to tune), sha256:78d7587fa92ba3b3e480c9d841b50fedc14ac29d571ccb319d4068235154f0e2 — https://scikit-learn.org/stable/modules/cross_validation.html; SOA, Exam SRM syllabus, January 2027, outcomes 1b-1d, p.2, sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf; SOA, CP-312 Model Development and Governance syllabus, Nov 2026/Mar 2027, p.1 (case study provided with the examination); outcomes 1c, 2b; Topic 3 Model Governance, sha256:7c62bff559da90773de77ad707816992f3d41dd083df0e96d78aa8b67d34e757 — https://www.soa.org/globalassets/assets/files/edu/2026/cp-312/2026-2027-cp-312-syllabus.pdf
