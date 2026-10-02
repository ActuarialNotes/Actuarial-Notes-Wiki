---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:744e222063b5cc0d590d46f56f429dc552001502e7d37f1b5abef187686d37ab
  sources:
    - "SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.100, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.101, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.102, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 403, questions PDF pp.170-171, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 403, solutions PDF p.106, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Equation of Value.md
---

An **equation of value** sets the value of all payments in equal to the value of all payments out, with every cash flow accumulated or discounted to one common **comparison date** $t_0$. Each side is a [[Current Value]] at $t_0$ — the [[Present Value]] when every cash flow is discounted to $t_0$ (as with $t_0 = 0$), the [[Future Value]] when every one is accumulated to it. It is the fundamental tool for solving time-value-of-money problems:

> $$\text{Value}_{t_0}(\text{inflows}) = \text{Value}_{t_0}(\text{outflows})$$

- Cash flows before $t_0$ are accumulated to it; cash flows on or after $t_0$ are discounted to it.
- Every cash flow must be moved to the same comparison date before comparing, each at the [[Interest Rate]] that applies to it — one equation can equate the balances of two funds earning different rates.
- When every cash flow is valued at one [[Compound Interest|compound interest]] rate, a different choice of comparison date gives a different equation but the same solution for the unknown: moving the date multiplies every term by the same power of $(1+i)$.
- Under [[Simple Interest]] this fails. SOA starts each cash flow's simple interest on its own date, so the solution can depend on the comparison date (second example).

![[Media/Figures/Equation_of_Value.svg|340]]

> [!example]- Replacing Two Payments {Example}
> Debts of $1{,}000$ due in 2 years and $2{,}000$ due in 5 years are to be replaced by a single payment at the end of 3 years. Find the payment using $i = 6\%$.
>
> > [!answer]-
> > Set time 3 as the comparison date:
> > $$X = 1000(1.06)^1 + 2000(1.06)^{-2} = 1060 + 1779.99 = 2839.99$$

> [!example]- The Comparison Date Under Simple Interest {Example}
> Two payments of $100$ — one due now and one due at the end of 5 years — are to be replaced by a single payment $P$ at the end of 10 years. Money earns $5\%$ simple interest from the date each payment is made. Find $P$ using a comparison date of (a) 10 years and (b) 15 years.
>
> > [!answer]-
> > **(a) Comparison date 10:**
> > $$
> > \begin{align*}
> > P &= 100\,(1 + 10 \times 0.05) + 100\,(1 + 5 \times 0.05) \\
> > &= 150 + 125 \\
> > &= 275
> > \end{align*}
> > $$
> > **(b) Comparison date 15:** $P$, paid at 10, earns simple interest for 5 years on its own:
> > $$
> > \begin{align*}
> > P\,(1 + 5 \times 0.05) &= 100\,(1 + 15 \times 0.05) + 100\,(1 + 10 \times 0.05) \\
> > 1.25\,P &= 175 + 150 \\
> > P &= 260
> > \end{align*}
> > $$
> > The two comparison dates give different answers; under compound interest they would agree.
