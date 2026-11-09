---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:6bb2915e8344a4c8dfdf287f25991de442cbf1bf69259bcee0dd0180bf44dc40
  sources:
    - "Frees et al., Loss Data Analytics (open text), ch.10: §10.2.1 Definition 10.1 classification by moments (Examples 10.2.1-10.2.3: gamma and Weibull light, Pareto k* = alpha, heavier as alpha falls; lognormal has all moments but no MGF, so methods can disagree), §10.2.2 Definition 10.2 limiting ratio (infinity heavier, constant proportionally equivalent, 0 lighter) and density form by L'Hopital's rule, Pareto heavier than Weibull and gamma; eq. 10.7 TVaR = pi_q + e_X(pi_q) = pi_q + (E[X] - E[X ^ pi_q])/(1 - q); Example 10.3.9 Pareto TVaR = pi_q + (pi_q + theta)/(alpha - 1), sha256:0dcbdf4bb875807b9db33d06cff8a94770a74a940f660a89de13116ee829ed13 — https://openacttexts.github.io/Loss-Data-Analytics/ChapPortMgt.html; Frees et al., Loss Data Analytics (open text), ch.3: §3.2.2 Pareto (k-th moment exists iff alpha > k; hazard decreasing, an indication of a heavy tail); §3.2.3 Weibull (hazard decreasing for shape < 1, constant at 1, increasing for > 1); §3.4.1 deductible example (excess loss of an exponential with mean 1000 is exponential with the same mean, by memorylessness), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list PDF p.6: Tse §2.4 assigned, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; Tse, Nonlife Actuarial Models (Cambridge UP, 2009), publisher preview, printed Contents (PDF p.10): §2.4 Tail properties of claim severity (contents only), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "Pishro-Nik, 6.2.3 Chernoff Bounds: P(X >= a) <= e^{-sa} M_X(s) for all s > 0 — https://www.probabilitycourse.com/chapter6/6_2_3_chernoff_bounds.php"
    - "Siegrist, 5.8 The Gamma Distribution: MGF 1/(1 - bt)^k for t < 1/b; X1 + X2 gamma with shape k1 + k2 and scale b for independent gammas with common scale b (HTML fetched 2026-10-30) — https://www.randomservices.org/random/special/Gamma.html"
    - "Siegrist, 5.38 The Weibull Distribution: 'the Weibull distribution has moments of all orders', reliability exp[-(t/b)^k] — https://www.randomservices.org/random/special/Weibull.html"
    - "Frees et al., Loss Data Analytics, ch.10 §10.2: existence of MGFs 'arguably the most popular method'; lognormal MGF does not exist though all positive moments finite — https://openacttexts.github.io/Loss-Data-Analytics/ChapPortMgt.html"
    - "Wikipedia, Heavy-tailed distribution: heavy right tail if M_X(t) infinite for all t > 0; Pareto, log-normal, Weibull with shape between 0 and 1 listed (fetched 2026-10-30) — https://en.wikipedia.org/wiki/Heavy-tailed_distribution"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tail Weight.md
---

**Tail Weight** is the amount of probability that a [[Severity Distribution|severity distribution]] places on very large losses, measured by how slowly its survival function $S(x) = 1 - F(x)$ falls to 0. A heavy-tailed distribution, such as the [[Pareto Distribution|Pareto]], makes large losses far more likely than a light-tailed one, such as the [[Gamma|gamma]]. Two distributions are compared by the limit of the ratio of their survival functions, which by L'Hôpital's rule is also the limit of the ratio of their densities:

> $$\lim_{x \to \infty} \frac{S_1(x)}{S_2(x)} = \lim_{x \to \infty} \frac{f_1(x)}{f_2(x)}$$

- $S_1$, $f_1$ and $S_2$, $f_2$ are the survival functions and densities of the two distributions.

If the limit is $\infty$, the first distribution has the heavier tail. If it is a positive constant, the two tails are equally heavy. If it is 0, the first distribution has the lighter tail.

> [!example]- Losses are either exponential with mean 1,000 or Pareto with $\alpha = 3$ and $\theta = 2{,}000$, which also has mean 1,000. What is the probability that a loss exceeds 10,000 under each model, and which tail is heavier? {Example}
> - Under the Pareto, $S(10{,}000) = (2{,}000/12{,}000)^3 = 0.00463$.
> - Under the exponential, $S(10{,}000) = e^{-10} = 0.0000454$, about 100 times smaller.
> - The ratio $\frac{(2{,}000)^3\,e^{x/1{,}000}}{(x + 2{,}000)^3}$ grows without bound, because an exponential grows faster than any polynomial, so the Pareto has the heavier tail.

## Existence of moments

The fewer positive moments $E[X^k]$ are finite, the heavier the tail. The gamma, [[Weibull Distribution|Weibull]] and [[Lognormal Distribution|lognormal]] distributions have every positive moment. The Pareto has $E[X^k] < \infty$ only for $k < \alpha$, so a smaller $\alpha$ gives a heavier tail.

## Existence of the moment generating function

A distribution has a moment generating function $M(t) = E[e^{tX}]$ that is finite for some $t > 0$ only if its survival function decays at least as fast as an exponential. The gamma distribution has one for every shape. The Pareto, the lognormal and the Weibull with $\tau < 1$ have none, so they are heavy-tailed by this measure, although the lognormal and the Weibull with $\tau < 1$ have every moment.

## Hazard rate and mean excess loss

A decreasing [[Hazard Rate|hazard rate]] indicates a heavy tail, and an increasing hazard rate indicates a light tail. The [[Mean Excess Loss|mean excess loss]] is the expected amount by which a loss that exceeds $d$ exceeds it:

> $$e(d) = E[X - d \mid X > d]$$

An increasing mean excess loss indicates a heavy tail. The [[Exponential Distribution|exponential distribution]] has a constant hazard rate and a constant mean excess loss. The Pareto has hazard rate $h(x) = \alpha/(x + \theta)$ and mean excess loss $e(d) = (d + \theta)/(\alpha - 1)$, which rises in a straight line. The Weibull with $\tau < 1$ has a decreasing hazard rate and an increasing mean excess loss.

> [!example]- For the Pareto with $\alpha = 3$ and $\theta = 2{,}000$, what are the hazard rate and the mean excess loss at 0, 1,000 and 10,000? {Example}
> - The hazard rate is $h(d) = 3/(d + 2{,}000)$, and the mean excess loss is $e(d) = (d + 2{,}000)/2$.
>
> | $d$ | $h(d)$ | $e(d)$ |
> | --- | --- | --- |
> | 0 | 0.00150 | 1,000 |
> | 1,000 | 0.00100 | 1,500 |
> | 10,000 | 0.00025 | 6,000 |
>
> - The hazard rate decreases and the mean excess loss increases, so the Pareto has a heavy tail. An exponential with mean 1,000 has $h(d) = 0.001$ and $e(d) = 1{,}000$ at every $d$.

## Order of the common severity distributions

From the lightest tail to the heaviest, the common severity distributions are ordered:

1. The Weibull with $\tau > 1$, whose survival function $e^{-(x/\theta)^\tau}$ decays faster than any exponential.
2. The exponential, whose survival function $e^{-x/\theta}$ decays exponentially.
3. The lognormal, whose log-survival function decays like $-(\ln x)^2/2$, more slowly than any exponential and faster than any power of $x$.
4. The Pareto, whose survival function decays like the power $(\theta/x)^\alpha$.

> [!trap] Comparing tails by the mean
> Two distributions with the same mean can have very different tails. The exponential with mean 1,000 and the Pareto with $\alpha = 3$ and $\theta = 2{,}000$ have equal means, but a loss above 10,000 is about 100 times as likely under the Pareto.
