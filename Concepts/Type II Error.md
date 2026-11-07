---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:243dd9deea6a064ec45ce09e1b2b43ea69c9cca2ab2c3f10a7c2a6d6b39d307c
  sources:
    - "Siegrist, Random, ch.8 Hypothesis Testing §1 Introduction: type 2 error = failing to reject H0 when H1 is true; 1 - Q(theta) is the type 2 error probability for theta outside Theta0; trade-off with type 1 error, sha256:fb05a9d71b55ba113e2f71afa052bc059b35f2c5b6946012c19ecbc693faab1a — https://www.randomservices.org/random/hypothesis/Introduction.html"
    - "Siegrist, Random, ch.8 §2 Tests in the Normal Model: power function of the Z tests, 'increasing the sample size n or decreasing the standard deviation sigma results in a uniformly more powerful test', sha256:fd7bc50171fc51310f41e9132005b66cdbbd31bf507a70a0246394b05a379ab2 — https://www.randomservices.org/random/hypothesis/Normal.html"
    - "Penn State STAT 415 (2026 notes), Lesson 10 §10.3: Type II error and power definitions, power depends on the true mean, Ex 10.6 power function K(mu) = 1 - Phi((106.58 - mu)/4) for the one-sided Z test with sigma/sqrt(n) = 4 at alpha = 0.05, Ex 10.7 lower alpha -> lower power, Ex 10.8 larger n -> higher power, sha256:4277fd734c4d2b8b297124d4f9378d1fe638d9a4c4547b2689e24a9dfa1daf96 — https://online.stat.psu.edu/stat415/Lesson10.html"
    - "James, Witten, Hastie & Tibshirani, ISLR 2nd ed., Table 13.1 and §13.1.2, pp.559-560 (PDF pp.565-566): Type II errors are false negatives; power = probability of not making a Type II error given Ha holds, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Tables (version 01/15/2018), normal table p.3 (Phi(0.85) = 0.8023, Phi(0.86) = 0.8051; Pr(Z<1.645) = 0.950), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Type II Error.md
---

![[Media/Figures/Type_II_Error.svg|340]]

A **Type II Error** is the failure to reject the null hypothesis $H_0$ of a [[Hypothesis Testing|hypothesis test]] when the alternative hypothesis $H_1$ is true. If the test rejects $H_0$ when the sample $\mathbf{X}$ falls in the critical region $C$, the probability of a Type II error at a parameter value $\theta$ under $H_1$ is

> $$\beta(\theta) = P(\mathbf{X} \notin C \mid \theta)$$

The probability $1 - \beta(\theta)$ is the [[Power of a Test|power]] of the test at $\theta$. When $H_1$ is simple, $\beta$ is a single number.

> [!example]- A single claim $X$ is exponential with mean $\theta$. A test of $H_0: \theta = 100$ against $H_1: \theta = 200$ rejects $H_0$ when $X > 300$. What is the probability of a Type II error? {Example}
> - A Type II error is a failure to reject when $H_1$ is true, so the probability is computed with $\theta = 200$.
> - The test does not reject when $X \le 300$.
> - The probability of a Type II error is $\beta = P(X \le 300 \mid \theta = 200) = 1 - e^{-300/200} = 0.7769$.

## Type II error of a test for a mean

An upper-tailed test of $H_0: \mu = \mu_0$ at significance level $\alpha$, for a normal sample with known standard deviation $\sigma$, rejects $H_0$ when $\bar{X} > \mu_0 + z_\alpha \sigma / \sqrt{n}$. If the true mean is $\mu_1 > \mu_0$, the probability of a Type II error is

> $$\beta = \Phi\left(z_\alpha - \frac{\mu_1 - \mu_0}{\sigma / \sqrt{n}}\right)$$

- $\Phi$ is the cdf of the standard normal distribution.
- $z_\alpha$ is the upper $\alpha$ point of the standard normal distribution.

> [!example]- A test of $H_0: \mu = 100$ against $H_1: \mu = 110$ uses a normal sample of 25 with $\sigma = 20$ and rejects for large $\bar{X}$ at significance level 0.05. What is the probability of a Type II error? {Example}
> - The standard deviation of $\bar{X}$ is $20 / \sqrt{25} = 4$.
> - The test rejects when $\bar{X} > 100 + 1.645 \times 4 = 106.58$.
> - When $\mu = 110$, the probability that $\bar{X} \le 106.58$ is $\Phi\left(\frac{106.58 - 110}{4}\right) = \Phi(-0.855)$.
> - The probability of a Type II error is $\beta = 0.196$.

## Factors that affect the probability of a Type II error

For a fixed sample size, lowering $\alpha$ raises the [[Critical Value|critical value]] and increases $\beta$, so the probabilities of a [[Type I Error|Type I error]] and a Type II error trade off against each other. The probability $\beta$ decreases as the sample size $n$ grows, as $\sigma$ shrinks, or as $\mu_1$ moves further from $\mu_0$.

> [!example]- In the test of $H_0: \mu = 100$ against $H_1: \mu = 110$ with $n = 25$ and $\sigma = 20$, the significance level is lowered from 0.05 to 0.01. What is the probability of a Type II error now? {Example}
> - The test now rejects when $\bar{X} > 100 + 2.326 \times 4 = 109.31$.
> - The probability of a Type II error is $\beta = \Phi\left(\frac{109.31 - 110}{4}\right) = \Phi(-0.174) = 0.431$.
> - Lowering $\alpha$ from 0.05 to 0.01 raised $\beta$ from 0.196 to 0.431.
