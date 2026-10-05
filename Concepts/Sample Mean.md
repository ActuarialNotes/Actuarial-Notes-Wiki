---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:86ebf7fefea80971eab7a2b30243293d60b278178346d0f41c19de7ea7d98c85
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B tasks 1 (estimate mean and variance), 2 (sufficient statistic), 4 (critical values from a sampling distribution), 7 (order statistics), 8 (MLE; consistency, unbiasedness, sufficiency, efficiency, minimum variance, MSE; censoring and truncation), 9 (PDF p.4); Hogg Domain B §§4.1, 5.1, 6.1–6.5, 7.1–7.6 and Tse §§12.1, 12.3 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Random, §5.2 The Sample Mean (definition; outlier exercise: dropping one score of 10 moves the mean 64 → 66.25), sha256:e21a3da7773a6f7f925b4cb0c583d5331abb1656fe01ed952c8d42b26f238cab — https://www.randomservices.org/random/sample/Mean.html"
    - "Siegrist, Random, §5.4 The Central Limit Theorem (M_n approximately normal with mean μ and variance σ²/n for large n), sha256:ee6dc9f8e9feb14f19f96a0206c3289a4aedfc014f5e3dabf79422e1dc29f9e3 — https://www.randomservices.org/random/sample/CLT.html"
    - "Siegrist, Random, §5.8 Special Properties of Normal Samples (M ~ normal(μ, σ²/n); M and S² independent; (n−1)S²/σ² chi-square n−1; var(S²) = 2σ⁴/(n−1); T ~ t_{n−1}; two independent normal samples: variance ratio ~ F_{m−1,n−1}), sha256:d9a62017ae3a8488aedac3eceedb15d8b68243ae60894104ab88564ace25ff79 — https://www.randomservices.org/random/sample/Normal.html"
    - "Siegrist, Random, §6.1 Estimators (bias, mse = var + bias², mean-square consistency ⇒ consistency, E(M) = μ, var(M) = σ²/n), sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "Siegrist, Random, §6.3 Maximum Likelihood (likelihood = pdf with roles reversed; log-likelihood; interior vs boundary maxima; invariance; Bernoulli/Poisson/normal/gamma MLEs; Uniform[0,h]: MLE X_(n), mse 2h²/((n+1)(n+2)), (n+1)X_(n)/n unbiased with var h²/(n(n+2)); Uniform[a,a+1]: MLE not unique), sha256:f8c94e3de84f7a025fd32395169938f37e7fd7958d5a8be9d56b54ed307d6ffd — https://www.randomservices.org/random/point/Likelihood.html"
    - "Siegrist, Random, §6.5 Best Unbiased Estimators (UMVUE; Cramér–Rao bound under the interchange assumption, support not depending on θ; (dλ/dθ)²/(n E[l²]) and the second-derivative form; equality iff h(X) = λ(θ) + u(θ)L1; Bernoulli, Poisson (θ/n), normal (M attains σ²/n), gamma; Uniform[0,a]: assumption fails, theorem does not apply), sha256:0d9765c5c7b5b8a54b29fc45c3a435d20e2a9200e027609658345087dedcd531 — https://www.randomservices.org/random/point/Unbiased.html"
    - "Siegrist, Random, §6.6 Sufficient, Complete and Ancillary Statistics (definition via the conditional distribution; Fisher–Neyman factorization; MLE vs sufficient statistic; Rao–Blackwell; Lehmann–Scheffé; Bernoulli, Poisson (UMVUE ((n−1)/n)^Y of e^{−θ}), normal, gamma, uniform; exponential family natural statistic minimally sufficient and complete), sha256:4d7402f2a960ea2b4232e57e4ee5992ac29801b9269f300f17f8e83074d5a0e4 — https://www.randomservices.org/random/point/Sufficient.html"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5 (2nd ed.), §2.5 Weights (a row that averages several risks gets weight w, variance φV(μ)/w) and §2.6 Exposure Offsets (log-exposure offset in a count model is equivalent to a frequency model weighted by exposure), PDF pp.26–28, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Sample Mean.md
---

The **Sample Mean** $\bar{X}$ is the arithmetic average of a random sample and the standard estimator of the population mean $\mu$. It is [[Unbiasedness|unbiased]], [[Consistency|consistent]], and — for a Normal population — the [[Minimum Variance]] unbiased estimator.

> $$\bar{X} = \frac{1}{n}\sum_{i=1}^{n} X_i$$

> $$E[\bar{X}] = \mu, \qquad \text{Var}(\bar{X}) = \frac{\sigma^2}{n}$$

- The **standard error** is $\text{SD}(\bar{X}) = \sigma/\sqrt{n}$; estimated from data it is $S/\sqrt{n}$. Halving it requires four times the sample
- By the [[Central Limit Theorem]], $\bar{X}$ is approximately $N(\mu, \sigma^2/n)$ for large $n$ whatever the population shape — the fact behind almost every test and [[Confidence Interval]] in this section
- For a Normal population the result is exact: $\bar{X} \sim N(\mu, \sigma^2/n)$, and $\bar{X}$ is independent of the [[Sample Variance]] $S^2$
- $\bar{X}$ is the [[Maximum Likelihood Estimation|MLE]] of $\mu$ for Normal, Poisson, and exponential data, and is a function of the [[Sufficient Statistic]] $\sum X_i$ in each case
- It is **not resistant**: one extreme claim shifts $\bar{X}$ without limit, which is why a [[Box Plot]]'s median is reported alongside it for skewed severity data
- With unequal exposures, the exposure-weighted mean $\sum w_i X_i / \sum w_i$ is the right estimator — the same idea that a GLM handles with an [[Offset Variable|offset]] or weights

![[Media/Figures/Sample_Mean.svg|340]]

> [!example]- Standard Error and Sample Size {Example}
> Claim severity has $\sigma = 4{,}000$. How large must $n$ be for the standard error of $\bar{X}$ to be at most $200$?
>
> > [!answer]-
> > $$\frac{\sigma}{\sqrt{n}} \le 200 \ \Longrightarrow\ \sqrt{n} \ge \frac{4{,}000}{200} = 20 \ \Longrightarrow\ n \ge 400$$
> > A sample of $400$ claims pins the mean down to within roughly $\pm 400$ (two standard errors) with $95\%$ confidence.

> [!example]- Probability the Sample Mean Misses {Example}
> A sample of $n = 100$ claims is drawn from a population with $\mu = 5{,}000$ and $\sigma = 1{,}500$. Find $P(\bar{X} > 5{,}300)$.
>
> > [!answer]-
> > By the [[Central Limit Theorem]], $\bar{X} \approx N(5{,}000,\ 1{,}500^2/100) = N(5{,}000,\ 150^2)$.
> > $$Z = \frac{5{,}300 - 5{,}000}{150} = 2.00 \ \Longrightarrow\ P(\bar{X} > 5{,}300) \approx 1 - 0.9772 = 0.0228$$
