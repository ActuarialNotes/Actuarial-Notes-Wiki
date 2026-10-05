---
verification:
  status: verified
  confidence: low
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:3faeefc6b60e8aff03f4dae1b3416e77d92e2fcd2e08545b33b1ab024f20aeae
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §5.1 Random Samples — Introduction (random sample = iid sequence; a statistic is an observable function of the data and is a random variable with its own distribution), sha256:0af72fbf0202413525cae99e696cfa70014a803d6c5ac7a7dcafd1577742414f — https://www.randomservices.org/random/sample/Introduction.html"
    - "Siegrist, Random, §5.4 The Central Limit Theorem (M_n approximately normal with mean μ and variance σ²/n for large n), sha256:ee6dc9f8e9feb14f19f96a0206c3289a4aedfc014f5e3dabf79422e1dc29f9e3 — https://www.randomservices.org/random/sample/CLT.html"
    - "Siegrist, Random, §5.8 Special Properties of Normal Samples (M ~ normal(μ, σ²/n); M and S² independent; (n−1)S²/σ² chi-square n−1; var(S²) = 2σ⁴/(n−1); T ~ t_{n−1}; two independent normal samples: variance ratio ~ F_{m−1,n−1}), sha256:d9a62017ae3a8488aedac3eceedb15d8b68243ae60894104ab88564ace25ff79 — https://www.randomservices.org/random/sample/Normal.html"
    - "CAS Exam MAS-I Tables, 'Lower-tail areas for Chi-square distributions', df 24, 0.950 column = 36.42 (PDF p.20), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Sampling Distribution.md
---

A **Sampling Distribution** is the probability distribution of a statistic (e.g., the sample mean $\bar{X}$ or sample variance $S^2$) computed from all possible random samples of size $n$ drawn from a population.

> $$\bar{X} \sim N\!\left(\mu,\, \frac{\sigma^2}{n}\right) \quad \text{if } X_i \stackrel{\text{iid}}{\sim} N(\mu, \sigma^2)$$

> $$\frac{(n-1)S^2}{\sigma^2} \sim \chi^2_{n-1} \quad \text{(normal population)}$$

**Key sampling distributions used in hypothesis testing** — each exact for a random sample from a Normal population; the $F$ row compares two *independent* Normal samples, of sizes $n_1$ and $n_2$:

| Statistic | Distribution | Use |
| :--- | :--- | :--- |
| $Z = \dfrac{\bar{X} - \mu}{\sigma/\sqrt{n}}$ | $N(0,1)$ | Mean test, known $\sigma$ |
| $T = \dfrac{\bar{X} - \mu}{S/\sqrt{n}}$ | $t_{n-1}$ | Mean test, unknown $\sigma$ |
| $\chi^2 = \dfrac{(n-1)S^2}{\sigma^2}$ | $\chi^2_{n-1}$ | Variance test |
| $F = \dfrac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}$ | $F_{n_1-1,\,n_2-1}$ | Two-variance test |

- The **standard error** is $\text{SE}(\bar{X}) = \sigma/\sqrt{n}$, the standard deviation of the sampling distribution of $\bar{X}$
- By the [[Central Limit Theorem (CLT)]], $\bar{X}$ is approximately normal for large $n$ even when the population is not normal

![[Media/Figures/Sampling_Distribution.svg|340]]

> [!example]- Probability That a Sample Mean Falls in a Range {Example}
> Claims $X_i$ are i.i.d. with $\mu = 2{,}000$ and $\sigma = 400$. For a random sample of $n = 64$, find $P(1{,}900 < \bar{X} < 2{,}100)$.
>
> > [!answer]-
> > $\text{SE} = 400/\sqrt{64} = 50$.
> > $$P(1{,}900 < \bar{X} < 2{,}100) = P\!\left(\frac{1{,}900-2{,}000}{50} < Z < \frac{2{,}100-2{,}000}{50}\right) = P(-2 < Z < 2) \approx 0.9545$$
