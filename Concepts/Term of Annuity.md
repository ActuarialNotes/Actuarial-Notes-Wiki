---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:538f6e34762b5ed4789d8e350a16138a3f70005fd136424ccd18137fca40951b
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.143-144, 157, 176, 184-185, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Term of Annuity.md
---

The **term of an annuity** is the fixed period of time over which its payments are made, measured in payment periods: an annuity of $n$ payments, one per period, has a term of $n$ periods. For an [[Annuity Immediate|annuity-immediate]] the term runs from one period before the first payment to the last payment; for an [[Annuity Due|annuity-due]], from the first payment to one period after the last. A 30-year monthly mortgage has a term of 360 months.

- In the annuity factor $a_{\overline{n}|i}$, $n$ is the term — the number of payment periods.
- Given the present value, the level payment $P$ and the rate $i$, the term of an **annuity-immediate** is found with logarithms:

> $$n = \frac{\ln(1 - i \cdot \text{PV}/P)}{\ln(1/(1+i))}$$

> $$= \frac{-\ln(1 - i \cdot \text{PV}/P)}{\ln(1+i)}$$

- For an annuity-due, $\text{PV} = P\,\ddot{a}_{\overline{n}|} = P(1-v^n)/d$, so replace $i$ by $d$ inside the logarithm: $n = -\ln(1 - d \cdot \text{PV}/P)/\ln(1+i)$.
- When $n$ is not a whole number, $\lfloor n \rfloor$ regular payments are made plus one smaller payment — added to the last regular payment (a [[Balloon Payment|balloon payment]]) or made one period after it (a [[Drop Payment|drop payment]]).
- A [[Perpetuity]] is an annuity with an infinite term.

![[Media/Figures/Term_of_Annuity.svg|340]]

> [!example]- Solving for Unknown Term {Example}
> A \$10,000 loan at $6\%$ is repaid with level annual payments of \$1,500, the first one year from now, for as long as needed, followed by a smaller final payment one year after the last regular one. How many regular payments are made, and how large is the final payment?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > a_{\overline{n}|} &= \frac{10{,}000}{1{,}500} \\
> > &= 6.666667 \\
> > n &= \frac{-\ln(1 - 0.06 \times 6.666667)}{\ln(1.06)} \\
> > &= \frac{-\ln(0.60)}{0.0582689} \\
> > &= \frac{0.5108256}{0.0582689} \\
> > &= 8.77
> > \end{align*}
> > $$
> > So 8 regular payments are made, and a smaller ninth at time 9 — a [[Drop Payment|drop payment]]. It is the balance just after the 8th payment, carried one more year:
> > $$
> > \begin{align*}
> > OB_8 &= 10{,}000(1.06)^8 - 1{,}500\,s_{\overline{8}|} \\
> > &= 15{,}938.48 - 1{,}500(9.897468) \\
> > &= 15{,}938.48 - 14{,}846.20 \\
> > &= 1{,}092.28 \\
> > \text{Drop} &= 1{,}092.28 \times 1.06 \\
> > &= 1{,}157.82
> > \end{align*}
> > $$
> > Check: $1{,}500\,a_{\overline{8}|} + 1{,}157.82\,v^9 = 9{,}314.69 + 685.31 = 10{,}000$.
