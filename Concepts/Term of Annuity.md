---
verification:
  status: verified
  confidence: low
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:85fb9aaab00b0d2855c2365d3ca758268fc77fcb6ccaa461f4bed15944f910b4
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), Part 'The Basics of Annuity Theory' introduction, PDF p.143, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §15 Present and Accumulated Values of an Annuity-Immediate, PDF p.144-145, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §18 Annuities with Infinite Payments: Perpetuities, PDF p.176-177, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §19 Solving for the Unknown Number of Payments of an Annuity, PDF p.184-185, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §28 Varying Annuities with Payments at a Different Frequency than Interest is Convertible, PDF p.257, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Term of Annuity.md
---

The **term of annuity** is the duration over which an annuity makes payments — the number of periods from the first to the last payment. For a finite-term annuity, the term determines when payments start and stop.

- In the standard annuity factor notation, $n$ in $a_{\overline{n}|i}$ is the term.
- Given sufficient information (present value, payment amount, interest rate), the term can be solved using logarithms:

> $$n = \frac{\ln(1 - i \cdot \text{PV}/P)}{\ln(1/(1+i))}$$

> $$= \frac{-\ln(1 - i \cdot \text{PV}/P)}{\ln(1+i)}$$

- A [[Perpetuity]] is an annuity with an infinite term.

![[Media/Figures/Term_of_Annuity.svg|340]]

> [!example]- Solving for Unknown Term {Example}
> A $10{,}000$ loan at $6\%$ is repaid with level annual payments of $1{,}500$. How many full payments are needed?
>
> > [!answer]-
> > $$10000 = 1500 \cdot a_{\overline{n}|6\%} \implies a_{\overline{n}|} = 6.6667$$
> > $$n = \frac{-\ln(1 - 0.06 \times 6.6667)}{\ln(1.06)} = \frac{-\ln(0.60)}{0.05827} = \frac{0.5108}{0.05827} \approx 8.77$$
> > 9 (annual) payments are needed (with the last being a smaller [[Drop Payment]]).
