---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:428d8051d74c3324e9ea8226161bc33138c2dc5ba41e9b59dba26e2f2be46c5f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probability Multiplication Rules.md
---

The **Probability Multiplication Rules** give the [[Probability|probability]] that two [[Event|events]] both occur from a [[Conditional Probability|conditional probability]]. For events $E$ and $F$, the probability that both occur is

> $$P(E \cap F) = P(E)\,P(F \mid E)$$

> $$P(E \cap F) = P(F)\,P(E \mid F)$$

- $P(F \mid E)$ is the probability of $F$ given that $E$ has occurred.

The rule rearranges the definition of conditional probability, $P(F \mid E) = P(E \cap F)/P(E)$. When $E$ and $F$ are [[Independent Events|independent]], it reduces to $P(E \cap F) = P(E)\,P(F)$.

> [!example]- A bag has 5 red and 3 blue marbles. Two are drawn without replacement. What is the probability that both are red? {Example}
> - Let $E$ be "the first marble is red" and $F$ be "the second marble is red".
> - Five of the 8 marbles are red, so $P(E) = \frac{5}{8}$.
> - Without replacement, 4 red marbles remain among 7 after a red is drawn, so $P(F \mid E) = \frac{4}{7}$.
> - The probability that both are red is $P(E \cap F) = \frac{5}{8} \times \frac{4}{7} = \frac{5}{14} \approx 0.357$.

## The multiplication rule for three events

For three events $E$, $F$ and $G$, the probability that all three occur is

> $$P(E \cap F \cap G) = P(E)\,P(F \mid E)\,P(G \mid E \cap F)$$

- $P(G \mid E \cap F)$ is the probability of $G$ given that both $E$ and $F$ have occurred.

> [!example]- A bag has 5 red and 3 blue marbles. Three are drawn without replacement. What is the probability that all three are red? {Example}
> - The first is red with probability $\frac{5}{8}$.
> - Given a red first, the second is red with probability $\frac{4}{7}$.
> - Given two reds, 3 red marbles remain among 6, so the third is red with probability $\frac{3}{6}$.
> - The probability that all three are red is $\frac{5}{8} \times \frac{4}{7} \times \frac{3}{6} = \frac{5}{28} \approx 0.179$.
