---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:cc58fd9f2fd219e8253bac132b233bc2c2f51a602e31ea329802066cc922123d
  sources:
    - "SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.16, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.31, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.50, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.51, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.82, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.93, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.100, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.101, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.102, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.117, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Time Value of Money Equations.md
---

**Time value of money equations** express the equivalence of cash flows at different points in time under a given [[Interest Rate]] or [[Accumulation Function]]. The core principle: a dollar today is worth more than a dollar in the future because it can be invested to earn interest.

- Standard equation linking [[Present Value]], [[Future Value]], rate, and time under [[Compound Interest]]:

> $$\text{FV} = \text{PV} \cdot (1+i)^n$$

> $$\text{PV} = \text{FV} \cdot v^n$$

- More generally, the [[Equation of Value]] at a comparison date $t_0$ equates the value of all inflows $C_k^+$ with the value of all outflows $C_k^-$. Under compound interest, a force of interest, or any accumulation function a question gives other than simple interest, each cash flow is moved to $t_0$ by the factor $a(t_0)/a(t_k)$:

> $$\sum_k C_k^+ \cdot \frac{a(t_0)}{a(t_k)} = \sum_k C_k^- \cdot \frac{a(t_0)}{a(t_k)}$$

- Under [[Simple Interest]], SOA starts each cash flow's simple interest on its own date instead: a cash flow before $t_0$ is multiplied by $1 + i(t_0 - t_k)$ and one after $t_0$ is divided by $1 + i(t_k - t_0)$. The answer can then depend on the choice of $t_0$.
- Solving these equations under [[Variable Force of Interest]] requires evaluating integrals.

![[Media/Figures/Time_Value_of_Money_Equations.svg|340]]

> [!example]- Solve for Unknown Time {Example}
> How long does it take $5{,}000$ to double at an effective annual rate of $7\%$?
>
> > [!answer]-
> > $$10000 = 5000(1.07)^n \implies (1.07)^n = 2 \implies n = \frac{\ln 2}{\ln 1.07} = \frac{0.6931}{0.0677} \approx 10.24 \text{ years}$$
