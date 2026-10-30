---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:665ca664b32451a3dca1bb55c4d7593be1e6e7c28845dd202dfbe421fab928bb
  sources:
    - "SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.14, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.16, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.30, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.41, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.42, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.80, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.82, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.93, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, §2 p.15, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, §2 p.17, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, §3 p.22, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, §11 p.93, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, §11 p.94, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, §21 p.202, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, §21 p.203, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, §33 p.302, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Accumulation Function.md
---

The **accumulation function** $a(t)$ gives the accumulated value at time $t \geq 0$ of 1 unit invested at time 0. It must satisfy $a(0) = 1$ and be non-decreasing.

> $$a(t) = \exp\!\left(\int_0^t \delta(s)\,ds\right)$$

- Four standard forms arise from different interest assumptions:

| Regime | $a(t)$ |
|---|---|
| Compound interest (rate $i$) | $(1+i)^t$ |
| Simple interest (rate $i$) | $1 + it$ |
| Constant [[Force of Interest]] $\delta$ | $e^{\delta t}$ |
| Time-varying force $\delta(t)$ | $\exp\!\left(\displaystyle\int_0^t \delta(s)\,ds\right)$ |

- The [[Force of Interest]] at any time is recovered from $a(t)$ by $\delta(t) = a'(t)/a(t) = \frac{d}{dt}\ln a(t)$.
- The **amount function** $A(t) = k \cdot a(t)$ gives the accumulated value of an initial investment of $k$.

![[Media/Figures/Accumulation_Function.svg|340]]

### Interest earned in a period

- The $n$th period runs from time $n-1$ to time $n$, so "year $n$" is the interval $[n-1,\,n]$.
- The interest earned in period $n$ is the growth of the amount function over it, $I_n = A(n) - A(n-1)$, which is $k\,[a(n) - a(n-1)]$ for an investment of $k$.
- The effective rate of interest for period $n$ is the interest earned divided by the balance at the start of the period, $i_n = I_n / A(n-1) = a(n)/a(n-1) - 1$.

> $$I_n = A(n) - A(n-1), \qquad i_n = \frac{I_n}{A(n-1)} = \frac{a(n)}{a(n-1)} - 1$$

- More generally, a balance $B$ held from $t_1$ to $t_2$, with nothing added or withdrawn, earns $B\left[a(t_2)/a(t_1) - 1\right]$ in interest over the interval.
- When money is deposited or withdrawn during the interval, the interest a fund earns is its end value less its start value less the net deposits made during it; each deposit earns interest only from the date it is made.

### When the rate changes partway

- Accumulation factors over successive intervals multiply, each interval at the rate in force over it: $a(t_2)/a(t_0) = [a(t_1)/a(t_0)] \cdot [a(t_2)/a(t_1)]$.

> $$\frac{a(t_2)}{a(t_0)} = \frac{a(t_1)}{a(t_0)} \cdot \frac{a(t_2)}{a(t_1)}, \qquad a(n) = (1+i_1)(1+i_2)\cdots(1+i_n)$$

- The intervals need not use the same kind of rate: a stretch at effective rate $i$ contributes $(1+i)^{t_2 - t_1}$, a stretch under a force of interest contributes $\exp\!\left(\int_{t_1}^{t_2} \delta_t\,dt\right)$, and a stretch at a nominal rate contributes $(1 + i^{(m)}/m)^{m(t_2 - t_1)}$; discounting multiplies the reciprocals.
- When the rate changes at time $k$, split the cash flows at $k$: value the payments after $k$ at time $k$ at the later rate, then discount that single value to time 0 at the earlier rate; value the payments up to $k$ at the earlier rate alone; and add the pieces.
- Accumulating runs the same chain forward: accumulate the payments made before $k$ to time $k$ at the earlier rate and carry that value on to the end at the later rate, accumulate the payments after $k$ at the later rate alone, and add.
- For example, $n$ level payments of 1 at the end of each year, at rate $i$ for the first $k$ years and $j$ after, have present value $a_{\overline{k}|i} + (1+i)^{-k}\,a_{\overline{n-k}|j}$.

> [!example]- Accumulated Value Under Simple vs. Compound Interest {Example}
> An investor deposits \$$1{,}000$ at time 0. Compare the accumulated values at $t = 5$ years under (a) simple interest at $8\%$ and (b) compound interest at $8\%$.
>
> > [!answer]-
> > **(a) Simple interest:** $A(5) = 1{,}000 \times (1 + 0.08 \times 5) = 1{,}000 \times 1.40 = \$1{,}400.00$
> >
> > **(b) Compound interest:** $A(5) = 1{,}000 \times (1.08)^5 = 1{,}000 \times 1.46933 \approx \$1{,}469.33$
> >
> > Compound interest produces a higher accumulated value beyond $t = 1$ because interest itself earns interest.
