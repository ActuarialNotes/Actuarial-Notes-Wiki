---
target: Concepts/Bonds.md
created: 2026-09-28
---

## [F-001] Example line does not resolve: 246.01 + 713.00 written as 959.00
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 'Bond Pricing', answer
- claim: '= 60(4.1002) + 1000(0.7130) = 246.01 + 713.00 = 959.00'
- evidence: Recomputed: v^5 at 7% = 0.712986, so 1000v^5 = 712.99, not 713.00; as written 246.01 + 713.00 = 959.01. The exact price is 958.998 → 959.00, so the final figure is right and the 713.00 intermediate is the slip.
- source_rank: 5
- proposed_action: Show 1000(0.712986) = 712.99 so the line reads 246.01 + 712.99 = 959.00.
- applied: false
- fingerprint: 2b684bcd43e4

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definitions vs FIN §42 p.380 (term = issue to final payment; par/face value = amount the issuer agrees to repay; coupons = periodic interest) and §43 p.384-385 (P, F, C, r, n, i; yield = rate actually earned held to redemption; price = PV of all future payments); coupon rate annual and coupon = F × rate / payments per year vs NOTE p.1 and SOA Q40 p.19 ('annual nominal coupon rate of 8% payable semiannually'); book value as amortized value vs BA2 p.21; price formula vs FIN p.385. Example recomputed in one python script (work/c-bonds.py): a_5 = 4.100197, v^5 = 0.712986, P = 958.998 (F-001: 713.00 intermediate). Stem asks no explicit question (nit, not filed). All 10 links and the figure resolve. Example is the vault's own, so medium.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §42 Types of Bonds, PDF p.380, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §43 The Various Pricing Formulas of a Bond, PDF p.384-385, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus (SOA study note FM-23-05), PDF p.21, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 40, questions PDF p.19, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf

## [F-002] Discount explained against face value without saying the bond is redeemed at par
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- severity: nit
- status: open
- locus: example 'Bond Pricing', closing sentence
- claim: 'The bond sells at a **discount** (price < face) because coupon rate < yield rate.'
- evidence: SOA S421 (solutions PDF p.110) and FIN §44 p.396 measure a premium or discount against the redemption value C (P > C / P < C), and the coupon-rate-vs-yield test holds only when C = F (NOTE p.2 default). In this example C = F (no redemption value is stated), so the conclusion is right, but the sentence states the face-value test with no condition — the same wording this run corrects on Premium, Discount, Face Value and Market Value.
- proposed_action: Say the bond is redeemed at par (C = F = 1,000) and compare the price with the redemption value.
- applied: true
- fingerprint: aa5d7f763117

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-002
- status: resolved
- note: Closing sentence now reads: redeemed at par (C = F = 1,000), so it sells at a discount (price below the redemption value) because its 6% coupon rate is below the 7% yield — consistent with SOA S421 p.110 / FIN p.396 and the rewritten Premium and Discount pages.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Example line now shows 1000(0.712986) = 712.99, so it resolves: 60(4.1002) + 1000(0.712986) = 246.01 + 712.99 = 959.00 (python: a_5|7% = 4.100197, 60a = 246.011846, v^5 = 0.712986, 1000v^5 = 712.986179, P = 958.998026 → 959.00).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: New version re-read. Definitions (term, par/face value, coupons, yield as rate actually earned, price as PV of future payments) vs FIN p.380, p.384-385; coupon = F × annual rate / payments per year vs NOTE p.1 and SOA Q40 p.19; book value as amortized value vs FM-23-05 p.21; basic price formula vs FIN p.385; discount measured against the redemption value with C = F stated vs SOA S421 p.110, FIN p.396, NOTE p.2 (F-002). Example recomputed in python: a_5|7% = 4.100197, 60a = 246.011846, v^5 = 0.712986, 1000v^5 = 712.986179, P = 958.998026 → 246.01 + 712.99 = 959.00 as printed (the line now adds). All links and the figure resolve; validate_links.py --studiable clean. Example is the vault's own, so medium.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.380, p.384-385, p.396, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA, Notation and terminology used for Exam FM, p.1-2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 40, questions PDF pp.19-20, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 421, solutions PDF p.110, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA study note FM-23-05, Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus, p.21, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf
