---
aliases:
  - Splicing
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9cc2847e986dd7017e689bca45fbb946fc798e89e034a0ba83ee85e324513b8a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Spliced Distribution.md
---

**A Spliced Distribution** is a severity model built by joining different densities on adjacent intervals, so that, for example, small and medium losses follow one distribution and large losses follow a heavier-tailed one. Loss Models defines a $k$-component spliced density as a weighted density on each interval, where each piece is a proper density on its own interval and the weights add up to 1. Splicing is one of the operations for [[Creating New Distributions|creating new distributions]].

> $$f_X(x) = \begin{cases} a_1 f_1(x), & c_0 < x < c_1 \\ a_2 f_2(x), & c_1 < x < c_2 \\ \quad \vdots & \\ a_k f_k(x), & c_{k-1} < x < c_k \end{cases}$$

> $$a_1 + a_2 + \cdots + a_k = 1$$

> $$f_j(x) = \frac{g_j(x)}{G_j(c_j) - G_j(c_{j-1})}, \quad c_{j-1} < x < c_j$$

- **Symbols:** $c_0 < c_1 < \cdots < c_k$ are the breakpoints, usually with $c_0 = 0$ and $c_k = \infty$ for a severity. Each weight $a_j > 0$ is the probability that a loss falls in the $j$-th interval, and each $f_j$ is a density with all of its probability on that interval. The last block makes such a piece out of any density $g_j$ with CDF $G_j$, by truncating it to the interval and rescaling it.
- **Continuity:** Nothing in the definition makes the density continuous at the breakpoints. When continuity is required, the condition $a_j f_j(c_j) = a_{j+1} f_{j+1}(c_j)$ at each breakpoint, together with the weights summing to 1, fixes the weights.
- **Working with it:** Probabilities, moments and limited expected values are computed piece by piece. For $x$ in the $j$-th interval, $F_X(x) = a_1 + \cdots + a_{j-1} + a_j F_j(x)$, and $E[X^m] = \sum_j a_j\,E[X_j^m]$, where $X_j$ has density $f_j$. A spliced model is a [[Mixture Distribution|mixture]] of its pieces whose components do not overlap, so the mixing rules for moments carry over.
- **Use:** Splicing lets the body be fitted to the plentiful small claims and the tail to the few large ones, for example with a [[Pareto Distribution|Pareto]] or [[Generalized Pareto Distribution|generalized Pareto]] tail above a high threshold.

> [!example]- A Continuous Splice of a Uniform Body and a Pareto Tail {Example}
> Claims below 1,000 are uniform on $(0, 1{,}000)$. Claims above 1,000 follow a [[Single-Parameter Pareto Distribution|single-parameter Pareto]] with $\alpha = 2.5$ and $\theta = 1{,}000$, whose density is $f_2(x) = 2.5(1{,}000)^{2.5}/x^{3.5}$. Choose the weights so that the spliced density is continuous at 1,000, then find the mean and $\Pr(X > 5{,}000)$.
>
> > [!answer]-
> > At the breakpoint, $f_1(1{,}000) = 1/1{,}000$ and $f_2(1{,}000) = 2.5/1{,}000$. Continuity requires $a_1/1{,}000 = 2.5\,a_2/1{,}000$, so $a_1 = 2.5\,a_2$.
> > $$
> > \begin{align*}
> > a_2 &= \frac{1}{1 + 2.5} \\
> > &= 0.285714 \\
> > a_1 &= 0.714286
> > \end{align*}
> > $$
> > The uniform piece has mean 500, and the Pareto piece has mean $\alpha\theta/(\alpha - 1) = 1{,}666.67$.
> > $$
> > \begin{align*}
> > E[X] &= 0.714286(500) + 0.285714(1{,}666.67) \\
> > &= 357.14 + 476.19 \\
> > &= 833.33 \\
> > \Pr(X > 5{,}000) &= 0.285714\left(\frac{1{,}000}{5{,}000}\right)^{2.5} \\
> > &= 0.005111
> > \end{align*}
> > $$
> > About 29% of claims fall in the Pareto tail, and they supply more than half of the mean.

> [!example]- A Percentile of a Spliced Severity {Example}
> A severity has weight 0.6 on $(0, 2{,}000)$, where it follows an exponential with mean 1,000 truncated to that interval. It has weight 0.4 on $(2{,}000, \infty)$, where $X - 2{,}000$ is Pareto with $\alpha = 3$ and $\theta = 4{,}000$. Find $\Pr(X \le 1{,}000)$ and the 95th percentile.
>
> > [!answer]-
> > The body's piece is the exponential density divided by $1 - e^{-2} = 0.864665$, its probability below 2,000.
> > $$
> > \begin{align*}
> > \Pr(X \le 1{,}000) &= 0.6 \times \frac{1 - e^{-1}}{1 - e^{-2}} \\
> > &= 0.6 \times \frac{0.632121}{0.864665} \\
> > &= 0.438635
> > \end{align*}
> > $$
> > Only 60% of the probability lies below 2,000, so the 95th percentile is in the tail, where $\Pr(X > x) = 0.4\left(\frac{4{,}000}{x + 2{,}000}\right)^3$.
> > $$
> > \begin{align*}
> > 0.4\left(\frac{4{,}000}{x + 2{,}000}\right)^3 &= 0.05 \\
> > \frac{4{,}000}{x + 2{,}000} &= 0.125^{1/3} \\
> > &= 0.5 \\
> > x &= 6{,}000
> > \end{align*}
> > $$
> > This density is not continuous: it is 0.000094 just below 2,000 and 0.0003 just above it. The definition allows the jump, and the percentile is unaffected by it.

> [!tip]- How it appears on the exam
> - **ASTAM** asks candidates to create new distributions by splicing. A question gives the pieces and either the weights or a continuity condition, then asks for the density, the CDF at a point, a percentile or a moment.
> - **Which interval first:** A percentile or a Value at Risk is found by first using the cumulative weights to decide which interval it falls in, and then inverting that piece alone.
> - **Moments piece by piece:** A mean or a limited expected value is a weighted sum of each piece's own moment on its interval, and most of the work in such a question is the truncated moment of the body.

> [!warning]- Exam traps
> - **Unscaled pieces:** Each $f_j$ must integrate to 1 on its own interval. Using the untruncated $g_j$ in its place makes the total probability differ from 1, so every answer built on it is off.
> - **Weights are probabilities:** The weight $a_j$ is the probability of the $j$-th interval, not the height of the density. Continuity sets the heights $a_j f_j(c_j)$ equal, which usually makes the weights unequal.
> - **Splice versus mixture:** In a mixture, every component covers the whole range of losses. In a splice, each piece covers only its own interval, so the tail probability above a point in the last interval is $a_k$ times that piece's survival function there.
