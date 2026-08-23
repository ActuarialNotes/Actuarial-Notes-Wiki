---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2deb5ee1323d5731cb9c02bebd312bee9aec1f6c4f0f81df246c0775eadb6fef
  sources: []
  open_findings: 0
  log: .verify/Concepts/Modified Duration.md
---

**Modified duration** $D_{Mod}$ measures the percentage change in price per unit increase in the [[Yield Rate]] $j$:

> $$D_{Mod} = -\frac{1}{P}\frac{dP}{dj}$$

> $$= \frac{D_{Mac}}{1+j}$$

> $$\Delta P \approx -D_{Mod} \cdot P \cdot \Delta j$$

- It provides the [[1st-Order Linear Approximation]] for price changes
- Modified duration is always less than [[Macaulay Duration]] (since $1+j > 1$)
- For a more accurate approximation accounting for price-yield curvature, add the [[Convexity]] correction:

> $$\Delta P \approx -D_{Mod} \cdot P \cdot \Delta j + \frac{1}{2} \cdot \text{Convexity} \cdot P \cdot (\Delta j)^2$$

![[Media/Figures/Modified_Duration.svg|340]]

> [!example]- Converting Between Duration Types {Example}
> A bond has Macaulay duration of 7.5 years at a yield of 6% effective annual. Find the modified duration and the approximate price drop if yields rise to 6.5%.
>
> > [!answer]-
> > $D_{Mod} = 7.5/1.06 = 7.075$ years.
> > $\Delta P/P \approx -7.075 \times 0.005 = -3.54\%$. A $100{,}000$ face bond would lose approximately \$$3{,}540$ in value.
