---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:7044e5cf361ad7505ba8dd8dc27a761ae0f25185f8b49e42de9bca52a647443b
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.10, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.100-101, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Time Value of Money.md
---

The **time value of money** is the principle that the value of an amount of money depends on when it is paid: because money can be invested at [[Interest Rate|interest]], amounts payable at different times cannot be compared until each is accumulated or discounted to a common **comparison date**. Under [[Compound Interest]] at effective rate $i$, an amount $C$ paid at time $s$ is worth, at time $t$:

> $$C(1+i)^{t-s}$$

- For $t > s$ the amount is accumulated ([[Accumulated Value]]); for $t < s$ it is discounted by $v^{s-t}$, where $v = 1/(1+i)$ is the [[Discount Factor]] ([[Present Value]]).
- The [[Current Value|current value]] of a set of cash flows at a date is the accumulated value of those paid before it plus the discounted value of those paid on or after it.
- An [[Equation of Value]] equates the values of two sets of payments at one comparison date. Under compound interest every comparison date gives the same answer; under simple interest it does not (see [[Simple vs Compound Interest]]).
- Here the principle reflects the effect of interest alone; inflation is a separate adjustment (see [[Real Rate of Interest]]). The equations that apply it are on [[Time Value of Money Equations]].

> [!example]- Settlement Now or Later {Example}
> A claimant is offered either $10{,}000$ now or $11{,}500$ in 3 years. At an annual effective interest rate of 5%, which is worth more?
>
> > [!answer]-
> > Bring the later payment back to today:
> > $$
> > \begin{align*}
> > PV &= 11500(1.05)^{-3} \\
> >   &= 9934.13
> > \end{align*}
> > $$
> > Since $9934.13 < 10{,}000$, the payment now is worth more at 5%. The two are equal at $i = (1.15)^{1/3} - 1 = 4.769\%$; at any lower rate the later payment is worth more.

> [!example]- Value at a Middle Date {Example}
> A policyholder pays $2{,}000$ now and $3{,}000$ in 4 years. At 6% annual effective interest, find the value of the two payments at time 2, and check it against their value at time 0.
>
> > [!answer]-
> > The first payment is accumulated two years and the second discounted two years:
> > $$
> > \begin{align*}
> > V_2 &= 2000(1.06)^{2} + 3000(1.06)^{-2} \\
> >   &= 2247.20 + 2669.99 \\
> >   &= 4917.19
> > \end{align*}
> > $$
> > At time 0 the value is $2000 + 3000(1.06)^{-4} = 4376.28$, and $4376.28(1.06)^2 = 4917.19$: under compound interest the comparison date does not change the answer.
