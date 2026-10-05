---
target: Concepts/Sufficiency.md
created: 2026-10-05
---

## [F-001] 'An MLE is always a function of a sufficient statistic' omits the uniqueness condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: major
- status: open
- locus: bullet 4, line 24
- claim: A [[Maximum Likelihood Estimation|MLE]] is always a function of a sufficient statistic, so it automatically satisfies the sufficiency criterion
- evidence: Siegrist, Random §6.6 (point/Sufficient.html): 'Suppose that U is sufficient for theta and that there exists a maximum likelihood estimator of theta. Then there exists a maximum likelihood estimator V that is a function of U' - one such MLE exists, not 'always'; the following paragraph applies it to 'the unique maximum likelihood estimator'. When the MLE is not unique the claim fails: Siegrist §6.3 (point/Likelihood.html), uniform on [a, a+1]: 'Any statistic V in [X_(n) - 1, X_(1)] is a maximum likelihood estimator of a', and §6.6 gives (X_(1), X_(n)) as minimally sufficient for a; so V = X_(n) - 1 + (1 + X_(1) - X_(n)) * 1{X_1 > X_2} is an MLE that is not a function of (X_(1), X_(n)) (rank-5 construction from the sourced facts). The syllabus section is Hogg §7.3 'Properties of a Sufficient Statistic' (contents only - the text was not read).
- source_rank: 3
- proposed_action: Add the condition: 'If the MLE is unique, it is a function of any sufficient statistic (and an MLE that is a function of T can always be chosen)'. Not applied - the fix is new wording.
- applied: false
- fingerprint: ea09a4fe7429

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: low
- checks_run: Definition (conditional distribution free of theta) and factorization (Siegrist §6.6); Rao-Blackwell (E(V|U) unbiased and uniformly better) and Lehmann-Scheffe (§6.6); MLE vs sufficient statistic (§6.6, §6.3 - F-001). Examples worked before comparing: Bernoulli P(X = x | T = t) = 1/C(n, t) (Siegrist §6.6: uniform on the arrangements); Poisson l(lambda) = -n lambda + T ln lambda - sum ln x_i!, lambda-hat = T/n (§6.3, §6.6). Links resolve; figure generator sufficiency() checked (both samples total 7, prod x_i! = 12 vs 4, likelihood ratio 3, common peak 7/6). MAS-I Domain B task 8 lists sufficiency as a criterion.
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html; Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics (definition via the conditional distribution; Fisher–Neyman factorization; MLE vs sufficient statistic; Rao–Blackwell; Lehmann–Scheffé; Bernoulli, Poisson (UMVUE ((n−1)/n)^Y of e^{−θ}), normal, gamma, uniform; exponential family natural statistic minimally sufficient and complete), sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html
- note: Open major F-001 ('an MLE is always a function of a sufficient statistic' without uniqueness), hence low confidence. Hogg, McKean & Craig 8th ed. (the MAS-I reading) is not free; only its printed contents were read (topic placement), so formulas rest on rank-3 open references.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Bullet 4 now: 'If a MLE exists, one can always be chosen that is a function of the sufficient statistic, and a unique MLE always is one - so it satisfies the sufficiency criterion. Without uniqueness only that choice is guaranteed: for Uniform[a, a+1], any statistic in [X_(n) - 1, X_(1)] is an MLE of a'. Siegrist, Random §6.6 (point/Sufficient.html): 'Suppose that U is sufficient for theta and that there exists a maximum likelihood estimator of theta. Then there exists a maximum likelihood estimator V that is a function of U', and the unique-MLE case that follows it; (X_(1), X_(n)) is minimally sufficient for the uniform location parameter when h is known. Siegrist §6.3 (point/Likelihood.html): uniform on [a, a+1], 'there is not a unique maximum likelihood estimator. Any statistic V in [X_(n) - 1, X_(1)] is a maximum likelihood estimator of a'. The Poisson example (unique MLE T/n) is unchanged and still right.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: F-001 edit re-read against Siegrist §6.6 and §6.3; conditional-distribution definition, Fisher-Neyman factorization, Rao-Blackwell, Lehmann-Scheffe (§6.6) re-read; Bernoulli example recomputed: P(X = x | T = t) = 1/C(n, t), free of p; Poisson example: l(lambda) = -n lambda + T ln lambda - sum ln x_i!, l' = 0 at lambda-hat = T/n (unique, concave); links and figure embed resolve; every cited web source re-fetched live this session (Siegrist pages, Stanford STATS 200 L14/L15, PSU STAT 415 L7, LDA) and its sha256 matches the cited one; cached PDFs re-hashed
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html; Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics (definition via the conditional distribution; Fisher–Neyman factorization; MLE vs sufficient statistic; Rao–Blackwell; Lehmann–Scheffé; Bernoulli, Poisson (UMVUE ((n−1)/n)^Y of e^{−θ}), normal, gamma, uniform; exponential family natural statistic minimally sufficient and complete), sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html
- note: Resolve run: every open finding closed. Medium, not high: the MAS-I reading (Hogg, McKean & Craig 8th ed.) is not free, so the formulas rest on rank-3 open references, and the worked examples are the vault's own.
