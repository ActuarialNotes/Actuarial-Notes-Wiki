---
target: Concepts/Maximum Likelihood Estimation.md
created: 2026-10-05
---

## [F-001] Score equation and large-sample properties stated without regularity conditions
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: major
- status: open
- locus: bullets 2-3, lines 23-24
- claim: 'The MLE is found by solving the score equation l'(theta-hat) = 0' and 'MLEs are consistent, asymptotically normal, and asymptotically efficient (achieve the Cramer-Rao lower bound in large samples)' - no conditions on either.
- evidence: Siegrist, Random §6.3 (point/Likelihood.html): the calculus equations locate the maximum only at an interior point - 'the maximum value may occur at a boundary point of T, or may not exist at all'; for Uniform[0, h] the likelihood 1/h^n on h >= x_(n) is maximised at the boundary X_(n), where l'(h) = -n/h is not 0. The asymptotic properties need regularity conditions: Stanford STATS 200 Lecture 14 Theorem 14.1 (common support, interior theta0, differentiable log-likelihood, unique score root) and Lecture 15 p.15-4; PSU STAT 415 Lesson 7 §7.1 'subject to some regularity conditions'; Loss Data Analytics App. C §17.2.2. For the uniform, Siegrist §6.3 gives mse(X_(n)) = 2h^2/((n+1)(n+2)) (order 1/n^2) and §6.5 (Unbiased.html) says the Cramer-Rao theorem does not apply. A candidate who sets l' = 0 or uses 1/(nI) for a support-dependent model (uniform, single-parameter Pareto lower bound) gets it wrong.
- source_rank: 3
- proposed_action: Add 'when the maximum is interior and the likelihood is smooth' to the score bullet and 'under regularity conditions (support not depending on theta, ...)' to the properties bullet, with Uniform(0, theta) as the standard exception ([[Fisher Information]] already says this). Not applied - the fix is new wording.
- applied: false
- fingerprint: e1317911aa2f

## [F-002] Likelihood described as a probability
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: nit
- status: open
- locus: lead sentence, line 14
- claim: the likelihood function - the probability of observing the given data as a function of the parameter
- evidence: Siegrist, Random §6.3 (point/Likelihood.html): the likelihood is the probability density function with the roles of x and theta reversed, L_x(theta) = f_theta(x) - a density for continuous data (the page's own exponential example), for which the probability of observing the exact data is 0. PSU STAT 415 Lesson 7 likewise writes L(theta) = prod f(x_i|theta).
- source_rank: 3
- proposed_action: Say 'the joint probability (discrete data) or density (continuous data) of the observed sample, read as a function of the parameter'. Not applied - the fix is new wording.
- applied: false
- fingerprint: 5ecc2b63fc72
