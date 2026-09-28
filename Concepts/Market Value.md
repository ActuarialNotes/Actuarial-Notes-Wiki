---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:c4d09fa5a154af7c9a537e4d991229676442cbb4da557c707ce476e69c475b3e
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a)-b), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §43 The Various Pricing Formulas of a Bond, PDF p.384-385, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §45 Valuation of Bonds Between Coupons Payment Dates, Problem 45.13, PDF p.411, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 421, solutions PDF p.110, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Market Value.md
---

The **market value** of a bond (or any financial asset) is its current price in the open market, determined by supply and demand. For bonds, market value equals the [[Present Value]] of all future cash flows discounted at the prevailing market [[Yield Rate]]:

> $$\text{Market Value}$$

> $$= Fr \cdot a_{\overline{n}|j} + C \cdot v^n_j$$

- Market value differs from [[Book Value]] (the amortized carrying value) and [[Face Value]] (the principal).
- When market yield exceeds the coupon rate, market value is below face (discount bond).
- When market yield is below the coupon rate, market value exceeds face (premium bond).

![[Media/Figures/Market_Value.svg|340]]

> [!example]- Market Value After Rate Change {Example}
> A 10-year $1{,}000$ bond with 5% annual coupons was originally priced to yield 5%. Two years later, market yields rise to 6%. Find the new market value.
>
> > [!answer]-
> > 8 coupons remain: $P = 50 \cdot a_{\overline{8}|6\%} + 1000(1.06)^{-8} = 50(6.2098) + 627.41 = 310.49 + 627.41 = 937.90$.
