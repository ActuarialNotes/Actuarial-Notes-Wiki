---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:a54a9a0a603673cf9419a8581b1788d24b567245a8322ae185f772a179817d91
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Definition 1.1 (PDF p.26), Definition 1.2 (PDF p.27), marginal distributions §4.3 (PDF p.151), Theorem 6.1 (PDF p.238), Bernoulli V = pq (PDF p.269), Exercises 6.2.23 and 6.3.17-18 covariance and correlation (PDF pp.275, 289), Definition 7.1 convolution (PDF p.294), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 4a: Discrete Random Variables, §2 definition (PDF p.2), cdf definition (PDF p.3), §2.8 Properties of the cdf (PDF pp.5-6), sha256:ff2a10e7ef1c0f5ef300ed8f73864d365ca5adcdf9775d1c4a6f356ee7687b5d — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class04-prep-a.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §3.2.1 CDF (jump of F at x_k equals P_X(x_k); CDF non-decreasing), sha256:af20b8d628299ce3fe01503e29617951bd45f4292ce46980c319cd3eede2035b — https://www.probabilitycourse.com/chapter3/3_2_1_cdf.php"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), solutions 117 (PDF p.36) and 124 (PDF p.37): the sum of independent Poisson variables is Poisson with the means added, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 learning outcomes a, e, f and Topic 3 learning outcomes a-e, g (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Discrete Random Variable.md
---

A **Discrete Random Variable** $X$ is a [[Random Variable]] whose possible values form a finite or countably infinite set — typically a count, such as the number of claims — so its distribution is given by a [[Probability Mass Function (PMF)|probability mass function]] $p(x) = P(X = x)$.

> $$p(x) = P(X = x)$$

> $$F(x) = \sum_{k \le x} p(k)$$

- A valid PMF has $p(x) \ge 0$ and $\sum_x p(x) = 1$. The [[Cumulative Distribution Function (CDF)|CDF]] is a step function that jumps by $p(x)$ at each possible value. The named families are in [[Discrete Univariate Distributions]].
- **Endpoints matter.** $P(X \le 3)$ and $P(X < 3)$ differ by $p(3)$ — the most common slip when moving from a [[Continuous Random Variable|continuous]] problem to a discrete one. Expectations are sums: $E[g(X)] = \sum_x g(x)\,p(x)$.
- With two variables, the [[Joint Probability Function]] $p(x,y)$ is a table. [[Marginal Probability Function|Marginals]] are its row and column totals; a [[Conditional Probability Function|conditional]] PMF is one row divided by its total, $p(y \mid x) = p(x,y)/p_X(x)$.
- [[Moments for Joint Distributions|Joint moments]], [[Variance for Conditional and Marginal Distributions|conditional and marginal variances]], [[Covariance]] and the [[Correlation Coefficient]] are all sums over the cells of that table.
- The PMF of a sum of independent discrete variables is a **convolution**, $P(X + Y = s) = \sum_x p_X(x)\,p_Y(s - x)$. Some families are closed under it — independent Poissons sum to a Poisson with mean $\lambda_1 + \lambda_2$. See [[Probabilities for Linear Combinations]].

The first two examples use one table. A policyholder's annual auto claims $X$ and home claims $Y$ have joint PMF $p(0,0) = 0.40$, $p(0,1) = 0.10$, $p(1,0) = 0.20$, $p(1,1) = 0.15$, $p(2,0) = 0.05$, $p(2,1) = 0.10$.

> [!example]- Auto Claims Given a Home Claim {Example}
> Using the joint PMF above, find the conditional PMF of $X$ given $Y = 1$, then $E[X \mid Y = 1]$ and $\text{Var}(X \mid Y = 1)$.
>
> > [!answer]-
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
> > Unconditionally $E[X] = 0.65$; a home claim raises the expected auto count to $1$, so the two lines move together.

> [!example]- Covariance and Correlation of Two Lines {Example}
> Using the same joint PMF, find $\text{Cov}(X, Y)$ and the correlation coefficient $\rho$.
>
> > [!answer]-
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
> > A moderate positive correlation — worth knowing before pricing a bundled auto-and-home discount.

> [!example]- Total Claims from Two Independent Policies {Example}
> Policy A has claim count $X$ with $P(X = 0, 1, 2) = 0.7, 0.2, 0.1$. Policy B, independent, has $Y$ with $P(Y = 0, 1) = 0.6, 0.4$. Find the PMF of $S = X + Y$ and $P(S \ge 2)$.
>
> > [!answer]-
> > Convolve, summing over the ways each total can occur:
> >
> > - $P(S = 0)$: $(0.7)(0.6) = 0.42$
> > - $P(S = 1)$: $(0.7)(0.4) + (0.2)(0.6) = 0.40$
> > - $P(S = 2)$: $(0.2)(0.4) + (0.1)(0.6) = 0.14$
> > - $P(S = 3)$: $(0.1)(0.4) = 0.04$
> >
> > The four probabilities sum to 1, and $P(S \ge 2) = 0.14 + 0.04 = 0.18$: an 18% chance the pair produces two or more claims in the year.
