---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:824bd7af821bac0f75237d087d90291399143a4717c25f3f3db2650d2f2f3864
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §3.2.1 CDF: F_X(x)=P(X<=x), defined for discrete, continuous and mixed; discrete CDF a staircase, jump = P(X=x), sha256:ddcdb7ea63d9e918e1d8e69af197212e089af8cf665730306927c861bd3f5f6f — https://www.probabilitycourse.com/chapter3/3_2_1_cdf.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 2.7 Distribution and quantile functions: F increasing, right-continuous, F(x^-)=P(X<x), limits 0 and 1; right-tail function; quantiles, sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §4.1.0: continuous CDF has no jumps; P(X=x)=0; < and <= agree, sha256:c2345faca7920d0c2971d4cc039c129b803ecb6d3f121ea89683da5cab5ece5b — https://www.probabilitycourse.com/chapter4/4_1_0_continuous_random_vars_distributions.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §4.1.1 PDF: f=F' where differentiable; probability per unit length; P(x<X<=x+d)~f(x)d; F=int f; int f=1, sha256:02e4d8947edff66799161896805adc05409f35f8774c1c912f5c5102b47cb3fd — https://www.probabilitycourse.com/chapter4/4_1_1_pdf.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §4.3.1 Mixed random variables: neither discrete nor continuous; jump = P(Y=y); int c + sum P(Y=y_k)=1; EY = int y c(y) dy + sum y_k P(Y=y_k), sha256:2abab6d01f448078588fa3991835c49223be0e6c433904a165147ddf6a2dd0d7 — https://www.probabilitycourse.com/chapter4/4_3_1_mixed.php"
    - "SOA Exam C tables (Loss Models 3rd ed. Appendix A excerpts), A.2.3.1 Pareto (E[X^k] for -1<k<alpha, no M(t)) PDF p.8; A.3.2.1 Gamma (M(t)=(1-theta t)^-alpha, t<1/theta; E[X^k]) PDF p.9; A.3.3.1 Exponential (M(t), E[X^k]=theta^k k!, E[X^x]=theta(1-e^{-x/theta})) and A.5.1.1 Lognormal (E[X^k]=exp(k mu + k^2 sigma^2/2), no M(t)) PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA, Exam P syllabus, November 2026, Topic 2 Univariate Random Variables, LOs a)-f) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cumulative Distribution Function (CDF).md
---

![[Media/Figures/Cumulative_Distribution_Function_CDF.svg|340]]

A **Cumulative Distribution Function (CDF)** is the function that gives, for each $x$, the [[Probability|probability]] that a [[Random Variable|random variable]] $X$ takes a value at most $x$. The CDF of $X$ is

> $$F(x) = P(X \leq x)$$

Every CDF rises from 0 to 1 and never decreases. The probability that $X$ exceeds $x$ is $1 - F(x)$, called the survival function $S(x)$.

> [!example]- A loss $X$ has CDF $F(x) = 1 - e^{-x/1000}$ for $x \geq 0$. What is the probability that a loss exceeds 1,000? {Example}
> - $F(1000) = 1 - e^{-1} = 0.6321$ is the probability of a loss of at most 1,000.
> - The probability of a loss above 1,000 is $1 - 0.6321 = 0.3679$.

## The CDF of a continuous random variable

For a [[Continuous Random Variable|continuous random variable]] with [[Probability Density Function (PDF)|density]] $f$, the CDF is the area under $f$ up to $x$:

> $$F(x) = \int_{-\infty}^{x} f(t)\,dt$$

- $t$ is the variable of integration.

The integral starts at the lower end of the support, below which $f$ is 0. Below the support $F(x) = 0$, and from the upper end of the support on $F(x) = 1$.

> [!example]- A loss $X$ is uniform on $[0, 5]$, so its density is $\frac{1}{5}$ there. What is its CDF? {Example}
> - For $x < 0$ there is no area yet, so $F(x) = 0$.
> - For $0 \leq x \leq 5$, $F(x) = \int_0^x \frac{1}{5}\,dt = \frac{x}{5}$.
> - For $x > 5$, all the area is counted, so $F(x) = 1$.

## Probabilities of intervals

The probability that $X$ falls in an interval is how much the CDF grows across it:

> $$P(a < X \leq b) = F(b) - F(a)$$

For a continuous $X$, single values have probability 0, so it doesn't matter whether either endpoint is included.

> [!example]- A loss $X$ is uniform on $[0, 5]$, with $F(x) = \frac{x}{5}$. What are $P(2 \leq X \leq 4)$ and $P(X \geq 2 \mid X \leq 4)$? {Example}
> - The first is the growth of the CDF from 2 to 4, $F(4) - F(2) = 0.8 - 0.4$, so $P(2 \leq X \leq 4) = 0.4$.
> - Given $X \leq 4$, the event $X \geq 2$ is the interval $[2, 4]$, so the [[Conditional Probability|conditional probability]] divides by $F(4) = 0.8$.
> - The second is $\frac{0.4}{0.8} = 0.5$.

## The CDF of a discrete random variable

The CDF of a [[Discrete Random Variable|discrete random variable]] is a step function. It jumps at each value $x$ by the probability of that value:

> $$P(X = x) = F(x) - F(x^-)$$

- $F(x^-)$ is the limit of $F$ from the left at $x$.

At a jump, $F(x)$ already includes the probability at $x$. For a count on $0, 1, 2, \ldots$, $P(X = k) = F(k) - F(k - 1)$, and "at most $k$" is $F(k)$, the sum of the probabilities of $0$ through $k$.

> [!example]- A payment $Y$ has CDF $F(y) = 0$ for $y < 0$, $F(y) = 0.25 + 0.5y$ for $0 \leq y < 1$ and $F(y) = 1$ for $y \geq 1$. What are $P(Y = 0)$, $P(Y = 1)$ and $P(0.5 < Y < 1)$? {Example}
> - At 0, $F$ jumps from 0 to 0.25, so $P(Y = 0) = 0.25$.
> - Just below 1, $F$ approaches 0.75, and at 1 it is 1, so $P(Y = 1) = 0.25$.
> - The event $0.5 < Y < 1$ excludes 1, so it uses the left limit $F(1^-)$:
>
> $$
> \begin{aligned}
> P(0.5 < Y < 1) &= F(1^-) - F(0.5) \\
> &= 0.75 - 0.5 \\
> &= 0.25
> \end{aligned}
> $$

## The CDF of the largest of several values

If $X_1, \ldots, X_n$ are independent with common CDF $F$, their largest value is at most $x$ only when every one of them is. So the CDF of the largest value is

> $$P(\max(X_1, \ldots, X_n) \leq x) = F(x)^n$$

> [!example]- Three independent losses are each uniform on $[0, 1]$. What is the probability that the largest is at most 0.5? {Example}
> - Each loss has $F(0.5) = 0.5$.
> - All three must be at most 0.5, so the probability is $0.5^3 = 0.125$.

> [!trap] $\leq$ or $<$ at a jump
> At a jump the two differ by the jump. With the payment above, $P(Y \leq 0) = F(0) = 0.25$ but $P(Y < 0) = 0$. Use $F(x)$ for an event that includes $x$, and the left limit $F(x^-)$ for one that excludes it.
