---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:9cf414c829bfe5fee562fd6ae01ff381756db81f19a45e3bce3504085108803e
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Exercise 6.2.23 p.267 (PDF p.275) and Exercise 6.3.17(a)-(b) p.281 (PDF p.289), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Random: Probability, Mathematical Statistics, Stochastic Processes (randomservices.org), Expected Value > Covariance and Correlation (definitions; cov = E(XY)-E(X)E(Y); independent implies uncorrelated, converse fails; correlation dimensionless), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Covariance and Correlation (Cov definition and E[XY]-EXEY form; rho = Cov/(sigma_X sigma_Y); -1<=rho<=1; rho=+-1 iff Y=aX+b; rho(aX+b,cY+d)=rho(X,Y) for a,c>0; independent implies uncorrelated, converse not necessarily true), sha256:b6bc17d7f786f7ac8d2836f42d6524c99e8909254d473f1edef7909f1da9620e — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php"
    - "SOA Probability Exam syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes 3a-3f, PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.5 Covariance and Correlation: cov(X,Y) = 0 means uncorrelated; independent implies uncorrelated, converse fails; cor = cov/(sd(X) sd(Y)), HTML fetched 2026-10-30, sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Covariance.md
---

**Covariance** $\text{Cov}(X, Y)$ measures how two [[Random Variable|random variables]] $X$ and $Y$ move together. Covariance is positive when large values of $X$ tend to come with large values of $Y$, and negative when they tend to come with small values of $Y$.

> $$\text{Cov}(X, Y) = E\big[(X - \mu_X)(Y - \mu_Y)\big]$$

> $$\text{Cov}(X, Y) = E[XY] - E[X]\,E[Y]$$

- where $\mu_X = E[X]$ and $\mu_Y = E[Y]$ are the two means.
- $\text{Cov}(X, X) = \text{Var}(X)$. [[Variance]] is the covariance of a variable with itself.
- [[Independent Random Variables]] have covariance 0. The converse fails: covariance 0 does not imply independence. Variables with covariance 0 are called **uncorrelated**.
- The [[Correlation Coefficient]] rescales covariance to lie between $-1$ and $1$. See also [[Covariance and Correlation Coefficient]].

> [!idea] The idea
> Each outcome contributes the product of its two deviations from the means. The product is positive when both values sit on the same side of their means and negative when they sit on opposite sides. Covariance averages those products, so its sign says which pattern dominates.

![[Media/Figures/Covariance.svg|340]]

## Do two policies claim together?

A policyholder holds an auto policy and a home policy with the same insurer. Let $X$ be the number of auto claims in a year and $Y$ the number of home claims. Their joint probabilities are:

| $X$ \ $Y$ | 0 | 1 | 2 | Total |
|---|---|---|---|---|
| 0 | 0.36 | 0.18 | 0.06 | 0.60 |
| 1 | 0.10 | 0.20 | 0.10 | 0.40 |
| Total | 0.46 | 0.38 | 0.16 | 1 |

The means come from the totals: $E[X] = 0.40$ and $E[Y] = 0.38 + 2(0.16) = 0.70$.

Each cell's deviation product $(x - 0.4)(y - 0.7)$ shows whether that outcome pulls the covariance up or down.

| Cell | Probability | Product | Weighted |
|---|---|---|---|
| (0, 0) | 0.36 | 0.28 | 0.1008 |
| (0, 1) | 0.18 | $-0.12$ | $-0.0216$ |
| (0, 2) | 0.06 | $-0.52$ | $-0.0312$ |
| (1, 0) | 0.10 | $-0.42$ | $-0.0420$ |
| (1, 1) | 0.20 | 0.18 | 0.0360 |
| (1, 2) | 0.10 | 0.78 | 0.0780 |

The weighted products add to $\text{Cov}(X, Y) = 0.12$. The positive cells (no claims at all, or claims on both) outweigh the mixed ones. A policyholder with an auto claim tends to have more home claims too.

## The shortcut through $E[XY]$

Building the deviation table is slow. Expanding the product gives a faster route, because only cells with both values nonzero contribute to $E[XY]$.

> $$E[XY] = (1)(1)(0.20) + (1)(2)(0.10) = 0.40$$

> $$\text{Cov}(X, Y) = 0.40 - (0.40)(0.70) = 0.12$$

The product $E[X]E[Y] = 0.28$ is what $E[XY]$ would be if the two policies were independent. Covariance is the excess of the actual $E[XY]$ over that benchmark.

## Covariance of sums and multiples

A common question asks for the covariance of combinations, such as total claims $T = X + Y$ against home claims $Y$. Covariance is linear in each argument, so it splits term by term.

> $$\text{Cov}(aX + b,\ cY + d) = ac\,\text{Cov}(X, Y)$$

> $$\text{Cov}(X + Y,\ Z) = \text{Cov}(X, Z) + \text{Cov}(Y, Z)$$

- Constants $b$ and $d$ drop out, because shifting a variable doesn't change its deviations.
- In the example, $\text{Var}(Y) = 1.02 - 0.70^2 = 0.53$, so $\text{Cov}(T, Y) = \text{Cov}(X, Y) + \text{Var}(Y) = 0.12 + 0.53 = 0.65$.

The same splitting gives the variance of a sum. With $\text{Var}(X) = 0.40 - 0.40^2 = 0.24$:

> $$\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y) + 2\,\text{Cov}(X, Y)$$

The total claim count has variance $0.24 + 0.53 + 2(0.12) = 1.01$. See [[Moments for Linear Combinations]] for more than two terms.

> [!trap] Dropping the covariance term
> $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$ only when $\text{Cov}(X, Y) = 0$. Here that shortcut gives 0.77 instead of 1.01. Also, the covariance enters twice, once for each ordering of the pair.

## Covariance of two events

When both variables are indicators (1 if an event occurs, 0 if not), covariance reduces to probabilities. For indicators $I_A$ and $I_B$ of events $A$ and $B$:

> $$\text{Cov}(I_A, I_B) = P(A \cap B) - P(A)\,P(B)$$

Let $A$ be "an auto claim" and $B$ be "at least one home claim". From the table, $P(A) = 0.40$, $P(B) = 0.54$ and $P(A \cap B) = 0.30$. The covariance is $0.30 - 0.216 = 0.084$. A positive covariance means the events occur together more often than independence would predict.

## Zero covariance is not independence

Covariance only detects a *linear* tendency. Let $X$ take the values $-1$, $0$ and $1$ with equal probability, and let $Y = X^2$. Then $E[XY] = E[X^3] = 0$ and $E[X] = 0$, so $\text{Cov}(X, Y) = 0$. Yet $Y$ is completely determined by $X$. The positive and negative deviations of $X$ cancel against the same values of $Y$.

## On other exams

- In investment theory (CAS Exam 9), an asset's beta is its covariance with the market return divided by the market return's variance: $\beta_i = \text{Cov}(R_i, R_M) / \text{Var}(R_M)$.
- A portfolio's return is a weighted sum of asset returns, so its variance is a sum of weighted variances and covariances. That is the formula on [[Moments for Linear Combinations]].

## Try it

> [!example]- Covariance from moments {Example}
> For a surgical claim $X$ and its associated hospital claim $Y$, $E[X] = 3$, $E[Y] = 5$ and $E[XY] = 17$. Find $\text{Cov}(X, Y)$.
>
> > [!answer]-
> > **Plan:** use the shortcut formula.
> > $$\text{Cov}(X, Y) = 17 - (3)(5) = 2$$
> > The positive covariance says larger surgical claims tend to come with larger hospital claims.

> [!example]- Covariance hidden in two variances {Example}
> Losses $X$ and $Y$ satisfy $\text{Var}(X + Y) = 20$ and $\text{Var}(X - Y) = 12$. Find $\text{Cov}(X, Y)$.
>
> > [!answer]-
> > **Plan:** expand both variances, then subtract to cancel the individual variances.
> > $$
> > \begin{align*}
> > \text{Var}(X + Y) &= \text{Var}(X) + \text{Var}(Y) + 2\,\text{Cov}(X, Y) \\
> > \text{Var}(X - Y) &= \text{Var}(X) + \text{Var}(Y) - 2\,\text{Cov}(X, Y)
> > \end{align*}
> > $$
> > Subtracting the second line from the first leaves $4\,\text{Cov}(X, Y) = 20 - 12 = 8$, so $\text{Cov}(X, Y) = 2$.

> [!example]- A surcharge on one part of the claim {Example}
> A claim has a surgical part $X$ and a hospital part $Y$, with $\text{Var}(X) = 4$, $\text{Var}(Y) = 9$ and $\text{Cov}(X, Y) = 1$. Let $C_1 = X + Y$ be the claim before a 20% surcharge on the hospital part and $C_2 = X + 1.2Y$ the claim after it. Find $\text{Cov}(C_1, C_2)$.
>
> > [!answer]-
> > **Plan:** split the covariance term by term, using bilinearity.
> > $$
> > \begin{align*}
> > \text{Cov}(C_1, C_2) &= \text{Cov}(X, X) + 1.2\,\text{Cov}(X, Y) \\
> > &\quad + \text{Cov}(Y, X) + 1.2\,\text{Cov}(Y, Y) \\
> > &= 4 + 1.2 + 1 + 10.8 \\
> > &= 17
> > \end{align*}
> > $$
> > Why does $\text{Var}(X)$ appear? Because $X$ is part of both claims, and $\text{Cov}(X, X) = \text{Var}(X)$.

> [!warning]- Exam traps
> - **Dropping the $2\,\text{Cov}$ term.** The variance of a sum needs the covariance, counted twice.
> - **Reading covariance 0 as independence.** $Y = X^2$ with $X$ symmetric about 0 is uncorrelated with $X$ but fully dependent on it.
> - **Letting constants change the covariance.** $\text{Cov}(X + 100, Y) = \text{Cov}(X, Y)$, while $\text{Cov}(2X, Y) = 2\,\text{Cov}(X, Y)$.
> - **Stopping at $E[XY]$.** $E[XY]$ is not the covariance until $E[X]E[Y]$ is subtracted.
