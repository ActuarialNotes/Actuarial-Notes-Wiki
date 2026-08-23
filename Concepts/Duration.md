---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:90f01670c3efb689535dc7416ddcef2f50960414da22a06adfddfb667f5be1ea
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Duration.md
---

**Duration** measures the weighted-average time of a bond's (or portfolio's) cash flows, and quantifies its sensitivity to interest rate changes. Two main types:

- **[[Macaulay Duration]]** $D_{Mac}$: weighted-average time of cash flows, weighted by present value
- **[[Modified Duration]]** $D_{Mod}$: approximate percentage change in price per unit change in yield

> $$D_{Mod} = \frac{D_{Mac}}{1+j} \approx -\frac{1}{P}\frac{dP}{dj}$$

- where $j$ is the [[Yield Rate]] per period; a longer duration means higher interest rate sensitivity
- Duration is the foundation for [[Immunization]] and [[Duration Matching]]

![[Media/Figures/Duration.svg|340]]

> [!example]- Duration and Price Change {Example}
> A bond has modified duration of 6 years. Yields rise by 0.5%. Estimate the percentage change in price.
>
> > [!answer]-
> > $$\frac{\Delta P}{P} \approx -D_{Mod} \cdot \Delta j = -6 \times 0.005 = -0.03 = -3\%$$
> > The bond price falls approximately 3%.
