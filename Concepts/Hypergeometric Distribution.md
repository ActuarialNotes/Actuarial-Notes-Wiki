---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:c3d7f46371178a92562a29892cb82da3aaf3571c370df51ca389700542cd32c5
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §5.1 Hypergeometric Distribution p.193 (PDF p.201): h(N,k,n,x) = C(k,x)C(N-k,n-x)/C(N,n), every sample of size n equally likely; approaches binomial(n, k/N) for large N, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 12.2 The Hypergeometric Distribution: var(Y) = n(r/m)(1-r/m)(m-n)/(m-1); draws negatively correlated, sha256:56414fcd41140fbad38e3e39034536cd06144012f8457ed797740bec97e44487 — https://www.randomservices.org/random/urn/Hypergeometric.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 12.3 The Multivariate Hypergeometric Distribution: joint pdf; grouping; conditional distribution given some counts is multivariate hypergeometric, sha256:ce429ccb0682c9be25603fb52bab837daa32b2910c2aeba0603daf193a8cf978 — https://www.randomservices.org/random/urn/MultiHypergeometric.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-11-06), §3.1.5 Special Distributions: hypergeometric pmf and range, sha256:243fabcf9cfa4cb3ed8fd32387f2d6d1e4738844becf688fb9e66dbb5d080dc8 — https://www.probabilitycourse.com/chapter3/3_1_5_special_discrete_distr.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 11.2 The Binomial Distribution: f_n(k) > f_n(k-1) iff p/k > (1-p)/(n-k+1); given Y_n = k each outcome sequence has probability 1/C(n,k), not depending on p, sha256:223ab179871c6da69d1e68811192935c2f12d9762a62de02336f446dd47b10b9 — https://www.randomservices.org/random/bernoulli/Binomial.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hypergeometric Distribution.md
---

![[Media/Figures/Hypergeometric_Distribution.svg|340]]

A **Hypergeometric Distribution** is the distribution of the number of successes in a sample of $n$ items drawn without replacement from $N$ items, $K$ of which are successes. The probability of $k$ successes is

> $$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$

- $k$ runs from $\max(0,\, n + K - N)$ to $\min(n, K)$.

The numerator chooses $k$ of the $K$ successes and $n - k$ of the $N - K$ failures. The denominator counts every sample of $n$.

> [!idea] The idea
> Every set of $n$ items is equally likely to be drawn, so the probability is a count of sets.

> [!example]- A file holds 10 policies, 4 with errors. An auditor selects 3 at random without replacement. What is the probability that exactly 2 have errors? {Example}
> - There are $\binom{10}{3} = 120$ equally likely samples.
> - Choosing 2 of the 4 with errors and 1 of the 6 without gives $6 \times 6 = 36$ samples.
> - The probability is $36/120 = 0.3$.

![[Media/Hypergeometric_pmf.svg|500]]

## Mean and variance of the hypergeometric distribution

Each item drawn is a success with probability $K/N$, so by linearity the mean is

> $$E[X] = \frac{nK}{N}$$

The draws are not independent, which shows in the variance:

> $$\text{Var}(X) = n\,\frac{K}{N}\left(1 - \frac{K}{N}\right)\frac{N-n}{N-1}$$

The last factor is the **finite population correction**. It is below 1 whenever $n \ge 2$, so a hypergeometric count varies less than a binomial one.

> [!example]- A file holds 10 policies, 4 with errors, and an auditor selects 3 without replacement. What are the mean and variance of the number with errors? {Example}
> - The mean is $3 \times 4/10 = 1.2$.
> - The binomial part is $3 \times 0.4 \times 0.6 = 0.72$.
> - The variance is $0.72 \times 7/9 = 0.56$.

## Compared with the binomial distribution

When the population is large relative to the sample, each draw barely changes what is left. The hypergeometric is then close to the [[Binomial Distribution|binomial]] with $p = K/N$:

> $$P(X = k) \approx \binom{n}{k}\left(\frac{K}{N}\right)^k\left(1 - \frac{K}{N}\right)^{n-k}$$

> [!example]- A file holds 10 policies, 4 with errors. If the auditor replaced each policy before the next draw, what would be the probability that exactly 2 of 3 have errors? {Example}
> - With replacement, the count is $\text{Bin}(3, 0.4)$.
> - The probability is $3 \times 0.4^2 \times 0.6 = 0.288$.
> - Without replacement it was 0.300. On a pool of 10, the difference shows.

> [!trap] Binomial on a small pool
> Draws from a few dozen items without replacement are not independent trials. Use the binomial only when the question allows replacement or the pool is very large.

## More than two types

When the population splits into types of sizes $K_1, \ldots, K_m$ that add to $N$, the counts of each type in the sample follow the **multivariate hypergeometric distribution**:

> $$P(k_1, \ldots, k_m) = \frac{\dbinom{K_1}{k_1}\cdots\dbinom{K_m}{k_m}}{\dbinom{N}{n}}$$

- $k_1 + \cdots + k_m = n$.

When only one type matters, combine all the others into one group of $N - K$ items, and the count of that type is the ordinary hypergeometric.

Given that $k_1$ of the $n$ draws fell in type 1, the other $n - k_1$ draws are a sample without replacement from the $N - K_1$ items outside type 1. The count of another type $j$ is then hypergeometric with $N - K_1$ items, $K_j$ successes and $n - k_1$ draws.

> [!example]- A file holds 3 policies with premium errors, 1 with a coverage error and 6 clean. An auditor selects 3 without replacement. What is the probability of one of each? {Example}
> - Choose 1 of 3, 1 of 1 and 1 of 6: $3 \times 1 \times 6 = 18$ samples.
> - There are 120 samples in all.
> - The probability is $18/120 = 0.15$.

## Independent events given how many occurred

When $N$ independent events each have the same probability and exactly $n$ occurred, every set of $n$ that could have occurred is equally likely. The events that occurred are then a sample of $n$ drawn without replacement, and the count among any $K$ of them is hypergeometric. In the same way, the first $n$ items brought in random order are a sample of $n$ drawn without replacement.

> [!example]- Eight claim files are each corrupted with probability 0.1, independently. Exactly 3 are corrupted. What is the probability that exactly 1 of the first 4 files is corrupted? {Example}
> - The 3 corrupted files are a sample of 3 from the 8.
> - The count among the first 4 is hypergeometric with $N = 8$, $K = 4$ and $n = 3$.
> - The probability is $\binom{4}{1}\binom{4}{2}/\binom{8}{3}$, which is $24/56 = 0.4286$.
