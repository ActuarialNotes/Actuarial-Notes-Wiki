---
target: Concepts/Fisher Information.md
created: 2026-10-05
---

## [F-001] Lead calls the Cramer-Rao bound the smallest variance an unbiased estimator can achieve
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: lead sentence, line 14
- claim: It sets the Cramer-Rao lower bound, the smallest variance any unbiased estimator can achieve, and so defines what efficient means.
- evidence: The bound is a lower bound that need not be attained. Siegrist, Random §6.5 (point/Unbiased.html): 'there is a lower bound on the variance of any unbiased estimator ... if we can find an estimator that achieves this lower bound for all theta, then the estimator must be an UMVUE', with equality iff h(X) = lambda(theta) + u(theta) L1(X, theta); Stanford STATS 200 Lecture 15 Theorem 15.4 states it as an inequality. Example where no unbiased estimator attains it: Siegrist §6.6 (point/Sufficient.html) gives ((n-1)/n)^Y as the UMVUE of e^{-theta} for a Poisson sample; its variance e^{-2 theta}(e^{theta/n} - 1) exceeds the bound theta e^{-2 theta}/n for every theta > 0 because e^x - 1 > x (rank-5 arithmetic; the [[Cramér-Rao Lower Bound]] page works the same case at lambda = 0.2, n = 100: 0.0013420 vs 0.0013406).
- source_rank: 3
- proposed_action: Say 'a lower bound on the variance of any unbiased estimator (not always attained)'. Not applied - the fix is new wording.
- applied: false
- fingerprint: c46562d9fa46
