---
aliases:
  - Splicing
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0540189a64e86cc243eb7418068c87ba67d1e7f123e62e3c0e17a7e278f73241
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Spliced Distribution.md
---
A **Spliced Distribution** is a severity model built by joining different densities on adjacent intervals, so that, for example, small and medium losses follow one distribution and large losses follow a heavier-tailed one. Splicing is one of the operations for [[Creating New Distributions|creating new distributions]]. Loss Models defines a $k$-component spliced density as a weighted density on each interval, which is

> $$f_X(x) = \begin{cases} a_1 f_1(x), & c_0 < x < c_1 \\ a_2 f_2(x), & c_1 < x < c_2 \\ \quad \vdots & \\ a_k f_k(x), & c_{k-1} < x < c_k \end{cases}$$

- $c_0 < c_1 < \cdots < c_k$ are the breakpoints, usually with $c_0 = 0$ and $c_k = \infty$ for a severity.
- Each weight $a_j > 0$ is the probability that a loss falls in the $j$-th interval.
- Each $f_j$ is a density with all of its probability on that interval.
- $a_1 + a_2 + \cdots + a_k = 1$.

Splicing lets the body be fitted to the plentiful small claims and the tail to the few large ones, for example with a [[Pareto Distribution|Pareto]] or [[Generalized Pareto Distribution|generalized Pareto]] tail above a high threshold.

Any density $g_j$ with cumulative distribution function $G_j$ can be made into a piece by truncating it to the interval and rescaling it. The piece is

> $$f_j(x) = \frac{g_j(x)}{G_j(c_j) - G_j(c_{j-1})}, \quad c_{j-1} < x < c_j$$

## Probabilities and moments

Probabilities, moments and limited expected values are computed piece by piece. For $x$ in the $j$-th interval, the cumulative distribution function is

> $$F_X(x) = a_1 + \cdots + a_{j-1} + a_j F_j(x)$$

- $F_j$ is the cumulative distribution function of the piece $f_j$.

The $m$-th moment is

> $$E[X^m] = \sum_j a_j\,E[X_j^m]$$

- $X_j$ has density $f_j$.

A spliced model is a [[Mixture Distribution|mixture]] of its pieces whose components do not overlap, so the mixing rules for moments carry over. In a mixture every component covers the whole range of losses, while in a splice each piece covers only its own interval, so the tail probability above a point in the last interval is $a_k$ times that piece's survival function there. A percentile or a Value at Risk is found by first using the cumulative weights to decide which interval it falls in, and then inverting that piece alone.

> [!example]- What are $\Pr(X \le 1{,}000)$ and the 95th percentile of this spliced severity? {Example}
> A severity has weight 0.6 on $(0, 2{,}000)$, where it follows an exponential with mean 1,000 truncated to that interval. It has weight 0.4 on $(2{,}000, \infty)$, where $X - 2{,}000$ is Pareto with $\alpha = 3$ and $\theta = 4{,}000$.
>
> > [!answer]-
> > - The body's piece is the exponential density divided by $1 - e^{-2} = 0.864665$, its probability below 2,000.
> > - $\Pr(X \le 1{,}000) = 0.6(1 - e^{-1})/0.864665$, which is $0.6(0.632121)/0.864665 = 0.438635$.
> > - Only 60% of the probability lies below 2,000, so the 95th percentile is in the tail, where
> >
> > $$\Pr(X > x) = 0.4\left(\frac{4{,}000}{x + 2{,}000}\right)^3$$
> >
> > - Setting this to 0.05 gives $4{,}000/(x + 2{,}000) = 0.125^{1/3} = 0.5$.
> > - The 95th percentile is $x = 6{,}000$.

## Continuity at the breakpoints

Nothing in the definition makes the density continuous at the breakpoints. When continuity is required, the condition at each breakpoint is

> $$a_j f_j(c_j) = a_{j+1} f_{j+1}(c_j)$$

Together with the weights summing to 1, it fixes the weights. The weight $a_j$ is the probability of the $j$-th interval, not the height of the density. Continuity sets the heights $a_j f_j(c_j)$ equal, which usually makes the weights unequal.

> [!example]- What weights make this spliced density continuous, and what are its mean and $\Pr(X > 5{,}000)$? {Example}
> Claims below 1,000 are uniform on $(0, 1{,}000)$. Claims above 1,000 follow a [[Single-Parameter Pareto Distribution|single-parameter Pareto]] with $\alpha = 2.5$ and $\theta = 1{,}000$, whose density is $f_2(x) = 2.5(1{,}000)^{2.5}/x^{3.5}$.
>
> > [!answer]-
> > - At the breakpoint, $f_1(1{,}000) = 1/1{,}000$ and $f_2(1{,}000) = 2.5/1{,}000$.
> > - Continuity requires $a_1/1{,}000 = 2.5\,a_2/1{,}000$, so $a_1 = 2.5\,a_2$.
> > - With $a_1 + a_2 = 1$, $a_2 = 1/3.5 = 0.285714$ and $a_1 = 0.714286$.
> > - The uniform piece has mean 500, and the Pareto piece has mean $\alpha\theta/(\alpha - 1) = 1{,}666.67$.
> > - The mean is the uniform piece's $0.714286(500) = 357.14$ plus the Pareto piece's $0.285714(1{,}666.67) = 476.19$, so $E[X] = 833.33$.
> > - $\Pr(X > 5{,}000) = 0.285714(1{,}000/5{,}000)^{2.5} = 0.005111$.

> [!trap] Using the untruncated density for a piece
> Each $f_j$ must integrate to 1 on its own interval. Using the untruncated $g_j$ in its place makes the total probability differ from 1, so every answer built on it is off.
