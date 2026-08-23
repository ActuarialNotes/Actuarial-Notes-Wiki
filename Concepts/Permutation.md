---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3a2dd61bcfc3e7be9cf1268d0a1ed9d40a31dd58c734821ecce46948775fd0ae
  sources: []
  open_findings: 0
  log: .verify/Concepts/Permutation.md
---

A **Permutation** $P(n, k)$ counts the number of ways to select and arrange $k$ objects from $n$ distinct objects in a specific order.
- Permutations assume without replacement: you cannot select the same object twice
- Permutations differ from combinations by a factor of $k!$: the number of ways to order the selected objects
- Use permutations when sequence matters: ranking, scheduling, or assigning distinct roles

> $$P(n, k) = \frac{n!}{(n-k)!}$$

> $$= n \times (n-1) \times \cdots \times (n-k+1)$$

![[Media/Figures/Permutation.svg|340]]

> [!example]- Assigning Ranked Prizes to Adjusters {Example}
> From 8 adjusters, an insurer awards a 1st, 2nd, and 3rd place performance bonus. How many distinct award outcomes are possible?
>
> > [!answer]-
> > Order matters (1st ≠ 2nd ≠ 3rd place), so this is a permutation:
> > $$P(8, 3) = \frac{8!}{(8-3)!} = \frac{8!}{5!} = 8 \times 7 \times 6 = 336$$
> > There are 336 distinct ways to assign the three ranked prizes, compared to only $\binom{8}{3} = 56$ unordered committees.
