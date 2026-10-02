---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:296e81d788a609b56f213d9367f7ab08bb6854b8f1eb8fe56f84a877c24ab04d
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, pp.384-385, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.396, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA study note FM-23-05, Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus, pp.20-21, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Yield Rate.md
---

The **yield rate** $j$ (also called the yield to maturity) is the internal rate of return of a bond — the interest rate per period at which the present value of all future cash flows equals the current price $P$.

> $$P = Fr \cdot a_{\overline{n}|j} + C \cdot v^n$$

- $F$ is the face amount, $r$ the coupon rate per period, $C$ the redemption value, $n$ the number of coupons and $v = 1/(1+j)$; the yield rate is the $j$ that solves this equation. Unlike the [[Coupon Rate]] $r$, which is fixed by the bond's terms, the yield rate reflects the bond's market price.
- A **premium bond** ($P > C$) has $Fr > Cj$ — when $C = F$, as it is unless stated otherwise, the coupon rate exceeds the yield rate; a **discount bond** ($P < C$) has $Fr < Cj$.
- Bond prices and yields move in opposite directions: if the yield rises, the price falls, and vice versa.
- The yield rate is the rate actually earned by an investor who buys the bond at $P$ and holds it until redemption.

![[Media/Figures/Yield_Rate.svg|340]]

> [!example]- Finding the Yield Rate {Example}
> A \$$1{,}000$ face value 3-year annual-coupon bond with coupon rate $5\%$ is currently priced at \$$950.26$. Find its yield rate.
>
> > [!answer]-
> > Coupons are $Fr = 1{,}000(0.05) = 50$ per year and the redemption value is $C = 1{,}000$, so $j$ solves
> > $$50\,a_{\overline{3}|j} + 1{,}000\,v^3 = 950.26$$
> > Bracket the root by pricing at two trial rates:
> > $$
> > \begin{align*}
> > P(6.5\%) &= 50(2.64848) + 1{,}000(1.065)^{-3} \\
> > &= 960.27 \\
> > P(7\%) &= 50(2.62432) + 1{,}000(1.07)^{-3} \\
> > &= 947.51
> > \end{align*}
> > $$
> > The price $950.26$ lies between them, so interpolate:
> > $$
> > \begin{align*}
> > j &\approx 0.065 + 0.005 \cdot \frac{960.27 - 950.26}{960.27 - 947.51} \\
> > &= 0.065 + 0.005(0.78448) \\
> > &= 0.06892
> > \end{align*}
> > $$
> > Solving exactly (BA II Plus: $N = 3$, $PV = 950.26$, $PMT = -50$, $FV = -1{,}000$, CPT $I/Y$) gives $j = 6.89\%$. The bond trades at a discount to its face value because its coupon rate ($5\%$) is below the yield.
