---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:4edc26f68d89eb6f2d798aa9ea1d74f3bb66a71a3683550f8abd80167642a203
  sources:
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), ch.8 §5 Likelihood Ratio Tests (fetched 2026-10-05): L = f0/f1, reject iff L <= l; random-sample product form; Neyman-Pearson Lemma (P0(R) >= P0(A) implies P1(R) >= P1(A)); exponential scale and Bernoulli models: tests do not depend on the alternative's value, UMP for the usual one-sided tests; only certain alpha attainable for discrete data; normal-model one-sided tests UMP, none of the two-sided tests UMP; generalised LR = sup over Theta_0 / sup over T, sha256:60b047835a3f644cd2317c8ab984b8d41ae7669f53c1d32a79705942670b9b04 — https://www.randomservices.org/random/hypothesis/Likelihood.html"
    - "CAS Exam MAS-I Tables (version 01/15/2018), p.3 normal table: Phi(0.35) = 0.6368, Phi(0.36) = 0.6406; selected values z = 1.645 at 0.950, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list PDF p.6: Hogg Domain B §§8.1, 8.2, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Hogg, McKean & Craig, Introduction to Mathematical Statistics 8th ed. (Global Ed.), publisher preview, contents PDF p.8: §8.1 Most Powerful Tests (p.483), §8.2 Uniformly Most Powerful Tests (p.493) (contents only), sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99 — https://api.pageplace.de/preview/DT0400.9781292264783_A39514650/preview-9781292264783_A39514650.pdf"
    - "Mackey, Stanford STATS 300A (Fall 2015) Lecture 13, Theorem 1 Neyman-Pearson Lemma (TSH 3.2.1): (i) phi = 1 if p1/p0 > k, 0 if p1/p0 < k, size alpha; (ii) sufficiency; (iii) necessity (MP test satisfies (b) for some k), pp. 13-1 to 13-3, sha256:c3693500bac6f3afd2f5acdf10bc74bbd6cf6759ad6976916c8af3ed5d711c7b — https://web.stanford.edu/~lmackey/stats300a/doc/stats300a-fall15-lecture13.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Neyman-Pearson Lemma.md
---

The **Neyman-Pearson Lemma** states that, for testing a simple null hypothesis $H_0: \theta = \theta_0$ against a simple alternative hypothesis $H_1: \theta = \theta_1$, the critical region of size $\alpha$ with the greatest [[Power of a Test|power]] is the set of samples where the likelihood ratio $L(\theta_0)/L(\theta_1)$ is small. This best critical region is

> $$C = \left\{\mathbf{x} : \frac{L(\theta_0)}{L(\theta_1)} \le k\right\}$$

- $L(\theta)$ is the likelihood of $\theta$, the joint pdf or pmf of the sample $\mathbf{x} = (x_1, \ldots, x_n)$ evaluated at $\theta$. For a [[Random Sample|random sample]] it is the product $f(x_1; \theta) \cdots f(x_n; \theta)$.
- $k > 0$ is the constant for which $P(\mathbf{X} \in C \mid H_0) = \alpha$.

Every other critical region whose probability of a [[Type I Error|Type I error]] is at most $\alpha$ has power at $\theta_1$ no greater than that of $C$.

> [!example]- A single claim $X$ is exponential. What is the best critical region of size 0.05 for testing $H_0$: mean 100 against $H_1$: mean 200, and what is its power? {Example}
> - With $f(x; \theta) = e^{-x/\theta}/\theta$, the likelihood ratio is $\frac{L(100)}{L(200)} = 2e^{-x/200}$.
> - The ratio decreases as $x$ increases, so the ratio is at most $k$ exactly when $x$ is at least some $c$.
> - The size is $P(X \ge c \mid H_0) = e^{-c/100} = 0.05$, so $c = 100 \ln 20 = 299.57$.
> - The power is $P(X \ge 299.57 \mid H_1) = e^{-299.57/200} = 0.224$.

## Simplifying the best critical region

The inequality $L(\theta_0)/L(\theta_1) \le k$ is reduced to a condition on a [[Sufficient Statistic|sufficient statistic]] in four steps:

1. Write each likelihood as the product of the densities of all the observations. With two independent samples, the product runs over the observations of both samples.
2. Divide, and cancel the factors that do not depend on the data.
3. Take the natural log, which keeps the direction of the inequality because it is an increasing function.
4. Move every constant into the right-hand side, and reverse the inequality if both sides are divided by a negative number.

> [!example]- A random sample $X_1, \ldots, X_n$ has pdf $f(x; \theta) = \theta x^{\theta - 1}$ for $0 < x < 1$. What is the form of the best critical region for $H_0: \theta = 1$ against $H_1: \theta = 2$? {Example}
> - The likelihoods are $L(1) = 1$ and $L(2) = 2^n x_1 x_2 \cdots x_n$.
> - The ratio is $\frac{L(1)}{L(2)} = \frac{1}{2^n x_1 x_2 \cdots x_n}$, and it is at most $k$ when $x_1 x_2 \cdots x_n \ge \frac{1}{2^n k}$.
> - Taking natural logs, the best critical region is $\sum_{i=1}^{n} \ln x_i \ge c$ for a constant $c$.

## Regions where the likelihood ratio is constant

Where $L(\theta_1) = 0$ and $L(\theta_0) > 0$, the ratio is infinite, so such samples are never in the best critical region. They would add to the probability of a Type I error without adding power. Where the ratio is constant over a region, any part of that region with the required probability under $H_0$ gives the same size and the same power.

> [!example]- $H_0$: $X$ is uniform on $[0, 10]$, and $H_1$: $X$ is uniform on $[5, 10]$. A single observation is used with a best critical region whose power is 0.8. What is the probability of a Type I error? {Example}
> - The densities are $1/10$ under $H_0$ and $1/5$ on $[5, 10]$ under $H_1$.
> - On $[0, 5)$ the density under $H_1$ is 0, so the ratio is infinite and no point there is in the best critical region.
> - On $[5, 10]$ the ratio is the constant $\frac{1/10}{1/5} = 0.5$, so the best critical region is any part of $[5, 10]$ with the required power.
> - Power 0.8 needs a region of length $0.8 \times 5 = 4$ inside $[5, 10]$.
> - The probability of a Type I error is the probability of that region under $H_0$, $4/10 = 0.4$.

## Uniformly most powerful tests

A test is uniformly most powerful (UMP) against a composite alternative hypothesis if it is the most powerful test against every simple alternative in it. When the best critical region for $\theta_0$ against $\theta_1$ is the same for every $\theta_1 > \theta_0$, that region is the UMP test of $H_0: \theta = \theta_0$ against $H_1: \theta > \theta_0$. One-sided tests of a normal mean, an exponential mean or a binomial probability are UMP. Two-sided tests are not, because the best region against $\theta_1 > \theta_0$ is the upper tail and the best region against $\theta_1 < \theta_0$ is the lower tail.

> [!example]- Claim sizes are normal with standard deviation 250. A sample of 25 claims tests $H_0: \mu = 1{,}000$ against $H_1: \mu = 1{,}100$ at significance level 0.05. What are the best critical region and its power, and why is it UMP for $H_1: \mu > 1{,}000$? {Example}
> - For normal data with $\mu_1 > \mu_0$, the ratio $L(\mu_0)/L(\mu_1)$ decreases as $\bar{x}$ increases, so the best region is $\bar{X} \ge c$.
> - Under $H_0$, $\bar{X}$ is normal with mean 1,000 and standard deviation $250 / \sqrt{25} = 50$, so $c = 1{,}000 + 1.645 \times 50 = 1{,}082.25$.
> - The power at $\mu = 1{,}100$ is $P\left(Z \ge \frac{1{,}082.25 - 1{,}100}{50}\right) = P(Z \ge -0.355) = 0.639$.
> - The value $c$ was found from $H_0$ alone, so the same region is best against every $\mu_1 > 1{,}000$, and the test is UMP.
