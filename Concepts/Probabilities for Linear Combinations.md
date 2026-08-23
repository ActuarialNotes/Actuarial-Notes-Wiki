---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8863e4f390deb35e31177f70282d612c1f58aba5afcea5d354090e1157db22be
  sources: []
  open_findings: 0
  log: .verify/Concepts/Probabilities for Linear Combinations.md
---

A **linear combination** of independent random variables $L = c_1 X_1 + c_2 X_2 + \cdots + c_n X_n$ is normally distributed when the $X_i$ are independent normals, enabling exact probability calculations via standardization.

> $$L = c_1 X_1 + \cdots + c_n X_n \sim N\!\left(\sum_i c_i\mu_i,\ \sum_i c_i^2\sigma_i^2\right)$$
>
> $$\text{where } X_1, \ldots, X_n \text{ are independent normal random variables}$$

- For non-normal independent random variables, the [[Central Limit Theorem]] provides an approximation for large $n$

![[Media/Figures/Probabilities_for_Linear_Combinations.svg|340]]

> [!example]- Probability That Portfolio Loss Exceeds a Threshold {Example}
> Two independent losses: $X_1 \sim N(100, 10^2)$ and $X_2 \sim N(200, 15^2)$. Find $P(X_1 + X_2 > 340)$.
>
> > [!answer]-
> > The sum $L = X_1 + X_2$ is normal with:
> > $$\mu_L = 100+200 = 300, \qquad \sigma_L = \sqrt{10^2+15^2} = \sqrt{325} \approx 18.03$$
> > Standardising:
> > $$P(L > 340) = P\!\left(Z > \frac{340-300}{18.03}\right) = P(Z > 2.22) \approx 0.0132$$
