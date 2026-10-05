---
target: Concepts/Cramér-Rao Lower Bound.md
created: 2026-10-05
---

## [F-001] Lead defines the bound as the smallest variance an unbiased estimator can have; the page's own examples show it is not always attained
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: nit
- status: open
- locus: lead sentence, line 14
- claim: The Cramer-Rao lower bound (CRLB) is the smallest variance that any unbiased estimator of a parameter can have, under standard regularity conditions.
- evidence: Read literally this says the bound is attained. Siegrist, Random §6.5 (point/Unbiased.html) and Stanford STATS 200 Lecture 15 Theorem 15.4 state it as a lower bound (an inequality), attained only when the score is linear in the estimator; the page itself says so in 'Attaining it' ('Often no unbiased estimator attains it') and in both worked examples (the Poisson no-claim UMVUE at 0.0013420 vs the bound 0.0013406; the Pareto estimator at 0.50 vs 0.45). So this is wording, corrected further down the page.
- source_rank: 3
- proposed_action: Say 'a lower bound on the variance that any unbiased estimator ... can have'. Not applied - the fix is new wording.
- applied: false
- fingerprint: 89b09c8a2a6b
