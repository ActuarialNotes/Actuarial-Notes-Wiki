---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c09509fb975861c8e04ffe8462b4e1289b74f8134ef33d721ee08f7abb9d3b4b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Central Limit Theorem.md
---

The **Central Limit Theorem** (CLT) states that the standardized sum of independent and identically distributed random variables with mean $\mu$ and finite variance $\sigma^2$ converges in distribution to a standard normal as $n \to \infty$.

> $$\frac{S_n - n\mu}{\sigma\sqrt{n}} \xrightarrow{d} N(0,1) \quad \text{as } n \to \infty$$
>
> $$\text{where } S_n = X_1 + \cdots + X_n$$

- For large $n$, $S_n$ is approximately $N(n\mu,\, n\sigma^2)$ regardless of the original distribution

![[Media/Figures/Central_Limit_Theorem.svg|340]]

> [!example]- Approximating Total Claims Across 200 Policies {Example}
> An insurer has 200 independent policies. Each policy's annual claim has mean \$500 and standard deviation \$300. Approximate $P(S_{200} > 104{,}000)$.
>
> > [!answer]-
> > By the CLT, $S_{200} \approx N(n\mu,\, n\sigma^2)$:
> > $$\mu_S = 200 \times 500 = 100{,}000, \qquad \sigma_S = \sqrt{200 \times 300^2} = 300\sqrt{200} \approx 4{,}243$$
> > Standardising:
> > $$P(S_{200} > 104{,}000) = P\!\left(Z > \frac{104{,}000 - 100{,}000}{4{,}243}\right) = P(Z > 0.94) \approx 0.1736$$
