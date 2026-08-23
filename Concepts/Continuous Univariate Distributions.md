---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:51b5ab8eec90381f5c223a377b8838f278a924d31f48f57256bf22fc4fe0bb55
  sources: []
  open_findings: 0
  log: .verify/Concepts/Continuous Univariate Distributions.md
---

A **Continuous Univariate Distribution** describes the probability law of a single random variable $X$ that can take any value in a continuous interval or union of continuous intervals.
- The probability density function (PDF) $f(x)$ must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\infty} f(x)\,dx = 1$
- Individual point probabilities are zero; all probabilities are computed as areas under $f$:

> $$P(a \leq X \leq b) = \int_a^b f(x)\, dx$$

- The CDF and the density are two views of the same object: $F(x) = \int_{-\infty}^{x} f(t)\,dt$ and $f(x) = F'(x)$. For anything phrased as a tail probability, work from the survival function $S(x) = 1 - F(x)$ instead.

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
- The normal is the only one on this list allowed to go negative — a red flag if the quantity is a loss.
- Insurance provisions ([[Deductible|deductibles]], [[Benefit Limit|limits]], [[Coinsurance Percentage|coinsurance]]) transform whichever severity distribution is chosen; see [[Transformations of Random Variables]].

![[Media/Figures/Continuous_Univariate_Distributions.svg|340]]

> [!example]- Finding a Probability from a PDF {Example}
> A random variable $X$ has PDF $f(x) = 3x^2$ for $0 < x < 1$. Find $P(0.5 < X < 1)$.
>
> > [!answer]-
> > $$P(0.5 < X < 1) = \int_{0.5}^{1} 3x^2\, dx = \left[x^3\right]_{0.5}^{1} = 1 - (0.5)^3 = 1 - 0.125 = 0.875$$
