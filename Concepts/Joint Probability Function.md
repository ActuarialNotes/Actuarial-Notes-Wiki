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

The **joint probability function** (joint PMF) of discrete random variables $X$ and $Y$ fully characterizes the [[Multivariate Distribution]] of $(X, Y)$.

> $$p(x,y) = P(X = x,\; Y = y)$$

- It satisfies $p(x,y) \geq 0$ for all $(x,y)$ and $\displaystyle\sum_x \sum_y p(x,y) = 1$
- A [[Marginal Probability Function|marginal probability function]] is obtained by summing the joint PMF over the other variable
- [[Conditional Probability Function]]s are obtained by fixing one variable and dividing by its marginal, so the slice sums to 1: $p_{X \mid Y}(x \mid y) = \dfrac{p(x,y)}{p_Y(y)}$ for $p_Y(y) > 0$

> [!idea] The idea
> A question about two random variables can depend on both values at once, such as the probability that their sum is 3. The joint PMF answers it by giving the probability of every pair of values $(x, y)$, so the probability of any event about the pair is the sum of the cells in that event. A marginal probability adds a whole row or column of cells. A conditional probability keeps one row or column and divides by its total, because once that value is known, that row or column is the whole sample space.

![[Media/Figures/Joint_Probability_Function.svg|340]]

### Events, sums and the multinomial

- The probability of any event about the pair is the sum of the joint PMF over every pair $(x, y)$ in the event: $P((X, Y) \in A) = \sum_{(x,y) \in A} p(x, y)$.
- From a joint table, an event on one variable (such as $X < k$) takes every cell in the rows that satisfy it, across all columns. In contrast, an event on both variables takes only the cells that satisfy both conditions at once.
- For a sum, list every pair that adds to $s$ and add their joint probabilities:

> $$P(X + Y = s) = \sum_x p(x,\, s - x)$$

- When the joint PMF is given as a marginal times a conditional, each term is $p_X(x)\, p(s - x \mid x)$. Conditioning on the sum then divides by this total: $P(X = x \mid X + Y = s) = p(x, s - x) / P(X + Y = s)$.
- **Multinomial distribution.** When each of $n$ independent trials falls into exactly one of $k$ categories with fixed probabilities $p_1, \ldots, p_k$ (which sum to 1), the category counts $(N_1, \ldots, N_k)$ have the joint probability function

> $$P(N_1 = n_1, \ldots, N_k = n_k) = \frac{n!}{n_1!\, n_2! \cdots n_k!}\, p_1^{n_1} p_2^{n_2} \cdots p_k^{n_k}, \quad n_1 + \cdots + n_k = n$$

- Each ordering of the outcomes with those counts has probability $p_1^{n_1} \cdots p_k^{n_k}$, and the coefficient $n!/(n_1! \cdots n_k!)$ counts the orderings. The multinomial distribution extends the [[Binomial Distribution|binomial]] to more than two outcomes. For three categories, with $i$ and $j$ the counts in the first two:

> $$p(i, j) = \frac{n!}{i!\, j!\, (n - i - j)!}\, p_1^{i}\, p_2^{j}\, p_3^{\,n - i - j}$$

- Each category's count on its own is binomial: every trial lands in category $i$ with probability $p_i$ or not, so $N_i \sim \text{Binomial}(n, p_i)$, $E[N_i] = n p_i$ and $P(N_i \ge 1) = 1 - (1 - p_i)^n$.

> [!example]- Number of Claims and Policies Lapsed {Example}
> Let $X$ = number of claims (0 or 1) and $Y$ = policies lapsed (0 or 1). Joint PMF:
>
> | | $Y=0$ | $Y=1$ |
> |---|---|---|
> | $X=0$ | 0.50 | 0.20 |
> | $X=1$ | 0.20 | 0.10 |
>
> > [!answer]-
> > The joint probability is one cell: $P(X=1, Y=1) = 0.10$. The marginal probability adds the row: $P(X=1) = 0.20 + 0.10 = 0.30$.
> >
> > Conditional: fixing $Y = 1$ leaves the slice $(0.20, 0.10)$, which sums to $p_Y(1) = 0.30$, so $P(X=1 \mid Y=1) = 0.10/0.30 = 1/3$ and $P(X=0 \mid Y=1) = 2/3$.

> [!tip]- How it appears on the exam
> - **Exam P** (Multivariate Random Variables, outcomes 1–3): the joint PMF is given as a table or as a formula such as $c(x + 2y)$ on a listed set of pairs. The question asks for the constant that makes the probabilities total 1, and then a marginal, a conditional probability or the probability of an event.
> - The same table then feeds a moment calculation: $E[XY]$, a [[Covariance|covariance]] or a [[Correlation Coefficient|correlation]], or the variance of a conditional distribution.
> - Variations: a table with missing entries recovered from the total of 1 or from given marginals, a joint CDF table from which the PMF must be recovered, and multinomial counts (categories of drivers, types of claim).

> [!warning]- Exam traps
> - **Summing over the wrong support.** When the pairs are restricted (for example $x \le y$), the constant comes from summing only the allowed pairs. Summing over the full rectangle gives a constant that is too small, so every probability calculated from it is wrong.
> - **Dividing by the wrong marginal.** $P(X = x \mid Y = y)$ divides by $p_Y(y)$, the total of the fixed slice. Dividing by $p_X(x)$, or not dividing at all, leaves numbers that don't sum to 1 across the slice. Checking that the slice sums to 1 catches the error.
> - **Independence from one cell.** One cell with $p(x,y) \ne p_X(x)\,p_Y(y)$ proves dependence. One cell that matches proves nothing, because independence needs the product rule in every cell.
> - **PMF from a joint CDF.** Differencing a joint CDF table takes four terms, $p(x,y) = F(x,y) - F(x-1,y) - F(x,y-1) + F(x-1,y-1)$ on integer values. Subtracting only one neighbour leaves a cumulative total, not a single cell.
