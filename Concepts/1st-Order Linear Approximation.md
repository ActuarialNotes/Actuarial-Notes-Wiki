---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:8422ade2082f9dabd5f040b24a0e06d729754736a192f31a6d27d524d8307ac6
  sources:
    - "Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §1 Introduction, PDF p.3, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §3 Macaulay and Modified Duration, (3.2)-(3.3), PDF p.5, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §4 First-Order Approximations of Present Value, (4.1), PDF p.6, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), Appendix C, Theorems C.1-C.5, PDF p.14, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), Appendix C, Theorem C.5, PDF p.17, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §6 Second-Order Approximations, (6.1), PDF p.8, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/1st-Order Linear Approximation.md
---

The **1st-order linear approximation** (or first-order Taylor approximation) estimates the change in bond price for a small change in [[Yield Rate]] $\Delta j$, using [[Modified Duration]]:

> $$\Delta P \approx -D_{Mod} \cdot P \cdot \Delta j$$

> $$\frac{\Delta P}{P} \approx -D_{Mod} \cdot \Delta j = -\frac{D_{Mac}}{1+j} \cdot \Delta j$$

- This approximation is accurate for small $\Delta j$ but underestimates price increases and overestimates price decreases for large shifts, because the price-yield relationship is convex
- The [[Convexity]] term corrects for this curvature

![[Media/Figures/1st-Order_Linear_Approximation.svg|340]]

> [!example]- Estimating Price Change {Example}
> A bond has price \$$950$, modified duration $8.5$ years. Yields fall by 25 basis points ($\Delta j = -0.0025$).
>
> > [!answer]-
> > $$\Delta P \approx -8.5 \times 950 \times (-0.0025) = 8.5 \times 950 \times 0.0025 = 20.19$$
> > The bond price increases by approximately \$$20.19$.
