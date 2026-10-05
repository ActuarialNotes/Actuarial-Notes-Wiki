---
target: Concepts/Sampling Distribution.md
created: 2026-10-05
---

## [F-001] t and F rows state exact distributions without the normal-population and independent-samples conditions
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: major
- status: open
- locus: table 'Key sampling distributions used in hypothesis testing', rows T and F, lines 25 and 27
- claim: T = (X-bar - mu)/(S/sqrt n) ~ t_{n-1} and F = (S_1^2/sigma_1^2)/(S_2^2/sigma_2^2) ~ F_{n1-1, n2-1}, listed with no condition; nothing on the page says the two samples of the F row are normal or independent.
- evidence: Siegrist, Random §5.8 'Special Properties of Normal Samples' (sample/Normal.html) derives T ~ t_{n-1} for a random sample from a normal distribution (it uses the independence of M and S^2, a property of normal samples) and the F result under 'The Two Sample Model', which assumes X and Y are random samples from normal distributions and that X and Y are independent. The page states normality for the X-bar and chi-square displays only; the table drops it, and the F row's independence requirement appears nowhere. For a non-normal population the variance ratio is not F-distributed and T is t-distributed only approximately. (The Z row is exact for a normal population and approximate by the CLT otherwise, which the page's CLT bullet covers.)
- source_rank: 3
- proposed_action: Add the conditions to the table or its heading: normal populations, and for the F row two independent samples. Not applied - the fix is new wording.
- applied: false
- fingerprint: 85b16c9e98ed

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- status_set: verified
- confidence: low
- checks_run: Definition (a statistic is a random variable with its own distribution, Siegrist §5.1); X-bar ~ N(mu, sigma^2/n) for normal samples, (n-1)S^2/sigma^2 ~ chi-square n-1, T ~ t_{n-1}, two-sample variance ratio ~ F (§5.8 - conditions F-001); SE and CLT (§5.4). Example recomputed before comparing: SE = 400/8 = 50, P(-2 < Z < 2) = 0.9545. The CAS MAS-I tables carry t, F and chi-square tables (PDF pp.16-20), matching the table's four uses. Links resolve; figure generator sampling_distribution() (dot plot of sample means under a normal curve) checked. MAS-I (Domain B task 4) and MAS-II (bootstrap 'sampling variability') usage both match the definition.
- sources_checked: CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §5.1 Random Samples — Introduction (random sample = iid sequence; a statistic is an observable function of the data and is a random variable with its own distribution), sha256:0af72fbf0202413525cae99e696cfa70014a803d6c5ac7a7dcafd1577742414f — https://www.randomservices.org/random/sample/Introduction.html; Siegrist, Random, §5.4 The Central Limit Theorem (M_n approximately normal with mean μ and variance σ²/n for large n), sha256:ee6dc9f8e9feb14f19f96a0206c3289a4aedfc014f5e3dabf79422e1dc29f9e3 — https://www.randomservices.org/random/sample/CLT.html; Siegrist, Random, §5.8 Special Properties of Normal Samples (M ~ normal(μ, σ²/n); M and S² independent; (n−1)S²/σ² chi-square n−1; var(S²) = 2σ⁴/(n−1); T ~ t_{n−1}; two independent normal samples: variance ratio ~ F_{m−1,n−1}), sha256:d9a62017ae3a8488aedac3eceedb15d8b68243ae60894104ab88564ace25ff79 — https://www.randomservices.org/random/sample/Normal.html; CAS Exam MAS-I Tables, 'Lower-tail areas for Chi-square distributions', df 24, 0.950 column = 36.42 (PDF p.20), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf
- note: Open major F-001 (t and F rows without the normal-population / independent-samples conditions), hence low confidence. Note: the page links [[Central Limit Theorem (CLT)]] while Sample Mean links [[Central Limit Theorem]] - two pages for one concept (outside this batch). Hogg, McKean & Craig 8th ed. (the MAS-I reading) is not free; only its printed contents were read (topic placement), so formulas rest on rank-3 open references.
