---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:09d72399d20620a54ab11f4307c8cb6823bd16e6e083448ca00cce4c041eea37
  sources:
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 421, solutions PDF p.110, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.380, p.384, p.396, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Face Value.md
---

The **face value** (also called **par value** or **nominal value**) $F$ of a bond is the principal amount stated on the bond certificate. It serves two purposes:
- The [[Coupon]] payment each period equals $F \times r$ where $r$ is the [[Coupon Rate]] per period
- When the bond is redeemed at par, the [[Redemption Value]] $C = F$

- The face value is not necessarily the [[Bond Price|price]] paid for the bond. A bond is bought at a [[Premium|premium]] when its price is above the redemption value ($P > C$) and at a [[Discount|discount]] when it is below ($P < C$). Only for a bond redeemed at par ($C = F$, the exam default unless a question says otherwise) is that the same as comparing the price with $F$, or the coupon rate with the [[Yield Rate]]; otherwise compare the yield with the modified coupon rate $g = Fr/C$.

![[Media/Figures/Face_Value.svg|340]]

> [!example]- Coupon from Face Value {Example}
> A $5{,}000$ face value bond pays a 4% semi-annual coupon rate. Find the semi-annual coupon payment.
>
> > [!answer]-
> > Coupon per period $= F \times r = 5000 \times 0.04 = 200$ (if 4% is the semi-annual rate) or $5000 \times 0.04/2 = 100$ (if 4% is the annual coupon rate paid semi-annually).
