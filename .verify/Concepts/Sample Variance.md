---
target: Concepts/Sample Variance.md
created: 2026-10-05
---

## [F-001] Divisor-n estimator called the MLE with smaller MSE without the normal-population condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: major
- status: open
- locus: bullet 2 (divisor n), line 21; example 1, last sentence
- claim: Using n instead gives the MLE sigma-hat^2 = ((n-1)/n) S^2, which is biased low by sigma^2/n but has smaller Mean Square Error - stated for any population; example 1 repeats 'The MLE would divide by 5'.
- evidence: The bias is right for any population: Siegrist, Random §6.2 (point/Moments.html) gives bias(T_n^2) = -sigma^2/n for T^2 = (1/n) sum (X_i - M)^2. The MSE comparison is not general: the same section gives mse(T_n^2) = [(n-1)^2 sigma4 - (n^2 - 5n + 3) sigma^4]/n^3 and says 'There is no simple, general relationship between mse(T_n^2) and mse(S_n^2)'; only 'when the sampling distribution is normal, T^2 has smaller mean square error' (mse(T^2) = (2n-1)sigma^4/n^2 < 2 sigma^4/(n-1)). Counterexample from Siegrist's general formulas (§5.5 var(S^2) = (sigma4 - (n-3) sigma^4/(n-1))/n): Bernoulli(1/2), sigma^2 = 1/4, sigma4 = sigma^4 = 1/16, gives mse(S^2) = 1/(8n(n-1)) and mse(T^2) = (3n-2)/(16n^3) - at n = 10, 0.001389 against 0.001750, so S^2 has the LOWER MSE, and does for every n >= 5. Likewise T^2 is the MLE of sigma^2 for the normal model (Siegrist §6.3 Likelihood.html; PSU STAT 415 Lesson 7 Ex 7.1), not for every population. Same defect as Unbiasedness F-001.
- source_rank: 3
- proposed_action: Add the condition, e.g. 'For a Normal population, dividing by n gives the MLE ..., which is biased low by sigma^2/n but has smaller MSE'. Not applied - the fix is new wording.
- applied: false
- fingerprint: 0e849de8d48c
