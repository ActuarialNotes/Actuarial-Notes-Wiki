---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:2d7d05fa3b7a35d1ae387138cf56fc7932f5f57045c9f5e799cd5b337bbba222
  sources:
    - "Siegrist, Random, ch.8 Hypothesis Testing §1 Introduction: 'A type 1 error is rejecting the null hypothesis H0 when H0 is true'; significance level = maximum type 1 error probability, rejection region constructed so the level is a prescribed small value (typically 0.1, 0.05, 0.01); reducing type 1 error by shrinking R necessarily increases type 2 error, sha256:fb05a9d71b55ba113e2f71afa052bc059b35f2c5b6946012c19ecbc693faab1a — https://www.randomservices.org/random/hypothesis/Introduction.html"
    - "James, Witten, Hastie & Tibshirani, ISLR 2nd ed., §13.1.2 and Table 13.1, pp.559-560 (PDF pp.565-566): 'Type I errors are also known as false positives'; Type I error rate = probability of rejecting H0 given H0 holds; Type I/Type II trade-off, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Penn State STAT 415 (2026 notes), Lesson 9 §9.1 and §9.3: Def 9.3 alpha = probability of a Type I error = significance level, alpha a conditional probability given H0 true, typical values 0.01/0.05/0.10, as alpha decreases beta increases, sha256:4b40913ee64c6e155867542d9d3517e3384e5a942452f6fc8b1e72bf815a8acf — https://online.stat.psu.edu/stat415/Lesson09.html"
    - "NIST/SEMATECH e-Handbook §7.1.3.1 Critical values and p values: alpha = 0.05 means H0 is rejected 5% of the time when true; critical region exceeded with probability alpha under H0, sha256:1de003010ccb462a50f87f25eb777a581442a61423c97e884266d8e89b0ff797 — https://www.itl.nist.gov/div898/handbook/prc/section1/prc131.htm"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Type I Error.md
---

![[Media/Figures/Type_I_Error.svg|340]]

A **Type I Error** is the rejection of the null hypothesis $H_0$ of a [[Hypothesis Testing|hypothesis test]] when $H_0$ is true. If the test rejects $H_0$ when the sample $\mathbf{X}$ falls in the critical region $C$, the probability of a Type I error is

> $$\alpha = P(\mathbf{X} \in C \mid H_0)$$

- $\alpha$ is the significance level of the test.

The significance level is chosen before the data are seen, commonly 0.05 or 0.01, and it determines the [[Critical Value|critical value]] of the test.

> [!example]- A single claim $X$ is exponential with mean $\theta$. A test of $H_0: \theta = 100$ against $H_1: \theta = 200$ rejects $H_0$ when $X > 300$. What is the probability of a Type I error? {Example}
> - A Type I error is a rejection when $H_0$ is true, so the probability is computed with $\theta = 100$.
> - The probability of a Type I error is $\alpha = P(X > 300 \mid \theta = 100) = e^{-300/100} = 0.0498$.

## Size of a test with a composite null hypothesis

When $H_0$ is composite, the probability of a Type I error depends on which parameter value in $H_0$ is true. The size of the test is the largest of these probabilities:

> $$\alpha = \max_{\theta \in \omega_0} P(\mathbf{X} \in C \mid \theta)$$

- $\omega_0$ is the set of parameter values under $H_0$.

> [!example]- A single claim $X$ is exponential with mean $\theta$. A test of $H_0: \theta \le 100$ against $H_1: \theta > 100$ rejects $H_0$ when $X > 300$. What is the size of the test? {Example}
> - For each $\theta$ in $H_0$, the probability of rejection is $P(X > 300 \mid \theta) = e^{-300/\theta}$.
> - This probability increases with $\theta$, so its largest value on $\theta \le 100$ is at $\theta = 100$.
> - The size of the test is $e^{-3} = 0.0498$.

## Probability of a Type I error by the normal approximation

When a test of $H_0: \mu = \mu_0$ rejects for a large sample mean, $\bar{X} > c$, the [[Central Limit Theorem|central limit theorem]] gives the probability of a Type I error approximately as

> $$\alpha \approx 1 - \Phi\left(\frac{c - \mu_0}{\sigma_0 / \sqrt{n}}\right)$$

- $\Phi$ is the cdf of the standard normal distribution.
- $\mu_0$ and $\sigma_0$ are the mean and the standard deviation of one observation under $H_0$.

> [!example]- Claim sizes are exponential with mean $\theta$. A test of $H_0: \theta = 1{,}000$ against $H_1: \theta > 1{,}000$ uses 100 claims and rejects $H_0$ when $\bar{X} > 1{,}200$. What is the probability of a Type I error, by the normal approximation? {Example}
> - Under $H_0$, one claim has mean $\mu_0 = 1{,}000$ and standard deviation $\sigma_0 = 1{,}000$.
> - The standard deviation of $\bar{X}$ is $1{,}000 / \sqrt{100} = 100$.
> - The probability of a Type I error is $1 - \Phi\left(\frac{1{,}200 - 1{,}000}{100}\right) = 1 - \Phi(2) = 0.0228$.
