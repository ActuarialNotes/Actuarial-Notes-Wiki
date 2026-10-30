---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:754b1b76d848f3b38910e4c834e77bf5a3a4d7d4ed816d5f64c217a1ba182a98
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.1.1 Joint Probability Mass Function (sum of the joint PMF over its range = 1; marginal PMF), web page as fetched 2026-09-28, sha256:29a5a73be1d726200cac31415dba2c0cd3ec0184d5f6f81d333ac195ab3a707a — https://www.probabilitycourse.com/chapter5/5_1_1_joint_pmf.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.3 Conditioning and Independence (discrete conditional PMF P_X|Y = P_XY/P_Y), web page as fetched 2026-09-28, sha256:a87cccc76b2d0a5139f26cd6a59fa1aac41b982e3e3d2d16bb353b9c41dac04c — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q244 (marginal by adding columns, PDF p.72), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.1.1 Joint PMF: P((X,Y) in A) = sum of P_XY over (A cap R_XY); R_XY taken as R_X x R_Y with some P_XY zero; marginal PMF eq. (5.1), HTML fetched 2026-10-30, sha256:eeadad2f381a4b909be811c27c4f8b6e9e85b96678a9fa9a25bf57ade8bfbabf — https://www.probabilitycourse.com/chapter5/5_1_1_joint_pmf.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.3 Conditioning and Independence: f_{X|A}(x) = f_X(x)/P(A) on A, conditional expectation as the integral against f_{X|A}; independent X, Y have f_XY = f_X f_Y and E[g(X)h(Y)] = E[g(X)]E[h(Y)], HTML fetched 2026-10-30, sha256:b9e764e0b2adb7b888334dd58ee563d47c9c6cd66bd666fa4fa24c7d5e3b32a4 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 11.5 The Multinomial Distribution: each sequence with outcome i occurring j_i times has probability p_1^{j_1}...p_k^{j_k}, the number of such sequences is the multinomial coefficient; generalizes Bernoulli trials (k = 2); Y_i is binomial with parameters n and p_i, HTML fetched 2026-10-30, sha256:eee1779c2c22be3a73f51f9149c846395c8ba2cbe8609433afd865b3c9a50e2e — https://www.randomservices.org/random/bernoulli/Multinomial.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Joint Probability Function.md
---

The **joint probability function** (joint PMF) of discrete random variables $X$ and $Y$ fully characterizes the [[Multivariate Distribution]] of $(X, Y)$.

> $$p(x,y) = P(X = x,\; Y = y)$$

- It satisfies $p(x,y) \geq 0$ for all $(x,y)$ and $\displaystyle\sum_x \sum_y p(x,y) = 1$
- [[Marginal Probability Function]]s are obtained by summing out one variable
- [[Conditional Probability Function]]s are obtained by fixing one variable and dividing by its marginal, so the slice sums to 1: $p_{X \mid Y}(x \mid y) = \dfrac{p(x,y)}{p_Y(y)}$ for $p_Y(y) > 0$

![[Media/Figures/Joint_Probability_Function.svg|340]]

### Events, sums and the multinomial

- The probability of any event about the pair is the sum of the joint PMF over every pair $(x, y)$ in the event: $P((X, Y) \in A) = \sum_{(x,y) \in A} p(x, y)$.
- From a joint table, an event on one variable (such as $X < k$) takes every cell in the rows that satisfy it, across all columns; an event on both variables takes only the cells that satisfy both conditions at once.
- For a sum, list every pair that adds to $s$ and add their joint probabilities:

> $$P(X + Y = s) = \sum_x p(x,\, s - x)$$

- When the joint PMF is given as a marginal times a conditional, each term is $p_X(x)\, p(s - x \mid x)$. Conditioning on the sum then divides by this total: $P(X = x \mid X + Y = s) = p(x, s - x) / P(X + Y = s)$.
- **Multinomial distribution.** When each of $n$ independent trials falls into exactly one of $k$ categories with fixed probabilities $p_1, \ldots, p_k$ (which sum to 1), the category counts $(N_1, \ldots, N_k)$ have the joint probability function

> $$P(N_1 = n_1, \ldots, N_k = n_k) = \frac{n!}{n_1!\, n_2! \cdots n_k!}\, p_1^{n_1} p_2^{n_2} \cdots p_k^{n_k}, \quad n_1 + \cdots + n_k = n$$

- Each ordering of the outcomes with those counts has probability $p_1^{n_1} \cdots p_k^{n_k}$, and the coefficient $n!/(n_1! \cdots n_k!)$ counts the orderings. The multinomial extends the [[Binomial Distribution|binomial]] to more than two outcomes. For three categories, with $i$ and $j$ the counts in the first two:

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
> > $P(X=1, Y=1) = 0.10$. Marginal $P(X=1) = 0.20 + 0.10 = 0.30$.
> >
> > Conditional: fixing $Y = 1$ leaves the slice $(0.20, 0.10)$, which sums to $p_Y(1) = 0.30$, so $P(X=1 \mid Y=1) = 0.10/0.30 = 1/3$ and $P(X=0 \mid Y=1) = 2/3$.
