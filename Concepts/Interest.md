---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:6ca66adf23d3490051afb3fdc8a708515e9049622a753e5f84abf08525278a54
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §1 The Meaning of Interest, PDF p.10, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §38 Amortization Schedules, PDF p.342, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Interest.md
---

**Interest** is the compensation paid by a borrower to a lender for the use of money over time. It is the fundamental mechanism of the time value of money.

- The interest paid in period $t$ of a loan is:

> $$I_t = i \cdot B_{t-1}$$

- where $i$ is the periodic [[Interest Rate]] and $B_{t-1}$ is the [[Outstanding Balance]] at the start of the period.
- In a level-payment [[Amortization]] schedule, the interest portion of each payment decreases over time as the balance is paid down, and the **principal repayment** portion increases correspondingly:

> $$P_t = \text{Payment} - I_t$$

> $$= \text{Payment} - i \cdot B_{t-1}$$

![[Media/Figures/Interest.svg|340]]

> [!example]- Interest vs. Principal Split {Example}
> A $10{,}000$ loan at $5\%$ annual interest is repaid with 3 equal annual payments. Find the interest and principal in the first payment.
>
> > [!answer]-
> > Payment $= 10000/a_{\overline{3}|5\%} = 10000/2.7232 = 3672.09$.
> > Interest in year 1: $I_1 = 0.05 \times 10000 = 500$.
> > Principal repayment: $P_1 = 3672.09 - 500 = 3172.09$.
