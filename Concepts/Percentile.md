---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:9fde842befe89af57f9b1dbc6f1b86cca8c85dc9a84c0c4e9512df69a0348949
  sources:
    - "Siegrist, 2.7 Distribution and Quantile Functions: quantile of order p, F(x-) <= p <= F(x); F^-1(p) = min{x: F(x) >= p}; continuous F -> F(x) = p; quartiles, HTML fetched 2026-11-06, sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html"
    - "Siegrist, Location-Scale Families: X = a + bZ, b > 0, a + bz is a quantile of order p of X, HTML fetched 2026-11-06, sha256:d9bc65924c926bd13e91d33c7f63a368fff73aa005bddc1aeb595de5d0fbc738 — https://www.randomservices.org/random/special/LocationScale.html"
    - "Siegrist, 3.7 Transformations of Random Variables: r strictly decreasing gives G(y) = 1 - F[r^-1(y)], HTML fetched 2026-11-06, sha256:827bba81a7f85933f2ba982a09155f5277f5ec19838e2ffe70ac0563a56aca69 — https://www.randomservices.org/random/dist/Transformations.html"
    - "Siegrist, The Lognormal Distribution: quantile function exp(mu + sigma Phi^-1(p)), HTML fetched 2026-11-06, sha256:cec8c0b516a0fcc03bb953f82c186e3faa8ec2eee2479caf48df2850bfe2c51c — https://www.randomservices.org/random/special/LogNormal.html"
    - "SOA Exam P Sample Solutions (2026-05 file), Q137 (PDF p.40: P(N<=4) = 0.815, the first above 0.75), Q181 (PDF p.53: percentiles through a deductible, 20th percentile max(0, 200 - 250) = 0), sha256:e10d2649bdf708541f87849c85ef6cde195019cfc8a46ee9647f6733d74d04b2 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Tables for Exam C (Fall 2009), exponential VaR_p = -theta ln(1-p) (PDF p.11); Poisson pmf, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA Exam P normal distribution table (rev. 4/29/21), p.2: z = 1.6449 for Pr(Z<z) = 0.95, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL), Example 7.5 PDF p.302: sum of independent normals is normal, mean mu1+mu2, variance sigma1^2+sigma2^2, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, probabilitycourse.com, §1.4.0 Conditional Probability: P(A|B) = P(A and B)/P(B), HTML fetched 2026-11-06, sha256:6068941689f60230e24fc4ad4a1589902e6d5d4e9f080efa97d0ade85a2d6e4a — https://www.probabilitycourse.com/chapter1/1_4_0_conditional_probability.php"
    - "CAS Exam MAS-I Content Outline 2026, PDF p.4 Domain B tasks (B7 order statistics of a sample) and the text references (Tse sections incl. 12.1), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Tse, Nonlife Actuarial Models (CUP 2009), publisher eBook preview, printed Contents PDF p.13: 12.1 Methods of moments and percentile matching, 12.1.2 Method of percentile matching, sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "SOA FAM syllabus, February 2027: PDF p.3 (severity models: calculate moments and percentiles; normal/lognormal approximation to the aggregate; VaR and TVaR), PDF p.7 Topic 10 b) (premiums by the portfolio percentile principle), sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf"
    - "CAS Exam 7 Content Outline, Fall 2026, PDF pp.4-5 (Mack, 'Measuring the Variability of Chain Ladder Reserve Estimates', on the syllabus), sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf"
    - "Mack, Measuring the Variability of Chain Ladder Reserve Estimates (CAS Forum, Spring 1994), PDF pp.18-19: confidence limits by approximating the reserve distribution with a lognormal, its 90th percentile, sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, PDF p.4 Domain B tasks 1-2 (risk measures), reading Mildenhall & Major, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley, 2022), publisher's free Chapter 1 excerpt, PDF p.3: Value at Risk (VaR) or TVaR at a high confidence level such as 99.5% as a capital risk measure, sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 learning outcomes c) (expected values incl. mode, median, percentiles) and e) (amount an insurance company pays to a policyholder given deductibles, coinsurance percentages, benefit limits, inflation), PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Percentile.md
---

![[Media/Figures/Percentile.svg|340]]

A **Percentile** of a [[Random Variable|random variable]] $X$ is a value at or below which a given proportion of its probability lies. The $100p$th percentile $x_p$ is the smallest value at which the [[Cumulative Distribution Function (CDF)|CDF]] reaches $p$:

> $$x_p = \min\{x : F(x) \geq p\}$$

- $0 < p < 1$.

When $F$ is continuous and strictly increasing, $x_p$ is the solution of

> $$F(x_p) = p$$

The 50th percentile is the [[Median|median]]. Value at Risk at level $p$ is the $100p$th percentile of a loss.

> [!example]- Losses are exponential with mean 1,000, so $F(x) = 1 - e^{-x/1000}$. What is the 90th percentile? {Example}
> - Setting the CDF to 0.9 gives $e^{-x/1000} = 0.1$.
> - Taking logarithms, $x_{0.9} = -1000 \ln 0.1 \approx 2{,}303$.
> - Since $-\ln a = \ln \frac{1}{a}$, this is $1000 \ln 10$.
> - In general an [[Exponential Distribution|exponential]] with mean $\theta$ has $x_p = -\theta \ln(1 - p)$.

For a density in pieces, evaluate $F$ at each break first to find which piece holds $x_p$, then solve within that piece.

## Percentiles of a uniform distribution

For a [[Uniform Continuous Distribution|uniform]] distribution on $[a, b]$, the CDF is $\frac{x - a}{b - a}$, so the $100p$th percentile is

> $$x_p = a + p(b - a)$$

> [!example]- Losses are uniform on $[0, 1000]$. What are the 25th and 75th percentiles? {Example}
> - $x_{0.25} = 0.25 \times 1000 = 250$.
> - $x_{0.75} = 0.75 \times 1000 = 750$.
> - Half of all losses lie between 250 and 750.

## Percentiles of a normal distribution

A [[Normal Distribution|normal]] percentile comes from the standard normal percentile $z_p$ in the normal table:

> $$x_p = \mu + z_p\,\sigma$$

- $\mu$ is the mean and $\sigma$ is the standard deviation.
- $z_p$ is negative for $p < 0.5$.

Given a percentile and the mean, the same equation solves for $\sigma$.

> [!example]- A loss is normal with mean 100 and standard deviation 15. What is its 95th percentile? {Example}
> - The standard normal table gives $z_{0.95} = 1.645$.
> - $x_{0.95} = 100 + 1.645 \times 15 \approx 124.7$.

## Percentiles of a discrete distribution

When the CDF jumps, it may pass over $p$ without equalling it. The percentile is then the value where it jumps past $p$. A point mass works the same way: if $F(0) \geq p$, the $100p$th percentile is 0.

> [!example]- A monthly claim count is Poisson with mean 3, with $F(3) = 0.6472$ and $F(4) = 0.8153$. What is the 75th percentile? {Example}
> - No count has $F = 0.75$ exactly.
> - The CDF first reaches 0.75 at 4.
> - The 75th percentile is 4.

## Percentiles of a transformed loss

If $g$ is continuous and increasing, the $100p$th percentile of $g(X)$ is $g$ of the $100p$th percentile of $X$:

> $$y_p = g(x_p)$$

Multiplying a loss by a positive constant multiplies every percentile by that constant. Under a deductible $d$, the payment percentile is $x_p - d$ when $x_p > d$, and 0 otherwise.

> [!example]- Losses are uniform on $[0, 1000]$. A policy has a deductible of 200. What is the 75th percentile of the payment per loss? {Example}
> - The 75th percentile of the loss is 750.
> - The payment $\max(X - 200, 0)$ rises with the loss, so its 75th percentile is $750 - 200 = 550$.

## Percentiles given a loss above a deductible

The $100p$th percentile $k$ of a loss, given that it exceeds a deductible $d$, solves

> $$F(k) = 1 - (1 - p)\big[1 - F(d)\big]$$

> [!example]- Losses are uniform on $[0, 1000]$. Among losses above 200, what is the 75th percentile? {Example}
> - $F(200) = 0.2$, so $F(k) = 1 - 0.25 \times 0.8 = 0.8$.
> - The percentile is $k = 800$, above the 750 for all losses.

> [!trap] 'Exceeded with probability 5%' is the 95th percentile
> The amount a loss exceeds with probability $p$ has $P(X \leq x) = 1 - p$. It is the $100(1 - p)$th percentile, not the $100p$th.
