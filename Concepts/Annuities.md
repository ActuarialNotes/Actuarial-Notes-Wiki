---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:2f9ec222ae47cb769b8519c849f188fab7c3b8e115a5a98c58b87e7b86e0da39
  sources:
    - "SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.143-146, 160, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Annuities.md
---

An **annuity** is a series of payments made at equal intervals of time. On Exam FM an annuity is an **annuity-certain**: its payments are certain to be made for the whole [[Term of Annuity|term]] — the syllabus's "non-contingent payments" — unlike a contingent (life) annuity, which pays only while a person survives. Its value on any date is the sum of the values of its payments on that date — for the [[Present Value|present value]] at the effective rate $i$ per payment period:

> $$PV = \sum_{t} C_t\, v^{t}$$

- $C_t$ is the payment at time $t$ and $v = 1/(1+i)$ the [[Discount Factor|discount factor]]. Valued at a date inside the term, payments before the date are accumulated and payments on or after it discounted — the [[Current Value|current value]].
- **Timing:** an [[Annuity Immediate|annuity-immediate]] pays at the end of each period, an [[Annuity Due|annuity-due]] at the beginning; a [[Perpetuity|perpetuity]] never stops; payments can also be [[Payable m-thly|payable m-thly]] or [[Payable Continuously|payable continuously]].
- **Amount:** a [[Level Payment Annuity|level payment annuity]] pays the same amount every period; [[Non-level Annuities|non-level annuities]] vary — in [[Arithmetic Increasing Annuity|arithmetic]] or [[Geometric Increasing Annuity|geometric]] progression, [[Decreasing Annuity|decreasing]], or in no pattern at all.

For $n$ level payments of 1, SOA's notation is $a_{\overline{n}|}$ and $s_{\overline{n}|}$ for the present and accumulated value of the annuity-immediate, and $\ddot{a}_{\overline{n}|}$ and $\ddot{s}_{\overline{n}|}$ for the annuity-due:

> $$a_{\overline{n}|} = \frac{1-v^n}{i}$$

> $$\ddot{a}_{\overline{n}|} = (1+i)\,a_{\overline{n}|}$$

> $$s_{\overline{n}|} = (1+i)^n\,a_{\overline{n}|}$$

![[Media/Figures/Annuities.svg|340]]

> [!example]- Lease Payments in Arrears or in Advance {Example}
> An equipment lease pays \$$2{,}000$ a year for 10 years. At an effective annual rate of $5\%$, find the present value if the payments are made (a) at the end of each year, (b) at the start of each year.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > a_{\overline{10}|} &= \frac{1-1.05^{-10}}{0.05} \\
> > &= 7.72173 \\
> > \text{(a)}\quad 2{,}000\,a_{\overline{10}|} &= 15{,}443.47 \\
> > \text{(b)}\quad 2{,}000\,\ddot{a}_{\overline{10}|} &= 2{,}000(1.05)(7.72173) \\
> > &= 16{,}215.64
> > \end{align*}
> > $$
> > Paying in advance moves every payment one year earlier, so it is worth $5\%$ more: \$$772.17$ more here.

> [!example]- Value of an Annuity Partway Through Its Term {Example}
> A structured settlement pays \$$1{,}000$ at the end of each year for 8 years. At $i = 4\%$, find its value at time 3, just after the third payment.
>
> > [!answer]-
> > The three payments already made are accumulated and the five still to come are discounted:
> > $$
> > \begin{align*}
> > CV_3 &= 1{,}000\,s_{\overline{3}|} + 1{,}000\,a_{\overline{5}|} \\
> > &= 1{,}000(3.12160) + 1{,}000(4.45182) \\
> > &= 7{,}573.42
> > \end{align*}
> > $$
> > Check: $1{,}000\,a_{\overline{8}|}(1.04)^3 = 1{,}000(6.73274)(1.124864) = 7{,}573.42$ — the value at time 0 moved forward three years.
