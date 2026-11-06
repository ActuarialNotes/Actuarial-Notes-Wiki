---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:f53f45b59cc603422e812e1379e496ae3405939afca9932704a49cae1eb855da
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 conditional probability, E taken as the new sample space (p.133, PDF p.141); Def. 4.4 independence: joint = product of marginals for any choice of values (p.143, PDF p.151), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Orloff & Bloom, MIT OCW 18.05 (Spring 2022), Reading 7a: Joint Distributions, Independence, §4 independence, p(x_i,y_j) = p_X(x_i)p_Y(y_j), Ex. 12 cell-by-cell check (pp.9-10), sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.1.2 Joint CDF, P(x1<X<=x2, y1<Y<=y2) = F(x2,y2) - F(x1,y2) - F(x2,y1) + F(x1,y1), sha256:646c853a86eef7a2b0def6d7492b5deecc3c3e8bd6743391eeff0209bf1b2880 — https://www.probabilitycourse.com/chapter5/5_1_2_joint_cdf.php"
    - "SOA Probability Exam (Exam P) syllabus, November 2026, Topic 3 Multivariate Random Variables (23-30%), learning outcomes a-e (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Joint Probability Function.md
---

The **joint probability function** (joint PMF) $p(x, y)$ of discrete random variables $X$ and $Y$ gives the probability that $X = x$ and $Y = y$ at the same time. It fully characterizes the [[Multivariate Distribution]] of $(X, Y)$.

> $$p(x,y) = P(X = x,\; Y = y)$$

- It satisfies $p(x,y) \geq 0$ for all $(x,y)$ and $\displaystyle\sum_x \sum_y p(x,y) = 1$
- A [[Marginal Probability Function|marginal probability function]] is obtained by summing the joint PMF over the other variable.
- [[Conditional Probability Function]]s are obtained by fixing one variable and dividing by its marginal, so the slice sums to 1: $p_{X \mid Y}(x \mid y) = \dfrac{p(x,y)}{p_Y(y)}$ for $p_Y(y) > 0$
- The continuous counterpart is the [[Joint Probability Density Function]], where sums become integrals.

> [!idea] The idea
> A question about two random variables can depend on both values at once, such as the probability that their sum is 2. The joint PMF answers it by giving the probability of every pair of values, so the probability of any event about the pair is the sum of the cells in that event. A marginal adds a whole row or column, and a conditional keeps one row or column and divides by its total.

![[Media/Figures/Joint_Probability_Function.svg|340]]

## One policyholder, two policies

A policyholder has an auto policy and a home policy with one insurer. Let $X$ be the number of auto claims next year and $Y$ the number of home claims. Each cell of the table is one value of the joint PMF:

| | $Y=0$ | $Y=1$ | $Y=2$ |
|---|---|---|---|
| $X=0$ | 0.30 | 0.15 | 0.05 |
| $X=1$ | 0.20 | 0.20 | 0.10 |

The cell $p(1, 2) = 0.10$ is the probability of exactly one auto claim and exactly two home claims. Every cell is at least 0, and the six cells add to 1. A table with a missing cell is completed from that total.

## The probability of an event is a sum of cells

**What is the probability of at least two claims in total?** The event holds in the cells $(0, 2)$, $(1, 1)$ and $(1, 2)$, so add them: $0.05 + 0.20 + 0.10 = 0.35$.

> $$P\big((X, Y) \in A\big) = \sum_{(x,y) \in A} p(x, y)$$

- An event on one variable, such as $X = 1$, takes every cell in the rows that satisfy it, across all columns: $0.20 + 0.20 + 0.10 = 0.50$.
- An event on both variables takes only the cells that satisfy both conditions at once: $P(X = 1, Y \ge 1) = 0.20 + 0.10 = 0.30$.

**What is the distribution of the total $X + Y$?** For each total $s$, list the pairs that add to $s$ and add their cells. For $s = 2$ the pairs are $(0, 2)$ and $(1, 1)$, so $P(X + Y = 2) = 0.05 + 0.20 = 0.25$.

> $$P(X + Y = s) = \sum_x p(x,\, s - x)$$

| $s$ | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| $P(X+Y=s)$ | 0.30 | 0.35 | 0.25 | 0.10 |

## Rows, columns and slices

The marginal probability adds the row: $P(X = 1) = 0.20 + 0.20 + 0.10 = 0.50$. Adding the column for $Y = 1$ gives $P(Y = 1) = 0.15 + 0.20 = 0.35$.

A conditional probability fixes one value. Fixing $Y = 1$ leaves the slice $(0.15, 0.20)$, which sums to $p_Y(1) = 0.35$. Once $Y = 1$ is known, that slice is the whole sample space, so each cell is divided by its total: $P(X = 1 \mid Y = 1) = 0.20/0.35 = 4/7$.

The same move conditions on the total. Given $X + Y = 2$, only the cells $(0, 2)$ and $(1, 1)$ remain, so $P(X = 1 \mid X + Y = 2) = 0.20 / 0.25 = 0.80$.

> $$P(X = x \mid X + Y = s) = \frac{p(x,\, s - x)}{P(X + Y = s)}$$

## Building the table from a marginal and a conditional

Questions often give the joint PMF in pieces. One variable has a known distribution, and the other is described given its value. Each cell is then the marginal times the conditional.

> $$p(x, y) = p_X(x)\, p(y \mid x)$$

For the policyholder, $P(X = 1) = 0.50$ and $P(Y = 2 \mid X = 1) = 0.20$, so $p(1, 2) = (0.50)(0.20) = 0.10$. The probability of a total $s$ then adds $p_X(x)\, p(s - x \mid x)$ over $x$, which is the [[The Law of Total Probability|law of total probability]].

## When the table is a formula

A joint PMF is often given as a formula with an unknown constant, valid on a listed set of pairs. Suppose $p(x, y) = c(x + y)$ for $x, y \in \{0, 1, 2\}$ with $x \le y$. The allowed pairs are $(0,0)$, $(0,1)$, $(0,2)$, $(1,1)$, $(1,2)$ and $(2,2)$, and their values of $x + y$ add to $0 + 1 + 2 + 2 + 3 + 4 = 12$. So $c = 1/12$.

> [!trap] Summing over the wrong support
> Summing $x + y$ over all nine pairs gives 18 and the wrong $c = 1/18$. When the pairs are restricted, the constant comes from summing only the allowed pairs. Every probability calculated from the wrong constant is too small.

## Multinomial counts

**Multinomial distribution.** When each of $n$ independent trials falls into exactly one of $k$ categories with fixed probabilities $p_1, \ldots, p_k$ (which sum to 1), the category counts $(N_1, \ldots, N_k)$ have the joint probability function below, for $n_1 + \cdots + n_k = n$.

> $$P(N_1 = n_1, \ldots, N_k = n_k) = \frac{n!}{n_1!\, n_2! \cdots n_k!}\, p_1^{n_1} p_2^{n_2} \cdots p_k^{n_k}$$

Each ordering of the outcomes with those counts has probability $p_1^{n_1} \cdots p_k^{n_k}$. The coefficient $n!/(n_1! \cdots n_k!)$ counts the orderings. The multinomial distribution extends the [[Binomial Distribution|binomial]] to more than two outcomes. For three categories, with $i$ and $j$ the counts in the first two:

> $$p(i, j) = \frac{n!}{i!\, j!\, (n - i - j)!}\, p_1^{i}\, p_2^{j}\, p_3^{\,n - i - j}$$

- Each category's count on its own is binomial: every trial lands in category $i$ with probability $p_i$ or not, so $N_i \sim \text{Binomial}(n, p_i)$, $E[N_i] = n p_i$ and $P(N_i \ge 1) = 1 - (1 - p_i)^n$.

## Try it

> [!example]- Number of Claims and Policies Lapsed {Example}
> Let $X$ = number of claims (0 or 1) and $Y$ = policies lapsed (0 or 1). Joint PMF:
>
> | | $Y=0$ | $Y=1$ |
> |---|---|---|
> | $X=0$ | 0.50 | 0.20 |
> | $X=1$ | 0.20 | 0.10 |
>
> Find $P(X=1, Y=1)$, $P(X=1)$ and $P(X=1 \mid Y=1)$.
>
> > [!answer]-
> > **Plan:** read one cell, add one row, then divide one cell by its column total.
> >
> > The joint probability is one cell: $P(X=1, Y=1) = 0.10$. The marginal probability adds the row: $P(X=1) = 0.20 + 0.10 = 0.30$.
> >
> > Conditional: fixing $Y = 1$ leaves the slice $(0.20, 0.10)$, which sums to $p_Y(1) = 0.30$, so $P(X=1 \mid Y=1) = 0.10/0.30 = 1/3$ and $P(X=0 \mid Y=1) = 2/3$.
> >
> > The two conditional probabilities add to 1, which checks that the right total was used.

> [!example]- A constant, then a conditional {Example}
> The numbers of claims $X$ and $Y$ on two policies have joint PMF $p(x, y) = c(x + 2y)$ for $x = 0, 1$ and $y = 1, 2$. Find $c$ and $P(X = 1 \mid Y = 2)$.
>
> > [!answer]-
> > **Plan:** add $x + 2y$ over the four pairs to find $c$, then divide one cell by the column for $Y = 2$.
> >
> > The four values are $2, 3, 4, 5$ for $(0,1)$, $(1,1)$, $(0,2)$, $(1,2)$. They add to 14, so $c = 1/14$.
> > $$
> > \begin{align*}
> > P(X = 1 \mid Y = 2) &= \frac{p(1, 2)}{p(0, 2) + p(1, 2)} \\
> >                     &= \frac{5/14}{4/14 + 5/14} \\
> >                     &= \frac{5}{9}
> > \end{align*}
> > $$
> > The constant cancels in a conditional probability, so a conditional question can be answered before $c$ is found.

> [!example]- Losses over two years {Example}
> The number of losses in year 1, $X$, is 0, 1 or 2 with probabilities 0.5, 0.3 and 0.2. Given $X = x$, the number of losses in year 2, $Y$, has the conditional probabilities below. Find $P(X + Y = 2)$ and $P(X = 1 \mid X + Y = 2)$.
>
> | $x$ | $Y=0$ | $Y=1$ | $Y=2$ |
> |---|---|---|---|
> | 0 | 0.6 | 0.3 | 0.1 |
> | 1 | 0.4 | 0.4 | 0.2 |
> | 2 | 0.2 | 0.5 | 0.3 |
>
> > [!answer]-
> > **Plan:** build each cell as marginal times conditional, keep the pairs that add to 2, then condition on the total.
> >
> > The pairs adding to 2 are $(0, 2)$, $(1, 1)$ and $(2, 0)$.
> > $$
> > \begin{align*}
> > P(X + Y = 2) &= (0.5)(0.1) + (0.3)(0.4) + (0.2)(0.2) \\
> >              &= 0.05 + 0.12 + 0.04 \\
> >              &= 0.21
> > \end{align*}
> > $$
> > Given the total, only those three cells remain:
> > $$
> > \begin{align*}
> > P(X = 1 \mid X + Y = 2) &= \frac{0.12}{0.21} \\
> >                         &= 0.5714
> > \end{align*}
> > $$
> > Why divide by 0.21 and not by $P(X = 1) = 0.3$? The condition is the total, so the cells with a total of 2 are the new sample space.

> [!warning]- Exam traps
> - **Summing over the wrong support.** When the pairs are restricted (for example $x \le y$), the constant comes from summing only the allowed pairs. Summing over the full rectangle gives a constant that is too small.
> - **Dividing by the wrong marginal.** $P(X = x \mid Y = y)$ divides by $p_Y(y)$, the total of the fixed slice. Dividing by $p_X(x)$, or not dividing at all, leaves numbers that don't sum to 1 across the slice. Checking that the slice sums to 1 catches the error.
> - **Independence from one cell.** One cell with $p(x,y) \ne p_X(x)\,p_Y(y)$ proves dependence. One cell that matches proves nothing, because independence needs the product rule in every cell.
> - **PMF from a joint CDF.** Differencing a joint CDF table takes four terms, $p(x,y) = F(x,y) - F(x-1,y) - F(x,y-1) + F(x-1,y-1)$ on integer values. Subtracting only one neighbour leaves a cumulative total, not a single cell. See [[Joint Cumulative Distribution Function]].
