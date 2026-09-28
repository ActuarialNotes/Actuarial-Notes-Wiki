---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:e0afa274fdc9bebcd54426e3679efae5b7419b4fd801129bc923a8d93403302c
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a)-b), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §42 Types of Bonds, PDF p.380, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §43 The Various Pricing Formulas of a Bond, PDF p.384, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 40, questions PDF p.19, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 40, solutions PDF p.12, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Coupon.md
---

A **coupon** is the periodic interest payment made by a bond issuer to the bondholder, equal to the face value $F$ multiplied by the coupon rate per period $r$.

> $$\text{Coupon} = Fr$$

- For a bond with an annual coupon rate $r_{annual}$ that pays semi-annually, each coupon is $F \cdot r_{annual}/2$.
- Coupons are typically level (the same amount each period) for standard fixed-rate bonds.
- The total number of coupon payments equals $n$, the number of periods until maturity.
- Coupons represent the income component of a bond's return; the other component is any capital gain or loss at redemption.

![[Media/Figures/Coupon.svg|340]]

> [!example]- Coupon Payment Amount {Example}
> A \$$5{,}000$ face value bond pays semi-annual coupons at an annual coupon rate of $6\%$. What is each coupon payment?
>
> > [!answer]-
> > The coupon rate per semi-annual period is $r = 6\%/2 = 3\%$.
> > $$\text{Coupon} = Fr = 5000(0.03) = \$150$$
> > The bondholder receives \$$150$ every six months for the life of the bond.
