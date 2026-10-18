---
target: Concepts/Mortgage-Backed Security.md
created: 2026-10-18
---

## [F-001] Points to Prepayment Risk for SMM and CPR, which that page no longer defines
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:33Z/326e
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullet 'Symbols'
- claim: SMM and CPR, the monthly and annual prepayment rates, are defined on [[Prepayment Risk]].
- evidence: Concepts/Prepayment Risk.md was cut back to the Exam 9 outline's words in run 2026-10-18T18:16Z/d3cd (F-001/R there): its SMM/CPR formulas and PSA bullet were removed, and it now says the mechanics 'are on [[Mortgage-Backed Security]]'. The two pages now point at each other and neither defines SMM in words; this page gives only SMM = 1 - (1 - CPR)^{1/12}. Internal cross-reference, rank 4 (consistency only).
- source_rank: 4
- proposed_action: Writer: define SMM and CPR on this page (the OCC Comptroller's Handbook, Interest Rate Risk, p.21, was the source the earlier Prepayment Risk check used) and drop the pointer to Prepayment Risk.
- applied: false
- fingerprint: 638ff774604f
