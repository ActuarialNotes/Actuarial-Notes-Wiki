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

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:claude-code
- run_id: 2026-10-18T18:16Z/d3cd
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: SMM and CPR now defined on this page's Symbols bullet, the finding's proposed action; Prepayment Risk is linked as the risk they measure.

## [C-001] Symbols bullet's SMM/CPR definitions checked against SIFMA Ch. SF
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:42Z/0040
- date: 2026-10-18
- locus: bullet 'Symbols'
- note: Only the line changed in ef1a7a64 was checked; the page as a whole was not, and its status is left as is. The new text — 'SMM (single monthly mortality) is the fraction of the balance left after the month's scheduled principal that is prepaid in the month; CPR (conditional prepayment rate) is its annualised equivalent, so SMM = 1 - (1 - CPR)^{1/12}' — agrees with The Bond Market Association (SIFMA), Uniform Practices — Chapter SF, Standard Formulas for the Analysis of Mortgage-Backed Securities (02/01/99), Ch. SF, §B.2 a-c, pp.SF-5–SF-6, sha256:9ca07655579c51cd2d9bb783d4d3486e99150f19d99ddf7b0782573c1b738784 — https://www.sifma.org/wp-content/uploads/2017/08/chsf.pdf: SF-5 §B.2a defines SMM = 100(F_sched - F2)/F_sched, F_sched being the factor after scheduled amortisation only (F1-F_sched amortisation, F_sched-F2 prepayment); SF-6 §B.2b defines CPR as the annually compounded equivalent, (1 - SMM/100)^12 = 1 - CPR/100, which rearranges to the page's formula. SIFMA's primary SMM wording is 'the percentage of the mortgage loans outstanding at the beginning of a month assumed to terminate during the month' with the net-of-scheduled form given as 'an equivalent means'; the page's choice of the second is consistent. No finding.
