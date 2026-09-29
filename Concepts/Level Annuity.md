---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:88a642bb8ed44162e154da255912ee9ed11bc85f9539a8b530c0f42ca87b3a2d
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §15 Present and Accumulated Values of an Annuity-Immediate, PDF p.144-145, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §16 Annuity in Advance: Annuity Due, PDF p.157-160, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Level Annuity.md
---

A **level annuity** is an annuity with equal, constant payments at regular intervals. It is synonymous with [[Level Payment Annuity]] and is the standard annuity type. The two main forms are:

- **[[Annuity Immediate]]**: payments at the **end** of each period; PV factor $a_{\overline{n}|} = (1-v^n)/i$
- **[[Annuity Due]]**: payments at the **beginning** of each period; PV factor $\ddot{a}_{\overline{n}|} = (1-v^n)/d$

- The relationship between the two: $\ddot{a}_{\overline{n}|} = (1+i) \cdot a_{\overline{n}|}$.
- Level annuities are used to model loan repayments, regular deposits, and structured insurance payments.

![[Media/Figures/Level_Annuity.svg|340]]

> [!example]- Annuity-Immediate vs. Annuity-Due {Example}
> Find the PV of a 4-year level annuity paying $1{,}000$/year at $i=5\%$, both immediate and due.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Immediate: } 1{,}000\,a_{\overline{4}|5\%} &= 1{,}000 \times 3.545951 \\
> > &= 3{,}545.95 \\
> > \text{Due: } 1{,}000\,\ddot{a}_{\overline{4}|5\%} &= 1.05 \times 3{,}545.951 \\
> > &= 3{,}723.25
> > \end{align*}
> > $$
