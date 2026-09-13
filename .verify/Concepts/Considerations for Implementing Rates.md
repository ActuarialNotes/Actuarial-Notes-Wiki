---
target: Concepts/Considerations for Implementing Rates.md
created: 2026-09-13
---

## [F-001] Cost-of-phasing figure is not reproducible from the stated premise
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- severity: minor
- status: open
- locus: Example 'Phasing a Large Increase', the deficiency calculation
- claim: If the book earns $40,000,000 and the shortfall is 9.1% of premium, the deficiency is roughly $40,000,000 x 0.091/1.20 = $3,000,000.
- evidence: Independent recomputation (rank 5 -- falsifies, does not confirm). The premise is a book earning $40M for a year at a level 9.1% below what the indication supports. Direct computations: premium required at the adequate level is $40M x 1.091 = $43.64M, so the shortfall is $3.64M; alternatively, reading the $40M as premium at the fully indicated level gives $40M x (1 - 1.10/1.20) = $3.33M. The page's divisor of 1.20 has no stated basis and matches neither reading ($40M x 0.091 / 1.20 = $3.03M), so the '$3,000,000' is not reproducible from the premise even as a rounded figure. For reference, Werner Ch.14 printed pp.263-264 (PDF pp.275-276) measures exactly this kind of shortfall directly in the fundamental insurance equation: its simple example compares the $235 average premium the company can charge with the $250 indicated and reports the resulting profit provision of -0.1%. The two other numbers in this example check out: 1.20/1.10 - 1 = +9.09%, and the Off-Balancing example is exact (1.060/1.035 = 1.0242; $480 x 1.0242 = $491.62; 1.06 x 1.035 = +9.7%).
- source_rank: 5
- proposed_action: State the basis for the 1.20 divisor or recompute the deficiency from the premise (~$3.3M-$3.6M on the two natural readings).
- applied: false
- fingerprint: 3e1337c92b0a

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- status_set: verified
- confidence: medium
- checks_run: Non-pricing levers checked against Werner Ch.14 printed p.264: expense reduction; 'tighten the underwriting criteria or non-renew policies that have grossly inadequate premium'; coverage level change ('a homeowners insurer may adjust the policy to exclude coverage for mold losses... equivalent to a rate level increase'); and 'better loss control procedures' with the workers compensation medical-management/return-to-work example -- so all four of the page's bullets are sourced, as is the framing that companies in constrained markets 'rely on the information to improve profitability through these non-pricing solutions' (Ch.13 p.256). The off-balance display matches Werner p.276: 'The final term of the equation, which is the reciprocal of one plus the change in average rate differential, is commonly referred to as the off-balance factor.' Rate capping and its knock-on base-rate adjustment are Werner pp.280-281 (worked example: off-balance 0.9749 = 1/(1+2.57%), cap at 20%, base rate up 0.87% to cover the $8,459 shortfall). Recomputed the page's examples before reading them: 1.20/1.10-1 = +9.09% -> +9.1% correct; off-balance 1.060/1.035 = 1.024155 -> 1.0242, $480 x 1.0242 = $491.62, and the check 1.0242 x 1.035 = 1.0600, and 1.06 x 1.035 = 1.0971 = +9.7% -- all correct. Medium confidence because the phasing example's deficiency figure does not reproduce from its own premise (F-001).
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.14 'Implementation', printed pp.263-264, 276 and 280-281 (PDF pp.275-276, 288, 292-293), and Ch.13 printed p.256 (PDF p.268), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
