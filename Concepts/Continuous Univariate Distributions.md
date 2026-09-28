---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:51b5ab8eec90381f5c223a377b8838f278a924d31f48f57256bf22fc4fe0bb55
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 2.2 Definition 2.1 p.59 (PDF p.67), Theorem 2.1 p.61 (PDF p.69), Example 2.17 p.68 (PDF p.76), 5.2 pp.206-207 and 213 (PDF pp.214-215, 221), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Tables for Exam C (Fall 2009), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; A.3.2.1 Gamma printed p.4 (PDF p.9), A.3.3.1 Exponential and A.5.1.1 Lognormal printed p.6 (PDF p.11), A.6.1.2 beta printed p.8 (PDF p.13)"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, 1.3.6.6.2 Uniform Distribution (pdf, cdf, common statistics), fetched 2026-09-28, sha256:c420db7b6567c417241eca246094bddb30692813e5cd34c260f396a9f8796fad — https://www.itl.nist.gov/div898/handbook/eda/section3/eda3662.htm"
  open_findings: 1
  open_critical: 0
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
- Apart from a uniform with $a < 0$, the normal is the only one on this list that can go negative, and the only one with no lower bound at all — a red flag if the quantity is a loss.
- Insurance provisions ([[Deductible|deductibles]], [[Benefit Limit|limits]], [[Coinsurance Percentage|coinsurance]]) transform whichever severity distribution is chosen; see [[Transformations of Random Variables]].

![[Media/Figures/Continuous_Univariate_Distributions.svg|340]]

> [!example]- Finding a Probability from a PDF {Example}
> A random variable $X$ has PDF $f(x) = 3x^2$ for $0 < x < 1$. Find $P(0.5 < X < 1)$.
>
> > [!answer]-
> > $$P(0.5 < X < 1) = \int_{0.5}^{1} 3x^2\, dx = \left[x^3\right]_{0.5}^{1} = 1 - (0.5)^3 = 1 - 0.125 = 0.875$$
