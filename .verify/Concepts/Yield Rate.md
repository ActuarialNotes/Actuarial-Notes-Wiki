---
target: Concepts/Yield Rate.md
created: 2026-09-28
---

## [F-001] Example 'verifies' a 6.5% yield for a price whose yield is 6.89%
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: example 'Finding the Yield Rate', question and answer
- claim: Question: '…currently priced at $950.26. Verify that the yield rate is approximately 6.5%.' Answer: P(6.5%) = $960.28, P(7%) = $947.51, 'By interpolation the yield is close to 6.5%–7%'.
- evidence: Recomputed: P(6.5%) = 960.27 (960.2729; the page's 960.28 comes from rounding 50 × 2.6485), P(7%) = 947.51 (947.5137). 950.26 lies 78% of the way from the 6.5% price to the 7% price: linear interpolation gives 6.892%, and solving 50·a_3|j + 1000v^3 = 950.26 exactly gives j = 6.8916%. The page's own figures show P(6.5%) differs from 950.26 by about $10, so the question's premise is false, and the answer never states the interpolated yield.
- source_rank: 5
- proposed_action: Maintainer: change the premise to ≈ 6.89% (or change the price to 960.27 for a 6.5% yield) and state the interpolated or solved yield.
- applied: false
- fingerprint: 4a9249fcdb68

## [F-002] Exam 6C questions link this page for the CIA 'portfolio yield rate', a different measure
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: backlinks: wiki_link of 3 questions/exam-6c files
- claim: The page defines the yield rate as the IRR equating one bond's future cash flows to its current price P.
- evidence: questions/exam-6c/cas6c-2014s-q33.md Part a ('Define "portfolio yield rate" according to the Canadian Institute of Actuaries' "Educational Note: Discounting"') gives 'The internal rate of return, that when applied to the cash flows of the company, produce the book value of the assets'; cas6c-2019f-q28.md: 'IRR such that PV (all CFs) is equal to book value currently of portfolio'; cas6c-2015s-q20.md weights bond yields to maturity by market value × duration. Those are a portfolio IRR against book value, not one bond's yield against its price. Flagged, not reconciled: the page is right for FM (FIN §43 p.384-385).
- source_rank: 4
- proposed_action: Maintainer: tag the 6C discounting questions to a portfolio-yield / discount-rate concept, or add a note here distinguishing the CIA portfolio yield rate.
- applied: false
- fingerprint: 47ab03592d68

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Definition (yield to maturity = IRR = rate actually earned held to redemption) vs FIN §43 p.384-385; premium iff Fr > Cj vs FIN §44 p.396; inverse price-yield relation vs FIN p.384-385; yield rate annual unless stated vs NOTE p.1 (page's j is per-period notation — not an error); BA II Plus yield solve vs BA2 p.20. Example recomputed in one python script (work/c-bonds.py): exact yield for 950.26 = 6.8916% — F-001 major. Exam 6C backlinks — F-002 minor. The 'meaning the coupon rate exceeds the yield rate' gloss holds under C = F (NOTE p.2 default) — not filed. Links and figure resolve. Low because a major is open.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a)-b), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §43 The Various Pricing Formulas of a Bond, PDF p.384-385, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §44 Amortization of Premium or Discount, PDF p.396, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus (SOA study note FM-23-05), PDF p.20, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Example premise changed from 'verify that the yield is approximately 6.5%' to 'find its yield rate' for the same bond and price (950.26). The answer brackets the root at P(6.5%) = 960.27 (the page's 960.28 was a rounding of 50 × 2.6485) and P(7%) = 947.51, interpolates j ≈ 0.065 + 0.005(10.01/12.76) = 6.892%, and states the exact solution j = 6.89% with the BA II Plus TVM keys (FM-23-05 p.21). Python: bisection on 50 a_3|j + 1000 v^3 = 950.26 gives 6.8916%.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-002
- status: resolved
- note: No Concepts/ page defines the CIA portfolio yield rate (grep -il 'portfolio yield' Concepts/ finds only mentions inside Economic Value, Financial Asset Classification and IFRS 17 Discount Rates, none of them that concept), so the Concepts/Yield+Rate wiki_link entry was dropped from questions/exam-6c/cas6c-2014s-q33.md, cas6c-2015s-q20.md and cas6c-2019f-q28.md; each keeps Concepts/Loss+Reserve+Discounting and two other links. Hashes refreshed with verify_check.py --sync on each (still unverified); validate_content and question_lint clean. These were the only three files outside exam-fm and exam-p linking this page.
