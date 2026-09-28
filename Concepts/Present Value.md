---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:660de00f2dd0cbdef95980b9625fd129823ffe1a7caea0a9a6d3f7636be7590b
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money (5-15%), learning outcomes a)-d), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §7 Present Value and Discount Functions, PDF p.50, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Present Value.md
---

The **present value** (PV) is the value today of a future payment, discounted at an interest rate. Because a dollar received in the future is worth less than a dollar today — it could have been invested to earn interest — future cash flows are multiplied by the discount factor $v = (1+i)^{-1}$ raised to the number of periods. A payment of $FV$ due in $n$ periods at effective rate $i$ has present value:

> $$PV = FV \cdot (1+i)^{-n}$$

> $$= FV \cdot v^n$$

- For multiple cash flows $C_t$ at various times $t$, the total present value is $\displaystyle PV = \sum_t C_t\, v^t$.
- Present value is the fundamental building block of [[Annuity Immediate|annuity]], [[Net Present Value|NPV]], and [[Deferred Annuity|deferred annuity]] calculations.

![[Media/Figures/Present_Value.svg|340]]

> [!example]- Present Value of a Lump Sum {Example}
> An investor will receive $5000$ in 6 years. If the effective annual interest rate is $i = 7\%$, what is the present value of this payment?
>
> > [!answer]-
> > $$PV = \frac{5{,}000}{(1.07)^{6}} = 5{,}000 \times v^6 = \frac{5{,}000}{1.500730} \approx \$3{,}332.11$$
