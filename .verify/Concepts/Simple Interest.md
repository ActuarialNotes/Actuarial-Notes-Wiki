---
target: Concepts/Simple Interest.md
created: 2026-09-28
---

## [F-001] Gives Treasury bills as an example of simple interest; T-bills are priced on a simple discount basis
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: second bullet (line 19)
- claim: 'It is commonly used for short-term instruments (e.g., Treasury bills, inter-period valuations).'
- evidence: Finan §42 p.381: 'Treasury bills. Short term debt with maturities of 13, 26, or 52 weeks. T-bills yields are computed as rates of discount. These yields are computed on a simple discount basis.' Finan §9 Problem 9.15 (p.74): 'Bills are sold at a discount from their face value.' Simple discount (a(t)^-1 = 1 - dt) is a different measure from simple interest. Finan §4 p.31 supports the rest of the bullet only in the sense that simple interest approximates compound interest over a fraction of a year.
- source_rank: 3
- proposed_action: Delete 'Treasury bills,' or replace it with an instrument actually quoted at simple interest; a maintainer's call.
- applied: false
- fingerprint: 7e4a73915298

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: A(t) = P(1+it) and a(t) = 1+it vs NOTE p.2 (page image: 'a(t) = 1 + ti, with t measured from the moment that cash flow occurs') and Finan §4 p.28-30: match. 'Interest only on the original principal' vs Finan Problem 1.5 p.12 and §6 p.41: match. Linear vs exponential vs Finan p.42: match. T-bill example -> F-001 (minor). Example recomputed: 2000(1 + 0.08*0.75) = 2000(1.06) = 2120 = page (Finan Example 4.2 p.30 accrues simple interest over a fraction of a year the same way). Links resolve; figure exists; LaTeX ok. Example is the vault's own -> medium.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money (5-15%), learning outcomes a)-d), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §1 The Meaning of Interest, Practice Problems 1.5-1.7, PDF p.12, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §4 Linear Accumulation Functions: Simple Interest, PDF p.28, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §4 Linear Accumulation Functions: Simple Interest (Example 4.2), PDF p.30, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §4 Linear Accumulation Functions: Simple Interest (Remark 4.3, SOA/CAS convention), PDF p.31, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §6 Exponential Accumulation Functions: Compound Interest (Theorem 6.1), PDF p.42, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §42 Types of Bonds (Treasury bills), PDF p.381, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §9 Nominal Rates of Interest and Discount, Problem 9.15, PDF p.74, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf
