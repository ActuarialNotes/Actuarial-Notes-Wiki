---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:92e389150e0ff299baabeb6fe323db3dcd3be986ba232f63faf41b5b0666af80
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

The **Percentile** (or quantile) $x_p$ of a [[Random Variable]] $X$ is the smallest value at which the [[Cumulative Distribution Function (CDF)|CDF]] reaches $p$, so at least a proportion $p$ of the distribution lies at or below it. When $F$ is continuous and strictly increasing, it is the value that solves $F(x_p) = p$, found by inverting the CDF.

> $$x_p = \min\{x : F(x) \geq p\}$$

> $$F(x_p) = p \quad (F \text{ continuous, strictly increasing})$$

> $$x_p = F^{-1}(p)$$

- Here $p \in (0, 1)$. The $100p$-th percentile is the quantile of order $p$.
- The 50th percentile ($p = 0.5$) is the [[Median|median]].
- Percentiles describe the tail of a distribution. Value at Risk (VaR) is the loss level a portfolio will not exceed with probability $p$, which is a percentile.

> [!idea] The idea
> The CDF gives the probability that a loss is below a given amount. A percentile reverses the question: it gives the amount below which a given proportion of losses fall. Only the order of the losses matters, so doubling every loss doubles every percentile.

![[Media/Figures/Percentile.svg|340]]

## Reversing the CDF

Losses on a block of policies are uniform on $(0, 1000)$, so $F(x) = x/1000$. Setting $F(x_p) = p$ gives $x_p = 1000p$.

| $p$ | 0.25 | 0.50 | 0.75 | 0.90 |
|---|---|---|---|---|
| $x_p$ | 250 | 500 | 750 | 900 |

- The interquartile range is $x_{0.75} - x_{0.25} = 500$.
- The reverse question reads the CDF forward. A loss of 600 has $F(600) = 0.6$, so it is the 60th percentile.

## When the CDF jumps

The same block's monthly claim count is [[Poisson Distribution|Poisson]] with mean 3. Its CDF jumps at each whole number.

| $k$ | 2 | 3 | 4 | 5 |
|---|---|---|---|---|
| $F(k)$ | 0.4232 | 0.6472 | 0.8153 | 0.9161 |

No $k$ solves $F(k) = 0.75$. The CDF first reaches 0.75 at $k = 4$, so the 75th percentile is 4. This is why the definition takes the smallest $x$ with $F(x) \ge p$.

A [[Payment Random Variable|payment]] can jump too. With a deductible of 200, the payment $Y = (X - 200)_+$ is 0 for every loss up to 200, so $F_Y(0) = 0.2$. Every percentile with $p \le 0.2$ is 0.

## Transforming a loss

Above the jump, each payment is its loss less 200. The payment rises with the loss, so the losses and payments keep their order. The 75th percentile of the payment is $750 - 200 = 550$.

> $$y_p = g(x_p), \quad g \text{ continuous and increasing}$$

> $$y_p = a + b\,x_p, \quad b > 0$$

- If every loss rises 10%, the losses become uniform on $(0, 1100)$ and every percentile rises 10%. The 75th percentile becomes 825.
- A lognormal percentile is $e$ raised to the matching normal percentile, $e^{\mu + z_p \sigma}$.
- The mean passes through only a linear transformation. Percentiles pass through any increasing one.

> [!trap] A decreasing transformation flips $p$
> If $g$ is decreasing, then $y_p = g(x_{1-p})$. The present value of a death benefit falls as the time of death rises. So the 95th percentile of the present value comes from the 5th percentile of the lifetime, not the 95th.

## Percentiles of the losses above a deductible

The insurer's claims file holds only the losses above 200. What is the 75th percentile of those losses? This is a percentile of $X$ given $X > 200$, not of $X$ itself.

> $$P(X \leq x \mid X > d) = \frac{F(x) - F(d)}{1 - F(d)}$$

Setting this equal to $p$ gives the percentile $k$.

> $$F(k) = 1 - (1 - p)\,[1 - F(d)]$$

For the uniform losses, $k/1000 = 1 - 0.25 \times 0.8 = 0.8$, so $k = 800$.

- A check through the excess: given $X > 200$, the excess $X - 200$ is uniform on $(0, 800)$. Its 75th percentile is 600, and adding the deductible back gives 800.
- The 75th percentile of all losses is only 750. Conditioning removes the losses below $d$, so $F(k) = p + (1 - p)\,F(d) \ge p$ and the percentiles shift upward.

## Percentiles of a normal and of a total

A [[Normal Distribution|normal]] percentile comes from the standard normal one, $z_p$.

> $$x_p = \mu + z_p\,\sigma$$

Suppose two independent losses are each normal with mean 100 and standard deviation 15. Each has 95th percentile $100 + 1.645 \times 15 \approx 124.68$.

- Their total has mean 200 and standard deviation $15\sqrt{2}$. Its 95th percentile is about 234.90.
- Adding the two individual percentiles gives about 249.35, which is too high. The means add, but the standard deviations do not.

The same method gives an approximate percentile for a sum of many independent amounts, by the [[Central Limit Theorem]].

## On other exams

- **MAS-I**: percentile matching estimates parameters by setting fitted percentiles equal to smoothed empirical ones. Percentiles of [[Order Statistics|order statistics]] and of fitted loss distributions also appear.
- **FAM**: a percentile of a present value random variable, or of a count of survivors by the normal approximation.
- **MAS-II**: posterior intervals read from percentiles of a posterior distribution.
- **Exam 7 and Exam 9**: a confidence interval for a reserve from an approximating distribution (Mack's lognormal), and Value at Risk as a percentile of the loss distribution.

## Try it

> [!example]- 90th percentile of an exponential claim {Example}
> Claim sizes follow an [[Exponential Distribution]] with CDF $F(x) = 1 - e^{-x/10}$ for $x \geq 0$. Find the 90th percentile.
>
> > [!answer]-
> > **Plan:** set $F(x_{0.90}) = 0.90$ and solve.
> > $$
> > \begin{align*}
> > 1 - e^{-x_{0.90}/10} &= 0.90 \\
> > e^{-x_{0.90}/10} &= 0.10 \\
> > x_{0.90} &= 10 \ln 10 \\
> > &\approx 23.03
> > \end{align*}
> > $$
> > About 90% of claims fall below 23.03.

> [!example]- 95th percentile of a normal loss {Example}
> Annual losses follow a normal distribution with $\mu = 100$ and $\sigma^2 = 225$. Find the 95th percentile.
>
> > [!answer]-
> > **Plan:** take the standard normal percentile and transform back with $\sigma = 15$.
> > $$
> > \begin{align*}
> > x_{0.95} &= \mu + z_{0.95}\,\sigma \\
> > &= 100 + 1.645(15) \\
> > &\approx 124.68
> > \end{align*}
> > $$
> > The probability that the annual loss is below 124.68 is 0.95.

> [!example]- Percentiles of a payment under a deductible {Example}
> Losses $X$ are exponential with mean 5,000, and a policy pays $Y = (X - 1000)_+$. Find the 10th and 90th percentiles of $Y$.
>
> > [!answer]-
> > **Plan:** find the size of the jump at 0 first, then invert the CDF above it.
> >
> > $Y = 0$ whenever $X \le 1000$, so the CDF of $Y$ jumps at zero.
> > $$F_Y(0) = 1 - e^{-0.2} \approx 0.1813$$
> > Since $0.1813 \ge 0.10$, the 10th percentile is 0, even though $F_Y(y) = 0.10$ has no solution.
> >
> > Above the jump, the 90th percentile is the 90th percentile of the loss less 1,000.
> > $$
> > \begin{align*}
> > x_{0.90} &= 5000 \ln 10 \\
> > &\approx 11512.93 \\
> > y_{0.90} &= 11512.93 - 1000 \\
> > &= 10512.93
> > \end{align*}
> > $$
> > Every percentile with $p \le 0.1813$ is 0. Above that, the continuous rule applies.

> [!warning]- Exam traps
> - **A decreasing transformation flips $p$.** Use $x_{1-p}$ of the lifetime for the $p$-th percentile of a present value.
> - **The mean is not the median.** An exponential with mean $\theta$ has median $\theta \ln 2 \approx 0.693\,\theta$. Setting the median equal to $\theta$ gives the wrong parameter.
> - **Percentiles don't add.** The 95th percentile of a total of independent normal losses is $\mu_{\text{total}} + 1.645\sqrt{\sum \sigma_i^2}$, below the sum of the individual 95th percentiles.
> - **All losses or the losses above $d$.** A percentile of the losses that exceed a deductible uses the conditional CDF, and it is larger than the same percentile of all losses.
