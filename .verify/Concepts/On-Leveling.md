---
target: Concepts/On-Leveling.md
created: 2026-09-12
---

## [F-001] A law-mandated change applied to in-force policies is still handled by the parallelogram method
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- severity: nit
- status: open
- locus: bullet 4, 'A special case: if the rate change applies to in-force policies…'
- claim: '…the parallelogram geometry no longer holds and the change is treated as effective immediately across the whole book.'
- evidence: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 p. 78 (PDF p. 90), 'Rate Changes Mandated by Law': 'In some cases, rate changes are in response to law changes that may mandate the rate change be applied to all policies on or after a specific date, even those that are currently in-force. In that special case, the rate level change is represented as a vertical line rather [than a diagonal one].' The method is not abandoned — only the diagonal becomes vertical, and the areas are still read off the diagram. The page's second clause ('effective immediately across the whole book') is right; 'the parallelogram geometry no longer holds' overstates it.
- source_rank: 2
- proposed_action: Say the rate-change line is drawn vertically instead of diagonally, so the areas become rectangles and the method still applies.
- applied: false
- fingerprint: 9958f821dce5

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T20:15Z/f2bc
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: Recomputed the mid-year example before reading the answer: new-level area in CY 2023 = 0.5(1-0.5)^2 = 0.125, average index 0.875(1.000) + 0.125(1.120) = 1.0150, OLF = 1.120/1.0150 = 1.10345; CY 2024 old-level area 0.5(0.5)^2 = 0.125, average index 1.1050, OLF = 1.0136; CY 2025 OLF = 1.000. Both areas and the OLF definition check against Werner's Table 5.18/Step 5 (p. 76, PDF p. 88), where the 7/1/10 change leaves area 0.125 at the prior level in CY 2011 and the 1/1/11 change takes area 0.500. The stated weaknesses (uniform writing, single policy term, uniform application across risks) and both remedies in the second example (extension of exposures; replacing the geometric areas with the actual distribution of writings) are Werner pp. 79-80 (PDF pp. 91-92) almost point for point, including the seasonal-writing counterexample (Werner uses pleasure-boat policies). One nit opened on the in-force/law-mandated bullet (F-001). Links, embed and LaTeX clean.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 pp. 72-80 (PDF pp. 84-92), Current Rate Level: extension of exposures, parallelogram method Steps 1-6, six-month and policy-year variants, Rate Changes Mandated by Law, and the method shortcomings, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf
