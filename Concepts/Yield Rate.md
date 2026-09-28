---
verification:
  status: verified
  confidence: low
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:ac8135a55bf7c6ade9165707eb7ba28bacc888f4dfeb0e58c936b3c7f8c3d6bc
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 4 Bonds (15-25%), learning outcome a)-b), PDF p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §43 The Various Pricing Formulas of a Bond, PDF p.384-385, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §44 Amortization of Premium or Discount, PDF p.396, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus (SOA study note FM-23-05), PDF p.20, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Yield Rate.md
---

The **yield rate** $j$ (also called the yield to maturity) is the internal rate of return of a bond — the interest rate per period at which the present value of all future cash flows equals the current price $P$.

> $$P = Fr \cdot a_{\overline{n}|j} + C \cdot v^n$$

- It is the $j$ that solves the bond price equation. Unlike the [[Coupon Rate]] $r$, which is fixed by the bond's terms, the yield rate reflects the bond's market price.
- A **premium bond** ($P > C$) has $Fr > Cj$, meaning the coupon rate exceeds the yield rate; a **discount bond** ($P < C$) has $Fr < Cj$.
- Bond prices and yields move in opposite directions: if the yield rises, the price falls, and vice versa.
- The yield rate is the fundamental measure of a bond's return to a buy-and-hold investor.

![[Media/Figures/Yield_Rate.svg|340]]

> [!example]- Finding the Yield Rate {Example}
> A \$$1{,}000$ face value 3-year annual-coupon bond with coupon rate $5\%$ is currently priced at \$$950.26$. Verify that the yield rate is approximately $6.5\%$.
>
> > [!answer]-
> > Coupons are $Fr = 1000(0.05) = \$50$ per year; redemption value $C = 1000$.
> > At $j = 6.5\%$: $v = 1/1.065$, $a_{\overline{3}|6.5\%} = (1 - 1.065^{-3})/0.065 = 2.6485$.
> > $$P = 50(2.6485) + 1000(1.065)^{-3} = 132.43 + 827.85 = \$960.28$$
> > Trying $j = 7\%$: $a_{\overline{3}|7\%} = 2.6243$, $P = 50(2.6243) + 1000(1.07)^{-3} = 131.22 + 816.30 = \$947.51$.
> > By interpolation the yield is close to $6.5\%$–$7\%$, consistent with the bond trading at a discount to its \$$1{,}000$ face value since the coupon rate ($5\%$) is below the yield.
