---
target: Concepts/Censoring.md
created: 2026-10-04
---

## [F-001] Bias direction stated for all censoring; it is the right-censoring direction
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: nit
- status: open
- locus: 4th bullet (MLE / downward bias)
- claim: Censoring must be accounted for in Maximum Likelihood Estimation to avoid downward bias in estimated means or survival times.
- evidence: The bullet follows the left- and interval-censoring bullets and states one direction for all of them. The source for the direction is about right censoring: Dey et al., Nature Methods 19(8) 2022, Fig. 3 caption: 'Treating censored times as observed event times results in underestimates of survival'. Loss Data Analytics §4.3.1.2 defines a right-censored record as min(X, C_U) <= X (so treating it as exact pulls estimates down) but a left-censored record as max(X, C_L) >= X, so treating left-censored values as exact pulls estimates up. The bullet is right for the page's main case (right censoring) and too broad as written.
- source_rank: 3
- proposed_action: Say 'right-censoring' in this bullet (treating right-censored values as exact biases means and survival times down), or drop the direction.
- applied: false
- fingerprint: 593105ab198b
