---
verification:
  status: verified
  confidence: low
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:a474a0cbdae9c34ab4b6b726c3646d172174706f9f4fb25ae1e4f9bfe74a3e28
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money (5-15%), learning outcomes a)-d), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §2 Accumulation and Amount Functions (Remark 2.1, accumulation factor), PDF p.16, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §4 Linear Accumulation Functions: Simple Interest (Remark 4.3, SOA/CAS convention), PDF p.31, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §7 Present Value and Discount Functions, PDF p.50, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §11 Time Varying Interest Rates, PDF p.93, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §12 Equations of Value and Time Diagrams, PDF p.100, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §14 Solving for Unknown Time (Rule of 72), PDF p.117, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 112, solutions PDF p.32, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Time Value of Money Equations.md
---

**Time value of money equations** express the equivalence of cash flows at different points in time under a given [[Interest Rate]] or [[Accumulation Function]]. The core principle: a dollar today is worth more than a dollar in the future because it can be invested to earn interest.

- Standard equation linking [[Present Value]], [[Future Value]], rate, and time:

> $$\text{FV} = \text{PV} \cdot (1+i)^n$$

> $$\text{PV} = \text{FV} \cdot v^n$$

- More generally, the [[Equation of Value]] at time $t_0$ equates all inflows and outflows:

> $$\sum_k C_k^+ \cdot a(t_0)/a(t_k) = \sum_k C_k^- \cdot a(t_0)/a(t_k)$$

- Solving these equations under [[Variable Force of Interest]] requires evaluating integrals.

![[Media/Figures/Time_Value_of_Money_Equations.svg|340]]

> [!example]- Solve for Unknown Time {Example}
> How long does it take $5{,}000$ to double at an effective annual rate of $7\%$?
>
> > [!answer]-
> > $$10000 = 5000(1.07)^n \implies (1.07)^n = 2 \implies n = \frac{\ln 2}{\ln 1.07} = \frac{0.6931}{0.0677} \approx 10.24 \text{ years}$$
