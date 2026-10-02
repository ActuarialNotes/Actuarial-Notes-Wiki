---
target: Concepts/Book Value.md
created: 2026-09-28
---

## [F-001] Retrospective line mis-multiplied; 11-cent gap put down to rounding
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 'Book Value of a Premium Bond', Retrospective line and closing remark
- claim: 'BV_2 = 1053.46(1.06)^2 − 80 s_2 = 1053.46(1.1236) − 80(2.0600) = 1183.56 − 164.80 = $1,018.76' and '(Rounding difference; both methods agree.)'
- evidence: Recomputed: 1053.46 × 1.1236 = 1183.67 (1183.6677), not 1183.56; 1183.67 − 164.80 = 1018.87, the same as the prospective 1018.87 (exact 1018.8679). The 0.11 gap is a multiplication slip, not rounding. The two formulas themselves are right: prospective = PV of remaining coupons and redemption (FIN §44 p.396; SOA S97 p.27), and the retrospective form follows from S97's recursion BV_4 = BV_3(1 + i) − Fr.
- source_rank: 5
- proposed_action: Show 1053.46(1.1236) = 1183.67 and BV_2 = 1,018.87 by both methods; drop the rounding remark.
- applied: false
- fingerprint: 7de06e1391c0

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Prospective formula vs FIN §44 p.396 (B_t = Fr·a_{n−t} + Cv^{n−t}) and SOA S97 p.27 ('prospective formula for the book value') / S7 p.5; retrospective form P(1+j)^k − Fr·s_k from S97's recursion BV_{t}(1+i) − Fr = BV_{t+1} (same algebra as FIN §37's retrospective loan balance); BV_0 = P, BV_n = C, write-down/write-up vs FIN p.396-397; interest j·BV_{k−1} and principal adjustment Fr − j·BV_{k−1} vs FIN p.397 and BA2 p.21 ('amortized value'). Example recomputed in one python script (work/c-bonds.py): P = 1053.4602, prospective BV_2 = 1018.8679 (page right), retrospective slip F-001. [[Amortization Schedule]] and [[Yield Rate]] resolve; figure exists. Example is the vault's own, so medium.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a)-b), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 97, solutions PDF p.27, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 97, questions PDF p.42, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 7, solutions PDF p.5, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 326, solutions PDF p.86, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §44 Amortization of Premium or Discount, PDF p.396-397, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §37 Finding the Loan Balance Using Prospective and Retrospective Methods, PDF p.334-335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus (SOA study note FM-23-05), PDF p.21, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf

## [F-002] Price line shows v^3 = 0.8396 but multiplies it to 839.62
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- severity: nit
- status: open
- locus: example 'Book Value of a Premium Bond', price line
- claim: '80(2.6730) + 1000(0.8396) = 213.84 + 839.62 = $1,053.46'
- evidence: Recomputed in python: v^3 at 6% = 0.839619, so 1000v^3 = 839.62 (the printed product and the price 1053.46 are right), but 1000 × 0.8396 as printed is 839.60 — the displayed factor is rounded one place too far for the product beside it.
- proposed_action: Show the factor as 0.839619.
- applied: true
- fingerprint: 5ac3acca5bd4

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-002
- status: resolved
- note: Price line now shows 1000(0.839619) = 839.62; the line resolves: 213.84 + 839.62 = 1053.46 (python P = 1053.460239).

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Retrospective line corrected to 1053.46(1.1236) = 1183.67 (python 1183.667656), and 1183.67 − 164.80 = 1,018.87 — the same as the prospective 1,018.87 (exact 1018.867925). Replaced '(Rounding difference; both methods agree.)' with 'Both methods give $1,018.87.' Formulas unchanged (prospective per FIN §44 p.396; retrospective from SOA S97's recursion).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: New version re-read. Prospective BV_k = Fr a_{n−k} + Cv^{n−k} vs FIN p.396 and SOA S97; retrospective P(1+j)^k − Fr s_k from S97's recursion BV_t(1+j) − Fr = BV_{t+1} (same algebra as FIN p.334-335's retrospective loan balance); BV_0 = P, BV_n = C, write-down/write-up and interest j·BV_{k−1} vs FIN p.396-397 and FM-23-05 p.21. Example recomputed in python: a_3|6% = 2.673012, 80a = 213.840956, v^3 = 0.839619, 1000v^3 = 839.619283, P = 1053.460239; prospective 80(0.9434) = 75.47 + 943.40 = 1018.87 (exact 1018.867925); retrospective 1053.46 × 1.1236 = 1183.667656 → 1183.67 − 164.80 = 1018.87. Every printed figure matches. Links and figure resolve; validate_links.py --studiable clean. Example is the vault's own, so medium.
- sources_checked: SOA Exam FM Sample Solutions (rev. Aug 2026), Q 97, solutions PDF pp.27-28, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.396-397, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.334-335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA study note FM-23-05, Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus, p.21, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf
