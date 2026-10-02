---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:2441119b978182575a7188ff23fad9b13b42dbb6ea6626cd65cefdcebdb6efcf
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.384-385, p.420, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 421, solutions PDF p.110, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Non-Callable Bond.md
---

A **non-callable bond** cannot be redeemed by the issuer before its stated maturity date. The bondholder receives all scheduled [[Coupon]] payments and the [[Redemption Value]] at maturity with certainty, eliminating **call risk** and **reinvestment risk** from early redemption.

- The price of a non-callable bond is straightforward:

> $$P = Fr \cdot a_{\overline{n}|j} + C \cdot v^n$$

- With no uncertainty about the term $n$, non-callable bonds are simpler to analyze than [[Callable Bond]]s and are the baseline case for bond pricing on Exam FM.

![[Media/Figures/Non-Callable_Bond.svg|340]]

> [!example]- Pricing a Non-Callable Bond {Example}
> A non-callable $1{,}000$ face bond, redeemable at par, pays 7% annual coupons and matures in 8 years. Price at 5% yield.
>
> > [!answer]-
> > $P = 70 \cdot a_{\overline{8}|5\%} + 1000(1.05)^{-8} = 70(6.4632) + 676.84 = 452.42 + 676.84 = 1129.26$
> >
> > This bond is priced at a **premium** ($P > C = 1{,}000$) since, with $C = F$, the coupon rate (7%) exceeds the yield (5%). Being non-callable, it is sure to pay all eight coupons, so there is no call date to test.
