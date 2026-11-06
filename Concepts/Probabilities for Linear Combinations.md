---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:2b478e56293a4dfb2e25ece2c078a9fefe8a53acebecc1a414cc931c2974aa69
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 7.1 convolution of independent integer-valued variables (printed p.286, PDF p.294), Example 7.5 sum of two independent normals (PDF p.302), Thms 9.4 and 9.6 (PDF pp.351, 365), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q124 (sum of independent Poisson variables is Poisson with the means added, PDF p.37), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "Siegrist, Random (randomservices.org), The Poisson Process > The Poisson Distribution (closed under independent sums), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "SOA Exam P normal distribution table (rev. 4/29/21), row z = 2.2 (column .02 = 0.9868), sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probabilities for Linear Combinations.md
---

**Probabilities for Linear Combinations** are probabilities of events such as $L \le s$ for a weighted sum $L = c_1 X_1 + c_2 X_2 + \cdots + c_n X_n$ of random variables. Probabilities for linear combinations need the distribution of $L$, not just its mean and variance, and that distribution comes from the joint distribution of the $X_i$.

> $$P(X + Y = s) = \sum_{x} P(X = x,\ Y = s - x)$$

> $$P(X + Y = s) = \sum_{x} P(X = x)\,P(Y = s - x)$$

> $$L \sim N\!\left(\sum_i c_i\mu_i,\ \sum_i c_i^2\sigma_i^2\right)$$

- The first formula holds for any discrete pair. It adds the joint probabilities of every pair of values that gives the total $s$.
- The second is the first for independent $X$ and $Y$, and is called a [[Convolution|convolution]].
- The third holds when $X_1, \ldots, X_n$ are independent [[Normal Distribution|normal]] variables with means $\mu_i$ and standard deviations $\sigma_i$.
- For a sum of many i.i.d. terms, the [[Central Limit Theorem]] gives an approximate normal distribution instead. See [[Normal Approximation]].

> [!idea] The idea
> An event about $L$ is a set of outcomes of the $X_i$. Its probability adds up the outcomes in that set, which is a diagonal of a joint table or a region under a joint density. Normal variables are the convenient case, because a weighted sum of independent normals is again normal and only its mean and variance are needed.

![[Media/Figures/Probabilities_for_Linear_Combinations.svg|340]]

## Read the diagonals of the joint table

A policyholder holds an auto policy and a home policy. Let $X$ be the number of auto claims in a year and $Y$ the number of home claims.

| $X$ \ $Y$ | 0 | 1 | 2 | Total |
|---|---|---|---|---|
| 0 | 0.36 | 0.18 | 0.06 | 0.60 |
| 1 | 0.10 | 0.20 | 0.10 | 0.40 |
| Total | 0.46 | 0.38 | 0.16 | 1 |

What is the probability of at least two claims in total? Each total $T = X + Y$ collects the cells on one diagonal.

| $T$ | Cells | Probability |
|---|---|---|
| 0 | (0, 0) | 0.36 |
| 1 | (0, 1), (1, 0) | 0.28 |
| 2 | (0, 2), (1, 1) | 0.26 |
| 3 | (1, 2) | 0.10 |

So $P(T \ge 2) = 0.26 + 0.10 = 0.36$. Weights only relabel the cells. For the cost $10X + 5Y$ in thousands, $P(10X + 5Y \ge 15)$ collects the cells $(1, 1)$ and $(1, 2)$, which gives 0.30.

## Independent counts: convolve the marginals

Suppose instead that the two policies were independent, with the same marginal totals. Each cell is then the product of its row and column totals. That is the convolution.

| $T$ | Dependent | Independent |
|---|---|---|
| 0 | 0.36 | 0.276 |
| 1 | 0.28 | 0.412 |
| 2 | 0.26 | 0.248 |
| 3 | 0.10 | 0.064 |

Independence gives $P(T \ge 2) = 0.312$, below the true 0.36. The positive dependence pushes probability toward the ends, where both counts are low or both are high.

> [!trap] Multiplying marginals for dependent variables
> The convolution needs independence. With a joint table in hand, sum the table's own cells.

For three or more variables, convolve one at a time. Some families need no convolution at all. Independent [[Poisson Distribution|Poisson]] variables sum to a Poisson with the means added.

## Independent normals: standardize the sum

Two independent lines of business have annual losses $A \sim N(400, 30^2)$ and $H \sim N(350, 40^2)$. What is the probability that the combined loss exceeds 800?

The total is normal with mean 750 and variance $30^2 + 40^2 = 2{,}500$, so its standard deviation is 50.

> $$P(A + H > 800) = P\left(Z > \frac{800 - 750}{50}\right) = P(Z > 1) \approx 0.1587$$

A difference works the same way. $A - H$ has mean 50 and the same variance 2,500, so $P(A > H) = P(Z > -1) \approx 0.8413$.

- Adding the standard deviations, $30 + 40 = 70$, is the classic slip. Variances add, standard deviations don't.

## Continuous sums: integrate over the region

Without normality, the probability is the joint density integrated over the region where the sum satisfies the event. Let two independent losses be uniform on $(0, 10)$. The event $X + Y \le 5$ is a triangle with area 12.5 inside a square of area 100.

> $$P(X + Y \le 5) = \frac{12.5}{100} = 0.125$$

For a density rather than a probability, the convolution becomes an integral.

> $$f_{X+Y}(s) = \int f_X(x)\,f_Y(s - x)\,dx$$

- The limits are the values of $x$ for which both $f_X(x)$ and $f_Y(s - x)$ are positive.
- Two independent [[Exponential Distribution|exponential]] variables with the same mean $\theta$ sum to a gamma variable, with $P(X + Y > s) = e^{-s/\theta}(1 + s/\theta)$.

## Many policyholders: the normal approximation

The insurer covers 100 independent policyholders like the one in the table. Their total claim count $C$ has mean $100(1.1) = 110$ and variance $100(1.01) = 101$, using the table's $E[T] = 1.1$ and $\text{Var}(T) = 1.01$. The [[Central Limit Theorem]] makes $C$ approximately normal. $C$ is a count, so $P(C \ge 126)$ uses the continuity correction at 125.5.

> $$P(C \ge 126) \approx P\left(Z > \frac{125.5 - 110}{\sqrt{101}}\right) \approx 0.062$$

## Try it

> [!example]- A portfolio loss over a threshold {Example}
> Two independent losses are $X_1 \sim N(100, 10^2)$ and $X_2 \sim N(200, 15^2)$. Find $P(X_1 + X_2 > 340)$.
>
> > [!answer]-
> > **Plan:** the sum is normal, so find its mean and standard deviation and standardize.
> > $$
> > \begin{align*}
> > \mu_L &= 100 + 200 \\
> > &= 300 \\
> > \sigma_L &= \sqrt{10^2 + 15^2} \\
> > &\approx 18.03
> > \end{align*}
> > $$
> > $$P(L > 340) = P\left(Z > \frac{40}{18.03}\right) = P(Z > 2.22) \approx 0.0132$$

> [!example]- Total claims from two independent policies {Example}
> Policy A has $X$ claims with $P(X = 0) = 0.5$, $P(X = 1) = 0.3$ and $P(X = 2) = 0.2$. Policy B, independently, has $Y$ claims with $P(Y = 0) = 0.6$ and $P(Y = 1) = 0.4$. Find $P(X + Y \ge 2)$.
>
> > [!answer]-
> > **Plan:** convolve for the small totals, then use the complement.
> > $$
> > \begin{align*}
> > P(X + Y = 0) &= (0.5)(0.6) \\
> > &= 0.30 \\
> > P(X + Y = 1) &= (0.5)(0.4) + (0.3)(0.6) \\
> > &= 0.38
> > \end{align*}
> > $$
> > So $P(X + Y \ge 2) = 1 - 0.30 - 0.38 = 0.32$. Directly, $P(X + Y = 2) = 0.24$ and $P(X + Y = 3) = 0.08$, which also total 0.32.

> [!example]- Hospital and doctor costs together {Example}
> Hospital costs $X$ are exponential with mean 2 and doctor costs $Y$ are exponential with mean 1, independent. Find $P(X + Y > 3)$.
>
> > [!answer]-
> > **Plan:** convolve the densities to get the density of $S = X + Y$, then integrate its tail.
> > $$
> > \begin{align*}
> > f_S(s) &= \int_0^s \tfrac{1}{2}e^{-x/2}\,e^{-(s - x)}\,dx \\
> > &= e^{-s/2} - e^{-s} \\
> > P(S > 3) &= \int_3^\infty \left(e^{-s/2} - e^{-s}\right)ds \\
> > &= 2e^{-1.5} - e^{-3} \\
> > &\approx 0.3965
> > \end{align*}
> > $$
> > Why are the limits 0 to $s$? Both costs are positive, so $x$ can't exceed the total $s$.

> [!warning]- Exam traps
> - **Adding standard deviations.** For independent terms, add variances and take the square root.
> - **Convolving dependent variables.** With a joint table, read its diagonals instead of multiplying marginals.
> - **Assuming any sum is normal.** Exact normality needs normal terms. Otherwise the CLT gives only an approximation, for many terms.
> - **Skipping the continuity correction.** A normal approximation to a count needs the half-unit adjustment.
