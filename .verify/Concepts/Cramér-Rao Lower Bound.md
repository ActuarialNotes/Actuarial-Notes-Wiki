---
target: Concepts/Cramér-Rao Lower Bound.md
created: 2026-10-05
---

## [F-001] Lead defines the bound as the smallest variance an unbiased estimator can have; the page's own examples show it is not always attained
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: nit
- status: open
- locus: lead sentence, line 14
- claim: The Cramer-Rao lower bound (CRLB) is the smallest variance that any unbiased estimator of a parameter can have, under standard regularity conditions.
- evidence: Read literally this says the bound is attained. Siegrist, Random §6.5 (point/Unbiased.html) and Stanford STATS 200 Lecture 15 Theorem 15.4 state it as a lower bound (an inequality), attained only when the score is linear in the estimator; the page itself says so in 'Attaining it' ('Often no unbiased estimator attains it') and in both worked examples (the Poisson no-claim UMVUE at 0.0013420 vs the bound 0.0013406; the Pareto estimator at 0.50 vs 0.45). So this is wording, corrected further down the page.
- source_rank: 3
- proposed_action: Say 'a lower bound on the variance that any unbiased estimator ... can have'. Not applied - the fix is new wording.
- applied: false
- fingerprint: 89b09c8a2a6b

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Bound for theta and for g(theta) ((d lambda/d theta)^2 / (n E[l^2]) and the second-derivative form, Siegrist §6.5); I per observation, factor n (Stanford L15 Thm 15.4); regularity and Uniform(0, theta): bound theta^2/n vs var((n+1)/n X_(n)) = theta^2/(n(n+2)) (§6.5, §6.3); attainment iff the score is linear in the estimator (§6.5 equality condition - integrating it in theta gives the exponential-family form, hence 'essentially confines'); efficient => UMVUE (§6.5, Wikipedia); MLE asymptotic (Stanford L14/L15); biased estimators can beat the bound (Stanford L15 p.15-4 footnote, constant estimator). Examples recomputed before comparing: bound 0.2 e^{-0.4}/100 = 0.0013406, SE 0.0366; UMVUE ((n-1)/n)^Y (Siegrist §6.6) variance e^{-2 lambda}(e^{lambda/n} - 1) = 0.0013420; Pareto I(alpha) = 1/alpha^2, bound 0.45, ln(1 + X/theta) ~ exponential(rate alpha), var((n-1)/G) = alpha^2/(n-2) = 0.50, efficiency 0.90. Links resolve; no figure.
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html; Siegrist, Random, §6.5 Best Unbiased Estimators (UMVUE; Cramér–Rao bound under the interchange assumption, support not depending on θ; (dλ/dθ)²/(n E[l²]) and the second-derivative form; equality iff h(X) = λ(θ) + u(θ)L1; Bernoulli, Poisson (θ/n), normal (M attains σ²/n), gamma; Uniform[0,a]: assumption fails, theorem does not apply), sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html; Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics (definition via the conditional distribution; Fisher–Neyman factorization; MLE vs sufficient statistic; Rao–Blackwell; Lehmann–Scheffé; Bernoulli, Poisson (UMVUE ((n−1)/n)^Y of e^{−θ}), normal, gamma, uniform; exponential family natural statistic minimally sufficient and complete), sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html; Stanford STATS 200 (Autumn 2016), Lecture 14, Theorem 14.1 and its regularity conditions (common support, interior θ0, differentiable log-likelihood, unique score root); I(θ) per observation = Var[z] = −E[z′], pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf; Stanford STATS 200 (Autumn 2016), Lecture 15, Theorem 15.4 (Var[T] ≥ 1/(nI(θ)) for unbiased T, 'certain mild regularity assumptions'; Var of the sample score = nI(θ)) and p.15-4 (efficient = attains the bound; MLE asymptotically efficient; MoM expected to have higher MSE than the MLE for large n; biased estimators can beat the bound at special θ), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf; Wikipedia, 'Efficiency (statistics)' (fetched 2026-10-05): e(T) = (1/I(θ))/var(T) for an unbiased estimator T, I the sample Fisher information; an efficient estimator is the MVUE, sha256:f3baa00ac8a8d31a872a6f9d3a44610eca510d677fd167845ebf24948621e97f — https://en.wikipedia.org/wiki/Efficiency_(statistics)
- note: Open nit F-001 (lead wording implies the bound is attained; the page corrects it below). Medium: rank-3 sources. Hogg, McKean & Craig 8th ed. (the MAS-I reading) is not free; only its printed contents were read (topic placement), so formulas rest on rank-3 open references.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Lead now: 'is a lower bound - not always attained - on the variance of any unbiased estimator of a parameter, under standard regularity conditions.' Siegrist, Random §6.5 (point/Unbiased.html): a lower bound on the variance of any unbiased estimator; an estimator achieving it is UMVUE; equality iff the estimator is a linear function of the score; Stanford STATS 200 Lecture 15 Theorem 15.4 (inequality). Both worked examples recomputed in python and still show non-attainment: Poisson no-claim UMVUE variance 0.0013420 vs bound 0.0013406 (lambda = 0.2, n = 100, SE floor 0.0366); Pareto (n-1)/G variance alpha^2/(n-2) = 0.50 vs bound alpha^2/n = 0.45, efficiency 0.90.

## [F-002] 'Large samples' bullet states MLE asymptotic efficiency without its regularity conditions
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 'Large samples', line 32
- claim: The [[Maximum Likelihood Estimation|MLE]] attains the bound asymptotically, theta-hat ~ N(theta, 1/(nI(theta))) - no conditions; the lead's 'standard regularity conditions' qualify the bound and the Regularity bullet names only the support condition.
- evidence: The asymptotic result needs its own conditions: Stanford STATS 200 Lecture 14 Theorem 14.1 (pp.14-1-14-2): 'Suppose certain regularity conditions hold, including: all PDFs/PMFs f(x|theta) in the model have the same support; theta0 is an interior point of Omega; the log-likelihood l(theta) is differentiable in theta; theta-hat is the unique value of theta that solves 0 = l'(theta)', then theta-hat is consistent and asymptotically normal, sqrt(n)(theta-hat - theta0) -> N(0, 1/I(theta0)); Lecture 15 p.15-4: the MLE 'achieves this lower bound asymptotically ... asymptotically efficient'; PSU STAT 415 Lesson 7 §7.1 'subject to some regularity conditions' (smooth f, MLE not on the edge of allowable values); Loss Data Analytics App. C §17.2.2 'under certain regularity conditions'. Same defect as Maximum Likelihood Estimation F-001; found while resolving F-001.
- source_rank: 3
- proposed_action: Prefix the bullet with the conditions. Applied in this run.
- applied: true
- fingerprint: 2a0c5d66243b

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: The Large-samples bullet now opens 'Under the same kind of regularity conditions (a support that does not depend on theta, a true theta inside the parameter space, a differentiable log-likelihood), the MLE attains the bound asymptotically' - Stanford STATS 200 Lecture 14 Theorem 14.1 (pp.14-1-14-2) and Lecture 15 p.15-4; PSU STAT 415 Lesson 7 §7.1; the same wording the Minimum Variance page uses.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: F-001 and F-002 edits re-read against Siegrist §6.5/§6.6 and Stanford L14/L15; bound for theta and for g(theta), I(theta) per observation and its two forms, uniform counterexample (§6.3: (n+1)X_(n)/n unbiased, var h^2/(n(n+2))), attainment iff score linear in the estimator (§6.5), biased estimators below the bound (L15 p.15-4) re-read; examples recomputed in python: Poisson bound 0.2e^-0.4/100 = 0.0013406, UMVUE variance e^-0.4(e^0.002 - 1) = 0.0013420; Pareto I = 1/alpha^2, CRLB 9/20 = 0.45, Var((n-1)/G) = alpha^2/(n-2) = 0.50 (G ~ Gamma(n, rate alpha): E[1/G] = alpha/(n-1), E[1/G^2] = alpha^2/((n-1)(n-2))), efficiency 0.90; links resolve; every cited web source re-fetched live this session (Siegrist pages, Stanford STATS 200 L14/L15, PSU STAT 415 L7, LDA) and its sha256 matches the cited one; cached PDFs re-hashed
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html; Siegrist, Random, §6.5 Best Unbiased Estimators (UMVUE; Cramér–Rao bound under the interchange assumption, support not depending on θ; (dλ/dθ)²/(n E[l²]) and the second-derivative form; equality iff h(X) = λ(θ) + u(θ)L1; Bernoulli, Poisson (θ/n), normal (M attains σ²/n), gamma; Uniform[0,a]: assumption fails, theorem does not apply), sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html; Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics (definition via the conditional distribution; Fisher–Neyman factorization; MLE vs sufficient statistic; Rao–Blackwell; Lehmann–Scheffé; Bernoulli, Poisson (UMVUE ((n−1)/n)^Y of e^{−θ}), normal, gamma, uniform; exponential family natural statistic minimally sufficient and complete), sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html; Stanford STATS 200 (Autumn 2016), Lecture 14, Theorem 14.1 and its regularity conditions (common support, interior θ0, differentiable log-likelihood, unique score root); I(θ) per observation = Var[z] = −E[z′], pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf; Stanford STATS 200 (Autumn 2016), Lecture 15, Theorem 15.4 (Var[T] ≥ 1/(nI(θ)) for unbiased T, 'certain mild regularity assumptions'; Var of the sample score = nI(θ)) and p.15-4 (efficient = attains the bound; MLE asymptotically efficient; MoM expected to have higher MSE than the MLE for large n; biased estimators can beat the bound at special θ), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf; Wikipedia, 'Efficiency (statistics)' (fetched 2026-10-05): e(T) = (1/I(θ))/var(T) for an unbiased estimator T, I the sample Fisher information; an efficient estimator is the MVUE, sha256:f3baa00ac8a8d31a872a6f9d3a44610eca510d677fd167845ebf24948621e97f — https://en.wikipedia.org/wiki/Efficiency_(statistics)
- note: Resolve run: every open finding closed. Medium, not high: the MAS-I reading (Hogg, McKean & Craig 8th ed.) is not free, so the formulas rest on rank-3 open references, and the worked examples are the vault's own.
