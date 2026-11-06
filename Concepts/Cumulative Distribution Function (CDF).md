---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:0daad8b395d037d1bf47f7774dcd9b3179e16962c20e50ce2f9c791ce778ca8c
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

The **Cumulative Distribution Function (CDF)** of a random variable $X$ gives the probability that $X$ takes a value less than or equal to $x$.

> $$F(x) = P(X \leq x)$$

- For a continuous random variable, $F(x) = \int_{-\infty}^{x} f(t)\, dt$
- For a [[Discrete Random Variable|discrete random variable]], $F(x) = \sum_{k \le x} p(k)$, a step function.
- The CDF is non-decreasing and right-continuous
- $\lim_{x \to -\infty} F(x) = 0$ and $\lim_{x \to \infty} F(x) = 1$
- The survival function is $S(x) = 1 - F(x) = P(X > x)$.

> [!idea] The idea
> The CDF keeps a running total of probability from the left. Every random variable has one, whether it is discrete, continuous or mixed. So one tool answers any interval question: the probability between two points is how much the running total grows between them.

![[Media/Figures/Cumulative_Distribution_Function_CDF.svg|340]]

## One loss, read off the CDF

A loss $X$ is exponential with mean 1,000, so its CDF is $F(x) = 1 - e^{-x/1000}$ for $x \ge 0$.

| $x$ | 0 | 500 | 1,000 | 1,500 | 2,000 |
|---|---|---|---|---|---|
| $F(x)$ | 0 | 0.3935 | 0.6321 | 0.7769 | 0.8647 |

- The running total starts at 0 and climbs toward 1. It never falls, because adding more of the line can only add probability.
- $P(X \le 1000) = 0.6321$. A loss above 1,000 has probability $S(1000) = 0.3679$.

## Probabilities of intervals

What is the probability of a loss between 500 and 1,500? It is the growth in the running total over that stretch.

> $$P(a < X \le b) = F(b) - F(a)$$

- For the exponential loss, $P(500 < X \le 1500) = 0.7769 - 0.3935 = 0.3834$.
- The CDF also gives conditional probabilities. Given a loss above 500, the probability it is at most 1,500 is $(F(1500) - F(500)) / (1 - F(500)) = 0.6321$. See [[Conditional Probability]].

## Steps and jumps

Not every CDF climbs smoothly. A CDF jumps wherever a single value carries probability, and the size of the jump is that probability.

> $$P(X = x) = F(x) - F(x^-)$$

- Put a deductible of 500 on the loss. The payment $Y = (X - 500)_+$ is 0 whenever $X \le 500$. So $F_Y$ jumps from 0 to 0.3935 at $y = 0$.
- After the jump, $F_Y(y) = F(y + 500)$ rises smoothly. $Y$ is a mixed random variable. See [[Random Variable]].
- A discrete count's CDF is all jumps. It is flat between its possible values.

Right-continuity says which side of a jump the CDF takes. At a jump, $F(x)$ already includes the mass at $x$.

> [!trap] $\le$ or $<$ at a jump
> At a jump, $P(Y \le 0) = F_Y(0) = 0.3935$ but $P(Y < 0) = 0$. For an event that includes the jump point, use $F(x)$. For one that excludes it, use the left-hand limit $F(x^-)$.

## Running the CDF backwards

A question may give the probability and ask for the value. The $p$-th [[Percentile|percentile]] is the $x$ where the CDF reaches $p$.

- The [[Median|median]] of the exponential loss solves $1 - e^{-x/1000} = 0.5$. So $x = 1000 \ln 2 \approx 693$.
- The median is below the mean of 1,000, because a few large losses pull the mean up.

## The density and the CDF

For a continuous random variable, the [[Probability Density Function (PDF)|density]] is the slope of the CDF, and the CDF is the area under the density.

> $$f(x) = F'(x)$$

- Differentiating $1 - e^{-x/1000}$ gives $f(x) = \frac{1}{1000}e^{-x/1000}$.
- A CDF defined in pieces gives a density in pieces. A jump between pieces is a point mass, not part of the density.

## Try it

> [!example]- CDF and Probability for a Uniform Variable {Example}
> A loss $X$ is uniform on $[0, 5]$, in thousands. What is the CDF, and what is $P(2 \leq X \leq 4)$?
>
> > [!answer]-
> > **Plan:** integrate the flat density to get the CDF, then take the difference at the two ends.
> >
> > The PDF is $f(x) = 1/5$ for $0 \leq x \leq 5$, so the CDF is:
> > $$F(x) = \frac{x}{5}, \quad 0 \leq x \leq 5$$
> > $$
> > \begin{align*}
> > P(2 \leq X \leq 4) &= F(4) - F(2) \\
> >                    &= \tfrac{4}{5} - \tfrac{2}{5} \\
> >                    &= 0.4
> > \end{align*}
> > $$
> > Why doesn't the $\le$ at 2 matter? The variable is continuous, so the single value 2 has no mass.

> [!example]- A CDF with a jump {Example}
> A payment $Y$ has CDF $F(y) = 0$ for $y < 0$, $F(y) = 0.25 + 0.5y$ for $0 \le y < 1$, and $F(y) = 1$ for $y \ge 1$. Find $P(Y = 0)$, $P(Y = 1)$ and $P(0.5 < Y < 1)$.
>
> > [!answer]-
> > **Plan:** read each jump as a mass, and take differences of the CDF for the interval.
> >
> > - At 0, $F$ jumps from 0 to 0.25, so $P(Y = 0) = 0.25$.
> > - Just below 1, $F$ approaches 0.75. At 1 it is 1, so $P(Y = 1) = 0.25$.
> > - $P(0.5 < Y < 1) = F(1^-) - F(0.5) = 0.75 - 0.5 = 0.25$.
> >
> > Using $F(1) = 1$ in the last step would add the mass at 1 to an event that excludes it.

> [!example]- A percentile from a CDF {Example}
> A loss has CDF $F(x) = 1 - \left(\frac{2000}{2000 + x}\right)^3$ for $x \ge 0$. Find the 90th percentile.
>
> > [!answer]-
> > **Plan:** set the CDF equal to 0.9 and solve for $x$.
> > $$
> > \begin{align*}
> > \left(\frac{2000}{2000 + x}\right)^3 &= 0.1 \\
> > \frac{2000}{2000 + x} &= 0.1^{1/3} \\
> > x &= 2000\left(0.1^{-1/3} - 1\right) \\
> >   &\approx 2309
> > \end{align*}
> > $$
> > One loss in ten exceeds about 2,309.

> [!warning]- Exam traps
> - **Using the wrong side of a jump.** $P(X < x) = F(x^-)$ and $P(X \le x) = F(x)$. For a continuous variable they agree, but at a point mass they differ by the mass.
> - **Confusing $F$ with $S$.** "The probability a loss exceeds $x$" is $1 - F(x)$, not $F(x)$.
> - **Differentiating across a jump.** The density comes from the smooth pieces only. The jumps are separate point masses.
> - **A CDF that falls or ends below 1.** If a candidate CDF decreases somewhere, or its limit is not 1, it is not a CDF. Check before using it.
