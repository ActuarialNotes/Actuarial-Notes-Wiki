---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:8375b4c44460b91c0559a75dbec2c7cbfc287b2dd7ad679c7534c21dcdea3fe5
  sources:
    - "SOA, Tables for Exam C (Fall 2009), A.3.2.1 Gamma f, M(t) = (1 - theta t)^-alpha, E[X^k] (printed p.4, PDF p.9 page image, read 2026-11-06); A.3.3.1 Exponential f, F, M(t), VaR_p = -theta ln(1-p), TVaR_p = VaR_p + theta, E[X ^ x] = theta(1 - e^(-x/theta)); A.5.1.1 Lognormal E[X^k] = exp(k mu + k^2 sigma^2/2) (printed p.6, PDF p.11), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §2.2 Example 2.17 p.68 (PDF p.76): 'The only continuous density function with this property is the exponential density'; §5.1 geometric memoryless (PDF p.194); §5.2 uniform density 1/(b-a) and exponential density (PDF pp.213-216), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 14.2 The Exponential Distribution: memoryless property and law of exponents F^c(t+s)=F^c(s)F^c(t); quantile -ln(1-p)/r, median ln2/r; scale parameter 1/r; MGF r/(r-s), s<r; Poisson process inter-arrival times independent exponential (HTML fetched 2026-11-06), sha256:db0eebaa01377dfc5e07ca838f9ae6c3b06b9653e6d10032de301cb07c4aad63 — https://www.randomservices.org/random/poisson/Exponential.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 14.3 The Gamma Distribution (Poisson process): arrival time T_n gamma (Erlang) with shape n (HTML fetched 2026-11-06), sha256:bbea5da3e0577d07d2670905b5727657c25b044f8382e17cee3bdfdd723bbe16 — https://www.randomservices.org/random/poisson/Gamma.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorem 6.5 E(X) = sum_j E(X|F_j)P(F_j) (PDF p.247), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Risk and Insurance study note P-21-05, VI Limits on Policy Benefits: deductible pays the loss in excess of the deductible, losses vs claim payments, benefit limits (PDF pp.7-9), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Exponential Distribution.md
---

![[Media/Figures/Exponential_Distribution.svg|340]]

An **Exponential Distribution** is a continuous distribution on $(0, \infty)$ that models waiting times and loss sizes. If $X$ is exponential with mean $\theta$, its probability density function is

> $$f(x) = \frac{1}{\theta}\,e^{-x/\theta}$$

- $x > 0$.
- $\theta > 0$.

> [!example]- Losses are exponential with mean 500. What is the probability that a loss is between 300 and 1,000? {Example}
> - Integrate the density over the interval.
>
> $$
> \begin{aligned}
> & P(300 < X < 1000) \\
> &= \int_{300}^{1000} \frac{1}{500}e^{-x/500}\,dx \\
> &= e^{-0.6} - e^{-2} \\
> &= 0.4135
> \end{aligned}
> $$

![[Media/Exponential_pdf.svg|500]]

## Mean and variance

The mean and the variance of $X$ are

> $$E[X] = \theta$$

> $$\text{Var}(X) = \theta^2$$

So the standard deviation equals the mean, and $E[X^2] = 2\theta^2$.

Some texts use the **rate** $\lambda = 1/\theta$. Then the density is $\lambda e^{-\lambda x}$ and the mean is $1/\lambda$.

Multiplying $X$ by a constant $c > 0$, as inflation does, gives an exponential with mean $c\theta$.

> [!example]- A waiting time is exponential with variance 100. What is the probability that it exceeds 20? {Example}
> - The variance is $\theta^2 = 100$, so the mean is $\theta = 10$.
> - $P(X > 20) = e^{-20/10} = e^{-2} = 0.1353$.

## Tail probabilities and percentiles

The probability that $X$ exceeds $x$ is

> $$P(X > x) = e^{-x/\theta}$$

So the cumulative distribution function is $F(x) = 1 - e^{-x/\theta}$, and $P(a < X < b) = e^{-a/\theta} - e^{-b/\theta}$.

Solving $F(x) = p$ gives the $100p$th [[Percentile|percentile]]:

> $$\pi_p = -\theta\ln(1 - p)$$

The [[Median|median]] is $\theta \ln 2$.

Because $e^{-x/\theta} = \left(e^{-x_0/\theta}\right)^{x/x_0}$, a tail probability known at one point $x_0$ gives the tail probability at any other point without solving for $\theta$:

> $$P(X > x) = P(X > x_0)^{x/x_0}$$

> [!example]- A waiting time is exponential, and 25% of waits end within 20 minutes. What is the median wait? {Example}
> - "25% end within 20 minutes" says $P(X > 20) = 0.75$, so $e^{-20/\theta} = 0.75$.
> - $\theta = \dfrac{-20}{\ln 0.75} = 69.52$.
> - The median is $69.52 \ln 2 = 48.19$ minutes.

## Memorylessness

For any $s > 0$ and $t > 0$,

> $$P(X > s + t \mid X > s) = P(X > t)$$

So given $X > d$, the excess $X - d$ is again exponential with mean $\theta$. The exponential is the only continuous distribution with this property.

> [!example]- A machine's lifetime is exponential with mean 10 years. It has already worked for 4 years. What is the probability that it works at least 5 more? {Example}
> - By memorylessness, the 4 years already worked don't matter.
> - $P(X > 9 \mid X > 4) = P(X > 5) = e^{-0.5} = 0.6065$.

## A shifted exponential

If $W$ is exponential with mean $\theta$ and $a$ is a constant, then $X = a + W$ has density

> $$f(x) = \frac{1}{\theta}\,e^{-(x-a)/\theta}$$

- $x > a$.

So a density of this form describes $X = a + W$. Its mean is $a + \theta$, and its variance is $\theta^2$, the same as the variance of $W$.

> [!example]- A value has density $f(x) = \frac{1}{5}e^{-(x-5)/5}$ for $x > 5$. What are its mean and variance? {Example}
> - This is $X = 5 + W$, with $W$ exponential with mean 5.
> - The mean is $5 + 5 = 10$.
> - The shift does not change the spread, so the variance is $5^2 = 25$.

## Deductibles and limits

With a [[Deductible|deductible]] $d$, the expected payment per loss is

> $$E[(X - d)_+] = \theta\,e^{-d/\theta}$$

With a [[Benefit Limit|limit]] $u$, the expected capped loss is

> $$E[\min(X, u)] = \theta\left(1 - e^{-u/\theta}\right)$$

The expected payment per payment, given $X > d$, is $\theta$.

> [!example]- Losses are exponential with mean 1,000. A policy pays the excess over a deductible of 200, up to a maximum payment of 800. What is the expected payment per loss? {Example}
> - The payment is the excess over 200 less the excess over 1,000.
>
> $$
> \begin{aligned}
> & E[\text{payment}] \\
> &= 1000\,e^{-0.2} - 1000\,e^{-1} \\
> &= 818.73 - 367.88 \\
> &= 450.85
> \end{aligned}
> $$

> [!trap] Per loss or per payment
> Above a deductible the excess has mean $\theta$ per payment. Multiply by $P(X > d) = e^{-d/\theta}$ for the expected payment per loss.

## The smallest of independent exponentials

If $X_1$ and $X_2$ are independent exponentials with means $\theta_1$ and $\theta_2$, then

> $$P(\min(X_1, X_2) > x) = e^{-x/\theta_1}\,e^{-x/\theta_2}$$

So the minimum is exponential, and its rate is the sum of the two rates.

> [!example]- Two independent components have exponential lifetimes with means 5 and 10 years. What is the expected time until the first one fails? {Example}
> - The rates are $\frac{1}{5}$ and $\frac{1}{10}$, which add to $\frac{3}{10}$.
> - The first failure is exponential with mean $\frac{10}{3} = 3.33$ years.

## Mixtures of exponentials

If a loss comes from a class with mean $\theta_1$ with probability $w$, and otherwise from a class with mean $\theta_2$, then

> $$P(X > x) = w\,e^{-x/\theta_1} + (1-w)\,e^{-x/\theta_2}$$

A [[Mixture Distribution|mixture]] of exponentials is not exponential.

> [!example]- Half of all losses are exponential with mean 1, and half are exponential with mean 3. What is the probability that a loss exceeds 2? {Example}
> - Weight the two tail probabilities by the class shares.
> - $P(X > 2) = 0.5e^{-2} + 0.5e^{-2/3} = 0.324$.
> - A single exponential with the average mean 2 would give $e^{-1} = 0.368$.
