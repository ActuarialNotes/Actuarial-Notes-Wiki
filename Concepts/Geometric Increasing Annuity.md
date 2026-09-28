---
verification:
  status: verified
  confidence: low
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:137cf4132438e4e036b0002c471d6c16c9302443e8fc4abe02d4f13d918855e6
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §26 Varying Annuity-Immediate, geometric progression, PDF p.238-239, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 443, solutions PDF p.115, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 460, solutions PDF p.122, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Geometric Increasing Annuity.md
---

A **geometric increasing (or decreasing) annuity** has payments that grow (or shrink) at a constant geometric rate $g$ per period. For an $n$-payment annuity-immediate with first payment $1$ and growth rate $g$, payments are $1, (1+g), (1+g)^2, \ldots, (1+g)^{n-1}$.

- The present value (at effective rate $i \neq g$) is:

> $$\text{PV} = \frac{1 - \left(\frac{1+g}{1+i}\right)^n}{i-g}$$

- When $i = g$, $\text{PV} = n \cdot v = n/(1+i)$.
- For a geometric [[Perpetuity]] with $i > g$: $\text{PV} = 1/(i-g)$.

![[Media/Figures/Geometric_Increasing_Annuity.svg|340]]

> [!example]- Inflation-Adjusted Pension {Example}
> A retiree receives $20{,}000$ at end of year 1, with payments increasing 3% per year for 20 years. At $i = 7\%$, find the present value.
>
> > [!answer]-
> > $$\text{PV} = 20000 \cdot \frac{1-(1.03/1.07)^{20}}{0.07-0.03} = 20000 \cdot \frac{1-0.6730}{0.04} = 20000 \times 8.175 = 163{,}500$$
