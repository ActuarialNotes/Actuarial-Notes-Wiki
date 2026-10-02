---
target: Concepts/Redemption Value.md
created: 2026-09-28
---

## [F-001] Example price one cent off (v^5 rounded to four places)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 'Bond Redeemable at a Premium', answer
- claim: '= 60(4.1002) + 1050(0.7130) = 246.01 + 748.65 = 994.66'
- evidence: Recomputed: v^5 at 7% = 0.712986, 1050v^5 = 748.64 (748.6355), 60a_5|7% = 246.01, P = 994.6473 → 994.65. The page multiplies 1050 by the rounded 0.7130 (= 748.65).
- source_rank: 5
- proposed_action: Show 1050(0.712986) = 748.64 and P = 994.65.
- applied: false
- fingerprint: 701433213420

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition of C vs FIN §43 p.384; C = F by default vs NOTE p.2; redemption above/below face vs FIN Ex 42.2 p.382 (redeemed at 105%), SOA Q427 (7500 on face 7000) and Q139 (2800 on face 3000); formula vs FIN p.385; callable bonds — redemption value varies by call date, price at the worst case — vs FIN §47 p.421. Example recomputed in one python script (work/c-bonds.py): 994.6473 vs page 994.66 (F-001). Links and figure resolve. Example is the vault's own, so medium.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a)-b), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §43 The Various Pricing Formulas of a Bond, PDF p.384, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §42 Types of Bonds, Example 42.2, PDF p.382, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 139, questions PDF p.59, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 427, solutions PDF p.111, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §47 Callable Bonds and Serial Bonds, PDF p.421, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Example now carries v^5 to six places: 60(4.1002) + 1050(0.712986) = 246.01 + 748.64 = 994.65 (python: 60a_5|7% = 246.011846, 1050v^5 = 748.635488, P = 994.647335). Also added, for consistency with this run's Premium/Discount fix, a sentence that redemption 'at a premium' (C > F) is not the same as a bond bought at a premium (P > C, SOA S421 p.110), and a closing line on the example: redeemable at a premium but bought at a discount, P = 994.65 < C = 1050, g = 60/1050 = 5.71% < 7% (FIN p.396).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: New version re-read. Definition of C vs FIN p.384; C = F by default vs NOTE p.2; redemption above/below face vs FIN p.386 Ex 43.1 (redeemable at 105) and SOA Q139 p.59 (2800 on face 3000); new sentence — bought at a premium/discount compares P with C — vs SOA S421 p.110 and FIN p.396; price formula vs FIN p.385; callable bonds priced at the worst case vs FIN p.421. Example recomputed in python: a_5|7% = 4.100197, 60a = 246.011846, v^5 = 0.712986, 1050v^5 = 748.635488, P = 994.647335 → 246.01 + 748.64 = 994.65; g = 60/1050 = 0.0571429 → 5.71% < 7%, P < C, as printed. Links and figure resolve; validate_links.py --studiable clean. Example is the vault's own, so medium.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.384-385, p.396, p.421, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 421, solutions PDF p.110, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 139, questions PDF p.59, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf
