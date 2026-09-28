---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:381e3b3834b40697eee9dbbea967958ecbe51222f827c9ea6039fe226a9d1711
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §5 Modified and Macaulay Convexity, (5.1)-(5.3), PDF p.7, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §5, (5.4), PDF p.8, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §6 Second-Order Approximations, (6.1), PDF p.8, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §55 Redington Immunization and Convexity, PDF p.480, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 390, solutions PDF p.103, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 108, questions PDF p.46, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 108, solutions PDF p.31, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Convexity.md
---

**Convexity** measures the curvature of the price–yield relationship for a bond or portfolio. While [[Modified Duration]] gives the first-order approximation of price sensitivity to yield changes, convexity captures the second-order effect:

> $$\text{Convexity}$$

> $$= \frac{1}{P} \cdot \frac{d^2P}{dj^2}$$

> $$= \frac{\displaystyle\sum_{t=1}^{n} t(t+1) \cdot C_t \cdot v^{t+2}}{P}$$

> $$\frac{\Delta P}{P} \approx -D_{Mod} \cdot \Delta j + \tfrac{1}{2} \cdot \text{Convexity} \cdot (\Delta j)^2$$

- In the formula, $C_t$ is the cash flow at time $t$, $v = 1/(1+j)$, and $P$ is the bond price
- The $(1+j)^2$ factor in the denominator of $v^{t+2}$ distinguishes this from the Macaulay duration formula
- Higher convexity is beneficial: for the same duration, a more convex bond rises more when yields fall and falls less when yields rise

![[Media/Figures/Convexity.svg|340]]

> [!example]- Convexity Price Approximation {Example}
> A bond has modified duration $D_{Mod} = 7.5$ years and convexity $= 68$. If yields rise by $0.5\%$ ($\Delta j = 0.005$), estimate the percentage price change.
>
> > [!answer]-
> > $$\frac{\Delta P}{P} \approx -D_{Mod} \cdot \Delta j + \tfrac{1}{2} \cdot \text{Convexity} \cdot (\Delta j)^2$$
> > $$= -(7.5)(0.005) + \tfrac{1}{2}(68)(0.005)^2$$
> > $$= -0.0375 + \tfrac{1}{2}(68)(0.000025)$$
> > $$= -0.0375 + 0.00085 = -0.03665$$
> > The bond price decreases by approximately $3.67\%$. Without the convexity term the estimate would be $-3.75\%$; convexity reduces the actual price decline slightly.
