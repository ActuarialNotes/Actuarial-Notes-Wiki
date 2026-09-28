---
verification:
  status: verified
  confidence: low
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:2deb5ee1323d5731cb9c02bebd312bee9aec1f6c4f0f81df246c0775eadb6fef
  sources:
    - "Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §3 Macaulay and Modified Duration, (3.2)-(3.3), PDF p.5, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §4 First-Order Approximations, (4.1), PDF p.6, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §6 Second-Order Approximations, (6.1), PDF p.8, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 1
  open_critical: 0
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
