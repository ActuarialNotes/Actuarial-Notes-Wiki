---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2d98b81ef9f2162200fa926a8514c20134277000acc157d5ef65efe1a35d17b3
  sources: []
  open_findings: 0
  log: .verify/Concepts/Uniform Continuous Distribution.md
---

The **Continuous Uniform Distribution** $X \sim \text{Unif}(a, b)$ assigns equal probability density to every point in the interval $(a, b)$, making it the continuous analogue of the discrete uniform. It is commonly used as a simple loss model when all outcomes in a range are equally plausible.

> $$f(x) = \frac{1}{b - a}, \quad a < x < b$$

- $E[X] = (a+b)/2$, $\text{Var}(X) = (b-a)^2/12$, and $F(x) = (x-a)/(b-a)$ for $a < x < b$
- Conditional distributions on sub-intervals are also uniform (memoryless within the support)

![[Media/Figures/Uniform_Continuous_Distribution.svg|340]]

> [!example]- Expected Payment with Uniform Losses and a Deductible {Example}
> Ground-up losses $X \sim \text{Unif}(0, 1000)$. An ordinary deductible of $d = 300$ applies. Find $E[(X - 300)_+]$.
>
> > [!answer]-
> > Since losses are uniform, those above 300 are distributed $\text{Unif}(300, 1000)$. The probability of exceeding the deductible is $P(X > 300) = 700/1000 = 0.7$, and given $X > 300$ the expected excess is $700/2 = 350$. Therefore:
> > $$E[(X-300)_+] = P(X > 300) \times E[X - 300 \mid X > 300] = 0.7 \times 350 = 245$$
