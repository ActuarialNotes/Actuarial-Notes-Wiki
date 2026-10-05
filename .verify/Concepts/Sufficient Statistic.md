---
target: Concepts/Sufficient Statistic.md
created: 2026-10-05
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Definition via the conditional distribution and the Fisher-Neyman factorization G(u(x), theta) r(x) (Siegrist §6.6); exponential-family natural statistic minimally sufficient and complete (§6.6); Lehmann-Scheffe UMVUE (§6.6); table rows: Poisson sum X_i, normal mean with known sigma^2 (sum X_i / M), exponential = gamma with known shape k = 1 (sum X_i sufficient for the scale) (§6.6). Poisson factorization example worked through before comparing: g = e^{-n lambda} lambda^T, h = 1/prod x_i!. Links resolve; figure generator sufficient_statistic() (counts 2, 0, 1, 3, 0, 1 -> T = 7) checked. MAS-I Domain B task 2 usage matches.
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html; Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics (definition via the conditional distribution; Fisher–Neyman factorization; MLE vs sufficient statistic; Rao–Blackwell; Lehmann–Scheffé; Bernoulli, Poisson (UMVUE ((n−1)/n)^Y of e^{−θ}), normal, gamma, uniform; exponential family natural statistic minimally sufficient and complete), sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html
- note: No findings. Medium: rank-3 open references; the MAS-I outline (rank 1) confirms the topic only. Hogg, McKean & Craig 8th ed. (the MAS-I reading) is not free; only its printed contents were read (topic placement), so formulas rest on rank-3 open references.
