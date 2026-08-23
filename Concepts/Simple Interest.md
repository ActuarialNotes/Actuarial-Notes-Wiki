---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:699df40e437f912ec0f97390d453b84211ed5cbed84dd95696dad38c18d331ad
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Simple Interest.md
---

Under **simple interest**, interest is earned only on the original principal — it does not itself earn interest. An investment of $P$ at rate $i$ per period grows to:

> $$A(t) = P(1 + it)$$

- Simple interest is linear in time, in contrast to [[Compound Interest]] which is exponential.
- It is commonly used for short-term instruments (e.g., Treasury bills, inter-period valuations).
- The [[Accumulation Function]] under simple interest is $a(t) = 1 + it$.

![[Media/Figures/Simple_Interest.svg|340]]

> [!example]- Simple Interest Growth {Example}
> $2{,}000$ is invested at 8% per year simple interest for 9 months. Find the accumulated amount.
>
> > [!answer]-
> > $t = 9/12 = 0.75$ years:
> > $$A(0.75) = 2000(1 + 0.08 \times 0.75) = 2000(1.06) = 2120$$
