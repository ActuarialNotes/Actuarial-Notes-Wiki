---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:eaf52e7cb10899606bc67abdcdae777fc325f8532f0a7068736f0b446272d9c1
  sources:
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 3.5 Conditional Distributions: g(x|y) = f(x,y)/h(y) for fixed y; the denominator is the normalizing constant, HTML fetched 2026-11-06, sha256:ad76250f09b0c4438869894ebb75a07a5cf0465944d7b5ff2b3c270fcc3b369e — https://www.randomservices.org/random/dist/Conditional.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.3 Conditioning and Independence: f_X|Y = f_XY/f_Y; E[X|Y=y], Var(X|Y=y); independence gives f_X|Y = f_X, E[XY] = EX EY and E[g(X)h(Y)] = E[g(X)]E[h(Y)], HTML fetched 2026-11-06, sha256:5d697207bda40aa9ff1ce9a59db1231fe112d2fd061fed5ce08921d8c889c03a — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 conditional probability with E as the new sample space (PDF p.141), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Probability Exam (Exam P) syllabus, November 2026, Topic 3 outcomes b-d (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Conditional Probability Function.md
---

![[Media/Figures/Conditional_Probability_Function.svg|340]]

A **Conditional Probability Function** gives the distribution of one [[Random Variable|random variable]] given the value of another. The conditional probability function of $X$ given $Y = y$ is

> $$f_{X \mid Y}(x \mid y) = \frac{f(x, y)}{f_Y(y)}$$

- $f(x, y)$ is the [[Joint Probability Function|joint probability function]] of $X$ and $Y$.
- $f_Y(y) > 0$ is the [[Marginal Probability Function|marginal probability]] that $Y = y$.

For continuous random variables, the same formula divides the [[Joint Probability Density Function|joint density]] by the marginal density. It is [[Conditional Probability|conditional probability]] applied to every value of $X$ at once.

> [!idea] The idea
> Knowing $Y = y$ leaves only the slice of the joint distribution at that $y$, and dividing by the slice's total makes it add to 1.

> [!example]- $X$ and $Y$ are the numbers of auto and home claims, with the joint probability function below. Given one auto claim, what is the distribution of home claims? {Example}
> The joint probability function:
>
> | | $Y = 0$ | $Y = 1$ | $Y = 2$ |
> | --- | --- | --- | --- |
> | $X = 0$ | 0.30 | 0.15 | 0.05 |
> | $X = 1$ | 0.20 | 0.20 | 0.10 |
>
> - Only the row $X = 1$ can still happen. It adds to $f_X(1) = 0.50$.
> - Dividing each value by 0.50 gives 0.40, 0.40 and 0.20.
> - So $P(Y = 2 \mid X = 1) = 0.20$, and the three probabilities add to 1.

> [!trap] Dividing by the wrong total
> $P(Y = 2 \mid X = 1)$ divides by $f_X(1) = 0.50$, the total of the row that is given. Dividing by $f_Y(2) = 0.15$ gives $\frac{0.10}{0.15} = 0.67$, which answers the reverse question, $P(X = 1 \mid Y = 2)$.

## Conditioning on an event

The conditional probability function of $X$ given an [[Event|event]] $E$ is

> $$P(X = x \mid E) = \frac{P(X = x \text{ and } E)}{P(E)}$$

When $E$ is a condition on $X$ alone, the numerator is $P(X = x)$ for each $x$ in $E$ and 0 otherwise.

> [!example]- A fair die is rolled. Given that the roll is at least 4, what is the distribution of the roll $X$? {Example}
> - The event "at least 4" has probability $\frac{3}{6} = \frac{1}{2}$.
> - For $x = 4, 5, 6$, $P(X = x \mid X \ge 4)$ is $\frac{1/6}{1/2} = \frac{1}{3}$.
> - For $x = 1, 2, 3$ the conditional probability is 0.

## The conditional mean

A conditional distribution has its own mean:

> $$E[Y \mid X = x] = \sum_y y\, f_{Y \mid X}(y \mid x)$$

How the conditional means and variances combine into the overall variance is on [[Variance for Conditional and Marginal Distributions]].

> [!example]- For the auto and home claims above, what is the expected number of home claims given one auto claim? {Example}
> - Given $X = 1$, $Y$ is 0, 1 or 2 with probabilities 0.40, 0.40 and 0.20.
> - $E[Y \mid X = 1]$ is $1(0.40) + 2(0.20) = 0.80$.

## Continuous random variables

For a joint density, the conditional density lives on the slice of the support at the given value, not on the whole range. A constant factor of $f(x, y)$ cancels between the numerator and the denominator.

> [!example]- $X$ and $Y$ have joint density $f(x, y) = 6x$ for $0 < x < y < 1$. What is the conditional density of $X$ given $Y = y$, and its mean? {Example}
> - For a fixed $y$, $x$ runs from 0 to $y$, so $f_Y(y) = \int_0^y 6x\, dx = 3y^2$.
> - The conditional density is $\frac{6x}{3y^2} = \frac{2x}{y^2}$ for $0 < x < y$.
> - Its mean is
>
> $$E[X \mid Y = y] = \int_0^y x \cdot \frac{2x}{y^2}\, dx = \frac{2y}{3}$$
