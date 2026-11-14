---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:e60f093db9e25856af09e005444d3b84c9d335c299d64246a24650228e46e3b7
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.10, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.100-101, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Time Value of Money.md
---

The **Time Value of Money** is the principle that the value of an amount of money depends on when it is paid. Because money can be invested at [[Interest Rate|interest]], amounts payable at different times cannot be compared until each is accumulated or discounted to a common **comparison date**.

Under [[Compound Interest|compound interest]] at effective rate $i$, the value at time $t$ of an amount $C$ paid at time $s$ is

> $$C(1+i)^{t-s}$$

For $t > s$ the amount is accumulated to its [[Accumulated Value|accumulated value]]. For $t < s$ it is discounted by $v^{s-t}$, where $v = 1/(1+i)$ is the [[Discount Factor]], to its [[Present Value|present value]]. The principle reflects the effect of interest alone. Inflation is a separate adjustment ([[Real Rate of Interest]]).

> [!example]- A claimant is offered $\$10{,}000$ now or $\$11{,}500$ in 3 years. At 5% annual effective interest, which is worth more? {Example}
> - Bring the later payment back to today: $11{,}500(1.05)^{-3} = 9{,}934.13$.
> - Since $9{,}934.13 < 10{,}000$, the payment now is worth more at 5%.
> - The two are equal at $i = (1.15)^{1/3} - 1 = 4.769\%$, so at any lower rate the later payment is worth more.

## Equations of value

The [[Current Value|current value]] of a set of cash flows at a date is the accumulated value of those paid before it plus the discounted value of those paid on or after it. An [[Equation of Value]] equates the values of two sets of payments at one comparison date. Under compound interest every comparison date gives the same answer. Under simple interest it does not ([[Simple vs Compound Interest]]). The [[Time Value of Money Equations]] apply the principle to streams of payments.

> [!example]- A policyholder pays $\$2{,}000$ now and $\$3{,}000$ in 4 years. At 6% annual effective interest, what are the two payments worth at time 2? {Example}
> - The first payment is accumulated two years: $2{,}000(1.06)^{2} = 2{,}247.20$.
> - The second is discounted two years: $3{,}000(1.06)^{-2} = 2{,}669.99$.
> - Their value at time 2 is $2{,}247.20 + 2{,}669.99 = 4{,}917.19$.
> - At time 0 the value is $2{,}000 + 3{,}000(1.06)^{-4} = 4{,}376.28$, and $4{,}376.28(1.06)^2 = 4{,}917.19$, the same value at time 2.
