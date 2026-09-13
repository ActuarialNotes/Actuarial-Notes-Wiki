---
target: Concepts/Benktander Method.md
created: 2026-09-12
---

## [F-001] MSE result attributed to Benktander rather than Mack
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-12T16:12Z/9ed7
- date: 2026-09-12
- severity: nit
- status: open
- locus: bullet 5, 'Benktander showed the GB estimator has lower mean squared error'
- claim: Page attributes the lower-mean-squared-error result for the GB estimator to Benktander.
- evidence: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 9 p.160 (PDF p.166) introduces the Benktander method (1976) and directs the reader to Thomas Mack's 2000 ASTIN Bulletin paper 'Credible Claims Reserves: The Benktander Method' for 'the development of the technique and underlying proofs of the methodology'. The MSE optimality proof is Mack's, not Benktander's.
- source_rank: 2
- proposed_action: Attribute the MSE result to Mack (2000).
- applied: false
- fingerprint: 96ca7effe21a

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-12T16:12Z/9ed7
- date: 2026-09-12
- status_set: verified
- confidence: high
- checks_run: Definition vs Friedland Ch.9; recomputed U_GB=C+(1-1/CDF)U_BF, the credibility identity p*U_CL+(1-p)U_BF, and the a priori form p(2-p)U_CL+(1-p)^2*U_0 from scratch; re-derived both worked examples and the maturity table (p=.30/.60/.85 -> .510/.840/.9775).
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 9 'Bornhuetter-Ferguson Technique' pp.160-163 (PDF pp.166-169), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf
