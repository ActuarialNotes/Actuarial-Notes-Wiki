---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:e82266b412a932bdaa0650f97840516b8ecc2ff9fab10aef39ba201ce88af985
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.238-239, 252, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 11, solutions PDF p.6, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 84, solutions PDF p.24, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Geometric Increasing Perpetuity.md
---

A **geometric increasing perpetuity** is a [[Perpetuity|perpetuity]] whose payments grow at a constant rate $g$ per period: $1, (1+g), (1+g)^2, \ldots$ forever. Paid at the end of each period, with the first payment one period from now, its present value at an effective rate $i$ greater than $g$ is

> $$PV = \frac{1}{i-g}$$

- It is the [[Geometric Increasing Annuity|geometric increasing annuity]] $\left(1 - \left(\tfrac{1+g}{1+i}\right)^n\right)/(i-g)$ with $n \to \infty$: when $g < i$ the ratio $\left(\tfrac{1+g}{1+i}\right)^n$ goes to zero. When $g \geq i$ the payments grow at least as fast as discounting shrinks them, and the perpetuity has no finite value.
- For a first payment $P$, multiply by $P$. Paid at the start of each period (a perpetuity-due, first payment now), each payment comes one period earlier, so the value is $(1+i)/(i-g)$.
- The same formula values a stock whose dividends are expected to grow at a constant rate, with $i$ the rate the investor requires.
- For payments rising by a fixed *amount* rather than a fixed percentage, see [[Increasing Annuity]].

> [!example]- An Endowment Payout Growing with Inflation {Example}
> An endowment is to pay \$5,000 at the end of the first year, with each later payment 2% more than the one before, forever. At $i = 6\%$, how much must be endowed today? How much if the first payment is made today instead?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > PV &= \frac{5{,}000}{0.06 - 0.02} \\
> > &= 125{,}000 \\
> > PV_{\text{due}} &= 1.06 \times 125{,}000 \\
> > &= 132{,}500
> > \end{align*}
> > $$
> > Without the growth the endowment would need only $5{,}000/0.06 = 83{,}333.33$.

> [!example]- Level Payments, Then Growth {Example}
> A perpetuity-immediate pays \$100 at the end of each of years 1 to 3. From year 4 on, each payment is 3% larger than the one before, so the year-4 payment is \$103. Find its present value at $i = 8\%$.
>
> > [!answer]-
> > Value the growing part at time 3, one period before its first payment, then discount it to time 0:
> > $$
> > \begin{align*}
> > PV_3 &= \frac{103}{0.08 - 0.03} \\
> > &= 2{,}060 \\
> > PV &= 100\,a_{\overline{3}|0.08} + 2{,}060\,(1.08)^{-3} \\
> > &= 100(2.577097) + 2{,}060(0.793832) \\
> > &= 257.71 + 1{,}635.29 \\
> > &= 1{,}893.00
> > \end{align*}
> > $$
