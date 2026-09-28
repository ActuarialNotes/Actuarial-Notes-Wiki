---
target: Concepts/Bond Price.md
created: 2026-09-28
---

## [F-001] Example price off by one cent from rounded intermediates
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: example 'Bond Price Calculation', answer lines 29-31
- claim: 'v^{20} = (1.03)^{-20} = 0.5537 … a = 14.877 … P = 40(14.877) + 1000(0.5537) = 595.08 + 553.70 = $1,148.78'
- evidence: Recomputed: v^20 at 3% = 0.553676, a_20|3% = 14.877475, 40a = 595.0990, 1000v^20 = 553.6758, P = 1148.7747 → 1,148.77. The page carries v^20 to four places and a to three, so both intermediates and the final cent are off. The method (basic formula, per-period rates 4%/3%, n = 20) matches FIN §43 p.385 and BA2 p.19.
- source_rank: 5
- proposed_action: Show 40(14.877475) + 1000(0.553676) = 595.10 + 553.68 = 1,148.77.
- applied: false
- fingerprint: b6d10580e7b9

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Basic formula P = Fr·a_n + Cv^n and premium/discount formula P = C + (Fr − Cj)a_n vs FIN §43 p.385 and BA2 p.19 (bond price 100v^40 + 5a_40 at 2.5%); price as PV of remaining payments vs SOA S7 p.5; premium iff Fr > Cj (P > C) vs FIN §44 p.396 and SOA S421 p.110 (premium means P > C); symbol definitions vs FIN p.384 and NOTE p.1-2. Example recomputed in one python script (work/c-bonds.py): 1148.7747 vs page 1148.78 (F-001, minor). Links/figure resolve; LaTeX fine. Example is the vault's own, so medium.
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a)-b), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §43 The Various Pricing Formulas of a Bond, PDF p.384-385, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §44 Amortization of Premium or Discount, PDF p.396, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus (SOA study note FM-23-05), PDF p.19, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 7, solutions PDF p.5, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 421, questions PDF p.178, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 421, solutions PDF p.110, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
