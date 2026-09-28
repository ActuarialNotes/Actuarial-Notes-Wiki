---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:8863e4f390deb35e31177f70282d612c1f58aba5afcea5d354090e1157db22be
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Example 7.5 Sum of Two Independent Normal Random Variables (printed p.294, PDF p.302), Ex. 6.3 on rho X + sqrt(1-rho^2) V (printed p.282, PDF p.290), Thms 6.10, 6.14, 6.16 (printed pp.269-272, PDF pp.277-280), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P normal distribution table (rev. 4/29/21), row z=2.2 (column .02 = 0.9868), sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 3 (Multivariate Random Variables) learning outcomes g-i, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Probabilities for Linear Combinations.md
---

Probabilities for a **linear combination** $L = c_1 X_1 + c_2 X_2 + \cdots + c_n X_n$ of independent random variables can be found exactly in two cases. When the $X_i$ are independent normals, $L$ is itself normal and is handled by standardization. When the $X_i$ are independent and discrete, the distribution of $L$ is built by adding up, for each value of $L$, the probabilities of the combinations of values that produce it.

> $$L = c_1 X_1 + \cdots + c_n X_n \sim N\!\left(\sum_i c_i\mu_i,\ \sum_i c_i^2\sigma_i^2\right)$$
>
> $$\text{where } X_1, \ldots, X_n \text{ are independent normal random variables}$$

> $$P(X + Y = s) = \sum_{x} P(X = x)\,P(Y = s - x) \qquad \text{for independent integer-valued } X, Y$$

- The discrete sum above is the **convolution** of the two probability functions; for more than two variables, convolve one at a time, and a coefficient only relabels values ($2X$ takes the values $0, 2, 4, \ldots$).
- Some families are closed under independent sums: independent Poisson variables sum to a Poisson with the means added, so no convolution is needed.
- For the sum or mean of many i.i.d. non-normal variables with finite variance, the [[Central Limit Theorem]] gives an approximation instead — see [[Normal Approximation]].

![[Media/Figures/Probabilities_for_Linear_Combinations.svg|340]]

> [!example]- Probability That Portfolio Loss Exceeds a Threshold {Example}
> Two independent losses: $X_1 \sim N(100, 10^2)$ and $X_2 \sim N(200, 15^2)$. Find $P(X_1 + X_2 > 340)$.
>
> > [!answer]-
> > The sum $L = X_1 + X_2$ is normal with:
> > $$\mu_L = 100+200 = 300, \qquad \sigma_L = \sqrt{10^2+15^2} = \sqrt{325} \approx 18.03$$
> > Standardising:
> > $$P(L > 340) = P\!\left(Z > \frac{340-300}{18.03}\right) = P(Z > 2.22) \approx 0.0132$$

> [!example]- Total Claims from Two Independent Policies {Example}
> Policy A has $X$ claims with $P(X=0)=0.5$, $P(X=1)=0.3$, $P(X=2)=0.2$. Policy B, independently, has $Y$ claims with $P(Y=0)=0.6$, $P(Y=1)=0.4$. Find $P(X + Y \ge 2)$.
>
> > [!answer]-
> > Add the products over the pairs of values that give each total:
> > $$
> > \begin{align*}
> > P(X+Y=0) &= (0.5)(0.6) = 0.30 \\
> > P(X+Y=1) &= (0.5)(0.4) + (0.3)(0.6) = 0.38
> > \end{align*}
> > $$
> > So $P(X + Y \ge 2) = 1 - 0.30 - 0.38 = 0.32$. Directly, $P(X+Y=2) = (0.3)(0.4) + (0.2)(0.6) = 0.24$ and $P(X+Y=3) = (0.2)(0.4) = 0.08$, which also total $0.32$.
