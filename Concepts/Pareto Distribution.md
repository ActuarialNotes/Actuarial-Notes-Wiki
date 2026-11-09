---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:140b059acbfc0639b715f74e29cc523dc61152b010f7aed6394dbc73cf4f5b22
  sources:
    - "CAS Exam MAS-I Tables, Appendix A.2.4.1 Pareto (alpha, theta): f(x) = alpha theta^alpha/(x+theta)^(alpha+1), F(x) = 1 - (theta/(x+theta))^alpha, E[X^k] general (-1<k<alpha) and integer-k forms, E[X^x] = theta/(alpha-1)[1 - (theta/(x+theta))^(alpha-1)] for alpha != 1 and -theta ln(theta/(x+theta)) for alpha = 1, mode 0, PDF p.10, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Frees et al., Loss Data Analytics (open text), Ch 3 'Modeling Loss Severity': §3.2.2 Pareto Distribution (pdf eq. 3.1, CDF, k-th moment exists iff alpha > k, integer-k moment, mean theta/(alpha-1) for alpha>1, variance alpha theta^2/((alpha-1)^2(alpha-2)) for alpha>2, decreasing hazard) and §3.4.1 Policy Deductibles (if X is Pareto(alpha, theta) then Y^P is Pareto(alpha, theta + d)), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Tse, Nonlife Actuarial Models (Cambridge UP, 2009), publisher preview, printed Contents p.viii (PDF p.10): §2.2 Some continuous distributions for claim severity, §2.2.4 Pareto distribution p.51, sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain A task 3 'Calculate limited expected value' (PDF p.3); Tse Sections 2.2-2.5 assigned (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Pareto Distribution.md
---

A **Pareto Distribution** is a continuous distribution on $(0, \infty)$ with shape parameter $\alpha > 0$ and scale parameter $\theta > 0$. Its survival function is

> $$S(x) = \left(\frac{\theta}{x + \theta}\right)^{\alpha}$$

Its distribution function is $F(x) = 1 - S(x)$, and its density is

> $$f(x) = \frac{\alpha\,\theta^{\alpha}}{(x + \theta)^{\alpha + 1}}$$

- $x > 0$.

The Pareto distribution is a model for heavy-tailed claim severities, such as liability losses. Exam 8 readings write $\beta$ in place of $\theta$. Setting $F(x) = U$ for a uniform random number $U$ gives the [[Inversion Method|inversion]] formula $x = \theta\left[(1 - U)^{-1/\alpha} - 1\right]$.

> [!example]- Losses follow a Pareto distribution with $\alpha = 3$ and $\theta = 2{,}000$. What is the probability that a loss exceeds 1,000, and what is the median loss? {Example}
> - The probability is $S(1{,}000) = \left(\frac{2{,}000}{3{,}000}\right)^3 = 0.2963$.
> - The median $x$ solves $\left(\frac{2{,}000}{x + 2{,}000}\right)^3 = 0.5$, so $x + 2{,}000 = 2{,}000 \times 2^{1/3}$.
> - The median is $x = 2{,}000\left(2^{1/3} - 1\right) = 519.84$.

## Moments of the Pareto distribution

For a positive integer $k < \alpha$, the $k$th moment of the Pareto distribution is

> $$E[X^k] = \frac{\theta^k\,k!}{(\alpha - 1)(\alpha - 2)\cdots(\alpha - k)}$$

The mean is $\theta/(\alpha - 1)$ for $\alpha > 1$, and the variance is $\frac{\alpha\,\theta^2}{(\alpha - 1)^2(\alpha - 2)}$ for $\alpha > 2$. The $k$th moment is infinite when $k \ge \alpha$, so a Pareto with $\alpha \le 2$ has an infinite variance. Its survival function decays like a power of $x$, so the Pareto has a heavy [[Tail Weight|tail]], and a smaller $\alpha$ gives a heavier tail. Sample moments of data from such a distribution are erratic.

> [!example]- Losses follow a Pareto distribution with $\alpha = 3$ and $\theta = 2{,}000$. What are the mean and the variance of a loss? {Example}
> - The mean is $E[X] = \frac{2{,}000}{3 - 1} = 1{,}000$.
> - The second moment is $E[X^2] = \frac{2{,}000^2 \times 2}{2 \times 1} = 4{,}000{,}000$.
> - The variance is $4{,}000{,}000 - 1{,}000^2 = 3{,}000{,}000$.

## Limited expected value of the Pareto distribution

For $\alpha \ne 1$, the [[Limited Expected Value|limited expected value]] of the Pareto distribution at $u$ is

> $$E[X \wedge u] = \frac{\theta}{\alpha - 1}\left[1 - \left(\frac{\theta}{u + \theta}\right)^{\alpha - 1}\right]$$

> [!example]- Losses follow a Pareto distribution with $\alpha = 3$ and $\theta = 2{,}000$. What is the expected payment per loss under a policy limit of 3,000? {Example}
> - The ratio is $\frac{\theta}{u + \theta} = \frac{2{,}000}{5{,}000} = 0.4$.
> - $E[X \wedge 3{,}000] = 1{,}000\left(1 - 0.4^2\right) = 840$.

## Excess over a deductible

Given $X > d$, the excess $X - d$ has survival function $S(y + d)/S(d)$. For the Pareto distribution it is again Pareto, with the same shape $\alpha$ and scale $\theta + d$. The [[Mean Excess Loss|mean excess loss]], the expected payment per payment under an ordinary [[Deductible|deductible]] $d$, is therefore

> $$e(d) = \frac{d + \theta}{\alpha - 1}$$

- $\alpha > 1$.

The mean excess loss increases in a straight line as $d$ increases.

> [!example]- Losses follow a Pareto distribution with $\alpha = 3$ and $\theta = 2{,}000$. A policy has an ordinary deductible of 1,000. What is the expected payment per payment, and what is the probability that a payment exceeds 1,000? {Example}
> - The payment per payment is Pareto with $\alpha = 3$ and scale $2{,}000 + 1{,}000 = 3{,}000$.
> - The expected payment per payment is $e(1{,}000) = \frac{3{,}000}{2} = 1{,}500$.
> - The probability that a payment exceeds 1,000 is $\left(\frac{3{,}000}{4{,}000}\right)^3 = 0.4219$.

## Single-parameter Pareto distribution

The [[Single-Parameter Pareto Distribution|single-parameter Pareto distribution]] takes values above $\theta$, and its distribution function is

> $$F(x) = 1 - \left(\frac{\theta}{x}\right)^{\alpha}$$

- $x > \theta$.

If $Y$ has the single-parameter Pareto distribution, then $Y - \theta$ has the Pareto distribution with the same $\alpha$ and $\theta$.

> [!trap] Using the single-parameter survival function for the Pareto
> The Pareto survival function divides $\theta$ by $x + \theta$, not by $x$. With $\alpha = 3$ and $\theta = 2{,}000$, $P(X > 3{,}000) = (2{,}000/5{,}000)^3 = 0.064$, not $(2{,}000/3{,}000)^3 = 0.2963$.
