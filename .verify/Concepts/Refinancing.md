---
target: Concepts/Refinancing.md
created: 2026-09-28
---

## [F-001] Says the balance is 'always' computed at the old rate
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: first bullet after the formulas
- claim: 'The balance is always computed at the old rate — that is the amount the lender is owed.'
- evidence: NOTE p.2, 'Refinanced loans': 'the outstanding balance of the existing loan is assumed to be calculated using the original loan's interest rate unless specified otherwise.' It is a default an exam question can override, not a rule.
- source_rank: 1
- proposed_action: Delete 'always' (done); a maintainer may add NOTE's 'unless specified otherwise'.
- applied: true
- fingerprint: e58d0dcde2c8

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Deleted the word 'always'; the sentence now states the old-rate balance without claiming it holds in every case.

## [F-002] Callable-bond / prepayment-risk remark not found in any FM source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: last bullet
- claim: 'The borrower's right to refinance when rates fall is what makes a lender's cash flows uncertain — the same option an issuer holds in a Callable Bond, and the source of Prepayment Risk for mortgage investors.'
- evidence: Searched the syllabus, NOTE, the sample questions/solutions and FIN: FIN §42 p.380 describes callable bonds, but no source read ties loan refinancing to prepayment risk or to the call option. General-finance claim, stated as fact, unsourced.
- source_rank: 3
- proposed_action: Maintainer: cite a source or mark it as context beyond the FM syllabus.
- applied: false
- fingerprint: a8ccbdb961a0

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Refinancing in SYL p.3 outcome b; L' = OB_k (+ fees), OB_k = P a_{n-k} at the old rate, P' = L'/a_{n'|i'} vs SOA-S Q60 p.18 (B = 4057.07 a_144@0.75% = 356,499.17, new payment on the balance) and NOTE p.2; both examples recomputed in python: P = 23,598.23, OB_8 = 187,433.35 (prospective = retrospective), P' = 21,372.90, saving 2,225.34, I = 9,471.67, PR = 11,901.23, old I = 13,120.33, n' = 10.52, OB_10 = 11,750.95, final 12,338.49 (unrounded P) — all resolve. LaTeX align* blocks in callouts fine per vaultMath. Fee treatment is the vault's own framing (no source), low-consequence. Links resolve.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2 (Refinanced loans), sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 60, questions PDF p.27, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 60, solutions PDF p.18, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §37 Finding the Loan Balance Using Prospective and Retrospective Methods, PDF p.334-335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-002
- status: resolved
- note: Bullet deleted. Re-searched the FM syllabus, NOTE, FM-24-17, FM-23-05 and Finan: none ties loan refinancing to prepayment risk or to a callable bond's call option (FM-24-17 p.2 mentions only that a rate change may trigger a bond's call; the vault's Prepayment Risk page is Exam 9 material and unverified). With no FM source, the claim is removed rather than kept. While here, the old-rate sentence gained NOTE p.2's qualifier ('unless specified otherwise'), which the F-001 resolution left to a maintainer.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Refinancing in SYL p.3 outcome b; old-rate balance 'unless specified otherwise' vs NOTE p.2; L' = OB_k (+ financed fees), OB_k = P a_{n-k}, P' = L'/a_{n'|i'} vs Finan p.335 and SOA S60 (4,057.07 a_144@0.75% = 356,499.17 refinanced); keep-the-payment variant with a smaller final payment vs SOA Q243. Both examples recomputed in python: a_20@7% = 10.594014, P = 23,598.23, OB_8 = 187,433.35, L' = 189,433.35, a_12@5% = 8.863252, P' = 21,372.90, saving 2,225.34, I = 9,471.67, PR = 11,901.23, old I = 13,120.33; a_n' = 8.027438, n' = 10.52, OB_10 = 11,750.95, final 12,338.49. Unsourced callable-bond/prepayment bullet deleted (F-002). Links and align* blocks fine; validate_links clean. Medium: the worked examples are the vault's own; fee framing is the vault's.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 60, solutions PDF p.18, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 243, questions PDF p.101, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf
