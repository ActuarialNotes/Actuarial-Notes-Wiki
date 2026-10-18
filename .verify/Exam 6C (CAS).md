---
target: Exam 6C (CAS).md
created: 2026-10-03
---

## [F-001] Domain C tasks are the Fall 2025 outline's; Fall 2026 renumbered and reworded them
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-03T04:13Z/9495
- date: 2026-10-03
- severity: major
- status: open
- locus: Learning Objectives, domain C callout, tasks 1-5
- claim: C1 'Describe the elements of the Canadian Annual Return using standards (e.g., …)'; C2 'Value liabilities in accordance with accepted actuarial practice in Canada under IFRS 17 (e.g., …)'; C3 'Understand how Reinsurance Accounting relates to the Canadian Annual Return (e.g., …)'; C4 'Evaluate the financial health of an insurance entity based on various Solvency frameworks (e.g., the MCT … ORSA, FCT, Solvency II and events not in data)'; C5 'Evaluate the responsibilities of an actuary as defined by standards of practice, regulators, and insurance laws for financial reporting (e.g., …)'.
- evidence: CAS Exam 6C Content Outline, Fall 2026 (v04 2026-05-26; https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1), PDF p.5, domain C tasks: 1 'Describe the key elements of the Canadian Annual Return using standards that are current in accordance with IFRS 17 (e.g., financial position, net income, excess (deficiency) ratio, changes in equity, earthquake reserves, OSFI annual return, notes to financial statements).' 2 'Explain and apply reinsurance accounting concepts (e.g., risk transfer, effect of different types of reinsurance on financial statements, commutation).' 3 'Evaluate the financial health of an insurance entity based on various solvency frameworks (e.g., MCT, Stress Testing, key financial measures used by rating agencies, Rules- based and principles-based solvency regulation - ORSA, FCT).' 4 'Understand and apply best practices and methodologies in the actuarial assessment of insurance company liabilities and capital requirements for financial reporting (e.g., CIA Educational Notes, regulatory requirements).' 5 'Explain standards of practice and legal requirements for an appointed actuary and actuarial work in Canada (e.g., Statement of Actuarial Opinion, Contents of Appointed Actuary's Report, Standards of Practice, Insurance Companies Act, Actuary and Auditor relationship).' The page's five stems are the Fall 2025 outline (v04 2025-05-09; https://www.casact.org/sites/default/files/2025-05/Exam_6C_ContentOutlines_2025_F.pdf, sha256:b47003231c4bff742f5ca8829ff3c6f26f2e639c1c733f17d3c418f85b422bcb) PDF p.5 tasks almost word for word (C1 'Describe the elements of the Canadian Annual Return using standards'; C2 'Value liabilities in accordance with accepted actuarial practice in Canada', to which the page appends 'under IFRS 17'; C3 'Understand how reinsurance accounting relates to Canadian Annual Return'; C4 '... solvency frameworks (e.g., MCT, Stress Testing, ... ORSA, FCT, Solvency II)'; C5 'Evaluate the responsibilities of an actuary ...'). Against Fall 2026: the page's C2 (liability valuation) is not a Fall 2026 task, its C3 and C4 are each one number off CAS's C2 and C3, CAS's new C4 is missing, C5's verb is Evaluate where CAS's is Explain, C1 keeps 'comprehensive income', which Fall 2026 dropped, and C4 still names Solvency II, which Fall 2026 dropped from the task.
- source_rank: 1
- proposed_action: Re-transcribe domain C's five tasks from the Fall 2026 outline p.5 in CAS's order and words, with the vault's added terms moved to '*Key concepts:*' lines (see the added-terms finding). Not auto-fixed: the outline contradicts itself on what C2-C4 mean (see the comment on conflicts inside the source). Every C reading kept its Fall 2025 code, so renumbering to CAS's printed tasks would file the PAA, LRC and discount-rate notes (C1, C2) under reinsurance accounting in the shelf's Learning objective filter. Whether to transcribe CAS's codes literally or ask CAS is a maintainer's call.
- applied: false
- fingerprint: 2a528ef68ed7

## [F-002] Tasks A2 and B2 lack the scope Fall 2026 added
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-03T04:13Z/9495
- date: 2026-10-03
- severity: major
- status: open
- locus: Learning Objectives, task A2 stem and task B2 stem
- claim: A2 'Discuss the issues, outcomes, rationale and implications of Court Case decisions for the insurance industry'; B2 'Describe the operations and Risk Transfer process for each government and insurance industry program and interactions with the voluntary private insurance sector'.
- evidence: CAS Exam 6C Content Outline, Fall 2026 (v04 2026-05-26; https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1): PDF p.3 A2 reads 'Discuss the litigation environment, issues, outcomes, rationale, and implications of court case decisions for the insurance industry.' PDF p.4 B2 reads 'Describe the operations, risk transfer process, funding mechanisms, and sources of funding of government and insurance industry programs and their interactions with the voluntary private insurance sector.' The page's two stems are the Fall 2025 outline (v04 2025-05-09; https://www.casact.org/sites/default/files/2025-05/Exam_6C_ContentOutlines_2025_F.pdf, sha256:b47003231c4bff742f5ca8829ff3c6f26f2e639c1c733f17d3c418f85b422bcb) wording word for word (A2 p.3, B2 p.4). They therefore omit what Fall 2026 added: the litigation environment (A2) and the programs' funding mechanisms and sources of funding (B2). A candidate reading the page would not see either named as examinable.
- source_rank: 1
- proposed_action: Transcribe both stems from the Fall 2026 outline word for word. Not auto-fixed: each new phrase needs a link to pass scripts/test_syllabus_lib.py (every noun phrase links a note), and choosing that link is a maintainer's call.
- applied: false
- fingerprint: 95febc936955

## [F-003] Task B1 keeps 'historical significance', dropped in Fall 2026
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-03T04:13Z/9495
- date: 2026-10-03
- severity: minor
- status: open
- locus: Learning Objectives, task B1 stem
- claim: B1 'Describe the origin, purpose, historical significance, and philosophy of specific government and insurance industry programs'.
- evidence: CAS Exam 6C Content Outline, Fall 2026 (v04 2026-05-26; https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1), PDF p.4, B1: 'Describe the origin, purpose, and philosophy of specific government and insurance industry programs (e.g., Agricultural programs, FARM, RSP, PRR).' 'historical significance' is the Fall 2025 outline (v04 2025-05-09; https://www.casact.org/sites/default/files/2025-05/Exam_6C_ContentOutlines_2025_F.pdf, sha256:b47003231c4bff742f5ca8829ff3c6f26f2e639c1c733f17d3c418f85b422bcb) wording (PDF p.4) and is not in the Fall 2026 task.
- source_rank: 1
- proposed_action: Delete 'historical significance,' so the stem reads as the Fall 2026 outline does. The phrase is unlinked, so the concept set is unchanged.
- applied: true
- fingerprint: 34a5ca29f3b8

## [F-004] Domain C Readings line lists CIA Reinsurance Treatment, not on the Fall 2026 outline
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-03T04:13Z/9495
- date: 2026-10-03
- severity: minor
- status: open
- locus: Learning Objectives, domain C callout, **Readings:** line
- claim: The domain C Readings line includes 'CIA Reinsurance Treatment' as a current reading.
- evidence: CAS Exam 6C Content Outline, Fall 2026 (v04 2026-05-26; https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1): neither the domain C reading list (PDF pp.5-6) nor the Complete Text References table (pp.7-14) contains 'CIA Reinsurance Treatment'; the term occurs nowhere in the document. The Fall 2025 outline (v04 2025-05-09; https://www.casact.org/sites/default/files/2025-05/Exam_6C_ContentOutlines_2025_F.pdf, sha256:b47003231c4bff742f5ca8829ff3c6f26f2e639c1c733f17d3c418f85b422bcb) listed it (p.6), with table entry p.9: CIA Task Force on the Appropriate Treatment of Reinsurance, October 2007, C1, C3. The page's own Source Material already marks it 'retired from the Fall 2026 syllabus', but the Readings line still presented it as current.
- source_rank: 1
- proposed_action: Delete it from the Readings line. The line is plain text, read neither by the app nor by syllabus_lint, so the concept set is unchanged.
- applied: true
- fingerprint: abeafa23c6bb

## [F-005] Vault-chosen terms presented as CAS's task wording
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-03T04:13Z/9495
- date: 2026-10-03
- severity: minor
- status: open
- locus: Learning Objectives, tasks A1-A3, B1-B2 and C1-C5: the em-dash, '(e.g., …)' and 'including …' lists
- claim: Task lists name terms as CAS's, e.g. A1 '— the division of federal and provincial powers, OSFI and the provincial Superintendent of Insurance (the FSRA, the AMF), … the Take-All-Comers Rule, Usage-Based Insurance … Uninsured Automobile Coverage …'; A2 '(e.g., the Duty of Good Faith … the cap on non-pecuniary damages)'; A3 adds 'structured settlements'; B1 'including the Meredith Principles …'; B2 'including the Adverse Selection and Moral Hazard problems …'; C2 an IFRS 17 list of 18 further terms.
- evidence: CAS Exam 6C Content Outline, Fall 2026 (v04 2026-05-26; https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1), PDF pp.3-5. A1 reads 'Discuss the current state of insurance regulation in Canada (e.g., market conduct, provincial vs federal jurisdiction, motor vehicle injury compensation systems, rate regulation, industry codes of conduct).' The page drops CAS's five-item list for 23 linked terms of its own. None of AMF, Take-All-Comers Rule, Usage-Based Insurance, Territorial Rating, Unfair Discrimination, Bias in Actuarial Practice, No-Fault Insurance, Statutory Accident Benefits, Minor Injury Guideline, Catastrophic Impairment, thresholds and deductibles, Direct Compensation Property Damage, Fault Determination Rules or Uninsured Automobile Coverage occurs anywhere in this outline or the Fall 2025 outline (v04 2025-05-09; https://www.casact.org/sites/default/files/2025-05/Exam_6C_ContentOutlines_2025_F.pdf, sha256:b47003231c4bff742f5ca8829ff3c6f26f2e639c1c733f17d3c418f85b422bcb). A2 has no e.g. list in either outline, so the page's nine terms (Duty of Good Faith, Bad Faith Damages, Punitive Damages, Duty to Defend, Vicarious Liability, limitation periods, Prejudgment Interest, Collateral Benefits, cap on non-pecuniary damages) are not task text. A3's list is 'tort reform, class action suits' only. B1 ends '(e.g., Agricultural programs, FARM, RSP, PRR).' and B2 ends '… voluntary private insurance sector.' A mechanical diff of each C task's linked terms against both outlines' full text finds the page adding 2 to C1 (statement of changes in equity, key financial ratios); 18 IFRS 17 measurement terms to C2 (Fulfilment Cash Flows, Contractual Service Margin, General Measurement Model, Contract Boundary, Level of Aggregation, Coverage Units, Loss Component, Insurance Revenue, …); 4 to C3 (Reinsurance Contracts Held, registered and unregistered reinsurance, Finite Reinsurance); 14 to C4 (Capital Available, Capital Required, Base Solvency Buffer, the four risk margins, Diversification Credit, Earthquake Exposure Risk Margin, PML, target ratios, Reverse Stress Testing, ripple effects, Risk Appetite, Concentration Risk, events not in data); and 4 to C5 (Model Risk, run-off and wind-up valuations, Duty to Report). Many are covered in the readings; none is CAS's task wording. Removing a link removes that concept from the app's 6C concept set (mastery, study plan, readiness).
- source_rank: 1
- proposed_action: Restore CAS's own e.g. lists word for word, and move the vault's additions to marked '*Key concepts:*' lines under each task, as Exam FM and Exam P do (FM-2 F-005/R); that keeps the 6C concept set unchanged. Best done together with the domain C re-transcription.
- applied: false
- fingerprint: 77e6a0d54fb6

## [F-006] A1 names IBC's Code of Consumer Rights; the syllabus's IBC code is the credit-information code
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-03T04:13Z/9495
- date: 2026-10-03
- severity: minor
- status: open
- locus: Learning Objectives, task A1, last clause
- claim: 'industry self-regulation through the Insurance Bureau of Canada and its Code of Consumer Rights and Responsibilities'.
- evidence: CAS Exam 6C Content Outline, Fall 2026 (v04 2026-05-26; https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1): A1 (PDF p.3) names 'industry codes of conduct'. The only IBC code on the syllabus is 'Insurance Bureau of Canada, Code of Conduct for Insurers' Use of Credit Information (CODE)', A1 (PDF p.10; 'IBC Code of Conduct' in the p.3 reading list). 'Consumer Rights' occurs nowhere in the outline. The page names a different IBC code as A1's industry code: Concepts/Code of Consumer Rights and Responsibilities, IBC's customer-service code. The assigned code, on credit information in personal-lines underwriting and rating, is named in no task.
- source_rank: 1
- proposed_action: Where A1 names an industry code, point at the assigned one: for example, link CAS's 'industry codes of conduct' to Credit-Based Insurance Scoring, the concept the IBC Code of Conduct resource page links. Then demote the Code of Consumer Rights link to a '*Key concepts:*' line or drop it; that is a maintainer's call.
- applied: false
- fingerprint: aab9f2d8b242

## [F-007] Domain preambles condensed; A loses its scope limiter, C its sections sentence
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-03T04:13Z/9495
- date: 2026-10-03
- severity: minor
- status: open
- locus: Learning Objectives, preambles of domains A, B and C
- claim: A: 'Understand the role of the insurance business as a supplier of a vital service, and navigate Canadian Insurance Legislation, regulations, and judicial decisions that affect Insurance Regulation and insurance benefits.' C: 'Demonstrate detailed knowledge of the Canadian Annual Return, including guidelines from OSFI and provincial regulatory authorities. Understand the Appointed Actuary's professional responsibilities related to financial reporting under the Insurance Companies Act and Provincial Insurance Acts.'
- evidence: CAS Exam 6C Content Outline, Fall 2026 (v04 2026-05-26; https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1). PDF p.3, the A preamble ends '… insurance benefits to the extent that they interpret the law and thereby modify regulatory behavior.' The page drops that scope limiter. PDF p.5, the C preamble reads 'detailed knowledge of the contents, purposes, and recent changes in the Canadian Annual Return, including recent guidelines issued by the Office of the Superintendent of Financial Institutions (OSFI) and the provincial regulatory authorities. Specifically, candidates are expected to understand and utilize the sections of the Canadian Annual Return related to financial statements (such as the balance sheet and income statement), capital statements, insurance, and reinsurance.' It also has '… under the Insurance Companies Act and the Provincial Insurance Acts related to financial reporting and general corporate governance.' The page omits 'recent changes', the sections sentence and 'general corporate governance'. PDF p.4, the B list has 'Residual personal insurance markets, e.g., auto, property'; the page drops 'e.g., auto, property'. The Fall 2025 outline (v04 2025-05-09; https://www.casact.org/sites/default/files/2025-05/Exam_6C_ContentOutlines_2025_F.pdf, sha256:b47003231c4bff742f5ca8829ff3c6f26f2e639c1c733f17d3c418f85b422bcb) preambles are the same (pp.3-5), so this is condensation, not staleness.
- source_rank: 1
- proposed_action: Transcribe the three preambles word for word (scripts/syllabus_lib.py: 'preamble, verbatim'), linking each noun phrase as test_syllabus_lib requires.
- applied: false
- fingerprint: a0e99c6260dc

## [F-008] Source Material keeps three retired readings with live task codes; title says 67, CAS assigns 64
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-03T04:13Z/9495
- date: 2026-10-03
- severity: minor
- status: open
- locus: ## Source Material: callout title '{67 Sources}'; Alberta Auto Reform, Harris and CIA Reinsurance Treatment bullets
- claim: 'Source Material {67 Sources}' over 67 bullets. Three are readings marked retired or replaced that still carry task codes: Alberta Auto Reform 'A1 — replaced by CFAI for Fall 2026', Harris 'A2 — retired …', CIA Reinsurance Treatment 'C1, C3 — retired …'.
- evidence: CAS Exam 6C Content Outline, Fall 2026 (v04 2026-05-26; https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1), Complete Text References, PDF pp.7-14: 64 readings, counted from the table and cross-checked against the domain lists on pp.3-6. All 64 are on the page, and every code matches the table. The other three are Fall 2025 readings (Fall 2025 outline (v04 2025-05-09; https://www.casact.org/sites/default/files/2025-05/Exam_6C_ContentOutlines_2025_F.pdf, sha256:b47003231c4bff742f5ca8829ff3c6f26f2e639c1c733f17d3c418f85b422bcb): Alberta Auto Reform A1, p.7; CIA Reinsurance Treatment C1, C3, p.9; Harris A2, p.10) that Fall 2026 drops, so the retirement notes are correct. 'Replaced by CFAI' is the page's inference, though: Fall 2026 adds CFAI ('Care-First Auto Insurance', His Majesty in Right of Alberta, August 2025, A1, p.10) and drops Alberta Auto Reform without saying one replaces the other. Because each retired line still opens with task codes, the app's Learning objective filter (readingObjectives, lib/sourceMaterial.ts) lists them under A1, A2, C1 and C3, and lib/resourceExams.ts names all three as Exam 6C readings. The title count tells a candidate 67 where CAS assigns 64.
- source_rank: 1
- proposed_action: Drop the three bullets, or move them out of the callout into a 'Retired for Fall 2026' note with no leading task codes, and make the title {64 Sources}. Then align the three resource pages' On-the-syllabus bullets. Not auto-fixed: it changes the shelf, the resource-to-exam map and three other pages.
- applied: false
- fingerprint: 57479d676b74

## [F-009] Reading lines give task codes only; the outline's page, section and exclusion limits are absent
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-03T04:13Z/9495
- date: 2026-10-03
- severity: minor
- status: open
- locus: ## Source Material, every reading line
- claim: Each reading's line is its task codes alone, e.g. Feldblum 'C2-C4', OSFI MCT 'C2-C4', Baer and Rendall 'A2', CIA CSOP 'A1, C1-C5', OSFI Annual Return 'C1-C4'.
- evidence: CAS Exam 6C Content Outline, Fall 2026 (v04 2026-05-26; https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1), Complete Text References, PDF pp.7-14, limits most readings. Examples: Baer and Rendall pp. 67-91, 93-100, 302-304, 518-529, 821-827 and 829-831, plus three named cases (p.7). CIA CSOP: sections 1240 … 8200 (April 1, 2026), and Section 2600 (Ratemaking) only for A1 (pp.3, 7). CIA IFRS 17 - Comparison: excluding 3.2, 5.3, 7.2, 8.1.2 and appendices A, B, D (p.7). CIA FCT 2: not Sections 2.1, 2.3, 5, 6 or Appendices A-C (p.8). Feldblum: pp. 1-7 including Appendix A; not Section 4, Appendices B-D, formulae or endnotes (p.9). OSFI MCT: not 15 listed sections, nor the insurance, market and credit risk factors (p.12). OSFI Annual Return: pp. 10.60 and 60.45 only (p.13). GAO: appendices excluded (p.14). None of this is on the exam page, so the shelf card for OSFI MCT reads 'C2-C4' as if the whole guideline were examinable. The vault's other CAS pages (e.g. Exam 7) put the outline's scope on each reading line. The 6C resource pages checked (Feldblum, OSFI MCT, CIA FCT 2, CIA CSOP, Baer and Rendall) carry it in their On-the-syllabus callouts (rank 4, consistency only), which is why this is minor.
- source_rank: 1
- proposed_action: Append each reading's Fall 2026 citation scope after its codes, word for word from pp.7-14, as the Exam 7 page does. Not auto-fixed: 64 lines of transcription, best done in one pass with the domain C re-transcription.
- applied: false
- fingerprint: d48681b35e71

## [F-010] Domain C title drops 'of an Actuary'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-03T04:13Z/9495
- date: 2026-10-03
- severity: nit
- status: open
- locus: Learning Objectives, domain C callout title
- claim: 'C. Canadian Financial Reporting, Solvency, and Professional Responsibility {60–70%}'.
- evidence: CAS Exam 6C Content Outline, Fall 2026 (v04 2026-05-26; https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1), PDF p.2 domain table and p.5 heading: 'C. Canadian Financial Reporting, Solvency, and Professional Responsibility of an Actuary', 60-70%. The weight matches.
- source_rank: 1
- proposed_action: Retitle to the outline's words. Not auto-fixed: 233 questions in questions/exam-6c carry the current title as learning_objective, and syllabus_lint's questions check maps them by it, so they have to move with the retitle.
- applied: false
- fingerprint: e7df847b9118

## [C-001] Conflicts inside the Fall 2026 outline (logged, not vault errors)
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-03T04:13Z/9495
- date: 2026-10-03
- locus: Learning Objectives domain C; Source Material task codes
- note: Four inconsistencies inside one source: CAS Exam 6C Content Outline, Fall 2026 (v04 2026-05-26; https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1). None is a vault error. (1) Domain C's tasks were renumbered and reworded. On p.5, C2 is reinsurance accounting, C3 financial health, C4 the new 'best practices and methodologies in the actuarial assessment of insurance company liabilities and capital requirements', and C5 'Explain standards of practice and legal requirements…'. Yet every C reading's code in the reference table (pp.7-13) is unchanged from the Fall 2025 outline (v04 2025-05-09; https://www.casact.org/sites/default/files/2025-05/Exam_6C_ContentOutlines_2025_F.pdf, sha256:b47003231c4bff742f5ca8829ff3c6f26f2e639c1c733f17d3c418f85b422bcb), pp.7-13, where C2 was 'Value liabilities…', C3 reinsurance accounting and C4 financial health. Examples: CIA PAA, CIA IFRS 17 - LRC and CIA Discount Rates are C1, C2; Freihaut and Vendetti (risk transfer) is C1, C3; Feldblum (rating agencies), OSFI MCT, OSFI ORSA, OSFI Stress Testing and OSFI Target Capital are C2-C4; IFOA, IAA Climate and MSA Legend are C4; CIA FCT 1 and 2 are C4, C5. Read against the printed Fall 2026 tasks, the codes file the PAA and LRC notes under reinsurance accounting and the risk-transfer paper under financial health. This is what keeps F-001 from being a transcription fix. (2) The domain C reading list (pp.5-6) omits CIA Models, ICA and KPMG PACICC, which the table codes C5, C5 and A1, C5 (pp.9-11); the page follows the table. (3) Domain B is 'Canadian Government and Industry Insurance Programs' in the p.2 table but 'Government and Industry Insurance Programs' on p.4; the page follows p.2. (4) p.6 lists 'IBC IFRS 17 - Metrics Discussion' and the p.10 table 'IBC IFRS 17 Metrics Discussion'; the page uses each form where the outline does.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-03T04:13Z/9495
- date: 2026-10-03
- resolves: F-003
- status: resolved
- note: Deleted 'historical significance,'. B1's stem now reads 'Describe the origin, purpose, and philosophy of specific government and insurance industry programs', as on the Fall 2026 outline p.4. The phrase was unlinked, so the concept set is unchanged. The page-added 'including …' clause stays, under F-005. syllabus_lint 0/0, test_syllabus_lib OK, and vitest sourceMaterial, questionBank, examCatalog and resourceExams pass.

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-03T04:13Z/9495
- date: 2026-10-03
- resolves: F-004
- status: resolved
- note: Removed 'CIA Reinsurance Treatment' from the domain C Readings line. The line now carries the 38 readings of the outline's domain C list (pp.5-6) plus CIA Models, ICA and KPMG PACICC, which the reference table codes to C (see the comment on conflicts inside the source). The Source Material bullet, which says the reading is retired, is left for F-008.

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-03T04:13Z/9495
- date: 2026-10-03
- status_set: in_review
- checks_run: Format: PDF p.1 gives a 4-hour exam (4.5-hour appointment) with seven item types, which matches 'a 4 hour exam with mixed question types'. Domain weights A 20-25%, B 10-15%, C 60-70% (p.2) match. The cognitive-level split (p.2: Remember 30-40%, Understand and Apply 25-35%, Analyze and Evaluate 25-35%, Create 0-10%) is not on the page; no vault exam page carries one, so it is not filed. All 11 tasks and the 3 preambles were diffed phrase by phrase against pp.3-5 and against the Fall 2025 outline pp.3-5. A3 and B3 match. A1's stem matches, but its list is the vault's (F-005, F-006). A2 and B2 lack the Fall 2026 scope (F-002). B1's 'historical significance' was removed (F-003, fixed). C1-C5 are Fall 2025's (F-001). Preambles are condensed (F-007), and the C title drops 'of an Actuary' (F-010). Readings lines: A (19) and B (6) match pp.3-4 item for item. C matches the reference table, and CIA Reinsurance Treatment was removed (F-004, fixed). Source Material: 67 bullets = the 64 Fall 2026 readings (counted from the pp.7-14 table), every task code equal to the table's, plus 3 Fall 2025 readings marked retired, confirmed dropped (F-008). Lines carry codes only (F-009). Conflicts inside the outline are logged in a comment. Rollover: the CAS 6C page, read today, links only the Fall 2026 outline; re-fetched bytes are identical. No notice, errata or 2027 outline. Links: 225 distinct targets all resolve exactly (scripts/vault_links.py). syllabus_lint 0 errors 0 warnings; test_syllabus_lib OK; vitest sourceMaterial, questionBank, examCatalog and resourceExams pass.
- sources_checked: CAS, Exam Content Outline — Canada Regulation and Financial Reporting – Exam 6C, Fall 2026 (the 'October 2026 Content Outline'; v04 2026-05-26, 14 pp.), PDF pp.1-14, sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1 — https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf; CAS, Exam Content Outline — Exam 6C, Fall 2025 (v04 2025-05-09, 14 pp.), PDF pp.1-14, for the wording the page carries and the readings Fall 2026 dropped, sha256:b47003231c4bff742f5ca8829ff3c6f26f2e639c1c733f17d3c418f85b422bcb — https://www.casact.org/sites/default/files/2025-05/Exam_6C_ContentOutlines_2025_F.pdf; CAS, Exam 6C-Regulation and Financial Reporting (Canada) exam page, read 2026-10-03: window October 19-27, 2026; the October 2026 Content Outline is the only outline linked; no notice or errata — https://www.casact.org/exam/exam-6c-regulation-and-financial-reporting-canada
- note: In review, not verified. The Fall 2026 outline was read in full, but two major findings stay open. The domain C task list is the Fall 2025 outline's (F-001), and tasks A2 and B2 lack scope Fall 2026 added (F-002). Neither is a mechanical fix; F-001 waits on a conflict inside the outline itself (see the comment). Two deletions were applied (F-003, F-004). No critical finding: the weights, every reading and every task code agree with the outline.

## [C-003] Still present: Tasks A2 and B2 lack the scope Fall 2026 added
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- reaffirms: F-002
- note: Fall 2026 outline re-fetched 2026-10-09 (https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf), sha256:1bd4b2b8…275c1, byte-identical to the copy cited; pp.3-4 A2 and B2 read as quoted; the page's stems are unchanged. Still not auto-fixed: a trial verbatim transcription made test_syllabus_lib's noun-phrase check flag `litigation environment`, `funding mechanisms` and `funding` as unlinked, so each needs a link a maintainer chooses (reverted).

## [C-004] Still present: Vault-chosen terms presented as CAS's task wording
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- reaffirms: F-005
- note: Fall 2026 outline re-fetched 2026-10-09 (https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf), sha256:1bd4b2b8…275c1, byte-identical to the copy cited; pp.3-5 e.g. lists unchanged and the page's added terms still stand. Moving them to Key concepts lines is restructuring, not transcription; left open.

## [C-005] Still present: A1 names IBC's Code of Consumer Rights; the syllabus's IBC code is the credit-information code
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- reaffirms: F-006
- note: Fall 2026 outline re-fetched 2026-10-09 (https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf), sha256:1bd4b2b8…275c1, byte-identical to the copy cited; A1 (p.3) still names 'industry codes of conduct'; the only IBC code in the table is the credit-information code (p.10). Relinking is a judgment; left open.

## [C-006] Still present: Domain preambles condensed; A loses its scope limiter, C its sections sentence
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- reaffirms: F-007
- note: Fall 2026 outline re-fetched 2026-10-09 (https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf), sha256:1bd4b2b8…275c1, byte-identical to the copy cited; pp.3-5 preambles as quoted. A trial verbatim insertion of the A scope limiter and B's 'e.g., auto, property' flagged `law`, `thereby modify regulatory`, `auto`, `property` as unlinked in test_syllabus_lib, so linking is a maintainer's call (reverted).

## [C-007] Still present: Source Material keeps three retired readings with live task codes; title says 67, CAS assigns 64
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- reaffirms: F-008
- note: Fall 2026 outline re-fetched 2026-10-09 (https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf), sha256:1bd4b2b8…275c1, byte-identical to the copy cited; pp.7-14 still list 64 readings; the page still has 67 bullets incl. the three retired ones. Dropping them changes the shelf and three resource pages; left open.

## [C-008] Still present: Reading lines give task codes only; the outline's page, section and exclusion limits are absent
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- reaffirms: F-009
- note: Fall 2026 outline re-fetched 2026-10-09 (https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf), sha256:1bd4b2b8…275c1, byte-identical to the copy cited; pp.7-14 scope limits unchanged; page lines still carry codes only. 64 lines of transcription best done with the F-001 domain C work; left open.

## [C-009] Still present: Domain C title drops 'of an Actuary'
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- reaffirms: F-010
- note: Fall 2026 outline re-fetched 2026-10-09 (https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf), sha256:1bd4b2b8…275c1, byte-identical to the copy cited; p.2 and p.5 still read '... Professional Responsibility of an Actuary'. Retitling must move 233 questions' learning_objective with it; left open.

## [C-010] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T20:35Z/cdb5
- date: 2026-10-09
- status_set: in_review
- checks_run: Re-fetched the Fall 2026 outline with --refresh (sha256 identical to run 9495's copy); re-read pp.1-6 against the page's domains, preambles, tasks and Readings lines; trial verbatim fixes for F-002 and F-007 run through test_syllabus_lib (flagged unlinked noun phrases, reverted); exam page read for rollover: sitting October 19-27, 2026 still current, no 2027 outline posted.
- sources_checked: CAS, Exam Content Outline — Canada Regulation and Financial Reporting – Exam 6C, Fall 2026 (the 'October 2026 Content Outline'; v04 2026-05-26, 14 pp.), PDF pp.1-14, sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1 — https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf; CAS, Exam 6C-Regulation and Financial Reporting (Canada) exam page, read 2026-10-09: window October 19-27, 2026; the October 2026 Content Outline is the only outline linked; no errata or syllabus update — https://www.casact.org/exam/exam-6c-regulation-and-financial-reporting-canada
- note: In review, not verified. No page edits. F-001 (domain C renumbering) left open as a maintainer's call. The other seven open findings (F-002, F-005-F-010) were reaffirmed against the unchanged outline; none is a plain transcription fix: each needs a link choice, a restructure, or edits to other files. Sitting still current.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:claude-code
- run_id: 2026-10-18T18:16Z/d3cd
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Maintainer decision D8 (2026-10-18, docs/content-plan.md §6): transcribe CAS's words; the vault's additions go on marked *Key concepts:* lines. Domain C's five tasks transcribed from the Fall 2026 outline p.5 in CAS's order and words (C1 Annual Return under IFRS 17, C2 reinsurance accounting, C3 financial health, C4 actuarial assessment of liabilities and capital, C5 standards and legal requirements). The reading codes are left as CAS's reference table prints them, and the shelf's Learning objective filter is switched off with '%%objective-filter: off%%' in the Source Material callout until CAS's codes and tasks agree (the 6U precedent).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:claude-code
- run_id: 2026-10-18T18:16Z/d3cd
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Maintainer decision D8 (2026-10-18, docs/content-plan.md §6): transcribe CAS's words; the vault's additions go on marked *Key concepts:* lines. A2 and B2 transcribed word for word from pp.3-4; 'litigation environment' linked to Tort Litigation, 'funding mechanisms' to Government and Industry Insurance Programs and 'sources of funding' to Guaranty Funds.

## [F-005/R] Correction applied
- entry_type: resolution
- author: agent:claude-code
- run_id: 2026-10-18T18:16Z/d3cd
- date: 2026-10-18
- resolves: F-005
- status: resolved
- note: Maintainer decision D8 (2026-10-18, docs/content-plan.md §6): transcribe CAS's words; the vault's additions go on marked *Key concepts:* lines. Every task's e.g. list restored to CAS's own words; the vault's additions moved to *Key concepts:* lines under each task. The page's concept set is unchanged (diffed against HEAD).

## [F-006/R] Correction applied
- entry_type: resolution
- author: agent:claude-code
- run_id: 2026-10-18T18:16Z/d3cd
- date: 2026-10-18
- resolves: F-006
- status: resolved
- note: Maintainer decision D8 (2026-10-18, docs/content-plan.md §6): transcribe CAS's words; the vault's additions go on marked *Key concepts:* lines. A1's 'industry codes of conduct' (p.3) is linked to Industry Self-Regulation; the Code of Consumer Rights and Responsibilities is demoted to A1's *Key concepts:* line.

## [F-007/R] Correction applied
- entry_type: resolution
- author: agent:claude-code
- run_id: 2026-10-18T18:16Z/d3cd
- date: 2026-10-18
- resolves: F-007
- status: resolved
- note: Maintainer decision D8 (2026-10-18, docs/content-plan.md §6): transcribe CAS's words; the vault's additions go on marked *Key concepts:* lines. The three domain preambles transcribed word for word (pp.3-5), A's scope limiter and C's sections sentence included; B's program list joined with semicolons on one line.

## [F-011] Five domain A key concepts found in no readable Fall 2026 domain A reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:21Z/f608
- date: 2026-10-18
- severity: minor
- status: open
- locus: Learning Objectives, *Key concepts:* lines under A1, A2 and A3
- claim: A1 lists Fault Determination Rules and Code of Consumer Rights and Responsibilities; A2 lists Vicarious Liability and Collateral Benefits; A3 lists Structured Settlement, each as a key concept of domain A.
- evidence: Domain A readings per the CAS Exam 6C Content Outline, Fall 2026 (v04 2026-05-26; https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1), p.3 list and pp.7-14 codes. Case-insensitive full-text search of every domain A reading that could be fetched found none of the five (patterns 'fault determination|Reg. 668', 'consumer rights', 'vicarious', 'collateral', 'structured settlement'): Davidson (https://www.casact.org/sites/default/files/2021-03/6C_Davidson.pdf, sha256:9b544951d4a031e08f3c40a9a30b552764f705bc09a7a6ea2af3d57e5907149f; OCR, partly unreadable), FSCO Coverages (https://www.casact.org/sites/default/files/2021-03/6C_FSCO_Coverages.pdf, sha256:cc44bb568dcf03d8873e467c6e6082089877985f5e5a0cea8689df23b54d83d9; 'at fault' only in its DCPD and OPCF 44R paragraphs), FSCO Tech Notes (https://www.casact.org/sites/default/files/2022-05/6C_FSCOTechNotes_102016.pdf, sha256:b2ca7a6cdf4e19924f8f4dcb0e2890d723ba9ee3bcd31c31277e72a298f6d2a0), FSRA private passenger auto filing guide (https://www.casact.org/sites/default/files/2023-08/6C_FSRA_Private_Passenger_Auto_Filing_Major.PDF, sha256:c2069298d69234c392d1fdb56795b12ad5d2a75331f3c8183045213e63b4c06e), IBC Code of Conduct (https://www.casact.org/sites/default/files/2021-03/6C_IBC_Code_of_Conduct.pdf, sha256:9e4bd45e8cb8e4a4a5c64f11ca30de64df48eab836e623fa4e011dfaf7105cc5; the credit-information code, no 'Consumer Rights'), Marshall (https://www.casact.org/sites/default/files/2021-03/6C_Marshall.pdf, sha256:326913d5117f8dc2cc937a10f31f2d6fa712b509e040cd63220c2a8843b9d8fc), KPMG PACICC (https://www.pacicc.ca/wp-content/uploads/2017/11/Actuaries-Role-in-Safeguarding-the-Solvency.pdf, sha256:dfeb3261a08d006f20db422d1123bd5983dee29907f1fbb5a4b657bf5005f8fd), and the GAO and CFAI landing pages only (gao.gov/products/gao-23-105210, open.alberta.ca/publications/care-first-auto-insurance). The vault's Landmark Legal page (rank 4) summarises its cases without any of the five. Not readable here: Baer and Rendall, Landmark Legal and McDonald (study kit, no copy online) and Ontario Reg. 664 (the e-Laws page renders by script; Fault Determination Rules are Reg. 668 in any case). The vault's Harris page links Vicarious Liability, Collateral Benefits and Structured Settlement, and Harris is a Fall 2025 A2 reading that Fall 2026 dropped (see F-008); Feldblum, the only other vault link for Structured Settlement, is coded C2-C4. No resource page links Code of Consumer Rights. These five may rest on a retired reading, or on none, rather than on a Fall 2026 domain A reading.
- source_rank: 1
- proposed_action: Check the five against the study-kit readings (Baer and Rendall, Landmark Legal, McDonald) and Ontario Reg. 664. Keep any found there with the reading named on the concept page; drop the rest from domain A's Key concepts lines. Dropping one removes it from the 6C concept set, so it is a maintainer's call.
- applied: false
- fingerprint: d11143c9751c

## [F-012] B1 key concept Meredith Principles found in no readable domain B reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:21Z/f608
- date: 2026-10-18
- severity: minor
- status: open
- locus: Learning Objectives, *Key concepts:* line under B1
- claim: B1's Key concepts line lists Meredith Principles.
- evidence: Domain B readings per the CAS Exam 6C Content Outline, Fall 2026 (v04 2026-05-26; https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf, sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1), p.4: Agricultural Programs, Dutil, GOC Flood Risks, Government Insurers Study Note, Morneau Shepell, PACICC. 'Meredith' occurs nowhere in Dutil (https://www.casact.org/sites/default/files/2021-03/6C_Dutil.pdf, sha256:9e95fc241c006eabdaf6991179e47cd6ad4b5e475903eedf2092a3a3004f3c65), the Government Insurers Study Note (https://www.casact.org/sites/default/files/2021-03/6C_Government_Insurers_Study_Note.pdf, sha256:f3c3d4873705244ccbf7e7e59704f303073f91392d534a4b9e5fb7b9c0904d4f; its workers compensation discussion is of US state funds) or PACICC (https://www.casact.org/sites/default/files/2021-03/6C_PACICC.pdf, sha256:5f983f23846df2d2d36fdc6a8b20578b058eed910e3c96d2f9be30162b229441). The likeliest home, Morneau Shepell Chapter 18 (Workers' Compensation, assigned B1-B3 per the outline's table), is in the study kit and could not be read; no resource page links the concept. Unconfirmed, not shown absent.
- source_rank: 1
- proposed_action: Confirm against Morneau Shepell Ch. 18 and name it on the concept page; if it is not there, drop it from B1's Key concepts line (a maintainer's call: it changes the 6C concept set).
- applied: false
- fingerprint: 110f836a09d4

## [C-011] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:21Z/f608
- date: 2026-10-18
- status_set: in_review
- checks_run: Mechanical diff of every task and preamble (link aliases read as the page's words, Key concepts lines excluded) against outline pp.3-5: A preamble, A1-A3, B1-B3, C preambles 1-2 and C1, C2, C4, C5 match verbatim. B preamble: same words, CAS's bulleted program list joined with semicolons and a closing period added (formatting, as F-007/R records). C3: page reads 'Rules-based', the PDF prints 'Rules- based' (rendered p.5 at 150 dpi: a stray space in CAS's own text, not a vault error). Domain C in CAS's Fall 2026 order (C1 Annual Return, C2 reinsurance accounting, C3 financial health, C4 actuarial assessment, C5 standards). Titles and weights against p.2: A and B match (B follows p.2's 'Canadian ...', see C-001), weights 20-25 / 10-15 / 60-70 match; C title still drops 'of an Actuary' (F-010, open, out of scope). Readings lines A (19) and B (6) match pp.3-4; C as recorded under C-001/F-004. Objective-filter comment present in the Source Material callout. Key concepts: each of 120 checked for a reading coded to its domain (vault resource links, then full-text search of the readings): all but six confirmed; Prejudgment Interest found in FSCO Tech Notes (A1), Capital Required and reinsurance contracts issued in the OSFI MCT guideline (C2-C4), earthquake exposure risk in OSFI Earthquake and MCT s.4.5.1; five domain A concepts unconfirmed (F-011) and Meredith Principles (F-012).
- sources_checked: CAS, Exam Content Outline — Canada Regulation and Financial Reporting – Exam 6C, Fall 2026 (v04 2026-05-26, 14 pp.), PDF pp.2-6 and 7-14, sha256:1bd4b2b802cf0976c797bc068c2903fa8deaf43d9366a85aadf5b34a568275c1 — https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf; OSFI, Minimum Capital Test Guideline (2024), full text, sha256:d24a1551e11bac611332379a895a9001c80ce749975b5fe4abfb203170efd5bf — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024; OSFI, Earthquake Exposure Sound Practices guideline (6C study note), sha256:8b4fbc3a73d44f30961399bf2d7e1f752eaf94ad9c4ce4455f7042006b443a92 — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Earthquake.pdf; Domain A and B readings searched for key concepts: Davidson sha256:9b544951…7149f, FSCO Coverages sha256:cc44bb56…83d9, FSCO Tech Notes sha256:b2ca7a6c…d2a0, FSRA Private Auto sha256:c2069298…c06e, IBC Code of Conduct sha256:9e4bd45e…5cc5, Marshall sha256:326913d5…d8fc, KPMG PACICC sha256:dfeb3261…f8fd, Government Insurers Study Note sha256:f3c3d487…4d4f, Dutil sha256:9e95fc24…3c65, PACICC sha256:5f983f23…9441 (casact.org/sites/default/files/2021-03|2022-05|2023-08/6C_*.pdf; pacicc.ca)
- note: In review, not verified: the Learning Objectives now transcribe the Fall 2026 outline (F-001, F-002, F-005, F-006, F-007 resolutions confirmed against pp.3-5), but F-008, F-009 and F-010 stay open, and two new minor findings (F-011, F-012) record key concepts not located in any readable reading of their domain. No page edits in this run; no transcription slips found.
