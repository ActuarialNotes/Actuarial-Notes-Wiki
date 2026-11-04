---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:b1c20cce91a26e9a33517f494acf00ec9b3dd77a3b5051b52f05c62fbc38b233
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 2.2 memoryless, only continuous density with this property is the exponential, p.68 (PDF p.76); 4 beta density on [0,1] p.168 (PDF p.176); 5.1 geometric memoryless p.186 (PDF p.194); 5.2 continuous uniform density 1/(b-a) on [a,b] and exponential density on [0, infinity) p.205 (PDF p.213), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Tables for Exam C (Fall 2009), A.3.2.1 gamma printed p.4 (PDF p.9, page image), A.6.1.2 beta printed p.8 (PDF p.13), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Siegrist, 4.1 Definitions and Basic Properties (expected value), symmetry: a density symmetric about a, that is f(a+x)=f(a-x) (HTML fetched 2026-10-30), sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
    - "Siegrist, 3.6 Distribution and Quantile Functions: distribution symmetric about a has F(a-t)=1-F(a+t) (t=0 gives F(a)=1/2); quantile symmetry (HTML fetched 2026-10-30), sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html"
    - "OpenStax, Calculus Volume 1 (Strang, Herman et al., 2016), §5.2 Properties of the Definite Integral, property 6 eq. 5.14 (additivity over intervals) p.538 (PDF p.546), sha256:202c86537285adf7e5abeb64057c39ee7333ad8c8473b6dd6a9ddf3e72443286 — https://assets.openstax.org/oscms-prodcms/media/documents/CalculusVolume1-OP.pdf"
    - "Pishro-Nik, 4.1.1 Probability Density Function: P(a<X<=b)=integral_a^b f_X(u)du; integral of f_X over R = 1 (HTML fetched 2026-10-30), sha256:20e46d6010878510f8f2fb209f72164daf90f0c7379d7d764099b84fc4bdab68 — https://www.probabilitycourse.com/chapter4/4_1_1_pdf.php"
    - "Pishro-Nik, 4.1.2 Expected Value and Variance: LOTUS E[g(X)]=integral g(x)f_X(x)dx (4.3); Var(X)=EX^2-(EX)^2 (HTML fetched 2026-10-30), sha256:5ba159d4c07c821a4921efc16bf495e760abbb81638dd01897c7fab3693b05e6 — https://www.probabilitycourse.com/chapter4/4_1_2_expected_val_variance.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §2.2 p.60 (PDF p.68: point probability 0, f(x) not a probability, f(3/4) = 3/2 > 1); Definition 2.2 and Theorem 2.1 p.61 (PDF p.69: F(x) = integral of f, d/dx F(x) = f(x)); Example 2.17 p.68 (PDF p.76: 'The only continuous density function with this property is the exponential density'); §5.2 Exponential p.205-207 (PDF pp.213-215: f = lambda e^{-lambda x}, F = 1 - e^{-lambda x}, memoryless P(T > r+s | T > r) = P(T > s), lambda the reciprocal of the average), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 2 Univariate Random Variables (PDF p.3); Topic 3 learning outcome i) Central Limit Theorem (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorem 6.2 and the remark after it ('expectations add, whether or not the summands are mutually independent') pp.231-232 (PDF pp.239-240); §2.2 p.60 (PDF p.68: f(x) is not the probability of x, f(3/4) = 3/2); §5.1 Hypergeometric p.193 (PDF p.201: counts samples of size n; tends to binomial as N, k -> infinity), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Continuous Univariate Distributions.md
---

A **Continuous Univariate Distribution** describes the probability law of a single random variable $X$ that can take any value in a continuous interval or union of continuous intervals.

> $$P(a \leq X \leq b) = \int_a^b f(x)\, dx$$

- The probability density function (PDF) $f(x)$ must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\infty} f(x)\,dx = 1$.
- Individual point probabilities are zero; all probabilities are computed as areas under $f$:
- The CDF and the density are two views of the same object: $F(x) = \int_{-\infty}^{x} f(t)\,dt$ and $f(x) = F'(x)$. For anything phrased as a tail probability, work from the survival function $S(x) = 1 - F(x)$ instead.
- **Symmetric densities.** A density symmetric about $m$ satisfies $f(m + x) = f(m - x)$: the density on one side of $m$ is the mirror image of the density on the other. A density given on one side therefore determines it on the other, $f(t) = f(2m - t)$. Exactly half the probability lies on each side, $P(X \leq m) = P(X \geq m) = 1/2$, so $m$ is the median. A percentile above the median solves $P(m < X \leq x_p) = p - 1/2$. For instance, if $X$ is symmetric about 4 and $P(4 < X \leq 5) = 0.3$, the 80th percentile is 5.
- **Piecewise densities.** When $f$, or the function being averaged against it, is defined in pieces, split every integral at each breakpoint of both, use the matching branch on each subinterval and add. A probability is the sum of the integrals over the pieces the interval covers (an interval inside one piece needs only that branch). An expectation $E[g(X)]$ is the sum over the pieces of $\int g(x)\,f(x)\,dx$, so $E[X]$ is the sum of $\int x\,f(x)\,dx$ over each piece. A normalizing constant comes from integrating every piece over the whole support.

> [!idea] The idea
> A loss can be any amount in an interval, not just a whole number of dollars. A continuous univariate distribution spreads probability along the interval the way mass is spread along a rod. No single point holds any of it. The density is probability per unit length, so only an area under it is a probability. That is why $P(X < b)$ and $P(X \leq b)$ are equal, why a density can be larger than 1, and why the slope of the CDF is the density.

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
- Apart from a uniform with $a < 0$, the normal is the only one on this list that can go negative, and the only one with no lower bound at all. That is a red flag if the quantity is a loss.
- Insurance provisions ([[Deductible|deductibles]], [[Benefit Limit|limits]], [[Coinsurance Percentage|coinsurance]]) transform whichever severity distribution is chosen (see [[Transformations of Random Variables]]).

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

> [!tip]- How it appears on the exam
> - **Exam P** (Univariate Random Variables): a density given by formula, often with an unknown constant and often in pieces, with a probability, conditional probability, mean, median or percentile to find. The first step is usually the constant.
> - **Exam P**: a story to identify, then a probability or a percentile of it. The story may be a lifetime that is exponential with a given mean or median, a value equally likely over a range or a total approximated by a normal.
> - **Exam P**: the distribution of a payment or a function of $X$, built from the density of $X$ (see [[Transformations of Random Variables]]).

> [!warning]- Exam traps
> - **Integrating off the support.** A density stated on $0 < x < 2$ is zero elsewhere. Integrating the formula past 2, or from $-\infty$, gives a wrong probability, or an integral that diverges. Set the limits from the support first.
> - **Mean or rate in the exponential.** With mean $\theta$ the CDF is $1 - e^{-x/\theta}$. Writing $e^{-\theta x}$ treats the mean as if it were the rate $1/\theta$, and the result is a very different number. Check which parameter the question gives.
> - **Memorylessness used where it doesn't hold.** $P(X > a + b \mid X > a) = P(X > b)$ only for the exponential. For any other density compute the ratio $S(a + b)/S(a)$.
