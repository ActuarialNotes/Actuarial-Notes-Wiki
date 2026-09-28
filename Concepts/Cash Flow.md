---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:8f76ccb6b93c80acf9bfd5f3c123cec76887e63b2f71c9d9df60f4c7b228bb94
  sources:
    - "Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §2 Cash Flow Series and Present Value, (2.1), PDF p.4, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §30 Discounted Cash Flow Technique, PDF p.276, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cash Flow.md
---

A **cash flow** is a payment of money at a specific point in time, which can be positive (inflows/receipts) or negative (outflows/disbursements). A cash flow stream $\{(C_t, t)\}$ is valued by its present value at a given [[Interest Rate]]:

> $$\text{PV} = \sum_t C_t \cdot v^t$$

- Financial mathematics analyzes streams of cash flows by computing their [[Present Value]], [[Accumulated Value]], or [[Net Present Value]]
- Cash flow analysis forms the basis for [[Loans]], [[Bonds]], [[Annuity Immediate|annuities]], and [[Cash Flow Matching]] for liability management

![[Media/Figures/Cash_Flow.svg|340]]

> [!example]- Valuing an Irregular Cash Flow Stream {Example}
> A project pays $500$ at time 1, $-200$ at time 2 (an outflow), and $1{,}000$ at time 3. Find the PV at $i = 8\%$.
>
> > [!answer]-
> > $$\text{PV} = \frac{500}{1.08} + \frac{-200}{1.08^2} + \frac{1000}{1.08^3} = 462.96 - 171.47 + 793.83 = 1085.32$$
