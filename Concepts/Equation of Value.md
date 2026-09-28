---
verification:
  status: verified
  confidence: low
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:a24ad843e2d6041d80ac7758776b43f05f3d4d14e307abc71ef7b61a4bc5340b
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money (5-15%), learning outcomes a)-d), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §12 Equations of Value and Time Diagrams, PDF p.100, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §12 Equations of Value and Time Diagrams (Examples 12.2-12.3), PDF p.101, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §12 Equations of Value and Time Diagrams (Examples 12.3-12.4), PDF p.102, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 403, questions PDF p.170, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 403, solutions PDF p.106, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
  open_findings: 3
  open_critical: 0
  log: .verify/Concepts/Equation of Value.md
---

An **equation of value** equates the [[Present Value]] (or [[Accumulated Value]]) of all obligations to the present value of all payments at a chosen **comparison date** (also called the valuation date). It is the fundamental tool for solving time-value-of-money problems:

> $$\text{PV of inflows}$$

> $$= \text{PV of outflows at the comparison date}$$

- All cash flows must be moved to the same point in time using the same [[Interest Rate]] before comparing.
- A different choice of comparison date gives a different equation but the same solution for the unknown.

![[Media/Figures/Equation_of_Value.svg|340]]

> [!example]- Replacing Two Payments {Example}
> Debts of $1{,}000$ due in 2 years and $2{,}000$ due in 5 years are to be replaced by a single payment at the end of 3 years. Find the payment using $i = 6\%$.
>
> > [!answer]-
> > Set time 3 as the comparison date:
> > $$X = 1000(1.06)^1 + 2000(1.06)^{-2} = 1060 + 1779.99 = 2839.99$$
