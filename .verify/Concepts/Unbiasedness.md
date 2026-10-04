---
target: Concepts/Unbiasedness.md
created: 2026-10-04
---

## [F-001] Divisor-n variance estimator said to have lower MSE without the normal-population condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: bullet 2 (sample variance), line 21
- claim: The sample variance S^2 = (1/(n-1)) sum (X_i - Xbar)^2 is unbiased for sigma^2; "dividing by n instead gives a biased (but lower MSE) estimator" - stated for any population, no condition.
- evidence: The lower-MSE comparison holds for a normal population, not in general. Siegrist, Random §6.1 (Estimators.html) gives, for any distribution with finite fourth central moment sigma4, var(S_n^2) = (1/n)(sigma4 - (n-3)sigma^4/(n-1)); with T^2 = (n-1)S^2/n, MSE(T^2) = ((n-1)/n)^2 var(S^2) + sigma^4/n^2. For Bernoulli(1/2) (sigma^2 = 1/4, sigma4 = sigma^4 = 1/16) that gives MSE(S^2) = 1/(8n(n-1)) and MSE(T^2) = (3n-2)/(16n^3): at n = 10, 0.001389 against 0.001750, so S^2 has the LOWER MSE. Exact enumeration over the binomial (rank 5, falsifying only) agrees and shows S^2 lower for every n >= 5; T^2 is lower only at n = 2, 3, 4. For a normal population Siegrist §6.5 (Unbiased.html) gives var(S^2) = 2sigma^4/(n-1), and then MSE(T^2) = (2n-1)sigma^4/n^2 < 2sigma^4/(n-1) for every n >= 2 - the case the [[Mean Square Error]] page works through. The rest of the bullet is confirmed: S^2 unbiased (Siegrist §5.5 Variance.html; PSU STAT 415 Lesson 2 Ex 2.8), divisor-n version biased with E = (n-1)sigma^2/n (PSU Ex 2.7).
- source_rank: 3
- proposed_action: Add the condition, e.g. "dividing by n instead gives a biased estimator, which for a normal population has lower MSE" (or point to the [[Mean Square Error]] example). Not applied: the fix is new wording.
- applied: false
- fingerprint: f25b1756ee06
