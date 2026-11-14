---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:56181d08966da5e85f03b7d2f3e61e16845106945f22b6bd7ade8d07b409062f
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.3.1 Covariance and Correlation (Cov = E[XY]-EX EY; Lemma 5.3 bilinearity; rho = Cov/(sigma_X sigma_Y); -1 <= rho <= 1; independent implies uncorrelated, converse not necessarily true), web page as fetched 2026-09-28, sha256:330faf8fb05f924926ce40a5e577b79910d97ec946263f40c64bf5e1277a9f82 — https://www.probabilitycourse.com/chapter5/5_3_1_covariance_correlation.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Ex. 6.2.23 (PDF p.275), Exercises 6.3.17-18 (PDF p.289), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Covariance and Correlation Coefficient.md
---

The **Covariance** of two [[Random Variable|random variables]] $X$ and $Y$, $\text{Cov}(X, Y)$, measures the direction of the linear relationship between them. It is positive if they tend to move together and negative if they tend to move in opposite directions. The **Correlation Coefficient** $\rho_{X,Y}$ standardises the covariance into the range $[-1, 1]$. [[Covariance]] and [[Correlation]] each have a page of their own.

The covariance of $X$ and $Y$ is

> $$\text{Cov}(X, Y) = E[XY] - E[X]\,E[Y]$$

From a joint probability table, $E[XY]$ is the sum of $xy\,p(x, y)$ over every cell, and $E[X]$ and $E[Y]$ come from the marginal distributions, the row and column sums.

> [!example]- The joint PMF of hours studied $X$ and exam score $Y$ is $p(1,4)=0.2$, $p(1,8)=0.1$, $p(3,4)=0.1$ and $p(3,8)=0.6$. What is $\text{Cov}(X, Y)$? {Example}
> - The marginal probabilities are $P(X = 1) = 0.3$, $P(X = 3) = 0.7$, $P(Y = 4) = 0.3$ and $P(Y = 8) = 0.7$.
> - The marginal means are $E[X] = 1(0.3) + 3(0.7) = 2.4$ and $E[Y] = 4(0.3) + 8(0.7) = 6.8$.
> - Summing $xy\,p(x, y)$ over the four cells gives $E[XY] = 4(0.2) + 8(0.1) + 12(0.1) + 24(0.6) = 17.2$.
> - The covariance is $17.2 - (2.4)(6.8) = 17.2 - 16.32 = 0.88$.
> - The covariance is positive, so more hours studied go with higher scores.

The correlation coefficient of $X$ and $Y$ is

> $$\rho_{X,Y} = \frac{\text{Cov}(X, Y)}{\sigma_X \, \sigma_Y}$$

- $\sigma_X$ and $\sigma_Y$ are the [[Standard Deviation|standard deviations]] of $X$ and $Y$.

The correlation is unit-free and comparable across scales, whereas the covariance carries the product of the two variables' units. Rearranged, the formula gives $\text{Cov}(X, Y) = \rho_{X,Y}\,\sigma_X\,\sigma_Y$. When a question gives the correlation, the means and the standard deviations, this gives $E[XY]$, and from it an unknown joint probability.

> [!example]- For the same hours studied $X$ and exam score $Y$, what is the correlation coefficient $\rho_{X,Y}$? {Example}
> - $E[X^2] = 1(0.3) + 9(0.7) = 6.6$, so $\text{Var}(X) = 6.6 - 2.4^2 = 0.84$.
> - $E[Y^2] = 16(0.3) + 64(0.7) = 49.6$, so $\text{Var}(Y) = 49.6 - 6.8^2 = 3.36$.
> - $\sigma_X\,\sigma_Y = \sqrt{0.84 \times 3.36} = 1.68$.
> - The correlation coefficient is $\rho_{X,Y} = 0.88/1.68 = 0.524$.

## Properties of covariance

Covariance is bilinear. For constants $a$ and $b$, the covariance of a linear combination is

> $$\text{Cov}(aX + bY,\, Z) = a\,\text{Cov}(X, Z) + b\,\text{Cov}(Y, Z)$$

- $Z$ is a third random variable.

The same expansion works in the second argument, so the covariance of two sums is the sum of the covariances of every pair of terms. Adding a constant to either variable leaves the covariance unchanged, the covariance with a constant is $0$, and $\text{Cov}(X, X) = \text{Var}(X)$. When two variables are deterministically related, write one as a linear function of the other and substitute it into the covariance.

> [!example]- A fair coin is tossed $10$ times. What is the covariance of the number of heads $H$ and the number of tails $T$? {Example}
> - The tosses give $H + T = 10$, so $T = 10 - H$.
> - Adding the constant $10$ changes nothing, so $\text{Cov}(H, T) = \text{Cov}(H, -H) = -\text{Cov}(H, H) = -\text{Var}(H)$.
> - $H$ is [[Binomial Distribution|binomial]] with $n = 10$ and $p = 0.5$, so $\text{Var}(H) = 10(0.5)(0.5) = 2.5$.
> - The covariance is $\text{Cov}(H, T) = -2.5$.

> [!trap] Zero correlation taken as independence
> $\rho_{X,Y} = 0$ means no linear relationship, but not necessarily [[Independent Random Variables|independence]]. A variable that is a nonlinear function of another, such as a U-shaped one, can have zero covariance with it. Independence needs the joint probability to equal the product of the marginals in every cell.
