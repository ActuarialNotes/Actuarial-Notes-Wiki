---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:97dc522295bf7f9264d9fa2c31012584d45dff0febe598481d22567a55c22a8a
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §3 Macaulay and Modified Duration, (3.1)-(3.3), PDF p.5, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §3, (3.5)-(3.8), PDF p.6, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §54 Macaulay and Modified Durations, PDF p.471, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Duration.md
---

**Duration** measures the weighted-average time of a bond's (or portfolio's) cash flows, and quantifies its sensitivity to interest rate changes. Two main types:

- **[[Macaulay Duration]]** $D_{Mac}$: weighted-average time of cash flows, weighted by present value
- **[[Modified Duration]]** $D_{Mod}$: approximate percentage change in price per unit change in yield

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
