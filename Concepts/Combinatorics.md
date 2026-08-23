---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:43997ee99a992611bab52dac4e7920c82aca9d866a959fea78cd6956020574c0
  sources: []
  open_findings: 0
  log: .verify/Concepts/Combinatorics.md
---

**Combinatorics** is a branch of [[Discrete Mathematics]] concerned with counting the number of ways to arrange, select, or partition objects.
- It provides the tools needed to compute probabilities when outcomes are equally likely
- The two fundamental problems are counting **ordered** arrangements ([[Permutation]]s) and **unordered** selections ([[Combination]]s)
- In probability, combinatorics determines the sizes of events and sample spaces: $P(A) = |A| / |S|$ for uniform experiments

> $$|\text{arrangements of } n \text{ objects}| = n!$$

> $$= n \times (n-1) \times \cdots \times 2 \times 1$$

![[Media/Figures/Combinatorics.svg|340]]

> [!example]- Counting Equally Likely Outcomes for a Lottery {Example}
> A lottery draws 3 numbers from $\{1, 2, 3, 4, 5\}$ without replacement. How many equally likely outcomes are there if order does not matter?
>
> > [!answer]-
> > This is a combination problem (order irrelevant, no replacement):
> > $$\binom{5}{3} = \frac{5!}{3!\,2!} = \frac{120}{6 \times 2} = 10$$
> > There are 10 equally likely outcomes, so each has probability $1/10 = 0.10$.
