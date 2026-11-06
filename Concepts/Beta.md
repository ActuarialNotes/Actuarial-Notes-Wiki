---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:c3ea1b7d06b4e743801ec55ea354da3f34eb80181d35bb116212ee8913f3a68b
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 4 Beta Density B(alpha,beta,x) = x^(alpha-1)(1-x)^(beta-1)/B(alpha,beta) on [0,1], alpha = beta = 1 is the uniform, p.168 (PDF p.176), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Tables for Exam C (Fall 2009), A.6.1.2 beta (a, b, theta), printed p.8 (PDF p.13), read with theta = 1, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Beta.md
---

The **Beta Distribution** $X \sim \text{Beta}(\alpha, \beta)$ is a continuous distribution on $(0, 1)$ with shape parameters $\alpha > 0$ and $\beta > 0$. It models rates, proportions and probabilities, such as a loss ratio or the share of claims that close within a year.

> $$f(x) = \frac{x^{\alpha - 1}(1-x)^{\beta - 1}}{B(\alpha,\, \beta)}, \quad 0 < x < 1$$

> $$B(\alpha, \beta) = \frac{\Gamma(\alpha)\,\Gamma(\beta)}{\Gamma(\alpha + \beta)}$$

> $$E[X] = \frac{\alpha}{\alpha + \beta}$$

> $$\text{Var}(X) = \frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}$$

- $B(\alpha, \beta)$ is the beta function, the constant that makes the density integrate to 1. $\Gamma$ is the gamma function, with $\Gamma(n) = (n-1)!$ for a whole number $n$.
- When $\alpha = \beta = 1$ it reduces to the [[Uniform Continuous Distribution|continuous uniform distribution]] on $(0,1)$.

> [!idea] The idea
> The factor $x^{\alpha - 1}$ pulls probability toward 1 and the factor $(1 - x)^{\beta - 1}$ pulls it toward 0. The mean $\alpha/(\alpha + \beta)$ is the share of the pull toward 1. Multiplying both parameters by the same factor keeps the mean and tightens the spread, which is why the variance has $\alpha + \beta + 1$ in its denominator.

![[Media/Beta_distribution_pdf.svg|500]]

![[Media/Figures/Beta.svg|340]]

## The density for whole-number parameters

An insurer models its loss ratio as $\text{Beta}(3, 2)$. What is the density, written out?

The constant is $1/B(3, 2)$. With $\Gamma(3) = 2$, $\Gamma(2) = 1$ and $\Gamma(5) = 24$, this gives $B(3, 2) = 2/24 = 1/12$.

> $$f(x) = 12\,x^2(1 - x), \quad 0 < x < 1$$

For **integer** $\alpha$ and $\beta$ the normalizing constant is a binomial coefficient, so the density is a plain polynomial.

> $$\frac{1}{B(\alpha,\beta)} = (\alpha+\beta-1)\binom{\alpha+\beta-2}{\alpha-1}$$

- For $\text{Beta}(3, 2)$, this is $4 \times \binom{3}{2} = 12$.
- A question that gives $f(x) = k\,x^{a}(1 - x)^{b}$ and asks for $k$ is asking for this constant, with $\alpha = a + 1$ and $\beta = b + 1$.

## Probabilities by integrating a polynomial

What is the probability that the loss ratio exceeds 80%?

The density is a polynomial, so the tail is an ordinary integral.

> $$P(X > 0.8) = \int_{0.8}^{1} 12\left(x^2 - x^3\right) dx \approx 0.181$$

| Loss ratio $x$ | $P(X > x)$ |
|---|---|
| 0.5 | 0.6875 |
| 0.6 | 0.5248 |
| 0.8 | 0.1808 |
| 0.9 | 0.0523 |

- The CDF is $F(x) = 4x^3 - 3x^4$, and every row is $1 - F(x)$.
- About an 18% chance the loss ratio exceeds 80%. No special functions are needed.

## Mean, variance and shape

With $\alpha = 3$ and $\beta = 2$, the mean loss ratio is $3/5 = 0.60$. The variance is $6/(25 \times 6) = 0.04$, so the standard deviation is 0.20.

- The distribution is skewed right when $\alpha < \beta$, left when $\alpha > \beta$, and symmetric when $\alpha = \beta$.
- The loss ratio has $\alpha > \beta$, so it is skewed left. Its mode, $(\alpha - 1)/(\alpha + \beta - 2) = 2/3$, sits above its mean of 0.6.
- $\text{Beta}(6, 4)$ has the same mean of 0.6, but a variance of $24/(100 \times 11) \approx 0.022$. Doubling both parameters keeps the centre and narrows the spread.

## Where a beta comes from

Why would a proportion follow this shape? One source is the [[Order Statistics|order statistics]] of uniforms.

The $k$-th order statistic of $n$ i.i.d. $\text{Uniform}(0,1)$ variables is exactly $\text{Beta}(k,\, n-k+1)$.

> $$E[X_{(k)}] = \frac{k}{n+1}$$

- The $n$ points cut $(0, 1)$ into $n + 1$ gaps of equal expected length, and the $k$-th point sits after $k$ of them.
- The loss ratio's $\text{Beta}(3, 2)$ is the third smallest of four uniforms, with mean $3/5$.

## On other exams

**MAS-II** uses the beta as the [[Conjugate Prior|conjugate prior]] for a binomial probability $q$. With a $\text{Beta}(a, b)$ prior and $x$ successes in $m$ trials, the posterior is $\text{Beta}(a + x,\ b + m - x)$. The prior's parameters act like successes and failures already seen. See [[Bayesian Credibility]].

## Try it

> [!example]- Mean and Spread of a Claim Proportion {Example}
> The proportion of a portfolio's claims that are litigated is $\text{Beta}(2, 6)$. Find the mean and the standard deviation.
>
> > [!answer]-
> > **Plan:** apply the mean and variance formulas with $\alpha + \beta = 8$.
> > $$E[X] = \frac{2}{8} = 0.25$$
> > $$
> > \begin{align*}
> > \text{Var}(X) &= \frac{2 \times 6}{8^2 \times 9} \\
> >               &= \frac{12}{576} \\
> >               &\approx 0.0208
> > \end{align*}
> > $$
> > The standard deviation is $\sqrt{0.0208} \approx 0.144$.

> [!example]- Finding the Constant First {Example}
> The proportion of a crop damaged by hail has density $f(x) = k\,x^3(1 - x)$ for $0 < x < 1$. Find $k$ and the probability that less than half the crop is damaged.
>
> > [!answer]-
> > **Plan:** read off $\alpha = 4$ and $\beta = 2$, use the binomial-coefficient constant, then integrate the polynomial.
> > $$k = 5 \times \binom{4}{3} = 20$$
> > $$
> > \begin{align*}
> > P(X < 0.5) &= \int_0^{0.5} 20\left(x^3 - x^4\right) dx \\
> >            &= 20\left(\frac{0.5^4}{4} - \frac{0.5^5}{5}\right) \\
> >            &= 0.1875
> > \end{align*}
> > $$
> > The density leans toward 1, since $\alpha > \beta$, so less than half damaged is unlikely.

> [!example]- The Median of Five Settlement Delays {Example}
> Five claim-settlement delays are i.i.d. $\text{Uniform}(0,1)$ years. Find the expected median delay and the probability that the median delay is under 0.4 years.
>
> > [!answer]-
> > **Plan:** the median of five is the third order statistic, which is $\text{Beta}(3, 3)$.
> >
> > The mean is $3/6 = 0.5$. The density is $30\,x^2(1 - x)^2$, since $5 \times \binom{4}{2} = 30$.
> > $$P(X_{(3)} < 0.4) = \int_0^{0.4} 30\,x^2(1 - x)^2\,dx \approx 0.3174$$
> > Why does a binomial give the same number? The median is under 0.4 exactly when at least 3 of the 5 delays are under 0.4, and that count is binomial with $p = 0.4$.

> [!warning]- Exam traps
> - **Off by one in the parameters.** A density $k\,x^{a}(1-x)^{b}$ is $\text{Beta}(a + 1, b + 1)$.
> - **Dropping the $+1$ in the variance.** The denominator is $(\alpha+\beta)^2(\alpha+\beta+1)$.
> - **Integrating past the support.** The beta lives on $(0, 1)$. A tail probability ends at 1.
> - **Mixing up the order-statistic parameters.** The $k$-th smallest of $n$ uniforms is $\text{Beta}(k, n - k + 1)$, not $\text{Beta}(k, n - k)$.
