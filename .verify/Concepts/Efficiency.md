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

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: low
- checks_run: Efficient = unbiased and attains the CRLB; relative efficiency as a ratio of variances; MLE asymptotically efficient (Stanford L15 p.15-4); formula orientation eff(U, V) = var(V)/var(U) (Siegrist §6.1); CRLB and its regularity assumption, uniform counterexample (Siegrist §6.5, §6.3; Stanford L15 Thm 15.4, L14 Thm 14.1). Examples recomputed before comparing: median vs mean, Var(M) approx pi sigma^2/(2n) = 1.5708 sigma^2/n from Shao slide 9 (1/(4 f(mu)^2) with f(mu) = 1/(sigma sqrt(2 pi))), RE(Xbar, M) = 1.571; exponential: I_1 = 1/theta^2 (score -1/theta + x/theta^2, simulated E[score^2] = 0.249 at theta = 2), CRLB theta^2/n = Var(Xbar), efficiency 1 (Siegrist §6.5 gamma k = 1). Sample median unbiased for a symmetric population: rank-5 symmetry argument only. Links (6) resolve exact; figure builder efficiency() draws two curves centred on theta, sd 0.5 and 1.2 (correct); 28 math spans render. Linking exam pages: only Exam MAS-I (CAS).md (Domain B task 8 criteria list, line 73; Estimation criteria, line 88), Parameter Estimation, Method of Moments, Fisher Information, Cramer-Rao Lower Bound - same sense.
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 8 'applying criteria to estimates such as consistency, unbiasedness, sufficiency, efficiency, minimum variance, mean square error' and tasks 1, 5, 6 (PDF p.4); James et al. Ch 2 excluding §2.2.3 on Domain C (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), ch. 6 Point Estimation, §6.1 Estimators: bias(U) = E(U) − θ, mse(U) = E[(U − θ)²] = var(U) + bias²(U), unbiased = E(U) = θ for all θ, relative efficiency eff(U,V) = var(V)/var(U) for unbiased U, V, asymptotic unbiasedness and asymptotic relative efficiency, consistency (convergence in probability), mean-square consistency ⇒ consistency (Markov), M_n unbiased with var σ²/n, S_n² unbiased with var (1/n)(σ4 − (n−3)σ⁴/(n−1)), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html; Siegrist, Random, §6.5 Best Unbiased Estimators: UMVUE definition; Cramér–Rao bound and its fundamental assumption (d/dθ and E interchangeable; support not depending on θ); random-sample form with n·E[l²(X,θ)]; normal case var(S²) = 2σ⁴/(n−1), M attains σ²/n; gamma (known shape k) M/k attains b²/(nk); Uniform[0,a]: assumption not satisfied, theorem does not apply, sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html; Siegrist, Random, §6.3 Maximum Likelihood: normal MLEs M and T² (divisor n); Uniform[0,h] MLE X_(n) with E = nh/(n+1), bias −h/(n+1), V = (n+1)X_(n)/n unbiased with var h²/(n(n+2)) ('super efficient'), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html; Stanford STATS 200 (Autumn 2016), Lecture 14 Consistency and asymptotic normality of the MLE, Theorem 14.1 and its regularity conditions (common support, interior θ0, differentiable log-likelihood), MLE asymptotically unbiased, pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf; Stanford STATS 200 (Autumn 2016), Lecture 15 Fisher information and the Cramér–Rao bound, Theorem 15.4 (Var_θ[T] ≥ 1/(nI(θ)) for unbiased T, 'satisfying certain mild regularity assumptions', I(θ) per observation) and p.15-4 (relative efficiency = ratio of variances of two unbiased estimators; efficient = attains 1/(nI(θ)); MLE asymptotically efficient), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf; Shao, UW–Madison Stat 610 Lecture 24 'Sample median and quantiles' (2014), slides 8–9: √n(Q̂0.5 − Q0.5) → N(0, 1/(4f(Q0.5)²)); ARE(median, X̄) = 4f(µ)²σ² = 0.637 for the normal, sha256:a9cfecddf7ec9f7d2d195a36cb6da10155367023055d078cd0d3343694296cd9 — https://pages.stat.wisc.edu/~shao/stat610/stat610-24.pdf
- note: Open majors F-001 (relative efficiency without the both-unbiased condition; "equivalently smaller MSE" false for biased estimators) and F-002 (CRLB / efficiency <= 1 / MLE asymptotic efficiency without regularity conditions), open minor F-003 (I(theta) undefined; bound written 1/I(theta) where sources and linked pages use 1/(nI(theta))) - hence low confidence. Rank-3 sources; Hogg, McKean & Craig §6.2 not read (not free).
