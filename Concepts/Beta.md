---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:b53e6a64b889801f162846aec20e71d471b67f194cb0e7c39d25cb4063cc85e5
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4 Beta density B(alpha,beta,x) = x^(alpha-1)(1-x)^(beta-1)/B(alpha,beta) on [0,1], alpha = beta = 1 the uniform (PDF p.176), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.17 The Beta Distribution: density with B(a,b); a=b=1 standard uniform; mode (a-1)/(a+b-2) for a,b>1; E(X)=a/(a+b), var(X)=ab/((a+b)^2(a+b+1)); positively skewed if a<b, negatively if a>b, symmetric if a=b; k-th order statistic of n standard uniforms is Beta(k, n-k+1) (HTML fetched 2026-11-06), sha256:9ef44a035fff82ca4d81ae3db74baa55abdc511dfea0522006c4a62e60909032 — https://www.randomservices.org/random/special/Beta.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 6.6 Order Statistics: k-th order statistic of a uniform sample is beta with left parameter k, right n-k+1 (HTML fetched 2026-11-06), sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.8 The Gamma Distribution: Gamma(k+1)=k! (HTML fetched 2026-11-06), sha256:24d8bfbac0c1cdc05848961605509fb8cc7f4182127be1ff73bf9be78fedfeb6 — https://www.randomservices.org/random/special/Gamma.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 7.4 Bayesian Estimation: Bernoulli model with beta prior (a,b): posterior beta with left a + Y_n, right b + (n - Y_n) (HTML fetched 2026-11-06), sha256:96904b1fd4ab905bbffa62bd5cc0d965b3c969e543a983124e968718ed25d550 — https://www.randomservices.org/random/point/Bayes.html"
    - "CAS, Exam Content Outline, Modern Actuarial Statistics II (MAS-II), 2026 (v06 2026_1_13), Domain A Introduction to Credibility tasks A1-A2 incl. Bayesian credibility, reading Tse (PDF p.2); Complete Text References: Tse chs 6.1-6.3, 7.1-7.4, 8.1-8.2, 9.1-9.2 (PDF p.4), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, Contents p.x (PDF p.12): 8 Bayesian approach, 8.2 Conjugate distributions, 8.2.1 The gamma-Poisson conjugate distribution, sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-II Spring 2019, Q19 (binomial likelihood with beta prior p^3(1-p)^5, posterior mean of p), official booklet PDF p.23 (OCR), sha256:ece3305b695aa96a37c55cbec4ce30ca2a2e013d24141183acfe3b77b71c29f1 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasii_spmasii-19.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Beta.md
---

![[Media/Figures/Beta.svg|340]]

A **Beta** distribution is a continuous distribution on $(0, 1)$ with shape parameters $\alpha > 0$ and $\beta > 0$, used for proportions and probabilities. Its probability density function is

> $$f(x) = \frac{x^{\alpha-1}(1-x)^{\beta-1}}{B(\alpha, \beta)}$$

- $0 < x < 1$.
- $B(\alpha, \beta)$ is the beta function, the constant that makes $f$ integrate to 1.

The beta function is

> $$B(\alpha, \beta) = \frac{\Gamma(\alpha)\,\Gamma(\beta)}{\Gamma(\alpha + \beta)}$$

- $\Gamma$ is the gamma function, with $\Gamma(n) = (n-1)!$ for a positive integer $n$.

A density proportional to $x^{a}(1-x)^{b}$ on $(0, 1)$ is a beta distribution with $\alpha = a + 1$ and $\beta = b + 1$.

> [!example]- A loss ratio has density $f(x) = c\,x^2(1-x)$ on $(0, 1)$. What is $c$, and what is the probability that the loss ratio exceeds 0.8? {Example}
> - The powers 2 and 1 give $\alpha = 3$ and $\beta = 2$.
> - $B(3, 2) = \frac{2! \cdot 1!}{4!} = \frac{1}{12}$, so $c = 12$.
> - The density is a polynomial, so the tail is an ordinary integral:
>
> $$
> \begin{aligned}
> P(X > 0.8) &= \int_{0.8}^{1} 12\left(x^2 - x^3\right) dx \\
> &= 0.1808
> \end{aligned}
> $$

![[Media/Beta_distribution_pdf.svg|500]]

## Mean and variance

The mean and the variance of $X$ are

> $$E[X] = \frac{\alpha}{\alpha + \beta}$$

> $$\text{Var}(X) = \frac{\alpha\beta}{(\alpha + \beta)^2(\alpha + \beta + 1)}$$

With $\alpha = \beta$ the distribution is symmetric about 0.5. With $\alpha = \beta = 1$ it is the [[Uniform Continuous Distribution|uniform distribution]] on $(0, 1)$.

> [!example]- The proportion of claims that are litigated has a beta distribution with $\alpha = 2$ and $\beta = 6$. What are its mean and standard deviation? {Example}
> - $\alpha + \beta = 8$.
> - $E[X] = \frac{2}{8} = 0.25$.
> - $\text{Var}(X) = \frac{2 \times 6}{8^2 \times 9} = 0.0208$.
> - The standard deviation is $\sqrt{0.0208} = 0.144$.

## Order statistics of uniforms

The $k$th smallest of $n$ independent uniforms on $(0, 1)$, its $k$th [[Order Statistics|order statistic]], has a beta distribution with

> $$\alpha = k, \quad \beta = n - k + 1$$

> [!example]- Five settlement delays are independent and uniform on $(0, 1)$ years. What is the probability that the median delay is under 0.4 years? {Example}
> - The median of five is the 3rd smallest, so $\alpha = 3$ and $\beta = 3$.
> - $B(3, 3) = \frac{2! \cdot 2!}{5!} = \frac{1}{30}$.
>
> $$
> \begin{aligned}
> P(X < 0.4) &= \int_0^{0.4} 30\,x^2(1-x)^2\,dx \\
> &= 0.3174
> \end{aligned}
> $$

> [!trap] Off by one in the parameters
> A density proportional to $x^{a}(1-x)^{b}$ has $\alpha = a + 1$ and $\beta = b + 1$. Reading $\alpha = a$ gives the wrong constant and the wrong mean.

## As a prior on later exams

On MAS-II, a beta distribution is the [[Conjugate Prior|conjugate prior]] for a binomial probability. A beta prior with $\alpha$ and $\beta$, updated by $x$ successes in $m$ trials, gives a beta posterior with

> $$\alpha' = \alpha + x, \quad \beta' = \beta + m - x$$
