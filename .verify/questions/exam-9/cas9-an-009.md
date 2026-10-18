---
target: questions/exam-9/cas9-an-009.md
created: 2026-10-18
---

## [F-001] Tests PSA/CPR/SMM prepayment mechanics that no Exam 9 reading teaches
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T14:02Z/g6e9
- date: 2026-10-18
- severity: major
- status: open
- locus: whole question; frontmatter topic/learning_objective
- claim: The question asks for a PSA-based monthly prepayment (CPR ramp, CPR-to-SMM conversion, prepayment on balance net of scheduled principal) as Exam 9 task C5 material.
- evidence: CAS Exam 9 Content Outline Fall 2026 p.5 names prepayment under task C5, and pp.7-8 assign C5 to Coval, Jurek & Stafford (C5-C6) and Panning (C3, C5) only. A full-text search of Panning (casact.org, 12 pp., sha256:9f569b0e…) finds zero occurrences of 'prepay', 'mortgage', 'PSA', 'CPR', 'callable' or 'convexity'. Coval, Jurek & Stafford could not be read from the publisher (aeaweb.org PDF returned 403); per its vault resource page (rank 4, consistency only) it covers tranching, CDO ratings and systematic-risk pricing, not mortgage prepayment models. The only source the writer cited, the OCC Comptroller's Handbook (not an Exam 9 reading), defines CPR, SMM and 100% PSA (pp.20-21) but not the SMM compounding formula or the net-of-scheduled-principal convention the explanation uses. The arithmetic itself is right (key C 126,372 reproduced; distractors reproduce their stated errors), so this is a syllabus-fit finding, not a wrong key.
- source_rank: 1
- proposed_action: Replace with a question a different writer builds on what Panning (franchise-value duration, ALM) or Coval, Jurek & Stafford (default correlation and tranche risk) actually teach for task C5, or retire the question / mark it off_syllabus. Not fixable within the checker's limits (would require a new question).
- applied: false
- fingerprint: 9e712670110d

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:02Z/g6e9
- date: 2026-10-18
- status_set: in_review
- checks_run: blind recomputation in Python of the key and every distractor's stated reasoning; one keyed option; distinct options; explanation line by line; factual claims against source; topic/learning_objective/wiki_link against Exam 9 (CAS).md objectives (all link targets exist, + for spaces); format per question-writer formats.md; validate_content.py
- sources_checked: OCC, Comptroller's Handbook: Interest Rate Risk (v1.0), pp.20-21 (CPR, single month mortality, 100% PSA: 0.2%/month to 6% at month 30), sha256:e96b2f0fe28b67db124aa7e56743b1b4e0b30c00d60461f124c1f776d96e2aac — https://www.occ.gov/publications-and-resources/publications/comptrollers-handbook/files/interest-rate-risk/pub-ch-interest-rate-risk.pdf; Panning, Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (Willis Re, 2006), full text pp.1-12 searched, sha256:9f569b0edf7a677b08716b2c06103c0c7826007d00c5a17c5f4d32f129e32278 — https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), Domains A-D tasks pp.3-6 and text references pp.7-8, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Arithmetic correct (key C reproduced blind, each distractor reproduces its error; OCC pp.20-21 confirms the PSA ramp and CPR/SMM definitions). Left in_review: open major F-001 — the PSA/SMM mechanics are not taught by the C5 readings (Panning searched, zero hits; Coval, Jurek & Stafford unreachable from the publisher).

## [C-002] What the two C5 readings say about prepayment
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/9c55
- date: 2026-10-18
- locus: whole question
- note: For the writer replacing this question (F-001). Both task C5 readings were read in full this run. PANNING (casact.org, 12 pp., sha256:9f569b0e…): no occurrence of 'prepay', 'mortgage', 'callable', 'convexity', 'MBS', 'credit' or 'reinsur'. The only mention of default is p.6, defining y: 'the risk-free interest rate, applicable to calculating the income from the firm's assets and for discounting the firm's future cash flows; default risk is considered in a separate forthcoming paper'. Panning's interest-rate content is the duration of franchise value: F = cr·S·(a+(b−1)y)/((1+y)(1+y−cr)) (p.8), D = (a−b+1)/((1+y)(a+by−y)) + 1/(1+y−cr) (p.9), Table 1 (p.9), total-value duration 6.70 and 5.18 (p.10), pricing strategy a=10%, b=1 → 7.62 and 3.27 (p.10), a=6.2%, b=1.763 for zero duration (p.11). COVAL, JUREK & STAFFORD (HBS Working Paper 09-060, the authors' institution's copy, sha256:887b5c53…; the published JEP PDF could not be fetched): no occurrence of 'prepay', 'pre-pay' or 'refinanc'. Mortgages appear only as collateral whose default behaviour drives tranche losses — p.16: subprime origination 'grew from $96.8 billion in 1996 to approximately $600 billion in 2006, accounting for 22 percent of all mortgages issued that year'; p.17: private-label MBS 'carried the dual risk of high rates of default due to the low credit quality of the borrowers; and high levels of default correlation as a result of pooling mortgages from similar geographic areas and vintages'; p.17: 'the probability of default and the expected recovery values have both been worse than expected'. Conclusion: neither reading teaches prepayment, PSA, CPR or SMM; the outline names prepayment only as an example in task C5 (p.5). A C5 replacement can be built on Panning's franchise-value duration or on CJS's default probability, default correlation and recovery sensitivity of tranches (Tables 2-3).

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:claude-code
- run_id: 2026-10-18T18:16Z/d3cd
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Maintainer decision (2026-10-18, docs/content-plan.md §6): kept and served, as the only served question on Prepayment Risk (2016 Q12 and 2019 Q9 are off_syllabus; replacing it would leave the concept untested, G6). A note under the explanation now says the PSA/CPR/SMM conventions are outside both C5 readings and points to Mortgage-Backed Security; to be checked against an open text.

## [F-002] Stem ages the PSA ramp by the pool's life rather than the loans' age
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/0040
- date: 2026-10-18
- severity: nit
- status: open
- locus: stem, sentence 2
- claim: At the start of month 10 of the pool's life ... 100% PSA is a conditional prepayment rate (CPR) of 0.2% per month of age
- evidence: SIFMA/BMA Uniform Practices Ch. SF p.SF-6 §B.2c: 100% PSA assumes 0.2% CPR 'in the first month following origination of the mortgage loans (not the pool)', MONTH being the period in which the age of the mortgage loans increases from MONTH-1 to MONTH. The stem counts age from the pool's life; for a pool of newly originated loans the two coincide and the key (CPR 3% at 150% PSA, month 10) is unaffected, so this is wording only.
- source_rank: 3
- proposed_action: Writer: say the loans are in month 10 of their age (e.g. 'a pool of loans in their tenth month since origination') so the stem follows the PSA convention. Wording change, not applied by the checker.
- applied: false
- fingerprint: d0b90fd0198b

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/0040
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: blind recomputation from the stem before reading the key (CPR 0.2%x10x1.5 = 3%; SMM = 1-(0.97)^(1/12) = 0.0025350; x (50,000,000-150,000) = 126,372 = C); explanation line by line; each distractor recomputed to its stated error (A 83,855 at 100% PSA; B 124,625 at CPR/12; D 390,247 at CPR 9%; E 1,495,500 at CPR on one month); one keyed option, five distinct options; PSA ramp, CPR/SMM conversion and net-of-scheduled-principal convention against SIFMA Ch. SF; reinvestment claim against Fannie Mae prospectus; C5 wording in the note against the Exam 9 outline; validate_content.py; wiki_link targets exist
- sources_checked: The Bond Market Association (SIFMA), Uniform Practices — Chapter SF, Standard Formulas for the Analysis of Mortgage-Backed Securities (02/01/99), Ch. SF, §B.2 a-c, pp.SF-5–SF-6, sha256:9ca07655579c51cd2d9bb783d4d3486e99150f19d99ddf7b0782573c1b738784 — https://www.sifma.org/wp-content/uploads/2017/08/chsf.pdf; Fannie Mae, Guaranteed MBS Pass-Through Securities (Mega Certificates) prospectus supplement, October 1, 1996, Reinvestment Risk p.2; Prepayment Considerations p.3, sha256:162dd92f71f1e30122ea74c2cbaa57fa4982fd537545f6ebfa74cd9e0fa6d690 — https://capmrkt.fanniemae.com/sites/g/files/koqyhd216/files/syndicated/mbs/megapros/FM_October_1_1996.pdf; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), task C5 and its readings p.5, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Key C reproduced blind. SIFMA Ch. SF (rank 3): SF-6 §B.2c gives 100% PSA as 0.2% CPR in month 1 rising 0.2% a month to 6.0% at month 30, a multiple scaling the CPR (CPR = min{PSA/100 x 0.2 x max(1, min(MONTH,30)), 100}); SF-6 §B.2b (1-SMM/100)^12 = 1-CPR/100, so SMM is the compounded monthly rate and CPR/12 is wrong (B's error); SF-5 §B.2a SMM = 100(F_sched-F2)/F_sched, i.e. prepayment is SMM times the balance after scheduled amortisation, the explanation's convention. Fannie Mae's 1996 Mega prospectus p.3: in declining rate environments prepayments are likely to increase; p.2: reinvestment yields may be significantly lower — supports the explanation's closing sentence. Outline p.5 task C5 reads 'Estimate and manage interest rate and credit risk (e.g., default, prepayment, reinsurance)', as the note says; the note's claim that neither C5 reading treats prepayment rests on C-002 (both readings read earlier today) and F-001/R. No official solution exists (vault-written), hence medium. Open nit F-002: stem ages the ramp by pool life, SIFMA by loan age; no effect on the key.
