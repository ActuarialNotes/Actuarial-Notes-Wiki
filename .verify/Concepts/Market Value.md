---
target: Concepts/Market Value.md
created: 2026-09-28
---

## [F-001] Discount/premium stated against face value without the C = F condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullets, lines 21-22
- claim: 'When market yield exceeds the coupon rate, market value is below face (discount bond).' / 'When market yield is below the coupon rate, market value exceeds face (premium bond).'
- evidence: SOA S421 (solutions PDF p.110): 'The definition of "purchased at premium" is P > C; purchase price greater than redemption value' — Q421 (questions PDF p.178) is built on separating face amount from redemption value. FIN §44 p.396: premium = P − C = C(g − i)a_n, arising when g = Fr/C exceeds i. Comparing price with face value, and coupon rate with yield, gives the same answer only when C = F — FM's default (NOTE p.2 'Unless otherwise stated … the redemption value of a bond is equal to the face amount'), but they differ in SOA Q138 (questions PDF p.58: face 7500; redemption value 7660.15 per S138, solutions PDF p.38) and Q139 (questions PDF p.59: face 3000, redemption 2800).
- source_rank: 1
- proposed_action: Maintainer: add the condition C = F, or compare with the redemption value C.
- applied: false
- fingerprint: f846d306a1a0

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition (price at the prevailing market yield, as against the book value at the original yield) vs FIN Problem 45.13 p.411 (book vs market value after the market rate moves from 8% to 10.5%) and FIN §43 p.384-385 (price = PV of future payments at the yield; price and yield move inversely) — rank 3 only, so medium. (FIN §45 p.406 also calls the between-coupon book value the 'market price'; between-coupon valuation is off syllabus per SYL 4b — noted, not a vault error.) Exam 6C usage checked: cas6c-2013f-q25 (the one CAS file linking this page; amortized vs market value of bonds) uses the term the same way, as does cas6c-2015s-q20's bond table — no conflict. Example recomputed in one python script (work/c-bonds.py): 50a_8|6% = 310.4897, 1000v^8 = 627.4124, P = 937.9021 → 937.90, correct. F-001 minor open. Links and figure resolve. Example is the vault's own, so medium.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a)-b), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §43 The Various Pricing Formulas of a Bond, PDF p.384-385, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §45 Valuation of Bonds Between Coupons Payment Dates, Problem 45.13, PDF p.411, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 421, solutions PDF p.110, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Rewrote the two bullets to compare against the redemption value: market yield above the modified coupon rate g = Fr/C → market value below C (discount bond); below g → above C (premium bond), per SOA S421 p.110 (premium is P > C) and FIN §44 p.396 (premium = C(g − i)a_n if g > i; discount = C(i − g)a_n if g < i). Added a bullet that C = F unless a question says otherwise (NOTE p.2), in which case g is the coupon rate and the comparisons are with face value — the page's original statements, now with their condition. Links to [[Redemption Value]], [[Discount]], [[Premium]] added.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: New version re-read. Definition (price at the prevailing market yield, vs book value at the original yield) vs FIN p.384-385 and Problem 45.13 p.411; price formula Fr a_n|j + C v^n vs FIN p.385. Rewritten bullets (market value vs C, yield vs g = Fr/C; C = F by default) vs SOA S421 p.110, FIN p.396 and NOTE p.2. Example recomputed in python: a_8|6% = 6.209794, 50a = 310.4897, 1000v^8 = 627.4124, P = 937.9021 → 310.49 + 627.41 = 937.90 as printed. Links resolve (Present Value, Yield Rate, Book Value, Face Value, Redemption Value, Discount, Premium); figure Media/Figures/Market_Value.svg exists; validate_links.py --studiable clean. Example is the vault's own, so medium.
- sources_checked: SOA Exam FM Sample Solutions (rev. Aug 2026), Q 421, solutions PDF p.110, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.384-385, p.396, p.411, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Financial Mathematics Exam syllabus, December 2026, p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
