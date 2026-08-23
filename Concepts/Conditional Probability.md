---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e04f4a3e27cbe9188fd70cb4b5c937b53e9fc9474a38e779d195e7fd27e50115
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Conditional Probability.md
---

**Conditional Probability** $P(A \mid B)$ is the probability that event $A$ occurs given that event $B$ is known to have occurred, restricting the sample space to $B$.

> $$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$

- If $A$ and $B$ are independent, then $P(A \mid B) = P(A)$
- Conditional probability is foundational to [[Bayes Theorem]], [[The Law of Total Probability]], and various insurance and actuarial calculations

![[Media/Figures/Conditional_Probability.svg|340]]

> [!example]- Claim Severity Given Deductible Threshold {Example}
> A loss $X$ is uniformly distributed on $(0, 1000)$. Given that the loss exceeds 400, what is the probability it also exceeds 700?
>
> > [!answer]-
> > Let $A = \{X > 700\}$ and $B = \{X > 400\}$. Since $A \subseteq B$, we have $A \cap B = A$.
> > $$P(A \mid B) = \frac{P(X > 700)}{P(X > 400)} = \frac{300/1000}{600/1000} = \frac{300}{600} = 0.5$$
