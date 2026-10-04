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
