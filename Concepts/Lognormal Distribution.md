---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:301166a500954889a243deeca03887bf312d10d67ff7c20859ed4a45941922c6
  sources:
    - "SOA, Tables for Exam C (Fall 2009), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; A.5.1.1 Lognormal, printed p.6 (PDF p.11); SOA, Exam P normal distribution table (rev. 4/29/21), standard normal table and selected-percentile row, PDF p.2, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf; Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.2 Exercise 37 p.224 (PDF p.232), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Tables for Exam C (Fall 2009), A.3.2.1 Gamma M(t) = (1 - theta t)^-alpha, t < 1/theta (PDF p.9); A.3.3.1 Exponential M(t) = (1 - theta t)^-1 and A.5.1.1 Lognormal E[(X ^ x)^k] = exp(k mu + k^2 sigma^2/2) Phi((ln x - mu - k sigma^2)/sigma) + x^k[1 - F(x)] (PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Siegrist / standard normal symmetry 1 - Phi(x) = Phi(-x) as in SOA, Exam P normal distribution table (rev. 4/29/21), sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Lognormal Distribution.md
---

![[Media/Figures/Lognormal_Distribution.svg|340]]

A **Lognormal Distribution** is the distribution of a positive random variable $X$ whose natural logarithm is normally distributed. If $\ln X \sim N(\mu, \sigma^2)$, then $X \sim \text{Lognormal}(\mu, \sigma^2)$ and its probability density function is

> $$f(x) = \frac{1}{x\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(\ln x - \mu)^2}{2\sigma^2}\right)$$

- $x > 0$.
- $\mu$ is the mean of $\ln X$, and $\sigma > 0$ is its standard deviation.

It is widely used to model insurance losses, asset prices, and any quantity that must be positive and right-skewed. It takes only positive values, so it puts no probability on a loss of zero.

![[Media/Lognormal_distribution_pdf.svg|500]]

## Distribution function

A lognormal probability is found by taking logs of both sides of the inequality and standardizing $\ln X$. The distribution function is

> $$F(x) = \Phi\!\left(\frac{\ln x - \mu}{\sigma}\right)$$

- $\Phi$ is the standard normal distribution function.

> [!example]- Losses are lognormal with $\mu = 6$ and $\sigma = 1.5$. What is the probability that a loss exceeds 1,000? {Example}
> - Take logs: $X > 1000$ exactly when $\ln X > \ln 1000 = 6.908$.
> - Standardize: $z = (6.908 - 6)/1.5 = 0.605$.
> - $P(X > 1000) = 1 - \Phi(0.605) = 1 - 0.7275 = 0.2725$.

## Mean and variance

The mean and the variance of $X$ are

> $$E[X] = e^{\mu + \sigma^2/2}$$

> $$\text{Var}(X) = e^{2\mu+\sigma^2}(e^{\sigma^2}-1)$$

> [!example]- Losses are lognormal with $\mu = 7$ and $\sigma = 0.5$. What are the mean and standard deviation of a loss? {Example}
> - $E[X] = e^{7 + 0.125} = 1{,}242.65$.
> - $\text{Var}(X) = e^{14.25}(e^{0.25} - 1) = 438{,}585$.
> - The standard deviation is $\sqrt{438{,}585} = 662.26$.

## Limited expected value

With a limit (or deductible) $d$, write $z = (\ln d - \mu)/\sigma$, so that $S(d) = 1 - \Phi(z)$. The [[Limited Expected Value|limited expected value]], as the Loss Models tables give it, is

> $$E[X \wedge d] = e^{\mu + \sigma^2/2}\,\Phi\!\left(\frac{\ln d - \mu - \sigma^2}{\sigma}\right) + d\left[1 - \Phi\!\left(\frac{\ln d - \mu}{\sigma}\right)\right]$$

The first argument of $\Phi$ is $z - \sigma$.

> [!example]- Losses are lognormal with $\mu = 7$ and $\sigma = 0.5$. What is $E[X \wedge 1000]$? {Example}
> - $z = (\ln 1000 - 7)/0.5 = -0.1845$, so $z - \sigma = -0.6845$.
> - $\Phi(-0.6845) = 0.2468$ and $1 - \Phi(-0.1845) = 0.5732$.
> - $E[X \wedge 1000] = 1{,}242.65(0.2468) + 1000(0.5732) = 306.69 + 573.20 = 879.89$.

## Losses above a deductible

Since $E[X \wedge d] = E[X\,1\{X \le d\}] + d\,S(d)$, the part of the mean that comes from losses above $d$ is $e^{\mu + \sigma^2/2}\left[1 - \Phi(z - \sigma)\right]$. Dividing it by $S(d)$, and using $1 - \Phi(z - \sigma) = \Phi(\sigma - z)$, the mean of a loss that exceeds $d$ is

> $$E[X \mid X > d] = \frac{e^{\mu + \sigma^2/2}\,\Phi(\sigma - z)}{1 - \Phi(z)}$$

The [[Mean Excess Loss|mean excess loss]], the expected payment per payment under an ordinary deductible $d$, is $e(d) = E[X \mid X > d] - d$. It is the same as $(E[X] - E[X \wedge d])/S(d)$.

> [!example]- Losses are lognormal with $\mu = 7$ and $\sigma = 0.5$. What is the expected payment per payment under a deductible of 1,000? {Example}
> - $z = -0.1845$, so $\Phi(\sigma - z) = \Phi(0.6845) = 0.7532$ and $S(1000) = 0.5732$.
> - $E[X \mid X > 1000] = 1{,}242.65(0.7532)/0.5732 = 1{,}632.88$.
> - The expected payment per payment is $1{,}632.88 - 1{,}000 = 632.88$.

> [!trap] Standardizing $x$ instead of $\ln x$
> $\mu$ and $\sigma$ are the mean and standard deviation of $\ln X$, not of $X$. A probability for $X$ standardizes $\ln x$ with them: $(\ln x - \mu)/\sigma$, never $(x - \mu)/\sigma$.
