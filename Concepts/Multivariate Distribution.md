---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:4fa045eda59a40fd4a6cb3955d2b8fdbefc7491f40ee012073820acabe4a7852
  sources:
    - "Orloff & Bloom, MIT OCW 18.05 (Spring 2022), Reading 7b: Covariance and Correlation, Property 6 and Warning: the converse is false (p.1); Example 2, Cov = 0 with Y = X^2 but not independent (p.3); covariance measures the linear relationship (p.4), sha256:71f8a7b5f3b2233de2e8722ec1372f5704195efc2a6fb72c50c8ef505f92c4dc — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-b.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, Joint Distributions, joint distribution carries more information than the marginals; converse holds if X and Y are independent; independent => joint density = product of marginal densities, sha256:2192ffa7b60a3d5e969c74398a7c539483ce8d4e484febd66b251b19897f1f98 — https://www.randomservices.org/random/dist/Joint.html"
    - "Orloff & Bloom, MIT OCW 18.05 (Spring 2022), Reading 7a: Joint Distributions, Independence, §3.2 joint pdf total probability 1 (p.3); §4 independence and Ex. 12, a zero cell cannot equal a product of nonzero marginals (pp.9-10), sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, The Multivariate Hypergeometric Distribution, sampling without replacement: P(Y1=y1,...,Yk=yk) = prod C(m_i,y_i) / C(m,n); with replacement the counts are multinomial, sha256:ce429ccb0682c9be25603fb52bab837daa32b2910c2aeba0603daf193a8cf978 — https://www.randomservices.org/random/urn/MultiHypergeometric.html"
    - "SOA Probability Exam (Exam P) syllabus, November 2026, Topic 3 Multivariate Random Variables (23-30%), objective statement (discrete and continuous settings) and outcomes a-e (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Multivariate Distribution.md
---

A **multivariate distribution** describes the joint probabilistic behavior of two or more [[Random Variable]]s. For random variables $X_1, X_2, \ldots, X_n$, the joint distribution is characterized by the [[Joint Probability Function]] (discrete) or joint density function (continuous).

- **[[Marginal Probability Function]]s**: distributions of individual variables after integrating/summing out the others
- **[[Conditional Probability Function]]s**: distributions of one variable given fixed values of the others
- **[[Covariance]] and [[Correlation Coefficient]]**: measures of linear dependence between pairs of variables
- If all variables are [[Independent Random Variables]], the joint distribution factors as the product of the marginals

> [!idea] The idea
> The marginals alone cannot say how the variables move together: the example's marginals ($0.5/0.5$ and $0.4/0.6$) fit a dependent pair and an independent one equally well. So the joint distribution is the full description, and marginals, conditionals and covariance are read off it — the marginals rebuild the joint only under independence, by multiplying.

![[Media/Figures/Multivariate_Distribution.svg|340]]

### The multinomial distribution

When each of $n$ independent trials falls into exactly one of $k$ categories with fixed probabilities $p_1, \ldots, p_k$ (summing to 1), the category counts $(N_1, \ldots, N_k)$ have a **multinomial distribution** (a trinomial for $k = 3$), the multivariate extension of the [[Binomial Distribution|binomial]]:

> $$P(N_1 = n_1, \ldots, N_k = n_k) = \frac{n!}{n_1! \cdots n_k!}\,p_1^{n_1} \cdots p_k^{n_k}$$

- where $n_1 + \cdots + n_k = n$;
- the multinomial coefficient $n!/(n_1! \cdots n_k!)$ counts the orders in which those counts can occur, and each order has probability $p_1^{n_1} \cdots p_k^{n_k}$.

> [!example]- Joint vs. Marginal Distribution {Example}
> $X$ and $Y$ each take values $\{0, 1\}$ with joint PMF: $P(0,0)=0.1$, $P(0,1)=0.4$, $P(1,0)=0.3$, $P(1,1)=0.2$.
>
> > [!answer]-
> > Marginal of $X$: $P(X=0) = 0.1+0.4 = 0.5$, $P(X=1) = 0.3+0.2 = 0.5$.
> > Marginal of $Y$: $P(Y=0) = 0.1+0.3 = 0.4$, $P(Y=1) = 0.4+0.2 = 0.6$.
> > Since $P(0,0) = 0.1 \neq P(X=0)P(Y=0) = 0.20$, $X$ and $Y$ are not independent.

> [!tip]- How it appears on the exam
> - **Exam P** (Multivariate Random Variables, 23–30%): a joint distribution given as a table, a PMF formula or a joint density with an unknown constant; find the constant, a marginal or conditional distribution, a probability over a region, or a [[Covariance|covariance]], and decide whether the variables are [[Independent Random Variables|independent]].
> - **Exam P** counting shapes: multinomial counts (drivers in three risk classes, claims of several types), and the multivariate [[Hypergeometric Distribution|hypergeometric]] when items are drawn without replacement from a fixed group.
> - **Exam 9** (ERM questions moved from Exam 7): the dependence between two lines' losses described by a copula, compared with independence.

> [!warning]- Exam traps
> - **Zero covariance read as independence.** Independence gives zero covariance, but not the reverse: covariance measures only the linear relationship. Show the joint equals the product of the marginals everywhere before treating the variables as independent.
> - **A triangular support integrated as a square.** For a density on $0 < x < y < 1$ the inner limits depend on the outer variable. With $f(x,y) = cx$, integrating over the triangle gives $c = 6$; integrating over the unit square gives the wrong $c = 2$. A support that isn't a rectangle also means the variables cannot be independent.
> - **Multinomial for draws without replacement.** The multinomial needs independent trials with fixed probabilities. Drawing claims one after another from a fixed group changes the probabilities after each draw, so the counts are hypergeometric — a product of binomial coefficients over the number of ways to choose the whole sample — not multinomial with each category's share as $p_i$.
