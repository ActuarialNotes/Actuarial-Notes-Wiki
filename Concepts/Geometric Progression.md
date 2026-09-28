---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:fd1dcca057c18ab01f00a97f307a9326403e8c9e7a7d82a6ba5eb2766bcb78d5
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §26 Varying Annuity-Immediate, geometric progression, PDF p.238-239, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 451, solutions PDF p.118, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 460, solutions PDF p.122, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Geometric Progression.md
---

In the context of annuities, a **geometric progression** refers to a sequence of payments where each payment is a constant multiple $(1+g)$ of the previous one. Starting from $1$, the payments are $1, (1+g), (1+g)^2, \ldots$

- This is the basis of the [[Geometric Increasing Annuity]].
- The present value for $n$ payments (annuity-immediate):

> $$\text{PV} = \frac{1}{1+i} \cdot \frac{1-\left(\frac{1+g}{1+i}\right)^n}{1 - \frac{1+g}{1+i}}$$

> $$= \frac{1-(1+g)^n(1+i)^{-n}}{i-g}$$

> $$i \neq g$$

- For a geometric [[Perpetuity]] ($i > g$): $\text{PV} = 1/(i-g)$.

![[Media/Figures/Geometric_Progression.svg|340]]

> [!example]- Geometric Perpetuity {Example}
> A cash flow starts at $5{,}000$ at end of year 1 and grows at $2\%$ per year forever. Find the PV at $i=8\%$.
>
> > [!answer]-
> > $$\text{PV} = \frac{5000}{0.08 - 0.02} = \frac{5000}{0.06} = 83{,}333$$
