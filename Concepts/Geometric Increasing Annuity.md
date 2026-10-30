---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:360e4fdf52319637b8eedd32c7e6ba759c29d8ca65b68faee8cc61bb07da013f
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.238-239, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 443, solutions PDF pp.115-116, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §26 geometric progression, PDF p.238-239, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §26 AV=(1+i)^n PV eq. 26.4, PDF p.234, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §27 geometric annuity-due, PDF p.251, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Geometric Increasing Annuity.md
---

A **geometric increasing (or decreasing) annuity** has payments that grow (or shrink) at a constant geometric rate $g$ per period. For an $n$-payment annuity-immediate with first payment $1$ and growth rate $g$, payments are $1, (1+g), (1+g)^2, \ldots, (1+g)^{n-1}$.

- The present value (at effective rate $i \neq g$) is:

> $$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$

- When $i = g$, $\text{PV} = n \cdot v = n/(1+i)$.
- For a geometric [[Perpetuity]] with $i > g$: $\text{PV} = 1/(i-g)$.

### Accumulated value

- The accumulated value at the last payment is $(1+i)^n$ times the present value: with first payment $P$, growth $g$ and $i \neq g$, it is $P\,\dfrac{(1+i)^n - (1+g)^n}{i-g}$, and $n P (1+i)^{n-1}$ when $i = g$.
- For a geometric annuity-due (first payment now), each payment is one period earlier, so its present and accumulated values are $(1+i)$ times the annuity-immediate's.

> $$\text{AV} = P\,\frac{(1+i)^n - (1+g)^n}{i-g}$$

### Valuing at the modified rate $j$

- Because $v(1+g) = \dfrac{1+g}{1+i} = \dfrac{1}{1+j}$ with $j = \dfrac{i-g}{1+g}$, payments growing at rate $g$ and discounted at rate $i$ are valued as level payments at the modified rate $j$.
- Payments $1, (1+g), \ldots, (1+g)^{n-1}$ at times $1, \ldots, n$ are then worth $a_{\overline{n}|j}/(1+g)$, and the same payments starting now are worth $\ddot{a}_{\overline{n}|j}$.
- Because each payment's discounted value is the level annuity's at rate $j$ times the constant $1/(1+g)$, the Macaulay duration of a geometric annuity or perpetuity at rate $i$ equals the duration of the level annuity or perpetuity at rate $j$.

> $$1 + j = \frac{1+i}{1+g}$$

![[Media/Figures/Geometric_Increasing_Annuity.svg|340]]

> [!example]- Inflation-Adjusted Pension {Example}
> A retiree receives \$20,000 at the end of year 1, with payments increasing 3% per year for 20 years. At $i = 7\%$, find the present value.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \left(\tfrac{1.03}{1.07}\right)^{20} &= 0.46673346 \\
> > \text{PV} &= 20{,}000 \cdot \frac{1-0.46673346}{0.07-0.03} \\
> > &= 20{,}000 \times \frac{0.53326654}{0.04} \\
> > &= 20{,}000 \times 13.3316635 \\
> > &= 266{,}633.27
> > \end{align*}
> > $$
> > The 20 payments total \$537,407 undiscounted; growth at 3% offsets part of the 7% discounting, so the present value is 13.33 times the first payment rather than the level-annuity $a_{\overline{20}|0.07} = 10.59$.
