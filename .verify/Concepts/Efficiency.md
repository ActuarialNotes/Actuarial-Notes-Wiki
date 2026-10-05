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

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Lead now says efficiency compares unbiased estimators: 'of two unbiased estimators of the same parameter, the one with smaller variance is relatively more efficient (for an unbiased estimator the variance is the [[Mean Square Error]])' - the false 'equivalently, smaller MSE' for any estimator is gone. New bullet: relative efficiency compares two unbiased estimators (asymptotic relative efficiency, two asymptotically unbiased ones); if either is biased compare MSEs instead, since MSE = Var + Bias^2. Sources: Siegrist, Random §6.1 (Estimators.html, sha256 10914ffc…6c2a) - more efficient and eff(U, V) = var(V)/var(U) defined for U, V unbiased; asymptotic relative efficiency for asymptotically unbiased sequences; mse = var + bias^2; 'if we have two unbiased estimators of theta, we naturally prefer the one with the smaller variance (mean square error)'; Stanford STATS 200 Lecture 15 p.15-4 (sha256 7e9d32d6…7247): 'For two unbiased estimators of theta, the ratio of their variances is called their relative efficiency'.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Added the regularity condition: new bullet 'The bound, and with it Efficiency <= 1, holds only under regularity conditions - in practice, the support of f(x | theta) must not depend on theta', with the Uniform(0, theta) exception ((n+1)X_(n)/n unbiased with variance theta^2/(n(n+2)), below theta^2/n, an 'efficiency' of n + 2 > 1); the MLE bullet now opens 'Under regularity conditions (a support that does not depend on theta, a true theta inside the parameter space, a differentiable log-likelihood)'. Sources: Siegrist, Random §6.5 (Unbiased.html, sha256 0d9765c5…d531) - the bound holds 'under mild conditions', the fundamental assumption is satisfied when the support does not depend on theta, and for Uniform[0, a] the assumption 'is not satisfied' and 'the Cramer-Rao theorem does not apply', V having variance a^2/(n(n+2)) below the bound a^2/n; Siegrist §6.3 (Likelihood.html) for V; Stanford STATS 200 Lecture 15 Thm 15.4 ('certain mild regularity assumptions') and Lecture 14 Thm 14.1 (common support, interior theta0, differentiable log-likelihood) for the MLE result. Ratio n + 2 recomputed in python with exact fractions (n = 1, 2, 5, 10) and by simulation (n = 5: var 0.02854 vs 1/35).

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-003
- status: resolved
- note: Efficiency formula now reads Efficiency(theta-hat) = [1/(nI(theta))]/Var(theta-hat) <= 1, and bullet 1 defines I(theta) as the [[Fisher Information]] in a single observation, so 1/(nI(theta)) is the CRLB for a sample of size n (link now to [[Cramer-Rao Lower Bound]]). Sources: Stanford STATS 200 Lecture 15, Theorem 15.4 (Var_theta[T] >= 1/(nI(theta)), I(theta) per observation, Var of the sample score = nI(theta)); Siegrist §6.5 random-sample versions with n E[l^2(X, theta)]. The exponential example's bound theta^2/n = 1/(n * 1/theta^2) is unchanged and consistent (I1 = 1/theta^2 re-derived; simulated E[score^2] = 0.2507 vs 0.25 at theta = 2).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Re-read the whole page after the edits. Relative efficiency definition and orientation var(V)/var(U) for unbiased U, V (Siegrist §6.1; Stanford L15 p.15-4); MSE = Var + Bias^2 (Siegrist §6.1); CRLB 1/(nI(theta)) with per-observation I under regularity conditions, efficient = attains it (Stanford L15 Thm 15.4, p.15-4; Siegrist §6.5); Uniform(0, theta) exception and V's variance (Siegrist §6.5, §6.3); MLE asymptotically efficient under Thm 14.1's conditions (Stanford L14, L15 p.15-4). Examples recomputed: median vs mean ratio pi/2 = 1.5708 (Shao Ex 10.2.4: ARE = 4f(mu)^2 sigma^2 = 2/pi for the normal); exponential CRLB theta^2/n and efficiency 1. All 9 links/embeds resolve (incl. new [[Fisher Information]], [[Cramer-Rao Lower Bound]]); 40 math spans render after normalizeVaultMath.
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 8 'applying criteria to estimates such as consistency, unbiasedness, sufficiency, efficiency, minimum variance, mean square error' (PDF p.4); James et al. Chapters 1, 2 (excluding Section 2.2.3) on Domain C (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §6.1 Estimators: bias(U) = E(U) − θ; mse(U) = E[(U − θ)²] = var(U) + bias²(U); U unbiased if E(U) = θ for all θ ∈ T; 'if we have two unbiased estimators of θ, we naturally prefer the one with the smaller variance (mean square error)'; more efficient / eff(U, V) = var(V)/var(U) defined for U, V unbiased; asymptotic relative efficiency for asymptotically unbiased sequences; consistency = convergence in probability; mean-square consistent ⇒ consistent; var(M_n) = σ²/n; var(S_n²) = (1/n)(σ4 − (n−3)σ⁴/(n−1)), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html; Siegrist, Random, §6.3 Maximum Likelihood: normal MLEs M and T² (divisor n); Uniform[0,h] MLE X_(n), E = nh/(n+1); V = (n+1)X_(n)/n unbiased with var h²/(n(n+2)), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html; Siegrist, Random, §6.5 Best Unbiased Estimators: UMVUE definition; Cramér–Rao bound 'under mild conditions' — the fundamental assumption (d/dθ and E_θ interchangeable; satisfied when the support does not depend on θ); random-sample versions with n·E_θ[l²(X, θ)]; exponential/gamma (known k) M/k attains b²/(nk); normal var(S²) = 2σ⁴/(n−1); Uniform[0,a]: 'Assumption is not satisfied', bound a²/n, 'the Cramér-Rao theorem does not apply', V has variance a²/(n(n+2)) below it, support depends on a, sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html; Stanford STATS 200 (Autumn 2016), Lecture 14, Theorem 14.1: under regularity conditions (all f(x|θ) share one support, θ0 interior to Ω, differentiable log-likelihood, unique score root) the MLE is consistent and asymptotically normal with variance 1/(nI(θ0)), I(θ) per observation; MLE asymptotically unbiased, pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf; Stanford STATS 200 (Autumn 2016), Lecture 15, Theorem 15.4 (model 'satisfying certain mild regularity assumptions'; unbiased T: Var_θ[T] ≥ 1/(nI(θ)), I(θ) the information in one observation, Var of the sample score = nI(θ)) and p.15-4 ('For two unbiased estimators of θ, the ratio of their variances is called their relative efficiency'; efficient = variance equals 1/(nI(θ)); MLE asymptotically efficient), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf; Shao, UW–Madison Stat 610 Lecture 24 'Sample median and quantiles', Example 10.2.4 (slide 11): ARE(sample median, X̄) = 4f(µ)²σ² for F symmetric about its median (= 2/π ≈ 0.637 for the normal, i.e. Var(median)/Var(X̄) → π/2 ≈ 1.571), sha256:a9cfecddf7ec9f7d2d195a36cb6da10155367023055d078cd0d3343694296cd9 — https://pages.stat.wisc.edu/~shao/stat610/stat610-24.pdf
- note: F-001, F-002, F-003 resolved. Medium: rank-3 open references (Hogg, McKean & Craig §6.2 not free); the median example's 'both unbiased' rests on normal symmetry (Shao: F symmetric about its median).
