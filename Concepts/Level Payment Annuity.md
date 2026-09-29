---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:c19d056b0529c52898786da2537324134b3f19097ffc5938d6d0212046d858e3
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §15 Present and Accumulated Values of an Annuity-Immediate, PDF p.144-145, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §37 Finding the Loan Balance Using Prospective and Retrospective Methods, PDF p.335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Level Payment Annuity.md
---

A **level payment annuity** makes equal (level) payments at regular intervals — for a fixed term, or forever in a level [[Perpetuity|perpetuity]]. It is the most basic annuity structure, forming the basis for [[Annuity Immediate]], [[Annuity Due]] and loan amortization.

- For a level payment $P$, $n$-period annuity-immediate at rate $i$:

> $$\text{PV} = P \cdot a_{\overline{n}|i}$$

> $$= P \cdot \frac{1-v^n}{i}$$

> $$\text{FV} = P \cdot s_{\overline{n}|i}$$

> $$= P \cdot \frac{(1+i)^n - 1}{i}$$

- The symbols $a_{\overline{n}|}$ (present value annuity factor) and $s_{\overline{n}|}$ (accumulated value annuity factor) are standard actuarial notation.

![[Media/Figures/Level_Payment_Annuity.svg|340]]

> [!example]- Loan Repayment {Example}
> A \$20,000 loan at $5\%$ effective annual interest is repaid with 5 level annual payments (end of year). Find the payment amount.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > 20{,}000 &= P \cdot a_{\overline{5}|5\%} \\
> > &= P \cdot \frac{1-(1.05)^{-5}}{0.05} \\
> > &= P \times 4.329477 \\
> > P &= \frac{20{,}000}{4.329477} \\
> > &= 4{,}619.50
> > \end{align*}
> > $$
