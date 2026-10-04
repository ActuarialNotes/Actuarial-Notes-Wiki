---
target: Concepts/Efficiency.md
created: 2026-10-04
---

## [F-001] Relative efficiency defined without requiring both estimators to be unbiased
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: lead sentence and Relative Efficiency formula, lines 14 and 16
- claim: "one estimator is relatively more efficient than another if it has smaller variance (equivalently, smaller [[Mean Square Error]]) for the same parameter"; Relative Efficiency(theta1, theta2) = Var(theta2)/Var(theta1) - no unbiasedness condition on either.
- evidence: Siegrist, Random §6.1 (Estimators.html) defines "more efficient" and eff(U, V) = var(V)/var(U) only for U and V unbiased estimators of theta (and asymptotic relative efficiency only for asymptotically unbiased sequences). Stanford STATS 200 Lecture 15, p.15-4: "For two unbiased estimators of theta, the ratio of their variances is called their relative efficiency." Variance and MSE coincide only at zero bias (mse = var + bias^2, Siegrist §6.1), so "equivalently, smaller MSE" is false once an estimator is biased: adding the constant 0.1 to an unbiased estimator (PSU STAT 415 Lesson 2 Ex 2.10, p3 = p2 + 0.1) leaves the variance unchanged and adds 0.01 to the MSE. A reader comparing a biased with an unbiased estimator by this definition would rank them on variance alone. The formula orientation Var(theta2)/Var(theta1) matches Siegrist eff(U, V), and the median-versus-mean example (1.571 favouring Xbar) is right: Shao, Stat 610 Lecture 24 slide 9 gives ARE(median, Xbar) = 0.637 = 2/pi for the normal.
- source_rank: 3
- proposed_action: State that relative efficiency compares two unbiased (or asymptotically unbiased) estimators, and drop or qualify "(equivalently, smaller MSE)" - for biased estimators compare MSEs instead. Not applied: needs new wording.
- applied: false
- fingerprint: 666a6232876a

## [F-002] Cramer-Rao bound and "efficiency <= 1" stated without the regularity conditions
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: Efficiency formula (line 18) and bullets 1 and 3 (lines 20, 22)
- claim: Efficiency(theta-hat) = (1/I(theta))/Var(theta-hat) <= 1; "MLEs are asymptotically efficient: their variance converges to the CRLB as n -> infinity" - the page states no condition anywhere.
- evidence: The bound holds only under regularity assumptions. Stanford STATS 200 Lecture 15, Theorem 15.4: the bound is for a model "satisfying certain mild regularity assumptions". Siegrist, Random §6.5 (Unbiased.html) states the fundamental assumption (d/dtheta and E interchangeable; in practice the support does not depend on theta) and for Uniform[0, a] says the assumption "is not satisfied" and "the Cramer-Rao theorem does not apply". Siegrist §6.3 (Likelihood.html) gives the counterexample: V = (n+1)X_(n)/n is unbiased with var h^2/(n(n+2)), below the naive bound h^2/n, so the page formula would give it an efficiency of n + 2 > 1. The MLE results (consistency, asymptotic normality with variance 1/(nI(theta)), hence asymptotic efficiency) carry regularity conditions too - common support, interior theta0, differentiable log-likelihood (Stanford Lecture 14, Theorem 14.1; PSU STAT 415 Lesson 7 §7.1). The vault [[Cramer-Rao Lower Bound]] and [[Fisher Information]] pages state the condition (rank 4, consistency only).
- source_rank: 3
- proposed_action: Add "under the usual regularity conditions (support not depending on theta)" to the CRLB / efficiency <= 1 statement and to the MLE asymptotic-efficiency bullet, with the Uniform(0, theta) exception, as the Cramer-Rao Lower Bound page does. Not applied: new wording.
- applied: false
- fingerprint: 24a76eef3ee7

## [F-003] I(theta) left undefined; sources and the linked pages put the bound at 1/(nI(theta))
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: Efficiency formula and bullet 1, lines 18 and 20
- claim: Efficiency(theta-hat) = (1/I(theta))/Var(theta-hat); "I(theta) is the Fisher information, so 1/I(theta) is the Cramer-Rao lower bound".
- evidence: Stanford STATS 200 Lecture 15, Theorem 15.4, and Siegrist §6.5 (random-sample versions, n E[l^2(X, theta)]) write the bound as 1/(nI(theta)) with I(theta) the information in ONE observation; the vault [[Fisher Information]] and [[Cramer-Rao Lower Bound]] pages use the same per-observation I(theta) (rank 4). The formula here is right only if I(theta) is the information in the whole sample, which the page never says; read with the linked pages, it overstates the bound by a factor of n. The page own exponential example uses the sample bound theta^2/n, which is correct (Siegrist §6.5, gamma with k = 1: b^2/n). A notation gap, not a wrong example.
- source_rank: 3
- proposed_action: Say that I(theta) here is the information in the whole sample, n I_1(theta), or write the bound as 1/(nI(theta)) to match the Fisher Information page.
- applied: false
- fingerprint: c1acb993ab1b
