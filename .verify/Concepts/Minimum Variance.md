---
target: Concepts/Minimum Variance.md
created: 2026-10-04
---

## [F-001] Cramer-Rao lower bound stated for "any unbiased estimator" without regularity conditions
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: CRLB callout (lines 16-21) and bullet 4 (MLE asymptotic efficiency, line 26)
- claim: "Cramer-Rao Lower Bound (CRLB): For any unbiased estimator theta-hat, Var(theta-hat) >= 1/I(theta) = 1/(n I_1(theta))"; "MLEs are asymptotically efficient: their variance approaches the CRLB as n -> infinity" - no condition stated.
- evidence: Stanford STATS 200 Lecture 15, Theorem 15.4 proves the bound only for a model "satisfying certain mild regularity assumptions". Siegrist, Random §6.5 (Unbiased.html) states the fundamental assumption (d/dtheta and E interchangeable; in practice the support of f does not depend on theta) and says that for Uniform[0, a] it "is not satisfied" and "the Cramer-Rao theorem does not apply". Siegrist §6.3 (Likelihood.html): V = (n+1)X_(n)/n is unbiased for h with var h^2/(n(n+2)), below the h^2/n the unqualified bound would give - "any unbiased estimator" is false there. MLE asymptotic efficiency likewise needs common support, an interior parameter and a differentiable log-likelihood (Stanford Lecture 14, Theorem 14.1; PSU STAT 415 Lesson 7 §7.1). The formula itself is right under those conditions: Siegrist random-sample version n E[l^2(X, theta)] = n I_1(theta), and the exponential example (I_1 = 1/theta^2, CRLB theta^2/n, Xbar attains it) matches Siegrist §6.5 gamma case with k = 1.
- source_rank: 3
- proposed_action: Qualify the bound: "under regularity conditions (the support of f does not depend on theta)", and note it fails for Uniform(0, theta), as the [[Cramer-Rao Lower Bound]] page does; carry the same condition into the MLE bullet. Not applied: new wording.
- applied: false
- fingerprint: 1f92b3ab48d5

## [F-002] Lead sentence makes unbiasedness optional, but its "closest on average" rationale needs it
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: lead sentence, line 14
- claim: "among all estimators in a given class (typically unbiased), the one with the smallest variance is preferred, as it produces estimates closest to the true parameter on average".
- evidence: Siegrist, Random §6.1 prefers the smaller variance only between unbiased estimators ("if we have two unbiased estimators of theta, we naturally prefer the one with the smaller variance (mean square error)"), and §6.5 frames the problem as "the best estimator of lambda among a given class of unbiased estimators". Without unbiasedness, smallest variance does not mean closest to theta: mse = var + bias^2 (Siegrist §6.1), and a constant estimator has variance 0. Low consequence: the rest of the page (CRLB, UMVUE, Lehmann-Scheffe) states the unbiased condition explicitly.
- source_rank: 3
- proposed_action: Make the class unbiased in the lead (drop "typically"), or say the rationale holds within the unbiased class, where variance equals MSE.
- applied: false
- fingerprint: 083c6884485e

## [F-003] Figure variance ratios match no single sample size
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: figure (Media/Figures/Minimum_Variance.svg, built by minimum_variance() in scripts/figures_exam_mas_i.py)
- claim: Bars labelled Var(theta-hat): Xbar 1.00, median 1.57, midrange 2.30, X1 4.00.
- evidence: With Var(Xbar) normalised to 1, Var(X1)/Var(Xbar) = n exactly (Siegrist §6.1: var(M_n) = sigma^2/n), so the X1 bar fixes n = 4. The median 1.57 is the large-sample normal ratio pi/2 (Shao, Stat 610 Lecture 24 slide 9: ARE(median, Xbar) = 0.637), not an n = 4 value. Rank-5 check (falsifies, does not confirm): a 60,000-replication normal simulation gives median/mean about 1.19 and midrange/mean about 1.19 at n = 4 (1.40 and 1.87 at n = 10; 1.55 and 3.28 at n = 25), so no normal sample size reproduces the four labels together. The ordering the alt text states (Xbar smallest) is right for the normal (Siegrist §6.5: M attains sigma^2/n). The figure names no population and the page text does not use the numbers, so the consequence is low, but the labels read as computed values.
- source_rank: 3
- proposed_action: In minimum_variance() use ratios computed for one stated population and n, or drop the numeric labels, then regenerate - do not hand-edit the SVG.
- applied: false
- fingerprint: df01a9a98a87

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: low
- checks_run: CRLB formula Var >= 1/(n I_1(theta)) with I_1 = E[(d/dtheta ln f)^2] (Siegrist §6.5 random-sample version; Stanford L15 Thm 15.4); efficient = unbiased and attains it (Stanford L15 p.15-4); UMVUE (Siegrist §6.5); Lehmann-Scheffe (Siegrist §6.6); MLE asymptotically efficient (Stanford L15) under the L14 Thm 14.1 conditions. Example recomputed before comparing: ln f = -ln theta - x/theta, score = -1/theta + x/theta^2, I_1 = Var((X - theta)/theta^2) = 1/theta^2, CRLB theta^2/n = Var(Xbar) - matches Siegrist §6.5 gamma (k = 1) case. Figure builder minimum_variance() checked: labels inconsistent (F-003). Links resolve exact; figure file exists; 15 math spans render. Linking exam pages: only Exam MAS-I (CAS).md (Domain B task 8 criteria list, line 73; Estimation criteria, line 88); inbound Linear Regression (Gauss-Markov, linear unbiased class) and Mack Chain Ladder (Exam 7, minimum-variance unbiased weighted average) use the same within-a-class sense the lead allows. Notation: I(theta) here = sample information n I_1(theta), explicit on the page; the vault Fisher Information page uses per-observation I(theta) - noted, not a finding.
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 8 'applying criteria to estimates such as consistency, unbiasedness, sufficiency, efficiency, minimum variance, mean square error' and tasks 1, 5, 6 (PDF p.4); James et al. Ch 2 excluding §2.2.3 on Domain C (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), ch. 6 Point Estimation, §6.1 Estimators: bias(U) = E(U) − θ, mse(U) = E[(U − θ)²] = var(U) + bias²(U), unbiased = E(U) = θ for all θ, relative efficiency eff(U,V) = var(V)/var(U) for unbiased U, V, asymptotic unbiasedness and asymptotic relative efficiency, consistency (convergence in probability), mean-square consistency ⇒ consistency (Markov), M_n unbiased with var σ²/n, S_n² unbiased with var (1/n)(σ4 − (n−3)σ⁴/(n−1)), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html; Siegrist, Random, §6.5 Best Unbiased Estimators: UMVUE definition; Cramér–Rao bound and its fundamental assumption (d/dθ and E interchangeable; support not depending on θ); random-sample form with n·E[l²(X,θ)]; normal case var(S²) = 2σ⁴/(n−1), M attains σ²/n; gamma (known shape k) M/k attains b²/(nk); Uniform[0,a]: assumption not satisfied, theorem does not apply, sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html; Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics: Rao–Blackwell and Lehmann–Scheffé theorems, sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html; Siegrist, Random, §6.3 Maximum Likelihood: normal MLEs M and T² (divisor n); Uniform[0,h] MLE X_(n) with E = nh/(n+1), bias −h/(n+1), V = (n+1)X_(n)/n unbiased with var h²/(n(n+2)) ('super efficient'), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html; Stanford STATS 200 (Autumn 2016), Lecture 14 Consistency and asymptotic normality of the MLE, Theorem 14.1 and its regularity conditions (common support, interior θ0, differentiable log-likelihood), MLE asymptotically unbiased, pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf; Stanford STATS 200 (Autumn 2016), Lecture 15 Fisher information and the Cramér–Rao bound, Theorem 15.4 (Var_θ[T] ≥ 1/(nI(θ)) for unbiased T, 'satisfying certain mild regularity assumptions', I(θ) per observation) and p.15-4 (relative efficiency = ratio of variances of two unbiased estimators; efficient = attains 1/(nI(θ)); MLE asymptotically efficient), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf; Shao, UW–Madison Stat 610 Lecture 24 'Sample median and quantiles' (2014), slides 8–9: √n(Q̂0.5 − Q0.5) → N(0, 1/(4f(Q0.5)²)); ARE(median, X̄) = 4f(µ)²σ² = 0.637 for the normal, sha256:a9cfecddf7ec9f7d2d195a36cb6da10155367023055d078cd0d3343694296cd9 — https://pages.stat.wisc.edu/~shao/stat610/stat610-24.pdf
- note: Open major F-001 (CRLB "for any unbiased estimator" without regularity conditions; fails for Uniform(0, theta)), open minors F-002 (lead makes unbiasedness optional) and F-003 (figure ratios match no sample size) - hence low confidence. Rank-3 sources; Hogg, McKean & Craig §§6.2, 7.x not read (not free).
