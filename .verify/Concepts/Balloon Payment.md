---
target: Concepts/Balloon Payment.md
created: 2026-09-28
---

## [F-001] Worked example figures carry a rounding error from (1.08)^9 = 1.9990
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 'Balloon Payment on a Loan', answer
- claim: OB_9 = 19990 - 18731.40 = 1,258.60; B = 1,359.29; with K=1,200: OB_9 = 5,004.88, balloon 5,405.27.
- evidence: Recomputed (rank 5): (1.08)^9 = 1.999005, s_9@8% = 12.48756, OB_9 = 19990.05 - 18731.34 = 1258.71, B = 1258.71 x 1.08 = 1359.41; the page's own formula B = L(1+i)^n - K s_{n-1}(1+i) also gives 1359.41. With K=1200: OB_9 = 5004.98, 5004.98 x 1.08 = 5405.38. The page's figures follow from rounding the factors: 10,000 x 1.9990 = 19,990.00 (exact 19,990.05) and 1,500 x 12.4876 = 18,731.40 (exact 18,731.34), 0.11 in OB_9. Method is correct (FIN §37 p.335 retrospective formula).
- source_rank: 5
- proposed_action: Maintainer: carry (1.08)^9 to 6 places: 1,258.71 / 1,359.41 and 5,004.98 / 5,405.38.
- applied: false
- fingerprint: de8bf32cb34b

## [F-002] Example set up as a balloon payment produces a drop payment
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 'Balloon Payment on a Loan', prompt and last paragraph
- claim: Prompt: the borrower 'clears the loan with a balloon payment at the end of year 10'; the answer finds 1,359.29 < 1,500 and concludes 'making this actually a drop payment', then switches to K = 1,200.
- evidence: By the page's own definition and FIN §19 p.184-185 (balloon = last payment larger than the regular payment; drop = smaller payment), the prompt's 'balloon payment' is a drop payment; the example contradicts its own stem and self-corrects mid-answer. SOA's balloon questions set payments so the final payment is larger (Q126 questions PDF p.53: payments of 600 'except for a final balloon payment that is less than 1000'; Q337 p.142: 360 with balloon < 720).
- source_rank: 3
- proposed_action: Maintainer: rebuild the example with a regular payment that leaves a genuine balloon (e.g. the K = 1,200 case) and drop the self-correction.
- applied: false
- fingerprint: 8994f6abecc3

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition vs SYL p.3 and FIN §19 p.184-185; B = L(1+i)^n - K s_{n-1}(1+i) = OB_{n-1}(1+i) derived from the equation of value and checked numerically (1359.41 both ways); retrospective OB vs FIN §37 p.335 and SOA-S Q232 p.59; example recomputed (F-001 rounding, F-002 labelling). Note: SOA Q232 uses 'balloon' for a large payment one period after the 10th regular payment, whereas FIN p.184-185 describes the balloon as combined with the last regular payment; the page's general definition and its n-1/n formula fit both, so no conflict filed. Bullet 'balloon = OB accumulated plus any regular payment due then' is ambiguous but correct if OB means the residual after the regular payment. Links, figure resolve.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §19 Solving for the Unknown Number of Payments of an Annuity, PDF p.184-185, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §37 Finding the Loan Balance Using Prospective and Retrospective Methods, PDF p.334-335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 126, questions PDF p.53, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 232, questions PDF p.96, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 232, solutions PDF p.59, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 337, questions PDF p.142, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf

## [F-003] Origin and drop-contrast bullets omit the 'as long as necessary' case and misplace the drop payment
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- severity: minor
- status: open
- locus: first and third bullets
- claim: 'It arises when the regular payment amount is set below the level needed to fully amortize the loan in n periods'; 'a drop payment occurs when the regular payment slightly over-amortizes the loan and the last payment is reduced to pay off the small remaining balance exactly'.
- evidence: Finan p.184-185: when level payments run for as long as necessary the term n + k is not an integer, and the remainder is paid 'either at the same time as the last regular payment making the last payment larger than the regular payment (such a payment is called a balloon payment) or at the end of the period following the last regular payment. In this case the smaller payment is called drop payment.' FM-23-05 p.11-12 and SOA Q337 (solutions PDF p.89: n = 33.85, use 33, B = 360 + 288.75 = 648.75) use the same balloon. The page gave only the scheduled-balloon case (SOA Q232) and described the drop as a reduced last scheduled payment rather than one paid a period after the last regular payment.
- source_rank: 1
- proposed_action: State both origins of a balloon (Finan p.184-185 / SOA Q337; scheduled, SOA Q232 / Finan p.376 Problem 41.16) and define the drop contrast as Finan does.
- applied: true
- fingerprint: e80852a69658

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Example 1 now carries its factors to six places and recomputes every figure in python: (1.08)^9 = 1.999005, s_9@8% = 12.487558; the 1,500 case (now in Example 2) gives 19990.05 - 18731.34 = 1,258.71 and 1258.71 x 1.08 = 1,359.41; the 1,200 case gives 19990.05 - 14985.07 = 5,004.98 and 5004.98 x 1.08 = 5,405.38 (the page's formula B = L(1+i)^10 - K s_9(1.08) gives 5,405.38 too).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-002
- status: resolved
- note: Example 1's regular payment changed from 1,500 to 1,200, so the scheduled balloon at year 10 is 5,405.38 > 1,200 — a genuine balloon (the SOA Q232 pattern: payments for ten years and a final balloon at the end of the eleventh); the mid-answer self-correction is gone. The original 1,500 case is kept as a new Example 2 that shows both conventions on the same numbers, per Finan p.184-185: n = 9.90, remainder 1,258.71 at time 9; added to the 9th payment it is a balloon of 2,758.71 (8 x 1,500 then 2,758.71, the SOA Q337 convention), paid a year later it is a drop of 1,359.41. All recomputed in python.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-003
- status: resolved
- note: First bullet now gives both origins: level payments for as long as necessary with the remainder added to the last regular payment (Finan p.184-185, FM-23-05 p.11-12, SOA Q337) and a schedule whose payments are too small to repay the loan by the last date (SOA Q232, Finan p.376 Problem 41.16). The contrast bullet defines the drop payment as Finan p.185 does (paid one period after the last regular payment, smaller than it) and links Drop Payment. The ambiguous 'plus any regular payment due then' bullet now reads: the balance just after the previous payment accumulated one period, i.e. the regular payment due then plus what the regular payments leave unpaid (B = OB_{n-1}(1+i) = K + [L(1+i)^n - K s_n], checked algebraically and on Example 2: 2,758.71 both ways).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Definition (final payment larger than the regular payments) vs SYL p.3 and Finan p.184-185; the 'as long as necessary' balloon (remainder added to the last regular payment) vs Finan p.184-185, FM-23-05 p.11-12 (X = 5000(1.0075)^62 - 100 s_62 = 89.55) and SOA S337 (648.75 = 360 + 288.75), S126; the scheduled balloon vs SOA Q232 and Finan p.376 Problem 41.16; drop contrast vs Finan p.185; B = L(1+i)^n - K s_{n-1}(1+i) = OB_{n-1}(1+i) derived from the retrospective balance (Finan p.335) and checked numerically. Example 1 recomputed in python: (1.08)^9 = 1.999005, s_9 = 12.487558, OB_9 = 5,004.98, B = 5,405.38 (formula agrees). Example 2: a_n = 6.666667, n = 0.762140/0.076961 = 9.90, X = 19990.05 - 18731.34 = 1,258.71, balloon 2,758.71 (= formula with n = 9, s_8 = 10.636628), drop 1,359.41. Links (Outstanding Balance, Drop Payment) and figure resolve; validate_links clean. Medium: worked examples are the vault's own.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.184-185, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.376, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA study note FM-23-05, Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus, p.11-12, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 232, questions PDF pp.96-97, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 337, solutions PDF p.89, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 126, solutions PDF p.35, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
