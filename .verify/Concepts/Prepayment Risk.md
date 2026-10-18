---
target: Concepts/Prepayment Risk.md
created: 2026-10-18
---

## [F-001] Page content appears in neither Exam 9 reading for task C5
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- severity: minor
- status: open
- locus: whole page (definition, CPR/SMM and prepayment formulas, PSA benchmark, effective duration and convexity, both examples)
- claim: The page teaches prepayment mechanics (SMM, CPR, 100% PSA, prepayment net of scheduled principal, effective duration/convexity of MBS, PACs) as Exam 9 material.
- evidence: The outline names prepayment only as an example in task C5, 'Estimate and manage interest rate and credit risk (e.g., default, prepayment, reinsurance)' (p.5), and assigns C5 to Coval, Jurek & Stafford and Panning (pp.7-8). Panning (12 pp.) has zero occurrences of 'prepay', 'mortgage', 'callable', 'convexity' or 'MBS'; the Coval, Jurek & Stafford working paper (HBS 09-060) has zero occurrences of 'prepay', 'pre-pay' or 'refinanc' and treats mortgages only as collateral whose default probability, default correlation and recovery drive tranche losses (pp.16-18). A rank-3 source, the OCC Comptroller's Handbook: Interest Rate Risk v1.0 p.21 (sha256:e96b2f0fe28b67db124aa7e56743b1b4e0b30c00d60461f124c1f776d96e2aac), confirms the 100% PSA ramp (0.2% a month to 6% CPR at month 30) and calls SMM 'the monthly rate of CPR', but no Exam 9 source supports the rest. Examples' arithmetic recomputed and correct (SMM 0.005143, prepayment $1,026,545; D_eff 4.0, C_eff -200). Panning, Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (Willis Re Working Paper, July 2006), pp.1-12 read in full (title page, contents p.2, Sections 1-8, Table 1 p.9, formulas pp.6-9 read from the rendered pages), sha256:9f569b0edf7a677b08716b2c06103c0c7826007d00c5a17c5f4d32f129e32278 — https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf; Coval, Jurek & Stafford, The Economics of Structured Finance, Harvard Business School Working Paper 09-060 (2008, the authors' institution's copy), printed pp.1-28 read in full (PDF pp.1-37) with Tables 1-3, sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf
- source_rank: 2
- proposed_action: Maintainer/writer decision: cut the page back to what Exam 9's sources support (prepayment named as a C5 example) or cite a reading that teaches the mechanics; the same gap underlies questions/exam-9/cas9-an-009.md F-001.
- applied: false
- fingerprint: 305400f90d26

## [F-002] Outline does not file prepayment under credit risk
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Where it sits'
- claim: The Exam 9 syllabus lists prepayment beside default and reinsurance under Credit Risk.
- evidence: Outline p.5, task C5: 'Estimate and manage interest rate and credit risk (e.g., default, prepayment, reinsurance).' The examples follow 'interest rate and credit risk' together; the outline does not place prepayment under credit risk. CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.5 Domain C tasks C1-C7 and pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- source_rank: 1
- proposed_action: Quote the task instead: the outline names prepayment, with default and reinsurance, as an example of the interest rate and credit risk of task C5.
- applied: false
- fingerprint: f8fff62f6102

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- status_set: in_review
- checks_run: full-text search of both C5 readings for prepayment terms; outline task wording; both examples recomputed; PSA ramp against OCC Comptroller's Handbook p.21 (rank 3); wiki links resolve
- sources_checked: CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.5 Domain C tasks C1-C7 and pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; Panning, Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (Willis Re Working Paper, July 2006), pp.1-12 read in full (title page, contents p.2, Sections 1-8, Table 1 p.9, formulas pp.6-9 read from the rendered pages), sha256:9f569b0edf7a677b08716b2c06103c0c7826007d00c5a17c5f4d32f129e32278 — https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf; Coval, Jurek & Stafford, The Economics of Structured Finance, Harvard Business School Working Paper 09-060 (2008, the authors' institution's copy), printed pp.1-28 read in full (PDF pp.1-37) with Tables 1-3, sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf
- note: Exam 9 is the only exam linking this page, and neither of its C5 readings discusses prepayment (F-001), so nothing on it could be verified against an Exam 9 source. Arithmetic is right.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:claude-code
- run_id: 2026-10-18T18:16Z/d3cd
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Maintainer decision (2026-10-18, docs/content-plan.md §6): page cut back to the outline's words. The SMM/CPR/PSA formulas, both worked examples, effective duration and convexity and the tranching paragraph removed; the page now says what task C5 says, that neither C5 reading treats prepayment, and points to Mortgage-Backed Security for the mechanics.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:claude-code
- run_id: 2026-10-18T18:16Z/d3cd
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: The 'lists prepayment under Credit Risk' sentence is gone; the page quotes task C5 and says the outline names prepayment as an example of task C5's interest rate and credit risk, the finding's proposed wording.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:33Z/326e
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: delta re-check of the cut-back page (git diff f588f535..HEAD), every sentence: the C5 quote against outline p.5 (word for word) and the C5 reading list against pp.7-8; 'neither reading treats prepayment' by full-text search of Panning and CJS; Panning's interest-rate-risk framing against its Executive Summary and franchise-value duration pages; the opening definition and extension risk against two open sources (Vanguard MBS Index Fund summary prospectus on SEC EDGAR; NY Fed Liberty Street Economics); the pointer to Mortgage-Backed Security against that page (SMM, CPR and the PSA benchmark are there); all four wiki links resolve
- sources_checked: CAS Exam 9 Content Outline, Fall 2026, p.5 task C5 wording; pp.7-8 text references (only Coval, Jurek & Stafford C5-C6 and Panning C3, C5 map to C5), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; Panning, Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (Willis Re, July 2006), pp.1-12 full-text searched (prepay, mortgage, refinanc, callable: none); Executive Summary p.2 (economic value exposed to interest rates; franchise value) duration of franchise value pp.8-9, asset and liability durations and total economic value pp.4, 10, sha256:9f569b0edf7a677b08716b2c06103c0c7826007d00c5a17c5f4d32f129e32278 — https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf; Coval, Jurek & Stafford, The Economics of Structured Finance (HBS WP 09-060, 2008), full-text searched (prepay, pre-pay, refinanc: none); mortgages appear as collateral whose default and default correlation drive tranche losses (pp.5, 8-18), sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf; Vanguard Mortgage-Backed Securities Index Fund Summary Prospectus, Dec 17 2021 (SEC EDGAR 497K), Principal Risks: prepayment risk and extension risk definitions, sha256:f382051f9bf3f9f05f66be55386fbb11b996ed87cae07f2ed81f1cf2fb989b8a — https://www.sec.gov/Archives/edgar/data/1021882/000168386321007296/f10518d1.htm; Federal Reserve Bank of New York, Liberty Street Economics, Convexity Event Risks in a Rising Interest Rate Environment (Mar 2014), sections Extension Risk; Duration and Convexity, sha256:ca74841f42335f144935a150bb0f54379fe00e5bb4f6866a9fd54ac5936179c0 — https://libertystreeteconomics.newyorkfed.org/2014/03/convexity-event-risks-in-a-rising-interest-rate-environment/
- note: Every sentence is sourced. Definition: the Vanguard prospectus says prepayment risk is 'the chance that during periods of falling interest rates, homeowners will refinance their mortgages before their maturity dates ... The Fund would then lose any price appreciation above the mortgage's principal and would be forced to reinvest the unanticipated proceeds at lower interest rates', and extension risk 'the chance that during periods of rising interest rates, homeowners will repay their mortgages at slower rates'; the NY Fed post says the same of refinancing and calls the slowdown 'extension risk'. Rank 3 for the definition. Medium (D22's ceiling): the outline assigns CJS's JEP 2009 text, and the 'no prepayment in CJS' search was run on the authors' HBS working paper.
