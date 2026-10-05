---
target: Concepts/Fisher Information.md
created: 2026-10-05
---

## [F-001] Lead calls the Cramer-Rao bound the smallest variance an unbiased estimator can achieve
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: lead sentence, line 14
- claim: It sets the Cramer-Rao lower bound, the smallest variance any unbiased estimator can achieve, and so defines what efficient means.
- evidence: The bound is a lower bound that need not be attained. Siegrist, Random §6.5 (point/Unbiased.html): 'there is a lower bound on the variance of any unbiased estimator ... if we can find an estimator that achieves this lower bound for all theta, then the estimator must be an UMVUE', with equality iff h(X) = lambda(theta) + u(theta) L1(X, theta); Stanford STATS 200 Lecture 15 Theorem 15.4 states it as an inequality. Example where no unbiased estimator attains it: Siegrist §6.6 (point/Sufficient.html) gives ((n-1)/n)^Y as the UMVUE of e^{-theta} for a Poisson sample; its variance e^{-2 theta}(e^{theta/n} - 1) exceeds the bound theta e^{-2 theta}/n for every theta > 0 because e^x - 1 > x (rank-5 arithmetic; the [[Cramér-Rao Lower Bound]] page works the same case at lambda = 0.2, n = 100: 0.0013420 vs 0.0013406).
- source_rank: 3
- proposed_action: Say 'a lower bound on the variance of any unbiased estimator (not always attained)'. Not applied - the fix is new wording.
- applied: false
- fingerprint: c46562d9fa46

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: I(theta) per observation = E[(d ln f)^2] = -E[d^2 ln f] under regularity (Stanford L14: Var[z] = -E[z']; Siegrist §6.5 second version); CRLB 1/(nI) and additivity (Stanford L15 Thm 15.4 and proof: Var of the sample score = nI; Siegrist §6.5); support condition and Uniform(0, theta) (§6.5); efficiency ratio (Wikipedia e(T); Stanford L15 p.15-4); MLE ~ N(theta, 1/(nI)) (Stanford L14 Thm 14.1); observed information and its inverse as the covariance matrix (Loss Data Analytics App. C §17.2.2). Notation: per-observation I(theta) as Siegrist and Stanford; PSU 415 writes I for the whole sample. Examples recomputed before comparing: Poisson I = 1/lambda, bound lambda/n = var(X-bar) (Siegrist §6.5: theta/n, attained by M); SE = 1,500/sqrt(200) = 106.1, 95% CI (1,292, 1,708). Links resolve; figure generator fisher_information() checked.
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Siegrist, Random, §6.5 Best Unbiased Estimators (UMVUE; Cramér–Rao bound under the interchange assumption, support not depending on θ; (dλ/dθ)²/(n E[l²]) and the second-derivative form; equality iff h(X) = λ(θ) + u(θ)L1; Bernoulli, Poisson (θ/n), normal (M attains σ²/n), gamma; Uniform[0,a]: assumption fails, theorem does not apply), sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html; Stanford STATS 200 (Autumn 2016), Lecture 14, Theorem 14.1 and its regularity conditions (common support, interior θ0, differentiable log-likelihood, unique score root); I(θ) per observation = Var[z] = −E[z′], pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf; Stanford STATS 200 (Autumn 2016), Lecture 15, Theorem 15.4 (Var[T] ≥ 1/(nI(θ)) for unbiased T, 'certain mild regularity assumptions'; Var of the sample score = nI(θ)) and p.15-4 (efficient = attains the bound; MLE asymptotically efficient; MoM expected to have higher MSE than the MLE for large n; biased estimators can beat the bound at special θ), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf; Frees et al., Loss Data Analytics, Appendix C §17.2.2 Asymptotic Properties of MLE: consistency, asymptotic normality and efficiency 'under certain regularity conditions'; variance estimated from the observed Fisher information (matrix inverse), sha256:3d597f08f5d5e9a3ec4283da37ed9b7f1a637796e1761aac8f977fe2f34a6211 — https://openacttexts.github.io/Loss-Data-Analytics/CAppC.html; Wikipedia, 'Efficiency (statistics)' (fetched 2026-10-05): e(T) = (1/I(θ))/var(T) for an unbiased estimator T, I the sample Fisher information; an efficient estimator is the MVUE, sha256:f3baa00ac8a8d31a872a6f9d3a44610eca510d677fd167845ebf24948621e97f — https://en.wikipedia.org/wiki/Efficiency_(statistics); Penn State STAT 415, Lesson 7 §7.1 Properties of MLEs: consistency, equivariance, asymptotic normality 'subject to some regularity conditions'; Ex 7.1 normal MLEs x̄ and divisor-n variance (I(θ) written for the whole sample there), sha256:0c6afc848ae41251fc702348e0e8c603c5725f1f03c20b4731d789a61babbe0b — https://online.stat.psu.edu/stat415/Lesson07.html
- note: Open minor F-001 (lead says the bound is the smallest variance an unbiased estimator can achieve). Medium: rank-3 sources. Hogg, McKean & Craig 8th ed. (the MAS-I reading) is not free; only its printed contents were read (topic placement), so formulas rest on rank-3 open references.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Lead now: 'It sets the Cramer-Rao lower bound, a lower bound on the variance of any unbiased estimator - one that is not always attained - and so defines what efficient means.' Siegrist, Random §6.5 (point/Unbiased.html): 'under mild conditions, there is a lower bound on the variance of any unbiased estimator ... if we can find an estimator that achieves this lower bound for all theta, then the estimator must be an UMVUE', equality iff h(X) = lambda(theta) + u(theta) L1(X, theta); Stanford STATS 200 Lecture 15 Theorem 15.4 states it as an inequality. Non-attainment recomputed in python: the Poisson UMVUE ((n-1)/n)^Y of e^(-lambda) (Siegrist §6.6) has variance e^(-2 lambda)(e^(lambda/n) - 1) = 0.0013420 > the bound lambda e^(-2 lambda)/n = 0.0013406 at lambda = 0.2, n = 100.

## [F-002] MLE asymptotic normality and efficiency stated without regularity conditions
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: major
- status: open
- locus: bullet 4 (MLE asymptotics), line 30
- claim: The [[Maximum Likelihood Estimation|MLE]] is asymptotically Normal and asymptotically efficient: theta-hat ~ N(theta, 1/(nI(theta))) - no conditions on the MLE result (bullet 2's regularity condition is attached only to the two forms of I(theta) agreeing and to the bound).
- evidence: The result needs regularity conditions: Stanford STATS 200 Lecture 14 Theorem 14.1 (pp.14-1-14-2): 'Suppose certain regularity conditions hold, including: all PDFs/PMFs f(x|theta) in the model have the same support; theta0 is an interior point of Omega; the log-likelihood l(theta) is differentiable in theta; theta-hat is the unique value of theta that solves 0 = l'(theta)', then theta-hat is consistent and asymptotically normal, sqrt(n)(theta-hat - theta0) -> N(0, 1/I(theta0)); Lecture 15 p.15-4: the MLE 'achieves this lower bound asymptotically ... asymptotically efficient'; PSU STAT 415 Lesson 7 §7.1 'subject to some regularity conditions' (smooth f, MLE not on the edge of allowable values); Loss Data Analytics App. C §17.2.2 'under certain regularity conditions'. For Uniform(0, theta) Siegrist §6.3 gives mse(X_(n)) = 2h^2/((n+1)(n+2)), order 1/n^2. Same defect as Maximum Likelihood Estimation F-001 and Parameter Estimation F-001; found while resolving F-001.
- source_rank: 3
- proposed_action: Open the bullet with the conditions, in the wording the sibling pages use. Applied in this run.
- applied: true
- fingerprint: 540edce63a46

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Bullet 4 now opens 'Under regularity conditions - a support that does not depend on theta, a true theta inside the parameter space, a differentiable log-likelihood - the MLE is asymptotically Normal and asymptotically efficient', the conditions of Stanford STATS 200 Lecture 14 Theorem 14.1 (pp.14-1-14-2; asymptotic efficiency Lecture 15 p.15-4), PSU STAT 415 Lesson 7 §7.1 and Loss Data Analytics App. C §17.2.2 - the same wording the Efficiency and Minimum Variance pages now use.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: F-001 and F-002 edits re-read against Siegrist §6.5/§6.6, Stanford L14/L15, PSU 415 L7 and LDA App C; both forms of I(theta) (L14: Var[z] = -E[z']), additivity nI(theta) (L15), efficiency ratio (Wikipedia 'Efficiency (statistics)'), observed information re-read; examples recomputed: Poisson I = 1/lambda, bound lambda/n = Var(X-bar); exponential SE = 1500/sqrt(200) = 106.07, 95% CI (1,292.1, 1,707.9); links and figure embed resolve; every cited web source re-fetched live this session (Siegrist pages, Stanford STATS 200 L14/L15, PSU STAT 415 L7, LDA) and its sha256 matches the cited one; cached PDFs re-hashed
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Siegrist, Random, §6.5 Best Unbiased Estimators (UMVUE; Cramér–Rao bound under the interchange assumption, support not depending on θ; (dλ/dθ)²/(n E[l²]) and the second-derivative form; equality iff h(X) = λ(θ) + u(θ)L1; Bernoulli, Poisson (θ/n), normal (M attains σ²/n), gamma; Uniform[0,a]: assumption fails, theorem does not apply), sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html; Stanford STATS 200 (Autumn 2016), Lecture 14, Theorem 14.1 and its regularity conditions (common support, interior θ0, differentiable log-likelihood, unique score root); I(θ) per observation = Var[z] = −E[z′], pp.14-1–14-2, sha256:bca5236cb18dfe151c931cf0087de47939ab0795ef1a232ed782929f7fa34d7d — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture14.pdf; Stanford STATS 200 (Autumn 2016), Lecture 15, Theorem 15.4 (Var[T] ≥ 1/(nI(θ)) for unbiased T, 'certain mild regularity assumptions'; Var of the sample score = nI(θ)) and p.15-4 (efficient = attains the bound; MLE asymptotically efficient; MoM expected to have higher MSE than the MLE for large n; biased estimators can beat the bound at special θ), sha256:7e9d32d62f5b6fe7374924822c86b27c81b36ee2b25ea596ca774f7678287247 — https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/Lecture15.pdf; Frees et al., Loss Data Analytics, Appendix C §17.2.2 Asymptotic Properties of MLE: consistency, asymptotic normality and efficiency 'under certain regularity conditions'; variance estimated from the observed Fisher information (matrix inverse), sha256:3d597f08f5d5e9a3ec4283da37ed9b7f1a637796e1761aac8f977fe2f34a6211 — https://openacttexts.github.io/Loss-Data-Analytics/CAppC.html; Wikipedia, 'Efficiency (statistics)' (fetched 2026-10-05): e(T) = (1/I(θ))/var(T) for an unbiased estimator T, I the sample Fisher information; an efficient estimator is the MVUE, sha256:f3baa00ac8a8d31a872a6f9d3a44610eca510d677fd167845ebf24948621e97f — https://en.wikipedia.org/wiki/Efficiency_(statistics); Penn State STAT 415, Lesson 7 §7.1 Properties of MLEs: consistency, equivariance, asymptotic normality 'subject to some regularity conditions'; Ex 7.1 normal MLEs x̄ and divisor-n variance (I(θ) written for the whole sample there), sha256:0c6afc848ae41251fc702348e0e8c603c5725f1f03c20b4731d789a61babbe0b — https://online.stat.psu.edu/stat415/Lesson07.html
- note: Resolve run: every open finding closed. Medium, not high: the MAS-I reading (Hogg, McKean & Craig 8th ed.) is not free, so the formulas rest on rank-3 open references, and the worked examples are the vault's own.
