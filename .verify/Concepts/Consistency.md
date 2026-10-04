---
target: Concepts/Consistency.md
created: 2026-10-04
---

## [F-001] Unbiasedness described as holding "for every n"
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: nit
- status: open
- locus: bullet 2, line 21
- claim: "Consistency is a large-sample (asymptotic) property ... unlike [[Unbiasedness]], which must hold for every n".
- evidence: Siegrist, Random §6.1 defines U as unbiased when E(U) = theta for all theta in T - the quantifier is over the parameter, at the sample size in use; only asymptotic unbiasedness is a statement about n -> infinity. The vault Unbiasedness page also says "for all theta". The contrast the bullet means - unbiasedness is a finite-sample property, consistency an asymptotic one - is right; "for every n" swaps the quantifier.
- source_rank: 3
- proposed_action: Reword to "which is a property at the sample size actually used (for every theta)".
- applied: false
- fingerprint: 0df5a29c2c95

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: Definition (convergence in probability, P(|theta_n - theta| > eps) -> 0 for every eps) against Siegrist §6.1; sufficient condition bias -> 0 and var -> 0 => MSE -> 0 => consistent (Siegrist §6.1 mean-square consistency, proved there by Markov on (U - theta)^2, which the page calls Chebyshev - naming only); biased-but-consistent divisor-n variance (PSU Ex 2.7/2.11, Siegrist §6.1); MLE consistent under regularity conditions (PSU Lesson 7 §7.1 Property 1; Stanford L14 Thm 14.1). Examples recomputed before comparing: Var(Xbar) = sigma^2/n -> 0 (Siegrist §6.1); bias of divisor-n estimator -sigma^2/n and its variance 2(n-1)sigma^4/n^2 = O(1/n) from Siegrist §6.5 var(S^2) = 2 sigma^4/(n-1). Links resolve exact; figure builder consistency() uses sd 1, 0.5, 0.25, 0.125 for n = 25, 100, 400, 1600 (sd proportional to 1/sqrt(n), correct); 38 math spans render. Linking exam pages: only Exam MAS-I (CAS).md (Domain B task 8 criteria list, line 73; Estimation criteria, line 88) and the same estimator sense on Parameter Estimation, Sample Mean, Method of Moments.
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 8 'applying criteria to estimates such as consistency, unbiasedness, sufficiency, efficiency, minimum variance, mean square error' and tasks 1, 5, 6 (PDF p.4); James et al. Ch 2 excluding §2.2.3 on Domain C (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), ch. 6 Point Estimation, §6.1 Estimators: bias(U) = E(U) − θ, mse(U) = E[(U − θ)²] = var(U) + bias²(U), unbiased = E(U) = θ for all θ, relative efficiency eff(U,V) = var(V)/var(U) for unbiased U, V, asymptotic unbiasedness and asymptotic relative efficiency, consistency (convergence in probability), mean-square consistency ⇒ consistency (Markov), M_n unbiased with var σ²/n, S_n² unbiased with var (1/n)(σ4 − (n−3)σ⁴/(n−1)), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html; Siegrist, Random, §6.5 Best Unbiased Estimators: UMVUE definition; Cramér–Rao bound and its fundamental assumption (d/dθ and E interchangeable; support not depending on θ); random-sample form with n·E[l²(X,θ)]; normal case var(S²) = 2σ⁴/(n−1), M attains σ²/n; gamma (known shape k) M/k attains b²/(nk); Uniform[0,a]: assumption not satisfied, theorem does not apply, sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html; Penn State STAT 415 (redesigned notes), Lesson 2 Estimation (Part I): Def 2.2 and §2.2.1 bias; Ex 2.7 E[σ̂²] = (n−1)σ²/n (divisor n, biased); Ex 2.8 S² unbiased; Ex 2.11 asymptotically unbiased; Def 2.3 MSE = E[(θ̂−θ)²] = Var + Bias² (its Ex 2.12 subtracts Bias², a slip in the source, not relied on), sha256:6f5a6c01ae2d4c7cb46a18ad68a9e26b8177b5035860946e83d31b6236a6534d — https://online.stat.psu.edu/stat415/Lesson02.html; Penn State STAT 415, Lesson 7 §7.1 Properties of MLEs: consistency and asymptotic normality N(θ, 1/I) 'subject to some regularity conditions', sha256:0c6afc848ae41251fc702348e0e8c603c5725f1f03c20b4731d789a61babbe0b — https://online.stat.psu.edu/stat415/Lesson07.html; Stanford STATS 200 (Autumn 2016), Lecture 14 Consistency and asymptotic normality of the MLE, Theorem 14.1 and its regularity conditions (common support, interior θ0, differentiable log-likelihood), MLE asymptotically unbiased, pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf
- note: Open nit F-001 ("unbiasedness must hold for every n" - the quantifier is over theta). Medium: rank-3 open references only; Hogg, McKean & Craig §5.1 / §6.1 not read (not free).
