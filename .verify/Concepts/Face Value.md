---
target: Concepts/Face Value.md
created: 2026-09-28
---

## [F-001] Premium/discount stated against face value without the C = F condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet after the two purposes, line 18
- claim: 'When the [[Yield Rate]] differs from the coupon rate, the bond trades at a premium (price > F) or discount (price < F).'
- evidence: SOA S421 (solutions PDF p.110): 'The definition of "purchased at premium" is P > C; purchase price greater than redemption value' — Q421 (questions PDF p.178) is built on separating face amount from redemption value. FIN §44 p.396: premium = P − C = C(g − i)a_n, arising when g = Fr/C exceeds i. Comparing price with face value, and coupon rate with yield, gives the same answer only when C = F — FM's default (NOTE p.2 'Unless otherwise stated … the redemption value of a bond is equal to the face amount'), but they differ in SOA Q138 (questions PDF p.58: face 7500; redemption value 7660.15 per S138, solutions PDF p.38) and Q139 (questions PDF p.59: face 3000, redemption 2800).
- source_rank: 1
- proposed_action: Maintainer: add the condition C = F, or compare the price with the redemption value C (and the modified coupon rate Fr/C with the yield).
- applied: false
- fingerprint: 0401a72738b0

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition (par/face value; amount the issuer agrees to repay; printed on the bond) vs FIN §42 p.380 and §43 p.384; coupon = F × r vs FIN p.384; C = F when redeemed at par vs NOTE p.2 (default) and FIN p.384; premium/discount remark missing the C = F condition (F-001) vs SOA S421 p.110. 'Nominal value' synonym unsourced but benign — not filed. Example: 5000 × 0.04 = 200 or 5000 × 0.04/2 = 100 — both correct; NOTE p.1 would read an unqualified coupon rate as annual. No CAS exam page or question links this page. Links and figure resolve. Example is the vault's own, so medium.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a)-b), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §42 Types of Bonds, PDF p.380, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §43 The Various Pricing Formulas of a Bond, PDF p.384, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 421, solutions PDF p.110, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 139, questions PDF p.59, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf
