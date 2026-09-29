---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:15c28ec2306583b033d256b7e8c8f16cd8e3f51a358364967194d512c6efa285
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Geometric Increasing Perpetuity.md
---

A **geometric increasing perpetuity** is a [[Perpetuity|perpetuity]] whose payments grow at a constant rate $g$ per period: $1, (1+g), (1+g)^2, \ldots$ forever. Paid at the end of each period, with the first payment one period from now, its present value at the effective rate $i$ is

> $$PV = \frac{1}{i-g}, \qquad g < i$$

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
