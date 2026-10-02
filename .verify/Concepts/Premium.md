---
target: Concepts/Premium.md
created: 2026-09-28
---

## [F-001] Premium bond defined as price above face value; SOA defines it as price above redemption value
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: definition, formula and bullets, lines 14-19
- claim: 'A **premium** bond is a [[Bonds|bond]] whose price P is above its [[Face Value|face value]] (redemption value) F.' / '$$P > F$$' / 'Occurs when the coupon rate is above the yield rate' / 'The gap P − F is written off … as the book value falls to F by maturity.'
- evidence: SOA S421 (solutions PDF p.110): 'The definition of "purchased at premium" is P > C; purchase price greater than redemption value' — Q421 (questions PDF p.178) is built on separating face amount from redemption value. FIN §44 p.396: premium = P − C = C(g − i)a_n, arising when g = Fr/C exceeds i. Comparing price with face value, and coupon rate with yield, gives the same answer only when C = F — FM's default (NOTE p.2 'Unless otherwise stated … the redemption value of a bond is equal to the face amount'), but they differ in SOA Q138 (questions PDF p.58: face 7500; redemption value 7660.15 per S138, solutions PDF p.38) and Q139 (questions PDF p.59: face 3000, redemption 2800). The page labels F as the redemption value, merging the two symbols. On SOA Q139 the price is 2955.08 (S139, solutions PDF p.38) — a premium by SOA's definition (P > C = 2800) and a discount by the page's (P < F = 3000). The book value falls to C, not F (FIN p.396, B_n = C).
- source_rank: 1
- proposed_action: Maintainer: define a premium bond as P > C, the premium as P − C, the condition as Fr > Cj (g > j), note C = F as FM's default (NOTE p.2), and have the book value fall to C.
- applied: false
- fingerprint: bb33b773a0bf

## [F-002] Linked from 33 CAS Exam 5 questions that mean insurance premium
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: backlinks: wiki_link of 33 questions/exam-5 files
- claim: The page defines 'premium' only as a bond priced above its face value.
- evidence: 33 Exam 5 question files list `Concepts/Premium` in wiki_link (`grep -rl '^  - Concepts/Premium$' questions/exam-5`), e.g. questions/exam-5/cas5-2015f-q5.md (topic 'Policy Provision Changes') and cas5-2016s-q9.md (topic 'Deductible Rating'), all learning_objective 'Ratemaking', where premium is the price of insurance. The vault's own Concepts/Insurance Premium.md says: 'Not the bond premium. The [[Premium]] page is Exam FM's bond premium … This page is the price of insurance.' A reader following the concept from any of those questions lands on a bond definition. No exam page links [[Premium]]; only fm-007 and fm-040 use it in the FM sense. Flagged, not reconciled — the terms legitimately differ between the exams.
- source_rank: 4
- proposed_action: Maintainer: retag the 33 Exam 5 questions from Concepts/Premium to Concepts/Insurance Premium (a change to those question files, not to this page).
- applied: false
- fingerprint: 85789af1c9d7

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Definition vs SOA S421 p.110 (P > C) and FIN §44 p.396 (premium P − C when g > i) — F-001 major; backlinks grepped across questions/ and Exam *.md — 33 Exam 5 questions tag this page with the insurance meaning, F-002 major (rank 4, consistency). Example: 7% coupon vs 5% yield with C = F → P > 1000 for every term 1-59 years (recomputed in one python script (work/c-bonds.py)), correct. [[Bonds]], [[Face Value]], [[Amortization of Premium]], [[Discount]] resolve; no figure; LaTeX fine. Low because majors are open.
- sources_checked: SOA Exam FM Sample Solutions (rev. Aug 2026), Q 421, solutions PDF p.110, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 421, questions PDF p.178, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 139, questions PDF p.59, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 139, solutions PDF p.38, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §44 Amortization of Premium or Discount, PDF p.396, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Redefined against the redemption value, per SOA S421 (solutions PDF p.110: 'purchased at premium' is P > C) and FIN §44 p.396: premium bond P > C, premium = P − C = (Fr − Cj)a_n|j = C(g − j)a_n|j, positive exactly when the modified coupon rate g = Fr/C exceeds the yield. Stated C = F as the FM default only (NOTE p.2) — under it the coupon-rate-vs-yield test and 'above par' hold — and that with C ≠ F one compares P with C and the yield with g. Book value now falls to C (FIN p.396, B_n = C). Face value and redemption value are now separate symbols and links ([[Face Value]], [[Redemption Value]]). Kept the par example (now says redeemable at par, C = F). Added a second example where the tests part ways: F = 1000, C = 950, 5% annual coupons, 10 years, yield 5.2% → g = 5.263%, Fr − Cj = 0.60, a_10|5.2% = 7.6473, premium 4.59, P = 954.59 (python: basic formula 382.3642 + 572.2242 = 954.5884 agrees) — a premium bond priced below its face value with its coupon rate below the yield, the SOA Q139 situation (P 2955.08 < F 3000 but > C 2800).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-002
- status: resolved
- note: Retagged all 33 CAS Exam 5 questions that linked this page in the insurance sense: wiki_link entry Concepts/Premium → Concepts/Insurance+Premium (the vault's page for the price of insurance, which disambiguates itself from this one); no file already linked Insurance+Premium, so each keeps the same number of links. Files: cas5-2014f-q12, -q18, -q2, -q7; cas5-2014s-q11, -q15, -q17, -q19, -q2; cas5-2015f-q11, -q13, -q2, -q5, -q6, -q9; cas5-2015s-q1, -q12, -q13, -q17, -q18, -q4, -q5, -q7, -q9; cas5-2016f-q13, -q6, -q7; cas5-2016s-q1, -q12, -q13, -q18, -q2, -q9 (all under questions/exam-5/). Each re-hashed with verify_check.py --sync (still unverified). Check: grep for '- Concepts/Premium' outside questions/exam-fm now finds 0 files; only fm-007 and fm-040 (FM bond sense) link this page. validate_content.py on the 33 files passes; validate_links.py --studiable clean.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: New version re-read against sources. Definition P > C and premium P − C vs SOA S421 p.110 ('purchased at premium' is P > C, purchase price greater than redemption value). Formula P − C = (Fr − Cj)a_n|j = C(g − j)a_n|j with g = Fr/C vs FIN p.396 (premium = (Fr − Ci)a_n = C(g − i)a_n) and FIN p.384 (g defined as Fr/C). C = F only as the default vs NOTE p.2 ('Unless otherwise stated … the redemption value of a bond is equal to the face amount'). Book value falls to C vs FIN p.396 (B_n = C). Example 1 (par bond, 7% coupon vs 5% yield, C = F): P > 1000 for every term (FIN p.396 sign of (Fr − Cj)). Example 2 recomputed in python: a_10|5.2% = 7.647284, Cj = 49.40, g = 0.0526316, premium (Fr − Cj)a = 4.588370, P = 954.588370 (basic formula 382.364188 + 572.224182 agrees) → 4.59 / 954.59 as printed. Links resolve ([[Bonds]], [[Redemption Value]], [[Face Value]], [[Amortization of Premium]], [[Book Value]], [[Discount]]); validate_links.py --studiable clean. Backlinks: only fm-007 and fm-040 (bond sense) remain; the 33 Exam 5 insurance-sense links now point at Insurance Premium (F-002). Worked examples are the vault's own, so medium.
- sources_checked: SOA Exam FM Sample Solutions (rev. Aug 2026), Q 421, solutions PDF p.110, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 421, questions PDF pp.178-179, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 139, questions PDF p.59, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 139, solutions PDF p.38, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.384, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.396, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
