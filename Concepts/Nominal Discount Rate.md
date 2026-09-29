---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:68d3a0e925ba322610908f58c7f076a53ee45fdf060d3c97f4e6586cdc084d33
  sources:
    - "SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.57, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.68-69, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 349, solutions PDF pp.92-93, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Nominal Discount Rate.md
---

A **nominal discount rate** $d^{(m)}$ is a quoted annual rate of discount payable (convertible) $m$ times a year: the year is split into $m$ periods of length $1/m$, and each is charged discount at the effective rate $d^{(m)}/m$, paid at the **beginning** of that period. A unit accumulates under $d^{(m)}$ as:

> $$a(t) = \left(1 - \frac{d^{(m)}}{m}\right)^{-mt}$$

- $d^{(m)}/m$ is the [[Effective Discount Rate]] for each $m$th of a year; the quoted $d^{(m)}$ is $m$ times that per-period rate, not the rate of discount over the year.
- Discounting runs the other way: the present value of $1$ due at time $t$ is $\left(1 - \frac{d^{(m)}}{m}\right)^{mt}$.
- $m$ need not be a whole number: a rate "compounded every two years" has $m = \tfrac{1}{2}$, so discount of $d^{(1/2)}/0.5 = 2d^{(1/2)}$ is charged at the start of each two-year period.
- The conversion to the effective rates $d$ and $i$, $d^{(m)} = m\left[1 - v^{1/m}\right]$, and how $d^{(m)}$ ranks against $\delta$ and $i^{(m)}$ are on [[Nominal Discount Rate Convertible m-thly]]; the interest-paid-at-the-end counterpart is the [[Nominal Interest Rate]].

> [!example]- Same Quoted Rate, Discount vs. Interest {Example}
> A fund credits a nominal rate of discount of 8% convertible quarterly. Find the accumulated value after 3 years of a deposit of $1{,}000$, and compare it with a fund crediting a nominal rate of interest of 8% convertible quarterly.
>
> > [!answer]-
> > Each quarter is charged discount at $0.08/4 = 0.02$ in advance, and there are $4 \times 3 = 12$ quarters:
> > $$
> > \begin{align*}
> > 1000\left(1 - \frac{0.08}{4}\right)^{-12} &= 1000(0.98)^{-12} \\
> >   &= 1274.35
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > 1000\left(1 + \frac{0.08}{4}\right)^{12} &= 1000(1.02)^{12} \\
> >   &= 1268.24
> > \end{align*}
> > $$
> > At the same quoted rate the discount fund grows faster (8.417% effective a year against 8.243%): 2% charged in advance is $\frac{0.02}{0.98} = 2.041\%$ interest on the balance actually invested each quarter.

> [!example]- A Rate Compounded Every Two Years {Example}
> A payment of $5{,}000$ is due in 6 years. Find its present value at a nominal rate of discount of 10% compounded every two years, and the equivalent effective annual rate of discount.
>
> > [!answer]-
> > Here $m = \tfrac{1}{2}$: each two-year period is charged $0.10/0.5 = 0.20$, and 6 years is $0.5 \times 6 = 3$ periods:
> > $$
> > \begin{align*}
> > PV &= 5000\left(1 - \frac{0.10}{0.5}\right)^{0.5 \times 6} \\
> >   &= 5000(0.8)^{3} \\
> >   &= 2560
> > \end{align*}
> > $$
> > One year is half a period, so $1 - d = (0.8)^{1/2} = 0.894427$ and $d = 10.557\%$.
