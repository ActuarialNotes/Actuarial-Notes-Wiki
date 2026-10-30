---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:2718fbe41161ce31d6ac7832067398f1d058c7842c296c97889c87deb4b2e95d
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 2.2 memoryless, only continuous density with this property is the exponential, p.68 (PDF p.76); 4 beta density on [0,1] p.168 (PDF p.176); 5.1 geometric memoryless p.186 (PDF p.194); 5.2 continuous uniform density 1/(b-a) on [a,b] and exponential density on [0, infinity) p.205 (PDF p.213), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Tables for Exam C (Fall 2009), A.3.2.1 gamma printed p.4 (PDF p.9, page image), A.6.1.2 beta printed p.8 (PDF p.13), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Continuous Univariate Distributions.md
---

A **Continuous Univariate Distribution** describes the probability law of a single random variable $X$ that can take any value in a continuous interval or union of continuous intervals.
- The probability density function (PDF) $f(x)$ must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\infty} f(x)\,dx = 1$
- Individual point probabilities are zero; all probabilities are computed as areas under $f$:

> $$P(a \leq X \leq b) = \int_a^b f(x)\, dx$$

- The CDF and the density are two views of the same object: $F(x) = \int_{-\infty}^{x} f(t)\,dt$ and $f(x) = F'(x)$. For anything phrased as a tail probability, work from the survival function $S(x) = 1 - F(x)$ instead.
- **Symmetric densities.** A density symmetric about $m$ satisfies $f(m + x) = f(m - x)$: the density on one side of $m$ is the mirror image of the density on the other, so a density given on one side determines it on the other, $f(t) = f(2m - t)$. Exactly half the probability lies on each side, $P(X \leq m) = P(X \geq m) = 1/2$, so $m$ is the median, and a percentile above the median solves $P(m < X \leq x_p) = p - 1/2$. For instance, if $X$ is symmetric about 4 and $P(4 < X \leq 5) = 0.3$, the 80th percentile is 5
- **Piecewise densities.** When $f$, or the function being averaged against it, is defined in pieces, split every integral at each breakpoint of both, use the matching branch on each subinterval and add. A probability is the sum of the integrals over the pieces the interval covers (an interval inside one piece needs only that branch); an expectation $E[g(X)]$ is the sum over the pieces of $\int g(x)\,f(x)\,dx$, so $E[X]$ is the sum of $\int x\,f(x)\,dx$ over each piece; and a normalizing constant comes from integrating every piece over the whole support

## Choosing the right one

Read the question for the **story** the quantity follows, then check the support matches:

- Every value in a range equally likely → [[Uniform Continuous Distribution]] $(a,b)$ on $(a,b)$, with $E[X] = (a+b)/2$
- Waiting time between events, **memoryless** → [[Exponential Distribution]] $(\theta)$ on $(0,\infty)$, with $E[X] = \theta$
- Waiting time to the $\alpha$-th event, or a skewed severity → [[Gamma]] $(\alpha,\theta)$ on $(0,\infty)$, with $E[X] = \alpha\theta$
- A proportion, rate, or probability → [[Beta]] $(\alpha,\beta)$ on $(0,1)$, with $E[X] = \alpha/(\alpha+\beta)$
- A sum or average of many variables → [[Normal Distribution]] $(\mu,\sigma^2)$ on $\mathbb{R}$, with $E[X] = \mu$
- A positive, heavily right-skewed loss whose **log** is normal → [[Lognormal Distribution]] $(\mu,\sigma^2)$ on $(0,\infty)$, with $E[X] = e^{\mu+\sigma^2/2}$

- The word **memoryless** is decisive: it appears only for the exponential (and its discrete counterpart, the geometric).
- For the lognormal, $\mu$ and $\sigma$ are the parameters of $\ln X$, **not** the mean and standard deviation of $X$. Every lognormal probability reduces to a normal one by taking logs of both sides: $P(X > c) = P(\ln X > \ln c)$.
- Apart from a uniform with $a < 0$, the normal is the only one on this list that can go negative, and the only one with no lower bound at all — a red flag if the quantity is a loss.
- Insurance provisions ([[Deductible|deductibles]], [[Benefit Limit|limits]], [[Coinsurance Percentage|coinsurance]]) transform whichever severity distribution is chosen; see [[Transformations of Random Variables]].

![[Media/Figures/Continuous_Univariate_Distributions.svg|340]]

> [!example]- Finding a Probability from a PDF {Example}
> A random variable $X$ has PDF $f(x) = 3x^2$ for $0 < x < 1$. Find $P(0.5 < X < 1)$.
>
> > [!answer]-
> > $$P(0.5 < X < 1) = \int_{0.5}^{1} 3x^2\, dx = \left[x^3\right]_{0.5}^{1} = 1 - (0.5)^3 = 1 - 0.125 = 0.875$$

> [!example]- A Density Defined in Two Pieces {Example}
> $X$ has density $f(x) = c$ for $0 < x < 1$ and $f(x) = c\,x^{-3}$ for $x \geq 1$. Find $c$, $E[X]$ and $P(0.5 < X < 2)$.
>
> > [!answer]-
> > Each integral is split at the breakpoint $x = 1$:
> > $$
> > \begin{align*}
> > 1 &= \int_0^1 c\,dx + \int_1^\infty c\,x^{-3}\,dx \\
> >   &= c + \frac{c}{2} \\
> > c &= \frac{2}{3}
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > E[X] &= \int_0^1 \tfrac{2}{3}\,x\,dx + \int_1^\infty \tfrac{2}{3}\,x^{-2}\,dx \\
> >      &= \tfrac{1}{3} + \tfrac{2}{3} \\
> >      &= 1
> > \end{align*}
> > $$
> > The interval $(0.5, 2)$ covers part of each piece:
> > $$
> > \begin{align*}
> > P(0.5 < X < 2) &= \int_{0.5}^1 \tfrac{2}{3}\,dx + \int_1^2 \tfrac{2}{3}\,x^{-3}\,dx \\
> >                &= \tfrac{1}{3} + \tfrac{1}{3}\left(1 - \tfrac{1}{4}\right) \\
> >                &= \tfrac{7}{12}
> > \end{align*}
> > $$
