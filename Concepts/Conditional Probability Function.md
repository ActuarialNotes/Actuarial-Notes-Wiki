---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:eb7735ece7ca5d550176d2ee63b1fb5c32057806fa77f0f0054df237f103cc0f
  sources:
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 3.5 Conditional Distributions: g(x|y) = f(x,y)/h(y) for fixed y; the denominator is the normalizing constant, HTML fetched 2026-11-06, sha256:ad76250f09b0c4438869894ebb75a07a5cf0465944d7b5ff2b3c270fcc3b369e — https://www.randomservices.org/random/dist/Conditional.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.3 Conditioning and Independence: f_X|Y = f_XY/f_Y; E[X|Y=y], Var(X|Y=y); independence gives f_X|Y = f_X, E[XY] = EX EY and E[g(X)h(Y)] = E[g(X)]E[h(Y)], HTML fetched 2026-11-06, sha256:5d697207bda40aa9ff1ce9a59db1231fe112d2fd061fed5ce08921d8c889c03a — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 conditional probability with E as the new sample space (PDF p.141), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Probability Exam (Exam P) syllabus, November 2026, Topic 3 outcomes b-d (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Conditional Probability Function.md
---

A **Conditional Probability Function** gives the distribution of one random variable given a specific value of another. It divides the joint probability by the probability of the given value, which is [[Conditional Probability|conditional probability]] applied to every value at once.

> $$P(X = x \mid Y = y) = \frac{P(X = x, Y = y)}{P(Y = y)}$$

> $$f_{X|Y}(x \mid y) = \frac{f(x, y)}{f_Y(y)}, \quad f_Y(y) > 0$$

- The numerator comes from the [[Joint Probability Function]] or the [[Joint Probability Density Function|joint density]], and the denominator is the [[Marginal Probability Function|marginal]] of the given variable.
- The conditional distribution integrates (or sums) to 1 over its support given the conditioning value.
- Rearranged, the formula builds a joint distribution from a marginal and a conditional: $p(x, y) = p_Y(y)\, p_{X \mid Y}(x \mid y)$.

> [!idea] The idea
> Once $Y = y$ is known, only the slice of the joint distribution at that $y$ can still happen. The slice has the right shape but its probabilities add to $P(Y = y)$, not to 1. Dividing by that total rescales the slice into a distribution.

![[Media/Figures/Conditional_Probability_Function.svg|340]]

## Given one auto claim, how many home claims?

A policyholder has an auto policy and a home policy. $X$ is the number of auto claims next year and $Y$ the number of home claims, with joint probability function

| | $Y=0$ | $Y=1$ | $Y=2$ |
|---|---|---|---|
| $X=0$ | 0.30 | 0.15 | 0.05 |
| $X=1$ | 0.20 | 0.20 | 0.10 |

**The policyholder had one auto claim. What is the distribution of home claims?** Only the row $X = 1$ can still happen. Its cells add to $p_X(1) = 0.50$, so divide each by 0.50.

| | $Y=0$ | $Y=1$ | $Y=2$ |
|---|---|---|---|
| given $X=0$ | 0.60 | 0.30 | 0.10 |
| given $X=1$ | 0.40 | 0.40 | 0.20 |
| marginal | 0.50 | 0.35 | 0.15 |

Each conditional row adds to 1. An auto claim shifts the home claims upward, from a 10% chance of two claims to 20%, so the two counts are dependent.

> [!trap] Dividing by the wrong total
> $P(Y = 2 \mid X = 1)$ divides by $p_X(1) = 0.50$, the total of the fixed row. Dividing by $p_Y(2) = 0.15$ gives $0.67$, which is $P(X = 1 \mid Y = 2)$, the reverse question.

## The conditional mean and variance

A conditional distribution has its own mean and variance, computed the usual way on the rescaled slice.

> $$E[Y \mid X = x] = \sum_y y\, p_{Y \mid X}(y \mid x)$$

- $E[Y \mid X = 1] = (1)(0.40) + (2)(0.20) = 0.80$ and $E[Y \mid X = 0] = 0.30 + 0.20 = 0.50$.
- Averaging over $X$ gives back the overall mean: $(0.50)(0.50) + (0.50)(0.80) = 0.65 = E[Y]$.
- $\text{Var}(Y \mid X = 1) = (0.40 + 0.80) - 0.80^2 = 0.56$.

How these combine into the overall variance is on [[Variance for Conditional and Marginal Distributions]].

## Building a joint distribution from a conditional

Questions often describe a pair in two steps: the distribution of one variable, then the other given its value. Each joint probability is then the marginal times the conditional, $p(x, y) = p_X(x)\, p_{Y \mid X}(y \mid x)$. For the policyholder, $p(1, 2) = (0.50)(0.20) = 0.10$.

Turning the condition around takes both steps. To find $P(X = 1 \mid Y = 2)$, build the column for $Y = 2$ and divide by its total: $0.10 / (0.05 + 0.10) = 2/3$. This is [[Bayes Theorem]] in the language of random variables.

## Continuous variables

For a joint density, the slice at $Y = y$ is the function $f(x, y)$ with $y$ held fixed. Divide it by the marginal density $f_Y(y)$.

Take $f(x, y) = 6x$ for $0 < x < y < 1$. The marginal of $Y$ is $f_Y(y) = \int_0^y 6x\, dx = 3y^2$, so

> $$f_{X \mid Y}(x \mid y) = \frac{6x}{3y^2} = \frac{2x}{y^2}, \quad 0 < x < y$$

The support of the conditional is the slice, here $0 < x < y$, not the whole interval $(0, 1)$. The conditional mean is $E[X \mid Y = y] = \int_0^y x \cdot 2x/y^2\, dx = 2y/3$.

## Spotting the kernel

The denominator $p_Y(y)$ does not depend on $x$, so the conditional PMF is proportional to the joint PMF with $y$ held fixed. Drop every factor that does not involve $x$, recognize what is left (the kernel) as a known family, and its normalizing constant follows.

Take $f(x, y) = x e^{-x(y+1)}$ for $x > 0$, $y > 0$. Given $X = x$, the factors in $y$ are $e^{-xy}$, the kernel of an [[Exponential Distribution|exponential]] with rate $x$. So $f_{Y \mid X}(y \mid x) = x e^{-xy}$ and $E[Y \mid X = x] = 1/x$, with no integral needed for the marginal.

## Try it

> [!example]- Conditional PDF from a Joint Density {Example}
> If $f(x,y) = 6(1-y)$ for $0 \leq x \leq y \leq 1$, what is $f_{X|Y}(x \mid y)$?
>
> > [!answer]-
> > **Plan:** find the marginal of $Y$ over the slice $0 \le x \le y$, then divide.
> >
> > First find the marginal PDF of $Y$:
> > $$f_Y(y) = \int_0^y 6(1-y)\, dx = 6y(1-y)$$
> > Then apply the conditional PDF formula:
> > $$f_{X|Y}(x \mid y) = \frac{6(1-y)}{6y(1-y)} = \frac{1}{y}, \quad 0 \leq x \leq y$$
> > Given $Y = y$, $X$ is uniformly distributed on $[0, y]$. The joint density does not depend on $x$, so the slice is flat.

> [!example]- Litigated claims {Example}
> A policy has $X$ claims, 0, 1 or 2 with probabilities 0.5, 0.3 and 0.2. Given $X = x$, the number $Y$ of litigated claims is binomial with $n = x$ and $p = 0.4$. Find $P(Y = 1)$ and $P(X = 2 \mid Y = 1)$.
>
> > [!answer]-
> > **Plan:** build the column $Y = 1$ as marginal times conditional, then divide one cell by the column total.
> > $$
> > \begin{align*}
> > p(1, 1) &= (0.3)(0.4) = 0.120 \\
> > p(2, 1) &= (0.2)\,(2)(0.4)(0.6) = 0.096 \\
> > P(Y = 1) &= 0.120 + 0.096 = 0.216
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > P(X = 2 \mid Y = 1) &= \frac{0.096}{0.216} \\
> >                     &= 0.4444
> > \end{align*}
> > $$
> > Without the condition, $P(X = 2) = 0.2$. One litigated claim makes two claims more likely, because a policy with more claims has more chances to have one litigated.

> [!example]- A conditional mean from the kernel {Example}
> Two random variables have joint density $f(x, y) = x e^{-x(y+1)}$ for $x > 0$, $y > 0$. Find $E[Y \mid X = 2]$ and $P(Y > 1 \mid X = 2)$.
>
> > [!answer]-
> > **Plan:** hold $x = 2$ fixed, keep the factors in $y$, and recognize the family.
> >
> > With $x = 2$ the joint density is $2e^{-2}\,e^{-2y}$. The factor in $y$ is $e^{-2y}$, an exponential kernel with rate 2, so $f_{Y \mid X}(y \mid 2) = 2e^{-2y}$.
> > $$
> > \begin{align*}
> > E[Y \mid X = 2] &= \frac{1}{2} \\
> > P(Y > 1 \mid X = 2) &= e^{-2} \\
> >                     &= 0.1353
> > \end{align*}
> > $$
> > The constant $2e^{-2}$ is dropped because the conditional density must integrate to 1, which fixes the constant anyway.

> [!warning]- Exam traps
> - **Dividing by the wrong marginal.** $P(X = x \mid Y = y)$ divides by $p_Y(y)$, the total of the fixed slice. Check that the slice sums to 1.
> - **The whole interval as the support.** Given $Y = y$ on a triangle such as $0 < x < y$, the conditional lives on $(0, y)$. Integrating it over $(0, 1)$ gives a total above 1.
> - **Reversing the condition.** Building $p(x, y)$ from $p_X$ and $p_{Y \mid X}$ and then reading $P(Y = y \mid X = x)$ off the data answers the wrong question. Build the column for the given value and divide.
> - **Conditional mean confused with the joint mean.** $E[Y \mid X = x]$ is a function of $x$. Averaging it over $X$ gives $E[Y]$, a single number.
