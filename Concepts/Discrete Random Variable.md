---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:061e1f0e5e708a8433561dfade2dca57afa227a79d3eec37238a78963611b88f
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Def. 1.1 p.18 (PDF p.26): discrete = finite or countably infinite sample space, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §3.2.1 CDF: F_X(x)=P(X<=x), defined for discrete, continuous and mixed; discrete CDF a staircase, jump = P(X=x), sha256:ddcdb7ea63d9e918e1d8e69af197212e089af8cf665730306927c861bd3f5f6f — https://www.probabilitycourse.com/chapter3/3_2_1_cdf.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Def. 6.1 p.226 (PDF p.234, absolute convergence; no expected value otherwise); Thm 6.2 linearity, expectations add whether or not independent; Def. 6.3 variance and standard deviation p.257; Thms 6.6 Var=E(X^2)-mu^2, 6.7 V(cX)=c^2V(X), V(X+c)=V(X), 6.8 V(X+Y)=V(X)+V(Y) independent, 6.9 sigma(S_n)=sigma sqrt(n) (pp.258-260, PDF pp.265-268), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Def. 7.1 p.286 (PDF p.294): convolution m3(j)=sum_k m1(k)m2(j-k) for independent integer-valued X, Y, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.1 Expected value: definitions (discrete, continuous, mixed), may not exist, change of variables, increasing property P(X<=Y)=1, symmetry -> E(X)=a, independence E(XY)=E(X)E(Y), E(X|A) via conditional density, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.9 Expected value as an integral: E(X)=int_0^inf P(X>x)dx for X>=0; E(X)=sum_{k>=1} P(X>=k) on N; E(X;A)=E(X 1_A), sha256:13db7b0f6f791843abcef65cf16e1214b8e745e3f9eeac74e01cc96fa3a032bc — https://www.randomservices.org/random/expect/Integral.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 14.4 Poisson distribution: M+N Poisson with parameter a+b for independent Poisson M, N, sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.5 Covariance and correlation: cov=E(XY)-E(X)E(Y); cor=cov/(sd sd); var(X+Y)=var(X)+var(Y)+2cov(X,Y), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §5.1.3 conditional PMF P_{X|Y}=P_{XY}/P_Y, sha256:937740fa7d0feecdb1a09585b50e5fc6bea5ed4cfae6425ad7aa56855a0f58e4 — https://www.probabilitycourse.com/chapter5/5_1_3_conditioning_independence.php"
    - "SOA, Exam P syllabus, November 2026, Topic 3 Multivariate Random Variables, LOs a)-i), incl. g) linear combinations of independent discrete and of normal random variables (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Discrete Random Variable.md
---

A **Discrete Random Variable** $X$ is a [[Random Variable]] whose possible values form a finite or countably infinite set, typically a count such as the number of claims. Its distribution is given by a [[Probability Mass Function (PMF)|probability mass function]] $p(x) = P(X = x)$.

> $$p(x) = P(X = x)$$

> $$F(x) = \sum_{k \le x} p(k)$$

- A valid PMF has $p(x) \ge 0$ and $\sum_x p(x) = 1$.
- The [[Cumulative Distribution Function (CDF)|CDF]] is a step function that jumps by $p(x)$ at each possible value.
- The named families, such as the binomial and the Poisson, are in [[Discrete Univariate Distributions]].
- Compared with a [[Continuous Random Variable|continuous random variable]], probability sits on single values instead of spreading over intervals. So sums replace integrals, and endpoints matter.

> [!idea] The idea
> A discrete random variable puts its probability in lumps, one lump on each possible value. Every question about it is a sum of lumps. Including or leaving out one value changes the answer by exactly that value's lump.

## One policyholder's claim count

A policyholder's number of claims in a year, $N$, has this PMF.

| $n$ | $p(n)$ | $F(n)$ |
|---|---|---|
| 0 | 0.60 | 0.60 |
| 1 | 0.25 | 0.85 |
| 2 | 0.10 | 0.95 |
| 3 | 0.05 | 1.00 |

- The probabilities are nonnegative and sum to 1, so the PMF is valid.
- The CDF is flat between the integers and jumps by $p(n)$ at each one.

**Endpoints matter.** $P(X \le 3)$ and $P(X < 3)$ differ by $p(3)$. For the claim count, $P(N \le 1) = 0.85$ but $P(N < 1) = 0.60$.

> [!trap] Strict or weak inequality
> "Fewer than 2 claims" is $P(N \le 1) = 0.85$. Reading it as $P(N \le 2) = 0.95$ adds the lump at 2. This is the most common slip when moving from a continuous problem to a discrete one.

## Means are sums

An expected value weights each value by its probability. For a discrete random variable, that weighting is a sum. Expectations are sums: $E[g(X)] = \sum_x g(x)\,p(x)$.

For the claim count:

> $$
> \begin{align*}
> E[N] &= 0(0.60) + 1(0.25) + 2(0.10) + 3(0.05) \\
>      &= 0.60
> \end{align*}
> $$

- With $g(n) = n^2$, $E[N^2] = 0.25 + 0.40 + 0.45 = 1.10$.
- So $\text{Var}(N) = 1.10 - 0.60^2 = 0.74$. See [[Expected Value]] and [[Variance]].

## Working back from tail probabilities

A question may give $P(N \ge n)$ instead of the PMF. Each lump is the drop between neighbouring tail probabilities.

> $$p(n) = P(X \ge n) - P(X \ge n + 1)$$

- For the claim count, $P(N \ge 2) = 0.15$ and $P(N \ge 3) = 0.05$, so $p(2) = 0.10$.
- At the largest value $m$, there is no next tail, so $p(m) = P(X \ge m)$.

## Capping a count

A benefit may count claims only up to a cap. If $Y = \min(X, m)$, then $P(Y = k) = P(X = k)$ for $k < m$, and all the rest sits on the cap.

> $$P(Y = m) = P(X \ge m) = 1 - \sum_{k < m} P(X = k)$$

- Capping the claim count at 2 gives $P(Y = 2) = 0.10 + 0.05 = 0.15$.
- The cap's value covers every outcome that would have gone past it. When trials stop at $m$ whether or not a target was reached, $Y = m$ includes both reaching it on trial $m$ and never reaching it.

The opposite question asks for the claims beyond the first. For a non-negative integer $N$, $N = \min(N, 1) + (N - 1)_+$. The term $\min(N, 1)$ is the indicator of $N \ge 1$, so its mean is $P(N \ge 1)$.

> $$E[(N-1)_+] = E[N] - P(N \ge 1)$$

- For the claim count, $E[(N - 1)_+] = 0.60 - 0.40 = 0.20$. Directly, $1(0.10) + 2(0.05) = 0.20$.
- This is the deductible identity $E[(X-d)_+] = E[X] - E[X \wedge d]$ with $d = 1$.

## Two counts at once

A second policyholder's count $M$ is independent of $N$, with $P(M = 0) = 0.7$ and $P(M = 1) = 0.3$. What is the distribution of the total $S = N + M$?

Each total collects every pair of counts that adds up to it. The PMF of a sum of independent discrete variables is a **convolution**, $P(X + Y = s) = \sum_x p_X(x)\,p_Y(s - x)$.

| $s$ | Pairs $(n, m)$ | $P(S = s)$ |
|---|---|---|
| 0 | $(0, 0)$ | 0.420 |
| 1 | $(1, 0), (0, 1)$ | 0.355 |
| 2 | $(2, 0), (1, 1)$ | 0.145 |
| 3 | $(3, 0), (2, 1)$ | 0.065 |
| 4 | $(3, 1)$ | 0.015 |

- For example, $P(S = 1) = (0.25)(0.7) + (0.60)(0.3) = 0.355$.
- Some families are closed under it. Independent Poissons sum to a Poisson with mean $\lambda_1 + \lambda_2$. See [[Probabilities for Linear Combinations]].

When two counts are not independent, the question gives their [[Joint Probability Function]] $p(x, y)$ as a table.

- [[Marginal Probability Function|Marginals]] are its row and column totals.
- A [[Conditional Probability Function|conditional]] PMF is one row divided by its total, $p(y \mid x) = p(x,y)/p_X(x)$.
- [[Moments for Joint Distributions|Joint moments]], [[Variance for Conditional and Marginal Distributions|conditional and marginal variances]], [[Covariance]] and the [[Correlation Coefficient]] are all sums over the cells of that table.

## Try it

The first two examples use one table. A policyholder's annual auto claims $X$ and home claims $Y$ have joint PMF $p(0,0) = 0.40$, $p(0,1) = 0.10$, $p(1,0) = 0.20$, $p(1,1) = 0.15$, $p(2,0) = 0.05$, $p(2,1) = 0.10$.

> [!example]- Auto Claims Given a Home Claim {Example}
> Using the joint PMF above, find the conditional PMF of $X$ given $Y = 1$, then $E[X \mid Y = 1]$ and $\text{Var}(X \mid Y = 1)$.
>
> > [!answer]-
> > **Plan:** keep only the $Y = 1$ cells, rescale them by their total, then take moments as usual.
> >
> > The marginal is $p_Y(1) = 0.10 + 0.15 + 0.10 = 0.35$. Dividing each $Y = 1$ cell by it gives $p(x \mid 1) = \tfrac{2}{7}, \tfrac{3}{7}, \tfrac{2}{7}$ for $x = 0, 1, 2$.
> > $$
> > \begin{align*}
> > E[X \mid Y = 1] &= 0\left(\tfrac{2}{7}\right) + 1\left(\tfrac{3}{7}\right) + 2\left(\tfrac{2}{7}\right) \\
> >                 &= 1 \\
> > E[X^2 \mid Y = 1] &= 1\left(\tfrac{3}{7}\right) + 4\left(\tfrac{2}{7}\right) \\
> >                   &= 11/7 \\
> > \text{Var}(X \mid Y = 1) &= 11/7 - 1^2 \\
> >                          &= 4/7 \approx 0.571
> > \end{align*}
> > $$
> > Unconditionally $E[X] = 0.65$. A home claim raises the expected auto count to 1, so the two lines move together.

> [!example]- Covariance and Correlation of Two Lines {Example}
> Using the same joint PMF, find $\text{Cov}(X, Y)$ and the correlation coefficient $\rho$.
>
> > [!answer]-
> > **Plan:** get the marginal moments from the row and column totals, and $E[XY]$ from the cells.
> >
> > The marginals are $p_X = (0.50, 0.35, 0.15)$ on $\{0,1,2\}$ and $p_Y = (0.65, 0.35)$ on $\{0,1\}$.
> > $$
> > \begin{align*}
> > E[X] &= 0.35 + 2(0.15) \\
> >      &= 0.65 \\
> > \text{Var}(X) &= 0.35 + 4(0.15) - 0.65^2 \\
> >               &= 0.5275
> > \end{align*}
> > $$
> > $Y$ is Bernoulli, so $E[Y] = 0.35$ and $\text{Var}(Y) = 0.35(0.65) = 0.2275$. The only nonzero products $xy$ sit in cells $(1,1)$ and $(2,1)$:
> > $$
> > \begin{align*}
> > E[XY] &= (1)(1)(0.15) + (2)(1)(0.10) \\
> >       &= 0.35 \\
> > \text{Cov}(X,Y) &= 0.35 - (0.65)(0.35) \\
> >                 &= 0.1225 \\
> > \rho &= \frac{0.1225}{\sqrt{0.5275 \times 0.2275}} \\
> >      &= \frac{0.1225}{0.3464} \\
> >      &= 0.354
> > \end{align*}
> > $$
> > The correlation is moderate and positive. An insurer pricing a bundled auto-and-home discount would want to know it.

> [!example]- Total Claims from Two Independent Policies {Example}
> Policy A has claim count $X$ with $P(X = 0, 1, 2) = 0.7, 0.2, 0.1$. Policy B, independent, has $Y$ with $P(Y = 0, 1) = 0.6, 0.4$. Find the PMF of $S = X + Y$ and $P(S \ge 2)$.
>
> > [!answer]-
> > **Plan:** list the pairs that give each total, multiply within a pair, add across pairs.
> >
> > Convolve, summing over the ways each total can occur:
> >
> > - $P(S = 0)$: $(0.7)(0.6) = 0.42$
> > - $P(S = 1)$: $(0.7)(0.4) + (0.2)(0.6) = 0.40$
> > - $P(S = 2)$: $(0.2)(0.4) + (0.1)(0.6) = 0.14$
> > - $P(S = 3)$: $(0.1)(0.4) = 0.04$
> >
> > The four probabilities sum to 1, and $P(S \ge 2) = 0.14 + 0.04 = 0.18$: an 18% chance the pair produces two or more claims in the year.
> >
> > Why multiply within a pair? The policies are independent, so the joint probability of a pair is the product of the two marginals.

> [!warning]- Exam traps
> - **Strict versus weak inequality.** $P(N < k)$ leaves out $p(k)$ and $P(N \le k)$ includes it. Translate "fewer than", "at most" and "at least" before summing.
> - **Forgetting the cap's mass.** For $\min(N, m)$, the value $m$ collects all of $P(N \ge m)$, not just $P(N = m)$.
> - **Convolving dependent counts.** The convolution multiplies marginals, which needs independence. With a joint table, add the cells on each diagonal $x + y = s$ instead.
> - **Conditioning on the wrong total.** A conditional PMF divides a row by that row's total, not by 1 and not by the column total.
