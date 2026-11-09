---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:880aa8eaac2bd8918f13cf887cce4eefaee200712a1dc7cea139c000459c617c
  sources:
    - "Siegrist, Random, ch.8 Hypothesis Testing §1 Introduction: power = probability of rejecting H0 for a distribution in H1; power function Q(theta) = P_theta(X in R), Q is the type 1 error probability on Theta0, 1 - Q the type 2 probability off it; uniformly most powerful tests, sha256:fb05a9d71b55ba113e2f71afa052bc059b35f2c5b6946012c19ecbc693faab1a — https://www.randomservices.org/random/hypothesis/Introduction.html"
    - "Siegrist, Random, ch.8 §2 Tests in the Normal Model: power functions with Q(mu0) = alpha and Q -> 1 away from the null, larger n or smaller sigma gives a uniformly more powerful test, one-sided sample-size formula n = (sigma[z(power) - z(alpha)]/(mu1 - mu0))^2, sha256:fd7bc50171fc51310f41e9132005b66cdbbd31bf507a70a0246394b05a379ab2 — https://www.randomservices.org/random/hypothesis/Normal.html"
    - "Siegrist, Random, ch.8 §5 Likelihood Ratio Tests: Neyman-Pearson lemma - the likelihood-ratio rejection region is most powerful among regions of no greater size for simple H0 vs simple H1, sha256:60b047835a3f644cd2317c8ab984b8d41ae7669f53c1d32a79705942670b9b04 — https://www.randomservices.org/random/hypothesis/Likelihood.html"
    - "Penn State STAT 415 (2026 notes), Lesson 10 §10.3: Def 10.1 power; power function K(mu) with alpha = K(mu0); lower alpha lowers power; 'the only way that alpha and beta can be decreased simultaneously is by increasing the sample size n'; §10.3.3 sample size for 0.90 power using 1.645 + 1.28, sha256:4277fd734c4d2b8b297124d4f9378d1fe638d9a4c4547b2689e24a9dfa1daf96 — https://online.stat.psu.edu/stat415/Lesson10.html"
    - "CAS Exam MAS-I Tables (version 01/15/2018), normal table p.3 (Phi(0.85) = 0.8023, Phi(0.86) = 0.8051; z = 1.282 for 0.900 and 1.645 for 0.950), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Power of a Test.md
---

![[Media/Figures/Power_of_a_Test.svg|340]]

The **Power of a Test** is the probability that a [[Hypothesis Testing|hypothesis test]] rejects the null hypothesis $H_0$, as a function of the true value $\theta$ of the parameter. If the test rejects $H_0$ when the sample $\mathbf{X}$ falls in the critical region $C$, its power at $\theta$ is

> $$1 - \beta(\theta) = P(\mathbf{X} \in C \mid \theta)$$

- $\beta(\theta)$ is the probability of a [[Type II Error|Type II error]] at a value $\theta$ under the alternative hypothesis $H_1$.

At the null value $\theta_0$, the power equals the significance level $\alpha$, the probability of a [[Type I Error|Type I error]].

> [!example]- In 10 independent trials with success probability $q$, a test of $H_0: q = 0.5$ against $H_1: q > 0.5$ rejects $H_0$ when there are at least 9 successes. What are the significance level and the power at $q = 0.8$? {Example}
> - The number of successes $S$ is [[Binomial Distribution|binomial]] with 10 trials.
> - The significance level is $P(S \ge 9 \mid q = 0.5) = \frac{10 + 1}{1{,}024} = 0.0107$.
> - The power at $q = 0.8$ is $P(S \ge 9 \mid q = 0.8) = 10(0.8)^9(0.2) + (0.8)^{10} = 0.3758$.

## Power of a test for a mean

An upper-tailed test of $H_0: \mu = \mu_0$ at significance level $\alpha$, for a normal sample with known standard deviation $\sigma$, rejects $H_0$ when $\bar{X} > \mu_0 + z_\alpha \sigma / \sqrt{n}$. If the true mean is $\mu_1 > \mu_0$, the power of the test is

> $$1 - \beta = 1 - \Phi\left(z_\alpha - \frac{\mu_1 - \mu_0}{\sigma / \sqrt{n}}\right)$$

- $\Phi$ is the cdf of the standard normal distribution.
- $z_\alpha$ is the upper $\alpha$ point of the standard normal distribution.

The power increases as the sample size $n$ grows, as $\sigma$ shrinks, as $\mu_1$ moves further from $\mu_0$, and as $\alpha$ is raised.

> [!example]- Claim sizes are normal with standard deviation 800. A test of $H_0: \mu = 5{,}000$ against $H_1: \mu > 5{,}000$ uses 100 claims at significance level 0.05. What is the power of the test when the true mean is 5,200? {Example}
> - The standard deviation of $\bar{X}$ is $800 / \sqrt{100} = 80$.
> - The test rejects when $\bar{X} > 5{,}000 + 1.645 \times 80 = 5{,}131.6$.
> - When $\mu = 5{,}200$, the standardized critical value is $\frac{5{,}131.6 - 5{,}200}{80} = -0.855$.
> - The power of the test is $P(\bar{X} > 5{,}131.6) = 1 - \Phi(-0.855) = 0.804$.

## Sample size for a required power

For the upper-tailed test of a mean to have significance level $\alpha$ and a probability of a Type II error of at most $\beta$ at $\mu_1 > \mu_0$, the sample size $n$ must satisfy

> $$\sqrt{n} \ge \frac{(z_\alpha + z_\beta)\,\sigma}{\mu_1 - \mu_0}$$

- $z_\beta$ is the upper $\beta$ point of the standard normal distribution.

The smallest sample size is the value from this inequality rounded up to the next whole number, so that the requirement is still met.

> [!example]- Claim sizes are normal with standard deviation 800. How many claims does a test of $H_0: \mu = 5{,}000$ against $H_1: \mu > 5{,}000$ at significance level 0.05 need to have power 0.90 when the true mean is 5,200? {Example}
> - Power 0.90 means $\beta = 0.10$, so $z_\beta = 1.282$, and $z_\alpha = 1.645$.
> - The sample size must satisfy $\sqrt{n} \ge \frac{(1.645 + 1.282)(800)}{200} = 11.708$.
> - So $n \ge 11.708^2 = 137.08$.
> - The test needs 138 claims.
