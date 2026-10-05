---
target: Concepts/Parameter Estimation.md
created: 2026-10-05
---

## [F-001] MLE's large-sample properties stated without regularity conditions; the page's own uniform example violates them
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: major
- status: open
- locus: bullet 'Methods', line 26
- claim: Maximum Likelihood Estimation maximizes l(theta); it is consistent, asymptotically normal and efficient, and invariant under transformation.
- evidence: Consistency, asymptotic normality N(theta, 1/(nI(theta))) and asymptotic efficiency hold only under regularity conditions: Stanford STATS 200 Lecture 14, Theorem 14.1 (pp.14-1-14-2) requires a common support for every f(x|theta), an interior theta0, a differentiable log-likelihood and a unique root of l'(theta) = 0; PSU STAT 415 Lesson 7 §7.1: 'subject to some regularity conditions'; Loss Data Analytics App. C §17.2.2: 'under certain regularity conditions'. The page's own first example, Uniform(0, theta), breaks them: Siegrist §6.3 (point/Likelihood.html) gives mse(X_(n)) = 2 theta^2/((n+1)(n+2)) - order 1/n^2, not a normal law with variance 1/(nI) - and calls the unbiased version 'super efficient'; Siegrist §6.5 (point/Unbiased.html) says the Cramer-Rao assumption is not satisfied for the uniform because the support depends on the parameter. Invariance is fine (Siegrist §6.3 invariance theorem). Same root as Efficiency F-002.
- source_rank: 3
- proposed_action: Qualify: 'under regularity conditions (support not depending on theta, smooth likelihood, interior maximum) it is consistent, asymptotically normal and efficient', and point to the uniform example below as the standard exception. Not applied - the fix is new wording.
- applied: false
- fingerprint: abca46ee0b4e
