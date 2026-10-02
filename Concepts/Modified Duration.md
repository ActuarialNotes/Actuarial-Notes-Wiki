---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:3adf5f826881a723c7f941cca73d30f25facdd70deaedd5516d6410061b6b302
  sources:
    - "SOA study note FM-24-17, Alps, Using Duration and Convexity to Approximate Change in Present Value (2017), pp.5-8, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Modified Duration.md
---

**Modified duration** $D_{Mod}$ measures the percentage change in price per unit increase in the [[Yield Rate]] $j$:

> $$D_{Mod} = -\frac{1}{P}\frac{dP}{dj}$$

> $$= \frac{D_{Mac}}{1+j}$$

> $$\Delta P \approx -D_{Mod} \cdot P \cdot \Delta j$$

- It provides the [[1st-Order Linear Approximation]] for price changes
- Modified duration is less than [[Macaulay Duration]] whenever $j > 0$ (since then $1+j > 1$)
- For a more accurate approximation accounting for price-yield curvature, add the [[Convexity]] correction:

> $$\Delta P \approx -D_{Mod} \cdot P \cdot \Delta j + \frac{1}{2} \cdot \text{Convexity} \cdot P \cdot (\Delta j)^2$$

![[Media/Figures/Modified_Duration.svg|340]]

> [!example]- Converting Between Duration Types {Example}
> A bond priced at $100{,}000$ has a Macaulay duration of 7.5 years at a yield of 6% effective annual. Find the modified duration and the approximate price drop if yields rise to 6.5%.
>
> > [!answer]-
> > $$D_{Mod} = \frac{7.5}{1.06} = 7.075472 \text{ years}$$
> > The approximation is applied to the bond's **price**, not its face amount:
> > $$
> > \begin{align*}
> > \Delta P &\approx -D_{Mod} \cdot P \cdot \Delta j \\
> > &= -(7.075472)(100{,}000)(0.005) \\
> > &= -3{,}537.74
> > \end{align*}
> > $$
> > The price falls by about $3.54\%$, to roughly $96{,}462$.
