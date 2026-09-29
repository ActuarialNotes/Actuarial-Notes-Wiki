---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:4505c615787dc42ba7eea8b620a0f57e4713ed80ef73b6056409b244be558030
  sources:
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA study note FM-24-17, Alps, Using Duration and Convexity to Approximate Change in Present Value (2017), pp.5-6, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Duration.md
---

**Duration** measures the weighted-average time of a bond's (or portfolio's) cash flows, and quantifies its sensitivity to interest rate changes. Two main types:

- **[[Macaulay Duration]]** $D_{Mac}$: weighted-average time of cash flows, weighted by present value
- **[[Modified Duration]]** $D_{Mod}$: approximate percentage decrease in price per unit increase in yield

On Exam FM, "duration" means Macaulay duration unless the question says otherwise.

> $$D_{Mod} = \frac{D_{Mac}}{1+j} = -\frac{1}{P}\frac{dP}{dj}$$

- where $j$ is the [[Yield Rate]] per period; a longer duration means higher interest rate sensitivity
- Duration is the foundation for [[Immunization]] and [[Duration Matching]]

![[Media/Figures/Duration.svg|340]]

> [!example]- Duration and Price Change {Example}
> A bond has modified duration of 6 years. Yields rise by 0.5%. Estimate the percentage change in price.
>
> > [!answer]-
> > $$\frac{\Delta P}{P} \approx -D_{Mod} \cdot \Delta j = -6 \times 0.005 = -0.03 = -3\%$$
> > The bond price falls approximately 3%.
