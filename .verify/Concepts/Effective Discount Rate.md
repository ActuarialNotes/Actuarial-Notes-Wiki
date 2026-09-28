---
target: Concepts/Effective Discount Rate.md
created: 2026-09-28
---

## [F-001] T-bill example: effective annual rate is 4.16%, not 4.12%
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: Bank Discount example, answer line 40
- claim: Effective annual rate: i = (10000/9898.89)^{365/91} - 1 ≈ 4.12%.
- evidence: Recomputed: discount 10000 x 0.04 x 91/360 = 101.11 and price 9898.89 are right (actual/360 simple-discount T-bill convention, FIN §42 p.381). But 10000/9898.89 = 1.0102143 and 1.0102143^(365/91) = 1.041604, so i = 4.160%, not 4.12%. No standard reading reproduces 4.12%: exponent 360/91 gives 4.102%, compounding the quarter four times gives 4.149%, the simple 365-day equivalent 101.11/9898.89 x 365/91 gives 4.097%. The formula written on the line is the right one; its evaluation is wrong by 0.04 percentage points, so a student who works it correctly is told they are wrong.
- source_rank: 5
- proposed_action: Change 4.12% to 4.16% (1.0102143^(365/91) - 1 = 0.041604).
- applied: false
- fingerprint: 25f9c007a444

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Definition (interest paid at the beginning; 1-d advanced, 1 repaid) vs FIN §8 p.56-57; d = i/(1+i) = iv = 1 - v vs NOTE p.1, FIN (8.2)-(8.4) p.57; i = d/(1-d) vs FIN (8.1) p.57 and SOA-S Q87 p.25 (image); 1 accumulates to 1/(1-d) vs FIN §8 p.58 a(t) = (1-d)^-t and BA2 p.6 (25(1-.06)^-5 = 34.06). T-bill example (vault's own): simple bank discount on actual/360 matches FIN §42 p.381; discount 101.11 and price 9898.89 recomputed correct; effective rate recomputed 4.160% vs page 4.12% (F-001, major). Note: the example uses a simple bank-discount rate, not the effective discount rate d the page defines. Figure consistent. Links resolve; LaTeX fine. Low: a worked-example result is materially wrong and open.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money, learning outcomes a)-c), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 87, solutions PDF p.25, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §8, PDF p.56-58, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §42, PDF p.381, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus (SOA study note FM-23-05), PDF p.6, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf
