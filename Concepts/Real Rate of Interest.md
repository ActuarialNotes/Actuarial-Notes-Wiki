---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2cebfba5eccfe3a58c050bc49e0b07998f6f94939b0d2a274d413a161991844b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Real Rate of Interest.md
---

The **real rate of interest** $i_r$ adjusts the nominal [[Interest Rate]] $i$ for the effect of [[Inflation]] $r$, representing the true growth in purchasing power:

> $$1 + i_r = \frac{1+i}{1+r}$$

> $$i_r \approx i - r \text{ (for small rates)}$$

- If the nominal rate exceeds inflation, the real rate is positive (purchasing power grows).
- If inflation exceeds the nominal rate, the real rate is negative.
- The real rate is essential for comparing investment returns across different inflationary environments.

![[Media/Figures/Real_Rate_of_Interest.svg|340]]

> [!example]- Inflation-Adjusted Return {Example}
> A bond pays a nominal yield of 8%. Inflation is running at 3%. Find the real rate of interest.
>
> > [!answer]-
> > $$i_r = \frac{1.08}{1.03} - 1 = 1.04854 - 1 = 4.854\%$$
> > The investor's purchasing power grows at approximately 4.85% per year.
