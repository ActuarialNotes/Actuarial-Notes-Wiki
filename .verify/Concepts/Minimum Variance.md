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

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: CRLB callout now reads 'Under regularity conditions (the support of f(x | theta) does not depend on theta), for any unbiased estimator theta-hat, Var >= 1/I(theta) = 1/(n I_1(theta))'; new bullet: for Uniform(0, theta) the support depends on theta and (n+1)X_(n)/n is unbiased with variance theta^2/(n(n+2)), below the theta^2/n the bound would give; the MLE bullet now opens 'Under the same kind of regularity conditions (common support, a true theta inside the parameter space, a differentiable log-likelihood)'. A bullet now says I_1 is the information in one observation and I(theta) = n I_1(theta) the sample's. Sources: Siegrist, Random §6.5 (Unbiased.html, sha256 0d9765c5…d531) - fundamental assumption, support not depending on theta, Uniform[0, a] 'the Cramer-Rao theorem does not apply' with V's variance a^2/(n(n+2)) below a^2/n, random-sample version n E[l^2]; Siegrist §6.3 (Likelihood.html) for V; Stanford STATS 200 Lecture 15 Thm 15.4 (mild regularity assumptions; sample score variance nI(theta)) and Lecture 14 Thm 14.1 (conditions for the MLE). Recomputed in python (exact fractions, simulation n = 5).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Lead rewritten: 'among the [[Unbiasedness|unbiased]] estimators of a parameter, the one with the smallest variance is preferred - for an unbiased estimator the variance is the [[Mean Square Error]], the expected squared distance from the true parameter' (the optional '(typically unbiased)' and the unsupported 'closest on average' rationale are gone). Source: Siegrist, Random §6.1 (Estimators.html, sha256 10914ffc…6c2a): mse(U) = E[(U - theta)^2]; 'if the estimator is unbiased, then the mean square error of U is simply the variance of U'; 'if we have two unbiased estimators of theta, we naturally prefer the one with the smaller variance (mean square error)'; §6.5 frames the problem within a class of unbiased estimators.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Re-read the whole page after the edits. CRLB 1/(nI_1) with I_1 = E[(d/dtheta ln f)^2] under regularity conditions (Siegrist §6.5; Stanford L15 Thm 15.4); efficient = attains the bound (Stanford L15 p.15-4); UMVUE definition (Siegrist §6.5); Lehmann-Scheffe (Siegrist §6.6); Uniform exception (Siegrist §6.5, §6.3); MLE asymptotic efficiency conditions (Stanford L14 Thm 14.1). Example recomputed: exponential score -1/theta + x/theta^2, I_1 = 1/theta^2 (simulated E[score^2] = 0.2507 vs 0.25 at theta = 2), CRLB theta^2/n = Var(Xbar). All 6 links/embeds resolve; 26 math spans render after normalizeVaultMath. Figure not re-checked (generated; F-003 left to the figure agent).
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 8 'applying criteria to estimates such as consistency, unbiasedness, sufficiency, efficiency, minimum variance, mean square error' (PDF p.4); James et al. Chapters 1, 2 (excluding Section 2.2.3) on Domain C (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §6.1 Estimators: bias(U) = E(U) − θ; mse(U) = E[(U − θ)²] = var(U) + bias²(U); U unbiased if E(U) = θ for all θ ∈ T; 'if we have two unbiased estimators of θ, we naturally prefer the one with the smaller variance (mean square error)'; more efficient / eff(U, V) = var(V)/var(U) defined for U, V unbiased; asymptotic relative efficiency for asymptotically unbiased sequences; consistency = convergence in probability; mean-square consistent ⇒ consistent; var(M_n) = σ²/n; var(S_n²) = (1/n)(σ4 − (n−3)σ⁴/(n−1)), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html; Siegrist, Random, §6.3 Maximum Likelihood: normal MLEs M and T² (divisor n); Uniform[0,h] MLE X_(n), E = nh/(n+1); V = (n+1)X_(n)/n unbiased with var h²/(n(n+2)), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html; Siegrist, Random, §6.5 Best Unbiased Estimators: UMVUE definition; Cramér–Rao bound 'under mild conditions' — the fundamental assumption (d/dθ and E_θ interchangeable; satisfied when the support does not depend on θ); random-sample versions with n·E_θ[l²(X, θ)]; exponential/gamma (known k) M/k attains b²/(nk); normal var(S²) = 2σ⁴/(n−1); Uniform[0,a]: 'Assumption is not satisfied', bound a²/n, 'the Cramér-Rao theorem does not apply', V has variance a²/(n(n+2)) below it, support depends on a, sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html; Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics: Lehmann–Scheffé theorem (an unbiased function of a sufficient, complete statistic is a UMVUE), sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html; Stanford STATS 200 (Autumn 2016), Lecture 14, Theorem 14.1: under regularity conditions (all f(x|θ) share one support, θ0 interior to Ω, differentiable log-likelihood, unique score root) the MLE is consistent and asymptotically normal with variance 1/(nI(θ0)), I(θ) per observation; MLE asymptotically unbiased, pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf; Stanford STATS 200 (Autumn 2016), Lecture 15, Theorem 15.4 (model 'satisfying certain mild regularity assumptions'; unbiased T: Var_θ[T] ≥ 1/(nI(θ)), I(θ) the information in one observation, Var of the sample score = nI(θ)) and p.15-4 ('For two unbiased estimators of θ, the ratio of their variances is called their relative efficiency'; efficient = variance equals 1/(nI(θ)); MLE asymptotically efficient), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf
- note: F-001 and F-002 resolved. F-003 (figure variance ratios, Media/Figures/Minimum_Variance.svg via minimum_variance() in scripts/figures_exam_mas_i.py) stays open: generated figure, out of scope for this package. Medium: rank-3 open references and an open minor figure finding.

## [F-003/R] Minimum Variance figure now draws computed variances for N(theta, 1), n = 5
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-003
- status: resolved
- note: minimum_variance() in scripts/figures_exam_mas_i.py now draws one stated case: a sample of n = 5 from N(theta, 1). The bars and their labels are the estimators' actual variances, computed in the builder (new helper _normal_median_midrange_var integrates the order-statistic densities: X(3) alone for the median, the joint density of (X(1), X(5)) for the midrange; both unbiased for theta by symmetry): Xbar 1/n = 0.20 (the Cramer-Rao bound sigma^2/n, so the dashed line now marks it), midrange 0.26 (0.2609), median 0.29 (0.2868), X1 sigma^2 = 1.00, drawn in ascending order on a 0-1 axis with an 'n = 5' label; the alt text now names the population and n. Regenerated Media/Figures/Minimum_Variance.svg only. Checked: the integrated values match the tabulated normal small-sample values (n = 3 median 0.4487, midrange 0.3622 = 0.3333/0.920) and a 2,000,000-replication numpy simulation at n = 5 (Var mean 0.2001, median 0.2869, midrange 0.2609, X1 1.0005); labels read back from the SVG (0.20 / 0.26 / 0.29 / 1.00); rendered in headless Chromium. Var(Xbar) = sigma^2/n per Siegrist §6.1 as cited in F-003. scripts/test_figure_kit.py: 11 tests OK.
