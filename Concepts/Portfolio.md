---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:b97aaf30679889df2fc61081c599feb669a74200ea39af368adbad5552adb901
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §54 Macaulay and Modified Durations, PDF p.474, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §55 Redington Immunization and Convexity, PDF p.483, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 149, solutions PDF p.40, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 354, solutions PDF p.94, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 106, solutions PDF p.30, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §30 Discounted Cash Flow Technique, PDF p.279, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Portfolio.md
---

A **portfolio** is a collection of financial assets (bonds, stocks, cash flows) held together. In the context of Exam FM, portfolio analysis focuses on:

- **[[Yield Rate]] of a portfolio**: the internal rate of return of the combined cash flows
- **[[Duration]] of a portfolio**: the weighted average of individual asset durations, weighted by market values
- **[[Convexity]] of a portfolio**: the weighted average of individual convexities
- **[[Immunization]]**: structuring a portfolio so its value is protected against interest rate changes

> $$D_{Mod}^{\text{portfolio}} = \frac{\sum_i P_i \cdot D_{Mod,i}}{\sum_i P_i}$$

![[Media/Figures/Portfolio.svg|340]]

> [!example]- Portfolio Duration {Example}
> A portfolio has \$$40{,}000$ in a bond with modified duration 3 years and \$$60{,}000$ in a bond with modified duration 8 years. Find the portfolio's modified duration.
>
> > [!answer]-
> > $$D_{Mod}^{\text{portfolio}} = \frac{40000 \times 3 + 60000 \times 8}{40000 + 60000} = \frac{120000 + 480000}{100000} = 6.0 \text{ years}$$
