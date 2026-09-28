---
target: Concepts/Interest Rate.md
created: 2026-09-28
---

## [F-001] Defines the effective annual rate as 'the rate compounded once per year'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: bullet 'The effective annual interest rate refers to the rate compounded once per year.' (line 22)
- claim: 'The effective annual interest rate refers to the rate compounded once per year.'
- evidence: SOA sample Q410 (questions p.173): an account that 'receives interest quarterly' and whose balance 'increases by 4.5% each year' — SOA's answer (solution p.108) is (A) annual effective interest rate: 'The percentage by which the balance accumulates each year is the effective interest rate.' So an effective annual rate is the actual one-year growth whatever the compounding frequency; Finan §3 p.22 defines it the same way ('the amount of interest earned in one period divided by the principal at the beginning of the period'). The page's wording invites a student to reject 'effective' on Q410 because interest there is credited quarterly. NOTE p.1 denotes the effective rate i and the nominal rate i^(m).
- source_rank: 1
- proposed_action: Maintainer: define the effective annual rate as the interest earned over a year per unit invested at the start of the year, however often interest is credited.
- applied: false
- fingerprint: bd8c4c444c50

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition ('interest earned per unit of principal per unit of time') vs Finan §1 p.10 and §3 p.22: match. FV = PV(1+i)^n, PV = FV/(1+i)^n vs Finan §7 p.50: match. Effective annual rate wording vs SOA Q410/S410 -> F-001 (minor). Related measures i^(m), d, δ vs NOTE p.1: consistent. Example recomputed: 6802.44/5000 = 1.360488, i = 1.360488^0.2 - 1 = 0.063504 -> 6.35% = page. Also linked from Exam 9 (CAS) LO B.3 ('selection of interest rates') — the generic definition fits that usage; no conflict. Links resolve; figure exists; LaTeX ok. Example is the vault's own -> medium.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money (5-15%), learning outcomes a)-d), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §1 The Meaning of Interest, PDF p.10, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §3 Effective Interest Rate (EIR), PDF p.22, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 410, questions PDF p.173, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 410, solutions PDF p.108, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
